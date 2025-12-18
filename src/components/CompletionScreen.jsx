import { useGameStore } from '../store/gameStore'

export default function CompletionScreen() {
  const { teamName, completionTime, hintsUsed } = useGameStore()

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const totalHints = Object.values(hintsUsed).reduce((sum, val) => sum + val, 0)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="room-card max-w-4xl text-center">
        <h1 className="text-6xl font-bold text-christmas-red mb-4 animate-pulse">
          🎄 CHRISTMAS SAVED! 🎄
        </h1>

        <div className="bg-green-50 border-4 border-green-500 rounded-lg p-8 mb-6">
          <p className="text-2xl font-bold mb-4">
            Congratulations, {teamName}!
          </p>
          <p className="text-lg mb-6">
            You've successfully unlocked the workshop and saved Christmas!
            Santa's sleigh is ready for takeoff! 🎅🦌
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white rounded-lg p-4 border-2 border-christmas-gold">
              <p className="text-3xl font-bold text-christmas-red">
                ⏱️ {formatTime(completionTime)}
              </p>
              <p className="text-gray-600">Completion Time</p>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-christmas-gold">
              <p className="text-3xl font-bold text-blue-600">
                💡 {totalHints}
              </p>
              <p className="text-gray-600">Hints Used</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
