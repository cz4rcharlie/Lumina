// ========== 主入口 ==========

// 状态机
const pages = {
    entrance: document.getElementById('page-entrance'),
    ritual: document.getElementById('page-ritual'),
    loading: document.getElementById('page-loading'),
    result: document.getElementById('page-result')
};

// 初始化
document.addEventListener('DOMContentLoaded', async () => {
    await loadCardsData();

    initTagSelection();
    initCard3DEffect();
    initMeteorShower();
    initPerformanceMonitor();

    // 绑定开始按钮
    document.getElementById('start-btn').addEventListener('click', startJourney);
});

