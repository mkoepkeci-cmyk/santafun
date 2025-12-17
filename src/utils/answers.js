// Puzzle answers (normalized to lowercase for comparison)
export const ANSWERS = {
  room1: 'candy',
  room2: 'bells',
  room3: 'rudolph',
  room4: 'treats',
  room5: 'magic'
}

// Hint text for each room
export const HINTS = {
  room1: [
    "The Ancient Elves honored these children by preserving more than just their words. Every detail was recorded for a reason.",
    "Home is where the heart is — and perhaps where the answer hides. Look beyond the letters themselves.",
    "The brass nameplates hold the key. Take the first letter of each child's hometown, ordered from oldest to newest: Caramel Creek, Anchorage, Nashville, Denver, Yakima."
  ],
  room2: [
    "Stage 1: Identify which Christmas carol each conveyor belt represents from the toys shown",
    "Stage 2: Look up the lyrics for each carol and find the 5th word. Enter it to reveal a letter",
    "Stage 3: Rearrange the revealed letters to spell a festive 5-letter word"
  ],
  room3: [
    "Each clue describes a reindeer's personality or ability. Think about what each name means — DASHER dashes, DANCER dances, PRANCER prances...",
    "Some trickier ones: VIXEN means a clever female fox. COMET streaks across the sky. DONNER means 'thunder' in German, BLITZEN means 'lightning'."
  ],
  room4: [
    "Mrs. Claus's recipe holds the key. The quantity numbers aren't just for measuring...",
    "Each quantity tells you which letter position to look at in that ingredient's name."
  ],
  room5: [
    "The Ancient Elves loved wordplay. Look carefully at how each room's lesson is described — the answer is woven into the words themselves.",
    "Each lesson has one word highlighted. What do those words have in common? Look at how they begin.",
    "Take the first letter of each lesson: Memories, Artistry, Guide, Ingredients, Claus = M-A-G-I-C"
  ]
}

export const validateAnswer = (room, userAnswer) => {
  const correctAnswer = ANSWERS[room]
  return userAnswer.toLowerCase().trim() === correctAnswer
}
