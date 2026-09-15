export const analysisService = {
  performBasicAnalysis: (data: Record<string, unknown>[], columnName: string) => {
    const values = data
      .map((row) => Number(row[columnName]))
      .filter((val) => !isNaN(val))
    
    if (values.length === 0) {
      return { error: 'No numeric values found' }
    }
    
    const sum = values.reduce((a, b) => a + b, 0)
    const mean = sum / values.length
    const sorted = [...values].sort((a, b) => a - b)
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)]
    
    return {
      count: values.length,
      sum: sum.toFixed(2),
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      min: Math.min(...values).toFixed(2),
      max: Math.max(...values).toFixed(2),
    }
  },

  detectAnomalies: (data: Record<string, unknown>[], columnName: string) => {
    const values = data
      .map((row) => Number(row[columnName]))
      .filter((val) => !isNaN(val))
    
    if (values.length < 3) return []
    
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    const std = Math.sqrt(
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    )
    
    return data.filter((row, idx) => {
      const val = Number(row[columnName])
      return !isNaN(val) && Math.abs(val - mean) > 3 * std
    })
  },

  getDataQuality: (data: Record<string, unknown>[], columns: string[]) => {
    let totalCells = data.length * columns.length
    let missingCells = 0
    
    data.forEach((row) => {
      columns.forEach((col) => {
        if (row[col] === null || row[col] === undefined || row[col] === '') {
          missingCells++
        }
      })
    })
    
    const qualityScore = Math.max(0, 100 - (missingCells / totalCells * 100))
    return Math.round(qualityScore)
  },
}
