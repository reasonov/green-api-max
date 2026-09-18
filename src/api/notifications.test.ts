import { describe, expect, it } from 'vitest'
import { mapIncomingText } from './notifications.ts'
import type { NotificationBody } from './types.ts'

const incomingText: NotificationBody = {
  typeWebhook: 'incomingMessageReceived',
  timestamp: 1763115112,
  idMessage: '1763115112345',
  senderData: {
    chatId: '10000000',
    chatName: 'Иван',
    senderName: 'Иван Петров',
    senderContactName: 'Иван',
    senderPhoneNumber: 79991234567,
  },
  messageData: {
    typeMessage: 'textMessage',
    textMessageData: {
      textMessage: 'Привет',
    },
  },
}

describe('mapIncomingText', () => {
  it('маппит входящее текстовое сообщение', () => {
    expect(mapIncomingText(incomingText)).toEqual({
      idMessage: '1763115112345',
      chatId: '10000000',
      title: 'Иван',
      phoneNumber: '79991234567',
      text: 'Привет',
      timestamp: 1763115112000,
    })
  })

  it('маппит extendedTextMessage', () => {
    const body: NotificationBody = {
      ...incomingText,
      messageData: {
        typeMessage: 'extendedTextMessage',
        extendedTextMessageData: {
          text: 'Ссылка https://example.com',
        },
      },
    }

    expect(mapIncomingText(body)?.text).toBe('Ссылка https://example.com')
  })

  it('игнорирует нетекстовые и служебные уведомления', () => {
    expect(
      mapIncomingText({
        ...incomingText,
        typeWebhook: 'outgoingMessageStatus',
      }),
    ).toBeNull()

    expect(
      mapIncomingText({
        ...incomingText,
        messageData: { typeMessage: 'imageMessage' },
      }),
    ).toBeNull()
  })

  it('не берёт скрытый номер телефона', () => {
    const body: NotificationBody = {
      ...incomingText,
      senderData: {
        ...incomingText.senderData!,
        senderPhoneNumber: 0,
      },
    }

    expect(mapIncomingText(body)?.phoneNumber).toBeUndefined()
  })
})
