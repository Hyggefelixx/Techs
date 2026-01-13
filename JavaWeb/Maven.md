# Maven

**一款管理和构建Java项目的工具**

## Maven的作用

1. 依赖管理：方便快捷管理、下载依赖包
2. 统一项目结构，提供标准、统一的项目结构
3. 项目构建：标准跨平台的自动化项目构建方式

## Maven的安装

1. 下载安装包并解压 C:develop
    - bin: bin目录下存放Maven的命令文件
    - conf: 配置文件目录
    - lib: 存放Maven的jar包

2. 配置本地仓库
    - 修改conf/settings.xml文件
    - 其中的<localRepository>为一个指定目录

3. 配置阿里云私服
    - 修改conf/settings.xml文件
    - <mirrors>标签下添加内容

4. 配置环境变量
    - MAVEN_HOME
  
## idea集成Maven

### 配置Maven环境(全局)

1. 开始界面 自定义 所有设置
2. 配置Maven
3. Java编译器

### 导入Maven项目

1. 文件放到对应目录下
2. 导入pom.xml

## 依赖管理

[依赖库查询](https://mvnrepository.com/)

```mvn
// pom.xml 添加依赖 完成后记得刷新
<dependencies>
    <dependency>
        <groupId>org.apache.commons<groupId>
        <artifactId>commons-lang3<artifactId>
        <version>3.12.0</version>
    </dependency>
</dependencies>
```

1. 依赖是传递的，可排除依赖
2. 依赖范围：导入的依赖默认在main和test目录下都能使用
   - 可通过**scope**属性指定依赖范围

## 生命周期

1. clean:移除上一次构建生成的文件 注意，属于clean生命周期
2. compile:编译源代码
3. test: 编译测试代码
4. package: 打包
5. install: 安装包到本地仓库

同一套生命周期中，运行后面的阶段时，前面的阶段会运行

两种运行方式：

1. idea中双击运行
2. 命令行运行
