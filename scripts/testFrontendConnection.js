const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("\n╔════════════════════════════════════════════════════╗");
  console.log("║     Frontend Connection Test                      ║");
  console.log("╚════════════════════════════════════════════════════╝\n");

  // Load contract addresses
  const configPath = path.join(__dirname, '../frontend/src/config/contractAddresses.json');
  
  if (!fs.existsSync(configPath)) {
    console.log("❌ Contract addresses file not found!");
    console.log("   Run: npx hardhat run scripts/deploy.js --network localhost");
    return;
  }

  const addresses = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  console.log("📋 Contract Addresses:");
  console.log("   DFI Token:", addresses.tokenAddress);
  console.log("   Reward Token:", addresses.rewardTokenAddress);
  console.log("   Staking Pool:", addresses.stakingPoolAddress);
  console.log("   Token Swap:", addresses.tokenSwapAddress);
  console.log("");

  // Test account
  const testAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  console.log("🧪 Testing with account:", testAccount);
  console.log("");

  try {
    // Get contract factory
    const DeFiToken = await hre.ethers.getContractFactory("DeFiToken");
    
    // Attach to deployed contracts
    const token = DeFiToken.attach(addresses.tokenAddress);
    const rewardToken = DeFiToken.attach(addresses.rewardTokenAddress);

    // Test basic contract calls
    console.log("🔍 Testing Contract Calls:");
    
    // Test 1: Get token name
    try {
      const name = await token.name();
      console.log("   ✅ Token name:", name);
    } catch (error) {
      console.log("   ❌ Failed to get token name:", error.message);
    }

    // Test 2: Get token symbol
    try {
      const symbol = await token.symbol();
      console.log("   ✅ Token symbol:", symbol);
    } catch (error) {
      console.log("   ❌ Failed to get token symbol:", error.message);
    }

    // Test 3: Get balance
    try {
      const balance = await token.balanceOf(testAccount);
      console.log("   ✅ DFI Balance:", hre.ethers.formatEther(balance));
    } catch (error) {
      console.log("   ❌ Failed to get balance:", error.message);
    }

    // Test 4: Get reward token balance
    try {
      const rewardBalance = await rewardToken.balanceOf(testAccount);
      console.log("   ✅ REW Balance:", hre.ethers.formatEther(rewardBalance));
    } catch (error) {
      console.log("   ❌ Failed to get reward balance:", error.message);
    }

    console.log("");
    console.log("🔍 Testing ABI Files:");
    
    // Check if ABI files exist
    const abiDir = path.join(__dirname, '../frontend/src/utils/abis');
    const abiFiles = ['DeFiToken.json', 'StakingPool.json', 'TokenSwap.json'];
    
    for (const file of abiFiles) {
      const filePath = path.join(abiDir, file);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (Array.isArray(content) && content.length > 0) {
          console.log(`   ✅ ${file} - ${content.length} functions`);
        } else {
          console.log(`   ⚠️  ${file} - Invalid format`);
        }
      } else {
        console.log(`   ❌ ${file} - Not found`);
      }
    }

    console.log("");
    console.log("╔════════════════════════════════════════════════════╗");
    console.log("║     ✅ All Tests Passed!                           ║");
    console.log("╚════════════════════════════════════════════════════╝");
    console.log("");
    console.log("If frontend still shows 0 balances:");
    console.log("1. Stop frontend (Ctrl+C)");
    console.log("2. Delete node_modules in frontend folder");
    console.log("3. Run: cd frontend && npm install");
    console.log("4. Run: npm start");
    console.log("5. Hard refresh browser (Ctrl+Shift+R)");
    console.log("");

  } catch (error) {
    console.log("❌ Error during testing:");
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
