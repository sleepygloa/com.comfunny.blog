/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 미배송처리[OutBoundPlanApp]
 * Program Code     : PWMOB114E
 * Description      :
 * Revision History
 * Author            Date              Description
 * -------------------------------------------
 * Lee  Sung  Guk    2017. 3.16.       First  Draft.
 * Hong Jeong Bo     2018.12.26.       Second Draft.
 */

var OutBoundNdeliveryApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB114E';
	var proNm = 'obNdelivery';

    var $obNdeliveryHGrid = $("#obNdeliveryHGrid");
    var $obNdeliveryDGrid = $("#obNdeliveryDGrid");

    var $callBackInput;

    var firstLoad = true;
    var gridExportCountryCd;
    var gridDalatYn;

    var rowDataList;

    var gridObGbnCd;
    var gridItemStCd;
    var gridWorkStCd;
    var gridNdeliveryRsCd;


    return {
        init: function() {

            gridWorkStCd 		= WMSUtil.fnCombo.grid_selectBox('obNdeliveryWorkStCd', 'WORK_ST_CD');

            gridObGbnCd 		= WMSUtil.fnCombo.grid_selectBox('obNdeliveryObGbnCd', 'OB_GBN_CD');

            gridItemStCd 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');

            gridNdeliveryRsCd 	= WMSUtil.fnCombo.grid('NDELIVERY_RS_CD');

        	fnEvents();

        	fnList();

        },
        callBackInput: function() {
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents() {

    	WMSUtil.fnTagYmdSetting(proNm+'ObYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

		$("#obNdeliveryStoreBtn").click(function() {
			WMSUtil.popup.store('obNdeliveryStore');
		});

		$("#obNdeliveryRStoreBtn").click(function() {
			WMSUtil.popup.rstore('obNdeliveryRStore');
		});

        //검색 버튼
        $("#obNdeliverySearchBtn").click(function() {
        	fnSearch();
        });

        //엑셀 다운로드
        $("#obNdeliveryExcelBtn").click(function() {
            $obNdeliveryHGrid.downloadExcelAllItems();
        });

        //확정버튼
        $("#obNdeliveryConfBtn").click(function(){
            fnConfirm('confirm');
        });

        //레포트 버튼
        $('#obNdeliveryReportBtn').click(function(){
        	var	sendData = {
        			grid		: $obNdeliveryHGrid,
        			url			: '/obNdeliveryLabelReport',
        			key			: "OB_NO",
        			//progSt		: 'WORK_ST_CD',
//        			progSt		: 'OB_PROG_ST_CD',
        			//progCd		: 30,
//        			progCd		: 60,
//        			progFlag	: true,
//        			errMsgCd	: 'MSG_COM_VAL_094',  //확정에서만 출력 하실 수 있습니다.
        			//size		: "15",
        			data		: {
//        				waveNo        : "WAVE_NO",
        				obNo		 	: "OB_NO",
        				obDetailSeq		: "OB_DETAIL_SEQ"
        			},
        			popYn		: 'Y',
        			addData : {
//        				proCd	: 'PWMOB105E_R5',
        				type	: 'CMD'
        			}
        	};
        	WMSUtil.fnReport(sendData);

        })
    }

    //그리드 초기화
    function fnList() {
    	$obNdeliveryHGrid.paragonGrid({
            url				: "/ctrl/outbound/ndelivery/listObNdelivery",
            sortable		: true,
            rownumbers		: true,
            height 			: "183",
            rowEditable		: true,
            cellEditable	: false,
            multiselect		: true,
            rowClickFocus	: true,
            shrinkToFit		: false,
            domainId		: "NDELIVERY_LIST",
            postData		: sendData(),
            colModel: [
                       { editable: false, name: "CLIENT_CD",       	width: "150px", align: "center", hidden: true },
                       { editable: false, name: "CLIENT",          	width: "100px", align: "left",   hidden: true },
                       { editable: false, name: "OB_YMD",          	width: "100px", align: "center", excel:true },
                       { editable: false, name: "OB_NO",           	width: "100px", align: "center", excel:true },
                       { editable: false, name: "OB_DETAIL_SEQ",   	width: "100px", align: "center", excel:true },

                       { editable: false, name: "SO_YMD",           width: "100px", align: "center", excel:true },
                       { editable: false, name: "SO_NO",            width: "100px", align: "center", excel:true },
                       { editable: false, name: "OB_GBN",       	width: "100px", align: "center", excel:true },
                       { editable: false, name: "STORE_CD",         width: "100px", align: "center", excel:true },
                       { editable: false, name: "STORE_NM",         width: "100px", align: "center", excel:true },
                       { editable: false, name: "RSTORE_CD",        width: "100px", align: "center", excel:true },

                       { editable: false, name: "RSTORE_NM",        width: "100px", align: "center", excel:true },
                       { editable: false, name: "CAR_NO",           width: "100px", align: "center", excel:true },
                       { editable: false, name: "WORK_ST_CD",       width: "100px", align: "center", hidden: true },
                       { editable: false, name: "WORK_ST", 			width: "100px", align: "center", excel:true,
                           edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridWorkStCd }
                       },
                       { editable: false, name: 'WORK_DT',          width:"150px",  align:"center" , excel:true },
                       { editable: false, name: "PROMOTION_GBN",    width: "35px",  align: "center", excel:true },
                       { editable: false, name: "ITEM_CD",          width: "100px", align: "center", excel:true },
                       { editable: false, name: "ITEM_NM",          width: "100px", align: "center", excel:true },
                       { editable: false, name: "ITEM_ST_CD",       width: "100px", align: "center", hidden: true },
                       { editable: false, name: "ITEM_ST", 			width: "100px", align: "center", excel:true,
                           edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridItemStCd }
                       },
                       { editable: false, name: "SPEC",            	width: "100px", align: "center", excel:true },
                       { editable: false, name: "CONV_UOM_QTY",    	width: "100px", align: "right", hidden: true},

                       { editable: false, name: "PKQTY",           	width: "100px", align: "center", formatter:"integer", excelDataType :"integer", excel:true},
                       { editable: false, name: "CONV_UOM_CD",     	width: "100px", align: "center", hidden: true },
                       { editable: false, name: "UOM",             	width: "100px", align: "center", excel:true },
                       { editable: false, name: "NDELIVERY_QTY",   	width: "100px", align: "right", hidden:true },
                       { editable: false, name: "NDELIVERY_TOT_QTY",width:"100px",  align: "right", excelDataType :"integer", excel:true },

                       { editable: false, name: "NDELIVERY_BOX_QTY",width:"100px",  align: "right", excelDataType :"integer", excel:true },
                       { editable: false, name: "NDELIVERY_EA_QTY",	width: "100px", align: "right", excelDataType :"integer", excel:true },
                       { editable: false, name: "NDELIVERY_RS_CD", 	width: "100px", align: "center", hidden: true },
                       { editable: false, name: "NDELIVERY_RS", 	width: "100px", align: "center", excel:true,
                           edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridNdeliveryRsCd }
                       },
                       { editable: false, name: "PLAN_WEIGHT",      width: "100px", align: "center" , formatter:"integer", excelDataType :"integer", excel:true},

                       { editable: false, name: "REMARK",           width: "100px", align: "center",  excel:true }
            ],
            groupHeaders	:
        	[{
            		rowspan	: true,
            		header	: [
            		      	   { start: 'NDELIVERY_TOT_QTY', length: 3, domain: "NDELIVERY_QTY" }
            		      	  ]
        	}],
            pager			: "#obNdeliveryHGridNavi",
            gridComplete	: function(){

            	var ids = $obNdeliveryHGrid.jqGrid("getDataIDs");

                if (ids && ids.length > 0) {
                	$obNdeliveryHGrid.setFocus(0);
                }

                var data = $obNdeliveryHGrid.getRowData(ids[0]);
                var dataJson = {
                        obNo		: data.OB_NO,
                        obDetailSeq	: data.OB_DETAIL_SEQ
                    };

                //그리드를 처음 로드할때 상세그리드 생성, 2번째 이후부터는 조회처리.
                if (firstLoad) {
                    //화면 처음 로드 시 헤더, 디테일 그리드 생성 중 디테일 부분.
                    fnListD(dataJson);
                    firstLoad = false;
                } else {

                	if(ids && ids.length > 0){
                		$obNdeliveryDGrid.paragonGridSearch(dataJson);
                	}else{
                		$obNdeliveryDGrid.jqGrid('clearGridData');
                	}
                }


            },
            onSelectRowEvent: function(currRowData, prevRowData){
            	$obNdeliveryDGrid.paragonGridSearch({
                    obNo		: currRowData.OB_NO,
                    obDetailSeq	: currRowData.OB_DETAIL_SEQ
                });
            },
        });
    }

    //그리드 초기화
    function fnListD(jsonData) {
    	$obNdeliveryDGrid.paragonGrid({
            url				: "/ctrl/outbound/ndelivery/listObNdeliveryD",
            sortable		: true,
            rownumbers		: true,
            height 			: "183",
            cellEditable	: false,
            shrinkToFit		: false,
            domainId		: "NDELIVERY_DETAIL_LIST",
            postData		: jsonData,
            colModel: [
                       { editable: false, name: "COMPANY_CD",   	width: "100px", align: "center", hidden: true },
                       { editable: false, name: "OB_NO",           	width: "100px", align: "center", excel:true},
                       { editable: false, name: "OB_DETAIL_SEQ",   	width: "80px",  align: "center", excel:true},
                       { editable: false, name: "PLT_ID",   		width: "120px", align: "center", excel:true}

            ],
        });
    }

    function fnSearch(){
        if($("#obNdeliveryObYmdFr").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obNdeliveryObYmdFr").focus();
            return false;
        }else if($("#obNdeliveryObYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obNdeliveryObYmdFr").focus();
            return false;
        }

        if($("#obNdeliveryObYmdTo").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obNdeliveryObYmdTo").focus();
            return false;
        }else if($("#obNdeliveryObYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obNdeliveryObYmdTo").focus();
            return false;
        }

        $obNdeliveryHGrid.paragonGridSearch(sendData());
    }

    //확정
    function fnConfirm(confirm){

        var rowData = {
            obNo		: "OB_NO",
            obDetailSeq	: "OB_DETAIL_SEQ",
        };

        //1. 체크된 리스트.
        var jsonData = $obNdeliveryHGrid.getSelectedJsonData("dt_data", rowData);

        //유효성검사
        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var jsonObject = JSON.parse(jsonData);
        var rowid = $obNdeliveryHGrid.getGridParam("selrow");
        var workStCd = $obNdeliveryHGrid.getRowData(rowid).WORK_ST_CD;

    	if(workStCd == '10'){

            jsonObject.opRuleCd = "2007";

            var saveUrl = "/ctrl/outbound/ndelivery/updataeObNdeliveryConfirm";
            var msg = "MSG_OUTRI_CFM_017"; //미배송확정 하시겠습니까?

            //ajax Event.
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
                $obNdeliveryHGrid.paragonGridReload();
            })

    	}else{
            Util.alertCode('MSG_COM_VAL_068', 'WORK_ST_CD', 10); //{0}상태만 확정가능합니다.
            return false;
    	}

    }

    //데이터
    function sendData(){
    	return {
			obYmdFr 		: WMSUtil.fnDateSetting.yyyymmdd($('#obNdeliveryObYmdFr').val()),
            obYmdTo			: WMSUtil.fnDateSetting.yyyymmdd($('#obNdeliveryObYmdTo').val()),
			obGbnCd			: $('#obNdeliveryObGbnCd option:selected').val(),
			workStCd		: $('#obNdeliveryWorkStCd option:selected').val(),
			carNo			: $('#obNdeliveryCarNo').val(),
			obNo			: $('#obNdeliveryObNo').val(),
			soNo			: $('#obNdeliverySoNo').val(),
			storeCd			: $('#obNdeliveryStoreCd').val(),
			rstoreCd		: $('#obNdeliveryRStoreCd').val()
    	}
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

$(document).ready(function() {
	OutBoundNdeliveryApp.init();
});

