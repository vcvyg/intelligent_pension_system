package org.example.persion.vo;

import lombok.Data;

/**
 * 用户信息VO
 */
@Data
public class UserInfoVO {

    private Long id;

    private String username;

    private String realName;

    private String phone;

    private String email;

    private String role;

    private Integer status;
}
