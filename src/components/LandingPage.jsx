import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

export default function LandingPage() {
  const [name, setName] = useState('')
  const { setTeamName, startGame } = useGameStore()

  const handleStart = (e) => {
    e.preventDefault()
    if (name.trim()) {
      setTeamName(name.trim())
      startGame()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-christmas-darkGreen via-christmas-pine to-black">
      {/* Snowflakes */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 8}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 12 + 8}px`,
            opacity: Math.random() * 0.6 + 0.4
          }}
        >
          ❄
        </div>
      ))}

      {/* Background workshop image */}
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/workshop-exterior.png)' }}
      />

      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-gradient-to-br from-christmas-cream/95 to-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border-4 border-christmas-gold/40 warm-glow">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-6xl md:text-7xl font-heading font-bold bg-gradient-to-r from-christmas-burgundy via-christmas-red to-christmas-lightRed bg-clip-text text-transparent mb-4 leading-tight">
              Santa's Workshop
            </h1>
            <h2 className="text-3xl md:text-4xl font-heading text-christmas-pine mb-6">
              Crisis at the North Pole
            </h2>

            <div className="inline-block bg-gradient-to-r from-christmas-red to-christmas-burgundy text-white px-8 py-4 rounded-2xl shadow-xl animate-pulse border-2 border-white/30">
              <p className="text-2xl font-heading font-bold tracking-wide">🚨 URGENT MISSION 🚨</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-red-50 to-green-50/50 border-2 border-christmas-gold/30 rounded-2xl p-8 mb-8 shadow-inner">
            <p className="text-xl text-gray-800 leading-relaxed text-center font-body">
              The workshop has been <span className="font-bold text-christmas-red">locked down</span> by accident.
              <br />
              Santa's sleigh can't launch. Christmas hangs in the balance.
              <br /><br />
              <span className="text-2xl font-bold text-christmas-burgundy">
                You have 60 minutes to save Christmas.
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label className="block text-left text-xl font-heading font-bold text-gray-800 mb-3">
                Assemble Your Team:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your team name..."
                className="input-field text-center placeholder:text-gray-400"
                maxLength={50}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-2xl py-5"
            >
              🎄 Begin Mission 🎄
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t-2 border-christmas-gold/20 text-center space-y-2">
            <p className="text-gray-600 font-body flex items-center justify-center gap-2">
              <span className="text-2xl">✨</span>
              <span>Best experienced with 2-6 teammates</span>
            </p>
            <p className="text-gray-600 font-body flex items-center justify-center gap-2">
              <span className="text-2xl">🧩</span>
              <span>5 Puzzles • 60 Minutes • 1 Christmas to Save</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
