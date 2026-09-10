import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './SettingsPage.css'

const SettingsPage = () => {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="settings-page">
      <header className="settings-page__header">
        <h1>{t('settings.title', 'Configurações')}</h1>
      </header>

      <main className="settings-page__main">
        <section className="settings-page__section">
          <h2>{t('settings.general', 'Configurações Gerais')}</h2>
          <div className="settings-page__setting">
            <label>{t('settings.theme', 'Tema')}</label>
            <div className="settings-page__setting-options">
              <label>
                <input
                  type="radio"
                  checked={theme === 'system'}
                  name="theme"
                  value="system"
                  onChange={() => setTheme('system')}
                />
                {t('settings.system', 'Sistema')}
              </label>
              <label>
                <input
                  type="radio"
                  checked={theme === 'light'}
                  name="theme"
                  value="light"
                  onChange={() => setTheme('light')}
                />
                {t('settings.light', 'Claro')}
              </label>
              <label>
                <input
                  type="radio"
                  checked={theme === 'dark'}
                  name="theme"
                  value="dark"
                  onChange={() => setTheme('dark')}
                />
                {t('settings.dark', 'Escuro')}
              </label>
            </div>
          </div>

          <div className="settings-page__setting">
            <label>{t('settings.notifications', 'Notificações')}</label>
            <label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(notifications)}
              />
              {t('settings.enable', 'Habilitar notificações')}
            </label>
          </div>
        </section>

        <section className="settings-page__section">
          <h2>{t('settings.account', 'Conta')}</h2>
          <p>{t('settings.accountDescription', 'Gerencie suas configurações de conta aqui.')}</p>
        </section>
      </main>
    </div>
  )
}

export default SettingsPage