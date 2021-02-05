package com.comfunny.blog.system;


import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import paragon.core.paramaters.Params;
import paragon.core.paramaters.datatable.DataTable;
import paragon.core.paramaters.datatable.datarow.DataRow;
import vertexid.paragon.comm.util.RSA;
import vertexid.paragon.comm.util.RSAKey;
import vertexid.paragon.comm.util.SHA256;
import vertexid.paragon.comm.util.TEA;
import vertexid.paragon.settings.svce.UserService;

@Controller
@RequestMapping("/ctrl/settings/user/info")
public class UserController {

	@Autowired
	private UserService userService;


	@RequestMapping
	public String listUserPgMove() {
		return "settings/user/user_info";
	}

	//사용자관리 그리드 조회
	@RequestMapping("/listUserInfo")
	public Params getListUser(Params inParams) {
		return userService.listUserInfo(inParams);
	}

	//사용자관리 팝업 페이지이동
	@RequestMapping("/saveUserInfo")
	public String templateModalInner() {
		return "settings/user/user_info_save";
	}


    /**
     * [기능] 사용자 정보 수정 (신규, 수정)
     * */
	@RequestMapping("/updateUser")
	public Params updateUser(Params inParams, HttpSession session) throws Exception {
		return userService.updateUser(inParams, session);
	}

	@RequestMapping("/deleteUser")
	public Params deleteUser(Params inParams) {
		return userService.deleteUser(inParams);
	}

	@RequestMapping("/userInfo")
	public Params getUserInfo(Params inParams, HttpSession session) {
		return userService.getUserInfo(inParams);
	}

	@RequestMapping("/companyCode")
	public DataTable getCompanyCode(Params inParams, HttpSession session) {
		return userService.getCompanyCode(inParams);
	}


	@RequestMapping("/modifyUserDetail")
	public String templateModifyUserModalInner() {
		return "settings/user/user_info_modify";
	}

	@RequestMapping("/checkUserNo")
	public Params getCheckUserNo(Params inParams) throws Exception {
		return userService.getCheckUserNo(inParams);
	}

	@RequestMapping("/checkUserId")
	public Params getCheckUserId(Params inParams) throws Exception {
		return userService.getCheckUserId(inParams);
	}

	//사용자암호 변경 페이징 이동
	//userPwPop
	@RequestMapping("/userPwPop")
	public String userPwPop(Params inParams){
		return "login/userPwPop";
	}



	//환경설정 저장
	@RequestMapping("/updateUserPw")
	public Params updateUserPw(HttpSession session, Params inParams){
		inParams.setParam("userId", inParams.getString("s_userId"));

		Params outParams = userService.getUserInfo(inParams);

		DataTable dt = outParams.getDataTable("data");
		DataRow dr = dt.get(0);

	    /** ID, PW 암호화처리 */
        String pwdCrypt = inParams.getString("userPwd");
        String newPwdCrypt = inParams.getString("newPwd");
        String keyCrypt = inParams.getString("eKey");

	        RSAKey rsaKey = (RSAKey) session.getAttribute("key");
	        session.removeAttribute("key");

	        RSA rsa = new RSA(rsaKey);
	        String teaKey = rsa.decrypt(keyCrypt);

	        /* 암호화된 text를 TEA키를 이용하여 decrypt 한다. */
	        TEA tea = new TEA(teaKey);
	        String pwd = tea.decrypt(pwdCrypt);
	        String ePwd = tea.decrypt(pwdCrypt);
	        String newPwd = tea.decrypt(newPwdCrypt);

	        try{
	            pwd = SHA256.encSHA256(pwd);
	            newPwd = SHA256.encSHA256(newPwd);
	        }catch(Exception e){
	            e.printStackTrace();
	//error
	            return inParams;
	        }

	        inParams.setParam("userPwd", pwd);
	        inParams.setParam("newUserPwd", newPwd);
	        inParams.setParam("userEPwd", ePwd);


	    if(!dr.getString("USER_PWD").equals(pwd)){
	    	inParams.setStsCd(100);
	    	inParams.setMsgLangCd(inParams.getString("s_language"), "MSG_LGN_ERR_190"); //현재 비밀번호가 일치하지 않습니다.
	    	return inParams;
	    }

	    outParams = userService.updatePw(inParams);

	    if(outParams.getStsCd().equals("100")){

	    }else{
	    	outParams.setStsCd(200);
	    	outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_LGN_ERR_150"); //비밀번호가 저장되었습니다.
	    }

		return outParams;
	}
}
