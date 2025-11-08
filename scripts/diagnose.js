const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("\n╔════════════════════════════════════════════════════╗");
  console.log("║     DeFi Project Diagnostic Tool                  ║");
  console.log("╚════════════════════════════════════════════════════╝\n");

  let allGood = true;

  // Check 1: Network Connection
  console.log("🔍 Check 1: Network Connection");
  try {
    const network = await hre.ethers.provider.getNetwork();
    console.log("   ✅ Connected to network");
    console.log("      Chain ID:", network.chainId.toString());
    console.log("      Network:", hre.network.name);
  } catch (error) {
    console.log("   ❌ Cannot connect to network");
    console.log("      Error:", error.message);
    console.log("      → Make sure Hardhat node is running: npx hardhat node");
    allGood = false;
    return;
  }

  // Check 2: Contract Addresses Configuration
  console.log("\n🔍 Check 2: Contract Addresses Configuration");
  const configPath = path.join(__dirname, '../frontend/src/config/contractAddresses.json');
  
  if (!fs.existsSync(configPath)) {
    console.log("   ❌ Contract addresses file not found");
    console.log("      → Deploy contracts first: npx hardhat run scripts/deploy.js --network localhost");
    allGood = false;
    return;
  }

  const addresses = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log("   ✅ Contract addresses file found");
  console.log("      DFI Token:", addresses.tokenAddress);
  console.log("      Reward Token:", addresses.rewardTokenAddress);
  console.log("      Staking Pool:", addresses.stakingPoolAddress);
  console.log("      Token Swap:", addresses.tokenSwapAddress);

  // Check 3: Contracts Deployed
  console.log("\n🔍 Check 3: Contracts Deployed and Accessible");
  try {
    const DeFiToken = await hre.ethers.getContractFactory("DeFiToken");
    const token = DeFiToken.attach(addresses.tokenAddress);
    
    const name = await token.name();
    const symbol = await token.symbol();
    const totalSupply = await token.totalSupply();
    
    console.log("   ✅ DFI Token contract is accessible");
    console.log("      Name:", name);
    console.log("      Symbol:", symbol);
    console.log("      Total Supply:", hre.ethers.formatEther(totalSupply), "tokens");
  } catch (error) {
    console.log("   ❌ Cannot access DFI Token contract");
    console.log("      Error:", error.message);
    console.log("      → Redeploy contracts: npx hardhat run scripts/deploy.js --network localhost");
    allGood = false;
    return;
  }

  // Check 4: Get Connected Account
  console.log("\n🔍 Check 4: Account Information");
  const [deployer] = await hre.ethers.getSigners();
  console.log("   ℹ️  Deployer Account:", deployer.address);
  const deployerBalance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("      ETH Balance:", hre.ethers.formatEther(deployerBalance), "ETH");

  // Check 5: Token Balances
  console.log("\n🔍 Check 5: Token Balances");
  try {
    const DeFiToken = await hre.ethers.getContractFactory("DeFiToken");
    const RewardToken = await hre.ethers.getContractFactory("DeFiToken");
    
    const token = DeFiToken.attach(addresses.tokenAddress);
    const rewardToken = RewardToken.attach(addresses.rewardTokenAddress);

    const deployerDfi = await token.balanceOf(deployer.address);
    const deployerRew = await rewardToken.balanceOf(deployer.address);

    console.log("   📊 Deployer Account Balances:");
    console.log("      DFI:", hre.ethers.formatEther(deployerDfi), "tokens");
    console.log("      REW:", hre.ethers.formatEther(deployerRew), "tokens");

    if (deployerDfi > 0n) {
      console.log("   ✅ Deployer has DFI tokens");
    } else {
      console.log("   ⚠️  Deployer has no DFI tokens");
    }

    // Check the default test account
    const testAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    if (deployer.address.toLowerCase() !== testAccount.toLowerCase()) {
      console.log("\n   📊 Test Account Balances (0xf39F...2266):");
      const testDfi = await token.balanceOf(testAccount);
      const testRew = await rewardToken.balanceOf(testAccount);
      console.log("      DFI:", hre.ethers.formatEther(testDfi), "tokens");
      console.log("      REW:", hre.ethers.formatEther(testRew), "tokens");
      
      if (testDfi > 0n) {
        console.log("   ✅ Test account has tokens");
      } else {
        console.log("   ⚠️  Test account has no tokens");
        console.log("      → Transfer tokens: npx hardhat run scripts/transferTokensEasy.js --network localhost");
      }
    }
  } catch (error) {
    console.log("   ❌ Error checking balances");
    console.log("      Error:", error.message);
    allGood = false;
  }

  // Check 6: Staking Pool Setup
  console.log("\n🔍 Check 6: Staking Pool Configuration");
  try {
    const StakingPool = await hre.ethers.getContractFactory("StakingPool");
    const stakingPool = StakingPool.attach(addresses.stakingPoolAddress);
    
    const rewardRate = await stakingPool.rewardRate();
    console.log("   ✅ Staking Pool is configured");
    console.log("      Reward Rate:", rewardRate.toString(), "tokens per second");
  } catch (error) {
    console.log("   ❌ Cannot access Staking Pool");
    console.log("      Error:", error.message);
    allGood = false;
  }

  // Check 7: Token Swap Setup
  console.log("\n🔍 Check 7: Token Swap Configuration");
  try {
    const TokenSwap = await hre.ethers.getContractFactory("TokenSwap");
    const tokenSwap = TokenSwap.attach(addresses.tokenSwapAddress);
    
    const DeFiToken = await hre.ethers.getContractFactory("DeFiToken");
    const token = DeFiToken.attach(addresses.tokenAddress);
    
    const swapBalance = await token.balanceOf(addresses.tokenSwapAddress);
    console.log("   ✅ Token Swap is configured");
    console.log("      Liquidity (DFI):", hre.ethers.formatEther(swapBalance), "tokens");
    
    if (swapBalance === 0n) {
      console.log("   ⚠️  Warning: No liquidity in swap contract");
    }
  } catch (error) {
    console.log("   ❌ Cannot access Token Swap");
    console.log("      Error:", error.message);
    allGood = false;
  }

  // Check 8: Frontend Configuration
  console.log("\n🔍 Check 8: Frontend Configuration");
  const abiPath = path.join(__dirname, '../frontend/src/utils/abis/DeFiToken.json');
  if (fs.existsSync(abiPath)) {
    console.log("   ✅ Frontend ABIs are present");
  } else {
    console.log("   ❌ Frontend ABIs not found");
    console.log("      → Copy ABIs from artifacts to frontend/src/utils/abis/");
    allGood = false;
  }

  // Final Summary
  console.log("\n╔════════════════════════════════════════════════════╗");
  if (allGood) {
    console.log("║     ✅ All Checks Passed!                          ║");
    console.log("╚════════════════════════════════════════════════════╝");
    console.log("\n🎉 Your DeFi project is ready to use!");
    console.log("\nNext steps:");
    console.log("1. Make sure MetaMask is connected to 'Hardhat Local' network");
    console.log("2. Import the test account to MetaMask");
    console.log("3. Start the frontend: cd frontend && npm start");
    console.log("4. Connect your wallet in the app");
  } else {
    console.log("║     ⚠️  Some Issues Found                          ║");
    console.log("╚════════════════════════════════════════════════════╝");
    console.log("\n📋 Follow the suggestions above to fix the issues.");
  }
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Diagnostic failed:");
    console.error(error);
    process.exit(1);
  });
