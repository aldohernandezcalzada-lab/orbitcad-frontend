import { useState, useMemo } from 'react'
import ErrorMessage from './ErrorMessage.jsx'
import { client } from '../api/client.js'

// Task 6.4 — engineering keyword check
const ENGINEERING_RE = /\b(gear|spur|helical|bevel|planetary|worm|harmonic|cycloidal|hypoid|herringbone|differential|sprocket|pulley|coupling|bearing|shaft|keyway|bushing|housing|retaining|propeller|prop|blade|hex|standoff|flange|bracket|actuator|screw|thread|fastener|beam|rod|tube|cylinder|module|teeth|diameter|length|pitch|width|bore|radius|tooth|face|helix|pressure|plate|arm|link|joint|gripper|mount|rack|pinion|drive|gearbox|spindle|bushing|collar|sleeve|washer|spacer)\b|[0-9]+\s*(mm|cm|inch|in\b)|m[0-9]|t[0-9]{1,3}/i

function isEngineeringPrompt(text) {
  return ENGINEERING_RE.test(text.trim())
}

const EXAMPLES = {
  gears: [
    { label: 'Spur gear 24T M2', desc: '20° pressure angle', prompt: 'Spur gear 24 teeth module 2 face width 10' },
    { label: 'Helical gear 30T', desc: 'Module 2, 20° helix', prompt: 'Helical gear module 2 teeth 30 face width 20 helix 20' },
    { label: 'Bevel gear M2 24T', desc: 'Intersecting shafts', prompt: 'Create bevel gear module 2 teeth 24 face width 12' },
    { label: 'Herringbone gear', desc: '30T, balanced thrust', prompt: 'Create herringbone gear module 2 teeth 30 face width 20' },
  ],
  propellers: [
    { label: '3-blade prop 5"', desc: 'NACA 4412 airfoil', prompt: 'Create 3 blade propeller diameter 127 pitch 127 blade profile naca_4412' },
    { label: '2-blade prop 8"', desc: 'High pitch', prompt: 'Create 2 blade propeller diameter 200 pitch 150' },
  ],
  bearings: [
    { label: 'Bearing 608', desc: '8mm bore standard', prompt: 'Create bearing 608' },
    { label: 'Bearing 6205', desc: '25mm bore', prompt: 'Create bearing 6205' },
    { label: 'Pillow block Ø25', desc: 'UCF style housing', prompt: 'Create pillow block bore diameter 25' },
  ],
  shafts: [
    { label: 'Shaft Ø12 × 80mm', desc: 'Smooth cylinder', prompt: 'Create shaft diameter 12 length 80' },
    { label: 'Shaft with keyway', desc: 'Ø25, 50Nm torque', prompt: 'Create shaft keyway diameter 25 torque 50Nm key length 40' },
    { label: 'Spline shaft', desc: '24 teeth, M2', prompt: 'Create spline shaft and hub teeth 24 module 2 pressure angle 30 face width 40 torque 50Nm' },
  ],
  drives: [
    { label: 'Planetary gearbox', desc: '4:1 ratio, module 2', prompt: 'Create planetary gearbox module 2 sun 18 planets 3 ring 54 face width 8' },
    { label: 'Worm drive 40:1', desc: 'Module 2, right angle', prompt: 'Create worm drive module 2 worm starts 1 wheel teeth 40 face width 16' },
    { label: 'Rack and pinion', desc: 'Module 2, 24T pinion', prompt: 'Create rack and pinion module 2 pinion teeth 24 face width 12 rack length 120' },
    { label: 'Cycloidal drive', desc: '10:1, ring 11 pins', prompt: 'Create cycloidal drive ring pins 11 disk radius 40 eccentricity 1.5 thickness 10' },
  ],
  advanced: [
    { label: 'Harmonic drive', desc: 'Strain-wave, Ø50', prompt: 'Create harmonic drive pitch diameter 50 teeth 100 wall thickness 2.5 length 40' },
    { label: 'Hypoid gear pair', desc: 'Offset bevel, M2', prompt: 'Create hypoid gear module 2 gear teeth 40 pinion teeth 10 pitch angle 45 face width 20' },
    { label: 'Differential', desc: 'Open bevel, M2', prompt: 'Create differential gear module 2 ring teeth 40 pinion teeth 10 face width 14' },
    { label: 'Multi-stage 4×5', desc: '2-stage, M2', prompt: 'Create multi-stage gearbox 2 stages module 2 face width 20 stage1 ratio 4 stage2 ratio 5' },
  ],
}

const TABS = ['gears', 'propellers', 'bearings', 'shafts', 'drives', 'advanced']

export default function GeneratorPanel({
  prompt, setPrompt,
  onGenerate, onUndo, onSave,
  onOpenDiscovery, onOpenGuided,
  loading, error, errorCode,
  onDismissError,
}) {
  const [activeTab, setActiveTab] = useState('gears')
  const [promoCode, setPromoCode] = useState('')
  const [promoMsg, setPromoMsg] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)
  const [showBanner, setShowBanner] = useState(true)

  // Task 6.4 — pre-flight check surfaces inline hint, not a hard block
  const showEngHint = prompt.trim().length > 10 && !isEngineeringPrompt(prompt)

  const currentExamples = useMemo(() => EXAMPLES[activeTab] || [], [activeTab])

  async function handleRedeem() {
    const code = promoCode.trim()
    if (!code || promoLoading) return
    setPromoLoading(true)
    setPromoMsg('')
    try {
      const data = await client.redeemCode(code)
      setPromoMsg(data.message || 'Code applied! Your credits have been added.')
    } catch (err) {
      setPromoMsg(err.message || 'Invalid code. Check for typos and try again.')
    } finally {
      setPromoLoading(false)
    }
  }

  return (
    <section className="panel prompt-panel">
      <h2>Describe your part</h2>
      <p className="hint">
        Type what you want to build — OrbitCAD generates real 3D geometry.{' '}
        <strong>No CAD experience needed.</strong>
      </p>

      {showBanner && (
        <div className="onboarding-banner" role="status">
          <span>👇 Pick an example below or type your own part description</span>
          <button type="button" aria-label="Dismiss tip" onClick={() => setShowBanner(false)}>×</button>
        </div>
      )}

      <textarea
        id="prompt"
        rows={6}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder={'Examples:\n• 3 blade drone propeller 5 inch\n• Spur gear 24 teeth module 2\n• Bearing 608\n• Shaft diameter 20 length 100\n• Planetary gearbox sun 18 planet 18 ring 54'}
        onKeyDown={e => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            onGenerate()
          }
        }}
      />

      {/* Task 6.4 — non-engineering prompt hint */}
      {showEngHint && (
        <p style={{ fontSize: 12, color: 'var(--amber)', margin: '4px 0 0', lineHeight: 1.4 }}>
          Try describing a mechanical part — for example, &ldquo;a 6-tooth spur gear&rdquo; or &ldquo;a 30mm hex standoff&rdquo;.
        </p>
      )}

      <div className="example-section">
        <div className="example-cat-tabs" role="tablist" aria-label="Example categories">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`example-cat-tab${activeTab === tab ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="plain-examples-scroll">
          {currentExamples.map(ex => (
            <button
              key={ex.label}
              className="plain-example-card"
              type="button"
              onClick={() => setPrompt(ex.prompt)}
            >
              <strong>{ex.label}</strong>
              <span>{ex.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="guided-shortcuts">
        <button type="button" className="ghost" onClick={onOpenDiscovery}>🔍 What can I make?</button>
        <button type="button" className="ghost" onClick={onOpenGuided}>✨ Help me design</button>
      </div>

      <div className="actions">
        <button
          id="generateBtn"
          className="primary"
          style={{ fontSize: 18, padding: '14px 28px' }}
          onClick={onGenerate}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="spinner" aria-hidden="true" />
              Generating…
            </span>
          ) : '⚙️ Generate / Refine'}
        </button>
        <button className="ghost" onClick={onUndo} disabled={loading}>Undo</button>
        <button className="ghost" onClick={onSave} disabled={loading}>Save</button>
      </div>

      <div className="promo-inline-section">
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#60a5fa', fontWeight: 600 }}>🎟️ Have a tester or promo code?</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            placeholder="Enter code e.g. TESTER-ABC123"
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRedeem()}
            style={{ flex: 1, padding: '10px 12px', borderRadius: 10, border: '1px solid #1e3a5f', background: '#111827', color: '#f9fafb', fontSize: 14, outline: 'none' }}
          />
          <button
            className="primary"
            style={{ whiteSpace: 'nowrap', padding: '10px 16px' }}
            onClick={handleRedeem}
            disabled={promoLoading}
          >
            {promoLoading ? '…' : 'Redeem'}
          </button>
        </div>
        {promoMsg && (
          <p style={{ fontSize: 13, margin: '6px 0 0', color: promoMsg.includes('applied') ? 'var(--ok)' : '#9ca3af' }}>
            {promoMsg}
          </p>
        )}
      </div>

      <h3>Design checks</h3>
      <ErrorMessage
        message={error}
        code={errorCode}
        onDismiss={onDismissError}
        onOpenDiscovery={onOpenDiscovery}
      />
      <div id="feedback" className="feedback" />
    </section>
  )
}
