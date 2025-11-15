# React

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

## Ant Design库的使用

### 基本介绍

#### Ant Design 是一个企业级 UI 设计语言和 React 组件库，提供了丰富的高质量组件用于构建现代化的 Web 应用程序

### 安装方式

```bash
npm install antd
```

### 基本使用步骤

1. 导入组件

    ```javascript
    import { Button } from 'antd';
    ```

2. 使用组件
