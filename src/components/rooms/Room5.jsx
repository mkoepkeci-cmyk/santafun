import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { validateAnswer } from '../../utils/answers'
import HintSystem from '../HintSystem'
import Confetti from 'react-confetti'

export default function Room5() {
  const [answer, setAnswer] = useState('')
  const [showClues, setShowClues] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { completeGame, saveAnswer, answers } = useGameStore()

  // Recall previous room answers as part of the meta-puzzle
  const previousAnswers = [
    { room: 'Room 1', cipher: 'The Timekeeper', answer: answers.room1 || '???' },
    { room: 'Room 2', cipher: 'The Carol Lock', answer: answers.room2 || '???' },
    { room: 'Room 3', cipher: 'The Star Compass', answer: answers.room3 || '???' },
    { room: 'Room 4', cipher: 'The Recipe Scroll', answer: answers.room4 || '???' },
  ]

  const ancientTexts = [
    { id: 1, book: 'The Book of Seasons', text: 'In cycles of time, the hour strikes twelve...' },
    { id: 2, book: 'The Chronicle of Carols', text: 'The sacred date when joy was born: 12-25...' },
    { id: 3, book: 'The Atlas of Stars', text: 'The guiding direction that points true North...' },
    { id: 4, book: 'The Tome of Flavors', text: 'The ingredient that gives Christmas its spice...' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateAnswer('room5', answer)) {
      saveAnswer('room5', answer)
      setShowSuccess(true)
      setError('')

      setTimeout(() => {
        completeGame()
      }, 3000)
    } else {
      setError('❌ Incorrect Word of Power! The essence of Christmas must be spoken...')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="min-h-screen relative">
      {showSuccess && <Confetti numberOfPieces={500} recycle={true} />}

      {/* Background image */}
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/mail-room.png)' }}
      />

      <div className="relative z-10 room-card">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-christmas-red mb-2">
            🎅 SANTA'S OFFICE - The Master Seal
          </h2>
          <p className="text-gray-600 text-lg">Room 5 of 5 - FINAL CHALLENGE!</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-gold-50 border-4 border-christmas-gold rounded-xl p-6 mb-6 shadow-2xl">
          <p className="text-lg leading-relaxed text-gray-800">
            <span className="font-bold text-christmas-red text-2xl">✨ THE ULTIMATE SEAL OF POWER ✨</span>
            <br /><br />
            You stand before the Master Control Panel in Santa's Office—the heart of the Workshop,
            forged by the First Elves in the Age of Wonder. This ancient mechanism controls everything:
            the toy machines, the reindeer stables, the ovens, and most importantly... time itself.
            <br /><br />
            <span className="font-bold text-christmas-burgundy">
              The seal requires not a number, nor a date, nor a direction, nor a flavor...
              but the single most powerful force that has sustained Christmas magic for millennia.
            </span>
            <br /><br />
            <span className="italic text-gray-700">
              "What invisible power keeps the North Pole alive? What makes children dream?
              What transforms ordinary nights into Christmas Eve? What makes reindeer fly and
              elves sing and cookies appear and presents materialize under trees across the world?"
            </span>
          </p>
        </div>

        {/* Ancient Library Section */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-purple-400">
          <h3 className="text-2xl font-bold text-center mb-4 text-purple-800">
            📚 The Ancient Library of Elven Wisdom
          </h3>
          <p className="text-center text-gray-700 mb-4">
            Four ancient books line the shelves, each holding clues to the Master Seal...
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ancientTexts.map((book) => (
              <div
                key={book.id}
                className="p-4 bg-white rounded-lg border-2 border-purple-300 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="text-4xl">📖</div>
                  <div>
                    <p className="font-bold text-lg text-purple-900">{book.book}</p>
                    <p className="text-sm text-gray-600 italic mt-1">"{book.text}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Journey Section */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6 border-2 border-blue-400">
          <h3 className="text-2xl font-bold text-center mb-4 text-blue-800">
            🗝️ Your Journey Through the Workshop
          </h3>
          <p className="text-center text-gray-700 mb-4">
            Reflect on the ciphers you've solved...
          </p>

          <div className="space-y-3">
            {previousAnswers.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border-2 border-blue-300 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-blue-900">{item.room}: {item.cipher}</p>
                  <p className="text-sm text-gray-600">You decoded: <span className="font-bold text-blue-700 uppercase">{item.answer}</span></p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowClues(!showClues)}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            {showClues ? '🔼 Hide Final Clue' : '🔽 Reveal Final Clue'}
          </button>

          {showClues && (
            <div className="mt-4 bg-blue-100 border-2 border-blue-500 rounded-lg p-4 animate-pulse">
              <p className="text-center text-blue-900 font-bold text-lg">
                💭 "Time measures it. Music celebrates it. Navigation finds it. Flavor enhances it.
                But what IS it? What force do all these things serve?"
              </p>
              <p className="text-center text-gray-700 mt-2 italic">
                The answer is not in the books. It's in your heart.
              </p>
            </div>
          )}
        </div>

        {/* Master Control Panel */}
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-8 mb-6 shadow-2xl border-4 border-christmas-gold">
          <h3 className="text-3xl font-bold text-center mb-6 text-christmas-gold">
            ⚡ THE MASTER CONTROL PANEL ⚡
          </h3>

          {/* Control Panel Visualization */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-red-900 to-red-950 rounded-xl border-8 border-gold-500 shadow-2xl p-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-pulse">⭐</div>
                  <p className="text-christmas-gold text-2xl font-bold mb-2">ULTIMATE SEAL</p>
                  <p className="text-amber-300 text-sm italic">Forged in the Age of Wonder</p>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <div className="bg-green-500 h-2 rounded animate-pulse"></div>
                    <div className="bg-red-500 h-2 rounded animate-pulse"></div>
                    <div className="bg-blue-500 h-2 rounded animate-pulse"></div>
                    <div className="bg-yellow-500 h-2 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block text-lg font-bold text-christmas-gold mb-2 text-center">
              🔐 SPEAK THE WORD OF POWER:
            </label>
            <p className="text-center text-amber-300 text-sm mb-4 italic">
              "The force that sustains all Christmas magic..."
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="The essence of Christmas..."
                className="input-field flex-1 text-center text-2xl uppercase tracking-widest font-bold"
                maxLength={20}
                disabled={showSuccess}
              />
              <button
                type="submit"
                className="btn-primary px-12 text-xl"
                disabled={showSuccess || !answer.trim()}
              >
                {showSuccess ? '🎉 SAVED!' : '⚡ ACTIVATE'}
              </button>
            </div>

            {error && (
              <p className="text-red-400 font-bold mt-4 text-center bg-red-900/50 border border-red-500 rounded p-3 text-lg">{error}</p>
            )}

            {showSuccess && (
              <div className="mt-4 bg-green-900/50 border border-green-500 rounded p-4 animate-pulse">
                <p className="text-green-400 font-bold text-center text-2xl mb-2">
                  🎄✨ THE SEAL IS BROKEN! ✨🎄
                </p>
                <p className="text-green-300 text-center text-lg">
                  The Workshop awakens! Machines hum to life! Christmas is saved!
                </p>
              </div>
            )}
          </form>
        </div>

        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            <span className="font-bold">💡 Hint:</span> The answer is not found in any of the previous puzzles.
            It's the single word that describes what makes all of Christmas possible—the invisible force
            that powers magic itself.
          </p>
        </div>

        <HintSystem roomKey="room5" />
      </div>
    </div>
  )
}
