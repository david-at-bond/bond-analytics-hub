import { BOND } from '../../lib/constants.js'

export default function Card({ children, style, onClick, hover = false }) {
  const [hovered, setHovered] = hover ? [false, () => {}] : [false, () => {}]
  return (
    <div
      onClick={onClick}
      onMouseEnter={onClick ? e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)' : undefined}
      onMouseLeave={onClick ? e => e.currentTarget.style.boxShadow = 'none' : undefined}
      style={{
        background: BOND.surface,
        border: `1px solid ${BOND.border}`,
        borderRadius: 10,
        padding: '20px 22px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.15s',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
