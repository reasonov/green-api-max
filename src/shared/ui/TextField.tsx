import type { InputHTMLAttributes } from 'react'
import styles from './TextField.module.css'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function TextField({ label, error, id, className, ...props }: TextFieldProps) {
  const fieldId = id ?? props.name

  return (
    <label className={[styles.field, className].filter(Boolean).join(' ')} htmlFor={fieldId}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} id={fieldId} {...props} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  )
}
