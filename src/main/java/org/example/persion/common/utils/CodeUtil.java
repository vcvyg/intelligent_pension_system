package org.example.persion.common.utils;

import java.util.Random;

/**
 * 验证码工具类
 */
public class CodeUtil {

    private static final Random RANDOM = new Random();

    /**
     * 生成6位数字验证码
     */
    public static String generateCode() {
        int code = RANDOM.nextInt(900000) + 100000; // 生成100000-999999的随机数
        return String.valueOf(code);
    }

    /**
     * 生成指定位数的数字验证码
     */
    public static String generateCode(int length) {
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < length; i++) {
            code.append(RANDOM.nextInt(10));
        }
        return code.toString();
    }
}
