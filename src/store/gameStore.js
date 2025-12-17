import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { updateTeamRoom, completeTeamGame } from '../utils/supabase'

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Game state
      teamName: '',
      currentRoom: -1, // -1 = intro story, 0 = team name, 1-5 = rooms, 6 = completion
      timeRemaining: 1800, // 30 minutes in seconds
      startTime: null,
      completionTime: null,
      gameStarted: false,
      viewedIntro: false,

      // Live team tracking
      liveTeamId: null,

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

      // Set the live team ID after registration
      setLiveTeamId: (id) => set({ liveTeamId: id }),

      proceedToTeamEntry: () => set({
        currentRoom: 0,
        viewedIntro: true
      }),

      startGame: () => {
        const state = get()
        set({
          gameStarted: true,
          currentRoom: 1,
          startTime: null  // Will be set when they click "Begin Mission"
        })

        // Update live team room
        if (state.liveTeamId) {
          updateTeamRoom(state.liveTeamId, 1)
        }
      },

      nextRoom: () => {
        const state = get()
        const newRoom = state.currentRoom + 1
        const updates = { currentRoom: newRoom }

        // Start timer when moving from intro (room 1 with no startTime) to actual room 1
        if (state.currentRoom === 1 && !state.startTime) {
          updates.startTime = Date.now()
        }

        set(updates)

        // Update live team room
        if (state.liveTeamId) {
          updateTeamRoom(state.liveTeamId, newRoom)
        }
      },

      // Development tool: Jump to any room
      goToRoom: (roomNumber) => set((state) => {
        const updates = { currentRoom: roomNumber }
        // Start timer if jumping to a puzzle room and timer hasn't started
        if (roomNumber >= 1 && roomNumber <= 5 && !state.startTime) {
          updates.startTime = Date.now()
        }
        return updates
      }),

      completeGame: () => {
        const state = get()
        const timeTaken = Math.floor((Date.now() - state.startTime) / 1000)

        set({
          currentRoom: 6,
          completionTime: timeTaken
        })

        // Update live team completion
        if (state.liveTeamId) {
          completeTeamGame(state.liveTeamId, timeTaken, state.hintsUsed)
        }
      },

      decrementTime: () => set((state) => {
        const newTime = state.timeRemaining - 1
        if (newTime <= 0) {
          // Time's up - handle game over
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
        currentRoom: -1,
        timeRemaining: 1800,
        startTime: null,
        completionTime: null,
        gameStarted: false,
        viewedIntro: false,
        liveTeamId: null,
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
      partialize: (state) => ({
        teamName: state.teamName,
        currentRoom: state.currentRoom,
        timeRemaining: state.timeRemaining,
        startTime: state.startTime,
        hintsUsed: state.hintsUsed,
        answers: state.answers,
        liveTeamId: state.liveTeamId
      })
    }
  )
)
