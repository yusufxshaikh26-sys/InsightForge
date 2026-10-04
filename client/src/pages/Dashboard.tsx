import React from 'react'
import { ArrowRight, BarChart3, Database, FileText, Filter, Gauge, LayoutDashboard, Search, SunMedium, Moon, ShieldCheck, Sparkles, UploadCloud, Folder, Bell, Menu, Plus } from 'lucide-react'
import { useThemeStore } from '@/hooks/useThemeStore'
import { useDataStore } from '@/hooks/useDataStore'
import { useCSVParser } from '@/hooks/useCSVParser'
import { sampleDataGenerator } from '@/services/sampleDataGenerator'

export function Dashboard() {
  const { isDark, toggleTheme } = useThemeStore()
  const datasets = useDataStore((state) => state.datasets)
  const addDataset = useDataStore((state) => state.addDataset)
  const { parseCSV, loading } = useCSVParser()

  const handleSampleInstall = () => {
    const generated = sampleDataGenerator.generateSalesData(50)
    addDataset({
      id: 'sample-sales',
      name: 'Sample Sales Dataset',
      rows: generated,
      columns: [
        { name: 'date', type: 'string', missingCount: 0, uniqueCount: 12, sample: ['Jan', 'Feb'] },
        { name: 'product', type: 'string', missingCount: 0, uniqueCount: 5, sample: ['Product A'] },
        { name: 'units', type: 'number', missingCount: 0, uniqueCount: 50, sample: [120, 200] },
        { name: 'revenue', type: 'number', missingCount: 0, uniqueCount: 50, sample: [5000, 7000] },
      ],
      importedAt: new Date(),
      size: generated.length,
      qualityScore: 96,
      anomalies: [],
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const dataset = await parseCSV(file)
    if (dataset) addDataset(dataset)
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <header className="border-b border-slate-700 bg-slate-900/70 sticky top-0 z-20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-xl border border-slate-700 bg-slate-800"><Menu className="w-4 h-4" /></button>
            <div className="w-10 h-10 rounded-xl bg-lime-500/15 border border-lime-500/40 text-lime-400 font-black flex items-center justify-center">IF</div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">InsightForge</p>
              <h1 className="font-semibold">Dashboard</h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-6 rounded-full border border-slate-700 bg-slate-800 px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input className="bg-transparent flex-1 border-0 outline-none text-sm placeholder:text-slate-500" placeholder="Search insights, datasets..." />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full border border-slate-700 bg-slate-800" onClick={toggleTheme}>
              {isDark ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="p-2 rounded-full border border-slate-700 bg-slate-800"><Bell className="w-4 h-4" /></button>
            <button className="btn-primary">New Project</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr_280px] gap-6">
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 sticky top-24">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-4">Navigation</p>
            <nav className="space-y-2">
              {[
                { label: 'Dashboard', icon: LayoutDashboard },
                { label: 'Data Analysis', icon: Database },
                { label: 'Charts Insight', icon: BarChart3 },
                { label: 'Product Inspection', icon: Filter },
                { label: 'Predictive Vending', icon: Gauge },
                { label: 'Heritage QC', icon: ShieldCheck },
                { label: 'Academic Inbound', icon: Sparkles },
                { label: 'Language Lab', icon: Languages },
              ].map(({ label, icon: Icon }) => (
                <button key={label} className="w-full flex items-center gap-3 text-left px-3 py-3 rounded-xl hover:bg-slate-800 transition-colors"> 
                  <Icon className="w-4 h-4 text-lime-400" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="space-y-8">
          <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Total datasets', value: datasets.length || 12, icon: Database, accent: 'lime' },
              { label: 'Analyses completed', value: 248, icon: Activity, accent: 'cyan' },
              { label: 'Charts generated', value: 67, icon: BarChart3, accent: 'amber' },
              { label: 'Predictions generated', value: 24, icon: TrendingUp, accent: 'rose' },
            ].map(({ label, value, icon: Icon, accent }) => (
              <div key={label} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-sm">{label}</span>
                  <div className={`p-2 rounded-lg ${accent === 'lime' ? 'bg-lime-500/10 text-lime-400' : accent === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' : accent === 'amber' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-3xl font-black">{value}</p>
              </div>
            ))}
          </section>

          <section className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Data import</p>
                <h2 className="text-2xl font-black">Bring in your dataset</h2>
              </div>
              <button className="btn-secondary" onClick={handleSampleInstall}>Use sample dataset</button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <label className="cursor-pointer flex-1 border border-dashed border-slate-600 rounded-2xl p-8 text-center hover:border-lime-400/60 transition-colors">
                <input type="file" accept=".csv,.json,.xlsx" className="hidden" onChange={handleFileUpload} />
                <UploadCloud className="w-10 h-10 mx-auto text-lime-400 mb-3" />
                <p className="text-lg font-semibold">Upload CSV / JSON / XLSX</p>
                <p className="text-slate-400 text-sm mt-2">Supports local analysis and quality checks</p>
              </label>

              <div className="flex-1 rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-4">Current dataset</p>
                <div className="space-y-3">
                  {datasets.length === 0 ? (
                    <p className="text-slate-400">No dataset loaded yet.</p>
                  ) : (
                    datasets.slice(0, 3).map((dataset) => (
                      <div key={dataset.id} className="rounded-xl border border-slate-700 bg-slate-900 p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{dataset.name}</span>
                          <span className="text-lime-400">{dataset.qualityScore}%</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{dataset.size} rows • {dataset.columns.length} columns</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {loading && <div className="mt-4 text-lime-400">Reading dataset...</div>}
          </section>

          <section className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">AI Insights</h3>
                <Sparkles className="w-5 h-5 text-lime-400" />
              </div>
              <ul className="space-y-4 text-slate-300">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-lime-400 mt-0.5" /> <span>Product performance is strongest in the second half of the month across key segments.</span></li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-lime-400 mt-0.5" /> <span>Data quality remains high with a consistent signal-to-noise ratio.</span></li>
                <li className="flex gap-3"><AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" /> <span>Inventory drift is increasing in one region; review forecasting assumptions.</span></li>
              </ul>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Recent activity</h3>
                <Activity className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="space-y-4">
                {['Sales dataset imported', 'Chart generated', 'Recommendation saved', 'Project updated'].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-800/60 p-3">
                    <div className="w-2 h-2 rounded-full bg-lime-400" />
                    <div className="flex-1">
                      <p className="font-medium">{item}</p>
                      <p className="text-sm text-slate-400">{index + 2} hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <aside className="hidden xl:block">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Insight Panel</h3>
              <Sparkles className="w-4 h-4 text-lime-400" />
            </div>

            <div className="space-y-4">
              <div className="card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Data quality score</p>
                <p className="text-3xl font-black text-lime-400">92</p>
              </div>

              <div className="card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Warnings</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• One region is underperforming</li>
                  <li>• Missing values in 3 fields</li>
                  <li>• Duplicate entries detected</li>
                </ul>
              </div>

              <div className="card p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Recommendations</p>
                <p className="text-sm text-slate-300">Review demand forecast and validate historical records before expanding distribution.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
