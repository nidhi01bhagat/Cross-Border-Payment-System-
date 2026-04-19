# Cross-Border Payment System - Complete Architecture

## 🧠 System Overview

Your system bridges Web2 payments with Web3 infrastructure using:
- **Dodo Payments**: Centralized payment processing (checkout, billing, compliance)
- **Solana**: Decentralized stablecoin settlement (instant, low-cost transfers)
- **Helius**: Blockchain infrastructure (RPC, webhooks, indexing)
- **Phantom**: User wallet authentication

---

## 🏗️ Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface (React)                   │
│                  Connect Wallet → Enter Amount              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     Backend (Node.js)                       │
│        Create Payment → Verify Webhook → Update State       │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┴─────────────────────┐
        ↓                                           ↓
┌────────────────────────┐              ┌────────────────────────┐
│   Dodo Payments        │              │   Solana (via Helius)  │
│ (Off-chain Layer)      │              │   (On-chain Layer)     │
│                        │              │                        │
│ • Checkout             │              │ • USDC Transfer        │
│ • Billing              │              │ • Transaction Confirm  │
│ • Global Payments      │              │ • Event Webhooks       │
│ • Compliance           │              │ • Real-time Indexing   │
└────────────────────────┘              └────────────────────────┘
        ↓                                           ↓
        └─────────────────────┬─────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Database (MongoDB)                       │
│        Payments | Transactions | Users | Webhooks           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 End-to-End Flow (Detailed)

### Phase 1: Payment Initiation
```
User clicks "Pay" 
     ↓
Frontend connects wallet (Phantom)
     ↓
User enters amount & recipient
     ↓
Frontend calls: POST /create-payment
     ↓
Backend creates payment record (status: pending)
```

### Phase 2: Payment Processing (Dodo)
```
Backend calls Dodo API
     ↓
Dodo returns checkout URL
     ↓
User redirected to Dodo checkout
     ↓
User pays via card/UPI/bank transfer
     ↓
Dodo processes payment securely
```

### Phase 3: Payment Confirmation (Webhook)
```
Dodo sends webhook to backend:
{
  "paymentId": "p_001",
  "status": "success",
  "amount": 100
}
     ↓
Backend verifies webhook signature
     ↓
Updates DB: status = "paid"
```

### Phase 4: Blockchain Settlement (Solana)
```
Backend calls Helius RPC
     ↓
Sends USDC stablecoin to recipient wallet
     ↓
Blockchain processes transaction
     ↓
Generates transaction hash (txHash)
```

### Phase 5: Transaction Confirmation
```
Helius webhook confirms blockchain settlement
     ↓
Backend updates DB: status = "completed"
     ↓
Stores txHash for audit trail
```

### Phase 6: User Notification
```
Frontend polls backend OR receives update
     ↓
Shows "Payment successful ✅"
     ↓
Displays transaction hash on Solana Explorer
```

---

## 🧩 Data Model

### Payment Schema
```javascript
{
  paymentId: String,           // unique payment ID
  userId: String,              // user initiating payment
  amount: Number,              // amount in USD
  currency: String,            // "USD" default
  recipientWallet: String,     // Solana wallet address
  status: String,              // pending → paid → processing → completed
  dodoSessionId: String,       // Dodo checkout session ID
  dodoPaymentId: String,       // Dodo payment ID
  solanaTransaction: {
    hash: String,              // blockchain transaction hash
    signature: String,         // Solana signature
    timestamp: Date,           // when confirmed
    explorer: String           // link to Solana Explorer
  },
  createdAt: Date,
  completedAt: Date
}
```

### Webhook Events
```javascript
// Dodo webhook
{
  type: "payment.success",
  paymentId: "p_001",
  timestamp: 1234567890,
  signature: "verified_hash"
}

// Helius webhook (blockchain confirmation)
{
  type: "transaction.confirmed",
  txHash: "abc123...",
  status: "success"
}
```

---

## 🔐 Security Principles

### Webhook Verification
- Always verify Dodo webhook signature
- Validate timestamp (prevent replay attacks)
- Use HMAC-SHA256

### Idempotency
- Store paymentId to prevent duplicate processing
- Check if payment already exists before updating

### State Management
- Don't assume immediate confirmation
- Implement timeout handling
- Provide fallback notification methods

---

## 🚀 Integration Points

### Dodo Payments API
```
Base URL: https://api.dodopayments.com/v1

POST /payments/sessions
Create payment session

POST /payments/confirm
Confirm payment

GET /payments/{id}
Fetch payment status
```

### Helius RPC
```
Base URL: https://rpc.helius.xyz/?api-key=YOUR_API_KEY

Connection to Solana blockchain
Send transactions
Poll transaction status
Listen to webhooks
```

### Phantom Wallet
```
Browser-injected: window.solflare or window.phantom
Methods:
- connect()
- signAndSendTransaction()
- getBalance()
```

---

## 📊 System Characteristics

| Aspect | Details |
|--------|---------|
| **Scalability** | Event-driven, asynchronous processing |
| **Speed** | Sub-second frontend, seconds for on-chain |
| **Latency** | ~30s for full settlement (Solana finality) |
| **Cost** | ~$0.00025 per Solana transaction |
| **Reliability** | Webhook retries, transaction confirmation loops |
| **Geographic** | Works globally (150+ countries via Dodo) |

---

## 🧠 Key Design Decisions

### Why Event-Driven?
- Payments aren't instant → backend must wait for webhook
- Blockchain confirmation takes time → can't block
- User experience improved → updates in real-time

### Why Dodo + Solana?
- **Dodo**: Handles messy Web2 (compliance, currencies, payment methods)
- **Solana**: Provides instant, trustless settlement layer
- **Combined**: Best UX + best finality

### Why Helius?
- Solana public RPC is unreliable for production
- Helius provides:
  - Fast, dedicated RPC endpoints
  - Built-in indexing
  - Transaction webhooks
  - Rate limiting protection

---

## 🎯 Production Checklist

- [ ] Webhook signature verification implemented
- [ ] Error handling for failed payments
- [ ] Retry logic for blockchain transactions
- [ ] Database transaction logging
- [ ] Rate limiting on API endpoints
- [ ] Environment variables secured
- [ ] API keys rotated
- [ ] Monitoring & alerting setup
- [ ] Audit trail for compliance

---

## 📈 Scaling Considerations

1. **Database**: Use indexes on paymentId, userId, status
2. **Backend**: Implement job queue (Bull, RabbitMQ) for async tasks
3. **Webhooks**: Use message queue (Redis) to prevent webhook loss
4. **Frontend**: Cache Helius data, use websockets for real-time updates
5. **RPC**: Implement fallback to multiple Helius clusters

---

## 🔗 Next Steps

1. Set up backend server with webhook handlers
2. Implement Dodo payment session creation
3. Add Helius transaction broadcasting
4. Build React frontend with wallet connection
5. Create monitoring/alerting dashboard
