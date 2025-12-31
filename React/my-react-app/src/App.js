import './App.css';
import { useState } from 'react';

function MyButton(){
  const [count, setCount] = useState(0);
  return (
    <div>
      <button
      // onClick 要求接收一个「函数」（点击时执行这个函数），
      // 但直接写了「函数调用语句」，导致语句在渲染阶段就执行了
      // onClick={alert('你点击了按钮')} 错误写法
      onClick={()=>{setCount(count+1);
      }}
      >
        点击了{count}次</button>
    </div>
      
  );
}

function SharedButton({count,setSharedCount}){
  return(
    <div>
      <button onClick={()=>{setSharedCount(count+1);}}>
        点击了{count}次
      </button>
    </div>
  )
}

const user = {
  name:'Felix',
  age:20,
};

const products = [
  {title: '卷心菜', isFruit: false, id: 1},
  {title: '苹果', isFruit: true, id: 2},
  {title: '大蒜', isFruit: false, id: 3},
];

function AdminPanel(){
  return(
    <div>
      <h1>管理员面板</h1>
    </div>
  )
}

function LoginPanel(){
  return(
    <div>
      <h1>登录面板</h1>
    </div>
  )
}

// JS普通变量，React 不会监听他的变化
// let isLoggedIn = false;

function App(){
  // useState 是 React 提供的「状态钩子」，专门用来定义 “React 能监听的变量”
  // 属于React提供的一个内置Hook，只能在组件顶层调用Hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sharedCount, setSharedCount] = useState(0);
  
  return (
      <div>
          <h1 className='red'>欢迎来到我的应用</h1>
          <MyButton />
          <MyButton />
          <SharedButton count={sharedCount} setSharedCount={setSharedCount}/>
          <SharedButton count={sharedCount} setSharedCount={setSharedCount}/>
          {/* 通过大括号回到JavaScript中 */}
          {user.name +' ' +user.age}
          {/* 条件渲染 */}
          {isLoggedIn? <AdminPanel/>:<LoginPanel/>}
          <button 
          onClick={()=>{setIsLoggedIn(!isLoggedIn)}}
          >
            切换状态
          </button>
          {/* 列表渲染 */}
          <ul>
            {products.map(product => (
              <li key={product.id}>
                {product.title}
              </li>
            ))}
          </ul>
      </div>
  )
}

export default App;



