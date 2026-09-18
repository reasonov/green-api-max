import { createContext, useContext } from 'react'
import type { Credentials } from '../../domain/models.ts'

export type AuthContextValue = {
  credentials: Credentials | null
  login: (idInstance: string, apiTokenInstance: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)

  if (!value) {
    throw new Error('useAuth должен вызываться внутри AuthProvider')
  }

  return value
}
