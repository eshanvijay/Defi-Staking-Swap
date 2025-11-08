import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { getContracts } from '../utils/contracts';
import { ethers } from 'ethers';
import './Home.css';

function Home() {
  const { account, signer, isConnected } = useWeb3();
  const [balances, setBalances] = useState({
    token: '950000',
    rewardToken: '900000',
  });
  const [loading, setLoading] = useState(false);

  const loadBalances = useCallback(async () => {
    console.log('🔄 loadBalances called');
    console.log('   Account:', account);
    console.log('   Signer:', signer ? 'Available' : 'Not available');
    
    if (!account || !signer) {
      console.log('⚠️ Missing account or signer, skipping balance load');
      return;
    }
    
    try {
      console.log('📞 Getting contracts...');
      const contracts = getContracts(signer);
      
      if (!contracts) {
        console.error('❌ Contracts not loaded. Check contract addresses.');
        setLoading(false);
        return;
      }
      
      console.log('✅ Contracts loaded');
      console.log('   Token contract:', contracts.token.target);
      console.log('   Reward token contract:', contracts.rewardToken.target);

      // Normalize address to checksummed format
      const normalizedAccount = ethers.getAddress(account);
      console.log('📍 Normalized account:', normalizedAccount);

      // Get token balances
      console.log('📊 Fetching DFI balance...');
      const tokenBalance = await contracts.token.balanceOf(normalizedAccount);
      console.log('   Raw DFI balance:', tokenBalance.toString());
      
      console.log('📊 Fetching REW balance...');
      const rewardTokenBalance = await contracts.rewardToken.balanceOf(normalizedAccount);
      console.log('   Raw REW balance:', rewardTokenBalance.toString());

      const formattedToken = ethers.formatEther(tokenBalance);
      const formattedReward = ethers.formatEther(rewardTokenBalance);

      console.log('✅ Formatted balances:');
      console.log('   DFI:', formattedToken);
      console.log('   REW:', formattedReward);

      setBalances({
        token: formattedToken,
        rewardToken: formattedReward,
      });
      setLoading(false);
      console.log('✅ Balance state updated');
    } catch (error) {
      console.error('❌ Error loading balances:', error);
      console.error('   Message:', error.message);
      console.error('   Code:', error.code);
      console.error('   Reason:', error.reason);
      console.error('   Full error:', error);
      setLoading(false);
    }
  }, [account, signer]);

  useEffect(() => {
    if (isConnected && signer && account) {
      loadBalances();
      const interval = setInterval(loadBalances, 10000);
      return () => clearInterval(interval);
    }
  }, [isConnected, signer, account, loadBalances]);

  return (
    <div className="home">
      <div className="welcome-section">
        <h1>Welcome to the DeFi DApp</h1>
        <p className="subtitle">Token Staking and Swap Platform</p>
        {isConnected && account && (
          <div className="account-info">
            <p>Your Account: {account}</p>
          </div>
        )}
      </div>

      {!isConnected ? (
        <div className="card">
          <h2>Connect Your Wallet</h2>
          <p>Please connect your MetaMask wallet to get started.</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>DFI Token Balance</h3>
              <div className="value">
                {loading ? 'Loading...' : parseFloat(balances.token).toFixed(2)}
              </div>
            </div>
            <div className="stat-card">
              <h3>Reward Token Balance</h3>
              <div className="value">
                {loading ? 'Loading...' : parseFloat(balances.rewardToken).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="features-section">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>Token Staking</h3>
                <p>Stake your DFI tokens and earn rewards over time. The longer you stake, the more you earn!</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Token Swap</h3>
                <p>Swap between DFI tokens and Reward tokens instantly with our decentralized exchange.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Profile Dashboard</h3>
                <p>Track your staking history, rewards, and transaction records in one place.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;

