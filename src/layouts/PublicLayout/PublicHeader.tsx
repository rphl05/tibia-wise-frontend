import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Monitor, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/Button/Button'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Dropdown, DropdownItem } from '@/components/overlays/Dropdown/Dropdown'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useAuth } from '@/features/auth/AuthProvider'
import { ROUTES } from '@/config/routes'
import './PublicHeader.css'

/** Header de páginas públicas (visitantes e autenticados). */
export function PublicHeader() {
  const { t } = useTranslation()
  const { status } = useAuth()
  const { preference, setPreference } = useTheme()

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

  return (
    <header className="public-header">
      <div className="public-header__inner">
        <Link to={ROUTES.home} aria-label="Tibia Wise">
          <img
            src="/assets/images/tibia-wise-logo.svg"
            alt="Tibia Wise"
            className="public-header__logo"
          />
        </Link>

        <nav aria-label={t('layout.mainNav')} className="public-header__nav">
          <Link to={ROUTES.hunts} className="public-header__link">
            {t('nav.hunts')}
          </Link>
          <Link to={ROUTES.news} className="public-header__link">
            {t('nav.news')}
          </Link>
          <Link to={ROUTES.tutorials} className="public-header__link">
            {t('nav.tutorials')}
          </Link>
          <Link to={ROUTES.faq} className="public-header__link">
            {t('nav.faq')}
          </Link>
        </nav>

        <div className="public-header__actions">
          <Dropdown
            aria-label={t('theme.label')}
            trigger={(props) => (
              <button
                type="button"
                className="public-header__icon-btn"
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

          <LanguageSwitcher />

          {status === 'authenticated' ? (
            <Link to={ROUTES.dashboard}>
              <Button>{t('nav.dashboard')}</Button>
            </Link>
          ) : (
            <>
              <Link to={ROUTES.login}>
                <Button variant="ghost">{t('actions.login')}</Button>
              </Link>
              <Link to={ROUTES.register} className="public-header__register">
                <Button>{t('actions.register')}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
