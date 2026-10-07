import { useState, useEffect } from 'react'
import TVFrame from './components/TVFrame'
import PressScreen from './screens/PressScreen'
import MenuScreen from './screens/MenuScreen'
import LoginScreen from './screens/LoginScreen'
import AboutScreen from './screens/AboutScreen'
import ConfirmScreen from './screens/ConfirmScreen'
import GameOverScreen from './screens/GameOverScreen'
import SuccessScreen from './screens/SuccessScreen'
import { play, setMuted } from './utils/sound'

function App() {
  const [screen, setScreen] = useState('press')
  const [playerName, setPlayerName] = useState('')
  const [muted, setMutedState] = useState(false)

  let ledColor = 'green'
  if (screen === 'press') ledColor = 'red'
  if (screen === 'gameover') ledColor = 'off'

  const handleStart = () => {
    play('start')
    setScreen('menu')
  }

  const handleMenuSelect = (id) => {
    console.log('menu dipilih:', id)
    play('select')
    if (id === 'login') setScreen('login')
    if (id === 'about') setScreen('about')
    if (id === 'exit') setScreen('confirm')
  }

  // Dipakai bersama: BACK di login, BACK di about, dan NO di konfirmasi
  const handleBack = () => {
    play('back')
    setScreen('menu')
  }

  const handleLoginSuccess = (name) => {
    play('success')
    setPlayerName(name)
    setScreen('success')
  }

  const handleLogout = () => {
    play('logout')
    setScreen('menu')
  }

  const handleQuit = () => {
    play('gameover')
    setScreen('gameover')
  }

  return (
    <TVFrame
      ledColor={ledColor}
      muted={muted}
      onToggleMute={() => setMutedState((m) => !m)}
    >
      <div className="screen" key={screen}>
        {screen === 'press' && <PressScreen onStart={handleStart} />}
        {screen === 'menu' && <MenuScreen onSelect={handleMenuSelect} />}
        {screen === 'login' && (
          <LoginScreen onBack={handleBack} onSuccess={handleLoginSuccess} />
        )}
        {screen === 'about' && <AboutScreen onBack={handleBack} />}
        {screen === 'success' && (
          <SuccessScreen name={playerName} onLogout={handleLogout} />
        )}
        {screen === 'confirm' && (
          <ConfirmScreen onYes={handleQuit} onNo={handleBack} />
        )}
        {screen === 'gameover' && (
          <GameOverScreen onFinish={() => setScreen('press')} />
        )}
      </div>
    </TVFrame>
  )
}

export default App