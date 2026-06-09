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
