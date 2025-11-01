// API基础URL
const API_BASE_URL = 'http://localhost:8080/api';

// 初始化Swiper轮播
document.addEventListener('DOMContentLoaded', () => {
    // 初始化特性卡片轮播
    const swiper = new Swiper('.slider-features', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'slide',
        speed: 600,
    });
});

// 获取DOM元素
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');
const sendCodeBtn = document.getElementById('sendCodeBtn');
const emailInput = document.getElementById('email');

// 倒计时变量
let countdown = 60;
let countdownTimer = null;

// 显示消息
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message-toast ${type}`;
    messageDiv.style.display = 'block';

    // 5秒后自动隐藏
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// 验证手机号
function validatePhone(phone) {
    if (!phone) return true; // 手机号改为可选
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// 验证邮箱
function validateEmail(email) {
    if (!email) return false; // 邮箱是必填的
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 发送验证码
sendCodeBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();

    // 验证邮箱
    if (!email) {
        showMessage('请先输入邮箱', 'error');
        emailInput.focus();
        return;
    }

    if (!validateEmail(email)) {
        showMessage('邮箱格式不正确', 'error');
        emailInput.focus();
        return;
    }

    // 禁用按钮
    sendCodeBtn.disabled = true;
    sendCodeBtn.textContent = '发送中...';

    try {
        // 调用发送验证码API
        const response = await fetch(`${API_BASE_URL}/auth/sendEmailCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        });

        const result = await response.json();

        if (response.ok && result.code === 200) {
            // 发送成功
            showMessage('验证码已发送到您的邮箱,请查收!(有效期5分钟)', 'success');

            // 开始倒计时
            countdown = 60;
            sendCodeBtn.textContent = `${countdown}秒后重新获取`;

            countdownTimer = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    sendCodeBtn.textContent = `${countdown}秒后重新获取`;
                } else {
                    clearInterval(countdownTimer);
                    sendCodeBtn.disabled = false;
                    sendCodeBtn.textContent = '获取验证码';
                }
            }, 1000);

        } else {
            showMessage(result.message || '发送失败,请重试', 'error');
            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = '获取验证码';
        }

    } catch (error) {
        console.error('发送验证码错误:', error);
        showMessage('网络错误,请检查后端服务是否启动', 'error');
        sendCodeBtn.disabled = false;
        sendCodeBtn.textContent = '获取验证码';
    }
});

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
    const code = document.getElementById('code').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    const agree = document.getElementById('agree').checked;

    // 验证表单
    if (!username || !password || !realName || !email || !code || !role) {
        showMessage('请填写所有必填项', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('两次密码输入不一致', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('邮箱格式不正确', 'error');
        return;
    }

    if (phone && !validatePhone(phone)) {
        showMessage('手机号格式不正确', 'error');
        return;
    }

    if (!agree) {
        showMessage('请先同意用户协议和隐私政策', 'error');
        return;
    }

    // 禁用提交按钮,防止重复提交
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.querySelector('span').textContent = '注册中...';

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
                phone: phone || null,
                email: email,
                code: code,
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
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('span').textContent = '立即注册';
        }

    } catch (error) {
        console.error('注册错误:', error);
        showMessage('网络错误,请检查后端服务是否启动', 'error');
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.querySelector('span').textContent = '立即注册';
    }
});
