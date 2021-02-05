/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고예정등록[OutBoundPlanApp]
 * Program Code     : PWMOB101E
 * Description      :
 * Revision History
 * Author           Date                Description
 * -------------------------------------------
 * Lee Sung Guk     2017. 3. 16.        First Draft.
 */

var OutBoundPlanApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB101E';
	var proNm = 'obPlan';


    var $obPlanHeaderGrid = $("#obPlanHeaderGrid");
    var $obPlanDetailGrid = $("#obPlanDetailGrid");

    var $callBackInput;

    var firstLoad = true;

    var obGbnJson;
    var obProgStCdJson;
    var gridExportCountryCd;
    var gridDalatYn;

    var gridObGbnCd; //출고구분
    var gridObProgStCd; //진행상태
    var gridItemStCd; //제품상태

    var gridHeight = '183';

    return {
        init: function() {

        	gridObGbnCd 		= WMSUtil.fnCombo.grid_selectBox('obPlanObGbnCd', 'OB_GBN_CD');
        	gridObProgStCd 		= WMSUtil.fnCombo.grid_selectBox('obPlanObProgStCd', 'OB_PROG_ST_CD');
        	gridItemStCd 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');
           	gridExportCountryCd	= WMSUtil.fnCombo.grid('COUNTRY_CD');
        	gridDalatYn	 		= WMSUtil.fnCombo.grid('YN', 'DESC');

            fnEvent();

            fnList();
        },
        callBackInput: function() {
            return $callBackInput;
        }
    };

    //그리드 초기화
    function fnList() {
    	$obPlanHeaderGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundPlan/listOutboundPlan",
            sortable		: true,
            rownumbers		: true,
            height			: gridHeight,
            rowEditable		: true,
            cellEditable	: false,
            multiselect		: true,
            multielonly		: true,
            rowClickFocus	: true,
            shrinkToFit		: false,
            domainId		: "OB_PLAN_LIST",
            postData		: sendData(),
            colModel: [
                { editable: false, name: "CLIENT_CD", 		width: "150px", align: "center", hidden: true },
                { editable: false, name: "CLIENT", 			width: "100px", align: "left", excel:true 	},
                { editable: false, name: "OB_PROG_ST_CD", 	width: "100px", align: "center", hidden: true },
                { editable: false, name: "OB_PROG_ST", 		width: "100px", align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObProgStCd }
                },
                { editable: false, name: "OB_GBN_CD", 		width: "100px",	align: "center", hidden: true },
                { editable: false, name: "OB_GBN", 			width: "80px", 	align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObGbnCd }
                },
                { editable: false, name: "OB_PLAN_YMD", 	width: "100px", align: "center", excel:true },
                { editable: false, name: "OB_YMD", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "OB_NO", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "SO_YMD", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "SO_NO", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "STORE_CD", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "STORE_NM", 		width: "150px", align: "left", excel:true },
                { editable: false, name: "RSTORE_CD", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "RSTORE_NM", 		width: "150px", align: "left", excel:true },
                { editable: false, name: "CAR_NO", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "IB_PLAN_YMD", 	width: "100px", align: "center", excel:true },
                { editable: false, name: "REMARK", 			width: "330px", align: "center", excel:true },
                { editable: false, name: "DELIVERY_DGR", 	width: "60px", 	align: "center" , hidden: true },
            ],
            pager: "#obPlanHeaderGridNavi",
            gridComplete: function() {

            	//그리드 데이터 1건이상존재시
            	//포커스
                var ids = $obPlanHeaderGrid.jqGrid("getDataIDs");
                if (ids && ids.length > 0) {
                    $obPlanHeaderGrid.setFocus(0);
                }

                var data = $obPlanHeaderGrid.getRowData(ids[0]);
                var dataJson = {
                        obNo		: data.OB_NO,
                        clientCd	: data.CLIENT_CD
                    };

                //그리드를 처음 로드할때 상세그리드 생성, 2번째 이후부터는 조회처리.
                if (firstLoad) {
                    //화면 처음 로드 시 헤더, 디테일 그리드 생성 중 디테일 부분.
                    fnListD(dataJson);
                } else {

                	if(ids && ids.length > 0){
                		$obPlanDetailGrid.paragonGridSearch(dataJson);
                	}else{
                		$obPlanDetailGrid.jqGrid('clearGridData');
                	}
                }
            },
            onSelectRowEvent: function(currRowData, prevRowData) {
                //클릭시 디테일 그리드 조회
                $obPlanDetailGrid.paragonGridSearch({ obNo: currRowData.OB_NO });
            },
            ondblClickCustom: function(id, iRow, iCol, e) {
            	var rowData = $obPlanHeaderGrid.getRowData(iRow)
                if (rowData.OB_PROG_ST_CD == "10") {
                    fnModify("MODIFY", rowData);
                } else {
                    Util.alertCode('MSG_COM_VAL_060', 'OB_PROG_ST_CD', 10); //{0}상태만 수정가능합니다.
                    return false;
                }
            },
        });
    }
    //출고예정 상세 그리드
    function fnListD(dataJson) {
        $obPlanDetailGrid.paragonGrid({
            url			: "/ctrl/outbound/outboundPlan/listOutboundPlanDetail",
            sortable	: true,
            rownumbers	: true,
            height		: gridHeight,
            domainId	: "OB_PLAN_DETAIL_LIST",
            shrinkToFit	: false,
            rowNum 			: 50000,
            postData	: dataJson,
            colModel	: [
				{ editable: false, name: "OB_PROG_ST_CD", 		width: "100px", align: "center", hidden: true },
				{ editable: false, name: "OB_PROG_ST", 			width: "100px", align: "center", excel:true,
				    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObProgStCd }
				},
                { editable: false, name: "OB_NO", 				width: "100px", align: "center", hidden: true },
                { editable: false, name: "OB_DETAIL_SEQ", 		width: "80px", 	align: "center", excel:true },
                { editable: false, name: "PROMOTION_GBN", 		width: "35px", 	align: "center", excel:true },
                { editable: false, name: "ITEM_CD", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "ITEM_NM", 			width: "150px", align: "left", excel:true 	},
                { editable: false, name: "CONV_UOM_QTY", 		width: "100px", align: "right", hidden: true, formatter:"integer"},
                { editable: false, name: "PKQTY", 				width: "100px",	align: "center", excel:true,  formatter:"integer",	excelDataType : "integer"},
                { editable: false, name: 'PLT_PKQTY', 			width: "100px", align: "center", hidden: true , formatter:"integer"},
                { editable: false, name: "CONV_UOM_CD", 		width: "100px", align: "center", hidden: true },
                { editable: false, name: "UOM", 				width: "100px", align: "center", excel:true },
                { editable: false, name: "PLAN_QTY", 			width: "100px", align: "right", hidden: true , formatter:"integer"},
                { editable: false, name: "PLAN_TOT_QTY",		width: "100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "PLAN_BOX_QTY", 		width: "100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "PLAN_EA_QTY", 		width: "100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "WEIGHT", 				width: "100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "MAKE_YMD", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "MAKE_LOT", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "DIST_EXPIRY_YMD", 	width: "100px", align: "center", excel:true },
                { editable: false, name: "ITEM_SPEC", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "ITEM_ST_CD", 			width: "100px", align: "center", hidden: true },
                { editable: false, name: "ITEM_ST",				width: "100px",align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridItemStCd }
                },
//                { editable: false, name: "LOT_ATTR1", width: "100px", align: "center" }, //LOT속성1
//                { editable: false, name: "LOT_ATTR2", width: "100px", align: "center" }, //LOT속성2
                {editable: false, name:'LOT_ATTR1',				width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2',      		width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridDalatYn }
                },
                { editable: false, name: "LOT_ATTR3", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "LOT_ATTR4", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "LOT_ATTR5", 			width: "100px", align: "center", excel:true },
            ],
            groupHeaders	:
            	[{
            		rowspan	: true,
            		header	: [{ start: 'PLAN_TOT_QTY', length: 3, domain: "PLAN_QTY" }]
            	}],
//            pager: "#obPlanDetailGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete : function(){
            	//그리드 아래 부분 합계
            	var $footRow = $obPlanDetailGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['OB_PROG_ST','OB_DETAIL_SEQ','PROMOTION_GBN', 'ITEM_CD', 'ITEM_NM', 'PKQTY'];
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
            }
        });
    }

    //전체 재고 합계 조회
    function fnTotalSum(){
    	var $grid =$obPlanDetailGrid;

    	$grid.jqGrid('footerData','set', { PLAN_TOT_QTY 		: $grid.jqGrid('getCol', 'PLAN_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_BOX_QTY 		: $grid.jqGrid('getCol', 'PLAN_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_EA_QTY 			: $grid.jqGrid('getCol', 'PLAN_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { WEIGHT 			: $grid.jqGrid('getCol', 'WEIGHT',false,'sum').toFixed(2)});

    }

    //이벤트
    function fnEvent() {

    	//달력
    	WMSUtil.fnTagYmdSetting('obPlanYmd', true, true);

    	//사용불가
    	$("#obPlanClientNm").attr("disabled", true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

        //검색 버튼 이벤트
        $("#obPlanSearchBtn").click(function() {
            fnSearch();
        });

        //고객사 팝업
        $("#obPlanClientPopup").click(function() {
        	WMSUtil.popup.client('obPlanClient');
        });

        //배송처 팝업
        $("#obPlanStoreBtn").click(function(){
          WMSUtil.popup.store('obPlanStore', {clientCd : $('#obPlanClientCd').val()});
        });

        //실배송처 팝업
        $("#obPlanRStoreBtn").click(function(){
          WMSUtil.popup.rstore('obPlanRStore', {clientCd : $('#obPlanClientCd').val()});
        });

        //삭제 버튼
        $("#obPlanDelBtn").click(function() {
            fnDel();
        });

        //추가 버튼 클릭 이벤트
        $("#obPlanNewBtn").click(function() {
            fnModify("INSERT");
        });

        //엑셀 다운로드 버튼
        $("#obPlanExcelBtn").click(function() {
            var selectRow = $obPlanDetailGrid.getGridParam('selrow');
            if(selectRow == null){
                $obPlanHeaderGrid.downloadExcelAllItems();
            }else{
                $obPlanDetailGrid.downloadExcelAllItems();
            }
        });
    }

    //그리드 조회
    function fnSearch() {
        if($("#obPlanClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obPlanClientCd").focus();
            return false;
        }else if($("#obPlanClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obPlanClientCd").focus();
            return false;
        }

        if($("#obPlanYmdFr").val().length == 0){//출고예정일
            Util.alert('MSG_OUTRI_VAL_001'); //출고예정일자 항목은 필수 입력입니다.
            $("#obPlanYmdFr").focus();
            return false;
        }else if($("#obPlanYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_002'); //출고예정일자는 공백만으로 입력할 수 없습니다.
            $("#obPlanYmdFr").focus();
            return false;
        }

        if($("#obPlanYmdTo").val().length == 0){
            Util.alert('MSG_OUTRI_VAL_001'); //출고예정일자 항목은 필수 입력입니다.
            $("#obPlanYmdTo").focus();
            return false;
        }else if($("#obPlanYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_002'); //출고예정일자는 공백만으로 입력할 수 없습니다.
            $("#obPlanYmdTo").focus();
            return false;
        }

        //그리드 수정 여부 체크
        if (fnModCheck()) {
            $obPlanHeaderGrid.paragonGridSearch(sendData());
        }
    }

    //작업 진행시 그리드 수정사항 확인
    function fnModCheck() {
        return $obPlanHeaderGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    //삭제
    function fnDel() {
    	//로우 삭제
        var addFlag = $obPlanHeaderGrid.paragonGridCheckedDeleteData();

        if(addFlag){
	        var rowid = $obPlanHeaderGrid.getGridParam("selrow");
	        var obProgStCd = $obPlanHeaderGrid.getRowData(rowid).OB_PROG_ST_CD;

	        //삭제 가능 유효성검사
	        if (Number(obProgStCd) != 10){
	            Util.alertCode('MSG_COM_VAL_070', 'OB_PROG_ST_CD', 10); //{0}상태만 삭제가능합니다.
	            return false;
	        }

            var rowData = {
                modFlag	: "MOD_FLAG",
                obNo	: "OB_NO"
            };

            //1. 체크된 리스트.
            var jsonData = $obPlanHeaderGrid.getSelectedJsonData("dt_data", rowData);
            var saveUrl = "/ctrl/outbound/outboundPlan/updateOutboundPlan";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            	$obPlanHeaderGrid.paragonGridReload();
        	})
        }
    }

    //출고예정 신규/수정 팝업
    function fnModify(flag, rowData) {
        PopApp.paragonOpenPopup({
            ajaxUrl	: "/ctrl/outbound/outboundPlan/outboundPlanPop",
            id		: "modifyObPlanPop",
            width	: '80',
            btnName	: "수정",
            data : {
            	flag 	: flag,
            	rowData : rowData
            },
            domainId	: "PWMOB101E_P1",
            visible		: true,
            onload		: function(modal) {
                //App.prcsEnd();
            }, callback : function(data){
            	$obPlanHeaderGrid.paragonGridReload();
            }
        });
    }

    //데이터
    function sendData(){
    	return {
            clientCd		: $("#obPlanClientCd").val(),
            obPlanYmdFr		: WMSUtil.fnDateSetting.yyyymmdd($('#obPlanYmdFr').val()),
            obPlanYmdTo		: WMSUtil.fnDateSetting.yyyymmdd($('#obPlanYmdTo').val()),
            obNo			: $("#obPlanObNo").val(),
            carNo			: $("#obPlanCarNo").val(),
            deliveryDgr		: $("#obPlanDeliveryDgr").val(),
            obGbnCd			: $("#obPlanObGbnCd option:selected").val(),
            storeCd			: $("#obPlanStoreCd").val(),
            rstoreCd		: $("#obPlanRStoreCd").val(),
            obProgStCd		: $("#obPlanObProgStCd option:selected").val(),
            soNo			: $("#obPlanSoNo").val()
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
    OutBoundPlanApp.init();
});

