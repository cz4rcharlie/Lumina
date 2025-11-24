// ========== 音频管理模块 ==========

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.initAudioContext();
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
                
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                
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
                        
                        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
                        
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
                gainNode.gain.linearRampToValueAtTime(0.25, this.audioContext.currentTime + 0.2);
                gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.8);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1.2);
                
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
                    gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.1);
                    gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.5);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
                    
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

