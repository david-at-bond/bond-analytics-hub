import { BOND } from '../../lib/constants.js'

export default function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{
      padding: '32px 32px 24px',
      borderBottom: `1px solid ${BOND.border}`,
      background: BOND.surface,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: BOND.primary, marginBottom: subtitle ? 6 : 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 13, color: BOND.textMuted, lineHeight: 1.5 }}>{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
