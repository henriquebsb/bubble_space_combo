export class Bubble {
    public x: number;
    public y: number;
    public radius: number;
    public speed: number;
    public color: string;
    public opacity: number = 1;

    constructor(x: number, y: number, radius: number, speed: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = this.getRandomColor();
    }

    private getRandomColor(): string {
        const colors = [
            '#FF6B6B', // Red
            '#4ECDC4', // Teal
            '#45B7D1', // Blue
            '#96CEB4', // Green
            '#FFEAA7', // Yellow
            '#DDA0DD', // Plum
            '#98D8C8', // Mint
            '#F7DC6F'  // Gold
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    public update(deltaTime: number): void {
        // Move bubble downward
        this.y += this.speed * (deltaTime / 16); // Normalize to 60fps

        // Add some horizontal movement for more dynamic feel
        this.x += Math.sin(this.y * 0.01) * 0.5;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        
        // Create gradient for bubble effect
        const gradient = ctx.createRadialGradient(
            this.x - this.radius * 0.3, 
            this.y - this.radius * 0.3, 
            0,
            this.x, 
            this.y, 
            this.radius
        );
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.3, this.color + '80'); // 50% opacity
        gradient.addColorStop(1, this.color + '40'); // 25% opacity

        // Draw bubble
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add highlight
        ctx.beginPath();
        ctx.arc(
            this.x - this.radius * 0.3, 
            this.y - this.radius * 0.3, 
            this.radius * 0.3, 
            0, 
            Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        // Add border
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }
} 