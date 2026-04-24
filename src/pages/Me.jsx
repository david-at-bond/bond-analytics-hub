import { useState, useEffect } from 'react'
import { isAdmin } from '../lib/auth.js'
import { BOND, USER_KEY } from '../lib/constants.js'
import PageHeader from '../components/content/PageHeader.jsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MD_STYLES = {
  h1: { fontSize: 20, fontWeight: 700, color: BOND.primary, marginTop: 0, marginBottom: 16 },
  h2: { fontSize: 16, fontWeight: 700, color: BOND.text, marginTop: 28, marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${BOND.border}` },
  h3: { fontSize: 14, fontWeight: 600, color: BOND.text, marginTop: 18, marginBottom: 8 },
  p:  { fontSize: 13, color: BOND.textBody, lineHeight: 1.7, marginBottom: 10 },
  li: { fontSize: 13, color: BOND.textBody, lineHeight: 1.7, marginBottom: 5 },
  code: { background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`, borderRadius: 4, padding: '1px 5px', fontSize: 12, fontFamily: 'monospace' },
  table: { borderCollapse: 'collapse', width: '100%', marginBottom: 16 },
  th: { background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`, padding: '7px 12px', fontSize: 12, fontWeight: 600, textAlign: 'left' },
  td: { border: `1px solid ${BOND.border}`, padding: '7px 12px', fontSize: 12, color: BOND.textBody },
}

function MarkdownContent({ body }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({children}) => <h1 style={MD_STYLES.h1}>{children}</h1>,
        h2: ({children}) => <h2 style={MD_STYLES.h2}>{children}</h2>,
        h3: ({children}) => <h3 style={MD_STYLES.h3}>{children}</h3>,
        p:  ({children}) => <p  style={MD_STYLES.p}>{children}</p>,
        li: ({children}) => <li style={MD_STYLES.li}>{children}</li>,
        code: ({inline, children}) => inline ? <code style={MD_STYLES.code}>{children}</code> : <pre style={{ background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`, borderRadius: 6, padding: 14, overflow: 'auto', marginBottom: 12 }}><code style={{ fontSize: 12, fontFamily: 'monospace' }}>{children}</code></pre>,
        table: ({children}) => <table style={MD_STYLES.table}>{children}</table>,
        th: ({children}) => <th style={MD_STYLES.th}>{children}</th>,
        td: ({children}) => <td style={MD_STYLES.td}>{children}</td>,
      }}
    >
      {body}
    </ReactMarkdown>
  )
}

function FileBrowser({ onSelect, currentPath }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(USER_KEY)
    const u = raw ? JSON.parse(raw) : null
    const token = btoa(JSON.stringify(u))
    fetch(`/.netlify/functions/private-content?path=`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => { setEntries(d.entries || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: '12px 20px', fontSize: 12, color: BOND.textMuted }}>Loading…</div>

  return (
    <div style={{ padding: '8px 0' }}>
      {entries.map(e => (
        <button key={e.path}
          onClick={() => e.type === 'file' && onSelect(e.path)}
          style={{
            width: '100%', textAlign: 'left', padding: '9px 20px',
            background: currentPath === e.path ? BOND.surfaceSubtle : 'transparent',
            border: 'none',
            borderLeft: currentPath === e.path ? `3px solid ${BOND.primary}` : '3px solid transparent',
            cursor: e.type === 'file' ? 'pointer' : 'default',
            fontSize: 13, color: e.type === 'file' ? BOND.textBody : BOND.textMuted,
            fontWeight: currentPath === e.path ? 600 : 400,
          }}
        >
          {e.type === 'dir' ? '📁 ' : '📄 '}{e.name}
        </button>
      ))}
    </div>
  )
}

function MeContent({ auth }) {
  const { user } = auth
  const [selectedPath, setSelectedPath] = useState('PROGRESS.md')
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!selectedPath) return
    setLoading(true)
    setError(null)
    const raw = localStorage.getItem(USER_KEY)
    const u = raw ? JSON.parse(raw) : null
    const token = btoa(JSON.stringify(u))
    fetch(`/.netlify/functions/private-content?path=${encodeURIComponent(selectedPath)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => { setContent(d.content || null); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [selectedPath])

  return (
    <div>
      <PageHeader title="Private" subtitle="Session notes, memory files, and personal workspace." />
      <div style={{ display: 'flex', height: 'calc(100vh - 121px)' }}>
        <div style={{
          width: 220, flexShrink: 0,
          borderRight: `1px solid ${BOND.border}`,
          overflowY: 'auto', background: BOND.surface,
        }}>
          <div style={{ padding: '12px 20px', borderBottom: `1px solid ${BOND.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Private Repo
            </span>
          </div>
          <FileBrowser onSelect={setSelectedPath} currentPath={selectedPath} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', background: BOND.surface }}>
          {loading && <p style={{ color: BOND.textMuted, fontSize: 13 }}>Loading…</p>}
          {error  && <p style={{ color: '#A32D2D', fontSize: 13 }}>Error: {error}</p>}
          {!loading && !error && content && <MarkdownContent body={content} />}
          {!loading && !error && !content && (
            <p style={{ color: BOND.textMuted, fontSize: 13 }}>Select a file to view it.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Me({ auth }) {
  const { user } = auth

  if (!isAdmin(user)) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
        <p style={{ fontSize: 15, color: BOND.textMuted }}>This section is private.</p>
      </div>
    )
  }

  return <MeContent auth={auth} />
}
