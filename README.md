# 🚀 DeFi Token Staking & Swap Platform

A full-stack decentralized finance (DeFi) application built with Solidity smart contracts and React frontend, demonstrating token staking, reward distribution, and decentralized token swapping.

![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-blue)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-orange)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Hardhat](https://img.shields.io/badge/Hardhat-Development-yellow)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Smart Contracts](#smart-contracts)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)

---

## 🎯 Overview

This project is a comprehensive DeFi platform that implements:
- **ERC-20 Token Standard** for custom tokens (DFI and REW)
- **Staking Pool** with time-based reward distribution
- **Token Swap** functionality with automated market making
- **Modern React Frontend** with Web3 integration
- **MetaMask Wallet** integration for secure transactions

Built as a blockchain honors project to demonstrate understanding of:
- Smart contract development
- Decentralized application architecture
- Web3 integration
- Token economics

---

## ✨ Features

### 🪙 Token Management
- Custom ERC-20 tokens (DFI Token & Reward Token)
- Real-time balance tracking
- Secure token transfers

### 💰 Staking System
- Stake DFI tokens to earn rewards
- Time-based reward calculation
- Withdraw staked tokens anytime
- Claim accumulated rewards

### 🔄 Token Swap
- Decentralized exchange between DFI and REW tokens
- Automated exchange rate calculation
- Liquidity pool management
- Instant token swaps

### 📊 Dashboard
- Portfolio overview
- Transaction history
- Staking statistics
- Real-time updates

---

## 🛠️ Tech Stack

### Blockchain
- **Solidity** ^0.8.20 - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Security-audited contract libraries
- **Ethers.js** - Ethereum interaction library

### Frontend
- **React.js** 18.x - UI framework
- **React Router** - Navigation
- **Ethers.js** - Web3 integration
- **CSS3** - Styling

### Development Tools
- **Node.js** & **npm** - Package management
- **MetaMask** - Wallet integration
- **VS Code** - IDE

---

## 📜 Smart Contracts

### 1. DeFiToken.sol
```solidity
// ERC-20 token implementation
- Standard token functionality (transfer, approve, etc.)
- Initial supply: 1,000,000 tokens
- 18 decimal places
```

### 2. StakingPool.sol
```solidity
// Staking mechanism with rewards
- Stake tokens to earn rewards
- Time-based reward calculation (1% per second)
- Withdraw and claim functions
- ReentrancyGuard for security
```

### 3. TokenSwap.sol
```solidity
// Decentralized exchange
- Swap between DFI and REW tokens
- Fixed exchange rate (1:2)
- Liquidity pool management
- Add/remove liquidity functions
```

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/defi-staking-swap.git
cd defi-staking-swap
```

### Step 2: Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 3: Compile Smart Contracts
```bash
npx hardhat compile
```

---

## 🚀 Usage

### Step 1: Start Local Blockchain
Open a terminal and run:
```bash
npx hardhat node
```
Keep this terminal running.

### Step 2: Deploy Contracts
Open a new terminal:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

This will:
- Deploy all smart contracts
- Set up initial liquidity
- Save contract addresses to `frontend/src/config/contractAddresses.json`

### Step 3: Configure MetaMask

1. Open MetaMask
2. Add a new network:
   - **Network Name:** Hardhat Local
   - **RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 1337
   - **Currency Symbol:** ETH

3. Import test account:
   - Use private key from Hardhat node output
   - Default account: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

### Step 4: Start Frontend
```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`

### Step 5: Connect Wallet
1. Click "Connect Wallet" in the navigation bar
2. Approve the connection in MetaMask
3. Your balances should appear on the home page

---

## 📁 Project Structure

```
defi-staking-swap/
├── contracts/              # Smart contracts
│   ├── DeFiToken.sol      # ERC-20 token
│   ├── StakingPool.sol    # Staking mechanism
│   └── TokenSwap.sol      # DEX functionality
├── scripts/               # Deployment scripts
│   ├── deploy.js          # Main deployment
│   └── transferTokensEasy.js
├── frontend/              # React application
│   ├── public/
│   └── src/
│       ├── components/    # React components
│       ├── pages/         # Page components
│       ├── context/       # Web3 context
│       ├── utils/         # Helper functions
│       └── config/        # Contract addresses
├── test/                  # Contract tests
├── hardhat.config.js      # Hardhat configuration
└── README.md
```

---

## 🎨 Screenshots

### Home Page
Dashboard showing token balances and wallet connection.

### Staking Page
Interface for staking tokens and claiming rewards.

### Swap Page
Decentralized exchange for token swapping.

### Profile Page
Complete portfolio overview with transaction history.

---

## 🔐 Security Features

- **OpenZeppelin Libraries** - Industry-standard secure contracts
- **ReentrancyGuard** - Protection against reentrancy attacks
- **Access Control** - Proper permission management
- **Input Validation** - Comprehensive checks on all inputs
- **Safe Math** - Overflow protection (built into Solidity 0.8+)

---

## 🧪 Testing

Run the test suite:
```bash
npx hardhat test
```

Run specific tests:
```bash
npx hardhat test test/DeFiToken.test.js
```

---

## 📝 Key Concepts Demonstrated

### Blockchain Development
- Smart contract architecture
- ERC-20 token standard
- Gas optimization
- Security best practices

### DeFi Mechanisms
- Token staking
- Reward distribution
- Liquidity pools
- Automated market making

### Web3 Integration
- Wallet connection
- Transaction signing
- Event listening
- State management

---

## 🔧 Troubleshooting

### Balances Not Showing
```bash
# Restart Hardhat node
npx hardhat node

# Redeploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Hard refresh browser
Ctrl + Shift + R
```

### MetaMask Issues
- Make sure you're on the Hardhat Local network (Chain ID 1337)
- Reset MetaMask account: Settings → Advanced → Reset Account
- Clear browser cache

### Contract Errors
- Ensure Hardhat node is running
- Check contract addresses in `frontend/src/config/contractAddresses.json`
- Verify you have test ETH in your account

---

## 📚 Learning Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [React Documentation](https://react.dev/)

---

## 🤝 Contributing

This is an educational project. Feel free to fork and experiment!

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Your Name**
- Blockchain Honors Project
- [Your Email]
- [Your LinkedIn]

---

## 🙏 Acknowledgments

- OpenZeppelin for secure contract libraries
- Hardhat team for excellent development tools
- React community for frontend framework
- Ethereum Foundation for blockchain technology

---

## 📞 Contact

For questions or feedback about this project:
- Email: eshanvijay23@gmail.com
- GitHub: [@eshanvijay](https://github.com/eshanvijay)

---

**⭐ If you found this project helpful, please give it a star!**

---

## 🎓 Academic Note

This project was developed as part of a Blockchain course to demonstrate:
- Understanding of blockchain fundamentals
- Smart contract development skills
- DeFi protocol implementation
- Full-stack dApp development
- Web3 integration capabilities

**Instructor:** [Mrs Lifna C.S]  
**Course:** Blockchain Technology  
**Institution:** [Vivekanand Education Society's Institute of Technology]  
**Date:** November 2025
