package com.comfunny.blog.system;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import paragon.core.mvc.stereotype.ParagonService;
import paragon.core.paramaters.Params;
import paragon.core.paramaters.ParamsFactory;

@Service
public class PdaProgramUploadService extends ParagonService {

	private static final Log LOG = LogFactory.getLog(PdaProgramUploadService.class);

    /**
     * PDA프로그램 파일 업로드 VERSION조회
     *
     * @Author leejonghyuk
     * @Date 2017. 7. 04.
     */
	public Params getListPdaVersion(Params inParams) {
		return getSqlManager().selectOneParams("PdaProgramUploadService.getListPdaVersion", inParams);
	}

    /**
     * PDA프로그램 파일 업로드 업데이트
     *
     * @Author leejonghyuk
     * @Date 2017. 7. 04.
     */
    public Params fileUploadUpdate(Params inParams){
        Params outParams = ParamsFactory.createParams(inParams);

//        int cnt = 0;
//        for(DataRow dr:inParams.getDataTable("dt_ibApproval")){
//            dr.setParam("s_companyCd", inParams.getParam("s_companyCd"));
//            dr.setParam("s_userId", inParams.getParam("s_userId"));
          //  getSqlManager().selectOneParams("PdaProgramUploadService.fileUploadUpdate", inParams);
//        }
//        outParams.setMsgCd("MSG_COM_SUC_007", new Object[]{});

         getSqlManager().update("PdaProgramUploadService.fileUploadUpdate", inParams);

        return outParams;
    }

}