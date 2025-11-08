const hre = require("hardhat");

async function main() {
  console.log("\n=== Token Transfer Script ===\n");
  
  // Get the recipient address - you can change this directly in the file
  // Replace this address with YOUR MetaMask address:
  // Note: Address is case-insensitive, but we'll normalize it
  let recipientAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; // ⬅️ CHANGE THIS TO YOUR ADDRESS!
  
  // Normalize to checksummed format (handles case-insensitivity)
  recipientAddress = hre.ethers.getAddress(recipientAddress);
  
  if (!recipientAddress || recipientAddress.toLowerCase() === "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266") {
    console.log("⚠️  Please edit this file and change the recipientAddress!");
    console.log("    File: scripts/transferTokensEasy.js");
    console.log("    Line 6: Change the address to your MetaMask address\n");
    return;
  }

  const [deployer] = await hre.ethers.getSigners();
  console.log("From (Deployer):", deployer.address);
  console.log("To (Your Account):", recipientAddress);
  console.log("");

  // Load contract addresses
  const fs = require('fs');
  const path = require('path');
  const configPath = path.join(__dirname, '../frontend/src/config/contractAddresses.json');
  
  if (!fs.existsSync(configPath)) {
    console.error("❌ Contract addresses file not found!");
    console.error("   Please deploy contracts first: npm run deploy:local");
    process.exit(1);
  }

  const addresses = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log("📋 Loaded contract addresses:");
  console.log("   DFI Token:", addresses.tokenAddress);
  console.log("   Reward Token:", addresses.rewardTokenAddress);
  console.log("");

  // Get contract instances
  const DeFiToken = await hre.ethers.getContractFactory("DeFiToken");
  const RewardToken = await hre.ethers.getContractFactory("DeFiToken");
  
  const token = DeFiToken.attach(addresses.tokenAddress);
  const rewardToken = RewardToken.attach(addresses.rewardTokenAddress);

  // Check current balances
  console.log("📊 Checking current balances...");
  const currentDfi = await token.balanceOf(recipientAddress);
  const currentRew = await rewardToken.balanceOf(recipientAddress);
  console.log("   Current DFI Balance:", hre.ethers.formatEther(currentDfi), "DFI");
  console.log("   Current REW Balance:", hre.ethers.formatEther(currentRew), "REW");
  console.log("");

  // Transfer amounts
  const tokenAmount = hre.ethers.parseEther("100000"); // 100k DFI tokens
  const rewardAmount = hre.ethers.parseEther("100000"); // 100k REW tokens

  console.log("💸 Transferring tokens...");
  console.log("   Amount: 100,000 DFI");
  console.log("   Amount: 100,000 REW");
  console.log("");
  
  try {
    // Transfer DFI tokens
    console.log("⏳ Transferring DFI tokens...");
    const tx1 = await token.transfer(recipientAddress, tokenAmount);
    console.log("   Transaction hash:", tx1.hash);
    await tx1.wait();
    console.log("   ✅ DFI tokens transferred!");

    // Transfer Reward tokens
    console.log("⏳ Transferring Reward tokens...");
    const tx2 = await rewardToken.transfer(recipientAddress, rewardAmount);
    console.log("   Transaction hash:", tx2.hash);
    await tx2.wait();
    console.log("   ✅ Reward tokens transferred!");

    // Check new balances
    console.log("\n📊 Checking new balances...");
    const newDfi = await token.balanceOf(recipientAddress);
    const newRew = await rewardToken.balanceOf(recipientAddress);

    console.log("\n=== ✅ Transfer Complete! ===");
    console.log("Your DFI Balance:", hre.ethers.formatEther(newDfi), "DFI");
    console.log("Your REW Balance:", hre.ethers.formatEther(newRew), "REW");
    console.log("\n🎉 You can now use the app! Refresh your browser (F5).");
    
  } catch (error) {
    console.error("\n❌ Error transferring tokens:");
    console.error(error.message);
    if (error.reason) {
      console.error("Reason:", error.reason);
    }
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

