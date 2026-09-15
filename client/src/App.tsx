import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { DataAnalysis } from './pages/DataAnalysis'
import { ChartInsight } from './pages/ChartInsight'
import { PredictiveVending } from './pages/PredictiveVending'
import { HeritageQC } from './pages/HeritageQC'
import { AcademicInbound } from './pages/AcademicInbound'
import { LanguageLab } from './pages/LanguageLab'
import { NotFound } from './pages/NotFound'
import { useThemeStore } from './hooks/useThemeStore'

export function App() {
  const isDark = useThemeStore((state) => state.isDark)

  return (
    <div className={isDark ? 'dark' : ''}>
      <Router basename="/InsightForge">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-analysis" element={<DataAnalysis />} />
          <Route path="/charts" element={<ChartInsight />} />
          <Route path="/predictive-vending" element={<PredictiveVending />} />
          <Route path="/heritage-qc" element={<HeritageQC />} />
          <Route path="/academic-inbound" element={<AcademicInbound />} />
          <Route path="/language-lab" element={<LanguageLab />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}
