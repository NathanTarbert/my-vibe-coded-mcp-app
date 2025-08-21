#!/bin/bash

# 🚀 Vibe Code Board - Quick Start Script
# This script will help you get up and running quickly!

echo "🎯 Welcome to Vibe Code Board with AI!"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18.17 or higher first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18.17 or higher is required. Current version: $(node -v)"
    echo "   Please update Node.js and try again."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "🔐 Environment configuration needed!"
    echo "=================================="
    echo ""
    echo "You need to create a .env.local file with your CopilotKit API key."
    echo ""
    echo "1. Visit: https://cloud.copilotkit.ai/"
    echo "2. Sign up for a free account"
    echo "3. Get your public API key"
    echo "4. Create a .env.local file with:"
    echo ""
    echo "   NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY=your_api_key_here"
    echo ""
    echo "⚠️  Without this key, the AI features won't work!"
    echo ""
    
    read -p "Do you want to create the .env.local file now? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your CopilotKit API key: " API_KEY
        echo "NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY=$API_KEY" > .env.local
        echo "✅ .env.local file created!"
    else
        echo "⚠️  Remember to create .env.local before starting the app!"
    fi
else
    echo "✅ .env.local file found"
fi

echo ""
echo "🚀 Starting development server..."
echo "================================="
echo ""
echo "Your app will be available at: http://localhost:3000"
echo ""
echo "🎯 Quick Actions:"
echo "   • Press Ctrl+/ (or Cmd+/ on Mac) to open the AI assistant"
echo "   • Try asking: 'Hello, what can you help me with?'"
echo "   • Test adding a task: 'Add a new task called Test Task'"
echo ""
echo "📚 For detailed instructions, see: DEVELOPER_WALKTHROUGH.md"
echo ""

# Start the development server
npm run dev
