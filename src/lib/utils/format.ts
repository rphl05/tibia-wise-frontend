/**
 * Helpers centralizados de formatação.
 * Sempre usar estas funções em vez de duplicar lógica de Intl nos componentes.
 */

export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value)
}

/** Formata valores grandes de forma legível (ex.: 2.14M, 485k). */
export function formatCompactNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatCurrency(value: number, locale: string): string {
  return formatNumber(value, locale)
}

/** Valor com sinal explícito (+415,150 / -112,300). */
export function formatSignedNumber(value: number, locale: string): string {
  const formatted = formatNumber(Math.abs(value), locale)
  return `${value >= 0 ? '+' : '-'}${formatted}`
}

export function formatDate(value: string | Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(
    new Date(value),
  )
}

export function formatDateTime(value: string | Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

/** Duração em segundos → "2h 34min" conforme o idioma. */
export function formatDuration(seconds: number, locale: string): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const pt = locale.startsWith('pt')
  if (hours > 0) {
    return pt ? `${hours}h ${minutes}min` : `${hours}h ${minutes}m`
  }
  return pt ? `${minutes}min` : `${minutes}m`
}
