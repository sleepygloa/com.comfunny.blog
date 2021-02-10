package com.comfunny.blog.system.message;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MessageDao {

    public List<Map<String, Object>> list(Map<String,Object> map) throws Exception;

}
