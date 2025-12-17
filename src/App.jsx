import { useGameStore } from './store/gameStore'
import GameLayout from './components/GameLayout'
import LandingPage from './components/LandingPage'
import Introduction from './components/Introduction'
import CompletionScreen from './components/CompletionScreen'
import FacilitatorDashboard from './components/FacilitatorDashboard'

// Import room components
import Room1 from './components/rooms/Room1'
import Room2 from './components/rooms/Room2'
import Room3 from './components/rooms/Room3'
import Room4 from './components/rooms/Room4'
import Room5 from './components/rooms/Room5'

function App() {
  // Check for facilitator route
  const isFacilitator = window.location.pathname === '/facilitator' || window.location.hash === '#/facilitator'

  if (isFacilitator) {
    return <FacilitatorDashboard />
  }

  const currentRoom = useGameStore(state => state.currentRoom)
  const startTime = useGameStore(state => state.startTime)

  const renderRoom = () => {
    switch(currentRoom) {
      case -1:
        return <Introduction />
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
        return (
          <div className="room-card text-center">
            <h2 className="text-4xl font-bold mb-4">Room {currentRoom} Coming Soon!</h2>
            <p className="text-xl mb-4">This room is under construction.</p>
            <button
              onClick={() => useGameStore.getState().nextRoom()}
              className="btn-primary"
            >
              Skip to Next Room (Dev Mode)
            </button>
          </div>
        )
    }
  }

  // Show intro story or landing page without layout
  if (currentRoom === -1 || currentRoom === 0) {
    return renderRoom()
  }

  // Start timer when entering room 1
  if (currentRoom === 1 && !startTime) {
    useGameStore.setState({ startTime: Date.now() })
  }

  return (
    <GameLayout>
      {renderRoom()}
    </GameLayout>
  )
}

export default App
