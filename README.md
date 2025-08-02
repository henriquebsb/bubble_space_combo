# Falling Bubble Combo Game

A fun web game where you solve math problems by clicking the correct falling bubbles!

## Features

- 🎮 **Math Challenges**: Solve equations by clicking the correct answer bubbles
- 🎯 **Increasing Difficulty**: Game gets faster and more challenging as you level up
- 💫 **Beautiful Graphics**: Colorful bubbles with realistic gradients and highlights
- 📊 **Score Tracking**: Keep track of your score, lives, and level
- 🎨 **Modern UI**: Clean, responsive design with game over screen
- 🎵 **Dynamic Audio**: Background music changes based on your level
- 🔥 **Combo System**: Chain fast correct answers for bonus points and special audio effects
- 🌟 **Space Theme**: Beautiful night sky background with constellations
- 🏆 **Ranking System**: Save and view top scores with player names

## How to Play

1. **Objective**: Solve math equations by clicking the bubble with the correct answer
2. **Scoring**: Each correct answer gives you 20 points
3. **Combo System**: Answer correctly within 3.5 seconds for 3+ times in a row to achieve combos:
   - Triple Combo (3): +60 points
   - Super Combo (4): +80 points
   - Hyper Combo (5): +100 points
   - Brutal Combo (6): +120 points
   - Master Combo (7): +140 points
   - Awesome Combo (8): +160 points
   - Blaster Combo (9): +180 points
   - Monster Combo (10): +200 points
   - King Combo (11): +220 points
   - Ultra Combo (12): +240 points
4. **Lives**: You start with 3 lives. If the correct answer bubble reaches the bottom, you lose a life
5. **Leveling Up**: Every 100 points, you level up and the game gets faster
6. **Background Music**: Changes automatically at levels 5, 10, and 15
7. **Game Over**: When you run out of lives, the game ends

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To build the game for production:

```bash
npm run build
```

The built files will be in the `dist` folder.

## Game Controls

- **Mouse Click**: Click on bubbles to pop them
- **Window Resize**: Game automatically adapts to window size

## Technical Details

- **Framework**: Vanilla TypeScript with HTML5 Canvas
- **Build Tool**: Vite for fast development and building
- **Graphics**: Custom bubble rendering with gradients and highlights
- **Game Loop**: RequestAnimationFrame for smooth 60fps gameplay

## Required Audio Files

The game requires audio files in the `sounds` folder. Create a `sounds` folder in the project root and add the following files:

### Background Music (MP3 format recommended)
- `background-music.mp3` - Default background music (levels 1-4)
- `background-music2.mp3` - Background music for levels 5-9
- `background-music3.mp3` - Background music for levels 10-14
- `background-music4.mp3` - Background music for levels 15+

### Game Audio Effects
- `initial-music.mp3` - Music played when website first loads
- `loss-music.mp3` - Music played when game ends
- `correct_answer.mp3` - Sound for correct answers
- `wrong_answer.mp3` - Sound for wrong answers
- `bubble_pop.mp3` - Sound when losing a life

### Combo Audio Effects
- `triple-combo.mp3` - Triple Combo achievement
- `4-super-combo.mp3` - Super Combo achievement
- `5-hyper-combo.mp3` - Hyper Combo achievement
- `6-brutal-combo.mp3` - Brutal Combo achievement
- `7-master-combo.mp3` - Master Combo achievement
- `8-awesome-combo.mp3` - Awesome Combo achievement
- `9-blaster-combo.mp3` - Blaster Combo achievement
- `10-monster-combo.mp3` - Monster Combo achievement
- `11-king-combo.mp3` - King Combo achievement
- `12-ultra-combo.mp3` - Ultra Combo achievement
- `combo-breaker.mp3` - Sound when combo is broken

## Project Structure

```
falling_bubble_combo/
├── src/
│   ├── main.ts          # Game initialization
│   ├── game.ts          # Main game logic
│   ├── bubble.ts        # Bubble class and rendering
│   ├── mathProblem.ts   # Math problem generation
│   ├── audioManager.ts  # Audio system management
│   └── nightSky.ts      # Night sky background
├── sounds/              # Audio files (create this folder)
│   ├── background-music.mp3
│   ├── background-music2.mp3
│   ├── background-music3.mp3
│   ├── background-music4.mp3
│   └── ... (other audio files)
├── index.html           # Main HTML file
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```

## Customization

You can easily customize the game by modifying:

- **Bubble Colors**: Edit the `getRandomColor()` method in `bubble.ts`
- **Game Speed**: Adjust `bubbleSpawnInterval` and `speedMultiplier` in `game.ts`
- **Scoring**: Modify point values and level-up conditions
- **Visual Effects**: Enhance the explosion effects and particle systems

Have fun playing! 🎮 