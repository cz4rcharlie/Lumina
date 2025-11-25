// ========== 音频管理模块 ==========

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.backgroundBuffer = null;
        this.backgroundBufferPromise = null;
        this.backgroundSource = null;
        this.backgroundGainNode = null;
        this.isBackgroundPlaying = false;

        this.initAudioContext();
        this.preloadBackgroundMusic();
        this.setupBackgroundMusicTrigger();
    }

    // 初始化音频上下文
    initAudioContext() {
        try {
            // 创建音频上下文（需要用户交互后才能使用）
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('音频上下文初始化失败:', e);
        }
    }

    // 预加载背景音乐，确保只下载一次
    async preloadBackgroundMusic() {
        if (this.backgroundBuffer) {
            return this.backgroundBuffer;
        }
        if (this.backgroundBufferPromise) {
            return this.backgroundBufferPromise;
        }

        if (!this.audioContext) {
            this.initAudioContext();
        }
        if (!this.audioContext) return null;

        const backgroundAudioPath = 'audio/videoplayback.webm';

        this.backgroundBufferPromise = fetch(backgroundAudioPath)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
            .then(buffer => {
                this.backgroundBuffer = buffer;
                return buffer;
            })
            .catch(error => {
                console.warn('背景音乐加载失败:', error);
                this.backgroundBufferPromise = null;
                return null;
            });

        return this.backgroundBufferPromise;
    }

    // 设置用户首次交互后开始播放背景音乐
    setupBackgroundMusicTrigger() {
        const events = ['pointerdown', 'keydown', 'touchstart'];
        const handler = () => {
            this.startBackgroundMusic();
            events.forEach(evt => window.removeEventListener(evt, handler));
        };
        events.forEach(evt => window.addEventListener(evt, handler, { passive: true }));
    }

    // 播放背景音乐（低音量，循环播放）
    async startBackgroundMusic() {
        if (!this.audioContext || this.isBackgroundPlaying) return;

        await this.ensureAudioContext();

        const buffer = await this.preloadBackgroundMusic();
        if (!buffer) return;

        this.backgroundGainNode = this.audioContext.createGain();
        this.backgroundGainNode.gain.value = 0.6; // 稍提升音量但仍保持柔和

        this.backgroundSource = this.audioContext.createBufferSource();
        this.backgroundSource.buffer = buffer;
        this.backgroundSource.loop = true;

        this.backgroundSource.connect(this.backgroundGainNode);
        this.backgroundGainNode.connect(this.audioContext.destination);

        try {
            this.backgroundSource.start(0);
            this.isBackgroundPlaying = true;
            this.backgroundSource.onended = () => {
                this.isBackgroundPlaying = false;
            };
        } catch (e) {
            console.warn('背景音乐播放失败:', e);
        }
    }

    // 确保音频上下文处于运行状态
    async ensureAudioContext() {
        if (!this.audioContext) {
            this.initAudioContext();
        }
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }


    // 播放点击音效
    playClickSound() {
        if (!this.audioContext) return;

        this.ensureAudioContext().then(() => {
            try {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.005, this.audioContext.currentTime + 0.1);
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.1);
            } catch (e) {
                // 静默失败
            }
        });
    }

    // 播放洗牌音效
    playShuffleSound() {
        if (!this.audioContext) return;

        this.ensureAudioContext().then(() => {
            try {
                // 创建多个短促的音调，模拟洗牌声音
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        const oscillator = this.audioContext.createOscillator();
                        const gainNode = this.audioContext.createGain();
                        
                        oscillator.type = 'sawtooth'; // 锯齿波，更有质感
                        oscillator.frequency.value = 200 + Math.random() * 100;
                        
                        gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.005, this.audioContext.currentTime + 0.05);
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(this.audioContext.destination);
                        
                        oscillator.start();
                        oscillator.stop(this.audioContext.currentTime + 0.05);
                    }, i * 50);
                }
            } catch (e) {
                // 静默失败
            }
        });
    }

    // 播放揭示音效（显示卡牌时）
    playRevealSound() {
        if (!this.audioContext) return;

        this.ensureAudioContext().then(() => {
            try {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                // 从低到高的神秘音调
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.8);
                
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.2);
                gainNode.gain.linearRampToValueAtTime(0.08, this.audioContext.currentTime + 0.8);
                gainNode.gain.exponentialRampToValueAtTime(0.005, this.audioContext.currentTime + 1.2);
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 1.2);
            } catch (e) {
                // 静默失败
            }
        });
    }

    // 播放完成音效
    playCompleteSound() {
        if (!this.audioContext) return;

        this.ensureAudioContext().then(() => {
            try {
                // 播放一个和谐的和弦
                const frequencies = [440, 554.37, 659.25]; // A, C#, E 大三和弦
                
                frequencies.forEach((freq, index) => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.value = freq;
                    
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(0.12, this.audioContext.currentTime + 0.1);
                    gainNode.gain.linearRampToValueAtTime(0.06, this.audioContext.currentTime + 0.5);
                    gainNode.gain.exponentialRampToValueAtTime(0.005, this.audioContext.currentTime + 0.8);
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.start();
                    oscillator.stop(this.audioContext.currentTime + 0.8);
                });
            } catch (e) {
                // 静默失败
            }
        });
    }
}

// 创建全局音频管理器实例
const audioManager = new AudioManager();

