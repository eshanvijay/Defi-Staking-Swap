# Complete Beginner's Guide - Step by Step

## You're Here: MetaMask is Installed ✅

Great! Now let's get your project running. Follow these steps carefully.

---

## STEP 1: Open Terminal/Command Prompt

### On Windows:
1. Press `Windows Key + R`
2. Type `cmd` and press Enter
   - OR press `Windows Key`, type "Command Prompt", and click it
   - OR right-click the Start button → "Windows PowerShell" or "Terminal"

3. Navigate to your project folder:
   ```bash
   cd C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
   ```
   (Press Enter after typing)

**Tip**: You should see something like:
```
C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP>
```

---

## STEP 2: Install Node.js (If Not Already Installed)

1. Check if Node.js is installed:
   ```bash
   node --version
   ```
   - If you see a version number (like `v18.17.0`), you're good! Skip to Step 3.
   - If you see "command not found" or an error, continue:

2. Download Node.js:
   - Go to: https://nodejs.org/
   - Click the big green "LTS" button (recommended version)
   - Install it (just click Next, Next, Install)
   - Restart your terminal/command prompt after installation

3. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   Both should show version numbers.

---

## STEP 3: Install Project Dependencies

In your terminal (make sure you're in the project folder), run:

```bash
npm install
```

**What this does**: Downloads all the backend tools needed (Hardhat, etc.)

**Wait for it to finish** - it might take 2-5 minutes. You'll see lots of text scrolling.

When done, you should see something like:
```
added 500 packages, and audited 501 packages
```

### Now install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

**What this does**: Downloads React and frontend tools.

**Wait for it to finish** - another 2-5 minutes.

---

## STEP 4: Configure MetaMask for Local Network

### 4.1: Open MetaMask

1. Click the MetaMask extension icon in your browser (usually a fox icon in the top-right)
2. If it asks you to create a wallet or import:
   - **If you're new**: Create a new wallet, save the seed phrase safely
   - **If you have a wallet**: Import it

### 4.2: Add Local Network

1. Click the network dropdown at the top (might say "Ethereum Mainnet")
2. Click "Add Network" or "Add a network manually"
3. Fill in these details exactly:

   **Network Name:**
   ```
   Hardhat Local
   ```

   **New RPC URL:**
   ```
   http://127.0.0.1:8545
   ```

   **Chain ID:**
   ```
   1337
   ```

   **Currency Symbol:**
   ```
   ETH
   ```

   **Block Explorer URL:** (leave empty)

4. Click "Save"

5. Select "Hardhat Local" from the network dropdown

---

## STEP 5: Start Local Blockchain

### 5.1: Open a NEW Terminal Window

**Important**: Keep your current terminal open, but open a SECOND one.

**On Windows:**
- Press `Windows Key + R`
- Type `cmd` and press Enter
- Navigate to project:
  ```bash
  cd C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
  ```

### 5.2: Start Hardhat Node

In the NEW terminal, type:

```bash
npx hardhat node
```

**What this does**: Starts a fake blockchain on your computer for testing.

**You should see:**
```
Started HTTP server on http://127.0.0.1:8545

Accounts
========
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
...
```

**KEEP THIS TERMINAL OPEN!** The blockchain must keep running.

---

## STEP 6: Import Test Account to MetaMask

### 6.1: Copy a Private Key

1. Look at the terminal where `hardhat node` is running
2. Find "Account #0" (the first account)
3. Copy the "Private Key" (the long string starting with `0x`)

Example:
```
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### 6.2: Import to MetaMask

1. Open MetaMask
2. Click the account icon (circle with fox face) in the top-right
3. Click "Import Account"
4. Select "Private Key"
5. Paste the private key you copied
6. Click "Import"

**You should now see:**
- The account with address starting with `0xf39F...`
- Balance showing "10000 ETH" (this is test ETH, not real!)

---

## STEP 7: Deploy Smart Contracts

### 7.1: Go Back to Your First Terminal

(Not the one running `hardhat node` - use the other terminal)

Make sure you're in the project folder:
```bash
cd C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
```

### 7.2: Deploy Contracts

Run this command:

```bash
npm run deploy:local
```

**What this does**: Deploys your smart contracts to the local blockchain.

**Wait for it** - takes about 30 seconds to 1 minute.

**You should see output like:**
```
Deploying contracts with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 10000000000000000000000

1. Deploying DeFi Token...
DeFi Token deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3

2. Deploying Reward Token...
Reward Token deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

3. Deploying Staking Pool...
Staking Pool deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

4. Deploying Token Swap...
Token Swap deployed to: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

=== Deployment Summary ===
...
Contract addresses saved to frontend/src/config/contractAddresses.json
```

**✅ Success!** Your contracts are deployed!

---

## STEP 8: Verify Contract Addresses

### 8.1: Check the File

1. Open File Explorer
2. Navigate to: `C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP\frontend\src\config\`
3. Open `contractAddresses.json`

**It should look like:**
```json
{
  "tokenAddress": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "rewardTokenAddress": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  "stakingPoolAddress": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  "tokenSwapAddress": "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
  "network": "localhost"
}
```

**If the file is empty or has empty addresses:**
- Copy the addresses from the deployment output
- Paste them into the file manually
- Save the file

---

## STEP 9: Start the Frontend

### 9.1: In Your First Terminal

(Not the one running `hardhat node`)

Make sure you're in the project root:
```bash
cd C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
```

### 9.2: Start React App

Run:

```bash
npm start
```

**What this does**: Starts the web application.

**Wait for it** - takes about 30 seconds.

**You should see:**
```
Compiled successfully!

You can now view defi-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Your browser should automatically open** to `http://localhost:3000`

If it doesn't, manually open your browser and go to: `http://localhost:3000`

---

## STEP 10: Connect Wallet in the App

### 10.1: You Should See the App

- A dark blue navigation bar at the top
- "DeFi DApp" logo on the left
- "Connect Wallet" button on the right
- Welcome message on the page

### 10.2: Connect MetaMask

1. Click the **"Connect Wallet"** button (top-right)
2. MetaMask popup will appear
3. Click **"Next"**
4. Click **"Connect"**
5. MetaMask will close

**You should now see:**
- "Connected: 0xf39F..." in the navbar (your wallet address)
- Your token balances on the Home page

---

## STEP 11: Get Some Tokens to Use

The account you imported (Account #0) is the deployer and has **1,000,000 DFI tokens**!

But you need to see them in the app. The app should automatically show your balances.

**If you don't see tokens:**
- Refresh the page (F5)
- Make sure you're connected to "Hardhat Local" network in MetaMask
- Check that contract addresses are correct

---

## STEP 12: Test the App!

### Test Staking:
1. Go to **"Stake"** page (click in navbar)
2. Enter an amount (like `100`)
3. Click **"Stake Tokens"**
4. MetaMask will pop up - click **"Confirm"**
5. Wait for confirmation
6. You should see your staked balance update!

### Test Swapping:
1. Go to **"Swap"** page
2. Enter an amount (like `50`)
3. See the output amount calculated
4. Click **"Swap Tokens"**
5. Approve in MetaMask
6. Confirm the swap
7. Your balances should update!

### View Profile:
1. Go to **"Profile"** page
2. See your:
   - Wallet address
   - Token balances
   - Staked amount
   - Transaction history

---

## 🎉 Success! Your Project is Running!

You should now have:
- ✅ Local blockchain running (in one terminal)
- ✅ Frontend app running (in another terminal)
- ✅ MetaMask connected
- ✅ Contracts deployed
- ✅ Tokens available

---

## ⚠️ Important: Keep These Running

**You need TWO terminals open:**
1. **Terminal 1**: Running `npx hardhat node` (blockchain)
2. **Terminal 2**: Running `npm start` (frontend)

**If you close either terminal, that part will stop working!**

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"
**Solution**: Install Node.js from nodejs.org

### Problem: MetaMask says "Wrong Network"
**Solution**: 
- Click network dropdown in MetaMask
- Select "Hardhat Local"
- If it's not there, add it again (Step 4)

### Problem: "Contract addresses not found"
**Solution**: 
- Re-run `npm run deploy:local`
- Check `frontend/src/config/contractAddresses.json` has addresses

### Problem: "Insufficient balance"
**Solution**: 
- Make sure you imported Account #0 (the deployer)
- That account has 1,000,000 DFI tokens

### Problem: Frontend shows errors
**Solution**: 
- Check browser console (F12 → Console tab)
- Make sure `hardhat node` is still running
- Refresh the page (F5)

### Problem: Transactions failing
**Solution**: 
- Make sure you have ETH in MetaMask (you should have 10000 ETH)
- Check you're on "Hardhat Local" network
- Try refreshing the page

---

## 📝 Quick Reference

**To start everything:**
1. Terminal 1: `npx hardhat node` (keep running)
2. Terminal 2: `npm run deploy:local` (run once)
3. Terminal 2: `npm start` (keep running)

**To stop:**
- Press `Ctrl + C` in each terminal

**To restart:**
- If you close terminals, just run the commands again
- You'll need to redeploy contracts if you restart the blockchain

---

## 🎓 What You Learned

You just:
- ✅ Set up a local blockchain
- ✅ Deployed smart contracts
- ✅ Connected a wallet to a DApp
- ✅ Interacted with blockchain contracts
- ✅ Ran a full-stack blockchain application!

**Congratulations!** 🎉

---

**Need more help?** Check `SETUP_INSTRUCTIONS.md` for more details!

