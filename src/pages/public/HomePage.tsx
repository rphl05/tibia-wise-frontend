import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BarChart3, MapPin, Shield, TrendingUp } from 'lucide-react'

import { ROUTES } from '@/config/routes'

import './HomePage.css'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      {/* ============ HERO ============ */}
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__content">
          <span className="home-hero__eyebrow">{t('home.eyebrow')}</span>
          <h1 id="home-hero-title" className="home-hero__title">
            {t('home.title')}
            <br />
            <span className="home-hero__title-highlight">{t('home.titleHighlight')}</span>
          </h1>
          <p className="home-hero__subtitle">{t('home.subtitle')}</p>

          <div className="home-hero__ctas">
            <Link to="/register" className="home-hero__cta home-hero__cta--primary">
              {t('home.start')}
            </Link>
            <Link to="/hunts" className="home-hero__cta home-hero__cta--secondary">
              {t('home.explore')}
            </Link>
          </div>

          <ul className="home-hero__benefits">
            <li>
              <span className="home-hero__benefit-icon"><TrendingUp size={14} aria-hidden /></span>
              {t('home.benefit1')}
            </li>
            <li>
              <span className="home-hero__benefit-icon"><Shield size={14} aria-hidden /></span>
              {t('home.benefit2')}
            </li>
            <li>
              <span className="home-hero__benefit-icon"><MapPin size={14} aria-hidden /></span>
              {t('home.benefit3')}
            </li>
          </ul>
        </div>
      </section>

      {/* ============ COMO FUNCIONA ============ */}
      <section className="home-section home-section--dark" aria-labelledby="how-title">
        <header className="home-section__heading">
          <span className="home-eyebrow">{t('home.howEyebrow')}</span>
          <h2 id="how-title" className="home-section__title">
            {t('home.howTitlePre')} <span>{t('home.howTitleHighlight')}</span>
          </h2>
          <p className="home-section__subtitle">{t('home.howSubtitle')}</p>
        </header>

        <ol className="home-steps">
          <li className="home-step">
            <span className="home-step__number">01</span>
            <span className="home-step__icon"><MapPin size={32} aria-hidden /></span>
            <h3 className="home-step__title">{t('home.step1Title')}</h3>
            <p className="home-step__desc">{t('home.step1Desc')}</p>
          </li>
          <li className="home-step">
            <span className="home-step__number">02</span>
            <span className="home-step__icon"><BarChart3 size={32} aria-hidden /></span>
            <h3 className="home-step__title">{t('home.step2Title')}</h3>
            <p className="home-step__desc">{t('home.step2Desc')}</p>
          </li>
          <li className="home-step">
            <span className="home-step__number">03</span>
            <span className="home-step__icon"><TrendingUp size={32} aria-hidden /></span>
            <h3 className="home-step__title">{t('home.step3Title')}</h3>
            <p className="home-step__desc">{t('home.step3Desc')}</p>
          </li>
        </ol>
      </section>

      {/* ============ ANALYTICS / INFOGRÁFICO ============ */}
      <section className="home-section home-section--surface" aria-labelledby="data-title">
        <div className="home-analytics">
          <div className="home-analytics__copy">
            <span className="home-eyebrow">{t('home.dataEyebrow')}</span>
            <h2 id="data-title" className="home-analytics__title">
              {t('home.dataTitle')}
              <br />
              <span>{t('home.dataTitleHighlight')}</span>
            </h2>
            <p className="home-analytics__desc">{t('home.dataSubtitle')}</p>
            <span className="home-analytics__demo">{t('home.dataDemo')}</span>
          </div>

          <div className="home-analytics__visual">
            <div className="home-metrics">
              <div className="home-metric">
                <span className="home-metric__label">{t('home.dataXpPerHour')}</span>
                <span className="home-metric__value">1.250.000</span>
                <span className="home-metric__trend">▲ {t('home.dataTrend1')}</span>
              </div>
              <div className="home-metric">
                <span className="home-metric__label">{t('home.dataProfitPerHour')}</span>
                <span className="home-metric__value">R$ 500</span>
                <span className="home-metric__trend">▲ {t('home.dataTrend2')}</span>
              </div>
              <div className="home-metric">
                <span className="home-metric__label">{t('home.dataHunts')}</span>
                <span className="home-metric__value">12</span>
                <span className="home-metric__trend">▲ {t('home.dataTrend3')}</span>
              </div>
            </div>

            <div className="home-place">
              <div className="home-place__map" role="img" aria-label={t('home.dataPlacesTitle')}>
                <div className="home-place__bars">
                  <i style={{ height: '42%' }} />
                  <i style={{ height: '65%' }} />
                  <i style={{ height: '82%' }} />
                  <i style={{ height: '55%' }} />
                  <i style={{ height: '72%' }} />
                </div>
              </div>
              <div className="home-place__copy">
                <h3>{t('home.dataPlacesTitle')}</h3>
                <p>{t('home.dataPlacesDesc')}</p>
                <Link to={ROUTES.recommendations}>{t('home.dataPlacesLink')} →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="home-cta" aria-labelledby="cta-title">
        <div className="home-cta__content">
          <span className="home-eyebrow">{t('home.ctaEyebrow')}</span>
          <h2 id="cta-title" className="home-cta__title">
            {t('home.ctaTitle')}
            <br />
            <span>{t('home.ctaTitleHighlight')}</span>
          </h2>
          <p className="home-cta__desc">{t('home.ctaDesc')}</p>
          <ul className="home-cta__list">
            <li>{t('home.ctaBenefit1')}</li>
            <li>{t('home.ctaBenefit2')}</li>
            <li>{t('home.ctaBenefit3')}</li>
          </ul>
          <Link to="/register" className="home-cta__button">
            {t('home.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  )
}