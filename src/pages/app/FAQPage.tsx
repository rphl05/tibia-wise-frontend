import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './FAQPage.css'

const FAQPage = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      category: 'general',
      question: t('faqs.general.q1'),
      answer: t('faqs.general.a1'),
    },
    {
      category: 'general',
      question: t('faqs.general.q2'),
      answer: t('faqs.general.a2'),
    },
    {
      category: 'account',
      question: t('faqs.account.q1'),
      answer: t('faqs.account.a1'),
    },
    {
      category: 'account',
      question: t('faqs.account.q2'),
      answer: t('faqs.account.a2'),
    },
    {
      category: 'technical',
      question: t('faqs.technical.q1'),
      answer: t('faqs.technical.a1'),
    },
    {
      category: 'technical',
      question: t('faqs.technical.q2'),
      answer: t('faqs.technical.a2'),
    },
    {
      category: 'premium',
      question: t('faqs.premium.q1'),
      answer: t('faqs.premium.a1'),
    },
    {
      category: 'premium',
      question: t('faqs.premium.q2'),
      answer: t('faqs.premium.a2'),
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
        <h1>{t('faqs.title')}</h1>
        <p>{t('faqs.subtitle')}</p>

        <div className="faq-page__search">
          <input
            type="text"
            placeholder={t('faqs.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="faq-page__search-input"
          />
          <button className="faq-page__search-btn">{t('faqs.search')}</button>
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
            <h3>{t('faqs.results')}</h3>
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