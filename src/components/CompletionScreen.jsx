import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { saveTeamCompletion, getLeaderboard } from '../utils/supabase'

export default function CompletionScreen() {
  const { teamName, completionTime, hintsUsed, resetGame } = useGameStore()
  const [leaderboard, setLeaderboard] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const saveAndLoad = async () => {
      if (!saved) {
        await saveTeamCompletion(teamName, completionTime, hintsUsed)
        setSaved(true)
      }
      const data = await getLeaderboard(10)
      setLeaderboard(data)
    }
    saveAndLoad()
  }, [teamName, completionTime, hintsUsed, saved])

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

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
            <table className="w-full">
              <thead className="bg-christmas-gold">
                <tr>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Team Name</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Hints</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((team, index) => (
                  <tr key={team.id} className={`border-t ${team.team_name === teamName ? 'bg-yellow-100 font-bold' : ''}`}>
                    <td className="p-2">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </td>
                    <td className="p-2">{team.team_name}</td>
                    <td className="p-2">{formatTime(team.completion_time)}</td>
                    <td className="p-2">{Object.values(team.hints_used || {}).reduce((a,b) => a+b, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={resetGame}
          className="btn-primary"
        >
          🎮 Play Again
        </button>

        <p className="mt-6 text-gray-600">
          Share your time with friends and challenge them to beat it!
        </p>
      </div>
    </div>
  )
}
