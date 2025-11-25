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
      setError('❌ Incorrect code! Study the ancient timekeeper...')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="min-h-screen relative">
      {showSuccess && <Confetti numberOfPieces={200} recycle={false} />}

      {/* Background image */}
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/mail-room.png)' }}
      />

      <div className="relative z-10 room-card">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-christmas-red mb-2">
            🎅 SANTA'S OFFICE - The Control Room
          </h2>
          <p className="text-gray-600 text-lg">Room 1 of 5</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-christmas-gold rounded-xl p-6 mb-6 shadow-inner">
          <p className="text-lg leading-relaxed text-gray-800">
            <span className="font-bold text-christmas-red text-xl">⏰ THE ANCIENT TIMEKEEPER'S CIPHER</span>
            <br /><br />
            You've entered Santa's Command Center. The room is filled with ancient technology
            - control panels, communication devices, and mysterious instruments forged by the Ancient Elves.
            <br /><br />
            Above the grand fireplace hangs <span className="font-bold">the Timekeeper's Clock</span>,
            an artifact of immense power. The elves say it doesn't just tell time—it <span className="italic">guards</span> it.
            <br /><br />
            <span className="font-bold text-christmas-burgundy">
              "When the clock strikes the hour of completion, speak its name to unlock the first seal."
            </span>
          </p>
        </div>

        {/* Visual Clock Representation */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-6 shadow-2xl border-4 border-christmas-gold">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-br from-amber-100 to-yellow-50 rounded-full p-8 shadow-2xl border-8 border-christmas-burgundy relative" style={{width: '280px', height: '280px'}}>
              {/* Clock face */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Hour numbers */}
                  {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour, index) => {
                    const angle = (index * 30) - 90;
                    const radian = (angle * Math.PI) / 180;
                    const radius = 100;
                    const x = radius * Math.cos(radian);
                    const y = radius * Math.sin(radian);

                    return (
                      <div
                        key={hour}
                        className="absolute text-2xl font-bold text-gray-800"
                        style={{
                          left: `calc(50% + ${x}px - 12px)`,
                          top: `calc(50% + ${y}px - 12px)`,
                        }}
                      >
                        {hour}
                      </div>
                    );
                  })}

                  {/* Clock hands */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Hour hand pointing to 12 */}
                    <div
                      className="absolute bg-gray-800 rounded-full origin-bottom"
                      style={{
                        width: '8px',
                        height: '50px',
                        bottom: '50%',
                        transform: 'rotate(0deg)',
                      }}
                    />
                    {/* Minute hand pointing to 12 */}
                    <div
                      className="absolute bg-gray-600 rounded-full origin-bottom"
                      style={{
                        width: '4px',
                        height: '70px',
                        bottom: '50%',
                        transform: 'rotate(0deg)',
                      }}
                    />
                    {/* Center dot */}
                    <div className="absolute w-6 h-6 bg-christmas-red rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xl font-bold text-christmas-gold">
              ⏰ The Ancient Timekeeper shows the hour of completion
            </p>
            <p className="text-gray-400 italic mt-2">
              "Speak the name of the hour to break the seal..."
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            <span className="font-bold">📜 Ancient Elf Inscription:</span> "The first seal opens not with numbers, but with the <span className="italic">word</span> that names the hour. When both hands point skyward to the number of completeness, speak its ancient name."
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-lg font-bold text-gray-700 mb-2">
            🔐 Enter the Ancient Word:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Speak the hour's name..."
              className="input-field flex-1 text-center text-2xl uppercase tracking-widest"
              maxLength={20}
              disabled={showSuccess}
            />
            <button
              type="submit"
              className="btn-primary px-12"
              disabled={showSuccess || !answer.trim()}
            >
              {showSuccess ? '✅ Unlocked!' : '🔓 Submit'}
            </button>
          </div>

          {error && (
            <p className="text-red-600 font-bold mt-2 text-center bg-red-50 border border-red-300 rounded p-3 text-lg">{error}</p>
          )}

          {showSuccess && (
            <p className="text-green-600 font-bold mt-2 text-center animate-pulse text-xl">
              🎉 The First Seal is broken! The Toy Factory door unlocks...
            </p>
          )}
        </form>

        <HintSystem roomKey="room1" />
      </div>
    </div>
  )
}
