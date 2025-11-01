package org.example.persion.common.enums;

import lombok.Getter;

/**
 * 用户角色枚举
 */
@Getter
public enum UserRole {
    ADMIN("管理员"),
    FAMILY("子女"),
    MEDICAL("医护人员"),
    ELDERLY("老人");

    private final String description;

    UserRole(String description) {
        this.description = description;
    }
}
