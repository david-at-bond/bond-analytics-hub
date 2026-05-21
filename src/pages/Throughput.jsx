import { BOND } from '../lib/constants.js'
import PageHeader from '../components/content/PageHeader.jsx'
import { throughputSnapshot } from '../content/analytics/throughput.js'

const tabular = { fontVariantNumeric: 'tabular-nums' }

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const shortMonth = (yyyyMm) => MONTH_NAMES[parseInt(yyyyMm.split('-')[1], 10) - 1]

function StatTile({ label, value, sub }) {
  return (
    <div style={{
      background: BOND.surface, border: `1px solid ${BOND.border}`,
      borderRadius: 10, padding: '20px 22px', flex: 1, minWidth: 180,
    }}>
      <div style={{ fontSize: 32, fontWeight: 700, color: BOND.primary, lineHeight: 1.1, ...tabular }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: BOND.textBody, marginTop: 8, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: BOND.textMuted, marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

function MonthlyBars() {
  const { byMonth } = throughputSnapshot
  const max = Math.max(...byMonth.map(m => m.resolved))
  return (
    <div style={{
      background: BOND.surface, border: `1px solid ${BOND.border}`,
      borderRadius: 10, padding: '22px 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: BOND.text }}>REP tickets resolved per month</span>
        <span style={{ fontSize: 11, color: BOND.textMuted }}>
          Source: Jira project REP — Reporting & Analytics 2.0
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 220 }}>
        {byMonth.map(m => {
          const pct = m.resolved / max
          const label = shortMonth(m.month)
          return (
            <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: BOND.text, ...tabular }}>
                {m.resolved}
              </div>
              <div style={{
                width: '100%', maxWidth: 80,
                height: `${pct * 170}px`,
                background: BOND.primary,
                borderRadius: '6px 6px 0 0',
                transition: 'height 0.3s',
              }} />
              <div style={{ fontSize: 12, color: BOND.textMuted, fontWeight: 500 }}>{label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Throughput() {
  const t = throughputSnapshot
  return (
    <div>
      <PageHeader
        title="Engineering Throughput"
        subtitle={`Reporting & Analytics engineering velocity — Jira REP project. YTD through ${t.asOf}.`}
      />
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <StatTile label="Tickets shipped YTD"  value={t.ytdResolved} sub="Jan 1 → today" />
          <StatTile label="Average per month"    value={t.monthlyAvg}  sub="across 5 months" />
          <StatTile label="Average per week"     value={t.weeklyAvg.toFixed(1)} sub="working-week pace" />
          <StatTile label="May annualized"       value={`~${t.mayAnnualized}`} sub="month-end projection" />
        </div>

        <MonthlyBars />

        <div style={{
          background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`,
          borderRadius: 10, padding: '18px 22px', fontSize: 13, color: BOND.textBody, lineHeight: 1.6,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: BOND.text, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            What this tells us
          </div>
          The REP team has shipped <strong>{t.ytdResolved} resolved tickets</strong> in 2026 to date — averaging about <strong>{t.weeklyAvg.toFixed(0)} fixes per week</strong>.
          Monthly velocity has been steady through Q1 and into Q2: Feb (50) and Apr (49) were the high-water marks, with May on pace for a similar ~{t.mayAnnualized}.
          This is the engineering side of the analytics flywheel — every customer-reported issue triaged through the Reporting Triage tool routes here, gets a fix, and ships.
        </div>
      </div>
    </div>
  )
}
