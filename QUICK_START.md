# Quick Start Checklist

Follow these steps to get your DeFi project running:

## ✅ Setup Checklist

- [ ] Install Node.js (v16+) from nodejs.org
- [ ] Install MetaMask browser extension
- [ ] Run `npm install` in project root
- [ ] Run `cd frontend && npm install && cd ..`
- [ ] Start Hardhat node: `npx hardhat node` (keep running)
- [ ] Add Hardhat network to MetaMask (RPC: http://127.0.0.1:8545, Chain ID: 1337)
- [ ] Import a test account to MetaMask (copy private key from Hardhat node output)
- [ ] Deploy contracts: `npm run deploy:local`
- [ ] Verify addresses in `frontend/src/config/contractAddresses.json`
- [ ] Start frontend: `npm start`
- [ ] Connect wallet in the app
- [ ] Test staking, swapping, and viewing profile

## 🎯 What You Should See

### After Deployment:
- Contract addresses printed in terminal
- Addresses saved to `frontend/src/config/contractAddresses.json`

### In the App:
- Navbar with "Connect Wallet" button
- Home page showing welcome message
- Stake page with staking interface
- Swap page with token swap
- Profile page with balances

### In MetaMask:
- Network shows "Hardhat Local"
- Account has test ETH for gas fees
- Transactions pop up for approval

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| MetaMask not connecting | Refresh page, check extension is enabled |
| No tokens to stake | Import Account #0 (deployer) which has 1M DFI tokens |
| Transactions failing | Check you have ETH for gas, verify network |
| Frontend errors | Check contract addresses, ensure blockchain is running |

## 📝 Next Steps

1. Test all features (stake, swap, profile)
2. Take screenshots for your report
3. Document your experience
4. Submit your project!

---

**Time to complete setup: ~15-20 minutes**

