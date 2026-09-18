import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { MAX_MESSAGE_LENGTH } from '../../api/constants.ts'
import { getErrorMessage } from '../../api/errors.ts'
import { SendIcon } from '../../shared/icons.tsx'
import { IconButton } from '../../shared/ui/IconButton.tsx'
import { useChat } from '../chats/chat-context.ts'
import styles from './Composer.module.css'

export function Composer() {
  const { sendMessage } = useChat()
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  async function submit() {
    const value = text.trim()
    if (!value || sending) {
      return
    }

    setError(null)
    setSending(true)

    try {
      await sendMessage(value)
      setText('')
    } catch (sendError) {
      setError(getErrorMessage(sendError))
    } finally {
      setSending(false)
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submit()
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void submit()
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.row}>
        <textarea
          className={styles.input}
          value={text}
          onChange={(event) => setText(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
          onKeyDown={onKeyDown}
          placeholder="Сообщение"
          rows={1}
          maxLength={MAX_MESSAGE_LENGTH}
        />
        <IconButton
          className={styles.send}
          label="Отправить"
          type="submit"
          disabled={!text.trim() || sending}
        >
          <SendIcon />
        </IconButton>
      </div>
    </form>
  )
}
