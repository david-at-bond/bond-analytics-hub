import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import { SIDEBAR_KEY } from '../../lib/constants.js'

export default function AppShell({ auth, children }) {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_KEY) === 'true'
  )

  const onToggle = () => setCollapsed(c => {
    const next = !c
    localStorage.setItem(SIDEBAR_KEY, String(next))
    return next
  })

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar auth={auth} collapsed={collapsed} onToggle={onToggle} />
      <main style={{ flex: 1, overflowY: 'auto', background: '#F8F9FA' }}>
        {children}
      </main>
    </div>
  )
}
