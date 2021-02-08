//package com.comfunny.blog.system;
//
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import paragon.core.file.FileManager;
//import paragon.core.paramaters.FileParams;
//import paragon.core.paramaters.Params;
//import paragon.core.paramaters.ParamsFactory;
//import paragon.core.paramaters.datatable.DataTable;
//import vertexid.paragon.settings.svce.PdaProgramUploadService;
//
//@Controller
//@RequestMapping("/ctrl/settings/system/pdaprogramupload")
//public class PdaProgramUploadController {
//    private static final Log LOG = LogFactory.getLog(PdaProgramUploadController.class);
//
//    @Autowired
//    private PdaProgramUploadService pdaProgramUploadService;
//
//    @Autowired
//    private FileManager fileMng;
//
//    @RequestMapping
//    public String pgMove() {
//        return "/settings/system/system_pdaProgramUpload";
//    }
//
//    @RequestMapping("/listPdaVersion")
//    public Params getListPdaVersion(Params inParams) {
//        return pdaProgramUploadService.getListPdaVersion(inParams);
//    }
//
//    @RequestMapping("/fileUploadSave")
//    public Params templatefileSave2(FileParams fileParams) {
//        LOG.debug("templatefileSave33 : "+fileParams.getFile("files", 0));
//        LOG.debug("templatefileSave33 : "+fileParams.getFile("files",0).getOriginalFilename());
//        LOG.debug("templatefileSave33 : "+fileParams.getFiles("files").size());
////        fileMng.setFolder("upload");
//        fileMng.setWebRoot(false); //TODO 워크스페이스 안에 넣기
////        fileMng.setAutoDelete(true); //
//
////      fileMng.setAutoDelete(true);
////      fileMng.setAutoDelete(true, 1000L);
//        DataTable outFileDt = fileMng.saveFile(fileParams.getFiles("files"), false, true);
//
//        LOG.debug(outFileDt);
//
////      DataTable dt = outFileParams.getSaveFilesInfo("files");
//        Params outParams =  ParamsFactory.createOutParams(fileParams);
//
//        outParams.setDataTable("dt_saveFileInfo", outFileDt);
//        return outParams;
//    }
//    /**
//     * PDA프로그램 파일 업로드 버전업데이트
//     *
//     * @Author leejonghyu
//     * @Date 2017. 07. 04.
//     */
//    @RequestMapping("/fileUploadUpdate")
//    public Params fileUploadUpdate(Params inParams){
//        return pdaProgramUploadService.fileUploadUpdate(inParams);
//
//    }
//
//}
