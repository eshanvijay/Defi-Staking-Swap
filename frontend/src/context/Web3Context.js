import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();

        setAccount(accounts[0]);
        setProvider(provider);
        setSigner(signer);
        setIsConnected(true);
        setChainId(Number(network.chainId));

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            disconnectWallet();
          }
        });

        // Listen for chain changes
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please make sure MetaMask is installed.');
      }
    } else {
      alert('Please install MetaMask to use this DApp!');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setIsConnected(false);
    setChainId(null);
  };

  useEffect(() => {
    // Check if already connected
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts.length > 0) {
            connectWallet();
          }
        })
        .catch(console.error);
    }
  }, []);

  const value = {
    account,
    provider,
    signer,
    isConnected,
    chainId,
    connectWallet,
    disconnectWallet,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

