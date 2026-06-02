# 🎓 ClassMate AI - Your AI-Powered Study Companion

An intelligent study assistant powered by **Google Gemini AI**, built with React + FastAPI.

## 🌟 Features

- **📚 Syllabus Planner** - Upload your syllabus and get a personalized day-wise study schedule
- **❓ Doubt Solver** - Ask topic-based questions and get detailed explanations with examples
- **🎯 Quiz Generator** - Generate custom MCQ quizzes with answers and explanations
- **📝 Study Summary** - Paste your notes and get concise summaries with key points and practice questions

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Vite (build tool)
- Axios (API client)

**Backend:**
- FastAPI (Python web framework)
- Google Generative AI (Gemini API)
- Uvicorn (ASGI server)

**DevOps:**
- Docker & Docker Compose
- Google Cloud Run
- Multi-stage Docker builds

## 📋 Project Structure

```
classmate-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SyllabusPlanner.jsx
│   │   │   ├── DoubtSolver.jsx
│   │   │   ├── QuizGenerator.jsx
│   │   │   └── StudySummary.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   ├── main.py (FastAPI app with 4 endpoints)
│   └── requirements.txt
├── .env.example
└── README.md
```

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Google Gemini API Key (free at https://ai.google.dev/)

### Step 1: Setup

```bash
# Clone and navigate
git clone <repo-url>
cd classmate-ai

# Create .env file
cp .env.example .env

# Add your Gemini API Key to .env
nano .env
# GEMINI_API_KEY=your_actual_key_here
```

### Step 2: Frontend Setup

```bash
cd frontend
npm install
npm run build
npm run dev
# Opens on http://localhost:5173
```

### Step 3: Backend Setup (in another terminal)

```bash
# From project root
python -m venv venv

# Activate:
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

pip install -r backend/requirements.txt
python -m uvicorn backend.main:app --reload --port 8000
```

### That's it! 🎉

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API docs: http://localhost:8000/docs (Swagger UI)

## 📊 API Endpoints

All endpoints accept POST requests and return JSON:

### 1. Generate Syllabus Schedule
```bash
POST /api/syllabus-schedule
Content-Type: application/json

{
  "syllabus": "Chapter 1: Photosynthesis...",
  "weeks": 12
}

Response:
{
  "success": true,
  "data": {
    "schedule": [
      {
        "week": 1,
        "day": 1,
        "topics": ["topic1", "topic2"],
        "description": "..."
      }
    ]
  }
}
```

### 2. Solve Doubt (Q&A)
```bash
POST /api/solve-doubt
Content-Type: application/json

{
  "topic": "Photosynthesis",
  "question": "What is the Calvin cycle?"
}

Response:
{
  "success": true,
  "answer": "Detailed explanation..."
}
```

### 3. Generate Quiz
```bash
POST /api/generate-quiz
Content-Type: application/json

{
  "topic": "World War 2",
  "num_questions": 5
}

Response:
{
  "success": true,
  "data": {
    "quiz": [
      {
        "question": "...",
        "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
        "correctAnswer": "A",
        "explanation": "..."
      }
    ]
  }
}
```

### 4. Summarize Notes
```bash
POST /api/summarize-notes
Content-Type: application/json

{
  "notes": "Long notes text..."
}

Response:
{
  "success": true,
  "data": {
    "summary": "...",
    "keyPoints": ["point1", "point2"],
    "topicsToReview": ["topic1"],
    "practiceQuestion": "..."
  }
}
```

## 🎥 Demo & Screenshots

### Features Showcase:
1. **Syllabus Planner** - Upload syllabus → Get week-by-week study plan
2. **Doubt Solver** - Ask questions → Get expert explanations
3. **Quiz Generator** - Topic → MCQ quiz with scoring
4. **Study Summary** - Paste notes → Get summary + key points

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### API key errors
- Ensure `.env` file exists in project root
- Check API key is valid at https://ai.google.dev/
- Restart backend after changing `.env`

### Port already in use
```bash
# Run on different port
python -m uvicorn backend.main:app --reload --port 8001
```

### Backend not responding
- Make sure backend is running on port 8000
- Check `.env` has valid GEMINI_API_KEY
- Look for errors in backend terminal

## 📚 Resources

- [Google Generative AI](https://ai.google.dev/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)

---

**Made with ❤️ for students**
