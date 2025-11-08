# Easy Way to Get Tokens - Step by Step

## Step 1: Find Your Address

1. Go to your DeFi app Home page
2. Look for: **"Your Account: 0x..."**
3. Copy that entire address (starts with `0x`)

## Step 2: Edit the Script

1. Open the file: `scripts/transferTokensEasy.js`
2. Find line 6 that says:
   ```javascript
   const recipientAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
   ```
3. **Replace** `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` with **YOUR address**
4. Save the file

## Step 3: Run the Script

In Command Prompt, run:

```bash
cd C:\Users\eshan\OneDrive\Desktop\BC_Honors_MP
npx hardhat run scripts/transferTokensEasy.js --network localhost
```

## Step 4: Wait for Confirmation

You should see:
```
✅ DFI tokens transferred!
✅ Reward tokens transferred!

=== ✅ Transfer Complete! ===
Your DFI Balance: 100000.0 DFI
Your REW Balance: 100000.0 REW

🎉 You can now use the app! Refresh your browser (F5).
```

## Step 5: Refresh Your App

1. Go back to your browser
2. Press **F5** to refresh
3. Your balances should now show 100,000 DFI and 100,000 REW!

---

## Example

If your address is `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`:

1. Open `scripts/transferTokensEasy.js`
2. Change line 6 to:
   ```javascript
   const recipientAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
   ```
3. Save
4. Run the command
5. Done!

---

**That's it! Much easier! 🎉**

