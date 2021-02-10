package com.comfunny.blog.system.message;


import com.comfunny.blog.system.code.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class MessageRestController {

    private final MessageService codeService;

    @GetMapping("/system/message/list")
    public List<Map<String, Object>> list(Map<String,Object> map)throws Exception{
        return codeService.list(map);
    }



//    //화면 공통
//    //콤보박스
//	@GetMapping("/system/code/listCodeGroupComboJson")
//	public List<Map<String, Object>> listCodeGroupComboJson(@RequestParam Map<String, Object> map) throws Exception{
//		return  codeService.getCodeGroupComboList(map);
//	}

//
//	//코드관리 그룹 저장
//	@RequestMapping("/saveCodeGroup")
//	public List<Map<String, Object>> saveCodeGroup(List<Map<String, Object>> inParams) {
//		return codeService.saveCodeGroup(inParams);
//	}
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
