# 半亩法塘 - 国经2503班

一个现代化的班级网页设计，采用渐变色彩和优雅动画效果。

## 功能特点

- 🎨 现代化设计：精美的渐变色彩和流畅动画
- 📱 响应式布局：完美适配各种设备
- 🎭 交互动画：平滑滚动和悬停效果
- 📸 相册展示：记录班级美好时光
- 📝 留言功能：互动交流平台

## 技术栈

- HTML5
- CSS3（使用Grid布局和Flexbox）
- JavaScript（原生JS，无依赖）

## 文件结构

```
├── index.html      # 主页面
├── styles.css      # 样式文件
├── script.js       # 交互脚本
└── README.md       # 说明文档
```

## 使用说明

1. 直接在浏览器中打开 `index.html` 文件即可浏览
2. 或者使用本地服务器运行（推荐）：
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 使用Node.js (http-server)
   npx http-server
   ```
3. 访问 `http://localhost:8000` 查看网站

## 页面结构

- **首页**：醒目的英雄区域，展示班级主题
- **关于我们**：介绍班级特色和理念
- **精彩活动**：展示各类班级活动
- **班级相册**：记录美好回忆
- **留言板**：互动交流功能

## 自定义

### 修改颜色主题

在 `styles.css` 的 `:root` 部分修改颜色变量：

```css
:root {
    --primary-color: #6C5CE7;
    --secondary-color: #00D2D3;
    --accent-color: #FF6B81;
    /* 更多颜色... */
}
```

### 添加真实图片

将占位符替换为实际图片：

```html
<!-- 替换 -->
<div class="image-placeholder">📸</div>

<!-- 为 -->
<img src="your-image.jpg" alt="照片描述">
```

### 更新内容

直接编辑 `index.html` 中的文字内容即可。

## 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge

## 许可证

© 2024 半亩法塘 | 国经2503班
