import { BOND } from '../lib/constants.js'
import PageHeader from '../components/content/PageHeader.jsx'
import { triageSnapshot, TREND_STYLES } from '../content/analytics/triage.js'

const tabular = { fontVariantNumeric: 'tabular-nums' }

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const shortMonth = (yyyyMm) => MONTH_NAMES[parseInt(yyyyMm.split('-')[1], 10) - 1]

function StatTile({ label, value, sub }) {
  return (
    <div style={{
      background: BOND.surface, border: `1px solid ${BOND.border}`,
      borderRadius: 10, padding: '20px 22px', flex: 1, minWidth: 160,
    }}>
      <div style={{ fontSize: 32, fontWeight: 700, color: BOND.primary, lineHeight: 1.1, ...tabular }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: BOND.textBody, marginTop: 8, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: BOND.textMuted, marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

function TrendPill({ trend }) {
  const s = TREND_STYLES[trend] || TREND_STYLES.stable
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: 11, fontWeight: 600, lineHeight: 1,
      padding: '3px 8px', borderRadius: 20,
      color: s.color, background: s.bg, border: `1px solid ${s.border}`,
      whiteSpace: 'nowrap',
    }}>{s.label}</span>
  )
}

function VolumeBars() {
  const { byMonth } = triageSnapshot
  const max = Math.max(...byMonth.map(m => m.total))
  return (
    <div style={{
      background: BOND.surface, border: `1px solid ${BOND.border}`,
      borderRadius: 10, padding: '22px 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: BOND.text }}>Volume by month</span>
        <span style={{ fontSize: 11, color: BOND.textMuted }}>
          Jan–Feb were a backward Gmail sweep at launch — Apr/May are the live operating volume.
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 180 }}>
        {byMonth.map(m => {
          const pct = m.total / max
          const monthLabel = shortMonth(m.month)
          const isLive = m.month >= '2026-03'
          return (
            <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: BOND.text, ...tabular }}>
                {m.total}
              </div>
              <div style={{
                width: '100%', maxWidth: 60,
                height: `${pct * 140}px`,
                background: isLive ? BOND.gold : BOND.border,
                borderRadius: '6px 6px 0 0',
                transition: 'height 0.3s',
              }} />
              <div style={{ fontSize: 11, color: BOND.textMuted, fontWeight: 500 }}>{monthLabel}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PerOrgTable() {
  const { byOrg } = triageSnapshot
  return (
    <div style={{
      background: BOND.surface, border: `1px solid ${BOND.border}`,
      borderRadius: 10, overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 22px', borderBottom: `1px solid ${BOND.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: BOND.text }}>Top customers by volume</div>
        <div style={{ fontSize: 11, color: BOND.textMuted, marginTop: 4 }}>
          Issue volume per org over the last three months. Trend column shows direction over the window.
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: BOND.surfaceSubtle }}>
            <th style={{ textAlign: 'left',  padding: '10px 22px', fontSize: 11, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Org</th>
            <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mar</th>
            <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Apr</th>
            <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>May</th>
            <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</th>
            <th style={{ textAlign: 'left',  padding: '10px 22px', fontSize: 11, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trend</th>
          </tr>
        </thead>
        <tbody>
          {byOrg.map((row, i) => (
            <tr key={row.org} style={{ borderTop: `1px solid ${BOND.border}` }}>
              <td style={{ padding: '10px 22px', fontWeight: 500, color: BOND.text }}>{row.org}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: BOND.textBody, ...tabular }}>{row.mar}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: BOND.textBody, ...tabular }}>{row.apr}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', color: BOND.textBody, ...tabular }}>{row.may}</td>
              <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: BOND.primary, ...tabular }}>{row.total}</td>
              <td style={{ padding: '10px 22px' }}><TrendPill trend={row.trend} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TriageAnalytics() {
  const t = triageSnapshot.totals
  return (
    <div>
      <PageHeader
        title="Triage Analytics"
        subtitle={`Customer-reported data issues funneled through Reporting Triage — live since ${triageSnapshot.liveSince}. Snapshot ${triageSnapshot.asOf}.`}
      />
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <StatTile label="Issues triaged"        value={t.triaged} sub="since Apr 6 launch" />
          <StatTile label="Resolution rate"       value={`${Math.round(t.resolutionRate * 100)}%`} sub={`${t.resolved} of ${t.triaged}`} />
          <StatTile label="Customer orgs served"  value={t.uniqueOrgs} sub={`${t.uniqueReporters} distinct reporters`} />
          <StatTile label="Currently open"        value={t.open + t.inProgress} sub={`${t.open} open · ${t.inProgress} in progress`} />
        </div>

        <VolumeBars />
        <PerOrgTable />

        <div style={{
          background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`,
          borderRadius: 10, padding: '18px 22px', fontSize: 13, color: BOND.textBody, lineHeight: 1.6,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: BOND.text, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Reading the data
          </div>
          Reporting Triage went live on {triageSnapshot.liveSince}. April was the first full operating month; pace into May is roughly flat — issue volume is steady, not declining, and resolution rate has held at {Math.round(t.resolutionRate * 100)}%.
          The interesting movement is per-customer: <strong>blackbearsportsgroup</strong> trended up in May, <strong>biggbycoffeeicecube</strong> spiked in April and is now silent (fix-and-stay-fixed), and longer-tail customers like <strong>sensplex</strong> and <strong>icevault</strong> are cooling.
        </div>
      </div>
    </div>
  )
}
