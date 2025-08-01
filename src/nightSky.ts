export interface Star {
    x: number;
    y: number;
    size: number;
    brightness: number;
    twinkleSpeed: number;
    twinklePhase: number;
    color: string;
}

export interface ShootingStar {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

export interface Constellation {
    name: string;
    stars: { x: number; y: number }[];
    lines: { from: number; to: number }[];
    color: string;
    opacity: number;
}

export class NightSky {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private stars: Star[] = [];
    private shootingStars: ShootingStar[] = [];
    private constellations: Constellation[] = [];
    private time: number = 0;
    private lastShootingStarTime: number = 0;
    private isRunning: boolean = false;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;
        this.setupCanvas();
        this.generateStars();
        this.generateConstellations();
        this.startAnimation();
    }

    private setupCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer) {
            gameContainer.appendChild(this.canvas);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.generateStars(); // Regenerate stars for new size
        });
    }

    private generateStars(): void {
        this.stars = [];
        const numStars = Math.floor((this.canvas.width * this.canvas.height) / 8000); // Even denser star field
        
        for (let i = 0; i < numStars; i++) {
            const star: Star = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 0.3, // 0.3 to 2.3 pixels
                brightness: Math.random() * 0.6 + 0.4, // 0.4 to 1.0
                twinkleSpeed: Math.random() * 0.005 + 0.002, // Much slower twinkling: 0.002 to 0.007
                twinklePhase: Math.random() * Math.PI * 2,
                color: this.getRandomStarColor()
            };
            this.stars.push(star);
        }
    }

    private getRandomStarColor(): string {
        const colors = [
            '#ffffff', // White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    private generateConstellations(): void {
        this.constellations = [
            {
                name: 'Little Dipper',
                stars: [
                    { x: 600, y: 100 },
                    { x: 650, y: 80 },
                    { x: 700, y: 70 },
                    { x: 750, y: 85 },
                    { x: 800, y: 105 },
                    { x: 850, y: 130 },
                    { x: 900, y: 160 }
                ],
                lines: [
                    { from: 0, to: 1 },
                    { from: 1, to: 2 },
                    { from: 2, to: 3 },
                    { from: 3, to: 4 },
                    { from: 4, to: 5 },
                    { from: 5, to: 6 }
                ],
                color: '#ffffff',
                opacity: 0.2
            },
            {
                name: 'Orion',
                stars: [
                    { x: 200, y: 400 },
                    { x: 250, y: 380 },
                    { x: 300, y: 360 },
                    { x: 350, y: 380 },
                    { x: 400, y: 400 },
                    { x: 300, y: 420 },
                    { x: 300, y: 440 }
                ],
                lines: [
                    { from: 0, to: 1 },
                    { from: 1, to: 2 },
                    { from: 2, to: 3 },
                    { from: 3, to: 4 },
                    { from: 2, to: 5 },
                    { from: 5, to: 6 }
                ],
                color: '#ffffff',
                opacity: 0.25
            }
        ];
    }

    private spawnShootingStar(): void {
        const shootingStar: ShootingStar = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height * 0.3, // Start in top third
            vx: (Math.random() - 0.5) * 8 + 2, // Positive x velocity
            vy: Math.random() * 3 + 1, // Downward velocity
            life: 0,
            maxLife: Math.random() * 100 + 50,
            size: Math.random() * 2 + 1
        };
        this.shootingStars.push(shootingStar);
    }

    private updateShootingStars(): void {
        // Spawn new shooting stars occasionally
        if (this.time - this.lastShootingStarTime > 3000 && Math.random() < 0.01) {
            this.spawnShootingStar();
            this.lastShootingStarTime = this.time;
        }

        // Update existing shooting stars
        this.shootingStars = this.shootingStars.filter(star => {
            star.x += star.vx;
            star.y += star.vy;
            star.life++;

            // Remove if dead or off screen
            return star.life < star.maxLife && 
                   star.x < this.canvas.width + 100 && 
                   star.y < this.canvas.height + 100;
        });
    }

    private startAnimation(): void {
        this.isRunning = true;
        this.animate();
    }

    private animate(): void {
        if (!this.isRunning) return;
        
        this.time += 16; // Increment time by 16ms (60fps equivalent)
        this.updateShootingStars();
        this.render();
        
        // Use setTimeout instead of requestAnimationFrame to reduce interference with game
        setTimeout(() => this.animate(), 50); // 20fps instead of 60fps
    }

    private render(): void {
        // Clear canvas with darker background
        this.ctx.fillStyle = '#050510';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw nebula background
        this.renderNebula();
        
        // Draw stars
        this.renderStars();
        
        // Draw constellations
        this.renderConstellations();
        
        // Draw shooting stars
        this.renderShootingStars();
    }

    private renderNebula(): void {
        // Create subtle nebula effects with darker colors
        const gradient1 = this.ctx.createRadialGradient(
            this.canvas.width * 0.2, this.canvas.height * 0.3, 0,
            this.canvas.width * 0.2, this.canvas.height * 0.3, this.canvas.width * 0.5
        );
        gradient1.addColorStop(0, 'rgba(60, 25, 100, 0.05)');
        gradient1.addColorStop(1, 'transparent');
        
        const gradient2 = this.ctx.createRadialGradient(
            this.canvas.width * 0.8, this.canvas.height * 0.7, 0,
            this.canvas.width * 0.8, this.canvas.height * 0.7, this.canvas.width * 0.4
        );
        gradient2.addColorStop(0, 'rgba(25, 50, 100, 0.05)');
        gradient2.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = gradient2;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private renderStars(): void {
        this.stars.forEach(star => {
            // Much gentler twinkling effect
            const twinkle = Math.sin(this.time * star.twinkleSpeed + star.twinklePhase) * 0.15 + 0.85;
            const alpha = star.brightness * twinkle;
            
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            
            // Create gradient for star glow
            const gradient = this.ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.size * 3
            );
            gradient.addColorStop(0, star.color);
            gradient.addColorStop(0.3, star.color + '80');
            gradient.addColorStop(0.7, star.color + '40');
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw bright center
            this.ctx.fillStyle = star.color;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    private renderShootingStars(): void {
        this.shootingStars.forEach(star => {
            const lifeRatio = star.life / star.maxLife;
            const alpha = (1 - lifeRatio) * 0.8;
            
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            
            // Draw shooting star trail
            const gradient = this.ctx.createLinearGradient(
                star.x, star.y,
                star.x - star.vx * 20, star.y - star.vy * 20
            );
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.5, '#ffffff');
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = star.size;
            this.ctx.lineCap = 'round';
            this.ctx.beginPath();
            this.ctx.moveTo(star.x, star.y);
            this.ctx.lineTo(star.x - star.vx * 20, star.y - star.vy * 20);
            this.ctx.stroke();
            
            // Draw bright head
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
    }

    private renderConstellations(): void {
        this.constellations.forEach(constellation => {
            // Draw constellation lines
            this.ctx.strokeStyle = constellation.color;
            this.ctx.lineWidth = 1;
            this.ctx.globalAlpha = constellation.opacity;
            
            constellation.lines.forEach(line => {
                const fromStar = constellation.stars[line.from];
                const toStar = constellation.stars[line.to];
                
                this.ctx.beginPath();
                this.ctx.moveTo(fromStar.x, fromStar.y);
                this.ctx.lineTo(toStar.x, toStar.y);
                this.ctx.stroke();
            });
            
            // Draw constellation stars
            constellation.stars.forEach(star => {
                this.ctx.fillStyle = constellation.color;
                this.ctx.globalAlpha = constellation.opacity * 0.8;
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
                this.ctx.fill();
            });
        });
        
        this.ctx.globalAlpha = 1;
    }

    public destroy(): void {
        this.isRunning = false;
        if (this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }
} 