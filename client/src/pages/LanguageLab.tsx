import React, { useState } from 'react'
import { BookOpenText, CheckCircle2, Heart, Sparkles, Star } from 'lucide-react'

const vocab = [
  { question: 'Translate: "Hello"', options: ['Hola', 'Bonjour', 'Hallo', 'Salam'], answer: 'Hola' },
  { question: 'Translate: "Thank you"', options: ['Gracias', 'Merci', 'Danke', 'Arigato'], answer: 'Gracias' },
  { question: 'Translate: "Book"', options: ['Libro', 'Livre', 'Buch', 'Book'], answer: 'Libro' },
]

export function LanguageLab() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)

  const current = vocab[index]

  const answerQuestion = (option: string) => {
    if (option === current.answer) {
      setScore((prev) => prev + 10)
    } else {
      setLives((prev) => Math.max(0, prev - 1))
    }

    if (index < vocab.length - 1) {
      setIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Language Lab</p>
          <h1 className="text-4xl font-black">Learn and practice</h1>
        </div>
        <div className="flex gap-2 items-center">
          {Array.from({ length: lives }).map((_, i) => <Heart key={i} className="w-5 h-5 fill-rose-500 text-rose-500" />)}
        </div>
      </div>

      <div className="card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Progress</p>
            <p className="text-2xl font-black">{score} XP</p>
          </div>
          <div className="rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/30 px-3 py-1 text-sm font-semibold">Level {Math.floor(score / 20) + 1}</div>
        </div>

        <div className="mb-8">
          <p className="text-lg font-medium mb-4">{current.question}</p>
          <div className="grid md:grid-cols-2 gap-3">
            {current.options.map((option) => (
              <button key={option} onClick={() => answerQuestion(option)} className="btn-secondary text-left justify-center">
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Question {index + 1}/{vocab.length}</span>
          <span>{lives} hearts remaining</span>
        </div>
      </div>
    </div>
  )
}
