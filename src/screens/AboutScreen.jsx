import { useEffect } from 'react'

// ISI SENDIRI: ubah teks di bagian "value"
const INFO = [
  { label: 'MADE BY', value: 'Mohd. Rafiif Albani' },
  { label: 'NIM', value: '4243250036' },
  { label: 'CLASS', value: 'PSIK24-A' },
  { label: 'MADE FOR', value: 'TUGAS PROJECT 1' },
  { label: 'SUBJECT', value: 'PEMROGRAMAN WEB MODERN' },
  { label: 'LECTURER', value: 'Insan Taufik, S.Kom., M.Kom' },
]

function AboutScreen({ onBack }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onBack])

  return (
    <div className="about">
      <h1 className="game-title small">ABOUT</h1>

      <dl className="about-list">
        {INFO.map((item) => (
          <div className="about-row" key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <button type="button" className="pixel-btn alt" onClick={onBack}>
        BACK
      </button>
    </div>
  )
}

export default AboutScreen