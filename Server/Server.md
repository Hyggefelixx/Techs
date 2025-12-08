# 服务器

## 连接阿里云ECS(SHH客户端连接)

### 方式1：密码登录

特点：适合快速测试，操作简单

windows 11:在命令行中输入`ssh root@实例公网IP`

注：登录后通过exit命令退出服务器

### 方式2：密钥登录

特点：推荐，安全性更高

前置工作：在阿里云平台上创建私钥，并与实例绑定

windows 11：输入命令`ssh -i 私钥文件路径 root@实例公网IP`

可以进一步设置.ssh/config文件，减少工作量

```bash
Host "给服务器起一个别名"

	HostName "实例的公网IP地址"

	User root

	IdentityFile "私钥文件路径"
```
