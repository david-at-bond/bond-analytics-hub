export const playbooks = [
  {
    slug: 'request-a-report',
    title: 'How to Request a Report',
    summary: 'Step-by-step process for submitting a new report or dashboard request to the Data & Analytics team.',
    published: true,
    updatedAt: '2026-04-24',
    body: `## Submit a request

1. Open a Jira ticket in the **REP** project
2. Use the **Report Request** issue type
3. Fill in: business question, audience, data sources you know of, deadline
4. Tag **david.jung@bondsports.co** as the assignee

## What happens next

David reviews within 2 business days. For complex reports, a PRD is written first and shared back for alignment before any build starts. Typical turnaround: 1–3 weeks depending on data availability.

## What makes a good request

- State the **decision** the report should enable, not just the metrics you want
- Name the **primary audience** — operator self-serve vs. CS-facing vs. exec-facing
- Indicate if this replaces an existing report and what's missing from it`,
  },
  {
    slug: 'data-issue-triage',
    title: 'Data Issue Triage Process',
    summary: 'How data issues from customers get from the CS inbox to a Jira ticket.',
    published: true,
    updatedAt: '2026-04-10',
    body: `## Overview

The Reporting Triage app monitors the **customersuccess@bondsports.co** inbox automatically. Any email that looks like a data problem gets surfaced as a card in the triage dashboard with an AI-generated severity rating.

## What the team does

1. CS team handles incoming emails as normal
2. Reporting Triage identifies data-related threads automatically (no action needed from CS)
3. David or Brett reviews the triage dashboard daily
4. Issues get linked to a Jira REP or SB ticket
5. CS is alerted via the dashboard's "Alert CS" button when a fix is deployed

## Access the dashboard

→ [Reporting Triage](https://fantastic-praline-b55509.netlify.app) — sign in with your @bondsports.co Google account`,
  },
]
