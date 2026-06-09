# 版本管理约定

本项目只保留一份长期维护的源码，不为每个版本复制完整目录。

## 日常修改

完成一个独立的小功能或修复后：

```powershell
git add .
git commit -m "简要说明本次修改"
```

## 发布稳定版本

完成并验证一个稳定版本后创建标签：

```powershell
git tag -a v1.1 -m "海错图项目 v1.1"
```

查看所有版本：

```powershell
git tag
```

## 查看旧版本

临时查看旧版本：

```powershell
git switch --detach v1.0
```

回到最新开发版本：

```powershell
git switch main
```

## 建议

- 每项清晰、可验证的修改创建一次提交。
- 只有稳定节点使用 `v1.0`、`v1.1`、`v2.0` 等标签。
- 大型实验功能使用独立分支。
- `node_modules`、`dist` 和 `.vite` 不纳入版本库。
- 只在对外交付或离线归档时创建完整压缩包。
