# Axios

## 传参场景

#### 1. GET 请求：传递 URL 查询参数（Query 参数）

- **场景**：用于查询数据（如你之前的「查询账单列表」接口），参数会拼在 URL 后面，格式为 `?key1=value1&key2=value2`。
- **axios 用法**：在 `axios.get()` 的第二个参数中，通过 `params` 配置项传递（对象格式）。
- **特点**：axios 会自动将 `params` 中的对象转为 URL 拼接参数，无需手动拼接。
- **示例（对应你的账单查询接口）**：
```Javascript
// 核心：params 配置项传递 Query 参数 
async getBillList() { 
	const res = await axios.get("http://localhost:8080/bill", { 
	params: { // 这里传递 Query 参数 
		creator: "小黑", // 键值对格式，会被转为 ?creator=小黑 
		// 可添加多个参数，如：page: 1, size: 10 
	} 
	}); 
	this.list = res.data; 
}
```
- **最终请求 URL**：`http://localhost:8080/bill?creator=小黑`

#### 2. POST/PUT 请求：传递 JSON 请求体参数（最常用）

- **场景**：用于创建 / 修改数据（如你新增的「添加账单」接口），参数放在请求体中（不暴露在 URL 中），格式为 JSON，是前后端对接的主流方式。
- **axios 用法**：直接在 `axios.post()` 的第二个参数传递 JSON 对象（无需额外配置）。
- **特点**：axios 会自动设置请求头 `Content-Type: application/json`，并将对象序列化为 JSON 格式，后端可通过 `@RequestBody` 接收。
- **示例（对应你的添加账单接口）**：
```Javascript
async addBill(){
	const res = await axios.post("http://localhost:8080/bill",{
		creator:"小黑",
		name:"",
		price:30.0
	}
}
```

#### 3. POST 请求：传递表单格式参数（form-data /x-www-form-urlencoded）

- **场景**：用于上传文件（form-data），或对接传统表单提交接口（x-www-form-urlencoded），日常开发中 JSON 格式更常用，此方式为补充。
- **两种子格式**：
    
    ##### （1）application/x-www-form-urlencoded（普通表单，无文件）
    
    - 用法：需将参数转为 `key=value&key2=value2` 格式，可使用 `URLSearchParams` 工具。
    - 示例：
	```Javascript
	async submitForm() { 
	// 1. 构造表单参数 
	const params = new URLSearchParams(); 
	params.append("name", this.name); 
	params.append("price", this.price); 
	
	// 2. 传递给 post 第二个参数 
	const res = await axios.post("http://localhost:8080/bill/form", params); }
	```
    ##### （2）multipart/form-data（上传文件，如账单附件）
    
    - 用法：需使用 `FormData` 对象，专门用于文件上传。
    - 示例：示例（假设添加账单时上传小票图片）：
	```Javascript
	async addBillWithFile() { 
	// 1. 构造 FormData 对象 
	const formData = new FormData(); formData.append("name", this.name); // 普通参数 
		formData.append("price", this.price); // 普通参数
	formData.append("receiptFile",document.getElementById("fileInput").files[0]); // 文件参数 
		
		// 2. 发送请求（axios 自动识别 FormData，无需手动设置请求头） 
		const res = await axios.post("http://localhost:8080/bill/upload", formData); }
	```

#### 4. 路径参数（Restful 风格，URL 路径中的参数）

- **场景**：用于定位唯一资源（如「删除单个账单」「查询单个账单」），参数直接嵌入 URL 路径中，格式为 `/xxx/{参数值}`。
- **axios 用法**：手动拼接 URL 路径，或使用模板字符串嵌入参数。
- **特点**：参数是 URL 的一部分，通常用于传递资源 ID 等唯一标识。
- **示例（假设删除指定 ID 的账单接口）**：
```Javascript
async deleteBill(billId) { 
	// 核心：手动拼接 URL 路径，嵌入 billId 参数 
	// 方式1：模板字符串（推荐，更清晰） 
	const res = await axios.delete(`http://localhost:8080/bill/${billId}`);
	 
	// 方式2：字符串拼接（不推荐，易出错） 
	// const res = await axios.delete("http://localhost:8080/bill/" + billId); 
	
	alert("账单删除成功！"); }
```
- **最终请求 URL**：`http://localhost:8080/bill/4`（当 billId=4 时）