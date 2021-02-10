/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고지시 -할당
 * Program Code     : PWMOB105E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Lee Sung Guk     2017. 4. 04.        First Draft.
 */

var OutboundInstructionApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB105E';
	var proNm = 'obInst';

    var $callBackInput;
    var $obInstWaveGrid = $("#obInstWaveGrid");
    var $obInstWaveDetailGrid = $("#obInstWaveDetailGrid");
    var $obInstDetailGrid = $("#obInstDetailGrid");
   // var $obInstGrid = $("#obInstGrid");

    var firstLoad = true;

    var gridObProgStCd;
    var gridObGbnCd;
    var gridItemStCd;
    var gridWorkStCd;
    var gridExportCountryCd;
    var gridDalatYn;
    var obProgStCombo;


    return {
        init: function(){

        	obProgStCombo   = WMSUtil.fnCombo.grid_selectBox_range('obInstObProgStCd', 'OB_PROG_ST_CD', 5, 1);

        	gridObGbnCd		= WMSUtil.fnCombo.grid('OB_GBN_CD');

        	gridItemStCd 	= WMSUtil.fnCombo.grid('ITEM_ST_CD');

            gridExportCountryCd	 = WMSUtil.fnCombo.grid('COUNTRY_CD');

            gridDalatYn	 = WMSUtil.fnCombo.grid('YN', 'DESC');

            WMSUtil.fnCombo.selectBox('outInstReportCd', 'PWMOB105E', '10');

            fnEvents();

            fnListWave();

        }, callBackInput: function(){
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('obInstObYmd', true, true);


    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');

        //조회버튼
        $("#obInstSearchBtn").click(function(){
            fnSearch();
        });
        //웨이브기준번호 팝업
        $("#obInstWaveStdNoPopup").click(function(){
            fnModalInstructionStdGridPop();
        });
        //고객사 팝업
        $("#obInstClientCdPopup").click(function(){
        	WMSUtil.popup.client(proNm + 'Client');
//            fnModalClientGridPop();
        });
        //출고지시
        $("#obInstInstBtn").click(function(){
            var prog = "FW";
            var instruction = "inst";
            //1 -> 지시 승인
            fnInstruction(prog, 1);
        });
        //출고취소 obInstCancelBtn
        $("#obInstCancelBtn").click(function(){
            var prog = "BW";
            //var instruction = "cancel";
            //2 -> 지시 취소
            fnInstruction(prog, 2);
        });

        //엑셀 btn Event
        $("#obInstExceBtn").click(function() {
            /*if(null != $obInstGrid.getGridParam('selrow')){
                $obInstGrid.downloadExcel();
            }else*/
            	if(null != $obInstDetailGrid.getGridParam('selrow')){
                $obInstDetailGrid.downloadExcel();
            }else if(null != $obInstWaveDetailGrid.getGridParam('selrow')){
                $obInstWaveDetailGrid.downloadExcel();
            }else{
                $obInstWaveGrid.downloadExcel();
            }
        });

        //레포트
        $("#obInstReportBtn").click(function(){
        	fnReport();
        });

        $("#obInstWaveStdNo").on('change', function(e){
        	fnWaveStdNoChangeEvent();
        });


    }

    //레포트
    function fnReport(){
        var reportFlag = $("#outInstReportCd option:selected").val();

		if(reportFlag == 10){	//피킹지시서
        	var	sendData = {
        			grid		: $obInstWaveGrid,
        			url			: '/outboundPickingReport',
        			key			: "OB_NO",
        			progSt		: 'OB_PROG_ST_CD',
        			progCd		: 50,
        			progFlag	: true,
        			errMsgCd	: 'MSG_COM_VAL_091',
        			//size		: "15",
        			data		: {
        				waveNo        : "WAVE_NO",
        				obNo		  : "OB_NO",
//obDetailSeq	  : "OB_DETAIL_SEQ",
        			},
        			addData : {
    					proCd	: 'PWMOB105E_R1',
    					type	: 'PDF'
        			}
        	};
        }
//		else if(reportFlag == 50){	//상차지시서
//        	var	sendData = {
//        			grid		: $obInstWaveGrid,
//        			url			: '/outboundInstCarLoadingReport',
//        			key			: "OB_NO",
//        			progSt		: 'OB_PROG_ST_CD',
//        			progCd		: 50,
//        			progFlag	: true,
//        			errMsgCd	: 'MSG_COM_VAL_091',
//        			//size		: "15",
//        			data		: {
//        				waveNo        : "WAVE_NO",
//        				obNo		  : "OB_NO",
////obDetailSeq	  : "OB_DETAIL_SEQ",
//        			},
//        			addData : {
//    					proCd	: 'PWMOB105E_R5',
//    					type	: 'PDF'
//        			}
//        	};
//        }

    	WMSUtil.fnReport(sendData);
    }


    //데이터
    function sendData(){
    	return {
    		clientCd 	: $("#obInstClientCd").val(),
    		waveNo		: $("#obInstWaveNo").val(),
    		waveStdNo	: $("#obInstWaveStdNo").val(),
            obProgStCd	: $("#obInstObProgStCd option:selected").val(),
            obYmdFr		: WMSUtil.fnDateSetting.yyyymmdd($("#obInstObYmdFr").val()),
            obYmdTo		: WMSUtil.fnDateSetting.yyyymmdd($("#obInstObYmdTo").val()),
    	}
    }

    //출고 Wave 그리드 초기화
    function fnListWave(){
        $obInstWaveGrid.paragonGrid({
            url			: "/ctrl/outbound/outboundInstruction/listOutboundInstWave",
            sortable	: true,
            rownumbers	: true,
            height		: "203",
            rowEditable	: true,
            cellEditable: false,
            multiselect	: true,
//            multielonly: true,
            rowClickFocus:true,
            shrinkToFit	: true,
            domainId	: "OB_WAVE_LIST",
            postData	: sendData(),
            colModel: [
               {editable: false, name: "CLIENT_CD",        	width:"100px", align: "center", 	hidden:true},
               {editable: false, name: "CLIENT",           	width:"100px", align: "left"		},
               {editable: false, name: "WAVE_NO",          	width:"100px", align: "center"		},
               {editable: false, name: "WAVE_STD_DESC",    	width:"100px", align: "left"		},
               {editable: false, name: "WAVE_STD_NO",      	width:"100px", align: "center", 	disable:true},
               {editable: false, name: "OB_PROG_ST_CD",    	width:"100px", align: "center", 	hidden:true},
               {editable: false, name: "OB_PROG_ST",		width: "100px",align: "center",
                   edittype:'select',	formatter:'select', editoptions: { value:obProgStCombo }
               },
               {editable: false, name: "OB_NO",            	width:"100px", align: "center", 	hidden:true},
               {editable: false, name: "OB_DETAIL_SEQ",    	width:"100px", align: "center", 	hidden:true},
               {editable: false, name: "CAR_NO",           	width:"100px", align: "center"		},
               {editable: false, name: "OB_YMD",           	width:"100px", align: "center"		}
            ],
            pager: "#obInstWaveGridNavi",
            gridComplete: function(){
            	//처읆 로딩시 데이터가 1건이상이면 첫행 포커스
                var ids = $obInstWaveGrid.jqGrid("getDataIDs");
                if (ids && ids.length > 0) {
                    $obInstWaveGrid.setFocus(0);
                }

            	var rowData = $obInstWaveGrid.getRowData(ids[0]);
            	var data = {
                		waveNo	 : rowData.WAVE_NO,
                		clientCd : rowData.CLIENT_CD
            	}

            	//웨이브상세그리드
            	if (firstLoad) {
            		fnListWaveDetail(data);
            	} else {
            		if(ids.length > 0){
            			$obInstWaveDetailGrid.paragonGridSearch(data);
            		}else{
            			$obInstWaveDetailGrid.jqGrid('clearGridData');
            		}
            	}

            },
            onSelectRowEvent: function(currRowData, prevRowData){
            	$obInstWaveDetailGrid.paragonGridSearch({ waveNo: currRowData.WAVE_NO });
            },

        });
    }

    //출고WAVE 상세목록
    function fnListWaveDetail(data){
        $obInstWaveDetailGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundInstruction/listOutboundInstWaveDetail",
            sortable		: true,
            rownumbers		: true,
            height			: "203",
            width			: "500",
            rowEditable		:true,
            cellEditable	:false,
            shrinkToFit		: true,
            //multiselect: true,
            //multielonly:true,
            //autowidth: false,
            domainId		: "OB_WAVE_DETAIL_LIST",
            //postData:{ waveNo: data },
            postData		: data,
            colModel		: [
    		   {editable: false, name: "CLIENT_CD",    	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "WAVE_NO",      	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "OB_PLAN_YMD",  	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "OB_YMD",       	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "OB_NO",        	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "SO_YMD",       	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "SO_NO",        	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "OB_GBN",		width:"100px", fixed: true , align: "center",
                   edittype:'select', formatter:'select', editoptions: { value:gridObGbnCd }
               },
               {editable: false, name: "STORE_CD",     	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "STORE_NM",     	width:"150px", fixed: true , align: "left"},
               {editable: false, name: "RSTORE_CD",    	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "RSTORE_NM",    	width:"150px", fixed: true , align: "left"},
               {editable: false, name: "CAR_NO",       	width:"90px",  fixed: true , align: "center"},
               {editable: false, name: "DELIVERY_DGR", 	width:"90px",  fixed: true , align: "center", hidden: true},
               {editable: false, name: "OB_PROG_ST_CD",	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "OB_PROG_ST",	width:"100px", fixed: true , align: "center",
                   edittype:'select', formatter:'select', editoptions: { value:obProgStCombo }
               },
            ],
            pager		: "#obInstWaveDetailGridNavi",
            gridComplete: function(){
                var ids = $obInstWaveDetailGrid.jqGrid("getDataIDs");

                var rowData = $obInstWaveDetailGrid.getRowData(ids[0]);
                var data = {
            			obNo		: rowData.OB_NO,
            			clientCd	: rowData.CLIENT_CD
            	}

            	if (firstLoad) {
            		fnListObInstDetail(data);
            	} else {
            		if(ids.length > 0){
            			$obInstDetailGrid.paragonGridSearch(data);
            		}else{
            			$obInstDetailGrid.jqGrid('clearGridData');
            		}
            	}
            },
            onSelectRowEvent: function(currRowData, prevRowData){
            	$obInstDetailGrid.paragonGridSearch({
                    obNo		: currRowData.OB_NO,
                    clientCd	: currRowData.CLIENT_CD
                });
            },
        });
    }


    //출고웨이브상세의 출고상세목록
    function fnListObInstDetail(data){
        $obInstDetailGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundInstruction/listOutboundInstObDetail",
            sortable		: true,
            rownumbers		: true,
            height			: "203",
            width			: "500",
            rowEditable		: true,
            cellEditable	: false,
            shrinkToFit		: false,
            domainId		: "OB_DETAIL_LIST",
            postData		: data,
            colModel: [
               {editable: false, name: "OB_NO",            	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "OB_DETAIL_SEQ",    	width:"80px",  fixed: true , align: "center"},
               {editable: false, name: "CLIENT_CD",        	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "PROMOTION_GBN",    	width: "35px", align: "center" },
               {editable: false, name: "ITEM_CD",          	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "ITEM_NM",          	width:"150px", fixed: true , align: "left"},
               {editable: false, name: "ITEM_SPEC",        	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "ITEM_ST_CD",       	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "ITEM_ST", 			width:"100px", fixed: true , align: "center",
                   edittype:'select', formatter:'select', editoptions: { value:gridItemStCd }
               },
               {editable: false, name: "CONV_UOM_QTY", 		width:"100px", fixed: true , align: "center", hidden: true, formatter: "integer" },
               {editable: false, name: "PKQTY", 			width:"100px", fixed: true , align: "center", formatter: "integer"},
               {editable: false, name: "CONV_UOM_CD", 		width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "UOM", 				width:"100px", fixed: true , align: "center"},
               {editable: false, name: "PLAN_QTY", 			width:"100px", fixed: true , align: "right", hidden: true, formatter: "integer"},
               {editable: false, name: "PLAN_TOT_QTY", 		width:"100px", fixed: true , align: "right", formatter: "integer"},
               {editable: false, name: "PLAN_BOX_QTY",     	width:"100px", fixed: true , align: "right", formatter: "integer"},
               {editable: false, name: "PLAN_EA_QTY",      	width:"100px", fixed: true , align: "right", formatter: "integer"},
               {editable: false, name: "INST_QTY", 			width:"100px", fixed: true , align: "right", hidden: true, formatter: "integer"},
               {editable: false, name: "INST_TOT_QTY", 		width:"100px", fixed: true , align: "right", formatter: "integer"},
               {editable: false, name: "INST_BOX_QTY",     	width:"100px", fixed: true , align: "right", formatter: "integer"},
               {editable: false, name: "INST_EA_QTY",      	width:"100px", fixed: true , align: "right", formatter: "integer"},
               {editable: false, name: "DOCK",             	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "WEIGHT",           	width:"100px", fixed: true , align: "right", formatter: "integer"},
               {editable: false, name: "MAKE_YMD",         	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "MAKE_LOT",         	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "DIST_EXPIRY_YMD",  	width:"100px", fixed: true , align: "center"},
               {editable: false, name:'LOT_ATTR1',			width:"100px", align:"center",
                   edittype:'select', formatter:'select', editoptions: { value : gridExportCountryCd }
               },
               {editable: false, name:'LOT_ATTR2',      	width:"100px",  align:"center",
                   edittype:'select', formatter:'select', editoptions: { value : gridDalatYn }
               },
               {editable: false, name: "LOT_ATTR3",        	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "LOT_ATTR4",        	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "LOT_ATTR5",        	width:"100px", fixed: true , align: "center"},
               {editable: false, name: "OB_PROG_ST_CD",		width:"100px", fixed: true , align: "center", hidden:true},
               {editable: false, name: "OB_PROG_ST",    	width:"100px", fixed: true , align: "center",
                   edittype:'select', formatter:'select', editoptions: { value:obProgStCombo }
               }
            ],
            groupHeaders:[
                {
                    rowspan : true,
                    header:[
                        {start: 'PLAN_TOT_QTY', length: 3 , domain:"PLAN_QTY"},
                        {start: 'INST_TOT_QTY', length: 3 , domain:"INST_QTY"}
                    ]
                }
            ],
            pager: "#obInstDetailGridNavi",
            gridComplete: function(){
                var ids = $obInstDetailGrid.jqGrid("getDataIDs");

                var rowData = $obInstDetailGrid.getRowData(ids[0]);
                var data = {
            			obNo		: rowData.OB_NO,
            			obDetailSeq : rowData.OB_DETAIL_SEQ,
            			clientCd	: rowData.CLIENT_CD
            	}

/*            	if (firstLoad) {
            		fnListObInst(data);
            	} else {
            		if(ids.length > 0){
            			$obInstGrid.paragonGridSearch(data);
            		}else{
            			$obInstGrid.jqGrid('clearGridData');
            		}
            	}*/
            	firstLoad = false;
            },
/*            onSelectRowEvent: function(currRowData, prevRowData){
            	$obInstGrid.paragonGridSearch({
                    obNo		: currRowData.OB_NO,
                    obDetailSeq : currRowData.OB_DETAIL_SEQ,
                    clientCd	: currRowData.CLIENT_CD
                });
            },*/
        });
    }

    //출고 지시목록
    function fnListObInst(data){
        $obInstGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundInstruction/listOutboundInstObInst",
            sortable		: true,
            rownumbers		: true,
            height			: "203",
            width			: "500",
            rowEditable		: true,
            cellEditable	: false,
            shrinkToFit		: false,
            domainId		: "OB_INST_LIST",
            postData		: data,
            colModel: [
                {editable: false, name: "CLIENT_CD", 	width:"100px", fixed: true , align: "right", 	hidden: true},
                {editable: false, name: "OB_INST_NO",   width:"100px", fixed: true , align: "center"	},
                {editable: false, name: "INST_LOC_CD",  width:"100px", fixed: true , align: "center"	},
                {editable: false, name: "PLT_ID",       width:"100px", fixed: true , align: "center"	},
                {editable: false, name: "INST_QTY", 	width:"100px", fixed: true , align: "right", 	hidden: true},
                {editable: false, name: "INST_TOT_QTY", width:"100px", fixed: true , align: "right"		},
                {editable: false, name: "INST_BOX_QTY", width:"100px", fixed: true , align: "right"		},
                {editable: false, name: "INST_EA_QTY",  width:"100px", fixed: true , align: "right"		},
                {editable: false, name: "DOCK",         width:"100px", fixed: true , align: "center"	},
                {editable: false, name: "LOT_ID",       width:"100px", fixed: true , align: "center"	},
                {editable: false, name: "WORK_ST_CD",   width:"100px", fixed: true , align: "center", 	hidden:true},
                {editable: false, name: "WORK_ST",		width:"100px", fixed: true , align: "center",
                    edittype:'select', formatter:'select', editoptions: { value:gridWorkStCd }
                },
                {editable: false, name: "REMARK",       width:"100px", fixed: true , align: "center"}
            ],
            groupHeaders:[
                {
                    rowspan : true,
                    header:[
                        {start: 'INST_TOT_QTY', length: 3 , domain:"INST_QTY"}
                    ]
                }
            ],
            pager			: "#obInstGridNavi",
            gridComplete: function(){
            	firstLoad = false;
            },
        });
    }

    //
    function fnWaveStdNoChangeEvent(){

        var jsonObject = {
        		waveStdNo : $("#obInstWaveStdNo").val()
        };
    	var data = JSON.stringify(jsonObject);

        if($("#obInstWaveStdNo").val().trim().length != 0){
        	$.ajax({
                url			: '/ctrl/common/listWaveStandardPop',
                type 		: "POST",
                datatype 	: 'JSON',
                contentType : 'application/json;  charset=utf-8',
                data 		: data,
                //domainId : "PWMCM102Q_P1",
                success:function(data){
                    //App.prcsEnd();
                    var dataCheck = data.dt_grid;
                    //검색결과 하나
                    if(dataCheck.length == 1) {
    					$("#obInstWaveStdNo").val(dataCheck[0].WAVE_STD_NO);
                        $("#obInstWaveStdDesc").val(dataCheck[0].WAVE_STD_DESC);
                        //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
                    }else if(dataCheck.length != 1 && $("modalWaveStdPopup").length == 0){

                    	WMSUtil.popup.waveStd(proNm + 'WaveStd', {clientCd : $('#'+proNm+'ClientCd').val()});
//                    	fnModalWaveStdGridPop();
                    }
                }
            });
        }else{
        	$("#obInstWaveStdDesc").val("");
        }
    }


    function fnInstruction(progData, instruction){
        var rowData = {
                clientCd	: "CLIENT_CD" ,
                waveNo		: "WAVE_NO",
                obNo		: "OB_NO",
                obDetailSeq	: "OB_DETAIL_SEQ",
                opRuleCd	: "",
                prog		: ""
        };

        var jsonData = $obInstWaveGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var jsonObject 	= JSON.parse(jsonData);
        var rowid 		= $obInstWaveGrid.getGridParam("selrow");
        var obProgStCd 	= $obInstWaveGrid.getRowData(rowid).OB_PROG_ST_CD;
        var saveUrl 	= "/ctrl/outbound/outboundInstruction/obInstruction";
        var msg 		= "";

        //1. 출고 지시
        if(instruction === 1){
            if(Number(obProgStCd) < 50){
                msg = "MSG_OUTRI_CFM_006"; //출고지시 하시겠습니까?
                jsonObject.prog = "FW";
                jsonObject.opRuleCd = "2004";
                //ajax
                WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
                	$obInstWaveGrid.paragonGridReload();
            	})
            }else{
                Util.alertCode('MSG_COM_VAL_075', 'OB_PROG_ST_CD', 40); //{0}상태만 지시가능합니다.
                return false;
            }
        }

        if(instruction === 2){
            //출고 취소
            if(Number(obProgStCd) == 50){
                msg = "MSG_OUTRI_CFM_007"; //출고취소 하시겠습니까?
                jsonObject.prog = "BW";
                jsonObject.opRuleCd = "2004";

                //ajax
                WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
                	$obInstWaveGrid.paragonGridReload();
            	})
            }else{
                Util.alertCode('MSG_COM_VAL_072', 'OB_PROG_ST_CD', 50); //{0}상태만 취소가능합니다.
                return false;
            }
        }
    }
    //[Fn] 조회 버튼 이벤트
    function fnSearch(){
        //validation
        if($("#obInstObYmdFr").val().length == 0){//출고일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obInstObYmdFr").focus();
            return false;
        }else if($("#obInstObYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obInstObYmdFr").focus();
            return false;
        }

        if($("#obInstObYmdTo").val().length == 0){//출고일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obInstObYmdTo").focus();
            return false;
        }else if($("#obInstObYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obInstObYmdTo").focus();
            return false;
        }
        $obInstWaveGrid.paragonGridSearch(sendData());
    }


}();

/********************************************************************
 * bootstrap-datepicker 달력오픈 중, 탭 이동시 달력 hide
 * Since   : 2017-08-29
 * 작성자  : Kim Seon Ho
 * 수정내역: 2017-09-08 Tab-menu 종료시 마우스 클릭 인식 안되, datepicker(hide) 가 안되던 현상 수정
 ********************************************************************/
$("li.active").siblings().click(function () {
    // trigger the datepicker
    $('.date').datepicker('hide');
});
$("li.active").live("click focusout", function (e) {
    // trigger the datepicker
    $('.date').datepicker('hide');
});

$(document).ready(function(){
    OutboundInstructionApp.init();
});
