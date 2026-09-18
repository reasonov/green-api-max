import type { Credentials } from '../api/types.ts'

export type { Credentials }

export type Chat = {
  chatId: string
  title: string
  phoneNumber?: string
  lastMessage: string
  lastTimestamp: number
}

export type MessageDirection = 'incoming' | 'outgoing'

export type ChatMessage = {
  id: string
  chatId: string
  text: string
  direction: MessageDirection
  timestamp: number
}

export type IncomingTextMessage = {
  idMessage: string
  chatId: string
  title: string
  phoneNumber?: string
  text: string
  timestamp: number
}
