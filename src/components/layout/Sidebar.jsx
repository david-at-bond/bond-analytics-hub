import { useLocation, NavLink } from 'react-router-dom'
import { isAdmin } from '../../lib/auth.js'
import { BOND } from '../../lib/constants.js'
import { NAV_GROUPS, ADMIN_NAV_ITEM } from '../../config/nav.js'
import { NAV_ICONS, ChevronLeftIcon, ChevronRightIcon, LogOutIcon, EyeIcon, EyeOffIcon } from './Icons.jsx'

const S = {
  sidebar: (collapsed) => ({
    width: collapsed ? 60 : 240,
    minWidth: collapsed ? 60 : 240,
    height: '100vh',
    background: BOND.navy,
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s ease, min-width 0.2s ease',
    overflow: 'hidden',
    flexShrink: 0,
    position: 'relative',
    zIndex: 10,
  }),
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 16px 16px', borderBottom: `1px solid rgba(255,255,255,0.07)`,
  },
  logo: {
    display: 'flex', flexDirection: 'column', gap: 1, overflow: 'hidden',
  },
  logoPrimary: {
    fontSize: 13, fontWeight: 700, letterSpacing: '0.12em',
    color: '#fff', whiteSpace: 'nowrap', lineHeight: 1.2,
  },
  logoSub: {
    fontSize: 11, color: BOND.gold, fontWeight: 600,
    letterSpacing: '0.06em', whiteSpace: 'nowrap',
  },
  collapseBtn: {
    background: 'rgba(255,255,255,0.07)', border: 'none',
    color: 'rgba(255,255,255,0.5)', borderRadius: 6,
    width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s',
  },
  nav: { flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '8px 0' },
  groupLabel: (collapsed) => ({
    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
    color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
    padding: collapsed ? '12px 0 4px' : '12px 16px 4px',
    textAlign: collapsed ? 'center' : 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: 'opacity 0.15s',
    opacity: collapsed ? 0 : 1,
    height: collapsed ? 0 : 'auto',
  }),
  item: (active, collapsed) => ({
    display: 'flex', alignItems: 'center',
    gap: 10,
    padding: collapsed ? '10px 0' : '10px 16px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    color: active ? '#fff' : 'rgba(255,255,255,0.55)',
    background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
    borderLeft: active ? `3px solid ${BOND.gold}` : '3px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    whiteSpace: 'nowrap',
    transition: 'background 0.12s, color 0.12s',
  }),
  footer: {
    borderTop: `1px solid rgba(255,255,255,0.07)`,
    padding: '12px 14px',
  },
  avatar: (email) => ({
    width: 28, height: 28, borderRadius: '50%',
    background: BOND.primary, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 700, flexShrink: 0,
  }),
  userRow: {
    display: 'flex', alignItems: 'center', gap: 8,
    marginBottom: 8, overflow: 'hidden',
  },
  userName: {
    fontSize: 12, fontWeight: 500, color: '#fff',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    flex: 1,
  },
  userEmail: {
    fontSize: 11, color: 'rgba(255,255,255,0.35)',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  iconBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'rgba(255,255,255,0.35)', padding: 4, borderRadius: 4,
    display: 'flex', alignItems: 'center', transition: 'color 0.12s',
  },
  previewRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 8, padding: '6px 8px',
    background: 'rgba(255,255,255,0.04)', borderRadius: 6,
  },
  previewLabel: { fontSize: 11, color: 'rgba(255,255,255,0.4)' },
  previewToggle: (on) => ({
    width: 32, height: 18, borderRadius: 9,
    background: on ? BOND.gold : 'rgba(255,255,255,0.15)',
    cursor: 'pointer', border: 'none', position: 'relative',
    transition: 'background 0.2s', flexShrink: 0,
  }),
  previewDot: (on) => ({
    position: 'absolute', top: 3, left: on ? 15 : 3,
    width: 12, height: 12, borderRadius: '50%', background: '#fff',
    transition: 'left 0.2s',
  }),
}

function NavItem({ item, collapsed }) {
  const location = useLocation()
  const active = item.path === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(item.path)
  const Icon = NAV_ICONS[item.id]

  return (
    <NavLink to={item.path} style={S.item(active, collapsed)}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      {Icon && <Icon />}
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  )
}

export default function Sidebar({ auth, collapsed, onToggle }) {
  const { user, signOut, viewAsPublic, togglePreview } = auth
  const admin = isAdmin(user)
  const initial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'

  return (
    <div style={S.sidebar(collapsed)}>
      {/* Header / Logo */}
      <div style={S.header}>
        {!collapsed && (
          <div style={S.logo}>
            <span style={S.logoPrimary}>BOND</span>
            <span style={S.logoSub}>Analytics Hub</span>
          </div>
        )}
        <button style={S.collapseBtn} onClick={onToggle}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </div>

      {/* Navigation */}
      <nav style={S.nav}>
        {NAV_GROUPS.map(group => (
          <div key={group.group}>
            <div style={S.groupLabel(collapsed)}>{group.group}</div>
            {group.items.map(item => (
              <NavItem key={item.id} item={item} collapsed={collapsed} />
            ))}
          </div>
        ))}

        {admin && (
          <div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '8px 14px' }} />
            <NavItem item={ADMIN_NAV_ITEM} collapsed={collapsed} />
          </div>
        )}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div style={S.footer}>
          <div style={S.userRow}>
            <div style={S.avatar(user?.email)}>{initial}</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={S.userName}>{user?.name || user?.email}</div>
              <div style={S.userEmail}>{user?.email}</div>
            </div>
            <button style={S.iconBtn} onClick={signOut} title="Sign out"
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              <LogOutIcon />
            </button>
          </div>

          {admin && (
            <div style={S.previewRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {viewAsPublic ? <EyeIcon /> : <EyeOffIcon />}
                <span style={S.previewLabel}>
                  {viewAsPublic ? 'Viewing as team' : 'Admin view'}
                </span>
              </div>
              <button style={S.previewToggle(viewAsPublic)} onClick={togglePreview}>
                <div style={S.previewDot(viewAsPublic)} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
