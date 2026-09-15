import { useMemo } from 'react'
import { Dataset } from '../types/data'

interface StatisticalAnalysis {
  mean: number
  median: number
  mode: number | null
  min: number
  max: number
  std: number
  variance: number
  q1: number
  q3: number
  iqr: number
}

export const useStatistics = (dataset: Dataset | null, columnName: string) => {
  const analysis = useMemo((): StatisticalAnalysis | null => {
    if (!dataset) return null
    
    const values = dataset.rows
      .map((row) => Number(row[columnName]))
      .filter((val) => !isNaN(val))
    
    if (values.length === 0) return null
    
    // Mean
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    
    // Median
    const sorted = [...values].sort((a, b) => a - b)
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)]
    
    // Mode
    const freq = new Map<number, number>()
    values.forEach((val) => freq.set(val, (freq.get(val) || 0) + 1))
    const mode = Array.from(freq.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || null
    
    // Min & Max
    const min = Math.min(...values)
    const max = Math.max(...values)
    
    // Variance & Std Dev
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    const std = Math.sqrt(variance)
    
    // Quartiles
    const q1 = sorted[Math.floor(sorted.length * 0.25)]
    const q3 = sorted[Math.floor(sorted.length * 0.75)]
    const iqr = q3 - q1
    
    return { mean, median, mode, min, max, std, variance, q1, q3, iqr }
  }, [dataset, columnName])
  
  return analysis
}
