import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/config/routes'
import './Footer.css'

export function Footer() {
  const { t } = useTranslation()

  const columns = [
    {
      title: t('footer.product'),
      links: [
        { to: ROUTES.hunts, label: t('nav.hunts') },
        { to: ROUTES.characters, label: t('footer.characters') },
        { to: ROUTES.statistics, label: t('footer.statistics') },
        { to: ROUTES.rankings, label: t('footer.rankings') },
      ],
    },
    {
      title: t('footer.help'),
      links: [
        { to: ROUTES.tutorials, label: t('nav.tutorials') },
        { to: ROUTES.faq, label: t('footer.faq') },
        { to: ROUTES.support, label: t('nav.support') },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { to: ROUTES.terms, label: t('footer.terms') },
        { to: ROUTES.privacy, label: t('footer.privacy') },
      ],
    },
  ]

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img
            src="/assets/images/tibia-wise-logo.svg"
            alt="Tibia Wise"
            className="footer__logo"
          />
          <p className="footer__tagline">
            {t('footer.tagline')}
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className="footer__col" aria-label={col.title}>
            <h3 className="footer__heading">{col.title}</h3>
            <ul className="footer__list">
              {col.links.map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Tibia Wise. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
