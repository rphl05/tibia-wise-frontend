/**
 * Lista de países ISO 3166-1 alpha-2.
 * O backend valida apenas o formato `^[A-Z]{2}$` (não há catálogo no backend),
 * então os nomes são localizados via Intl.DisplayNames.
 */
const COUNTRY_CODES = [
  'AF', 'AL', 'DZ', 'AD', 'AO', 'AR', 'AM', 'AU', 'AT', 'AZ',
  'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BO', 'BA', 'BW',
  'BR', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'TD',
  'CL', 'CN', 'CO', 'KM', 'CG', 'CR', 'HR', 'CU', 'CY', 'CZ',
  'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'EE', 'ET', 'FI',
  'FR', 'GA', 'GM', 'GE', 'DE', 'GH', 'GR', 'GT', 'GN', 'GY',
  'HT', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE',
  'IL', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KE', 'KR', 'KW', 'KG',
  'LA', 'LV', 'LB', 'LY', 'LI', 'LT', 'LU', 'MG', 'MW', 'MY',
  'MV', 'ML', 'MT', 'MU', 'MX', 'MD', 'MC', 'MN', 'ME', 'MA',
  'MZ', 'MM', 'NA', 'NP', 'NL', 'NZ', 'NI', 'NE', 'NG', 'MK',
  'NO', 'OM', 'PK', 'PA', 'PG', 'PY', 'PE', 'PH', 'PL', 'PT',
  'PR', 'QA', 'RO', 'RU', 'RW', 'SA', 'SN', 'RS', 'SG', 'SK',
  'SI', 'ZA', 'ES', 'LK', 'SD', 'SE', 'CH', 'SY', 'TW', 'TH',
  'TN', 'TR', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VE', 'VN',
  'YE', 'ZM', 'ZW',
] as const

export interface CountryOption {
  code: string
  name: string
}

/**
 * Retorna a lista de países com nomes localizados e ordenados
 * conforme o idioma informado ('pt-BR' | 'en').
 */
export function getCountries(locale: string): CountryOption[] {
  const displayNames = new Intl.DisplayNames([locale], { type: 'region' })
  const countries = COUNTRY_CODES.flatMap((code) => {
    const name = displayNames.of(code)
    return name && name !== code ? [{ code, name }] : []
  })
  return countries.sort((a, b) => a.name.localeCompare(b.name, locale))
}

/** Nome localizado de um país a partir do código ISO. */
export function getCountryName(code: string | null | undefined, locale: string): string {
  if (!code) return ''
  const displayNames = new Intl.DisplayNames([locale], { type: 'region' })
  const name = displayNames.of(code.toUpperCase())
  return name && name !== code.toUpperCase() ? name : code.toUpperCase()
}
