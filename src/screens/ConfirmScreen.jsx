import { useState, useEffect } from 'react'
import { play } from '../utils/sound'

const OPTIONS = [
  { label: 'YES', sound: 'hoverYes' },
  { label: 'NO', sound: 'hoverNo' },
]

function ConfirmScreen({ onYes, onNo }) {
  const [index, setIndex] = useState(1) // default di NO

  const moveTo = (next) => {
    if (next === index) return
    play(OPTIONS[next].sound)
    setIndex(next)
  }

  const choose = (i) => (i === 0 ? onYes() : onNo())

  useEffect(() => {
    const handleKey = (e) => {
      if (e.repeat) return

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const next = (index - 1 + OPTIONS.length) % OPTIONS.length
        play(OPTIONS[next].sound)
        setIndex(next)
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const next = (index + 1) % OPTIONS.length
        play(OPTIONS[next].sound)
        setIndex(next)
      } else if (e.key === 'Enter') {
        choose(index)
      } else if (e.key === 'Escape') {
        onNo()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [index, onYes, onNo])

  return (
    <>
      <h1 className="game-title">QUIT GAME?</h1>
      <div className="confirm-options">
        {OPTIONS.map((opt, i) => (
          <span
            key={opt.label}
            className={i === index ? 'menu-item active' : 'menu-item'}
            onMouseEnter={() => moveTo(i)}
            onClick={() => choose(i)}
          >
            <span className="cursor">{i === index ? '>' : ''}</span>
            {opt.label}
          </span>
        ))}
      </div>
    </>
  )
}

export default ConfirmScreen