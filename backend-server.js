const express = require('express');
const crypto = require('crypto');
const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// ============================================
// CONFIGURATION
// ============================================

const HELIUS_RPC = `https://rpc.helius.xyz/?api-key=${process.env.HELIUS_API_KEY}`;
const DODO_BASE_URL = 'https://api.dodopayments.com/v1';
const DODO_API_KEY = process.env.DODO_API_KEY;
const DODO_WEBHOOK_SECRET = process.env.DODO_WEBHOOK_SECRET;

// Connect to Solana via Helius
const connection = new Connection(HELIUS_RPC, 'confirmed');

// In-memory database (replace with MongoDB in production)
const payments = {};
const webhookLog = [];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Verify Dodo webhook signature
 */
function verifyDodoWebhook(req) {
  const signature = req.headers['x-dodo-signature'];
  const timestamp = req.headers['x-dodo-timestamp'];
  
  if (!signature || !timestamp) {
    return false;
  }

  // Verify timestamp is recent (within 5 minutes)
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) {
    return false;
  }

  // Verify HMAC signature
  const body = JSON.stringify(req.body);
  const message = `${timestamp}.${body}`;
  const hash = crypto
    .createHmac('sha256', DODO_WEBHOOK_SECRET)
    .update(message)
    .digest('hex');

  return hash === signature;
}

/**
 * Call Dodo API
 */
async function callDodoAPI(endpoint, method = 'POST', data = null) {
  const url = `${DODO_BASE_URL}${endpoint}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DODO_API_KEY}`
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error('Dodo API error:', error);
    throw error;
  }
}

/**
 * Broadcast transaction to Solana
 */
async function broadcastTransaction(fromKeypair, toPubKey, amount) {
  try {
    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();

    // Create transaction (simplified - use spl-token for USDC in production)
    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: fromKeypair.publicKey
    });

    // Add instruction to transfer SOL (replace with USDC transfer)
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPubKey,
        lamports: amount * LAMPORTS_PER_SOL
      })
    );

    // Sign and send
    transaction.sign(fromKeypair);
    const signature = await connection.sendRawTransaction(transaction.serialize());

    console.log(`Transaction sent: ${signature}`);
    return signature;
  } catch (error) {
    console.error('Solana transaction error:', error);
    throw error;
  }
}

// ============================================
// PAYMENT ENDPOINTS
// ============================================

/**
 * Step 1: Create Payment Session
 * POST /create-payment
 */
app.post('/create-payment', async (req, res) => {
  try {
    const { userId, amount, recipientWallet, email } = req.body;

    if (!userId || !amount || !recipientWallet || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate Solana wallet address
    try {
      new PublicKey(recipientWallet);
    } catch {
      return res.status(400).json({ error: 'Invalid recipient wallet' });
    }

    // Create Dodo payment session
    const dodoResponse = await callDodoAPI('/payments/sessions', 'POST', {
      amount: amount * 100, // Convert to cents
      currency: 'USD',
      customer_email: email,
      metadata: {
        userId,
        recipientWallet,
        type: 'stablecoin_payment'
      }
    });

    if (!dodoResponse.session_id) {
      throw new Error('Failed to create Dodo session');
    }

    // Store payment record
    const paymentId = `p_${Date.now()}`;
    payments[paymentId] = {
      paymentId,
      userId,
      amount,
      recipientWallet,
      status: 'pending',
      dodoSessionId: dodoResponse.session_id,
      createdAt: new Date()
    };

    console.log(`Payment created: ${paymentId}`);

    res.json({
      paymentId,
      checkoutUrl: dodoResponse.checkout_url,
      message: 'Proceed to payment'
    });

  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Step 2: Webhook - Dodo Payment Confirmation
 * POST /webhook/dodo
 */
app.post('/webhook/dodo', async (req, res) => {
  try {
    // Verify webhook signature
    if (!verifyDodoWebhook(req)) {
      console.warn('Invalid webhook signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { type, payment_id, status } = req.body;

    if (type !== 'payment.completed') {
      return res.status(200).json({ acknowledged: true });
    }

    // Log webhook
    webhookLog.push({
      type: 'dodo',
      paymentId: payment_id,
      status,
      receivedAt: new Date()
    });

    // Find payment
    let paymentId = null;
    for (const [pId, payment] of Object.entries(payments)) {
      if (payment.dodoSessionId === payment_id) {
        paymentId = pId;
        break;
      }
    }

    if (!paymentId) {
      console.warn(`Payment not found for session: ${payment_id}`);
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Update payment status
    payments[paymentId].status = 'paid';
    payments[paymentId].dodoPaymentId = payment_id;
    payments[paymentId].paidAt = new Date();

    console.log(`Payment confirmed: ${paymentId}`);

    // ⚡ TRIGGER BLOCKCHAIN SETTLEMENT (asynchronous)
    triggerBlockchainSettlement(paymentId);

    res.json({ acknowledged: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Step 3: Trigger Blockchain Settlement
 */
async function triggerBlockchainSettlement(paymentId) {
  try {
    const payment = payments[paymentId];
    if (!payment) return;

    payment.status = 'processing';

    // Get sender keypair (from environment - DANGER: only for demo!)
    const senderPrivateKey = process.env.SOLANA_PRIVATE_KEY;
    const senderKeypair = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(senderPrivateKey))
    );

    // Recipient wallet
    const recipientPubKey = new PublicKey(payment.recipientWallet);

    // Convert USD to USDC (1 USD = 1 USDC)
    const amountInUsdc = payment.amount * 1_000_000; // USDC has 6 decimals

    // Broadcast transaction
    const txSignature = await broadcastTransaction(
      senderKeypair,
      recipientPubKey,
      amountInUsdc
    );

    payment.solanaTransaction = {
      hash: txSignature,
      timestamp: new Date(),
      status: 'pending'
    };

    console.log(`Blockchain settlement initiated: ${txSignature}`);

    // Poll for confirmation (asynchronous)
    pollTransactionConfirmation(paymentId, txSignature);

  } catch (error) {
    console.error('Blockchain settlement error:', error);
    payments[paymentId].status = 'settlement_failed';
    payments[paymentId].error = error.message;
  }
}

/**
 * Step 4: Poll Transaction Confirmation
 */
async function pollTransactionConfirmation(paymentId, txSignature) {
  const maxRetries = 30;
  let retries = 0;

  const poll = async () => {
    try {
      const status = await connection.getSignatureStatus(txSignature);

      if (status.value && status.value.confirmationStatus === 'finalized') {
        payments[paymentId].status = 'completed';
        payments[paymentId].solanaTransaction.status = 'confirmed';
        payments[paymentId].completedAt = new Date();

        console.log(`Payment completed: ${paymentId}`);
        return;
      }

      if (retries < maxRetries) {
        retries++;
        setTimeout(poll, 2000); // Poll every 2 seconds
      } else {
        payments[paymentId].status = 'settlement_timeout';
        console.warn(`Transaction confirmation timeout: ${txSignature}`);
      }
    } catch (error) {
      console.error('Poll error:', error);
      if (retries < maxRetries) {
        retries++;
        setTimeout(poll, 5000);
      }
    }
  };

  poll();
}

/**
 * Step 5: Get Payment Status
 * GET /payment/:paymentId
 */
app.get('/payment/:paymentId', (req, res) => {
  try {
    const payment = payments[req.params.paymentId];

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Health Check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ============================================
// SERVER START
// ============================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 Helius RPC: ${HELIUS_RPC}`);
  console.log(`🔗 Webhook endpoint: POST /webhook/dodo`);
});
