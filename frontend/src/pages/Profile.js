import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { getContracts } from '../utils/contracts';
import { ethers } from 'ethers';
import './Profile.css';

function Profile() {
  const { account, signer, isConnected } = useWeb3();
  const [profileData, setProfileData] = useState({
    walletAddress: '',
    tokenBalance: '950000',
    rewardTokenBalance: '900000',
    stakedAmount: '5000',
    pendingRewards: '250',
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && signer) {
      loadProfileData();
    }
  }, [isConnected, signer, account]);

  const loadProfileData = async () => {
    try {
      const contracts = getContracts(signer);
      if (!contracts) return;

      // Normalize address to checksummed format
      const normalizedAccount = ethers.getAddress(account);

      const [
        tokenBalance,
        rewardTokenBalance,
        stakingInfo,
      ] = await Promise.all([
        contracts.token.balanceOf(normalizedAccount),
        contracts.rewardToken.balanceOf(normalizedAccount),
        contracts.stakingPool.getUserStakingInfo(normalizedAccount),
      ]);

      setProfileData({
        walletAddress: account,
        tokenBalance: ethers.formatEther(tokenBalance),
        rewardTokenBalance: ethers.formatEther(rewardTokenBalance),
        stakedAmount: ethers.formatEther(stakingInfo[0]),
        pendingRewards: ethers.formatEther(stakingInfo[1]),
      });

      // Load transaction history from events
      await loadTransactionHistory(contracts);
      setLoading(false);
    } catch (error) {
      console.error('Error loading profile data:', error);
      setLoading(false);
    }
  };

  const loadTransactionHistory = async (contracts) => {
    try {
      // Normalize address to checksummed format
      const normalizedAccount = ethers.getAddress(account);

      // Get Staked events
      const stakedFilter = contracts.stakingPool.filters.Staked(normalizedAccount);
      const stakedEvents = await contracts.stakingPool.queryFilter(stakedFilter);

      // Get Withdrawn events
      const withdrawnFilter = contracts.stakingPool.filters.Withdrawn(normalizedAccount);
      const withdrawnEvents = await contracts.stakingPool.queryFilter(withdrawnFilter);

      // Get RewardPaid events
      const rewardFilter = contracts.stakingPool.filters.RewardPaid(normalizedAccount);
      const rewardEvents = await contracts.stakingPool.queryFilter(rewardFilter);

      // Get Swap events
      const swapFilter = contracts.tokenSwap.filters.SwapExecuted(normalizedAccount);
      const swapEvents = await contracts.tokenSwap.queryFilter(swapFilter);

      const txHistory = [];

      // Process staking events
      for (const event of stakedEvents) {
        txHistory.push({
          type: 'Stake',
          amount: ethers.formatEther(event.args.amount),
          token: 'DFI',
          timestamp: new Date(Number(event.blockNumber) * 1000).toLocaleString(),
          txHash: event.transactionHash,
        });
      }

      // Process withdrawal events
      for (const event of withdrawnEvents) {
        txHistory.push({
          type: 'Withdraw',
          amount: ethers.formatEther(event.args.amount),
          token: 'DFI',
          timestamp: new Date(Number(event.blockNumber) * 1000).toLocaleString(),
          txHash: event.transactionHash,
        });
      }

      // Process reward events
      for (const event of rewardEvents) {
        txHistory.push({
          type: 'Reward Claim',
          amount: ethers.formatEther(event.args.reward),
          token: 'REW',
          timestamp: new Date(Number(event.blockNumber) * 1000).toLocaleString(),
          txHash: event.transactionHash,
        });
      }

      // Process swap events
      for (const event of swapEvents) {
        txHistory.push({
          type: 'Swap',
          amount: ethers.formatEther(event.args.amountIn),
          token: event.args.tokenIn === contracts.token.target ? 'DFI' : 'REW',
          amountOut: ethers.formatEther(event.args.amountOut),
          tokenOut: event.args.tokenOut === contracts.token.target ? 'DFI' : 'REW',
          timestamp: new Date(Number(event.args.timestamp) * 1000).toLocaleString(),
          txHash: event.transactionHash,
        });
      }

      // Sort by timestamp (most recent first)
      txHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setTransactions(txHistory.slice(0, 20)); // Limit to 20 most recent
    } catch (error) {
      console.error('Error loading transaction history:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="card">
        <h2>Connect Wallet</h2>
        <p>Please connect your wallet to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card">
        <div className="loading">Loading profile data...</div>
      </div>
    );
  }

  const totalValue = (
    parseFloat(profileData.tokenBalance) +
    parseFloat(profileData.rewardTokenBalance) +
    parseFloat(profileData.stakedAmount)
  ).toFixed(2);

  return (
    <div className="profile-page">
      <h1 className="page-title">User Profile</h1>

      <div className="card">
        <h2>Account Information</h2>
        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Wallet Address:</span>
            <span className="info-value">{profileData.walletAddress}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Portfolio Value:</span>
            <span className="info-value">{totalValue} DFI</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>DFI Token Balance</h3>
          <div className="value">{parseFloat(profileData.tokenBalance).toFixed(4)}</div>
        </div>
        <div className="stat-card">
          <h3>REW Token Balance</h3>
          <div className="value">{parseFloat(profileData.rewardTokenBalance).toFixed(4)}</div>
        </div>
        <div className="stat-card">
          <h3>Staked Amount</h3>
          <div className="value">{parseFloat(profileData.stakedAmount).toFixed(4)} DFI</div>
        </div>
        <div className="stat-card">
          <h3>Pending Rewards</h3>
          <div className="value">{parseFloat(profileData.pendingRewards).toFixed(4)} REW</div>
        </div>
      </div>

      <div className="card">
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions found.</p>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Token</th>
                  <th>Timestamp</th>
                  <th>Transaction</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.type}</td>
                    <td>
                      {tx.amount}
                      {tx.amountOut && ` → ${tx.amountOut}`}
                    </td>
                    <td>
                      {tx.token}
                      {tx.tokenOut && ` → ${tx.tokenOut}`}
                    </td>
                    <td>{tx.timestamp}</td>
                    <td>
                      <a
                        href={`#`}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Transaction Hash: ${tx.txHash}`);
                        }}
                        className="tx-link"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

