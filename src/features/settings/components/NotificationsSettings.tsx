import { useTranslation } from 'react-i18next'

import { Alert } from '@/components'

export function NotificationsSettings() {
  const { t } = useTranslation()

  return (
    <section className="settings-page__section" aria-labelledby="settings-notifications-title">
      <h2 id="settings-notifications-title">{t('settings.notifications.title')}</h2>
      <p className="settings-page__section-description">
        {t('settings.notifications.description')}
      </p>
      <Alert type="info" title={t('settings.notifications.unavailableTitle')}>
        {t('settings.notifications.unavailable')}
      </Alert>
    </section>
  )
}
