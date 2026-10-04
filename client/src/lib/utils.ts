export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max)
}

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const safeNumber = (value: unknown) => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}
