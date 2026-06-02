import React, { useState } from 'react'
import axios from 'axios'

export default function DoubtSolver() {
  const [topic, setTopic] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const handleSolveDoubt = async () => {
    if (!topic.trim() || !question.trim()) {
      setError('Please enter both topic and question')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/solve-doubt', {
        topic: topic,
        question: question
      })

      if (response.data.success) {
        setAnswer(response.data.answer)
        setChatHistory([...chatHistory, { role: 'user', text: question }, { role: 'ai', text: response.data.answer }])
        setQuestion('')
      } else {
        setError(response.data.error || 'Failed to solve doubt')
      }
    } catch (err) {
      setError(err.message || 'Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 h-fit">
          <h3 className="font-bold text-indigo-900 mb-4">🎯 Common Topics</h3>
          <div className="space-y-2">
            {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'History', 'Literature'].map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={`w-full text-left py-2 px-3 rounded font-semibold transition-all ${
                  topic === t
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-700 hover:bg-indigo-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💬 Ask Your Questions</h2>

          {/* Topic Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Photosynthesis, Quadratic Equations"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Question Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && handleSolveDoubt()}
              placeholder="Ask your question here... (Ctrl+Enter to submit)"
              className="w-full h-32 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSolveDoubt}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg'
            }`}
          >
            {loading ? '🔍 Finding Answer...' : '💡 Solve My Doubt'}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-4 rounded text-red-700">
              <p className="font-semibold">⚠️ Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Current Answer */}
          {answer && (
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-4">📚 Answer</h3>
              <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                {answer}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">📖 Your Question History</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
