import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CAPABILITIES } from '../data/capabilities.js'

const GALLERY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'gears', label: 'Gears', cats: ['gears', 'gear systems'] },
  { id: 'parts', label: 'Parts', cats: ['power transmission', 'machine elements', 'structures', 'assemblies'] },
  { id: 'drone', label: 'Drone', cats: ['drone_fpv', 'drone_propv'] },
  { id: 'robotics', label: 'Robotics', cats: ['robotics_arm'] },
]

export default function Header({ projects, activeId, tier, usedSlots, stlCredits, stepCredits, onNewDesign, onSelectProject, onUpgrade, onPromptClick, sidebarOpen, onMenuToggle }) {
  const [gallerySearch, setGallerySearch] = useState('')
  const [galleryFilter, setGalleryFilter] = useState('all')

  const visibleCaps = useMemo(() => {
    const q = gallerySearch.trim().toLowerCase()
    const filterDef = GALLERY_FILTERS.find(f => f.id === galleryFilter)
    return CAPABILITIES.filter(cap => {
      const matchesCat = galleryFilter === 'all' || (filterDef?.cats || []).includes(cap.category)
      const matchesSearch = !q
        || cap.displayName.toLowerCase().includes(q)
        || cap.description.toLowerCase().includes(q)
      return matchesCat && matchesSearch
    })
  }, [gallerySearch, galleryFilter])

  return (
    <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
      <div className="brand">
        <div className="logo">◎</div>
        <div>
          <h1>OrbitCAD</h1>
          <p>AI-assisted mechanical CAD</p>
          <p className="brand-tagline">Anyone can build and engineer.</p>
        </div>
      </div>

      <div className="tier product-status" aria-label="CAD runtime status">
        <strong><span className="status-dot" aria-hidden="true" />CAD runtime online</strong>
        <span>STEP and STL export ready</span>
      </div>

      <button className="primary full" onClick={onNewDesign}>New design</button>

      <div className="tier">
        <span>{tier}</span>
        <strong><span>{usedSlots}</span>/5 projects</strong>
      </div>

      <h2>Project History</h2>
      <div className="project-list">
        {projects.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>No projects yet. Generate your first part!</p>
        )}
        {projects.map(p => (
          <button
            key={p.id}
            className={`project-item${p.id === activeId ? ' active' : ''}`}
            onClick={() => onSelectProject(p.id)}
          >
            <strong style={{ display: 'block', fontSize: 13 }}>{p.name || 'Untitled'}</strong>
            <small>{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : ''}</small>
          </button>
        ))}
      </div>

      <button className="ghost full" onClick={onUpgrade}>Upgrade storage</button>

      <details className="prompt-gallery">
        <summary>
          <span>What OrbitCAD Can Generate</span>
          <small>{CAPABILITIES.length} production parts</small>
        </summary>
        <div className="cap-search-wrap">
          <input
            type="search"
            placeholder="Search capabilities…"
            autoComplete="off"
            aria-label="Search capabilities"
            value={gallerySearch}
            onChange={e => setGallerySearch(e.target.value)}
          />
          <div className="cap-filter-chips">
            {GALLERY_FILTERS.map(f => (
              <button
                key={f.id}
                className={`cap-chip${galleryFilter === f.id ? ' active' : ''}`}
                type="button"
                onClick={() => setGalleryFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="prompt-gallery-grid">
          {visibleCaps.map(cap => (
            <button
              key={cap.id}
              className="prompt-card"
              type="button"
              onClick={() => onPromptClick(cap.defaultPrompt)}
            >
              <div className="prompt-card-head">
                <strong>{cap.displayName}</strong>
                <span className="capability-status capability-status-production">ready</span>
              </div>
              <span>{cap.description}</span>
            </button>
          ))}
          {visibleCaps.length === 0 && (
            <p style={{ color: 'var(--muted)', fontSize: 12, margin: 0 }}>No results.</p>
          )}
        </div>
      </details>

      <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(125,184,214,.12)', fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy</Link>
        <Link to="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms</Link>
      </div>
    </aside>
  )
}
