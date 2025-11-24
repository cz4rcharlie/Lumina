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
    // 显示加载提示
    console.log('🌟 Lumina 启动中...');
    const startTime = performance.now();

    await loadCardsData();

    const loadTime = performance.now() - startTime;
    console.log(`✅ 数据加载完成，耗时: ${loadTime.toFixed(2)}ms`);

    initTagSelection();
    initCard3DEffect(); // 初始化3D卡牌效果
    initMeteorShower(); // 初始化流星雨效果
    initPerformanceMonitor(); // 初始化性能监控

    // 绑定开始按钮
    document.getElementById('start-btn').addEventListener('click', startJourney);

    console.log('🎉 Lumina 初始化完成！');
});

