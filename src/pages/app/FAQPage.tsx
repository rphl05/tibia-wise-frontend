import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './FAQPage.css'

const FAQPage = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      category: 'general',
      question: t('faqs.general.q1', 'Como funciona o Tibia Wise?'),
      answer: t('faqs.general.a1', 'O Tibia Wise é uma plataforma que ajuda jogadores de Tibia a acompanhar suas estatísticas de hunts, personagens e recomendações de caça.'),
    },
    {
      category: 'general',
      question: t('faqs.general.q2', 'Preciso criar uma conta?'),
      answer: t('faqs.general.a2', 'Não, você pode visualizar estatísticas públicas sem conta. Para salvar seus dados, é necessário registrar uma conta.'),
    },
    {
      category: 'account',
      question: t('faqs.account.q1', 'Como altero meu e-mail?'),
      answer: t('faqs.account.a1', 'Você pode alterar seu e-mail nas configurações da conta, na seção de perfil.'),
    },
    {
      category: 'account',
      question: t('faqs.account.q2', 'Como recupero minha senha?'),
      answer: t('faqs.account.a2', 'Use o link "Esqueci minha senha" na página de login. Você receberá um e-mail com instruções.'),
    },
    {
      category: 'technical',
      question: t('faqs.technical.q1', 'Por que os gráficos não estão carregando?'),
      answer: t('faqs.technical.a1', 'Isso pode ser devido a filtros de ad-blocker ou problemas de rede. Tente recarregar a página ou desativar temporariamente o ad-blocker.'),
    },
    {
      category: 'technical',
      question: t('faqs.technical.q2', 'Como limpar o cache do navegador?'),
      answer: t('faqs.technical.a2', 'Em configurações do navegador, vá em Privacidade e exclusão de dados de navegação, selecione "Cookies e outros dados de sites" e clique em Limpar dados.'),
    },
    {
      category: 'premium',
      question: t('faqs.premium.q1', 'Como funciona o plano premium?'),
      answer: t('faqs.premium.a1', 'O plano premium oferece estatísticas avançadas, gráficos ilimitados, recomendações personalizadas e suporte prioritário.'),
    },
    {
      category: 'premium',
      question: t('faqs.premium.q2', 'Posso cancelar a qualquer momento?'),
      answer: t('faqs.premium.a2', 'Sim, você pode cancelar seu plano premium a qualquer momento nas configurações de assinatura.'),
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower) ||
      faq.category.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="faq-page">
      <header className="faq-page__header">
        <h1>{t('faqs.title', 'Perguntas Frequentes')}</h1>
        <p>{t('faqs.subtitle', 'Encontre respostas para as dúvidas mais comuns')}</p>

        <div className="faq-page__search">
          <input
            type="text"
            placeholder={t('faqs.searchPlaceholder', 'Buscar perguntas...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="faq-page__search-input"
          />
          <button className="faq-page__search-btn">{t('faqs.search', 'Buscar')}</button>
        </div>
      </header>

      <main className="faq-page__main">
        <section className="faq-page__categories">
          {['general', 'account', 'technical', 'premium'].map((category) => (
            <div key={category} className="faq-page__category">
              <h3>{t(`faqs.category.${category}`, category.charAt(0).toUpperCase() + category.slice(1))}</h3>
              <ul>
                {faqs
                  .filter((f) => f.category === category)
                  .map((faq) => (
                    <li key={faq.question}>
                      <details>
                        <summary>{faq.question}</summary>
                        <p>{faq.answer}</p>
                      </details>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        {filteredFaqs.length > 0 && (
          <section className="faq-page__results">
            <h3>{t('faqs.results', 'Resultados da busca')}</h3>
            <ul>
              {filteredFaqs.map((faq) => (
                <li key={faq.question}>
                  <details>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}

export default FAQPage