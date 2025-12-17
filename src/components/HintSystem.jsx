import { useState, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { HINTS } from '../utils/answers'
import {
  requestHint,
  getApprovedHints,
  subscribeToTeamHints
} from '../utils/supabase'

export default function HintSystem({ roomKey }) {
  const [showHints, setShowHints] = useState(false)
  const [pendingRequest, setPendingRequest] = useState(null)
  const { hintsUsed, useHint, liveTeamId } = useGameStore()

  const currentHints = hintsUsed[roomKey]
  const availableHints = HINTS[roomKey]

  // When connected to Supabase (has liveTeamId), use facilitated mode
  const isFacilitated = !!liveTeamId

  // Load approved hints for this room (facilitated mode)
  useEffect(() => {
    if (!liveTeamId) return

    const loadApprovedHints = async () => {
      const hints = await getApprovedHints(liveTeamId)
      const roomHints = hints.filter(h => h.room_key === roomKey)

      // Find the highest approved hint number for this room
      const maxApprovedHint = roomHints.reduce((max, hint) =>
        Math.max(max, hint.hint_number), 0
      )

      // Get current hints from store directly to avoid stale closure
      const currentHintsFromStore = useGameStore.getState().hintsUsed[roomKey]

      // Only update if we have more approved hints than currently revealed
      if (maxApprovedHint > currentHintsFromStore) {
        // Set hints directly to the max approved level instead of incrementing one by one
        useGameStore.setState((state) => ({
          hintsUsed: {
            ...state.hintsUsed,
            [roomKey]: maxApprovedHint
          }
        }))
      }
    }

    loadApprovedHints()

    // Subscribe to hint approvals
    const subscription = subscribeToTeamHints(liveTeamId, (payload) => {
      if (payload.new?.status === 'approved' && payload.new?.room_key === roomKey) {
        loadApprovedHints()
        setPendingRequest(null)
      } else if (payload.new?.status === 'denied' && payload.new?.room_key === roomKey) {
        setPendingRequest(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [liveTeamId, roomKey])

  // Standard mode - just reveal hint
  const handleUseHint = () => {
    if (currentHints < 3) {
      useHint(roomKey)
    }
  }

  // Facilitated mode - request hint approval
  const handleRequestHint = async () => {
    if (!liveTeamId) return

    const nextHintNumber = currentHints + 1
    setPendingRequest(nextHintNumber)

    await requestHint(liveTeamId, roomKey, nextHintNumber)
  }

  // Check if there's already a pending request for the next hint
  const nextHintNumber = currentHints + 1
  const hasPendingRequest = pendingRequest === nextHintNumber

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
          <h3 className="font-bold text-lg mb-2">
            {isFacilitated ? 'Request Hints from Facilitator:' : 'Available Hints:'}
          </h3>

          {availableHints.map((hint, index) => (
            <div key={index} className="mb-3">
              {index < currentHints ? (
                // Already revealed hint
                <div className="bg-green-100 border border-green-400 rounded p-3">
                  <p className="text-gray-700">
                    <span className="font-bold text-green-700">Hint {index + 1}:</span> {hint}
                  </p>
                </div>
              ) : index === currentHints ? (
                // Next hint to reveal/request
                isFacilitated ? (
                  // Facilitated mode - request hint
                  hasPendingRequest ? (
                    <div className="bg-yellow-200 border border-yellow-500 rounded p-3 animate-pulse">
                      <p className="text-yellow-800 font-bold">
                        ⏳ Hint {index + 1} - Waiting for facilitator approval...
                      </p>
                      <p className="text-yellow-700 text-sm mt-1">
                        Ask your facilitator to approve your hint request!
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={handleRequestHint}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded font-bold transition-all"
                    >
                      🙋 Request Hint {index + 1} from Facilitator
                    </button>
                  )
                ) : (
                  // Standard mode - instant reveal
                  <button
                    onClick={handleUseHint}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    disabled={currentHints >= 3}
                  >
                    Reveal Hint {index + 1}
                  </button>
                )
              ) : (
                // Locked hint
                <p className="text-gray-400">🔒 Hint {index + 1} (locked)</p>
              )}
            </div>
          ))}

          {isFacilitated && (
            <p className="text-sm text-gray-500 mt-4 italic">
              Hints must be approved by your game facilitator.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
