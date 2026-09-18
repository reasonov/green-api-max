export class GreenApiError extends Error {
  readonly status: number
  readonly payload: unknown

  constructor(message: string, status: number, payload?: unknown) {
    super(message)
    this.name = 'GreenApiError'
    this.status = status
    this.payload = payload
  }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof GreenApiError) {
    return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Неизвестная ошибка'
}

export function extractApiErrorMessage(payload: unknown, status: number): string {
  if (typeof payload === 'string' && payload.trim()) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>

    if (typeof record.message === 'string' && record.message.trim()) {
      return record.message
    }

    if (typeof record.error === 'string' && record.error.trim()) {
      return record.error
    }

    if (typeof record.reason === 'string' && record.reason.trim()) {
      return record.reason
    }
  }

  if (status === 401 || status === 403) {
    return 'Неверные учетные данные GREEN-API'
  }

  return `Ошибка GREEN-API (${status})`
}
