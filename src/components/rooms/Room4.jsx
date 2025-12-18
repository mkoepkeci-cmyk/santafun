import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { validateAnswer } from '../../utils/answers'
import HintSystem from '../HintSystem'
import Confetti from 'react-confetti'

export default function Room4() {
  const [answer, setAnswer] = useState('')
  const [revealedLetters, setRevealedLetters] = useState({})
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { nextRoom, saveAnswer } = useGameStore()

  // Mrs. Claus's Recipe Card - quantity indicates which letter position to extract
  const recipeIngredients = [
    { id: 1, ingredient: 'BUTTER', quantity: 3, unit: 'cups', letter: 'T', description: 'Salted, room temperature' },
    { id: 2, ingredient: 'SUGAR', quantity: 5, unit: 'cups', letter: 'R', description: 'Pure cane sugar' },
    { id: 3, ingredient: 'HONEY', quantity: 4, unit: 'tbsp', letter: 'E', description: 'North Pole wildflower' },
    { id: 4, ingredient: 'CREAM', quantity: 4, unit: 'cups', letter: 'A', description: 'Fresh from the dairy' },
    { id: 5, ingredient: 'NUTMEG', quantity: 3, unit: 'tsp', letter: 'T', description: 'Freshly grated' },
    { id: 6, ingredient: 'EGGS', quantity: 4, unit: 'large', letter: 'S', description: 'Farm fresh' },
  ]

  const handleLetterClick = (ingredient, clickedIndex) => {
    if (showSuccess || revealedLetters[ingredient.id]) return

    const correctIndex = ingredient.quantity - 1

    if (clickedIndex === correctIndex) {
      // Correct letter clicked!
      setRevealedLetters(prev => ({
        ...prev,
        [ingredient.id]: true
      }))
      setError('')
    } else {
      // Wrong letter clicked
      setError(`Wrong letter! The quantity tells you which position to look at...`)
      setTimeout(() => setError(''), 2000)
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
      setError('Incorrect ingredient! The recipe holds the secret...')
      setAnswer('')
    }
  }

  const revealedCount = Object.values(revealedLetters).filter(Boolean).length

  return (
    <div className="room-card">
      {showSuccess && <Confetti numberOfPieces={300} recycle={false} />}

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-christmas-red mb-2">
          Mrs. Claus's Kitchen
        </h2>
        <p className="text-gray-600 text-lg">Room 4 of 5</p>
      </div>

      {/* Scene Description */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-6 mb-6">
        <p className="text-gray-700 leading-relaxed">
          The aroma of cinnamon and vanilla fills the air as you enter Mrs. Claus's legendary kitchen.
          Copper pots hang from the ceiling, and a warm fire crackles in the hearth. On the flour-dusted
          counter lies an ancient recipe card — the Original Christmas Cookie Recipe, passed down through
          generations of North Pole bakers.
        </p>
      </div>

      {/* Kitchen Image */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl border-4 border-amber-600">
        <img
          src="/images/cookies.jpg"
          alt="Mrs. Claus's Kitchen"
          className="w-full"
        />
      </div>

      {/* Lore Card */}
      <div className="bg-red-50 border-4 border-red-300 rounded-lg p-6 mb-8 shadow-inner">
        <p className="text-center text-red-800 font-bold text-lg mb-4">
          A Note from Mrs. Claus
        </p>
        <p className="text-gray-800 leading-relaxed italic">
          "My dear helpers, this recipe has been in the Claus family since the very first Christmas.
          The Ancient Elves encoded a secret within it — look not at what you add, but at the numbers
          themselves. Each quantity points to a letter hiding within its ingredient.
        </p>
        <p className="text-gray-800 leading-relaxed font-bold mt-4 text-center">
          Click the correct letter in each ingredient name to reveal the hidden code!"
        </p>
      </div>

      {/* Recipe Card */}
      <div className="bg-gradient-to-b from-amber-100 to-amber-50 rounded-xl p-6 mb-6 border-4 border-amber-600 shadow-2xl">
        <div className="text-center mb-4">
          <h3 className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Georgia, serif' }}>
            ✨ The Original Christmas Cookie Recipe ✨
          </h3>
          <p className="text-amber-700 italic mt-1">Est. Year One — North Pole Archives</p>
        </div>

        <div className="bg-white rounded-lg border-2 border-amber-400 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">
              <tr>
                <th className="p-3 text-left text-amber-950 font-bold">Qty</th>
                <th className="p-3 text-left text-amber-950 font-bold">Ingredient</th>
                <th className="p-3 text-left text-amber-950 font-bold">Notes</th>
                <th className="p-3 text-center text-amber-950 font-bold">🔮</th>
              </tr>
            </thead>
            <tbody>
              {recipeIngredients.map((item) => {
                const isRevealed = revealedLetters[item.id]
                // Highlight the letter at the quantity position
                const letterIndex = item.quantity - 1
                const ingredientLetters = item.ingredient.split('')

                return (
                  <tr
                    key={item.id}
                    className={`border-t-2 border-amber-200 transition-all ${
                      isRevealed ? 'bg-green-100' : ''
                    }`}
                  >
                    <td className="p-4">
                      <span className={`text-2xl font-bold ${isRevealed ? 'text-green-700' : 'text-amber-800'}`}>
                        {item.quantity}
                      </span>
                      <span className="text-amber-600 ml-1 text-sm">{item.unit}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {ingredientLetters.map((letter, idx) => (
                          <span
                            key={idx}
                            onClick={() => !isRevealed && !showSuccess && handleLetterClick(item, idx)}
                            className={`text-xl font-bold px-2 py-1 rounded transition-all ${
                              isRevealed && idx === letterIndex
                                ? 'bg-green-600 text-white animate-pulse'
                                : isRevealed
                                  ? 'text-amber-900'
                                  : 'text-amber-900 hover:bg-amber-200 cursor-pointer'
                            }`}
                          >
                            {letter}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-amber-700 italic text-sm">
                      {item.description}
                    </td>
                    <td className="p-4 text-center">
                      {isRevealed ? (
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full text-xl font-bold shadow-lg">
                          {item.letter}
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-amber-300 text-amber-700 rounded-full text-xl">
                          ?
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Revealed Letters Display */}
        <div className="mt-6 bg-amber-200 rounded-lg p-4 border-2 border-amber-500">
          <p className="text-center text-amber-900 font-bold mb-3">
            Hidden Letters Revealed: {revealedCount}/6
          </p>
          <div className="flex justify-center gap-3">
            {recipeIngredients.map((item) => (
              <div
                key={item.id}
                className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg ${
                  revealedLetters[item.id]
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-amber-300 border-2 border-dashed border-amber-400'
                }`}
              >
                {revealedLetters[item.id] ? item.letter : '?'}
              </div>
            ))}
          </div>
          {revealedCount === 6 && (
            <p className="text-center text-green-700 font-bold mt-3 animate-pulse">
              ✨ All letters revealed! What word do they spell? ✨
            </p>
          )}
        </div>
      </div>

      {/* Decoder Hint */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-center">
          <span className="font-bold">🔍 The Cipher:</span> The quantity number tells you which letter
          to extract from each ingredient name. For example, if an ingredient has quantity "3",
          look at the 3rd letter of that ingredient's name.
        </p>
      </div>

      {/* Answer Input */}
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl">
          <label className="block text-xl font-bold text-christmas-gold mb-3 text-center">
            What word do the hidden letters spell?
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the secret word..."
              className="input-field flex-1 text-center text-2xl uppercase tracking-widest"
              maxLength={10}
              disabled={showSuccess}
            />
            <button
              type="submit"
              className="btn-primary px-8"
              disabled={showSuccess || !answer.trim()}
            >
              {showSuccess ? 'Unlocked!' : 'Submit'}
            </button>
          </div>

          {error && (
            <p className="text-red-400 font-bold mt-3 text-center">{error}</p>
          )}

          {showSuccess && (
            <p className="text-green-400 font-bold mt-3 text-center animate-pulse text-lg">
              The oven chimes with approval! The fourth seal is broken...
            </p>
          )}
        </div>
      </form>

      <HintSystem roomKey="room4" />
    </div>
  )
}
