import { Game } from './game';

// Make restartGame function globally available
declare global {
    interface Window {
        restartGame: () => void;
    }
}

let game: Game;

function init() {
    game = new Game();
    // Don't start the game automatically - let operator selection control it
}

function restartGame() {
    if (game) {
        game.restart();
    }
}

// Make restartGame available globally
window.restartGame = restartGame;

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', init); 