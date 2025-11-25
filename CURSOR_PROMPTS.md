# 🤖 Cursor AI Prompts for Building Rooms

Use these prompts in Cursor to build out the remaining puzzle rooms. Copy and paste them directly into Cursor's chat!

---

## 🧸 Room 2: Toy Factory (Visual/Counting Puzzle)

```
Build Room 2 (Toy Factory) for the Santa's Workshop escape room app.

PUZZLE CONCEPT:
- Display a grid of toy emojis (bears, trains, dolls, robots)
- Users count each toy type
- Multiply count by line number
- Numbers point to letters on a workshop map that spell "TOOLS"

REQUIREMENTS:
1. Follow the same structure as Room1.jsx
2. Create a visual grid showing:
   - 🧸🧸🧸 (3 bears on line 1 → 3×1=3)
   - 🚂🚂 (2 trains on line 2 → 2×2=4)
   - 👧 (1 doll on line 3 → 1×3=3)
   - 🤖🤖 (2 robots on line 4 → 2×4=8)
3. Show a "workshop map" with numbered coordinates that spell letters
4. The answer should be: TOOLS
5. Include 3 progressive hints
6. Success animation with confetti
7. Navigate to Room 3 on success

FILE: src/components/rooms/Room2.jsx
```

---

## 🦌 Room 3: Reindeer Stable (Drag & Drop Ordering)

```
Build Room 3 (Reindeer Stable) for the Santa's Workshop escape room app.

PUZZLE CONCEPT:
- Display 9 scrambled reindeer names
- Users drag them into correct order from the classic poem
- Correct order: Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner, Blitzen, Rudolph
- When all placed correctly, answer is "RUDOLPH"

REQUIREMENTS:
1. Follow the same structure as Room1.jsx
2. Create drag-and-drop interface with 9 reindeer cards
3. Scrambled starting order
4. Visual feedback when dragging
5. Check order on submit - answer is "RUDOLPH" when Rudolph is in position 9
6. The answer should be: RUDOLPH
7. Include 3 progressive hints
8. Success animation with confetti
9. Navigate to Room 4 on success

LIBRARIES: Use HTML5 drag and drop or a simple click-to-swap mechanic

FILE: src/components/rooms/Room3.jsx
```

---

## 🍪 Room 4: Cookie Kitchen (Symbol Decoder)

```
Build Room 4 (Cookie Kitchen) for the Santa's Workshop escape room app.

PUZZLE CONCEPT:
- Display a recipe with Christmas symbol emojis
- Each symbol = one letter
- Show a decoder key (legend)
- Users translate symbols to letters to spell "TREATS"

REQUIREMENTS:
1. Follow the same structure as Room1.jsx
2. Create a recipe card showing:
   🎄 = T
   🧈 = R  
   🥚 = E
   ⭐ = A
   ❄️ = S
3. Recipe shows: "Secret Ingredient: 🎄 🧈 🥚 ⭐ 🎄 ❄️"
4. Display decoder key as a legend
5. The answer should be: TREATS
6. Include 3 progressive hints
7. Success animation with confetti
8. Navigate to Room 5 on success

DESIGN: Christmas-themed, cozy kitchen aesthetic

FILE: src/components/rooms/Room4.jsx
```

---

## 🎅 Room 5: Santa's Office (Meta Puzzle)

```
Build Room 5 (Santa's Office) for the Santa's Workshop escape room app.

PUZZLE CONCEPT:
- Final room - simpler meta puzzle
- Users need to enter the current year
- Shows a control panel interface
- This is the climax before completion

REQUIREMENTS:
1. Follow the same structure as Room1.jsx BUT call completeGame() instead of nextRoom()
2. Create a festive "control panel" interface
3. Display previous room progress/answers as context clue
4. The answer should be: 2024 (current year)
5. Include 3 progressive hints
6. BIG success animation with lots of confetti
7. Call completeGame() to go to completion screen

DESIGN: Make this feel epic - it's the final room!

FILE: src/components/rooms/Room5.jsx
```

---

## 🎨 Bonus: Enhanced Features

Once you've built all 5 rooms, try these enhancements:

### Add Sound Effects
```
Add sound effects to the Santa's Workshop app:
1. Jingle bells sound on correct answer
2. "Ho ho ho!" sound when completing Room 5
3. Ticking clock sound when < 5 minutes remain
4. Use HTML5 Audio API
5. Add mute/unmute button

Keep sounds festive and not annoying!
```

### Add Animations
```
Enhance the Santa's Workshop app with CSS animations:
1. Snowflakes falling in background (already exists - enhance it!)
2. Pulsing effect on timer when low
3. Shake animation on wrong answer
4. Smooth transitions between rooms
5. Santa sleigh flying across screen on completion

Use Tailwind's animation utilities where possible.
```

### Mobile Optimization
```
Optimize Santa's Workshop app for mobile devices:
1. Ensure all puzzles work on touch screens
2. Make drag-and-drop work with touch events
3. Adjust font sizes for smaller screens
4. Test on iPhone and Android
5. Add viewport meta tags if needed

Priority: Rooms 3 (drag-drop) and responsive layouts
```

---

## 💡 Tips for Using These Prompts

1. **One room at a time**: Build and test each room before moving to the next
2. **Test thoroughly**: Make sure answer validation works
3. **Check hints**: Verify all 3 hints display correctly
4. **Mobile test**: Check on different screen sizes
5. **Have fun**: Add your own creative touches!

---

## 🐛 Common Issues & Fixes

### If Cursor generates code that doesn't work:

```
The code you generated for Room [X] isn't working correctly. Here's the error:
[paste error message]

Please fix it while maintaining:
1. The same answer validation pattern as Room1.jsx
2. The HintSystem component integration  
3. Success animation with Confetti
4. Proper navigation (nextRoom or completeGame)
```

### If styling looks wrong:

```
The styling for Room [X] doesn't match the Christmas theme. Please:
1. Use Tailwind's christmas color palette (christmas-red, christmas-green, christmas-gold)
2. Match the .room-card styling from Room1.jsx
3. Keep consistent spacing and borders
4. Make it festive and fun!
```

---

**Happy building! 🎄**
