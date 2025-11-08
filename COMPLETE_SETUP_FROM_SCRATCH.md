# COMPLETE SETUP GUIDE - FROM THE VERY BEGINNING

## PART 1: SETTING UP METAMASK (DO THIS FIRST!)

### Step 1.1: Check if You Have MetaMask Installed

1. Look at your browser (Chrome, Firefox, Edge, etc.)
2. Look at the top-right corner for a fox icon 🦊
3. If you see it, MetaMask is installed ✅
4. If you DON'T see it:
   - Go to https://metamask.io/
   - Click "Download"
   - Install it
   - Restart your browser

### Step 1.2: Open MetaMask

1. Click the fox icon 🦊 in your browser (top-right)
2. OR click the puzzle piece icon (extensions) and click MetaMask

### Step 1.3: Create or Import a Wallet

**You have TWO options:**

#### OPTION A: Create a NEW Wallet (If you're completely new)

1. MetaMask will ask you to "Get Started"
2. Click "Create a Wallet"
3. It will ask if you want to help improve MetaMask - choose "No thanks" or "I agree" (your choice)
4. **IMPORTANT**: It will show you a "Secret Recovery Phrase"
   - This is 12 words like: "apple banana cat dog..."
   - **WRITE THIS DOWN ON PAPER!** Don't save it on your computer!
   - Click each word in order to confirm you wrote it down
5. Create a password (remember this!)
6. Click "Create" or "Confirm"
7. **DONE!** You now have Account 1 ✅

#### OPTION B: Import an EXISTING Wallet (If you already have one)

1. Click "Import wallet" or "Import using Secret Recovery Phrase"
2. Enter your 12-word recovery phrase
3. Create a password
4. Click "Import"

### Step 1.4: You Should Now See "Account 1"

- You're in MetaMask
- You see "Account 1" with $0.00 balance
- This is NORMAL - you don't have real money yet
- We'll add test money later

**✅ STOP HERE - Tell me when you see Account 1!**

---

## PART 2: START THE BLOCKCHAIN (DO THIS IN TERMINAL)

### Step 2.1: Open Command Prompt

1. Press `Windows Key + R`
2. Type: `cmd`
3. Press Enter
4. A black window opens - this is Command Prompt

### Step 2.2: Go to Your Project Folder

In the Command Prompt, type this EXACTLY:

```bash
cd C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
```

Press Enter.

You should see:
```
C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP>
```

### Step 2.3: Check if Node.js is Installed

Type:
```bash
node --version
```

Press Enter.

- **If you see a number** (like `v18.17.0`): ✅ Good! Skip to Step 2.4
- **If you see an error**: 
  - Go to https://nodejs.org/
  - Download the LTS version (big green button)
  - Install it
  - Close and reopen Command Prompt
  - Try `node --version` again

### Step 2.4: Install Project Files (First Time Only)

Type this and press Enter:
```bash
npm install
```

**Wait 2-5 minutes** - you'll see lots of text scrolling. This is normal!

When it's done, you'll see something like:
```
added 500 packages
```

Then type:
```bash
cd frontend
npm install
cd ..
```

**Wait another 2-5 minutes.**

### Step 2.5: Start the Blockchain

Type this EXACTLY:
```bash
npx hardhat node
```

Press Enter.

**IMPORTANT**: 
- Keep this window open!
- Don't close it!
- You should see text like:

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

**✅ GOOD! The blockchain is running!**

**KEEP THIS WINDOW OPEN!** Don't close it!

---

## PART 3: ADD NETWORK TO METAMASK

### Step 3.1: Open MetaMask

1. Click the fox icon 🦊 in your browser
2. Make sure you see "Account 1" (or your account)

### Step 3.2: Click Network Dropdown

1. At the top of MetaMask, you'll see a dropdown
2. It might say "Ethereum Mainnet" or "Sepolia" or something
3. **Click on it** (the dropdown arrow)

### Step 3.3: Click "Add Network"

1. Scroll down if needed
2. Click "Add Network" or "Add a network manually"
3. A form will open

### Step 3.4: Fill in the Form EXACTLY

Fill in these fields **EXACTLY** as shown:

**Network Name:**
```
Hardhat Local
```

**New RPC URL:**
```
http://127.0.0.1:8545
```
⚠️ **IMPORTANT**: Must start with `http://` (not just `127.0.0.1:8545`)

**Chain ID:**
```
1337
```

**Currency Symbol:**
```
ETH
```

**Block Explorer URL:** (leave this EMPTY - don't type anything)

### Step 3.5: Click "Save"

1. Make sure the Hardhat node is still running (Step 2.5)
2. Click the "Save" button
3. If you see an error, check:
   - Is Hardhat node running? (Step 2.5)
   - Did you type `http://` in the RPC URL?
   - Did you type `ETH` in Currency Symbol?

### Step 3.6: Select the Network

1. After saving, MetaMask should switch to "Hardhat Local"
2. If not, click the network dropdown
3. Select "Hardhat Local"

**✅ You should now see "Hardhat Local" at the top of MetaMask!**

---

## PART 4: IMPORT TEST ACCOUNT TO METAMASK

### Step 4.1: Get the Private Key

1. Look at the Command Prompt window where `hardhat node` is running
2. Find "Account #0" (the first account)
3. Find the line that says "Private Key:"
4. Copy the ENTIRE private key (it's a long string starting with `0x`)
   - Example: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - Right-click and select "Mark" in Command Prompt
   - Select the entire private key
   - Press Enter to copy it

### Step 4.2: Import to MetaMask

1. In MetaMask, click the account icon (circle with fox face) in top-right
2. Click "Import Account"
3. Select "Private Key" (or it might be selected already)
4. Paste the private key you copied
5. Click "Import"

### Step 4.3: Verify

1. You should now see TWO accounts in MetaMask:
   - Account 1 (your original - $0.00)
   - Account 2 (the imported one - should show ETH balance)
2. Click on the imported account (Account 2)
3. You should see it has "10000 ETH" or similar
4. Make sure "Hardhat Local" network is selected

**✅ Perfect! You now have a test account with ETH!**

---

## PART 5: DEPLOY CONTRACTS

### Step 5.1: Open a NEW Command Prompt

1. **DON'T CLOSE** the window running `hardhat node`
2. Open a **NEW** Command Prompt window
3. Press `Windows Key + R`
4. Type `cmd` and press Enter

### Step 5.2: Go to Project Folder (Again)

In the NEW Command Prompt, type:
```bash
cd C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
```

Press Enter.

### Step 5.3: Deploy Contracts

Type:
```bash
npm run deploy:local
```

Press Enter.

**Wait 30-60 seconds.**

You should see:
```
Deploying contracts with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
...
DeFi Token deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
...
Contract addresses saved to frontend/src/config/contractAddresses.json
```

**✅ Contracts deployed!**

---

## PART 6: START THE FRONTEND APP

### Step 6.1: In the Same Command Prompt (Not the Hardhat one)

Make sure you're in the project folder:
```bash
cd C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
```

### Step 6.2: Start the App

Type:
```bash
npm start
```

Press Enter.

**Wait 30-60 seconds.**

You should see:
```
Compiled successfully!

You can now view defi-frontend in the browser.

  Local:            http://localhost:3000
```

**Your browser should automatically open!**

If not, manually open your browser and go to: `http://localhost:3000`

---

## PART 7: CONNECT WALLET IN THE APP

### Step 7.1: You Should See the App

- Dark blue navigation bar at top
- "DeFi DApp" on the left
- "Connect Wallet" button on the right
- Welcome message

### Step 7.2: Connect MetaMask

1. Click the **"Connect Wallet"** button (top-right)
2. MetaMask popup will appear
3. Make sure you're on the imported account (Account 2 - the one with ETH)
4. Click **"Next"**
5. Click **"Connect"**

### Step 7.3: Verify Connection

1. MetaMask popup closes
2. In the app, you should see: "Connected: 0xf39F..." (your wallet address)
3. On the Home page, you should see token balances

**✅ SUCCESS! Your app is running!**

---

## SUMMARY: WHAT YOU NEED RUNNING

You need **TWO Command Prompt windows open**:

**Window 1:**
- Running: `npx hardhat node`
- **KEEP THIS OPEN!**

**Window 2:**
- Running: `npm start`
- **KEEP THIS OPEN!**

**If you close either window, that part stops working!**

---

## TROUBLESHOOTING

### Problem: "Could not fetch chain ID" in MetaMask
**Solution:**
- Make sure `hardhat node` is running (Step 2.5)
- Check RPC URL has `http://` at the start
- Try clicking "Save" again

### Problem: MetaMask shows "Wrong Network"
**Solution:**
- Click network dropdown
- Select "Hardhat Local"

### Problem: Can't see Account 2 in MetaMask
**Solution:**
- Make sure you imported the private key correctly
- Check you're on "Hardhat Local" network
- Try importing again

### Problem: App shows errors
**Solution:**
- Make sure BOTH terminals are running (hardhat node AND npm start)
- Refresh the browser page (F5)
- Check browser console (F12 → Console tab)

### Problem: "npm: command not found"
**Solution:**
- Install Node.js from nodejs.org
- Restart Command Prompt

---

## QUICK CHECKLIST

Before connecting wallet:
- [ ] MetaMask installed and Account 1 created
- [ ] Hardhat node running (Window 1)
- [ ] Network "Hardhat Local" added to MetaMask
- [ ] Test account imported (Account 2 with ETH)
- [ ] Contracts deployed (Window 2)
- [ ] Frontend running (Window 2)
- [ ] Browser open to localhost:3000

---

**Follow these steps ONE BY ONE. Don't skip any step!**

**Tell me which step you're on if you get stuck!**

