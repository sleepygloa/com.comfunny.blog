package com.comfunny.blog.blog.dto;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BlogDao {
//
//    @Autowired
//    private SqlSession sqlsession;

    public List<Map<String, Object>> list() ;

    public List<Map<String, Object>> listRe(Long idx) ;

    public List<Map<String, Object>> listReChild(Long idx, Long ref) ;

}
