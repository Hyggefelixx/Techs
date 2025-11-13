# 如何使用Git

## Git 工作区域

- **工作区** .git所在目录
- **暂存区** .git/index
- **本地仓库** .git/objects

`git add`指令将**工作区**的文件提交到**暂存区**

`git commit`指令将**暂存区**的文件提交到**本地仓库**

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