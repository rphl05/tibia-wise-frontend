import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  articlePublishedTime?: string
  articleModifiedTime?: string
  articleAuthor?: string
  articleSection?: string
  articleTags?: string[]
  noIndex?: boolean
  noFollow?: boolean
}

export function SEO({
  title,
  description,
  canonical,
  ogImage = '/assets/images/og-default.webp',
  ogType = 'website',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  articleTags,
  noIndex = false,
  noFollow = false,
}: SEOProps) {
  const { t } = useTranslation()

  const siteUrl = 'https://tibiawise.com'
  const fullTitle = title ? `${title} | Tibia Wise` : 'Tibia Wise — Analytics para suas Hunts'
  const fullDescription = description || t('seo.defaultDescription')
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : 'https://tibiawise.com/'
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ogType === 'article' ? 'Article' : 'WebPage',
    name: fullTitle,
    description: fullDescription,
    url: fullCanonical,
    image: fullOgImage,
    ...(ogType === 'article' && {
      datePublished: articlePublishedTime,
      dateModified: articleModifiedTime,
      author: {
        '@type': 'Organization',
        name: articleAuthor || 'Tibia Wise',
      },
      articleSection: articleSection,
      keywords: articleTags?.join(', '),
      publisher: {
        '@type': 'Organization',
        name: 'Tibia Wise',
        logo: {
          '@type': 'ImageObject',
          url: 'https://tibiawise.com/assets/images/logo.webp',
        },
      },
    }),
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={fullCanonical} />
      {noIndex && <meta name="robots" content="noindex" />}
      {noFollow && <meta name="robots" content="nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Tibia Wise" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Article-specific */}
      {ogType === 'article' && (
        <>
          <meta property="article:published_time" content={articlePublishedTime || ''} />
          <meta property="article:modified_time" content={articleModifiedTime || ''} />
          <meta property="article:author" content={articleAuthor || 'Tibia Wise'} />
          <meta property="article:section" content={articleSection || ''} />
          {articleTags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
        </>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Helmet>
  )
}

export default SEO