// https://reactjs.org/docs/error-boundaries.html

import React from 'react'

interface ErrorBoundaryProps {

}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // can log error to error reporting service
    // You can also log the error to an error reporting service
    console.log('error:', error, 'info:', errorInfo);
  }

  render() {
    if(this.state.hasError) {
      return <h1>something went wrong</h1>
    }

    return this.props.children;
  }
}

export default ErrorBoundary
