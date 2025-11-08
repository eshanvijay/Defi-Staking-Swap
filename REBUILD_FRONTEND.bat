@echo off
echo ========================================
echo   Complete Frontend Rebuild
echo ========================================
echo.
echo This will:
echo 1. Stop any running frontend
echo 2. Delete node_modules and cache
echo 3. Reinstall dependencies
echo 4. Start fresh
echo.
pause

cd frontend

echo.
echo [1/4] Cleaning old files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist .cache rmdir /s /q .cache
echo Done!

echo.
echo [2/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo [3/4] Clearing browser cache instructions...
echo.
echo IMPORTANT: When browser opens, do this:
echo 1. Press Ctrl + Shift + Delete
echo 2. Select "Cached images and files"
echo 3. Click "Clear data"
echo 4. OR just press Ctrl + Shift + R for hard refresh
echo.
pause

echo.
echo [4/4] Starting frontend...
call npm start
