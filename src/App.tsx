import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import { LoginPage } from './components/LoginPage'
import { Dashboard } from './components/Dashboard'
import { LoadingScreen } from './components/LoadingScreen'

export default function App() {
  const isAuthenticated = useIsAuthenticated()
  const { inProgress } = useMsal()

  if (inProgress !== InteractionStatus.None) {
    return <LoadingScreen />
  }

  return isAuthenticated ? <Dashboard /> : <LoginPage />
}
