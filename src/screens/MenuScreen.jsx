import { useState, useEffect } from 'react'
import { play } from '../utils/sound'

const ITEMS = [
  { id: 'login', label: 'LOGIN', sound: 'hoverLogin' },
  { id: 'about', label: 'ABOUT', sound: 'hoverAbout' },
  { id: 'exit', label: 'EXIT', sound: 'hoverExit' },
]

function MenuScreen({ onSelect }) {
  const [index, setIndex] = useState(0)

  // Pindah kursor + bunyikan jingle item tujuan
  const moveTo = (next) => {
    if (next === index) return
    play(ITEMS[next].sound)
    setIndex(next)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.repeat) return

      if (e.key === 'ArrowDown') {
        const next = (index + 1) % ITEMS.length
        play(ITEMS[next].sound)
        setIndex(next)
      } else if (e.key === 'ArrowUp') {
        const next = (index - 1 + ITEMS.length) % ITEMS.length
        play(ITEMS[next].sound)
        setIndex(next)
      } else if (e.key === 'Enter') {
        onSelect(ITEMS[index].id)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [index, onSelect])

  return (
    <>
      <h1 className="game-title">MAIN MENU</h1>
      <ul className="menu">
        {ITEMS.map((item, i) => (
          <li
            key={item.id}
            className={i === index ? 'menu-item active' : 'menu-item'}
            onMouseEnter={() => moveTo(i)}
            onClick={() => onSelect(item.id)}
          >
            <span className="cursor">{i === index ? '>' : ''}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </>
  )
}

export default MenuScreen