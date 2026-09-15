import { useCallback, useState } from 'react'
import Papa from 'papaparse'
import { Dataset, DataColumn, DataType } from '../types/data'

interface UseCSVParserReturn {
  parseCSV: (file: File) => Promise<Dataset | null>
  error: string | null
  loading: boolean
}

const detectDataType = (value: unknown): DataType => {
  if (value === null || value === undefined || value === '') return 'unknown'
  
  const str = String(value).trim()
  
  if (str === 'true' || str === 'false') return 'boolean'
  if (!isNaN(Number(str)) && str !== '') return 'number'
  if (!isNaN(Date.parse(str))) return 'date'
  
  return 'string'
}

const calculateQualityScore = (rows: Record<string, unknown>[], columns: DataColumn[]): number => {
  if (rows.length === 0) return 0
  
  let totalCells = rows.length * columns.length
  let missingCells = 0
  let duplicateRows = new Set()
  
  rows.forEach((row, idx) => {
    columns.forEach((col) => {
      if (row[col.name] === null || row[col.name] === undefined || row[col.name] === '') {
        missingCells++
      }
    })
    
    const rowStr = JSON.stringify(row)
    if (duplicateRows.has(rowStr)) {
      missingCells += columns.length
    }
    duplicateRows.add(rowStr)
  })
  
  const qualityScore = Math.max(0, 100 - (missingCells / totalCells * 100))
  return Math.round(qualityScore)
}

export const useCSVParser = (): UseCSVParserReturn => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const parseCSV = useCallback(async (file: File): Promise<Dataset | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const text = await file.text()
      
      return new Promise((resolve) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            const rows = results.data.filter((row: any) => Object.values(row).some(v => v !== ''))
            
            if (rows.length === 0) {
              setError('CSV file is empty')
              setLoading(false)
              resolve(null)
              return
            }
            
            const columnNames = Object.keys(rows[0] as Record<string, unknown>)
            const columns: DataColumn[] = columnNames.map((name) => {
              const values = rows.map((r: any) => r[name])
              const types = values.map(detectDataType)
              const uniqueTypes = new Set(types)
              const mostCommonType = Array.from(uniqueTypes)[0] || 'string'
              
              return {
                name,
                type: mostCommonType as DataType,
                missingCount: values.filter((v) => v === '' || v === null).length,
                uniqueCount: new Set(values).size,
                sample: values.slice(0, 5),
              }
            })
            
            const dataset: Dataset = {
              id: Date.now().toString(),
              name: file.name.replace('.csv', ''),
              rows: rows as Record<string, unknown>[],
              columns,
              importedAt: new Date(),
              size: rows.length,
              qualityScore: calculateQualityScore(rows as Record<string, unknown>[], columns),
              anomalies: [],
            }
            
            setLoading(false)
            resolve(dataset)
          },
          error: (error) => {
            setError(`Parse error: ${error.message}`)
            setLoading(false)
            resolve(null)
          },
        })
      })
    } catch (err) {
      setError(`Error reading file: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setLoading(false)
      return null
    }
  }, [])
  
  return { parseCSV, error, loading }
}
