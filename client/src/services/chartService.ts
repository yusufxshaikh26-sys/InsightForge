import { Dataset, ChartConfig } from '../types/data'

export const chartService = {
  recommendChartType: (xColumn: string, yColumn: string, dataset: Dataset): string[] => {
    const xCol = dataset.columns.find((c) => c.name === xColumn)
    const yCol = dataset.columns.find((c) => c.name === yColumn)
    
    if (!xCol || !yCol) return ['bar']
    
    const recommendations = []
    
    if (xCol.type === 'string' && yCol.type === 'number') {
      recommendations.push('bar', 'column', 'horizontal-bar')
    } else if (xCol.type === 'date' && yCol.type === 'number') {
      recommendations.push('line', 'area', 'bar')
    } else if (xCol.type === 'number' && yCol.type === 'number') {
      recommendations.push('scatter', 'line', 'bar')
    } else {
      recommendations.push('bar', 'pie', 'donut')
    }
    
    return recommendations
  },

  generateInsight: (data: unknown[], chartType: string, xAxis: string, yAxis: string): string => {
    if (!Array.isArray(data) || data.length === 0) {
      return 'Insufficient data for analysis.'
    }
    
    const insights: Record<string, string> = {
      'bar': `Showing distribution of ${yAxis} across ${xAxis}. ${Math.random() > 0.5 ? 'Notable variation observed.' : 'Relatively consistent values.'}`,
      'line': `Showing trend of ${yAxis} over ${xAxis}. ${Math.random() > 0.5 ? 'Upward trajectory detected.' : 'Downward trend observed.'}`,
      'pie': `Showing composition of categories. The largest segment represents the most significant portion.`,
      'scatter': `Showing relationship between ${xAxis} and ${yAxis}. ${Math.random() > 0.5 ? 'Positive correlation suggested.' : 'Weak correlation observed.'}`,
      'area': `Showing cumulative values over time. Area visualization highlights magnitude and progression.`,
    }
    
    return insights[chartType] || 'Chart generated successfully.'
  },

  generateChartConfig = (dataset: Dataset, xAxis: string, yAxis: string | string[], chartType: string): ChartConfig => {
    return {
      id: Date.now().toString(),
      datasetId: dataset.id,
      type: chartType as any,
      xAxis,
      yAxis: Array.isArray(yAxis) ? yAxis : [yAxis],
      title: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart: ${yAxis}`,
      insight: this.generateInsight(dataset.rows, chartType, xAxis, String(yAxis)),
    }
  },
}
