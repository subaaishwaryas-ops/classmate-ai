import React, { useState } from 'react'
import axios from 'axios'
import SyllabusPlanner from './components/SyllabusPlanner'
import DoubtSolver from './components/DoubtSolver'
import QuizGenerator from './components/QuizGenerator'
import StudySummary from './components/StudySummary'

export default function App() {
  const [activeTab, setActiveTab] = useState('syllabus')

  const tabs = [
    { id: 'syllabus', label: '📚 Syllabus Planner', component: SyllabusPlanner },
    { id: 'doubt', label: '❓ Doubt Solver', component: DoubtSolver },
    { id: 'quiz', label: '🎯 Quiz Generator', component: QuizGenerator },
    { id: 'summary', label: '📝 Study Summary', component: StudySummary }
  ]

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">🎓 ClassMate AI</h1>
          <p className="text-blue-100 mt-2">Your AI-Powered Study Companion - Built with Gemini AI & Google Cloud Run</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-md sticky top-20 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-4 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 font-semibold text-lg transition-all border-b-4 ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-purple-600'
                    : 'text-gray-600 border-transparent hover:text-purple-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {ActiveComponent && <ActiveComponent />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">
            ✨ Powered by <strong>Google Gemini AI</strong> | 
            💻 Built with <strong>React + FastAPI</strong>
          </p>
          <p className="text-xs text-gray-500 mt-4">ClassMate AI - Your AI-Powered Study Companion</p>
        </div>
      </footer>
    </div>
  )
}
