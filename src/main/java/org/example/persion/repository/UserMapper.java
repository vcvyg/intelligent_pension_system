package org.example.persion.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.example.persion.entity.User;

/**
 * 用户数据访问接口
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
