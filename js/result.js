// ========== 结果显示相关 ==========

let currentResult = null;

// 显示结果
function showResult(result) {
    currentResult = result;
    
    const pages = {
        loading: document.getElementById('page-loading'),
        result: document.getElementById('page-result'),
    };
    
    switchPage(pages.loading, pages.result);
    
    const card = result.card;
    const isReversed = result.isReversed;
    const hash = result.hash;
    
    // 更新日期和月相
    const headerDiv = pages.result.querySelector('.flex.justify-between.items-center');
    if (headerDiv) {
        const dateElement = headerDiv.querySelector('span.font-mono');
        const moonElement = headerDiv.querySelector('span.text-lg');
        if (dateElement) dateElement.textContent = getCurrentDate();
        if (moonElement) moonElement.textContent = getMoonPhase();
    }
    
    // 更新卡牌图片（延迟加载，只加载当前需要的）
    const cardContainer = document.querySelector('#card-content');
    if (cardContainer) {
        // 显示加载动画
        cardContainer.innerHTML = '<div class="absolute inset-0 flex items-center justify-center bg-void/50"><div class="w-8 h-8 border-t-2 border-l-2 border-gold rounded-full animate-spin"></div></div>';
        
        const img = document.createElement('img');
        // 构建文件名，使用压缩后的WebP格式
        const fileName = `${card.id}. ${card.name_cn} (${card.name_en}).webp`;
        img.alt = card.name_cn;
        img.className = 'w-full h-full object-cover';
        
        // 设置旋转：正位不旋转（完全不设置transform），逆位旋转180度
        const setRotation = () => {
            if (isReversed) {
                img.style.transform = 'rotate(180deg)';
                img.style.transformOrigin = 'center center';
            } else {
                // 正位：完全清除transform，确保图片正常显示
                img.style.transform = '';
                img.style.transformOrigin = '';
            }
        };
        
        // 图片加载完成后的处理
        img.onload = () => {
            setRotation();
            // 移除加载动画，显示图片
            cardContainer.innerHTML = '';
            cardContainer.appendChild(img);
        };
        
        img.onerror = function() {
            // 如果图片加载失败，显示占位符
            cardContainer.innerHTML = '';
            const placeholder = document.createElement('div');
            placeholder.className = 'absolute inset-0 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center';
            placeholder.innerHTML = `
                <span class="font-serif text-6xl opacity-20 text-white">${card.id}</span>
                <p class="absolute bottom-4 text-xs text-white/30 tracking-[0.5em] uppercase">${card.name_en}</p>
            `;
            cardContainer.appendChild(placeholder);
        };
        
        // 开始加载图片（延迟加载，只加载当前需要的，使用压缩后的WebP格式）
        img.src = `cards_small/${fileName}`;
    }
    
    // 更新卡牌名称（只显示名称，不包含正逆位）
    const nameElement = document.querySelector('#result-name-anim h2');
    if (nameElement) {
        nameElement.textContent = card.name_cn;
    }
    
    // 更新正逆位标志（右上角，小且低调）
    const positionElement = document.getElementById('result-position-anim');
    if (positionElement) {
        const positionText = isReversed ? 'REVERSED' : 'UPRIGHT';
        const positionColor = isReversed ? 'text-red-400/50' : 'text-green-400/50';
        positionElement.innerHTML = `<span class="text-[10px] ${positionColor} font-mono tracking-widest uppercase">${positionText}</span>`;
    }
    
    // 显示名称和正逆位区域
    setTimeout(() => {
        document.getElementById('result-name-anim').classList.remove('opacity-0');
        document.getElementById('result-position-anim').classList.remove('opacity-0');
    }, 50);
    
    // 更新关键词（显示全部关键词）
    const keywords = isReversed ? card.keywords.reversed : card.keywords.upright;
    const keywordsContainer = document.querySelector('#result-text-anim .flex.justify-center');
    if (keywordsContainer) {
        keywordsContainer.innerHTML = '';
        keywordsContainer.classList.add('flex-wrap', 'gap-2');
        keywords.forEach(keyword => {
            const span = document.createElement('span');
            span.className = 'font-serif text-sm text-gold/90 border border-gold/30 px-3 py-1.5 rounded-full bg-gold/5';
            span.textContent = `#${keyword}`;
            keywordsContainer.appendChild(span);
        });
    }
    
    // 更新文案（新样式：text-sm）
    const message = isReversed ? card.message.reversed : card.message.upright;
    const messageElement = document.querySelector('#result-text-anim .relative.py-4 p.text-sm');
    if (messageElement) messageElement.textContent = message;
    
    // 更新行动建议（新样式：text-sm）
    const action = isReversed ? card.action_item.reversed : card.action_item.upright;
    const actionElement = document.querySelector('#result-text-anim .bg-white\\/5 p.text-sm.text-white');
    if (actionElement) actionElement.textContent = action;
    
    // 更新社交货币挂件（底部）
    const angelNumber = generateAngelNumber(hash);
    const auraColor = generateAuraColor(hash);
    
    const numberElement = document.querySelector('#result-text-anim .font-mono.text-base');
    const colorNameElement = document.querySelector('#result-text-anim .text-xs.text-slate-300');
    const colorDot = document.querySelector('#result-text-anim .w-3.h-3');
    if (numberElement) numberElement.textContent = angelNumber;
    if (colorNameElement) colorNameElement.textContent = auraColor.name;
    if (colorDot) {
        colorDot.style.backgroundColor = auraColor.code;
        colorDot.style.boxShadow = `0 0 10px ${auraColor.code}80`;
    }
    
    // 播放揭示音效
    if (typeof audioManager !== 'undefined') {
        audioManager.playRevealSound();
    }
    
    // 依次浮现元素
    setTimeout(() => {
        document.getElementById('result-card-anim').classList.remove('translate-y-4', 'opacity-0');
    }, 100);
    
    setTimeout(() => {
        document.getElementById('result-text-anim').classList.remove('opacity-0');
        document.getElementById('result-text-anim').classList.add('animate-float');
    }, 600);

    setTimeout(() => {
        document.getElementById('save-btn-anim').classList.remove('opacity-0');
        document.getElementById('retry-btn-anim').style.display = 'block';
        setTimeout(() => {
            document.getElementById('retry-btn-anim').classList.remove('opacity-0');
        }, 100);
    }, 1200);
}

// ========== 保存卡片 ==========
async function saveCard() {
    // 使用html2canvas生成图片
    try {
        // 动态加载html2canvas库（优先使用国内访问较快的CDN）
        if (typeof html2canvas === 'undefined') {
            const script = document.createElement('script');
            // 优先使用jsdelivr（国内访问较快），失败则尝试unpkg
            script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    // 超时后尝试备用CDN
                    const fallbackScript = document.createElement('script');
                    fallbackScript.src = 'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js';
                    fallbackScript.crossOrigin = 'anonymous';
                    document.head.appendChild(fallbackScript);
                    fallbackScript.onload = () => {
                        clearTimeout(timeout);
                        resolve();
                    };
                    fallbackScript.onerror = () => reject(new Error('无法加载html2canvas库'));
                }, 5000); // 5秒超时
                
                script.onload = () => {
                    clearTimeout(timeout);
                    resolve();
                };
                script.onerror = () => {
                    clearTimeout(timeout);
                    // 如果jsdelivr失败，立即尝试unpkg
                    const fallbackScript = document.createElement('script');
                    fallbackScript.src = 'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js';
                    fallbackScript.crossOrigin = 'anonymous';
                    document.head.appendChild(fallbackScript);
                    fallbackScript.onload = () => resolve();
                    fallbackScript.onerror = () => reject(new Error('无法加载html2canvas库'));
                };
            });
        }
        
        const resultSection = document.getElementById('page-result');
        
        // 获取元素的完整尺寸（使用 offsetWidth/Height 获取包含 padding 的尺寸）
        const elementHeight = Math.max(resultSection.scrollHeight, resultSection.offsetHeight);
        const elementWidth = Math.max(resultSection.scrollWidth, resultSection.offsetWidth);
        
        // 保存原始状态
        const originalScrollTop = resultSection.scrollTop;
        const originalScrollLeft = resultSection.scrollLeft;
        const originalOverflow = resultSection.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;
        const originalMainOverflow = document.getElementById('app').style.overflow;
        
        // 临时修改样式以确保完整截取
        resultSection.scrollTop = 0;
        resultSection.scrollLeft = 0;
        resultSection.style.overflow = 'visible';
        document.body.style.overflow = 'visible';
        const appElement = document.getElementById('app');
        if (appElement) {
            appElement.style.overflow = 'visible';
        }
        
        // 等待样式应用和布局稳定
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // 获取元素的计算样式，确保获取准确的尺寸
        const computedStyle = window.getComputedStyle(resultSection);
        const paddingTop = parseInt(computedStyle.paddingTop) || 0;
        const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
        const paddingLeft = parseInt(computedStyle.paddingLeft) || 0;
        const paddingRight = parseInt(computedStyle.paddingRight) || 0;
        
        // 使用 onclone 回调确保在克隆的 DOM 中元素完全展开且样式正确
        const canvas = await html2canvas(resultSection, {
            backgroundColor: '#161025',
            scale: 2,
            useCORS: true,
            logging: false,
            height: elementHeight,
            width: elementWidth,
            windowHeight: elementHeight,
            windowWidth: elementWidth,
            onclone: (clonedDoc) => {
                // 在克隆的文档中确保元素完全展开
                const clonedElement = clonedDoc.getElementById('page-result');
                if (clonedElement) {
                    clonedElement.style.overflow = 'visible';
                    clonedElement.style.position = 'relative';
                    clonedElement.scrollTop = 0;
                    clonedElement.scrollLeft = 0;
                    // 确保宽度和高度正确
                    clonedElement.style.width = elementWidth + 'px';
                    clonedElement.style.height = elementHeight + 'px';
                }
            }
        });
        
        // 恢复原始状态
        resultSection.scrollTop = originalScrollTop;
        resultSection.scrollLeft = originalScrollLeft;
        resultSection.style.overflow = originalOverflow;
        document.body.style.overflow = originalBodyOverflow;
        if (appElement) {
            appElement.style.overflow = originalMainOverflow;
        }
        
        // 转换为图片并下载
        const link = document.createElement('a');
        link.download = `lumina-${currentResult.card.id}-${Date.now()}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
        
        // 播放完成音效
        if (typeof audioManager !== 'undefined') {
            audioManager.playCompleteSound();
        }
    } catch (error) {
        console.error('生成图片失败:', error);
        alert('生成图片失败，请稍后重试');
    }
}

// ========== 重新抽牌 ==========
function retryDraw() {
    // 重置状态
    resetTagSelection();
    currentResult = null;
    
    // 重置结果页
    document.getElementById('result-card-anim').classList.add('translate-y-4', 'opacity-0');
    document.getElementById('result-text-anim').classList.add('opacity-0');
    document.getElementById('result-name-anim').classList.add('opacity-0');
    document.getElementById('result-position-anim').classList.add('opacity-0');
    document.getElementById('save-btn-anim').classList.add('opacity-0');
    document.getElementById('retry-btn-anim').classList.add('opacity-0');
    document.getElementById('retry-btn-anim').style.display = 'none';
    
    // 返回入口页
    const pages = {
        result: document.getElementById('page-result'),
        entrance: document.getElementById('page-entrance'),
    };
    switchPage(pages.result, pages.entrance);
    // 注意：resetEntrancePage 会在 switchPage 中自动调用，无需重复调用
}

