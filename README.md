# 🎄 Santa's Workshop Crisis - Escape Room App

A virtual Christmas escape room experience where teams solve 5 sequential puzzles to save Christmas within 60 minutes!

## 📦 What's Included

This is a complete starter project with:
- ✅ Full React app structure with Vite
- ✅ Tailwind CSS styling with Christmas theme
- ✅ Zustand state management
- ✅ Supabase integration for leaderboard
- ✅ Room 1 (Mail Room) - **FULLY FUNCTIONAL**
- ✅ Rooms 2-5 - **PLACEHOLDER PUZZLES** (ready for you to build)
- ✅ Timer, progress tracking, hint system
- ✅ Confetti celebrations
- ✅ Mobile responsive design

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

```bash
cd santas-workshop
npm install
```

### Step 2: Set Up Supabase (Required for Leaderboard)

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **Settings** → **API** and copy:
   - Project URL
   - Anon/Public Key

4. Open `.env` file and update:
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

5. In Supabase, go to **SQL Editor** and run this query:

```sql
-- Create teams table for leaderboard
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  completion_time INTEGER NOT NULL,
  hints_used JSONB DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster leaderboard queries
CREATE INDEX idx_teams_completion_time ON teams(completion_time);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read and insert (for the leaderboard)
CREATE POLICY "Enable read access for all users" ON teams
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON teams
  FOR INSERT WITH CHECK (true);
```

### Step 3: Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## 🎮 How to Play

1. Enter your team name
2. Read the mission briefing
3. Solve 5 puzzles in sequence:
   - **Room 1**: Mail Room (Logic Puzzle) - ✅ COMPLETE
   - **Room 2**: Toy Factory (Visual Puzzle) - 🚧 BUILD THIS
   - **Room 3**: Reindeer Stable (Ordering Puzzle) - 🚧 BUILD THIS
   - **Room 4**: Cookie Kitchen (Decoder Puzzle) - 🚧 BUILD THIS
   - **Room 5**: Santa's Office (Meta Puzzle) - 🚧 BUILD THIS
4. Beat the 60-minute timer
5. Save your score to the leaderboard!

## 📁 Project Structure

```
santas-workshop/
├── src/
│   ├── components/
│   │   ├── rooms/
│   │   │   ├── Room1.jsx          ✅ Fully functional
│   │   │   ├── Room2.jsx          🚧 Placeholder
│   │   │   ├── Room3.jsx          🚧 Placeholder
│   │   │   ├── Room4.jsx          🚧 Placeholder
│   │   │   └── Room5.jsx          🚧 Placeholder
│   │   ├── LandingPage.jsx
│   │   ├── Introduction.jsx
│   │   ├── GameLayout.jsx
│   │   ├── Timer.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── HintSystem.jsx
│   │   └── CompletionScreen.jsx
│   ├── store/
│   │   └── gameStore.js           State management
│   ├── utils/
│   │   ├── answers.js             Puzzle answers & hints
│   │   └── supabase.js            Database functions
│   ├── App.jsx                     Main routing
│   ├── main.jsx                    Entry point
│   └── index.css                   Styles
├── .env                             Environment variables
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎯 Current Puzzle Answers

**Room 1**: `CANDY` (Find first letters in Nice List)
**Room 2**: `TOOLS` (Placeholder - build your puzzle)
**Room 3**: `RUDOLPH` (Placeholder - build your puzzle)
**Room 4**: `TREATS` (Placeholder - build your puzzle)
**Room 5**: `2024` (Placeholder - build your puzzle)

To change answers, edit `src/utils/answers.js`

## 🛠️ Building Your Puzzles with Cursor

### Option 1: Use AI to Build Rooms

Open Cursor and use prompts like:

```
Build Room 2 (Toy Factory) for the Santa's Workshop escape room.
Create a visual counting puzzle where users count toys and use multiplication.
Follow the same pattern as Room1.jsx.
Answer should be: TOOLS
```

### Option 2: Follow Room1 Pattern

Each room needs:
1. Puzzle description/narrative
2. Interactive puzzle UI
3. Answer validation
4. Success/error handling
5. Hint system integration

See `src/components/rooms/Room1.jsx` for the complete template!

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  christmas: {
    red: '#C41E3A',    // Your custom red
    green: '#165B33',   // Your custom green
    gold: '#FFD700',    // Your custom gold
  }
}
```

### Change Timer Duration
Edit `src/store/gameStore.js`:
```javascript
timeRemaining: 3600, // Change to desired seconds
```

### Add/Remove Rooms
1. Update `ANSWERS` in `src/utils/answers.js`
2. Create new Room component
3. Add to routing in `src/App.jsx`
4. Update progress bar in `src/components/ProgressBar.jsx`

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase errors
- Check `.env` file has correct credentials
- Verify SQL table creation completed
- Check browser console for specific error messages

### Tailwind styles not working
```bash
npm run dev
# Restart the dev server
```

## 📝 Next Steps

1. **Test Room 1**: Make sure everything works
2. **Build Room 2**: Start with the Toy Factory puzzle
3. **Customize**: Add your own twists and themes
4. **Deploy**: Use Vercel or Netlify (both have free tiers)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. New site from Git
4. Add environment variables
5. Deploy!

## 💡 Pro Tips

- **Test on mobile**: Many teams play on tablets
- **Adjust difficulty**: Use hints to balance challenge
- **Add sound effects**: Celebrate correct answers!
- **Track analytics**: See which puzzles are hardest
- **Time-based hints**: Reveal hints automatically after 10 min

## 🎁 What's Next?

After building your puzzles:
- Share with friends and family
- Use for virtual team events
- Create themed variations (Halloween, Easter, etc.)
- Add multiplayer competition mode

## 📧 Need Help?

Created for a virtual holiday party escape room experience.
Perfect for remote teams, family gatherings, or friend groups!

---

**Merry Christmas & Happy Coding! 🎄**
