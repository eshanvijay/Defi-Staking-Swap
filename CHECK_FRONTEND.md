# Frontend Balance Issue - Debugging Steps

## ✅ Good News: Tokens ARE on Blockchain!

The verification script confirms:
- **DFI Balance**: 950,000 DFI ✅
- **REW Balance**: 900,000 REW ✅

So the problem is the frontend not reading them correctly.

---

## Step 1: Check Browser Console (IMPORTANT!)

1. **Open your browser** (the app tab)
2. **Press F12** (opens Developer Tools)
3. **Click "Console" tab**
4. **Look for**:
   - Red error messages
   - Messages starting with "Loading balances for account:"
   - Any errors about contracts or addresses

**What to look for:**
- ❌ "Contract addresses not found"
- ❌ "Cannot read property 'balanceOf'"
- ❌ Network errors
- ❌ "Invalid address" errors

**Copy any red errors you see!**

---

## Step 2: Verify Contract Addresses

1. Open: `frontend/src/config/contractAddresses.json`
2. It should have:
   ```json
   {
     "tokenAddress": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
     "rewardTokenAddress": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
     "stakingPoolAddress": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
     "tokenSwapAddress": "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
     "network": "localhost"
   }
   ```

3. **If addresses are different or empty**, that's the problem!

---

## Step 3: Check Network in MetaMask

1. **Open MetaMask**
2. **Check the network dropdown** (top)
3. **Make sure it says "Hardhat Local"**
4. **If not**, select it

---

## Step 4: Hard Refresh

1. **Close the browser tab** completely
2. **Reopen** `http://localhost:3000`
3. **Connect wallet again**
4. **Wait 10 seconds** for balances to load

---

## Step 5: Check if Frontend is Running

Make sure:
- ✅ `hardhat node` is running (Terminal 1)
- ✅ `npm start` is running (Terminal 2)
- ✅ Browser is open to `http://localhost:3000`

---

## Most Likely Issues:

1. **Contract addresses wrong** - Check `contractAddresses.json`
2. **Network mismatch** - MetaMask on wrong network
3. **JavaScript error** - Check browser console (F12)
4. **Frontend not connected** - Reconnect wallet

---

## Quick Fix: Reconnect Wallet

1. **Disconnect** wallet in MetaMask (if possible)
2. **Refresh** the app page
3. **Click "Connect Wallet"** again
4. **Approve** in MetaMask
5. **Wait** for balances to load

---

**Please check the browser console (F12) and tell me what errors you see!**

