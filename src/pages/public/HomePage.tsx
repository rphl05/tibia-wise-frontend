import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BarChart3, ShieldCheck, MapPin, TrendingUp } from 'lucide-react'

import { ROUTES } from '@/config/routes'

import './HomePage.css'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      {/* ===== HERO ===== */}
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__inner">
          <div className="home-hero__content">
            <span className="home-hero__eyebrow">{t('home.eyebrow')}</span>
            <h1 id="home-hero-title" className="home-hero__title">
              {t('home.title')}{' '}
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
                <MapPin size={16} aria-hidden />
                <span>{t('home.benefit1')}</span>
              </li>
              <li>
                <ShieldCheck size={16} aria-hidden />
                <span>{t('home.benefit2')}</span>
              </li>
              <li>
                <TrendingUp size={16} aria-hidden />
                <span>{t('home.benefit3')}</span>
              </li>
            </ul>
          </div>

          <div className="home-hero__art">
            <img
              src="/assets/images/home-hero.webp"
              alt={t('home.heroAlt', 'Ilustração de um guerreiro do Tibia')}
              className="home-hero__image"
            />
          </div>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section id="como-funciona" className="home-section" aria-labelledby="how-title">
        <div className="home-section__header">
          <h2 id="how-title" className="home-section__title">{t('home.howTitle')}</h2>
          <p className="home-section__subtitle">{t('home.howSubtitle')}</p>
        </div>

        <div className="home-steps">
          <div className="home-step">
            <span className="home-step__number">01</span>
            <div className="home-step__icon" aria-hidden>
              <MapPin size={32} />
            </div>
            <h3 className="home-step__title">{t('home.step1Title')}</h3>
            <p className="home-step__desc">{t('home.step1Desc')}</p>
          </div>

          <div className="home-step" data-step>
            <span className="home-step__number">02</span>
            <div className="home-step__icon" aria-hidden>
              <BarChart3 size={32} />
            </div>
            <h3 className="home-step__title">{t('home.step2Title')}</h3>
            <p className="home-step__desc">{t('home.step2Desc')}</p>
          </div>

          <div className="home-step">
            <span className="home-step__number">03</span>
            <div className="home-step__icon" aria-hidden>
              <TrendingUp size={32} />
            </div>
            <h3 className="home-step__title">{t('home.step3Title')}</h3>
            <p className="home-step__desc">{t('home.step3Desc')}</p>
          </div>
        </div>
      </section>

      {/* ===== INFOGRÁFICO ===== */}
      <section className="home-data" aria-labelledby="data-title">
        <div className="home-data__inner">
          <div className="home-data__header">
            <h2 id="data-title" className="home-data__title">{t('home.dataTitle')}</h2>
            <p className="home-data__subtitle">{t('home.dataSubtitle')}</p>
          </div>

          <div className="home-data__grid">
            <div className="home-data__stats">
              <div className="home-data__stat">
                <span className="home-data__stat-label">{t('home.dataXpPerHour')}</span>
                <span className="home-data__stat-value">1.250.000</span>
              </div>
              <div className="home-data__stat">
                <span className="home-data__stat-label">{t('home.dataProfitPerHour')}</span>
                <span className="home-data__stat-value">R$ 500</span>
              </div>
              <div className="home-data__stat">
                <span className="home-data__stat-label">{t('home.dataHunts')}</span>
                <span className="home-data__stat-value">12</span>
              </div>
            </div>
            <small className="home-data__demo">{t('home.dataDemo')}</small>
          </div>

          <div className="home-data__places">
            <div className="home-data__places-visual">
              <div className="home-data__places-bars">
                <span style={{ height: '45%' }} />
                <span style={{ height: '70%' }} />
                <span style={{ height: '100%' }} />
                <span style={{ height: '60%' }} />
                <span style={{ height: '85%' }} />
              </div>
            </div>
            <div className="home-data__places-text">
              <h3 className="home-data__places-title">{t('home.dataPlacesTitle')}</h3>
              <p className="home-data__places-desc">{t('home.dataPlacesDesc')}</p>
              <Link to={ROUTES.recommendations} className="home-data__places-link">
                {t('home.dataPlacesLink')} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="home-cta" aria-labelledby="cta-title">
        <div className="home-cta__inner">
          <div className="home-cta__content">
            <span className="home-cta__eyebrow">{t('home.ctaEyebrow')}</span>
            <h2 id="cta-title" className="home-cta__title">
              {t('home.ctaTitle')}{' '}
              <span className="home-cta__title-highlight">{t('home.ctaTitleHighlight')}</span>
            </h2>
            <p className="home-cta__desc">{t('home.ctaDesc')}</p>

            <ul className="home-cta__benefits">
              <li>
                <span className="home-cta__check" aria-hidden>✓</span>
                <span>{t('home.ctaBenefit1')}</span>
              </li>
              <li>
                <span className="home-cta__check" aria-hidden>✓</span>
                <span>{t('home.ctaBenefit2')}</span>
              </li>
              <li>
                <span className="home-cta__check" aria-hidden>✓</span>
                <span>{t('home.ctaBenefit3')}</span>
              </li>
            </ul>

            <Link to="/register" className="home-cta__button">
              {t('home.ctaButton')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}