import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import './Navbar.css';

function Navbar() {
  const { account, connectWallet, isConnected } = useWeb3();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">DeFi DApp</Link>
        </div>
        <div className="nav-links">
          <Link to="/" className={isActive('/')}>
            Home
          </Link>
          <Link to="/stake" className={isActive('/stake')}>
            Stake
          </Link>
          <Link to="/swap" className={isActive('/swap')}>
            Swap
          </Link>
          <Link to="/profile" className={isActive('/profile')}>
            Profile
          </Link>
        </div>
        <div className="nav-wallet">
          {isConnected ? (
            <div className="wallet-connected">
              <span className="wallet-status">Connected:</span>
              <span className="wallet-address">
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : ''}
              </span>
            </div>
          ) : (
            <button className="btn-connect" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

