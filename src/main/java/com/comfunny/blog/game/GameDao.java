package com.comfunny.blog.game;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface GameDao {
    
    public int findById(int id) throws Exception;

    public int regId(Map<String, Object> map) throws Exception;

    public Map<String, Object> getInitCharacters() throws Exception;

    public Map<String, Object> getInitMonsters() throws Exception;



}
