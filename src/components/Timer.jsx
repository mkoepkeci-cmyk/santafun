import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'

export default function Timer() {
  const { timeRemaining, decrementTime, gameStarted, currentRoom } = useGameStore()

  useEffect(() => {
    if (!gameStarted || currentRoom === 0 || currentRoom === 6) return

    const interval = setInterval(() => {
      decrementTime()
    }, 1000)

    return () => clearInterval(interval)
  }, [gameStarted, currentRoom, decrementTime])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const isLowTime = timeRemaining < 300 // Less than 5 minutes
  const isCritical = timeRemaining < 60 // Less than 1 minute

  return (
    <div className={`text-4xl font-bold ${
      isCritical ? 'text-red-600 animate-pulse' : 
      isLowTime ? 'text-orange-500' : 
      'text-christmas-gold'
    }`}>
      ⏱️ {formatTime(timeRemaining)}
    </div>
  )
}
