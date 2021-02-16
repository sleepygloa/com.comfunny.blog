package com.comfunny.blog.system.common;


import com.comfunny.blog.system.code.CodeService;
import com.comfunny.blog.system.domain.DomainService;
import com.comfunny.blog.system.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class CommonRestController {

    private final DomainService domainService;

    private final CodeService codeService;

    private final MessageService messageService;

    @GetMapping("/system/common/alert")
    public Map<String, Object> alert(@RequestParam Map<String,Object> map)throws Exception{

        String addMsg = null;
        addMsg = (String)map.get("addMsg");
        String codeGroupCd = null;
        codeGroupCd = (String)map.get("codeGroupCd");
        Boolean flag = false;
        Map<String, Object> row = new HashMap<String, Object>();

        if(codeGroupCd != null){
            try{
                row = codeService.getCommCodeName(map);
                String commCodeName = (String)row.get("NAME");
                //outParams.setMsgLangCd(inParams.getString("s_language"), inParams.getMsgCd(), new String[]{commCodeName});
            }catch (Exception e){
                flag = true;
            }
//        }else if(addMsg != null){
//            try{
//                outParams.setMsgLangCd(inParams.getString("s_language"), inParams.getMsgCd(), new String[]{addMsg});
//            }catch (Exception e){
//                flag = true;
//            }
        }else{
            try {
//                outParams.setMsgLangCd(inParams.getString("s_language"), (String)map.get("msgCd"));
                row.put("s_language", "ko");
                row.put("msgCd", (String)map.get("msgCd"));
                row.put("msgTxt", messageService.setMsgLangCd(row).get("MSG_TXT"));


            } catch (Exception e) {
                flag = true;
            }
        }
        if(flag){
//            outParams.setStsCd(100);
//            outParams.setMsgCd("MSG_COM_ERR_001");
//            return outParams;
        }

//        outParams.setStsCd(200);
//        return outParams;
        row.put("stsCd", 100);
        return row;
//        return domainService.list(map);
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
