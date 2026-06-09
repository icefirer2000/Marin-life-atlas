# Three.js 三维地球

这是一个 Three.js + Vite 示例，包含：

- 始终围绕球心旋转和缩放
- 世界版图纹理
- 固定在世界坐标中的太阳光和辅助环境光
- 自动旋转与视角复位
- Raycaster 球面拾取及经纬度显示
- 大气层、经纬网格和星空背景

## 无需安装，直接查看

双击 `直接运行.html`。该文件从 CDN 加载 Three.js 和地球纹理，因此需要联网。

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
