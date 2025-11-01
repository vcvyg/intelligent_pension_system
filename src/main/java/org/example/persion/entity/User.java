package org.example.persion.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 用户实体类
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_user")
public class User extends BaseEntity {

    private String username;

    private String password;

    private String realName;

    private String phone;

    private String email;

    private String role; // ADMIN, FAMILY, MEDICAL, ELDERLY

    private Integer status; // 0-禁用 1-启用
}
