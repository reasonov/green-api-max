import { useState } from 'react'
import { useAuth } from '../features/auth/auth-context.ts'
import { useChat } from '../features/chats/chat-context.ts'
import { ChatList } from '../features/chats/ChatList.tsx'
import { NewChatModal } from '../features/chats/NewChatModal.tsx'
import { Conversation } from '../features/messages/Conversation.tsx'
import { LogoutIcon, PlusIcon } from '../shared/icons.tsx'
import { IconButton } from '../shared/ui/IconButton.tsx'
import { EmptyChat } from './EmptyChat.tsx'
import styles from './AppShell.module.css'

export function AppShell() {
  const { logout } = useAuth()
  const { selectedChat, showList } = useChat()
  const [newChatOpen, setNewChatOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <aside className={[styles.sidebar, showList ? '' : styles.sidebarHidden].filter(Boolean).join(' ')}>
        <header className={styles.sidebarHeader}>
          <h1>Чаты</h1>
          <div className={styles.actions}>
            <IconButton label="Новый чат" onClick={() => setNewChatOpen(true)}>
              <PlusIcon />
            </IconButton>
            <IconButton label="Выйти" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </div>
        </header>
        <div className={styles.chatList}>
          <ChatList />
        </div>
      </aside>
      <div className={[styles.main, showList ? styles.mainHidden : ''].filter(Boolean).join(' ')}>
        {selectedChat ? <Conversation /> : <EmptyChat />}
      </div>
      <NewChatModal open={newChatOpen} onClose={() => setNewChatOpen(false)} />
    </div>
  )
}
