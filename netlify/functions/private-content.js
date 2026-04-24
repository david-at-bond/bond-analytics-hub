const DAVID_EMAIL  = 'david.jung@bondsports.co'
const REPO_OWNER   = 'david-at-bond'
const REPO_NAME    = 'bond-analytics-hub-private'
const GITHUB_TOKEN = process.env.GITHUB_PRIVATE_CONTENT_TOKEN

async function fetchGithubFile(path) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) return null
  const data = await res.json()
  // GitHub returns base64-encoded content
  return Buffer.from(data.content, 'base64').toString('utf8')
}

async function fetchGithubDir(path) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    { headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data) ? data.map(f => ({ name: f.name, path: f.path, type: f.type })) : []
}

export default async (req) => {
  // Verify the session user from the Authorization header
  const authHeader = req.headers.get('authorization') || ''
  const sessionJson = authHeader.replace('Bearer ', '')

  let sessionUser
  try { sessionUser = JSON.parse(atob(sessionJson)) } catch { sessionUser = null }

  if (sessionUser?.email !== DAVID_EMAIL) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
  }

  const url    = new URL(req.url)
  const filePath = url.searchParams.get('path') || 'PROGRESS.md'

  const content = await fetchGithubFile(filePath)
  if (content === null) {
    // Try listing the directory
    const entries = await fetchGithubDir(filePath)
    if (entries.length) {
      return new Response(JSON.stringify({ type: 'dir', entries }), {
        status: 200, headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
  }

  return new Response(JSON.stringify({ type: 'file', content }), {
    status: 200, headers: { 'Content-Type': 'application/json' },
  })
}

export const config = { path: '/api/private-content' }
