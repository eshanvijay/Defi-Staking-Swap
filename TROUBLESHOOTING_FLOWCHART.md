# 🔧 Troubleshooting Flowchart

## Problem: Token Balances Show 0

```
START: Token balances showing 0
│
├─ Is Hardhat node running?
│  │
│  ├─ NO → Open terminal and run: npx hardhat node
│  │       Then go to next step
│  │
│  └─ YES → Continue
│
├─ Are contracts deployed?
│  │
│  ├─ NO → Run: npx hardhat run scripts/deploy.js --network localhost
│  │       Then go to next step
│  │
│  ├─ DON'T KNOW → Check if frontend/src/config/contractAddresses.json exists
│  │                and has addresses
│  │
│  └─ YES → Continue
│
├─ Is MetaMask on correct network?
│  │
│  ├─ NO → Switch to "Hardhat Local" network
│  │       (Chain ID: 1337, RPC: http://127.0.0.1:8545)
│  │
│  └─ YES → Continue
│
├─ Which account is connected in MetaMask?
│  │
│  ├─ Not 0xf39F...2266 → Either:
│  │                       A) Switch to this account in MetaMask, OR
│  │                       B) Edit scripts/transferTokensEasy.js
│  │                          Change line 9 to your current address
│  │                          Run: npx hardhat run scripts/transferTokensEasy.js --network localhost
│  │
│  └─ Is 0xf39F...2266 → Continue
│
├─ Have tokens been transferred to this account?
│  │
│  ├─ NO → Run: npx hardhat run scripts/transferTokensEasy.js --network localhost
│  │       Wait for "Transfer Complete!" message
│  │
│  ├─ DON'T KNOW → Run: npx hardhat run scripts/checkBalance.js --network localhost
│  │                If balance is 0, run transfer script above
│  │
│  └─ YES → Continue
│
├─ Try browser refresh
│  │
│  ├─ Normal refresh (F5) → Still 0?
│  │
│  └─ Hard refresh (Ctrl+Shift+R) → Still 0?
│
├─ Check browser console for errors
│  │
│  ├─ Press F12 → Console tab
│  │
│  ├─ Red errors present?
│  │  │
│  │  ├─ "Cannot read property 'balanceOf'" → Contracts not loaded
│  │  │                                         Redeploy contracts
│  │  │
│  │  ├─ "Network error" → Hardhat node not running
│  │  │                    Start Hardhat node
│  │  │
│  │  ├─ "Invalid address" → Account address issue
│  │  │                      Reconnect MetaMask
│  │  │
│  │  └─ Other error → Copy error message and check documentation
│  │
│  └─ No errors → Continue
│
├─ Run diagnostic script
│  │
│  └─ npx hardhat run scripts/diagnose.js --network localhost
│     │
│     ├─ All checks pass → Frontend issue
│     │                    Restart frontend: cd frontend && npm start
│     │
│     └─ Some checks fail → Follow suggestions in diagnostic output
│
└─ STILL NOT WORKING?
   │
   └─ Nuclear option: Start completely fresh
      │
      1. Stop all terminals (Ctrl+C)
      2. Terminal 1: npx hardhat node
      3. Terminal 2: npx hardhat run scripts/deploy.js --network localhost
      4. Terminal 2: npx hardhat run scripts/transferTokensEasy.js --network localhost
      5. MetaMask: Settings → Advanced → Clear activity tab data
      6. Terminal 3: cd frontend && npm start
      7. Browser: Ctrl+Shift+R (hard refresh)
      8. Reconnect wallet in app
```

---

## Problem: Transaction Failed

```
START: Transaction failed in MetaMask
│
├─ Error: "Insufficient funds"
│  │
│  └─ FIX: Check ETH balance
│     Should have ~10,000 ETH
│     If not, reimport account with private key
│
├─ Error: "User rejected transaction"
│  │
│  └─ FIX: Click "Confirm" in MetaMask popup
│     (You clicked "Reject" by mistake)
│
├─ Error: "Nonce too high"
│  │
│  └─ FIX: Reset MetaMask
│     Settings → Advanced → Clear activity tab data
│     If still fails, restart Hardhat node and redeploy
│
├─ Error: "Gas estimation failed"
│  │
│  └─ FIX: Transaction will fail
│     Possible reasons:
│     - Insufficient token balance
│     - Token not approved (for swap/stake)
│     - Contract error
│     Check balance and try again
│
├─ Error: "Execution reverted"
│  │
│  └─ FIX: Smart contract rejected transaction
│     Common reasons:
│     - Trying to withdraw more than staked
│     - Insufficient balance for swap
│     - Not enough allowance
│     Check amounts and try again
│
└─ Other error
   │
   └─ FIX: Copy full error message
      Check browser console (F12)
      Look for specific error reason
```

---

## Problem: MetaMask Not Connecting

```
START: Cannot connect MetaMask
│
├─ Is MetaMask installed?
│  │
│  ├─ NO → Install from metamask.io
│  │       Create/import wallet
│  │       Then try again
│  │
│  └─ YES → Continue
│
├─ Is MetaMask unlocked?
│  │
│  ├─ NO → Enter password to unlock
│  │
│  └─ YES → Continue
│
├─ Click "Connect Wallet" button
│  │
│  ├─ No popup appears
│  │  │
│  │  └─ FIX: Check if MetaMask is enabled
│  │     Click MetaMask extension icon
│  │     Make sure it's not disabled
│  │
│  ├─ Popup appears but shows error
│  │  │
│  │  └─ FIX: Try these:
│  │     1. Refresh page (F5)
│  │     2. Restart browser
│  │     3. Disable other wallet extensions
│  │
│  └─ Popup appears, click "Next" then "Connect"
│
└─ Connected but shows wrong network
   │
   └─ FIX: Switch to "Hardhat Local" in MetaMask
      If network not in list, add it:
      Network Name: Hardhat Local
      RPC URL: http://127.0.0.1:8545
      Chain ID: 1337
      Currency Symbol: ETH
```

---

## Problem: Frontend Won't Start

```
START: Frontend won't start
│
├─ Error: "npm: command not found"
│  │
│  └─ FIX: Install Node.js from nodejs.org
│     Restart terminal after installation
│
├─ Error: "Cannot find module"
│  │
│  └─ FIX: Install dependencies
│     cd frontend
│     npm install
│     npm start
│
├─ Error: "Port 3000 already in use"
│  │
│  └─ FIX: Either:
│     A) Close other app using port 3000
│     B) Use different port: PORT=3001 npm start
│
├─ Error: "Failed to compile"
│  │
│  └─ FIX: Check error message
│     Usually syntax error in code
│     Fix the error and save file
│
└─ Starts but shows blank page
   │
   └─ FIX: Check browser console (F12)
      Look for errors
      Common issues:
      - Contract addresses not found
      - ABI files missing
      - Network connection error
```

---

## Problem: Hardhat Node Won't Start

```
START: Hardhat node won't start
│
├─ Error: "hardhat: command not found"
│  │
│  └─ FIX: Install dependencies
│     npm install
│     Then try: npx hardhat node
│
├─ Error: "Port 8545 already in use"
│  │
│  └─ FIX: Another Hardhat node is running
│     Find and close it:
│     Windows: netstat -ano | findstr :8545
│             taskkill /PID <PID> /F
│     Then start again
│
├─ Error: "Cannot find module"
│  │
│  └─ FIX: Install dependencies
│     npm install
│     npm install --save-dev hardhat
│
└─ Starts but immediately exits
   │
   └─ FIX: Check for errors in output
      Usually configuration issue
      Verify hardhat.config.js exists
```

---

## Quick Diagnostic Commands

Run these to check system status:

```bash
# 1. Check if Hardhat node is running
curl http://127.0.0.1:8545

# 2. Run full diagnostic
npx hardhat run scripts/diagnose.js --network localhost

# 3. Check token balances
npx hardhat run scripts/checkBalance.js --network localhost

# 4. Verify contract deployment
ls frontend/src/config/contractAddresses.json

# 5. Check frontend dependencies
cd frontend && npm list
```

---

## Emergency Contact Info

If nothing works:

1. **Take screenshots** of:
   - Terminal errors
   - Browser console errors
   - MetaMask screens
   - Code if you modified anything

2. **Document what you tried**:
   - List all commands you ran
   - Note any error messages
   - Describe what happened

3. **Check these files**:
   - `frontend/src/config/contractAddresses.json` - Should have 4 addresses
   - `hardhat.config.js` - Should be unchanged
   - `scripts/transferTokensEasy.js` - Check line 9 for correct address

4. **Last resort**: Delete and re-clone project
   - Backup any changes you made
   - Fresh start often solves mysterious issues

---

## Prevention Tips

To avoid issues in the future:

1. **Always keep Hardhat node running** while using the app
2. **Don't close the terminal** running Hardhat node
3. **Use the correct account** (0xf39F...2266)
4. **Stay on Hardhat Local network** in MetaMask
5. **Don't modify contract addresses** manually
6. **Run diagnostic script** before demo
7. **Test everything** 30 minutes before presentation

---

**Remember: Most issues are solved by restarting Hardhat node and redeploying! 🔄**
