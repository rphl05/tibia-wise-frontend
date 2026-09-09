import { Compass, LayoutDashboard, Plus, Swords } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'

import { ROUTES } from '@/config/routes'
import './MobileNav.css'

interface NavItem {
  to: string
  label: string
  icon: typeof LayoutDashboard
}

/** Navegação inferior para mobile com as ações mais frequentes. */
export function MobileNav() {
  const { t } = useTranslation()
  const location = useLocation()

  const items: NavItem[] = [
    { to: ROUTES.dashboard, label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: ROUTES.myHunts, label: t('nav.myHunts'), icon: Swords },
    { to: ROUTES.importHunt, label: t('nav.importHunt'), icon: Plus },
    { to: ROUTES.recommendations, label: t('nav.recommendations'), icon: Compass },
  ]

  return (
    <nav className="mobile-nav" aria-label={t('layout.mainNav')}>
      {items.map((item) => {
        const Icon = item.icon
        const active = location.pathname === item.to
        return (
          <Link
            key={item.to}
            to={item.to}
            className={clsx('mobile-nav__item', active && 'mobile-nav__item--active')}
            {...(active ? { 'aria-current': 'page' as const } : {})}
          >
            <span className="mobile-nav__item-inner">
              <Icon size={20} aria-hidden />
              <span className="mobile-nav__label">{item.label}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
