package com.comfunny.blog.system.code;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Mapper
public interface CodeDao {
//
//    @Autowired
//    private SqlSession sqlsession;

    public List<Map<String, Object>> list() throws Exception;

    public List<Map<String, Object>> listCode(Map<String, Object> map) throws Exception;

    public List<Map<String, Object>> getCodeGroupComboList(Map<String, Object> map) throws Exception;

    public Map<String, Object> getCommCodeName(Map<String, Object> map) throws Exception;

//    public List<Map<String, Object>> list(){
//        return this.sqlsession.selectList("CodeDao.list");
//    }
//
//    public List<Map<String, Object>> listCode(){
//        return this.sqlsession.selectList("listCode");
//    }
}
