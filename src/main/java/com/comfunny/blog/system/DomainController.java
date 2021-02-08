//package com.comfunny.blog.system;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpSession;
//
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import paragon.core.paramaters.CommParams;
//import paragon.core.paramaters.Params;
//import paragon.core.paramaters.datatable.datarow.DataRow;
//import paragon.core.utility.common.DomainUtil;
//import vertexid.paragon.settings.svce.DomainService;
//
//@Controller
//@RequestMapping("/ctrl/settings/system/domain")
//public class DomainController {
//
//	private static final Log LOG = LogFactory.getLog(DomainController.class);
//
//	@Autowired
//	private DomainService domainService;
//
//	@RequestMapping
//	public String listDomainPgMove() {
//		return "settings/system/system_domain";
//	}
//
//	/**
//	 * [기능] 도메인 그리드 조회
//	 * */
//	@RequestMapping("/listDomain")
//	public Params listDomain(Params inParams) {
//		return domainService.listDomain(inParams);
//	}
//
//	/**
//	 * [기능] 도메인 관리자 그리드 조회
//	 * */
//	@RequestMapping("/listDomainManager")
//	public Params listDomainManager(Params inParams) {
//		return domainService.listDomainManager(inParams);
//	}
//
//	/**
//	 * [기능] 도메인 저장
//	 * */
//	@RequestMapping("/saveDomain")
//	public Params saveDomain(Params inParams, HttpSession session) {
//		return domainService.saveDomain(inParams, session);
//	}
//
//	/**
//	 * [기능] (공통)데이터 언어에 맞는 도메인 변경.
//	 * */
//	@RequestMapping("/listColnames")
//	public Params listColnames(Params inParams) {
//		Map<String,String> map = DomainUtil.getDomainMap(inParams.getString("s_language"));
//
//		List<String> list = new ArrayList<String>();
//		for(DataRow dr : inParams.getDataTable("dt_colnames")){
//			String key = dr.getString("colname");
//
//			String lagColunm = key;
//			if(map.containsKey(key)){
//				lagColunm = map.get(key);
//			}
//			list.add(lagColunm);
//		}
//		inParams.setParam("colNames",list);
//
//
//		List<String> columnIds = inParams.getStrListParam("columnIds");
//		List<String> columnNms = new ArrayList<String>();
//		for(String key : columnIds){
////			String key = dr.getString("colname");
//
//			String lagColunm = key;
//			if(map.containsKey(key)){
//				lagColunm = map.get(key);
//			}
//			columnNms.add(lagColunm);
//		}
//		inParams.setParam("columnNms",columnNms);
//
//		List<String> headerIds = inParams.getStrListParam("headerIds");
//
//		Map<String,String> hederNms = new HashMap<String,String>();
//		for(String key : headerIds){
//			String lagColunm = key;
//			if(map.containsKey(key)){
//				lagColunm = map.get(key);
//			}
//			hederNms.put(key, lagColunm);
//		}
//		inParams.setParam("headerNms",hederNms);
//
//
//		String caption = inParams.getString("domainId");
//		if(caption !=null){
//			String lagColunm = "";
//			if(map.containsKey(caption)){
//				lagColunm = map.get(caption);
//			}
//			inParams.setParam("caption",lagColunm);
//			LOG.debug("lagColunm : " + lagColunm);
//		}
//		LOG.debug("caption : " + caption);
//		return inParams;
//		//DB에서 직접조회
////		return domainService.getColunmToDomain(inParams);
//	}
//
//    /**
//     * 도메인 삭제
//     *
//     * @Author jhlee
//     * @Date 2018. 2. 05.
//     */
//    @RequestMapping("/deleteDomain")
//    public Params deleteDistributionCenter(Params inParams, HttpSession session){
//        return domainService.deleteDomain(inParams, session);
//    }
//
//    /**
//     * 도메인 리로드
//     *
//     * @Author kim Seon Ho
//     * @Date 2018. 27. 28.
//     */
//    @RequestMapping("/reloadDomain")
//    public Params reloadDomain(HttpSession session){
//    	domainService.reloadDomain(session);
//    	Params outParams = new CommParams();
//    	outParams.setStsCd(200);
//    	outParams.setMsgCd("MSG_COM_SUC_009");
//
//        return outParams;
//    }
//}
