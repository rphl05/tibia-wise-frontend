import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './ProfilePage.css'

const ProfilePage = () => {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="profile-page">
      <header className="profile-page__header">
        <h1>{t('profile.title')}</h1>
      </header>

      <main className="profile-page__content">
        <div className="profile-page__form">
          <div className="profile-page__form-group">
            <label>{t('profile.name')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('profile.namePlaceholder')}
              className="profile-page__input"
            />
          </div>

          <div className="profile-page__form-group">
            <label>{t('profile.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('profile.emailPlaceholder')}
              className="profile-page__input"
            />
          </div>

          <button
            type="button"
            className="profile-page__save-btn"
            onClick={() => {
              // TODO: save profile data
              alert(t('profile.saved'))
            }}
          >
            {t('profile.save')}
          </button>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage