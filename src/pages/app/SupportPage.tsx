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
      question: t('support.general.q1'),
      answer: t('support.general.a1'),
    },
    {
      category: 'general',
      question: t('support.general.q2'),
      answer: t('support.general.a2'),
    },
    {
      category: 'billing',
      question: t('support.billing.q1'),
      answer: t('support.billing.a1'),
    },
    {
      category: 'billing',
      question: t('support.billing.q2'),
      answer: t('support.billing.a2'),
    },
    {
      category: 'technical',
      question: t('support.technical.q1'),
      answer: t('support.technical.a1'),
    },
    {
      category: 'technical',
      question: t('support.technical.q2'),
      answer: t('support.technical.a2'),
    },
    {
      category: 'account',
      question: t('support.account.q1'),
      answer: t('support.account.a1'),
    },
    {
      category: 'account',
      question: t('support.account.q2'),
      answer: t('support.account.a2'),
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
        <h1>{t('support.title')}</h1>
        <p>{t('support.subtitle')}</p>

        <div className="support-page__search">
          <input
            type="text"
            placeholder={t('support.searchPlaceholder')}
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
            <h3>{t('support.results')}</h3>
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
          <h3>{t('support.contactTitle')}</h3>
          <p>{t('support.contactDesc')}</p>

          {submitted ? (
            <div className="support-page__success">
              <h3>{t('support.successTitle')}</h3>
              <p>{t('support.successDesc')}</p>
            </div>
          ) : (
            <form className="support-page__form" onSubmit={handleSubmit}>
              <div className="support-page__form-group">
                <label htmlFor="support-name">{t('support.formName')}</label>
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
                <label htmlFor="support-email">{t('support.formEmail')}</label>
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
                <label htmlFor="support-category">{t('support.formCategory')}</label>
                <select
                  id="support-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="general">{t('support.category.general')}</option>
                  <option value="billing">{t('support.category.billing')}</option>
                  <option value="technical">{t('support.category.technical')}</option>
                  <option value="account">{t('support.category.account')}</option>
                </select>
              </div>
              <div className="support-page__form-group">
                <label htmlFor="support-message">{t('support.formMessage')}</label>
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
                {t('support.formSubmit')}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  )
}

export default SupportPage
