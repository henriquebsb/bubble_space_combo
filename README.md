# Falling Bubble Combo Game

A fun web game where you click falling bubbles before they reach the bottom of the screen!

## Features

- 🎮 **Click to Pop**: Click on bubbles to pop them and score points
- 🎯 **Increasing Difficulty**: Game gets faster and more challenging as you level up
- 💫 **Beautiful Graphics**: Colorful bubbles with realistic gradients and highlights
- 📊 **Score Tracking**: Keep track of your score, lives, and level
- 🎨 **Modern UI**: Clean, responsive design with game over screen

## How to Play

1. **Objective**: Click on the falling bubbles before they reach the bottom of the screen
2. **Scoring**: Each bubble popped gives you 10 points
3. **Lives**: You start with 3 lives. If a bubble reaches the bottom, you lose a life
4. **Leveling Up**: Every 100 points, you level up and the game gets faster
5. **Game Over**: When you run out of lives, the game ends

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

## Project Structure

```
falling_bubble_combo/
├── src/
│   ├── main.ts      # Game initialization
│   ├── game.ts      # Main game logic
│   └── bubble.ts    # Bubble class and rendering
├── index.html       # Main HTML file
├── package.json     # Dependencies and scripts
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite configuration
└── README.md        # This file
```

## Customization

You can easily customize the game by modifying:

- **Bubble Colors**: Edit the `getRandomColor()` method in `bubble.ts`
- **Game Speed**: Adjust `bubbleSpawnInterval` and `speedMultiplier` in `game.ts`
- **Scoring**: Modify point values and level-up conditions
- **Visual Effects**: Enhance the explosion effects and particle systems

Have fun playing! 🎮 