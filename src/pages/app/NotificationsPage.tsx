import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './NotificationsPage.css'

const NotificationsPage = () => {
  const { t } = useTranslation()

  // Extract all translations to variables first (avoids TS1128 in tsc -b)
  // General
  const gQ1 = t('notifications.general.q1', 'Nova hunt disponível')
  const gQ1d = t('notifications.general.q1.d', 'Uma nova hunt foi adicionada ao sistema.')
  const gQ2 = t('notifications.general.q2', 'Atualização de manutenção')
  const gQ2d = t('notifications.general.q2.d', 'O sistema passará por manutenção das 02:00 às 04:00.')

  // Hunts
  const hQ1 = t('notifications.hunts.q1', 'Nova hunt disponível')
  const hQ1d = t('notifications.hunts.q1.d', 'Uma nova hunt ficou disponível para você caçar.')
  const hQ2 = t('notifications.hunts.q2', 'Hunt concluída')
  const hQ2d = t('notifications.hunts.q2.d', 'Sua hunt recentemente foi finalizada com sucesso.')

  // System
  const sQ1 = t('notifications.system.q1', 'Manutenção programada')
  const sQ1d = t('notifications.system.q1.d', 'O sistema passará por manutenção das 02:00 às 04:00.')
  const sQ2 = t('notifications.system.q2', 'Backup de dados')
  const sQ2d = t('notifications.system.q2.d', 'Backup dos dados do sistema será realizado semanalmente.')

  const notifications = [
    { id: '1', category: 'general', title: gQ1, description: gQ1d },
    { id: '2', category: 'general', title: gQ2, description: gQ2d },
    { id: '3', category: 'hunts', title: hQ1, description: hQ1d },
    { id: '4', category: 'hunts', title: hQ2, description: hQ2d },
    { id: '5', category: 'system', title: sQ1, description: sQ1d },
    { id: '6', category: 'system', title: sQ2, description: sQ2d },
  ]

  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotifications = notifications.filter((item) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="notifications-page">
      <header className="notifications-page__header">
        <h1>{t('notifications.title', 'Notificações')}</h1>
        <p>{t('notifications.subtitle', 'Mantenha-se atualizado sobre novidades')}</p>

        <div className="notifications-page__search">
          <input
            type="text"
            placeholder={t('notifications.searchPlaceholder', 'Buscar notificações...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="notifications-page__search-input"
          />
        </div>
      </header>

      <main className="notifications-page__main">
        <section className="notifications-page__categories">
          {['general', 'hunts', 'system'].map((category) => (
            <div key={category} className="notifications-page__category">
              <h3>{t(`notifications.category.${category}`, category.charAt(0).toUpperCase() + category.slice(1))}</h3>
              <ul>
                {notifications
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <li key={item.id}>
                      <details>
                        <summary>{item.title}</summary>
                        <p>{item.description}</p>
                      </details>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        {searchQuery && filteredNotifications.length > 0 && (
          <section className="notifications-page__results">
            <h3>{t('notifications.results', 'Resultados da busca')}</h3>
            <ul>
              {filteredNotifications.map((item) => (
                <li key={item.id}>
                  <details>
                    <summary>{item.title}</summary>
                    <p>{item.description}</p>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}

export default NotificationsPage