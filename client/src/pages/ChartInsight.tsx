import React, { useMemo, useState } from 'react'
import { BarChart, AreaChart, PieChart, Radar, ScatterChart, Download, ZoomIn, Filter, Activity, ArrowUpRight, Sparkles } from 'lucide-react'
import { useDataStore } from '@/hooks/useDataStore'
import { useThemeStore } from '@/hooks/useThemeStore'
import { ResponsiveContainer, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LineChart, Line, Area, AreaChart as RechartsAreaChart, PieChart as RechartsPieChart, Pie, Cell, ScatterChart as RechartsScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar } from 'recharts'

const colors = ['#a3e635', '#22d3ee', '#f59e0b', '#f87171', '#60a5fa', '#c084fc']

export function ChartInsight() {
  const datasets = useDataStore((state) => state.datasets)
  const charts = useDataStore((state) => state.charts)
  const addChart = useDataStore((state) => state.addChart)
  const { isDark } = useThemeStore()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const dataset = useMemo(() => datasets[0] ?? null, [datasets])

  const defaultChartData = useMemo(() => {
    if (!dataset) return []
    return dataset.rows.slice(0, 8).map((row, idx) => ({
      name: String(Object.values(row)[0] ?? `Row ${idx + 1}`),
      value: Number(Object.values(row)[1] ?? 0),
      second: Number(Object.values(row)[2] ?? 0),
    }))
  }, [dataset])

  const generateChart = () => {
    if (!dataset) return

    const chart = {
      id: Date.now().toString(),
      datasetId: dataset.id,
      type: 'bar',
      xAxis: dataset.columns[0]?.name ?? 'name',
      yAxis: dataset.columns[1]?.name ?? 'value',
      title: 'Revenue by category',
      insight: 'The chart shows a stable upward trend with a moderate increase in the latest period.',
    }

    addChart(chart)
    setSelectedId(chart.id)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Charts & Insights</p>
          <h1 className="text-4xl font-black">Visualization intelligence</h1>
        </div>
        <button className="btn-primary inline-flex items-center gap-2" onClick={generateChart}><Sparkles className="w-4 h-4" /> Generate chart</button>
      </div>

      {!dataset ? (
        <div className="card p-10 text-center">
          <BarChart3 className="w-12 h-12 mx-auto text-lime-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No chart data available</h2>
          <p className="text-slate-400">Upload a dataset to generate visuals and insights.</p>
        </div>
      ) : (
        <div className="grid xl:grid-cols-[300px_1fr] gap-6">
          <aside className="card p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-4">Saved charts</p>
            <div className="space-y-2">
              {charts.length === 0 ? (
                <div className="text-sm text-slate-400 rounded-xl border border-dashed border-slate-700 p-3">No charts yet.</div>
              ) : charts.map((chart) => (
                <button key={chart.id} onClick={() => setSelectedId(chart.id)} className={`w-full text-left rounded-xl p-3 border ${selectedId === chart.id ? 'border-lime-500 bg-lime-500/10' : 'border-slate-700 bg-slate-800/50'}`}>
                  <p className="font-medium">{chart.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{chart.type}</p>
                </button>
              ))}
            </div>
          </aside>

          <main className="space-y-6">
            <div className="card p-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Recommended view</p>
                  <h2 className="text-2xl font-black">Auto chart view</h2>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary inline-flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
                </div>
              </div>

              <div className="h-[420px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={defaultChartData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#cbd5e1'} />
                    <XAxis dataKey="name" stroke={isDark ? '#cbd5e1' : '#64748b'} />
                    <YAxis stroke={isDark ? '#cbd5e1' : '#64748b'} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#a3e635" radius={[8,8,0,0]} />
                    <Bar dataKey="second" fill="#22d3ee" radius={[8,8,0,0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-xl font-bold mb-4">AI chart insight</h3>
              <p className="text-slate-300">The chart highlights a strong positive rise in the latest period, with a modest but consistent increase across categories. Key variations remain within normal deviation but deserve a deeper look for seasonal impacts.</p>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
