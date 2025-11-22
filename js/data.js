// ========== 数据加载 ==========
let cardsData = [];

async function loadCardsData() {
    try {
        const response = await fetch('MajorArcana22.json');
        cardsData = await response.json();
        console.log('卡牌数据加载成功:', cardsData.length, '张');
        return cardsData;
    } catch (error) {
        console.error('加载卡牌数据失败:', error);
        alert('数据加载失败，请刷新页面重试');
        throw error;
    }
}

function getCardsData() {
    return cardsData;
}

