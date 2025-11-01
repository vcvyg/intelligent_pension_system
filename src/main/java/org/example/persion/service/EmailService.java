package org.example.persion.service;

/**
 * 邮件服务接口
 */
public interface EmailService {

    /**
     * 发送验证码邮件
     * @param email 接收邮箱
     * @return 生成的验证码
     */
    String sendVerificationCode(String email);

    /**
     * 验证邮箱验证码
     * @param email 邮箱
     * @param code 验证码
     * @return 是否验证成功
     */
    boolean verifyCode(String email, String code);
}
