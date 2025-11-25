import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { validateAnswer } from '../../utils/answers'
import HintSystem from '../HintSystem'
import Confetti from 'react-confetti'

export default function Room2() {
  const [lockLetters, setLockLetters] = useState(['', '', '', '', ''])
  const [conveyorAnswers, setConveyorAnswers] = useState({
    conveyor1: '',
    conveyor2: '',
    conveyor3: '',
    conveyor4: '',
    conveyor5: ''
  })
  const [carolsIdentified, setCarolsIdentified] = useState({
    conveyor1: false,
    conveyor2: false,
    conveyor3: false,
    conveyor4: false,
    conveyor5: false
  })
  const [cipherWords, setCipherWords] = useState({
    conveyor1: '',
    conveyor2: '',
    conveyor3: '',
    conveyor4: '',
    conveyor5: ''
  })
  const [lettersRevealed, setLettersRevealed] = useState({
    conveyor1: false,
    conveyor2: false,
    conveyor3: false,
    conveyor4: false,
    conveyor5: false
  })
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { nextRoom, saveAnswer} = useGameStore()

  // Correct answers for each conveyor belt (left to right in image)
  const correctAnswers = {
    conveyor1: {
      carolAnswers: ['silver bells', 'silverbells'],
      carol: 'Silver Bells',
      fifthWord: ["it's", 'its'],
      letter: 'L'
    },
    conveyor2: {
      carolAnswers: ['little drummer boy', 'drummer boy'],
      carol: 'Little Drummer Boy',
      fifthWord: ['me'],
      letter: 'S'
    },
    conveyor3: {
      carolAnswers: ['here comes santa claus', 'here comes santa'],
      carol: 'Here Comes Santa Claus',
      fifthWord: ['here'],
      letter: 'E'
    },
    conveyor4: {
      carolAnswers: ['12 days of christmas', 'twelve days of christmas', '12 days'],
      carol: '12 Days of Christmas',
      fifthWord: ['christmas'],
      letter: 'B'
    },
    conveyor5: {
      carolAnswers: ['frosty the snowman', 'frosty'],
      carol: 'Frosty the Snowman',
      fifthWord: ['was'],
      letter: 'L'
    }
  }

  const handleConveyorSubmit = (conveyorId) => {
    const userAnswer = conveyorAnswers[conveyorId].toLowerCase().trim()
    const correct = correctAnswers[conveyorId]

    if (correct.carolAnswers.some(ans => ans === userAnswer)) {
      // Correct! Mark as identified
      setCarolsIdentified({
        ...carolsIdentified,
        [conveyorId]: true
      })
      setError('')
    } else {
      setError(`❌ Not quite! Study conveyor belt ${conveyorId.slice(-1)} more carefully...`)
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleCipherWordSubmit = (conveyorId) => {
    const userWord = cipherWords[conveyorId].toLowerCase().trim()
    const correct = correctAnswers[conveyorId]

    if (correct.fifthWord.some(word => word === userWord)) {
      // Correct 5th word! Reveal the letter
      setLettersRevealed({
        ...lettersRevealed,
        [conveyorId]: true
      })
      setError('')
    } else {
      setError(`❌ Not the right word for ${correct.carol}. Check the 5th word carefully...`)
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleLetterChange = (index, value) => {
    // Accept only letters A-Z
    if (value.length <= 1 && /^[a-zA-Z]*$/i.test(value)) {
      const newLetters = [...lockLetters]
      newLetters[index] = value.toUpperCase()
      setLockLetters(newLetters)

      // Auto-focus next input
      if (value && index < 4) {
        document.getElementById(`letter-${index + 1}`)?.focus()
      }
    }
  }

  const allCarolsIdentified = Object.values(carolsIdentified).every(identified => identified === true)
  const allLettersRevealed = Object.values(lettersRevealed).every(revealed => revealed === true)

  const handleSubmit = (e) => {
    e.preventDefault()
    const code = lockLetters.join('').toLowerCase()

    if (validateAnswer('room2', code)) {
      saveAnswer('room2', code)
      setShowSuccess(true)
      setError('')

      setTimeout(() => {
        nextRoom()
      }, 3000)
    } else {
      setError('❌ Incorrect word! Review the cipher instructions carefully...')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="min-h-screen relative">
      {showSuccess && <Confetti numberOfPieces={300} recycle={false} />}

      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/toy-factory-puzzle.png)' }}
      />

      <div className="relative z-10 room-card">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-christmas-red mb-2">
            🧸 THE TOY FACTORY
          </h2>
          <p className="text-gray-600 text-lg">Room 2 of 5</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-green-50 border-2 border-christmas-gold rounded-xl p-6 mb-6 shadow-inner">
          <p className="text-lg leading-relaxed text-gray-800">
            <span className="font-bold text-christmas-red text-xl">🎵 THE CAROL CIPHER LOCK</span>
            <br /><br />
            The Toy Factory has ground to a halt! The assembly lines are frozen mid-production,
            and the door is sealed by an ancient lock forged by the Musical Elves.
            <br /><br />
            <span className="font-bold text-christmas-burgundy">
              Study the factory floor carefully. Five Christmas carols are hidden in the image—identify them to unlock the next step of the cipher...
            </span>
          </p>
        </div>

        {/* Factory Image */}
        <div className="mb-6 bg-gray-900 rounded-xl p-4 border-4 border-christmas-burgundy">
          <img
            src="/images/Generated Image November 20, 2025 - 2_58PM.png"
            alt="Toy Factory"
            className="w-full rounded-lg shadow-2xl"
          />
          <p className="text-center text-christmas-gold mt-3 text-sm italic">
            🔍 Look closely at the assembly lines... What carols do the toys represent?
          </p>
        </div>

        {/* Conveyor Belt Carol Identification */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-purple-300">
          <h3 className="text-2xl font-bold text-center mb-4 text-purple-800">
            🎵 Identify the Christmas Carols
          </h3>
          <p className="text-center text-gray-700 mb-4">
            Study the factory image. Each conveyor belt shows toys that represent a famous Christmas carol.
            <br />Type the carol name for each belt below.
          </p>

          <div className="space-y-4">
            {['conveyor1', 'conveyor2', 'conveyor3', 'conveyor4', 'conveyor5'].map((conveyorId, index) => {
              const isIdentified = carolsIdentified[conveyorId]

              return (
                <div key={conveyorId} className={`p-4 rounded-lg border-2 ${
                  isIdentified ? 'bg-green-50 border-green-500' : 'bg-white border-gray-300'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-32">
                      <p className="font-bold text-lg text-purple-900">Conveyor Belt {index + 1}</p>
                    </div>

                    {!isIdentified ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={conveyorAnswers[conveyorId]}
                          onChange={(e) => setConveyorAnswers({
                            ...conveyorAnswers,
                            [conveyorId]: e.target.value
                          })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleConveyorSubmit(conveyorId)
                            }
                          }}
                          placeholder="Type the carol name..."
                          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                          disabled={showSuccess}
                        />
                        <button
                          onClick={() => handleConveyorSubmit(conveyorId)}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                          disabled={!conveyorAnswers[conveyorId].trim() || showSuccess}
                        >
                          Check
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center">
                        <p className="text-green-700 font-bold text-lg">✅ {correctAnswers[conveyorId].carol} identified!</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {allCarolsIdentified && (
            <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 animate-pulse">
              <p className="text-center text-green-700 font-bold text-lg">
                ✨ All carols identified! The cipher mechanism unlocks below...
              </p>
            </div>
          )}
        </div>

        {/* Stage 2: Cipher Decoder - Only shows after all carols identified */}
        {allCarolsIdentified && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-6 border-2 border-amber-400">
            <h3 className="text-2xl font-bold text-center mb-4 text-amber-900">
              🔐 The Musical Cipher Decoder
            </h3>
            <p className="text-center text-gray-700 mb-4">
              The ancient mechanism has activated! To decode each carol's cipher letter, you must consult the song scrolls.<br />
              <span className="font-bold">Find the 5th word from each carol's opening verse</span> and enter it below.
            </p>

            <div className="space-y-4">
              {['conveyor1', 'conveyor2', 'conveyor3', 'conveyor4', 'conveyor5'].map((conveyorId, index) => {
                const isRevealed = lettersRevealed[conveyorId]
                const letter = correctAnswers[conveyorId].letter

                return (
                  <div key={conveyorId} className={`p-4 rounded-lg border-2 ${
                    isRevealed ? 'bg-amber-100 border-amber-600' : 'bg-white border-gray-300'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-48">
                        <p className="font-bold text-lg text-amber-900">{correctAnswers[conveyorId].carol}</p>
                        <p className="text-sm text-gray-600">Belt {index + 1}</p>
                      </div>

                      {!isRevealed ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={cipherWords[conveyorId]}
                            onChange={(e) => setCipherWords({
                              ...cipherWords,
                              [conveyorId]: e.target.value
                            })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCipherWordSubmit(conveyorId)
                              }
                            }}
                            placeholder="Enter the 5th word..."
                            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                            disabled={showSuccess}
                          />
                          <button
                            onClick={() => handleCipherWordSubmit(conveyorId)}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                            disabled={!cipherWords[conveyorId].trim() || showSuccess}
                          >
                            Decode
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-between">
                          <p className="text-amber-800 font-bold text-lg">✅ Word decoded!</p>
                          <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl animate-pulse border-4 border-amber-800">
                            {letter}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {allLettersRevealed && (
              <div className="mt-6 bg-amber-100 border-2 border-amber-600 rounded-lg p-4">
                <p className="text-center text-amber-900 font-bold text-lg mb-2">
                  🎉 All cipher letters revealed!
                </p>
                <p className="text-center text-gray-700">
                  You now have the letters: <span className="font-bold text-2xl">L, S, E, B, L</span>
                  <br />
                  Rearrange them to spell a festive word and enter it in the lock below!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Lock Interface */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-6 shadow-2xl border-4 border-christmas-gold">
          <h3 className="text-3xl font-bold text-center mb-6 text-christmas-gold">
            🔐 The Ancient Carol Lock
          </h3>

          <p className="text-center text-amber-300 mb-4">
            Enter the 5 letters in the correct order:
          </p>

          <div className="flex justify-center gap-4 mb-6">
            {lockLetters.map((letter, index) => (
              <input
                key={index}
                id={`letter-${index}`}
                type="text"
                value={letter}
                onChange={(e) => handleLetterChange(index, e.target.value)}
                maxLength={1}
                className="w-20 h-24 text-5xl font-bold text-center bg-amber-100 border-4 border-christmas-burgundy rounded-xl shadow-2xl focus:ring-4 focus:ring-christmas-gold focus:outline-none uppercase"
                disabled={showSuccess || !allLettersRevealed}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="btn-primary w-full text-2xl py-4"
            disabled={showSuccess || lockLetters.some(l => !l) || !allLettersRevealed}
          >
            {showSuccess ? '✅ Lock Opened!' : '🔓 Open Lock'}
          </button>

          {error && (
            <p className="text-red-400 font-bold mt-4 text-center bg-red-900/50 border border-red-500 rounded p-3 text-lg">{error}</p>
          )}

          {showSuccess && (
            <p className="text-green-400 font-bold mt-4 text-center animate-pulse text-xl bg-green-900/50 border border-green-500 rounded p-3">
              🎉 The lock springs open! The Reindeer Stable door unlocks...
            </p>
          )}
        </div>

        <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            <span className="font-bold">💡 Hint:</span> Three stages: 1) Identify the carols from the toys. 2) Look up each carol's lyrics and find the 5th word. 3) Unscramble the revealed letters to spell a festive word!
          </p>
        </div>

        <HintSystem roomKey="room2" />
      </div>
    </div>
  )
}
