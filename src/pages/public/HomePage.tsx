import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-page__hero">
        <div className="home-page__hero-content">
          <h1 className="home-page__title">
            {t('home.title', 'Analise suas hunts como nunca')}
          </h1>
          <p className="home-page__subtitle">
            {t('home.subtitle', 'Transforme seus dados de hunting em insights valiosos.')}
          </p>
          <div className="home-page__cta">
            <Link to="/register" className="home-page__cta-primary">
              {t('home.start', 'Começar agora')}
            </Link>
            <Link to="/hunts" className="home-page__cta-secondary">
              {t('home.explore', 'Explorar hunts')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-page__features">
        <h2>{t('home.features.title', 'Como funciona')}</h2>
        <div className="home-page__features-grid">
          <div className="feature-card">
            <span className="feature-card__number">01</span>
            <h3>{t('home.features.import.title', 'Importar')}</h3>
            <p>{t('home.features.import.desc', 'Importe suas hunting sessions do Tibia.')}</p>
          </div>
          <div className="feature-card">
            <span className="feature-card__number">02</span>
            <h3>{t('home.features.analyze.title', 'Analisar')}</h3>
            <p>{t('home.features.analyze.desc', 'Entenda XP/h, profit/h, loot e desempenho.')}</p>
          </div>
          <div className="feature-card">
            <span className="feature-card__number">03</span>
            <h3>{t('home.features.improve.title', 'Melhorar')}</h3>
            <p>{t('home.features.improve.desc', 'Obtenha recomendações personalizadas.')}</p>
          </div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="home-page__stats-preview">
        <div className="home-page__stats-grid">
          <div className="stat-card">
            <h3>{t('home.stats.xp', 'XP/h')}</h3>
            <p>1,250,000</p>
            <small className="stat-card__trend">+12% esta semana</small>
          </div>
          <div className="stat-card">
            <h3>{t('home.stats.profit', 'Profit/h')}</h3>
            <p>R$ 500</p>
            <small className="stat-card__trend">+8% esta semana</small>
          </div>
          <div className="stat-card">
            <h3>{t('home.stats.hunts', 'Hunts')}</h3>
            <p>12</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-page__cta-section">
        <div className="home-page__cta-content">
          <h2>{t('home.cta.title', 'Pronto para huntar melhor?')}</h2>
          <p>{t('home.cta.desc', 'Crie sua conta e comece a analisar suas hunts.')}</p>
          <Link to="/register" className="home-page__cta-cta">
            {t('home.cta.button', 'Criar conta')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-page__footer">
        <div className="home-page__footer-content">
          <div className="footer-col">
            <h4>Tibia Wise</h4>
            <p>{t('footer.description', 'Análise de hunting sessions do Tibia.')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.product', 'Produto')}</h4>
            <ul>
              <li><Link to="/hunts">{t('footer.hunts', 'Hunts')}</Link></li>
              <li><Link to="/statistics">{t('footer.statistics', 'Statistics')}</Link></li>
              <li><Link to="/recommendations">{t('footer.recommendations', 'Recommendations')}</Link></li>
              <li><Link to="/premium">{t('footer.premium', 'Premium')}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer.help', 'Ajuda')}</h4>
            <ul>
              <li><Link to="/tutorials">{t('footer.tutorials', 'Tutoriais')}</Link></li>
              <li><Link to="/faq">{t('footer.faq', 'FAQ')}</Link></li>
              <li><Link to="/support">{t('footer.support', 'Suporte')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="home-page__footer-bottom">
          <p>{t('footer.copyright', '© 2025 Tibia Wise. Todos os direitos reservados.')}</p>
        </div>
      </footer>
    </div>
  )
}