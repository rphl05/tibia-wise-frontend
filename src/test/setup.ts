import '@testing-library/jest-dom'
import { vi } from 'vitest'

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

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: MediaQueryListEvent) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
class MockIntersectionObserver {
  root: Element | null = null
  rootMargin = ''
  thresholds: ReadonlyArray<number> = []
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn()
}
globalThis.IntersectionObserver = vi.fn(() => new MockIntersectionObserver()) as any