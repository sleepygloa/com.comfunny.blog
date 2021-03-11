package com.comfunny.blog.system.menu;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MenuDao {
    
    
    //전체화면 메뉴 조회
    public List<Map<String, Object>> list() throws Exception;

    //관리자 메뉴 조회
    public List<Map<String, Object>> systemList(Map<String,Object> map) throws Exception;

}
