import { useState, useMemo, useEffect } from 'react'
import { CAPABILITIES } from '../data/capabilities.js'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'gears', label: 'Gears', cats: ['gears'] },
  { id: 'drives', label: 'Drive Systems', cats: ['gear systems'] },
  { id: 'transmission', label: 'Transmission', cats: ['power transmission'] },
  { id: 'machine', label: 'Machine Parts', cats: ['machine elements', 'structures', 'assemblies'] },
  { id: 'drone', label: 'Drone & Props', cats: ['drone_fpv', 'drone_propv'] },
  { id: 'robotics', label: 'Robotics', cats: ['robotics_arm'] },
]

function capIcon(cap) {
  const { category, id } = cap
  if (category === 'drone_propv' || id.startsWith('drone-propeller')) return '✈️'
  if (category === 'drone_fpv') return '🚁'
  if (category === 'robotics_arm') return '🦾'
  if (id === 'bearing' || id === 'pillow-block') return '⭕'
  if (id === 'shaft' || id === 'lead-screw' || id === 'ball-screw' || id === 'linear-rail') return '📏'
  if (id === 'housing' || id === 'motor-mount') return '📦'
  return '⚙️'
}

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

  const visible = useMemo(() => {
    const q = search.toLowerCase()
    const filterDef = FILTERS.find(f => f.id === filter)
    return CAPABILITIES.filter(cap => {
      const matchesCat = filter === 'all' || (filterDef?.cats || []).includes(cap.category)
      const matchesSearch = !q
        || cap.displayName.toLowerCase().includes(q)
        || cap.description.toLowerCase().includes(q)
        || cap.category.toLowerCase().includes(q)
      return matchesCat && matchesSearch
    })
  }, [filter, search])

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
            onClick={() => { onSelect(cap.defaultPrompt); onClose() }}
            style={{ border: 'none', width: '100%', textAlign: 'left' }}
          >
            <div className="dc-icon">{capIcon(cap)}</div>
            <strong>{cap.displayName}</strong>
            <span>{cap.description}</span>
          </button>
        ))}
        {visible.length === 0 && (
          <p style={{ color: '#9ca3af', fontSize: 13, gridColumn: '1/-1', margin: 0 }}>No capabilities match your search.</p>
        )}
      </div>
    </div>
  )
}
