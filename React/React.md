# React
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

## JSX与TSX

TSX 是 JSX 的超集，完全兼容 JSX 语法，同时增加了 TypeScript 的静态类型校验能力。

**类型校验：从「运行时兜底」到「编译时前置」**

这是两者最核心的区别，直接影响项目的稳定性和开发效率。

- JSX(JavaScript)：
  
  弱类型语言，变量类型可动态变化，无编译时类型校验。若要做类型检查，需额外引入 prop-types 库做「运行时校验」（仅在浏览器运行时报错，无法提前发现）。

- TSX(TypeScript):
  
  强类型语言，支持「编译时类型校验」，可通过接口（interface）、类型注解直接约束变量 / 组件属性类型，错误在编码阶段（或编译时）暴露，无需运行代码。

### 如何在React中使用TSX
1. 安装相关typescript包
```bash
npm install --save-dev typescript@4.9.5
npm install --save-dev @types/react @types/react-dom
```
2. 配置tsconfig.json
```json
{ 
	"compilerOptions": { 
	"target": "ESNext", 
	"lib": ["dom", "dom.iterable", "esnext"], 
	"jsx": "react-jsx", 
	"module": "ESNext", 
	"moduleResolution": "bundler", 
	"resolveJsonModule": true, 
	"allowJs": true, 
	"strict": true, 
	"esModuleInterop": true, 
	"skipLibCheck": true, 
	"forceConsistentCasingInFileNames": true, 
	"isolatedModules": true, 
	"noEmit": true, 
	"noFallthroughCasesInSwitch": true, 
	"allowSyntheticDefaultImports": true 
	}, 
	"include": ["src/**/*"], 
	"exclude": ["node_modules"] 
}
```
3. 编写TSX组件

### TSX核心基础
1. 变量 / 函数简单类型标注（最基础，随处可见）
	**作用**：告诉 TS 变量 / 函数参数 / 返回值是什么类型，编辑器提示 + 防错，项目里定义变量、写接口回调必用。
	**核心语法**：`变量: 类型` / `函数(参数: 类型): 返回值类型`
	**项目示例**（登录页提交、普通变量）：
```tsx
// 1. 普通变量标注（string/number/boolean）
const pageTitle: string ="登录页"; //字符串
const isLogin: boolean = false; // 布尔值
const pageSize: number = 10;    // 数字

// 2. 函数标注（入参+返回值，async函数返回值是Promise<类型>） 
// 登录提交函数：入参是API.LoginParams类型，返回值是Promise<void>（无返回值） 
const handleSubmit: (params: API.LoginParams) => Promise<void> = async (params) => { 
	await request('/api/login', { method: 'POST', data: params }); 
	};
```

2. 接口 / 类型别名（定义数据结构，对接后端接口必用）
	**作用**：定义**对象的固定结构**（比如后端返回的用户信息、接口入参），项目里 `src/typings.d.ts` 的 `API` 命名空间全是这个，也是 Pro 组件绑定数据的基础。
	**核心语法**：`type 别名 = { 键: 类型 }`（推荐快速定义）、`interface 接口名 { 键: 类型 }`（功能类似，项目里混用）
	**项目示例**（对应你熟悉的 `API.CurrentUser`）：
```tsx
// 项目里的实际写法（src/typings.d.ts） 
declare namespace API { 
	// 定义用户信息结构：固定字段+对应类型，可选字段加? 
	type CurrentUser = { 
		name?: string; // 可选字段：可能返回，也可能不返回 
		avatar?: string; 
		userid: string; // 必选字段：后端一定返回 
		notifyCount?: number; 
	}; 
	// 定义登录入参结构 
	type LoginParams = { 
		username: string; 
		password: string; 
		autoLogin?: boolean; 
	}; 
}
```

 3. 泛型（Pro 组件核心，不用懂原理，会用即可）
	**作用**：给**组件 / 函数 “传类型参数”**，让组件知道要处理什么类型的数据（比如 `useState`、`request`、`ProTable` 全用泛型），是 TS 结合 React/Pro 组件的核心用法。
	**核心语法**：`<类型>`（组件 / 函数后加，指定处理的类型）
	**项目高频示例**（直接抄就行）：
```tsx
// 1. useState泛型：指定状态类型（初始值类型明确可省略，不明确必须加） 
const [name, setName] = useState<string>(''); // 状态是字符串 
const [user, setUser] = useState<API.CurrentUser | undefined>(undefined); // 状态是用户信息或undefined 

// 2. Umi request请求泛型：指定接口返回值类型，返回值会自动提示字段 
const res = await request<API.CurrentUser>('/api/currentUser'); // res会提示name/avatar等字段 
console.log(res.name); // 编辑器自动提示，不会写错字段 

// 3. ProTable泛型：指定表格行数据类型，columns自动提示dataIndex <ProTable<API.UserListItem> 
	columns={[{ title: '用户名', dataIndex: 'name' }]} // 自动提示dataIndex可选字段 
	request={async () => { 
		const res = await request<{ list: API.UserListItem[]; total: number }>('/api/user/list'); 
		return { data: res.list, total: res.total }; 
	}} 
/>
```

4. 类型断言（快速兼容，项目里对接表单 / 接口必用）
	**作用**：告诉 TS「我比你更清楚这个值的类型，按我说的来」，解决 “TS 推断的类型和实际类型不一致” 的问题（比如表单提交值、接口返回值），项目里 `onFinish` 里高频用。
	**核心语法**：`值 as 目标类型`
	**项目示例**（登录表单提交）：
```tsx
// 表单onFinish的values默认是unknown类型，断言为API.LoginParams，才能正常传参 

<LoginForm 
	onFinish={async (values) => { 
		await handleSubmit(values as API.LoginParams); // 关键：values as 目标类型 
	}} 
/>
```

5. 可选链 & 空值合并（防错神器，项目里随处可见）

	**作用**：避免访问「`undefined/null` 对象的属性」报错（比如 `initialState` 未初始化、后端返回字段为空），比 JS 的容错写法更简洁，TS/JS 都支持，项目里必用。
	**核心语法**：
		- 可选链：`obj?.key`（obj 存在才访问 key，否则返回 undefined）
		- 空值合并：`obj ?? 默认值`（obj 是 undefined/null 时，用默认值，比 || 更精准）
    **项目示例**（取全局用户信息）：
```tsx
const { initialState } = useModel('@@initialState'); 

// 可选链：initialState存在才取currentUser，currentUser存在才取name 
const userName = initialState?.currentUser?.name; 

// 空值合并：如果userName是undefined/null，显示"游客" 
const showName = userName ?? "游客"; 

// 组合使用：更严谨 
const userAvatar = initialState?.currentUser?.avatar ?? "/default-avatar.svg";
```


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

## React项目说明

my-react-app/
├── node_modules/       # 项目依赖的第三方库
├── public/             # 静态资源文件夹
│   ├── index.html      # 应用的 HTML 模板
│   └── ...             # 其他静态资源（如图片、字体等）
├── src/                # 项目源代码
│   ├── App.js          # 主组件
│   ├── App.css         # 主组件的样式
│   ├── index.js        # 项目入口文件
│   ├── index.css       # 全局样式
│   └── ...             # 其他组件和资源
├── package.json        # 项目配置和依赖管理
├── package-lock.json   # 依赖的精确版本锁定文件
└── README.md           # 项目说明文档

## 渲染
### 什么会触发渲染
渲染不会自动执行，必须由「触发条件」驱动，常见触发条件有：

1. **首次渲染**：组件被首次挂载到页面（比如 `ReactDOM.createRoot(root).render(<Counter />)`）；
2. **更新渲染**：
    - 组件自身的 `state` 更新（比如 `setCount`）；
    - 父组件传递的 `props` 发生变化；
    - 父组件重新渲染（即使 `props` 没变化，子组件也会默认重新渲染）。

### 渲染周期
一次完整的React渲染周期可分为三个大步骤
1. **调度阶段（Schedule）**
    
    - 决定 “要不要更新”“什么时候更新”。
    - 当 `setState` / `props` 变化 / 父组件重新渲染时，React 会把这次更新加入调度队列，由 Scheduler 决定优先级和执行时机。
    
2. **渲染阶段（Render Phase）**
    
    - 在这里 React 会：
        
        - 调用组件函数（或 `render` 方法），得到新的虚拟 DOM。
        - 进行协调（Reconciliation），对比新旧虚拟 DOM，找出需要更新的地方（Diff）。
        
    - 这个阶段是**可中断、可被高优先级任务打断、可重新执行**的。
    - 因此要求这一阶段的代码是 “纯的”：**不能有副作用（比如操作 DOM、发请求、改全局变量）**。
    
3. **提交阶段（Commit Phase）**
    
    - 在这里 React 会：
        
        - 把渲染阶段计算好的变化，**同步**应用到真实 DOM 上。
        - 执行 `useEffect`、`useLayoutEffect`、`componentDidMount` / `componentDidUpdate` 等生命周期钩子。
        
    - 这个阶段是**不可中断**的，因为要保证 DOM 一致性。
    - 这是**执行副作用的安全时机**，可以放心操作 DOM、订阅事件、发送请求等。

### 渲染周期的核心流程
用基础计数器组件，拆解从 “首次显示” 到 “点击按钮更新” 的完整周期：
```Javascript
import { useState } from 'react'; 

function Counter() { 
	const [count, setCount] = useState(0); 
	console.log('组件执行，当前count:', count); 
	
	return ( 
		<div> <p>计数：{count}</p> 
			<button onClick={() => setCount(count + 1)}>加1</button> 
		</div> ); 
	}
```
### 一、流程 1：首次渲染（组件第一次出现在页面）

首次渲染是组件从「无」到「有」的过程，无旧状态、无旧虚拟 DOM 可复用，三大阶段的执行细节如下：

#### 1. 调度阶段（Schedule Phase）：决定「要不要渲染」「什么时候渲染」

- **触发条件**：通过 `ReactDOM.createRoot()`（React 18+）或 `ReactDOM.render()`（旧版）挂载 `Counter` 组件，React 接收到「首次挂载组件」的根请求。
- **核心操作**：
    
    1. React 判定该请求为「高优先级」（页面初始渲染，直接影响用户首屏体验），无需排队等待，直接进入后续流程。
    2. 创建 `Counter` 组件的独立实例，同时为该实例分配一个「专属状态存储容器」（用于持久化 `useState` 定义的 `count` 状态，后续更新渲染会复用该容器）。
    3. 标记该组件为「需要首次渲染」，并调度后续的「渲染阶段」任务，无额外优先级竞争（首次渲染无其他任务干扰）。
    
- **关键结果**：确定「立即执行 `Counter` 组件的首次渲染」，准备进入渲染阶段。

#### 2. 渲染阶段（Render Phase）：计算「页面应该长什么样」（纯计算，无 DOM 操作）

渲染阶段的核心是「生成虚拟 DOM 并确认更新差异」，可中断但本次无中断（首次渲染逻辑简单），具体操作：

1. **执行组件函数，初始化状态**：
    
    - React 调用 `Counter` 函数，开始执行组件内部代码。
    - 执行 `useState(0)`：React 识别到是「首次渲染」，从该组件实例的「状态存储容器」中初始化状态，将初始值 `0` 存入容器，同时返回状态值和更新函数 `[0, setCount]`。
    - 执行 `console.log`，打印 `组件执行，当前count: 0`（这是渲染阶段的纯函数执行，无副作用）。
    
2. **生成虚拟 DOM 快照（JSX 转虚拟 DOM）**：
    
    - React 将组件返回的 JSX `<div><p>计数：0</p><button>加1</button></div>` 编译为虚拟 DOM（内存中的 JavaScript 对象，描述 DOM 结构和属性），这是首次渲染的「新虚拟 DOM 树」。
    
3. **协调（Reconciliation）/ Diff 对比**：
    
    - 由于是首次渲染，无「旧虚拟 DOM 树」可供对比，React 直接判定「需要创建完整的 DOM 结构」，无需计算差异，直接生成「创建全部 DOM 节点」的更新任务队列。
    

- **关键结果**：生成了描述页面结构的虚拟 DOM，同时确定了「需要创建完整 DOM」的更新计划，准备进入提交阶段。

#### 3. 提交阶段（Commit Phase）：将计算结果落地到真实 DOM（同步执行，不可中断）

提交阶段的核心是「操作真实 DOM 并完成挂载」，是唯一可以触碰真实 DOM 的阶段，具体操作：

1. **执行 DOM 更新（创建真实 DOM）**：
    
    - React 根据渲染阶段生成的更新任务队列，在页面的根容器中（如 `id="root"` 的元素）同步创建对应的真实 DOM 节点：创建 `<div>`、`<p>`、`<button>` 元素，并设置对应的文本内容和结构。
    
2. **应用 DOM 变更，页面渲染完成**：
    
    - React 将创建好的真实 DOM 树插入到页面中，浏览器立即绘制页面，用户可以看到「计数：0」和「加 1」按钮。
    
3. **执行挂载相关的副作用（本次无 `useEffect`，故跳过）**：
    
    - 若组件中有 `useEffect(() => {}, [])`（依赖项为空），会在此时执行（提交阶段后期），但本次 `Counter` 组件无 `useEffect`，挂载流程直接完成。
    

- **关键结果**：真实 DOM 挂载完成，组件首次渲染结束，页面呈现初始状态。

### 二、流程 2：更新渲染（点击按钮，触发 `state` 更新）

更新渲染是组件「状态变化 → 页面同步更新」的过程，有旧状态、旧虚拟 DOM 可复用，三大阶段的执行细节如下：

#### 1. 调度阶段（Schedule Phase）：决定「要不要更新」「什么时候更新」

- **触发条件**：用户点击「加 1」按钮，执行 `onClick` 回调中的 `setCount(count + 1)`，此时当前 `count` 为 `0`，实际调用 `setCount(1)`。
- **核心操作**：
    
    1. React 接收到 `setCount` 发起的「状态更新请求」，立即更新该 `Counter` 组件实例「状态存储容器」中的 `count` 值，将其从 `0` 改为 `1`。
    2. React 标记该 `Counter` 组件为「需要重新渲染」，并将「重新渲染 `Counter` 组件」的任务加入调度队列。
    3. 优先级判定：该更新任务为「用户交互触发」（点击按钮），优先级较高，React 会尽快调度执行，不会长时间阻塞主线程（如无更高优先级任务（如输入框输入），会立即进入渲染阶段）。
    
- **关键结果**：确定「需要执行 `Counter` 组件的更新渲染」，准备进入渲染阶段。

#### 2. 渲染阶段（Render Phase）：计算「页面需要更新成什么样」（纯计算，无 DOM 操作）

该阶段核心是「生成新虚拟 DOM，对比新旧差异」，同样可中断但本次逻辑简单，具体操作：

1. **重新执行组件函数，获取最新状态**：
    
    - React 再次调用 `Counter` 函数，重新执行组件内部代码。
    - 执行 `useState(0)`：React 识别到是「更新渲染」，忽略初始值 `0`，直接从该组件实例的「状态存储容器」中取出最新的状态值 `1`，返回 `[1, setCount]`。
    - 执行 `console.log`，打印 `组件执行，当前count: 1`（纯函数执行，无副作用，与首次渲染的打印逻辑一致）。
    
2. **生成新的虚拟 DOM 快照**：
    
    - React 将组件返回的新 JSX `<div><p>计数：1</p><button>加1</button></div>` 编译为「新虚拟 DOM 树」，其中 `<p>` 标签的文本内容从 `0` 变为 `1`。
    
3. **协调（Reconciliation）/ Diff 对比**：
    
    - React 将「旧虚拟 DOM 树」（计数为 `0`）与「新虚拟 DOM 树」（计数为 `1`）进行深度对比（Diff 算法）。
    - 对比结果：只有 `<p>` 标签的文本内容发生了变化，其余 DOM 节点（`<div>`、`<button>`）的结构和属性均无变更，React 生成「仅更新 `<p>` 标签文本内容」的更新任务队列（最小化 DOM 操作，优化性能）。
    

- **关键结果**：生成了新的虚拟 DOM，同时确定了「最小化 DOM 更新计划」（仅更新 `<p>` 文本），准备进入提交阶段。

#### 3. 提交阶段（Commit Phase）：将更新差异落地到真实 DOM（同步执行，不可中断）

该阶段核心是「执行最小化 DOM 操作，完成页面更新」，具体操作：

1. **执行 DOM 更新（仅修改差异部分）**：
    
    - React 根据渲染阶段生成的更新任务队列，仅对真实 DOM 中的 `<p>` 标签进行修改：更新其文本内容从 `0` 改为 `1`，不重新创建 `<div>`、`<button>` 等无变化的 DOM 节点。
    
2. **应用 DOM 变更，页面更新完成**：
    
    - React 同步完成 DOM 修改，浏览器立即重新绘制 `<p>` 标签的内容，用户看到页面上的计数从 `0` 变为 `1`。
    
3. **执行更新相关的副作用（本次无 `useEffect`，故跳过）**：
    
    - 若组件中有 `useEffect(() => {}, [count])`（依赖 `count`），会在此时执行（提交阶段后期），先执行上一次的清理函数（如有），再执行本次的副作用逻辑，但本次 `Counter` 组件无 `useEffect`，更新流程直接完成。
    

- **关键结果**：真实 DOM 完成最小化更新，组件更新渲染结束，页面与最新状态同步。

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

### 闭包
内部函数记住了它的出生环境（外部作用域），哪怕这个环境已经消失（外部函数执行完毕），它依然能访问到这个环境里的变量
```Javascript
// 外部函数：
function outerFunc() { 
	// 外部变量：相
	let apple = 1; 
	
	// 内部函数： 
	function innerFunc() { 
		// 内部函数访问外部变量： 
		apple += 1; 
		console.log('冰箱里的苹果数量：', apple);
	} 
	// 外部函数返回内部函数： 
	return innerFunc; 
} 
// 1. 执行外部函数，得到内部函数
const getApple = outerFunc(); 
// 此时：outerFunc 已经执行完毕（你已经出门了），按常理它内部的 apple 变量应该被销毁（冰箱应该被拆掉）
// 2. 调用内部函数（保姆回到你家，打开冰箱拿苹果） 
getApple(); // 输出：冰箱里的苹果数量： 2 
getApple(); // 输出：冰箱里的苹果数量： 3 
getApple(); // 输出：冰箱里的苹果数量： 4
```
为什么形成了闭包？
1. 有内部函数，且访问了外部变量
2. 内部函数脱离外部函数，独立存在
3. 外部函数执行完毕后，内部函数依然能访问外部变量

内部函数被保留了下来，导致它所需要的外部变量也被保留，哪怕外部函数已经执行完毕，内部函数依然能访问这些变量

```Javascript
export default function ClickTime(){
    const [time, setTime] = useState(0);
    function handleClick(){
        setInterval(function(){
            setTime(time + 1);
        },1000);
    }
    return (
        <div>
            <span>时间：{time}</span>
            <button onClick={handleClick}>开始计时</button>
        </div>
    )
}
```
1. 点击按钮，触发handleClick()
2. setInterval是浏览器的全局函数，将function保留起来一秒钟调用一次
3. function访问外部变量time，且脱离handleClick存在

但是为什么time一直是0，**组件渲染时的变量绑定** + **闭包的引用捕获**

1. **组件渲染时，变量是「当前快照的绑定」**：
    
    当 React 渲染组件时，会为「本次渲染」创建一个独立的作用域，`time` 变量会被绑定到「本次渲染的快照值」（比如初始渲染时，`time` 绑定到 `0`）。
    
    这个作用域里的所有函数（包括 `handleClick`、定时器回调），都会 “绑定” 到本次渲染的 `time` 值上。
    
2. **闭包捕获的是「变量的引用，而非值」**：
    
    定时器回调作为闭包，捕获的是「`time` 变量的引用」—— 但这个引用对应的，是「初始渲染时 `time` 变量所在的作用域」（即冰箱 A 的地址）。
    
    当组件重新渲染时，会创建新的作用域、新的 `time` 变量（冰箱 B），但旧闭包捕获的「旧作用域的引用」不会自动更新，依然指向最初的 `time=0`。

- **直接赋值更新**：依赖「当前渲染周期的 `state` 快照值」，这个值是「冻结的」，无法感知到本次渲染周期内的其他状态更新。
    
    - 比如在你的原代码中，`setTime(time + 1)` 中的 `time`，是闭包捕获的「点击按钮时的快照值（0）」，后续无论定时器执行多少次，这个 `time` 都不会更新，永远是 0。
    - 简单说：直接赋值更新是「拿当前渲染周期的旧值」来计算新值。
    
- **函数式更新**：React 会主动把「上一次更新后的最新 `state` 值」作为参数（`prevState`）传入回调函数，这个值是「实时的」，不受闭包快照、多次更新的影响。
    
    - 比如修正后的代码 `setTime(prevTime => prevTime + 1)`，`prevTime` 每次都是 React 维护的最新时间值（1、2、3...），哪怕在闭包中，也能拿到最新值。
    - 简单说：函数式更新是「拿上一次的最新值」来计算新值，这个值由 React 托管，而非依赖当前渲染周期的快照。
## useEffect
#### useEffect的核心作用是处理组件的副作用，它会在**提交阶段**（组件挂载完成/更新完成后）执行，此时的DOM已经可用

示例：实现一个计时器。一挂载就计时，可通过按钮停止
```javascript
import {useState, useEffect, useRef} from 'react';
function TestDemo(){
    const [time,setTime] = useState(0);
    const intervalId = useRef(null);
    useEffect(()=>{
        intervalId.current = setInterval(()=>{
            setTime(time => time + 1)
        },1000)
        return () => {
            clearInterval(intervalId.current);
        }
    },[]);
    function handleClick(){
        clearInterval(intervalId.current);
    }
    return (
        <div>
            <div>TestDemo</div>
            <div>
                <span>时间：{ time }</span>
                <button onClick={handleClick}>停止计时</button>
            </div>
        </div>
    )
}

export default TestDemo;
```


## React组件通信
1. 父组件->子组件：Props传递（最基础，最常用）
```Javascript
// 父组件 
function Parent() { 
	const userName = "张三"; 
	const userAge = 28; 
	return ( 
		<div> <h2>父组件</h2> 
		{/* 向子组件传递props */} 
		<Child name={userName} age={userAge} isAdult={userAge >= 18} />
		</div> 
	); 
} 
// 子组件：接收并使用props 
function Child(props) { 
// 方式1：直接从props对象中取值 
	return ( 
		<div> 
			<h3>子组件</h3> 
			<p>姓名：{props.name}</p> 
			<p>年龄：{props.age}</p> 
			<p>是否成年：{props.isAdult ? "是" : "否"}</p> 
		 </div> 
		 ); 
	}
```
2. 子组件->父组件：Props传递回调函数

React 是单向数据流，子组件无法直接修改父组件数据，也无法直接向父组件传参，需通过**父组件传递一个回调函数给子组件，子组件调用该函数并传入参数**，间接实现子向父传参。

```Javascript
// 父组件 
function Parent() { 
	const [childMsg, setChildMsg] = useState(""); 
	
	// 定义回调函数：用于接收子组件参数 
	const receiveChildData = (data) => { 
		// 更新父组件状态，接收子组件传递的数据 
		setChildMsg(data); 
	}; 
	
	return ( 
		<div> 
			<h2>父组件</h2> 
			<p>子组件传递的消息：{childMsg}</p> 
			{/* 把回调函数传递给子组件 */} 
			<Child onSendData={receiveChildData} /> 
		</div> 
		); 
	} 
	
// 子组件 
function Child({ onSendData }) { 
	const [inputValue, setInputValue] = useState(""); 
	const handleSend = () => { 
		// 调用父组件传递的回调函数，传入子组件的数据 
		onSendData(inputValue); 
		setInputValue(""); 
	}; 
	return ( 
	<div> 
		<h3>子组件</h3> 
		<input 
			type="text" 
			value={inputValue} 
			onChange={(e) => setInputValue(e.target.value)} 
			placeholder="输入要传递给父组件的内容" /> 
		<button onClick={handleSend}>发送给父组件</button> 
		</div> 
	); 
}
```
## useContext

当组件层级较深（如父 → 子 → 孙 → 曾孙），如果用 Props 逐层传递（俗称「props drilling / 属性透传」），会导致代码冗余、维护困难，此时可使用**React 内置的 Context API**，实现数据跨层级直接传递，无需中间组件逐层转发。

```Javascript
import { createContext, useContext, useState } from 'react'; 

// 步骤1：创建Context对象（可设置默认值，可选） 
const UserContext = createContext(null); 

// 顶层父组件 
function GrandParent() { 
	const [user, setUser] = useState({ name: "王五", role: "管理员" }); 
	return ( 
		// 步骤2：用Provider包裹，通过value传递数据（可传递任意类型，包括函数）
		<UserContext.Provider value={user}> 
			<div> 
				<h2>顶层父组件</h2> 
				<Parent /> 
			</div> 
		</UserContext.Provider> 
	); 
} 

// 中间组件（无需接收和转发user数据，简化代码） 
function Parent() { 
	return ( 
		<div> 
			<h3>中间父组件</h3> 
			<Child /> 
		</div> 
	); 
} 

// 底层子组件（直接接收跨层级传递的数据） 
function Child() { 
	// 步骤3：用useContext Hook接收Context数据 
	const user = useContext(UserContext); 
	return ( 
		<div> 
			<h4>底层子组件</h4> 
			<p>跨层级接收的用户数据：{user.name} - {user.role}</p> 
		</div> 
	); 
}
```
当组件之间无任何层级关系（如两个平级的顶层组件），或需要全局共享数据（如用户登录状态、主题配置），Context API 虽可实现，但复杂场景下（如数据修改、状态回溯）能力有限，此时需使用**全局状态管理方案**。

####  常用全局状态管理工具

- **Redux / Redux Toolkit**：生态成熟，适用于大型、复杂应用（如中后台系统、电商平台），核心是单一数据源、状态不可变；
- **MobX**：基于响应式编程，上手简单，开发效率高，适用于中小型应用；
- **Zustand**：轻量、简洁，无繁琐配置，基于 Hook，是近年来的热门选择；
- **Jotai / Recoil**：专为 React 设计，原子化状态管理，适用于需要细粒度状态共享的场景。

## useRef
#### 主要思想和useState一样，持久化存储，不受多次渲染的影响

特点：
1. 存储的值具有跨渲染周期持久化的特性
2. 修改`.current`属性不会触发组件重新渲染
3. 两大核心用途：**Dom操作**和**数据存储**
	- **获取 / 操作 DOM 元素（最经典用途）**
		通过将`ref`对象赋值给 DOM 元素的`ref`属性，`ref.current`会自动指向该 DOM 元素的真实节点，从而可以直接操作 DOM（如获取输入框值、聚焦输入框、修改 DOM 样式等），这是 React 中安全操作 DOM 的推荐方式。
		```Javascript
		import { useState, useRef, useEffect} from 'react'
		function Board(){
		    const inputRef = useRef(null);
		    useEffect(()=>{
		        inputRef.current.focus();
		    },[])
	    return (
        <div>
            <div>
            <input type="text" ref={inputRef} placeholder="输入内容" />
            </div>
        </div>
			    )
		}
			export default Board
		```

	- **存储跨渲染周期的非视图相关数据**
		如前面提到的定时器 ID、之前的状态值、第三方库实例等，这些数据不需要更新页面视图，仅需在组件生命周期内持久化保存，使用`useRef`是最优选择（相比`useState`，不会带来额外的渲染开销）。
		
## useReducer
### 核心定义和适用场景
1. **核心定义**：`useReducer`是 React 提供的状态管理 Hook，它遵循「Reducer 模式」（借鉴自 Redux），接收一个**reducer 函数**和**初始状态**，返回当前状态和一个用于触发状态更新的**dispatch 函数**。

- 简单公式：`const [state, dispatch] = useReducer(reducer, initialState);`

2. **适用场景**：相比`useState`（适合简单独立状态），`useReducer`更适合以下场景：

- 状态逻辑复杂，包含多个子状态（如一个`user`对象包含`name`、`age`、`role`多个属性）；
- 多个状态之间相互关联，更新一个状态可能需要依赖另一个状态；
- 状态更新逻辑需要复用，或需要预测状态更新的结果；
- 组件规模较大，希望将状态更新逻辑抽离出去，提高代码可维护性。

### useReducer核心组成部分
使用`useReducer`必须明确三个核心部分，缺一不可：

1. **初始状态（initialState）**：定义状态的初始值，可以是基本类型、对象、数组等，对应状态的初始形态。
2. **Reducer 函数**：一个纯函数（无副作用、输入相同则输出相同），接收两个参数：
	- `state`：当前的状态值；
	- `action`：一个描述「状态更新类型」的对象（通常包含`type`（更新类型标识）和`payload`（更新所需数据）两个属性）；
	- 函数返回值：**新的状态**（必须返回全新的状态，不可直接修改原状态，遵循 React 状态不可变原则）。
3. **dispatch 函数**：由`useReducer`返回，用于触发状态更新，接收一个`action`对象作为参数，`reducer`函数会根据这个`action`执行对应的状态更新逻辑。

简单理解：Reducer函数相当于创建的reducer内部根据不同操作对state的处理方式，而dispatch则是暴露给外部的调用相关操作的接口

```Javascript
import {useReducer} from 'react';

const initialState = {
    name: '张三',
    age: 28,
    role: '普通用户'
}

// userReducer相当于创建的reducer中用于集中处理数据变化
// 接收两个参数：state表示当前状态
//              action表示触发的行为
// userReducer就是要根据触发的行为，对当前状态进行相应处理
function userReducer(state, action){
    switch(action.type){
        case 'UPDATE_NAME':
            return {...state, name: action.payload};
        case 'UPDATE_AGE':
            return {...state, age: action.payload};
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

function UserManager(){
    const [userState, dispatch] = useReducer(userReducer, initialState);

    // dispatch函数由useReducer返回，用于触发状态更新，接受一个action对象作为参数
    const handleNameChange =(e) =>{
        dispatch({
            type: 'UPDATE_NAME',
            payload: e.target.value
        })
    }

    const handleAgeAdd = () =>{
        dispatch({
            type: 'UPDATE_AGE',
            payload: userState.age + 1
        })
    }

    const handleReset =()=>{
        dispatch({
            type: 'RESET',
        })
    }

    return (
        <div>
            <h3>用户信息管理(userReducer示例)</h3>
            <div>
                name:{userState.name}
                <input type="text" value={userState.name} onChange=
                {handleNameChange}></input>
            </div>
            <div>
                age:{userState.age}
                <button onClick={handleAgeAdd}>年龄+1</button>
            </div>
            <div>
                role:{userState.role}
            </div>
            <div>
                <button onClick={handleReset}>重置</button>
            </div>

        </div>
    )
}
export default UserManager;
```

## ReactRouter
```bash
# 安装ReactRouter包
npm i react-router-dom
```
### Router使用方式
1. 创建路由
 - 在项目\src\router\index.js中：
```Javascript
import {createBrowserRouter} from 'react-router-dom'
import Login from '../page/Login'
import Main from '../page/Main'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/main',
        element: <Main />
    }
])

export default router
```

2. 加载路由
 - 在项目\src\index.js，即入口js文件中：
 ```Javascript
 import { Router, RouterProvider } from 'react-router-dom';
 import router from './router'
 root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);
 ```
### 路由导航跳转
1.  声明式写法

```Javascript
import { Link } from 'react-router-dom';

<div><Link to='/main'>跳转到主页面</Link></div>
```
2. 编程式写法
```Javascript
import { useNavigate} from 'react-router-dom';

const navigate = useNavigate();
<div><button onClick={()=>{navigate('/test')}}>跳转到测试页面1</button></div>
```

### 路由导航传参
1. searchParams 传参
```Javascript
// Login组件
import { useNavigate } from 'react-router-dom';

<button onClick={()=>{navigate('/test2?id=1001&name=jack')}}>searchParams传参，跳转到测试页面2</button>
```

```Javascript
// TestDemo2组件
import { useSearchParams } from "react-router-dom";

function TestDemo2(){
	const [params] = useSearchParams()
	const id = params.get('id')
	const name = params.get('name')
}
```

2. params传参
```Javascript
// Login组件
import { useNavigate } from 'react-router-dom';

 <button onClick={()=>{navigate('/test3/1001')}}>params传参，跳转到测试页面3</button>
```

```Javascript
// router/index.js
import {createBrowserRouter} from 'react-router-dom'
const router = createBrowserRouter([
	{
		path: '/test3/:id',
		element: <TestDemo3 />
	}
])
```

```Javascript
// TestDemo3
import { useParams } from "react-router-dom";

function TestDemo3(){
	const params = useParams();
	const id = params.id
}
```

### 嵌套路由
案例：想要实现效果：一级路由Mainpage，左侧两个按钮**面板**和**关于**，点击对应按钮，右侧显示对应模块
1. 创建子模块，在路由中处于二级路由
```Javascript
function Board(){
    return (
        <div>
            这是二级路由 面板界面
        </div>
    )
}

export default Board
```

```Javascript
function About(){
    return (
        <div>
            这是二级路由 关于界面
        </div>
    )
}

export default About;
```

2. 创建父模块，在路由中对应一级路由
```Javascript
import { Outlet, Link } from "react-router-dom";

function Mainpage(){
    return (
        <div>
            这是一级路由
        <Link to='/board'>面板</Link>
        <Link to='/about'>关于</Link>

        <Outlet></Outlet> 
        </div>
    )
}
export default Mainpage;
```

3. 配置路由
```Javascript
 {
        path: '/',
        element: <Mainpage />,
        children:[
            {
                path: 'board',
                element: <Board />
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    },
```
#### 案例中体现出的React Router嵌套路由的两个核心特性
1. URL必须匹配，才能渲染对应组件
	 - 无论是嵌套路由还是普通路由，都遵循URL路径与路由配置匹配的原则。即只有URL到了，才能渲染对应的组件
2. Board无法单独显示，必须依赖Mainpage中的<Outlet / >
	 - 嵌套路由的设计逻辑就是子路由依赖父路由，父路由的element是子路由的布局容器/公共载体，当访问`/board`时，React Router会先渲染父组件Mainpage，再在其指定位置渲染子组件Board
	 - 不存在单独渲染Board而不渲染Mainpage的情况，除非单独给Board配置一个独立的顶级路由，不放在children数组中

#### 默认二级路由
上面的设置下，在访问/路径时，只能显示一级路由的内容，只有在访问了/board或者/about下才会显示对应的二级路由内容

现在想实现一下需求：只要访问到/路径，就能显示二级路由内容，即默认二级路由
```Javascript 
// 更改路由配置
 {
        path: '/',
        element: <Mainpage />,
        children:[
            {
                //path: 'board', 删去
                // 添加
                index : true,
                element: <Board />
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    },
```

```Javascript

// 一级路由修改
// <Link to='/board'>面板</Link>
  <Link to='/'>面板</Link>
```

### 404路由配置

#### 用户访问了没有资源的URL的时候，返回一个404，表示当前URL下无资源

1. 创建NotFound组件
2. 路由配置中引入组件
```javascript
// 在router中加一个配置
    {
        path: '*',
        element: <NotFound />
    }
```

### 两种路由模式

#### history模式和hash模式

#### 对应ReactRouter的`createBrowserRouter`和`createHashRouter`