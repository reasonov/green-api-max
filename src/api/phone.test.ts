import { describe, expect, it } from 'vitest'
import { formatPhone, normalizePhone } from './phone.ts'

describe('normalizePhone', () => {
  it('нормализует российский номер с 8 и разделителями', () => {
    expect(normalizePhone('8 (999) 123-45-67')).toBe('79991234567')
  })

  it('нормализует номер с +7', () => {
    expect(normalizePhone('+7 999 123 45 67')).toBe('79991234567')
  })

  it('принимает 10 цифр как российский номер', () => {
    expect(normalizePhone('9991234567')).toBe('79991234567')
  })

  it('принимает номер Беларуси', () => {
    expect(normalizePhone('+375 29 123-45-67')).toBe('375291234567')
  })

  it('возвращает null для некорректного номера', () => {
    expect(normalizePhone('12345')).toBeNull()
    expect(normalizePhone('')).toBeNull()
    expect(normalizePhone('abc')).toBeNull()
  })
})

describe('formatPhone', () => {
  it('форматирует российский номер', () => {
    expect(formatPhone('79991234567')).toBe('+7 999 123-45-67')
  })

  it('форматирует номер Беларуси', () => {
    expect(formatPhone('375291234567')).toBe('+375 29 123-45-67')
  })
})
