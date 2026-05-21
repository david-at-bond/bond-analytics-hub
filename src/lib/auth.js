import { useState, useEffect, useCallback } from 'react'
import { USER_KEY, SESSION_TTL, BOND_DOMAIN, DAVID_EMAIL, PREVIEW_KEY } from './constants.js'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

function readUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    const u = JSON.parse(raw)
    if (!u?.email?.endsWith('@' + BOND_DOMAIN)) return null
    if (Date.now() - (u.signedInAt || 0) > SESSION_TTL) {
      localStorage.removeItem(USER_KEY)
      return null
    }
    return u
  } catch { return null }
}

export function useAuth() {
  const [user, setUser]               = useState(readUser)
  const [viewAsPublic, setViewAsPublic] = useState(
    () => sessionStorage.getItem(PREVIEW_KEY) === 'true'
  )

  const signIn = useCallback(() => {
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    url.searchParams.set('client_id', GOOGLE_CLIENT_ID)
    url.searchParams.set('redirect_uri', window.location.origin)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('scope', 'openid email profile')
    url.searchParams.set('access_type', 'online')
    window.location.href = url.toString()
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(PREVIEW_KEY)
    setUser(null)
    setViewAsPublic(false)
  }, [])

  const togglePreview = useCallback(() => {
    setViewAsPublic(prev => {
      const next = !prev
      sessionStorage.setItem(PREVIEW_KEY, String(next))
      return next
    })
  }, [])

  // Handle Google OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (!code) return
    window.history.replaceState({}, '', '/')
    ;(async () => {
      try {
        const res = await fetch('/api/auth-exchange', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, redirectUri: window.location.origin }),
        })
        const data = await res.json()
        if (data.email?.endsWith('@' + BOND_DOMAIN)) {
          const u = { ...data, signedInAt: Date.now() }
          localStorage.setItem(USER_KEY, JSON.stringify(u))
          setUser(u)
          const returnTo = localStorage.getItem('bah_returnTo')
          if (returnTo) { localStorage.removeItem('bah_returnTo'); window.location.replace(returnTo) }
        }
      } catch (e) {
        console.error('Auth exchange failed:', e.message)
      }
    })()
  }, [])

  return { user, signIn, signOut, viewAsPublic, togglePreview }
}

export const isAdmin      = user => user?.email === DAVID_EMAIL
export const canSee       = (item, user, viewAsPublic) =>
  item.published || (isAdmin(user) && !viewAsPublic)
