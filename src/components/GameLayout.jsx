import { useGameStore } from '../store/gameStore'
import Timer from './Timer'
import ProgressBar from './ProgressBar'

export default function GameLayout({ children }) {
  const { teamName, currentRoom } = useGameStore()

  if (currentRoom === 0 || currentRoom === 6) {
    return children
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">🎄 {teamName}</h2>
            <p className="text-white/80">Operation Save Christmas</p>
          </div>
          <Timer />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-6xl mx-auto">
        <ProgressBar />
      </div>

      {/* Room Content */}
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  )
}
