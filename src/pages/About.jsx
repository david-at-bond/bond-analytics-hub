import PageHeader from '../components/content/PageHeader.jsx'
import { BOND } from '../lib/constants.js'
import { ExternalLinkIcon } from '../components/layout/Icons.jsx'

const TEAM = [
  {
    name: 'David Jung',
    role: 'Director, Data & Analytics',
    email: 'david.jung@bondsports.co',
    focus: 'Analytics strategy, Sigma reports, reporting infrastructure, stakeholder delivery.',
  },
  {
    name: 'Brett',
    role: 'Data Engineer',
    email: 'brett@bondsports.co',
    focus: 'Snowflake data warehouse, dbt models (280+ SQL models), data pipelines.',
  },
]

export default function About() {
  return (
    <div>
      <PageHeader
        title="About"
        subtitle="The Bond Sports Data & Analytics team."
      />
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 780 }}>

        {/* Mission */}
        <div style={{ background: BOND.surface, border: `1px solid ${BOND.border}`, borderRadius: 10, padding: '22px 24px' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: BOND.text, marginBottom: 12 }}>Mission</h2>
          <p style={{ fontSize: 14, color: BOND.textBody, lineHeight: 1.7 }}>
            The Data & Analytics team powers data-informed decisions across the Bond platform — for operators, CS, and leadership. We build the reporting infrastructure, maintain the data warehouse, and surface insights that demonstrate platform value and surface growth opportunities.
          </p>
        </div>

        {/* Team */}
        <div>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: BOND.text, marginBottom: 14 }}>Team</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TEAM.map(member => (
              <div key={member.email} style={{
                background: BOND.surface, border: `1px solid ${BOND.border}`,
                borderRadius: 10, padding: '18px 20px',
                display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: BOND.primary, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700, flexShrink: 0,
                }}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: BOND.text }}>{member.name}</div>
                  <div style={{ fontSize: 12, color: BOND.primary, marginBottom: 6 }}>{member.role}</div>
                  <div style={{ fontSize: 13, color: BOND.textBody, lineHeight: 1.6 }}>{member.focus}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request a report */}
        <div style={{ background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`, borderRadius: 10, padding: '18px 20px' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: BOND.text, marginBottom: 8 }}>Request a report</h2>
          <p style={{ fontSize: 13, color: BOND.textBody, lineHeight: 1.6, marginBottom: 12 }}>
            Need a new report or dashboard? File a Jira ticket in the <strong>REP</strong> project using the <strong>Report Request</strong> issue type. See the playbook for details.
          </p>
          <a href="https://bondsports.atlassian.net" target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600, color: BOND.primary, textDecoration: 'none',
            }}
          >
            Open Jira <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </div>
  )
}
