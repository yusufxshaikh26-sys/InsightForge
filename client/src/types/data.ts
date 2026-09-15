export type DataType = 'string' | 'number' | 'date' | 'boolean' | 'unknown'

export interface DataColumn {
  name: string
  type: DataType
  missingCount: number
  uniqueCount: number
  sample: unknown[]
}

export interface Dataset {
  id: string
  name: string
  rows: Record<string, unknown>[]
  columns: DataColumn[]
  importedAt: Date
  size: number
  qualityScore: number
  anomalies: string[]
}

export interface Analysis {
  id: string
  datasetId: string
  type: 'statistical' | 'correlation' | 'trend' | 'distribution'
  results: Record<string, unknown>
  timestamp: Date
}

export interface ChartConfig {
  id: string
  datasetId: string
  type: 'bar' | 'line' | 'area' | 'pie' | 'scatter' | 'histogram' | 'heatmap' | 'radar' | 'box'
  xAxis: string
  yAxis: string | string[]
  title: string
  filters?: Record<string, unknown>
  insight: string
}

export interface Project {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  datasets: string[]
  analyses: string[]
  charts: string[]
}

export interface HistoryEntry {
  id: string
  type: 'dataset_import' | 'analysis_created' | 'chart_generated' | 'report_created'
  projectId: string
  timestamp: Date
  details: Record<string, unknown>
}
