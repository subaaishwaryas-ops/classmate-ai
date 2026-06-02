# 📦 ClassMate AI - Complete Setup Guide

## 📁 Project Structure Created

```
classmate-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SyllabusPlanner.jsx      ✅ Upload syllabus → get study plan
│   │   │   ├── DoubtSolver.jsx          ✅ Ask questions → get answers
│   │   │   ├── QuizGenerator.jsx        ✅ Generate MCQ quizzes
│   │   │   └── StudySummary.jsx         ✅ Summarize notes
│   │   ├── App.jsx                      ✅ Main app component
│   │   ├── main.jsx                     ✅ React entry point
│   │   └── index.css                    ✅ Tailwind imports
│   ├── index.html                       ✅ HTML entry
│   ├── package.json                     ✅ Node dependencies
│   ├── vite.config.js                   ✅ Vite build config
│   ├── tailwind.config.js               ✅ Tailwind styling
│   └── postcss.config.js                ✅ PostCSS config
│
├── backend/
│   ├── main.py                          ✅ FastAPI backend (4 endpoints)
│   └── requirements.txt                 ✅ Python dependencies
│
├── .env.example                         ✅ Environment template
├── .gitignore                           ✅ Git ignore rules
├── Dockerfile                           ✅ Docker container (optional)
├── .dockerignore                        ✅ Docker ignore
├── setup.sh                             ✅ Auto-setup for Mac/Linux
├── setup.bat                            ✅ Auto-setup for Windows
└── README.md                            ✅ Full documentation
```

## 🚀 Get Started in 3 Steps

### Step 1: Get Your API Key (2 min)
1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create a new API key
4. Copy the key

### Step 2: Configure Project (1 min)
```bash
# Download all files
git clone <your-repo-url>
cd classmate-ai

# Create .env file
cp .env.example .env

# Edit .env and paste your key:
# GEMINI_API_KEY=paste_your_key_here
```

**Windows Users:** Just edit `.env` in Notepad/VS Code

### Step 3: Run the App (2 min)

**Option A: Using Setup Script (Easiest)**
```bash
# Mac/Linux:
bash setup.sh

# Windows:
setup.bat
```

**Option B: Manual Setup**

Terminal 1 - Start Frontend:
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Terminal 2 - Start Backend:
```bash
python -m venv venv

# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload --port 8000
```

## ✨ Features Overview

### 📚 Syllabus Planner
- Upload your course syllabus
- AI generates day-by-day study schedule
- Distributes topics across weeks
- Example: Upload 200-page syllabus → Get 12-week plan

### ❓ Doubt Solver  
- Ask topic-specific questions
- Get AI expert explanations
- Includes examples and key concepts
- Chat-style interface
- Question history

### 🎯 Quiz Generator
- Input any topic
- Auto-generate MCQ quizzes
- Instant answer checking
- Shows explanations
- Score calculation

### 📝 Study Summary
- Paste your notes
- Get concise summary
- Extract key points
- Get practice questions
- Copy to clipboard

## 🔧 Troubleshooting

**"API key not found"**
- Make sure .env exists in project root
- Check GEMINI_API_KEY is correct
- Restart backend

**"Frontend not connecting to backend"**
- Frontend runs on port 5173
- Backend runs on port 8000
- Both must be running
- Check browser console for errors

**"npm install fails"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**"Python packages fail"**
```bash
pip install --upgrade pip
pip install -r backend/requirements.txt
```

**"Port already in use"**
```bash
# Use different port:
python -m uvicorn backend.main:app --port 8001
```

## 🌐 API Endpoints (Direct Usage)

All endpoints are POST requests returning JSON:

### 1. Generate Study Schedule
```bash
curl -X POST http://localhost:8000/api/syllabus-schedule \
  -H "Content-Type: application/json" \
  -d '{"syllabus":"Chapter 1...", "weeks":12}'
```

### 2. Solve Doubt
```bash
curl -X POST http://localhost:8000/api/solve-doubt \
  -H "Content-Type: application/json" \
  -d '{"topic":"Photosynthesis", "question":"What is it?"}'
```

### 3. Generate Quiz
```bash
curl -X POST http://localhost:8000/api/generate-quiz \
  -H "Content-Type: application/json" \
  -d '{"topic":"Physics", "num_questions":5}'
```

### 4. Summarize Notes
```bash
curl -X POST http://localhost:8000/api/summarize-notes \
  -H "Content-Type: application/json" \
  -d '{"notes":"Long text..."}'
```

### Health Check
```bash
curl http://localhost:8000/api/health
```

## 📊 File Sizes

- Frontend: ~15KB (minified)
- Backend: ~8KB 
- React components: ~25KB total
- Dependencies: ~1.5GB (node_modules) - NOT included in repo

## ⚙️ System Requirements

| Component | Requirement |
|-----------|------------|
| Node.js | 18.0+ |
| Python | 3.11+ |
| RAM | 4GB+ |
| Disk | 500MB+ (with node_modules) |
| Internet | Required (Gemini API calls) |

## 🔐 API Key Safety

✅ API key stored only in .env (not in repo)  
✅ .env included in .gitignore  
✅ Never commit .env to git  
✅ Backend safely calls Gemini API  
✅ Frontend never sees raw API key  

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Responsive design

## 🎯 What's Next?

After running successfully:
1. Test all 4 features
2. Try different topics
3. Check backend logs for API calls
4. Build & deploy when ready
5. Share with friends!

## 📞 Support

1. Check README.md
2. Review troubleshooting section
3. Check .env has valid API key
4. Ensure both services are running
5. Look at terminal error messages

---

**You're all set! 🚀 Happy studying!**
