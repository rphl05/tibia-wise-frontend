import { useTranslation } from 'react-i18next'

import './PremiumPage.css'

const PremiumPage = () => {
  const { t } = useTranslation()

  return (
    <div className="premium-page">
      <header className="premium-page__header">
        <h1>{t('premium.title', 'Premium')}</h1>
        <p>{t('premium.subtitle', 'Desbloqueie recursos exclusivos')}</p>
      </header>

      <main className="premium-page__main">
        <section className="premium-page__hero">
          <div className="premium-page__hero-content">
            <h2>{t('premium.heroTitle', 'Tibia Wise Premium')}</h2>
            <p>{t('premium.heroDescription', 'Acesso ilimitado a estatísticas avançadas, recomendações personalizadas e suporte prioritário.')}</p>
            <button className="premium-page__cta">
              {t('premium.cta', 'Assinar Agora')}
            </button>
          </div>
        </section>

        <section className="premium-page__benefits">
          <h2>{t('premium.benefitsTitle', 'Benefícios do Premium')}</h2>
          <ul className="premium-page__benefits-list">
            <li>
              <span className="premium-page__benefit-icon">📊</span>
              <div>
                <h3>{t('premium.benefit1.title', 'Estatísticas Avançadas')}</h3>
                <p>{t('premium.benefit1.desc', 'Acesso completo a gráficos de evolução, comparação de períodos e análise de XP/profit.')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">🎯</span>
              <div>
                <h3>{t('premium.benefit2.title', 'Recomendações Personalizadas')}</h3>
                <p>{t('premium.benefit2.desc', 'Recomendações de caça baseadas no seu nível, vocação e histórico.')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">🔔</span>
              <div>
                <h3>{t('premium.benefit3.title', 'Notificações Prioritárias')}</h3>
                <p>{t('premium.benefit3.desc', 'Receba alertas de eventos, manutenções e novas hunts em tempo real.')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">💬</span>
              <div>
                <h3>{t('premium.benefit4.title', 'Suporte Prioritário')}</h3>
                <p>{t('premium.benefit4.desc', 'Atendimento prioritário com tempo de resposta garantido em até 4 horas.')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">📈</span>
              <div>
                <h3>{t('premium.benefit5.title', 'Exportação Ilimitada')}</h3>
                <p>{t('premium.benefit5.desc', 'Exporte seus dados de hunt sem limites em CSV, JSON ou PDF.')}</p>
              </div>
            </li>
            <li>
              <span className="premium-page__benefit-icon">🚀</span>
              <div>
                <h3>{t('premium.benefit6.title', 'Acesso Antecipado')}</h3>
                <p>{t('premium.benefit6.desc', 'Acesso antecipado a novos recursos e funcionalidades em beta.')}</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="premium-page__plans">
          <h2>{t('premium.plansTitle', 'Planos Disponíveis')}</h2>
          <div className="premium-page__plans-grid">
            <div className="premium-page__plan">
              <h3>{t('premium.planMonthly.title', 'Mensal')}</h3>
              <div className="premium-page__plan-price">
                <span className="premium-page__plan-amount">{t('premium.planMonthly.price', 'R$ 19,90')}</span>
                <span className="premium-page__plan-period">{t('premium.planMonthly.period', '/mês')}</span>
              </div>
              <ul>
                <li>{t('premium.planMonthly.feature1', 'Acesso completo a todas as estatísticas')}</li>
                <li>{t('premium.planMonthly.feature2', 'Recomendações personalizadas')}</li>
                <li>{t('premium.planMonthly.feature3', 'Suporte prioritário')}</li>
              </ul>
              <button className="premium-page__plan-btn">{t('premium.planMonthly.cta', 'Assinar Mensal')}</button>
            </div>
            <div className="premium-page__plan premium-page__plan--featured">
              <span className="premium-page__plan-badge">{t('premium.planYearly.badge', 'Mais Popular')}</span>
              <h3>{t('premium.planYearly.title', 'Anual')}</h3>
              <div className="premium-page__plan-price">
                <span className="premium-page__plan-amount">{t('premium.planYearly.price', 'R$ 199,00')}</span>
                <span className="premium-page__plan-period">{t('premium.planYearly.period', '/ano')}</span>
              </div>
              <ul>
                <li>{t('premium.planYearly.feature1', 'Todos os benefícios do mensal')}</li>
                <li>{t('premium.planYearly.feature2', '2 meses grátis (economia de 17%)')}</li>
                <li>{t('premium.planYearly.feature3', 'Suporte VIP dedicado')}</li>
              </ul>
              <button className="premium-page__plan-btn premium-page__plan-btn--primary">{t('premium.planYearly.cta', 'Assinar Anual')}</button>
            </div>
          </div>
        </section>

        <section className="premium-page__faq">
          <h2>{t('premium.faqTitle', 'Dúvidas Frequentes')}</h2>
          <details>
            <summary>{t('premium.faq1.q', 'Posso cancelar a qualquer momento?')}</summary>
            <p>{t('premium.faq1.a', 'Sim, você pode cancelar a qualquer momento nas configurações da conta. O cancelamento entra em vigor no fim do período atual.')}</p>
          </details>
          <details>
            <summary>{t('premium.faq2.q', 'O que acontece se eu cancelar?')}</summary>
            <p>{t('premium.faq2.a', 'Você mantém os benefícios até o fim do período pago. Após isso, sua conta volta ao plano gratuito.')}</p>
          </details>
          <details>
            <summary>{t('premium.faq3.q', 'Posso mudar de plano?')}</summary>
            <p>{t('premium.faq3.a', 'Sim, você pode fazer upgrade ou downgrade a qualquer momento nas configurações de assinatura.')}</p>
          </details>
        </section>
      </main>
    </div>
  )
}

export default PremiumPage