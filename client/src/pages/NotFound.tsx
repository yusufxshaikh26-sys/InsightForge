import React from 'react'
import { ArrowLeft, House, Search, PanelLeftOpen } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="card max-w-lg p-8 text-center">
        <h1 className="text-4xl font-black mb-3">404</h1>
        <p className="text-slate-300 mb-6">This page does not exist in the current workspace.</p>
        <a href="/InsightForge/" className="btn-primary inline-flex items-center gap-2"><House className="w-4 h-4" /> Back to home</a>
      </div>
    </div>
  )
}
