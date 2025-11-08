# 🚀 Complete Fix Guide - DeFi Project Token Balance Issue

## Problem: Frontend Not Showing Token Balances

This guide will help you fix the issue where your DeFi project frontend shows 0 tokens even though you've connected MetaMask.

---

## 📋 Quick Diagnosis Checklist

Before we start fixing, let's identify the issue:

- [ ] Is Hardhat node running?
- [ ] Are contracts deployed?
- [ ] Is MetaMask connected to the correct network?
- [ ] Do you have the correct account address?
- [ ] Have tokens been transferred to your account?

---

## 🔧 Step-by-Step Fix Process

### STEP 1: Start the Local Blockchain

**Open a NEW terminal/command prompt** (keep it running throughout):

```bash
cd c:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
npx hardhat node
```

**What you should see:**
- A list of 20 accounts with addresses starting with `0x...`
- Each account has a private key
- The node is running on `http://127.0.0.1:8545`

**⚠️ IMPORTANT:** Keep this terminal window open! Don't close it.

**Copy Account #0's information:**
- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

---

### STEP 2: Configure MetaMask

#### A. Add Hardhat Local Network to MetaMask

1. Open MetaMask extension in your browser
2. Click the network dropdown (top left)
3. Click "Add Network" or "Add a network manually"
4. Enter these details:

   ```
   Network Name: Hardhat Local
   RPC URL: http://127.0.0.1:8545
   Chain ID: 1337
   Currency Symbol: ETH
   ```

5. Click "Save"
6. **Switch to "Hardhat Local" network** in MetaMask

#### B. Import Test Account to MetaMask

1. In MetaMask, click the account icon (top right)
2. Select "Import Account"
3. Paste the private key from Account #0:
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
4. Click "Import"
5. You should now see this account with 10,000 ETH

**✅ Checkpoint:** MetaMask should show:
- Network: "Hardhat Local"
- Account: `0xf39F...2266`
- Balance: ~10,000 ETH

---

### STEP 3: Deploy Smart Contracts

**Open a SECOND terminal/command prompt:**

```bash
cd c:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
npx hardhat run scripts/deploy.js --network localhost
```

**What you should see:**
- "Deploying contracts with account: 0xf39F..."
- Four contract addresses:
  - DeFi Token: `0x5FbDB...`
  - Reward Token: `0xe7f17...`
  - Staking Pool: `0x9fE46...`
  - Token Swap: `0xCf7Ed...`
- "Contract addresses saved to frontend/src/config/contractAddresses.json"

**✅ Checkpoint:** Check that `frontend/src/config/contractAddresses.json` has all four addresses.

---

### STEP 4: Transfer Tokens to Your Account

The deployer account (Account #0) now has 1,000,000 DFI and REW tokens. We need to transfer some to your MetaMask account.

**In the same terminal:**

```bash
npx hardhat run scripts/transferTokensEasy.js --network localhost
```

**What you should see:**
- "Transfer Complete!"
- "Your DFI Balance: 100000.0 DFI"
- "Your REW Balance: 100000.0 REW"

**✅ Checkpoint:** The script confirms tokens were transferred.

---

### STEP 5: Start the Frontend

**Open a THIRD terminal/command prompt:**

```bash
cd c:\Users\eshan\OneDrive\Desktop\BC_Honors_MP\frontend
npm start
```

**What you should see:**
- "Compiled successfully!"
- Browser opens at `http://localhost:3000`

**✅ Checkpoint:** The app loads without errors.

---

### STEP 6: Connect Wallet and Verify

1. **In the browser**, click "Connect Wallet" button
2. MetaMask popup appears - click "Next" then "Connect"
3. You should see:
   - "Your Account: 0xf39F...2266"
   - "DFI Token Balance: 100000.00"
   - "Reward Token Balance: 100000.00"

**🎉 SUCCESS!** Your tokens should now be visible!

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "Cannot connect to network"

**Symptoms:** Frontend shows connection errors

**Fix:**
1. Make sure Hardhat node is running (Step 1)
2. Check MetaMask is on "Hardhat Local" network
3. Refresh the page (F5)

---

### Issue 2: "Still showing 0 tokens"

**Symptoms:** Balances show 0.00 even after transfer

**Fix:**

1. **Check the connected account:**
   - Look at the address shown in your app
   - Compare with the address you transferred to
   - If different, switch accounts in MetaMask

2. **Verify transfer was successful:**
   ```bash
   npx hardhat run scripts/checkBalance.js --network localhost
   ```

3. **Hard refresh the browser:**
   - Press `Ctrl + Shift + R` (Windows)
   - Or clear cache and reload

4. **Check browser console for errors:**
   - Press `F12` to open Developer Tools
   - Click "Console" tab
   - Look for red error messages
   - Share them if you need help

---

### Issue 3: "Transaction Failed" errors

**Symptoms:** Can't stake or swap tokens

**Fix:**

1. **Reset MetaMask account:**
   - MetaMask → Settings → Advanced
   - Click "Clear activity tab data"
   - Refresh page

2. **Check you have ETH for gas:**
   - You should have ~10,000 ETH
   - If not, reimport the account

---

### Issue 4: "Nonce too high" error

**Symptoms:** Transactions fail with nonce error

**Fix:**

1. **Restart everything:**
   - Stop Hardhat node (Ctrl+C in terminal 1)
   - Start Hardhat node again
   - Redeploy contracts
   - Transfer tokens again
   - Refresh browser

2. **Reset MetaMask:**
   - MetaMask → Settings → Advanced
   - Click "Clear activity tab data"

---

## 📸 Screenshots for Your Professor

Take these screenshots to demonstrate your working project:

1. **Home Page:**
   - Shows connected wallet address
   - Shows DFI and REW token balances

2. **Stake Page:**
   - Enter amount and stake tokens
   - Show MetaMask confirmation popup
   - Show updated staked balance

3. **Swap Page:**
   - Enter swap amount
   - Show exchange rate calculation
   - Show MetaMask confirmation
   - Show updated balances

4. **Profile Page:**
   - Shows all balances
   - Shows staking information
   - Shows transaction history

5. **MetaMask:**
   - Show network is "Hardhat Local"
   - Show account balance
   - Show transaction history

---

## 🎯 Testing All Features

### Test 1: Staking Tokens

1. Go to "Stake" page
2. Enter amount: `1000`
3. Click "Stake Tokens"
4. Approve in MetaMask
5. Wait for confirmation
6. Verify:
   - DFI balance decreased by 1000
   - Staked amount shows 1000
   - Pending rewards start accumulating

### Test 2: Claiming Rewards

1. Wait 10-20 seconds (rewards accumulate)
2. Click "Claim Rewards"
3. Approve in MetaMask
4. Verify:
   - REW balance increased
   - Pending rewards reset to 0

### Test 3: Swapping Tokens

1. Go to "Swap" page
2. Enter DFI amount: `100`
3. See output: ~200 REW (1:2 ratio)
4. Click "Swap Tokens"
5. Approve in MetaMask
6. Verify:
   - DFI balance decreased
   - REW balance increased

### Test 4: Withdrawing Stake

1. Go to "Stake" page
2. Enter amount to withdraw
3. Click "Withdraw"
4. Approve in MetaMask
5. Verify:
   - Staked amount decreased
   - DFI balance increased

---

## 📝 Quick Reference Commands

**Start Hardhat Node:**
```bash
npx hardhat node
```

**Deploy Contracts:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

**Transfer Tokens:**
```bash
npx hardhat run scripts/transferTokensEasy.js --network localhost
```

**Check Balance:**
```bash
npx hardhat run scripts/checkBalance.js --network localhost
```

**Start Frontend:**
```bash
cd frontend
npm start
```

---

## 🔄 If You Need to Start Fresh

If something goes wrong and you want to start completely fresh:

1. **Stop all running processes:**
   - Ctrl+C in all terminal windows

2. **Restart Hardhat node:**
   ```bash
   npx hardhat node
   ```

3. **Redeploy contracts:**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

4. **Transfer tokens:**
   ```bash
   npx hardhat run scripts/transferTokensEasy.js --network localhost
   ```

5. **Clear MetaMask:**
   - Settings → Advanced → Clear activity tab data

6. **Restart frontend:**
   ```bash
   cd frontend
   npm start
   ```

7. **Hard refresh browser:**
   - Ctrl + Shift + R

---

## ✅ Final Checklist Before Showing to Professor

- [ ] Hardhat node is running
- [ ] Contracts are deployed
- [ ] Tokens are in your account
- [ ] Frontend is running
- [ ] MetaMask is connected
- [ ] All balances show correctly
- [ ] Can stake tokens successfully
- [ ] Can claim rewards successfully
- [ ] Can swap tokens successfully
- [ ] Transaction history shows in Profile
- [ ] Screenshots are taken
- [ ] Project explanation is ready

---

## 🎓 Explaining Your Project to Professor

### Key Points to Mention:

1. **Technology Stack:**
   - Frontend: React.js with Ethers.js
   - Smart Contracts: Solidity with OpenZeppelin
   - Development: Hardhat framework
   - Blockchain: Local Ethereum network

2. **Smart Contracts:**
   - **DeFiToken.sol**: ERC-20 token implementation
   - **StakingPool.sol**: Allows users to stake tokens and earn rewards
   - **TokenSwap.sol**: Decentralized exchange for token swapping

3. **Features Implemented:**
   - Wallet connection with MetaMask
   - Real-time balance updates
   - Token staking with reward mechanism
   - Token swapping functionality
   - Transaction history tracking
   - User profile dashboard

4. **Security Features:**
   - OpenZeppelin's audited contracts
   - Proper approval mechanisms
   - Reentrancy protection
   - Owner-only functions

5. **User Experience:**
   - Clean, modern UI
   - Real-time updates
   - Transaction confirmations
   - Error handling

---

## 🆘 Still Having Issues?

If you're still facing problems:

1. Check all three terminals are running
2. Verify MetaMask network is "Hardhat Local"
3. Check browser console (F12) for errors
4. Make sure you're using the correct account
5. Try the "Start Fresh" process above

**Good luck with your presentation! 🚀**
