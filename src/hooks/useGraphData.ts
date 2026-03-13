import { useState, useEffect, useCallback } from 'react'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { InteractionRequiredAuthError } from '@azure/msal-browser'
import { LOGIN_REQUEST, GRAPH_CONFIG } from '../authConfig'

export interface GraphUser {
  displayName: string
  mail: string | null
  userPrincipalName: string
  jobTitle: string | null
  department: string | null
  officeLocation: string | null
  mobilePhone: string | null
  id: string
}

export function useGraphData() {
  const { instance, accounts } = useMsal()
  const isAuthenticated = useIsAuthenticated()
  const [user, setUser] = useState<GraphUser | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getToken = useCallback(async () => {
    const account = accounts[0]
    if (!account) throw new Error('No account')
    try {
      const result = await instance.acquireTokenSilent({
        ...LOGIN_REQUEST,
        account,
      })
      return result.accessToken
    } catch (err) {
      if (err instanceof InteractionRequiredAuthError) {
        const result = await instance.acquireTokenPopup(LOGIN_REQUEST)
        return result.accessToken
      }
      throw err
    }
  }, [instance, accounts])

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken()
      const headers = { Authorization: `Bearer ${token}` }

      const [profileRes, photoRes] = await Promise.allSettled([
        fetch(GRAPH_CONFIG.graphMeEndpoint, { headers }),
        fetch(GRAPH_CONFIG.graphPhotoEndpoint, { headers }),
      ])

      if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
        const data = await profileRes.value.json()
        setUser(data)
      }

      if (photoRes.status === 'fulfilled' && photoRes.value.ok) {
        const blob = await photoRes.value.blob()
        setPhoto(URL.createObjectURL(blob))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    if (isAuthenticated && accounts.length > 0) {
      fetchProfile()
    }
    return () => {
      if (photo) URL.revokeObjectURL(photo)
    }
  }, [isAuthenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  return { user, photo, loading, error, refetch: fetchProfile }
}
