import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header.jsx'
import GeneratorPanel from './components/GeneratorPanel.jsx'
import ViewerPanel, { saveModelToSession, loadModelFromSession, clearModelSession } from './components/ViewerPanel.jsx'
import GuidedFlow from './components/GuidedFlow.jsx'
import Footer from './components/Footer.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import { client } from './api/client.js'
import './styles/global.css'

// Task 4 — lazy-load heavy overlays
const DiscoveryPanel = lazy(() => import('./components/DiscoveryPanel.jsx'))
const OnboardingOverlay = lazy(() => import('./components/OnboardingOverlay.jsx'))

const ONBOARDING_KEY = 'orbitcad.onboarding.dismissed'

// Task 6.2 — /privacy and /terms render as overlays so MainApp stays mounted
function PageOverlay({ children }) {
  return <div className="page-overlay">{children}</div>
}

function MainApp() {
  const [prompt, setPrompt] = useState('')
  const [projectName, setProjectName] = useState('New design')
  const [projects, setProjects] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [tier, setTier] = useState('Free Tier')
  const [stlCredits, setStlCredits] = useState(0)
  const [stepCredits, setStepCredits] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errorCode, setErrorCode] = useState('')
  const [hasModel, setHasModel] = useState(false)
  const [modelName, setModelName] = useState('')
  const [artifacts, setArtifacts] = useState([])
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showDiscovery, setShowDiscovery] = useState(false)
  const [showGuided, setShowGuided] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Task 6.1 — restore model state on mount
  useEffect(() => {
    const saved = loadModelFromSession()
    if (saved?.hasModel) {
      setHasModel(true)
      setModelName(saved.modelName || '')
      setActiveId(saved.projectId || null)
      setArtifacts(saved.artifacts || [])
      if (saved.projectName) setProjectName(saved.projectName)
    }
  }, [])

  // Onboarding gate
  useEffect(() => {
    const dismissed = (() => { try { return localStorage.getItem(ONBOARDING_KEY) === 'true' } catch { return false } })()
    if (!dismissed) setShowOnboarding(true)
  }, [])

  // Load user entitlements and project list
  useEffect(() => {
    client.getMe()
      .then(data => {
        if (data?.tier) {
          const labels = { free: 'Free Tier', pro: 'Pro Beta', founder: 'Founder Lifetime' }
          setTier(labels[data.tier] || data.tier)
        }
        if (data?.exportCredits) {
          setStlCredits(data.exportCredits.stl ?? 0)
          setStepCredits(data.exportCredits.step ?? 0)
        }
      })
      .catch(() => {})

    client.getProjects()
      .then(data => { if (Array.isArray(data)) setProjects(data) })
      .catch(() => {})
  }, [])

  function dismissOnboarding() {
    try { localStorage.setItem(ONBOARDING_KEY, 'true') } catch {}
    setShowOnboarding(false)
  }

  function setErrorFull(msg, code = '') {
    setError(msg)
    setErrorCode(code)
  }

  // Task 5 — generate with health check + Task 6.1 session persistence
  async function handleGenerate() {
    const text = prompt.trim()
    if (!text || loading) return

    setLoading(true)
    setErrorFull('')

    // Task 5 — health check before generation
    const healthy = await client.checkHealth()
    if (!healthy) {
      setLoading(false)
      setErrorFull('network_error', 'NETWORK_ERROR')
      return
    }

    try {
      const result = await client.generatePart(text)
      const proj = result?.project || {}
      const newArtifacts = Array.isArray(result?.artifacts) ? result.artifacts : []

      if (proj.id) setActiveId(proj.id)
      if (proj.name) {
        setModelName(proj.name)
        setProjectName(proj.name)
      }

      setHasModel(true)
      setArtifacts(newArtifacts)

      // Task 6.1 — persist to sessionStorage
      saveModelToSession({
        hasModel: true,
        modelName: proj.name || '',
        projectName: proj.name || '',
        projectId: proj.id || null,
        artifacts: newArtifacts,
      })

      try { localStorage.setItem('orbitcad.hasGeneratedModel', 'true') } catch {}
    } catch (err) {
      setErrorFull(err.message || 'Generation failed. Please try again.', err.code || '')
    } finally {
      setLoading(false)
    }
  }

  function handleNewDesign() {
    setPrompt('')
    setActiveId(null)
    setProjectName('New design')
    setHasModel(false)
    setModelName('')
    setArtifacts([])
    setErrorFull('')
    clearModelSession()
  }

  async function handleSave() {
    if (!activeId) return
    try {
      await client.saveProject(activeId, { name: projectName })
    } catch (err) {
      setErrorFull(err.message, err.code)
    }
  }

  async function handleExport(format) {
    try {
      const audit = await client.exportAudit(format)
      if (!audit?.ok) {
        setErrorFull(audit?.message || 'Export not available. Check your credits or upgrade.', 'INSUFFICIENT_CREDITS')
      }
      // Refresh credits after export
      const me = await client.getMe().catch(() => null)
      if (me?.exportCredits) {
        setStlCredits(me.exportCredits.stl ?? stlCredits)
        setStepCredits(me.exportCredits.step ?? stepCredits)
      }
    } catch (err) {
      setErrorFull(err.message, err.code)
    }
  }

  return (
    <div id="app">
      {/* Task 4 — lazy-loaded overlays in Suspense */}
      <Suspense fallback={null}>
        {showOnboarding && (
          <OnboardingOverlay
            onDismiss={dismissOnboarding}
            onExampleClick={p => { setPrompt(p); dismissOnboarding() }}
          />
        )}
        {showDiscovery && (
          <DiscoveryPanel
            onClose={() => setShowDiscovery(false)}
            onSelect={p => { setPrompt(p); setShowDiscovery(false) }}
          />
        )}
      </Suspense>

      {showGuided && (
        <GuidedFlow
          onClose={() => setShowGuided(false)}
          onUsePrompt={p => { setPrompt(p); setShowGuided(false) }}
        />
      )}

      <Header
        projects={projects}
        activeId={activeId}
        tier={tier}
        usedSlots={projects.length}
        stlCredits={stlCredits}
        stepCredits={stepCredits}
        onNewDesign={handleNewDesign}
        onSelectProject={setActiveId}
        onUpgrade={() => setErrorFull('Upgrade coming soon. Email support@orbitcad.app for early access.')}
        onPromptClick={p => setPrompt(p)}
        sidebarOpen={sidebarOpen}
        onMenuToggle={() => setSidebarOpen(o => !o)}
      />

      <main className="main">
        <nav className="topbar">
          <button
            className="icon mobile-only"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(o => !o)}
          >
            ☰
          </button>
          <input
            className="title-input"
            aria-label="Project name"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
          />
          <div className="credit-summary" aria-label="Export credit balance">
            <span>STL <strong>{stlCredits}</strong></span>
            <span>STEP <strong>{stepCredits}</strong></span>
          </div>
          <div className="status entitlement-badge">{tier}</div>
          <div className="status">Ready</div>
        </nav>

        <section className="grid">
          <GeneratorPanel
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            onUndo={() => { setPrompt(''); setErrorFull('') }}
            onSave={handleSave}
            onOpenDiscovery={() => setShowDiscovery(true)}
            onOpenGuided={() => setShowGuided(true)}
            loading={loading}
            error={error}
            errorCode={errorCode}
            onDismissError={() => setErrorFull('')}
          />

          {/* Task 6.2 — ViewerPanel always mounted */}
          <ViewerPanel
            hasModel={hasModel}
            modelName={modelName}
            artifacts={artifacts}
            onResetView={() => {}}
            onClearModel={handleNewDesign}
            onExportStep={() => handleExport('step')}
            onExportStl={() => handleExport('stl')}
            onExportScad={() => setErrorFull('OpenSCAD export coming soon.')}
            onStarterPrompt={p => setPrompt(p)}
            stlCredits={stlCredits}
            stepCredits={stepCredits}
          />

          <section className="panel advanced-output-panel">
            <details>
              <summary>Advanced model output</summary>
              <div className="advanced-output-grid">
                <div>
                  <h3>OpenSCAD</h3>
                  <pre id="codeOut" />
                </div>
                <div>
                  <h3>Model data</h3>
                  <pre id="stateOut" />
                </div>
              </div>
            </details>
          </section>
        </section>

        <Footer />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <>
      {/* Task 6.2 — MainApp is always mounted so ViewerPanel never unmounts */}
      <MainApp />
      <Routes>
        <Route path="/privacy" element={<PageOverlay><PrivacyPage /></PageOverlay>} />
        <Route path="/terms" element={<PageOverlay><TermsPage /></PageOverlay>} />
      </Routes>
    </>
  )
}
