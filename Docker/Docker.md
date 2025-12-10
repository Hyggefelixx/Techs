# Docker

[Docker官方文档](https://www.docker.com/)

[DockerHub仓库](https://hub.docker.com/)

## Docker基本组成

- Docker镜像(image)
  
    好比是一个模板，可以通过这个模板来创建容器服务

- Docker容器(container)
  
    容器是镜像的实例，可以启动、停止、删除

- Docker仓库(repository)
  
    仓库就是存放镜像的地方

## 服务器安装Docker

```bash
# 1. 下载并运行 Docker 官方安装脚本
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 2. 启动 Docker 服务
sudo systemctl start docker

# 3. 设置 Docker 开机自启
sudo systemctl enable docker

# 4. 验证安装
docker --version
```

安装完后需要配置镜像加速器，在文件/etc/docker/daemon.json中配置

docker相关资源都在/var/lib/docker文件夹中

```bash
{
  "registry-mirrors": ["https://你的阿里云加速地址.mirror.aliyuncs.com"]
}
```

进一步验证安装

```bash
sudo docker run hello-world
```

## 相关指令

- docker version    # 查看版本信息
- docker info   # 查看系统信息
- docker 命令 --help  # 查看命令的帮助信息

## 镜像命令

- docker images   # 查看所有镜像
- docker search   # 搜索镜像
- docker pull 镜像名[:tag]    # 下载镜像
    注意：tag默认为latest
- docker rmi 镜像名[:tag]    # 删除镜像

## 容器命令

说明：我们有了镜像才可以创建容器

- docker run [可选参数] image # 创建并运行容器

    参数说明：

    1. --name="Name"    容器名字 tomcat01，tomcat02 用于区分容器
    2. -d     后台方式运行
    3. -it     交互模式
    4. -p     端口映射

- exit  # 从容器中退回主机（容器停止，再退出，但是注意容器并没有被删除）
- docker ps      # 列出所有运行中的容器

    参数说明：

    1. -a     列出当前正在运行的+历史运行过（停止的）的容器
    2. -n=?    显示最近启动的?个容器
    3. -q      只显示容器ID

- ctrl + P + Q   # 容器退出（容器不停止，退出）
- docker rm 容器ID  # 删除容器（不能删除正在运行的容器）
- docker stop 容器ID  # 停止容器
- docker start 容器ID  # 启动容器
- docker restart 容器ID  # 重启容器
- docker kill 容器ID  # 强制停止容器

## 常用其他命令

- docker run -d  镜像名 # 后台启动容器
    注意：docker容器使用后台运行，就必须要有一个前台进程，docker发现没有前台进程会自动停止

- docker logs 容器ID  # 查看容器的日志

## Docker容器

### Docker容器 = 独立的运行环境 + 正在运行的服务

## Docker Compose

### 核心作用:批量管理多个Docker容器

写一个docker-compose.yml文件，将多个服务的配置都定义好，然后运行docker-compose up

Compose会自动帮你

- 创建并启动所有服务的容器

- 自动创建一个专用网络，让所有容器在同一个网络里，互相能通过服务名访问

- 统一管理容器的日志、重启策略、数据卷
