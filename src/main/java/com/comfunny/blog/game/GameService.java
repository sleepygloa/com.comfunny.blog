package com.comfunny.blog.game;


import com.comfunny.blog.system.menu.MenuDao;
import com.comfunny.blog.system.menu.MenuRepository;
import com.comfunny.blog.system.menu.MenuSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class GameService {

    private final MenuRepository menuRepository;

    @Autowired
    private GameDao gameDao;

    @Transactional(readOnly = true)
    public int findById(int id) throws Exception{
        return gameDao.findById(id);
    }

    @Transactional(readOnly = true)
    public void regId(Map<String, Object> map) throws Exception{
        gameDao.regId(map);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getInitCharacters() throws Exception{
        return gameDao.getInitCharacters();
    }
    @Transactional(readOnly = true)
    public Map<String, Object> getInitMonsters() throws Exception{
        return gameDao.getInitMonsters();
    }
}
