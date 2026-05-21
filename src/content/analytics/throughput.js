// REP project (Reporting & Analytics 2.0) ticket throughput.
// Refreshed: 2026-05-22 via Jira REST API (project = REP, resolved >= 2026-01-01).

export const throughputSnapshot = {
  asOf: '2026-05-22',
  ytdResolved: 205,

  byMonth: [
    { month: '2026-01', resolved: 30, partial: false },
    { month: '2026-02', resolved: 50, partial: false },
    { month: '2026-03', resolved: 37, partial: false },
    { month: '2026-04', resolved: 49, partial: false },
    { month: '2026-05', resolved: 39, partial: true  },
  ],

  // Headline averages
  weeklyAvg: 10.3,        // 205 / ~20 working weeks YTD
  monthlyAvg: 41,         // 205 / 5 months (with May partial)

  // Annualized May (partial month projection: 39 × 31/22)
  mayAnnualized: 55,
}
