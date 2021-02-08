//package com.comfunny.blog.system;
//
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import paragon.core.paramaters.Params;
//import paragon.core.paramaters.datatable.DataTable;
//import paragon.core.paramaters.datatable.datarow.DataRow;
//import paragon.core.utility.common.DomainUtil;
//import vertexid.paragon.settings.svce.AuthService;
//
//@Controller
//@RequestMapping("/ctrl/settings/system/auth")
//public class AuthController {
//
//	private static final Log LOG = LogFactory.getLog(AuthController.class);
//
//	@Autowired
//	private AuthService authService;
//
//	/**
//	 * 권한관리 화면 이동
//	 * @Author Kim
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping
//	public String pgMove() {
//		return "settings/system/system_auth";
//	}
//	/**
//	 * 권한 Popup 화면 이동
//	 * @Author Kim
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping("/savePopup")
//	public String savePopupPgMove() {
//		return "settings/system/system_auth_save";
//	}
//
//	/**
//	 * 메뉴별 권한 항목 조회
//	 * @Author Kim
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping("/listMenuAuth")
//	public Params listMenuAuth(Params inParams) {
//		return authService.getMenuAuthList(inParams);
//	}
//	/**
//	 * 동적 권한생성 기능으로 컬럼값을 공통코드에서 조회
//	 * @Author "Kim Jin Ho"
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping("/listAuthColumns")
//	public Params listAuthColumns(Params inParams) {
//
//
//		Map<String,String> map = DomainUtil.getDomainMap(inParams.getString("s_language"));
//
//		//동적 paragon-grid에서 넘어오 컬럼 조회
//		List<String> list = new ArrayList<String>();
////		List<String> listId = new ArrayList<String>();
//		for(DataRow dr : inParams.getDataTable("dt_colnames")){
//			String key = dr.getString("colname");
//
//			String lagColunm = key;
//			if(map.containsKey(key)){
//				lagColunm = map.get(key);
//			}
//			list.add(lagColunm);
//			LOG.debug("lagColunm = "+ lagColunm);
//		}
////		for(String val : inParams.getStrListParam("columnIds")){
////
////			String lagColunm = val;
////			if(map.containsKey(val)){
////				lagColunm = map.get(val);
////			}
////			listId.add(lagColunm);
////		}
//		//동적 생성 컬럼조회
//		Params outParams =authService.getLangAuthColumns(inParams);
//
//		for(DataRow dr : outParams.getDataTable("customModel")){
//			String key = dr.getString("CODE_CD");
//
//			String lagColunm = key;
//			if(map.containsKey(key)){
//				lagColunm = map.get(key);
//			}
//			list.add(lagColunm);
//			LOG.debug("lagColunm2 = "+ lagColunm);
//		}
//		outParams.setParam("colNames",list);
//		return outParams;
//	}
//
//	/**
//	 * 권한목록조회
//	 * @Author "Kim Jin Ho"
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping("/listAuthGroup")
//	public DataTable listAuthGroup(Params inParams) {
//		return authService.getAuthGroupList(inParams);
//	}
//	/**
//	 * 권한사용자 조회
//	 * @Author "Kim Jin Ho"
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping("/listAuthUser")
//	public DataTable listAuthUser(Params inParams) {
//		return authService.getAuthUserList(inParams);
//	}
//	/**
//	 * 사용자 검색
//	 * @Author "Kim Jin Ho"
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping("/listAuthSearchUser")
//	public DataTable listAuthSearchUser(Params inParams) {
//		return authService.getAuthSearchUserList(inParams);
//	}
//	/**
//	 * 권함그룹 상세정보 조회
//	 * @Author"Kim Jin Ho"
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping("/viewAuthGroup")
//	public Params viewAuthGroup(Params inParams) {
//		LOG.debug(inParams);
//		return authService.getAuthGroupView(inParams);
//	}
//
//	/**
//	 * 권한그룹 저장
//	 * @Author "Kim Jin Ho"
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping("/saveAuthGroup")
//	public Params saveAuthGroup(Params inParams) {
//		return authService.saveAuthGroup(inParams);
//	}
//	/**
//	 * 권한메뉴 저장
//	 * @Author "Kim Jin Ho"
//	 * @Date 2016. 11. 21.
//	 */
//	@RequestMapping("/saveMenuAuth")
//	public Params saveMenuAuth(Params inParams) {
//		return authService.saveMenuAuth(inParams);
//	}
//	/**
//	 * 사용자 프로그램별 버튼 권한체크 목록조회
//	 * @Author "Kim Jin Ho"
//	 * @Date 2016. 12. 1.
//	*/
//	@RequestMapping("/listCheckAuth")
//	public Params checkAuth(Params inParams) {
//		Map<String,String> map = DomainUtil.getDomainMap(inParams.getString("s_language"));
//		List<Map<String,String>> list = new ArrayList<Map<String,String>>();
//		for(DataRow dr : inParams.getDataTable("dt_domainid")){
//			String key = dr.getString("colname");
//			String lagColunm = "";
//			Map<String,String> nameMap = new HashMap<String, String>();
//
//			if(map.containsKey(key)){
//				lagColunm = map.get(key);
//			}
//			nameMap.put("lang_key", key);
//			nameMap.put("lang_text", lagColunm);
//			list.add(nameMap);
//		}
//		Params outParams = authService.getAuthCheckList(inParams);
//		outParams.setParam("dt_domainname",list);
//		return outParams;
//	}
//}
