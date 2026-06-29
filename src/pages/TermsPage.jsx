import { Link } from 'react-router-dom'

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px', color: 'var(--text)', fontFamily: 'Inter,system-ui,sans-serif' }}>
      <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 13 }}>← Back to OrbitCAD</Link>
      <h1 style={{ fontSize: 32, marginTop: 24, marginBottom: 8, color: '#eef4f5' }}>Terms of Service</h1>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 32 }}>Last updated: June 2025</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>1. Acceptance</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          By using OrbitCAD you agree to these terms. If you do not agree, do not use the service.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>2. Beta service</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          OrbitCAD is in beta. Features may change without notice. Generated geometry is provided for evaluation and
          prototyping purposes only. You are responsible for verifying all dimensions, tolerances, and engineering
          calculations before manufacturing any part.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>3. Intellectual property</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          You own the CAD files you generate. OrbitCAD retains rights to the geometry engine and software.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>4. Payments and refunds</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          One-time export credits and subscriptions are processed by Stripe. Export credits are non-refundable once used.
          Subscription cancellations take effect at the end of the current billing period.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>5. Limitation of liability</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          OrbitCAD is provided "as is" without warranties of any kind. We are not liable for any damages arising from
          use of generated geometry in manufactured parts.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 18, color: '#eef4f5', marginBottom: 12 }}>6. Contact</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
          Questions? Email <a href="mailto:support@orbitcad.app" style={{ color: 'var(--accent)' }}>support@orbitcad.app</a>.
        </p>
      </section>
    </div>
  )
}
