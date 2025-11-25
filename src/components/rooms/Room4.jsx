import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { validateAnswer } from '../../utils/answers'
import HintSystem from '../HintSystem'
import Confetti from 'react-confetti'

export default function Room4() {
  const [answer, setAnswer] = useState('')
  const [decodedSymbols, setDecodedSymbols] = useState([])
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { nextRoom, saveAnswer } = useGameStore()

  // Ancient recipe cipher - cookie shapes represent letters
  const symbolKey = [
    { id: 1, symbol: '⭐', shape: 'Star Cookie', letter: 'S', ingredient: 'Sugar' },
    { id: 2, symbol: '🎄', shape: 'Tree Cookie', letter: 'P', ingredient: 'Peppermint' },
    { id: 3, symbol: '🔔', shape: 'Bell Cookie', letter: 'I', ingredient: 'Icing' },
    { id: 4, symbol: '❄️', shape: 'Snowflake Cookie', letter: 'C', ingredient: 'Cinnamon' },
    { id: 5, symbol: '🎁', shape: 'Gift Cookie', letter: 'E', ingredient: 'Eggnog' },
  ]

  // The encoded recipe word: SPICE
  const encodedRecipe = [
    { position: 1, symbol: '⭐', letter: 'S' },
    { position: 2, symbol: '🎄', letter: 'P' },
    { position: 3, symbol: '🔔', letter: 'I' },
    { position: 4, symbol: '❄️', letter: 'C' },
    { position: 5, symbol: '🎁', letter: 'E' },
  ]

  const handleSymbolClick = (symbolItem) => {
    if (decodedSymbols.find(s => s.id === symbolItem.id)) {
      setDecodedSymbols(decodedSymbols.filter(s => s.id !== symbolItem.id))
    } else {
      setDecodedSymbols([...decodedSymbols, symbolItem])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateAnswer('room4', answer)) {
      saveAnswer('room4', answer)
      setShowSuccess(true)
      setError('')

      setTimeout(() => {
        nextRoom()
      }, 3000)
    } else {
      setError('❌ Incorrect ingredient! Read the Ancient Recipe more carefully...')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="min-h-screen relative">
      {showSuccess && <Confetti numberOfPieces={300} recycle={false} />}

      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/cookie-kitchen.png)' }}
      />

      <div className="relative z-10 room-card">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-christmas-red mb-2">
            🍪 THE COOKIE KITCHEN
          </h2>
          <p className="text-gray-600 text-lg">Room 4 of 5</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-christmas-gold rounded-xl p-6 mb-6 shadow-inner">
          <p className="text-lg leading-relaxed text-gray-800">
            <span className="font-bold text-christmas-red text-xl">🧁 THE ANCIENT RECIPE SCROLL</span>
            <br /><br />
            You've entered Mrs. Claus's legendary Cookie Kitchen, where the air smells of cinnamon,
            vanilla, and ancient magic. On the counter lies a weathered scroll—the Original Recipe,
            written by the First Baker Elves in a cipher of cookie symbols.
            <br /><br />
            <span className="font-bold text-christmas-burgundy">
              "Each cookie shape holds a letter. Decode the recipe to discover the secret ingredient
              that makes Christmas cookies truly magical."
            </span>
          </p>
        </div>

        {/* Kitchen Image */}
        <div className="mb-6 bg-gray-900 rounded-xl p-4 border-4 border-christmas-burgundy">
          <img
            src="/images/cookie-kitchen.png"
            alt="Cookie Kitchen"
            className="w-full rounded-lg shadow-2xl"
          />
          <p className="text-center text-christmas-gold mt-3 text-sm italic">
            🔍 The elves are baking the symbols... What message do the cookies hold?
          </p>
        </div>

        {/* Symbol Decoder Key */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 mb-6 border-2 border-amber-400">
          <h3 className="text-2xl font-bold text-center mb-4 text-amber-900">
            📜 The Cookie Cipher Decoder
          </h3>
          <p className="text-center text-gray-700 mb-4">
            Click each cookie symbol to reveal its hidden letter:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {symbolKey.map((item) => {
              const isDecoded = decodedSymbols.find(s => s.id === item.id)

              return (
                <button
                  key={item.id}
                  onClick={() => handleSymbolClick(item)}
                  className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                    isDecoded
                      ? 'bg-amber-100 border-amber-600 shadow-lg'
                      : 'bg-white border-gray-300 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{item.symbol}</div>
                      <div className="text-left">
                        <p className="font-bold text-lg">{item.shape}</p>
                        <p className="text-sm text-gray-600 italic">{item.ingredient}</p>
                      </div>
                    </div>
                    {isDecoded && (
                      <div className="ml-4">
                        <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl animate-pulse">
                          {item.letter}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {decodedSymbols.length === 5 && (
            <div className="mt-6 bg-amber-50 border-2 border-amber-600 rounded-lg p-4">
              <p className="text-center text-amber-900 font-bold text-lg">
                ✨ All symbols decoded! Now read the Ancient Recipe below...
              </p>
            </div>
          )}
        </div>

        {/* The Encoded Recipe */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 mb-6 border-4 border-red-400">
          <h3 className="text-2xl font-bold text-center mb-4 text-red-800">
            📖 The Ancient Recipe Scroll
          </h3>
          <p className="text-center text-gray-700 mb-4 italic">
            "The Secret Ingredient that Powers Christmas Magic..."
          </p>

          <div className="bg-amber-100 rounded-lg p-6 border-2 border-amber-600">
            <div className="flex justify-center items-center gap-4 mb-4">
              {encodedRecipe.map((item) => (
                <div key={item.position} className="flex flex-col items-center">
                  <div className="text-6xl mb-2">{item.symbol}</div>
                  {decodedSymbols.length === 5 && (
                    <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center text-white text-2xl font-bold animate-bounce">
                      {item.letter}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {decodedSymbols.length === 5 && (
              <div className="text-center mt-4">
                <p className="text-2xl font-bold text-red-800">
                  The symbols spell: {encodedRecipe.map(r => r.letter).join(' - ')}
                </p>
                <p className="text-gray-600 italic mt-2">
                  "What magical ingredient do these letters name?"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recipe Book Lock */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-6 shadow-2xl border-4 border-christmas-gold">
          <h3 className="text-3xl font-bold text-center mb-6 text-christmas-gold">
            🔐 The Recipe Book Lock
          </h3>

          {/* Decorative recipe book */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-56 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg border-8 border-amber-900 shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">📖</div>
                <p className="text-amber-100 font-bold text-sm">Original Recipe</p>
                <p className="text-amber-300 text-xs italic">Est. Year 1</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block text-lg font-bold text-christmas-gold mb-2 text-center">
              🔐 Enter the Secret Ingredient:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Name the ingredient..."
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
                🎉 The Recipe Book opens! The final seal awaits in Santa's Office...
              </p>
            )}
          </form>
        </div>

        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            <span className="font-bold">💡 Hint:</span> Each cookie shape in the decoder represents a single letter. Use the key to decode the recipe scroll symbols and spell out the magical ingredient.
          </p>
        </div>

        <HintSystem roomKey="room4" />
      </div>
    </div>
  )
}
