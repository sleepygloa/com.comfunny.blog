//package com.comfunny.blog.system;
//
//
//import java.util.List;
//
//import javax.servlet.http.HttpSession;
//
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import paragon.core.mvc.stereotype.ParagonService;
//import paragon.core.paramaters.Params;
//import paragon.core.paramaters.ParamsFactory;
//import paragon.core.paramaters.datatable.DataTable;
//import paragon.core.paramaters.datatable.datarow.DataRow;
//import paragon.core.utility.common.DomainUtil;
//
//@Service
//public class MessageService extends ParagonService {
//
//	private static final Log LOG = LogFactory.getLog(MessageService.class);
//
//	@Autowired
//	private CodeService codeService;
//
//	public Params listMessageData(HttpSession session, Params inParams) {
//		LOG.debug("listMessageData inParams : " + inParams);
//
//    	DomainUtil du = new DomainUtil();
//    	du.setHttpSession(session);
//		//도메인 리로딩
//		du.reload();
//
//		return getSqlManager().selectGridParams("MessageService.listMessageData", inParams);
//	}
//
//	public DataTable getMessageLangCode(HttpSession session, Params inParams) {
//		LOG.debug("getMessageLangCode inParams : " + inParams);
//
//    	DomainUtil du = new DomainUtil();
//    	du.setHttpSession(session);
//		//도메인 리로딩
//		du.reload();
//
//		Params outParams = codeService.getCodeName(inParams);
//		DataTable dt = outParams.getDataTable("dt_grid");
//		LOG.debug("getMessageLangCode suceess");
//		return dt;
//	}
//
//	/**
//	 * [수정] 수정 및 미등록 데이터신규추가
//	 * */
//	public Params updateMessage(HttpSession session, Params inParams){
//		LOG.debug("updateMessage inParams : " + inParams);
//		Params outParams = ParamsFactory.createParams(inParams);
//
//		List<String> dList = ((List<String>)(inParams.getParam("arr")));
//		int dCnt = dList.size();
//		DataTable dt = inParams.getDataTable("dt_data");
//
//		int j = 0;
//		for(DataRow dr : dt){
//			for(int i = 0; i < dCnt; i++){
//				dr.setParam("langCd", dList.get(i));
//				dr.setParam("msgTxt", dr.getString(dList.get(i)));
//				LOG.debug(j);
//				int cnt = 0;
//				cnt = getSqlManager().selectOne("MessageService.checkMessageCount", dr);
//
//				try{
//					if(cnt == 1){
//						getSqlManager().update("MessageService.updateMessage", dr);
//					}else if(cnt == 0){
//						getSqlManager().insert("MessageService.insertMessage", dr);
//					}else{
//
//					}
//				}catch(RuntimeException re){
//					re.printStackTrace();
//					throw new RuntimeException();
//				}
//				j++;
//			}
//		}
//
//    	DomainUtil du = new DomainUtil();
//    	du.setHttpSession(session);
//		//도메인 리로딩
//		du.reload();
//
//		outParams.setStsCd(200);
//		outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_SUC_003");
//		return outParams;
//	}
//
//}