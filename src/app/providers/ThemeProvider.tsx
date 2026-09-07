import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ThemePreference = 'dark' | 'light' | 'system'

const THEME_STORAGE_KEY = 'tw-theme'

interface ThemeContextValue {
  preference: ThemePreference
  setPreference: (pref: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function resolveTheme(pref: ThemePreference): 'dark' | 'light' {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  }
  return pref
}

function getInitialPreference(): ThemePreference {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored === 'light' || stored === 'system' ? stored : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(getInitialPreference)

  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(preference)
    }
    apply()
    localStorage.setItem(THEME_STORAGE_KEY, preference)

    if (preference === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: light)')
      media.addEventListener('change', apply)
      return () => media.removeEventListener('change', apply)
    }
  }, [preference])

  const value = useMemo(() => ({ preference, setPreference }), [preference])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  return ctx
}
