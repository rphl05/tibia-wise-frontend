import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './SupportPage.css'

const SupportPage = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const faqs = [
    {
      category: 'general',
      question: t('support.general.q1', 'Como recuperar minha conta?'),
      answer: t('support.general.a1', 'Use o link "Esqueci minha senha" na página de login. Você receberá um e-mail com instruções.'),
    },
    {
      category: 'general',
      question: t('support.general.q2', 'Onde encontro as estatísticas das minhas hunts?'),
      answer: t('support.general.a2', 'Acesse a página de Estatísticas no menu principal após fazer login.'),
    },
    {
      category: 'billing',
      question: t('support.billing.q1', 'Como cancelar minha assinatura?'),
      answer: t('support.billing.a1', 'Você pode cancelar nas configurações da conta. O cancelamento entra em vigor no fim do período atual.'),
    },
    {
      category: 'billing',
      question: t('support.billing.q2', 'Quais métodos de pagamento são aceitos?'),
      answer: t('support.billing.a2', 'Aceitamos cartões de crédito (Visa, Mastercard, Amex), Pix e PayPal.'),
    },
    {
      category: 'technical',
      question: t('support.technical.q1', 'O site está lento ou apresentando erros?'),
      answer: t('support.technical.a1', 'Tente limpar o cache do navegador, desativar extensões e recarregar a página. Se persistir, entre em contato.'),
    },
    {
      category: 'technical',
      question: t('support.technical.q2', 'Como exporto meus dados?'),
      answer: t('support.technical.a2', 'Configurações > Privacidade > Exportar Dados disponibiliza seus dados em CSV.'),
    },
    {
      category: 'account',
      question: t('support.account.q1', 'Como altero meu e-mail?'),
      answer: t('support.account.a1', 'Vá em Configurações > Perfil para atualizar seu e-mail.'),
    },
    {
      category: 'account',
      question: t('support.account.q2', 'Como excluo minha conta?'),
      answer: t('support.account.a2', 'Configurações > Privacidade > Excluir Conta. Essa ação é irreversível.'),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: send support ticket to backend
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="support-page">
      <header className="support-page__header">
        <h1>{t('support.title', 'Central de Suporte')}</h1>
        <p>{t('support.subtitle', 'Encontre respostas ou entre em contato conosco')}</p>

        <div className="support-page__search">
          <input
            type="text"
            placeholder={t('support.searchPlaceholder', 'Buscar no suporte...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="support-page__search-input"
          />
        </div>
      </header>

      <main className="support-page__main">
        <section className="support-page__categories">
          {['general', 'billing', 'technical', 'account'].map((category) => (
            <div key={category} className="support-page__category">
              <h3>{t(`support.category.${category}`, category.charAt(0).toUpperCase() + category.slice(1))}</h3>
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

        {searchQuery && filteredFaqs.length > 0 && (
          <section className="support-page__results">
            <h3>{t('support.results', 'Resultados da busca')}</h3>
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

        <section className="support-page__contact">
          <h3>{t('support.contactTitle', 'Não encontrou o que procurava?')}</h3>
          <p>{t('support.contactDesc', 'Envie uma mensagem e nossa equipe responderá em breve.')}</p>

          {submitted ? (
            <div className="support-page__success">
              <h3>{t('support.successTitle', 'Mensagem enviada!')}</h3>
              <p>{t('support.successDesc', 'Obrigado pelo contato. Responderemos em até 24 horas úteis.')}</p>
            </div>
          ) : (
            <form className="support-page__form" onSubmit={handleSubmit}>
              <div className="support-page__form-group">
                <label htmlFor="support-name">{t('support.formName', 'Nome')}</label>
                <input
                  id="support-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="support-page__form-group">
                <label htmlFor="support-email">{t('support.formEmail', 'E-mail')}</label>
                <input
                  id="support-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="support-page__form-group">
                <label htmlFor="support-category">{t('support.formCategory', 'Categoria')}</label>
                <select
                  id="support-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="general">{t('support.category.general', 'General')}</option>
                  <option value="billing">{t('support.category.billing', 'Billing')}</option>
                  <option value="technical">{t('support.category.technical', 'Technical')}</option>
                  <option value="account">{t('support.category.account', 'Account')}</option>
                </select>
              </div>
              <div className="support-page__form-group">
                <label htmlFor="support-message">{t('support.formMessage', 'Mensagem')}</label>
                <textarea
                  id="support-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="support-page__submit">
                {t('support.formSubmit', 'Enviar mensagem')}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  )
}

export default SupportPage
