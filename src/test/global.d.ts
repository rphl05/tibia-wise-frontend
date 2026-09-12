import '@testing-library/jest-dom'

declare global {
  namespace Vi {
    interface Assertion<T> {
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
}