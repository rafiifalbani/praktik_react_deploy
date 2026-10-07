import { useState, useEffect } from 'react'

function GameOverScreen({ onFinish }) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) {
      onFinish()
      return
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, onFinish])

  return (
    <>
      <h1 className="game-over">GAME OVER</h1>
      <p className="continue-text">CONTINUE? {count}</p>
    </>
  )
}

export default GameOverScreen