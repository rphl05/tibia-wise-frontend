import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

import './ErrorPage.css'

interface ErrorPageProps {
  status: 403 | 404 | 500 | 503
  title: string
  description: string
  ctaText?: string
  ctaHref?: string
}

export function ErrorPage({ status, title, description, ctaText, ctaHref }: ErrorPageProps) {
  return (
    <section className="error-page">
      <div className="error-page__content">
        <span className="error-page__code">{status}</span>
        <h1>{title}</h1>
        <p className="error-page__description">{description}</p>
        {ctaText && ctaHref && (
          <Link to={ctaHref} className="error-page__cta">
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <section className="error-page">
      <div className="error-page__content">
        <span className="error-page__code">404</span>
        <h1>{t('errors.notFound.title')}</h1>
        <p className="error-page__description">{t('errors.notFound.description')}</p>
        <Link to={ROUTES.home} className="error-page__cta">
          {t('actions.back')}
        </Link>
      </div>
    </section>
  )
}