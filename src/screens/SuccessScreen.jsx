function SuccessScreen({ name, onLogout }) {
  return (
    <>
      <p className="welcome-small">WELCOME,</p>
      <h1 className="game-title">{name}</h1>
      <p className="welcome-small">LOGIN SUCCESSFUL!</p>
      <button className="pixel-btn" onClick={onLogout}>
        LOGOUT
      </button>
    </>
  )
}

export default SuccessScreen