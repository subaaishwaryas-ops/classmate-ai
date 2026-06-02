import React, { useState } from 'react'
import axios from 'axios'

export default function StudySummary() {
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState('')

  const handleSummarize = async () => {
    if (!notes.trim()) {
      setError('Please paste your notes')
      return
    }

    setLoading(true)
    setError('')
    setSummary(null)

    try {
      const response = await axios.post('/api/summarize-notes', {
        notes: notes
      })

      if (response.data.success) {
        setSummary(response.data.data)
      } else {
        setError(response.data.error || 'Failed to summarize notes')
      }
    } catch (err) {
      setError(err.message || 'Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Paste Your Notes</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Study Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your class notes, book excerpts, or study material here..."
                className="w-full h-56 p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSummarize}
                disabled={loading}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-all ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-lg'
                }`}
              >
                {loading ? '⏳ Summarizing...' : '✨ Generate Summary'}
              </button>
              <button
                onClick={() => {
                  setNotes('')
                  setSummary(null)
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-gray-400"
              >
                Clear
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-4 rounded text-red-700">
              <p className="font-semibold">⚠️ Error</p>
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6 h-fit">
          <h3 className="font-bold text-orange-900 mb-4">💡 Pro Tips</h3>
          <ul className="space-y-3 text-sm text-orange-800">
            <li className="flex gap-2">
              <span>✏️</span>
              <span>Paste complete lecture notes</span>
            </li>
            <li className="flex gap-2">
              <span>📖</span>
              <span>Include important definitions</span>
            </li>
            <li className="flex gap-2">
              <span>🎯</span>
              <span>Add examples and formulas</span>
            </li>
            <li className="flex gap-2">
              <span>⚡</span>
              <span>AI will extract key points</span>
            </li>
            <li className="flex gap-2">
              <span>🔖</span>
              <span>Get practice questions too!</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Summary Output */}
      {summary && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📋 Concise Summary
            </h2>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg p-6">
              <p className="text-gray-800 leading-relaxed text-lg">
                {summary.summary}
              </p>
            </div>
          </div>

          {/* Key Points */}
          {summary.keyPoints && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                ⭐ Key Points
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {summary.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                    <span className="text-orange-600 font-bold text-xl flex-shrink-0">{idx + 1}</span>
                    <p className="text-gray-800">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics to Review */}
          {summary.topicsToReview && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                🔍 Topics to Review
              </h2>
              <div className="flex flex-wrap gap-3">
                {summary.topicsToReview.map((topic, idx) => (
                  <span key={idx} className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-semibold text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Practice Question */}
          {summary.practiceQuestion && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                ❓ Practice Question
              </h2>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6">
                <p className="text-gray-800 text-lg font-semibold mb-3">
                  {summary.practiceQuestion}
                </p>
                <p className="text-gray-600 text-sm italic">
                  Try answering this question to test your understanding!
                </p>
              </div>
            </div>
          )}

          {/* Export Button */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                const text = `Summary: ${summary.summary}\n\nKey Points:\n${summary.keyPoints?.join('\n')}\n\nTopics to Review:\n${summary.topicsToReview?.join(', ')}\n\nPractice Question:\n${summary.practiceQuestion}`
                navigator.clipboard.writeText(text)
                alert('Summary copied to clipboard!')
              }}
              className="flex-1 py-3 px-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all"
            >
              📋 Copy to Clipboard
            </button>
            <button
              onClick={() => {
                setNotes('')
                setSummary(null)
              }}
              className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-gray-400"
            >
              ➕ Summarize Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
