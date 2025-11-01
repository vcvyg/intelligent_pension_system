package org.example.persion.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 发送验证码DTO
 */
@Data
public class SendCodeDTO {

    @NotBlank(message = "手机号不能为空")
    private String phone;
}
