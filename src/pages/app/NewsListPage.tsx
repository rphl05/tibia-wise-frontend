import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { statisticsApi } from '@/features/statistics/api/statistics.api'

import './NewsListPage.css'

const NEWS_PER_PAGE = 10

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function NewsListPage() {
  const { t } = useTranslation()

  const { data: news, isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ['news'],
    queryFn: () => statisticsApi.getDashboard(),
  })

  if (newsLoading) {
    return (
      <div className="news-page">
        <h1>{t('statistics.latestNews')}</h1>
        <div className="skeleton-list">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton-item" />)}
        </div>
      </div>
    )
  }

  if (newsError || !news || !news.latest_news) {
    return (
      <div className="news-page">
        <h1>{t('statistics.latestNews')}</h1>
        <p>{t('statistics.noNews')}</p>
      </div>
    )
  }

  return (
    <div className="news-page">
      <header className="news-page__header">
        <h1>{t('statistics.latestNews')}</h1>
        <nav className="news-page__filters">
          <a href="/app/news" className="news-page__filter-active">{t('statistics.latestNews')}</a>
          <a href="/app/news/categoria/tecnologia">{t('statistics.technology')}</a>
          <a href="/app/news/categoria/guides">{t('statistics.guides')}</a>
          <a href="/app/news/categoria/promos">{t('statistics.promotions')}</a>
        </nav>
      </header>

      <main className="news-page__main">
        <section className="news-page__list">
          {news.latest_news.slice(0, NEWS_PER_PAGE).map((newsItem) => (
            <article key={newsItem.id} className="news-page__news-item">
              <h2 className="news-page__title">
                <Link to={`/app/news/details/${newsItem.id}`}>{newsItem.title}</Link>
              </h2>
              <p className="news-page__summary">{newsItem.summary}</p>
              <div className="news-page__meta">
                <span className="news-page__date">{formatDate(newsItem.created_at)}</span>
                <span className="news-page__author">{t('statistics.byAuthor')}</span>
              </div>
            </article>
          ))}

          {news.latest_news.length > NEWS_PER_PAGE ? (
            <div className="news-page__load-more">
              <button>{t('statistics.loadMore')}</button>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  )
}