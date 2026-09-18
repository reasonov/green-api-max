import { BackIcon } from '../../shared/icons.tsx'
import { Avatar } from '../../shared/ui/Avatar.tsx'
import { IconButton } from '../../shared/ui/IconButton.tsx'
import { useChat } from '../chats/chat-context.ts'
import { formatPhone } from '../../api/phone.ts'
import { Composer } from './Composer.tsx'
import { MessageList } from './MessageList.tsx'
import styles from './Conversation.module.css'

export function Conversation() {
  const { selectedChat, selectedChatId, messages, showChatList } = useChat()

  if (!selectedChat || !selectedChatId) {
    return null
  }

  const subtitle = selectedChat.phoneNumber ? formatPhone(selectedChat.phoneNumber) : null

  return (
    <section className={styles.conversation}>
      <header className={styles.header}>
        <IconButton className={styles.back} label="К списку чатов" onClick={showChatList}>
          <BackIcon />
        </IconButton>
        <Avatar name={selectedChat.title} />
        <div className={styles.meta}>
          <h2>{selectedChat.title}</h2>
          {subtitle && subtitle !== selectedChat.title ? <p>{subtitle}</p> : null}
        </div>
      </header>
      <MessageList messages={messages[selectedChatId] ?? []} />
      <Composer />
    </section>
  )
}
