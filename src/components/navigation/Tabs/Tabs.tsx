import { clsx } from 'clsx'
import type { ReactNode } from 'react'

import './Tabs.css'

export interface TabItem {
  id: string
  label: string
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  'aria-label': string
  children?: ReactNode
}

/** Tabs para alternar entre visões relacionadas do mesmo contexto. */
export function Tabs({ tabs, active, onChange, 'aria-label': ariaLabel, children }: TabsProps) {
  return (
    <div>
      <div className="tabs" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tab-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              className={clsx('tabs__tab', isActive && 'tabs__tab--active')}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {children && (
        <div
          role="tabpanel"
          id={`tab-panel-${active}`}
          aria-labelledby={`tab-${active}`}
          className="tabs__panel"
        >
          {children}
        </div>
      )}
    </div>
  )
}
