# Three.js 三维地球

这是一个 Three.js + Vite 示例，包含：

- 始终围绕球心旋转和缩放
- 无贴图的纯色海洋球体
- 固定在世界坐标中的太阳光和辅助环境光
- 自动旋转与视角复位
- Raycaster 球面拾取及经纬度显示
- 大气层、经纬网格和星空背景
- Natural Earth 数据生成并经球面细分的七大洲彩色网格
- 大陆表面悬停高亮、点击交互、名称标签和基本信息面板

版本开发记录见 `CHANGELOG.md`。
地理数据来源见 `DATA_SOURCES.md`。

## 无需安装，直接查看

双击 `直接运行.html`。该文件从 CDN 加载 Three.js、地球纹理和 Natural Earth 数据，因此需要联网。

## Vite 方式运行

安装 Node.js 后，在本目录打开 PowerShell：

```powershell
npm install
npm run dev
```

然后打开终端显示的本地地址，通常为：

```text
http://localhost:5173/
```

停止服务器时按 `Ctrl+C`。

## 构建

```powershell
npm run build
```

构建结果位于 `dist` 目录。
