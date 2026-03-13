import { useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { LOGIN_REQUEST } from '../authConfig'
import './LoginPage.css'

export function LoginPage() {
  const { instance } = useMsal()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      await instance.loginPopup(LOGIN_REQUEST)
    } catch (err) {
      if (err instanceof Error && err.message.includes('user_cancelled')) {
        // user closed popup — no-op
      } else {
        setError(err instanceof Error ? err.message : 'Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-root">
      <div className="login-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="login-card">
        <div className="login-logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="#0078d4" />
            <path d="M10 24L24 10L38 24L24 38L10 24Z" fill="white" opacity="0.9" />
            <path d="M18 24L24 18L30 24L24 30L18 24Z" fill="#0078d4" />
          </svg>
        </div>

        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Sign in with your Microsoft account to continue
        </p>

        {error && (
          <div className="login-error">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 4h1.5v4.5h-1.5V5zm0 6h1.5v1.5h-1.5V11z"/>
            </svg>
            {error}
          </div>
        )}

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <span className="login-spinner" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.5 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5zM1.25 12a10.25 10.25 0 1 1 20.5 0 10.25 10.25 0 0 1-20.5 0z"/>
              <path d="M11.5 7.25a.75.75 0 0 1 .75.75v3.69l2.72 2.72a.75.75 0 1 1-1.06 1.06l-3-3A.75.75 0 0 1 10.75 12V8a.75.75 0 0 1 .75-.75z" opacity="0"/>
            </svg>
          )}
          {loading ? 'Signing in...' : 'Sign in with Microsoft'}
        </button>

        <div className="login-divider">
          <span>Secured by Azure Entra ID</span>
        </div>

        <div className="login-badges">
          <span className="badge">🔐 SSO</span>
          <span className="badge">🛡️ MFA Ready</span>
          <span className="badge">📱 PWA</span>
        </div>
      </div>
    </div>
  )
}
