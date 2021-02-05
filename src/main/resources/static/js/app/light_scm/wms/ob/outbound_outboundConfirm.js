/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출하확정[OutboundConfirmApp]
 * Program Code     : PWMOB108E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 4. 10.  		First Draft.
*/

var OutboundConfirmApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB108E';
	var proNm = 'outboundConfirm';

    var gridObProgStCd;
    var gridObGbnCd;
    var gridItemStCd;
    var firstLoad = true;

    var $outboundConfirmHGrid = $("#outboundConfirmHGrid");
    var $outboundConfirmDGrid = $("#outboundConfirmDGrid");

    return {
        init: function(){

        	gridObGbnCd 	=  WMSUtil.fnCombo.grid_selectBox('outboundConfirmObGbnCd', 'OB_GBN_CD');

        	gridItemStCd 	=  WMSUtil.fnCombo.grid('ITEM_ST_CD');

        	gridObProgStCd 	= WMSUtil.fnCombo.grid_selectBox_range('outboundConfirmObProgStCd', 'OB_PROG_ST_CD', 8, 1, 80);

            fnEvents();

            fnList();

        },callBackInput: function(){
            return $callBackInput;
        }
    };

    //그리드 초기화
    function fnList(){
        $outboundConfirmHGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundConfirm/listOutboundConfirmH",
            sortable		: true,
            rownumbers		: true,
            height			: "163",
            //rowEditable: true,
            shrinkToFit		: false,
            rowEditable		: true,
            cellEditable	: false,
            multiselect		: true,
//            multielonly: true,
            domainId		: "OB_CONF",
            rowClickFocus	: true,
            postData		: sendData(),
            colModel: [
                {editable: false, name: "COMPANY_CD",       width:"100px",  align: "center", hidden:true},//회사번호
                {editable: false, name: "CLIENT_CD",        width:"100px",  align: "center", hidden:true},//고객사
                {editable: false, name: "CLIENT",           width:"100px",  align: "left",	 excel:true},//고객사명
                {editable: false, name: "DC_CD",            width:"100px",  align: "center", hidden:true},//물류센터
                {editable: false, name: "OB_PROG_ST_CD", 	width:"90px", 	align: "center", hidden:true
                }, //진행상태코드
                {editable: false, name: "OB_PROG_ST", 		width:"150px", 	align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObProgStCd }
                }, //진행상태코드
                {editable: false, name: "OB_YMD",           width:"100px",  align: "center", excel:true},//출고일자
                {editable: false, name: "OB_NO",            width:"100px",  align: "center", excel:true},//출고번호
                {editable: false, name: "SO_YMD",           width:"100px",  align: "center", excel:true},//주문일자
                {editable: false, name: "SO_NO",            width:"100px",  align: "center", excel:true},//주문번호
                {editable: false, name: "OB_GBN_CD", 		width:"80px", 	align: "center", hidden: true,
                },//출고구분
                {editable: false, name: "OB_GBN", 			width:"150px", 	align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObGbnCd }
                },//출고구분
                {editable: false, name: "STORE_CD",         width:"100px",   align: "center", excel:true},//판매처
                {editable: false, name: "STORE_NM",         width:"150px",   align: "left",   excel:true},//판매처명
                {editable: false, name: "RSTORE_CD",        width:"100px",   align: "center", excel:true},//납품처
                {editable: false, name: "RSTORE_NM",        width:"150px",   align: "left",   excel:true},//납품처명
                {editable: false, name: "CAR_NO",           width:"80px",    align: "center", excel:true},//차량
                {editable: false, name: "DELIVERY_DGR",     width:"80px",    align: "center", hidden: true },//배송차수
                {editable: false, name: "WAVE_NO",          width:"100px",   align: "center", excel:true},//웨이브번호
                {editable: false, name: "REMARK",           width:"200px",   align: "center", excel:true}//비고
            ],
            pager: "#outboundConfirmHGridNavi",
            gridComplete: function(){
            	//그리드 로딩시 데이터 1건이상이면 첫행 포커스
                var ids = $outboundConfirmHGrid.jqGrid("getDataIDs");
                if (ids && ids.length > 0) {
                    $outboundConfirmHGrid.setFocus(0);
                }

                var rowData = $outboundConfirmHGrid.getRowData(ids[0]);
                var data = {
                		obNo		: rowData.OB_NO,
                		clientCd	: rowData.CLIENT_CD
                }

                if (firstLoad) {
                    fnListD(data);
                } else {
                	if(ids.length > 0){
                		$outboundConfirmDGrid.paragonGridSearch(data);
                	}else{
                		$outboundConfirmDGrid.jqGrid('clearGridData');
                	}
                }
            },
            onSelectRowEvent: function(currRowData, prevRowData){
                var data = {
                    obNo: currRowData.OB_NO // 웨이브번호
                };
                $outboundConfirmDGrid.paragonGridSearch(data);
            },
        });
    }

    //상세 그리드 초기화
    function fnListD(data){
        $outboundConfirmDGrid.paragonGrid({
            url				:"/ctrl/outbound/outboundConfirm/listOutboundConfirmD",
            sortable		: true,
            rownumbers		: true,
            height			: "163",
            //rowEditable: true,
            shrinkToFit		: false,
            rowEditable		: true,
            cellEditable	: false,
            // multiselect: true,
            // multielonly: true,
            domainId		: "OB_CONF_DETAIL_LIST",
            postData		: data,
            rowNum 			: 50000,
            colModel: [
                {editable: false, name: "COMPANY_CD",       width:"100px", align: "center", hidden:true},//회사번호
                {editable: false, name: "CLIENT_CD",        width:"100px", align: "center", hidden:true},//고객사
                {editable: false, name: "DC_CD",            width:"100px", align: "center", hidden:true},//물류센터
                {editable: false, name: "OB_PROG_ST_CD", 	width:"90px", align: "center",  hidden:true,
                },//진행상태코드
                {editable: false, name: "OB_PROG_ST", 		width:"150px", align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObProgStCd }
                },//진행상태코드
                {editable: false, name: "OB_NO",            width:"100px", align: "center", hidden:true},//출고번호
                {editable: false, name: "OB_DETAIL_SEQ",    width:"90px",  align: "center", excel:true},//출고상세번호
                {editable: false, name: "PROMOTION_GBN",   	width: "35px", align: "center", excel:true }, //행사구분
                {editable: false, name: "ITEM_CD",          width:"100px", align: "center", excel:true},//제품코드
                {editable: false, name: "ITEM_NM",          width:"150px", align: "left", excel:true},//제품명
                {editable: false, name: "CONV_UOM_CD",      width:"80px",  align: "center", hidden:true},//입수
                {editable: false, name: "PKQTY",            width:"80px",  align: "center", formatter:"integer", excelDataType :"integer", excel:true},//단위도메인명처리2017.08.08
                {editable: false, name: "UOM",              width:"80px",  align: "center", excel:true},//입수도메인명처리2017.08.08
                {editable: false, name: "CONV_UOM_QTY",     width:"80px",  align: "right", hidden:true},//단위
                {editable: false, name: "PLAN_QTY",         width:"100px", align: "right", hidden:true},//출고예정수량
                {editable: false, name: "PLAN_TOT_QTY",     width:"100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},//출고예정총수량도메인명처리2017.08.08
                {editable: false, name: "PLAN_BOX_QTY",     width:"100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},//박스
                {editable: false, name: "PLAN_EA_QTY",      width:"100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true}, //낱개
                {editable: false, name: "CONF_QTY",         width:"100px", align: "right", formatter:"integer", hidden:true},//출고수량
                {editable: false, name: "CONF_TOT_QTY",     width:"100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},//승인수량도메인명처리2017.08.08
                {editable: false, name: "CONF_BOX_QTY",     width:"100px", align:"right",  formatter:"integer", excelDataType :"integer", excel:true},//박스
                {editable: false, name: "CONF_EA_QTY",      width:"100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},//낱개
                {editable: false, name: "NDELIVERY_BOX_QTY",width:"100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name: "WEIGHT",           width:"100px", align: "center", formatter:"integer", excelDataType :"integer", excel:true},//중량
                {editable: false, name: "ITEM_SPEC",        width:"100px", align: "center", excel:true},//제품규격
                {editable: false, name: "ITEM_ST_CD",       width:"80px",  align: "center", hidden:true},//제품상태코드
                {editable: false, name: "ITEM_ST",          width:"80px",  align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridItemStCd }
                },//제품상태도메인명처리2017.08.08
                {editable: false, name: "WAVE_NO",          width:"100px",   align: "center", hidden:true},//웨이브번호
                {editable: false, name: "REMARK",           width:"130px",   align: "left", excel:true}//비고
            ],
            groupHeaders:[
                {
                    rowspan : true,
                    header:[
                        {start: 'PLAN_TOT_QTY', length: 3 , domain:"PLAN_QTY"},
                        {start: 'CONF_TOT_QTY', length: 3 , domain:"CONF_QTY"}
                    ]
                }
            ],
            pager: "#outboundConfirmDGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete : function(){
            	//그리드 아래 부분 합계
            	var $footRow = $outboundConfirmDGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['OB_PROG_ST', 'OB_DETAIL_SEQ','PROMOTION_GBN','ITEM_CD', 'ITEM_NM', 'ITEM_SPEC', 'ITEM_ST', 'PKQTY'];
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'DGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'DGrid_UOM"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;
            	}

            	//총합계
            	fnTotalSum();
            }
        });
    }

    //전체 재고 합계 조회
    function fnTotalSum(){
    	var $grid =$outboundConfirmDGrid;

    	$grid.jqGrid('footerData','set', { PLAN_TOT_QTY 		: $grid.jqGrid('getCol', 'PLAN_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_BOX_QTY 		: $grid.jqGrid('getCol', 'PLAN_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_EA_QTY 			: $grid.jqGrid('getCol', 'PLAN_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { CONF_TOT_QTY 		: $grid.jqGrid('getCol', 'CONF_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { CONF_BOX_QTY 		: $grid.jqGrid('getCol', 'CONF_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { CONF_EA_QTY 			: $grid.jqGrid('getCol', 'CONF_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { NDELIVERY_BOX_QTY 	: $grid.jqGrid('getCol', 'NDELIVERY_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { WEIGHT 				: $grid.jqGrid('getCol', 'WEIGHT',false,'sum').toFixed(2)});

    }


    //이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting(proNm+'ObYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

        //고객사 팝업
        $("#outboundConfirmClientCdPopup").click(function(){
        	WMSUtil.popup.client(proNm + 'Client');
        });
        //배송처 팝업
        $("#outboundConfirmStoreCdBtn").click(function(){
        	WMSUtil.popup.store(proNm + 'Store', {clientCd : $('#'+proNm+'ClientCd').val()});
        });
        //실배송처 팝업
        $("#outboundConfirmRStoreCdBtn").click(function(){
        	WMSUtil.popup.rstore(proNm + 'RStore', {clientCd : $('#'+proNm+'ClientCd').val()});
        });
        //조회 버튼
        $("#outboundConfirmSearchBtn").click(function(){
            fnSearch();
        });
        //확정 버튼
        $("#outboundConfirmConfirmBtn").click(function(){
            var prog = "FW";
            var comfirm = "comf";
            fnConfirm(prog, comfirm);
        });
        //확정취소 버튼
        $("#outboundConfirmCancleBtn").click(function(){
            var prog = "BW";
            var comfirm = "cancel";
            fnConfirm(prog, comfirm);
        });
        //엑셀 다운로드
        $("#outboundConfirmExcelBtn").click(function(){
            var selectRow = $outboundConfirmDGrid.getGridParam('selrow');
            if(selectRow == null){
                $outboundConfirmHGrid.downloadExcelAllItems();
            }else{
                $outboundConfirmDGrid.downloadExcelAllItems();
            }

        });

        //레포트 출력
        $('#outboundConfirmReportBtn').click(function(){
        	var	sendData = {
        			grid		: $outboundConfirmHGrid,
        			url			: "/outboundCarLoadingReport",
        			key			: "OB_NO",
        			progSt		: 'OB_PROG_ST_CD',
        			progCd		: 80,
        			progFlag	: true,
        			errMsgCd	: 'MSG_COM_ERR_012',
        			//size		: "15",
        			data		: {
                        obNo	: "OB_NO"
        			},
        			addData : {
    					proCd	: 'PWMOB108E_R1',
    					type	: 'PDF'
        			}
        	};
        	WMSUtil.fnReport(sendData);

        })
    }

    //조회
    function fnSearch(){

        if($("#outboundConfirmClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#outboundConfirmClientCd").focus();
            return false;
        }else if($("#outboundConfirmClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#outboundConfirmClientCd").focus();
            return false;
        }

        if($("#outboundConfirmObYmdFr").val().length == 0){//출고일자
            Util.alert('MSG_COM_VAL_001', fnFindTabsSpanText($outboundConfirmHGrid, 'OB_YMD')); //{0} 항목은 필수 입력입니다.
            $("#outboundConfirmObYmdFr").focus();
            return false;
        }else if($("#outboundConfirmObYmdFr").val().trim().length == 0){
            Util.alert('MSG_COM_VAL_059', fnFindTabsSpanText($outboundConfirmHGrid, 'OB_YMD')); //{0}은(는) 공백만으로 입력할 수 없습니다.
            $("#outboundConfirmObYmdFr").focus();
            return false;
        }

        if($("#outboundConfirmObYmdTo").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#outboundConfirmObYmdTo").focus();
            return false;
        }else if($("#outboundConfirmObYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#outboundConfirmObYmdTo").focus();
            return false;
        }

        $outboundConfirmHGrid.paragonGridSearch(sendData());
    }

    //데이터
    function sendData(){
    	return {
            clientCd	: $("#outboundConfirmClientCd").val(),
            obYmdFr		: WMSUtil.fnDateSetting.yyyymmdd($("#outboundConfirmObYmdFr").val()),
            obYmdTo		: WMSUtil.fnDateSetting.yyyymmdd($("#outboundConfirmObYmdTo").val()),
            obNo		: $("#outboundConfirmObNo").val(),
            obGbnCd		: $("#outboundConfirmObGbnCd option:selected").val(),
            carNo		: $("#outboundConfirmCarNo").val(),
            deliveryDer	: $("#outboundConfirmDeliveryDgr").val(),
            storeCd		: $("#outboundConfirmStoreCd").val(),
            obProgStCd	: $("#outboundConfirmObProgStCd option:selected").val(),
            soNo		: $("#outboundConfirmSoNo").val(),
            rstoreCd	: $("#outboundConfirmRStoreCd").val(),
            pickNo		: $("#outboundConfirmSeqNo").val(),
            pickLocCd	: $("#outboundConfirmLoc").val(),
            waveNo		: $("#outboundConfirmWaveNo").val()
    	}
    }


    //[Fn] 확정 버튼 이벤트
    function fnConfirm(progData, comfirm){
        var saveUrl = "/ctrl/outbound/outboundConfirm/updateOutboundConfirm";
        var msg = "";
        var rowData = {
            clientCd: "CLIENT_CD",
            obNo: "OB_NO",//출고번호
            obDetailSeq: "OB_DETAIL_SEQ",//출고상세번호
            //obWorkNo:"OB_WORK_NO", //작업번호
            waveNo:"WAVE_NO", //웨이브번호
            opRuleCd:"",
            prog: ""
        };

        //1. 체크된 리스트.
        var jsonData = $outboundConfirmHGrid.getSelectedJsonData("dt_data", rowData);
        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }
        var jsonObject = JSON.parse(jsonData);
        var rowid = $outboundConfirmHGrid.getGridParam("selrow");
        var obProgStCd = $outboundConfirmHGrid.getRowData(rowid).OB_PROG_ST_CD;

        jsonObject.prog = progData;

        //출하확정
        if(comfirm === "comf"){
            if(Number(obProgStCd) < 80){
                msg = "MSG_OUTRI_CFM_012"; //출하확정 하시겠습니까?
                jsonObject.opRuleCd = "2007";

                //ajax Event.
            	WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
            		$outboundConfirmHGrid.paragonGridReload();
            	})
            }else{
                Util.alertCode('MSG_COM_VAL_068', 'OB_PROG_ST_CD', 70); //{0}상태만 확정가능합니다.
                return false;
            }
        }else {
            //출하확정 취소
            if(Number(obProgStCd) === 80){
                msg = "MSG_OUTRI_CFM_013"; //확정취소 하시겠습니까?

                jsonObject.opRuleCd = "2007";

                //ajax Event.
            	WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
            		$outboundConfirmHGrid.paragonGridReload();
            	})

            }else{
                Util.alertCode('MSG_COM_VAL_072', 'OB_PROG_ST_CD', 80); //{0}상태만 취소가능합니다.
                return false;
            }
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

$(document).ready(function(){
    OutboundConfirmApp.init();
});
