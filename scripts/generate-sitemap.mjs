import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SITE_URL = 'https://tibiawise.com'

const routes = [
  { path: '', changefreq: 'daily', priority: 1.0 },
  { path: '/dashboard', changefreq: 'daily', priority: 0.9 },
  { path: '/statistics', changefreq: 'daily', priority: 0.9 },
  { path: '/recommendations', changefreq: 'daily', priority: 0.8 },
  { path: '/characters', changefreq: 'weekly', priority: 0.8 },
  { path: '/hunts', changefreq: 'weekly', priority: 0.8 },
  { path: '/rankings', changefreq: 'daily', priority: 0.8 },
  { path: '/news', changefreq: 'daily', priority: 0.8 },
  { path: '/tutorials', changefreq: 'weekly', priority: 0.7 },
  { path: '/faq', changefreq: 'monthly', priority: 0.6 },
  { path: '/support', changefreq: 'monthly', priority: 0.6 },
  { path: '/premium', changefreq: 'monthly', priority: 0.7 },
  { path: '/profile', changefreq: 'monthly', priority: 0.5 },
  { path: '/settings', changefreq: 'monthly', priority: 0.5 },
  { path: '/rankings', changefreq: 'daily', priority: 0.8 },
]

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0]

  const urls = routes.map((route) => {
    const url = `https://tibiawise.com${route.path}`
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
}

const sitemap = generateSitemap()
writeFileSync(resolve(__dirname, '../public/sitemap.xml'), sitemap)
console.log('sitemap.xml generated successfully')