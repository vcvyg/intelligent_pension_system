# 智慧养老系统 - 数据库安装指南

## 📋 前提条件

确保你已经安装了 **SQL Server**。如果没有安装:
- 下载地址: https://www.microsoft.com/zh-cn/sql-server/sql-server-downloads
- 推荐安装: **SQL Server 2019 Express** (免费版)

---

## 🚀 快速安装步骤

### 方法1: 使用 SQL Server Management Studio (SSMS)

1. **打开 SSMS** (SQL Server Management Studio)
2. **连接到数据库**
   - 服务器名称: `localhost` 或 `(localdb)\MSSQLLocalDB`
   - 身份验证: Windows 身份验证
   - 点击"连接"

3. **执行初始化脚本**
   - 点击"新建查询"
   - 打开文件: `D:\Persion\sql\init_database.sql`
   - 点击"执行"(或按F5)

4. **查看结果**
   - 应该看到: ✅ 数据库初始化完成!

---

### 方法2: 使用命令行 (sqlcmd)

打开命令行,执行:

```bash
# 使用Windows身份验证
sqlcmd -S localhost -E -i D:\Persion\sql\init_database.sql

# 或使用SQL Server身份验证
sqlcmd -S localhost -U sa -P 你的密码 -i D:\Persion\sql\init_database.sql
```

---

## ⚙️ 配置 application.properties

执行完SQL脚本后,修改项目配置:

打开: `D:\Persion\src\main\resources\application.properties`

### 如果使用 Windows 身份验证:
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=elderly_care;encrypt=true;trustServerCertificate=true;integratedSecurity=true
```

### 如果使用 SQL Server 身份验证:
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=elderly_care;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=你的SQL Server密码
```

---

## ✅ 验证安装

执行完脚本后,应该看到以下表:

| 表名 | 说明 |
|------|------|
| sys_user | 用户表 |
| elderly_info | 老人信息表 |
| health_data | 健康数据表 |

查询语句:
```sql
USE elderly_care;
SELECT name FROM sys.tables;
```

---

## 🔧 常见问题

### 问题1: "无法连接到服务器"
**解决**:
- 确认SQL Server服务已启动
- 按 `Win + R`,输入 `services.msc`,找到 SQL Server 服务并启动

### 问题2: "登录失败"
**解决**:
- 使用 Windows 身份验证
- 或重置 sa 密码

### 问题3: "数据库已存在"
**解决**:
- 脚本会自动跳过已存在的表
- 如需重建,先删除数据库: `DROP DATABASE elderly_care;`

---

## 📞 需要帮助?

如果遇到问题,请告诉我:
1. 你使用的是什么 SQL Server 版本?
2. 使用的是 Windows 身份验证还是 SQL Server 身份验证?
3. 具体的错误信息是什么?
