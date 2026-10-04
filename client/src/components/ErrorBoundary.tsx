import React, { ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('🚨 Error caught by boundary:', error)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/InsightForge/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <AlertTriangle className="w-16 h-16 mx-auto text-amber-500 mb-4" />
            <h1 className="text-3xl font-black mb-2">Something went wrong</h1>
            <p className="text-slate-300 mb-6">{this.state.error?.message || 'An unexpected error occurred'}</p>
            <button
              onClick={this.resetError}
              className="btn-primary inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Go back to dashboard
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
