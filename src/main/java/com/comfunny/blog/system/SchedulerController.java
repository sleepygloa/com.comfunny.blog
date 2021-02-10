//package com.comfunny.blog.system;
//
//
//import org.apache.commons.logging.Log;
//import org.apache.commons.logging.LogFactory;
//import org.quartz.JobExecutionException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import paragon.core.paramaters.Params;
//import paragon.core.utility.scheduler.JobScheduler;
//import paragon.core.utility.scheduler.ScheduleJob;
//import vertexid.paragon.settings.svce.SchedulerService;
//
//@Controller
//@RequestMapping("/ctrl/settings/system/scheduler")
//public class SchedulerController {
//
//	private static final Log LOG = LogFactory.getLog(SchedulerController.class);
//
//	@Autowired
//	private JobScheduler jobScheduler;
//
//	@Autowired
//	private SchedulerService schedulerService;
//
//
//	@RequestMapping
//	public String pgMove() {
//		return "settings/system/system_scheduler";
//	}
//
//	@RequestMapping("/listScheduler")
//	public Params listScheduler(Params inParams) {
//		return schedulerService.getSchedulerList(inParams);
//	}
//
//	@RequestMapping("/start")
//	public Params startScheduler(Params inParams) {
//		LOG.debug("startScheduler : "+inParams);
//		Params outParams = schedulerService.getSchedulerInfo(inParams);
//
//		ScheduleJob job =  new ScheduleJob(outParams);
//		jobScheduler.addJob(job);
//
//		int cnt = schedulerService.updateSchedulerUseYn(inParams);
//		if(cnt > 0){
//			outParams.setStsCd(100);
//			outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_SUC_001",new Object[]{job.getJobName()});
//		}else{
//			outParams.setStsCd(500);
//			outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_ERR_001");
//		}
//
//		return outParams;
//	}
//
//	@RequestMapping("/stop")
//	public Params stopScheduler(Params inParams) {
//		Params outParams = schedulerService.getSchedulerInfo(inParams);
//
//		ScheduleJob job =  new ScheduleJob(outParams);
//		jobScheduler.stopJob(job);
//
//		int cnt = schedulerService.updateSchedulerUseYn(inParams);
//		if(cnt > 0){
//			outParams.setStsCd(100);
//			outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_SUC_002",new Object[]{job.getJobName()});
//		}else{
//			outParams.setStsCd(500);
//			outParams.setMsgLangCd(inParams.getString("s_language"), "MSG_BAT_ERR_001");
//		}
//		return outParams;
//	}
//
//	@RequestMapping("/saveScheduler")
//	public Params saveScheduler(Params inParams) {
//		LOG.debug("saveScheduler : "+inParams.toString());
//		return  schedulerService.saveScheduler(inParams);
//	}
//
//    /**
//     * 스케줄러 삭제
//     *
//     * @Author jhlee
//     * @Date 2018. 2. 06.
//     */
//    @RequestMapping("/deleteScheduler")
//    public Params deleteScheduler(Params inParams){
//        return schedulerService.deleteScheduler(inParams);
//    }
//
//    /**
//     * 스케줄러 강제 실행
//     * @throws JobExecutionException
//     *
//     * @Author jhlee
//     * @Date 2018. 2. 06.
//     */
//    @RequestMapping("/exeScheduler")
//    public Params exeScheduler(Params inParams) throws JobExecutionException{
//        return schedulerService.exeScheduler(inParams);
//    }
//
//    @RequestMapping("/now")
//    public Params startNowScheduler(Params inParams) {
//        Params outParams = schedulerService.getSchedulerInfo(inParams);
//        ScheduleJob job =  new ScheduleJob(outParams);
//        jobScheduler.startNowJob(job);
//        outParams.setMsgCd("MSG_BAT_SUC_001",new Object[]{job.getJobName()});
//
//        return outParams;
//    }
//}
