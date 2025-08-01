export class MathProblem {
    public question!: string;
    public correctAnswer!: number;
    public wrongAnswers!: number[];

    constructor() {
        this.generateProblem();
    }

    private generateProblem(): void {
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let num1: number, num2: number;
        
        switch (operation) {
            case '+':
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
                this.correctAnswer = num1 + num2;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 20) + 10;
                num2 = Math.floor(Math.random() * 10) + 1;
                this.correctAnswer = num1 - num2;
                break;
            case '*':
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                this.correctAnswer = num1 * num2;
                break;
            case '/':
                num2 = Math.floor(Math.random() * 10) + 1;
                this.correctAnswer = Math.floor(Math.random() * 10) + 1;
                num1 = this.correctAnswer * num2;
                break;
            default:
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
                this.correctAnswer = num1 + num2;
        }
        
        this.question = `${num1} ${operation} ${num2}`;
        this.wrongAnswers = this.generateWrongAnswers(this.correctAnswer);
    }

    private generateWrongAnswers(correctAnswer: number): number[] {
        const wrongAnswers: number[] = [];
        
        while (wrongAnswers.length < 3) {
            const variation = Math.floor(Math.random() * 10) + 1;
            const shouldAdd = Math.random() > 0.5;
            let wrongAnswer: number;
            
            if (shouldAdd) {
                wrongAnswer = correctAnswer + variation;
            } else {
                wrongAnswer = correctAnswer - variation;
            }
            
            if (wrongAnswer !== correctAnswer && 
                !wrongAnswers.includes(wrongAnswer) && 
                wrongAnswer > 0) {
                wrongAnswers.push(wrongAnswer);
            }
        }
        
        return wrongAnswers;
    }

    public getQuestion(): string {
        return this.question;
    }

    public getCorrectAnswer(): number {
        return this.correctAnswer;
    }

    public getAllAnswers(): number[] {
        const answers = [...this.wrongAnswers, this.correctAnswer];
        // Shuffle the answers
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    }

    public isCorrectAnswer(answer: number): boolean {
        return answer === this.correctAnswer;
    }
} 