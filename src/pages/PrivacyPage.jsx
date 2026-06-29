import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px', color: 'var(--text)', fontFamily: 'Inter,system-ui,sans-serif' }}>
      <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 13 }}>← Back to OrbitCAD</Link>
      <h1 style={{ fontSize: 32, marginTop: 24, marginBottom: 8, color: '#eef4f5' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 32 }}>Last updated: June 2025</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>What we collect</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          OrbitCAD collects the prompts you submit (to generate CAD models), your account email if you create an account,
          and standard server logs (IP address, timestamp, user agent). We do not collect or store any payment card
          details — payments are handled by Stripe.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>How we use it</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          Your prompts are used solely to generate the requested CAD geometry and are not shared with third parties.
          We may use anonymized, aggregated usage data to improve the OrbitCAD engine.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>Data retention</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          Project data is retained for as long as your account is active. You may delete your account and all associated
          data at any time by contacting us at <a href="mailto:support@orbitcad.app" style={{ color: 'var(--accent)' }}>support@orbitcad.app</a>.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>Cookies</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          We use a single session cookie to keep you signed in. No advertising or tracking cookies are used.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>Contact</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          Questions? Email <a href="mailto:support@orbitcad.app" style={{ color: 'var(--accent)' }}>support@orbitcad.app</a>.
        </p>
      </section>
    </div>
  )
}
