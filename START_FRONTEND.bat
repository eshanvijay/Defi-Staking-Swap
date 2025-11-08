@echo off
echo ========================================
echo   Starting DeFi Frontend
echo ========================================
echo.
echo Make sure:
echo 1. Hardhat node is running (npx hardhat node)
echo 2. Contracts are deployed
echo 3. MetaMask is configured
echo.
echo Starting frontend in 3 seconds...
timeout /t 3 /nobreak > nul
cd frontend
call npm start
