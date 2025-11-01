package org.example.persion.controller.medical;

import org.example.persion.common.Result;
import org.springframework.web.bind.annotation.*;

/**
 * 医护端 - 健康档案控制器
 */
@RestController
@RequestMapping("/api/medical/record")
public class MedicalRecordController {

    @GetMapping("/test")
    public Result<String> test() {
        return Result.success("医护端接口测试成功");
    }
}
