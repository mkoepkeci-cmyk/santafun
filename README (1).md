# Santa's Workshop Crisis - Escape Room App

A virtual Christmas escape room experience where teams solve 5 puzzles in 60 minutes to save Christmas!

## 🎄 Project Overview

**Story**: Jingleheimer Schmidt has accidentally activated the Ultimate Lockdown Protocol. Teams must solve 5 sequential puzzles to unlock the workshop before the sleigh launch window closes.

**Features**:
- 60-minute countdown timer
- 5 themed puzzle rooms
- Hint system (3 hints per room)
- Progress tracking
- Team leaderboard
- Completion certificates
- Mobile responsive

## 📁 Project Structure

```
santas-workshop/
├── src/
│   ├── App.jsx                    # Main app router
│   ├── main.jsx                   # React entry point
│   ├── index.css                  # Global styles
│   ├── components/
│   │   ├── LandingPage.jsx        # Team name entry
│   │   ├── Introduction.jsx       # Story briefing
│   │   ├── GameLayout.jsx         # Layout wrapper with timer
│   │   ├── Timer.jsx              # Countdown timer
│   │   ├── ProgressBar.jsx        # 5-room progress indicator
│   │   ├── HintSystem.jsx         # Hint display component
│   │   ├── CompletionScreen.jsx   # Success screen with leaderboard
│   │   └── rooms/
│   │       ├── Room1.jsx          # Mail Room (✅ COMPLETE)
│   │       ├── Room2.jsx          # Toy Factory (🚧 PLACEHOLDER)
│   │       ├── Room3.jsx          # Reindeer Stable (🚧 PLACEHOLDER)
│   │       ├── Room4.jsx          # Cookie Kitchen (🚧 PLACEHOLDER)
│   │       └── Room5.jsx          # Santa's Office (🚧 PLACEHOLDER)
│   ├── store/
│   │   └── gameStore.js           # Zustand state management
│   └── utils/
│       ├── answers.js             # Answer validation & hints
│       └── supabase.js            # Database client
├── .env                           # Environment variables
├── tailwind.config.js             # Tailwind CSS config
├── vite.config.js                 # Vite config
└── package.json                   # Dependencies
```

## 🚀 Quick Start

### 1. Extract and Setup

```bash
# Extract the project
tar -xzf santas-workshop.tar.gz
cd santas-workshop

# Install dependencies
npm install
```

### 2. Configure Supabase (Optional but Recommended)

Create a free Supabase account at https://supabase.com

**SQL Setup** (run in Supabase SQL Editor):
```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  completion_time INTEGER NOT NULL,
  hints_used JSONB DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_teams_completion_time ON teams(completion_time);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON teams
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON teams
  FOR INSERT WITH CHECK (true);
```

**Update .env file**:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the App

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open http://localhost:5173 in your browser!

## 🎮 Game Flow

1. **Landing Page** → Enter team name
2. **Introduction** → 15-second story briefing
3. **Room 1-5** → Solve puzzles sequentially
4. **Completion Screen** → View time and leaderboard

## ✅ Current Status

### Room 1: Mail Room - ✅ COMPLETE
- **Puzzle Type**: Logic/Pattern Recognition
- **Mechanic**: First letters of names spell "CANDY"
- **Fully Functional**: Yes

### Rooms 2-5: 🚧 PLACEHOLDERS
- Basic structure in place
- Answer validation works
- Needs full puzzle implementation

## 🎯 Puzzle Answers

- Room 1 (Mail Room): **CANDY**
- Room 2 (Toy Factory): **TOOLS**
- Room 3 (Reindeer Stable): **RUDOLPH**
- Room 4 (Cookie Kitchen): **TREATS**
- Room 5 (Santa's Office): **2024**

## 🔧 For Development in Cursor

### Recommended Cursor Prompts:

**1. Build Room 2 Puzzle:**
```
Create the Toy Factory puzzle (Room 2) with a visual counting mechanic. 
Display emoji toys (🧸🚂👧🤖) in a grid. Users count each type and multiply 
by position to get coordinates that spell "TOOLS" on a workshop map.
```

**2. Build Room 3 Puzzle:**
```
Create the Reindeer Stable puzzle (Room 3) with drag-and-drop functionality.
Display 9 reindeer names (Dasher, Dancer, Prancer, Vixen, Comet, Cupid, 
Donner, Blitzen, Rudolph) in random order. Users drag them into correct 
poem order. When correct, answer is "RUDOLPH".
```

**3. Build Room 4 Puzzle:**
```
Create the Cookie Kitchen puzzle (Room 4) with symbol decoding.
Show a recipe with emoji symbols (🥛🥚🧈🍯) that map to letters.
Users decode the symbols to spell "TREATS".
```

**4. Build Room 5 Puzzle:**
```
Create Santa's Office puzzle (Room 5) as a meta-puzzle.
Display previous answers (CANDY, TOOLS, RUDOLPH, TREATS) and hint
that the final code is the current year: "2024".
```

**5. Add Features:**
```
- Add sound effects when answers are correct
- Improve mobile responsiveness
- Add animations between room transitions
- Create actual visual puzzles for rooms 2-4
- Add team photos/avatars to leaderboard
```

## 📦 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Animations**: react-confetti
- **Deployment**: Vercel (recommended)

## 🎨 Customization

### Change Puzzle Answers

Edit `src/utils/answers.js`:
```javascript
export const ANSWERS = {
  room1: 'your-answer',
  room2: 'your-answer',
  // etc...
}
```

### Modify Timer Duration

Edit `src/store/gameStore.js`:
```javascript
timeRemaining: 3600, // Change to desired seconds
```

### Update Christmas Theme Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  christmas: {
    red: '#C41E3A',
    green: '#165B33',
    // Add your colors
  }
}
```

## 🐛 Troubleshooting

**Issue**: Supabase not connecting
- Check .env file has correct credentials
- Verify Supabase project is active
- Check RLS policies are set correctly

**Issue**: App won't start
- Run `npm install` again
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: requires Node 16+

**Issue**: Timer not working
- Check browser console for errors
- Verify gameStore.js is importing correctly

## 📝 License

MIT - Feel free to use for your holiday party!

## 🎅 Credits

Created for virtual team holiday parties. Have fun and save Christmas! 🎄
