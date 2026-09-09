import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/config/routes'
import './Footer.css'

export function Footer() {
  const { t } = useTranslation()

  const columns = [
    {
      title: t('footer.product', 'Produto'),
      links: [
        { to: ROUTES.hunts, label: t('nav.myHunts') },
        { to: ROUTES.characters, label: t('footer.characters', 'Characters') },
        { to: ROUTES.statistics, label: t('footer.statistics', 'Statistics') },
        { to: ROUTES.rankings, label: t('footer.rankings', 'Rankings') },
      ],
    },
    {
      title: t('footer.help', 'Ajuda'),
      links: [
        { to: ROUTES.tutorials, label: t('nav.tutorials') },
        { to: ROUTES.faq, label: t('footer.faq', 'FAQ') },
        { to: ROUTES.support, label: t('nav.support') },
      ],
    },
    {
      title: t('footer.legal', 'Legal'),
      links: [
        { to: ROUTES.terms, label: t('footer.terms', 'Termos de Uso') },
        { to: ROUTES.privacy, label: t('footer.privacy', 'Política de Privacidade') },
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
            {t('footer.tagline', 'Analytics para suas hunting sessions do Tibia.')}
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
          © {new Date().getFullYear()} Tibia Wise. {t('footer.rights', 'Todos os direitos reservados.')}
        </p>
      </div>
    </footer>
  )
}
