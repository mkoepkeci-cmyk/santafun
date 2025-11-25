# 🎮 Quick Reference Card

## Puzzle Answers (for testing)

| Room | Name | Answer | Theme |
|------|------|--------|-------|
| 1 | Mail Room | **CANDY** | Letters → Code |
| 2 | Toy Factory | **TOOLS** | Count → Coordinates |
| 3 | Reindeer Stable | **RUDOLPH** | Order → Name |
| 4 | Cookie Kitchen | **TREATS** | Symbols → Decode |
| 5 | Santa's Office | **2024** | Year → Master Code |

---

## Hints Per Room

### Room 1: Mail Room
1. "Look at the Nice list only..."
2. "Check the FIRST letter of each name"
3. "The letters spell a sweet treat: C-A-N-D-Y"

### Room 2: Toy Factory
1. "Count how many of each toy type appears"
2. "Multiply each count by its line number (1st line, 2nd line, etc.)"
3. "The numbers 3-4-3-8 point to letters on the workshop map that spell TOOLS"

### Room 3: Reindeer Stable
1. "Remember the classic poem: 'Now Dasher, now Dancer...'"
2. "Rudolph is always last, leading the way with his nose"
3. "The correct order starts: Dasher, Dancer, Prancer, Vixen..."

### Room 4: Cookie Kitchen
1. "Each symbol represents a single letter"
2. "Use the decoder key to translate each symbol in order"
3. "The word is: TREATS"

### Room 5: Santa's Office
1. "What year are we trying to save Christmas?"
2. "Think about the current year..."
3. "The answer is: 2024"

---

## Testing Checklist

### Before Your Party:

- [ ] Extract project: `tar -xzf santas-workshop.tar.gz`
- [ ] Install deps: `npm install`
- [ ] Start server: `npm run dev`
- [ ] Open: http://localhost:5173

### Test Each Room:

- [ ] Landing page loads
- [ ] Can enter team name
- [ ] Introduction plays (skip after 3s)
- [ ] Timer starts at 60:00
- [ ] Room 1 puzzle works
- [ ] Hints display correctly
- [ ] Room 2-5 accept answers
- [ ] Completion screen shows
- [ ] Time is displayed
- [ ] Leaderboard works (if Supabase setup)

### Mobile Test:

- [ ] Open on phone browser
- [ ] All text is readable
- [ ] Buttons are tappable
- [ ] No horizontal scroll
- [ ] Timer is visible

---

## Quick Deploy (Day-Of)

### Option 1: Local Network
```bash
# Get your IP address
ipconfig getifaddr en0  # Mac
# or
hostname -I  # Linux

# Start with network access
npm run dev -- --host

# Share with team:
# http://YOUR_IP:5173
```

### Option 2: Vercel (Free)
```bash
npm install -g vercel
npm run build
vercel

# Get shareable URL instantly!
```

### Option 3: Ngrok (Temporary)
```bash
# Install ngrok, then:
npm run dev
# In another terminal:
ngrok http 5173

# Share the ngrok URL
```

---

## Party Day Tips

1. **Start 5 minutes early** - Test URL with one person
2. **Share link in Zoom chat** - Everyone opens same URL
3. **Create breakout rooms** - 4-6 people per team
4. **Set expectations** - 60 minutes, work together
5. **Have hints ready** - Use hint button or give verbal clues
6. **Screen share for fun** - Show leaderboard at end

---

## Troubleshooting Day-Of

**"Page won't load"**
- Restart dev server: Ctrl+C, then `npm run dev`
- Clear browser cache: Cmd+Shift+R (Mac) / Ctrl+F5 (Windows)

**"Timer not starting"**
- Refresh the page
- Check browser console (F12)

**"Can't submit answer"**
- Check answer is spelled correctly (case-insensitive)
- Try refreshing page

**"Leaderboard empty"**
- Normal if Supabase not configured
- Teams can still play and see completion time

---

## Post-Party

### Get Feedback:
- What was the hardest puzzle?
- Did 60 minutes feel right?
- Any technical issues?
- Which room was most fun?

### Save Results:
- Check Supabase dashboard for completion times
- Take screenshot of final leaderboard
- Download team data as CSV

---

## Puzzle Design Notes

### Room Difficulty Curve:
1. **Mail Room**: Easy warmup (5-8 min)
2. **Toy Factory**: Medium (8-10 min)  
3. **Reindeer**: Medium-Hard (10-12 min)
4. **Cookie**: Medium (8-10 min)
5. **Santa's Office**: Easy finale (5 min)

### Hint Strategy:
- Hint 1: Gentle nudge
- Hint 2: More specific
- Hint 3: Almost gives answer

### Time Management:
- If teams are stuck >5 min on one puzzle → give hint
- If <20 min left and on Room 4 → give generous hints
- Goal: Everyone finishes and has fun!

---

## 🎄 Have a Great Party!

Remember: The goal is fun, not difficulty!

If people are struggling, don't hesitate to give extra hints or let them "solve" it and move on. The experience and team bonding is what matters! 

Merry Christmas! 🎅
