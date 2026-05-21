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

  // Two response metrics:
  // 1. Time-to-first-reply (TTFR): customer email → first Bond reply.
  //    Sampled from Gmail thread metadata (n=12 reachable threads from a 40-
  //    issue post-launch random sample). Wall-clock hours.
  // 2. Time-to-resolution (TTR): customer email → issue marked resolved.
  //    Computed from Supabase resolvedDate for all 106 post-launch resolved
  //    issues. Days.
  responseSpeed: {
    firstReply: {
      n: 12,
      medianHours: 5.8,
      meanHours: 9.1,
      sameDayPct: 75,
      next24hPct: 92,
      maxHours: 43,        // spanning a weekend
      sampleNote: 'Sampled from Gmail thread metadata; small-n because the bulk of triage threads live in the customersuccess@ shared inbox.',
    },
    resolution: {
      // Post-launch — all 106 resolved issues, from Supabase resolvedDate.
      postLaunch: {
        n: 106,
        medianDays: 3,
        meanDays: 3.7,
        maxDays: 16,
        // Normalized to same buckets as pre-launch for direct comparison.
        distribution: [
          { bucket: 'Same day', count: 39 },
          { bucket: '1–3 days', count: 22 },
          { bucket: '4–7 days', count: 31 },
          { bucket: '8–30 days', count: 14 }, // 13 (8-14d) + 1 (15+, was max 16)
          { bucket: '30+ days', count: 0  },
        ],
      },
      // Pre-launch — sample of 16 Jan-Mar threads, "last Bond reply" proxy.
      // Methodology: customer t0 → last @bondsports.co reply timestamp from
      // the thread. Imperfect (same-day acks count as resolution) but
      // catches the long tail honestly.
      preLaunch: {
        n: 16,
        medianDays: 2.2,
        meanDays: 14.7,
        maxDays: 86,
        sampleNote: 'Gmail thread sample, n=16 of 40 sampled (others were Bond-initiated or unreachable). "Resolution" proxied by last Bond reply timestamp.',
        distribution: [
          { bucket: 'Same day', count: 7 },
          { bucket: '1–3 days', count: 3 },
          { bucket: '4–7 days', count: 2 },
          { bucket: '8–30 days', count: 1 },
          { bucket: '30+ days', count: 3 }, // 46d, 58d, 86d
        ],
      },
      byMonth: [
        { month: '2026-04', median: 3, max: 12, n: 58 },
        { month: '2026-05', median: 3, max: 16, n: 48 },
      ],
    },
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
