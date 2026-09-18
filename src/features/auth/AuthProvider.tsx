import { useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_API_URL } from '../../api/constants.ts'
import { getStateInstance, setSettings } from '../../api/client.ts'
import type { Credentials } from '../../domain/models.ts'
import { AuthContext } from './auth-context.ts'
import { getInstanceStateMessage } from './instance-state.ts'
import { clearCredentials, loadCredentials, saveCredentials } from './storage.ts'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [credentials, setCredentials] = useState<Credentials | null>(() => loadCredentials())

  const value = useMemo(
    () => ({
      credentials,
      async login(idInstance: string, apiTokenInstance: string) {
        const next: Credentials = {
          apiUrl: DEFAULT_API_URL,
          idInstance: idInstance.trim(),
          apiTokenInstance: apiTokenInstance.trim(),
        }

        const state = await getStateInstance(next)

        if (state.stateInstance !== 'authorized') {
          throw new Error(getInstanceStateMessage(state.stateInstance))
        }

        await setSettings(next, {
          webhookUrl: '',
          incomingWebhook: 'yes',
        }).catch(() => undefined)

        saveCredentials(next)
        setCredentials(next)
      },
      logout() {
        clearCredentials()
        setCredentials(null)
      },
    }),
    [credentials],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
