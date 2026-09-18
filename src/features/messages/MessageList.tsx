import { useEffect, useRef } from 'react'
import type { ChatMessage } from '../../domain/models.ts'
import { formatMessageTime } from './format-time.ts'
import styles from './MessageList.module.css'

type MessageListProps = {
  messages: ChatMessage[]
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  if (messages.length === 0) {
    return <p className={styles.empty}>Напишите первое сообщение</p>
  }

  return (
    <div className={styles.list}>
      <div className={styles.spacer} />
      {messages.map((message) => (
        <div
          key={message.id}
          className={[
            styles.row,
            message.direction === 'outgoing' ? styles.outgoing : styles.incoming,
          ].join(' ')}
        >
          <div className={styles.bubble}>
            <p>{message.text}</p>
            <time>{formatMessageTime(message.timestamp)}</time>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
