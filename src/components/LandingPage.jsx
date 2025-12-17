import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { registerTeam } from '../utils/supabase'

export default function LandingPage() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setTeamName, startGame, setLiveTeamId } = useGameStore()

  const handleStart = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setError('')

    // Register team in database
    const team = await registerTeam(name.trim())
    if (team) {
      setLiveTeamId(team.id)
    }

    setTeamName(name.trim())
    startGame()
    setLoading(false)
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
              Join the Mission
            </h1>
            <h2 className="text-3xl md:text-4xl font-heading text-christmas-pine mb-6">
              Enter Your Team Name
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label className="block text-left text-xl font-heading font-bold text-gray-800 mb-3">
                Team Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your team name..."
                className="input-field text-center placeholder:text-gray-400 text-2xl"
                maxLength={50}
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-400 rounded-lg p-3">
                <p className="text-red-700 text-center font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="btn-primary w-full text-2xl py-5 disabled:opacity-50"
            >
              {loading ? '⏳ Joining...' : '🎄 Begin Mission 🎄'}
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
              <span>5 Puzzles • 30 Minutes • 1 Christmas to Save</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
