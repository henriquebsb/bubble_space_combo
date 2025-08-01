import { Game } from './game';
import { NightSky } from './nightSky';
import { AudioManager } from './audioManager';

// Make restartGame function globally available
declare global {
    interface Window {
        restartGame: () => void;
    }
}

let game: Game;
let nightSky: NightSky;
export let audioManager: AudioManager;

function init() {
    // Initialize audio manager
    audioManager = new AudioManager();
    
    // Initialize night sky background
    nightSky = new NightSky();
    
    // Initialize game
    game = new Game();
    // Don't start the game automatically - let operator selection control it
}

function restartGame() {
    if (game) {
        // Hide the game over screen
        const gameOver = document.getElementById('gameOver');
        if (gameOver) {
            gameOver.style.display = 'none';
        }
        game.restart();
    }
}

// Cleanup function for when page unloads
function cleanup() {
    if (nightSky) {
        nightSky.destroy();
    }
}

// Make restartGame available globally
window.restartGame = restartGame;

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', init);

// Cleanup when page unloads
window.addEventListener('beforeunload', cleanup); 