# Quick Setup Guide - DeFi Mini Project

## Step-by-Step Setup Instructions

### 1. Install MetaMask (If Not Already Installed)

1. Go to https://metamask.io/
2. Click "Download" and choose your browser (Chrome, Firefox, etc.)
3. Install the extension
4. Create a new wallet OR import an existing one
5. **IMPORTANT**: Save your seed phrase in a safe place!

### 2. Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
cd frontend
npm install
cd ..
```

### 3. Start Local Blockchain

**Option A: Using Hardhat (Easier)**

Open a new terminal and run:

```bash
npx hardhat node
```

Keep this terminal open! You'll see accounts with private keys listed.

**Option B: Using Ganache**

1. Download Ganache from https://trufflesuite.com/ganache/
2. Install and open Ganache
3. Create a new workspace
4. Click "Start" to run the blockchain

### 4. Connect MetaMask to Local Network

1. Open MetaMask extension
2. Click network dropdown (top left, might say "Ethereum Mainnet")
3. Click "Add Network" → "Add a network manually"
4. Enter these details:

   **For Hardhat:**
   - Network Name: `Hardhat Local`
   - New RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`

   **For Ganache:**
   - Network Name: `Ganache Local`
   - New RPC URL: `http://127.0.0.1:7545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`

5. Click "Save"

### 5. Import Test Account to MetaMask

1. Look at the terminal where `hardhat node` is running (or Ganache window)
2. You'll see accounts listed like:

   ```
   Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

3. Copy a private key (the long hex string starting with 0x)
4. In MetaMask:
   - Click account icon (circle with fox face, top right)
   - Click "Import Account"
   - Paste the private key
   - Click "Import"

5. You should now see the account with test ETH!

### 6. Deploy Smart Contracts

1. Make sure your local blockchain is running (Step 3)
2. In the project root terminal, run:

```bash
npm run deploy:local
```

Or:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Wait for deployment to complete
4. You'll see output like:

```
DeFi Token deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Staking Pool deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
...
```

5. The addresses are automatically saved to `frontend/src/config/contractAddresses.json`

### 7. Verify Contract Addresses

Open the file: `frontend/src/config/contractAddresses.json`

It should look like:

```json
{
  "tokenAddress": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "rewardTokenAddress": "0x...",
  "stakingPoolAddress": "0x...",
  "tokenSwapAddress": "0x...",
  "network": "localhost"
}
```

If it's empty, copy the addresses from the deployment output and paste them manually.

### 8. Start the Frontend

In the project root terminal, run:

```bash
npm start
```

Or:

```bash
cd frontend
npm start
```

The browser should automatically open to `http://localhost:3000`

### 9. Connect Your Wallet

1. Click "Connect Wallet" button in the top right
2. MetaMask will pop up asking to connect
3. Click "Next" then "Connect"
4. You should see "Connected: 0x..." in the navbar

### 10. Get Some Tokens

The deployer account (Account #0) has 1,000,000 DFI tokens. To get tokens:

**Option A: Use the deployer account**
- Import Account #0's private key to MetaMask
- Use that account to interact with the app

**Option B: Transfer tokens**
- You can add a function to transfer tokens, or
- Use MetaMask to send tokens from deployer to your account

### 11. Test the App!

1. **Stake Tokens**: Go to Stake page, enter amount, click "Stake Tokens"
2. **Claim Rewards**: On Stake page, click "Claim Rewards" when you have pending rewards
3. **Swap Tokens**: Go to Swap page, enter amount, click "Swap Tokens"
4. **View Profile**: Go to Profile page to see your balances and transaction history

## Common Issues & Solutions

### "MetaMask not detected"
- Make sure MetaMask extension is installed and enabled
- Refresh the page
- Try a different browser

### "Transaction failed"
- Make sure you have ETH in your account (for gas fees)
- Check you're on the correct network (Hardhat/Ganache)
- Verify contract addresses are correct

### "Insufficient balance"
- The deployer account has all the tokens
- Import Account #0 private key to MetaMask to use it
- Or transfer tokens from deployer to your account

### Frontend shows errors
- Make sure local blockchain is running
- Verify contract addresses in `contractAddresses.json`
- Check browser console for specific errors

### Contracts not deploying
- Make sure `hardhat node` or Ganache is running
- Check you're using the correct network (localhost)
- Verify Node.js version (should be v16+)

## Need Help?

1. Check the main README.md for detailed documentation
2. Check browser console for error messages
3. Verify all steps were completed correctly
4. Make sure all terminals are open and services are running

## What Each Terminal Should Be Running

**Terminal 1**: `npx hardhat node` (or Ganache)
**Terminal 2**: `npm start` (frontend)

**Terminal 3**: (Optional) For deploying contracts

---

**You're all set! Happy coding! 🎉**

