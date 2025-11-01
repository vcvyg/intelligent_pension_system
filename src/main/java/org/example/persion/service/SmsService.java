package org.example.persion.service;

/**
 * 验证码服务接口
 */
public interface SmsService {

    /**
     * 发送验证码(模拟)
     * @param phone 手机号
     * @return 生成的验证码(仅用于测试,实际项目不应返回)
     */
    String sendCode(String phone);

    /**
     * 验证验证码
     * @param phone 手机号
     * @param code 验证码
     * @return 是否验证成功
     */
    boolean verifyCode(String phone, String code);
}
