import { Avatar } from '../../shared/ui/Avatar.tsx'
import { formatMessageTime } from '../messages/format-time.ts'
import { useChat } from './chat-context.ts'
import styles from './ChatList.module.css'

export function ChatList() {
  const { chats, selectedChatId, selectChat } = useChat()

  if (chats.length === 0) {
    return <p className={styles.empty}>Нет чатов. Создайте новый, чтобы начать переписку.</p>
  }

  return (
    <ul className={styles.list}>
      {chats.map((chat) => {
        const selected = chat.chatId === selectedChatId
        return (
          <li key={chat.chatId}>
            <button
              className={[styles.item, selected ? styles.selected : ''].filter(Boolean).join(' ')}
              type="button"
              onClick={() => selectChat(chat.chatId)}
            >
              <Avatar name={chat.title} />
              <span className={styles.body}>
                <span className={styles.top}>
                  <span className={styles.name}>{chat.title}</span>
                  {chat.lastTimestamp ? (
                    <time className={styles.time}>{formatMessageTime(chat.lastTimestamp)}</time>
                  ) : null}
                </span>
                <span className={styles.preview}>{chat.lastMessage || 'Нет сообщений'}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
