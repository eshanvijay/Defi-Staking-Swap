const hre = require("hardhat");

async function main() {
  // Get the recipient address from environment variable or command line
  let recipientAddress = process.env.RECIPIENT_ADDRESS;
  
  // If not in env, try to get from process.argv (after hardhat arguments)
  if (!recipientAddress) {
    // Hardhat arguments come first, our arg should be after --network localhost
    const networkIndex = process.argv.indexOf('--network');
    if (networkIndex !== -1 && process.argv[networkIndex + 2]) {
      recipientAddress = process.argv[networkIndex + 2];
    }
  }
  
  if (!recipientAddress) {
    console.log("\n❌ Error: No recipient address provided!");
    console.log("\nUsage:");
    console.log("  Option 1: Set environment variable");
    console.log("    set RECIPIENT_ADDRESS=0xYourAddress");
    console.log("    npx hardhat run scripts/transferTokens.js --network localhost");
    console.log("\n  Option 2: Use the interactive version (see below)");
    console.log("\nLet me create an easier version for you...\n");
    // We'll create an interactive version
    return;
  }

  const [deployer] = await hre.ethers.getSigners();
  console.log("Transferring tokens from deployer:", deployer.address);
  console.log("To recipient:", recipientAddress);

  // Load contract addresses
  const fs = require('fs');
  const path = require('path');
  const configPath = path.join(__dirname, '../frontend/src/config/contractAddresses.json');
  
  if (!fs.existsSync(configPath)) {
    console.error("Contract addresses file not found! Please deploy contracts first.");
    process.exit(1);
  }

  const addresses = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  // Get contract instances
  const DeFiToken = await hre.ethers.getContractFactory("DeFiToken");
  const RewardToken = await hre.ethers.getContractFactory("DeFiToken");
  
  const token = DeFiToken.attach(addresses.tokenAddress);
  const rewardToken = RewardToken.attach(addresses.rewardTokenAddress);

  // Transfer amounts
  const tokenAmount = hre.ethers.parseEther("100000"); // 100k DFI tokens
  const rewardAmount = hre.ethers.parseEther("100000"); // 100k REW tokens

  console.log("\nTransferring tokens...");
  
  // Transfer DFI tokens
  console.log("Transferring DFI tokens...");
  const tx1 = await token.transfer(recipientAddress, tokenAmount);
  await tx1.wait();
  console.log("✅ DFI tokens transferred!");

  // Transfer Reward tokens
  console.log("Transferring Reward tokens...");
  const tx2 = await rewardToken.transfer(recipientAddress, rewardAmount);
  await tx2.wait();
  console.log("✅ Reward tokens transferred!");

  // Check balances
  const dfiBalance = await token.balanceOf(recipientAddress);
  const rewBalance = await rewardToken.balanceOf(recipientAddress);

  console.log("\n=== Transfer Complete ===");
  console.log("Recipient DFI Balance:", hre.ethers.formatEther(dfiBalance), "DFI");
  console.log("Recipient REW Balance:", hre.ethers.formatEther(rewBalance), "REW");
  console.log("\nYou can now use the app with this account!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

