# Debug: Why Balances Show 0

## Quick Checks

### Step 1: Verify Account Addresses Match

1. **In your app**, look at the Home page
2. Find: **"Your Account: 0x..."** - This is the account connected in MetaMask
3. **In the CMD output**, you transferred to: `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`

**Do they match?**
- ✅ **If YES**: Continue to Step 2
- ❌ **If NO**: That's the problem! You transferred to a different account

### Step 2: Check Browser Console

1. Open your browser
2. Press **F12** (opens Developer Tools)
3. Click the **"Console"** tab
4. Look for any **red error messages**
5. Take a screenshot or copy the errors

### Step 3: Verify Contract Addresses

1. Open: `frontend/src/config/contractAddresses.json`
2. Check if addresses match what was deployed:
   - DFI Token: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
   - Reward Token: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`

### Step 4: Force Refresh

1. Press **Ctrl + Shift + R** (hard refresh - clears cache)
2. Or press **F5** (normal refresh)
3. Wait 5-10 seconds for balances to load

---

## Common Issues & Solutions

### Issue 1: Account Mismatch

**Problem**: You transferred tokens to Account A, but MetaMask is connected with Account B

**Solution**:
1. Check which account is connected in your app
2. If it's different, either:
   - Switch to the correct account in MetaMask, OR
   - Transfer tokens to the currently connected account

### Issue 2: Contract Addresses Wrong

**Problem**: Frontend is reading from wrong contracts

**Solution**:
1. Make sure `contractAddresses.json` has the correct addresses
2. If wrong, copy addresses from deployment output
3. Save the file
4. Refresh browser

### Issue 3: Network Mismatch

**Problem**: MetaMask is on wrong network

**Solution**:
1. In MetaMask, check network dropdown
2. Make sure it says **"Hardhat Local"**
3. If not, select it

### Issue 4: Browser Cache

**Problem**: Old data cached

**Solution**:
1. Press **Ctrl + Shift + R** (hard refresh)
2. Or clear browser cache
3. Refresh page

---

## Quick Fix: Transfer to Current Account

If your connected account is different, transfer tokens to it:

1. **Get your current account address** from the app (Home page)
2. **Edit** `scripts/transferTokensEasy.js`
3. **Change line 6** to your current address
4. **Run** the script again:
   ```bash
   npx hardhat run scripts/transferTokensEasy.js --network localhost
   ```
5. **Refresh** browser (F5)

---

## Still Not Working?

1. **Check browser console** (F12 → Console tab)
2. **Look for errors** - copy them
3. **Verify**:
   - Hardhat node is running
   - MetaMask is on "Hardhat Local"
   - Account addresses match
   - Contract addresses are correct

