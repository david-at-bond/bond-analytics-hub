export const NAV_GROUPS = [
  {
    group: 'Work',
    items: [
      { id: 'overview',  label: 'Overview',  path: '/' },
      { id: 'tools',     label: 'Tools',     path: '/tools' },
      { id: 'triage',    label: 'Triage',    path: '/triage' },
    ],
  },
  {
    group: 'Library',
    items: [
      { id: 'reports',   label: 'Reports',   path: '/reports' },
      { id: 'prds',      label: 'PRDs',      path: '/prds' },
      { id: 'playbooks', label: 'Playbooks', path: '/playbooks' },
      { id: 'changelog', label: 'Changelog', path: '/changelog' },
      { id: 'about',     label: 'About',     path: '/about' },
    ],
  },
]

export const ADMIN_NAV_ITEM = { id: 'me', label: 'Private', path: '/me' }
