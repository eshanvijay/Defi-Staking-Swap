@echo off
echo ========================================
echo   DeFi Project - Complete Setup
echo ========================================
echo.

echo This script will help you set up and run your DeFi project.
echo Make sure you have Node.js and npm installed.
echo.
pause

echo.
echo [1/5] Installing dependencies...
echo.
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Installing frontend dependencies...
echo.
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [3/5] Compiling smart contracts...
echo.
call npx hardhat compile
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile contracts
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Now you need to:
echo.
echo 1. Open a NEW terminal and run: npx hardhat node
echo    (Keep it running!)
echo.
echo 2. After Hardhat node is running, come back here and press any key...
pause

echo.
echo [4/5] Deploying contracts to local network...
echo.
call npx hardhat run scripts/deploy.js --network localhost
if %errorlevel% neq 0 (
    echo ERROR: Failed to deploy contracts
    echo Make sure Hardhat node is running!
    pause
    exit /b 1
)

echo.
echo [5/5] Transferring tokens to test account...
echo.
call npx hardhat run scripts/transferTokensEasy.js --network localhost
if %errorlevel% neq 0 (
    echo ERROR: Failed to transfer tokens
    pause
    exit /b 1
)

echo.
echo ========================================
echo   All Done! Ready to Start Frontend
echo ========================================
echo.
echo To start the frontend, run:
echo   cd frontend
echo   npm start
echo.
echo Or just run: START_FRONTEND.bat
echo.
pause
