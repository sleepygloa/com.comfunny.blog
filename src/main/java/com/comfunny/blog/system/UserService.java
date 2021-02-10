//package com.comfunny.blog.system;
//
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
//import vertexid.paragon.comm.ctrl.CommonEncryption;
//import vertexid.paragon.comm.util.SHA256;
//
//@Service
//public class UserService extends ParagonService {
//
//	private static final Log LOG = LogFactory.getLog(UserService.class);
//
//	@Autowired
//	private CodeService codeService;
//
//	/**
//	 * [Desc] 사용자관리 그리드 조회
//	 *
//	 *
//	 * */
//	public Params listUserInfo(Params inParams) {
//		LOG.debug("listUserInfo " + inParams);
//		return getSqlManager().selectGridParams("UserService.listUserInfo", inParams);
//	}
//	public Params getUserInfo(Params inParams) {
////	    Params outParams = ParamsFactory.createOutParams(inParams);
////        outParams = getSqlManager().selectParams("data", "UserService.getUserInfo", inParams);
////        outParams.setParam("eKey", inParams.getString("eKey"));
////        if(outParams.getDataTable("data").get(0).getString("USER_PWD") != null) outParams = new CommonEncryption().getDencryUserPwd(outParams);
////        LOG.debug("outParams : "+ outParams);
////		return outParams;
//		return getSqlManager().selectParams("data", "UserService.getUserInfo", inParams);
//	}
//
//
//	public DataTable getCompanyCode(Params inParams) {
//		return getSqlManager().selectDataTable("UserService.getCompanyCode", inParams);
//	}
//
//
//	public Params getCheckUserNo(Params inParams){
//		LOG.debug("UserService CheckUserInfo()");
//		Params outParams = getSqlManager().selectOneParams("UserService.getCheckUserNo", inParams);
//		if(outParams.getParam("USER_NO") != null){
//			outParams.setParam("result", 1);
//		}
//		LOG.debug("outParams:::::"+outParams);
//		return outParams;
//	}
//
//    /**
//     *
//     * [설명] 아이디중복체크
//     *
//     * @Author "-"
//     * @Date 2017. 11. 10.
//     */
//    public Params getCheckUserId(Params inParams){
//        LOG.debug("UserService getCheckUserId()");
//        Params outParams = getSqlManager().selectOneParams("UserService.getCheckUserId", inParams);
//        if(outParams.getParam("USER_ID") != null){
//            inParams.setParam("result", 1);
//        }
//        return inParams;
//    }
//
//    /**
//     * [Desc] 사용자정보 저장
//     * */
//	public Params updateUser(Params inParams, HttpSession session) throws Exception{
//		Params outParams = ParamsFactory.convertParmas(inParams);
//		LOG.debug("updateUser : " + inParams);
//
//	    /** ID, PW 암호화처리 */
//	    CommonEncryption cEncry = new CommonEncryption();
//	    inParams = cEncry.getEncryUserData(inParams, session);
//
//	    if(inParams.getStsCd().equals("100")){
//	    	return outParams;
//	    }
//
//        String modFlag = inParams.getString("flag");
//		int cnt=0;
//
//		//국가코드 조회
//		inParams.setParam("codeGroupCd", "SC0013");
//		inParams.setParam("codeCd", inParams.getString("userLang"));
//
//		Params countryParam = codeService.getCodeName(inParams);
//		String sCountry = countryParam.getDataTable().get(0).getString("CODE_OTHER1");
//		if(sCountry == null){
//			inParams.setStsCd(100);
//			inParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_ERR_095"); //사용자 언어에 맞는 국가코드가 등록되지 않았습니다. 관리자에게 문의하세요.
//		}else{
//			inParams.setParam("userCountry", sCountry);
//		}
//
//
//		try{
//	        if(modFlag.equals("INSERT")){
//
//	    		//Check Duplication ID. 아이디 중복 확인
//	            outParams = getSqlManager().selectOneParams("UserService.getCheckUserId", inParams);
//	            if(outParams.getString("USER_ID") != null){
//	                outParams.setStsCd(100);
//	                outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_ERR_094"); //동일한 아이디가 존재합니다. 다시 확인해주세요
//	            }
//
//	            cnt = getSqlManager().insert("UserService.insertUser",inParams);
//	        }else if(modFlag.equals("UPDATE")){
//	            cnt = getSqlManager().update("UserService.updateUser",inParams);
//	        }
//		}catch(Exception e){
//			LOG.debug(e);
//			outParams.setStsCd(100);
//			outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_ERR_015"); //저장처리중 에러가 발생했습니다.
//		}
//
//		outParams.setStsCd(200);
//		outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_COM_SUC_003"); //저장되었습니다.
//		return outParams;
//	}
//
//	public Params deleteUser(Params inParams){
//		int cnt=0;
//
//		cnt += getSqlManager().insert("UserService.deleteUser",inParams);
//		inParams.setParam("result", cnt);
//		return inParams;
//	}
//	public Params getModifyUserDetail(Params inParams){
//		LOG.debug("UserService getModifyUserDetail"+getSqlManager().selectParams("UserService.getModifyUserDetail", inParams));
//		return getSqlManager().selectParams("UserService.getModifyUserDetail", inParams);
//	}
//	//사용자 비밀번호 변경
//	public Params updatePw(Params inParams){
//		LOG.debug("updateUser : " + inParams);
//		Params outParams = ParamsFactory.createParams(inParams);
//
//		try{
//			getSqlManager().update("UserService.updatePw", inParams);
//		}catch(Exception e){
//			LOG.debug(e);
//			outParams.setStsCd(100);
//			outParams.setMsgLangCd(inParams.getString("s_language"),"MSG_LGN_ERR_160");//비밀번호를 변경하지 못하였습니다. 관리팀으로 문의하시기 바랍니다.
//			return outParams;
//		}
//
//		return  outParams;
//	}
//}