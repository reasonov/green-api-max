import { POLL_RETRY_DELAY_MS, RECEIVE_TIMEOUT_SECONDS } from './constants.ts'
import { deleteNotification, receiveNotification } from './client.ts'
import { isAbortError } from './errors.ts'
import type { Credentials, NotificationBody } from './types.ts'

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }

    const timer = window.setTimeout(resolve, ms)
    const onAbort = () => {
      window.clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    }

    signal.addEventListener('abort', onAbort, { once: true })
  })
}

export async function runNotificationPolling(
  credentials: Credentials,
  signal: AbortSignal,
  onNotification: (body: NotificationBody) => void,
): Promise<void> {
  while (!signal.aborted) {
    try {
      const notification = await receiveNotification(
        credentials,
        RECEIVE_TIMEOUT_SECONDS,
        signal,
      )

      if (signal.aborted) {
        return
      }

      if (!notification) {
        continue
      }

      onNotification(notification.body)
      await deleteNotification(credentials, notification.receiptId, signal)
    } catch (error) {
      if (isAbortError(error) || signal.aborted) {
        return
      }

      try {
        await delay(POLL_RETRY_DELAY_MS, signal)
      } catch {
        return
      }
    }
  }
}
