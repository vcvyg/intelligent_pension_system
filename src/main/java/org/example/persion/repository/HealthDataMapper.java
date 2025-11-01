package org.example.persion.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.example.persion.entity.HealthData;

/**
 * 健康数据数据访问接口
 */
@Mapper
public interface HealthDataMapper extends BaseMapper<HealthData> {
}
