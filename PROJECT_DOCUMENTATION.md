# Cross-Border Payment System - Project Documentation

## 🎯 Project Overview

A global payment platform that combines centralized payment processing (Dodo Payments) with decentralized settlement (Solana stablecoins) to enable instant, low-cost international money transfers.

**Problem**: Cross-border payments are slow, expensive, and complicated.

**Solution**: Bridge Web2 payments with Web3 infrastructure for seamless global transfers.

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React / Next.js | User interface, wallet connection |
| **Backend** | Node.js + Express | Payment orchestration, webhook handling |
| **Payments** | Dodo Payments | Checkout, billing, compliance |
| **Blockchain** | Solana | Fast, low-cost settlement |
| **Infra** | Helius | RPC, indexing, webhooks |
| **Wallet** | Phantom | User authentication & signing |
| **Database** | MongoDB | Transaction logs, payment records |

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 16+
- npm or yarn
- Phantom wallet installed

### Step 1: Clone & Setup
```bash
cd Cross-Border-Payment-System-
npm install
```

### Step 2: Environment Variables
```bash
# Copy example file
cp .env.example .env

# Add your API keys
# - Get HELIUS_API_KEY from https://dev.helius.xyz
# - Get DODO_API_KEY from https://app.dodopayments.com
```

### Step 3: Start Backend
```bash
npm run dev
# Backend runs on http://localhost:3000
```

### Step 4: Start Frontend (separate terminal)
```bash
npm start  # or next dev
# Frontend runs on http://localhost:3000
```

### Step 5: Test Payment Flow
1. Click "Connect Phantom Wallet"
2. Fill in recipient wallet & amount
3. Click "Next: Review Payment"
4. Click "Proceed to Dodo Checkout"
5. Complete payment
6. Wait for blockchain confirmation (30-60 seconds)

---

## 📋 API Endpoints

### Create Payment
```
POST /create-payment
Content-Type: application/json

{
  "userId": "user123",
  "amount": 100,
  "recipientWallet": "abc.sol",
  "email": "user@example.com"
}

Response:
{
  "paymentId": "p_1713567890",
  "checkoutUrl": "https://checkout.dodopayments.com/...",
  "message": "Proceed to payment"
}
```

### Get Payment Status
```
GET /payment/{paymentId}

Response:
{
  "paymentId": "p_1713567890",
  "status": "completed",
  "amount": 100,
  "recipientWallet": "abc.sol",
  "solanaTransaction": {
    "hash": "5qVrQ...",
    "timestamp": "2024-04-19T10:30:00Z",
    "status": "confirmed"
  }
}
```

### Dodo Webhook
```
POST /webhook/dodo
X-Dodo-Signature: hmac_sha256_signature
X-Dodo-Timestamp: 1713567890

{
  "type": "payment.completed",
  "payment_id": "dodo_p_123",
  "status": "success"
}
```

---

## 🔄 Payment State Machine

```
┌─────────────────────────────────────────┐
│            Payment Initiated            │ (pending)
└───────────────────┬─────────────────────┘
                    ↓
        ┌───────────────────────┐
        │  User Completes       │
        │  Dodo Checkout        │
        └───────────┬───────────┘
                    ↓
        ┌───────────────────────┐
        │ Dodo Webhook Received │ (paid)
        └───────────┬───────────┘
                    ↓
        ┌───────────────────────┐
        │ Trigger Solana TX     │ (processing)
        └───────────┬───────────┘
                    ↓
        ┌───────────────────────┐
        │ TX Confirmed          │ (completed)
        └───────────────────────┘
```

---

## 🔐 Security Considerations

### Webhook Verification
Always verify Dodo webhook signatures:
```javascript
const signature = req.headers['x-dodo-signature'];
const message = `${timestamp}.${body}`;
const hash = crypto.createHmac('sha256', secret).update(message).digest('hex');
if (hash !== signature) throw new Error('Invalid signature');
```

### Private Key Management
**NEVER** store private keys in code. Use:
- Hardware wallets for production
- AWS KMS / HashiCorp Vault for backend
- Environment variables only for testing

### Idempotency
Always check if payment already processed:
```javascript
if (payments[paymentId].status !== 'pending') {
  return; // Already processed
}
```

### Rate Limiting
Implement rate limiting to prevent abuse:
```javascript
const rateLimit = require('express-rate-limit');
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

---

## 📊 Database Schema

### Payments Collection
```javascript
{
  paymentId: String,
  userId: String,
  amount: Number,
  currency: String,
  recipientWallet: String,
  status: String, // pending | paid | processing | completed
  dodoSessionId: String,
  dodoPaymentId: String,
  solanaTransaction: {
    hash: String,
    signature: String,
    timestamp: Date,
    status: String // pending | confirmed | failed
  },
  createdAt: Date,
  paidAt: Date,
  completedAt: Date,
  error: String
}
```

---

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Integration Test (Manual)
1. Use testnet: Add `?cluster=devnet` to Helius RPC
2. Use Solana devnet faucet to get test SOL
3. Create test payments and verify webhooks

### Load Testing
```bash
npm install -g artillery
artillery quick -c 10 -d 60 -r 10 http://localhost:3000/health
```

---

## 🚨 Troubleshooting

### "Phantom wallet not found"
- Install Phantom extension from phantom.app
- Refresh page

### "Helius API key invalid"
- Generate new key at https://dev.helius.xyz
- Verify it's in .env file

### "Webhook not received"
- Check ngrok tunnel is running: `ngrok http 3000`
- Register webhook URL in Dodo dashboard
- Verify DODO_WEBHOOK_SECRET is correct

### "Transaction confirmation timeout"
- Check Solana network status: https://status.solana.com
- Verify Helius RPC is working
- Try fallback RPC endpoint

---

## 📈 Scaling

### Production Checklist
- [ ] Move to MongoDB (not in-memory)
- [ ] Add job queue (Bull, RabbitMQ)
- [ ] Implement caching (Redis)
- [ ] Set up monitoring (Sentry)
- [ ] Add alerting (PagerDuty)
- [ ] Load test to 1000 TPS
- [ ] Set up CI/CD (GitHub Actions)
- [ ] Add API authentication
- [ ] Implement rate limiting
- [ ] Set up disaster recovery

### Performance Optimizations
1. **Webhook async processing**: Use job queue
2. **Database indexing**: Index on paymentId, userId, status
3. **RPC fallback**: Multiple Helius clusters
4. **Caching**: Cache wallet data, Helius responses
5. **Connection pooling**: Reuse DB connections

---

## 📚 Additional Resources

- [Dodo Payments Docs](https://docs.dodopayments.com)
- [Helius Documentation](https://docs.helius.xyz)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js)
- [Phantom Wallet API](https://docs.phantom.app)
- [Solana Program Library](https://spl.solana.com)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

---

## 📞 Support

- Questions? Check [Solana Discord](https://discord.gg/solana)
- Issues? Open GitHub issue
- Security? Email security@yourdomain.com

---

## 📄 License

MIT License - See LICENSE file for details
