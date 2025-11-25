// ========== UI交互相关 ==========

let selectedTag = null;
let tagSelectionClickHandler = null;
let isTagSelectionInitialized = false;

// 标签选择初始化
function initTagSelection() {
    // 如果已经初始化过，先清理旧的事件监听器
    if (isTagSelectionInitialized && tagSelectionClickHandler) {
        document.removeEventListener('click', tagSelectionClickHandler, true);
        tagSelectionClickHandler = null;
    }
    
    const tagButtons = document.querySelectorAll('.tag-btn');
    const startBtn = document.getElementById('start-btn');
    const startHint = document.getElementById('start-hint');

    // 使用事件委托，避免重复绑定
    const tagContainer = document.getElementById('tag-container');
    if (tagContainer && !isTagSelectionInitialized) {
        tagContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.tag-btn');
            if (!btn) return;
            
            // 移除其他按钮的选中状态
            tagButtons.forEach(b => {
                b.classList.remove('bg-gold', 'text-black', 'border-gold');
                b.classList.add('border-gold/30', 'text-gold/70');
            });

            // 选中当前按钮
            btn.classList.add('bg-gold', 'text-black', 'border-gold');
            btn.classList.remove('border-gold/30', 'text-gold/70');

            selectedTag = btn.dataset.tag;
            
            // 播放点击音效
            if (typeof audioManager !== 'undefined') {
                audioManager.playClickSound();
            }

            // 显示开始按钮
            if (startBtn) {
                startBtn.style.opacity = '1';
                startBtn.style.pointerEvents = 'auto';
            }
            if (startHint) {
                startHint.textContent = '点击注入能量 · 开启链接';
            }
        });
    }

    // 监听整个页面的点击事件，确保选中状态保持
    // 使用事件捕获阶段，确保在按钮点击事件之前执行
    tagSelectionClickHandler = (e) => {
        // 如果点击的是按钮，不做任何处理（让按钮自己的点击事件处理）
        if (e.target.classList.contains('tag-btn')) {
            return;
        }

        // 如果点击的是其他区域且当前有选中的标签，确保样式保持
        if (selectedTag) {
            const selectedButton = document.querySelector(`[data-tag="${selectedTag}"]`);
            if (selectedButton) {
                // 只在样式可能丢失时重新应用（检查是否缺少关键类名）
                if (!selectedButton.classList.contains('bg-gold') ||
                    !selectedButton.classList.contains('text-black') ||
                    !selectedButton.classList.contains('border-gold')) {

                    selectedButton.classList.remove('border-gold/30', 'text-gold/70');
                    selectedButton.classList.add('bg-gold', 'text-black', 'border-gold');

                    // 使用inline style确保样式优先级
                    selectedButton.style.backgroundColor = '#E5A0C0';
                    selectedButton.style.color = '#161025';
                    selectedButton.style.borderColor = '#E5A0C0';
                    selectedButton.style.opacity = '1';
                }
            }
        }
    };
    
    document.addEventListener('click', tagSelectionClickHandler, true);
    isTagSelectionInitialized = true;
}

// 获取选中的标签
function getSelectedTag() {
    return selectedTag;
}

// 重置标签选择
function resetTagSelection() {
    selectedTag = null;
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.classList.remove('bg-gold', 'text-black', 'border-gold');
        btn.classList.add('border-gold/30', 'text-gold/70');
    });
    
    const startBtn = document.getElementById('start-btn');
    const startHint = document.getElementById('start-hint');
    if (startBtn) {
        startBtn.style.opacity = '0';
        startBtn.style.pointerEvents = 'none';
    }
    if (startHint) {
        startHint.textContent = '请先选择你的问题';
    }
}

// ========== 首页3D卡牌倾斜效果 ==========
// 保存事件处理器引用，以便后续清理
let card3DMouseMoveHandler = null;
let card3DDeviceMotionHandler = null;
let card3DMouseLeaveHandler = null;
let isCard3DEffectInitialized = false;

function initCard3DEffect() {
    const card3d = document.getElementById('card-3d');
    if (!card3d) return;
    
    // 如果已经初始化过，先清理旧的事件监听器
    if (isCard3DEffectInitialized) {
        cleanupCard3DEffect();
    }
    
    // 重置卡片状态
    card3d.style.transform = '';
    card3d.style.transition = '';
    
    // 桌面端：鼠标移动效果
    let mouseX = 0, mouseY = 0;
    card3DMouseMoveHandler = (e) => {
        const rect = card3d.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        mouseX = (e.clientX - centerX) / (rect.width / 2);
        mouseY = (e.clientY - centerY) / (rect.height / 2);
        
        // 限制倾斜角度
        const rotateX = Math.max(-15, Math.min(15, mouseY * 15));
        const rotateY = Math.max(-15, Math.min(15, mouseX * -15));
        
        card3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    // 移动端：设备倾斜效果
    card3DDeviceMotionHandler = (e) => {
        if (e.rotationRate) {
            const beta = e.rotationRate.beta || 0;
            const gamma = e.rotationRate.gamma || 0;
            
            const rotateX = Math.max(-15, Math.min(15, beta * 0.5));
            const rotateY = Math.max(-15, Math.min(15, gamma * 0.5));
            
            card3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    };
    
    // 添加事件监听
    document.addEventListener('mousemove', card3DMouseMoveHandler);
    
    // 尝试请求设备运动权限（移动端）
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        // iOS 13+ 需要权限
    } else if (window.DeviceMotionEvent) {
        // Android 直接监听
        window.addEventListener('devicemotion', card3DDeviceMotionHandler);
    }
    
    // 鼠标离开时恢复
    card3DMouseLeaveHandler = () => {
        card3d.style.transition = 'transform 0.5s ease-out';
        card3d.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        setTimeout(() => {
            card3d.style.transition = '';
        }, 500);
    };
    
    card3d.addEventListener('mouseleave', card3DMouseLeaveHandler);
    
    isCard3DEffectInitialized = true;
}

// 清理3D卡牌效果的事件监听器
function cleanupCard3DEffect() {
    if (card3DMouseMoveHandler) {
        document.removeEventListener('mousemove', card3DMouseMoveHandler);
        card3DMouseMoveHandler = null;
    }
    
    if (card3DDeviceMotionHandler) {
        window.removeEventListener('devicemotion', card3DDeviceMotionHandler);
        card3DDeviceMotionHandler = null;
    }
    
    const card3d = document.getElementById('card-3d');
    if (card3d && card3DMouseLeaveHandler) {
        card3d.removeEventListener('mouseleave', card3DMouseLeaveHandler);
        card3DMouseLeaveHandler = null;
    }
    
    // 重置卡片状态
    if (card3d) {
        card3d.style.transform = '';
        card3d.style.transition = '';
    }
    
    isCard3DEffectInitialized = false;
}

// ========== 重置首页状态 ==========
function resetEntrancePage() {
    // 重置3D卡牌效果
    cleanupCard3DEffect();
    
    // 重置卡片transform和样式
    const card3d = document.getElementById('card-3d');
    if (card3d) {
        card3d.style.transform = '';
        card3d.style.transition = '';
        // 强制重新计算样式，清除任何累积的transform
        void card3d.offsetWidth;
    }
    
    // 重置入口页面的动画类（移除可能累积的类）
    const entrancePage = document.getElementById('page-entrance');
    if (entrancePage) {
        entrancePage.classList.remove('animate-pulse');
        // 强制重新计算样式
        void entrancePage.offsetWidth;
    }
    
    // 重置所有光晕元素的样式（确保动画状态一致）
    const glowElements = entrancePage?.querySelectorAll('[class*="animate-breathe"], [class*="animate-pulse"], [class*="animate-glow-pulse"]');
    if (glowElements) {
        glowElements.forEach(el => {
            // 移除并重新添加动画类，重置动画状态
            const classes = Array.from(el.classList);
            classes.forEach(cls => {
                if (cls.includes('animate-')) {
                    el.classList.remove(cls);
                    void el.offsetWidth; // 强制重排
                    el.classList.add(cls);
                }
            });
        });
    }
    
    // 重新初始化3D效果（确保状态一致）
    initCard3DEffect();

    // 重新启动流星雨
    initMeteorShower();
}

// ========== 性能监控（可选） ==========
function initPerformanceMonitor() {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;

    function updateFPS() {
        const now = performance.now();
        frameCount++;
        if (now - lastTime >= 1000) {
            fps = Math.round((frameCount * 1000) / (now - lastTime));
            frameCount = 0;
            lastTime = now;
        }
        requestAnimationFrame(updateFPS);
    }

    // 只在开发模式下启用
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        updateFPS();
    }
}

// ========== 涟漪效果 ==========
function createRipple(event, element) {
    // 移除之前的涟漪效果
    const existingRipple = element.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }

    // 创建涟漪元素
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(229, 160, 192, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';

    // 计算涟漪位置
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    // 添加到按钮
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // 动画结束后移除涟漪
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ========== 流星雨效果 ==========
let meteorShowerTimer = null;

function initMeteorShower() {
    // 如果已经在运行，先停止，确保单例
    stopMeteorShower();
    
    const container = document.getElementById('meteor-container');
    if (!container) {
        return;
    }

    function scheduleNext() {
        // 1~5秒随机间隔
        const delay = Math.random() * 4000 + 1000;
        meteorShowerTimer = setTimeout(() => {
            createMeteor();
            scheduleNext();
        }, delay);
    }

    // 延迟一点点确保DOM完全加载
    setTimeout(() => {
        createMeteor(); // 立即生成一个
        scheduleNext();
    }, 100);
}

function stopMeteorShower() {
    if (meteorShowerTimer) {
        clearTimeout(meteorShowerTimer);
        meteorShowerTimer = null;
    }
}

function createMeteor() {
    const container = document.getElementById('meteor-container');
    // 如果容器不存在或不可见，则不生成
    if (!container) {
        return;
    }

    // 检查是否还在入口页
    const entrancePage = document.getElementById('page-entrance');
    if (entrancePage && entrancePage.classList.contains('hidden')) {
        stopMeteorShower();
        return;
    }

    const meteor = document.createElement('div');
    meteor.className = 'shooting-star';
    
    // 随机位置 - 在卡片内部
    // 流星从左上往右下划过 (rotate -45deg)
    // 从卡片的左边缘或上边缘开始，确保在卡片内可见
    const startFromLeft = Math.random() > 0.5; // 50%从左边进入，50%从上边进入
    
    let startLeft, startTop;
    if (startFromLeft) {
        // 从左边进入
        startLeft = -5; // 从左边缘外一点点
        startTop = Math.random() * 100;  // 0% to 100%
    } else {
        // 从上边进入
        startLeft = Math.random() * 100; // 0% to 100%
        startTop = -5; // 从上边缘外一点点
    }
    
    meteor.style.left = `${startLeft}%`;
    meteor.style.top = `${startTop}%`;
    
    // 随机速度 0.8~1.2s
    const duration = Math.random() * 0.4 + 0.8;
    
    // 设置动画 - 使用 animation 简写属性
    meteor.style.animation = `shooting-star ${duration}s linear forwards`;
    
    container.appendChild(meteor);
    
    // 动画结束后移除
    setTimeout(() => {
        meteor.remove();
    }, duration * 1000 + 100);
}
