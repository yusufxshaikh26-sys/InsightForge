import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, Database, FileText, Gauge, LayoutGrid, Settings, Sparkles, Globe2, BrainCircuit, Bell, Search, Sun, Moon, ArrowRight, Upload, Download, Filter, Zap, ShieldCheck, BookOpenText, Languages, CheckCircle2, AlertTriangle, FolderKanban, Activity, TrendingUp, Layers3, FileUp, Rocket, ArrowUpRight, LayoutDashboard } from 'lucide-react'
import { useThemeStore } from '@/hooks/useThemeStore'
import { navigation, metrics, featureCards, sampleProjects } from '@/lib/constants'
import { useDataStore } from '@/hooks/useDataStore'

export function LandingPage() {
  const { isDark, toggleTheme } = useThemeStore()
  const datasets = useDataStore((state) => state.datasets)
  const navigate = useNavigate()

  const topMetrics = [
    { label: 'Datasets', value: datasets.length || 12, icon: Database },
    { label: 'Analyses', value: 248, icon: BrainCircuit },
    { label: 'Charts', value: 67, icon: BarChart3 },
    { label: 'Reports', value: 24, icon: FileText },
  ]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <header className="border-b border-slate-700/80 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-lime-400/20 border border-lime-400/40 flex items-center justify-center text-lime-400 font-black text-sm">IF</div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">InsightForge</p>
              <h1 className="font-bold">Turn Raw Data Into Decisions</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full border border-slate-700 bg-slate-800" onClick={toggleTheme}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="p-2 rounded-full border border-slate-700 bg-slate-800" onClick={() => navigate('/settings')}>
              <Settings className="w-4 h-4" />
            </button>
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>Launch</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/40 bg-lime-500/10 text-lime-300 text-xs uppercase tracking-[0.2em] font-semibold mb-6">
              <Sparkles className="w-4 h-4" /> Local Demo Mode
            </div>
            <h2 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tight mb-6">Turn raw data<br />into <span className="text-lime-400">decisions.</span></h2>
            <p className="max-w-xl text-lg text-slate-300 mb-10">InsightForge is an intelligent data analysis platform for students, researchers, and businesses — bringing data validation, AI insight, predictions, and decisions into one professional workspace.</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="btn-primary text-lg px-6 py-3" onClick={() => navigate('/dashboard')}>Try Sample Dataset</button>
              <button className="btn-secondary text-lg px-6 py-3" onClick={() => navigate('/data-analysis')}>Import Data</button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">CSV</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">JSON</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">Analytics</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">50+ Languages</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
            <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-lime-500/20 border border-lime-400/40 flex items-center justify-center text-lime-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">Workflow</p>
                    <h3 className="font-semibold">Import → Analyze → Decide</h3>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-full bg-lime-500/20 text-lime-300 text-xs font-semibold">Live</span>
              </div>
              <div className="space-y-4">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Dataset quality</span>
                    <span className="text-lime-400 font-semibold">91%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700"><div className="h-2 w-[91%] rounded-full bg-gradient-to-r from-lime-400 to-teal-400"></div></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="card p-4">
                    <p className="text-sm text-slate-400 mb-2">Total rows</p>
                    <p className="text-3xl font-bold">12.4k</p>
                  </div>
                  <div className="card p-4">
                    <p className="text-sm text-slate-400 mb-2">Signals</p>
                    <p className="text-3xl font-bold">28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {topMetrics.map(({ label, value, icon: Icon }) => (
              <div key={label} className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400 text-sm">{label}</span>
                  <div className="rounded-full bg-lime-500/10 text-lime-400 p-2">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/30 flex items-center justify-center"><Rocket className="w-5 h-5" /></div>
            <h3 className="text-4xl font-black">Feature Overview</h3>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {featureCards.map((card) => (
              <div key={card.title} className="card p-6">
                <div className="mb-4 w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold mb-2">{card.title}</h4>
                <p className="text-slate-300">{card.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
