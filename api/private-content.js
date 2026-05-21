export const config = { runtime: 'edge' }

const DAVID_EMAIL  = 'david.jung@bondsports.co'
const REPO_OWNER   = 'david-at-bond'
const REPO_NAME    = 'bond-analytics-hub-private'

async function fetchGithubFile(path) {
  const token = process.env.GITHUB_PRIVATE_CONTENT_TOKEN
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return atob(data.content.replace(/\n/g, ''))
}

async function fetchGithubDir(path) {
  const token = process.env.GITHUB_PRIVATE_CONTENT_TOKEN
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data) ? data.map(f => ({ name: f.name, path: f.path, type: f.type })) : []
}

export default async function handler(req) {
  const authHeader = req.headers.get('authorization') || ''
  const sessionJson = authHeader.replace('Bearer ', '')

  let sessionUser
  try { sessionUser = JSON.parse(atob(sessionJson)) } catch { sessionUser = null }

  if (sessionUser?.email !== DAVID_EMAIL) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
  }

  const url      = new URL(req.url)
  const filePath = url.searchParams.get('path') || 'PROGRESS.md'

  const content = await fetchGithubFile(filePath)
  if (content === null) {
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
