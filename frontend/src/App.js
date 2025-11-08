import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Stake from './pages/Stake';
import Swap from './pages/Swap';
import Profile from './pages/Profile';
import TestBalance from './pages/TestBalance';
import { Web3Provider } from './context/Web3Context';
import './App.css';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stake" element={<Stake />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/test" element={<TestBalance />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;

