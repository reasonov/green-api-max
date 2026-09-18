import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './IconButton.module.css'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}

export function IconButton({ label, children, className, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      className={[styles.button, className].filter(Boolean).join(' ')}
      aria-label={label}
      title={label}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
