import React, { useState } from 'react'
import axios from 'axios'

export default function QuizGenerator() {
  const [topic, setTopic] = useState('')
  const [numQuestions, setNumQuestions] = useState(5)
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState(null)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setLoading(true)
    setError('')
    setQuiz(null)
    setAnswers({})
    setShowResults(false)

    try {
      const response = await axios.post('/api/generate-quiz', {
        topic: topic,
        num_questions: numQuestions
      })

      if (response.data.success) {
        setQuiz(response.data.data)
      } else {
        setError(response.data.error || 'Failed to generate quiz')
      }
    } catch (err) {
      setError(err.message || 'Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (qIdx, answer) => {
    setAnswers({ ...answers, [qIdx]: answer })
  }

  const calculateScore = () => {
    let correct = 0
    quiz.quiz.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct++
      }
    })
    return { correct, total: quiz.quiz.length, percentage: Math.round((correct / quiz.quiz.length) * 100) }
  }

  const score = showResults ? calculateScore() : null

  return (
    <div className="space-y-8">
      {/* Quiz Setup */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Quiz Generator</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., World War 2"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Questions: <span className="text-green-600">{numQuestions}</span>
            </label>
            <input
              type="range"
              min="1"
              max="15"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateQuiz}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg'
              }`}
            >
              {loading ? '⏳ Generating...' : '✨ Generate Quiz'}
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

      {/* Quiz Display */}
      {quiz && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">📝 Quiz: {topic}</h2>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              {numQuestions} Questions
            </span>
          </div>

          <div className="space-y-8">
            {quiz.quiz.map((question, qIdx) => (
              <div key={qIdx} className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 transition-colors">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  <span className="text-green-600">Q{qIdx + 1}.</span> {question.question}
                </h3>

                <div className="space-y-3">
                  {question.options.map((option, oIdx) => {
                    const isSelected = answers[qIdx] === option.split(')')[0];
                    const isCorrect = showResults && option.split(')')[0] === question.correctAnswer;
                    const isWrong = showResults && isSelected && !isCorrect;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => !showResults && handleAnswer(qIdx, option.split(')')[0])}
                        disabled={showResults}
                        className={`w-full text-left p-4 rounded-lg border-2 font-semibold transition-all ${
                          isCorrect
                            ? 'border-green-500 bg-green-100 text-green-800'
                            : isWrong
                            ? 'border-red-500 bg-red-100 text-red-800'
                            : isSelected
                            ? 'border-blue-500 bg-blue-100 text-blue-800'
                            : 'border-gray-200 text-gray-800 hover:border-gray-400'
                        }`}
                      >
                        {option} {isCorrect && '✅'} {isWrong && '❌'}
                      </button>
                    )
                  })}
                </div>

                {showResults && (
                  <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <p className="text-sm text-blue-800"><strong>Explanation:</strong> {question.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          {!showResults && (
            <button
              onClick={() => setShowResults(true)}
              className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              📊 Submit & Check Answers
            </button>
          )}

          {/* Results */}
          {showResults && score && (
            <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 rounded-lg p-8 text-center">
              <h3 className="text-3xl font-bold text-green-800 mb-4">Quiz Complete! 🎉</h3>
              <div className="space-y-4">
                <p className="text-5xl font-bold text-green-600">{score.percentage}%</p>
                <p className="text-xl text-green-800">You got <span className="font-bold">{score.correct}</span> out of <span className="font-bold">{score.total}</span> correct</p>
                <button
                  onClick={() => {
                    setShowResults(false)
                    setQuiz(null)
                    setAnswers({})
                  }}
                  className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                >
                  Try Another Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
