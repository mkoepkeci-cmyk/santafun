import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'

export default function Introduction() {
  const [canSkip, setCanSkip] = useState(false)
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const proceedToTeamEntry = useGameStore(state => state.proceedToTeamEntry)

  useEffect(() => {
    // Allow skipping after 5 seconds
    const skipTimer = setTimeout(() => setCanSkip(true), 5000)

    // Animate paragraphs appearing - SLOWER (1.5 seconds between each)
    const paragraphTimers = []
    for (let i = 1; i <= 8; i++) {
      paragraphTimers.push(setTimeout(() => setCurrentParagraph(i), i * 1500))
    }

    // NO auto-advance - user must click

    return () => {
      clearTimeout(skipTimer)
      paragraphTimers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-christmas-darkGreen via-christmas-pine to-black">
      {/* Animated snowflakes */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="snowflake fixed text-white opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 4}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 10 + 10}px`
          }}
        >
          ❄
        </div>
      ))}

      {/* Background control room image */}
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/control-room.png)' }}
      />

      <div className="relative z-10 bg-christmas-cream bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-4xl border-4 border-christmas-gold">
        <div className="text-center mb-6">
          <div className="inline-block bg-christmas-red text-white px-6 py-3 rounded-lg mb-4 animate-pulse shadow-lg">
            <p className="text-2xl font-bold">🚨 URGENT TRANSMISSION 🚨</p>
          </div>
          <div className="bg-white bg-opacity-60 rounded-lg p-3 inline-block">
            <p className="text-sm text-gray-700 font-semibold">📡 From: The North Pole Workshop</p>
            <p className="text-sm text-christmas-red font-bold">⚠️ Status: CODE RED - CHRISTMAS IN DANGER</p>
            <p className="text-xs text-gray-600 mt-1">December 24th, 2024 • 11:00 PM</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-green-50 border-4 border-christmas-burgundy rounded-xl p-8 text-left space-y-5 shadow-inner">
          <div className={`transition-all duration-700 ${currentParagraph >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <p className="text-xl leading-relaxed font-semibold text-christmas-burgundy">
              To whoever receives this transmission,
            </p>
            <p className="text-lg leading-relaxed mt-2">
              My name is <span className="font-bold text-christmas-red text-xl">Jingleheimer Schmidt</span>,
              Chief Elf of Workshop Operations here at the North Pole. I'm reaching out because we're facing an unprecedented crisis, and I need your help immediately.
            </p>
          </div>

          <div className={`transition-all duration-700 ${currentParagraph >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <p className="text-lg leading-relaxed">
              Tonight was supposed to be perfect. Santa's sleigh was loaded, the reindeer were ready, and millions of children
              around the world were dreaming of tomorrow morning. But then... I made a catastrophic mistake.
            </p>
          </div>

          <div className={`transition-all duration-700 ${currentParagraph >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <div className="bg-white bg-opacity-80 rounded-lg p-5 border-l-4 border-christmas-red shadow-md">
              <p className="text-lg leading-relaxed">
                While performing a routine security update at <span className="font-bold">10:47 PM</span>, I accidentally triggered
                the <span className="font-bold text-christmas-red text-xl">ULTIMATE LOCKDOWN PROTOCOL</span> — a fail-safe system
                designed to protect the workshop from intruders. Every door is now magnetically sealed. Every machine is frozen.
                The sleigh launch bay is completely inaccessible.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-700 ${currentParagraph >= 4 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <p className="text-lg leading-relaxed">
              I've tried everything — every override code, every emergency procedure in the manual. Nothing works.
              The system was designed by the Ancient Elves to be <span className="italic">completely unhackable</span>
              from the outside.
            </p>
          </div>

          <div className={`transition-all duration-700 ${currentParagraph >= 5 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-5 shadow-md">
              <p className="text-lg leading-relaxed font-semibold">
                But there <span className="italic">is</span> one way to unlock it: solving the <span className="font-bold text-christmas-burgundy">Five Ancient Puzzles</span> hidden
                throughout the workshop. Each room contains a security puzzle that, when solved, will grant you access to the next area.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-700 ${currentParagraph >= 6 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <p className="text-lg leading-relaxed">
              Here's the problem: it's now <span className="font-bold text-christmas-red">11:00 PM</span>.
              Santa's sleigh <span className="font-bold">must</span> launch by <span className="font-bold text-christmas-red">midnight</span> to
              complete the global delivery route on time. That gives us exactly <span className="font-bold text-2xl text-christmas-red">60 minutes</span>.
            </p>
          </div>

          <div className={`transition-all duration-700 ${currentParagraph >= 7 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <p className="text-lg leading-relaxed">
              If we don't unlock the workshop in time, Christmas will be cancelled for millions of children.
              No presents. No magic. No wonder. Just... nothing.
            </p>
          </div>

          <div className={`transition-all duration-700 ${currentParagraph >= 8 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <div className="bg-gradient-to-r from-christmas-green to-christmas-pine text-white rounded-xl p-6 mt-6 shadow-xl border-2 border-christmas-gold">
              <p className="font-bold text-2xl mb-3 text-center">🎯 YOUR MISSION:</p>
              <ul className="space-y-2 text-lg">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">✉️</span>
                  <span><strong>Room 1:</strong> The Mail Room — Decode the priority letters</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🧸</span>
                  <span><strong>Room 2:</strong> The Toy Factory — Solve the assembly line puzzle</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🦌</span>
                  <span><strong>Room 3:</strong> The Reindeer Stable — Arrange the team correctly</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🍪</span>
                  <span><strong>Room 4:</strong> The Cookie Kitchen — Decipher the secret recipe</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🎅</span>
                  <span><strong>Room 5:</strong> Santa's Office — Unlock the final override</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t-2 border-white/30">
                <p className="text-center text-xl">
                  <span className="font-bold">Time Limit:</span> <span className="text-christmas-gold text-2xl font-bold">60 Minutes</span>
                </p>
                <p className="text-center text-lg mt-2">
                  <span className="font-bold">Stakes:</span> Christmas for the entire world
                </p>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-700 ${currentParagraph >= 8 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <p className="text-xl font-bold text-center mt-6 text-christmas-burgundy">
              The clock is ticking. Christmas depends on you.
            </p>
            <p className="text-center text-lg italic mt-2 text-gray-700">
              May the magic of Christmas guide you,
              <br />
              <span className="font-bold">— Jingleheimer Schmidt</span>
              <br />
              <span className="text-sm">Chief Elf of Workshop Operations</span>
            </p>
          </div>
        </div>

        {canSkip && currentParagraph >= 5 && (
          <button
            onClick={proceedToTeamEntry}
            className="btn-primary mt-6 w-full text-2xl py-4 shadow-2xl transform hover:scale-105 transition-all"
          >
            🎄 I'm Ready - Let's Save Christmas! 🎄
          </button>
        )}

        {!canSkip && (
          <p className="text-center mt-4 text-christmas-burgundy animate-pulse font-semibold">
            📡 Urgent transmission incoming...
          </p>
        )}
      </div>
    </div>
  )
}
