import { useState, useEffect } from 'react'
import { play } from '../utils/sound'

// Data contoh (tanpa backend)
const VALID_NAME = 'PLAYER1'
const VALID_PASS = '1234'

function LoginScreen({ onBack, onSuccess }) {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)
  const [loading, setLoading] = useState(false)

  // Esc = kembali ke menu
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && !loading) onBack()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onBack, loading])

  // Hentikan efek getar setelah 400ms
  useEffect(() => {
    if (!shaking) return
    const timer = setTimeout(() => setShaking(false), 400)
    return () => clearTimeout(timer)
  }, [shaking])

  // Saat loading, tunggu 1,5 detik lalu masuk
  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => onSuccess(name.trim().toUpperCase()), 1500)
    return () => clearTimeout(timer)
  }, [loading, onSuccess, name])

const fail = (message) => {
  play('error')
  setError(message)
  setShaking(true)
}

  const handleSubmit = (e) => {
    e.preventDefault() // cegah halaman reload

    if (!name.trim() || !pass) {
      fail('FILL ALL FIELDS!')
    } else if (name.trim().toUpperCase() !== VALID_NAME || pass !== VALID_PASS) {
      fail('WRONG NAME OR PASSCODE!')
    } else {
        setError('')
        play('loading')
        setLoading(true)
    }   
  }

  return (
    <form
      className={shaking ? 'login-form shake-box' : 'login-form'}
      onSubmit={handleSubmit}
    >
      <h1 className="game-title small">PLAYER LOGIN</h1>

      <label className="field">
        <span>ENTER PLAYER NAME</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={12}
          autoFocus
          disabled={loading}
          autoComplete="off"
        />
      </label>

      <label className="field">
        <span>ENTER PASSCODE</span>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          maxLength={12}
          disabled={loading}
          autoComplete="off"
        />
      </label>

      <p className="login-message">
        {loading ? 'LOADING...' : error}
      </p>

      {loading && (
        <div className="loading-bar">
          <div className="loading-fill"></div>
        </div>
      )}

      {!loading && (
        <div className="login-buttons">
          <button type="submit" className="pixel-btn">START</button>
          <button type="button" className="pixel-btn alt" onClick={onBack}>
            BACK
          </button>
        </div>
      )}

      <p className="hint">HINT: PLAYER1 / 1234</p>
    </form>
  )
}

export default LoginScreen