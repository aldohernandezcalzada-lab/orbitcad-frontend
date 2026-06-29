import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="app-footer">
      <span>© {new Date().getFullYear()} OrbitCAD · AI-assisted mechanical CAD</span>
      <div style={{ display: 'flex', gap: 16 }}>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <a href="mailto:support@orbitcad.app">Support</a>
      </div>
    </footer>
  )
}
