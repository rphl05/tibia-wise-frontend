import { useTranslation } from 'react-i18next'

import './PremiumPage.css'

const PremiumPage = () => {
  const { t } = useTranslation()

  return (
    <div className="premium-page">
      <header className="premium-page__header">
        <h1>{t('premium.title')}</h1>
        <p>{t('premium.subtitle')}</p>
      </header>

      <main className="premium-page__main">
        <section className="premium-page__hero">
          <div className="premium-page__hero-content">
            <h2>{t('premium.heroTitle')}</h2>
            <p>{t('premium.heroDescription')}</p>
            <button className="premium-page__cta">
              {t('premium.cta')}
            </button>
          </div>
        </section>

        <section className="premium-page__benefits">
          <h2>{t('premium.benefitsTitle')}</h2>
          <ul className="premium-page__benefits-list">
            <li>
              <span className="premium-page__benefit-icon">📊</span>
              <div>
                <h3>{t('premium.benefit1.title')}</h3>
                <p>{t('premium.benefit1.desc')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">🎯</span>
              <div>
                <h3>{t('premium.benefit2.title')}</h3>
                <p>{t('premium.benefit2.desc')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">🔔</span>
              <div>
                <h3>{t('premium.benefit3.title')}</h3>
                <p>{t('premium.benefit3.desc')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">💬</span>
              <div>
                <h3>{t('premium.benefit4.title')}</h3>
                <p>{t('premium.benefit4.desc')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">📈</span>
              <div>
                <h3>{t('premium.benefit5.title')}</h3>
                <p>{t('premium.benefit5.desc')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">🚀</span>
              <div>
                <h3>{t('premium.benefit6.title')}</h3>
                <p>{t('premium.benefit6.desc')}</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="premium-page__plans">
          <h2>{t('premium.plansTitle')}</h2>
          <div className="premium-page__plans-grid">
            <div className="premium-page__plan">
              <h3>{t('premium.planMonthly.title')}</h3>
              <div className="premium-page__plan-price">
                <span className="premium-page__plan-amount">{t('premium.planMonthly.price')}</span>
                <span className="premium-page__plan-period">{t('premium.planMonthly.period')}</span>
              </div>
              <ul>
                <li>{t('premium.planMonthly.feature1')}</li>
                <li>{t('premium.planMonthly.feature2')}</li>
                <li>{t('premium.planMonthly.feature3')}</li>
              </ul>
              <button className="premium-page__plan-btn">{t('premium.planMonthly.cta')}</button>
            </div>
            <div className="premium-page__plan premium-page__plan--featured">
              <span className="premium-page__plan-badge">{t('premium.planYearly.badge')}</span>
              <h3>{t('premium.planYearly.title')}</h3>
              <div className="premium-page__plan-price">
                <span className="premium-page__plan-amount">{t('premium.planYearly.price')}</span>
                <span className="premium-page__plan-period">{t('premium.planYearly.period')}</span>
              </div>
              <ul>
                <li>{t('premium.planYearly.feature1')}</li>
                <li>{t('premium.planYearly.feature2')}</li>
                <li>{t('premium.planYearly.feature3')}</li>
              </ul>
              <button className="premium-page__plan-btn premium-page__plan-btn--primary">{t('premium.planYearly.cta')}</button>
            </div>
          </div>
        </section>

        <section className="premium-page__faq">
          <h2>{t('premium.faqTitle')}</h2>
          <details>
            <summary>{t('premium.faq1.q')}</summary>
            <p>{t('premium.faq1.a')}</p>
          </details>
          <details>
            <summary>{t('premium.faq2.q')}</summary>
            <p>{t('premium.faq2.a')}</p>
          </details>
          <details>
            <summary>{t('premium.faq3.q')}</summary>
            <p>{t('premium.faq3.a')}</p>
          </details>
        </section>
      </main>
    </div>
  )
}

export default PremiumPage