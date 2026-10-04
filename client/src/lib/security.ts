export const securityUtils = {
  sanitizeString: (str: unknown): string => {
    if (typeof str !== 'string') return ''
    return str
      .replace(/[<>]/g, '')
      .substring(0, 500)
      .trim()
  },

  validateCSVData: (rows: any[]): boolean => {
    if (!Array.isArray(rows)) return false
    if (rows.length === 0) return false
    if (rows.length > 50000) return false // Prevent massive uploads
    return rows.every((row) => typeof row === 'object' && row !== null)
  },

  validateFileSize: (file: File, maxMB: number = 50): boolean => {
    const maxBytes = maxMB * 1024 * 1024
    return file.size <= maxBytes
  },

  validateFileType: (file: File): boolean => {
    const allowed = ['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    return allowed.includes(file.type) || file.name.match(/\.(csv|json|xlsx)$/i) !== null
  },

  safeJSONParse: (json: string): any => {
    try {
      return JSON.parse(json)
    } catch {
      return null
    }
  },

  getStorageSize: (): number => {
    let size = 0
    try {
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          size += localStorage[key].length + key.length
        }
      }
    } catch {
      return 0
    }
    return size
  },

  isStorageFull: (): boolean => {
    return this.getStorageSize() > 5 * 1024 * 1024 // 5MB limit
  },
}
