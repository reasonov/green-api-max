import { extractApiErrorMessage, GreenApiError, isAbortError } from './errors.ts'
import type {
  CheckAccountResponse,
  Credentials,
  DeleteNotificationResponse,
  GetStateInstanceResponse,
  ReceiveNotificationResponse,
  SendMessageRequest,
  SendMessageResponse,
  SetSettingsRequest,
} from './types.ts'

function buildUrl(credentials: Credentials, method: string, suffix = ''): string {
  const base = credentials.apiUrl.replace(/\/$/, '')
  return `${base}/waInstance${credentials.idInstance}/${method}/${credentials.apiTokenInstance}${suffix}`
}

async function request<T>(url: string, init: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(url, init)
  } catch (error) {
    if (isAbortError(error)) {
      throw error
    }

    throw new GreenApiError('Нет соединения с GREEN-API', 0)
  }

  const text = await response.text()

  if (!text.trim()) {
    if (!response.ok) {
      throw new GreenApiError(extractApiErrorMessage(null, response.status), response.status)
    }

    return null as T
  }

  let payload: unknown

  try {
    payload = JSON.parse(text)
  } catch {
    throw new GreenApiError('Некорректный ответ сервера', response.status)
  }

  if (!response.ok) {
    throw new GreenApiError(extractApiErrorMessage(payload, response.status), response.status, payload)
  }

  return payload as T
}

export function getStateInstance(
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<GetStateInstanceResponse> {
  return request<GetStateInstanceResponse>(buildUrl(credentials, 'getStateInstance'), {
    method: 'GET',
    signal,
  })
}

export function setSettings(
  credentials: Credentials,
  body: SetSettingsRequest,
  signal?: AbortSignal,
): Promise<unknown> {
  return request(buildUrl(credentials, 'setSettings'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  })
}

export function checkAccount(
  credentials: Credentials,
  phoneNumber: number,
  signal?: AbortSignal,
): Promise<CheckAccountResponse> {
  return request<CheckAccountResponse>(buildUrl(credentials, 'checkAccount'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
    signal,
  })
}

export function sendMessage(
  credentials: Credentials,
  body: SendMessageRequest,
  signal?: AbortSignal,
): Promise<SendMessageResponse> {
  return request<SendMessageResponse>(buildUrl(credentials, 'sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  })
}

export function receiveNotification(
  credentials: Credentials,
  receiveTimeout: number,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse> {
  const url = `${buildUrl(credentials, 'receiveNotification')}?receiveTimeout=${receiveTimeout}`
  return request<ReceiveNotificationResponse>(url, {
    method: 'GET',
    signal,
  })
}

export function deleteNotification(
  credentials: Credentials,
  receiptId: number,
  signal?: AbortSignal,
): Promise<DeleteNotificationResponse> {
  return request<DeleteNotificationResponse>(
    buildUrl(credentials, 'deleteNotification', `/${receiptId}`),
    {
      method: 'DELETE',
      signal,
    },
  )
}
