package org.example.persion.controller.family;

import org.example.persion.common.Result;
import org.springframework.web.bind.annotation.*;

/**
 * 子女端 - 健康监测控制器
 */
@RestController
@RequestMapping("/api/family/health")
public class FamilyHealthController {

    @GetMapping("/test")
    public Result<String> test() {
        return Result.success("子女端接口测试成功");
    }
}
