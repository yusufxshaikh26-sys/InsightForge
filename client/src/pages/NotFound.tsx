import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="card max-w-lg p-8 text-center">
        <AlertTriangle className="w-16 h-16 mx-auto text-amber-500 mb-4" />
        <h1 className="text-4xl font-black mb-2">404</h1>
        <p className="text-slate-300 mb-6">This page does not exist in InsightForge.</p>
        <button
          onClick={() => navigate('/InsightForge/')}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Back to home
        </button>
      </div>
    </div>
  )
}
