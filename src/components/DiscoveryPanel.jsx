import { useState, useMemo, useEffect, useCallback } from 'react'

const CAPABILITIES = [
  { id: 'spur', name: 'Spur Gear', cat: 'gears', icon: '⚙️', desc: 'Straight-tooth gear for parallel shafts.', prompt: 'Create spur gear module 2 teeth 20 face width 8' },
  { id: 'helical', name: 'Helical Gear', cat: 'gears', icon: '🔩', desc: 'Angled-tooth gear for smoother meshing.', prompt: 'Create helical gear module 2 teeth 30 face width 20 helix 20' },
  { id: 'bevel', name: 'Bevel Gear', cat: 'gears', icon: '🔧', desc: 'Conical gear for intersecting shafts.', prompt: 'Create bevel gear module 2 teeth 24 face width 12' },
  { id: 'herringbone', name: 'Herringbone Gear', cat: 'gears', icon: '⚙️', desc: 'Opposed helices that balance axial thrust.', prompt: 'Create herringbone gear module 2 teeth 30 face width 20' },
  { id: 'planetary', name: 'Planetary Gearbox', cat: 'drives', icon: '🌍', desc: 'Compact sun, planet, and ring gear system.', prompt: 'Create planetary gearbox module 2 sun 18 planets 3 ring 54 face width 8' },
  { id: 'worm', name: 'Worm Drive', cat: 'drives', icon: '🔄', desc: 'Compact high-ratio right-angle drive.', prompt: 'Create worm drive module 2 worm starts 1 wheel teeth 40 face width 16' },
  { id: 'rack', name: 'Rack and Pinion', cat: 'drives', icon: '📐', desc: 'Rotary-to-linear conversion.', prompt: 'Create rack and pinion module 2 pinion teeth 24 face width 12 rack length 120' },
  { id: 'cycloidal', name: 'Cycloidal Drive', cat: 'drives', icon: '🔁', desc: 'High-reduction cycloidal disk drive.', prompt: 'Create cycloidal drive ring pins 11 disk radius 40 eccentricity 1.5 thickness 10' },
  { id: 'harmonic', name: 'Harmonic Drive', cat: 'drives', icon: '〰️', desc: 'Strain-wave gearing, ultra-high ratio.', prompt: 'Create harmonic drive pitch diameter 50 teeth 100 wall thickness 2.5 length 40' },
  { id: 'propeller', name: 'Propeller', cat: 'props', icon: '🛩️', desc: '3D-printed drone or aircraft propeller.', prompt: 'Create 3 blade propeller diameter 127 pitch 127 blade profile naca_4412' },
  { id: 'bearing', name: 'Ball Bearing', cat: 'other', icon: '⭕', desc: 'Standard bearing envelope by designation.', prompt: 'Create bearing 608' },
  { id: 'shaft', name: 'Shaft', cat: 'other', icon: '📏', desc: 'Cylindrical power-transmission member.', prompt: 'Create shaft diameter 12 length 80' },
  { id: 'housing', name: 'Gear Housing', cat: 'other', icon: '🏠', desc: 'Protective enclosure for drive components.', prompt: 'Create gear housing diameter 80 width 30' },
  { id: 'sprocket', name: 'Chain Sprocket', cat: 'other', icon: '⛓️', desc: 'Toothed wheel for roller-chain transmission.', prompt: 'Create chain sprocket #40 teeth 24 width 8' },
  { id: 'pulley', name: 'Timing Pulley', cat: 'other', icon: '🎡', desc: 'Profiled pulley for synchronous belts.', prompt: 'Create timing pulley 30 teeth pitch 5 width 15' },
]

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'gears', label: 'Gears' },
  { id: 'props', label: 'Propellers' },
  { id: 'drives', label: 'Drive systems' },
  { id: 'other', label: 'Other parts' },
]

// Task 4 — 300ms debounce hook
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function DiscoveryPanel({ onClose, onSelect }) {
  const [filter, setFilter] = useState('all')
  const [searchRaw, setSearchRaw] = useState('')
  const search = useDebounce(searchRaw, 300)

  // Task 4 — memoized filtered list
  const visible = useMemo(() => {
    const q = search.toLowerCase()
    return CAPABILITIES.filter(c => {
      const matchesCat = filter === 'all' || c.cat === filter
      const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
      return matchesCat && matchesSearch
    })
  }, [filter, search])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div id="discoveryOverlay" role="dialog" aria-modal="true" aria-label="What can OrbitCAD make?">
      <div className="discovery-head">
        <h2>What can OrbitCAD make?</h2>
        <button className="ghost" style={{ padding: '8px 16px' }} onClick={onClose}>✕ Close</button>
      </div>

      <div className="discovery-filter-bar">
        <input
          type="search"
          placeholder="Search capabilities…"
          value={searchRaw}
          onChange={e => setSearchRaw(e.target.value)}
          autoFocus
          style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #242B36', background: '#0d1117', color: '#f1f5f9', fontSize: 13, outline: 'none', minWidth: 160 }}
        />
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={`cap-chip${filter === f.id ? ' active' : ''}`}
            type="button"
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="discovery-grid">
        {visible.map(cap => (
          <button
            key={cap.id}
            className="discovery-card"
            type="button"
            onClick={() => { onSelect(cap.prompt); onClose() }}
            style={{ border: 'none', width: '100%', textAlign: 'left' }}
          >
            <div className="dc-icon">{cap.icon}</div>
            <strong>{cap.name}</strong>
            <span>{cap.desc}</span>
          </button>
        ))}
        {visible.length === 0 && (
          <p style={{ color: '#9ca3af', fontSize: 13, gridColumn: '1/-1', margin: 0 }}>No capabilities match your search.</p>
        )}
      </div>
    </div>
  )
}
