const ONBOARDING_EXAMPLES = [
  { name: 'Drone propeller', desc: '3-blade, 5 inch, NACA 4412', prompt: '3 blade drone propeller 5 inch' },
  { name: 'Spur gear', desc: '24 teeth, module 2', prompt: 'Spur gear 24 teeth module 2' },
  { name: 'Planetary gearbox', desc: '4:1 ratio, 3 planets', prompt: 'Planetary gearbox 4:1 ratio 3 planets' },
  { name: 'Ball bearing 608', desc: '8mm bore, standard', prompt: 'Bearing 608' },
]

export default function OnboardingOverlay({ onDismiss, onExampleClick }) {
  return (
    <div id="onboardingOverlay" role="dialog" aria-modal="true" aria-label="Welcome to OrbitCAD">
      <div className="onboarding-card">
        <div style={{ fontSize: 42, marginBottom: 14 }}>◎</div>
        <h2>Anyone can build and engineer.</h2>
        <p>
          OrbitCAD turns plain English into real 3D CAD files — STEP and STL.
          No experience needed. Just describe what you want.
        </p>
        <div className="onboarding-examples">
          {ONBOARDING_EXAMPLES.map(ex => (
            <button
              key={ex.name}
              className="onboarding-example"
              type="button"
              style={{ border: '1px solid #242B36', borderRadius: 12, padding: '12px 14px', background: '#0d1117', cursor: 'pointer', textAlign: 'left' }}
              onClick={() => { onExampleClick(ex.prompt); onDismiss(); }}
            >
              <strong>{ex.name}</strong>
              <span>{ex.desc}</span>
            </button>
          ))}
        </div>
        <button className="onboarding-dismiss" onClick={onDismiss}>
          Start designing →
        </button>
      </div>
    </div>
  )
}
