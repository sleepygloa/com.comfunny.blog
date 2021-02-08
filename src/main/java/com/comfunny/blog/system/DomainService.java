//package com.comfunny.blog.system;
//
//
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpSession;
//
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.springframework.stereotype.Service;
//
//
//import paragon.core.mvc.stereotype.ParagonService;
//import paragon.core.paramaters.Params;
//import paragon.core.paramaters.ParamsFactory;
//import paragon.core.paramaters.datatable.DataTable;
//import paragon.core.paramaters.datatable.datarow.DataRow;
//import paragon.core.utility.common.DomainUtil;
//
//@Service
//public class DomainService extends ParagonService {
//
//	private static final Log LOG = LogFactory.getLog(DomainService.class);
//
//	public Params listDomain(Params inParams) {
//		return getSqlManager().selectGridParams("DomainService.listDomain",inParams);
//	}
//
//	public Params listDomainManager(Params inParams) {
//		LOG.debug("listDomainManager "+ inParams);
//		return getSqlManager().selectGridParams("DomainService.listDomainManager",inParams);
//	}
//
//	public DataTable getDomainNameList(Params inParams) {
//		return getSqlManager().selectDataTable("DomainService.getDomainNameList",inParams);
//	}
//
//	public Params saveDomain(Params inParams, HttpSession session) {
//
//		Params outParams = ParamsFactory.createParams(inParams);
//		int cnt = 0;
//
//		for(DataRow dr: inParams.getDataTable("dt_domain")){
//
//			LOG.debug("inParams dr: " + dr.toString());
//			String modFlag = (String) dr.getString("modFlag");
//			dr.setParam("s_companyCd", inParams.getParam("s_companyCd"));
//			dr.setParam("s_userId", inParams.getParam("s_userId"));
//
//			if(modFlag.equals("INSERT")){
//				cnt +=  getSqlManager().insert("DomainService.insertDomain",dr);
//			}else if(modFlag.equals("UPDATE")){
//				cnt +=  getSqlManager().update("DomainService.updateDomain",dr);
//			}
//
//		}
//
//		if(!outParams.getStsCd().equals("999")){
//			outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{cnt});
//		}
//
//		//도메인 리로딩
//		reloadDomain(session);
//		return outParams;
//
//	}
//
//	public Params getColunmToDomain(Params inParams) {
//		List<String> list = getSqlManager().selectList("DomainService.getColunmToDomain",inParams);
//		LOG.debug("list : " + list.toString());
//		inParams.setParam("colNames",list);
//		return inParams;
//	}
//
//    /**
//     * 도메인 삭제
//     *
//     * @Author jhlee
//     * @Date 2018. 2. 05.
//     */
//    public Params deleteDomain(Params inParams, HttpSession session){
//        Params outParams = ParamsFactory.createParams(inParams);
//        int cnt = 0;
//        for(DataRow dr: inParams.getDataTable("dt_domain")){
//
//            dr.setParam("s_companyCd", inParams.getParam("s_companyCd"));
//                cnt += getSqlManager().delete("DomainService.deleteDomain", dr);
//
//        }
//        if(!outParams.getStsCd().equals("999")){
//            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_SUC_007", new Object[]{cnt});
//        }
//		//도메인 리로딩
//        reloadDomain(session);
//        outParams.setStsCd(200);
//        outParams.setMsgCd("MSG_COM_SUC_009"); //성공적으로 처리되었습니다.
//
//        return outParams;
//    }
//
//    public void reloadDomain(HttpSession session){
//    	DomainUtil du = new DomainUtil();
//    	du.setHttpSession(session);
//		//도메인 리로딩
//		du.reload();
//    }
//
//
//    //쿼리결과의 첫번째 행을 이용해, 도메인을 이용한 라벨 도메인변환
//    public Params getLabelToDomain(Params inParams){
//    	Params outParams = inParams;
//        //범례 및 막대 툴팁에 사용되는 명(라벨) 에 대해서 도메인 처리
//        //데이터가 있을때, 첫번째로우의 key, value를 가져와 key 에 대한 도메인 검색
//        //검색 후 조회된 데이터 에 대해서 Map 형식으로 변환
//        //Map 형식의 데이터를 OutParams 으로 return
//        //return 된 데이터는 화면에서 조회 후, 없으면 한글명 기본값으로 지정하여 입력.
//        DataTable dt = inParams.getDataTable("dt_grid");
//        if(dt.size() > 0){
//    		String in 		= "";
//
//    		inParams.setParam("labels", dt.get(0));
//    		Map<String, String> labelList = (Map<String, String>)inParams.getParam("labels");
//
//    		int labelCnt = 0;
//    		//쿼리에서 사용할 동적문자열 선언.
//    		for(String str : labelList.keySet()){
//    			if(labelCnt != 0){
//    				in 		+= ", ";
//    			}
//    			in 		+= "'" + str + "'";
//    			labelCnt++;
//    		}
//    		inParams.setParam("IN", 	in);
//
//    		outParams = getSqlManager().selectGridParams("dt_label","DomainService.listLabelDomain", inParams);
//
//    		//DataTable labels 를 Map 형식으로 변경
//    		for(DataRow dr : outParams.getDataTable("dt_label")){
//    			inParams.setParam(dr.getString("DOMAIN_ID"), dr.getString("DOMAIN_NM"));
//    		}
//
//        }
//		return inParams;
//
//    }
//}
