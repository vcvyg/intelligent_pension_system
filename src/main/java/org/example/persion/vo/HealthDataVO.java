package org.example.persion.vo;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 健康数据VO
 */
@Data
public class HealthDataVO {

    private Long id;

    private Long elderlyId;

    private String elderlyName; // 老人姓名(关联查询)

    private BigDecimal heartRate;

    private BigDecimal bloodPressureHigh;

    private BigDecimal bloodPressureLow;

    private BigDecimal temperature;

    private BigDecimal bloodSugar;

    private Integer sleepDuration;

    private Integer steps;

    private LocalDateTime measureTime;

    private String deviceId;

    private LocalDateTime createTime;
}
