import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { validateAnswer } from '../../utils/answers'
import HintSystem from '../HintSystem'
import Confetti from 'react-confetti'

export default function Room1() {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [expandedLetter, setExpandedLetter] = useState(null)
  const { nextRoom, saveAnswer } = useGameStore()

  const legendaryLetters = [
    {
      id: 1,
      name: "Clara",
      age: 7,
      hometown: "Caramel Creek",
      state: "Colorado",
      year: 1847,
      content: `Dear Father Christmas,

I do not want toys this year. I only want my grandmother to feel better. She has been coughing since the first snow and cannot get warm. She always smells like cinnamon and calls me her "little sugarplum." If you could bring her woolen socks and perhaps some of your magic, I would be so grateful.

Your faithful believer,
Clara`
    },
    {
      id: 2,
      name: "Amir",
      age: 9,
      hometown: "Anchorage",
      state: "Alaska",
      year: 1923,
      content: `Dear Santa Claus,

My father works on a fishing vessel and has been gone for many weeks. I do not need presents — I only want him to come home safe before the ice sets in. Could you ask the winds to be gentle? I have left extra cookies because I think the elves probably eat yours before you see them.

Hopefully,
Amir`
    },
    {
      id: 3,
      name: "Nina",
      age: 6,
      hometown: "Nashville",
      state: "Tennessee",
      year: 1962,
      content: `Dear Santa,

My baby brother cries all night and Mama is so tired she falls asleep at supper. I want to help but I am too small. Could you bring something to make him happy? I have been good all year even when I wanted to pinch him.

Love,
Nina`
    },
    {
      id: 4,
      name: "Diego",
      age: 8,
      hometown: "Denver",
      state: "Colorado",
      year: 1989,
      content: `Dear Santa,

I know you are very busy. I do not need a new bike or Nintendo. I only want my dog Biscuit to stop being scared of thunderstorms. She hides under my bed and shivers so hard. Can you fix that? I will share my Christmas cookies with her if you do.

Thank you,
Diego`
    },
    {
      id: 5,
      name: "Yuki",
      age: 10,
      hometown: "Yakima",
      state: "Washington",
      year: 2003,
      content: `Dear Mr. Claus,

I am writing because my mother says you answer letters from children who try their best. I try very hard. I would like my family to eat dinner together again, like we used to before. That is all I want.

Respectfully yours,
Yuki`
    }
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
      setError('Incorrect code. Look deeper into the Archive...')
      setAnswer('')
    }
  }

  return (
    <div className="room-card">
      {showSuccess && <Confetti numberOfPieces={200} recycle={false} />}

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-christmas-red mb-2">
          The Mail Room
        </h2>
        <p className="text-gray-600 text-lg">Room 1 of 5</p>
      </div>

      {/* Scene Description */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-6 mb-6">
        <p className="text-gray-700 leading-relaxed mb-4">
          You enter the North Pole Mail Room — a cavernous space filled with pneumatic tubes,
          sorting machines, and mountains of envelopes. But dominating the far wall is something
          different: a glass display case illuminated by soft golden light, containing five
          weathered letters on velvet pedestals.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Above the case, carved in ancient elvish script (with a helpful translation beneath), reads:
        </p>
      </div>

      {/* Mail Room Image */}
      <div className="mb-6 rounded-xl overflow-hidden shadow-2xl border-4 border-amber-600">
        <img
          src="/images/new mailroom.png"
          alt="The Archive of Selfless Wishes"
          className="w-full"
        />
      </div>

      {/* Archive Title */}
      <div className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 text-white text-center py-4 px-6 rounded-lg mb-6 shadow-lg">
        <h3 className="text-2xl font-bold tracking-wider" style={{ fontFamily: 'serif' }}>
          THE ARCHIVE OF SELFLESS WISHES
        </h3>
      </div>

      {/* Lore Card */}
      <div className="bg-amber-50 border-4 border-amber-600 rounded-lg p-6 mb-8 shadow-inner">
        <p className="text-gray-800 leading-relaxed text-lg italic">
          "You stand before the Five Legendary Letters — the most selfless wishes ever received
          in the 1,600-year history of the North Pole Post Office.
        </p>
        <p className="text-gray-800 leading-relaxed text-lg italic mt-4">
          When the Ancient Elves designed the Ultimate Lockdown Protocol, they chose these letters
          as the first key. They believed that only those who truly understand the spirit of
          Christmas — that giving matters more than receiving — would be worthy of unlocking the workshop.
        </p>
        <p className="text-gray-800 leading-relaxed text-lg italic mt-4">
          These children asked for nothing for themselves. Their wishes live eternally in our Archive.
          And hidden within them... is the first code.
        </p>
        <p className="text-gray-800 leading-relaxed text-lg font-bold mt-4 text-center">
          Find the connection. The code is a 5-letter word."
        </p>
      </div>

      {/* The Five Letters */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-christmas-green mb-4 text-center">
          The Five Legendary Letters
        </h3>

        <div className="space-y-4">
          {legendaryLetters.map((letter) => (
            <div
              key={letter.id}
              className="bg-gradient-to-b from-amber-100 to-amber-50 border-2 border-amber-500 rounded-lg overflow-hidden shadow-lg"
            >
              {/* Brass Nameplate */}
              <div
                className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 px-4 py-3 cursor-pointer hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 transition-all"
                onClick={() => setExpandedLetter(expandedLetter === letter.id ? null : letter.id)}
              >
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="text-amber-950 font-bold">
                    <span className="text-lg">{letter.name}</span>
                    <span className="text-amber-800 ml-2">Age {letter.age}</span>
                  </div>
                  <div className="text-amber-950 text-right">
                    <span className="font-semibold">{letter.hometown}, {letter.state}</span>
                    <span className="text-amber-800 ml-3">December {letter.year}</span>
                  </div>
                </div>
                <div className="text-amber-800 text-sm mt-1 text-center">
                  {expandedLetter === letter.id ? '[ Click to collapse ]' : '[ Click to read letter ]'}
                </div>
              </div>

              {/* Letter Content */}
              {expandedLetter === letter.id && (
                <div className="p-6 bg-amber-50">
                  <div
                    className="bg-gradient-to-b from-yellow-50 to-amber-100 p-6 rounded border border-amber-300 shadow-inner"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    <pre className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed">
                      {letter.content}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Answer Input */}
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-xl">
          <label className="block text-xl font-bold text-christmas-gold mb-3 text-center">
            Enter the 5-Letter Code:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter code..."
              className="input-field flex-1 text-center text-2xl uppercase tracking-widest"
              maxLength={10}
              disabled={showSuccess}
            />
            <button
              type="submit"
              className="btn-primary px-8"
              disabled={showSuccess || !answer.trim()}
            >
              {showSuccess ? 'Unlocked!' : 'Submit'}
            </button>
          </div>

          {error && (
            <p className="text-red-400 font-bold mt-3 text-center">{error}</p>
          )}

          {showSuccess && (
            <p className="text-green-400 font-bold mt-3 text-center animate-pulse text-lg">
              The Archive glows with approval. The first seal is broken...
            </p>
          )}
        </div>
      </form>

      <HintSystem roomKey="room1" />
    </div>
  )
}
