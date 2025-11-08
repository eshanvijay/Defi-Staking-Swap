# How to Find Your MetaMask Account Address

## Method 1: From MetaMask Extension (Easiest)

1. **Click on your account name** at the top of MetaMask
   - It says "Imported Account 1" or similar
   - Click on it (the text itself, not the dropdown arrow)

2. **The address will appear below** or you'll see a "Copy" button
   - The address looks like: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - It starts with `0x` and is about 42 characters long

3. **Click the address** or click "Copy" to copy it

---

## Method 2: From the App (What You're Connected With)

1. **Look at your DeFi app** (the browser tab with your app)
2. **Look at the top navigation bar**
3. **You'll see**: "Connected: 0xf39f...2266" (or similar)
4. **Click on that address** - it might copy it
5. **OR** - The full address is shown on the Home page under "Your Account:"

---

## Method 3: From MetaMask - Account Details

1. In MetaMask, click the **three dots (⋮)** or **account icon** (top-right)
2. Click **"Account Details"** or **"View on Explorer"**
3. The address will be shown there

---

## Method 4: Check the App Home Page

1. Go to your DeFi app Home page
2. Look for the text: **"Your Account: 0x..."**
3. That's your full address - you can copy it from there!

---

## Quick Visual Guide

**In MetaMask:**
```
┌─────────────────────────┐
│ Imported Account 1  ▼   │ ← Click here
│ 0xf39F...2266      [Copy]│ ← Address appears here
└─────────────────────────┘
```

**In Your App:**
```
┌─────────────────────────────┐
│ Connected: 0xf39f...2266   │ ← This is your address (shortened)
└─────────────────────────────┘

Or on Home page:
┌─────────────────────────────┐
│ Your Account:               │
│ 0xf39Fd6e51aad88F6F4ce6a... │ ← Full address here
└─────────────────────────────┘
```

---

## Once You Have the Address

Copy the address (it should look like: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`)

Then run this command (replace with YOUR address):

```bash
npx hardhat run scripts/transferTokens.js --network localhost 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

---

## Still Can't Find It?

**Easiest way:**
1. Go to your DeFi app Home page
2. Look for "Your Account: 0x..." 
3. Copy that entire address
4. Use it in the command above

