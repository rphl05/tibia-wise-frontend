import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/Button/Button'
import { ROUTES } from '@/config/routes'
import './PublicHeader.css'

/** Header de páginas públicas (visitante). */
export function PublicHeader() {
  const { t } = useTranslation()

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
            {t('nav.myHunts')}
          </Link>
          <Link to={ROUTES.tutorials} className="public-header__link">
            {t('nav.tutorials')}
          </Link>
        </nav>

        <div className="public-header__actions">
          <Button variant="ghost" onClick={() => (window.location.href = ROUTES.login)}>
            {t('actions.login')}
          </Button>
          <Button onClick={() => (window.location.href = ROUTES.register)}>
            {t('actions.register')}
          </Button>
        </div>
      </div>
    </header>
  )
}
