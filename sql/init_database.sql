-- ========================================
-- 智慧养老系统数据库初始化脚本
-- 数据库: SQL Server
-- ========================================

-- 1. 创建数据库
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'elderly_care')
BEGIN
    CREATE DATABASE elderly_care;
END
GO

USE elderly_care;
GO

-- 2. 创建用户表
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'sys_user')
BEGIN
    CREATE TABLE sys_user (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(50) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        real_name NVARCHAR(50),
        phone NVARCHAR(20),
        email NVARCHAR(100),
        role NVARCHAR(20) NOT NULL, -- ADMIN, FAMILY, MEDICAL, ELDERLY
        status INT DEFAULT 1, -- 0-禁用 1-启用
        create_time DATETIME2 DEFAULT GETDATE(),
        update_time DATETIME2 DEFAULT GETDATE(),
        deleted INT DEFAULT 0
    );
    PRINT '✅ 用户表创建成功';
END
ELSE
BEGIN
    PRINT '⚠️ 用户表已存在';
END
GO

-- 3. 创建老人信息表
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'elderly_info')
BEGIN
    CREATE TABLE elderly_info (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT,
        name NVARCHAR(50) NOT NULL,
        age INT,
        gender NVARCHAR(10),
        birthday DATE,
        id_card NVARCHAR(18),
        address NVARCHAR(255),
        emergency_contact NVARCHAR(50),
        emergency_phone NVARCHAR(20),
        medical_history NVARCHAR(MAX),
        allergy_history NVARCHAR(MAX),
        create_time DATETIME2 DEFAULT GETDATE(),
        update_time DATETIME2 DEFAULT GETDATE(),
        deleted INT DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES sys_user(id)
    );
    PRINT '✅ 老人信息表创建成功';
END
ELSE
BEGIN
    PRINT '⚠️ 老人信息表已存在';
END
GO

-- 4. 创建健康数据表
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'health_data')
BEGIN
    CREATE TABLE health_data (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        elderly_id BIGINT NOT NULL,
        heart_rate DECIMAL(5,2),
        blood_pressure_high DECIMAL(5,2),
        blood_pressure_low DECIMAL(5,2),
        temperature DECIMAL(4,2),
        blood_sugar DECIMAL(5,2),
        sleep_duration INT,
        steps INT,
        measure_time DATETIME2,
        device_id NVARCHAR(50),
        create_time DATETIME2 DEFAULT GETDATE(),
        update_time DATETIME2 DEFAULT GETDATE(),
        deleted INT DEFAULT 0,
        FOREIGN KEY (elderly_id) REFERENCES elderly_info(id)
    );
    PRINT '✅ 健康数据表创建成功';
END
ELSE
BEGIN
    PRINT '⚠️ 健康数据表已存在';
END
GO

-- 5. 创建索引
CREATE INDEX idx_user_username ON sys_user(username);
CREATE INDEX idx_user_phone ON sys_user(phone);
CREATE INDEX idx_elderly_user_id ON elderly_info(user_id);
CREATE INDEX idx_health_elderly_id ON health_data(elderly_id);
CREATE INDEX idx_health_measure_time ON health_data(measure_time);
GO

PRINT '';
PRINT '========================================';
PRINT '✅ 数据库初始化完成!';
PRINT '========================================';
PRINT '数据库名: elderly_care';
PRINT '表数量: 3 (sys_user, elderly_info, health_data)';
PRINT '';
PRINT '下一步: 请在 application.properties 中配置数据库连接';
PRINT '========================================';
GO
