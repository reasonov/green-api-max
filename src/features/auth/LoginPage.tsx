import { useState, type FormEvent } from 'react'
import { getErrorMessage } from '../../api/errors.ts'
import { LogoIcon } from '../../shared/icons.tsx'
import { Button } from '../../shared/ui/Button.tsx'
import { TextField } from '../../shared/ui/TextField.tsx'
import { useAuth } from './auth-context.ts'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { login } = useAuth()
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await login(idInstance, apiTokenInstance)
    } catch (loginError) {
      setError(getErrorMessage(loginError))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={onSubmit}>
        <div className={styles.brand}>
          <LogoIcon />
          <div>
            <h1>MAX</h1>
            <p>Вход через GREEN-API</p>
          </div>
        </div>
        <TextField
          label="idInstance"
          name="idInstance"
          value={idInstance}
          onChange={(event) => setIdInstance(event.target.value)}
          autoComplete="username"
          required
        />
        <TextField
          label="apiTokenInstance"
          name="apiTokenInstance"
          type="password"
          value={apiTokenInstance}
          onChange={(event) => setApiTokenInstance(event.target.value)}
          autoComplete="current-password"
          spellCheck={false}
          required
        />
        {error ? <p className={styles.error}>{error}</p> : null}
        <Button type="submit" loading={submitting} disabled={!idInstance.trim() || !apiTokenInstance.trim()}>
          Войти
        </Button>
      </form>
    </div>
  )
}
