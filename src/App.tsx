import { AuthProvider } from './features/auth/AuthProvider.tsx'
import { useAuth } from './features/auth/auth-context.ts'
import { LoginPage } from './features/auth/LoginPage.tsx'
import { ChatProvider } from './features/chats/ChatProvider.tsx'
import { AppShell } from './app/AppShell.tsx'

function Root() {
  const { credentials } = useAuth()

  if (!credentials) {
    return <LoginPage />
  }

  return (
    <ChatProvider credentials={credentials}>
      <AppShell />
    </ChatProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  )
}
