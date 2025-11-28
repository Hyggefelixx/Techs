# 记录学习过程中遇到的其他问题

## .sh文件和.bat文件

### 二者都是脚本文件，核心作用是批量执行一系列命令，避免手动重复输入，但适配的操作系统和语法完全不同 ——.sh 面向 Linux/macOS（类 Unix 系统），.bat 面向 Windows 系统。

| 特性  |  `.sh` 文件 | `.bat`文件  |
|---|---|---|
| 全称  | Shell Script（壳脚本）  | Batch File（批处理文件）  |
| 适配系统 | Linux、macOS、BSD 等类 Unix 系统  | Windows 系统（DOS/Windows 命令行）   |
|  解释器 |  由 Shell 解析执行（默认 bash/zsh） | 由 Windows 命令行解释器（cmd.exe）执行  |
| 语法  | 遵循 Shell 语法（bash/zsh 规范） | 遵循 DOS 命令行语法（cmd 命令规范） |
| 执行方式 | 终端输入 ./脚本名.sh（需权限）  | 双击文件，或 cmd 中输入 脚本名.bat  |
|  核心用途 | 自动化部署、系统配置、程序编译等  | Windows 下自动化操作（如文件批量处理、软件安装脚本）  |
