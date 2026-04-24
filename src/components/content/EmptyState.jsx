import { BOND } from '../../lib/constants.js'

export default function EmptyState({ icon = '📭', title, body }) {
  return (
    <div style={{
      textAlign: 'center', padding: '64px 32px',
      color: BOND.textMuted,
    }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <p style={{ fontSize: 15, fontWeight: 600, color: BOND.textBody, marginBottom: 8 }}>{title}</p>
      {body && <p style={{ fontSize: 13, maxWidth: 360, margin: '0 auto' }}>{body}</p>}
    </div>
  )
}
