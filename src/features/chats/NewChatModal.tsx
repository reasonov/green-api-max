import { useState, type FormEvent } from 'react'
import { getErrorMessage } from '../../api/errors.ts'
import { Button } from '../../shared/ui/Button.tsx'
import { Modal } from '../../shared/ui/Modal.tsx'
import { TextField } from '../../shared/ui/TextField.tsx'
import { useChat } from './chat-context.ts'
import styles from './NewChatModal.module.css'

type NewChatModalProps = {
  open: boolean
  onClose: () => void
}

export function NewChatModal({ open, onClose }: NewChatModalProps) {
  const { createChat } = useChat()
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await createChat(phone)
      setPhone('')
      onClose()
    } catch (createError) {
      setError(getErrorMessage(createError))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} title="Новый чат" onClose={onClose}>
      <form className={styles.form} onSubmit={onSubmit}>
        <TextField
          label="Номер телефона"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+7 999 123-45-67"
          autoComplete="tel"
          error={error ?? undefined}
          required
        />
        <p className={styles.hint}>Россия или Беларусь, международный формат</p>
        <Button type="submit" loading={submitting} disabled={!phone.trim()}>
          Создать
        </Button>
      </form>
    </Modal>
  )
}
