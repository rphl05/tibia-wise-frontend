/** Formato de erro padronizado da API (http-exception.filter). */
export interface ApiErrorBody {
  statusCode: number
  code: string
  message: string | string[]
}

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly details: string[]

  constructor(body: ApiErrorBody) {
    const details = Array.isArray(body.message) ? body.message : [body.message]
    super(details[0] ?? 'Unknown error')
    this.name = 'ApiError'
    this.status = body.statusCode
    this.code = body.code
    this.details = details
  }

  get isSessionExpired(): boolean {
    return this.status === 401
  }

  get isForbidden(): boolean {
    return this.status === 403
  }

  get isNotFound(): boolean {
    return this.status === 404
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}
