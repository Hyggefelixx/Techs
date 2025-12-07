# 如何使用Git

Git不是只记录你改了哪几行代码，而是每次提交都拍一张整个项目的全家福；`push`不是传改的那几行，而是传这张全家福的记录，远程拿到记录后能还原出和本地一模一样的完整项目

## Git 工作区域

- **工作区** .git所在目录
- **暂存区** .git/index
- **本地仓库** .git/objects

`git add`指令将**工作区**的文件提交到**暂存区**

> `git add`是准备快照，把工作区所有修改的文件，加入到待提交的暂存区

`git commit`指令将**暂存区**的文件提交到**本地仓库**

> `git commit`不是记录修改了什么，而是记录当前项目里所有文件的完整样子

`git push`指令将**本地仓库**的文件提交到**远程仓库**

> `git push`不是将改的那几行代码提交给远程，而是将拍照记录传给远程；远程拿到记录后，会根据记录还原出和本地一模一样的完整项目。但是Git不会每次都传所有文件，会对比这次快照和上次快照的差异部分，只传差异部分

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

### 更改了代码，提交到仓库中的新分支

```bash
# 创建并切换到本地新分支
git checkout -b feature/new-function

# 提交本地修改
git add .

git commit -m "add new function"

# 推动本地新分支到Github远程仓库
# 本地新分支默认不会自动关联远程，需手动推送并关联

git push -u origin feature/new-function
```

### 开发规范流程

基于远程develop开发新功能并提交到feature/train分支

1. 拉取develop最新代码

    ```bash
    # 1. 先切到本地 develop 分支（如果不在的话）
    git checkout develop

    # 2. 拉取远程 develop 的最新代码，同步到本地 develop
    git pull origin develop
    # ✅ 这一步后，本地 develop 与 GitHub 远程 develop 完全一致
    ```

2. 基于纯净的 develop创建并切换到新分支

    ```bash
    # 创建 feature/train 分支，并立即切换过去（-b = branch + checkout）
    git checkout -b feature/train
    # ✅ 此时 feature/train 分支的起点是「最新的远程 develop」，且 develop 分支未被修改
    ```

3. 在新分支上开发新功能（全程不碰 develop 分支）

    ```bash
    # 开发代码（改文件、加功能）
    # ...

    # 开发完成后，提交到 feature/train 分支
    git add .  # 暂存所有修改
    git commit -m "feat: 开发xxx新功能（备注清晰）"  # 提交到本地 feature/train
    ```

4. 将新分支推送到 GitHub 远程仓库

    ```bash
    # 首次推送新分支，需要关联本地和远程（-u = upstream）
    git push -u origin feature/train
    # ✅ 后续在 feature/train 继续开发，只需 git add → git commit → git push 即可
    ```

5. 可选）：若远程 develop 有更新，同步到 feature/train（避免合并冲突）

    如果开发过程中，同事往远程 develop 提交了新代码，建议把远程 develop 的更新同步到你的 feature/train 分支：

    ```bash
    # 1. 切回 develop 分支，拉取最新代码
    git checkout develop
    git pull origin develop

    # 2. 切回 feature/train 分支，合并 develop 的最新代码
    git checkout feature/train
    git merge develop
    # ✅ 这样你的新分支就包含了 develop 的最新代码，后续合并PR时不会有冲突
    ```
