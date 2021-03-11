package com.comfunny.blog.system.menu;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MenuService {

    private final MenuRepository menuRepository;

    @Autowired
    private MenuDao menuDao;

    @Transactional(readOnly = true)
    public List<Map<String, Object>> findAlldesc() throws Exception{
        return menuDao.list();
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> systemList() throws Exception{

        //관리자메뉴만
        Map<String,Object> map = new HashMap<String, Object>();
        map.put("menuCd", 3);
        return menuDao.systemList(map);
    }

    @Transactional
    public void save(List<MenuSaveRequestDto> list){
        for(MenuSaveRequestDto dto : list){
            String flag = (String)dto.getFlag();
            if(flag.equals("INSERT")){
                Long menuSeq = menuRepository.findMaxMaster();
                menuRepository.insertMaster(menuSeq, dto.getMenuParentSeq(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());
            }else if(flag.equals("UPDATE") || flag.equals("DELETE")){
                int cnt = menuRepository.findRow(dto.getMenuSeq());
                if(cnt == 0 ) new IllegalArgumentException("해당 게시글이 없습니다. id = " + dto.getMenuSeq());

                menuRepository.saveRow(dto.getMenuSeq(), dto.getMenuParentSeq(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());

//                menu.Update(dto.getMenuParentSeq(), dto.getMenuLev(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());

            }else{

                new IllegalArgumentException("해당 게시글이 없습니다. id = " + dto.getMenuSeq());
            }

        }
    }


}
