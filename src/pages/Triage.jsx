import PageHeader from '../components/content/PageHeader.jsx'
import { BOND } from '../lib/constants.js'
import { ExternalLinkIcon } from '../components/layout/Icons.jsx'

const APP_URL = 'https://fantastic-praline-b55509.netlify.app'

export default function Triage() {
  return (
    <div>
      <PageHeader
        title="Reporting Triage"
        subtitle="AI-powered triage of inbound data issues from customer success."
      />
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 820 }}>

        {/* CTA */}
        <div style={{
          background: BOND.navy, borderRadius: 12,
          padding: '28px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Open Reporting Triage</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              Sign in with your @bondsports.co Google account to access the dashboard.
            </div>
          </div>
          <a href={APP_URL} target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: BOND.gold, color: BOND.navy,
              padding: '11px 22px', borderRadius: 8,
              fontWeight: 700, fontSize: 13, textDecoration: 'none',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
          >
            Launch app <ExternalLinkIcon />
          </a>
        </div>

        {/* What it does */}
        <div style={{ background: BOND.surface, border: `1px solid ${BOND.border}`, borderRadius: 10, padding: '22px 24px' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: BOND.text, marginBottom: 16 }}>How it works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: '1', label: 'Gmail scan', detail: 'Pulls threads from customersuccess@bondsports.co. Covers the past 30 days on first run, then incremental from the last sync.' },
              { step: '2', label: 'AI triage', detail: 'Claude Haiku reads each email and decides: data engineering issue or noise? Qualifying issues get a severity rating (1–5) and root cause.' },
              { step: '3', label: 'Dashboard review', detail: 'Issues surface as cards with temperature ratings. Link to a Jira ticket or create one directly from the card.' },
              { step: '4', label: 'Auto-resolution', detail: 'When a Bond team member sends a resolution reply, Haiku classifies it as RESOLVED vs. just an acknowledgement. CS quick replies don\'t falsely close tickets.' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: 14 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: BOND.primary, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: BOND.text, marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: BOND.textBody, lineHeight: 1.6 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { label: 'Owner', value: 'David Jung' },
            { label: 'Stack', value: 'React + Vite · Netlify · Claude Haiku · Supabase' },
            { label: 'Integrations', value: 'Gmail API · Jira REST API · Slack' },
            { label: 'Access', value: '@bondsports.co Google accounts' },
          ].map(item => (
            <div key={item.label} style={{
              background: BOND.surface, border: `1px solid ${BOND.border}`,
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13, color: BOND.textBody }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
