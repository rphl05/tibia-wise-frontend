import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './NotificationsPage.css'

const NotificationsPage = () => {
  const { t } = useTranslation()

  // Extract all translations to variables first (avoids TS1128 in tsc -b)
  // General
  const gQ1 = t('notifications.general.q1')
  const gQ1d = t('notifications.general.q1Desc')
  const gQ2 = t('notifications.general.q2')
  const gQ2d = t('notifications.general.q2Desc')

  // Hunts
  const hQ1 = t('notifications.hunts.q1')
  const hQ1d = t('notifications.hunts.q1Desc')
  const hQ2 = t('notifications.hunts.q2')
  const hQ2d = t('notifications.hunts.q2Desc')

  // System
  const sQ1 = t('notifications.system.q1')
  const sQ1d = t('notifications.system.q1Desc')
  const sQ2 = t('notifications.system.q2')
  const sQ2d = t('notifications.system.q2Desc')

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
        <h1>{t('notifications.title')}</h1>
        <p>{t('notifications.subtitle')}</p>

        <div className="notifications-page__search">
          <input
            type="text"
            placeholder={t('notifications.searchPlaceholder')}
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
            <h3>{t('notifications.results')}</h3>
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