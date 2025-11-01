// API基础URL
const API_BASE_URL = 'http://localhost:8080/api';

// 获取DOM元素
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

// 显示消息
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    // 5秒后自动隐藏
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// 验证手机号
function validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// 验证邮箱
function validateEmail(email) {
    if (!email) return true; // 邮箱是可选的
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 实时验证输入
document.getElementById('phone').addEventListener('blur', function() {
    const phone = this.value.trim();
    if (phone && !validatePhone(phone)) {
        this.classList.add('invalid');
        this.classList.remove('valid');
        showMessage('手机号格式不正确', 'error');
    } else if (phone) {
        this.classList.add('valid');
        this.classList.remove('invalid');
    }
});

document.getElementById('email').addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
        this.classList.add('invalid');
        this.classList.remove('valid');
        showMessage('邮箱格式不正确', 'error');
    } else if (email) {
        this.classList.add('valid');
        this.classList.remove('invalid');
    }
});

document.getElementById('confirmPassword').addEventListener('blur', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    if (confirmPassword && password !== confirmPassword) {
        this.classList.add('invalid');
        this.classList.remove('valid');
        showMessage('两次密码输入不一致', 'error');
    } else if (confirmPassword) {
        this.classList.add('valid');
        this.classList.remove('invalid');
    }
});

// 注册表单提交
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 获取表单数据
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const realName = document.getElementById('realName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    const agree = document.getElementById('agree').checked;

    // 验证表单
    if (!username || !password || !realName || !phone || !role) {
        showMessage('请填写所有必填项', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('两次密码输入不一致', 'error');
        return;
    }

    if (!validatePhone(phone)) {
        showMessage('手机号格式不正确', 'error');
        return;
    }

    if (email && !validateEmail(email)) {
        showMessage('邮箱格式不正确', 'error');
        return;
    }

    if (!agree) {
        showMessage('请先同意用户协议和隐私政策', 'error');
        return;
    }

    // 禁用提交按钮,防止重复提交
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '注册中...';

    try {
        // 调用注册API
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                realName: realName,
                phone: phone,
                email: email || null,
                role: role
            })
        });

        const result = await response.json();

        if (response.ok && result.code === 200) {
            // 注册成功
            showMessage('注册成功! 3秒后自动跳转到登录页...', 'success');

            // 3秒后跳转到登录页
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);

        } else {
            // 注册失败
            showMessage(result.message || '注册失败,请重试', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }

    } catch (error) {
        console.error('注册错误:', error);
        showMessage('网络错误,请检查后端服务是否启动', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});
