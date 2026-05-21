// REP project (Reporting & Analytics 2.0) ticket throughput.
// Refreshed: 2026-05-21 via Jira REST API (project = REP, resolved >= 2026-01-01).

export const throughputSnapshot = {
  asOf: '2026-05-21',
  ytdResolved: 203,

  byMonth: [
    { month: '2026-01', resolved: 30, partial: false },
    { month: '2026-02', resolved: 50, partial: false },
    { month: '2026-03', resolved: 37, partial: false },
    { month: '2026-04', resolved: 49, partial: false },
    { month: '2026-05', resolved: 37, partial: true  },
  ],

  // Headline averages
  weeklyAvg: 10.2,        // 203 / ~20 working weeks YTD
  monthlyAvg: 41,         // 203 / 5 months (with May partial)

  // Annualized May (partial month projection: 37 × 31/21)
  mayAnnualized: 55,
}
