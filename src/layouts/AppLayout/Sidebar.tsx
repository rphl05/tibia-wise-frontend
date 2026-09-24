import { Link, useLocation } from 'react-router-dom'
import {
  Crown,
  HelpCircle,
  Import,
  LayoutDashboard,
  Settings,
  Swords,
  Compass,
  Users,
  FileText,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'

import { ROUTES } from '@/config/routes'
import './Sidebar.css'

interface NavItem {
  to: string
  label: string
  icon: typeof LayoutDashboard
}

export interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

/**
 * Navegação principal do app (somente autenticado).
 * Mobile: atua como drawer controlado pelo AppLayout.
 */
export function Sidebar({ open = false, onClose }: SidebarProps) {
  const { t } = useTranslation()
  const location = useLocation()

  const mainNav: NavItem[] = [
    { to: ROUTES.dashboard, label: t('nav.dashboard'), icon: LayoutDashboard },
    { to: ROUTES.myHunts, label: t('nav.myHunts'), icon: Swords },
    { to: ROUTES.importHunt, label: t('nav.importHunt'), icon: Import },
    { to: ROUTES.characters, label: t('nav.characters'), icon: Users },
    { to: ROUTES.recommendations, label: t('nav.recommendations'), icon: Compass },
    { to: ROUTES.news, label: t('nav.news'), icon: FileText },
  ]

  const helpNav: NavItem[] = [
    { to: ROUTES.tutorials, label: t('nav.tutorials'), icon: HelpCircle },
    { to: ROUTES.support, label: t('nav.support'), icon: HelpCircle },
    { to: ROUTES.settings, label: t('nav.settings'), icon: Settings },
    { to: ROUTES.premium, label: t('nav.premium'), icon: Crown },
  ]

  const isActive = (path: string) => location.pathname === path

  const renderLink = (item: NavItem) => {
    const Icon = item.icon
    const active = isActive(item.to)
    const isPremiumLink = item.to === ROUTES.premium
    return (
      <Link
        key={item.to}
        to={item.to}
        onClick={onClose}
        className={clsx(
          'sidebar__link',
          active && 'sidebar__link--active',
          isPremiumLink && 'sidebar__link--premium',
        )}
        {...(active ? { 'aria-current': 'page' as const } : {})}
      >
        <Icon size={18} className="sidebar__link-icon" aria-hidden />
        <span className="sidebar__link-label">{item.label}</span>
      </Link>
    )
  }

  return (
    <aside className={clsx('sidebar', open && 'sidebar--open')} aria-label={t('layout.mainNav')}>
      <div className="sidebar__logo">
        <Link to={ROUTES.dashboard} aria-label="Tibia Wise" onClick={onClose}>
          <img
            src="/assets/images/tibia-wise-logo.svg"
            alt="Tibia Wise"
            className="sidebar__logo-img"
          />
        </Link>
      </div>

      <nav className="sidebar__nav">
        {mainNav.map(renderLink)}

        <div className="sidebar__divider" />

        {/* Contexto do personagem ativo — dados reais virão da API (default_character_id) */}
        <div className="sidebar__character">
          <span className="sidebar__character-tag">{t('layout.activeCharacter')}</span>
          <p className="sidebar__character-empty">{t('layout.noCharacter')}</p>
        </div>

        <div className="sidebar__divider" />

        {helpNav.map(renderLink)}
      </nav>
    </aside>
  )
}