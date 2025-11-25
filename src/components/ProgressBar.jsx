import { useGameStore } from '../store/gameStore'

export default function ProgressBar() {
  const currentRoom = useGameStore(state => state.currentRoom)
  const goToRoom = useGameStore(state => state.goToRoom)

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
            <button
              onClick={() => goToRoom(room.num)}
              className={`flex flex-col items-center ${
                currentRoom === room.num ? 'scale-110' : ''
              } transition-all hover:scale-125 cursor-pointer`}
              title={`Jump to ${room.name} (Dev Mode)`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                currentRoom > room.num ? 'bg-green-500' :
                currentRoom === room.num ? 'bg-christmas-gold animate-pulse' :
                'bg-gray-400'
              } hover:ring-4 hover:ring-white/50 transition-all`}>
                {currentRoom > room.num ? '✓' : room.icon}
              </div>
              <span className="text-white text-xs mt-1 text-center">{room.name}</span>
            </button>
            
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
