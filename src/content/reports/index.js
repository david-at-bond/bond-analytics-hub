export const reports = [
  {
    slug: 'utilization',
    title: 'Utilization Report',
    summary: 'Facility space performance — booked vs available hours, prime/non-prime segmentation, opportunity cost, and forward-looking projections.',
    owner: 'david.jung@bondsports.co',
    status: 'In build',
    published: false,
    sigmaUrl: null,
    prdSlug: 'utilization',
    tags: ['facilities', 'revenue', 'operators'],
    updatedAt: '2026-04-24',
    body: `## What this report answers

- When are my prime hours being wasted?
- How much revenue am I leaving on the table?
- Which facilities are under- vs over-utilized?

## Data sources

Powered by \`fct_utilization_hourly\` from Brett's dbt warehouse. Joined to \`dim_facility\` and \`dim_organization\`. 5-minute grain model (\`fct_utilization_5m\`) feeds a raw data tab only.

## Key metrics

| Metric | Definition |
|---|---|
| Utilization % | Booked hours ÷ Available hours (excl. closed periods) |
| Revenue / Booked Hr | Total revenue ÷ booked hours in period |
| Opportunity Cost | Empty hours × avg rate per hour |
| Overbooked Events | Slots with >1 booking (true double-booking count) |

## Status

PRD written and mock complete. In build with Brett on the dbt models.`,
  },
  {
    slug: 'financials',
    title: 'Financials',
    summary: 'Revenue, payments, and financial performance across orgs and facilities.',
    owner: 'david.jung@bondsports.co',
    status: 'Live',
    published: true,
    sigmaUrl: 'https://app.sigmacomputing.com/bond-sports/workbook/Financials-4OEgAEbfXCyb7NEK7Da1XG',
    prdSlug: null,
    tags: ['finance', 'revenue'],
    updatedAt: '2026-04-14',
    body: `## Overview

Live Sigma workbook covering Bond's financial performance. Used weekly by operations and leadership.`,
  },
]
