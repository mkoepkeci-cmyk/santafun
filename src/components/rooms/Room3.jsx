import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import HintSystem from '../HintSystem'
import Confetti from 'react-confetti'

export default function Room3() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [assignments, setAssignments] = useState({})
  const [draggedNameplate, setDraggedNameplate] = useState(null)
  const [verificationResults, setVerificationResults] = useState({}) // tracks correct/incorrect per stall
  const [hasChecked, setHasChecked] = useState(false)
  const { nextRoom, saveAnswer } = useGameStore()

  // Only the 8 reindeer - RUDOLPH is pre-filled as leader
  const nameplates = [
    'BLITZEN', 'CUPID', 'PRANCER', 'DASHER',
    'VIXEN', 'DONNER', 'COMET', 'DANCER'
  ]

  const stalls = [
    { id: 1, clue: "The swiftest of all — always first off the ground, a blur of brown fur.", answer: 'DASHER' },
    { id: 2, clue: "Grace in motion, this one moves like music made visible.", answer: 'DANCER' },
    { id: 3, clue: "Head held high, hooves precise — vanity perhaps, but earned.", answer: 'PRANCER' },
    { id: 4, clue: "The clever one. Watches everything. Knows more than she lets on.", answer: 'VIXEN' },
    { id: 5, clue: "Blazes through the sky like a streak of light from the heavens.", answer: 'COMET' },
    { id: 6, clue: "The heart of the team — believes in love above all else.", answer: 'CUPID' },
    { id: 7, clue: "Thunder follows where this one flies. Steady. Powerful. Certain.", answer: 'DONNER' },
    { id: 8, clue: "Lightning in reindeer form — electric energy, impossible to tire.", answer: 'BLITZEN' }
  ]

  const handleDragStart = (nameplate) => {
    if (!showSuccess) {
      setDraggedNameplate(nameplate)
    }
  }

  const handleDrop = (stallId) => {
    if (draggedNameplate && !showSuccess) {
      const newAssignments = { ...assignments }
      // Remove from previous stall if assigned elsewhere
      Object.keys(newAssignments).forEach(key => {
        if (newAssignments[key] === draggedNameplate) {
          delete newAssignments[key]
        }
      })
      // Assign to new stall
      newAssignments[stallId] = draggedNameplate
      setAssignments(newAssignments)
      setDraggedNameplate(null)
      // Clear verification when assignments change
      setVerificationResults({})
      setHasChecked(false)
    }
  }

  const handleRemove = (stallId) => {
    if (!showSuccess) {
      const newAssignments = { ...assignments }
      delete newAssignments[stallId]
      setAssignments(newAssignments)
      // Clear verification when assignments change
      setVerificationResults({})
      setHasChecked(false)
    }
  }

  const handleVerifyFormation = () => {
    // Check each stall and mark correct/incorrect
    const results = {}
    let allCorrect = true

    for (const stall of stalls) {
      if (assignments[stall.id] === stall.answer) {
        results[stall.id] = 'correct'
      } else if (assignments[stall.id]) {
        results[stall.id] = 'incorrect'
        allCorrect = false
      } else {
        results[stall.id] = 'empty'
        allCorrect = false
      }
    }

    setVerificationResults(results)
    setHasChecked(true)

    if (allCorrect) {
      // Success! All 8 correct
      saveAnswer('room3', 'rudolph')
      setShowSuccess(true)

      setTimeout(() => {
        nextRoom()
      }, 3000)
    }
  }

  const assignedNameplates = Object.values(assignments)
  const availableNameplates = nameplates.filter(n => !assignedNameplates.includes(n))

  const correctCount = Object.values(verificationResults).filter(r => r === 'correct').length
  const incorrectCount = Object.values(verificationResults).filter(r => r === 'incorrect').length

  return (
    <div className="room-card">
      {showSuccess && <Confetti numberOfPieces={300} recycle={false} />}

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-christmas-red mb-2">
          The Reindeer Stable
        </h2>
        <p className="text-gray-600 text-lg">Room 3 of 5</p>
      </div>

      {/* Scene Description */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-6 mb-6">
        <p className="text-gray-700 leading-relaxed">
          You enter a warm, hay-scented stable lit by hanging lanterns. Eight reindeer peer
          curiously from their stalls, Christmas lights twinkling on their antlers. The stall
          nameplates have been scrambled — only Rudolph's position at the front remains secure.
        </p>
      </div>

      {/* Stable Image */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl border-4 border-amber-600">
        <img
          src="/images/reindeer.jpg"
          alt="The Reindeer Stable"
          className="w-full"
        />
      </div>

      {/* Lore Card */}
      <div className="bg-red-50 border-4 border-red-300 rounded-lg p-6 mb-8 shadow-inner">
        <p className="text-center text-red-800 font-bold text-lg mb-4">
          Notice from Jingleheimer Schmidt
        </p>
        <p className="text-gray-800 leading-relaxed italic">
          "The lockdown has scrambled the Reindeer Registry! Match each reindeer to their
          correct stall using the clues. The Ancient Elves designed the formation based on
          each reindeer's unique gift.
        </p>
        <p className="text-gray-800 leading-relaxed font-bold mt-4 text-center">
          Place all 8 reindeer correctly to restore the formation!"
        </p>
      </div>

      {/* Flight Formation Board */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-6 mb-6 border-4 border-amber-500">
        <h3 className="text-2xl font-bold text-christmas-gold mb-4 text-center">
          Flight Formation Board
        </h3>

        <div className="flex flex-col items-center text-white">
          {/* Lead Position - RUDOLPH pre-filled */}
          <div className="mb-4">
            <div className="w-28 h-14 border-2 border-red-500 bg-gradient-to-r from-red-700 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="font-bold text-white text-lg">RUDOLPH</span>
            </div>
            <p className="text-center text-red-400 text-sm mt-1">Lead Position</p>
          </div>

          <div className="text-2xl text-gray-500 mb-2">⬇</div>

          {/* Row 1-2 */}
          <div className="flex gap-8 mb-2">
            <div className={`w-20 h-10 border rounded flex items-center justify-center text-xs ${
              verificationResults[1] === 'correct' ? 'border-green-500 bg-green-900/50' :
              verificationResults[1] === 'incorrect' ? 'border-red-500 bg-red-900/50' :
              'border-amber-500'
            }`}>
              {assignments[1] || '[1]'}
            </div>
            <div className={`w-20 h-10 border rounded flex items-center justify-center text-xs ${
              verificationResults[2] === 'correct' ? 'border-green-500 bg-green-900/50' :
              verificationResults[2] === 'incorrect' ? 'border-red-500 bg-red-900/50' :
              'border-amber-500'
            }`}>
              {assignments[2] || '[2]'}
            </div>
          </div>

          {/* Row 3-4 */}
          <div className="flex gap-8 mb-2">
            <div className={`w-20 h-10 border rounded flex items-center justify-center text-xs ${
              verificationResults[3] === 'correct' ? 'border-green-500 bg-green-900/50' :
              verificationResults[3] === 'incorrect' ? 'border-red-500 bg-red-900/50' :
              'border-amber-500'
            }`}>
              {assignments[3] || '[3]'}
            </div>
            <div className={`w-20 h-10 border rounded flex items-center justify-center text-xs ${
              verificationResults[4] === 'correct' ? 'border-green-500 bg-green-900/50' :
              verificationResults[4] === 'incorrect' ? 'border-red-500 bg-red-900/50' :
              'border-amber-500'
            }`}>
              {assignments[4] || '[4]'}
            </div>
          </div>

          {/* Row 5-6 */}
          <div className="flex gap-8 mb-2">
            <div className={`w-20 h-10 border rounded flex items-center justify-center text-xs ${
              verificationResults[5] === 'correct' ? 'border-green-500 bg-green-900/50' :
              verificationResults[5] === 'incorrect' ? 'border-red-500 bg-red-900/50' :
              'border-amber-500'
            }`}>
              {assignments[5] || '[5]'}
            </div>
            <div className={`w-20 h-10 border rounded flex items-center justify-center text-xs ${
              verificationResults[6] === 'correct' ? 'border-green-500 bg-green-900/50' :
              verificationResults[6] === 'incorrect' ? 'border-red-500 bg-red-900/50' :
              'border-amber-500'
            }`}>
              {assignments[6] || '[6]'}
            </div>
          </div>

          {/* Row 7-8 */}
          <div className="flex gap-8 mb-4">
            <div className={`w-20 h-10 border rounded flex items-center justify-center text-xs ${
              verificationResults[7] === 'correct' ? 'border-green-500 bg-green-900/50' :
              verificationResults[7] === 'incorrect' ? 'border-red-500 bg-red-900/50' :
              'border-amber-500'
            }`}>
              {assignments[7] || '[7]'}
            </div>
            <div className={`w-20 h-10 border rounded flex items-center justify-center text-xs ${
              verificationResults[8] === 'correct' ? 'border-green-500 bg-green-900/50' :
              verificationResults[8] === 'incorrect' ? 'border-red-500 bg-red-900/50' :
              'border-amber-500'
            }`}>
              {assignments[8] || '[8]'}
            </div>
          </div>

          {/* Sleigh */}
          <div className="text-3xl">🛷</div>
        </div>
      </div>

      {/* Scattered Nameplates */}
      <div className={`bg-gradient-to-b from-amber-100 to-amber-50 rounded-xl p-6 mb-6 border-2 ${showSuccess ? 'border-green-500' : 'border-amber-500'}`}>
        <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">
          Scattered Nameplates
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {availableNameplates.map((nameplate) => (
            <div
              key={nameplate}
              draggable={!showSuccess}
              onDragStart={() => handleDragStart(nameplate)}
              className={`px-4 py-2 rounded-lg shadow-lg transition-transform ${
                showSuccess
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 cursor-grab active:cursor-grabbing hover:scale-105'
              }`}
            >
              <span className="font-bold text-amber-950">{nameplate}</span>
            </div>
          ))}
          {availableNameplates.length === 0 && !showSuccess && (
            <p className="text-amber-700 italic">All nameplates assigned! Click "Verify Formation" below.</p>
          )}
          {showSuccess && (
            <p className="text-green-700 font-bold">Formation complete!</p>
          )}
        </div>
      </div>

      {/* The Eight Stalls */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-christmas-green mb-4 text-center">
          The Eight Stalls
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stalls.map((stall) => {
            const result = verificationResults[stall.id]
            const isCorrect = result === 'correct'
            const isIncorrect = result === 'incorrect'

            return (
              <div
                key={stall.id}
                onDragOver={(e) => !showSuccess && e.preventDefault()}
                onDrop={() => handleDrop(stall.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCorrect
                    ? 'bg-green-100 border-green-600'
                    : isIncorrect
                      ? 'bg-red-100 border-red-500'
                      : assignments[stall.id]
                        ? 'bg-green-50 border-green-500'
                        : 'bg-white border-gray-300 border-dashed'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    isCorrect ? 'bg-green-600' :
                    isIncorrect ? 'bg-red-500' :
                    'bg-amber-600'
                  }`}>
                    {isCorrect ? '✓' : isIncorrect ? '✗' : stall.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm italic mb-2">"{stall.clue}"</p>
                    {assignments[stall.id] ? (
                      <div className="flex items-center justify-between">
                        <div className={`px-3 py-1 rounded ${
                          isCorrect
                            ? 'bg-green-600'
                            : isIncorrect
                              ? 'bg-red-500'
                              : 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600'
                        }`}>
                          <span className={`font-bold ${isCorrect || isIncorrect ? 'text-white' : 'text-amber-950'}`}>
                            {assignments[stall.id]}
                          </span>
                        </div>
                        {!showSuccess && !isCorrect && (
                          <button
                            onClick={() => handleRemove(stall.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">Drag nameplate here...</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Verification Results */}
      {hasChecked && !showSuccess && (
        <div className="mb-6 bg-amber-100 border-2 border-amber-500 rounded-lg p-4">
          <p className="text-amber-900 font-bold text-center text-lg">
            {correctCount} correct, {incorrectCount} incorrect
          </p>
          <p className="text-amber-800 text-center mt-2">
            Fix the red X placements and try again!
          </p>
        </div>
      )}

      {/* Verify Formation Button */}
      {!showSuccess && (
        <div className="mb-6">
          <button
            onClick={handleVerifyFormation}
            className="w-full bg-christmas-green hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all text-xl"
            disabled={Object.keys(assignments).length !== 8}
          >
            Verify Formation ({Object.keys(assignments).length}/8 assigned)
          </button>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-100 border-4 border-green-500 rounded-lg p-6">
          <p className="text-green-800 font-bold text-center text-xl">
            Formation Complete!
          </p>
          <p className="text-green-700 text-center mt-2">
            The reindeer stomp their hooves in approval. The third seal is broken...
          </p>
        </div>
      )}

      <HintSystem roomKey="room3" />
    </div>
  )
}
