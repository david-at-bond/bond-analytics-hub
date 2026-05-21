// Knowledge Base — long-form HTML artifacts hosted in /public/kb/
// Categories: Architecture, Methodology, Tooling, Strategy

export const kbCategories = ['Architecture', 'Methodology', 'Tooling', 'Strategy']

export const kbArticles = [
  {
    slug: 'bond-analytics-architecture',
    title: 'Bond Analytics Architecture',
    summary: 'End-to-end architecture of the data stack: app database → Snowflake → dbt → Sigma → embedded reports and triage tooling. The canonical reference for "how does Bond analytics work?"',
    category: 'Architecture',
    url: '/kb/bond-analytics-architecture.html',
    published: true,
    updatedAt: '2026-05-07',
  },
  {
    slug: 'bond-analytics-erd',
    title: 'Bond Analytics ERD',
    summary: 'Full entity-relationship diagram of the analytics warehouse — all production fact and dimension tables maintained in dbt. Light-mode, Bond-styled.',
    category: 'Architecture',
    url: '/kb/bond-analytics-erd.html',
    published: true,
    updatedAt: '2026-05-08',
  },
  {
    slug: 'bond-accounting-methodology',
    title: 'AR Aging & Accounting Methodology',
    summary: 'The two-pipeline AR aging architecture: Cash / Defer-on-Invoice via payment_line_items (reliable), and Defer-on-Payment via Actions with FIFO (~99% accurate). Establishes the canonical methodology for revenue recognition questions.',
    category: 'Methodology',
    url: '/kb/bond-accounting-methodology.html',
    published: true,
    updatedAt: '2026-05-04',
  },
  {
    slug: 'bond-data-share-export-costs',
    title: 'Data Share & Export — Cost Analysis',
    summary: 'Snowflake compute + storage cost of customer-facing data shares and ad-hoc CSV exports. Top three cost-driving orgs and break-even threshold to migrate to a dedicated report.',
    category: 'Methodology',
    url: '/kb/bond-data-share-export-costs.html',
    published: true,
    updatedAt: '2026-05-20',
  },
  {
    slug: 'snowflake-mcp-setup',
    title: 'Snowflake MCP — Setup Playbook',
    summary: 'How the data team wires Snowflake into Claude via MCP so warehouse queries can run during issue triage and exploratory analysis. Materially speeds up "is this a one-off or a pattern?" investigations.',
    category: 'Tooling',
    url: '/kb/snowflake-mcp-setup.html',
    published: true,
    updatedAt: '2026-05-06',
  },
  {
    slug: 'bond-ai-sessions',
    title: 'AI-Pair-Coding Sessions — Retrospective',
    summary: 'Catalogue of AI-pair-coding sessions across the analytics tools (Triage, Sigma Admin, R&A Roadmap, Analytics Hub). What worked, what didn\'t, and the patterns standardizing across the team.',
    category: 'Tooling',
    url: '/kb/bond-ai-sessions.html',
    published: false,
  },
  {
    slug: 'competitor-reporting-kb',
    title: 'Competitor Reporting — Knowledge Base',
    summary: 'How peer SaaS players in sports/facilities deliver embedded reporting to operators. Informs the Sigma embed roadmap and PRD priorities.',
    category: 'Strategy',
    url: '/kb/competitor-reporting-kb.html',
    published: false,
    updatedAt: '2026-05-07',
  },
  {
    slug: 'board-update-q2-2026',
    title: 'Board Update — Q2 2026',
    summary: 'Prior board update covering Q2 2026 — provided here for reference and continuity.',
    category: 'Strategy',
    url: '/kb/board-update-q2-2026.html',
    published: false,
    updatedAt: '2026-04-15',
  },
]
