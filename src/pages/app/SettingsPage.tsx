import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Tabs } from '@/components/navigation/Tabs/Tabs'
import { ProfileSettings } from '@/features/settings/components/ProfileSettings'
import { AccountSettings } from '@/features/settings/components/AccountSettings'
import { PrivacySettings } from '@/features/settings/components/PrivacySettings'
import { NotificationsSettings } from '@/features/settings/components/NotificationsSettings'
import { PreferencesSettings } from '@/features/settings/components/PreferencesSettings'

import './SettingsPage.css'

type TabId = 'profile' | 'account' | 'privacy' | 'notifications' | 'preferences'

const TAB_IDS: TabId[] = ['profile', 'account', 'privacy', 'notifications', 'preferences']

export default function SettingsPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabId>('profile')

  return (
    <div className="settings-page">
      <header className="settings-page__header">
        <h1>{t('settings.title')}</h1>
      </header>

      <Tabs
        tabs={TAB_IDS.map((id) => ({ id, label: t(`settings.tabs.${id}`) }))}
        active={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
        aria-label={t('settings.navAria')}
      />

      <main className="settings-page__main">
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'account' && <AccountSettings />}
        {activeTab === 'privacy' && <PrivacySettings />}
        {activeTab === 'notifications' && <NotificationsSettings />}
        {activeTab === 'preferences' && <PreferencesSettings />}
      </main>
    </div>
  )
}
