import React, { useMemo, useState } from 'react'
import { BarChart3, FileText, Download, Filter, Search, Sparkles, UploadCloud, ArrowRight, RefreshCcw, TrendingUp, ShieldCheck, Languages, BrainCircuit } from 'lucide-react'
import { useDataStore } from '@/hooks/useDataStore'
import { useCSVParser } from '@/hooks/useCSVParser'
import { chartService } from '@/services/chartService'
import { useThemeStore } from '@/hooks/useThemeStore'

export function DataAnalysis() {
  const datasets = useDataStore((state) => state.datasets)
  const addDataset = useDataStore((state) => state.addDataset)
  const { parseCSV, loading } = useCSVParser()
  const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(null)
  const [selectedColumn, setSelectedColumn] = useState<string>('')

  const currentDataset = useMemo(() => {
    return datasets.find((dataset) => dataset.id === selectedDatasetId) ?? datasets[0] ?? null
  }, [datasets, selectedDatasetId])

  const suggestions = useMemo(() => {
    if (!currentDataset) return []
    return currentDataset.columns.slice(0, 4).map((c) => c.name)
  }, [currentDataset])

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const data = await parseCSV(file)
    if (data) {
      addDataset(data)
      setSelectedDatasetId(data.id)
      setSelectedColumn(data.columns[0]?.name ?? '')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Data Analysis</p>
          <h1 className="text-4xl font-black">Quality, insights, and decisions</h1>
        </div>

        <div className="flex gap-3">
          <label className="btn-secondary inline-flex items-center gap-2 cursor-pointer">
            <UploadCloud className="w-4 h-4" /> Import Data
            <input type="file" accept=".csv,.json,.xlsx" className="hidden" onChange={handleUpload} />
          </label>
          <button className="btn-primary inline-flex items-center gap-2"><RefreshCcw className="w-4 h-4" /> Refresh</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <aside className="card p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-4">Datasets</p>
          <div className="space-y-2">
            {datasets.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 p-4 text-sm text-slate-400">No datasets imported yet.</div>
            ) : (
              datasets.map((dataset) => (
                <button
                  key={dataset.id}
                  onClick={() => { setSelectedDatasetId(dataset.id); setSelectedColumn(dataset.columns[0]?.name ?? ''); }}
                  className={`w-full text-left rounded-xl border p-3 ${selectedDatasetId === dataset.id ? 'border-lime-500 bg-lime-500/10' : 'border-slate-700 bg-slate-800/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{dataset.name}</span>
                    <span className="text-lime-400 text-xs">{dataset.qualityScore}%</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{dataset.size} rows</p>
                </button>
              ))
            )}
          </div>
        </aside>

        <main className="space-y-6">
          {currentDataset ? (
            <>
              <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="card p-5"><p className="text-slate-400 text-sm">Rows</p><p className="text-3xl font-black mt-2">{currentDataset.size}</p></div>
                <div className="card p-5"><p className="text-slate-400 text-sm">Columns</p><p className="text-3xl font-black mt-2">{currentDataset.columns.length}</p></div>
                <div className="card p-5"><p className="text-slate-400 text-sm">Missing values</p><p className="text-3xl font-black mt-2">{currentDataset.columns.reduce((sum, item) => sum + item.missingCount, 0)}</p></div>
                <div className="card p-5"><p className="text-slate-400 text-sm">Quality score</p><p className="text-3xl font-black mt-2 text-lime-400">{currentDataset.qualityScore}%</p></div>
              </section>

              <section className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Data overview</h2>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Filter</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400 text-sm uppercase tracking-[0.15em]">
                        {currentDataset.columns.map((column) => (
                          <th key={column.name} className="py-3 pr-4">{column.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentDataset.rows.slice(0, 6).map((row, idx) => (
                        <tr key={`${row[Object.keys(row)[0]]}-${idx}`} className="border-b border-slate-800 text-sm">
                          {currentDataset.columns.map((column) => (
                            <td key={`${column.name}-${idx}`} className="py-3 pr-4 text-slate-200">
                              {String(row[column.name] ?? '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="card p-5">
                <h3 className="text-xl font-bold mb-4">Column analysis</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestions.map((column) => (
                    <button key={column} onClick={() => setSelectedColumn(column)} className={`px-3 py-2 rounded-full text-sm ${selectedColumn === column ? 'bg-lime-500 text-slate-950' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                      {column}
                    </button>
                  ))}
                </div>

                {selectedColumn && (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-slate-800 p-4">
                      <p className="text-sm text-slate-400">Column</p>
                      <p className="text-xl font-bold">{selectedColumn}</p>
                    </div>
                    <div className="rounded-xl bg-slate-800 p-4">
                      <p className="text-sm text-slate-400">Type</p>
                      <p className="text-xl font-bold">{currentDataset.columns.find((c) => c.name === selectedColumn)?.type || 'unknown'}</p>
                    </div>
                    <div className="rounded-xl bg-slate-800 p-4">
                      <p className="text-sm text-slate-400">Missing values</p>
                      <p className="text-xl font-bold">{currentDataset.columns.find((c) => c.name === selectedColumn)?.missingCount || 0}</p>
                    </div>
                  </div>
                )}
              </section>
            </>
          ) : (
            <div className="card p-10 text-center">
              <UploadCloud className="w-12 h-12 mx-auto text-lime-400 mb-4" />
              <h2 className="text-2xl font-bold">No dataset loaded yet</h2>
              <p className="text-slate-400 mt-2">Import a CSV or generate a sample dataset to begin analysis.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
