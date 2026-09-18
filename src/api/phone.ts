const RUSSIA_LENGTH = 11
const BELARUS_LENGTH = 12

export function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, '')

  if (!digits) {
    return null
  }

  if (digits.length === 10) {
    return `7${digits}`
  }

  if (digits.length === RUSSIA_LENGTH && digits.startsWith('8')) {
    return `7${digits.slice(1)}`
  }

  if (digits.length === RUSSIA_LENGTH && digits.startsWith('7')) {
    return digits
  }

  if (digits.length === BELARUS_LENGTH && digits.startsWith('375')) {
    return digits
  }

  return null
}

export function formatPhone(phone: string): string {
  if (phone.startsWith('7') && phone.length === RUSSIA_LENGTH) {
    return `+7 ${phone.slice(1, 4)} ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`
  }

  if (phone.startsWith('375') && phone.length === BELARUS_LENGTH) {
    return `+375 ${phone.slice(3, 5)} ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10)}`
  }

  return phone
}
