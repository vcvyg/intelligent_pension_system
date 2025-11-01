package org.example.persion.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.example.persion.entity.ElderlyInfo;

/**
 * 老人信息数据访问接口
 */
@Mapper
public interface ElderlyInfoMapper extends BaseMapper<ElderlyInfo> {
}
