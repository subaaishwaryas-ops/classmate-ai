#!/bin/bash
# Quick start script for ClassMate AI

echo "🎓 ClassMate AI - Starting Up..."
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env and add your GEMINI_API_KEY"
    exit 1
fi

# Check for Python
if ! command -v python &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.11+"
    exit 1
fi

# Check for Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node 18+"
    exit 1
fi

echo "✅ Prerequisites found (Python, Node.js)"
echo ""

# Setup Python backend
if [ ! -d "venv" ]; then
    echo "🐍 Setting up Python virtual environment..."
    python -m venv venv
fi

echo "🚀 Activating Python environment..."
source venv/bin/activate

echo "📦 Installing backend dependencies..."
pip install -q -r backend/requirements.txt

# Setup Frontend
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install --silent
    cd ..
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Starting services..."
echo ""
echo "To run both services:"
echo "1. Open Terminal 1 and run:"
echo "   cd frontend && npm run dev"
echo ""
echo "2. Open Terminal 2 and run:"
echo "   source venv/bin/activate"
echo "   python -m uvicorn backend.main:app --reload --port 8000"
echo ""
echo "Then visit: http://localhost:5173"
