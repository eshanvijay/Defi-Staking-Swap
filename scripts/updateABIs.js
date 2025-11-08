const fs = require('fs');
const path = require('path');

async function main() {
  console.log("\n=== Updating Frontend ABIs ===\n");

  const artifactsDir = path.join(__dirname, '../artifacts/contracts');
  const frontendAbiDir = path.join(__dirname, '../frontend/src/utils/abis');

  // Ensure frontend ABI directory exists
  if (!fs.existsSync(frontendAbiDir)) {
    fs.mkdirSync(frontendAbiDir, { recursive: true });
  }

  // Copy DeFiToken ABI
  const tokenArtifact = path.join(artifactsDir, 'DeFiToken.sol/DeFiToken.json');
  if (fs.existsSync(tokenArtifact)) {
    const artifact = JSON.parse(fs.readFileSync(tokenArtifact, 'utf8'));
    fs.writeFileSync(
      path.join(frontendAbiDir, 'DeFiToken.json'),
      JSON.stringify(artifact.abi, null, 2)
    );
    console.log('✅ Updated DeFiToken.json');
  } else {
    console.log('❌ DeFiToken artifact not found');
  }

  // Copy StakingPool ABI
  const stakingArtifact = path.join(artifactsDir, 'StakingPool.sol/StakingPool.json');
  if (fs.existsSync(stakingArtifact)) {
    const artifact = JSON.parse(fs.readFileSync(stakingArtifact, 'utf8'));
    fs.writeFileSync(
      path.join(frontendAbiDir, 'StakingPool.json'),
      JSON.stringify(artifact.abi, null, 2)
    );
    console.log('✅ Updated StakingPool.json');
  } else {
    console.log('❌ StakingPool artifact not found');
  }

  // Copy TokenSwap ABI
  const swapArtifact = path.join(artifactsDir, 'TokenSwap.sol/TokenSwap.json');
  if (fs.existsSync(swapArtifact)) {
    const artifact = JSON.parse(fs.readFileSync(swapArtifact, 'utf8'));
    fs.writeFileSync(
      path.join(frontendAbiDir, 'TokenSwap.json'),
      JSON.stringify(artifact.abi, null, 2)
    );
    console.log('✅ Updated TokenSwap.json');
  } else {
    console.log('❌ TokenSwap artifact not found');
  }

  console.log('\n✅ All ABIs updated successfully!\n');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
