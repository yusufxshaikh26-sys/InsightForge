import React from 'react'
import { BookOpenText, BrainCircuit, GraduationCap, Sparkles, Trophy, Users } from 'lucide-react'

export function AcademicInbound() {
  const metrics = [
    { label: 'Applications', value: '4.7k', icon: Users },
    { label: 'Academic fit', value: '86%', icon: GraduationCap },
    { label: 'Potential strength', value: '21', icon: Trophy },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Academic Inbound</p>
        <h1 className="text-4xl font-black">Application intelligence</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">{label}</span>
              <Icon className="w-4 h-4 text-lime-400" />
            </div>
            <p className="text-3xl font-black">{value}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4">Profile indicators</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-slate-800/70 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-3">Strengths</p>
            <ul className="space-y-3 text-slate-300">
              <li>• Strong research exposure and relevant project work</li>
              <li>• Excellent academic discipline and consistent scores</li>
              <li>• Community leadership and extracurricular commitment</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-slate-800/70 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-3">Needs improvement</p>
            <ul className="space-y-3 text-slate-300">
              <li>• Recommendation strength not fully supported in current record</li>
              <li>• Some evidence gaps in the application narrative</li>
              <li>• Financial need indicators not yet conclusive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
