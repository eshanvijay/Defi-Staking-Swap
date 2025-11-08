import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { getContracts } from '../utils/contracts';
import { ethers } from 'ethers';
import './Swap.css';

function Swap() {
  const { account, signer, isConnected } = useWeb3();
  const [swapAmount, setSwapAmount] = useState('');
  const [swapDirection, setSwapDirection] = useState('AToB'); // 'AToB' or 'BToA'
  const [outputAmount, setOutputAmount] = useState('0');
  const [exchangeRate, setExchangeRate] = useState('2');
  const [balances, setBalances] = useState({
    tokenA: '950000',
    tokenB: '900000',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isConnected && signer) {
      loadBalances();
      loadExchangeRate();
      const interval = setInterval(() => {
        loadBalances();
        loadExchangeRate();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isConnected, signer, account]);

  useEffect(() => {
    if (swapAmount && parseFloat(swapAmount) > 0) {
      calculateOutput();
    } else {
      setOutputAmount('0');
    }
  }, [swapAmount, swapDirection, exchangeRate]);

  const loadBalances = async () => {
    try {
      const contracts = getContracts(signer);
      if (!contracts) return;

      // Normalize address to checksummed format
      const normalizedAccount = ethers.getAddress(account);

      const [balanceA, balanceB] = await Promise.all([
        contracts.token.balanceOf(normalizedAccount),
        contracts.rewardToken.balanceOf(normalizedAccount),
      ]);

      setBalances({
        tokenA: ethers.formatEther(balanceA),
        tokenB: ethers.formatEther(balanceB),
      });
    } catch (error) {
      console.error('Error loading balances:', error);
    }
  };

  const loadExchangeRate = async () => {
    try {
      const contracts = getContracts(signer);
      if (!contracts) return;

      const rate = await contracts.tokenSwap.exchangeRate();
      setExchangeRate(rate.toString());
    } catch (error) {
      console.error('Error loading exchange rate:', error);
    }
  };

  const calculateOutput = async () => {
    try {
      const contracts = getContracts(signer);
      if (!contracts || !swapAmount || parseFloat(swapAmount) <= 0) return;

      const amountIn = ethers.parseEther(swapAmount);
      const isAToB = swapDirection === 'AToB';
      const amountOut = await contracts.tokenSwap.getSwapAmount(amountIn, isAToB);
      setOutputAmount(ethers.formatEther(amountOut));
    } catch (error) {
      console.error('Error calculating output:', error);
      setOutputAmount('0');
    }
  };

  const handleSwap = async () => {
    if (!swapAmount || parseFloat(swapAmount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const contracts = getContracts(signer);
      const amount = ethers.parseEther(swapAmount);

      let tx;
      if (swapDirection === 'AToB') {
        // Approve first
        const approveTx = await contracts.token.approve(
          contracts.tokenSwap.target,
          amount
        );
        await approveTx.wait();

        // Then swap
        tx = await contracts.tokenSwap.swapAToB(amount);
      } else {
        // Approve first
        const approveTx = await contracts.rewardToken.approve(
          contracts.tokenSwap.target,
          amount
        );
        await approveTx.wait();

        // Then swap
        tx = await contracts.tokenSwap.swapBToA(amount);
      }

      const receipt = await tx.wait();

      setMessage({
        type: 'success',
        text: `Swap successful! Transaction: ${receipt.hash}`,
      });
      setSwapAmount('');
      setOutputAmount('0');
      loadBalances();
    } catch (error) {
      console.error('Error swapping:', error);
      setMessage({
        type: 'error',
        text: error.reason || 'Failed to swap tokens',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchDirection = () => {
    setSwapDirection(swapDirection === 'AToB' ? 'BToA' : 'AToB');
    setSwapAmount('');
    setOutputAmount('0');
  };

  if (!isConnected) {
    return (
      <div className="card">
        <h2>Connect Wallet</h2>
        <p>Please connect your wallet to swap tokens.</p>
      </div>
    );
  }

  return (
    <div className="swap-page">
      <h1 className="page-title">Token Swap</h1>

      <div className="swap-info">
        <div className="info-card">
          <h3>Exchange Rate</h3>
          <p>1 DFI = {exchangeRate} REW</p>
        </div>
        <div className="info-card">
          <h3>Your DFI Balance</h3>
          <p>{parseFloat(balances.tokenA).toFixed(4)} DFI</p>
        </div>
        <div className="info-card">
          <h3>Your REW Balance</h3>
          <p>{parseFloat(balances.tokenB).toFixed(4)} REW</p>
        </div>
      </div>

      {message.text && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}

      <div className="card swap-card">
        <h2>Swap Tokens</h2>
        
        <div className="swap-container">
          <div className="swap-input-group">
            <label>From</label>
            <div className="input-with-balance">
              <input
                type="number"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                placeholder="Enter amount"
                disabled={loading}
              />
              <div className="token-info">
                <span className="token-name">
                  {swapDirection === 'AToB' ? 'DFI' : 'REW'}
                </span>
                <span className="balance">
                  Balance: {swapDirection === 'AToB' 
                    ? parseFloat(balances.tokenA).toFixed(4) 
                    : parseFloat(balances.tokenB).toFixed(4)}
                </span>
              </div>
            </div>
          </div>

          <div className="swap-arrow" onClick={handleSwitchDirection}>
            <button className="switch-btn">⇅</button>
          </div>

          <div className="swap-input-group">
            <label>To</label>
            <div className="input-with-balance">
              <input
                type="text"
                value={outputAmount}
                readOnly
                className="output-input"
              />
              <div className="token-info">
                <span className="token-name">
                  {swapDirection === 'AToB' ? 'REW' : 'DFI'}
                </span>
                <span className="balance">
                  Balance: {swapDirection === 'AToB' 
                    ? parseFloat(balances.tokenB).toFixed(4) 
                    : parseFloat(balances.tokenA).toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn"
          onClick={handleSwap}
          disabled={loading || !swapAmount || parseFloat(swapAmount) <= 0}
        >
          {loading ? 'Processing...' : 'Swap Tokens'}
        </button>
      </div>
    </div>
  );
}

export default Swap;

