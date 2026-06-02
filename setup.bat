@echo off
REM Quick start script for ClassMate AI on Windows

echo 🎓 ClassMate AI - Starting Up...
echo.

REM Check for .env file
if not exist .env (
    echo ⚠️  .env file not found!
    echo Creating .env from .env.example...
    copy .env.example .env
    echo 📝 Please edit .env and add your GEMINI_API_KEY
    pause
    exit /b 1
)

REM Check for Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.11+
    pause
    exit /b 1
)

REM Check for Node
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node 18+
    pause
    exit /b 1
)

echo ✅ Prerequisites found (Python, Node.js)
echo.

REM Setup Python backend
if not exist venv (
    echo 🐍 Setting up Python virtual environment...
    python -m venv venv
)

echo 🚀 Activating Python environment...
call venv\Scripts\activate.bat

echo 📦 Installing backend dependencies...
pip install -q -r backend\requirements.txt

REM Setup Frontend
if not exist frontend\node_modules (
    echo 📦 Installing frontend dependencies...
    cd frontend
    npm install --silent
    cd ..
)

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Starting services:
echo.
echo 1. Open Command Prompt and run:
echo    cd frontend
echo    npm run dev
echo.
echo 2. Open another Command Prompt and run:
echo    venv\Scripts\activate.bat
echo    python -m uvicorn backend.main:app --reload --port 8000
echo.
echo Then visit: http://localhost:5173
echo.
pause
