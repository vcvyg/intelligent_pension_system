# QQ邮箱验证码使用指南

## ✅ 已完成的功能

后端和前端已经全部改好了!现在验证码会**真实发送到QQ邮箱**!

---

## 🎯 最后一步:配置你的QQ邮箱

### 步骤1: 获取QQ邮箱授权码

1. 访问 https://mail.qq.com/ 登录
2. 点击"设置" -> "账户"
3. 找到"POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务"
4. 开启"IMAP/SMTP服务"
5. 按提示发送短信验证
6. 获取**授权码**(16位字符,类似: abcdefghijklmnop)

### 步骤2: 配置授权码到项目

打开: `D:\Persion\src\main\resources\application.properties`

修改这两行:
```properties
spring.mail.username=你的QQ邮箱@qq.com
spring.mail.password=你获取的16位授权码
```

例如:
```properties
spring.mail.username=123456789@qq.com
spring.mail.password=abcdefghijklmnop
```

---

## 🚀 启动测试

### 1. 重启项目
```bash
cd D:\Persion
mvnw spring-boot:run
```

### 2. 访问注册页面
http://localhost:8080/register.html

### 3. 注册流程
1. 填写用户名、密码等基本信息
2. **填写邮箱**(必填) - 你的真实邮箱
3. 点击"获取验证码"
4. **打开你的邮箱查收**
5. 邮件会收到一个漂亮的HTML格式验证码
6. 复制验证码填入注册页面
7. 完成注册

---

## 📧 邮件效果

验证码邮件包含:
- ✅ 漂亮的紫色渐变头部
- ✅ 大号验证码显示
- ✅ 温馨提示(有效期5分钟)
- ✅ 防止泄露提醒

---

## 🎉 优势

| 功能 | 短信验证码 | 邮箱验证码 |
|------|-----------|-----------|
| 成本 | ❌ 收费 | ✅ 免费 |
| 实现 | ❌ 复杂 | ✅ 简单 |
| 真实发送 | ❌ 需付费 | ✅ 真实发送 |
| 验证效果 | ⭕ 好 | ✅ 同样好 |

---

## 💡 提示

- 手机号改为**可选项**
- 邮箱改为**必填项**
- 验证码有效期5分钟
- 支持60秒倒计时防重复发送

---

**配置好QQ邮箱授权码后告诉我,我们一起测试!** 😊
