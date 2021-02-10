//package com.comfunny.blog.system;
//
//
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.transaction.interceptor.TransactionAspectSupport;
//
//import paragon.core.mvc.stereotype.ParagonService;
//import paragon.core.paramaters.Params;
//import paragon.core.paramaters.ParamsFactory;
//import paragon.core.paramaters.datatable.DataTable;
//import paragon.core.paramaters.datatable.datarow.DataRow;
//
//@Service
//public class CodeService extends ParagonService {
//
//	private static final Log LOG = LogFactory.getLog(CodeService.class);
//
//	/**
//	 * 코드관리 헤더그리드 조회(그룹 목록)
//	 * */
//	public Params getGodeGroupGridList(Params inParams) {
//		return getSqlManager().selectGridParams("CodeService.getCodeGroupList",inParams);
//	}
//
//	/**
//	 * 코드관리 상세그리드 조회(공통코드 목록)
//	 * */
//	public Params getGodeGridList(Params inParams) {
//		return getSqlManager().selectGridParams("CodeService.getCodeList",inParams);
//	}
//
//	/**
//	 * 삭제 검토
//	 * 기능 : inParams 의 세션 데이터를 data table 내 row 에 값을 저장함.
//	 * 삭제 검토 이유 : requestParameter 에서 (client -> application) 할 때 세션값을 datarow에 저장함.
//	 * */
//	private DataTable getSessionInDt(Params inParams){
//
//	    /* 데이터 중복확인 */
//        DataTable dt = inParams.getDataTable("dt_data");
//
//        String s_companyCd = inParams.getString("s_companyCd");
//        String s_userId = inParams.getString("s_userId");
//
//        for(DataRow dr: dt){
//            dr.setParam("s_companyCd", s_companyCd);
//            dr.setParam("s_userId", s_userId);
//        }
//	    return dt;
//	}
//
//	/**
//	 * 코드관리 그룹 저장
//	 * */
//	@Transactional(rollbackFor=Exception.class)
//	public Params saveCodeGroup(Params inParams) {
//	    LOG.debug("saveCodeGroup inParams : " + inParams);
//		Params outParams = ParamsFactory.createOutParams(inParams);
//
//		//세션 -> DataRow 값 저장
//		DataTable dt = getSessionInDt(inParams);
//		inParams.setDataTable("dt_data", dt);
//
//		//중복값체크
////        Map<String, Object> map = getSqlManager().selectOne("CodeService.getCodeGroupDataCheck", inParams);
////        int dupCnt = Integer.parseInt(map.get("COUNT").toString());
////        if(dupCnt != 0) {
////            outParams.setStsCd(400);
////            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_ERR_072", new Object[]{map.get("COUNT")});
////            return outParams;
////        }
//
//		int cnt = 0;
//		for(DataRow dr: dt){
//
//			String modFlag = (String) dr.getString("modFlag");
//
//	         try{
//	             if(modFlag.equals("INSERT")){
//	                 cnt +=  getSqlManager().insert("CodeService.insertCodeGroup", dr);
//	             }else if(modFlag.equals("UPDATE")){
//	                 cnt +=  getSqlManager().update("CodeService.updateCodeGroup", dr);
//	             }
//            }catch(Exception e){
//                outParams.setStsCd(100);
//                outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_ERR_015");
//                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
//                return outParams;
//            }
//		}
//		outParams.setStsCd(200);
//		outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_SUC_019");
//		return outParams;
//	}
//
//	/**
//	 * 코드관리 그룹 삭제
//	 * */
//	@Transactional(rollbackFor=Exception.class)
//	public Params deleteCodeGroup(Params inParams) {
//        LOG.debug("deleteCodeGroup inParams :"+inParams);
//        Params outParams = ParamsFactory.createOutParams(inParams);
//
//        DataTable dt = getSessionInDt(inParams);
//
//        int cnt = 0;
//        for(DataRow dr: dt){
//
//            String modFlag = (String) dr.getString("modFlag");
//            try{
//                if(modFlag.equals("DELETE")){
//                    cnt +=  getSqlManager().delete("CodeService.deleteCodeGroup",dr);
//                }
//            }catch(Exception e){
//                outParams.setStsCd(100);
//                outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_ERR_015");
//                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
//                return outParams;
//            }
//
//        }
//        outParams.setStsCd(200);
//        outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_SUC_019");
//        return outParams;
//    }
//
//	/**
//	 * 코드관리 공통코드 저장
//	 * */
//	@Transactional(rollbackFor=Exception.class)
//	public Params saveCode(Params inParams){
//	    LOG.debug("saveCode inParams : "+ inParams);
//		Params outParams = ParamsFactory.createOutParams(inParams);
//
//        //세션 -> DataRow 값 저장
//        DataTable dt = getSessionInDt(inParams);
//        inParams.setDataTable("dt_data", dt);
//
//
//		inParams.setParam("codeGroupCd", dt.get(0).getString("codeGroupCd"));
//
//		LOG.debug(dt.get(0).getString("codeGroupCd"));
//		LOG.debug(inParams);
//
//        //중복값체크
////        Map<String, Object> map = getSqlManager().selectOne("CodeService.getCodeDataCheck", inParams);
////        int dupCnt = Integer.parseInt(map.get("COUNT").toString());
////        if(dupCnt != 0) {
////            outParams.setStsCd(400);
////            outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_ERR_072", new Object[]{map.get("COUNT")});
////            return outParams;
////        }
//
//		int cnt = 0;
//		for(DataRow dr: dt){
//			String modFlag = (String)dr.getString("modFlag");
//
//			try{
//			    if(modFlag.equals("INSERT")){
//			        cnt += getSqlManager().insert("CodeService.insertCode",dr);
//			    }else if(modFlag.equals("UPDATE")){
//			        cnt += getSqlManager().update("CodeService.updateCode",dr);
//			    }
//			}catch(Exception e){
//			    outParams.setStsCd(100);
//			    outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_ERR_015");
//			    TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
//			    return outParams;
//			}
//		}
//		outParams.setStsCd(200);
//		outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_SUC_019");
//		return outParams;
//	}
//
//	/**
//	 * 코드관리 공통코드 삭제
//	 */
//	@Transactional(rollbackFor=Exception.class)
//	public Params deleteCode(Params inParams){
//       LOG.debug("deleteCode inParams : "+ inParams);
//        Params outParams = ParamsFactory.createOutParams(inParams);
//
//        DataTable dt = getSessionInDt(inParams);
//
//        int cnt = 0;
//        for(DataRow dr: dt){
//            String modFlag = (String) dr.getString("modFlag");
//
//            try{
//                if(modFlag.equals("DELETE")){
//                    cnt +=  getSqlManager().delete("CodeService.deleteCode",dr);
//                }
//            }catch(Exception e){
//                outParams.setStsCd(100);
//                outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_ERR_015");
//                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
//                return outParams;
//            }
//
//        }
//        outParams.setStsCd(200);
//        outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_SUC_019");
//        return outParams;
//    }
//
//	/**
//	 * [공통] 모든화면에서 사용하는 콤보박스 의 값 조회
//	 * */
//	public DataTable getCodeGroupComboList(Params inParams) {
//		return getSqlManager().selectDataTable("CodeService.getCodeGroupComboList",inParams);
//	}
//
//	/**
//	 * [공통] LOC TYPE 을 이용한 콤보박스 조회
//	 * */
//	public DataTable getCodeGroupComboLoctype(Params inParams) {
//		return getSqlManager().selectDataTable("CodeService.getCodeGroupComboLoctype",inParams);
//	}
//
//	/**
//	 * [공통] 모든화면에서 사용하는 콤보박스의 값 조회
//	 *        범위를 지정해서 조회함.
//	 * */
//	public DataTable listCodeGroupRangeSelect(Params inParams) {
//		return getSqlManager().selectDataTable("CodeService.listCodeGroupRangeSelect",inParams);
//	}
//
//	/**
//	 * [공통] 모든화면에서 사용하는 콤보박스의 값 조회
//	 *        값 예시 : CODE_DESC (CODE_NM)
//	 * */
//	public DataTable listCodeGroupComboJsonNmDesc(Params inParams) {
//		return getSqlManager().selectDataTable("CodeService.listCodeGroupComboJsonNmDesc",inParams);
//	}
//
//
//
//	//아래는 확인해야함
//	public DataTable getCodeGroupNameList(Params p) {
//		return getSqlManager().selectDataTable("CodeService.getCodeGroupNameList",p);
//	}
//
//	public DataTable getCodeNameList(Params p) {
//		return getSqlManager().selectDataTable("CodeService.getCodeNameList",p);
//	}
//
//	public Params getCommCodeName(Params inParams) {
//		return getSqlManager().selectGridParams("CodeService.getCommCodeName",inParams);
//	}
//
//   /**
//    * [기능] 코드그룹, 코드로 코드명 반환
//    * 1개만 반환.
//    * */
//	public Params getCodeName(Params inParams) {
//		return getSqlManager().selectGridParams("CodeService.getCodeName",inParams);
//	}
//
//
//
//
//
//}
