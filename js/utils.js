// ========== 工具函数 ==========

// FNV-1a Hash算法
function fnv1aHash(str) {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0; // 转为无符号32位整数
}

// 生成灵数（基于Hash）
function generateAngelNumber(hash) {
    const numbers = [111, 222, 333, 444, 555, 666, 777, 888, 999, 1212, 1313, 1414];
    return numbers[Math.abs(hash) % numbers.length];
}

// 生成幸运色（基于Hash）
function generateAuraColor(hash) {
    const colors = [
        { name: '星尘白', code: '#FFFFFF' },
        { name: '香槟金', code: '#D4AF37' },
        { name: '薰衣草紫', code: '#E6E6FA' },
        { name: '深空蓝', code: '#2D1B4E' },
        { name: '玫瑰金', code: '#E8B4B8' },
        { name: '月光银', code: '#C0C0C0' },
        { name: '翡翠绿', code: '#50C878' },
        { name: '琥珀橙', code: '#FFBF00' }
    ];
    return colors[Math.abs(hash) % colors.length];
}

// 获取当前日期
function getCurrentDate() {
    const now = new Date();
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
}

// 获取月相图标
function getMoonPhase() {
    const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    const day = new Date().getDate();
    return phases[day % phases.length];
}

// 页面切换函数
function switchPage(from, to) {
    from.style.opacity = '0';
    setTimeout(() => {
        from.classList.add('hidden');
        to.classList.remove('hidden');
        void to.offsetWidth; 
        to.style.opacity = '1';
        to.style.transition = 'opacity 0.5s ease-in';
        
        // 如果切换到首页，重置首页状态以确保效果一致
        if (to.id === 'page-entrance' && typeof resetEntrancePage === 'function') {
            // 延迟执行，确保页面切换动画完成
            setTimeout(() => {
                resetEntrancePage();
            }, 100);
        }
    }, 500);
}

