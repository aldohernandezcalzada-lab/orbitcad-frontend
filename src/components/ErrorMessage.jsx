export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null
  return (
    <div
      style={{
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
      }}
      role="alert"
    >
      <span style={{ flex: 1 }}>{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{ background: 'transparent', border: 0, color: 'var(--muted)', padding: '0 4px', fontSize: 16, lineHeight: 1, cursor: 'pointer', transform: 'none' }}
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  )
}
