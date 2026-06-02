import React, { useState } from 'react'
import axios from 'axios'

export default function SyllabusPlanner() {
  const [syllabus, setSyllabus] = useState('')
  const [weeks, setWeeks] = useState(12)
  const [loading, setLoading] = useState(false)
  const [schedule, setSchedule] = useState(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!syllabus.trim()) {
      setError('Please paste your syllabus')
      return
    }

    setLoading(true)
    setError('')
    setSchedule(null)

    try {
      const response = await axios.post('/api/syllabus-schedule', {
        syllabus: syllabus,
        weeks: weeks
      })

      if (response.data.success) {
        setSchedule(response.data.data)
      } else {
        setError(response.data.error || 'Failed to generate schedule')
      }
    } catch (err) {
      setError(err.message || 'Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Upload Your Syllabus</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Paste Your Syllabus
              </label>
              <textarea
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                placeholder="Paste your syllabus here... Include topics, chapters, and course outline"
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Weeks: <span className="text-purple-600 font-bold">{weeks}</span>
              </label>
              <input
                type="range"
                min="4"
                max="26"
                value={weeks}
                onChange={(e) => setWeeks(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>4 weeks</span>
                <span>26 weeks</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:scale-105'
              }`}
            >
              {loading ? '⏳ Generating Your Schedule...' : '✨ Generate Study Schedule'}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 h-fit">
          <h3 className="font-bold text-purple-900 mb-4">💡 How It Works</h3>
          <ul className="space-y-3 text-sm text-purple-800">
            <li className="flex gap-2">
              <span>1️⃣</span>
              <span>Paste your complete syllabus</span>
            </li>
            <li className="flex gap-2">
              <span>2️⃣</span>
              <span>Choose study duration in weeks</span>
            </li>
            <li className="flex gap-2">
              <span>3️⃣</span>
              <span>AI generates day-wise plan</span>
            </li>
            <li className="flex gap-2">
              <span>4️⃣</span>
              <span>Follow and excel! 🎓</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded text-red-700">
          <p className="font-semibold">⚠️ Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Schedule Output */}
      {schedule && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 Your Personalized Study Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schedule.schedule?.slice(0, 10).map((item, idx) => (
              <div key={idx} className="border-2 border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-purple-600 mb-2">
                  Week {item.week} - Day {item.day}
                </h3>
                <p className="text-gray-700 text-sm mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.topics?.map((topic, i) => (
                    <span key={i} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
