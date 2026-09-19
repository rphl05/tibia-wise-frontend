import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/Button/Button'
import { Checkbox } from '@/components/ui/FormFields/Checkbox'
import { Input } from '@/components/ui/FormFields/Input'
import { Select } from '@/components/ui/FormFields/Select'
import { Tabs } from '@/components/navigation/Tabs/Tabs'
import { useAuth } from '@/features/auth/AuthProvider'

import './SettingsPage.css'

type TabId = 'profile' | 'account' | 'privacy' | 'notifications' | 'preferences'

const TABS: { id: TabId; label: string }[] = [
  { id: 'profile', label: 'Perfil' },
  { id: 'account', label: 'Conta' },
  { id: 'privacy', label: 'Privacidade' },
  { id: 'notifications', label: 'Notificações' },
  { id: 'preferences', label: 'Preferências' },
] as const

export default function SettingsPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabId>('profile')
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <div className="settings-page">
      <header className="settings-page__header">
        <h1>{t('settings.title')}</h1>
      </header>

      <Tabs
        tabs={TABS.map((tab) => ({ id: tab.id, label: tab.label }))}
        active={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
        aria-label={t('settings.navAria', 'Navegação entre seções')}
      />

      <main className="settings-page__main">
        {activeTab === 'profile' && (
          <section className="settings-page__section" aria-labelledby="profile-title">
            <h2 id="profile-title">{t('settings.profile')}</h2>
            <p className="settings-page__section-description">
              {t('settings.profileDescription')}
            </p>
            <div className="settings-page__form-grid">
              <div className="settings-page__field">
                <Input
                  label={t('settings.profileName')}
                  defaultValue={user?.display_name ?? ''}
                  hint={t('settings.nameHint')}
                />
              </div>
              <div className="settings-page__field">
                <Input
                  label={t('settings.usernameLabel')}
                  defaultValue={user?.username ?? ''}
                  disabled
                  hint={t('settings.usernameHint')}
                />
              </div>
              <div className="settings-page__field settings-page__field--full">
                <label className="field__label">{t('settings.bio')}</label>
                <textarea
                  className="field__textarea"
                  rows={3}
                  placeholder={t('settings.bioPlaceholder')}
                  aria-describedby="bio-hint"
                />
                <small id="bio-hint" className="field__hint">
                  {t('settings.bioHint', 'Conte um pouco sobre você (opcional).')}
                </small>
              </div>
            </div>
            <div className="settings-page__actions">
              <Button variant="secondary">
                {t('actions.cancel')}
              </Button>
              <Button variant="primary">
                {t('actions.save')}
              </Button>
            </div>
          </section>
        )}

        {activeTab === 'account' && (
          <section className="settings-page__section" aria-labelledby="account-title">
            <h2 id="account-title">{t('settings.account')}</h2>
            <p className="settings-page__section-description">
              {t('settings.accountDescription')}
            </p>
            <div className="settings-page__form-grid">
              <div className="settings-page__field">
                <Input
                  label={t('settings.email')}
                  type="email"
                  defaultValue={user?.email ?? ''}
                  disabled
                  hint={t('settings.emailHint')}
                />
              </div>
              <div className="settings-page__field">
                <Input
                  label={t('settings.country')}
                  defaultValue={user?.country_code ?? ''}
                  disabled
                />
              </div>
              <div className="settings-page__field">
                <Input
                  label={t('settings.memberSince')}
                  value={
                    user?.created_at
                      ? new Date(user.created_at).toLocaleDateString('pt-BR')
                      : '-'
                  }
                  disabled
                />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'privacy' && (
          <section className="settings-page__section" aria-labelledby="privacy-title">
            <h2 id="privacy-title">{t('settings.privacy')}</h2>
            <p className="settings-page__section-description">
              {t('settings.privacyDescription')}
            </p>
            <div className="settings-page__field">
              <Select
                label={t('settings.profileVisibility')}
                defaultValue="PUBLIC"
              >
                <option value="PUBLIC">{t('settings.public')}</option>
                <option value="PRIVATE">{t('settings.private')}</option>
              </Select>
              <small className="settings-page__hint">
                {t('settings.visibilityHint')}
              </small>
            </div>
          </section>
        )}

        {activeTab === 'notifications' && (
          <section className="settings-page__section" aria-labelledby="notifications-title">
            <h2 id="notifications-title">{t('settings.notifications')}</h2>
            <p className="settings-page__section-description">
              {t('settings.notificationsDescription')}
            </p>
            <div className="settings-page__form-grid">
              <div className="settings-page__field">
                <Checkbox
                  label={t('settings.emailAlerts', 'Alertas por e-mail')}
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'preferences' && (
          <section className="settings-page__section" aria-labelledby="preferences-title">
            <h2 id="preferences-title">{t('settings.preferences')}</h2>
            <p className="settings-page__section-description">
              {t('settings.preferencesDescription')}
            </p>
            <div className="settings-page__form-grid">
              <div className="settings-page__field">
                <Select
                  label={t('settings.defaultCharacter')}
                  defaultValue=""
                >
                  <option value="">{t('settings.selectDefault')}</option>
                </Select>
                <small className="settings-page__hint">
                  {t('settings.defaultCharacterHint')}
                </small>
              </div>
              <div className="settings-page__field">
                <Select label={t('settings.language')}>
                  <option value="pt-BR">{t('settings.langPt')}</option>
                  <option value="en">{t('settings.langEn')}</option>
                </Select>
              </div>
              <div className="settings-page__field">
                <Select label={t('settings.theme')}>
                  <option value="system">{t('settings.system')}</option>
                  <option value="light">{t('settings.light')}</option>
                  <option value="dark">{t('settings.dark')}</option>
                </Select>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}