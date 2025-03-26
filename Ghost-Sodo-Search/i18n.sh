#!/bin/bash

# 定义项目根目录为当前目录和仓库地址
PROJECT_ROOT=$(pwd)
REPO_URL="https://github.com/TryGhost/Ghost.git"

# 克隆仓库（使用稀疏检出只拉取 ghost/i18n 目录）
git clone --filter=blob:none --sparse "$REPO_URL"
cd Ghost
git sparse-checkout init --cone
git sparse-checkout set ghost/i18n
git pull origin main

# 返回到项目根目录
cd "$PROJECT_ROOT"

# 安装依赖
cd "$PROJECT_ROOT/Ghost/ghost/i18n"
yarn

echo "Ghost/ghost/i18n 已安装"
