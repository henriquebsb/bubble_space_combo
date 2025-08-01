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
    game.start();
}

function restartGame() {
    if (game) {
        game.restart();
    }
}

// Make restartGame available globally
window.restartGame = restartGame;

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', init); 