#!/bin/bash

echo "🚀 Setting up Chat Wrapper UI Showcase..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install main package dependencies (if needed)
echo "📦 Installing main package dependencies..."
npm install

# Build the main package
echo "🔨 Building the chat wrapper component..."
npm run build

# Install showcase dependencies
echo "📦 Installing showcase dependencies..."
cd showcase
npm install

echo "✅ Setup complete!"
echo ""
echo "🎯 To start the showcase:"
echo "   npm run showcase"
echo ""
echo "📖 Or manually:"
echo "   cd showcase && npm run dev"
echo ""
echo "🌐 The showcase will be available at http://localhost:3000"