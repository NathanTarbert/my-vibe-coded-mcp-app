@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🎯 Welcome to Vibe Code Board with AI!
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18.17 or higher first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2 delims=." %%a in ('node -v') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% lss 18 (
    echo ❌ Node.js version 18.17 or higher is required. Current version: 
    node -v
    echo    Please update Node.js and try again.
    pause
    exit /b 1
)

echo ✅ Node.js 
node -v
echo detected

REM Check if npm is available
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm and try again.
    pause
    exit /b 1
)

echo ✅ npm 
npm -v
echo detected
echo.

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies. Please check your internet connection and try again.
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!
echo.

REM Check if .env.local exists
if not exist ".env.local" (
    echo 🔐 Environment configuration needed!
    echo ==================================
    echo.
    echo You need to create a .env.local file with your CopilotKit API key.
    echo.
    echo 1. Visit: https://cloud.copilotkit.ai/
    echo 2. Sign up for a free account
    echo 3. Get your public API key
    echo 4. Create a .env.local file with:
    echo.
    echo    NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY=your_api_key_here
    echo.
    echo ⚠️  Without this key, the AI features won't work!
    echo.
    
    set /p CREATE_ENV="Do you want to create the .env.local file now? (y/n): "
    
    if /i "!CREATE_ENV!"=="y" (
        set /p API_KEY="Enter your CopilotKit API key: "
        echo NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY=!API_KEY! > .env.local
        echo ✅ .env.local file created!
    ) else (
        echo ⚠️  Remember to create .env.local before starting the app!
    )
) else (
    echo ✅ .env.local file found
)

echo.
echo 🚀 Starting development server...
echo =================================
echo.
echo Your app will be available at: http://localhost:3000
echo.
echo 🎯 Quick Actions:
echo    • Press Ctrl+/ to open the AI assistant
echo    • Try asking: 'Hello, what can you help me with?'
echo    • Test adding a task: 'Add a new task called Test Task'
echo.
echo 📚 For detailed instructions, see: DEVELOPER_WALKTHROUGH.md
echo.

REM Start the development server
npm run dev

pause
