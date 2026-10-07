import { useEffect } from 'react'

function PressScreen({ onStart }) {
  useEffect(() => {
    const handleKey = () => onStart()

    // Tunda sedikit supaya klik/tombol yang membawa kita ke layar ini
    // tidak langsung dianggap sebagai "press any key"
    const timer = setTimeout(() => {
      window.addEventListener('keydown', handleKey)
      window.addEventListener('click', handleKey)
    }, 300)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('click', handleKey)
    }
  }, [onStart])

  return (
    <>
      <h1 className="game-title">LOGIN QUEST XII</h1>
      <p className="blink">PRESS ANY KEY</p>
    </>
  )
}

export default PressScreen