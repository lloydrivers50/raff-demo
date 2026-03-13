import { useState } from 'react'
import { useMsal, useAccount } from '@azure/msal-react'
import { useGraphData } from '../hooks/useGraphData'
import './Dashboard.css'

export function Dashboard() {
  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0] ?? null)
  const { user, photo, loading, error, refetch } = useGraphData()
  const [signingOut, setSigningOut] = useState(false)

  const handleLogout = async () => {
    setSigningOut(true)
    await instance.logoutPopup({
      postLogoutRedirectUri: window.location.origin,
    })
  }

  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : account?.name?.slice(0, 2).toUpperCase() ?? '??'

  return (
    <div className="dash-root">
      <div className="dash-bg">
        <div className="dash-orb dash-orb-1" />
        <div className="dash-orb dash-orb-2" />
      </div>

      {/* Header */}
      <header className="dash-header">
        <div className="dash-header-inner">
          <div className="dash-brand">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill="#0078d4" />
              <path d="M10 24L24 10L38 24L24 38L10 24Z" fill="white" opacity="0.9" />
              <path d="M18 24L24 18L30 24L24 30L18 24Z" fill="#0078d4" />
            </svg>
            <span className="dash-brand-name">RaffApp</span>
          </div>

          <div className="dash-header-actions">
            <span className="dash-online-pill">
              <span className="dash-online-dot" />
              Connected
            </span>
            <button
              className="dash-logout-btn"
              onClick={handleLogout}
              disabled={signingOut}
            >
              {signingOut ? (
                <span className="dash-spinner" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              )}
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="dash-main">
        {/* Profile Card */}
        <div className="dash-profile-card">
          <div className="dash-avatar-wrap">
            {photo ? (
              <img src={photo} alt="Profile" className="dash-avatar-img" />
            ) : (
              <div className="dash-avatar-placeholder">{initials}</div>
            )}
            <div className="dash-avatar-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
              </svg>
            </div>
          </div>

          {loading ? (
            <div className="dash-profile-loading">
              <div className="dash-skeleton dash-skeleton-name" />
              <div className="dash-skeleton dash-skeleton-email" />
            </div>
          ) : (
            <div className="dash-profile-info">
              <h2 className="dash-profile-name">
                {user?.displayName ?? account?.name ?? 'User'}
              </h2>
              <p className="dash-profile-email">
                {user?.mail ?? user?.userPrincipalName ?? account?.username}
              </p>
              {user?.jobTitle && (
                <span className="dash-profile-role">{user.jobTitle}</span>
              )}
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="dash-stats">
          <div className="dash-stat-card">
            <div className="dash-stat-icon dash-stat-icon-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <div className="dash-stat-value">Authenticated</div>
              <div className="dash-stat-label">Entra ID Session</div>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-icon dash-stat-icon-purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
            <div>
              <div className="dash-stat-value">Secure</div>
              <div className="dash-stat-label">OAuth 2.0 / OIDC</div>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-icon dash-stat-icon-green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
              </svg>
            </div>
            <div>
              <div className="dash-stat-value">Capacitor</div>
              <div className="dash-stat-label">Native Wrapper</div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        {error ? (
          <div className="dash-error-card">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <div>
              <strong>Graph API Error</strong>
              <p>{error}</p>
            </div>
            <button className="dash-retry-btn" onClick={refetch}>Retry</button>
          </div>
        ) : (
          <div className="dash-details-card">
            <h3 className="dash-details-title">Profile Details</h3>
            <div className="dash-details-grid">
              <DetailRow label="Display Name" value={user?.displayName} loading={loading} />
              <DetailRow label="Email" value={user?.mail ?? user?.userPrincipalName} loading={loading} />
              <DetailRow label="Department" value={user?.department} loading={loading} />
              <DetailRow label="Location" value={user?.officeLocation} loading={loading} />
              <DetailRow label="Mobile" value={user?.mobilePhone} loading={loading} />
              <DetailRow label="User ID" value={user?.id ? `${user.id.slice(0, 8)}...` : undefined} loading={loading} />
            </div>
          </div>
        )}

        {/* Token Info */}
        <div className="dash-token-card">
          <div className="dash-token-header">
            <h3>Active Session</h3>
            <span className="dash-token-pill">JWT</span>
          </div>
          <div className="dash-token-row">
            <span className="dash-token-label">Account</span>
            <span className="dash-token-value">{account?.username ?? '–'}</span>
          </div>
          <div className="dash-token-row">
            <span className="dash-token-label">Tenant</span>
            <span className="dash-token-value">{account?.tenantId?.slice(0, 8)}...</span>
          </div>
          <div className="dash-token-row">
            <span className="dash-token-label">Auth Type</span>
            <span className="dash-token-value">MSAL + Popup</span>
          </div>
        </div>
      </main>
    </div>
  )
}

function DetailRow({ label, value, loading }: { label: string; value?: string | null; loading: boolean }) {
  return (
    <div className="dash-detail-row">
      <span className="dash-detail-label">{label}</span>
      {loading ? (
        <div className="dash-skeleton dash-skeleton-value" />
      ) : (
        <span className="dash-detail-value">{value ?? <em className="dash-detail-empty">—</em>}</span>
      )}
    </div>
  )
}
