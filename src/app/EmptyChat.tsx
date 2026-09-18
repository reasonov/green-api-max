import { LogoIcon } from '../shared/icons.tsx'
import styles from './EmptyChat.module.css'

export function EmptyChat() {
  return (
    <div className={styles.empty}>
      <LogoIcon width={56} height={56} />
      <h2>Выберите чат</h2>
      <p>Создайте новый чат по номеру телефона или дождитесь входящего сообщения</p>
    </div>
  )
}
