# DeFi Mini Project - Token Staking & Swap DApp

A decentralized finance (DeFi) application built with React frontend and Ethereum smart contracts. This project demonstrates token staking and token swapping functionality on the blockchain.

## Features

- 🔐 **Wallet Connection**: Connect with MetaMask wallet
- 💰 **Token Staking**: Stake DFI tokens and earn rewards over time
- 🔄 **Token Swap**: Swap between DFI and Reward tokens
- 📊 **Profile Dashboard**: View balances, staking info, and transaction history
- ⚡ **Real-time Updates**: Automatic balance and reward updates

## Project Structure

```
BC_Honors_MP/
├── contracts/              # Smart contracts
│   ├── DeFiToken.sol      # ERC20 token contract
│   ├── StakingPool.sol    # Staking contract
│   └── TokenSwap.sol      # Token swap contract
├── scripts/
│   └── deploy.js          # Deployment script
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Web3 context
│   │   └── utils/       # Utilities and ABIs
│   └── public/
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **npm** or **yarn** - Comes with Node.js
3. **MetaMask** browser extension - [Download](https://metamask.io/)
4. **Hardhat** - Will be installed with npm

## Installation Steps

### Step 1: Install Dependencies

Open a terminal in the project root directory and run:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

Or use the shortcut:

```bash
npm run install:all
```

### Step 2: Install MetaMask (if not already installed)

1. Go to [metamask.io](https://metamask.io/)
2. Click "Download" and choose your browser
3. Install the extension
4. Create a new wallet or import an existing one
5. **Important**: Save your seed phrase securely!

### Step 3: Set Up Local Blockchain

You have two options for running a local blockchain:

#### Option A: Using Hardhat Network (Recommended)

Hardhat comes with a built-in blockchain. Just run:

```bash
# In a new terminal window
npx hardhat node
```

This will start a local blockchain on `http://127.0.0.1:8545` with 20 test accounts pre-funded with ETH.

#### Option B: Using Ganache

1. Download [Ganache](https://trufflesuite.com/ganache/)
2. Install and open Ganache
3. Create a new workspace
4. Note the RPC URL (usually `http://127.0.0.1:7545`)

### Step 4: Configure MetaMask for Local Network

1. Open MetaMask extension
2. Click on the network dropdown (top left)
3. Select "Add Network" or "Add a network manually"
4. Enter the following details:

   **For Hardhat:**
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`

   **For Ganache:**
   - Network Name: `Ganache Local`
   - RPC URL: `http://127.0.0.1:7545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`

5. Click "Save"

### Step 5: Import Test Account to MetaMask

1. If using Hardhat, check the terminal where `hardhat node` is running
2. You'll see a list of accounts with private keys like:
   ```
   Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
3. In MetaMask:
   - Click the account icon (top right)
   - Select "Import Account"
   - Paste the private key
   - Click "Import"

4. Repeat for 2-3 accounts to test different scenarios

### Step 6: Deploy Smart Contracts

1. Make sure your local blockchain is running (Hardhat node or Ganache)
2. In the project root, run:

```bash
# Deploy to local network
npm run deploy:local
```

Or if using Hardhat node directly:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. The deployment script will:
   - Deploy DeFi Token (DFI)
   - Deploy Reward Token (REW)
   - Deploy Staking Pool
   - Deploy Token Swap
   - Set up initial liquidity

4. **Important**: Copy the contract addresses from the terminal output. They will also be saved to `frontend/src/config/contractAddresses.json`

### Step 7: Verify Contract Addresses

Open `frontend/src/config/contractAddresses.json` and verify the addresses are populated:

```json
{
  "tokenAddress": "0x...",
  "rewardTokenAddress": "0x...",
  "stakingPoolAddress": "0x...",
  "tokenSwapAddress": "0x...",
  "network": "localhost"
}
```

If the file is empty, manually copy the addresses from the deployment output.

### Step 8: Start the Frontend

1. Make sure you're in the project root directory
2. Run:

```bash
npm start
```

Or:

```bash
cd frontend
npm start
```

3. The app will open in your browser at `http://localhost:3000`

## Usage Guide

### Connecting Wallet

1. Click "Connect Wallet" button in the navbar
2. MetaMask will prompt you to connect
3. Select your account and click "Next"
4. Click "Connect" to approve

### Staking Tokens

1. Navigate to the "Stake" page
2. Enter the amount of DFI tokens you want to stake
3. Click "Stake Tokens"
4. Approve the transaction in MetaMask (if prompted)
5. Confirm the stake transaction
6. Wait for confirmation - your staked balance will update automatically

### Claiming Rewards

1. On the "Stake" page, you'll see your pending rewards
2. Click "Claim Rewards" to claim accumulated rewards
3. Approve the transaction in MetaMask
4. Your reward token balance will increase

### Swapping Tokens

1. Navigate to the "Swap" page
2. Enter the amount you want to swap
3. The output amount will be calculated automatically
4. Click "Swap Tokens"
5. Approve the transaction (if needed) and confirm in MetaMask

### Viewing Profile

1. Navigate to the "Profile" page
2. View your:
   - Wallet address
   - Token balances
   - Staked amount
   - Pending rewards
   - Transaction history

## Troubleshooting

### MetaMask Not Connecting

- **Problem**: MetaMask popup doesn't appear
  - **Solution**: Make sure MetaMask extension is enabled and you're using a supported browser (Chrome, Firefox, Brave, Edge)

### "Insufficient Balance" Error

- **Problem**: Can't stake or swap due to insufficient balance
  - **Solution**: The deployer account has 1,000,000 DFI tokens. Transfer some to your account using MetaMask or deploy contracts with your account as the deployer

### Transactions Failing

- **Problem**: Transactions are being rejected
  - **Solution**: 
    - Check that you have enough ETH for gas fees
    - Make sure you're on the correct network (Hardhat/Ganache)
    - Verify contract addresses in `contractAddresses.json`

### Frontend Not Loading

- **Problem**: Blank page or errors in console
  - **Solution**:
    - Check that contract addresses are set in `contractAddresses.json`
    - Make sure local blockchain is running
    - Verify all dependencies are installed (`npm install` in both root and frontend)

### Contract Addresses Not Found

- **Problem**: "Contract addresses not found" error
  - **Solution**: 
    - Re-run the deployment script
    - Manually copy addresses from deployment output to `frontend/src/config/contractAddresses.json`

## Smart Contract Details

### DeFiToken.sol
- ERC20 token with minting and burning capabilities
- Initial supply: 1,000,000 DFI tokens

### StakingPool.sol
- Users can stake DFI tokens
- Earn rewards in REW tokens over time
- Reward rate: 100 tokens per second (adjustable by owner)
- Functions: stake, withdraw, getReward, exit

### TokenSwap.sol
- Swap between DFI and REW tokens
- Exchange rate: 1 DFI = 2 REW (adjustable)
- Functions: swapAToB, swapBToA

## Development Commands

```bash
# Compile contracts
npm run compile

# Run tests
npm test

# Deploy contracts
npm run deploy:local

# Start frontend
npm start

# Start Hardhat node
npx hardhat node
```

## Project Technologies

- **Frontend**: React, React Router, Ethers.js
- **Smart Contracts**: Solidity, OpenZeppelin
- **Development**: Hardhat, Node.js
- **Blockchain**: Ethereum (Local)

## Notes for Submission

1. **Screenshots**: Take screenshots of:
   - Home page with connected wallet
   - Staking page with staked tokens
   - Swap page showing token swap
   - Profile page with transaction history
   - MetaMask transaction confirmations

2. **Testing**: Test all features:
   - Connect wallet
   - Stake tokens
   - Claim rewards
   - Swap tokens
   - View profile

3. **Documentation**: This README serves as your project documentation

## License

This project is for educational purposes only.

## Support

If you encounter any issues:
1. Check the Troubleshooting section
2. Verify all prerequisites are installed
3. Ensure local blockchain is running
4. Check browser console for errors

---

**Good luck with your project! 🚀**

