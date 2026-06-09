# 数据来源

## Natural Earth

- 数据集：Natural Earth Vector，Admin 0 - Countries，1:110m
- 项目主页：https://www.naturalearthdata.com/
- 数据仓库：https://github.com/nvkelso/natural-earth-vector
- 项目文件：`public/data/ne_110m_admin_0_countries.geojson`
- 用途：按 `CONTINENT` 属性归并国家边界，生成七大洲球面网格
- 许可：Natural Earth 数据属于公共领域（Public Domain）
- 获取日期：2026-06-09（UTC+8）

数据中的 `Seven seas (open ocean)` 分类未用于大陆网格。

v1.4 起，大陆三角形会在单位球面上递归细分，并投影到固定半径，以避免大三角形穿入海洋球体。

## Mapzen Terrain Tiles

- 数据集：Terrain Tiles，Terrarium PNG
- AWS Open Data：https://registry.opendata.aws/terrain-tiles/
- 格式说明：https://github.com/tilezen/joerd/blob/master/docs/formats.md
- 数据署名：https://github.com/tilezen/joerd/blob/master/docs/attribution.md
- S3 资源：`s3://elevation-tiles-prod/terrarium/{z}/{x}/{y}.png`
- 用途：v1.6 点击大陆后按需加载真实 DEM，生成球面地形和等高线
- 访问日期：2026-06-09（UTC+8）

Terrarium 像素按以下公式解码为米：

`elevation = red × 256 + green + blue ÷ 256 - 32768`

项目使用 z5 瓦片，每个瓦片采样为 32 × 32 个网格单元。地形几何使用真实海拔值，但为保证全球视角下可辨认，高度在视觉上放大 35 倍；界面中对此进行了明确标注。

Terrain Tiles 汇集 SRTM、ETOPO1、GMTED2010、3DEP、EU-DEM 等多个开放高程源。发布或再分发时应保留 Mapzen 及各原始数据提供方署名，完整要求见上述 attribution 文档。该数据不得用于导航。
