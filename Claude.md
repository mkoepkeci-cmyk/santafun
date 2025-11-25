# Santa's Workshop Crisis - Complete Build Specification

This is a comprehensive guide to build a Christmas-themed virtual escape room app for remote team holiday parties.

---

## Project Overview

**Name**: Santa's Workshop Crisis  
**Type**: React Web Application (Escape Room Game)  
**Story**: Jingleheimer Schmidt accidentally activated the Workshop's Ultimate Lockdown Protocol. Teams have 60 minutes to solve 5 puzzles to save Christmas.

**Tech Stack**:
- React 18 + Vite
- Tailwind CSS
- Zustand (state management)
- Supabase (optional - for leaderboard)
- react-confetti (celebrations)

---

## Initial Setup Commands

```bash
# Create React project
npm create vite@latest santas-workshop -- --template react
cd santas-workshop

# Install dependencies
npm install @supabase/supabase-js zustand react-confetti

# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## File Structure

```
santas-workshop/
├── .env
├── tailwind.config.js
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── LandingPage.jsx
    │   ├── Introduction.jsx
    │   ├── GameLayout.jsx
    │   ├── Timer.jsx
    │   ├── ProgressBar.jsx
    │   ├── HintSystem.jsx
    │   ├── CompletionScreen.jsx
    │   └── rooms/
    │       ├── Room1.jsx
    │       ├── Room2.jsx
    │       ├── Room3.jsx
    │       ├── Room4.jsx
    │       └── Room5.jsx
    ├── store/
    │   └── gameStore.js
    └── utils/
        ├── answers.js
        └── supabase.js
```

---

## Configuration Files

### `.env`

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: '#C41E3A',
          green: '#165B33',
          gold: '#FFD700',
          darkGreen: '#0F3D23',
          lightRed: '#E74C3C',
        }
      },
      fontFamily: {
        christmas: ['Mountains of Christmas', 'cursive'],
      }
    },
  },
  plugins: [],
}
```

### `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## Core Application Files

### `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
  font-family: 'Mountains of Christmas', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #165B33 0%, #0F3D23 100%);
  min-height: 100vh;
}

/* Snowflake animation */
@keyframes snowfall {
  0% {
    transform: translateY(-10vh) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(100px);
    opacity: 0.3;
  }
}

.snowflake {
  position: fixed;
  top: -10vh;
  color: white;
  font-size: 1em;
  animation: snowfall linear infinite;
  z-index: 0;
}

/* Button styles */
@layer components {
  .btn-primary {
    @apply bg-christmas-red hover:bg-christmas-lightRed text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-secondary {
    @apply bg-christmas-green hover:bg-christmas-darkGreen text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition hover:scale-105;
  }

  .input-field {
    @apply w-full px-4 py-3 rounded-lg border-2 border-christmas-gold bg-white text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-christmas-gold;
  }

  .room-card {
    @apply bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto;
  }
}
```

### `src/main.jsx`

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## State Management

### `src/store/gameStore.js`

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Game state
      teamName: '',
      currentRoom: 0, // 0 = landing, 1-5 = rooms, 6 = completion
      timeRemaining: 3600, // 60 minutes in seconds
      startTime: null,
      completionTime: null,
      gameStarted: false,
      
      // Hints tracking
      hintsUsed: {
        room1: 0,
        room2: 0,
        room3: 0,
        room4: 0,
        room5: 0
      },
      
      // Answers submitted
      answers: {
        room1: '',
        room2: '',
        room3: '',
        room4: '',
        room5: ''
      },

      // Actions
      setTeamName: (name) => set({ teamName: name }),
      
      startGame: () => set({ 
        gameStarted: true, 
        currentRoom: 1,
        startTime: Date.now()
      }),
      
      nextRoom: () => set((state) => ({ 
        currentRoom: state.currentRoom + 1 
      })),
      
      completeGame: () => {
        const state = get()
        const timeTaken = Math.floor((Date.now() - state.startTime) / 1000)
        set({ 
          currentRoom: 6,
          completionTime: timeTaken
        })
      },
      
      decrementTime: () => set((state) => {
        const newTime = state.timeRemaining - 1
        if (newTime <= 0) {
          return { timeRemaining: 0 }
        }
        return { timeRemaining: newTime }
      }),
      
      useHint: (room) => set((state) => ({
        hintsUsed: {
          ...state.hintsUsed,
          [room]: state.hintsUsed[room] + 1
        }
      })),
      
      saveAnswer: (room, answer) => set((state) => ({
        answers: {
          ...state.answers,
          [room]: answer
        }
      })),
      
      resetGame: () => set({
        teamName: '',
        currentRoom: 0,
        timeRemaining: 3600,
        startTime: null,
        completionTime: null,
        gameStarted: false,
        hintsUsed: {
          room1: 0,
          room2: 0,
          room3: 0,
          room4: 0,
          room5: 0
        },
        answers: {
          room1: '',
          room2: '',
          room3: '',
          room4: '',
          room5: ''
        }
      })
    }),
    {
      name: 'santa-workshop-game',
    }
  )
)
```

---

## Utility Files

### `src/utils/answers.js`

```javascript
// Puzzle answers (normalized to lowercase for comparison)
export const ANSWERS = {
  room1: 'candy',
  room2: 'tools',
  room3: 'rudolph',
  room4: 'treats',
  room5: '2024'
}

// Hint text for each room
export const HINTS = {
  room1: [
    "Look at the Nice list only...",
    "Check the FIRST letter of each name",
    "The letters spell a sweet treat: C-A-N-D-Y"
  ],
  room2: [
    "Count how many of each toy type appears",
    "Multiply each count by its line number (1st line, 2nd line, etc.)",
    "The numbers 3-4-3-8 point to letters on the workshop map that spell TOOLS"
  ],
  room3: [
    "Remember the classic poem: 'Now Dasher, now Dancer...'",
    "Rudolph is always last, leading the way with his nose",
    "The correct order starts: Dasher, Dancer, Prancer, Vixen... and when all are placed correctly, the answer is RUDOLPH"
  ],
  room4: [
    "Each symbol represents a single letter",
    "Use the decoder key to translate each symbol in order",
    "The word is: TREATS"
  ],
  room5: [
    "What year are we trying to save Christmas?",
    "Think about the current year...",
    "The answer is: 2024"
  ]
}

export const validateAnswer = (room, userAnswer) => {
  const correctAnswer = ANSWERS[room]
  return userAnswer.toLowerCase().trim() === correctAnswer
}
```

### `src/utils/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export const saveTeamCompletion = async (teamName, completionTime, hintsUsed) => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .insert([
        { 
          team_name: teamName, 
          completion_time: completionTime,
          hints_used: hintsUsed,
          completed_at: new Date().toISOString()
        }
      ])
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving team:', error)
    return null
  }
}

export const getLeaderboard = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('completion_time', { ascending: true })
      .limit(limit)
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
}
```

---

## Main App Component

### `src/App.jsx`

```javascript
import { useGameStore } from './store/gameStore'
import GameLayout from './components/GameLayout'
import LandingPage from './components/LandingPage'
import Introduction from './components/Introduction'
import CompletionScreen from './components/CompletionScreen'

import Room1 from './components/rooms/Room1'
import Room2 from './components/rooms/Room2'
import Room3 from './components/rooms/Room3'
import Room4 from './components/rooms/Room4'
import Room5 from './components/rooms/Room5'

function App() {
  const currentRoom = useGameStore(state => state.currentRoom)

  const renderRoom = () => {
    switch(currentRoom) {
      case 0:
        return <LandingPage />
      case 1:
        return <Room1 />
      case 2:
        return <Room2 />
      case 3:
        return <Room3 />
      case 4:
        return <Room4 />
      case 5:
        return <Room5 />
      case 6:
        return <CompletionScreen />
      default:
        return <LandingPage />
    }
  }

  if (currentRoom === 0) {
    return renderRoom()
  }

  const hasStarted = useGameStore(state => state.startTime)
  if (currentRoom === 1 && !hasStarted) {
    return <Introduction />
  }

  return (
    <GameLayout>
      {renderRoom()}
    </GameLayout>
  )
}

export default App
```

---

## UI Components

### `src/components/Timer.jsx`

```javascript
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

  const isLowTime = timeRemaining < 300
  const isCritical = timeRemaining < 60

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
```

### `src/components/ProgressBar.jsx`

```javascript
import { useGameStore } from '../store/gameStore'

export default function ProgressBar() {
  const currentRoom = useGameStore(state => state.currentRoom)
  
  const rooms = [
    { num: 1, name: 'Mail Room', icon: '✉️' },
    { num: 2, name: 'Toy Factory', icon: '🧸' },
    { num: 3, name: 'Reindeer Stable', icon: '🦌' },
    { num: 4, name: 'Cookie Kitchen', icon: '🍪' },
    { num: 5, name: "Santa's Office", icon: '🎅' }
  ]

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        {rooms.map((room, index) => (
          <div key={room.num} className="flex items-center">
            <div className={`flex flex-col items-center ${
              currentRoom === room.num ? 'scale-110' : ''
            } transition-transform`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                currentRoom > room.num ? 'bg-green-500' :
                currentRoom === room.num ? 'bg-christmas-gold animate-pulse' :
                'bg-gray-400'
              }`}>
                {currentRoom > room.num ? '✓' : room.icon}
              </div>
              <span className="text-white text-xs mt-1 text-center">{room.name}</span>
            </div>
            
            {index < rooms.length - 1 && (
              <div className={`w-16 h-1 mx-2 ${
                currentRoom > room.num ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### `src/components/HintSystem.jsx`

```javascript
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
```

### `src/components/GameLayout.jsx`

```javascript
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
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">🎄 {teamName}</h2>
            <p className="text-white/80">Operation Save Christmas</p>
          </div>
          <Timer />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <ProgressBar />
      </div>

      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  )
}
```

### `src/components/LandingPage.jsx`

```javascript
import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

export default function LandingPage() {
  const [name, setName] = useState('')
  const { setTeamName, startGame } = useGameStore()

  const handleStart = (e) => {
    e.preventDefault()
    if (name.trim()) {
      setTeamName(name.trim())
      startGame()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${Math.random() * 10 + 10}px`
          }}
        >
          ❄
        </div>
      ))}

      <div className="room-card text-center z-10 relative">
        <h1 className="text-6xl font-bold text-christmas-red mb-4">
          🎄 Santa's Workshop Crisis 🎄
        </h1>
        
        <div className="bg-christmas-red text-white px-6 py-3 rounded-lg inline-block mb-6 animate-pulse">
          <p className="text-xl font-bold">⚠️ URGENT: CODE RED ⚠️</p>
        </div>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Jingleheimer Schmidt has accidentally activated the <span className="font-bold text-christmas-red">ULTIMATE LOCKDOWN PROTOCOL</span>!
          <br />
          <br />
          Solve 5 puzzles in <span className="font-bold">60 minutes</span> to save Christmas!
        </p>

        <form onSubmit={handleStart} className="max-w-md mx-auto">
          <label className="block text-left text-lg font-bold text-gray-700 mb-2">
            Enter Your Team Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Elf Squad Alpha"
            className="input-field mb-6"
            maxLength={50}
            required
          />

          <button type="submit" className="btn-primary w-full text-2xl">
            🎅 START MISSION 🎅
          </button>
        </form>

        <div className="mt-8 text-sm text-gray-600">
          <p>✨ Best played with 2-6 people</p>
          <p>📱 Works on desktop, tablet, and mobile</p>
        </div>
      </div>
    </div>
  )
}
```

### `src/components/Introduction.jsx`

```javascript
import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'

export default function Introduction() {
  const [canSkip, setCanSkip] = useState(false)
  const nextRoom = useGameStore(state => state.nextRoom)

  useEffect(() => {
    const skipTimer = setTimeout(() => setCanSkip(true), 3000)
    const autoAdvance = setTimeout(() => nextRoom(), 15000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(autoAdvance)
    }
  }, [nextRoom])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="room-card max-w-3xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-christmas-red mb-2">
            📡 URGENT TRANSMISSION 📡
          </h2>
          <p className="text-sm text-gray-500">From: The North Pole</p>
          <p className="text-sm text-gray-500">Status: CODE RED</p>
        </div>

        <div className="bg-red-50 border-4 border-christmas-red rounded-lg p-6 text-left space-y-4">
          <p className="text-lg">
            <span className="font-bold">Date:</span> December 24th, 2024
          </p>

          <p className="text-lg leading-relaxed">
            This is <span className="font-bold text-christmas-red">Jingleheimer Schmidt</span>, 
            Head Elf of Operations. I've made a terrible mistake...
          </p>

          <p className="text-lg leading-relaxed">
            While updating our workshop's security system, I accidentally triggered the{' '}
            <span className="font-bold text-christmas-red">ULTIMATE LOCKDOWN PROTOCOL</span>. 
            Every door is sealed, every machine is frozen, and I can't override it!
          </p>

          <p className="text-lg leading-relaxed">
            The system will only unlock by solving the <span className="font-bold">5 security puzzles</span>{' '}
            scattered throughout the workshop. We have{' '}
            <span className="font-bold text-christmas-red">60 minutes</span> before the sleigh 
            launch window closes and Christmas is cancelled.
          </p>

          <p className="text-lg leading-relaxed">
            I'm transmitting the puzzle sequence to you now. You're our only hope!
          </p>

          <div className="bg-white rounded p-4 mt-4 border-2 border-christmas-green">
            <p className="font-bold text-xl">🎯 MISSION OBJECTIVES:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Solve 5 security puzzles</li>
              <li>Unlock each room sequentially</li>
              <li>Complete mission in 60 minutes</li>
              <li>Save Christmas!</li>
            </ul>
          </div>

          <p className="text-lg font-bold text-center mt-6">
            Starting location: THE MAIL ROOM ✉️
          </p>

          <p className="text-center text-sm">
            Good luck! Christmas depends on you!
            <br />
            - Jingleheimer
          </p>
        </div>

        {canSkip && (
          <button onClick={nextRoom} className="btn-primary mt-6 w-full">
            Begin Mission → Mail Room ✉️
          </button>
        )}

        {!canSkip && (
          <p className="text-center mt-4 text-gray-500 animate-pulse">
            Mission briefing in progress...
          </p>
        )}
      </div>
    </div>
  )
}
```

### `src/components/CompletionScreen.jsx`

```javascript
import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { saveTeamCompletion, getLeaderboard } from '../utils/supabase'
import Confetti from 'react-confetti'

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
      <Confetti numberOfPieces={500} recycle={true} />
      
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

        <button onClick={resetGame} className="btn-primary">
          🎮 Play Again
        </button>

        <p className="mt-6 text-gray-600">
          Share your time with friends and challenge them to beat it!
        </p>
      </div>
    </div>
  )
}
```

---

## Puzzle Room Components

### `src/components/rooms/Room1.jsx` - COMPLETE IMPLEMENTATION

```javascript
import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { validateAnswer } from '../../utils/answers'
import HintSystem from '../HintSystem'
import Confetti from 'react-confetti'

export default function Room1() {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { nextRoom, saveAnswer } = useGameStore()

  const niceList = [
    { name: "Charlotte", status: "Nice", wish: "Bicycle" },
    { name: "Adam", status: "Nice", wish: "Books" },
    { name: "Nora", status: "Nice", wish: "Doll" },
    { name: "Dylan", status: "Nice", wish: "Legos" },
    { name: "Yuri", status: "Nice", wish: "Train Set" }
  ]

  const naughtyList = [
    { name: "Bartholomew", status: "Naughty", wish: "Video Games" },
    { name: "Roderick", status: "Naughty", wish: "Tablet" },
    { name: "Penelope", status: "Naughty", wish: "Smartphone" }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateAnswer('room1', answer)) {
      saveAnswer('room1', answer)
      setShowSuccess(true)
      setError('')
      
      setTimeout(() => {
        nextRoom()
      }, 3000)
    } else {
      setError('❌ Incorrect code! Try again...')
      setAnswer('')
    }
  }

  return (
    <div className="room-card">
      {showSuccess && <Confetti numberOfPieces={200} recycle={false} />}
      
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-christmas-red mb-2">
          ✉️ THE MAIL ROOM
        </h2>
        <p className="text-gray-600 text-lg">Room 1 of 5</p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
        <p className="text-lg leading-relaxed">
          The Mail Room contains today's letters from children around the world. 
          The door lock requires a special code word that's hidden in the <span className="font-bold">Nice List</span>.
          <br /><br />
          <span className="font-bold text-christmas-red">
            Look carefully at the first letter of each child's name on the Nice List...
          </span>
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-green-600 mb-3">✅ Nice List</h3>
        <div className="bg-green-50 border-2 border-green-300 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-200">
              <tr>
                <th className="p-3 text-left">Child's Name</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Christmas Wish</th>
              </tr>
            </thead>
            <tbody>
              {niceList.map((child, index) => (
                <tr key={index} className="border-t border-green-200">
                  <td className="p-3 font-bold text-lg">{child.name}</td>
                  <td className="p-3 text-green-600">✅ {child.status}</td>
                  <td className="p-3">{child.wish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-red-600 mb-3">❌ Naughty List</h3>
        <div className="bg-red-50 border-2 border-red-300 rounded-lg overflow-hidden opacity-60">
          <table className="w-full">
            <thead className="bg-red-200">
              <tr>
                <th className="p-3 text-left">Child's Name</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Requested Item</th>
              </tr>
            </thead>
            <tbody>
              {naughtyList.map((child, index) => (
                <tr key={index} className="border-t border-red-200">
                  <td className="p-3">{child.name}</td>
                  <td className="p-3 text-red-600">❌ {child.status}</td>
                  <td className="p-3 line-through">{child.wish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block text-lg font-bold text-gray-700 mb-2">
          🔐 Enter Door Lock Code:
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the code word..."
            className="input-field flex-1"
            maxLength={20}
            disabled={showSuccess}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={showSuccess || !answer.trim()}
          >
            {showSuccess ? '✅ Unlocked!' : '🔓 Submit'}
          </button>
        </div>
        
        {error && (
          <p className="text-red-600 font-bold mt-2 text-center">{error}</p>
        )}
        
        {showSuccess && (
          <p className="text-green-600 font-bold mt-2 text-center animate-pulse">
            🎉 Correct! Advancing to Toy Factory...
          </p>
        )}
      </form>

      <HintSystem roomKey="room1" />
    </div>
  )
}
```

### `src/components/rooms/Room2.jsx` - PLACEHOLDER

```javascript
import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { validateAnswer } from '../../utils/answers'
import HintSystem from '../HintSystem'
import Confetti from 'react-confetti'

export default function Room2() {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { nextRoom, saveAnswer } = useGameStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateAnswer('room2', answer)) {
      saveAnswer('room2', answer)
      setShowSuccess(true)
      setError('')
      
      setTimeout(() => {
        nextRoom()
      }, 3000)
    } else {
      setError('❌ Incorrect code! Try again...')
      setAnswer('')
    }
  }

  return (
    <div className="room-card">
      {showSuccess && <Confetti numberOfPieces={200} recycle={false} />}
      
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-christmas-red mb-2">
          🧸 THE TOY FACTORY
        </h2>
        <p className="text-gray-600 text-lg">Room 2 of 5</p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
        <p className="text-lg leading-relaxed">
          The toy assembly lines have stopped mid-production. Count each toy type and 
          use the numbers to find the secret word on the workshop map.
          <br /><br />
          <span className="font-bold text-christmas-red">
            Answer: TOOLS
          </span>
        </p>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg mb-6 text-center">
        <p className="text-2xl mb-4">🚧 This room needs puzzle implementation 🚧</p>
        <p className="text-gray-600">
          TODO: Add visual toy grid with counting mechanic.
          <br />
          For now, enter "TOOLS" to proceed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block text-lg font-bold text-gray-700 mb-2">
          🔐 Enter the Secret Word:
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the code word..."
            className="input-field flex-1"
            maxLength={20}
            disabled={showSuccess}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={showSuccess || !answer.trim()}
          >
            {showSuccess ? '✅ Unlocked!' : '🔓 Submit'}
          </button>
        </div>
        
        {error && (
          <p className="text-red-600 font-bold mt-2 text-center">{error}</p>
        )}
        
        {showSuccess && (
          <p className="text-green-600 font-bold mt-2 text-center animate-pulse">
            🎉 Correct! Advancing to Reindeer Stable...
          </p>
        )}
      </form>

      <HintSystem roomKey="room2" />
    </div>
  )
}
```

### `src/components/rooms/Room3.jsx` through `Room5.jsx`

Follow the same pattern as Room2 - placeholders that accept the correct answer. Replace puzzle descriptions and icons appropriately:

- **Room 3**: 🦌 Reindeer Stable, Answer: RUDOLPH
- **Room 4**: 🍪 Cookie Kitchen, Answer: TREATS  
- **Room 5**: 🎅 Santa's Office, Answer: 2024 (use `completeGame()` instead of `nextRoom()`)

---

## Supabase Database Setup (Optional)

If using Supabase for the leaderboard, run this SQL:

```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  completion_time INTEGER NOT NULL,
  hints_used JSONB DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_teams_completion_time ON teams(completion_time);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON teams
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON teams
  FOR INSERT WITH CHECK (true);
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Puzzle Implementation Guide

### Room 2 - Toy Factory (Count & Calculate)
Display emoji toys in a grid. Users count each type and multiply by position to get coordinates.

### Room 3 - Reindeer Stable (Drag & Drop)
Create draggable reindeer name cards. Users arrange them in correct poem order.

### Room 4 - Cookie Kitchen (Symbol Decoder)
Show recipe with emoji symbols that map to letters. Users decode to spell "TREATS".

### Room 5 - Santa's Office (Meta-Puzzle)
Display previous room answers. Final code is the current year: 2024.

---

## Testing Checklist

- [ ] Landing page loads with snowflakes
- [ ] Team name entry works
- [ ] Introduction displays story
- [ ] Timer starts at 60:00
- [ ] Room 1 puzzle is fully functional
- [ ] Hints work in all rooms
- [ ] Progress bar updates correctly
- [ ] Completion screen shows time
- [ ] Leaderboard displays (if Supabase configured)
- [ ] Mobile responsive

---

## Quick Reference

**Answers:**
1. CANDY
2. TOOLS
3. RUDOLPH
4. TREATS
5. 2024

**Project is 70% complete:**
- ✅ All infrastructure and UI components
- ✅ Room 1 fully playable
- 🚧 Rooms 2-5 need puzzle UI implementation

**Next Steps:**
Build interactive puzzle mechanics for Rooms 2-5 using the Room1 component as a template.

