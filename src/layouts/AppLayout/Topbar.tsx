import { Link } from 'react-router-dom'
import { ChevronDown, Globe, Moon, Search, Sun, Monitor, Crown, Bell, User, Plus, LogOut, Settings, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useRef, useEffect } from 'react'

import { ROUTES } from '@/config/routes'
import { useAuth } from '@/features/auth/AuthProvider'
import { useTheme } from '@/app/providers/ThemeProvider'
import { IconButton } from '@/components/ui/Button/IconButton'
import { Dropdown, DropdownItem } from '@/components/overlays/Dropdown/Dropdown'

import './Topbar.css'

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const { preference, setPreference } = useTheme()
  const searchRef = useRef<HTMLInputElement>(null)

  const handleLogout = async () => {
    await logout()
    window.location.href = ROUTES.login
  }

  const themeIcons = {
    dark: <Moon size={18} aria-hidden />,
    light: <Sun size={18} aria-hidden />,
    system: <Monitor size={18} aria-hidden />,
  }

  const themeLabels = {
    dark: t('theme.dark'),
    light: t('theme.light'),
    system: t('theme.system'),
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="topbar__menu-btn"
          onClick={onMenuClick}
          aria-label={t('layout.openMenu')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="topbar__search">
          <Search size={18} className="topbar__search-icon" aria-hidden />
          <input
            ref={searchRef}
            type="search"
            placeholder={t('actions.search')}
            className="topbar__search-input"
            aria-label={t('actions.search')}
          />
          <kbd className="topbar__shortcut">Ctrl K</kbd>
        </div>

        {user && (
          <Link to={ROUTES.importHunt} className="topbar__new-hunt">
            <Plus size={18} aria-hidden />
            <span>{t('actions.newHunt')}</span>
          </Link>
        )}
      </div>

      <div className="topbar__right">
        <Dropdown
          aria-label={t('theme.label')}
          trigger={(props) => (
            <button
              type="button"
              className="topbar__dropdown-trigger"
              aria-label={t('theme.label')}
              {...props}
            >
              {themeIcons[preference]}
            </button>
          )}
        >
          {(Object.keys(themeIcons) as Array<keyof typeof themeIcons>).map((value) => (
            <DropdownItem
              key={value}
              icon={themeIcons[value]}
              onClick={() => setPreference(value)}
            >
              {themeLabels[value]}
            </DropdownItem>
          ))}
        </Dropdown>

        <Dropdown
          aria-label={t('language.label')}
          trigger={(props) => (
            <button
              type="button"
              className="topbar__dropdown-trigger"
              aria-label={t('language.label')}
              {...props}
            >
              <Globe size={18} aria-hidden />
            </button>
          )}
        >
          <DropdownItem onClick={() => changeLanguage('pt-BR')}>
            🇧🇷 <span>Português</span>
          </DropdownItem>
          <DropdownItem onClick={() => changeLanguage('en')}>
            🇺🇸 <span>English</span>
          </DropdownItem>
        </Dropdown>

        {user && (
          <>
            <IconButton aria-label={t('notifications.label')}>
              <Bell size={20} aria-hidden />
            </IconButton>

            <div className="topbar__premium" title={t('nav.premium')}>
              <Crown size={18} aria-hidden />
            </div>

            <Dropdown
              aria-label={t('userMenu.label')}
              trigger={(props) => (
                <button
                  type="button"
                  className="topbar__user-trigger"
                  {...props}
                >
                  <img
                    src="/assets/images/default-avatar.webp"
                    alt=""
                    className="topbar__user-avatar"
                    width={32}
                    height={32}
                  />
                  <span className="topbar__user-name">{user.display_name}</span>
                  <ChevronDown size={14} aria-hidden />
                </button>
              )}
            >
              <DropdownItem icon={<User size={16} aria-hidden />}>
                {t('userMenu.profile')}
              </DropdownItem>
              <DropdownItem icon={<Users size={16} aria-hidden />}>
                {t('userMenu.characters')}
              </DropdownItem>
              <DropdownItem icon={<Settings size={16} aria-hidden />}>
                {t('nav.settings')}
              </DropdownItem>
              <DropdownItem icon={<Bell size={16} aria-hidden />}>
                {t('notifications.label')}
              </DropdownItem>
              <DropdownItem danger icon={<LogOut size={16} aria-hidden />} onClick={() => void handleLogout()}>
                {t('actions.logout')}
              </DropdownItem>
            </Dropdown>
          </>
        )}
      </div>
    </header>
  )
}

function changeLanguage(lng: string) {
  localStorage.setItem('tw-language', lng)
  window.location.reload()
}
