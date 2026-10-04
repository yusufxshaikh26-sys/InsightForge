import React, { useState } from 'react'
import { Activity, Award, BookOpen, CheckCircle2, Heart, Languages, MessageCircle, SkipForward, Sparkles, Trophy, Volume2, Zap } from 'lucide-react'
import { useThemeStore } from '@/hooks/useThemeStore'

const vocabulary = [
  {
    id: 1,
    english: 'Hello',
    question: 'What is the Spanish word for "Hello"?',
    options: ['Hola', 'Buenos días', 'Adiós', 'Gracias'],
    correct: 'Hola',
    difficulty: 'easy',
  },
  {
    id: 2,
    english: 'Thank you',
    question: 'What is the Spanish word for "Thank you"?',
    options: ['De nada', 'Gracias', 'Por favor', 'Disculpe'],
    correct: 'Gracias',
    difficulty: 'easy',
  },
  {
    id: 3,
    english: 'Book',
    question: 'What is the Spanish word for "Book"?',
    options: ['Palabra', 'Página', 'Libro', 'Lectura'],
    correct: 'Libro',
    difficulty: 'easy',
  },
  {
    id: 4,
    english: 'Water',
    question: 'What is the Spanish word for "Water"?',
    options: ['Aire', 'Agua', 'Tierra', 'Fuego'],
    correct: 'Agua',
    difficulty: 'easy',
  },
  {
    id: 5,
    english: 'Friend',
    question: 'What is the Spanish word for "Friend"?',
    options: ['Amigo', 'Enemigo', 'Hermano', 'Padre'],
    correct: 'Amigo',
    difficulty: 'medium',
  },
]

export function LanguageLab() {
  const { isDark } = useThemeStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [streak, setStreak] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const current = vocabulary[currentIndex]
  const level = Math.floor(score / 25) + 1

  const handleAnswer = (option: string) => {
    if (answered) return

    setSelectedAnswer(option)
    setAnswered(true)

    if (option === current.correct) {
      setScore((prev) => prev + 10)
      setStreak((prev) => prev + 1)
    } else {
      setHearts((prev) => Math.max(0, prev - 1))
      setStreak(0)
    }
  }

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      setCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setHearts(3)
    setStreak(0)
    setCompleted(false)
    setAnswered(false)
    setSelectedAnswer(null)
  }

  if (completed || hearts === 0) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="card max-w-lg p-8 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-amber-400" />
            <h1 className="text-4xl font-black mb-2">{hearts === 0 ? 'Game Over' : 'Lesson Complete!'}</h1>
            <p className="text-2xl font-bold text-lime-400 mb-6">{score} XP earned</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Level</p>
                <p className="text-3xl font-black text-cyan-400">{level}</p>
              </div>
              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Streak</p>
                <p className="text-3xl font-black text-amber-400">{streak}</p>
              </div>
              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Accuracy</p>
                <p className="text-3xl font-black text-rose-400">80%</p>
              </div>
            </div>
            <button onClick={handleRestart} className="btn-primary w-full">
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <header className="border-b border-slate-700 bg-slate-900/70 sticky top-0 z-20 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">Language Lab</h1>
            <p className="text-sm text-slate-400">Learn Spanish vocabulary</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 ${
                    i < hearts ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <div className="rounded-full bg-lime-500/10 border border-lime-500/30 px-3 py-1 text-sm font-semibold text-lime-400">
              Level {level}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Question {currentIndex + 1} / {vocabulary.length}
            </span>
            <span className="text-2xl font-black text-lime-400">{score} XP</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-lime-400 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + (answered ? 1 : 0)) / vocabulary.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="card p-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" /> {current.difficulty}
            </div>
            <h2 className="text-2xl font-bold mb-4">{current.question}</h2>
            <p className="text-slate-400">English: <span className="text-slate-200 font-medium">{current.english}</span></p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={`p-4 rounded-xl border-2 font-medium transition-all ${
                  !answered
                    ? 'border-slate-700 bg-slate-800/50 hover:border-lime-500/60 cursor-pointer'
                    : selectedAnswer === option
                    ? option === current.correct
                      ? 'border-lime-500 bg-lime-500/10 text-lime-300'
                      : 'border-rose-500 bg-rose-500/10 text-rose-300'
                    : option === current.correct
                    ? 'border-lime-500 bg-lime-500/10 text-lime-300'
                    : 'border-slate-700 bg-slate-800/50 opacity-50'
                }`}
              >
                {option}
                {answered && option === current.correct && <CheckCircle2 className="w-4 h-4 ml-2 inline" />}
              </button>
            ))}
          </div>

          {answered && (
            <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              {selectedAnswer === current.correct ? (
                <div className="flex items-center gap-2 text-lime-300">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Correct! Great job!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-300">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Not quite. The correct answer is: <strong>{current.correct}</strong></span>
                </div>
              )}
            </div>
          )}

          {answered && (
            <button onClick={handleNext} className="btn-primary w-full">
              {currentIndex < vocabulary.length - 1 ? 'Next Question' : 'Finish Lesson'}
            </button>
          )}
        </div>

        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <p className="text-sm text-slate-400">Streak</p>
            </div>
            <p className="text-2xl font-black">{streak}</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <p className="text-sm text-slate-400">Level</p>
            </div>
            <p className="text-2xl font-black text-cyan-400">{level}</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-lime-400" />
              <p className="text-sm text-slate-400">Total XP</p>
            </div>
            <p className="text-2xl font-black text-lime-400">{score}</p>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <p className="text-sm text-slate-400">Progress</p>
            </div>
            <p className="text-2xl font-black">{Math.round(((currentIndex + (answered ? 1 : 0)) / vocabulary.length) * 100)}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
