# How to Get Tokens for Your Account

## Problem
You're seeing 0 balances because the deployer account (Account #0) has all the tokens, but you might be using a different account in MetaMask.

## Solution: Transfer Tokens to Your Account

### Step 1: Find Your Account Address

1. Open MetaMask
2. Click on your account (the one you're using in the app)
3. Copy the address (click to copy, or manually copy it)
   - It should look like: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

### Step 2: Transfer Tokens

Open Command Prompt and run:

```bash
cd C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
npx hardhat run scripts/transferTokens.js --network localhost YOUR_ADDRESS_HERE
```

**Replace `YOUR_ADDRESS_HERE` with your actual MetaMask address!**

**Example:**
```bash
npx hardhat run scripts/transferTokens.js --network localhost 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

### Step 3: Wait for Confirmation

You should see:
```
Transferring tokens...
Transferring DFI tokens...
✅ DFI tokens transferred!
Transferring Reward tokens...
✅ Reward tokens transferred!

=== Transfer Complete ===
Recipient DFI Balance: 100000.0 DFI
Recipient REW Balance: 100000.0 REW
```

### Step 4: Refresh the App

1. Go back to your browser
2. Refresh the page (F5)
3. Your balances should now show 100,000 DFI and 100,000 REW!

---

## Alternative: Use the Deployer Account

If you want to use the account that already has tokens:

1. In MetaMask, click the account icon (top-right)
2. Click "Import Account"
3. Copy the private key from Account #0 in your `hardhat node` terminal
4. Import it to MetaMask
5. Switch to that account
6. Refresh the app

**The deployer account has 1,000,000 DFI tokens!**

---

## Quick Check: Which Account Are You Using?

1. In the app, look at "Connected: 0x..." in the navbar
2. Compare it with Account #0 address from `hardhat node` terminal
3. If they match → You're using the right account (should have tokens)
4. If they don't match → You need to transfer tokens (use Step 2 above)

---

## Still Having Issues?

1. Make sure `hardhat node` is still running
2. Make sure you copied the address correctly (starts with `0x`)
3. Check browser console (F12) for errors
4. Try refreshing the page after transferring

