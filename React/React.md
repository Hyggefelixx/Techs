# React

## JSX与TSX

TSX 是 JSX 的超集，完全兼容 JSX 语法，同时增加了 TypeScript 的静态类型校验能力。

**类型校验：从「运行时兜底」到「编译时前置」**

这是两者最核心的区别，直接影响项目的稳定性和开发效率。

- JSX(JavaScript)：
  
  弱类型语言，变量类型可动态变化，无编译时类型校验。若要做类型检查，需额外引入 prop-types 库做「运行时校验」（仅在浏览器运行时报错，无法提前发现）。

- TSX(TypeScript):
  
  强类型语言，支持「编译时类型校验」，可通过接口（interface）、类型注解直接约束变量 / 组件属性类型，错误在编码阶段（或编译时）暴露，无需运行代码。

## React项目构建方式

### 主要是指 **项目初始化(脚手架)** 和 **最终打包构建(编译部署)**

#### 方案 1：Create React App（CRA）—— 官方推荐，零配置（最常用）

React 官方维护的脚手架，基于 Webpack 构建，主打 “零配置”，适合快速上手、中小型项目或原型开发。

初始化方式

```bash
# 基础 JS 版本（npx 自动调用最新版 CRA）
npx create-react-app my-react-app

# TS 版本（添加 --template typescript）
npx create-react-app my-react-app --template typescript

# 进入项目 + 启动开发环境
cd my-react-app
npm start  # 开发模式（默认端口 3000）
```

打包构建命令

```bash
npm run build  # 打包到 build/ 目录，生成优化后的生产环境代码
```

#### 方案 2：Vite + React —— 极速构建，现代前端工具（推荐）

新一代前端构建工具（非脚手架，可初始化 React 项目），基于 ESBuild（Go 编写，比 Webpack 快 10-100 倍），主打 “极速冷启动、按需编译”，适合现代 React 项目（支持 JS/TS、React 18+、SWC 等）。

初始化方式

```bash
# 方式 1：npm 初始化（交互式选择框架）
npm create vite@latest

# 方式 2：直接指定 React 模板（更快捷）
npm create vite@latest my-react-app -- --template react
# TS 版本：--template react-ts

# 安装依赖 + 启动开发环境
cd my-react-app
npm install
npm run dev  # 开发模式（默认端口 5173，支持即时热更新）
```

打包构建命令

```bash
npm run build  # 打包到 dist/ 目录，自动优化代码（Tree-shaking、压缩、按需加载）
npm run preview  # 本地预览打包后的效果
```

## 组件

### 函数式组件

```javascript
// 定义一个组件
function ListAntd () {
    return (
        <h1>这是ListAntd页面</h1>
    )
}

// 默认导出一个组件
export default ListAntd;
```

注：`export default` 为默认导出，每个模块只能有一个。
默认导出的组件，在导入的时候，可以不加 {}

## useState

每一次渲染的 state 值都是固定的，因此无论你调用多少次 setNumber(1)，在第一次渲染的事件处理函数内部的 number 值总是 0 

React 会等到事件处理函数中的 所有 代码都运行完毕再处理你的 state 更新。 这就是重新渲染只会发生在所有这些 setNumber() 调用 之后 的原因。

这可能会让你想起餐厅里帮你点菜的服务员。服务员不会在你说第一道菜的时候就跑到厨房！相反，他们会让你把菜点完，让你修改菜品，甚至会帮桌上的其他人点菜。