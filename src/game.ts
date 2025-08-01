import { Bubble } from './bubble';

export class Game {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private bubbles: Bubble[] = [];
    private score: number = 0;
    private lives: number = 3;
    private level: number = 1;
    private gameRunning: boolean = false;
    private animationId: number = 0;
    private lastBubbleTime: number = 0;
    private bubbleSpawnInterval: number = 2000; // milliseconds
    private speedMultiplier: number = 1;

    constructor() {
        this.setupCanvas();
        this.setupEventListeners();
    }

    private setupCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '10';
        
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer) {
            gameContainer.appendChild(this.canvas);
        }

        this.ctx = this.canvas.getContext('2d')!;
    }

    private setupEventListeners(): void {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        // Handle clicks
        this.canvas.addEventListener('click', (e) => {
            this.handleClick(e);
        });
    }

    private handleClick(e: MouseEvent): void {
        if (!this.gameRunning) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if any bubble was clicked
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            const distance = Math.sqrt(
                Math.pow(x - bubble.x, 2) + Math.pow(y - bubble.y, 2)
            );

            if (distance <= bubble.radius) {
                // Bubble clicked!
                this.bubbles.splice(i, 1);
                this.score += 10;
                this.updateUI();
                
                // Create explosion effect
                this.createExplosion(bubble.x, bubble.y);
                
                // Check for level up
                if (this.score % 100 === 0) {
                    this.levelUp();
                }
                return;
            }
        }
    }

    private createExplosion(x: number, y: number): void {
        // Create particle explosion effect
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 3;
            const particle = {
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 30,
                maxLife: 30
            };

            // Store particles for rendering (simplified for now)
            setTimeout(() => {
                // Particle effect would be rendered here
            }, i * 50);
        }
    }

    private levelUp(): void {
        this.level++;
        this.speedMultiplier += 0.2;
        this.bubbleSpawnInterval = Math.max(500, this.bubbleSpawnInterval - 100);
        this.updateUI();
    }

    private spawnBubble(): void {
        const x = Math.random() * (this.canvas.width - 100) + 50;
        const y = -50; // Start above the screen
        const radius = Math.random() * 20 + 15; // Random size between 15-35
        const speed = (Math.random() * 2 + 1) * this.speedMultiplier;
        
        const bubble = new Bubble(x, y, radius, speed);
        this.bubbles.push(bubble);
    }

    private updateBubbles(deltaTime: number): void {
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            bubble.update(deltaTime);

            // Remove bubbles that have fallen off screen
            if (bubble.y > this.canvas.height + bubble.radius) {
                this.bubbles.splice(i, 1);
                this.lives--;
                this.updateUI();

                if (this.lives <= 0) {
                    this.gameOver();
                }
            }
        }
    }

    private render(): void {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render bubbles
        this.bubbles.forEach(bubble => bubble.render(this.ctx));
    }

    private gameLoop(currentTime: number): void {
        if (!this.gameRunning) return;

        const deltaTime = currentTime - this.lastBubbleTime;

        // Spawn new bubbles
        if (deltaTime > this.bubbleSpawnInterval) {
            this.spawnBubble();
            this.lastBubbleTime = currentTime;
        }

        // Update game state
        this.updateBubbles(16); // Assume 60fps

        // Render
        this.render();

        // Continue loop
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }

    private updateUI(): void {
        const scoreElement = document.getElementById('score');
        const livesElement = document.getElementById('lives');
        const levelElement = document.getElementById('level');

        if (scoreElement) scoreElement.textContent = this.score.toString();
        if (livesElement) livesElement.textContent = this.lives.toString();
        if (levelElement) levelElement.textContent = this.level.toString();
    }

    private gameOver(): void {
        this.gameRunning = false;
        cancelAnimationFrame(this.animationId);

        const gameOverElement = document.getElementById('gameOver');
        const finalScoreElement = document.getElementById('finalScore');

        if (gameOverElement && finalScoreElement) {
            finalScoreElement.textContent = this.score.toString();
            gameOverElement.style.display = 'block';
        }
    }

    public start(): void {
        this.gameRunning = true;
        this.lastBubbleTime = performance.now();
        this.gameLoop(performance.now());
    }

    public restart(): void {
        // Reset game state
        this.bubbles = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.speedMultiplier = 1;
        this.bubbleSpawnInterval = 2000;

        // Hide game over screen
        const gameOverElement = document.getElementById('gameOver');
        if (gameOverElement) {
            gameOverElement.style.display = 'none';
        }

        // Update UI
        this.updateUI();

        // Start game
        this.start();
    }
} 