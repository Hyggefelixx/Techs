# AI项目前端开发

## Node.js

**Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境（runtime environment）**，核心要点如下：

1. **打破 JS 的运行限制**：传统 JavaScript 只能在浏览器中运行，用于操作 DOM、实现前端交互；而 Node.js 让 JavaScript 可以脱离浏览器，直接在操作系统（Windows、Linux、Mac）中运行，拓展了 JS 的应用场景（后端开发、脚本编写、工具构建等）。
2. **核心依赖 Chrome V8 引擎**：V8 引擎是 Google 为 Chrome 浏览器开发的 JavaScript 解释器 / 编译器，具有执行效率高、性能强劲的特点，Node.js 基于该引擎封装，让 JS 具备了高效运行服务端代码的能力。
3. **并非编程语言 / 框架**：Node.js 不是一门新的编程语言（核心还是 JavaScript），也不是一个 Web 框架（类似 Express、Nest.js 才是基于 Node.js 的框架），它只是一个让 JS 能够在服务端 / 本地环境运行的「运行平台」。
4. **核心用途**：搭建后端 API 服务、开发前端工程化工具（如 Webpack、Vite）、编写自动化脚本（如文件处理、部署脚本）、构建桌面应用（结合 Electron）等。

#### 为什么Node.js是前端开发的基础环境

1. 现代前端项目依赖大量第三方库，如React等，而npm/yarn这类包管理器是Node.js的标配工具
2. 相关构建工具，如Webpack、Vite等本身用Node.js开发，依赖Node.js
3. 相关主流前端框架，它们的CLI工具也依赖Node.js

## npm

npm 的全称是 **Node Package Manager（Node 包管理器）**，核心要点如下：

1. **核心身份**：它是 Node.js 的**官方默认包管理工具**，同时也是全球最大的开源 JavaScript 软件包仓库（里面存放了数百万个开发者共享的第三方包 / 模块，如 React、Ant Design、Vue 等）。
2. **随 Node.js 自带安装**：当你成功安装 Node.js 后，npm 会**自动被一同安装到你的电脑中**，无需单独下载配置，安装完成后可通过 `npm -v` 验证是否可用。
3. **核心功能**：
    - 从官方仓库下载 / 安装第三方包到本地项目（如 `npm install antd`）；
    - 管理项目的依赖清单（记录在 `package.json` 文件中，方便团队协作和项目迁移）；
    - 管理包的版本，避免版本冲突；
    - 执行项目中定义的脚本命令（如 `npm run dev`、`npm run build`）；
    - 发布自己编写的开源包到 npm 仓库，供其他开发者使用。

## yarn

yarn 是 **Facebook（现 Meta）推出的一款替代 / 增强型 JavaScript 包管理器**，核心要点如下：

1. **诞生背景**：早期 npm 存在一些性能问题（如安装速度慢、依赖安装不稳定、并行安装支持差），Facebook 联合谷歌、Exponent 等团队开发了 yarn，用于解决这些痛点。
2. **与 npm 的核心关系**：yarn 和 npm 的**核心功能一致**（都是管理 JavaScript 包），且完全兼容 `package.json` 文件（可以无缝替换 npm 在项目中的使用），它不是对 npm 的否定，而是一种更高效的补充方案。
3. **额外优势（相对早期 npm）**：安装速度更快（支持并行安装、缓存已下载的包，重复安装无需重新下载）、依赖安装更稳定（通过 `yarn.lock` 文件锁定依赖版本，保证不同环境安装的包版本完全一致）、安全性更高（安装前会校验包的完整性）。
4. **非 Node.js 自带**：yarn 需要单独安装（可通过 `npm install -g yarn` 全局安装，或通过官方安装包），安装后可通过 `yarn -v` 验证是否可用，核心命令如 `yarn add antd`（安装包）、`yarn dev`（执行脚本）。

## Ant Design Pro

Ant Design Pro 是一个整合了 umi，Ant Design 和 ProComponents 的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。

## 使用ATP React

```bash
# 通过 npm 包管理器，将 Ant Design Pro 官方的命令行工具（pro-cli）「全局」安装到电脑中
npm i @ant-design/pro-cli -g

# 通过 @ant-design/pro-cli工具，一键创建（初始化）一个名为 myapp 的 Ant Design Pro 项目脚手架
pro create myapp

# 进入名为 myapp 的项目文件夹，再在该项目中安装所有所需的第三方依赖包
cd myapp && npm install

# 启动项目
npm run start
```

## 使用ATP Vue2

```bash

git clone --depth=1 https://github.com/vueComponent/ant-design-vue-pro.git my-project

cd my-project

yarn install

yarn run serve

```