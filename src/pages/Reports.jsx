import { canSee } from '../lib/auth.js'
import { BOND } from '../lib/constants.js'
import PageHeader from '../components/content/PageHeader.jsx'
import Pill from '../components/content/Pill.jsx'
import DraftBadge from '../components/content/DraftBadge.jsx'
import EmptyState from '../components/content/EmptyState.jsx'
import { reports } from '../content/reports/index.js'
import { ExternalLinkIcon } from '../components/layout/Icons.jsx'

export default function Reports({ auth }) {
  const { user, viewAsPublic } = auth
  const visible = reports.filter(r => canSee(r, user, viewAsPublic))

  return (
    <div>
      <PageHeader title="Reports" subtitle="Sigma reports and dashboards maintained by the Data & Analytics team." />
      <div style={{ padding: '24px 32px' }}>
        {!visible.length
          ? <EmptyState icon="📊" title="No reports yet" body="Reports will appear here as they're built and published." />
          : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {visible.map(report => (
                <div key={report.slug} style={{
                  background: BOND.surface, border: `1px solid ${BOND.border}`,
                  borderRadius: 10, padding: '20px 22px',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: BOND.primary }}>{report.title}</span>
                      <Pill label={report.status} />
                      {!report.published && <DraftBadge />}
                    </div>
                    <p style={{ fontSize: 13, color: BOND.textBody, lineHeight: 1.6, marginBottom: 8 }}>{report.summary}</p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      {report.tags?.map(tag => (
                        <span key={tag} style={{
                          fontSize: 11, color: BOND.textMuted,
                          background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`,
                          borderRadius: 20, padding: '2px 8px',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    {report.sigmaUrl && (
                      <a href={report.sigmaUrl} target="_blank" rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          background: BOND.primary, color: '#fff',
                          padding: '8px 16px', borderRadius: 6,
                          fontSize: 12, fontWeight: 600, textDecoration: 'none',
                        }}
                      >
                        Open in Sigma <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  )
}
