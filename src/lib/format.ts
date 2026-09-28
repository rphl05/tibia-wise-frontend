import { currentLocale } from '@/lib/i18n'

/**
 * Formatters centralizados. Regras:
 * - null / undefined / NaN / Infinity → '—' (nunca mascarar com 0, nunca "NaN" na UI)
 * - string numérica do backend é aceita
 */
export function formatNumber(value: number | string | null | undefined): string {
  const n = typeof value === 'string' ? Number(value) : value
  if (n === null || n === undefined || Number.isNaN(n) || !Number.isFinite(n)) return '—'
  return n.toLocaleString(currentLocale())
}

export function formatSignedNumber(value: number | string | null | undefined): string {
  const n = typeof value === 'string' ? Number(value) : value
  if (n === null || n === undefined || Number.isNaN(n) || !Number.isFinite(n)) return '—'
  return `${n >= 0 ? '+' : ''}${n.toLocaleString(currentLocale())}`
}

export function formatDuration(seconds: number | string | null | undefined): string {
  const s = typeof seconds === 'string' ? Number(seconds) : seconds
  if (s === null || s === undefined || Number.isNaN(s) || !Number.isFinite(s) || s < 0) return '—'
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}

export function formatPercent(value: number | string | null | undefined): string {
  const n = typeof value === 'string' ? Number(value) : value
  if (n === null || n === undefined || Number.isNaN(n) || !Number.isFinite(n)) return '—'
  return `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`
}

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return '—'
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return new Intl.DateTimeFormat(currentLocale(), { dateStyle: 'long' }).format(d)
}
