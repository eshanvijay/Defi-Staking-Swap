# 🚀 Quick Reference Card - DeFi Project

## 📌 Essential Information

### Test Account (Import to MetaMask)
```
Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### MetaMask Network Configuration
```
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 1337
Currency Symbol: ETH
```

---

## 🎯 Quick Start (3 Steps)

### Terminal 1: Start Blockchain
```bash
npx hardhat node
```
**Keep this running!**

### Terminal 2: Deploy & Setup
```bash
npx hardhat run scripts/deploy.js --network localhost
npx hardhat run scripts/transferTokensEasy.js --network localhost
```

### Terminal 3: Start Frontend
```bash
cd frontend
npm start
```

---

## 🔧 Common Commands

### Diagnostic
```bash
npx hardhat run scripts/diagnose.js --network localhost
```

### Check Balance
```bash
npx hardhat run scripts/checkBalance.js --network localhost
```

### Redeploy Everything
```bash
# Stop Hardhat node (Ctrl+C), then:
npx hardhat node                                          # Terminal 1
npx hardhat run scripts/deploy.js --network localhost     # Terminal 2
npx hardhat run scripts/transferTokensEasy.js --network localhost
cd frontend && npm start                                  # Terminal 3
```

---

## 🐛 Quick Fixes

### Problem: "Cannot connect to network"
**Solution:** Make sure Hardhat node is running in Terminal 1

### Problem: "Balance shows 0"
**Solution:** 
1. Check MetaMask is on "Hardhat Local" network
2. Check you're using the correct account (0xf39F...2266)
3. Run: `npx hardhat run scripts/transferTokensEasy.js --network localhost`
4. Hard refresh browser (Ctrl + Shift + R)

### Problem: "Transaction failed"
**Solution:**
1. MetaMask → Settings → Advanced → Clear activity tab data
2. Refresh browser

### Problem: "Nonce too high"
**Solution:** Restart Hardhat node and redeploy everything

---

## 📁 Important Files

- **Contract Addresses:** `frontend/src/config/contractAddresses.json`
- **Smart Contracts:** `contracts/` folder
- **Frontend Pages:** `frontend/src/pages/` folder
- **Deployment Script:** `scripts/deploy.js`

---

## 🎓 For Your Professor

### Project Features
1. ✅ ERC-20 Token Implementation (DeFi Token)
2. ✅ Token Staking with Rewards
3. ✅ Decentralized Token Swap
4. ✅ MetaMask Integration
5. ✅ Real-time Balance Updates
6. ✅ Transaction History
7. ✅ User Profile Dashboard

### Technologies Used
- **Frontend:** React.js, Ethers.js
- **Smart Contracts:** Solidity 0.8.20, OpenZeppelin
- **Development:** Hardhat, Node.js
- **Blockchain:** Ethereum (Local Network)

### Test Scenarios
1. **Staking:** Stake 1000 DFI → Earn REW rewards
2. **Swap:** Swap 100 DFI → Get ~200 REW
3. **Withdraw:** Withdraw staked tokens
4. **Claim:** Claim accumulated rewards

---

## 📞 Emergency Reset

If everything is broken:

```bash
# 1. Stop all terminals (Ctrl+C)

# 2. Terminal 1
npx hardhat node

# 3. Terminal 2 (wait for node to start)
npx hardhat run scripts/deploy.js --network localhost
npx hardhat run scripts/transferTokensEasy.js --network localhost

# 4. MetaMask
# Settings → Advanced → Clear activity tab data

# 5. Terminal 3
cd frontend
npm start

# 6. Browser
# Ctrl + Shift + R (hard refresh)
```

---

## ✅ Pre-Demo Checklist

- [ ] Hardhat node running
- [ ] Contracts deployed
- [ ] Tokens transferred
- [ ] MetaMask configured
- [ ] Frontend running
- [ ] Wallet connected
- [ ] Balances showing correctly
- [ ] Can stake tokens
- [ ] Can swap tokens
- [ ] Screenshots taken

---

**Need detailed help? See COMPLETE_FIX_GUIDE.md**
