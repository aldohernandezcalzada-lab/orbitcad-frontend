import { useState } from 'react'

const CATEGORIES = [
  { id: 'gears', label: 'Gears', desc: 'Spur, helical, bevel, planetary…', icon: '⚙️' },
  { id: 'drives', label: 'Drive systems', desc: 'Worm, cycloidal, harmonic…', icon: '🔄' },
  { id: 'props', label: 'Propellers', desc: 'Drone or aircraft blades', icon: '🛩️' },
  { id: 'other', label: 'Machine elements', desc: 'Shafts, bearings, housings…', icon: '🔧' },
]

const TYPES = {
  gears: [
    { label: 'Spur gear', desc: 'Parallel shafts', prompt: 'Create spur gear module 2 teeth 20 face width 8' },
    { label: 'Helical gear', desc: 'Smoother meshing', prompt: 'Create helical gear module 2 teeth 30 face width 20 helix 20' },
    { label: 'Bevel gear', desc: 'Intersecting shafts', prompt: 'Create bevel gear module 2 teeth 24 face width 12' },
    { label: 'Planetary gearbox', desc: 'Compact, high ratio', prompt: 'Create planetary gearbox module 2 sun 18 planets 3 ring 54 face width 8' },
  ],
  drives: [
    { label: 'Worm drive', desc: 'Right angle, high ratio', prompt: 'Create worm drive module 2 worm starts 1 wheel teeth 40 face width 16' },
    { label: 'Rack and pinion', desc: 'Linear motion', prompt: 'Create rack and pinion module 2 pinion teeth 24 face width 12 rack length 120' },
    { label: 'Cycloidal drive', desc: 'Compact, precise', prompt: 'Create cycloidal drive ring pins 11 disk radius 40 eccentricity 1.5 thickness 10' },
    { label: 'Harmonic drive', desc: 'Zero-backlash', prompt: 'Create harmonic drive pitch diameter 50 teeth 100 wall thickness 2.5 length 40' },
  ],
  props: [
    { label: '3-blade propeller', desc: 'NACA 4412 airfoil', prompt: 'Create 3 blade propeller diameter 127 pitch 127 blade profile naca_4412' },
    { label: '2-blade propeller', desc: 'High efficiency', prompt: 'Create 2 blade propeller diameter 200 pitch 150' },
  ],
  other: [
    { label: 'Shaft', desc: 'Cylindrical, with keyway', prompt: 'Create shaft diameter 12 length 80' },
    { label: 'Ball bearing', desc: 'By designation', prompt: 'Create bearing 608' },
    { label: 'Gear housing', desc: 'Enclosure', prompt: 'Create gear housing diameter 80 width 30' },
    { label: 'Chain sprocket', desc: 'Roller chain', prompt: 'Create chain sprocket #40 teeth 24 width 8' },
  ],
}

export default function GuidedFlow({ onClose, onUsePrompt }) {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState(null)
  const [draftPrompt, setDraftPrompt] = useState('')

  function pickCategory(cat) {
    setCategory(cat)
    setStep(2)
  }

  function pickType(type) {
    setDraftPrompt(type.prompt)
    setStep(3)
  }

  function handleUse() {
    onUsePrompt(draftPrompt)
    onClose()
  }

  return (
    <div id="guidedFlow" role="dialog" aria-modal="true" aria-label="Design assistant">
      <div className="guided-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>Design assistant</span>
          <button className="ghost" style={{ padding: '6px 12px', fontSize: 13 }} onClick={onClose}>✕</button>
        </div>

        {step === 1 && (
          <div className="guided-step active">
            <h3>What do you want to make?</h3>
            <div className="guided-options">
              {CATEGORIES.map(cat => (
                <button key={cat.id} className="guided-opt" type="button" onClick={() => pickCategory(cat.id)}>
                  <strong>{cat.icon} {cat.label}</strong>
                  <span>{cat.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && category && (
          <div className="guided-step active">
            <h3>Choose a type</h3>
            <div className="guided-options">
              {(TYPES[category] || []).map(type => (
                <button key={type.label} className="guided-opt" type="button" onClick={() => pickType(type)}>
                  <strong>{type.label}</strong>
                  <span>{type.desc}</span>
                </button>
              ))}
            </div>
            <div className="guided-nav">
              <button className="ghost" style={{ fontSize: 13, padding: '8px 14px' }} onClick={() => setStep(1)}>← Back</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="guided-step active">
            <h3>Ready to generate</h3>
            <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 14px' }}>Edit this prompt freely, then hit Generate.</p>
            <textarea
              rows={4}
              value={draftPrompt}
              onChange={e => setDraftPrompt(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', padding: 12, borderRadius: 12, border: '1px solid #242B36', background: '#0d1117', color: '#f1f5f9', fontSize: 14, resize: 'vertical', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button className="ghost" style={{ fontSize: 13, padding: '10px 16px' }} onClick={() => setStep(2)}>← Back</button>
              <button className="primary" style={{ flex: 1, padding: 10 }} onClick={handleUse}>Use this prompt →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
