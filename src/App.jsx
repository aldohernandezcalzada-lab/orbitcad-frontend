import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header.jsx'
import GeneratorPanel from './components/GeneratorPanel.jsx'
import ViewerPanel from './components/ViewerPanel.jsx'
import DiscoveryPanel from './components/DiscoveryPanel.jsx'
import GuidedFlow from './components/GuidedFlow.jsx'
import OnboardingOverlay from './components/OnboardingOverlay.jsx'
import Footer from './components/Footer.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import { api } from './services/api.js'
import './styles/global.css'

const ONBOARDING_KEY = 'orbitcad.onboarding.dismissed'

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
  const [hasModel, setHasModel] = useState(false)
  const [modelName, setModelName] = useState('')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showDiscovery, setShowDiscovery] = useState(false)
  const [showGuided, setShowGuided] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const dismissed = (() => { try { return localStorage.getItem(ONBOARDING_KEY) === 'true' } catch { return false } })()
    if (!dismissed) setShowOnboarding(true)
  }, [])

  useEffect(() => {
    api.getMe()
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

    api.getProjects()
      .then(data => { if (Array.isArray(data)) setProjects(data) })
      .catch(() => {})
  }, [])

  function dismissOnboarding() {
    try { localStorage.setItem(ONBOARDING_KEY, 'true') } catch {}
    setShowOnboarding(false)
  }

  async function handleGenerate() {
    if (!prompt.trim() || loading) return
    setLoading(true)
    setError('')
    try {
      const result = await api.generate(prompt.trim(), activeId)
      if (result?.project?.id) setActiveId(result.project.id)
      if (result?.project?.name) setModelName(result.project.name)
      if (result?.ok !== false) {
        setHasModel(true)
        try { localStorage.setItem('orbitcad.hasGeneratedModel', 'true') } catch {}
      }
    } catch (err) {
      setError(err.message || 'Generation failed. Please try again.')
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
    setError('')
  }

  async function handleSave() {
    if (!activeId) return
    try {
      await api.saveProject(activeId, { name: projectName })
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleExportStl() {
    try {
      const audit = await api.exportAudit('stl')
      if (!audit.allowed) {
        setError(audit.message || 'Export not available. Check your credits or upgrade.')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleExportStep() {
    try {
      const audit = await api.exportAudit('step')
      if (!audit.allowed) {
        setError(audit.message || 'Export not available. Check your credits or upgrade.')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div id="app">
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
        onUpgrade={() => setError('Upgrade coming soon. Email support@orbitcad.app for early access.')}
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
            onUndo={() => { setPrompt(''); setError('') }}
            onSave={handleSave}
            onOpenDiscovery={() => setShowDiscovery(true)}
            onOpenGuided={() => setShowGuided(true)}
            loading={loading}
            error={error}
            onDismissError={() => setError('')}
          />

          <ViewerPanel
            hasModel={hasModel}
            modelName={modelName}
            onResetView={() => {}}
            onClearModel={handleNewDesign}
            onExportStep={handleExportStep}
            onExportStl={handleExportStl}
            onExportScad={() => setError('OpenSCAD export coming soon.')}
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
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
    </Routes>
  )
}
