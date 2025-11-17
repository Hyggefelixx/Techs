# AntDesign

## 基本介绍

### Ant Design 是一个企业级 UI 设计语言和 React 组件库，提供了丰富的高质量组件用于构建现代化的 Web 应用程序

## 安装方式

```bash
npm install antd
```

## 基本使用步骤

1. 导入组件

    ```javascript
    import { Button } from 'antd';
    ```

2. 使用组件

## Space组件

### Space 组件的核心作用就是给所有子元素添加「均匀间距」，无论子元素是按钮、文字、图标还是自定义组件，间距都会保持一致（默认 size="middle"，对应 AntD 设计规范的 8px 间距，可通过 size 属性调整）

#### Space组件内部本身就默认开启了 display: flex 且 flex-direction: row
