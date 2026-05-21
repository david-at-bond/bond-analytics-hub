import { Routes, Route } from 'react-router-dom'
import { useAuth } from './lib/auth.js'
import AuthGate from './components/auth/AuthGate.jsx'
import AppShell from './components/layout/AppShell.jsx'
import Overview          from './pages/Overview.jsx'
import Tools             from './pages/Tools.jsx'
import Triage            from './pages/Triage.jsx'
import TriageAnalytics   from './pages/TriageAnalytics.jsx'
import Throughput        from './pages/Throughput.jsx'
import Reports           from './pages/Reports.jsx'
import Prds              from './pages/Prds.jsx'
import Playbooks         from './pages/Playbooks.jsx'
import KnowledgeBase     from './pages/KnowledgeBase.jsx'
import Changelog         from './pages/Changelog.jsx'
import About             from './pages/About.jsx'
import Me                from './pages/Me.jsx'
import NotFound          from './pages/NotFound.jsx'

export default function App() {
  const auth = useAuth()

  return (
    <AuthGate auth={auth}>
      <AppShell auth={auth}>
        <Routes>
          <Route path="/"                      element={<Overview        auth={auth} />} />
          <Route path="/tools"                 element={<Tools           auth={auth} />} />
          <Route path="/triage"                element={<Triage />} />
          <Route path="/analytics/triage"      element={<TriageAnalytics />} />
          <Route path="/analytics/throughput"  element={<Throughput />} />
          <Route path="/reports"               element={<Reports         auth={auth} />} />
          <Route path="/prds"                  element={<Prds            auth={auth} />} />
          <Route path="/playbooks"             element={<Playbooks       auth={auth} />} />
          <Route path="/kb"                    element={<KnowledgeBase   auth={auth} />} />
          <Route path="/changelog"             element={<Changelog       auth={auth} />} />
          <Route path="/about"                 element={<About />} />
          <Route path="/me"                    element={<Me              auth={auth} />} />
          <Route path="*"                      element={<NotFound />} />
        </Routes>
      </AppShell>
    </AuthGate>
  )
}
