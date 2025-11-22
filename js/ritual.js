// ========== 混沌洗牌算法 ==========

// 计算Hash值
function calculateHash(entropyData) {
    if (entropyData.length === 0) {
        // 如果没有数据，使用时间戳作为后备
        entropyData = [{ time: Date.now(), x: Math.random(), y: Math.random() }];
    }
    
    // 构建熵字符串
    let entropyString = '';
    entropyData.forEach(data => {
        if (data.x !== undefined) {
            entropyString += `${data.x},${data.y},${data.time}`;
        } else {
            entropyString += `${data.alpha},${data.beta},${data.gamma},${data.time}`;
        }
    });
    
    // 添加额外熵源
    entropyString += Date.now().toString();
    entropyString += Math.random().toString();
    
    return fnv1aHash(entropyString);
}

// 抽取卡牌
function drawCard(hash, cardsData) {
    const cardIndex = Math.abs(hash) % 22;
    const isReversed = (hash % 2 !== 0);
    const card = cardsData[cardIndex];
    
    return {
        card: card,
        isReversed: isReversed,
        hash: hash
    };
}

// 开始洗牌仪式
function startRitualLogic(useTouch = false, onComplete) {
    const progressBar = document.getElementById('progress-bar');
    const deckCard = document.getElementById('deck-card');
    const actionText = document.getElementById('action-text');
    
    // 熵数据收集
    let entropyData = [];
    let lastSampleTime = Date.now();
    let lastX = 0, lastY = 0;
    let lastAlpha = 0, lastBeta = 0, lastGamma = 0;
    
    // 进度条在3秒内逐渐填满
    progressBar.style.width = '0%';
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 50);

    // 数据采样函数（每100ms采样一次）
    function sampleData() {
        const now = Date.now();
        const timestamp = now;
        
        if (useTouch) {
            // 触摸模式：使用鼠标/触摸位置
            entropyData.push({
                x: lastX,
                y: lastY,
                time: timestamp
            });
        } else {
            // 陀螺仪模式：使用设备运动数据
            entropyData.push({
                alpha: lastAlpha,
                beta: lastBeta,
                gamma: lastGamma,
                time: timestamp
            });
        }
    }

    // 鼠标/触摸事件监听
    let mouseMoveHandler, touchMoveHandler;
    
    if (useTouch) {
        actionText.textContent = '请用手指在屏幕画圆';
        
        mouseMoveHandler = (e) => {
            lastX = e.clientX;
            lastY = e.clientY;
        };
        
        touchMoveHandler = (e) => {
            if (e.touches.length > 0) {
                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
            }
        };
        
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('touchmove', touchMoveHandler);
    } else {
        actionText.textContent = '请摇晃手机';
        
        // 陀螺仪事件监听
        const deviceMotionHandler = (e) => {
            if (e.rotationRate) {
                lastAlpha = e.rotationRate.alpha || 0;
                lastBeta = e.rotationRate.beta || 0;
                lastGamma = e.rotationRate.gamma || 0;
            }
        };
        
        window.addEventListener('devicemotion', deviceMotionHandler);
        
        // 清理函数
        window.cleanupDeviceMotion = () => {
            window.removeEventListener('devicemotion', deviceMotionHandler);
        };
    }

    // 采样定时器（每100ms）
    const sampleInterval = setInterval(sampleData, 100);
    
    // 视觉反馈定时器（每150ms，更流畅的动画）
    let shakeCount = 0;
    let lastRotation = 0;
    let lastTranslateX = 0;
    let lastTranslateY = 0;
    
    const visualInterval = setInterval(() => {
        shakeCount++;
        
        // 计算进度（0-1）
        const progress = shakeCount / 20; // 3秒 = 20次 * 150ms
        
        // 根据进度调整动画强度（开始强烈，逐渐减弱）
        const intensity = 1 - (progress * 0.3); // 从1.0到0.7
        
        // 平滑的随机旋转（使用缓动，避免突变）
        const targetRot = (Math.random() * 12 - 6) * intensity;
        const targetX = (Math.random() * 12 - 6) * intensity;
        const targetY = (Math.random() * 8 - 4) * intensity;
        
        // 平滑过渡（避免突然跳动）
        lastRotation = lastRotation * 0.6 + targetRot * 0.4;
        lastTranslateX = lastTranslateX * 0.6 + targetX * 0.4;
        lastTranslateY = lastTranslateY * 0.6 + targetY * 0.4;
        
        // 添加轻微的缩放效果（呼吸感）
        const scale = 1 + Math.sin(shakeCount * 0.3) * 0.02;
        
        // 应用变换
        deckCard.style.transform = `
            rotate(${lastRotation}deg) 
            translate(${lastTranslateX}px, ${lastTranslateY}px)
            scale(${scale})
        `;
        
        // 添加光效强度变化
        const glowIntensity = 0.3 + Math.sin(shakeCount * 0.5) * 0.2;
        deckCard.style.boxShadow = `
            0 0 ${30 * glowIntensity}px rgba(212, 175, 55, ${0.3 * glowIntensity}),
            inset 0 0 ${60 * glowIntensity}px rgba(212, 175, 55, ${0.1 * glowIntensity})
        `;
        
        // 震动反馈（只在特定时机）
        if (navigator.vibrate && !useTouch && shakeCount % 3 === 0) {
            navigator.vibrate(30);
        }
        
        if (shakeCount >= 20) { // 3秒后（20次 * 150ms = 3000ms）
            clearInterval(sampleInterval);
            clearInterval(visualInterval);
            
            // 清理事件监听
            if (useTouch) {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('touchmove', touchMoveHandler);
            } else if (window.cleanupDeviceMotion) {
                window.cleanupDeviceMotion();
            }
            
            // 最终动画：卡片回到中心并放大
            deckCard.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
            deckCard.style.transform = 'rotate(0deg) translate(0, 0) scale(1.05)';
            deckCard.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.5), inset 0 0 80px rgba(212, 175, 55, 0.2)';
            
            // 延迟后调用完成回调
            setTimeout(() => {
                // 计算Hash并抽取卡牌
                const hash = calculateHash(entropyData);
                if (onComplete) {
                    onComplete(hash);
                }
            }, 500);
        }
    }, 150);
}

// 开始旅程
function startJourney() {
    const selectedTag = getSelectedTag();
    if (!selectedTag) {
        alert('请先选择你的问题');
        return;
    }
    
    // 请求陀螺仪权限（iOS）
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    proceedToRitual();
                } else {
                    // 降级为触摸滑动
                    proceedToRitual(true);
                }
            })
            .catch(() => {
                proceedToRitual(true);
            });
    } else {
        proceedToRitual();
    }
}

function proceedToRitual(useTouch = false) {
    const pages = {
        entrance: document.getElementById('page-entrance'),
        ritual: document.getElementById('page-ritual'),
    };
    
    pages.entrance.classList.add('animate-pulse');
    setTimeout(() => {
        switchPage(pages.entrance, pages.ritual);
        startRitualLogic(useTouch, (hash) => {
            finishRitual(hash);
        });
    }, 800);
}

// 完成仪式 -> 进入伪加载
function finishRitual(hash) {
    const cardsData = getCardsData();
    const result = drawCard(hash, cardsData);
    
    const pages = {
        ritual: document.getElementById('page-ritual'),
        loading: document.getElementById('page-loading'),
    };
    
    switchPage(pages.ritual, pages.loading);
    
    const loadingText = document.getElementById('loading-text');
    const phrases = [
        "正在链接潜意识频率...",
        "捕捉环境磁场熵值...",
        "星图矩阵校准中...",
        "解读完成。"
    ];
    
    let i = 0;
    const textInterval = setInterval(() => {
        if (i < phrases.length) {
            loadingText.innerText = phrases[i];
            i++;
        } else {
            clearInterval(textInterval);
        }
    }, 800);

    // 3.2秒后显示结果（showResult 在 result.js 中定义）
    setTimeout(() => {
        if (typeof showResult === 'function') {
            showResult(result);
        } else {
            console.error('showResult 函数未找到');
        }
    }, 3200);
}

