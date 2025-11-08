const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("\n=== Checking Your Token Balances ===\n");

  // Load contract addresses
  const configPath = path.join(__dirname, '../frontend/src/config/contractAddresses.json');
  const addresses = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log("Contract Addresses:");
  console.log("DFI Token:", addresses.tokenAddress);
  console.log("Reward Token:", addresses.rewardTokenAddress);
  console.log("");

  // Get the deployer account (the one with tokens)
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer Account:", deployer.address);
  
  // Your MetaMask account from the screenshot
  const yourAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  console.log("Your MetaMask Account:", yourAccount);
  console.log("");

  // Get contract instances
  const DeFiToken = await hre.ethers.getContractFactory("DeFiToken");
  const token = DeFiToken.attach(addresses.tokenAddress);
  const rewardToken = DeFiToken.attach(addresses.rewardTokenAddress);

  // Check deployer balances
  console.log("📊 Deployer Balances:");
  const deployerDfi = await token.balanceOf(deployer.address);
  const deployerRew = await rewardToken.balanceOf(deployer.address);
  console.log("   DFI:", hre.ethers.formatEther(deployerDfi));
  console.log("   REW:", hre.ethers.formatEther(deployerRew));
  console.log("");

  // Check your account balances
  console.log("📊 Your Account Balances:");
  const yourDfi = await token.balanceOf(yourAccount);
  const yourRew = await rewardToken.balanceOf(yourAccount);
  console.log("   DFI:", hre.ethers.formatEther(yourDfi));
  console.log("   REW:", hre.ethers.formatEther(yourRew));
  console.log("");

  // Check if they're the same account
  if (deployer.address.toLowerCase() === yourAccount.toLowerCase()) {
    console.log("✅ You ARE using the deployer account!");
    console.log("   You should have tokens already.");
    console.log("");
    
    if (deployerDfi > 0n) {
      console.log("✅ You have DFI tokens!");
    } else {
      console.log("❌ No DFI tokens found. Something went wrong with deployment.");
    }
    
    if (deployerRew > 0n) {
      console.log("✅ You have REW tokens!");
    } else {
      console.log("❌ No REW tokens found. Something went wrong with deployment.");
    }
  } else {
    console.log("⚠️  You are NOT using the deployer account.");
    console.log("   You need to transfer tokens from deployer to your account.");
  }

  console.log("\n=== Diagnosis ===");
  
  if (deployerDfi === 0n && deployerRew === 0n) {
    console.log("❌ Problem: Deployer has no tokens!");
    console.log("   Solution: Redeploy contracts");
    console.log("   Command: npx hardhat run scripts/deploy.js --network localhost");
  } else if (deployer.address.toLowerCase() === yourAccount.toLowerCase() && deployerDfi > 0n) {
    console.log("✅ You have tokens! The issue is in the frontend.");
    console.log("   Try these:");
    console.log("   1. Hard refresh browser (Ctrl+Shift+R)");
    console.log("   2. Check browser console for errors (F12)");
    console.log("   3. Reconnect MetaMask wallet");
    console.log("   4. Make sure MetaMask is on 'Hardhat Local' network");
  } else if (yourDfi === 0n) {
    console.log("⚠️  Your account has no tokens.");
    console.log("   Solution: Transfer tokens from deployer");
    console.log("   But first, edit scripts/transferTokensEasy.js");
    console.log("   Change line 9 to a DIFFERENT address than the deployer");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
