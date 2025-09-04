export class AudioManager {
    private backgroundAudio: HTMLAudioElement | null = null;
    private backgroundAudio2: HTMLAudioElement | null = null;
    private backgroundAudio3: HTMLAudioElement | null = null;
    private backgroundAudio4: HTMLAudioElement | null = null;
    private lossAudio: HTMLAudioElement | null = null;
    private tripleComboAudio: HTMLAudioElement | null = null;
    private superComboAudio: HTMLAudioElement | null = null;
    private hyperComboAudio: HTMLAudioElement | null = null;
    private brutalComboAudio: HTMLAudioElement | null = null;
    private masterComboAudio: HTMLAudioElement | null = null;
    private awesomeComboAudio: HTMLAudioElement | null = null;
    private blasterComboAudio: HTMLAudioElement | null = null;
    private monsterComboAudio: HTMLAudioElement | null = null;
    private kingComboAudio: HTMLAudioElement | null = null;
    private ultraComboAudio: HTMLAudioElement | null = null;
    private comboBreakerAudio: HTMLAudioElement | null = null;
    private audioContext: AudioContext | null = null;
    private volume = 0.3;
    private currentBackgroundTrack: number = 1; // Track which background music is currently playing

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
            
            // Initialize background audio 2
            this.backgroundAudio2 = new Audio();
            this.backgroundAudio2.loop = true;
            this.backgroundAudio2.volume = this.volume;
            this.backgroundAudio2.preload = 'auto';
            
            // Initialize background audio 3
            this.backgroundAudio3 = new Audio();
            this.backgroundAudio3.loop = true;
            this.backgroundAudio3.volume = this.volume;
            this.backgroundAudio3.preload = 'auto';
            
            // Initialize background audio 4
            this.backgroundAudio4 = new Audio();
            this.backgroundAudio4.loop = true;
            this.backgroundAudio4.volume = this.volume;
            this.backgroundAudio4.preload = 'auto';
            
            // Initialize loss audio
            this.lossAudio = new Audio();
            this.lossAudio.volume = this.volume;
            this.lossAudio.preload = 'auto';
            
            // Initialize triple combo audio
            this.tripleComboAudio = new Audio();
            this.tripleComboAudio.volume = this.volume;
            this.tripleComboAudio.preload = 'auto';
            
            // Initialize super combo audio
            this.superComboAudio = new Audio();
            this.superComboAudio.volume = this.volume;
            this.superComboAudio.preload = 'auto';
            
            // Initialize hyper combo audio
            this.hyperComboAudio = new Audio();
            this.hyperComboAudio.volume = this.volume;
            this.hyperComboAudio.preload = 'auto';
            
            // Initialize brutal combo audio
            this.brutalComboAudio = new Audio();
            this.brutalComboAudio.volume = this.volume;
            this.brutalComboAudio.preload = 'auto';
            
            // Initialize master combo audio
            this.masterComboAudio = new Audio();
            this.masterComboAudio.volume = this.volume;
            this.masterComboAudio.preload = 'auto';
            
            // Initialize awesome combo audio
            this.awesomeComboAudio = new Audio();
            this.awesomeComboAudio.volume = this.volume;
            this.awesomeComboAudio.preload = 'auto';
            
            // Initialize blaster combo audio
            this.blasterComboAudio = new Audio();
            this.blasterComboAudio.volume = this.volume;
            this.blasterComboAudio.preload = 'auto';
            
            // Initialize monster combo audio
            this.monsterComboAudio = new Audio();
            this.monsterComboAudio.volume = this.volume;
            this.monsterComboAudio.preload = 'auto';
            
            // Initialize king combo audio
            this.kingComboAudio = new Audio();
            this.kingComboAudio.volume = this.volume;
            this.kingComboAudio.preload = 'auto';
            
            // Initialize ultra combo audio
            this.ultraComboAudio = new Audio();
            this.ultraComboAudio.volume = this.volume;
            this.ultraComboAudio.preload = 'auto';
            
            // Initialize combo breaker audio
            this.comboBreakerAudio = new Audio();
            this.comboBreakerAudio.volume = this.volume;
            this.comboBreakerAudio.preload = 'auto';
            
            // Load background music
            this.loadBackgroundMusic();
            this.loadBackgroundMusic2();
            this.loadBackgroundMusic3();
            this.loadBackgroundMusic4();
            
            // Load loss music
            this.loadLossMusic();
            
            // Load triple combo audio
            this.loadTripleComboAudio();
            
            // Load super combo audio
            this.loadSuperComboAudio();
            
            // Load hyper combo audio
            this.loadHyperComboAudio();
            
            // Load brutal combo audio
            this.loadBrutalComboAudio();
            
            // Load master combo audio
            this.loadMasterComboAudio();
            
            // Load awesome combo audio
            this.loadAwesomeComboAudio();
            
            // Load blaster combo audio
            this.loadBlasterComboAudio();
            
            // Load monster combo audio
            this.loadMonsterComboAudio();
            
            // Load king combo audio
            this.loadKingComboAudio();
            
            // Load ultra combo audio
            this.loadUltraComboAudio();
            
            // Load combo breaker audio
            this.loadComboBreakerAudio();
            
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
            './sounds/background-music.mp3',
            './sounds/background-music.ogg',
            './sounds/background-music.wav'
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

    private loadBackgroundMusic2() {
        if (!this.backgroundAudio2) return;

        // Try different audio formats
        const audioFormats = [
            './sounds/background-music2.mp3',
            './sounds/background-music2.ogg',
            './sounds/background-music2.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < audioFormats.length) {
                this.backgroundAudio2!.src = audioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All background music 2 formats failed');
            }
        };

        this.backgroundAudio2.addEventListener('canplaythrough', () => {
            console.log('Background music 2 loaded successfully');
        });

        this.backgroundAudio2.addEventListener('error', () => {
            console.log(`Background music 2 format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadBackgroundMusic3() {
        if (!this.backgroundAudio3) return;

        // Try different audio formats
        const audioFormats = [
            './sounds/background-music3.mp3',
            './sounds/background-music3.ogg',
            './sounds/background-music3.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < audioFormats.length) {
                this.backgroundAudio3!.src = audioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All background music 3 formats failed');
            }
        };

        this.backgroundAudio3.addEventListener('canplaythrough', () => {
            console.log('Background music 3 loaded successfully');
        });

        this.backgroundAudio3.addEventListener('error', () => {
            console.log(`Background music 3 format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadBackgroundMusic4() {
        if (!this.backgroundAudio4) return;

        // Try different audio formats
        const audioFormats = [
            './sounds/background-music4.mp3',
            './sounds/background-music4.ogg',
            './sounds/background-music4.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < audioFormats.length) {
                this.backgroundAudio4!.src = audioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All background music 4 formats failed');
            }
        };

        this.backgroundAudio4.addEventListener('canplaythrough', () => {
            console.log('Background music 4 loaded successfully');
        });

        this.backgroundAudio4.addEventListener('error', () => {
            console.log(`Background music 4 format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadLossMusic() {
        if (!this.lossAudio) return;

        // Try different audio formats for loss music
        const lossAudioFormats = [
            './sounds/loss-music.mp3',
            './sounds/loss-music.ogg',
            './sounds/loss-music.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < lossAudioFormats.length) {
                this.lossAudio!.src = lossAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All loss music formats failed');
            }
        };

        this.lossAudio.addEventListener('canplaythrough', () => {
            console.log('Loss music loaded successfully');
        });

        this.lossAudio.addEventListener('error', () => {
            console.log(`Loss music format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadTripleComboAudio() {
        if (!this.tripleComboAudio) return;

        // Try different audio formats for triple combo audio
        const tripleComboAudioFormats = [
            './sounds/triple-combo.mp3',
            './sounds/triple-combo.ogg',
            './sounds/triple-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < tripleComboAudioFormats.length) {
                this.tripleComboAudio!.src = tripleComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All triple combo audio formats failed');
            }
        };

        this.tripleComboAudio.addEventListener('canplaythrough', () => {
            console.log('Triple combo audio loaded successfully');
        });

        this.tripleComboAudio.addEventListener('error', () => {
            console.log(`Triple combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadSuperComboAudio() {
        if (!this.superComboAudio) return;

        // Try different audio formats for super combo audio
        const superComboAudioFormats = [
            './sounds/4-super-combo.mp3',
            './sounds/4-super-combo.ogg',
            './sounds/4-super-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < superComboAudioFormats.length) {
                this.superComboAudio!.src = superComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All super combo audio formats failed');
            }
        };

        this.superComboAudio.addEventListener('canplaythrough', () => {
            console.log('Super combo audio loaded successfully');
        });

        this.superComboAudio.addEventListener('error', () => {
            console.log(`Super combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadHyperComboAudio() {
        if (!this.hyperComboAudio) return;

        // Try different audio formats for hyper combo audio
        const hyperComboAudioFormats = [
            './sounds/5-hyper-combo.mp3',
            './sounds/5-hyper-combo.ogg',
            './sounds/5-hyper-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < hyperComboAudioFormats.length) {
                this.hyperComboAudio!.src = hyperComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All hyper combo audio formats failed');
            }
        };

        this.hyperComboAudio.addEventListener('canplaythrough', () => {
            console.log('Hyper combo audio loaded successfully');
        });

        this.hyperComboAudio.addEventListener('error', () => {
            console.log(`Hyper combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadBrutalComboAudio() {
        if (!this.brutalComboAudio) return;

        // Try different audio formats for brutal combo audio
        const brutalComboAudioFormats = [
            './sounds/6-brutal-combo.mp3',
            './sounds/6-brutal-combo.ogg',
            './sounds/6-brutal-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < brutalComboAudioFormats.length) {
                this.brutalComboAudio!.src = brutalComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All brutal combo audio formats failed');
            }
        };

        this.brutalComboAudio.addEventListener('canplaythrough', () => {
            console.log('Brutal combo audio loaded successfully');
        });

        this.brutalComboAudio.addEventListener('error', () => {
            console.log(`Brutal combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadMasterComboAudio() {
        if (!this.masterComboAudio) return;

        // Try different audio formats for master combo audio
        const masterComboAudioFormats = [
            './sounds/7-master-combo.mp3',
            './sounds/7-master-combo.ogg',
            './sounds/7-master-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < masterComboAudioFormats.length) {
                this.masterComboAudio!.src = masterComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All master combo audio formats failed');
            }
        };

        this.masterComboAudio.addEventListener('canplaythrough', () => {
            console.log('Master combo audio loaded successfully');
        });

        this.masterComboAudio.addEventListener('error', () => {
            console.log(`Master combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadAwesomeComboAudio() {
        if (!this.awesomeComboAudio) return;

        // Try different audio formats for awesome combo audio
        const awesomeComboAudioFormats = [
            './sounds/8-awesome-combo.mp3',
            './sounds/8-awesome-combo.ogg',
            './sounds/8-awesome-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < awesomeComboAudioFormats.length) {
                this.awesomeComboAudio!.src = awesomeComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All awesome combo audio formats failed');
            }
        };

        this.awesomeComboAudio.addEventListener('canplaythrough', () => {
            console.log('Awesome combo audio loaded successfully');
        });

        this.awesomeComboAudio.addEventListener('error', () => {
            console.log(`Awesome combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadBlasterComboAudio() {
        if (!this.blasterComboAudio) return;

        // Try different audio formats for blaster combo audio
        const blasterComboAudioFormats = [
            './sounds/9-blaster-combo.mp3',
            './sounds/9-blaster-combo.ogg',
            './sounds/9-blaster-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < blasterComboAudioFormats.length) {
                this.blasterComboAudio!.src = blasterComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All blaster combo audio formats failed');
            }
        };

        this.blasterComboAudio.addEventListener('canplaythrough', () => {
            console.log('Blaster combo audio loaded successfully');
        });

        this.blasterComboAudio.addEventListener('error', () => {
            console.log(`Blaster combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadMonsterComboAudio() {
        if (!this.monsterComboAudio) return;

        // Try different audio formats for monster combo audio
        const monsterComboAudioFormats = [
            './sounds/10-monster-combo.mp3',
            './sounds/10-monster-combo.ogg',
            './sounds/10-monster-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < monsterComboAudioFormats.length) {
                this.monsterComboAudio!.src = monsterComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All monster combo audio formats failed');
            }
        };

        this.monsterComboAudio.addEventListener('canplaythrough', () => {
            console.log('Monster combo audio loaded successfully');
        });

        this.monsterComboAudio.addEventListener('error', () => {
            console.log(`Monster combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadKingComboAudio() {
        if (!this.kingComboAudio) return;

        // Try different audio formats for king combo audio
        const kingComboAudioFormats = [
            './sounds/11-king-combo.mp3',
            './sounds/11-king-combo.ogg',
            './sounds/11-king-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < kingComboAudioFormats.length) {
                this.kingComboAudio!.src = kingComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All king combo audio formats failed');
            }
        };

        this.kingComboAudio.addEventListener('canplaythrough', () => {
            console.log('King combo audio loaded successfully');
        });

        this.kingComboAudio.addEventListener('error', () => {
            console.log(`King combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadUltraComboAudio() {
        if (!this.ultraComboAudio) return;

        // Try different audio formats for ultra combo audio
        const ultraComboAudioFormats = [
            './sounds/12-ultra-combo.mp3',
            './sounds/12-ultra-combo.ogg',
            './sounds/12-ultra-combo.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < ultraComboAudioFormats.length) {
                this.ultraComboAudio!.src = ultraComboAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All ultra combo audio formats failed');
            }
        };

        this.ultraComboAudio.addEventListener('canplaythrough', () => {
            console.log('Ultra combo audio loaded successfully');
        });

        this.ultraComboAudio.addEventListener('error', () => {
            console.log(`Ultra combo audio format failed, trying next...`);
            tryNextFormat();
        });

        // Start with first format
        tryNextFormat();
    }

    private loadComboBreakerAudio() {
        if (!this.comboBreakerAudio) return;

        // Try different audio formats for combo breaker audio
        const comboBreakerAudioFormats = [
            './sounds/combo-breaker.mp3',
            './sounds/combo-breaker.ogg',
            './sounds/combo-breaker.wav'
        ];

        let currentFormatIndex = 0;

        const tryNextFormat = () => {
            if (currentFormatIndex < comboBreakerAudioFormats.length) {
                this.comboBreakerAudio!.src = comboBreakerAudioFormats[currentFormatIndex];
                currentFormatIndex++;
            } else {
                console.log('All combo breaker audio formats failed');
            }
        };

        this.comboBreakerAudio.addEventListener('canplaythrough', () => {
            console.log('Combo breaker audio loaded successfully');
        });

        this.comboBreakerAudio.addEventListener('error', () => {
            console.log(`Combo breaker audio format failed, trying next...`);
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
        // Also stop other background tracks
        if (this.backgroundAudio2) {
            this.backgroundAudio2.pause();
        }
        if (this.backgroundAudio3) {
            this.backgroundAudio3.pause();
        }
        if (this.backgroundAudio4) {
            this.backgroundAudio4.pause();
        }
    }

    public changeBackgroundMusicByLevel(level: number) {
        console.log(`Changing background music for level ${level}...`);
        
        // Determine which track to play based on level
        let targetTrack = 1;
        if (level >= 15) {
            targetTrack = 4;
        } else if (level >= 10) {
            targetTrack = 3;
        } else if (level >= 5) {
            targetTrack = 2;
        }
        
        // If we're already playing the correct track, don't change
        if (this.currentBackgroundTrack === targetTrack) {
            console.log(`Already playing background track ${targetTrack}`);
            return;
        }
        
        // Stop current background music
        this.stopBackgroundMusic();
        
        // Start the appropriate track
        let targetAudio: HTMLAudioElement | null = null;
        switch (targetTrack) {
            case 1:
                targetAudio = this.backgroundAudio;
                break;
            case 2:
                targetAudio = this.backgroundAudio2;
                break;
            case 3:
                targetAudio = this.backgroundAudio3;
                break;
            case 4:
                targetAudio = this.backgroundAudio4;
                break;
        }
        
        if (targetAudio && targetAudio.readyState >= 2) {
            console.log(`Starting background track ${targetTrack}...`);
            targetAudio.volume = 0; // Start at 0 for fade-in
            targetAudio.play().then(() => {
                this.fadeIn(targetAudio!, 0, this.volume, 2000);
                this.currentBackgroundTrack = targetTrack;
            }).catch(error => {
                console.log(`Background track ${targetTrack} playback failed:`, error);
            });
        } else {
            console.log(`Background track ${targetTrack} not ready`);
        }
    }

    public playLossMusic() {
        console.log('Playing loss music...');
        if (this.lossAudio && this.lossAudio.readyState >= 2) {
            console.log('Loss music is ready, starting playback...');
            this.lossAudio.play().catch(error => {
                console.log('Loss music playback failed:', error);
            });
        } else {
            console.log('Loss music not ready');
        }
    }

    public playTripleComboAudio() {
        console.log('Playing triple combo audio...');
        if (this.tripleComboAudio && this.tripleComboAudio.readyState >= 2) {
            console.log('Triple combo audio is ready, starting playback...');
            this.tripleComboAudio.play().catch(error => {
                console.log('Triple combo audio playback failed:', error);
            });
        } else {
            console.log('Triple combo audio not ready');
        }
    }

    public playSuperComboAudio() {
        console.log('Playing super combo audio...');
        if (this.superComboAudio && this.superComboAudio.readyState >= 2) {
            console.log('Super combo audio is ready, starting playback...');
            this.superComboAudio.play().catch(error => {
                console.log('Super combo audio playback failed:', error);
            });
        } else {
            console.log('Super combo audio not ready');
        }
    }

    public playHyperComboAudio() {
        console.log('Playing hyper combo audio...');
        if (this.hyperComboAudio && this.hyperComboAudio.readyState >= 2) {
            console.log('Hyper combo audio is ready, starting playback...');
            this.hyperComboAudio.play().catch(error => {
                console.log('Hyper combo audio playback failed:', error);
            });
        } else {
            console.log('Hyper combo audio not ready');
        }
    }

    public playBrutalComboAudio() {
        console.log('Playing brutal combo audio...');
        if (this.brutalComboAudio && this.brutalComboAudio.readyState >= 2) {
            console.log('Brutal combo audio is ready, starting playback...');
            this.brutalComboAudio.play().catch(error => {
                console.log('Brutal combo audio playback failed:', error);
            });
        } else {
            console.log('Brutal combo audio not ready');
        }
    }

    public playMasterComboAudio() {
        console.log('Playing master combo audio...');
        if (this.masterComboAudio && this.masterComboAudio.readyState >= 2) {
            console.log('Master combo audio is ready, starting playback...');
            this.masterComboAudio.play().catch(error => {
                console.log('Master combo audio playback failed:', error);
            });
        } else {
            console.log('Master combo audio not ready');
        }
    }

    public playAwesomeComboAudio() {
        console.log('Playing awesome combo audio...');
        if (this.awesomeComboAudio && this.awesomeComboAudio.readyState >= 2) {
            console.log('Awesome combo audio is ready, starting playback...');
            this.awesomeComboAudio.play().catch(error => {
                console.log('Awesome combo audio playback failed:', error);
            });
        } else {
            console.log('Awesome combo audio not ready');
        }
    }

    public playBlasterComboAudio() {
        console.log('Playing blaster combo audio...');
        if (this.blasterComboAudio && this.blasterComboAudio.readyState >= 2) {
            console.log('Blaster combo audio is ready, starting playback...');
            this.blasterComboAudio.play().catch(error => {
                console.log('Blaster combo audio playback failed:', error);
            });
        } else {
            console.log('Blaster combo audio not ready');
        }
    }

    public playMonsterComboAudio() {
        console.log('Playing monster combo audio...');
        if (this.monsterComboAudio && this.monsterComboAudio.readyState >= 2) {
            console.log('Monster combo audio is ready, starting playback...');
            this.monsterComboAudio.play().catch(error => {
                console.log('Monster combo audio playback failed:', error);
            });
        } else {
            console.log('Monster combo audio not ready');
        }
    }

    public playKingComboAudio() {
        console.log('Playing king combo audio...');
        if (this.kingComboAudio && this.kingComboAudio.readyState >= 2) {
            console.log('King combo audio is ready, starting playback...');
            this.kingComboAudio.play().catch(error => {
                console.log('King combo audio playback failed:', error);
            });
        } else {
            console.log('King combo audio not ready');
        }
    }

    public playUltraComboAudio() {
        console.log('Playing ultra combo audio...');
        if (this.ultraComboAudio && this.ultraComboAudio.readyState >= 2) {
            console.log('Ultra combo audio is ready, starting playback...');
            this.ultraComboAudio.play().catch(error => {
                console.log('Ultra combo audio playback failed:', error);
            });
        } else {
            console.log('Ultra combo audio not ready');
        }
    }

    public playComboBreakerAudio() {
        console.log('Playing combo breaker audio...');
        if (this.comboBreakerAudio && this.comboBreakerAudio.readyState >= 2) {
            console.log('Combo breaker audio is ready, starting playback...');
            this.comboBreakerAudio.play().catch(error => {
                console.log('Combo breaker audio playback failed:', error);
            });
        } else {
            console.log('Combo breaker audio not ready');
        }
    }

    public stopBackgroundMusicAndPlayLoss() {
        console.log('Stopping background music and playing loss music...');
        if (this.backgroundAudio) {
            // Immediately pause the background audio
            this.backgroundAudio.pause();
            // Then fade out for smooth transition
            this.fadeOut(this.backgroundAudio, this.volume, 0, 1000);
        }
        
        // Play loss music after a short delay
        setTimeout(() => {
            this.playLossMusic();
        }, 500);
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
                case 'triple_combo':
                    // Use the actual triple-combo audio file
                    this.playTripleComboAudio();
                    return; // Exit early since we're using the audio file
                case 'super_combo':
                    // Use the actual super-combo audio file
                    this.playSuperComboAudio();
                    return; // Exit early since we're using the audio file
                case 'hyper_combo':
                    // Use the actual hyper-combo audio file
                    this.playHyperComboAudio();
                    return; // Exit early since we're using the audio file
                case 'brutal_combo':
                    // Use the actual brutal-combo audio file
                    this.playBrutalComboAudio();
                    return; // Exit early since we're using the audio file
                case 'master_combo':
                    // Use the actual master-combo audio file
                    this.playMasterComboAudio();
                    return; // Exit early since we're using the audio file
                case 'awesome_combo':
                    // Use the actual awesome-combo audio file
                    this.playAwesomeComboAudio();
                    return; // Exit early since we're using the audio file
                case 'blaster_combo':
                    // Use the actual blaster-combo audio file
                    this.playBlasterComboAudio();
                    return; // Exit early since we're using the audio file
                case 'monster_combo':
                    // Use the actual monster-combo audio file
                    this.playMonsterComboAudio();
                    return; // Exit early since we're using the audio file
                case 'king_combo':
                    // Use the actual king-combo audio file
                    this.playKingComboAudio();
                    return; // Exit early since we're using the audio file
                case 'ultra_combo':
                    // Use the actual ultra-combo audio file
                    this.playUltraComboAudio();
                    return; // Exit early since we're using the audio file
                case 'combo_breaker':
                    // Use the actual combo-breaker audio file
                    this.playComboBreakerAudio();
                    return; // Exit early since we're using the audio file
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
        if (this.backgroundAudio2) {
            this.backgroundAudio2.pause();
            this.backgroundAudio2 = null;
        }
        if (this.backgroundAudio3) {
            this.backgroundAudio3.pause();
            this.backgroundAudio3 = null;
        }
        if (this.backgroundAudio4) {
            this.backgroundAudio4.pause();
            this.backgroundAudio4 = null;
        }
        if (this.lossAudio) {
            this.lossAudio.pause();
            this.lossAudio = null;
        }
        if (this.tripleComboAudio) {
            this.tripleComboAudio.pause();
            this.tripleComboAudio = null;
        }
        if (this.superComboAudio) {
            this.superComboAudio.pause();
            this.superComboAudio = null;
        }
        if (this.hyperComboAudio) {
            this.hyperComboAudio.pause();
            this.hyperComboAudio = null;
        }
        if (this.brutalComboAudio) {
            this.brutalComboAudio.pause();
            this.brutalComboAudio = null;
        }
        if (this.masterComboAudio) {
            this.masterComboAudio.pause();
            this.masterComboAudio = null;
        }
        if (this.awesomeComboAudio) {
            this.awesomeComboAudio.pause();
            this.awesomeComboAudio = null;
        }
        if (this.blasterComboAudio) {
            this.blasterComboAudio.pause();
            this.blasterComboAudio = null;
        }
        if (this.monsterComboAudio) {
            this.monsterComboAudio.pause();
            this.monsterComboAudio = null;
        }
        if (this.kingComboAudio) {
            this.kingComboAudio.pause();
            this.kingComboAudio = null;
        }
        if (this.ultraComboAudio) {
            this.ultraComboAudio.pause();
            this.ultraComboAudio = null;
        }
        if (this.comboBreakerAudio) {
            this.comboBreakerAudio.pause();
            this.comboBreakerAudio = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }
} 