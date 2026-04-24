import { canSee } from '../lib/auth.js'
import { BOND } from '../lib/constants.js'
import PageHeader from '../components/content/PageHeader.jsx'
import Pill from '../components/content/Pill.jsx'
import DraftBadge from '../components/content/DraftBadge.jsx'
import EmptyState from '../components/content/EmptyState.jsx'
import { prds } from '../content/prds/index.js'

export default function Prds({ auth }) {
  const { user, viewAsPublic } = auth
  const visible = prds.filter(p => canSee(p, user, viewAsPublic))

  return (
    <div>
      <PageHeader title="PRDs & Designs" subtitle="Product requirement documents and interactive Sigma mocks." />
      <div style={{ padding: '24px 32px' }}>
        {!visible.length
          ? <EmptyState icon="📋" title="No PRDs yet" body="PRDs will appear here as they're written." />
          : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
              {visible.map(prd => (
                <div key={prd.slug} style={{
                  background: BOND.surface, border: `1px solid ${BOND.border}`,
                  borderRadius: 10, padding: '20px 22px',
                  display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: BOND.primary }}>{prd.title}</span>
                      <Pill label={prd.status} />
                      {!prd.published && <DraftBadge />}
                    </div>
                    <p style={{ fontSize: 13, color: BOND.textBody, lineHeight: 1.6 }}>{prd.summary}</p>
                  </div>
                  <div style={{ fontSize: 11, color: BOND.textMuted }}>
                    Updated {prd.updatedAt} · {prd.author?.split('@')[0]}
                  </div>
                  <div style={{ display: 'flex', gap: 8, paddingTop: 4, borderTop: `1px solid ${BOND.border}` }}>
                    {prd.prdUrl && (
                      <a href={prd.prdUrl} target="_blank" rel="noreferrer"
                        style={{
                          flex: 1, textAlign: 'center',
                          padding: '8px 12px', borderRadius: 6,
                          background: BOND.primary, color: '#fff',
                          fontSize: 12, fontWeight: 600, textDecoration: 'none',
                        }}
                      >
                        📄 PRD Document
                      </a>
                    )}
                    {prd.mockUrl && (
                      <a href={prd.mockUrl} target="_blank" rel="noreferrer"
                        style={{
                          flex: 1, textAlign: 'center',
                          padding: '8px 12px', borderRadius: 6,
                          background: BOND.gold, color: BOND.navy,
                          fontSize: 12, fontWeight: 600, textDecoration: 'none',
                        }}
                      >
                        🖥 Interactive Mock
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
