import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '@testing-library/jest-dom'
import * as matchers from '@testing-library/jest-dom/matchers'
import 'vitest'

expect.extend(matchers)

declare module 'vitest' {
  interface Assertion {
    toHaveTextContent(text: string | RegExp): void
    toBeInTheDocument(): void
    toBeVisible(): void
    toBeDisabled(): void
    toBeEnabled(): void
    toBeChecked(): void
    toHaveAttribute(name: string, value?: string): void
    toHaveClass(...classNames: string[]): void
    toHaveStyle(css: string | Record<string, any>): void
    toHaveValue(value: string | string[] | number): void
    toHaveDisplayValue(value: string | string[] | number): void
  }
}

// Mock component for testing
const TestComponent = () => {
  const { t } = useTranslation()
  return <div data-testid="test">{t('test.key', 'Fallback')}</div>
}

describe('i18n', () => {
  it('renders translated text', () => {
    render(
      <BrowserRouter>
        <TestComponent />
      </BrowserRouter>
    )
    expect(screen.getByTestId('test')).toHaveTextContent('Fallback')
  })

  it('renders with BrowserRouter', () => {
    render(
      <BrowserRouter>
        <div data-testid="router">Test</div>
      </BrowserRouter>
    )
    expect(screen.getByTestId('router')).toHaveTextContent('Test')
  })
})