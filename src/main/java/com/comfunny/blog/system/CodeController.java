//package com.comfunny.blog.system;
//
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import paragon.core.paramaters.Params;
//import paragon.core.paramaters.datatable.DataTable;
//import vertexid.paragon.settings.svce.CodeService;
//
//@Controller
//@RequestMapping("/ctrl/settings/system/code")
//public class CodeController {
//
//
//	@Autowired
//	private CodeService codeService;
//
//	//코드관리 화면이동
//	@RequestMapping
//	public String listCommmonCodePgMove() {
//		return "settings/system/system_code";
//	}
//
//
//    //자동완성?
//    //코드그룹 이름 조회
//	@RequestMapping("/listCodeGroupNames")
//	public DataTable listCodeGroupNames(Params inParams) {
//		return  codeService.getCodeGroupNameList(inParams);
//	}
//

//
//    //자동완성
//    //코드명 조회
//	@RequestMapping("/listCodeNames")
//	public DataTable listCodeNames(Params inParams) {
//		return  codeService.getCodeNameList(inParams);
//	}
//
//	//////////////////////////////////////공통////////////////////////////////////
//	//화면마다 공통으로 사용함.
//
//	//콤보박스
//	@RequestMapping("/listCodeGroupComboJson")
//	public DataTable listCodeGroupComboJson(Params inParams) {
//		return  codeService.getCodeGroupComboList(inParams);
//	}
//
//	//콤보박스
//	//LOC TYPE 조회 공통
//	@RequestMapping("/loctypeCodeGroupComboJson")
//	public DataTable loctypeCodeGroupComboJson(Params inParams) {
//		return  codeService.getCodeGroupComboLoctype(inParams);
//	}
//
//	//콤보박스
//	//범위를 지정하여 콤보박스 조회.
//	@RequestMapping("/listCodeGroupRangeSelect")
//	public DataTable listCodeGroupRangeSelect(Params inParams) {
//		return  codeService.listCodeGroupRangeSelect(inParams);
//	}
//
//
//	//공통코드 VALUE : CODE_NM, NAME :CODE_NM || CODE_DESC
//	//표현되는 명은 CODE_DESC (CODE_NM)
//	@RequestMapping("/listCodeGroupComboJsonNmDesc")
//	public DataTable listCodeGroupComboJsonNmDesc(Params inParams) {
//		return  codeService.listCodeGroupComboJsonNmDesc(inParams);
//	}
//
//}
