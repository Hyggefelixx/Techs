# Flask框架

[Flask官方文档](https://flask.org.cn/en/stable/)

## 基本环境配置

### 通过venv创建python环境

```bash
# 创建venv虚拟环境
python -m venv venv

# 激活venv虚拟环境(Windows系统)
venv\Scripts\activate

# 在激活环境状态下安装相关依赖项
pip install 新包名
```

### 导出环境中配置的依赖项

```bash
pip freeze > requirements.txt
```

### 根据requirements.txt安装依赖项

```bash
pip install -r requirements.txt
```

如果遇到安装缓慢，可使用镜像源

```bash
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```

### 退出虚拟环境

```bash
deactivate
```

## 常用请求方法

| 请求方法  | 核心语义（用途）  | 数据传递方式  | 安全性  | 幂等性  | 典型场景  |
|---|---|---|---|---|---|
| GET  |读取 / 查询资源（不修改数据）   | URL 参数（如 ?id=1） |  安全 | 是  | 查看列表、详情（用户信息、文章列表）  |
|  POST | 提交 / 创建资源（新增数据）  |  请求体（JSON / 表单） |  不安全 |否   |用户注册、登录、提交表单、上传文件   |
| PUT  |全量更新资源（替换原有数据）  | 请求体（JSON）  |不安全   |是   |编辑用户信息（全量字段更新）  |
| DELETE  | 删除资源  | URL 参数 / 请求体  |不安全   |是   |删除文章、注销账号  |

### 各方法详细说明 + Flask代码实例

1. GET：查询资源（最常用）

   - 特点：数据附在 URL 中（可见，有长度限制，一般 2KB 内），适合传递少量非敏感数据
   - 注意：不能用于传递密码、 Token 等敏感信息（URL 会被日志记录）
  
    ```python
    # 查单个用户（URL 参数 id）
    @app.route('/api/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
    user = User.query.get(user_id)
    return jsonify({
        "id": user.id,
        "username": user.username
    }), 200

    # 查用户列表（带分页参数）
    @app.route('/api/users', methods=['GET'])
    def get_user_list():
        page = request.args.get('page', 1, type=int)  # 从 URL 取参数 ?page=1
        size = request.args.get('size', 10, type=int)
        users = User.query.paginate(page=page, per_page=size)
        return jsonify({
            "total": users.total,
            "list": [{"id": u.id, "username": u.username} for u in users.items]
        }), 200
    ```

2. POST：创建资源（次常用）

   - 特点：数据放在请求体（不可见，无长度限制），适合传递大量 / 敏感数据
   - 注意：多次提交会产生新资源（非幂等），后端需处理重复提交（如用户名唯一校验）
  
    ```python
    # 用户注册（请求体传 JSON 数据）
    @app.route('/api/register', methods=['POST'])
    def register():
        data = request.get_json()  # 从请求体取数据
        username = data.get('username')
        password = data.get('password')
        # 新增用户逻辑...
        return jsonify({"msg": "注册成功"}), 201
    ```

3. PUT：全量更新资源

   - 更新资源时，需要传递该资源的所有字段（即使部分字段没修改），会覆盖原有数据
   - 注意：不能用于传递密码、 Token 等敏感信息（URL 会被日志记录）
  
    ```python
    @app.route('/api/users/<int:user_id>', methods=['PUT'])
    @jwt_required()
    def update_user(user_id):
        data = request.get_json()
        user = User.query.get(user_id)
        # 全量更新（需传递所有必要字段）
        user.username = data.get('username')  # 必须传，否则可能覆盖为空
        user.phone = data.get('phone')
        db.session.commit()
        return jsonify({"msg": "更新成功"}), 200
    ```

4. DELETE：删除资源

   - 特点：语义明确，仅用于删除资源；数据可通过 URL 参数（简单场景）或请求体（复杂场景）传递
  
    ```python
    @app.route('/api/users/<int:user_id>', methods=['DELETE'])
    @jwt_required()
    def delete_user(user_id):
        user = User.query.get(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "删除成功"}), 200
    ```
### 文件上传场景下的 HTTP POST 请求格式

「请求行 + 请求头 + 请求体」三部分

```http
# 1. 请求行（方法 + 路径 + 协议）
POST /ajax-api/2.0/mlflow/train/upload HTTP/1.1

# 2. 请求头（包含Authorization，浏览器自动加Content-Type）
Host: localhost:5000  # 你的MLflow服务地址，浏览器自动加
Authorization: Basic dXNlcjE6MTIzNDU2  # 用户名密码Base64编码（示例：user1:123456）
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW  # 浏览器自动生成
User-Agent: Mozilla/5.0 ...  # 浏览器标识，自动加
Accept: */*  # 接受的响应类型，自动加
Content-Length: 12345  # 请求体长度，自动加
Connection: keep-alive  # 连接方式，自动加

# 3. 请求体（FormData格式，boundary分隔）
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="train.py"
Content-Type: text/x-python  # 文件的MIME类型，浏览器自动识别

# 这里是train.py文件的二进制内容（比如Python代码的字节流）
import mlflow
print("训练脚本开始执行")
# ... 其他代码 ...

------WebKitFormBoundary7MA4YWxkTrZu0gW--  # 结束分隔符
```

1. 请求行：定位后端接口
   - POST：请求方法，和后端路由配置的 ['POST'] 严格对应；
   - /ajax-api/2.0/mlflow/train/upload：请求路径，对应后端 get_train_endpoints 里注册的路由；
   - HTTP/1.1：HTTP 协议版本，浏览器默认。
  
2. 请求头：关键是「Authorization + 自动生成的 Content-Type」
   - Authorization 前端代码手动添加 后端用于校验身份（Basic Auth），对应你代码里从 sessionStorage 取的用户名密码；
   - Content-Type 浏览器自动生成 告诉后端「这是 multipart/form-data 格式的请求，用 xxx 分隔符拆分内容」；核心是包含 boundary=xxxx，没有它后端无法解析文件；
   - 其他头（Host/User-Agent 等）浏览器自动添加 辅助信息，无需关心。

3. 请求体：FormData 的实际格式（核心）
   - ------WebKitFormBoundary7MA4YWxkTrZu0gW：分隔符（和 Content-Type 里的 boundary 一致）；
   - Content-Disposition: form-data; name="file"; filename="train.py"：描述字段信息：
     - name="file"：对应前端 formData.append('file', file) 的 file 字段，后端通过 request.files['file'] 读取；
     - filename="train.py"：文件原始名称；
   - Content-Type: text/x-python：文件的 MIME 类型（浏览器识别.py 文件为文本类型）；
   - 中间是文件的二进制内容（你的 Python 脚本代码）；
   - ------WebKitFormBoundary7MA4YWxkTrZu0gW--：结束分隔符（末尾加--）。

## Jinjia2

### 后端渲染页面，Python生态中最流行的模板引擎

#### Jinja2 是 “后端写 HTML 的工具”—— 让后端开发者不用单独学前端框架，也能通过 Python 数据动态生成页面，适合简单场景；但现代复杂应用更推荐前后端分离（前端用 Vue/React，后端用 Flask 提供 API）

注意，和“前后端分离”的开发框架是两种完全不同的开发模式，遂略

## 数据库

### 相关依赖

```bash
# 激活 venv 环境后安装
pip install flask-sqlalchemy  # Flask 的 ORM 框架（操作数据库的核心）
pip install psycopg2-binary  # PostgreSQL 官方 Python 驱动（适配 SQLAlchemy）
```

#### 什么是ORM？

**ORM（Object-Relational Mapping，对象关系映射）框架。屏蔽数据库底层细节，用熟悉的编程语言语法操作数据。**

是 连接 “面向对象编程（OOP）” 和 “关系型数据库（RDB）” 的桥梁工具—— 简单说：它让你用 Python 类 / 对象 操作数据库，无需直接写 SQL 语句，就能实现数据的增删改查。

- 类：表
- 对象：数据
- 类的方法：表中的操作

## 连接

### AI平台实时可视化时用到的长连接

|类型   | 普通短连接（如上传 / 提交任务）  | 长连接（如训练状态推送）|
|---|---|---|
| 连接生命周期  | 请求发出去 → 后端返回响应 → 连接立即关闭  | 请求发出去 → 连接保持打开 → 后端持续推送数据 → 任务结束 / 出错才关闭  |
| 数据流向  |前端→后端（提交数据）或 后端→前端（返回结果） | 主要是后端→前端（主动推送实时数据）  |
| 典型场景  | 上传脚本、提交任务、查询历史数据  | 实时日志、进度更新、指标推送  |
| 你的技术实现  | Fetch API（一次性）  | Fetch API + ReadableStream（持续读流）  |

#### 核心特征

1. 本质是HTTP请求，但不立即结束，而是保持连接打开，后端有新的训练状态就推一点数据，直到训练任务结束/连接异常才关闭

2. 专为实时推送设计，训练任务是分钟 / 小时级的长耗时任务，前端不可能靠 “每隔 1 秒发一次请求查状态”（轮询）—— 既浪费服务器资源，又有延迟；长连接只需一次请求，就能持续接收后端推送，延迟最低、效率最高。

3. Fetch API + ReadableStream 是长连接的一种现代实现方式

    - 前端通过 Fetch 发起 GET 请求，告诉后端 “我要持续接收这个任务的状态”

    - 后端收到后不关闭连接，而是通过 “流式响应” 把训练状态一点点写回前端

    - 前端通过 ReadableStream 持续读取后端的流式数据，解析后更新可视化界面

