// ========== 数据加载 ==========
let cardsData = [];

async function loadCardsData() {
    try {
        const response = await fetch('MajorArcana22.json');
        cardsData = await response.json();
        return cardsData;
    } catch (error) {
        alert('数据加载失败，请刷新页面重试');
        throw error;
    }
}

function getCardsData() {
    return cardsData;
}

