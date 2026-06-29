import { useState } from 'react'
import { Link } from 'react-router-dom'

const EXAMPLE_PROMPTS = [
  { name: 'Spur Gear', desc: '20 teeth, module 2', prompt: 'Create spur gear module 2 teeth 20 face width 8' },
  { name: 'Planetary Gearbox', desc: '4:1 ratio, module 2', prompt: 'Create planetary gearbox module 2 sun 18 planets 3 ring 54 face width 8' },
  { name: '3-Blade Propeller', desc: '5 inch, NACA 4412', prompt: 'Create 3 blade propeller diameter 127 pitch 127 blade profile naca_4412' },
  { name: 'Ball Bearing 608', desc: '8mm bore standard', prompt: 'Create bearing 608' },
  { name: 'Worm Drive', desc: 'Module 2, 40:1 ratio', prompt: 'Create worm drive module 2 worm starts 1 wheel teeth 40 face width 16' },
  { name: 'Shaft', desc: 'Ø12mm × 80mm', prompt: 'Create shaft diameter 12 length 80' },
]

export default function Header({ projects, activeId, tier, usedSlots, stlCredits, stepCredits, onNewDesign, onSelectProject, onUpgrade, onPromptClick, sidebarOpen, onMenuToggle }) {
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
          <small>Production, beta &amp; roadmap</small>
        </summary>
        <div className="cap-search-wrap">
          <input type="search" placeholder="Search capabilities…" autoComplete="off" aria-label="Search capabilities" />
          <div className="cap-filter-chips">
            <button className="cap-chip active" type="button">All</button>
            <button className="cap-chip" type="button">Ready</button>
            <button className="cap-chip" type="button">Beta</button>
          </div>
        </div>
        <div className="prompt-gallery-grid">
          {EXAMPLE_PROMPTS.map(ex => (
            <button key={ex.name} className="prompt-card" type="button" onClick={() => onPromptClick(ex.prompt)}>
              <div className="prompt-card-head">
                <strong>{ex.name}</strong>
                <span className="capability-status capability-status-production">ready</span>
              </div>
              <span>{ex.desc}</span>
            </button>
          ))}
        </div>
      </details>

      <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(125,184,214,.12)', fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy</Link>
        <Link to="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms</Link>
      </div>
    </aside>
  )
}
