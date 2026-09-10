import { useTranslation } from 'react-i18next'

import './TutorialsPage.css'

type TutorialCategory = 'primeiros-passos' | 'analise' | 'recursos'

const TutorialsPage = () => {
  const { t } = useTranslation()

  const categories: TutorialCategory[] = ['primeiros-passos', 'analise', 'recursos']

  return (
    <div className="tutorials-page">
      <header className="tutorials-page__header">
        <h1>{t('tutorials.title', 'Tutoriais')}</h1>
        <p>{t('tutorials.subtitle', 'Aprenda Tibia Wise do básico ao avançado')}</p>
      </header>

      <main className="tutorials-page__main">
        <section className="tutorials-page__categories">
          {categories.map((category) => (
            <div key={category} className="tutorials-page__category-card">
              <h2 className="tutorials-page__category-title">
                {t(`tutorials.${category}`, category.replace('-', ' '))}
              </h2>
              <p className="tutorials-page__category-description">
                {t(`tutorials.${category}.desc`, 'Conteúdo em desenvolvimento.')}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default TutorialsPage