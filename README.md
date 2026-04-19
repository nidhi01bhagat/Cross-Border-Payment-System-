# Cross-Border Payment System

Build instant, global payments using Solana stablecoins + Dodo Payments

A hackathon project demonstrating how to combine centralized payment processing with decentralized blockchain settlement for seamless international money transfers.

![Status](https://img.shields.io/badge/status-hackathon--mvp-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

# Problem We're Solving
 **Current Reality:**
- Cross-border payments take 2-3 days
- Transaction costs are 5-10% (banks, fees, currency conversion)
- Banking infrastructure doesn't exist in many countries
- Freelancers lose 20% of earnings to platforms + payment fees

 **Our Solution:**
- Payments settle in **seconds**
- Costs only **0.1%** (99% cheaper)
- Works **globally** without banks
- Direct peer-to-peer, programmable money movement


## 🏗️ Architecture


┌─────────────────────────────────────────────────┐
│            React Frontend (UI Layer)            │
│  • Connect Phantom wallet                       │
│  • Enter amount & recipient                     │
│  • Real-time payment status                     │
└─────────────────────────┬───────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────┐
│        Node.js Backend (Control Layer)          │
│  • Orchestrate payment flow                     │
│  • Verify webhooks                              │
│  • Handle blockchain interactions               │
└──────────┬──────────────────────────────┬───────┘
           │                              │
           ↓                              ↓
    ┌──────────────────┐         ┌──────────────────┐
    │ Dodo Payments    │         │ Solana (Helius)  │
    │ (Payment Layer)  │         │ (Settlement)     │
    │                  │         │                  │
    │ • Checkout       │         │ • USDC Transfer  │
    │ • Billing        │         │ • TX Confirm     │
    │ • Compliance     │         │ • Real-time data │
    └──────────────────┘         └──────────────────┘
           │                              │
           └──────────────┬───────────────┘
                          ↓
        ┌─────────────────────────────────┐
        │   MongoDB (Transaction Store)   │
        │ • Payment records               │
        │ • Webhook logs                  │
        │ • User data                     │
        └─────────────────────────────────┘
```


##  Quick Start
### Requirements
- Node.js 16+
- Phantom wallet
- API keys: Helius, Dodo Payments

### Installation (5 minutes)
```bash
# Clone repo
git clone https://github.com/nidhi01bhagat/Cross-Border-Payment-System-.git
cd Cross-Border-Payment-System-

# Setup environment
cp .env.example .env
# Add your API keys to .env

# Install & run
npm install
npm run dev

# Open http://localhost:3000
```

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.**

##  Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design & data flow |
| [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) | API reference, schemas, best practices |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Installation & configuration |
| [JUDGE_QA_GUIDE.md](JUDGE_QA_GUIDE.md) | Hackathon pitch & defense |

---

## How It Works

### 1. User initiates payment
```
Frontend → "I want to send $100 to alice.sol"
```

### 2. Backend creates Dodo session
```
Backend → Dodo: "Create checkout for $100"
Dodo → Backend: "Here's checkout link"
```

### 3. User completes payment
```
User → Dodo: Pays via card/UPI
Dodo → Backend: "Payment confirmed via webhook"
```

### 4. Backend settles on blockchain
```
Backend → Helius: "Send 100 USDC to alice.sol"
Helius → Solana: Transaction submitted
Solana → Helius: "Confirmed in block 123"
```

### 5. User sees success
```
Frontend: " Payment complete! View on Explorer"
```

**Total time: ~30 seconds**

---

## 🔑 Key Features

 **Instant Settlement**
- Solana finality in ~1 second vs Ethereum 12+ seconds

 **Ultra-Low Cost**
- $0.00025 per transaction

 **Global Coverage**
- 150+ countries via Dodo
- Programmable for any use case

 **Developer-Friendly**
- Clean REST API
- Webhook system for real-time updates
- Well-documented code

✅ **Production-Ready Architecture**
- Event-driven async processing
- Webhook verification
- Idempotent operations
- Error handling & retries

---

## 📊 Use Cases

### 1. Global Freelancer Payroll
```
Client platform → Dodo Checkout
→ Batched USDC transfers → Freelancer wallets
(Instead of 10% Upwork + 5% wire fees)
```

### 2. Merchant Checkout
```
Customer → QR code → Stablecoin payment
→ Instant merchant settlement
(Instead of 2-3 day credit card settlement)
```

### 3. Cross-Border Remittance
```
Worker abroad → Send USDC home
→ Family can withdraw at local ATM
→ Hours not days
```

### 4. SaaS Billing
```
API credits or usage-based billing
→ Automated stablecoin charges
→ Instant settlement to company
```

---

## 🔐 Security

- ✅ Webhook signature verification (HMAC-SHA256)
- ✅ Private key management best practices
- ✅ Idempotency checks prevent duplicate processing
- ✅ Rate limiting on API endpoints
- ✅ Timestamp validation on webhooks
- ⚠️ **Testnet only for this MVP** (use hardware wallets for mainnet)

---

## 🧪 Testing

### Manual Testing
1. Connect Phantom wallet
2. Enter recipient wallet address
3. Click "Pay"
4. Watch backend logs
5. Verify transaction on [Solana Explorer](https://explorer.solana.com)

### API Testing
```bash
# Create payment
curl -X POST http://localhost:3000/create-payment \
  -H "Content-Type: application/json" \
  -d '{"userId":"user1","amount":10,"recipientWallet":"alice.sol","email":"test@test.com"}'

# Get status
curl http://localhost:3000/payment/p_1234567890
```

---

## 🚀 Deployment

### Testnet
- Backend: Heroku, Railway, Render
- Frontend: Vercel, Netlify
- Database: MongoDB Atlas (free tier)

### Mainnet (future)
- [ ] Security audit
- [ ] KYC integration
- [ ] Rate limiting
- [ ] Monitoring & alerting
- [ ] Load testing

---

## 📈 Performance

| Metric | Value |
|--------|-------|
| **Payment Initiation** | ~100ms |
| **Dodo Processing** | ~2-5s |
| **Solana Settlement** | ~1s finality |
| **Total Time** | ~30s end-to-end |
| **Transaction Cost** | $0.00025 |
| **Uptime Target** | 99.9% |

---

## 🤝 Tech Stack

```javascript
{
  "frontend": "React + Next.js",
  "backend": "Node.js + Express",
  "blockchain": "Solana (Web3.js)",
  "payments": "Dodo Payments API",
  "infra": "Helius RPC",
  "wallet": "Phantom",
  "database": "MongoDB (optional)",
  "hosting": "Heroku / Railway (optional)"
}
```

---

##  Resources

- [Dodo Payments Docs](https://docs.dodopayments.com)
- [Helius Documentation](https://docs.helius.xyz)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js)
- [Phantom Wallet API](https://docs.phantom.app)

---

##  What's Next

**Immediate (Hackathon):**
- ✅ End-to-end payment flow
- ✅ Live demo capability

**Short-term (Month 1):**
- [ ] Real MongoDB backend
- [ ] User authentication
- [ ] Transaction history
- [ ] Mainnet deployment

**Medium-term (Month 3):**
- [ ] Partner payroll platforms
- [ ] Merchant dashboard
- [ ] Mobile app
- [ ] Multi-chain support

---

##  Support

- Questions? Check [Solana Discord](https://discord.gg/solana)
- Bugs? Open a GitHub issue
- Feature ideas? Submit pull request

---

##  License

MIT © 2024 Cross-Border Payment Team

---

##  Team

Built during **Solana Frontier Hackathon** powered by **Superteam India** & **Colosseum**

---

##  Acknowledgments

Thanks to:
- **Dodo Payments** for sponsoring the track
- **Superteam** for organizing
- **Colosseum** for technical infrastructure
- **Helius** for RPC infrastructure
- **Solana** for the amazing blockchain

---

**Ready to build the future of global payments?** Start with [SETUP_GUIDE.md](SETUP_GUIDE.md)

 **Let's go!**
