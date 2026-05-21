export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const { code, redirectUri } = await req.json()
  if (!code || !redirectUri) {
    return new Response(JSON.stringify({ error: 'Missing code or redirectUri' }), { status: 400 })
  }

  const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri:  redirectUri,
      grant_type:    'authorization_code',
    }),
  })

  if (!tokenRes.ok) {
    const err = await tokenRes.text()
    console.error('Token exchange failed:', err)
    return new Response(JSON.stringify({ error: 'Token exchange failed', detail: err }), { status: 400 })
  }

  const { access_token } = await tokenRes.json()

  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
  })

  if (!userRes.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch user info' }), { status: 400 })
  }

  const { email, name, picture } = await userRes.json()

  if (!email?.endsWith('@bondsports.co')) {
    return new Response(JSON.stringify({ error: 'Access restricted to @bondsports.co accounts' }), { status: 403 })
  }

  return new Response(JSON.stringify({ email, name, picture }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
