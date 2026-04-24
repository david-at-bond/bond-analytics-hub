import { Link } from 'react-router-dom'
import { BOND } from '../lib/constants.js'

export default function NotFound() {
  return (
    <div style={{ padding: 64, textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>404</div>
      <p style={{ fontSize: 16, fontWeight: 600, color: BOND.text, marginBottom: 8 }}>Page not found</p>
      <Link to="/" style={{ fontSize: 14, color: BOND.primary }}>← Back to Overview</Link>
    </div>
  )
}
