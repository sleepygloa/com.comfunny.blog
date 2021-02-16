package com.comfunny.blog.system.message;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class MessageService {

    @Autowired
    private MessageDao messageDao;

    @Transactional(readOnly = true)
    public List<Map<String, Object>> list(Map<String,Object> map) throws Exception{
        return messageDao.list(map);
    }

    public Map<String, Object> setMsgLangCd(Map<String, Object> map) throws Exception{
        return messageDao.listMessage(map);
    }


//    		this.setParam(ParagonConstants.MSG_CD, errCd);
//	[TODO]XML 읽는 소스. 주석. 다른 곳 활용예정
//        WebApplicationContext context = ContextLoader.getCurrentWebApplicationContext();
//        MessageLoadUtil mlu = (MessageLoadUtil)context.getBean("MessageUtil");


//    DataTable dt = MessageLoadUtil.getMessageLoadUtil();
//    DataRow dr = new CommDataRow();
//        	for(int i = 0; i < dt.size(); i++){
//        String listMsgCd = dt.get(i).getString("MSG_CD");
//        if(errCd.equals(listMsgCd)){
//            dr = dt.get(i);
//            break;
//        }
//    }
//
//    int strCnt = 0;
//    String MSG_TXT = dr.getString(lang.toUpperCase());
//        	if(MSG_TXT == null || MSG_TXT == "null" || MSG_TXT == "") {
//        MSG_TXT = dr.getString(Config.getString("locale.defaultLang").toUpperCase());
//    }
//        	if(MSG_TXT == null || MSG_TXT == "null" || MSG_TXT == "") {
//        MSG_TXT = dr.getString("EN");
//    }
//
//        	for(String str : args){
//        String arr = "{" + strCnt + "}";
//        MSG_TXT = MSG_TXT.replace(arr, str.toString());
//
//    }



//    public static DataTable setMessageLoadUtil() {
//        Params inParams = new CommParams();
//        SqlManager sqlManager = SqlManagerFactory.getSqlManager();
//
//        inParams.setParam("s_companyCd", Config.getString("masterCompany"));
//        //추후 자바 커넥션 등으로 변환.
//        Params outParams = sqlManager.selectGridParams("MessageService.list", inParams);
//        MessageDt = outParams.getDataTable("dt_grid");
//        return MessageDt;
//
//       		this.setParam(ParagonConstants.MSG_TXT, MSG_TXT);

//
//    @Transactional(readOnly = true)
//    public List<MenuListResponseDto> findAlldesc(int menuSeq){
//        return menuRepository.findAllDesc(menuSeq).stream()
//                .map(MenuListResponseDto::new)
//                .collect(Collectors.toList());
//    }
//
//    @Transactional
//    public void save(List<MenuSaveRequestDto> list){
//        for(MenuSaveRequestDto dto : list){
//            String flag = (String)dto.getFlag();
//            if(flag.equals("INSERT")){
//                Long menuSeq = menuRepository.findMaxMaster();
//                menuRepository.insertMaster(menuSeq, dto.getMenuParentSeq(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());
//            }else if(flag.equals("UPDATE") || flag.equals("DELETE")){
//                int cnt = menuRepository.findRow(dto.getMenuSeq());
//                if(cnt == 0 ) new IllegalArgumentException("해당 게시글이 없습니다. id = " + dto.getMenuSeq());
//
//                menuRepository.saveRow(dto.getMenuSeq(), dto.getMenuParentSeq(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());
//
////                menu.Update(dto.getMenuParentSeq(), dto.getMenuLev(), dto.getMenuCd(), dto.getMenuNm(), dto.getMenuIcon(), dto.getMenuUrl(), dto.getMenuOrder(), dto.getDeviceFlag(), dto.getBlogYn(), dto.getUseYn());
//
//            }else{
//
//                new IllegalArgumentException("해당 게시글이 없습니다. id = " + dto.getMenuSeq());
//            }
//
//        }
//    }


}
