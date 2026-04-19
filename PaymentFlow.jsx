import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

/**
 * PaymentFlow Component
 * Main component for handling the complete payment flow
 */
export default function PaymentFlow() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  // Payment form state
  const [recipientWallet, setRecipientWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');

  // Payment status
  const [payment, setPayment] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  // ============================================
  // PHANTOM WALLET CONNECTION
  // ============================================

  /**
   * Connect to Phantom Wallet
   */
  const connectWallet = async () => {
    try {
      const provider = window.phantom?.solana;

      if (!provider) {
        setError('Phantom wallet not found. Please install it.');
        return;
      }

      const response = await provider.connect();
      setWallet(response.publicKey.toString());
      setConnected(true);
      setError(null);

      // Fetch balance
      await getBalance(response.publicKey);

      console.log('✅ Connected:', response.publicKey.toString());
    } catch (err) {
      setError(`Connection failed: ${err.message}`);
    }
  };

  /**
   * Disconnect wallet
   */
  const disconnectWallet = () => {
    setWallet(null);
    setConnected(false);
    setBalance(0);
  };

  /**
   * Get wallet balance
   */
  const getBalance = async (publicKey) => {
    try {
      const connection = new Connection(
        `https://rpc.helius.xyz/?api-key=${process.env.REACT_APP_HELIUS_API_KEY}`,
        'confirmed'
      );

      const balanceLamports = await connection.getBalance(publicKey);
      const balanceSOL = balanceLamports / 1_000_000_000;
      setBalance(balanceSOL.toFixed(4));
    } catch (err) {
      console.error('Balance fetch failed:', err);
    }
  };

  // ============================================
  // PAYMENT FLOW
  // ============================================

  /**
   * Step 1: Create payment session
   */
  const initiatePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!recipientWallet || !amount || !email) {
        throw new Error('Please fill all fields');
      }

      if (parseFloat(amount) <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      const response = await fetch('http://localhost:3000/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: wallet,
          recipientWallet,
          amount: parseFloat(amount),
          email
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment creation failed');
      }

      setPayment(data);
      setCheckoutUrl(data.checkoutUrl);
      setStatus('checkout_ready');

      console.log('✅ Payment session created:', data.paymentId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Step 2: Redirect to Dodo checkout
   */
  const proceedToCheckout = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setStatus('payment_processing');

      // Start polling for payment status
      pollPaymentStatus(payment.paymentId);
    }
  };

  /**
   * Step 3: Poll payment status
   */
  const pollPaymentStatus = async (paymentId) => {
    let attempts = 0;
    const maxAttempts = 120; // 4 minutes

    const poll = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/payment/${paymentId}`
        );

        if (!response.ok) throw new Error('Failed to fetch status');

        const paymentData = await response.json();
        const { status: paymentStatus } = paymentData;

        console.log(`Payment status: ${paymentStatus}`);

        if (paymentStatus === 'completed') {
          setStatus('completed');
          setPayment(paymentData);

          if (paymentData.solanaTransaction?.hash) {
            const explorerUrl = `https://explorer.solana.com/tx/${paymentData.solanaTransaction.hash}?cluster=mainnet`;
            setError(null); // Clear error, use success
            console.log('✅ Payment completed!');
          }
          return; // Stop polling
        }

        if (
          paymentStatus === 'failed' ||
          paymentStatus === 'settlement_failed'
        ) {
          setStatus('failed');
          setError('Payment failed. Please try again.');
          return;
        }

        // Continue polling
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 2000); // Poll every 2 seconds
        } else {
          setStatus('timeout');
          setError('Payment confirmation timeout');
        }
      } catch (err) {
        console.error('Poll error:', err);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 5000);
        }
      }
    };

    poll();
  };

  /**
   * Get explorer link for transaction
   */
  const getExplorerLink = () => {
    if (payment?.solanaTransaction?.hash) {
      return `https://explorer.solana.com/tx/${payment.solanaTransaction.hash}?cluster=mainnet`;
    }
    return null;
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="payment-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .payment-container {
          max-width: 500px;
          width: 100%;
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        h1 {
          font-size: 28px;
          margin-bottom: 10px;
          color: #333;
          text-align: center;
        }

        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
          font-size: 14px;
        }

        /* Wallet Section */
        .wallet-section {
          background: #f7f7f7;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .wallet-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .wallet-status {
          font-size: 14px;
          color: #666;
        }

        .wallet-status.connected {
          color: #10b981;
          font-weight: 600;
        }

        .wallet-address {
          font-size: 12px;
          color: #999;
          word-break: break-all;
          background: white;
          padding: 8px;
          border-radius: 6px;
          font-family: monospace;
        }

        .balance {
          font-size: 14px;
          margin: 10px 0;
          color: #333;
        }

        .balance-value {
          font-weight: 600;
          color: #667eea;
        }

        button {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.3s;
          width: 100%;
        }

        button:hover {
          background: #5568d3;
        }

        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        button.disconnect {
          background: #ef4444;
          margin-top: 10px;
        }

        button.disconnect:hover {
          background: #dc2626;
        }

        /* Form Section */
        .form-section {
          display: none;
        }

        .form-section.active {
          display: block;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        input {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #667eea;
        }

        /* Status Section */
        .status-section {
          display: none;
          text-align: center;
        }

        .status-section.active {
          display: block;
        }

        .status-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .status-text {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .status-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
        }

        .explorer-link {
          display: inline-block;
          margin-top: 20px;
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }

        .explorer-link:hover {
          text-decoration: underline;
        }

        /* Error */
        .error {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          border-left: 4px solid #c33;
        }

        /* Loading */
        .loading {
          opacity: 0.6;
          pointer-events: none;
        }

        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <h1>💸 Global Payment System</h1>
      <p className="subtitle">
        Pay instantly using stablecoins on Solana
      </p>

      {/* Error Display */}
      {error && <div className="error">{error}</div>}

      {/* Wallet Section */}
      <div className="wallet-section">
        {!connected ? (
          <>
            <p className="wallet-status">Not connected</p>
            <button onClick={connectWallet} style={{ marginTop: '10px' }}>
              🔌 Connect Phantom Wallet
            </button>
          </>
        ) : (
          <>
            <div className="wallet-info">
              <span className="wallet-status connected">✅ Connected</span>
              <button onClick={disconnectWallet} className="disconnect">
                Disconnect
              </button>
            </div>
            <div className="wallet-address">{wallet}</div>
            <div className="balance">
              Balance: <span className="balance-value">{balance} SOL</span>
            </div>
          </>
        )}
      </div>

      {/* Payment Form */}
      <div className={`form-section ${connected && !status ? 'active' : ''}`}>
        <form onSubmit={initiatePayment}>
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Recipient Wallet *</label>
            <input
              type="text"
              value={recipientWallet}
              onChange={(e) => setRecipientWallet(e.target.value)}
              placeholder="recipient.sol or address..."
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (USD) *</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={loading ? 'loading' : ''}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              '→ Next: Review Payment'
            )}
          </button>
        </form>
      </div>

      {/* Checkout Ready */}
      {status === 'checkout_ready' && (
        <div className="status-section active">
          <div className="status-icon">🛒</div>
          <div className="status-text">Review Payment</div>
          <div className="status-description">
            Amount: <strong>${amount}</strong>
            <br />
            To: <code>{recipientWallet.slice(0, 10)}...</code>
          </div>
          <button onClick={proceedToCheckout}>
            💳 Proceed to Dodo Checkout
          </button>
          <button
            onClick={() => {
              setStatus(null);
              setPayment(null);
            }}
            style={{
              marginTop: '10px',
              background: '#ccc',
              color: '#333'
            }}
          >
            ← Back
          </button>
        </div>
      )}

      {/* Payment Processing */}
      {status === 'payment_processing' && (
        <div className="status-section active">
          <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
          <div className="status-text">Payment Processing...</div>
          <div className="status-description">
            Waiting for payment confirmation
            <br />
            (Don't close this page)
          </div>
        </div>
      )}

      {/* Completed */}
      {status === 'completed' && (
        <div className="status-section active">
          <div className="status-icon">✅</div>
          <div className="status-text">Payment Complete!</div>
          <div className="status-description">
            Funds received and settled on-chain
          </div>
          {getExplorerLink() && (
            <a
              href={getExplorerLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="explorer-link"
            >
              View on Solana Explorer →
            </a>
          )}
          <button
            onClick={() => {
              setStatus(null);
              setPayment(null);
              setAmount('');
              setRecipientWallet('');
              setEmail('');
            }}
            style={{ marginTop: '20px' }}
          >
            ← Start New Payment
          </button>
        </div>
      )}

      {/* Failed */}
      {status === 'failed' && (
        <div className="status-section active">
          <div className="status-icon">❌</div>
          <div className="status-text">Payment Failed</div>
          <button
            onClick={() => {
              setStatus(null);
              setPayment(null);
            }}
            style={{ marginTop: '20px' }}
          >
            ← Try Again
          </button>
        </div>
      )}
    </div>
  );
}
