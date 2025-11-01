package org.example.persion.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.example.persion.common.exception.BusinessException;
import org.example.persion.dto.LoginDTO;
import org.example.persion.dto.UserRegisterDTO;
import org.example.persion.entity.User;
import org.example.persion.repository.UserMapper;
import org.example.persion.security.JwtUtil;
import org.example.persion.service.EmailService;
import org.example.persion.service.UserService;
import org.example.persion.vo.LoginVO;
import org.example.persion.vo.UserInfoVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @Override
    public User register(UserRegisterDTO dto) {
        // 验证邮箱验证码
        if (!emailService.verifyCode(dto.getEmail(), dto.getCode())) {
            throw new BusinessException("验证码错误或已过期");
        }

        // 检查用户名是否已存在
        User existUser = getUserByUsername(dto.getUsername());
        if (existUser != null) {
            throw new BusinessException("用户名已存在");
        }

        // 创建用户
        User user = new User();
        BeanUtils.copyProperties(dto, user);
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // 加密密码
        user.setStatus(1); // 默认启用

        userMapper.insert(user);
        return user;
    }

    @Override
    public LoginVO login(LoginDTO dto) {
        // 查询用户
        User user = getUserByUsername(dto.getUsername());
        if (user == null) {
            throw new BusinessException("用户名或密码错误");
        }

        // 验证密码
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BusinessException("用户名或密码错误");
        }

        // 检查用户状态
        if (user.getStatus() == 0) {
            throw new BusinessException("账号已被禁用");
        }

        // 生成Token
        String token = jwtUtil.generateToken(user.getId(), user.getUsername(), user.getRole());

        // 构建返回数据
        LoginVO loginVO = new LoginVO();
        loginVO.setToken(token);

        UserInfoVO userInfoVO = new UserInfoVO();
        BeanUtils.copyProperties(user, userInfoVO);
        userInfoVO.setId(user.getId());
        loginVO.setUserInfo(userInfoVO);

        return loginVO;
    }

    @Override
    public User getUserByUsername(String username) {
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUsername, username);
        return userMapper.selectOne(wrapper);
    }

    @Override
    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }
}
