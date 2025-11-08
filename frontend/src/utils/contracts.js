import { ethers } from 'ethers';
import DeFiTokenABI from './abis/DeFiToken.json';
import StakingPoolABI from './abis/StakingPool.json';
import TokenSwapABI from './abis/TokenSwap.json';
import contractAddresses from '../config/contractAddresses.json';

// Create a read-only provider for localhost
const getProvider = () => {
  if (typeof window.ethereum !== 'undefined') {
    return new ethers.BrowserProvider(window.ethereum);
  }
  // Fallback to localhost provider
  return new ethers.JsonRpcProvider('http://127.0.0.1:8545');
};

export const getContracts = (signer) => {
  if (!contractAddresses.tokenAddress) {
    console.error('Contract addresses not configured');
    return null;
  }

  if (!signer) {
    console.error('Signer not available');
    return null;
  }

  // Always use the signer's provider to ensure we're on the correct network
  const provider = signer.provider;
  
  if (!provider) {
    console.error('Provider not available from signer');
    return null;
  }

  try {
    // Use signer for all contracts to ensure proper provider connection
    // Signer can be used for both read and write operations
    const tokenContract = new ethers.Contract(
      contractAddresses.tokenAddress,
      DeFiTokenABI,
      signer
    );

    const rewardTokenContract = new ethers.Contract(
      contractAddresses.rewardTokenAddress,
      DeFiTokenABI,
      signer
    );

    const stakingPoolContract = new ethers.Contract(
      contractAddresses.stakingPoolAddress,
      StakingPoolABI,
      signer
    );

    const tokenSwapContract = new ethers.Contract(
      contractAddresses.tokenSwapAddress,
      TokenSwapABI,
      signer
    );

    return {
      token: tokenContract,
      rewardToken: rewardTokenContract,
      stakingPool: stakingPoolContract,
      tokenSwap: tokenSwapContract,
    };
  } catch (error) {
    console.error('Error creating contracts:', error);
    return null;
  }
};

