# SETUP GUIDE - Get Started in 30 Minutes

Follow this guide step-by-step to get your system running locally.

---

## 📋 Prerequisites

Before starting, make sure you have:
- [ ] Node.js 16+ installed ([download](https://nodejs.org))
- [ ] npm or yarn installed
- [ ] Phantom wallet extension ([install](https://phantom.app))
- [ ] A code editor (VS Code recommended)
- [ ] API keys for:
  - Helius (Solana RPC)
  - Dodo Payments
  - (Optional) Ngrok for webhook tunneling

---

## 🔑 Step 1: Get API Keys (5 minutes)

### Helius API Key
1. Go to https://dev.helius.xyz
2. Sign up with email
3. Create new project
4. Copy API key

### Dodo Payments API Key
1. Go to https://app.dodopayments.com
2. Sign up or login
3. Go to Settings → API Keys
4. Create new key
5. Copy API key and webhook secret

### Keep these safe!

---

## 📁 Step 2: Set Up Project (5 minutes)

### Clone repository
```bash
git clone https://github.com/your-username/Cross-Border-Payment-System-.git
cd Cross-Border-Payment-System-
```

### Create .env file
```bash
# Copy example to .env
cp .env.example .env

# Edit .env with your keys
# (Open in VS Code and add your API keys)
```

### Your .env should look like:
```
PORT=3000
NODE_ENV=development
HELIUS_API_KEY=your_key_here
DODO_API_KEY=your_key_here
DODO_WEBHOOK_SECRET=your_secret_here
SOLANA_PRIVATE_KEY=[1,2,3...]  # Only for testing!
```

### Install dependencies
```bash
npm install
```

---

## 🚀 Step 3: Start Backend (5 minutes)

### Terminal 1 - Backend server
```bash
npm run dev
```

You should see:
```
✅ Server running on http://localhost:3000
📍 Helius RPC: https://rpc.helius.xyz/?api-key=...
🔗 Webhook endpoint: POST /webhook/dodo
```

### Test it works
```bash
# In Terminal 2
curl http://localhost:3000/health
```

Response should be:
```json
{"status":"ok","timestamp":"2024-04-19T..."}
```

---

## 🎨 Step 4: Start Frontend (5 minutes)

### Terminal 2 - React app
```bash
# If using Create React App
npm start

# Or if using Next.js
npm run dev
```

Frontend runs on http://localhost:3000 (or Next.js default port)

---

## 🧪 Step 5: Test the Flow (10 minutes)

### Install Phantom (if not already)
1. Go to https://phantom.app
2. Install browser extension
3. Create wallet

### Test Payment
1. Open http://localhost:3000 in browser
2. Click "Connect Phantom Wallet"
3. Approve connection
4. Enter:
   - Email: `test@example.com`
   - Recipient: `Your wallet address` (get from Phantom)
   - Amount: `10` (USD)
5. Click "Next: Review Payment"
6. Click "Proceed to Dodo Checkout"

### Monitor Backend
Watch terminal output for:
```
✅ Payment created: p_1713567890
🟡 Payment confirmed: p_1713567890
⚡ Blockchain settlement initiated: 5qVrQ...
✅ Payment completed: p_1713567890
```

---

## 🔔 Step 6: Setup Webhooks (Optional but Recommended)

Dodo needs to send webhooks to your backend. Locally, this requires a tunnel.

### Using Ngrok
```bash
# Install ngrok
npm install -g ngrok

# In new terminal
ngrok http 3000
```

You'll see:
```
Forwarding  https://12ab-34cd-56ef.ngrok.io -> http://localhost:3000
```

### Register webhook in Dodo
1. Go to https://app.dodopayments.com → Webhooks
2. Add endpoint: `https://12ab-34cd-56ef.ngrok.io/webhook/dodo`
3. Select events: `payment.completed`
4. Copy webhook secret to .env

### Test webhook
```bash
curl -X POST http://localhost:3000/webhook/dodo \
  -H "Content-Type: application/json" \
  -H "X-Dodo-Signature: test" \
  -H "X-Dodo-Timestamp: $(date +%s)" \
  -d '{"type":"payment.completed","payment_id":"test","status":"success"}'
```

---

## 🗂️ Project Structure

```
Cross-Border-Payment-System-/
├── ARCHITECTURE.md              # System design
├── PROJECT_DOCUMENTATION.md     # Full docs
├── JUDGE_QA_GUIDE.md           # Hackathon defense
├── SETUP_GUIDE.md              # This file
├── backend-server.js           # Express server
├── PaymentFlow.jsx             # React component
├── package.json                # Dependencies
├── .env.example                # Environment template
├── .env                        # Your API keys (NOT in git)
└── README.md                   # Quick readme
```

---

## 🧠 Understanding the Flow

### What happens when you click "Pay":

1. **Frontend** collects email, wallet, amount
2. **Backend** creates Dodo payment session
3. **Dodo** generates checkout link
4. **User** enters payment method (card/UPI)
5. **Dodo** processes payment securely
6. **Webhook** tells backend "payment done"
7. **Backend** calls Helius to send stablecoins
8. **Solana** confirms transaction
9. **Frontend** shows "Payment complete ✅"

---

## 🐛 Troubleshooting

### "Phantom not found"
- Make sure Phantom extension is installed
- Refresh browser
- Check browser console for errors

### "Cannot connect to Helius"
```bash
# Check API key is correct
echo $HELIUS_API_KEY

# Test Helius directly
curl https://rpc.helius.xyz/?api-key=YOUR_KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"getBalance","params":["11111111111111111111111111111111"],"id":1}'
```

### "Dodo webhook not arriving"
- Make sure ngrok is running
- Check webhook URL in Dodo dashboard matches ngrok URL
- Verify DODO_WEBHOOK_SECRET is correct

### "Transaction not confirming"
- Check Solana network status: https://status.solana.com
- Increase poll timeout in `pollTransactionConfirmation()`
- Switch to devnet if mainnet is congested

### Server crashes
```bash
# Check error logs
npm run dev 2>&1 | tee server.log

# Try fresh install
rm -rf node_modules
npm install
npm run dev
```

---

## 📊 Monitoring

### Check payment status
```bash
# In new terminal
curl http://localhost:3000/payment/p_1713567890
```

### View all payments (dev only)
Look in `backend-server.js` - add this endpoint:
```javascript
app.get('/payments-debug', (req, res) => {
  res.json(payments);
});
```

---

## 🚀 Next Steps

### Immediate (make it work)
1. ✅ Set up backend
2. ✅ Set up frontend
3. ✅ Test payment flow
4. ✅ Demo to judges

### Short-term (make it real)
1. Add MongoDB instead of in-memory storage
2. Implement proper error handling
3. Add transaction logging
4. Set up monitoring

### Medium-term (make it scale)
1. Add job queue for async processing
2. Implement caching
3. Add rate limiting
4. Multi-chain support

---

## 🎯 Demo for Judges

### 5-minute walkthrough
1. Show architecture diagram
2. Open live app → "Connect Phantom"
3. Fill form → "Next"
4. Show webhook in backend logs
5. Wait 30s for blockchain
6. Show transaction on Solana Explorer
7. Explain why this is better than existing solutions

---

## ❓ FAQ

**Q: Can I test on devnet instead of mainnet?**
A: Yes! In `.env`, change Helius RPC to devnet and use devnet SOL.

**Q: Do I need real money for testing?**
A: No, use testnet Solana and testnet USDC.

**Q: How do I get testnet SOL?**
A: Use Solana faucet: `solana airdrop 2` on devnet

**Q: Can I deploy this to production?**
A: Not yet—use testnet for hackathon. Production needs DB, security audits, monitoring.

**Q: What if I break something?**
A: Just `git checkout` to reset, or delete and re-clone.

---

## 💬 Need Help?

- Check [Solana Docs](https://docs.solana.com)
- Check [Dodo Docs](https://docs.dodopayments.com)
- Check [Helius Docs](https://docs.helius.xyz)
- Ask in [Solana Discord](https://discord.gg/solana)

---

## ✅ Ready to Demo?

Once everything works:
1. [ ] Backend running
2. [ ] Frontend connected to backend
3. [ ] Phantom wallet connected
4. [ ] Payment flow end-to-end
5. [ ] Webhook receiving events
6. [ ] Transaction visible on explorer

**You're ready for judges!** 🎉

Good luck with your hackathon submission! 🚀
