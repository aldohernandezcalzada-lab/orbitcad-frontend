const STYLES = {
  base: {
    border: '1px solid rgba(232,112,112,.55)',
    borderLeft: '3px solid #e87070',
    borderRadius: 8,
    background: 'linear-gradient(180deg,rgba(12,18,27,.96),rgba(6,10,16,.96))',
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    fontSize: 13,
    color: '#f4b0ae',
    animation: 'ocFadeIn 200ms ease-out both',
  },
  info: {
    borderColor: 'rgba(125,184,214,.42)',
    borderLeftColor: 'var(--accent)',
    color: '#c9e4ef',
  },
}

export default function ErrorMessage({ message, code, onDismiss, onOpenDiscovery }) {
  if (!message) return null

  const isNetwork = message === 'network_error' || code === 'NETWORK_ERROR'
  const isUnsupported = message === 'UNSUPPORTED_COMPONENT' || code === 'UNSUPPORTED_COMPONENT'

  let display
  if (isNetwork) {
    display = "Can't reach OrbitCAD right now. Check your connection and try again."
  } else if (isUnsupported) {
    display = (
      <>
        That component isn&apos;t supported yet.{' '}
        {onOpenDiscovery && (
          <button
            type="button"
            onClick={onOpenDiscovery}
            style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontSize: 'inherit' }}
          >
            See what we can make →
          </button>
        )}
      </>
    )
  } else {
    display = message
  }

  const style = isNetwork
    ? { ...STYLES.base, ...STYLES.info }
    : STYLES.base

  return (
    <div style={style} role="alert">
      <span style={{ flex: 1 }}>{display}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{ background: 'transparent', border: 0, color: 'var(--muted)', padding: '0 4px', fontSize: 16, lineHeight: 1, cursor: 'pointer', transform: 'none', flexShrink: 0 }}
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  )
}
