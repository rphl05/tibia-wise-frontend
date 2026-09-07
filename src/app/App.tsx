import { AppProviders } from './providers/AppProviders'
import { ErrorBoundary } from './ErrorBoundary'
import { AppRouter } from './router'

export function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  )
}
