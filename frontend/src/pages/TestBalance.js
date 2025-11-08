import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';
import contractAddresses from '../config/contractAddresses.json';
import DeFiTokenABI from '../utils/abis/DeFiToken.json';

function TestBalance() {
  const { account, signer, isConnected } = useWeb3();
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testBalance = async () => {
    setLoading(true);
    setResult('Testing...\n');
    
    try {
      // Step 1: Check connection
      setResult(prev => prev + '✅ Wallet connected\n');
      setResult(prev => prev + `Account: ${account}\n\n`);

      // Step 2: Check signer
      if (!signer) {
        setResult(prev => prev + '❌ No signer available\n');
        setLoading(false);
        return;
      }
      setResult(prev => prev + '✅ Signer available\n\n');

      // Step 3: Create contract
      setResult(prev => prev + 'Creating contract instance...\n');
      const tokenContract = new ethers.Contract(
        contractAddresses.tokenAddress,
        DeFiTokenABI,
        signer
      );
      setResult(prev => prev + `✅ Contract: ${contractAddresses.tokenAddress}\n\n`);

      // Step 4: Get token name
      setResult(prev => prev + 'Getting token name...\n');
      const name = await tokenContract.name();
      setResult(prev => prev + `✅ Token name: ${name}\n\n`);

      // Step 5: Get balance
      setResult(prev => prev + 'Getting balance...\n');
      const balance = await tokenContract.balanceOf(account);
      setResult(prev => prev + `✅ Raw balance: ${balance.toString()}\n`);
      
      const formatted = ethers.formatEther(balance);
      setResult(prev => prev + `✅ Formatted balance: ${formatted} DFI\n\n`);

      setResult(prev => prev + '🎉 SUCCESS! All tests passed!\n');
      
    } catch (error) {
      setResult(prev => prev + `\n❌ ERROR: ${error.message}\n`);
      console.error('Full error:', error);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Balance Test Page</h1>
      
      {!isConnected ? (
        <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
          <h2>Please connect your wallet first</h2>
          <p>Click "Connect Wallet" in the navigation bar</p>
        </div>
      ) : (
        <div>
          <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Connected</h3>
            <p><strong>Account:</strong> {account}</p>
            <p><strong>Network:</strong> Hardhat Local (should be Chain ID 1337)</p>
          </div>

          <button 
            onClick={testBalance}
            disabled={loading}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              background: loading ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px'
            }}
          >
            {loading ? 'Testing...' : 'Test Balance Loading'}
          </button>

          {result && (
            <div style={{
              padding: '20px',
              background: '#f5f5f5',
              borderRadius: '8px',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              fontSize: '14px'
            }}>
              {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TestBalance;
