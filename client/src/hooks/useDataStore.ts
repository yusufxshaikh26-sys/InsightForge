import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Dataset, Analysis, ChartConfig, Project } from '../types/data'

interface DataState {
  datasets: Dataset[]
  analyses: Analysis[]
  charts: ChartConfig[]
  projects: Project[]
  currentProjectId: string | null
  currentDatasetId: string | null
  
  addDataset: (dataset: Dataset) => void
  removeDataset: (id: string) => void
  addAnalysis: (analysis: Analysis) => void
  addChart: (chart: ChartConfig) => void
  createProject: (project: Project) => void
  setCurrentProject: (id: string) => void
  setCurrentDataset: (id: string) => void
}

export const useDataStore = create<DataState>()(persist(
  (set) => ({
    datasets: [],
    analyses: [],
    charts: [],
    projects: [],
    currentProjectId: null,
    currentDatasetId: null,
    
    addDataset: (dataset) => set((state) => ({
      datasets: [...state.datasets, dataset],
    })),
    
    removeDataset: (id) => set((state) => ({
      datasets: state.datasets.filter((d) => d.id !== id),
    })),
    
    addAnalysis: (analysis) => set((state) => ({
      analyses: [...state.analyses, analysis],
    })),
    
    addChart: (chart) => set((state) => ({
      charts: [...state.charts, chart],
    })),
    
    createProject: (project) => set((state) => ({
      projects: [...state.projects, project],
    })),
    
    setCurrentProject: (id) => set({ currentProjectId: id }),
    setCurrentDataset: (id) => set({ currentDatasetId: id }),
  }),
  {
    name: 'insightforge-data',
  }
))
