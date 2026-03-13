import { Configuration, LogLevel, BrowserCacheLocation } from '@azure/msal-browser'

/**
 * Azure Entra ID Configuration
 * Replace these values with your actual Azure App Registration details.
 *
 * Quick setup:
 *  1. Go to portal.azure.com → Azure Active Directory → App registrations → New registration
 *  2. Set redirect URI to: http://localhost:3000 (SPA type)
 *  3. Copy the Application (client) ID and Directory (tenant) ID below
 */
export const MSAL_CONFIG: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || 'YOUR_CLIENT_ID_HERE',
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID || 'common'}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI || window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return
        if (import.meta.env.DEV) {
          switch (level) {
            case LogLevel.Error: console.error(message); break
            case LogLevel.Warning: console.warn(message); break
            case LogLevel.Info: console.info(message); break
            case LogLevel.Verbose: console.debug(message); break
          }
        }
      },
    },
  },
}

export const LOGIN_REQUEST = {
  scopes: ['openid', 'profile', 'email', 'User.Read'],
}

export const GRAPH_CONFIG = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphPhotoEndpoint: 'https://graph.microsoft.com/v1.0/me/photo/$value',
}
