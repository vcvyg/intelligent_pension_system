package org.example.persion.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.example.persion.common.utils.CodeUtil;
import org.example.persion.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * 验证码服务实现类(模拟短信)
 */
@Slf4j
@Service
public class SmsServiceImpl implements SmsService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    // Redis中验证码的key前缀
    private static final String CODE_PREFIX = "sms:code:";
    // 验证码有效期(5分钟)
    private static final long CODE_EXPIRE_TIME = 5;

    @Override
    public String sendCode(String phone) {
        // 生成6位数字验证码
        String code = CodeUtil.generateCode();

        // 存储到Redis,有效期5分钟
        String key = CODE_PREFIX + phone;
        redisTemplate.opsForValue().set(key, code, CODE_EXPIRE_TIME, TimeUnit.MINUTES);

        // 模拟发送短信(实际项目中这里应该调用短信服务商API)
        log.info("==============================================");
        log.info("【模拟短信】手机号: {}", phone);
        log.info("【模拟短信】验证码: {}", code);
        log.info("【模拟短信】有效期: {} 分钟", CODE_EXPIRE_TIME);
        log.info("==============================================");

        // 注意: 实际项目中不应该返回验证码,这里仅用于开发测试
        return code;
    }

    @Override
    public boolean verifyCode(String phone, String code) {
        String key = CODE_PREFIX + phone;
        String savedCode = redisTemplate.opsForValue().get(key);

        if (savedCode == null) {
            log.warn("验证码已过期或不存在, 手机号: {}", phone);
            return false;
        }

        boolean isValid = savedCode.equals(code);

        if (isValid) {
            // 验证成功后删除验证码(防止重复使用)
            redisTemplate.delete(key);
            log.info("验证码验证成功, 手机号: {}", phone);
        } else {
            log.warn("验证码错误, 手机号: {}, 输入: {}, 正确: {}", phone, code, savedCode);
        }

        return isValid;
    }
}
