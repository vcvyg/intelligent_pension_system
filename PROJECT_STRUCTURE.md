# 项目结构说明文档

## 目录结构

```
Persion/
├── src/main/java/org/example/persion/
│   ├── PersionApplication.java          # 启动类
│   │
│   ├── config/                          # 配置类
│   │   ├── CorsConfig.java             # 跨域配置
│   │   └── MyBatisPlusMetaObjectHandler.java  # MyBatis Plus 自动填充
│   │
│   ├── controller/                      # 控制器层(三端分离)
│   │   ├── admin/                      # 管理端接口
│   │   │   └── AdminUserController.java
│   │   ├── family/                     # 子女端接口
│   │   │   └── FamilyHealthController.java
│   │   └── medical/                    # 医护端接口
│   │       └── MedicalRecordController.java
│   │
│   ├── service/                        # 业务逻辑层
│   │   └── impl/                       # 实现类
│   │
│   ├── repository/                     # 数据访问层(Mapper)
│   │   ├── UserMapper.java
│   │   ├── ElderlyInfoMapper.java
│   │   └── HealthDataMapper.java
│   │
│   ├── entity/                         # 实体类
│   │   ├── BaseEntity.java            # 基础实体
│   │   ├── User.java                  # 用户实体
│   │   ├── ElderlyInfo.java          # 老人信息实体
│   │   └── HealthData.java           # 健康数据实体
│   │
│   ├── dto/                           # 数据传输对象
│   ├── vo/                            # 视图对象
│   │
│   ├── common/                        # 公共类
│   │   ├── Result.java               # 统一响应结果
│   │   ├── enums/                    # 枚举类
│   │   │   └── UserRole.java        # 用户角色枚举
│   │   ├── exception/                # 异常类
│   │   │   ├── BusinessException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   └── utils/                    # 工具类
│   │
│   ├── security/                     # 安全认证模块
│   ├── websocket/                    # WebSocket实时通信
│   └── schedule/                     # 定时任务
│
├── src/main/resources/
│   ├── application.properties        # 主配置文件
│   ├── application-dev.properties    # 开发环境配置
│   ├── application-prod.properties   # 生产环境配置
│   ├── mapper/                       # MyBatis XML映射文件
│   ├── static/                       # 静态资源
│   └── templates/                    # 模板文件
│
└── pom.xml                           # Maven依赖配置

```

## 技术栈

### 后端核心
- **Spring Boot 3.5.7** - 应用框架
- **Java 21** - 开发语言
- **Maven 3.9.11** - 项目构建

### 数据库
- **SQL Server** - 主数据库
- **MyBatis Plus 3.5.9** - ORM框架
- **Redis** - 缓存和会话管理

### 安全认证
- **Spring Security** - 安全框架
- **JWT (jjwt 0.12.6)** - Token认证

### 其他功能
- **WebSocket** - 实时消息推送
- **Quartz** - 定时任务调度
- **Hutool 5.8.34** - 工具类库
- **FastJSON2 2.0.53** - JSON处理
- **Lombok** - 简化代码

## 核心功能模块

### 1. 管理端 (admin)
- 用户管理
- 健康数据汇总
- 设备管理
- 预警处理记录
- 数据统计报表

### 2. 子女端 (family)
- 老人健康数据查看
- GPS定位/电子围栏
- 视频/语音沟通
- 突发情况提醒
- 探访预约

### 3. 医护端 (medical)
- 健康档案查看
- 异常告警接收
- 巡诊记录录入
- 护理计划安排
- 远程问诊

## 数据库配置

在 `application.properties` 中修改以下配置:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=elderly_care
spring.datasource.username=sa
spring.datasource.password=your_password
```

## 启动说明

1. 确保已安装 Java 21 和 Maven 3.9.11
2. 确保 SQL Server 数据库已启动
3. 修改 `application.properties` 中的数据库配置
4. 运行 `PersionApplication` 启动类
5. 访问 http://localhost:8080

## 开发规范

- 代码清晰易读,注释简洁明了
- 采用模块化设计
- 三端接口分离(admin/family/medical)
- 统一返回 Result<T> 格式
- 使用全局异常处理
- 密码加密存储
- SQL防注入

## 下一步开发建议

1. 完善 Security 配置和 JWT 认证
2. 实现具体的业务 Service 层
3. 创建 SQL 数据库表和初始化脚本
4. 实现 WebSocket 实时推送功能
5. 添加定时任务(健康数据同步、提醒服务)
6. 开发前端页面并对接接口
