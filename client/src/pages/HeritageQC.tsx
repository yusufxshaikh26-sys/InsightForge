import React from 'react'
import { CheckCircle2, ClipboardList, Filter, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'

export function HeritageQC() {
  const records = [
    { name: 'Artifact A', category: 'Pottery', score: 96, condition: 'Excellent', status: 'Approved' },
    { name: 'Artifact B', category: 'Textile', score: 82, condition: 'Good', status: 'Review' },
    { name: 'Artifact C', category: 'Metal', score: 67, condition: 'Fair', status: 'Flagged' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Heritage QC</p>
        <h1 className="text-4xl font-black">Quality control and inspection</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Artifacts reviewed', value: '2.4k', icon: ClipboardList },
          { label: 'Quality score', value: '91%', icon: ShieldCheck },
          { label: 'Flagged records', value: '32', icon: Filter },
        ].map(({ label, value, icon: Icon }) => (
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
        <h2 className="text-2xl font-bold mb-5">Inspection records</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-slate-700 text-sm uppercase tracking-[0.15em] text-slate-400">
                <th className="py-3 pr-4">Artifact</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Score</th>
                <th className="py-3 pr-4">Condition</th>
                <th className="py-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.name} className="border-b border-slate-800">
                  <td className="py-3 pr-4 font-medium">{record.name}</td>
                  <td className="py-3 pr-4">{record.category}</td>
                  <td className="py-3 pr-4">{record.score}</td>
                  <td className="py-3 pr-4">{record.condition}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${record.status === 'Approved' ? 'bg-lime-500/15 text-lime-300' : record.status === 'Review' ? 'bg-amber-500/15 text-amber-300' : 'bg-rose-500/15 text-rose-300'}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
