import { useEffect, useRef } from 'react'
import { BASE_URL } from '../api/client.js'

const STARTER_PROMPTS = [
  { label: 'Spur Gear', prompt: 'Generate a standard spur gear with 20 teeth, module 2, 20° pressure angle' },
  { label: 'Planetary', prompt: 'Generate a planetary gearbox with a sun gear, 3 planet gears, and a ring gear, 4:1 ratio' },
  { label: 'Propeller', prompt: 'Create 3 blade propeller diameter 127 pitch 127 blade profile naca_4412' },
  { label: 'Hyperboloidal', prompt: 'Create hyperboloidal gear module 2 teeth 20 face width 25' },
]

const SESSION_KEY = 'orbitcad.lastModel'

// Task 6.1 — persist/restore model state across refreshes
export function saveModelToSession(data) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(data)) } catch {}
}

export function loadModelFromSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearModelSession() {
  try { sessionStorage.removeItem(SESSION_KEY) } catch {}
}

export default function ViewerPanel({
  hasModel, modelName, artifacts,
  onResetView, onClearModel,
  onExportStep, onExportStl, onExportScad,
  onStarterPrompt,
}) {
  const prevHasModel = useRef(false)
  const modelInfoRef = useRef(null)

  // Entrance animation when model first appears
  useEffect(() => {
    if (hasModel && !prevHasModel.current && modelInfoRef.current) {
      modelInfoRef.current.classList.add('model-loaded')
    }
    prevHasModel.current = hasModel
  }, [hasModel])

  // Task 6.1 — derive export-ready artifacts
  const stlArtifact = artifacts?.find(a => a.format === 'STL' && a.exportReady)
  const stepArtifact = artifacts?.find(a => a.format === 'STEP' && a.exportReady)

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
        <div ref={modelInfoRef} className="model-status-bar">
          <span style={{ color: 'var(--ok)' }}>✓</span>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {modelName || 'Model generated'}
          </span>
          {/* Task 5 — STEP/STL download links when artifacts are ready */}
          {(stlArtifact || stepArtifact) && (
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              {stlArtifact && (
                <a
                  href={`${BASE_URL}/api/mark3/export/stl`}
                  target="_blank"
                  rel="noreferrer"
                  className="model-download-link"
                >
                  ⬇ STL
                </a>
              )}
              {stepArtifact && (
                <a
                  href={`${BASE_URL}/api/mark3/export/step`}
                  target="_blank"
                  rel="noreferrer"
                  className="model-download-link model-download-link--step"
                >
                  ⬇ STEP
                </a>
              )}
            </div>
          )}
          {!stlArtifact && !stepArtifact && (
            <span style={{ color: 'var(--muted)', fontSize: 11 }}>Use Export buttons above to download</span>
          )}
        </div>
      )}
    </section>
  )
}
