# 如何使用Git

## Git 工作区域

- **工作区** .git所在目录
- **暂存区** .git/index
- **本地仓库** .git/objects

`git add`指令将**工作区**的文件提交到**暂存区**

`git commit`指令将**暂存区**的文件提交到**本地仓库**

## Git 更改用户名

### 查看用户名

```bash
# 查看全局用户名（所有仓库共用）
git config --global user.name

# 查看当前仓库用户名（仅当前仓库生效，优先级高于全局）
git config user.name
```

### 修改用户名

```bash
git config --global user.name "你的新用户名"
```

## 直观例子 Github仓库已建好，将本地文件上传至仓库

```bash
# 将当前路径的文件夹创建为仓库
git init 

# 与远程Github仓库关联，并默认别名为origin
git remote add origin https://github.com/Hyggefelixx/Techs.git

# 从名为origin的远程仓库的main分支拉取最新代码并合并到本地分支
git pull origin main

# 将工作区中Markdown\文件夹提交到暂存区
git add Markdown\

# 将暂存区中内容提交到本地仓库 -m 添加说明信息
git commit -m "更新:Markdown学习笔记"

# 将本地master分支 推送到远程仓库origin的main分支上
git push origin master:main
```

## Github上的代码更新后，如何同步到本地仓库

```bash
# 将远程仓库origin的main分支拉取到本地
git pull origin main
```

## 删除本地工作区

### 本质是删除文件夹内的Git版本控制文件`.git`

删除后可执行`git status`命令

若提示 `fatal: not a git repository (or any of the parent directories): .git`，说明.git 已删除，文件夹不再是独立仓库，操作成功！

## .gitignore的作用

### 配置删除文件项，避免文件冗余上传

- **React项目**：`node_module`不上传，项目根据`package.json`和`package-lock.json`自动安装相关依赖
- **Python项目**：`venv`以及`.idea`不用上传，一般使用`requirements.txt`进行项目的相关配置
  
Git 会读取「当前文件所在目录」及「所有上级目录」的 .gitignore 文件，规则优先级是：当前目录的 .gitignore > 上级目录的 .gitignore

## Git分支

Git 分支是 Git 最核心、最强大的功能之一，核心作用是 “在不影响主代码的前提下，并行开发、隔离修改” —— 就像给项目 “开了多条平行时间线”，不同需求、不同版本的开发可以各自独立推进，最后按需合并，彻底解决了 “多人协作冲突”“功能开发与线上稳定冲突” 等问题。

### 拉取远程仓库中指定分支

`git clone`会下载仓库所有分支的完整数据（存在本地 .git 隐藏文件夹里，你看不到），但工作区（就是你能操作的文件夹）只会显示当前检出分支（默认 main） 的文件 —— 其他分支的文件数据已下载，但不会在文件夹中展示。

切换分支时，Git 只是从 .git 里 “调取” 对应分支的文件，替换工作区的内容，并非重新下载。

```bash
# 1. 若本地未克隆仓库，先克隆远程仓库（会拉取所有分支的元信息，但默认只下载main分支文件）
git clone https://github.com/你的用户名/仓库名.git  # 替换为你的仓库URL
cd 仓库名  # 进入克隆后的本地仓库目录

# 2. 查看远程仓库的所有分支
git fetch origin  # 拉取远程仓库的所有分支元信息（不下载文件，仅更新分支列表）
git branch -r     # 列出远程所有分支（格式：origin/分支名，比如 origin/feature-登录）

# 3. 场景1：首次拉取（本地没有对应分支）
# 新建本地分支（命名建议和远程一致），并关联远程对应分支
git checkout -b feature-支付 origin/feature-支付  # 核心命令！
# 解释：
# - checkout -b：创建并切换到新本地分支（feature-支付）
# - origin/feature-支付：指定关联的远程分支（即要拉取的分支）

# 拉取远程分支的所有文件到本地新分支（若步骤1已自动拉取，此步可省略，若文件不全执行）
git pull origin feature-支付

# 3. 场景2：更新已有分支（本地已经存在对应分支，拉取最新文件）
# 先切换到本地对应的分支（必须切换到目标分支，否则会拉到其他分支）
git checkout feature-支付  # 或 git switch feature-支付

# 拉取远程该分支的最新文件（合并到本地分支）
git pull origin feature-支付
```
