import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/features/auth/AuthProvider'
import { Tabs } from '@/components/navigation/Tabs/Tabs'
import './SettingsPage.css'

const SettingsPage = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="settings-page">
      <header className="settings-page__header">
        <h1>{t('settings.title', 'Configurações')}</h1>
        <p>{t('settings.subtitle', 'Gerencie suas configurações de conta e preferências')}</p>
      </header>

      <main className="settings-page__main">
        <Tabs
          tabs={[
            { id: 'profile', label: t('settings.tabs.profile', 'Perfil') },
            { id: 'account', label: t('settings.tabs.account', 'Conta') },
            { id: 'privacy', label: t('settings.tabs.privacy', 'Privacidade') },
            { id: 'notifications', label: t('settings.tabs.notifications', 'Notificações') },
            { id: 'preferences', label: t('settings.tabs.preferences', 'Preferências') },
          ]}
          active={activeTab}
          onChange={setActiveTab}
          aria-label={t('settings.navAria', 'Navegação entre seções')}
        />

        {activeTab === 'profile' && (
          <section className="settings-page__section">
            <h2>{t('settings.profile', 'Perfil')}</h2>
            <p className="settings-page__section-description">
              {t('settings.profileDescription', 'Edite seu perfil e informações públicas.')}
            </p>
            <div className="settings-page__form-grid">
              <div className="settings-page__field">
                <label>{t('settings.profileName', 'Nome do usuário')}</label>
                <input type="text" defaultValue={user?.display_name || ''} />
                <small>{t('settings.nameHint', 'Nome exibido publicamente.')}</small>
              </div>
              <div className="settings-page__field">
                <label>{t('settings.usernameLabel', 'Nome de usuário')}</label>
                <input type="text" defaultValue={user?.username || ''} disabled />
                <small>{t('settings.usernameHint', 'Letras, números, _ e -; mínimo 4 caracteres.')}</small>
              </div>
              <div className="settings-page__field">
                <label>{t('settings.bio', 'Bio')}</label>
                <textarea rows={3} placeholder={t('settings.bioPlaceholder', 'Conte um pouco sobre você...')}>
                  {t('settings.bioDefault', '')}
                </textarea>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'account' && (
          <section className="settings-page__section">
            <h2>{t('settings.account', 'Conta')}</h2>
            <p className="settings-page__section-description">
              {t('settings.accountDescription', 'Gerencie suas configurações de conta.')}
            </p>
            <div className="settings-page__form-grid">
              <div className="settings-page__field">
                <label>{t('settings.email', 'E-mail')}</label>
                <input type="email" defaultValue={user?.email || ''} disabled />
                <small>{t('settings.emailHint', 'Seu e-mail é usado para login e recuperação.')}</small>
              </div>
              <div className="settings-page__field">
                <label>{t('settings.country', 'País')}</label>
                <input type="text" defaultValue={user?.country_code || ''} disabled />
              </div>
              <div className="settings-page__field">
                <label>{t('settings.memberSince', 'Membro desde')}</label>
                <input type="text" value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''} disabled />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'privacy' && (
          <section className="settings-page__section">
            <h2>{t('settings.privacy', 'Privacidade')}</h2>
            <p className="settings-page__section-description">
              {t('settings.privacyDescription', 'Defina a visibilidade das suas informações')}
            </p>
            <div className="settings-page__form-grid">
              <div className="settings-page__field">
                <label>{t('settings.visibility', 'Visibilidade de Perfil')}</label>
                <select defaultValue="PUBLIC">
                  <option value="PUBLIC">{t('settings.public', 'Público')}</option>
                  <option value="PRIVATE">{t('settings.private', 'Privado')}</option>
                </select>
                <small>{t('settings.visibilityHint', 'Controle quem pode ver seu perfil.')}</small>
              </div>
              <div className="settings-page__field">
                <label>{t('settings.showCharacters', 'Mostrar personagens')}</label>
                <select defaultValue="ALL">
                  <option value="NONE">{t('settings.none', 'Nenhum')}</option>
                  <option value="VERIFIED">{t('settings.verifiedOnly', 'Só personagens verificados')}</option>
                  <option value="ALL">{t('settings.all', 'Todos')}</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'notifications' && (
          <section className="settings-page__section">
            <h2>{t('settings.notifications', 'Notificações')}</h2>
            <p className="settings-page__section-description">
              {t('settings.notificationsDescription', 'Configure preferências de notificações.')}
            </p>
            <div className="settings-page__form-grid">
              <div className="settings-page__field">
                <label>{t('settings.emailNotifications', 'Notificações por e-mail')}</label>
                <label className="settings-page__checkbox">
                  <input type="checkbox" defaultChecked={true} />
                  {t('settings.receiveEmail', 'Receber notificações por e-mail')}
                </label>
              </div>
              <div className="settings-page__field">
                <label>{t('settings.pushNotifications', 'Notificações push')}</label>
                <label className="settings-page__checkbox">
                  <input type="checkbox" defaultChecked={false} disabled />
                  {t('settings.receivePush', 'Receber notificações push')}
                </label>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'preferences' && (
          <section className="settings-page__section">
            <h2>{t('settings.preferences', 'Preferências')}</h2>
            <p className="settings-page__section-description">
              {t('settings.preferencesDescription', 'Configure suas preferências do sistema.')}
            </p>
            <div className="settings-page__form-grid">
              <div className="settings-page__field">
                <label>{t('settings.defaultCharacter', 'Personagem padrão')}</label>
                <select defaultValue={user?.default_character_id ?? ''}>
                  <option value={''}>{t('settings.selectDefault', 'Selecione')}</option>
                </select>
                <small>{t('settings.defaultCharacterHint', 'Personagem usado como padrão.')}</small>
              </div>
              <div className="settings-page__field">
                <label>{t('settings.language', 'Idioma')}</label>
                <select defaultValue="pt-BR">
                  <option value="pt-BR">{t('settings.langPt', 'Português')}</option>
                  <option value="en">{t('settings.langEn', 'English')}</option>
                </select>
              </div>
              <div className="settings-page__field">
                <label>{t('settings.theme', 'Tema')}</label>
                <select defaultValue="system">
                  <option value="system">{t('settings.system', 'Sistema')}</option>
                  <option value="light">{t('settings.light', 'Claro')}</option>
                  <option value="dark">{t('settings.dark', 'Escuro')}</option>
                </select>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default SettingsPage