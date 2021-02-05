/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고지시 -할당-오리온[OutboundInstructionOFVApp]
 * Program Code     : PWMOB202E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Lee Sung Guk     2017. 4. 04.        First Draft.
 */

var OutboundInstructionOFVApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB202E';
	var proNm = 'obInstOFV';

    var $callBackInput;
    var $obInstOFVWaveDetailGrid = $("#obInstOFVWaveDetailGrid");
    var $obInstOFVDetailGrid = $("#obInstOFVDetailGrid");
   // var $obInstOFVGrid = $("#obInstOFVGrid");

    var firstLoad = true;

    var gridObProgStCd;
    var gridObGbnCd;
    var gridItemStCd;
    var gridWorkStCd;
    var gridExportCountryCd;
    var gridDalatYn;
    var obProgStCombo;
    var obProgStDCombo;


    return {
        init: function(){

        	obProgStCombo   = WMSUtil.fnCombo.grid_selectBox_range('obInstOFVObProgStCd', 'OB_PROG_ST_CD', 5, 1, 50);

        	obProgStDCombo   = WMSUtil.fnCombo.grid('OB_PROG_ST_CD');

        	gridObGbnCd		= WMSUtil.fnCombo.grid_selectBox('obInstOFVObGbnCd', 'OB_GBN_CD');

        	gridItemStCd 	= WMSUtil.fnCombo.grid('ITEM_ST_CD');

            gridExportCountryCd	 = WMSUtil.fnCombo.grid('COUNTRY_CD');

            gridDalatYn	 = WMSUtil.fnCombo.grid('YN', 'DESC');

            WMSUtil.fnCombo.selectBox('obInstOFVReportCd', 'PWMOB105E', '10');

            fnEvents();

            fnList();

        }, callBackInput: function(){
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('obInstOFVObYmd', true, true);


    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');

        //조회버튼
        $("#obInstOFVSearchBtn").click(function(){
            fnSearch();
        });
        //웨이브기준번호 팝업
        $("#obInstOFVWaveStdNoPopup").click(function(){
            fnModalInstructionStdGridPop();
        });
        //고객사 팝업
        $("#obInstOFVClientCdPopup").click(function(){
        	WMSUtil.popup.client(proNm + 'Client');
        });
        //배송처 팝업
        $("#obInstOFVStoreCdPopup").click(function(){
        	WMSUtil.popup.store(proNm + 'Store', {clientCd : $('#'+proNm+'ClientCd').val()});
        });
        //배송처 팝업
        $("#obInstOFVRStoreCdPopup").click(function(){
        	WMSUtil.popup.rstore(proNm + 'RStore', {clientCd : $('#'+proNm+'ClientCd').val()});
        });
        //출고지시
        $("#obInstOFVInstBtn").click(function(){
            var prog = "FW";
            var instruction = "inst";
            //1 -> 지시 승인
            fnInstruction(prog, 1);
        });
        //출고취소 obInstOFVCancelBtn
        $("#obInstOFVCancelBtn").click(function(){
            var prog = "BW";
            //var instruction = "cancel";
            //2 -> 지시 취소
            fnInstruction(prog, 2);
        });

        //엑셀 btn Event
        $("#obInstOFVExceBtn").click(function() {
        	if(null != $obInstOFVDetailGrid.getGridParam('selrow')){
                $obInstOFVDetailGrid.downloadExcelAllItems();
            }else{
            	$obInstOFVWaveDetailGrid.downloadExcelAllItems();
            }
        });

        //레포트
        $("#obInstOFVReportBtn").click(function(){
        	fnReport();
        });

    }

    //레포트
    function fnReport(){
        var reportFlag = $("#obInstOFVReportCd option:selected").val();

		if(reportFlag == 10){	//피킹지시서
        	var	sendData = {
        			grid		: $obInstOFVWaveDetailGrid,
        			url			: '/outboundPickingReport',
        			key			: "OB_NO",
//        			progSt		: 'OB_PROG_ST_CD',
//        			progCd		: 50,
//        			progFlag	: true,
        			errMsgCd	: 'MSG_COM_VAL_091',
        			//size		: "15",
        			data		: {
        				obNo		: "OB_NO",
        				waveNo      : "WAVE_NO"
        			},
        			addData : {
    					proCd	: 'PWMOB105E_R1',
    					type	: 'PDF'
        			}
        	};
        }else if(reportFlag == 60){	//피킹취소라벨
        	var	sendData = {
        			grid		: $obInstOFVWaveDetailGrid,
        			url			: '/outboundPickingCancelLabelReport',
        			key			: "OB_NO",
        			//progSt		: 'WORK_ST_CD',
//        			progSt		: 'OB_PROG_ST_CD',
        			//progCd		: 30,
//        			progCd		: 60,
//        			progFlag	: true,
        			errMsgCd	: 'MSG_COM_VAL_094',  //확정에서만 출력 하실 수 있습니다.
        			//size		: "15",
        			data		: {
        				waveNo        : "WAVE_NO",
        				obNo		  : "OB_NO",
        			},
        			popYn		: 'Y',
        			addData : {
        				proCd	: 'PWMOB105E_R5',
        				type	: 'CMD'
        			}
        	};
        }

    	WMSUtil.fnReport(sendData);
    }


    //데이터
    function sendData(){
    	return {
            clientCd		: $("#obInstOFVClientCd").val(),
            obYmdFr			: WMSUtil.fnDateSetting.yyyymmdd($("#obInstOFVObYmdFr").val()),
            obYmdTo			: WMSUtil.fnDateSetting.yyyymmdd($("#obInstOFVObYmdTo").val()),
            obNo			: $("#obInstOFVObNo").val(),
            obGbnCd			: $("#obInstOFVObGbnCd").val(),
            carNo			: $("#obInstOFVCarNo").val(),
            deliveryDgr		: $("#obInstOFVDeliveryDgr").val(),
            storeCd			: $("#obInstOFVStoreCd").val(),
            obProgStCd		: $("#obInstOFVObProgStCd option:selected").val(),
            soNo			: $("#obInstOFVSoNo").val(),
            rstoreCd		: $("#obInstOFVRStoreCd").val(),
            waveNo			: $("#obInstOFVWaveNo").val()
    	}
    }


    //그리드 초기화
    function fnList(){
        $obInstOFVWaveDetailGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundInstructionOFV/listOutboundInstWaveDetail",
            sortable		: true,
            rownumbers		: true,
            height			: "190",
            rowEditable		: true,
            cellEditable	: false,
            shrinkToFit		: false,
            multiselect: true,
            rowClickFocus   : true,
            domainId		: "OB_WAVE_DETAIL_LIST",
            rowNum 			: 50000,
            postData		: sendData(),
            colModel		: [
    		   {editable: false, name: "CLIENT_CD",    	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "WAVE_NO",      	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "OB_PLAN_YMD",  	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "OB_YMD",       	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "OB_NO",        	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "OB_DETAIL_SEQ",	width:"80px",  fixed: true , align: "center", excel:true},
               {editable: false, name: "SO_YMD",       	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "SO_NO",        	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "OB_GBN",		width:"100px", fixed: true , align: "center", excel:true,
                   edittype:'selectText', formatter:'selectText', editoptions: { value:gridObGbnCd }
               },
               {editable: false, name: "STORE_CD",     	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "STORE_NM",     	width:"250px", fixed: true , align: "left",   excel:true},
               {editable: false, name: "RSTORE_CD",    	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "RSTORE_NM",    	width:"250px", fixed: true , align: "left",   excel:true},
               {editable: false, name: "CAR_NO",       	width:"90px",  fixed: true , align: "center", excel:true},
               {editable: false, name: "OB_PROG_ST",	width:"120px", fixed: true , align: "center", excel:true,
                   edittype:'selectText', formatter:'selectText', editoptions: { value:obProgStCombo }
               },
               {editable: false, name: "DELIVERY_DGR", 	width:"90px",  fixed: true , align: "center", hidden: true},
               {editable: false, name: "OB_PROG_ST_CD",	width:"100px", fixed: true , align: "center", hidden: true},
            ],
//            pager		: "#obInstOFVWaveDetailGridNavi",
            gridComplete: function(){
                var ids = $obInstOFVWaveDetailGrid.jqGrid("getDataIDs");

                if (ids && ids.length > 0) {
                    $obInstOFVWaveDetailGrid.setFocus(0);
                }

                var rowData = $obInstOFVWaveDetailGrid.getRowData(ids[0]);
                var data = {
            			obNo		: rowData.OB_NO,
            			clientCd	: rowData.CLIENT_CD,
            	}

            	if (firstLoad) {
            		fnListD(data);
            	} else {
            		if(ids.length > 0){
            			$obInstOFVDetailGrid.paragonGridSearch(data);
            		}else{
            			$obInstOFVDetailGrid.jqGrid('clearGridData');
            		}
            	}
            },
            onSelectRowEvent: function(currRowData, prevRowData){
            	$obInstOFVDetailGrid.paragonGridSearch({
                    obNo		: currRowData.OB_NO,
                    clientCd	: currRowData.CLIENT_CD,
                });
            },
        });
    }

    function fnListD(data){
        $obInstOFVDetailGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundInstructionOFV/listOutboundInstObDetail",
            sortable		: true,
            rownumbers		: true,
            height			: "170",
            rowEditable		: true,
            cellEditable	: false,
            shrinkToFit		: false,
            domainId		: "OB_DETAIL_LIST",
            postData		: data,
            colModel: [
               {editable: false, name: "OB_NO",            	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "OB_DETAIL_SEQ",    	width:"80px",  fixed: true , align: "center", hidden: true, excel:true},
               {editable: false, name: "CLIENT_CD",        	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "PROMOTION_GBN",    	width: "35px", align: "center", excel:true },
               {editable: false, name: "ITEM_CD",          	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "ITEM_NM",          	width:"150px", fixed: true , align: "left", excel:true},
               {editable: false, name: "ITEM_SPEC",        	width:"80px", fixed: true , align: "center", excel:true},
               {editable: false, name: "ITEM_ST_CD",       	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "ITEM_ST", 			width:"100px", fixed: true , align: "center", excel:true,
                   edittype:'selectText', formatter:'selectText', editoptions: { value:gridItemStCd }
               },
               {editable: false, name: "CONV_UOM_QTY", 		width:"100px", fixed: true , align: "center", hidden: true, formatter: "integer" },
               {editable: false, name: "PKQTY", 			width:"80px",  fixed: true , align: "center", formatter:"integer", excelDataType :"integer", excel:true},
               {editable: false, name: "CONV_UOM_CD", 		width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "UOM", 				width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "PLAN_QTY", 			width:"100px", fixed: true , align: "right", hidden: true, formatter: "integer"},
               {editable: false, name: "PLAN_TOT_QTY", 		width:"100px", fixed: true , align: "right", formatter: "integer", excelDataType :"integer", excel:true},
               {editable: false, name: "PLAN_BOX_QTY",     	width:"100px", fixed: true , align: "right", formatter: "integer", excelDataType :"integer", excel:true},
               {editable: false, name: "PLAN_EA_QTY",      	width:"100px", fixed: true , align: "right", formatter: "integer", excelDataType :"integer", excel:true},
               {editable: false, name: "INST_QTY", 			width:"100px", fixed: true , align: "right", hidden: true, formatter: "integer"},
               {editable: false, name: "INST_TOT_QTY", 		width:"100px", fixed: true , align: "right", formatter: "integer", excelDataType :"integer", excel:true},
               {editable: false, name: "INST_BOX_QTY",     	width:"100px", fixed: true , align: "right", formatter: "integer", excelDataType :"integer", excel:true},
               {editable: false, name: "INST_EA_QTY",      	width:"100px", fixed: true , align: "right", formatter: "integer", excelDataType :"integer", excel:true},
               {editable: false, name: "DOCK",             	width:"100px", fixed: true , align: "center", hidden: true},
               {editable: false, name: "WEIGHT",           	width:"100px", fixed: true , align: "right", formatter: "integer", excelDataType :"integer", excel:true},
               {editable: false, name: "MAKE_YMD",         	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "MAKE_LOT",         	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "DIST_EXPIRY_YMD",  	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name:'LOT_ATTR1',			width:"100px", align:"center", excel:true,
                   edittype:'selectText', formatter:'selectText', editoptions: { value : gridExportCountryCd }
               },
               {editable: false, name: "LOT_ATTR3",        	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "LOT_ATTR4",        	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "LOT_ATTR5",        	width:"100px", fixed: true , align: "center", excel:true},
               {editable: false, name: "OB_PROG_ST",    	width:"100px", fixed: true , align: "center", excel:true,
                   edittype:'selectText', formatter:'selectText', editoptions: { value:obProgStDCombo }
               },
               {editable: false, name: "OB_PROG_ST_CD",		width:"100px", fixed: true , align: "center", hidden:true},
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
//            pager: "#obInstOFVDetailGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function(){
                var ids = $obInstOFVDetailGrid.jqGrid("getDataIDs");

                var rowData = $obInstOFVDetailGrid.getRowData(ids[0]);
                var data = {
            			obNo		: rowData.OB_NO,
            			obDetailSeq : rowData.OB_DETAIL_SEQ,
            			clientCd	: rowData.CLIENT_CD
            	}


            	//그리드 아래 부분 합계
            	var $footRow = $obInstOFVDetailGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['OB_DETAIL_SEQ','PROMOTION_GBN','ITEM_CD', 'ITEM_NM', 'ITEM_SPEC', 'ITEM_ST', 'PKQTY'];
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'DetailGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'DetailGrid_UOM"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;
            	}

            	//총합계
            	fnTotalSum();
            },
        });
    }

    //전체 재고 합계 조회
    function fnTotalSum(){
    	var $grid =$obInstOFVDetailGrid;

    	$grid.jqGrid('footerData','set', { PLAN_TOT_QTY 		: $grid.jqGrid('getCol', 'PLAN_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_BOX_QTY 		: $grid.jqGrid('getCol', 'PLAN_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_EA_QTY 			: $grid.jqGrid('getCol', 'PLAN_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { INST_TOT_QTY 		: $grid.jqGrid('getCol', 'INST_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { INST_BOX_QTY 		: $grid.jqGrid('getCol', 'INST_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { INST_EA_QTY 			: $grid.jqGrid('getCol', 'INST_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { WEIGHT 			: $grid.jqGrid('getCol', 'WEIGHT',false,'sum').toFixed(2)});

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

        var jsonData = $obInstOFVWaveDetailGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var jsonObject 	= JSON.parse(jsonData);
        var rowid 		= $obInstOFVWaveDetailGrid.getGridParam("selrow");
        var obProgStCd 	= $obInstOFVWaveDetailGrid.getRowData(rowid).OB_PROG_ST_CD;
        var saveUrl 	= "/ctrl/outbound/outboundInstructionOFV/obInstruction";
        var msg 		= "";

        //1. 출고 지시
        if(instruction === 1){
            if(Number(obProgStCd) < 50){
                msg = "MSG_OUTRI_CFM_006"; //출고지시 하시겠습니까?
                jsonObject.prog = "FW";
                jsonObject.opRuleCd = "2004";
                //ajax
                WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
                	$obInstOFVWaveDetailGrid.paragonGridReload();
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
                	$obInstOFVWaveDetailGrid.paragonGridReload();
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
        if($("#obInstOFVObYmdFr").val().length == 0){//출고일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obInstOFVObYmdFr").focus();
            return false;
        }else if($("#obInstOFVObYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obInstOFVObYmdFr").focus();
            return false;
        }

        if($("#obInstOFVObYmdTo").val().length == 0){//출고일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obInstOFVObYmdTo").focus();
            return false;
        }else if($("#obInstOFVObYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obInstOFVObYmdTo").focus();
            return false;
        }
        $obInstOFVWaveDetailGrid.paragonGridSearch(sendData());
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
    OutboundInstructionOFVApp.init();
});
