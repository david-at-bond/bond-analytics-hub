export default function DraftBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
      padding: '2px 7px', borderRadius: 20,
      background: '#FFF8E1', color: '#854F0B',
      border: '1px solid #FAC775',
    }}>
      ✎ DRAFT
    </span>
  )
}
