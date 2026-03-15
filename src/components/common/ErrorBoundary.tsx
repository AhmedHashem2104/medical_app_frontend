import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // HIPAA: never log error details that might contain PII
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
          <p className="mt-2 text-sm text-muted-foreground">Please try refreshing the page.</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
