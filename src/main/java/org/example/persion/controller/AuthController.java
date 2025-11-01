package org.example.persion.controller;

import jakarta.validation.Valid;
import org.example.persion.common.Result;
import org.example.persion.dto.LoginDTO;
import org.example.persion.dto.SendCodeDTO;
import org.example.persion.dto.UserRegisterDTO;
import org.example.persion.entity.User;
import org.example.persion.service.SmsService;
import org.example.persion.service.UserService;
import org.example.persion.vo.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 认证控制器(登录、注册)
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private SmsService smsService;

    /**
     * 发送验证码(模拟)
     */
    @PostMapping("/sendCode")
    public Result<String> sendCode(@Valid @RequestBody SendCodeDTO dto) {
        String code = smsService.sendCode(dto.getPhone());
        // 注意: 仅用于开发测试,实际项目不应返回验证码
        return Result.success(code);
    }

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public Result<User> register(@Valid @RequestBody UserRegisterDTO dto) {
        User user = userService.register(dto);
        return Result.success(user);
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Result<LoginVO> login(@Valid @RequestBody LoginDTO dto) {
        LoginVO loginVO = userService.login(dto);
        return Result.success(loginVO);
    }

    /**
     * 测试接口
     */
    @GetMapping("/test")
    public Result<String> test() {
        return Result.success("认证接口测试成功");
    }
}
