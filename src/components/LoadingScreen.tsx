export function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      color: '#94a3b8',
    }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#0078d4" />
        <path d="M10 24L24 10L38 24L24 38L10 24Z" fill="white" opacity="0.9" />
        <path d="M18 24L24 18L30 24L24 30L18 24Z" fill="#0078d4" />
      </svg>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid rgba(0, 120, 212, 0.2)',
        borderTopColor: '#0078d4',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ margin: 0, fontSize: '14px' }}>Initializing...</p>
    </div>
  )
}
