let ctx = null
let muted = false

export const setMuted = (value) => {
  muted = value
}

function getCtx() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null
    ctx = new AudioCtx()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Satu nada tetap
function beep(freq, start, duration, type = 'square', volume = 0.08) {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime + start

  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  gain.gain.setValueAtTime(volume, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration)

  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(t)
  osc.stop(t + duration)
}

// Nada yang meluncur dari frekuensi `from` ke `to`
function sweep(from, to, start, duration, type = 'square', volume = 0.1) {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime + start

  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(from, t)
  osc.frequency.exponentialRampToValueAtTime(to, t + duration)
  gain.gain.setValueAtTime(volume, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration)

  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(t)
  osc.stop(t + duration)
}

// Bunyi "kresek" acak, dipakai untuk efek pecah
function noise(start, duration, volume = 0.2, cutoff = 4000) {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime + start

  const length = Math.floor(c.sampleRate * duration)
  const buffer = c.createBuffer(1, length, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1

  const src = c.createBufferSource()
  src.buffer = buffer

  const filter = c.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(cutoff, t)
  filter.frequency.exponentialRampToValueAtTime(200, t + duration)

  const gain = c.createGain()
  gain.gain.setValueAtTime(volume, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration)

  src.connect(filter)
  filter.connect(gain)
  gain.connect(c.destination)
  src.start(t)
}

// Suara berupa daftar nada: [frekuensi, mulai, durasi, gelombang]
// atau berupa fungsi kalau butuh efek khusus
const SOUNDS = {
  move: [[440, 0, 0.06]],
  select: [[660, 0, 0.08], [880, 0.08, 0.1]],
  start: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.1], [1047, 0.3, 0.25]],
  error: [[200, 0, 0.15, 'sawtooth'], [150, 0.15, 0.25, 'sawtooth']],
  success: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.1], [1047, 0.3, 0.1], [1319, 0.4, 0.3]],

  // Jingle hover: naik ceria untuk LOGIN, turun untuk EXIT
  hoverLogin: [[659, 0, 0.06], [784, 0.06, 0.06], [988, 0.12, 0.1]],
  hoverExit: [[494, 0, 0.06], [392, 0.06, 0.06], [330, 0.12, 0.1]],

  // Tombol kembali dan logout
  back: [[523, 0, 0.06], [392, 0.06, 0.12]],
  logout: [[784, 0, 0.08], [659, 0.08, 0.08], [523, 0.16, 0.08], [392, 0.24, 0.22]],

  // Hover YES / NO di dialog konfirmasi
  hoverYes: [[587, 0, 0.05], [880, 0.05, 0.09]],
  hoverNo: [[330, 0, 0.05], [262, 0.05, 0.09]],

  // Hover menu ABOUT
  hoverAbout: [[523, 0, 0.06], [659, 0.06, 0.06], [523, 0.12, 0.06], [784, 0.18, 0.1]],

  // Loading: 10 "tik" yang nadanya naik, cocok dengan bar 10 langkah (1,5 detik)
  loading: Array.from({ length: 10 }, (_, i) => [300 + i * 70, i * 0.15, 0.07]),

  // Game over: blok pecah. Ledakan noise, nada jatuh, lalu serpihan berjatuhan
  gameover: () => {
    noise(0, 0.4, 0.28, 6000)
    sweep(420, 60, 0, 0.4, 'square', 0.1)

    const debris = [0.12, 0.2, 0.3, 0.42, 0.55, 0.7]
    debris.forEach((t) => {
      noise(t, 0.08, 0.12, 5000)
      beep(600 + Math.random() * 900, t, 0.05, 'square', 0.04)
    })

    sweep(220, 50, 0.8, 0.5, 'sawtooth', 0.08)
  },
}

export function play(name) {
  if (muted) return
  const sound = SOUNDS[name]
  if (!sound) return

  if (typeof sound === 'function') {
    sound()
  } else {
    sound.forEach(([freq, start, duration, type]) => beep(freq, start, duration, type))
  }
}