const STATUS_STYLES = {
  Live:        { background: '#E1F5EE', color: '#0F6E56', border: '1px solid #9FE1CB' },
  'In build':  { background: '#FAEEDA', color: '#854F0B', border: '1px solid #FAC775' },
  Concept:     { background: '#E6F1FB', color: '#185FA5', border: '1px solid #B5D4F4' },
  Draft:       { background: '#EDF2F7', color: '#718096', border: '1px solid #CBD5E0' },
  Deprecated:  { background: '#FCEBEB', color: '#A32D2D', border: '1px solid #F7C1C1' },
  Shipped:     { background: '#E1F5EE', color: '#0F6E56', border: '1px solid #9FE1CB' },
  Published:   { background: '#E1F5EE', color: '#0F6E56', border: '1px solid #9FE1CB' },
}

export default function Pill({ label, size = 'sm' }) {
  const style = STATUS_STYLES[label] || STATUS_STYLES.Draft
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: size === 'xs' ? 10 : 11,
      fontWeight: 600, lineHeight: 1,
      padding: size === 'xs' ? '2px 6px' : '3px 8px',
      borderRadius: 20,
      ...style,
    }}>
      {label}
    </span>
  )
}
