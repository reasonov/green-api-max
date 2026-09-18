import type { IncomingTextMessage } from '../domain/models.ts'
import type { MessageData, NotificationBody } from './types.ts'

function extractText(messageData: MessageData | undefined): string | null {
  if (!messageData) {
    return null
  }

  if (messageData.typeMessage === 'textMessage') {
    const text = messageData.textMessageData?.textMessage?.trim()
    return text || null
  }

  if (messageData.typeMessage === 'extendedTextMessage') {
    const text =
      messageData.extendedTextMessageData?.text?.trim() ||
      messageData.extendedTextMessageData?.textMessage?.trim()
    return text || null
  }

  return null
}

function resolveTitle(body: NotificationBody): string {
  const sender = body.senderData
  const name =
    sender?.senderContactName?.trim() ||
    sender?.senderName?.trim() ||
    sender?.chatName?.trim()

  return name || 'Чат'
}

export function mapIncomingText(body: NotificationBody): IncomingTextMessage | null {
  if (body.typeWebhook !== 'incomingMessageReceived' || !body.idMessage || !body.senderData) {
    return null
  }

  const text = extractText(body.messageData)
  if (!text) {
    return null
  }

  const phone = body.senderData.senderPhoneNumber

  return {
    idMessage: body.idMessage,
    chatId: body.senderData.chatId,
    title: resolveTitle(body),
    phoneNumber: phone && phone > 0 ? String(phone) : undefined,
    text,
    timestamp: body.timestamp * 1000,
  }
}
