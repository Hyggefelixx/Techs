# Javascript

## 异步

### Promise

Promise 是 JavaScript 中**处理异步操作的对象**，它的核心是**把 回调嵌套 的异步逻辑，转成 链式调用 的同步式写法**，解决 “回调地狱” 问题。

#### Promise的状态
Promise有且只有3种状态，状态一旦改变就永久固定，不可逆

1. pending 进行中：初始状态，异步操作还没有完成
2. fulfilled 已成功：异步操作完成，调用resolve()触发
3. rejected已失败：异步操作出错，调用reject()触发

#### Promise生命周期
1. 创建Promise
2. 进入Pending状态
3. 异步操作执行
4. 两种情况
	- 成功 状态变为fulfilled 触发.then()回调
	- 失败 状态变为rejected 触发.catch()回调

.then()和.catch()是Promise的原型方法，需要手动调用并传入回调函数，否则Promise的成功/失败结果会 **无处理的被忽略**

#### 创建Promise
```Javascript
// 创建时传入的执行器函数会立即同步执行
const promise = new Promise((resolve, reject)=>{
	// 这里写异步操作，比如请求、定时器
	setTimeout(()=>{
		const success = true;
		if(success){
			resolve("成功结果");// 异步成功，触发 fulfilled
		} else {
			reject("失败原因")
		}
	},1000);
})
```
reslove和reject是Promise执行器函数的两个内置参数，核心作用：
1. 改变Promise的状态
2. 传递异步操作的结果/错误

resolve：标记成功
1. 将Promise的状态从pending 进行中改为fulfilled 已成功
2. 将异步操作的成功结果传递出去，后续可通过.then()或者await拿到这个结果
```Javascript
promise.then(data => console.log(data)) // 拿到结果 "成功结果"
```

reject：标记失败
1. 将Promise的状态从pending 进行中改为rejected 失败
2. 将异步操作捕获的错误信息传递出去，后续可通过.catch()或try/catch捕获这个错误
```Javascript
promise.catch(error => console.log(error)) // 捕获错误 "失败原因"
```

### async/await语法

原生通过回调函数解决异步，但是存在回调地狱的问题，ES6引入了Promise对象来解决回调地狱问题，但是.then()的链式调用仍然不够直观

#### async函数

在函数体前添加async关键字，表示该函数是异步的
```Javascript
async function fetchData(){
	
}
```
async函数总是返回一个Promise

#### await表达式

await只能在async函数内部使用
```Javascript
async function fetchData(){
	const result = await somePromise;
	console.log(result);
}
```
await会暂停async函数的执行，等待Promise完成：
 - 如果Promise被resolve，返回resolve的值
 - 如果Promise被reject，抛出错误，使用try/catch捕获

#### async/await和.then() .catch()比较

一句话理解：.then是Promise的原生写法，async/await是在Promise之上的语法糖，写法更上层、更像同步代码

**为什么说async/await更上层**
 - async/await内部仍然依赖Promise
 - 只是把.then的链式回调变成了看起来同步的代码
 - 让异步代码更容易写，更容易读

#### 使用示例
```Javascript
async function fetchUserData(){
	try{
		const response = awaut fetch('https://api.example.com/user');
		if(!response.ok){
			throw new Error('网络相应不正常');
		}
		const data = await response.json();
		console.log(data);
	}catch(error){
		consolr.error('获取数据失败',error);
	}
}
```
#### 核心步骤 1：发起网络请求 `const response = await fetch('https://api.example.com/user');`

- **`fetch()` 说明**：浏览器原生的网络请求 API，用于发送 HTTP 请求，**它本身会返回一个 Promise 实例**，这也是可以用 `await` 等待它的原因。
- **`await` 的作用**：暂停 `fetchUserData` 函数的执行，等待 `fetch` 返回的 Promise 状态变为 `fulfilled`（请求完成，无论成功 / 失败，只要网络请求发出并收到服务器响应，Promise 就会成功）。
- **`response` 变量**：`await` 等待完成后，接收 `fetch` 返回的「响应对象」（`Response` 实例），这个对象包含了响应状态码、响应头、响应体等信息，**不是接口返回的最终 JSON 数据**。
- 注意：`fetch` 的 Promise 只有在「网络完全失败」（如断网、域名不存在）时才会变为 `rejected`，服务器返回 404、500 等错误状态码时，它的 Promise 仍然是 `fulfilled` 状态，这也是后续需要判断 `response.ok` 的原因。

#### 核心步骤 2：判断响应状态 `if (!response.ok) { throw new Error('网络响应不正常'); }`

- **`response.ok` 说明**：`Response` 对象的内置属性，是一个布尔值。
    
    - 当 HTTP 响应状态码在 `200 ~ 299` 之间（请求成功），`response.ok` 为 `true`。
    - 当状态码为 404、500 等（请求失败），`response.ok` 为 `false`。
    
- **`throw new Error(...)`**：手动抛出一个自定义错误，目的是将「服务器返回的错误响应」转化为「可被 `catch` 捕获的异常」，因为 `fetch` 本身不会为 404/500 抛出错误，需要我们手动处理。
- 这一步是关键：避免将错误的响应体当作正常数据去解析，保证后续逻辑的安全性。

#### 核心步骤 3：解析响应体为 JSON 数据 `const data = await response.json();`

- **`response.json()` 说明**：`Response` 对象的内置方法，用于将 JSON 格式的响应体解析为 JavaScript 对象 / 数组。
- 为什么需要 `await`？因为 `response.json()` 本身也是一个**异步操作**，它会返回一个 Promise 实例（需要等待响应体解析完成），所以必须用 `await` 等待它执行完毕，才能拿到最终的解析结果。
- **`data` 变量**：接收解析后的最终数据，也就是接口返回的用户数据，这是我们最终需要使用的数据。

**`fetch` 与 `axios` 的区别**：`fetch` 是浏览器原生 API（无需引入第三方库），但它的默认行为更 “底层”（不自动抛出 404/500 错误、不自动解析 JSON、不支持请求拦截等），而 `axios` 是封装后的库，使用更便捷。

### axios

axios返回的也是Promise对象
```Javascript
// 异步函数获取用户数据（axios 版本） 
async function fetchUserData() { 
	try { // 核心：axios 发送 GET 请求，直接 await 等待结果 
		const response = await axios.get('https://api.example.com/user'); 
		
		// 无需手动判断响应状态（axios 自动处理）、无需手动解析 JSON（axios 自动转换） 
		const data = response.data; // 直接从 response.data 获取最终解析后的数据 
		console.log('用户数据：', data); // 可选：返回数据供外部使用 
		return data; 
	} catch (error) { 
	// 统一捕获所有错误（网络错误、404/500 等服务器错误） 
	console.error('获取数据失败:', error.message); 
	// 可选：抛出错误供外部处理 
	throw error; 
	} 
} 
// 调用函数 
fetchUserData();
```

#### axios 版本与 fetch 版本的核心差异（简化点）
1. **无需手动判断响应状态**
    - `fetch` 仅在 “网络完全中断” 时才会报错，404/500 等状态码会被视为 “请求成功”，需要手动判断 `response.ok` 并抛出错误。
    - `axios` 会**自动判断 HTTP 状态码**：当状态码不在 `200~299` 之间时，会直接将 Promise 状态改为 `rejected`，无需手动处理，错误直接进入 `catch` 块。
2. **无需手动解析 JSON 数据**
    - `fetch` 需要调用 `response.json()`（异步操作，还需额外 `await`），才能将响应体转为 JavaScript 对象。
    - `axios` 会**自动识别响应体格式（如 JSON）并完成解析**，最终的有效数据直接存储在 `response.data` 中，可直接获取使用。
3. **请求写法更简洁**
    - `fetch` 发送 GET 请求：`fetch(url)`。
    - `axios` 发送 GET 请求：`axios.get(url)`（语义更清晰），同时 axios 还提供了 `axios.post()`/`axios.put()` 等方法对应不同 HTTP 请求方式。

## 数据类型
1. **number**：数值类型，包括正数，负数，小数
2. **string**：字符串类型，通过单引号`''`和双引号`""`或反引号包裹的数据都叫字符串
3. **boolean**：布尔类型，`true`和`false`
4. **undefined**：未定义，只声明，不赋值的情况下，默认值为undefined

## 运算符
| 运算符 | 作用                                   |
| ------ | -------------------------------------- |
| ===    | 左右两边是否`类型`和`值`都相等（重点） |
| ==     | 左右两边`值`是否相等                   |
| !=     | 左右值不相等                           |
| !==    | 左右两边是否不全等                     |

## 数组

数组做为对象数据类型，不但有 `length` 属性可以使用，还提供了许多方法：

1. push 动态向数组的尾部添加一个单元
2. unshit 动态向数组头部添加一个单元
3. pop 删除最后一个单元
4. shift 删除第一个单元
5. splice 动态删除任意单元
6. 
使用以上4个方法时，都是直接在原数组上进行操作，即成功调任何一个方法，原数组都跟着发生相应的改变。并且在添加或删除单元时 `length` 并不会发生错乱。

## 箭头函数

箭头函数是一种声明函数的简洁语法，它与普通函数并无本质的区别，差异性更多体现在语法格式上。

1. 箭头函数属于表达式函数，因此不存在函数提升（只能先声明，后调用）
2. 箭头函数只有一个参数时可以省略圆括号 `()`
3. 箭头函数函数体只有一行代码时可以省略花括号 `{}`，并自动做为返回值被返回

## 解构赋值

解构赋值是一种快速为变量赋值的简洁语法，本质上仍然是为变量赋值，分为数组解构、对象解构两大类型。

### 数组解构

数组解构是将数组的单元值快速批量赋值给一系列变量的简洁语法，如下代码所示：
```html
<script>

  // 普通的数组
  let arr = [1, 2, 3]

  // 批量声明变量 a b c
  // 同时将数组单元值 1 2 3 依次赋值给变量 a b c
  let [a, b, c] = arr
  console.log(a); // 1
  console.log(b); // 2
  console.log(c); // 3

</script>
```
总结：

1. 赋值运算符 `=` 左侧的 `[]` 用于批量声明变量，右侧数组的单元值将被赋值给左侧的变量
2. 变量的顺序对应数组单元值的位置依次进行赋值操作
3. 变量的数量大于单元值数量时，多余的变量将被赋值为  `undefined`
4. 变量的数量小于单元值数量时，可以通过 `...` 获取剩余单元值，但只能置于最末位
5. 允许初始化变量的默认值，且只有单元值为 `undefined` 时默认值才会生效

注：支持多维解构赋值，比较复杂后续有应用需求时再进一步分析

### 对象解构
对象解构是将对象属性和方法快速批量赋值给一系列变量的简洁语法，如下代码所示：
```html
<script>
  // 普通对象
  const user = {
    name: '小明',
    age: 18
  };

  // 批量声明变量 name age
  // 同时将数组单元值 小明  18 依次赋值给变量 name  age
  const {name, age} = user
  console.log(name) // 小明
  console.log(age) // 18
</script>
```
总结：
1. 赋值运算符 `=` 左侧的 `{}` 用于批量声明变量，右侧对象的属性值将被赋值给左侧的变量
2. 对象属性的值将被赋值给与属性名相同的变量
3. 对象中找不到与变量名一致的属性时变量值为 `undefined`
4. 允许初始化变量的默认值，属性不存在或单元值为 `undefined` 时默认值才会生效

### forEach遍历数组
forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数

>注意：  
>1.forEach 主要是遍历数组
>2.参数当前数组元素是必须要写的， 索引号可选。

```html
<body>
  <script>
    // forEach 就是遍历  加强版的for循环  适合于遍历数组对象
    const arr = ['red', 'green', 'pink']
    const result = arr.forEach(function (item, index) {
      console.log(item)  // 数组元素 red  green pink
      console.log(index) // 索引号
    })
  </script>
</body>
```

### filter筛选数组

filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素

主要使用场景： 筛选数组符合条件的元素，并返回筛选之后元素的新数组
```html
<body>
  <script>
    const arr = [10, 20, 30]
    // const newArr = arr.filter(function (item, index) {
    //   // console.log(item)
    //   // console.log(index)
    //   return item >= 20
    // })
    // 返回的符合条件的新数组
    const newArr = arr.filter(item => item >= 20)
    console.log(newArr)
  </script>
</body>
```

### map迭代生成新数组
`map` 会遍历数组，对**每个元素执行相同的处理逻辑**，并将处理后的结果收集成一个**新数组**返回（原数组不变）。
```Javascript
// 语法：const 新数组 = 数组.map(function(当前元素, 索引, 原数组) { return 处理后的值 });
 const scores = [80, 90, 75, 85]; 
 
 // 给每个分数加5分 
 const newScores = scores.map(score => score + 5); 
 console.log(newScores); // 输出：[85, 95, 80, 90] 
 console.log(scores); // 原数组不变：[80, 90, 75, 85]
```

### join数组拼接为字符串
`join` 会将数组的**所有元素拼接成一个字符串**，可以指定分隔符（默认用逗号分隔）。

```Javascript
// 语法：const 字符串 = 数组.join(分隔符); 
const arr = ['张三', '李四', '王五']; 

// 默认分隔符（逗号） 
console.log(arr.join()); // 输出："张三,李四,王五" 

// 自定义分隔符（横线） 
console.log(arr.join('-')); // 输出："张三-李四-王五" 

// 无分隔符（直接拼接） 
console.log(arr.join('')); // 输出："张三李四王五"
```

### find查找第一个符合条件的元素
`find` 会遍历数组，返回**第一个满足条件**的元素；若没有符合条件的元素，返回 `undefined`。

```Javascript
// 语法：const 结果 = 数组.find(function(当前元素, 索引, 原数组) { return 查找条件 }); 
const users = [ 
	{ id: 1, name: '张三', age: 20 }, 
	{ id: 2, name: '李四', age: 25 }, 
	{ id: 3, name: '王五', age: 25 } 
]; 

// 查找第一个年龄为25的用户 
const targetUser = users.find(user => user.age === 25); console.log(targetUser); // 输出：{ id: 2, name: '李四', age: 25 } 

// 查找不存在的元素 
const noUser = users.find(user => user.age === 30); 
console.log(noUser); // 输出：undefined
```

### reduce将数组的所有元素累计计算为一个最终值
`reduce` 直译是 “减少、归约”，它会遍历数组，每一步都将当前元素和上一步的计算结果（累加器）进行运算，最终将整个数组 “归约” 成一个值（可以是数字、对象、数组等任意类型）。

#### 基本语法
```javascript
// 语法：
数组.reduce(function(累加器, 当前元素, 当前索引, 原数组) {
  // 核心逻辑：对累加器和当前元素进行计算
  return 新的累加器值;
}, 初始值); // 初始值可选，但强烈建议显式指定
```

- **累加器 (accumulator)**：核心变量，保存上一次计算的结果（第一次若有初始值则等于初始值，无初始值则等于数组第一个元素）；
- **当前元素 (currentValue)**：遍历到的当前数组元素；
- **初始值 (initialValue)**：可选，指定累加器的初始状态，建议始终指定（避免空数组或单元素数组的异常）。

注意：`return`会把本轮计算的结果返回给`reduce`方法本身，这个返回值会是下一轮循环中`acc`的值


#### 常用示例
##### 示例 1：最基础 - 数组求和（替代循环累加）
```javascript
const numbers = [1, 2, 3, 4];

// 指定初始值为0，累加所有元素
const sum = numbers.reduce((acc, cur) => {
  return acc + cur; // 每一步：累加器 = 上一次结果 + 当前元素
}, 0);

console.log(sum); // 输出：10（1+2+3+4）
```

**简化写法**（箭头函数省略 return）：
```javascript
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
```

##### 示例 2：求数组中最大值
```javascript
const scores = [85, 92, 78, 95, 88];

// 初始值设为数组第一个元素，或直接设为0（若确定数组无负数）
const maxScore = scores.reduce((acc, cur) => {
  // 每一步比较累加器和当前元素，保留更大的值
  return acc > cur ? acc : cur;
}, 0);

console.log(maxScore); // 输出：95
```

##### 示例 3：复杂场景 - 合并数组中的对象属性
```javascript
const cart = [
  { name: '手机', price: 2999, count: 1 },
  { name: '耳机', price: 199, count: 2 },
  { name: '充电器', price: 59, count: 1 }
];

// 计算购物车总金额：单价*数量 累加
const totalPrice = cart.reduce((acc, cur) => {
  return acc + cur.price * cur.count;
}, 0);

console.log(totalPrice); // 输出：2999 + 199*2 + 59 = 3456
```

##### 示例 4：进阶 - 将数组转为对象（分组 / 映射）
```javascript
const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
];

// 把数组转成 {1: '张三', 2: '李四', 3: '王五'} 的格式
const userMap = users.reduce((acc, cur) => {
  acc[cur.id] = cur.name; // 累加器是对象，给对象添加属性
  return acc; // 必须返回累加器，否则下一轮会丢失
}, {}); // 初始值是空对象

console.log(userMap); // 输出：{1: '张三', 2: '李四', 3: '王五'}
```

## 异常处理
### throw

异常处理是指预估代码执行过程中可能发生的错误，然后最大程度的避免错误的发生导致整个程序无法继续运行
```html
<script>
  function counter(x, y) {
    if(!x || !y) {

      // throw '参数不能为空!';
      throw new Error('参数不能为空!')
    }
    return x + y
  }
  counter()
</script>
```
总结：
1. `throw` 抛出异常信息，程序也会终止执行
2. `throw` 后面跟的是错误提示信息
3. `Error` 对象配合 `throw` 使用，能够设置更详细的错误信息

### try ... catch
```html
<script>
   function foo() {
      try {
        // 查找 DOM 节点
        const p = document.querySelector('.p')
        p.style.color = 'red'
      } catch (error) {
        // try 代码段中执行有错误时，会执行 catch 代码段
        // 查看错误信息
        console.log(error.message)
        // 终止代码继续执行
        return
      }
      finally {
          alert('执行')
      }
      console.log('如果出现错误，我的语句不会执行')
    }
    foo()
</script>
```
总结：
1. `try...catch` 用于捕获错误信息
2. 将预估可能发生错误的代码写在 `try` 代码段中
3. 如果 `try` 代码段中出现错误后，会执行 `catch` 代码段，并截获到错误信息
