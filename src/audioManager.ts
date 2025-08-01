export class AudioManager {
    private backgroundAudio: HTMLAudioElement | null = null;
    private audioContext: AudioContext | null = null;
    private volume = 0.3;

    constructor() {
        this.initializeAudio();
    }

    private initializeAudio() {
        try {
            // Create audio context for Web Audio API
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            
            // Initialize background audio
            this.backgroundAudio = new Audio();
            this.backgroundAudio.loop = true;
            this.backgroundAudio.volume = this.volume;
            this.backgroundAudio.preload = 'auto';
            
            // Load background music
            this.loadBackgroundMusic();
            
            console.log('Audio manager initialized successfully');
            
        } catch (error) {
            console.log('Audio initialization failed:', error);
            this.createFallbackAmbientSound();
        }
    }

    private loadBackgroundMusic() {
        if (!this.backgroundAudio) return;

        // Try different audio formats
        const audioFormats = [
            '/sounds/background-music.mp3',
            '/sounds/background-music.ogg',
            '/sounds/background-music.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < audioFormats.length) {
                this.backgroundAudio!.src = audioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                // All formats failed, use ambient sound
                this.createFallbackAmbientSound();
            }
        };

        this.backgroundAudio.addEventListener('canplaythrough', () => {
            console.log('Background music loaded successfully');
            this.setupBackgroundMusic();
        });

        this.backgroundAudio.addEventListener('error', () => {
            console.log(`Audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private setupBackgroundMusic() {
        if (!this.backgroundAudio) return;

        // Add fade-in effect
        this.backgroundAudio.volume = 0;
        this.backgroundAudio.addEventListener('play', () => {
            this.fadeIn(this.backgroundAudio!, 0, this.volume, 2000);
        });
    }

    public startGameMusic() {
        console.log('Starting game music...');
        this.startBackgroundMusic();
    }

    private startBackgroundMusic() {
        console.log('Attempting to start background music...');
        console.log('Background audio ready state:', this.backgroundAudio?.readyState);
        
        if (this.backgroundAudio && this.backgroundAudio.readyState >= 2) {
            console.log('Background music is ready, starting playback...');
            this.backgroundAudio.play().catch(error => {
                console.log('Background music playback failed:', error);
            });
        } else {
            console.log('Background music not ready, trying to load it...');
            // If background music isn't loaded yet, try to load it
            this.loadBackgroundMusic();
            
            // Try to play after a short delay
            setTimeout(() => {
                if (this.backgroundAudio && this.backgroundAudio.readyState >= 2) {
                    console.log('Background music loaded, starting playback...');
                    this.backgroundAudio.play().catch(error => {
                        console.log('Background music playback failed after delay:', error);
                    });
                } else {
                    console.log('Background music still not ready');
                }
            }, 1000);
        }
    }

    public stopBackgroundMusic() {
        console.log('Stopping background music...');
        if (this.backgroundAudio) {
            // Immediately pause the audio
            this.backgroundAudio.pause();
            // Then fade out for smooth transition
            this.fadeOut(this.backgroundAudio, this.volume, 0, 1000);
        }
    }

    private createFallbackAmbientSound() {
        if (!this.audioContext) return;

        try {
            // Create ambient sound using Web Audio API
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            // Connect nodes
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Set up ambient sound
            oscillator.type = 'sine';
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);

            // Create a gentle ambient melody
            const ambientMelody = [220, 330, 440, 330, 220]; // A3, E4, A4, E4, A3
            let currentNote = 0;

            const playAmbientNote = () => {
                if (this.audioContext && this.audioContext.state === 'running') {
                    oscillator.frequency.setValueAtTime(ambientMelody[currentNote], this.audioContext.currentTime);
                    currentNote = (currentNote + 1) % ambientMelody.length;
                    
                    // Schedule next note
                    setTimeout(playAmbientNote, 4000); // 4 seconds per note
                }
            };

        } catch (error) {
            console.log('Ambient sound creation failed:', error);
        }
    }

    private fadeIn(audio: HTMLAudioElement, startVolume: number, endVolume: number, duration: number) {
        const startTime = Date.now();
        const volumeDiff = endVolume - startVolume;

        const fadeStep = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            audio.volume = startVolume + (volumeDiff * progress);
            
            if (progress < 1) {
                requestAnimationFrame(fadeStep);
            }
        };

        fadeStep();
    }

    private fadeOut(audio: HTMLAudioElement, startVolume: number, endVolume: number, duration: number) {
        const startTime = Date.now();
        const volumeDiff = endVolume - startVolume;

        const fadeStep = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            audio.volume = startVolume + (volumeDiff * progress);
            
            if (progress < 1) {
                requestAnimationFrame(fadeStep);
            } else {
                audio.pause();
            }
        };

        fadeStep();
    }

    public setVolume(volume: number) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.backgroundAudio) {
            this.backgroundAudio.volume = this.volume;
        }
    }

    public playSoundEffect(soundName: string) {
        // Create a simple sound effect using Web Audio API
        if (!this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Different sound effects based on name
            switch (soundName) {
                case 'bubble_pop':
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.1);
                    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                    break;
                case 'correct_answer':
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(554, this.audioContext.currentTime + 0.1);
                    oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.2);
                    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                    break;
                case 'wrong_answer':
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
                    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
                    break;
                default:
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            }

            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.3);

        } catch (error) {
            console.log('Sound effect playback failed:', error);
        }
    }

    public destroy() {
        if (this.backgroundAudio) {
            this.backgroundAudio.pause();
            this.backgroundAudio = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }
} 