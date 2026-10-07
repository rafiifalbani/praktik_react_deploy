// Ikon speaker pixel-art. Kalau muted, gelombang diganti tanda silang.
function SpeakerIcon({ muted }) {
  const body = [
    [1, 6, 3, 4],
    [4, 5, 2, 6],
    [6, 4, 2, 8],
    [8, 3, 1, 10],
  ]
  const waves = [
    [11, 6, 1, 4],
    [13, 4, 1, 8],
  ]
  const cross = [
    [10, 5], [11, 6], [12, 7], [13, 8], [14, 9],
    [14, 5], [13, 6], [12, 7], [11, 8], [10, 9],
  ]

  return (
    <svg
      viewBox="0 0 16 16"
      width="22"
      height="22"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {body.map(([x, y, w, h], i) => (
        <rect key={`b${i}`} x={x} y={y} width={w} height={h} fill="currentColor" />
      ))}
      {!muted &&
        waves.map(([x, y, w, h], i) => (
          <rect key={`w${i}`} x={x} y={y} width={w} height={h} fill="currentColor" />
        ))}
      {muted &&
        cross.map(([x, y], i) => (
          <rect key={`c${i}`} x={x} y={y} width="1" height="1" fill="#ff3b3b" />
        ))}
    </svg>
  )
}

function TVFrame({ children, ledColor, muted, onToggleMute }) {
  const handleMute = (e) => {
    e.stopPropagation()
    e.currentTarget.blur()
    onToggleMute()
  }

  return (
    <div className="tv">
      <div className="tv-screen">
        <div className="tv-content">{children}</div>
        <div className="scanlines"></div>
      </div>

      <div className="tv-panel">
        <span className="tv-brand">PIXEL-TRON</span>
        <div className="tv-controls">
          <button
            type="button"
            className={muted ? 'mute-btn is-muted' : 'mute-btn'}
            onClick={handleMute}
            aria-label={muted ? 'Nyalakan suara' : 'Matikan suara'}
            title={muted ? 'Sound off' : 'Sound on'}
          >
            <SpeakerIcon muted={muted} />
          </button>
          <div className="tv-led-group">
            <span className="tv-led-label">POWER</span>
            <span className={`tv-led led-${ledColor}`}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TVFrame