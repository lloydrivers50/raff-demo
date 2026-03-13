import React from 'react'
import ReactDOM from 'react-dom/client'
import { PublicClientApplication, EventType, AuthenticationResult } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { MSAL_CONFIG } from './authConfig'
import App from './App'
import './index.css'

PublicClientApplication.createPublicClientApplication(MSAL_CONFIG).then((msalInstance) => {
  // Set active account on login success
  msalInstance.addEventCallback((event) => {
    if (
      event.eventType === EventType.LOGIN_SUCCESS &&
      (event.payload as AuthenticationResult)?.account
    ) {
      msalInstance.setActiveAccount((event.payload as AuthenticationResult).account)
    }
  })

  // If there are existing accounts, set the first as active
  const accounts = msalInstance.getAllAccounts()
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0])
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </React.StrictMode>,
  )
})
