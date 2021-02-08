package com.comfunny.blog.system.domain;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface DomainDao {

    public List<Map<String, Object>> list(Map<String,Object> map) throws Exception;

}
