package com.comfunny.blog.system.code;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class CodeRestController {

    private final CodeService codeService;

    @GetMapping("/system/code/list")
    public List<Map<String, Object>> list(@RequestParam Map<String, Object> map)throws Exception{
        return codeService.list(map);
    }

    @GetMapping("/system/code/listCode")
    public List<Map<String, Object>> listCode(@RequestParam Map<String, Object> map)throws Exception{
        return codeService.listCode(map);
    }

    //화면 공통
    //콤보박스
	@GetMapping("/system/code/listCodeGroupComboJson")
	public List<Map<String, Object>> listCodeGroupComboJson(@RequestParam Map<String, Object> map) throws Exception{
		return  codeService.getCodeGroupComboList(map);
	}


	//코드관리 그룹 저장
	@RequestMapping("/saveCodeGroup")
	public void saveCodeGroup(@RequestParam List<Map<String, Object>> list) throws Exception {
		codeService.saveCodeGroup(list);
	}
//
//	//코드관리 그룹 삭제
//    @RequestMapping("/deleteCodeGroup")
//    public List<Map<String, Object>> deleteCodeGroup(List<Map<String, Object>> inParams) {
//        return codeService.deleteCodeGroup(inParams);
//    }
//    	//코드관리 공통코드 저장
//	@RequestMapping("/saveCode")
//	public List<Map<String, Object>> saveCode(List<Map<String, Object>> inParams){
//		return codeService.saveCode(inParams);
//	}
//
//	//코드관리 공통코드 삭제
//    @RequestMapping("/deleteCode")
//    public List<Map<String, Object>> deleteCode(List<Map<String, Object>> inParams){
//        return codeService.deleteCode(inParams);
//    }

}
