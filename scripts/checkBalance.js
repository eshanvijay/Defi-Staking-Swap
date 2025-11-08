const hre = require("hardhat");

async function main() {
  const accountAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  const normalizedAddress = hre.ethers.getAddress(accountAddress);
  
  console.log("\n=== Checking Token Balances ===\n");
  console.log("Account:", normalizedAddress);
  console.log("");

  // Load contract addresses
  const fs = require('fs');
  const path = require('path');
  const configPath = path.join(__dirname, '../frontend/src/config/contractAddresses.json');
  
  if (!fs.existsSync(configPath)) {
    console.error("❌ Contract addresses file not found!");
    process.exit(1);
  }

  const addresses = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log("Contract Addresses:");
  console.log("  DFI Token:", addresses.tokenAddress);
  console.log("  Reward Token:", addresses.rewardTokenAddress);
  console.log("");

  // Get contract instances
  const DeFiToken = await hre.ethers.getContractFactory("DeFiToken");
  const RewardToken = await hre.ethers.getContractFactory("DeFiToken");
  
  const token = DeFiToken.attach(addresses.tokenAddress);
  const rewardToken = RewardToken.attach(addresses.rewardTokenAddress);

  // Check balances
  console.log("Checking balances...\n");
  
  try {
    const dfiBalance = await token.balanceOf(normalizedAddress);
    const rewBalance = await rewardToken.balanceOf(normalizedAddress);

    console.log("=== Balance Results ===");
    console.log("DFI Balance (raw):", dfiBalance.toString());
    console.log("DFI Balance:", hre.ethers.formatEther(dfiBalance), "DFI");
    console.log("");
    console.log("REW Balance (raw):", rewBalance.toString());
    console.log("REW Balance:", hre.ethers.formatEther(rewBalance), "REW");
    console.log("");

    if (dfiBalance.toString() === "0" && rewBalance.toString() === "0") {
      console.log("⚠️  WARNING: Both balances are 0!");
      console.log("   This means tokens were not transferred to this account.");
      console.log("   Or the account address is different.");
    } else {
      console.log("✅ Tokens found! The account has tokens.");
    }

  } catch (error) {
    console.error("❌ Error checking balances:");
    console.error(error.message);
    if (error.reason) {
      console.error("Reason:", error.reason);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

