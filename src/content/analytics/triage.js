// Reporting Triage analytics — snapshot of Supabase issues table.
// Refreshed: 2026-05-22. To re-snapshot, re-run the queries in
// memory/PROGRESS notes against project xeyvmjewywxphpirskln.

export const triageSnapshot = {
  asOf: '2026-05-22',
  liveSince: '2026-04-06',

  totals: {
    triaged: 175,
    resolved: 169,
    open: 2,
    inProgress: 4,
    resolutionRate: 0.966,
    uniqueOrgs: 53,
    uniqueReporters: 97,
    jiraLinked: 7,
  },

  // Time from customer email → issue marked resolved.
  // Pre-launch period reflects the backward Gmail sweep: issues sat unseen in
  // the inbox before the triage funnel existed. Post-launch (Apr 6+) is the
  // operating metric — what we ship against day-to-day now.
  resolutionSpeed: {
    postLaunch: { n: 106, median: 3,  mean: 3.7,  max: 16  },
    preLaunch:  { n: 63,  median: 24, mean: 27.6, max: 122 },
    // % buckets, post-launch only
    distribution: [
      { bucket: '0–1 day',   count: 39 },
      { bucket: '2–3 days',  count: 22 },
      { bucket: '4–7 days',  count: 31 },
      { bucket: '8–14 days', count: 13 },
      { bucket: '15+ days',  count: 1  },
    ],
    byMonth: [
      { month: '2026-04', median: 3, max: 12, n: 58 },
      { month: '2026-05', median: 3, max: 16, n: 48 },
    ],
  },

  // Monthly volume — Mar-onward is the post-launch period.
  // Jan/Feb numbers reflect the backward Gmail sweep that ran at launch.
  byMonth: [
    { month: '2026-01', total: 3,  resolved: 3,  open: 0, inProgress: 0, partial: false, note: 'backward sweep' },
    { month: '2026-02', total: 6,  resolved: 6,  open: 0, inProgress: 0, partial: false, note: 'backward sweep' },
    { month: '2026-03', total: 46, resolved: 44, open: 0, inProgress: 1, partial: false, note: null },
    { month: '2026-04', total: 67, resolved: 67, open: 0, inProgress: 0, partial: false, note: null },
    { month: '2026-05', total: 52, resolved: 48, open: 2, inProgress: 2, partial: true,  note: 'through 5/21' },
  ],

  // Per-org volume — Mar / Apr / May (May is partial through 5/21)
  byOrg: [
    { org: 'icerealm',             mar: 2, apr: 5, may: 5, total: 12, trend: 'plateau' },
    { org: 'blackbearsportsgroup', mar: 2, apr: 3, may: 6, total: 11, trend: 'rising'  },
    { org: 'pbskatezone',          mar: 3, apr: 2, may: 3, total: 9,  trend: 'stable'  },
    { org: 'wcrimail',             mar: 2, apr: 3, may: 2, total: 8,  trend: 'stable'  },
    { org: 'sensplex',             mar: 3, apr: 3, may: 1, total: 7,  trend: 'cooling' },
    { org: 'icevault',             mar: 3, apr: 2, may: 2, total: 7,  trend: 'cooling' },
    { org: 'thebridgewv',          mar: 2, apr: 3, may: 2, total: 7,  trend: 'stable'  },
    { org: 'teamseg',              mar: 1, apr: 3, may: 2, total: 6,  trend: 'rising'  },
    { org: 'insportscenters',      mar: 2, apr: 3, may: 1, total: 6,  trend: 'cooling' },
    { org: 'biggbycoffeeicecube',  mar: 0, apr: 6, may: 0, total: 6,  trend: 'resolved' },
    { org: 'ottawasenators',       mar: 1, apr: 1, may: 3, total: 5,  trend: 'rising'  },
    { org: 'bluhawksports',        mar: 2, apr: 1, may: 2, total: 5,  trend: 'stable'  },
    { org: 'printscapearena',      mar: 1, apr: 1, may: 3, total: 5,  trend: 'rising'  },
    { org: 'tocafootball',         mar: 0, apr: 4, may: 1, total: 5,  trend: 'cooling' },
    { org: 'centericeofdupage',    mar: 0, apr: 3, may: 1, total: 4,  trend: 'cooling' },
    { org: 'socceroof',            mar: 1, apr: 0, may: 2, total: 4,  trend: 'rising'  },
    { org: 'blackstreethold',      mar: 1, apr: 2, may: 1, total: 4,  trend: 'stable'  },
  ],
}

export const TREND_STYLES = {
  rising:   { label: '↑ Rising',    color: '#854F0B', bg: '#FAEEDA', border: '#FAC775' },
  cooling:  { label: '↓ Cooling',   color: '#0F6E56', bg: '#E1F5EE', border: '#9FE1CB' },
  plateau:  { label: '→ Plateau',   color: '#185FA5', bg: '#E6F1FB', border: '#B5D4F4' },
  stable:   { label: '→ Stable',    color: '#4A4A4A', bg: '#F1F5F9', border: '#CBD5E0' },
  resolved: { label: '✓ Resolved',  color: '#3B6D11', bg: '#EAF3DE', border: '#C0DD97' },
}
