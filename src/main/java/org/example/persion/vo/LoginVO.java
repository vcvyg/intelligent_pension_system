package org.example.persion.vo;

import lombok.Data;

/**
 * 登录响应VO
 */
@Data
public class LoginVO {

    private String token; // JWT Token

    private UserInfoVO userInfo; // 用户信息
}
