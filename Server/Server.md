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

## 服务器根目录结构

### Linux根目录(/)下的文件结构

bin   dev  home  lib32  libx32      media  opt   root  sbin  srv  tmp  var
boot  etc  lib   lib64  lost+found  mnt    proc  run   snap  sys  usr

### 核心系统目录

- bin
  
    存放所有用户(包括普通用户可执行的基础命令)

    比如 ls、cp、mv、sh 等，/bin 里的命令是系统启动和单用户模式必需的

- sbin

    存放系统管理员(root)专用的系统管理命令

    比如 ifconfig、reboot、fdisk 等，普通用户默认无执行权限（可通过 sudo）

- lib

    存放 bin/sbin 命令依赖的共享库（.so 文件） 和内核模块

- lib64
- lib32
- libx32
- boot
- dev

    存放设备文件（Linux 中 “一切皆文件”，硬件设备通过这里的文件访问）

- etc

    存放系统全局配置文件

- proc

    虚拟文件系统，存放内核和进程的实时状态信息（内存中，非磁盘）

- sys

    虚拟文件系统，存放硬件设备的底层信息（比 proc 更规范）

- run

    存放系统运行时的临时文件（重启后清空）

- lost+found

### 用户/数据/挂载目录

- home

    普通用户的家目录（每个用户有独立子目录，比如 /home/ubuntu）

    存放用户的个人文件、配置、数据等，普通用户仅对自己的 home 目录有写权限

- root

    超级管理员（root 用户）的家目录

    区别于普通用户的 home 目录，只有 root 能访问 / 修改

- mnt
- media
- opt
- srv

### 临时/可变数据目录

- tmp
- var

### 特殊目录

- snap
