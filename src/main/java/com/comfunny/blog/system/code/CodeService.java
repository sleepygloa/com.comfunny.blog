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
    public List<Map<String, Object>> list(Map<String, Object> map) throws Exception{
        return codeDao.list(map);
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

    /**
     * [공통] 모든화면에서 사용하는 콤보박스 의 값 조회
     * getCodeGroupComboList
     * */
    public Map<String, Object> getCommCodeName(Map<String, Object> map) throws Exception{
        return codeDao.getCommCodeName(map);
    }

	/**
	 * 코드관리 그룹 저장
	 * */
	@Transactional(rollbackFor=Exception.class)
	public void saveCodeGroup(List<Map<String, Object>> list) throws Exception{
		int cnt = 0;
		for(Map<String, Object> map: list) {

            String modFlag = (String) map.get("modFlag");

            if (modFlag.equals("INSERT")) {
                codeDao.insertCodeGroup(map);
                //	                 cnt +=  getSqlManager().insert("CodeService.insertCodeGroup", dr);
            } else if (modFlag.equals("UPDATE")) {
                codeDao.updateCodeGroup(map);
                //	                 cnt +=  getSqlManager().update("CodeService.updateCodeGroup", dr);
            }else{
                new IllegalArgumentException("해당 게시글이 없습니다. id = " + map.get("codeGroup"));
            }
        }
	}

//
//    @Transactional(readOnly = true)
//    public List<MenuListResponseDto> findAlldesc(int menuSeq){
//        return menuRepository.findAllDesc(menuSeq).stream()
//                .map(MenuListResponseDto::new)
//                .collect(Collectors.toList());
//    }
//

}
