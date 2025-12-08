import { useState, useEffect } from 'react'
import {
  getGameState,
  startGameGlobal,
  endGameGlobal,
  getAllTeams,
  getAllPendingHintRequests,
  approveHintRequest,
  denyHintRequest,
  subscribeToGameState,
  subscribeToAllTeams,
  subscribeToAllHintRequests
} from '../utils/supabase'
import { HINTS } from '../utils/answers'

const FACILITATOR_PASSWORD = 'Rudolph'

export default function FacilitatorDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [gameState, setGameState] = useState({ is_active: false })
  const [teams, setTeams] = useState([])
  const [hintRequests, setHintRequests] = useState([])
  const [loading, setLoading] = useState(false)

  // Check if already authenticated (stored in sessionStorage)
  useEffect(() => {
    const authenticated = sessionStorage.getItem('facilitator_auth')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Load data and subscribe when authenticated
  useEffect(() => {
    if (!isAuthenticated) return

    const loadData = async () => {
      const state = await getGameState()
      setGameState(state)

      const teamsData = await getAllTeams()
      setTeams(teamsData)

      const hintsData = await getAllPendingHintRequests()
      setHintRequests(hintsData)
    }

    loadData()

    // Subscribe to real-time updates
    const gameStateSubscription = subscribeToGameState(() => loadData())
    const teamsSubscription = subscribeToAllTeams(() => loadData())
    const hintsSubscription = subscribeToAllHintRequests(() => loadData())

    // Refresh every 5 seconds as backup
    const interval = setInterval(loadData, 5000)

    return () => {
      gameStateSubscription?.unsubscribe()
      teamsSubscription?.unsubscribe()
      hintsSubscription?.unsubscribe()
      clearInterval(interval)
    }
  }, [isAuthenticated])

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === FACILITATOR_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('facilitator_auth', 'true')
      setPasswordError('')
    } else {
      setPasswordError('Incorrect password. Try again!')
      setPassword('')
    }
  }

  // Password gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-christmas-gold mb-4">
              Facilitator Access
            </h1>
            <p className="text-slate-300 text-lg">
              Enter the password to access the dashboard
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="bg-slate-700 rounded-xl p-8 shadow-2xl">
            <div className="mb-6">
              <label className="block text-white font-bold mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-slate-600 border-2 border-slate-500 rounded-lg px-4 py-3 text-white text-xl focus:outline-none focus:border-christmas-gold"
                autoFocus
              />
            </div>

            {passwordError && (
              <div className="mb-4 bg-red-900/50 border border-red-500 rounded-lg p-3">
                <p className="text-red-400 text-center">{passwordError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-christmas-green hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Handle Start Game
  const handleStartGame = async () => {
    setLoading(true)
    await startGameGlobal()
    const state = await getGameState()
    setGameState(state)
    setLoading(false)
  }

  // Handle End Game
  const handleEndGame = async () => {
    if (!confirm('End game and clear all teams? This cannot be undone.')) return
    setLoading(true)
    await endGameGlobal()

    // Re-fetch everything to confirm deletions
    const state = await getGameState()
    const remainingTeams = await getAllTeams()
    const remainingHints = await getAllPendingHintRequests()

    console.log('After end game - remaining teams:', remainingTeams)

    setGameState(state)
    setTeams(remainingTeams)
    setHintRequests(remainingHints)
    setLoading(false)
  }

  // Force clear all teams (separate from end game)
  const handleClearTeams = async () => {
    if (!confirm('Delete ALL teams from database? This cannot be undone.')) return
    setLoading(true)

    try {
      const { clearAllTeams } = await import('../utils/supabase')
      const result = await clearAllTeams()
      console.log('Clear teams result:', result)

      // Re-fetch
      const remainingTeams = await getAllTeams()
      const remainingHints = await getAllPendingHintRequests()
      console.log('After clear - remaining teams:', remainingTeams)

      setTeams(remainingTeams)
      setHintRequests(remainingHints)
    } catch (err) {
      console.error('Error clearing teams:', err)
    }

    setLoading(false)
  }

  // Handle hint approval
  const handleApproveHint = async (requestId) => {
    await approveHintRequest(requestId)
    const hintsData = await getAllPendingHintRequests()
    setHintRequests(hintsData)
  }

  // Handle hint denial
  const handleDenyHint = async (requestId) => {
    await denyHintRequest(requestId)
    const hintsData = await getAllPendingHintRequests()
    setHintRequests(hintsData)
  }

  const formatTime = (seconds) => {
    if (!seconds) return '--:--'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getRoomName = (roomNum) => {
    const rooms = {
      0: 'Lobby',
      1: 'Mail Room',
      2: 'Toy Factory',
      3: 'Reindeer Stable',
      4: 'Cookie Kitchen',
      5: "Santa's Office",
      6: 'Completed!'
    }
    return rooms[roomNum] || 'Unknown'
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Start/End Game */}
        <div className="bg-slate-700 rounded-xl p-6 mb-6 shadow-xl">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-christmas-gold">
                Facilitator Dashboard
              </h1>
              <p className="text-slate-300">
                Status: <span className={`font-bold ${gameState.is_active ? 'text-green-400' : 'text-yellow-400'}`}>
                  {gameState.is_active ? 'GAME ACTIVE' : 'WAITING TO START'}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              {!gameState.is_active ? (
                <button
                  onClick={handleStartGame}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-lg text-2xl transition-all disabled:opacity-50 animate-pulse"
                >
                  {loading ? 'Starting...' : '🎮 START GAME'}
                </button>
              ) : (
                <button
                  onClick={handleEndGame}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all disabled:opacity-50"
                >
                  {loading ? 'Ending...' : '🛑 END GAME'}
                </button>
              )}
              {teams.length > 0 && (
                <button
                  onClick={handleClearTeams}
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'Clearing...' : '🗑️ CLEAR TEAMS'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Teams Panel */}
          <div className="lg:col-span-2">
            <div className="bg-slate-700 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                Teams ({teams.length})
              </h2>

              {teams.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-xl">No teams registered yet</p>
                  <p className="mt-2">
                    {gameState.is_active
                      ? 'Teams will appear here when they join'
                      : 'Start the game to allow teams to join'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {teams
                    .sort((a, b) => {
                      // Sort by: completed first (by time), then by room progress
                      if (a.completion_time && b.completion_time) {
                        return a.completion_time - b.completion_time
                      }
                      if (a.completion_time) return -1
                      if (b.completion_time) return 1
                      return b.current_room - a.current_room
                    })
                    .map((team, index) => (
                      <div
                        key={team.id}
                        className={`p-4 rounded-lg border-2 ${
                          team.completion_time
                            ? 'bg-green-900/30 border-green-500'
                            : 'bg-slate-600 border-slate-500'
                        }`}
                      >
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {team.completion_time
                                ? index === 0
                                  ? '🥇'
                                  : index === 1
                                  ? '🥈'
                                  : index === 2
                                  ? '🥉'
                                  : '✅'
                                : '🎮'}
                            </span>
                            <div>
                              <p className="text-xl font-bold text-white">{team.team_name}</p>
                              <p className="text-slate-400 text-sm">
                                {team.completion_time
                                  ? `Finished in ${formatTime(team.completion_time)}`
                                  : `Currently in: ${getRoomName(team.current_room)}`}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {team.completion_time ? (
                              <p className="text-2xl font-bold text-green-400">
                                {formatTime(team.completion_time)}
                              </p>
                            ) : team.start_time ? (
                              <div>
                                <p className="text-slate-400 text-sm">Elapsed</p>
                                <ElapsedTimer startTime={team.start_time} />
                              </div>
                            ) : (
                              <p className="text-slate-400">Not started</p>
                            )}
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="mt-3 bg-slate-800 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              team.completion_time ? 'bg-green-500' : 'bg-christmas-gold'
                            }`}
                            style={{ width: `${(team.current_room / 6) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>Room {team.current_room}/5</span>
                          <span>
                            Hints: {Object.values(team.hints_used || {}).reduce((a, b) => a + b, 0)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Hint Requests Panel */}
          <div>
            <div className="bg-slate-700 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                Hint Requests
                {hintRequests.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full animate-pulse">
                    {hintRequests.length}
                  </span>
                )}
              </h2>

              {hintRequests.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <p>No pending hint requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {hintRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-yellow-900/30 border-2 border-yellow-500 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-white">
                            {request.live_teams?.team_name}
                          </p>
                          <p className="text-yellow-400 text-sm">
                            {request.room_key.replace('room', 'Room ')} - Hint #{request.hint_number}
                          </p>
                        </div>
                        <span className="text-2xl">💡</span>
                      </div>

                      {/* Show the hint text */}
                      <div className="bg-slate-800 rounded p-3 mb-3 text-sm">
                        <p className="text-slate-400 mb-1">Hint content:</p>
                        <p className="text-white">
                          {HINTS[request.room_key]?.[request.hint_number - 1] || 'Unknown hint'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveHint(request.id)}
                          className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-all"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDenyHint(request.id)}
                          className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-all"
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Elapsed time component that updates every second
function ElapsedTimer({ startTime }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = new Date(startTime).getTime()

    const updateElapsed = () => {
      const now = Date.now()
      setElapsed(Math.floor((now - start) / 1000))
    }

    updateElapsed()
    const interval = setInterval(updateElapsed, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60

  return (
    <p className="text-xl font-mono text-yellow-400">
      {mins}:{secs.toString().padStart(2, '0')}
    </p>
  )
}
