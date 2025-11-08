import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { getContracts } from '../utils/contracts';
import { ethers } from 'ethers';
import './Stake.css';

function Stake() {
  const { account, signer, isConnected } = useWeb3();
  const [stakeAmount, setStakeAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [stakingInfo, setStakingInfo] = useState({
    staked: '5000',
    pendingRewards: '250',
    stakingTimestamp: Date.now(),
  });
  const [tokenBalance, setTokenBalance] = useState('945000');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isConnected && signer) {
      loadStakingInfo();
      const interval = setInterval(loadStakingInfo, 3000);
      return () => clearInterval(interval);
    }
  }, [isConnected, signer, account]);

  const loadStakingInfo = async () => {
    try {
      const contracts = getContracts(signer);
      if (!contracts) return;

      // Normalize address to checksummed format
      const normalizedAccount = ethers.getAddress(account);

      const [info, balance] = await Promise.all([
        contracts.stakingPool.getUserStakingInfo(normalizedAccount),
        contracts.token.balanceOf(normalizedAccount),
      ]);

      setStakingInfo({
        staked: ethers.formatEther(info[0]),
        pendingRewards: ethers.formatEther(info[1]),
        stakingTimestamp: Number(info[2]),
      });

      setTokenBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error('Error loading staking info:', error);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const contracts = getContracts(signer);
      const amount = ethers.parseEther(stakeAmount);

      // Approve first
      const approveTx = await contracts.token.approve(
        contracts.stakingPool.target,
        amount
      );
      await approveTx.wait();

      // Then stake
      const tx = await contracts.stakingPool.stake(amount);
      const receipt = await tx.wait();

      setMessage({
        type: 'success',
        text: `Successfully staked ${stakeAmount} DFI tokens! Transaction: ${receipt.hash}`,
      });
      setStakeAmount('');
      loadStakingInfo();
    } catch (error) {
      console.error('Error staking:', error);
      setMessage({
        type: 'error',
        text: error.reason || 'Failed to stake tokens',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    if (parseFloat(withdrawAmount) > parseFloat(stakingInfo.staked)) {
      setMessage({ type: 'error', text: 'Insufficient staked balance' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const contracts = getContracts(signer);
      const amount = ethers.parseEther(withdrawAmount);

      const tx = await contracts.stakingPool.withdraw(amount);
      const receipt = await tx.wait();

      setMessage({
        type: 'success',
        text: `Successfully withdrawn ${withdrawAmount} DFI tokens! Transaction: ${receipt.hash}`,
      });
      setWithdrawAmount('');
      loadStakingInfo();
    } catch (error) {
      console.error('Error withdrawing:', error);
      setMessage({
        type: 'error',
        text: error.reason || 'Failed to withdraw tokens',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetReward = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const contracts = getContracts(signer);
      const tx = await contracts.stakingPool.getReward();
      const receipt = await tx.wait();

      setMessage({
        type: 'success',
        text: `Successfully claimed rewards! Transaction: ${receipt.hash}`,
      });
      loadStakingInfo();
    } catch (error) {
      console.error('Error getting reward:', error);
      setMessage({
        type: 'error',
        text: error.reason || 'Failed to claim rewards',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExit = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const contracts = getContracts(signer);
      const tx = await contracts.stakingPool.exit();
      const receipt = await tx.wait();

      setMessage({
        type: 'success',
        text: `Successfully exited staking pool! Transaction: ${receipt.hash}`,
      });
      loadStakingInfo();
    } catch (error) {
      console.error('Error exiting:', error);
      setMessage({
        type: 'error',
        text: error.reason || 'Failed to exit staking pool',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="card">
        <h2>Connect Wallet</h2>
        <p>Please connect your wallet to stake tokens.</p>
      </div>
    );
  }

  return (
    <div className="stake-page">
      <h1 className="page-title">Token Staking</h1>

      <div className="staking-stats">
        <div className="stat-card">
          <h3>Staked Balance</h3>
          <div className="value">{parseFloat(stakingInfo.staked).toFixed(4)} DFI</div>
        </div>
        <div className="stat-card">
          <h3>Pending Rewards</h3>
          <div className="value">{parseFloat(stakingInfo.pendingRewards).toFixed(4)} REW</div>
        </div>
        <div className="stat-card">
          <h3>Available Balance</h3>
          <div className="value">{parseFloat(tokenBalance).toFixed(4)} DFI</div>
        </div>
      </div>

      {message.text && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}

      <div className="card">
        <h2>Stake Tokens</h2>
        <div className="input-group">
          <label>Amount to Stake (DFI)</label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Enter amount"
            disabled={loading}
          />
          <p className="info-text">
            Available: {parseFloat(tokenBalance).toFixed(4)} DFI
          </p>
        </div>
        <button
          className="btn"
          onClick={handleStake}
          disabled={loading || !stakeAmount}
        >
          {loading ? 'Processing...' : 'Stake Tokens'}
        </button>
      </div>

      <div className="card">
        <h2>Withdraw Staked Tokens</h2>
        <div className="input-group">
          <label>Amount to Withdraw (DFI)</label>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter amount"
            disabled={loading}
          />
          <p className="info-text">
            Staked: {parseFloat(stakingInfo.staked).toFixed(4)} DFI
          </p>
        </div>
        <button
          className="btn"
          onClick={handleWithdraw}
          disabled={loading || !withdrawAmount}
        >
          {loading ? 'Processing...' : 'Withdraw Tokens'}
        </button>
      </div>

      <div className="card">
        <h2>Rewards</h2>
        <p className="info-text">
          You have {parseFloat(stakingInfo.pendingRewards).toFixed(4)} REW tokens ready to claim.
        </p>
        <div className="button-group">
          <button
            className="btn btn-success"
            onClick={handleGetReward}
            disabled={loading || parseFloat(stakingInfo.pendingRewards) === 0}
          >
            {loading ? 'Processing...' : 'Claim Rewards'}
          </button>
          <button
            className="btn btn-danger"
            onClick={handleExit}
            disabled={loading || parseFloat(stakingInfo.staked) === 0}
          >
            {loading ? 'Processing...' : 'Exit Pool (Withdraw + Claim)'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stake;

