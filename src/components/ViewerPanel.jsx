const STARTER_PROMPTS = [
  { label: 'Spur Gear', prompt: 'Generate a standard spur gear with 20 teeth, module 2, 20° pressure angle' },
  { label: 'Planetary', prompt: 'Generate a planetary gearbox with a sun gear, 3 planet gears, and a ring gear, 4:1 ratio' },
  { label: 'Propeller', prompt: 'Create 3 blade propeller diameter 127 pitch 127 blade profile naca_4412' },
  { label: 'Hyperboloidal', prompt: 'Create hyperboloidal gear module 2 teeth 20 face width 25' },
]

export default function ViewerPanel({ hasModel, modelName, onResetView, onClearModel, onExportStep, onExportStl, onExportScad, onStarterPrompt, stlCredits, stepCredits }) {
  return (
    <section className="panel viewport-panel">
      <div className="viewport-head">
        <h2>3D preview</h2>
        <div className="actions small">
          <button className="ghost" onClick={onResetView}>Reset view</button>
          <button className="ghost" onClick={onClearModel}>Start over</button>
          <button className="ghost" onClick={onExportScad}>Export SCAD</button>
          <button
            className="primary"
            style={{ background: '#2563eb' }}
            onClick={onExportStep}
            data-tooltip="STEP: universal CAD file for Fusion 360, FreeCAD, SolidWorks"
          >
            ⬇ Export STEP
          </button>
          <button
            className="primary"
            style={{ background: '#16a34a' }}
            onClick={onExportStl}
            data-tooltip="STL: mesh file for 3D printing and slicers"
          >
            ⬇ Export STL
          </button>
        </div>
      </div>

      <div className="viewport-stage">
        <canvas
          id="canvas"
          width={900}
          height={600}
          aria-label="3D CAD preview"
          style={{ display: 'block', width: '100%', height: 520, borderRadius: 8, background: 'radial-gradient(circle at center,#17223b,#05070d 78%)', border: '1px solid rgba(125,184,214,.28)' }}
        />

        {!hasModel && (
          <div className="viewer-empty-state">
            <div>
              <h3>Describe a part to get started</h3>
              <p>Generate gears, shafts, bearings, housings, and mechanical assemblies from text.</p>
              <div className="starter-buttons viewer-starters" aria-label="Viewer starter prompts">
                {STARTER_PROMPTS.map(sp => (
                  <button
                    key={sp.label}
                    type="button"
                    className="starter-prompt-btn"
                    onClick={() => onStarterPrompt(sp.prompt)}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {hasModel && (
        <div style={{ marginTop: 12, padding: '10px 12px', background: '#0b111b', border: '1px solid rgba(125,184,214,.22)', borderRadius: 8, fontSize: 12, color: 'var(--muted)' }}>
          <span style={{ color: 'var(--ok)', marginRight: 8 }}>✓</span>
          {modelName || 'Model generated'} — 3D viewer coming soon; use Export to download your file.
        </div>
      )}
    </section>
  )
}
