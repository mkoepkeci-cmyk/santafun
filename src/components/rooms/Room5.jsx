import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { validateAnswer } from '../../utils/answers'
import HintSystem from '../HintSystem'

export default function Room5() {
  const [answer, setAnswer] = useState('')
  const [lessonGuess, setLessonGuess] = useState('')
  const [lessonRevealed, setLessonRevealed] = useState(false)
  const [error, setError] = useState('')
  const [lessonError, setLessonError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { completeGame, saveAnswer, answers } = useGameStore()

  const handleLessonSubmit = () => {
    if (lessonGuess.toLowerCase().trim() === 'claus') {
      setLessonRevealed(true)
      setLessonError('')
    } else {
      setLessonError('That name doesn\'t fit. Whose office are you standing in?')
      setLessonGuess('')
    }
  }

  // The journey recap with hidden acrostic: M-A-G-I-C
  // Players must notice the pattern themselves
  const journeyRooms = [
    {
      room: 'Room 1',
      name: 'The Mail Room',
      code: answers.room1?.toUpperCase() || 'CANDY',
      lesson: 'Memories',
      description: 'of selfless children'
    },
    {
      room: 'Room 2',
      name: 'The Toy Factory',
      code: answers.room2?.toUpperCase() || 'BELLS',
      lesson: 'Artistry',
      description: 'in every craft'
    },
    {
      room: 'Room 3',
      name: 'The Reindeer Stable',
      code: answers.room3?.toUpperCase() || 'RUDOLPH',
      lesson: 'Guide',
      description: 'to lead the way'
    },
    {
      room: 'Room 4',
      name: 'The Cookie Kitchen',
      code: answers.room4?.toUpperCase() || 'TREATS',
      lesson: 'Ingredients',
      description: 'combined with love'
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateAnswer('room5', answer)) {
      saveAnswer('room5', answer)
      setShowSuccess(true)
      setError('')

      // Don't auto-transition - let the user click to continue
    } else {
      setError('The console rejects your input. The answer is hidden in the journey itself...')
      setAnswer('')
    }
  }

  return (
    <div className="room-card">

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-christmas-red mb-2">
          Santa's Office
        </h2>
        <p className="text-gray-600 text-lg">Room 5 of 5 — The Final Seal</p>
      </div>

      {/* Scene Description */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-6 mb-6">
        <p className="text-gray-700 leading-relaxed">
          You enter Santa's inner sanctum — a grand office with warm wood paneling, a crackling
          stone fireplace, and an enormous mahogany desk. The room feels ancient and important.
          On the desk sits a brass console with a glowing screen and a keypad, waiting for input.
        </p>
      </div>

      {/* Office Image */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl border-4 border-amber-600">
        <img
          src="/images/office.jpg"
          alt="Santa's Office"
          className="w-full"
        />
      </div>

      {/* Console Screen - Jingleheimer's Message */}
      <div className="bg-gray-900 rounded-xl p-6 mb-6 border-4 border-green-500 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 border-b border-green-700 pb-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-green-400 text-sm ml-2 font-mono">NORTH_POLE_MAINFRAME v1.0</span>
        </div>

        <div className="font-mono text-green-400 space-y-4">
          <p className="text-green-300 animate-pulse">&gt; INCOMING TRANSMISSION FROM: JINGLEHEIMER SCHMIDT</p>

          <div className="bg-black/50 rounded p-4 border border-green-700">
            <p className="leading-relaxed">
              "You've done the impossible. Four rooms. Four ancient locks. And now you stand
              in the heart of it all — <span className="text-yellow-400">Santa's Office</span>.
            </p>
            <p className="leading-relaxed mt-3">
              The final code was designed by the Ancient Elves as a failsafe. They believed
              that only someone who truly understood the <span className="text-yellow-400 font-bold">MEANING</span> of
              the journey should be able to finish it.
            </p>
            <p className="leading-relaxed mt-3">
              Look at what you've accomplished. Each room taught you something important.
              The Ancient Elves were masters of wordcraft — they hid the final answer
              <span className="text-yellow-400"> in the lessons themselves</span>."
            </p>
          </div>
        </div>
      </div>

      {/* Journey Recap Table */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-6 mb-6 border-4 border-amber-500">
        <h3 className="text-2xl font-bold text-christmas-gold mb-4 text-center">
          Your Journey Through the Workshop
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b-2 border-amber-500">
                <th className="p-3 text-left text-amber-400">Room</th>
                <th className="p-3 text-left text-amber-400">Code Solved</th>
                <th className="p-3 text-left text-amber-400">The Lesson Learned</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {journeyRooms.map((item, index) => (
                <tr key={index} className="border-b border-slate-700">
                  <td className="p-3">
                    <span className="text-slate-400">{item.room}:</span>
                    <br />
                    <span className="text-white">{item.name}</span>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-lg text-green-400">
                      {item.code}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-white font-semibold">{item.lesson}</span>
                    <span className="text-slate-400 ml-1">{item.description}</span>
                  </td>
                </tr>
              ))}
              {/* Room 5 row */}
              <tr className="border-b border-slate-700 bg-slate-800/50">
                <td className="p-3">
                  <span className="text-slate-400">Room 5:</span>
                  <br />
                  <span className="text-white">Santa's Office</span>
                </td>
                <td className="p-3">
                  <span className="font-bold text-lg text-yellow-400 animate-pulse">
                    ?????
                  </span>
                </td>
                <td className="p-3">
                  {lessonRevealed ? (
                    <span>
                      <span className="text-white font-semibold">Claus</span>
                      <span className="text-slate-400 ml-1">— the heart of it all</span>
                    </span>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <span className="text-slate-400 italic text-sm">
                        "Whose office is this? Complete the lesson..."
                      </span>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={lessonGuess}
                          onChange={(e) => setLessonGuess(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleLessonSubmit()}
                          placeholder="Enter name..."
                          className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white text-sm w-28 focus:outline-none focus:border-amber-400"
                          maxLength={15}
                        />
                        <button
                          onClick={handleLessonSubmit}
                          className="bg-amber-600 hover:bg-amber-500 text-white text-sm px-3 py-1 rounded transition-all"
                        >
                          Set
                        </button>
                      </div>
                      {lessonError && (
                        <span className="text-red-400 text-xs">{lessonError}</span>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* The riddle - only shows after Claus is filled in */}
        {lessonRevealed && (
          <div className="mt-6 bg-black/40 rounded-lg p-4 border border-amber-700 animate-fade-in">
            <p className="text-amber-200 text-center italic">
              "Now you see the complete picture. The Ancient Elves were masters of hidden meaning.
              <br />
              <span className="text-amber-400 font-semibold">What single word captures the essence of your entire journey?</span>
              <br />
              Look to the lessons. The answer begins there."
            </p>
          </div>
        )}
      </div>

      {/* Answer Input - Only shows after Claus is revealed */}
      {lessonRevealed && (
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-900 rounded-xl p-6 mb-6 border-4 border-green-500 shadow-2xl">
            <div className="font-mono text-green-400 mb-4">
              <p>&gt; FINAL SEAL REQUIRES 5-LETTER SOURCE CODE</p>
              <p className="text-green-600 text-sm">&gt; What powers Christmas?</p>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="_____"
                className="flex-1 bg-black border-2 border-green-500 rounded-lg px-4 py-3 text-green-400 text-center text-3xl uppercase tracking-widest font-mono focus:outline-none focus:border-yellow-400"
                maxLength={10}
                disabled={showSuccess}
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all text-xl"
                disabled={showSuccess || !answer.trim()}
              >
                {showSuccess ? 'ACCEPTED' : 'EXECUTE'}
              </button>
            </div>

            {error && (
              <div className="mt-4 bg-red-900/50 border border-red-500 rounded p-3">
                <p className="text-red-400 font-mono text-center">&gt; ERROR: {error}</p>
              </div>
            )}

            {showSuccess && (
              <div className="mt-4 space-y-4">
                <div className="bg-green-900/50 border border-green-500 rounded p-4">
                  <p className="text-green-400 font-mono text-center text-xl animate-pulse">
                    &gt; SOURCE CODE ACCEPTED
                  </p>
                  <p className="text-green-400 font-mono text-center text-xl">
                    &gt; LOCKDOWN PROTOCOL DEACTIVATED
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>
      )}

      {/* Victory Modal - Shows after success, positioned at bottom of viewport */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
          <div className="min-h-full flex items-end justify-center p-4 pb-8">
            <div className="bg-gradient-to-b from-green-50 to-emerald-100 border-4 border-green-500 rounded-xl p-8 max-w-2xl w-full shadow-2xl">
            <h3 className="text-3xl font-bold text-green-800 text-center mb-6">
              FINAL TRANSMISSION FROM JINGLEHEIMER SCHMIDT
            </h3>
            <div className="text-green-900 space-y-4 leading-relaxed">
              <p className="font-bold text-2xl text-center">
                "YOU DID IT! You actually did it!"
              </p>
              <p className="text-lg">
                The locks are released — I can hear the sleigh bay doors opening from here!
                Santa's already running to the launchpad. The reindeer are in position.
                <span className="font-bold"> Christmas is SAVED!</span>
              </p>
              <p className="text-lg">
                You honored the <span className="font-bold text-green-700">M</span>emories of children who gave selflessly.
                You celebrated the <span className="font-bold text-green-700">A</span>rtistry of every handcrafted toy.
                You found the <span className="font-bold text-green-700">G</span>uide who leads through the darkest nights.
                You discovered the <span className="font-bold text-green-700">I</span>ngredients that make every cookie special.
                And you remembered whose name makes it all real — <span className="font-bold text-green-700">C</span>laus.
              </p>
              <p className="text-center font-bold text-4xl text-green-700 py-4">
                M • A • G • I • C
              </p>
              <p className="italic text-lg">
                It's always been magic. Not the spells-and-wands kind — the real kind. The kind
                that happens when people work together, believe in something bigger than themselves,
                and refuse to give up.
              </p>
              <p className="font-bold text-lg">
                That's what you showed tonight. That's what saved Christmas.
              </p>
              <p className="text-center italic mt-6 pt-4 border-t border-green-300 text-lg">
                From Santa, Mrs. Claus, myself, and every elf at the North Pole —
                <span className="font-bold"> thank you. Merry Christmas.</span>
                <br />
                And never stop believing.
              </p>
              <p className="text-right text-green-700 font-bold text-lg">— Jingleheimer Schmidt</p>

              <button
                onClick={() => completeGame()}
                className="w-full mt-6 bg-christmas-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all text-xl"
              >
                Continue to Final Results
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

      <HintSystem roomKey="room5" />
    </div>
  )
}
