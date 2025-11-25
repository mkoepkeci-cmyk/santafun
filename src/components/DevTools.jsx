import { useGameStore } from '../store/gameStore'

export default function DevTools() {
  const { currentRoom, resetGame, goToRoom } = useGameStore()

  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white rounded-lg shadow-2xl p-3 text-xs border-2 border-gray-600">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span className="font-bold">Dev Tools:</span>
          <span className="bg-gray-700 px-2 py-1 rounded">Room: {currentRoom}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => goToRoom(-1)}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded font-semibold transition-colors"
          >
            📖 View Intro
          </button>
          <button
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-semibold transition-colors"
          >
            ↺ Reset Game
          </button>
        </div>
      </div>
    </div>
  )
}
