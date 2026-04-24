import { Link } from 'react-router-dom'
import { canSee } from '../lib/auth.js'
import { BOND } from '../lib/constants.js'
import PageHeader from '../components/content/PageHeader.jsx'
import Pill from '../components/content/Pill.jsx'
import DraftBadge from '../components/content/DraftBadge.jsx'
import { changelog } from '../content/changelog.js'
import { reports } from '../content/reports/index.js'
import { tools } from '../content/tools.js'
import { ExternalLinkIcon } from '../components/layout/Icons.jsx'

const QUICK_TOOLS = ['triage', 'sigma-admin', 'sigma', 'roadmap']

export default function Overview({ auth }) {
  const { user, viewAsPublic } = auth
  const visibleChangelog = changelog.filter(e => canSee(e, user, viewAsPublic)).slice(0, 5)
  const quickTools = tools.filter(t => QUICK_TOOLS.includes(t.id))

  return (
    <div>
      <PageHeader
        title="Bond Data & Analytics"
        subtitle="Internal portal for the analytics team — tools, reports, PRDs, and team resources."
      />

      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'Active Projects', value: 3 },
            { label: 'Live Reports',    value: reports.filter(r => r.status === 'Live').length },
            { label: 'PRDs in Build',   value: reports.filter(r => r.status === 'In build').length },
            { label: 'Team Members',    value: 2 },
          ].map(stat => (
            <div key={stat.label} style={{
              flex: 1, background: BOND.surface, border: `1px solid ${BOND.border}`,
              borderRadius: 10, padding: '16px 20px',
            }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: BOND.primary, fontVariantNumeric: 'tabular-nums' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: BOND.textMuted, marginTop: 4, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main two-col layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>

          {/* Recent activity */}
          <div style={{ background: BOND.surface, border: `1px solid ${BOND.border}`, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BOND.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: BOND.text }}>Recent Activity</span>
              <Link to="/changelog" style={{ fontSize: 12, color: BOND.primary, textDecoration: 'none' }}>View all →</Link>
            </div>
            {visibleChangelog.map((entry, i) => (
              <div key={i} style={{
                padding: '14px 20px',
                borderBottom: i < visibleChangelog.length - 1 ? `1px solid ${BOND.border}` : 'none',
                display: 'flex', gap: 14,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: BOND.gold, flexShrink: 0, marginTop: 6,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: BOND.text }}>{entry.title}</span>
                    {!entry.published && <DraftBadge />}
                  </div>
                  <div style={{ fontSize: 12, color: BOND.textBody, lineHeight: 1.5 }}>{entry.description}</div>
                  <div style={{ fontSize: 11, color: BOND.textMuted, marginTop: 4 }}>
                    {entry.project} · {entry.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick access */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: BOND.surface, border: `1px solid ${BOND.border}`, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BOND.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: BOND.text }}>Quick Access</span>
              </div>
              <div style={{ padding: '8px 0' }}>
                {quickTools.map(tool => (
                  <a key={tool.id} href={tool.url} target="_blank" rel="noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 20px', textDecoration: 'none',
                      color: BOND.textBody, fontSize: 13,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = BOND.surfaceSubtle}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontWeight: 500 }}>{tool.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: BOND.textMuted }}>
                      <span style={{ fontSize: 11 }}>{tool.host}</span>
                      <ExternalLinkIcon />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Active reports */}
            <div style={{ background: BOND.surface, border: `1px solid ${BOND.border}`, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: `1px solid ${BOND.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: BOND.text }}>Reports</span>
                <Link to="/reports" style={{ fontSize: 12, color: BOND.primary, textDecoration: 'none' }}>All →</Link>
              </div>
              <div style={{ padding: '8px 0' }}>
                {reports.filter(r => canSee(r, user, viewAsPublic)).map(r => (
                  <div key={r.slug} style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: BOND.textBody, fontWeight: 500 }}>{r.title}</span>
                    <Pill label={r.status} size="xs" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
