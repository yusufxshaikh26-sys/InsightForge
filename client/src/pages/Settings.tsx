import React, { useState } from 'react'
import { useThemeStore } from '@/hooks/useThemeStore'
import { useDataStore } from '@/hooks/useDataStore'
import { Moon, Sun, Globe, Trash2, Save, AlertCircle, CheckCircle2, Download, Upload } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '@/lib/translations'

export function Settings() {
  const { isDark, toggleTheme, language, setLanguage } = useThemeStore()
  const datasets = useDataStore((state) => state.datasets)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleExportData = () => {
    try {
      const state = {
        datasets,
        theme: isDark ? 'dark' : 'light',
        language,
        exportedAt: new Date().toISOString(),
      }
      const json = JSON.stringify(state, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `insightforge-backup-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError('Failed to export data')
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleClearAllData = () => {
    if (window.confirm('⚠️ This will delete ALL datasets and settings. Are you sure?')) {
      try {
        localStorage.clear()
        window.location.reload()
      } catch (err) {
        setError('Failed to clear data')
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900/70 sticky top-0 z-20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-4xl font-black">Settings</h1>
          <p className="text-slate-400 mt-2">Manage your InsightForge preferences and data</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {saved && (
          <div className="card p-4 bg-lime-500/10 border-lime-500/30 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-lime-400" />
            <span className="text-lime-300">Settings saved successfully!</span>
          </div>
        )}

        {error && (
          <div className="card p-4 bg-rose-500/10 border-rose-500/30 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <span className="text-rose-300">{error}</span>
          </div>
        )}

        <section className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Moon className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-bold">Display</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-slate-400">Choose between dark and light mode</p>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:border-lime-500/60 transition-colors"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4" /> Light
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" /> Dark
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-bold">Language</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(SUPPORTED_LANGUAGES)
              .slice(0, 12)
              .map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code)
                    setSaved(true)
                    setTimeout(() => setSaved(false), 3000)
                  }}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    language === code
                      ? 'border-lime-500 bg-lime-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-slate-400 mt-1">{code.toUpperCase()}</p>
                </button>
              ))}
          </div>
          <p className="text-sm text-slate-400 mt-4">50+ languages supported</p>
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-bold">Data Management</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="font-medium mb-2">Datasets loaded</p>
              <p className="text-2xl font-black text-lime-400">{datasets.length}</p>
              <p className="text-sm text-slate-400 mt-2">{datasets.reduce((sum, d) => sum + d.size, 0)} total rows</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleExportData}
                className="flex-1 btn-secondary inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Export all data
              </button>
              <button
                onClick={handleClearAllData}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-rose-600 text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Clear all data
              </button>
            </div>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-2xl font-bold mb-4">About InsightForge</h2>
          <div className="space-y-3 text-slate-300">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Version</p>
              <p className="font-medium">1.0.0</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Mode</p>
              <p className="font-medium">Local Demo Mode - No external services connected</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Data storage</p>
              <p className="font-medium">Browser LocalStorage (5MB limit)</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Privacy</p>
              <p className="font-medium">All data stays in your browser. No data is sent to any server.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
