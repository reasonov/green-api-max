import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { checkAccount, sendMessage as sendGreenMessage, setSettings } from '../../api/client.ts'
import { mapIncomingText } from '../../api/notifications.ts'
import { formatPhone, normalizePhone } from '../../api/phone.ts'
import { runNotificationPolling } from '../../api/polling.ts'
import { isCheckAccountFailure, type NotificationBody } from '../../api/types.ts'
import type { Credentials } from '../../domain/models.ts'
import { ChatContext } from './chat-context.ts'
import { chatReducer, initialChatState } from './chat-reducer.ts'

type ChatProviderProps = {
  credentials: Credentials
  children: ReactNode
}

export function ChatProvider({ credentials, children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialChatState)

  const onNotification = useCallback((body: NotificationBody) => {
    const incoming = mapIncomingText(body)
    if (!incoming) {
      return
    }

    dispatch({
      type: 'addMessage',
      message: {
        id: incoming.idMessage,
        chatId: incoming.chatId,
        text: incoming.text,
        direction: 'incoming',
        timestamp: incoming.timestamp,
      },
      chat: {
        chatId: incoming.chatId,
        title: incoming.title,
        phoneNumber: incoming.phoneNumber,
        lastMessage: incoming.text,
        lastTimestamp: incoming.timestamp,
      },
    })
  }, [])

  useEffect(() => {
    void setSettings(credentials, {
      webhookUrl: '',
      incomingWebhook: 'yes',
    }).catch(() => undefined)
  }, [credentials])

  useEffect(() => {
    const controller = new AbortController()
    void runNotificationPolling(credentials, controller.signal, onNotification)
    return () => controller.abort()
  }, [credentials, onNotification])

  const selectedChat = state.chats.find((chat) => chat.chatId === state.selectedChatId) ?? null

  const value = useMemo(
    () => ({
      chats: state.chats,
      messages: state.messages,
      selectedChatId: state.selectedChatId,
      selectedChat,
      showList: state.showList,
      async createChat(phone: string) {
        const normalized = normalizePhone(phone)
        if (!normalized) {
          throw new Error('Введите номер России или Беларуси в международном формате')
        }

        const existing = state.chats.find(
          (chat) => chat.phoneNumber === normalized || chat.chatId === normalized,
        )

        if (existing) {
          dispatch({ type: 'select', chatId: existing.chatId })
          return
        }

        const result = await checkAccount(credentials, Number(normalized))

        if (isCheckAccountFailure(result)) {
          throw new Error(result.reason || 'Не удалось проверить номер')
        }

        if (!result.exist || !result.chatId) {
          throw new Error('На этом номере нет аккаунта MAX')
        }

        dispatch({
          type: 'upsertChat',
          chat: {
            chatId: result.chatId,
            title: formatPhone(normalized),
            phoneNumber: normalized,
            lastMessage: '',
            lastTimestamp: Date.now(),
          },
        })
      },
      async sendMessage(text: string) {
        const chatId = state.selectedChatId
        if (!chatId) {
          throw new Error('Сначала выберите чат')
        }

        const message = text.trim()
        if (!message) {
          return
        }

        const response = await sendGreenMessage(credentials, { chatId, message })
        dispatch({
          type: 'addMessage',
          message: {
            id: response.idMessage,
            chatId,
            text: message,
            direction: 'outgoing',
            timestamp: Date.now(),
          },
        })
      },
      selectChat(chatId: string) {
        dispatch({ type: 'select', chatId })
      },
      showChatList() {
        dispatch({ type: 'showList' })
      },
    }),
    [credentials, selectedChat, state.chats, state.messages, state.selectedChatId, state.showList],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
