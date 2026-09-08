import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import './Breadcrumb.css'

export interface BreadcrumbItem {
  label: string
  /** Se omitido, o item é tratado como página atual (não-link). */
  to?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <li className="breadcrumb__separator" aria-hidden>
                <ChevronRight size={14} />
              </li>
            )}
            <li className="breadcrumb__item">
              {item.to ? (
                <Link to={item.to} className="breadcrumb__link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
