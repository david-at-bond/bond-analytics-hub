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

function ResponseSpeed() {
  const { firstReply: fr, resolution: r } = triageSnapshot.responseSpeed
  const post = r.postLaunch
  const pre  = r.preLaunch

  const postTotal = post.distribution.reduce((s, d) => s + d.count, 0)
  const preTotal  = pre.distribution.reduce((s, d) => s + d.count, 0)
  const postLongTailPct = Math.round((post.distribution.find(d => d.bucket === '30+ days').count / postTotal) * 100)
  const preLongTailPct  = Math.round((pre.distribution.find(d => d.bucket === '30+ days').count / preTotal) * 100)

  return (
    <div style={{
      background: BOND.surface, border: `1px solid ${BOND.border}`,
      borderRadius: 10, padding: '22px 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: BOND.text }}>Response speed</span>
        <span style={{ fontSize: 11, color: BOND.textMuted }}>First reply, time to resolution, and what actually changed.</span>
      </div>

      {/* Two side-by-side metric cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22,
      }}>
        <div style={{
          background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`,
          borderRadius: 10, padding: '22px 26px',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Time to first reply
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: BOND.primary, lineHeight: 1, ...tabular }}>
            ~{fr.medianHours} <span style={{ fontSize: 16, fontWeight: 500, color: BOND.textMuted }}>hrs</span>
          </div>
          <div style={{ fontSize: 12, color: BOND.textBody, marginTop: 8, fontWeight: 500 }}>
            median · {fr.sameDayPct}% same business day
          </div>
          <div style={{ fontSize: 11, color: BOND.textMuted, marginTop: 4 }}>
            {fr.next24hPct}% within 24h · slowest {fr.maxHours}h (weekend) · Gmail sample n={fr.n}
          </div>
        </div>

        <div style={{
          background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`,
          borderRadius: 10, padding: '22px 26px',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: BOND.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Median time to resolution
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: BOND.primary, lineHeight: 1, ...tabular }}>
            {post.medianDays} <span style={{ fontSize: 16, fontWeight: 500, color: BOND.textMuted }}>days</span>
          </div>
          <div style={{ fontSize: 12, color: BOND.textBody, marginTop: 8, fontWeight: 500 }}>
            post-launch · n={post.n}
          </div>
          <div style={{ fontSize: 11, color: BOND.textMuted, marginTop: 4 }}>
            pre-launch median was {pre.medianDays}d — comparable
          </div>
        </div>
      </div>

      {/* Long-tail comparison — the real story */}
      <div style={{
        background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`,
        borderRadius: 10, padding: '22px 26px', marginBottom: 20,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: BOND.text, marginBottom: 4 }}>
          What actually changed: the long tail
        </div>
        <div style={{ fontSize: 12, color: BOND.textMuted, marginBottom: 18, lineHeight: 1.5 }}>
          Median resolution was already fast pre-launch. The real outcome of the triage app is that issues no longer fall through the cracks for 30+ days.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { label: 'Pre-launch (Jan–Mar)',  data: pre,  n: pre.n,  longTail: preLongTailPct,  max: pre.maxDays,  noteColor: '#854F0B' },
            { label: 'Post-launch (Apr–May)', data: post, n: post.n, longTail: postLongTailPct, max: post.maxDays, noteColor: '#0F6E56' },
          ].map(side => {
            const total = side.data.distribution.reduce((s, d) => s + d.count, 0)
            const max = Math.max(...side.data.distribution.map(d => d.count))
            return (
              <div key={side.label}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: BOND.text }}>{side.label}</span>
                  <span style={{ fontSize: 11, color: BOND.textMuted, ...tabular }}>n={side.n} · max {side.max}d</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {side.data.distribution.map(d => {
                    const pct = max > 0 ? d.count / max : 0
                    const sharePct = total > 0 ? Math.round((d.count / total) * 100) : 0
                    const isLongTail = d.bucket === '30+ days'
                    return (
                      <div key={d.bucket} style={{ display: 'grid', gridTemplateColumns: '78px 1fr 50px', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 11, color: isLongTail ? side.noteColor : BOND.textBody, fontWeight: isLongTail ? 700 : 500 }}>{d.bucket}</span>
                        <div style={{
                          height: 12, borderRadius: 3,
                          background: `linear-gradient(to right, ${isLongTail ? side.noteColor : BOND.gold} 0%, ${isLongTail ? side.noteColor : BOND.gold} ${pct * 100}%, ${BOND.surface} ${pct * 100}%)`,
                          border: `1px solid ${BOND.border}`,
                        }} />
                        <span style={{ fontSize: 11, color: BOND.textMuted, textAlign: 'right', ...tabular }}>
                          {d.count} · {sharePct}%
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div style={{ fontSize: 11, color: side.noteColor, marginTop: 10, fontWeight: 600, textAlign: 'center' }}>
                  {side.longTail}% of issues took 30+ days
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ paddingTop: 4, fontSize: 11, color: BOND.textMuted, lineHeight: 1.5 }}>
        Bond CS was already fast to first reply (~{fr.medianHours}h median, unchanged). Median time-to-resolution was also already reasonable — about {pre.medianDays} days pre-launch vs {post.medianDays} days post. The difference is the <strong>distribution shape</strong>: pre-launch, roughly {preLongTailPct}% of customer issues dragged on for 30+ days (max {pre.maxDays}d in our sample). Post-launch, the long tail is gone — the longest issue in 106 took {post.maxDays} days.
        <br /><br />
        Pre-launch numbers from a Gmail sample (n={pre.n} of 40 reachable threads, "resolved" proxied by last Bond reply). Post-launch numbers cover all {post.n} resolved issues with real resolvedDate timestamps.
      </div>
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
          <StatTile label="Issues triaged"         value={t.triaged} sub="since Apr 6 launch" />
          <StatTile label="Median first reply"     value={`~${triageSnapshot.responseSpeed.firstReply.medianHours}h`} sub={`${triageSnapshot.responseSpeed.firstReply.sameDayPct}% same business day`} />
          <StatTile label="Median time to resolve" value={`${triageSnapshot.responseSpeed.resolution.postLaunch.medianDays} days`} sub={`longest ${triageSnapshot.responseSpeed.resolution.postLaunch.maxDays}d · no long tail`} />
          <StatTile label="Resolution rate"        value={`${Math.round(t.resolutionRate * 100)}%`} sub={`${t.resolved} of ${t.triaged}`} />
          <StatTile label="Customer orgs served"   value={t.uniqueOrgs} sub={`${t.uniqueReporters} distinct reporters`} />
        </div>

        <ResponseSpeed />
        <VolumeBars />
        <PerOrgTable />

        <div style={{
          background: BOND.surfaceSubtle, border: `1px solid ${BOND.border}`,
          borderRadius: 10, padding: '18px 22px', fontSize: 13, color: BOND.textBody, lineHeight: 1.6,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: BOND.text, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Reading the data
          </div>
          Bond CS was already fast on the easy cases — median first reply ~{triageSnapshot.responseSpeed.firstReply.medianHours}h, median resolution ~{triageSnapshot.responseSpeed.resolution.preLaunch.medianDays}d. What was broken was the long tail: pre-launch, roughly 1 in 5 issues dragged on for 30+ days (some pushing 80+). Post-launch, the longest issue in 106 took {triageSnapshot.responseSpeed.resolution.postLaunch.maxDays} days — the tail is gone.
          Volume is steady (Apr → May), resolution rate is holding at {Math.round(t.resolutionRate * 100)}%, and the per-customer movement is interesting:{' '}
          <strong>blackbearsportsgroup</strong> trended up in May, <strong>biggbycoffeeicecube</strong> spiked in April and is now silent (fix-and-stay-fixed),
          and longer-tail customers like <strong>sensplex</strong> and <strong>icevault</strong> are cooling.
        </div>
      </div>
    </div>
  )
}
