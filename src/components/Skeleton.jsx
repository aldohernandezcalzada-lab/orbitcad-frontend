export function SkeletonText({ lines = 3, width = '100%' }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton skeleton-text"
          style={{ width: i === lines - 1 ? '60%' : width }}
        />
      ))}
    </div>
  )
}

export function SkeletonRect({ height = 40, width = '100%' }) {
  return <div className="skeleton skeleton-rect" style={{ height, width }} />
}

export function SkeletonPanel() {
  return (
    <div style={{ padding: 16, display: 'grid', gap: 16 }}>
      <SkeletonText lines={2} />
      <SkeletonRect height={120} />
      <div style={{ display: 'flex', gap: 8 }}>
        <SkeletonRect height={36} width={90} />
        <SkeletonRect height={36} width={60} />
        <SkeletonRect height={36} width={60} />
      </div>
    </div>
  )
}
