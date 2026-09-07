import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <section>
      <img src="/assets/images/system_404.webp" alt="" width={280} />
      <h1>{t('errors.notFound.title')}</h1>
      <p>{t('errors.notFound.description')}</p>
      <Link to={ROUTES.home}>{t('actions.back')}</Link>
    </section>
  )
}
