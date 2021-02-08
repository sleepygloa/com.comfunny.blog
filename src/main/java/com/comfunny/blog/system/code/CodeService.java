package com.comfunny.blog.system.code;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CodeService {

    @Autowired
    private CodeDao codeDao;

    @Transactional(readOnly = true)
    public List<Map<String, Object>> list() throws Exception{
        return codeDao.list();
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> listCode(Map<String, Object> map) throws Exception{
        return codeDao.listCode(map);
    }

	/**
	 * [공통] 모든화면에서 사용하는 콤보박스 의 값 조회
     * getCodeGroupComboList
	 * */
	public List<Map<String, Object>> getCodeGroupComboList(Map<String, Object> map) throws Exception{
		return codeDao.getCodeGroupComboList(map);
	}

//
//    @Transactional(readOnly = true)
//    public List<MenuListResponseDto> findAlldesc(int menuSeq){
//        return menuRepository.findAllDesc(menuSeq).stream()
//                .map(MenuListResponseDto::new)
//                .collect(Collectors.toList());
//    }
//
//    @Transactional
//    public void save(List<MenuSaveRequestDto> list){
//        for(MenuSaveRequestDto dto : list){
//            String flag = (String)dto.getFlag();
//            if(flag.equals("INSERT")){
//                Long menuSeq = menuRepository.findMaxMaster();
//                menuRepository.insertMaster(menuSeq, dto.getMenuParentSeq(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());
//            }else if(flag.equals("UPDATE") || flag.equals("DELETE")){
//                int cnt = menuRepository.findRow(dto.getMenuSeq());
//                if(cnt == 0 ) new IllegalArgumentException("해당 게시글이 없습니다. id = " + dto.getMenuSeq());
//
//                menuRepository.saveRow(dto.getMenuSeq(), dto.getMenuParentSeq(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());
//
////                menu.Update(dto.getMenuParentSeq(), dto.getMenuLev(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());
//
//            }else{
//
//                new IllegalArgumentException("해당 게시글이 없습니다. id = " + dto.getMenuSeq());
//            }
//
//        }
//    }


}
