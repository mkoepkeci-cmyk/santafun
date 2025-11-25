// Puzzle answers (normalized to lowercase for comparison)
export const ANSWERS = {
  room1: 'twelve',
  room2: 'bells',
  room3: 'north',
  room4: 'spice',
  room5: 'belief'
}

// Hint text for each room
export const HINTS = {
  room1: [
    "Look at the clock on the fireplace mantle...",
    "What time does the clock show? Count the numbers...",
    "The clock shows 12 o'clock. The answer is the word for that number: TWELVE"
  ],
  room2: [
    "Stage 1: Identify which Christmas carol each conveyor belt represents from the toys shown",
    "Stage 2: Look up the lyrics for each carol and find the 5th word. Enter it to reveal a letter",
    "Stage 3: The revealed letters (L, S, E, B, L) can be rearranged to spell: BELLS"
  ],
  room3: [
    "Look at the colored lights on the reindeer antlers...",
    "Each color might represent a letter or direction...",
    "The reindeer lights point to a navigation direction: NORTH"
  ],
  room4: [
    "Each cookie shape represents a letter in an ancient recipe...",
    "Look for patterns in the cookie decorations and match them to jar labels...",
    "The secret ingredient that makes Christmas special: SPICE"
  ],
  room5: [
    "This is the heart of the ancient magic. What makes Christmas real?",
    "Look at everything in Santa's office - books, symbols, the essence of the season...",
    "The ultimate power that unlocks everything: BELIEF"
  ]
}

export const validateAnswer = (room, userAnswer) => {
  const correctAnswer = ANSWERS[room]
  return userAnswer.toLowerCase().trim() === correctAnswer
}
