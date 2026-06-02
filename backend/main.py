from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
from pathlib import Path
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI()

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set in environment variables")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-pro")

# Request models
class SyllabusRequest(BaseModel):
    syllabus: str
    weeks: int = 12

class DoubtRequest(BaseModel):
    topic: str
    question: str

class QuizRequest(BaseModel):
    topic: str
    num_questions: int = 5

class SummaryRequest(BaseModel):
    notes: str

# 1. Syllabus Planner Endpoint
@app.post("/api/syllabus-schedule")
async def syllabus_schedule(request: SyllabusRequest):
    try:
        prompt = f"""Based on this syllabus, create a detailed day-wise study schedule for {request.weeks} weeks.
        
Syllabus:
{request.syllabus}

Format the response as a JSON object with this structure:
{{
  "schedule": [
    {{
      "week": 1,
      "day": 1,
      "topics": ["topic1", "topic2"],
      "description": "what to study"
    }}
  ]
}}

Return ONLY valid JSON, no markdown or extra text."""
        
        response = model.generate_content(prompt)
        
        # Parse the response
        response_text = response.text.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
        
        schedule = json.loads(response_text)
        return {"success": True, "data": schedule}
    except Exception as e:
        return {"success": False, "error": str(e)}

# 2. Doubt Solver Endpoint
@app.post("/api/solve-doubt")
async def solve_doubt(request: DoubtRequest):
    try:
        prompt = f"""You are an expert tutor. Answer this student's question clearly and concisely.

Topic: {request.topic}
Question: {request.question}

Provide:
1. A clear, step-by-step answer
2. Key concepts explained
3. One practical example
4. Related topics to explore

Keep the answer educational but easy to understand."""
        
        response = model.generate_content(prompt)
        
        return {
            "success": True,
            "answer": response.text
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# 3. Quiz Generator Endpoint
@app.post("/api/generate-quiz")
async def generate_quiz(request: QuizRequest):
    try:
        prompt = f"""Generate {request.num_questions} multiple choice questions for the topic: {request.topic}

Format as JSON with this structure:
{{
  "quiz": [
    {{
      "question": "question text",
      "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
      "correctAnswer": "A",
      "explanation": "why this is correct"
    }}
  ]
}}

Return ONLY valid JSON, no markdown."""
        
        response = model.generate_content(prompt)
        
        response_text = response.text.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
        
        quiz = json.loads(response_text)
        return {"success": True, "data": quiz}
    except Exception as e:
        return {"success": False, "error": str(e)}

# 4. Study Summary Endpoint
@app.post("/api/summarize-notes")
async def summarize_notes(request: SummaryRequest):
    try:
        prompt = f"""Summarize these notes and extract key points.

Notes:
{request.notes}

Provide:
1. A concise summary (3-5 sentences)
2. Top 5 key points
3. Recommended topics to review
4. One practice question

Format as JSON:
{{
  "summary": "...",
  "keyPoints": ["point1", "point2", ...],
  "topicsToReview": ["topic1", "topic2"],
  "practiceQuestion": "..."
}}

Return ONLY valid JSON."""
        
        response = model.generate_content(prompt)
        
        response_text = response.text.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
        
        summary = json.loads(response_text)
        return {"success": True, "data": summary}
    except Exception as e:
        return {"success": False, "error": str(e)}

# Health check
@app.get("/api/health")
async def health():
    return {"status": "ok"}

# Serve static React files
FRONTEND_BUILD = Path(__file__).parent.parent / "frontend" / "dist"

if FRONTEND_BUILD.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_BUILD), html=True), name="static")
else:
    @app.get("/")
    async def root():
        return {"message": "ClassMate AI Backend is running. Build and deploy frontend for full app."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
