package org.example.persion.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

/**
 * 健康数据上报DTO
 */
@Data
public class HealthDataDTO {

    @NotNull(message = "老人ID不能为空")
    private Long elderlyId;

    private BigDecimal heartRate; // 心率

    private BigDecimal bloodPressureHigh; // 收缩压

    private BigDecimal bloodPressureLow; // 舒张压

    private BigDecimal temperature; // 体温

    private BigDecimal bloodSugar; // 血糖

    private Integer sleepDuration; // 睡眠时长(分钟)

    private Integer steps; // 步数

    private String deviceId; // 设备ID
}
