import { canSee } from '../lib/auth.js'
import { BOND } from '../lib/constants.js'
import PageHeader from '../components/content/PageHeader.jsx'
import DraftBadge from '../components/content/DraftBadge.jsx'
import EmptyState from '../components/content/EmptyState.jsx'
import { kbArticles, kbCategories } from '../content/kb/index.js'
import { ExternalLinkIcon } from '../components/layout/Icons.jsx'

const CATEGORY_ICONS = {
  Architecture: '🏛',
  Methodology:  '📐',
  Tooling:      '🔧',
  Strategy:     '🎯',
}

function ArticleCard({ article }) {
  return (
    <a href={article.url} target="_blank" rel="noreferrer"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#CBD5E0' }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = BOND.border }}
        style={{
          background: BOND.surface, border: `1px solid ${BOND.border}`,
          borderRadius: 10, padding: '20px 22px',
          transition: 'box-shadow 0.15s, border-color 0.15s',
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: BOND.primary, lineHeight: 1.3 }}>{article.title}</div>
            {!article.published && <DraftBadge />}
          </div>
          <div style={{ color: BOND.textMuted, marginTop: 2, flexShrink: 0 }}><ExternalLinkIcon /></div>
        </div>
        <p style={{ fontSize: 13, color: BOND.textBody, lineHeight: 1.6, marginBottom: 12 }}>
          {article.summary}
        </p>
        {article.updatedAt && (
          <div style={{ fontSize: 11, color: BOND.textMuted }}>
            Updated {article.updatedAt}
          </div>
        )}
      </div>
    </a>
  )
}

export default function KnowledgeBase({ auth }) {
  const { user, viewAsPublic } = auth
  const visible = kbArticles.filter(a => canSee(a, user, viewAsPublic))

  return (
    <div>
      <PageHeader
        title="Knowledge Base"
        subtitle="Architecture diagrams, methodology docs, tooling playbooks, and strategy memos from the Data & Analytics team."
      />
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 32 }}>
        {!visible.length
          ? <EmptyState icon="📖" title="No articles yet" body="Knowledge base articles will appear here." />
          : kbCategories.map(category => {
            const catArticles = visible.filter(a => a.category === category)
            if (!catArticles.length) return null
            return (
              <div key={category}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 16 }}>{CATEGORY_ICONS[category]}</span>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: BOND.text }}>{category}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
                  {catArticles.map(article => <ArticleCard key={article.slug} article={article} />)}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
