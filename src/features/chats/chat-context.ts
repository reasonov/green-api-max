import { createContext, useContext } from 'react'
import type { Chat, ChatMessage } from '../../domain/models.ts'

export type ChatContextValue = {
  chats: Chat[]
  messages: Record<string, ChatMessage[]>
  selectedChatId: string | null
  selectedChat: Chat | null
  showList: boolean
  createChat: (phone: string) => Promise<void>
  sendMessage: (text: string) => Promise<void>
  selectChat: (chatId: string) => void
  showChatList: () => void
}

export const ChatContext = createContext<ChatContextValue | null>(null)

export function useChat(): ChatContextValue {
  const value = useContext(ChatContext)

  if (!value) {
    throw new Error('useChat должен вызываться внутри ChatProvider')
  }

  return value
}
