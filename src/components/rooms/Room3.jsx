import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { validateAnswer } from '../../utils/answers'
import HintSystem from '../HintSystem'
import Confetti from 'react-confetti'

export default function Room3() {
  const [answer, setAnswer] = useState('')
  const [selectedLights, setSelectedLights] = useState([])
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { nextRoom, saveAnswer } = useGameStore()

  // Light color code mapping to letters/directions
  const lightCode = [
    { id: 1, color: 'red', position: 'left antler', letter: 'N', direction: 'North' },
    { id: 2, color: 'gold', position: 'right antler', letter: 'O', direction: 'Orient' },
    { id: 3, color: 'green', position: 'center', letter: 'R', direction: 'Return' },
    { id: 4, color: 'blue', position: 'left back', letter: 'T', direction: 'True' },
    { id: 5, color: 'red', position: 'right back', letter: 'H', direction: 'Home' },
  ]

  const handleLightClick = (light) => {
    if (selectedLights.find(l => l.id === light.id)) {
      setSelectedLights(selectedLights.filter(l => l.id !== light.id))
    } else {
      setSelectedLights([...selectedLights, light])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateAnswer('room3', answer)) {
      saveAnswer('room3', answer)
      setShowSuccess(true)
      setError('')

      setTimeout(() => {
        nextRoom()
      }, 3000)
    } else {
      setError('❌ Incorrect direction! Study the Ancient Star Compass...')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="min-h-screen relative">
      {showSuccess && <Confetti numberOfPieces={300} recycle={false} />}

      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/reindeer-stable.png)' }}
      />

      <div className="relative z-10 room-card">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-christmas-red mb-2">
            🦌 THE REINDEER STABLE
          </h2>
          <p className="text-gray-600 text-lg">Room 3 of 5</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-christmas-gold rounded-xl p-6 mb-6 shadow-inner">
          <p className="text-lg leading-relaxed text-gray-800">
            <span className="font-bold text-christmas-red text-xl">⭐ THE ANCIENT STAR COMPASS</span>
            <br /><br />
            You've entered the Reindeer Stable, where Dasher, Dancer, Prancer, Vixen, Comet, and Cupid
            rest between their sacred flights. Each reindeer wears enchanted lights upon their antlers—
            a gift from the Ancient Elves to guide them through the darkest winter nights.
            <br /><br />
            <span className="font-bold text-christmas-burgundy">
              "When the colored lights are read in sequence, they reveal the sacred direction that leads all travelers home.
              Speak the direction to unlock the passage."
            </span>
          </p>
        </div>

        {/* Stable Image */}
        <div className="mb-6 bg-gray-900 rounded-xl p-4 border-4 border-christmas-burgundy">
          <img
            src="/images/reindeer-stable.png"
            alt="Reindeer Stable"
            className="w-full rounded-lg shadow-2xl"
          />
          <p className="text-center text-christmas-gold mt-3 text-sm italic">
            🔍 Study the lights on the reindeer antlers... Each color holds meaning...
          </p>
        </div>

        {/* Light Code Discovery Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-xl p-6 mb-6 border-2 border-indigo-300">
          <h3 className="text-2xl font-bold text-center mb-4 text-indigo-800">
            🌟 The Ancient Light Cipher
          </h3>
          <p className="text-center text-gray-700 mb-4">
            The Ancient Elves encoded navigation secrets in colored light. Click each light to reveal its meaning:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lightCode.map((light) => {
              const isSelected = selectedLights.find(l => l.id === light.id)
              const bgColor =
                light.color === 'red' ? 'bg-red-100 border-red-500' :
                light.color === 'gold' ? 'bg-yellow-100 border-yellow-500' :
                light.color === 'green' ? 'bg-green-100 border-green-500' :
                'bg-blue-100 border-blue-500'

              const lightColor =
                light.color === 'red' ? 'bg-red-500' :
                light.color === 'gold' ? 'bg-yellow-400' :
                light.color === 'green' ? 'bg-green-500' :
                'bg-blue-500'

              return (
                <button
                  key={light.id}
                  onClick={() => handleLightClick(light)}
                  className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                    isSelected
                      ? `${bgColor} shadow-lg`
                      : 'bg-white border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${lightColor} rounded-full shadow-lg animate-pulse`}></div>
                      <div className="text-left">
                        <p className="font-bold text-lg capitalize">{light.color} Light</p>
                        <p className="text-sm text-gray-600 italic">{light.position}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="ml-4">
                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                          {light.letter}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {selectedLights.length === 5 && (
            <div className="mt-6 bg-indigo-50 border-2 border-indigo-500 rounded-lg p-4">
              <p className="text-center text-indigo-700 font-bold text-lg">
                ✨ All lights decoded! The letters spell: {lightCode.map(l => l.letter).join(' - ')}
              </p>
              <p className="text-center text-gray-600 mt-2 italic">
                "The direction that guides all wanderers home..."
              </p>
            </div>
          )}
        </div>

        {/* Navigation Compass Interface */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-6 shadow-2xl border-4 border-christmas-gold">
          <h3 className="text-3xl font-bold text-center mb-6 text-christmas-gold">
            🧭 The Star Compass Lock
          </h3>

          {/* Compass visualization */}
          <div className="flex justify-center mb-6">
            <div className="relative w-64 h-64 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-full border-8 border-christmas-burgundy shadow-2xl">
              {/* Compass points */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl font-bold text-red-600">N</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xl font-bold text-gray-600">S</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-600">W</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-600">E</div>

              {/* Center star */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-christmas-gold animate-pulse">
                ⭐
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block text-lg font-bold text-christmas-gold mb-2 text-center">
              🔐 Enter the Sacred Direction:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Speak the direction..."
                className="input-field flex-1 text-center text-2xl uppercase tracking-widest"
                maxLength={20}
                disabled={showSuccess}
              />
              <button
                type="submit"
                className="btn-primary px-12"
                disabled={showSuccess || !answer.trim()}
              >
                {showSuccess ? '✅ Unlocked!' : '🔓 Submit'}
              </button>
            </div>

            {error && (
              <p className="text-red-400 font-bold mt-4 text-center bg-red-900/50 border border-red-500 rounded p-3 text-lg">{error}</p>
            )}

            {showSuccess && (
              <p className="text-green-400 font-bold mt-4 text-center animate-pulse text-xl bg-green-900/50 border border-green-500 rounded p-3">
                🎉 The compass spins true! The Cookie Kitchen door unlocks...
              </p>
            )}
          </form>
        </div>

        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            <span className="font-bold">💡 Hint:</span> The reindeer lights spell out letters. Read them in order to discover the navigation direction that points the way home on Christmas Eve.
          </p>
        </div>

        <HintSystem roomKey="room3" />
      </div>
    </div>
  )
}
