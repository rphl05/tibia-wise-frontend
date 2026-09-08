import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import './Pagination.css'

export interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

/** Retorna a janela de páginas visíveis ao redor da página atual. */
function getVisiblePages(page: number, pageCount: number): number[] {
  const start = Math.max(1, Math.min(page - 2, pageCount - 4))
  const end = Math.min(pageCount, start + 4)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const { t } = useTranslation()

  if (pageCount <= 1) return null

  return (
    <nav
      className="pagination"
      role="navigation"
      aria-label={t('pagination.label', 'Paginação')}
    >
      <button
        type="button"
        className="pagination__button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label={t('pagination.previous', 'Página anterior')}
      >
        <ChevronLeft size={16} aria-hidden />
      </button>

      {getVisiblePages(page, pageCount).map((p) => (
        <button
          key={p}
          type="button"
          className={clsx('pagination__button', p === page && 'pagination__button--active')}
          aria-current={p === page ? 'page' : undefined}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        className="pagination__button"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label={t('pagination.next', 'Próxima página')}
      >
        <ChevronRight size={16} aria-hidden />
      </button>
    </nav>
  )
}
