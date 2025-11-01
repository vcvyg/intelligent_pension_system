package org.example.persion.controller.admin;

import org.example.persion.common.Result;
import org.springframework.web.bind.annotation.*;

/**
 * 管理端 - 用户管理控制器
 */
@RestController
@RequestMapping("/api/admin/user")
public class AdminUserController {

    @GetMapping("/test")
    public Result<String> test() {
        return Result.success("管理端接口测试成功");
    }
}
