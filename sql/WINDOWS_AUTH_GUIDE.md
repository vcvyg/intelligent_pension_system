# SQL Server Windows身份验证配置指南

## ⚠️ 问题原因

Windows身份验证需要额外的DLL文件: `mssql-jdbc_auth-<version>-x64.dll`

---

## ✅ 解决方案

### 方法1: 下载并配置DLL文件

1. **下载驱动包**
   - 访问: https://learn.microsoft.com/en-us/sql/connect/jdbc/download-microsoft-jdbc-driver-for-sql-server
   - 下载最新版本的 JDBC Driver
   - 解压后找到 `mssql-jdbc_auth-<version>-x64.dll` 文件

2. **复制DLL到系统目录**

   **选项A: 复制到Java的bin目录**
   ```
   找到你的JDK安装目录,例如:
   C:\Program Files\Java\jdk-21\bin\

   将 mssql-jdbc_auth-xxx-x64.dll 复制到这个目录
   ```

   **选项B: 复制到Windows系统目录**
   ```
   C:\Windows\System32\
   ```

3. **重启项目**

---

### 方法2: 改用SQL Server身份验证 (更简单)

如果不想下载DLL文件,可以改用SQL Server身份验证:

1. **启用SQL Server身份验证**
   - 打开 SSMS
   - 右键"服务器" -> "属性"
   - "安全性" -> 选择"SQL Server 和 Windows 身份验证模式"
   - 重启SQL Server服务

2. **设置sa密码**
   ```sql
   USE master;
   GO
   ALTER LOGIN sa ENABLE;
   GO
   ALTER LOGIN sa WITH PASSWORD = '你的密码';
   GO
   ```

3. **修改 application.properties**
   ```properties
   spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=elderly_care;encrypt=true;trustServerCertificate=true
   spring.datasource.username=sa
   spring.datasource.password=你的密码
   ```

---

## 🎯 推荐方案

**对于开发测试,建议使用方法2(SQL Server身份验证)**,因为:
- ✅ 不需要下载额外文件
- ✅ 配置简单
- ✅ 跨平台兼容性好

---

## 📞 需要帮助?

告诉我你选择哪个方法,我来帮你配置!
