import { DEFAULT_API_URL } from '../../api/constants.ts'
import type { Credentials } from '../../domain/models.ts'

const STORAGE_KEY = 'green-api.max.credentials'

export function loadCredentials(): Credentials | null {
  const raw = sessionStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<Credentials>
    if (!parsed.idInstance || !parsed.apiTokenInstance) {
      return null
    }

    return {
      apiUrl: parsed.apiUrl || DEFAULT_API_URL,
      idInstance: parsed.idInstance,
      apiTokenInstance: parsed.apiTokenInstance,
    }
  } catch {
    return null
  }
}

export function saveCredentials(credentials: Credentials): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(credentials))
}

export function clearCredentials(): void {
  sessionStorage.removeItem(STORAGE_KEY)
}
