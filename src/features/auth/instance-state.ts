import type { InstanceState } from '../../api/types.ts'

const MESSAGES: Record<InstanceState, string> = {
  authorized: 'Инстанс авторизован',
  notAuthorized: 'Инстанс не авторизован. Отсканируйте QR-код в личном кабинете GREEN-API.',
  blocked: 'Аккаунт MAX заблокирован.',
  starting: 'Инстанс запускается. Подождите пару минут и попробуйте снова.',
  suspended: 'На аккаунте временные ограничения на отправку.',
  pendingPassword: 'Нужно подтвердить пароль двухфакторной аутентификации.',
}

export function getInstanceStateMessage(state: InstanceState): string {
  return MESSAGES[state]
}
