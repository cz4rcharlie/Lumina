# Lumina · 流光 ✨

> 潜意识映射的沉浸式塔罗体验

🌐 **在线体验：[lumina-flow.top](https://lumina-flow.top/)**

一个基于纯前端技术的塔罗牌占卜网站，通过物理交互（陀螺仪/触摸）、精美视觉设计和多感官体验，打造极具仪式感的数字占卜之旅。

## ✨ 特色功能

- 🎴 **22张大阿卡纳塔罗牌** - 完整的视觉和文案设计
- 🌊 **物理化洗牌** - 利用陀螺仪或手势生成独特的随机种子
- 🎨 **沉浸式视觉** - 星空粒子、全息卡牌、流畅动画
- 🎵 **多感官体验** - 背景音效与触觉震动反馈
- 📱 **完美适配移动端** - 专为小红书等社交平台优化
- 💫 **零后端成本** - 纯前端实现，极速响应

## 🛠 技术栈

- 原生 JavaScript (ES6+)
- CSS3 动画与 3D 变换
- TailwindCSS (CDN)
- Web API: DeviceMotion, Vibration, Canvas

## 🚀 本地调试

### 方法一：使用 Python 简易服务器（推荐）

```bash
# Python 3.x
python3 -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

然后在浏览器访问：`http://localhost:8000`

### 方法二：使用 Node.js 服务器

```bash
# 安装 http-server
npm install -g http-server

# 启动服务
http-server -p 8000
```

### 方法三：使用 VS Code Live Server

1. 安装 VS Code 插件：`Live Server`
2. 右键 `index.html` → 选择 `Open with Live Server`
3. 自动在浏览器打开

### 📱 移动端调试

由于项目使用了陀螺仪等移动端特性，建议使用以下方式进行真机测试：

1. **局域网访问**：
   - 启动本地服务后，在同一 WiFi 下用手机访问电脑的局域网 IP
   - 例如：`http://192.168.1.100:8000`

2. **使用 HTTPS**（陀螺仪权限需要）：
   ```bash
   # 使用 http-server 配置 SSL
   http-server -p 8000 -S -C cert.pem -K key.pem
   ```

3. **在线部署**（推荐）：
   - 部署到 Vercel / Netlify / GitHub Pages
   - 自动提供 HTTPS，可直接测试完整功能
   - 🌐 **线上版本**：[lumina-flow.top](https://lumina-flow.top/)

## 📁 项目结构

```
Lumina/
├── index.html              # 主入口文件
├── css/
│   ├── styles.css         # 主样式文件
│   └── animations.css     # 动画效果
├── js/
│   ├── main.js           # 主逻辑
│   ├── data.js           # 数据加载
│   ├── ritual.js         # 洗牌仪式
│   ├── result.js         # 结果展示
│   ├── ui.js             # UI 交互
│   ├── audio.js          # 音频控制
│   ├── utils.js          # 工具函数
│   └── config.js         # 配置文件
├── cards/                 # 塔罗牌图片（PNG）
├── cards_small/           # 塔罗牌图片（WebP 优化版）
├── MajorArcana22.json    # 塔罗牌数据与文案
├── robots.txt            # 搜索引擎爬虫规则
└── sitemap.xml           # 网站地图

```

## 🎯 核心体验流程

1. **入口页**：选择问题标签（暧昧/伴侣/事业/财运/指引）
2. **洗牌仪式**：摇晃手机或移动鼠标，生成随机种子
3. **结果展示**：翻牌动画 + 个性化解读文案
4. **分享**：生成精美卡片，保存或分享到社交平台

## 🎨 设计理念

- **去 AI 化**：基于精心编写的文案库，保证内容质量与响应速度
- **仪式感**：通过物理交互、动画节奏、音效设计营造沉浸体验
- **社交货币**：灵数、幸运色等小挂件，提升分享价值

## 📝 开发说明

- 建议使用 **HTTPS** 环境测试，以启用陀螺仪等移动端特性
- 图片资源已优化为 WebP 格式，加载速度更快
- 所有动画使用 `transform` 和 `opacity`，确保流畅性能

## 📄 License

MIT License

---

**Designed by 筑梦查理**

