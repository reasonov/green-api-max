import type { Chat, ChatMessage } from '../../domain/models.ts'

export type ChatState = {
  chats: Chat[]
  messages: Record<string, ChatMessage[]>
  selectedChatId: string | null
  showList: boolean
}

export type ChatAction =
  | { type: 'select'; chatId: string }
  | { type: 'showList' }
  | { type: 'upsertChat'; chat: Chat }
  | { type: 'addMessage'; message: ChatMessage; chat?: Chat }

export const initialChatState: ChatState = {
  chats: [],
  messages: {},
  selectedChatId: null,
  showList: true,
}

function sortChats(chats: Chat[]): Chat[] {
  return [...chats].sort((left, right) => right.lastTimestamp - left.lastTimestamp)
}

function mergeChat(chats: Chat[], chat: Chat): Chat[] {
  const index = chats.findIndex((item) => item.chatId === chat.chatId)

  if (index === -1) {
    return sortChats([chat, ...chats])
  }

  const current = chats[index]!
  const next = [...chats]
  next[index] = {
    ...current,
    ...chat,
    title: chat.title || current.title,
    phoneNumber: chat.phoneNumber || current.phoneNumber,
  }

  return sortChats(next)
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'select':
      return {
        ...state,
        selectedChatId: action.chatId,
        showList: false,
      }
    case 'showList':
      return {
        ...state,
        showList: true,
      }
    case 'upsertChat':
      return {
        ...state,
        chats: mergeChat(state.chats, action.chat),
        selectedChatId: action.chat.chatId,
        showList: false,
      }
    case 'addMessage': {
      const existing = state.messages[action.message.chatId] ?? []
      if (existing.some((item) => item.id === action.message.id)) {
        return state
      }

      const chatUpdate = action.chat ?? {
        chatId: action.message.chatId,
        title: action.message.chatId,
        lastMessage: action.message.text,
        lastTimestamp: action.message.timestamp,
      }

      return {
        ...state,
        chats: mergeChat(state.chats, {
          ...chatUpdate,
          lastMessage: action.message.text,
          lastTimestamp: action.message.timestamp,
        }),
        messages: {
          ...state.messages,
          [action.message.chatId]: [...existing, action.message],
        },
      }
    }
    default:
      return state
  }
}
