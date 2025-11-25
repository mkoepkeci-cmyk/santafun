import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { HINTS } from '../utils/answers'

export default function HintSystem({ roomKey }) {
  const [showHints, setShowHints] = useState(false)
  const { hintsUsed, useHint } = useGameStore()
  
  const currentHints = hintsUsed[roomKey]
  const availableHints = HINTS[roomKey]

  const handleUseHint = () => {
    if (currentHints < 3) {
      useHint(roomKey)
    }
  }

  return (
    <div className="mt-6">
      <button
        onClick={() => setShowHints(!showHints)}
        className="btn-secondary"
      >
        💡 Hints ({currentHints}/3 used)
      </button>

      {showHints && (
        <div className="mt-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
          <h3 className="font-bold text-lg mb-2">Available Hints:</h3>
          {availableHints.map((hint, index) => (
            <div key={index} className="mb-2">
              {index < currentHints ? (
                <p className="text-gray-700">
                  <span className="font-bold">Hint {index + 1}:</span> {hint}
                </p>
              ) : index === currentHints ? (
                <button
                  onClick={handleUseHint}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  disabled={currentHints >= 3}
                >
                  Reveal Hint {index + 1}
                </button>
              ) : (
                <p className="text-gray-400">🔒 Hint {index + 1} (locked)</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
