import PageHeader from '../components/content/PageHeader.jsx'
import { BOND } from '../lib/constants.js'
import { tools, TOOL_CATEGORIES } from '../content/tools.js'
import { ExternalLinkIcon } from '../components/layout/Icons.jsx'

const CATEGORY_ICONS = {
  'Internal Apps':      '🛠',
  'BI & Reporting':     '📊',
  'Data Warehouse':     '🗄',
  'Project Management': '📋',
}

function ToolCard({ tool }) {
  return (
    <a href={tool.url} target="_blank" rel="noreferrer"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#CBD5E0' }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = BOND.border }}
        style={{
          background: BOND.surface, border: `1px solid ${BOND.border}`,
          borderRadius: 10, padding: '18px 20px',
          transition: 'box-shadow 0.15s, border-color 0.15s',
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: BOND.primary }}>{tool.name}</div>
          <div style={{ color: BOND.textMuted, marginTop: 2 }}><ExternalLinkIcon /></div>
        </div>
        <p style={{ fontSize: 13, color: BOND.textBody, lineHeight: 1.6, marginBottom: 12 }}>
          {tool.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontSize: 11, fontWeight: 600,
            background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`,
            borderRadius: 20, padding: '2px 8px', color: BOND.textMuted,
          }}>
            {tool.host}
          </span>
        </div>
      </div>
    </a>
  )
}

export default function Tools() {
  return (
    <div>
      <PageHeader
        title="Tools"
        subtitle="All tools and apps used by the Bond Data & Analytics team."
      />
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
        {TOOL_CATEGORIES.map(category => {
          const catTools = tools.filter(t => t.category === category)
          if (!catTools.length) return null
          return (
            <div key={category}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 16 }}>{CATEGORY_ICONS[category]}</span>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: BOND.text }}>{category}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                {catTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
