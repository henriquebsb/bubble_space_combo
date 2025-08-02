export class MathProblem {
    public question!: string;
    public correctAnswer!: number;
    public wrongAnswers!: number[];
    private selectedOperators: string[];
    private maxDigits: number;

    constructor(selectedOperators: string[] = ['+', '-', '*', '/'], maxDigits: number = 2) {
        this.selectedOperators = selectedOperators;
        this.maxDigits = maxDigits;
        this.generateProblem();
    }

    private generateProblem(): void {
        const operation = this.selectedOperators[Math.floor(Math.random() * this.selectedOperators.length)];
        
        let num1: number, num2: number;
        const maxNumber = Math.pow(10, this.maxDigits) - 1;
        
        switch (operation) {
            case '+':
                // For addition, use numbers up to maxDigits
                num1 = Math.floor(Math.random() * maxNumber) + 1;
                num2 = Math.floor(Math.random() * maxNumber) + 1;
                this.correctAnswer = num1 + num2;
                break;
            case '-':
                // For subtraction, ensure positive result
                num1 = Math.floor(Math.random() * maxNumber) + 1;
                num2 = Math.floor(Math.random() * num1) + 1;
                this.correctAnswer = num1 - num2;
                break;
            case '*':
                // For multiplication, use numbers up to maxDigits
                num1 = Math.floor(Math.random() * maxNumber) + 1;
                num2 = Math.floor(Math.random() * maxNumber) + 1;
                this.correctAnswer = num1 * num2;
                break;
            case '/':
                // For division, ensure whole number result and prevent infinite loops
                if (this.maxDigits > 1) {
                    // For Medium and Hard, generate num2 first, then find a suitable num1
                    do {
                        num2 = Math.floor(Math.random() * maxNumber) + 1;
                        // Generate a random quotient that won't exceed maxNumber when multiplied
                        const maxQuotient = Math.floor(maxNumber / num2);
                        const quotient = Math.floor(Math.random() * Math.max(1, maxQuotient)) + 1;
                        num1 = quotient * num2;
                    } while (num1 === num2);
                } else {
                    // For Easy, use simple logic
                    num2 = Math.floor(Math.random() * maxNumber) + 1;
                    const maxQuotient = Math.floor(maxNumber / num2);
                    const quotient = Math.floor(Math.random() * Math.max(1, maxQuotient)) + 1;
                    num1 = quotient * num2;
                }
                
                this.correctAnswer = num1 / num2;
                break;
            default:
                // Fallback to addition
                num1 = Math.floor(Math.random() * maxNumber) + 1;
                num2 = Math.floor(Math.random() * maxNumber) + 1;
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