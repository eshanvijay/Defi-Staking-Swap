const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy DeFi Token
  console.log("\n1. Deploying DeFi Token...");
  const DeFiToken = await hre.ethers.getContractFactory("DeFiToken");
  const token = await DeFiToken.deploy(deployer.address);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("DeFi Token deployed to:", tokenAddress);

  // Deploy Reward Token (using same token for simplicity)
  console.log("\n2. Deploying Reward Token...");
  const RewardToken = await hre.ethers.getContractFactory("DeFiToken");
  const rewardToken = await RewardToken.deploy(deployer.address);
  await rewardToken.waitForDeployment();
  const rewardTokenAddress = await rewardToken.getAddress();
  console.log("Reward Token deployed to:", rewardTokenAddress);

  // Deploy Staking Pool
  console.log("\n3. Deploying Staking Pool...");
  const StakingPool = await hre.ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.deploy(tokenAddress, rewardTokenAddress, deployer.address);
  await stakingPool.waitForDeployment();
  const stakingPoolAddress = await stakingPool.getAddress();
  console.log("Staking Pool deployed to:", stakingPoolAddress);

  // Deploy Token Swap
  console.log("\n4. Deploying Token Swap...");
  const TokenSwap = await hre.ethers.getContractFactory("TokenSwap");
  const tokenSwap = await TokenSwap.deploy(tokenAddress, rewardTokenAddress, deployer.address);
  await tokenSwap.waitForDeployment();
  const tokenSwapAddress = await tokenSwap.getAddress();
  console.log("Token Swap deployed to:", tokenSwapAddress);

  // Transfer tokens to contracts for initial liquidity
  console.log("\n5. Setting up initial liquidity...");
  const liquidityAmount = hre.ethers.parseEther("50000"); // 50k tokens
  
  // Approve and transfer to staking pool
  await token.approve(stakingPoolAddress, liquidityAmount);
  await rewardToken.transfer(stakingPoolAddress, liquidityAmount);
  console.log("Transferred reward tokens to staking pool");

  // Approve and add liquidity to swap
  await token.approve(tokenSwapAddress, liquidityAmount);
  await rewardToken.approve(tokenSwapAddress, liquidityAmount);
  await tokenSwap.addLiquidity(liquidityAmount, liquidityAmount);
  console.log("Added liquidity to swap contract");

  console.log("\n=== Deployment Summary ===");
  console.log("DeFi Token:", tokenAddress);
  console.log("Reward Token:", rewardTokenAddress);
  console.log("Staking Pool:", stakingPoolAddress);
  console.log("Token Swap:", tokenSwapAddress);
  console.log("\nSave these addresses for frontend configuration!");

  // Save addresses to a file
  const fs = require('fs');
  const path = require('path');
  
  // Ensure directory exists
  const configDir = path.join(__dirname, '../frontend/src/config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  const addresses = {
    tokenAddress,
    rewardTokenAddress,
    stakingPoolAddress,
    tokenSwapAddress,
    network: hre.network.name
  };
  
  const configPath = path.join(configDir, 'contractAddresses.json');
  fs.writeFileSync(configPath, JSON.stringify(addresses, null, 2));
  console.log("\nContract addresses saved to frontend/src/config/contractAddresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

