import { Bubble } from './bubble';
import { MathProblem } from './mathProblem';

interface PlayerScore {
    level: number;
    score: number;
    date: string;
    operators: string[];
    difficulty: string;
}

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
    private bubbleSpawnInterval: number = 2000;
    private speedMultiplier: number = 0.8;
    private currentMathProblem: MathProblem | null = null;
    private selectedOperators: string[] = ['+', '-', '*', '/'];
    private maxDigits: number = 1; // Changed from 2 to 1 to match default Easy selection

    constructor() {
        this.setupCanvas();
        this.setupEventListeners();
        this.setupOperatorSelection();
        // Don't start the game automatically - wait for operator selection
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
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        this.canvas.addEventListener('click', (e) => {
            this.handleClick(e);
        });

        // Handle end game button
        const endGameBtn = document.getElementById('endGameBtn');
        if (endGameBtn) {
            endGameBtn.addEventListener('click', () => {
                this.endGame();
            });
        }

        // Handle show rankings button
        const showRankingsBtn = document.getElementById('showRankingsBtn');
        if (showRankingsBtn) {
            showRankingsBtn.addEventListener('click', () => {
                this.showRankingsModal();
            });
        }

        // Handle close rankings button
        const closeRankingsBtn = document.getElementById('closeRankingsBtn');
        if (closeRankingsBtn) {
            closeRankingsBtn.addEventListener('click', () => {
                this.hideRankingsModal();
            });
        }

        // Handle click outside modal to close
        const rankingsModal = document.getElementById('rankingsModal');
        if (rankingsModal) {
            rankingsModal.addEventListener('click', (e) => {
                if (e.target === rankingsModal) {
                    this.hideRankingsModal();
                }
            });
        }

        // Handle escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideRankingsModal();
            }
        });

        // Handle clear scores button (commented out)
        // const clearScoresBtn = document.getElementById('clearScoresBtn');
        // if (clearScoresBtn) {
        //     clearScoresBtn.addEventListener('click', () => {
        //         this.clearScores();
        //         alert('All scores cleared!');
        //     });
        // }
    }

    private setupOperatorSelection(): void {
        const operatorButtons = document.querySelectorAll('.operator-option');
        const startButton = document.getElementById('startGameBtn') as HTMLButtonElement;
        const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');

        // Initialize with no operators selected
        this.selectedOperators = [];

        operatorButtons.forEach(button => {
            button.addEventListener('click', () => {
                const operator = button.getAttribute('data-operator')!;
                
                if (this.selectedOperators.includes(operator)) {
                    this.selectedOperators = this.selectedOperators.filter(op => op !== operator);
                    button.classList.remove('selected');
                } else {
                    this.selectedOperators.push(operator);
                    button.classList.add('selected');
                }
                
                // Enable/disable start button based on selection
                if (startButton) {
                    startButton.disabled = this.selectedOperators.length === 0;
                }
            });
        });

        // Handle difficulty selection
        difficultyInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                this.maxDigits = parseInt(target.value);
            });
        });

        // Initialize maxDigits based on currently selected difficulty
        const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked') as HTMLInputElement;
        if (selectedDifficulty) {
            this.maxDigits = parseInt(selectedDifficulty.value);
        }

        if (startButton) {
            startButton.addEventListener('click', () => {
                this.hideOperatorSelection();
                this.start();
            });
        }
    }

    private hideOperatorSelection(): void {
        const operatorSelection = document.getElementById('operatorSelection');
        if (operatorSelection) {
            operatorSelection.style.display = 'none';
        }
        
        // Hide end game button
        const endGameBtn = document.getElementById('endGameBtn');
        if (endGameBtn) {
            endGameBtn.style.display = 'none';
        }
    }

    private handleClick(e: MouseEvent): void {
        if (!this.gameRunning) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            const distance = Math.sqrt(
                Math.pow(x - bubble.x, 2) + Math.pow(y - bubble.y, 2)
            );

            if (distance <= bubble.radius) {
                if (bubble.isCorrect) {
                    // Remove all bubbles when correct answer is clicked
                    this.bubbles = [];
                    this.score += 20;
                    this.currentMathProblem = new MathProblem(this.selectedOperators, this.maxDigits);
                } else {
                    // Only remove the clicked bubble for wrong answers
                    this.bubbles.splice(i, 1);
                    this.score -= 40; // Remove 40 points for wrong answer
                    
                    // If score reaches 0 or below, lose a life
                    if (this.score <= 0) {
                        this.score = 0;
                        this.lives--;
                        if (this.lives <= 0) {
                            this.gameOver();
                            return;
                        }
                    }
                }
                
                this.updateUI();
                
                if (this.score % 100 === 0 && this.score > 0) {
                    this.levelUp();
                }
                return;
            }
        }
    }

    private levelUp(): void {
        this.level++;
        this.speedMultiplier += 0.1;
        this.bubbleSpawnInterval = Math.max(1000, this.bubbleSpawnInterval - 100);
        this.updateUI();
    }

    private spawnBubble(): void {
        if (!this.currentMathProblem) {
            this.currentMathProblem = new MathProblem(this.selectedOperators, this.maxDigits);
        }
        
        const answers = this.currentMathProblem.getAllAnswers();
        const numBubbles = 4;
        
        for (let i = 0; i < numBubbles; i++) {
            const x = Math.random() * (this.canvas.width - 100) + 50;
            const y = -50 - (i * 40);
            const radius = 30;
            const speed = (Math.random() * 0.5 + 0.5) * this.speedMultiplier;
            
            const answerIndex = i % answers.length;
            const answer = answers[answerIndex];
            const isCorrect = this.currentMathProblem.isCorrectAnswer(answer);
            
            const bubble = new Bubble(x, y, radius, speed, answer, isCorrect);
            this.bubbles.push(bubble);
        }
    }

    private updateBubbles(): void {
        let correctAnswerBubbleExists = false;
        
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            bubble.update(16);

            if (bubble.y > this.canvas.height + bubble.radius) {
                this.bubbles.splice(i, 1);
                
                if (bubble.isCorrect) {
                    this.lives--;
                    this.updateUI();
                    
                    if (this.lives <= 0) {
                        this.gameOver();
                    } else {
                        this.currentMathProblem = new MathProblem(this.selectedOperators, this.maxDigits);
                    }
                }
            } else if (bubble.isCorrect) {
                correctAnswerBubbleExists = true;
            }
        }
        
        if (!correctAnswerBubbleExists && this.currentMathProblem) {
            this.currentMathProblem = new MathProblem(this.selectedOperators, this.maxDigits);
        }
    }

    private render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bubbles.forEach(bubble => bubble.render(this.ctx));

        if (this.currentMathProblem) {
            this.renderMathProblem();
        }
    }

    private renderMathProblem(): void {
        const question = this.currentMathProblem!.getQuestion();
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, this.canvas.height - 80, this.canvas.width, 80);
        
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(`Solve: ${question} = ?`, this.canvas.width / 2, this.canvas.height - 40);
        
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Click the bubble with the correct answer!', this.canvas.width / 2, this.canvas.height - 15);
    }

    private gameLoop(currentTime: number): void {
        if (!this.gameRunning) return;

        if (currentTime - this.lastBubbleTime > this.bubbleSpawnInterval) {
            this.spawnBubble();
            this.lastBubbleTime = currentTime;
        }

        this.updateBubbles();
        this.render();

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

        // Save the current score before resetting (only if score > 0 and level > 1)
        if (this.score > 0 && this.level > 1) {
            const currentScore: PlayerScore = {
                level: this.level,
                score: this.score,
                date: this.formatDateTime(),
                operators: this.selectedOperators,
                difficulty: this.getDifficultyName()
            };
            this.saveScore(currentScore);
        }

        // Show game over screen with rankings
        const currentScore: PlayerScore = {
            level: this.level,
            score: this.score,
            date: this.formatDateTime(),
            operators: this.selectedOperators,
            difficulty: this.getDifficultyName()
        };
        this.showGameOverScreen(currentScore);

        // Reset game state completely
        this.bubbles = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.speedMultiplier = 0.8;
        this.bubbleSpawnInterval = 2000;
        this.currentMathProblem = null;

        // Update UI to reflect reset state
        this.updateUI();
    }

    private saveScore(score: PlayerScore): void {
        const scores = this.getScores();
        scores.push(score);
        // Keep only top 10 scores
        scores.sort((a, b) => {
            if (a.level !== b.level) {
                return b.level - a.level; // Higher level first
            }
            return b.score - a.score; // Higher score first
        });
        scores.splice(10); // Keep only top 10
        localStorage.setItem('mathBubbleScores', JSON.stringify(scores));
    }

    private getScores(): PlayerScore[] {
        const scores = localStorage.getItem('mathBubbleScores');
        return scores ? JSON.parse(scores) : [];
    }

    // Method to clear all scores (for testing purposes)
    public clearScores(): void {
        localStorage.removeItem('mathBubbleScores');
    }

    // Helper method to format date and time consistently
    private formatDateTime(): string {
        return new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Helper method to get difficulty name
    private getDifficultyName(): string {
        switch (this.maxDigits) {
            case 1: return 'Easy';
            case 2: return 'Medium';
            case 3: return 'Hard';
            default: return 'Easy';
        }
    }

    // Helper method to format operators for display
    private formatOperators(operators: string[]): string {
        if (!operators || operators.length === 0) return 'N/A';
        return operators.map(op => {
            switch(op) {
                case '+': return '+';
                case '-': return '-';
                case '*': return '×';
                case '/': return '÷';
                default: return op;
            }
        }).join(' ');
    }

    private showRankingsModal(): void {
        const rankingsModal = document.getElementById('rankingsModal');
        const modalRankingsContainer = document.getElementById('modalRankingsContainer');
        
        if (rankingsModal && modalRankingsContainer) {
            this.displayModalRankings(modalRankingsContainer);
            rankingsModal.style.display = 'flex';
        }
    }

    private hideRankingsModal(): void {
        const rankingsModal = document.getElementById('rankingsModal');
        if (rankingsModal) {
            rankingsModal.style.display = 'none';
        }
    }

    private displayModalRankings(container: HTMLElement): void {
        const scores = this.getScores();
        
        if (scores.length === 0) {
            container.innerHTML = '<p>No scores yet. Be the first to set a record!</p>';
            return;
        }

        let rankingsHTML = '<div class="rankings-list">';
        
        scores.forEach((score, index) => {
            const rank = index + 1;
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
            const operatorsText = this.formatOperators(score.operators);
            const difficultyText = score.difficulty || 'N/A';
            
            rankingsHTML += `
                <div class="ranking-item">
                    <span class="rank">${medal}</span>
                    <span class="level">Level ${score.level}</span>
                    <span class="score">${score.score} pts</span>
                    <span class="operators">${operatorsText}</span>
                    <span class="difficulty">${difficultyText}</span>
                    <span class="date">${score.date}</span>
                </div>
            `;
        });
        
        rankingsHTML += '</div>';
        container.innerHTML = rankingsHTML;
    }



    private displayRankings(): void {
        const rankingsContainer = document.getElementById('rankingsContainer');
        if (!rankingsContainer) return;

        const scores = this.getScores();
        
        if (scores.length === 0) {
            rankingsContainer.innerHTML = '<p>No scores yet. Be the first to set a record!</p>';
            return;
        }

        let rankingsHTML = '<h3>Top Rankings</h3><div class="rankings-list">';
        
        scores.forEach((score, index) => {
            const rank = index + 1;
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
            const isCurrentScore = score.date === this.formatDateTime() && score.level === scores[0].level && score.score === scores[0].score;
            const operatorsText = this.formatOperators(score.operators);
            const difficultyText = score.difficulty || 'N/A';
            
            rankingsHTML += `
                <div class="ranking-item ${isCurrentScore ? 'current-score' : ''}">
                    <span class="rank">${medal}</span>
                    <span class="level">Level ${score.level}</span>
                    <span class="score">${score.score} pts</span>
                    <span class="operators">${operatorsText}</span>
                    <span class="difficulty">${difficultyText}</span>
                    <span class="date">${score.date}</span>
                </div>
            `;
        });
        
        rankingsHTML += '</div>';
        rankingsContainer.innerHTML = rankingsHTML;
    }

    private showGameOverScreen(finalScore: PlayerScore): void {
        const gameOver = document.getElementById('gameOver');
        const finalScoreElement = document.getElementById('finalScore');
        const finalLevelElement = document.getElementById('finalLevel');
        
        if (gameOver && finalScoreElement && finalLevelElement) {
            finalScoreElement.textContent = finalScore.score.toString();
            finalLevelElement.textContent = finalScore.level.toString();
            
            // Show rankings
            this.displayRankings();
            
            // Add a message if the score doesn't qualify for rankings
            if (finalScore.score <= 0 || finalScore.level <= 1) {
                const rankingsContainer = document.getElementById('rankingsContainer');
                if (rankingsContainer) {
                    const message = finalScore.score <= 0 && finalScore.level <= 1 
                        ? '<p style="color: #ff6b6b; margin-top: 10px;">Score too low and level too low to qualify for rankings.<br><small style="color: #ccc;">Minimum: Score > 0 and Level > 1</small></p>'
                        : finalScore.score <= 0 
                        ? '<p style="color: #ff6b6b; margin-top: 10px;">Score too low to qualify for rankings.<br><small style="color: #ccc;">Minimum: Score > 0</small></p>'
                        : '<p style="color: #ff6b6b; margin-top: 10px;">Level too low to qualify for rankings.<br><small style="color: #ccc;">Minimum: Level > 1</small></p>';
                    
                    rankingsContainer.innerHTML += message;
                }
            }
            
            gameOver.style.display = 'block';
        }
    }

    private showOperatorSelection(): void {
        const operatorSelection = document.getElementById('operatorSelection');
        if (operatorSelection) {
            operatorSelection.style.display = 'block';
        }
        
        // Reset operator selection
        this.selectedOperators = [];
        const operatorButtons = document.querySelectorAll('.operator-option');
        operatorButtons.forEach(button => {
            button.classList.remove('selected');
        });
        
        // Reset difficulty selection to Easy
        const easyDifficultyRadio = document.querySelector('input[name="difficulty"][value="1"]') as HTMLInputElement;
        if (easyDifficultyRadio) {
            easyDifficultyRadio.checked = true;
            this.maxDigits = parseInt(easyDifficultyRadio.value);
        }
        
        const startButton = document.getElementById('startGameBtn') as HTMLButtonElement;
        if (startButton) {
            startButton.disabled = true;
        }
    }

    private endGame(): void {
        // Stop the current game
        this.gameRunning = false;
        cancelAnimationFrame(this.animationId);

        // Save the current score before resetting (only if score > 0 and level > 1)
        if (this.score > 0 && this.level > 1) {
            const currentScore: PlayerScore = {
                level: this.level,
                score: this.score,
                date: this.formatDateTime(),
                operators: this.selectedOperators,
                difficulty: this.getDifficultyName()
            };
            this.saveScore(currentScore);
        }

        // Reset game state completely
        this.bubbles = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.speedMultiplier = 0.8;
        this.bubbleSpawnInterval = 2000;
        this.currentMathProblem = null;

        // Update UI to reflect reset state
        this.updateUI();

        // Hide end game button
        const endGameBtn = document.getElementById('endGameBtn');
        if (endGameBtn) {
            endGameBtn.style.display = 'none';
        }

        // Show operator selection
        this.showOperatorSelection();
    }

    public start(): void {
        this.gameRunning = true;
        this.lastBubbleTime = performance.now();
        this.currentMathProblem = new MathProblem(this.selectedOperators, this.maxDigits);
        
        // Show end game button
        const endGameBtn = document.getElementById('endGameBtn');
        if (endGameBtn) {
            endGameBtn.style.display = 'block';
        }
        
        this.gameLoop(performance.now());
    }

    public restart(): void {
        // Stop the current game if it's running
        this.gameRunning = false;
        cancelAnimationFrame(this.animationId);

        // Reset game state completely
        this.bubbles = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.speedMultiplier = 0.8;
        this.bubbleSpawnInterval = 2000;
        this.currentMathProblem = null;

        // Update UI to reflect reset state
        this.updateUI();

        // Show operator selection instead of starting game
        this.showOperatorSelection();
    }
} 