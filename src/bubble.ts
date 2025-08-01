export class Bubble {
    public x: number;
    public y: number;
    public radius: number;
    public speed: number;
    public color: string;
    public answer: number;
    public isCorrect: boolean;

    constructor(x: number, y: number, radius: number, speed: number, answer: number, isCorrect: boolean = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.answer = answer;
        this.isCorrect = isCorrect;
        this.color = this.getRandomColor();
    }

    private getRandomColor(): string {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    public update(deltaTime: number): void {
        this.y += this.speed * (deltaTime / 16);
        this.x += Math.sin(this.y * 0.01) * 0.5;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        
        // Draw bubble
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + '80';
        ctx.fill();
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw answer number
        ctx.fillStyle = '#000000';
        ctx.font = `bold ${this.radius * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.answer.toString(), this.x, this.y);
        
        ctx.restore();
    }
} 