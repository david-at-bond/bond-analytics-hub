import { useState } from 'react'
import { canSee } from '../lib/auth.js'
import { BOND } from '../lib/constants.js'
import PageHeader from '../components/content/PageHeader.jsx'
import DraftBadge from '../components/content/DraftBadge.jsx'
import { changelog } from '../content/changelog.js'

const FILTERS = [
  { key: 'all',   label: 'All time',     since: null         },
  { key: 'mar',   label: 'Since March',  since: '2026-03-01' },
  { key: 'apr',   label: 'Since April',  since: '2026-04-01' },
  { key: 'may',   label: 'Since May',    since: '2026-05-01' },
]

function groupByMonth(entries) {
  const groups = {}
  entries.forEach(e => {
    const [year, month] = e.date.split('-')
    const key = new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    if (!groups[key]) groups[key] = []
    groups[key].push(e)
  })
  return Object.entries(groups)
}

export default function Changelog({ auth }) {
  const { user, viewAsPublic } = auth
  const [filterKey, setFilterKey] = useState('mar')
  const filter = FILTERS.find(f => f.key === filterKey)

  const visible = changelog
    .filter(e => canSee(e, user, viewAsPublic))
    .filter(e => !filter.since || e.date >= filter.since)
  const grouped = groupByMonth(visible)

  return (
    <div>
      <PageHeader title="Changelog" subtitle="A running log of what the Data & Analytics team has shipped." />
      <div style={{ padding: '24px 32px', maxWidth: 820 }}>
        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {FILTERS.map(f => {
            const active = f.key === filterKey
            return (
              <button key={f.key} onClick={() => setFilterKey(f.key)}
                style={{
                  fontSize: 12, fontWeight: 600,
                  padding: '6px 14px', borderRadius: 20,
                  border: `1px solid ${active ? BOND.primary : BOND.border}`,
                  background: active ? BOND.primary : BOND.surface,
                  color: active ? '#fff' : BOND.textBody,
                  cursor: 'pointer',
                  transition: 'background 0.12s, color 0.12s, border-color 0.12s',
                }}
              >
                {f.label}
              </button>
            )
          })}
          <span style={{ fontSize: 12, color: BOND.textMuted, marginLeft: 'auto', alignSelf: 'center' }}>
            {visible.length} {visible.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {grouped.length === 0 ? (
          <p style={{ fontSize: 13, color: BOND.textMuted }}>No entries in this window.</p>
        ) : grouped.map(([month, entries]) => (
          <div key={month} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
              {month}
            </h2>
            <div style={{ borderLeft: `2px solid ${BOND.border}`, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {entries.map((entry, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: -31, top: 4,
                    width: 10, height: 10, borderRadius: '50%',
                    background: BOND.gold, border: `2px solid ${BOND.surface}`,
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: BOND.text }}>{entry.title}</span>
                    {!entry.published && <DraftBadge />}
                  </div>
                  <p style={{ fontSize: 13, color: BOND.textBody, lineHeight: 1.6, marginBottom: 6 }}>{entry.description}</p>
                  <div style={{ display: 'flex', gap: 10, fontSize: 11, color: BOND.textMuted }}>
                    <span>{entry.project}</span>
                    <span>·</span>
                    <span>{entry.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
