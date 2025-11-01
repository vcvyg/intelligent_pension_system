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
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

// 显示消息
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message-toast ${type}`;
    messageDiv.style.display = 'block';

    // 3秒后自动隐藏
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// 登录表单提交
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 获取表单数据
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // 验证表单
    if (!username || !password || !role) {
        showMessage('请填写完整的登录信息', 'error');
        return;
    }

    // 禁用提交按钮,防止重复提交
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.querySelector('span').textContent = '登录中...';

    try {
        // 调用登录API
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();

        if (response.ok && result.code === 200) {
            // 验证角色是否匹配
            if (result.data.userInfo.role !== role) {
                showMessage('登录身份不匹配,请重新选择', 'error');
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                submitBtn.querySelector('span').textContent = '登录';
                return;
            }

            // 登录成功
            showMessage('登录成功,正在跳转...', 'success');

            // 保存Token和用户信息
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('userInfo', JSON.stringify(result.data.userInfo));

            // 记住我功能
            const rememberMe = document.getElementById('rememberMe').checked;
            if (rememberMe) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }

            // 1.5秒后跳转到主页
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);

        } else {
            // 登录失败
            showMessage(result.message || '登录失败,请检查用户名和密码', 'error');
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('span').textContent = '登录';
        }

    } catch (error) {
        console.error('登录错误:', error);
        showMessage('网络错误,请检查后端服务是否启动', 'error');
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.querySelector('span').textContent = '登录';
    }
});

// 页面加载时,填充记住的用户名
window.addEventListener('DOMContentLoaded', () => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('rememberMe').checked = true;
    }
});
