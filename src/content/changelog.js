export const changelog = [
  {
    date: '2026-04-24',
    title: 'Bond Analytics Hub launched',
    description: 'Central portal for the Data & Analytics team — tools directory, PRDs, reports library, playbooks, and changelog.',
    project: 'Analytics Hub',
    published: true,
  },
  {
    date: '2026-04-24',
    title: 'Utilization Report — PRD + interactive mock complete',
    description: 'Full PRD document and Sigma-style interactive HTML mock for the Utilization Report. Covers facility utilization %, opportunity cost, prime/non-prime segmentation, and a heatmap visualization.',
    project: 'Utilization Report',
    published: false,
  },
  {
    date: '2026-04-10',
    title: 'Reporting Triage — auth & Gmail link fixes',
    description: 'Fixed Bond email bleed-through in triage results, eliminated double OAuth login prompt, and fixed Gmail links for teammates who weren\'t the original syncing user.',
    project: 'Reporting Triage',
    published: true,
  },
  {
    date: '2026-04-08',
    title: 'Reporting Triage — reliability and triage quality improvements',
    description: 'Switched to per-email individual triage (eliminates batch misses), added Supabase merge-on-sync to prevent lost issues, and added a live Jira status badge to each card.',
    project: 'Reporting Triage',
    published: true,
  },
  {
    date: '2026-04-07',
    title: 'Reporting Triage — Slack integration and smart auto-resolution',
    description: 'New sync notifications post to #analytics-email-monitor. Scheduled M-F 9am daily summary. Haiku now classifies Bond replies as RESOLVED vs ACKNOWLEDGEMENT — CS quick replies no longer falsely close tickets.',
    project: 'Reporting Triage',
    published: true,
  },
  {
    date: '2026-04-06',
    title: 'Reporting Triage — initial launch',
    description: 'Gmail-connected triage dashboard goes live. AI classification of data issues, temperature ratings, Jira search and create, Supabase persistence, multi-user support.',
    project: 'Reporting Triage',
    published: true,
  },
]
