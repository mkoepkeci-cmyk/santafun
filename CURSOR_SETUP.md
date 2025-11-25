# 🚀 Cursor Setup Guide for Santa's Workshop

## Step 1: Extract the Project

```bash
# In your terminal, navigate to where you downloaded the file
cd ~/Downloads  # or wherever you saved it

# Extract the archive
tar -xzf santas-workshop.tar.gz

# Move to a better location (optional)
mv santas-workshop ~/Projects/
cd ~/Projects/santas-workshop
```

## Step 2: Open in Cursor

1. Open Cursor IDE
2. Click **File** → **Open Folder**
3. Navigate to and select the `santas-workshop` folder
4. Click **Open**

## Step 3: Install Dependencies

Open the Cursor terminal (View → Terminal or Ctrl+`) and run:

```bash
npm install
```

Wait for all packages to install (~30 seconds).

## Step 4: Start Development Server

In the terminal, run:

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

Open http://localhost:5173 in your browser to see the app!

## Step 5: Test the App

1. Enter a team name
2. Watch the introduction (or skip after 3 seconds)
3. Try Room 1 - The Mail Room
   - Look at the first letters of names in the Nice List
   - Enter "CANDY" as the answer
   - Success! 🎉

Rooms 2-5 are placeholders - just enter the answers listed below to test the flow.

## 🎯 Development Workflow in Cursor

### Building Puzzles with Cursor AI

Use Cursor's AI features to build out the remaining rooms. Here are example prompts:

#### For Room 2 (Toy Factory):
**Prompt in Cursor Chat:**
```
I need to build the Toy Factory puzzle in Room2.jsx. The puzzle should:
1. Display a grid of toy emojis: 🧸 (3 bears), 🚂 (2 trains), 👧 (1 doll), 🤖 (2 robots)
2. Each toy type has a count and position
3. Users multiply count × position to get numbers: 3×1=3, 2×2=4, 1×3=3, 2×4=8
4. These numbers (3438) correspond to coordinates on a "workshop map" that spell "TOOLS"
5. Make it visual and engaging with Tailwind CSS

Keep the same structure as Room1.jsx with answer submission, hints, and success animation.
```

#### For Room 3 (Reindeer Stable):
**Prompt in Cursor Chat:**
```
Build the Reindeer Stable puzzle in Room3.jsx with these requirements:
1. Display 9 draggable reindeer name cards in random order
2. Create 9 drop zones labeled "Position 1" through "Position 9"
3. Users drag names to arrange them in the correct poem order
4. Correct order: Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner, Blitzen, Rudolph
5. When all are correctly placed, the answer "RUDOLPH" is revealed
6. Use react-dnd or HTML5 drag-and-drop API
7. Add visual feedback for correct/incorrect placements

Keep the same structure as other rooms.
```

#### For Room 4 (Cookie Kitchen):
**Prompt in Cursor Chat:**
```
Create the Cookie Kitchen symbol decoder puzzle in Room4.jsx:
1. Define a symbol-to-letter mapping: 🥛=M, 🥚=E, 🧈=R, etc.
2. Display a "recipe card" showing: 🎄 🧈 🥚 ⭐ 🎄 ❄️
3. Show the decoder key as a legend below
4. Users decode the symbols to spell "TREATS"
5. Make it look like Mrs. Claus's recipe with nice styling
6. Add the emoji symbols visually with good spacing

Keep the same structure as other rooms.
```

#### For Room 5 (Santa's Office):
**Prompt in Cursor Chat:**
```
Build the final puzzle in Room5.jsx:
1. Display a "Control Panel" interface
2. Show the previous 4 room answers: CANDY, TOOLS, RUDOLPH, TREATS
3. Add a hint: "What year are we trying to save Christmas?"
4. The answer is "2024"
5. Make it feel climactic - this is the final room!
6. Use larger success animation and special effects

Keep the same structure but call completeGame() instead of nextRoom().
```

### Using Cursor Features:

**1. Cmd+K (Mac) / Ctrl+K (Windows)** - Inline AI editing
- Highlight code → Cmd+K → type what you want to change
- Example: "Add a subtle shake animation when answer is wrong"

**2. Cursor Chat (Cmd+L / Ctrl+L)**
- Ask questions about the codebase
- Request new features
- Debug errors

**3. Copilot++** 
- Just start typing - Cursor will suggest completions
- Press Tab to accept suggestions

### Quick Improvements:

**Add Sound Effects:**
```
In the Cursor chat, ask:
"Add a jingle bell sound effect when an answer is correct. Use the Web Audio API or import a sound file."
```

**Improve Mobile:**
```
"Make the puzzle rooms more mobile-friendly. Adjust the font sizes and spacing for screens under 768px width."
```

**Add Animations:**
```
"Add a fade-in animation when transitioning between rooms. Use Tailwind's animation utilities."
```

## 📁 Key Files to Edit

```
src/
├── components/rooms/
│   ├── Room2.jsx  ← Build toy factory puzzle here
│   ├── Room3.jsx  ← Build reindeer puzzle here
│   ├── Room4.jsx  ← Build cookie decoder here
│   └── Room5.jsx  ← Build final puzzle here
├── utils/
│   └── answers.js ← Change answers/hints here
└── index.css      ← Modify global styles here
```

## 🎨 Customization Tips

### Change Colors:
Edit `tailwind.config.js` → `theme.extend.colors.christmas`

### Change Timer:
Edit `src/store/gameStore.js` → `timeRemaining: 3600` (seconds)

### Add More Rooms:
1. Create Room6.jsx
2. Add case 6 in App.jsx
3. Update ProgressBar.jsx to show 6 rooms

## ⚡ Keyboard Shortcuts in Cursor

- **Cmd/Ctrl + B**: Toggle sidebar
- **Cmd/Ctrl + J**: Toggle terminal
- **Cmd/Ctrl + P**: Quick file open
- **Cmd/Ctrl + Shift + P**: Command palette
- **Cmd/Ctrl + K**: AI inline edit
- **Cmd/Ctrl + L**: AI chat

## 🐛 Common Issues

**"Module not found" errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use:**
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

**Tailwind styles not working:**
```bash
# Restart the dev server
# Press Ctrl+C in terminal, then:
npm run dev
```

## 🚀 Deployment

When ready to deploy:

```bash
# Build the app
npm run build

# Deploy to Vercel (recommended)
npm install -g vercel
vercel

# Or deploy to Netlify
# Drag the 'dist' folder to netlify.com/drop
```

## 🎉 You're Ready!

The project is fully set up and ready for development in Cursor. Room 1 is complete as a reference. Use Cursor's AI to build out Rooms 2-5 following the patterns established.

Happy coding and Merry Christmas! 🎄
