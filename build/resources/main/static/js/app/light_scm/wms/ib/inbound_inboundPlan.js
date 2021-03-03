/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입하예정등록[IbPlanInsertApp]
 * Program Code     : PWMIB101E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 20.  		First Draft.
 */
var IbPlanInsertApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMIB101E';
	var proNm = 'ibPlan';

	// [El]프로그램 그리드
	var $ibPlanHGrid = $("#ibPlanHGrid");

	var $ibPlanDGrid = $("#ibPlanDGrid");

	var ibProgStComboJson;
	var ibGbnComboJson;
	var ibItemStComboJson;
	var gridExportCountryCd;
	var gridDalatYn;

	var $callBackInput;

	var firstLoad = true;
	var dFirstLoad = true;
	var rowDataList;

	var gridHeight = '178';

    return {
        init: function () {

        	ibProgStComboJson 		= WMSUtil.fnCombo.grid_selectBox('inPlanIbProgStCd', 'IB_PROG_ST_CD');

        	ibGbnComboJson 			= WMSUtil.fnCombo.grid_selectBox('ibPlanIbGbnCd', 'IB_GBN_CD');

        	ibItemStComboJson 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');

        	gridExportCountryCd	 	= WMSUtil.fnCombo.grid('COUNTRY_CD');

        	gridDalatYn	 			= WMSUtil.fnCombo.grid('YN', 'DESC');

        	fnEvents();

        	fnListH();

	    },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    //[Fn] 이벤트
    function fnEvents(){

    	//조회조건 달력.
    	WMSUtil.fnTagYmdSetting('ibPlanYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Supplier');

    	//추가버튼
    	$("#ibPlanNewBtn").click(function(){
    		fnModify("INSERT");
    	});
    	//검색버튼
    	$("#ibPlanSearchBtn").click(function(){
    		fnSearch();
    	});
    	//삭제버튼
    	$("#ibPlanDelBtn").click(function(){
    	    fnDelete();
    	});
    	//엑셀버튼
    	$("#ibPlanExcelBtn").click(function(){
    	    var selectRow = $ibPlanDGrid.getGridParam('selrow');
    	    if(selectRow == null){
    	        $ibPlanHGrid.downloadExcelAllItems();
    	    }else{
    	        $ibPlanDGrid.downloadExcelAllItems();
    	    }
    	});

    	//고객사 팝업
        $("#ibPlanClientPopup").click(function(){
        	WMSUtil.popup.client('ibPlanClient');
        });

        //공급처 팝업
        $("#ibPlanSupplierPopup").click(function(){
        	WMSUtil.popup.supplier('ibPlanSupplier');
        });

        //고객사명 수정불가
        $("#ibPlanClientNm").attr("disabled", true);

    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //validation
        if($("#ibPlanClientCd").val().length == 0){//고객사코드
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibPlanClientCd").focus();
            return false;
        }else if($("#ibPlanClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibPlanClientCd").focus();
            return false;
        }
        if($("#ibPlanYmdFr").val().length == 0){//입고예정일자
            Util.alert('MSG_INRI_VAL_003'); //입고예정일자 항목은 필수 입력입니다.
            $("#ibPlanYmdFr").focus();
            return false;
        }else if($("#ibPlanYmdFr").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_004'); //입고예정일자는 공백만으로 입력할 수 없습니다.
            $("#ibPlanYmdFr").focus();
            return false;
        }
        if($("#ibPlanYmdTo").val().length == 0){//입고예정일자
            Util.alert('MSG_INRI_VAL_003'); //입고예정일자 항목은 필수 입력입니다.
            $("#ibPlanYmdTo").focus();
            return false;
        }else if($("#ibPlanYmdTo").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_004'); //입고예정일자는 공백만으로 입력할 수 없습니다.
            $("#ibPlanYmdTo").focus();
            return false;
        }
    	$ibPlanHGrid.paragonGridSearch(sendData());
    }

    //데이터 SET. 그리드 조건, 그리드 PostData사용
    function sendData(){
    	return {
	        clientCd 	: $.trim($("#ibPlanClientCd").val()),
			supCd 		: $.trim($("#ibPlanSupplierCd").val()),
			ibPlanYmdFr : WMSUtil.fnDateSetting.yyyymmdd($('#ibPlanYmdFr').val()),
			ibPlanYmdTo : WMSUtil.fnDateSetting.yyyymmdd($('#ibPlanYmdTo').val()),
			ibProgStCd 	: $.trim($("#inPlanIbProgStCd").val()),
			ibGbnCd 	: $.trim($("#ibPlanIbGbnCd").val()),
			ibNo 		: $.trim($("#ibPlanIbNo").val()),
			carNo 		: $.trim($("#inPlanCarNo").val())
    	};
    }

    function fnListH(){
        $ibPlanHGrid.paragonGrid({
        	url				: '/ctrl/inbound/inboundPlan/listInboundPlanH',
        	rowEditable		: true,
            cellEditable	: false,
			sortable		: true,
			rownumbers		: true,
			shrinkToFit		: false,
			multiselect		: true,
			//postData:{clientCd:$.trim($("#ibPlanClientCd").val())},
//			multielonly:true,
			height			: gridHeight,
			postData		: sendData(),
            colModel:[
                {editable: false, name:'CLIENT_CD',     width:"100px", align:"left", hidden:true},
                {editable: false, name:'CLIENT',        width:"150px", align:"left", excel:true},
                {editable: false, name:'IB_PROG_ST_CD', width:"100px", align:"left", hidden:true},
                {editable: false, name:'IB_PROG_ST',    width:"150px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : ibProgStComboJson }
                },
                {editable: false, name:'IB_PLAN_YMD',   width:"80px",  align:"center", excel:true
//                	formatoptions: {'srcformat' : 'Y-m-d H:i:s', 'newformat' : 'm-d-Y H:i' }
                },
                {editable: false, name:'IB_YMD',        width:"80px",  align:"center", excel:true},
                {editable: false, name:'IB_NO',         width:"100px", align:"center", excel:true},
                {editable: false, name:'PO_YMD',        width:"80px",  align:"center", excel:true },
                {editable: false, name:'PO_NO',         width:"100px", align:"center", excel:true },
                {editable: false, name:'IB_GBN_CD',     width:"100px", align:"left", hidden:true},
                {editable: false, name:'IB_GBN',        width:"150px", align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : ibGbnComboJson }
                },
                {editable: false, name:'CAR_NO',        width:"100px", align:"center", excel:true },
                {editable: false, name:'EXAM_DT',       width:"110px", align:"center", excel:true },
                {editable: false, name:'SUPPLIER_CD',   width:"100px", align:"center", excel:true },
                {editable: false, name:'SUPPLIER_NM',   width:"200px", align:"left", excel:true },
                {editable: false, name:'REMARK',        width:"280px", align:"left", excel:true }
            ],
            pager			: "#ibPlanHGridNavi",
            domainId		: "IB_PLAN_LIST",
            rowClickFocus	: true,
            gridComplete	: function(){
                var ids = $ibPlanHGrid.jqGrid("getDataIDs");

                //행이 1개 이상일때 포커스
                if(ids && ids.length > 0){
                    $ibPlanHGrid.setFocus(0);
                }

                //첫로딩 D그리드 생성, 그 외 조회효과
                var ibNo 		= $ibPlanHGrid.getRowData(ids[0]).IB_NO;
                var clientCd 	= $ibPlanHGrid.getRowData(ids[0]).CLIENT_CD;

                if(firstLoad){
                    fnListIbPlanD(ibNo);
                    firstLoad = false;

                }else{
                    if(ibNo != null){
                        $ibPlanDGrid.paragonGridSearch({ibNo:ibNo, clientCd:clientCd});
                    }else{
                        $ibPlanDGrid.paragonGridSearch({ibNo:null});
                    }
                }
           },onSelectRowEvent: function(currRowData, prevRowData){
               $ibPlanDGrid.paragonGridSearch({ibNo:currRowData.IB_NO});
           },
           ondblClickCustom: function(id, iRow, iCol, e){
               rowDataList = $ibPlanHGrid.getRowData(iRow);
               if(rowDataList.IB_PROG_ST_CD == '10'){
                   fnModify("MODIFY");
               }else{
                   Util.alertCode('MSG_COM_VAL_060', 'IB_PROG_ST_CD', 10); //{0}상태만 수정가능합니다.
                   return false;
               }
           }
        });
	}

    //function fnListIbPlanD(ibNo){
    function fnListIbPlanD(ibNo, clientCd){
        $ibPlanDGrid.paragonGrid({
            url				: '/ctrl/inbound/inboundPlan/listInboundPlanD',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            postData		:
            {
            	ibNo		: ibNo,
            	clientCd	: $.trim($("#ibPlanClientCd").val())
        	},
            height			: gridHeight,
            colModel		: [
                {editable: false, name:'IB_NO', 		width:"100px", 	align:"center", hidden:true},
                {editable: false, name:'IB_PROG_ST_CD', width:"70px", 	align:"center", hidden:true},
                {editable: false, name:'IB_PROG_ST', 	width:"150px", 	align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText',   editoptions: { value : ibProgStComboJson }
                },
                {editable: false, name:'IB_DETAIL_SEQ', width:"100px", 	align:"center", excel:true	},
                {editable: false, name:'ITEM_CD', 		width:"100px", 	align:"center", excel:true	},
                {editable: false, name:'ITEM_NM',		width:"150px", 	align:"left",   excel:true	},
                {editable: false, name:'PKQTY', 		width:"100px", 	align:"center", excel:true,  formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'UOM', 			width:"100px", 	align:"center",	excel:true	},
                {editable: false, name:'PLAN_QTY',		width:"100px",	align:"right",	hidden: true,			excelDataType : "integer"},
                {editable: false, name:'PLAN_TOT_QTY',	width:"100px",	align:"right",	excel:true,	formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'PLAN_BOX_QTY', 	width:"100px", 	align:"right", 	excel:true,	formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'PLAN_EA_QTY',  	width:"100px", 	align:"right", 	excel:true,	formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'CONF_QTY',		width:"100px",	align:"right",	hidden: true,			excelDataType : "integer"},
                {editable: false, name:'CONF_TOT_QTY',	width:"100px",	align:"right",	excel:true,	formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'CONF_BOX_QTY', 	width:"100px", 	align:"right", 	excel:true,	formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'CONF_EA_QTY',  	width:"100px", 	align:"right", 	excel:true,	formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'PLT_PKQTY', 	width:"100px", 	align:"center",	excel:true,	formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'PLAN_WEIGHT',  	width:"90px", 	align:"right", 	excel:true,	formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'MAKE_LOT',     	width:"100px", 	align:"center",	excel:true},
                {editable: false, name:'MAKE_YMD',     	width:"80px", 	align:"center",	excel:true},
                {editable: false, name:'DIST_EXPIRY_YMD', width:"80px", align:"center",	excel:true},
                {editable: false, name:'ITEM_SPEC',    	width:"100px", 	align:"center",	excel:true},
                {editable: false, name:'ITEM_ST_CD',   	width:"100px", 	align:"center",	hidden:true},
                {editable: false, name:'ITEM_ST',      	width:"100px", 	align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibItemStComboJson }
                },
                {editable: false, name:'LOT_ATTR1',		width:"100px", 	align:"center",	excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2',    	width:"100px", 	align:"center",	excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridDalatYn }
                },
                {editable: false, name:'LOT_ATTR3',    	width:"100px", 	align:"center",	excel:true,},
                {editable: false, name:'LOT_ATTR4',    	width:"100px", 	align:"left",	excel:true,},
                {editable: false, name:'LOT_ATTR5',    	width:"100px", 	align:"left",	excel:true,}
            ],
            pager			: "#ibPlanDGridNavi",
            domainId		: "IB_PLAN_DETAIL_LIST",
            rowClickFocus	: true,
            groupHeaders	:
            			[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'PLAN_TOT_QTY', length: 3 , domain:"PLAN_QTY"},
                                  {start: 'CONF_TOT_QTY', length: 3 , domain:"CONF_QTY" }
                              ]
                          }
                      ],
          gridComplete:function(){
        	  if(dFirstLoad){
              	//그리드 동적
              	WMSUtil.pwaGridDynamicArea(proNm)
              	dFirstLoad = false;
        	  }
          }
        });
    }

    function fnModify(flag) {
    	var popIbPlanGbn = false;

    	if(flag == "INSERT"){
    		//신규
    		popIbPlanGbn = false;
    	}else if(flag == "MODIFY"){
    		//수정
    		popIbPlanGbn 	= true;
    	}

    	PopApp.paragonOpenPopup({
            ajaxUrl		: '/ctrl/inbound/inboundPlan/createInboundPlanPop',
            id			: 'modifyIbPlanPop',
            width		: '80',
            data		: {
    			gbn		: popIbPlanGbn,
    			rowData : rowDataList
            },
            domainId	: "PWMIB101E_P1",
            visible		: true,
            callback 	: function(){
            	$ibPlanHGrid.paragonGridReload();
            }
        });
    }

    function fnDelete() {

	    var flag = $ibPlanHGrid.paragonGridCheckedDeleteData();

	    if(flag != undefined){
	        // 데이터 키 : Value Key
	        var rowData = {
	                modFlag		: "MOD_FLAG" ,
	                clientCd	: "CLIENT_CD" ,
	                ibNo		: "IB_NO",
	                ibProgStCd	: "IB_PROG_ST_CD"
	        }

	        var jsonData = $ibPlanHGrid.getSelectedJsonData("dt_inboundPlanInfo",rowData);
	        var data = JSON.parse(jsonData).dt_inboundPlanInfo;

	        for (var i = 0; i < data.length; i++) {
	            var progStCd = data[i].ibProgStCd;
	            if(progStCd != "10"){
	                Util.alertCode('MSG_COM_VAL_070', 'IB_PROG_ST_CD', 10); //{0}상태만 삭제가능합니다.
	                return false;
	            }
	        }

	        var saveUrl = '/ctrl/inbound/inboundPlan/deleteInboundPlanInfo';
	        var msg = 'MSG_COM_CFM_001';

	        //ajax
	        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
	        	$ibPlanHGrid.paragonGridReload();
	    	})
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

var parentId = '';
$(document).ready(function() {
    IbPlanInsertApp.init();
});
