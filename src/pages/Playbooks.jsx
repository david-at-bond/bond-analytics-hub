import { useState } from 'react'
import { canSee } from '../lib/auth.js'
import { BOND } from '../lib/constants.js'
import PageHeader from '../components/content/PageHeader.jsx'
import EmptyState from '../components/content/EmptyState.jsx'
import { playbooks } from '../content/playbooks/index.js'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MD_STYLES = {
  h2: { fontSize: 16, fontWeight: 700, color: BOND.primary, marginTop: 24, marginBottom: 10 },
  h3: { fontSize: 14, fontWeight: 600, color: BOND.text, marginTop: 18, marginBottom: 8 },
  p:  { fontSize: 14, color: BOND.textBody, lineHeight: 1.7, marginBottom: 12 },
  li: { fontSize: 14, color: BOND.textBody, lineHeight: 1.7, marginBottom: 6 },
  a:  { color: BOND.primary },
  table: { borderCollapse: 'collapse', width: '100%', marginBottom: 16 },
  th: { background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`, padding: '8px 12px', fontSize: 12, fontWeight: 600, textAlign: 'left' },
  td: { border: `1px solid ${BOND.border}`, padding: '8px 12px', fontSize: 13, color: BOND.textBody },
}

function MarkdownContent({ body }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({children}) => <h2 style={MD_STYLES.h2}>{children}</h2>,
        h3: ({children}) => <h3 style={MD_STYLES.h3}>{children}</h3>,
        p:  ({children}) => <p  style={MD_STYLES.p}>{children}</p>,
        li: ({children}) => <li style={MD_STYLES.li}>{children}</li>,
        a:  ({href, children}) => <a href={href} target="_blank" rel="noreferrer" style={MD_STYLES.a}>{children}</a>,
        table: ({children}) => <table style={MD_STYLES.table}>{children}</table>,
        th: ({children}) => <th style={MD_STYLES.th}>{children}</th>,
        td: ({children}) => <td style={MD_STYLES.td}>{children}</td>,
      }}
    >
      {body}
    </ReactMarkdown>
  )
}

export default function Playbooks({ auth }) {
  const { user, viewAsPublic } = auth
  const [selected, setSelected] = useState(null)
  const visible = playbooks.filter(p => canSee(p, user, viewAsPublic))
  const active = visible.find(p => p.slug === selected) || visible[0] || null

  return (
    <div>
      <PageHeader title="Playbooks" subtitle="How-to guides, processes, and reference docs for the data team." />
      {!visible.length
        ? <EmptyState icon="📚" title="No playbooks yet" body="Guides and how-to docs will appear here." />
        : (
          <div style={{ display: 'flex', height: 'calc(100vh - 121px)' }}>
            {/* Sidebar list */}
            <div style={{
              width: 260, flexShrink: 0,
              borderRight: `1px solid ${BOND.border}`,
              overflowY: 'auto', background: BOND.surface,
            }}>
              {visible.map(pb => (
                <button key={pb.slug}
                  onClick={() => setSelected(pb.slug)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '14px 20px',
                    background: active?.slug === pb.slug ? BOND.surfaceSubtle : 'transparent',
                    border: 'none',
                    borderLeft: active?.slug === pb.slug ? `3px solid ${BOND.primary}` : '3px solid transparent',
                    cursor: 'pointer',
                    borderBottom: `1px solid ${BOND.border}`,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: BOND.text, marginBottom: 4 }}>{pb.title}</div>
                  <div style={{ fontSize: 12, color: BOND.textMuted }}>Updated {pb.updatedAt}</div>
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', background: BOND.surface }}>
              {active && (
                <>
                  <h1 style={{ fontSize: 20, fontWeight: 700, color: BOND.primary, marginBottom: 20 }}>
                    {active.title}
                  </h1>
                  <MarkdownContent body={active.body} />
                </>
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}
