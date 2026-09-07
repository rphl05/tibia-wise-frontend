import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Futuro: enviar para ferramenta de observabilidade.
    console.error('ErrorBoundary', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <h1>Algo deu errado</h1>
          <p>Tente novamente em alguns instantes.</p>
          <button type="button" onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </button>
        </main>
      )
    }
    return this.props.children
  }
}
