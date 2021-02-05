/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입하승인[IbApprovalApp]
 * Program Code     : PWMIB103E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 20.  		First Draft.
 */
var IbApprovalApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMIB103E';
	var proNm = 'ibAppr';

	// [El]프로그램 그리드
	var $HGrid = $("#ibApprHeaderGrid");

	var $DGrid = $("#ibApprDetailGrid");

	var ibProgStComboJson;
	var ibGbnComboJson;
	var ibItemStComboJson;
	var gridExportCountryCd;
	var gridDalatYn;

	var $callBackInput;

	var firstLoad = true;

	var gridHeight = '155';

    return {
        init: function () {
            //WMSUtil.fnCombo.grid_selectBox_range('ibInstProgStCd', 'IB_PROG_ST_CD', 4, 1);
        	ibProgStComboJson 		= WMSUtil.fnCombo.grid_selectBox_range('ibApprIbProgStCd', 'IB_PROG_ST_CD', 2, 1);
            //
            ibGbnComboJson 			= WMSUtil.fnCombo.grid_selectBox('ibApprIbGbnCd', 'IB_GBN_CD');

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

    	WMSUtil.fnTagYmdSetting('ibApprYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Supplier');

        //입고승인 버튼 이벤트
        $("#ibApprSaveBtn").click(function() {
            fnApproval("FW", "appr");
        });

        //입고승인 취소 버튼 이벤트
        $("#ibApprCancelBtn").click(function() {
            fnApproval("BW", "cancle");
        });

    	//검색버튼
    	$("#ibApprSearchBtn").click(function(){
    		fnSearch();
    	});

    	//엑셀버튼
    	$("#ibApprExcelBtn").click(function(){
    	    var selectRow = $DGrid.getGridParam('selrow');
            if(selectRow == null){
                $HGrid.downloadExcelAllItems();
            }else{
                $DGrid.downloadExcelAllItems();
            }
    	});

    	//저장
        $("#ibApprDetailSaveBtn").click(function(){
            fnDeatilSave();
        });

        //고객사 팝업
        $("#ibApprClientPopup").click(function(){
            WMSUtil.popup.client("ibApprClient");
        });

        //공급처 팝업
        $("#ibApprSupplierPopup").click(function(){
            WMSUtil.popup.supplier("ibApprSupplier");
        });

        $("#ibApprClientNm").attr("disabled", true);

    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //validation
        if($("#ibApprClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibApprClientCd").focus();
            return false;
        }else if($("#ibApprClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibApprClientCd").focus();
            return false;
        }
        if($("#ibApprYmdFr").val().length == 0){//입고예정일자 검사
            Util.alert('MSG_INRI_VAL_003'); //입고예정일자 항목은 필수 입력입니다.
            $("#ibApprYmdFr").focus();
            return false;
        }else if($("#ibApprYmdFr").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_004'); //입고예정일자는 공백만으로 입력할 수 없습니다.
            $("#ibApprYmdFr").focus();
            return false;
        }
        if($("#ibApprYmdTo").val().length == 0){//입고예정일자 검사
            Util.alert('MSG_INRI_VAL_003'); //입고예정일자 항목은 필수 입력입니다.
            $("#ibApprYmdTo").focus();
            return false;
        }else if($("#ibApprYmdTo").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_004'); //입고예정일자는 공백만으로 입력할 수 없습니다.
            $("#ibApprYmdTo").focus();
            return false;
        }


    	$HGrid.paragonGridSearch(sendData());
    }

    function sendData(){
    	return {
    	        clientCd 		: $.trim($("#ibApprClientCd").val()),
				supCd 			: $.trim($("#ibApprSupplierCd").val()),
				frIbPlanYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#ibApprYmdFr').val()),
				toIbPlanYmd 	: WMSUtil.fnDateSetting.yyyymmdd($('#ibApprYmdTo').val()),
				ibProgStCd 		: $.trim($("#ibApprIbProgStCd").val()),
				ibGbnCd 		: $.trim($("#ibApprIbGbnCd").val()),
				ibNo 			: $.trim($("#ibApprIbNo").val()),
				carNo 			: $.trim($("#ibApprCarNo").val())
    	}
    }

    /********************************************************************
     * 그리드 생성
     * Since   : 2017-02-20
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    function fnListH(){
        $HGrid.paragonGrid({
        	url				: '/ctrl/inbound/inboundApproval/listIbApprH',
        	rowEditable		: true,
            cellEditable	: false,
			sortable		: true,
			rownumbers		: true,
			shrinkToFit		: false,
			multiselect		: true,
			//postData:{clientCd:$.trim($("#ibApprClientCd").val())},
//			multielonly:true,
			rowClickFocus	: true,
			height			: gridHeight,
			postData		: sendData(),
            colModel:[
                {editable: false, name:'CLIENT_CD', 	width:"100px", align:"center",	hidden:true},
                {editable: false, name:'CLIENT', 		width:"150px", align:"left", excel:true		},
                {editable: false, name:'IB_PROG_ST_CD', width:"100px", align:"center",	hidden:true},
                {editable: false, name:'IB_PROG_ST', 	width:"150px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibProgStComboJson }
                },
                {editable: false, name:'IB_PLAN_YMD',	width:"100px", align:"center", excel:true	},
                {editable: false, name:'IB_YMD', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'IB_NO', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'PO_YMD', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'PO_NO', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'IB_GBN_CD', 	width:"100px", align:"center",	hidden:true},
                {editable: false, name:'IB_GBN', 		width:"150px" , align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibGbnComboJson }
                },
                {editable: false, name:'SUPPLIER_CD', 	width:"100px", align:"center", excel:true	},
                {editable: false, name:'SUPPLIER_NM', 	width:"150px", align:"left", excel:true		},
                {editable: false, name:'APPR_DT', 		width:"120px", align:"center", excel:true	},
                {editable: false, name:'APPR_USER_ID', 	width:"100px", align:"center", excel:true	},
                {editable: false, name:'CAR_NO', 		width:"80px" , align:"center", excel:true	},
                {editable: false, name:'PROG', 			width:"90px" , align:"center",	hidden:true},
                {editable: false, name:'REMARK', 		width:"200px", align:"left", excel:true		}
            ],
            pager			: "#ibApprHeaderGridNavi",
            domainId		:"IB_APPR_LIST",
            gridComplete	: function()
            {
                var ids = $HGrid.jqGrid("getDataIDs");
                //첫 행 존재시 포커스
                if(ids && ids.length > 0){
                    $HGrid.setFocus(0);
                }

                //첫 조회시 디테일그리드 생성, 두번째부터 조회
                var ibNo = $HGrid.getRowData(ids[0]).IB_NO;
                if(firstLoad){
                    fnListIbApprovalD(ibNo);
                    firstLoad = false;
                }else{
                    if(ibNo != null){
                        $DGrid.paragonGridSearch({ibNo:ibNo});
                    }else{
                        $DGrid.paragonGridSearch({ibNo:null});
                    }
                }
           },
           onSelectRowEvent: function(currRowData, prevRowData)
           {
               $DGrid.paragonGridSearch({ibNo:currRowData.IB_NO});
           }
        });
	}

    function fnListIbApprovalD(ibNo){
        $DGrid.paragonGrid({
            url				: '/ctrl/inbound/inboundApproval/listIbApprD',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
//            multielonly	: true,
            rowClickFocus	: true,
            postData		:
            {
            	ibNo		: ibNo,
            	clientCd	: $.trim($("#ibApprClientCd").val())
        	},
            height			: gridHeight,
            colModel		: [
                {editable: false, name:'IB_NO', 			width:"100px", align:"center",	hidden:true},
                {editable: false, name:'IB_PROG_ST_CD', 	width:"100px", align:"center",	hidden:true},
                {editable: false, name:'IB_PROG_ST', 		width:"150px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibProgStComboJson }
                },
                {editable: false, name:'IB_DETAIL_SEQ', 	width:"100px", align:"center", excel:true	},
                {editable: false, name:'ITEM_CD', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'ITEM_NM', 			width:"200px", align:"left", excel:true		},
                {editable: false, name:'PKQTY', 			width:"50px" , align:"center", excel:true,  formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'UOM', 				width:"80px" , align:"center", excel:true	},
                {editable: false, name:'PLAN_QTY', 			width:"100px", align:"right", 	hidden: true},
                {editable: false, name:'PLAN_TOT_QTY', 		width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PLAN_BOX_QTY', 		width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PLAN_EA_QTY', 		width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PLAN_WEIGHT', 		width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name:'MAKE_LOT', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'MAKE_YMD', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'DIST_EXPIRY_YMD', 	width:"100px", align:"center", excel:true	},
                {editable: false, name:'ITEM_SPEC', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'ITEM_ST_CD', 		width:"100px", hidden:true		},
                {editable: false, name:'ITEM_ST',			width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibItemStComboJson }
                },
                {editable: true,  name:'PLT_PKQTY', 		width:"100px", align : "right", formatter:"integer", required:true, excel:true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            $(el).onlyNumber();
                            $(el).on('keyup blur', function(e){
                                gridIntLengthLimit($(this), e, 9);
                            });
                        }
                    }
                },
                {editable: false, name:'LOT_ATTR1', 		width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2', 				width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridDalatYn }
                },
                {editable: false, name:'LOT_ATTR3', 		width:"100px", align:"center", excel:true},
                {editable: false, name:'LOT_ATTR4', 		width:"100px", align:"left", excel:true},
                {editable: false, name:'LOT_ATTR5', 		width:"100px", align:"left", excel:true}
            ],
            pager			: "#ibApprDetailGridNavi",
            domainId		:"IB_APPR_DETAIL_LIST",
            groupHeaders	:
            				[{
            					rowspan : true,
                          		header	:
                          			[
                          		        {start: 'PLAN_TOT_QTY', length: 3 , domain:"PLAN_QTY"}
                      		        ]
            				}]
        });
    }

    //[Fn] 승인 버튼
    function fnApproval(progData, approval) {
        /* Validation */
        var rowData = {
            clientCd	: "CLIENT_CD",
            ibNo		: "IB_NO",
            prog		: ""
        };

        var jsonData = $HGrid.getSelectedJsonData("dt_data", rowData);
        //1. 널 검사
        if (!jsonData) {
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        //2. 유효데이터 검사
        var idx = $HGrid.getGridParam("selarrrow"); //선택한 Row 정보
        var text = '';
        var progCheck = false;
        if (approval == "appr") {
            for (var i = 0; i < idx.length; i++){
                if($HGrid.getRowData(idx[i]).IB_PROG_ST_CD == 20){
                    if(i != 0){
                        text += ", ";
                    }
                    text += $HGrid.getRowData(idx[i]).IB_NO;
                    progCheck = true;
                }
            }
            if(progCheck){
                Util.alert('MSG_INRI_ERR_013', text); //입고번호 [ {0} ]은 입하예정상태가 아닙니다.
                return false;
            }
        }else{
            for (var i = 0; i < idx.length; i++){
                if($HGrid.getRowData(idx[i]).IB_PROG_ST_CD == 10){
                    if(i != 0){
                        text += ", ";
                    }
                    text += $HGrid.getRowData(idx[i]).IB_NO;
                    progCheck = true;
                }
            }
            if(progCheck){
                Util.alert('MSG_INRI_ERR_010', text); //입고번호 [ {0} ]은 입하승인상태가 아닙니다.
                return false;
            }
        }

        var jsonObject = JSON.parse(jsonData);
        jsonObject.prog = progData;

        var jsonData = JSON.stringify(jsonObject);
        var saveUrl = "/ctrl/inbound/inboundApproval/confirmInboundArroval";
        var msg = "";



        if (approval == "appr") {
            msg = "MSG_INRI_CFM_003"; //입고승인 하시겠습니까?
        } else {
            msg = "MSG_INRI_CFM_004"; //승인취소 하시겠습니까?
        }

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
    		$HGrid.paragonGridReload();
    	})
    }

    function fnDeatilSave(){

        var rowData = {
                modFlag		: "MOD_FLAG" ,
                ibNo		: "IB_NO",
                pltPkqty	: "PLT_PKQTY",
                ibDetailSeq	: "IB_DETAIL_SEQ" ,
                itemCd		: "ITEM_CD"
        }
        var ids 		= $DGrid.getDataIDs();
        var jsonData 	= $DGrid.getSelectedJsonData("dt_ibApproval", rowData);
        var rowFlag 	= "";
        var ibProgStCd 	= [];
        //1. 널 검사
        if(jsonData == false){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }
        //2. 유효데이터 검사
        for (var i = 0; i < ids.length; i++) {
            ibProgStCd.push(Number($DGrid.getRowData(ids[i]).IB_PROG_ST_CD));
            if($("input:checkbox[id='jqg_ibApprDetailGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $DGrid.getRowData(ids[i]);

                rowFlag = rowdata.MOD_FLAG;
                if(!(rowdata.PLT_PKQTY)){
                    Util.alert('MSG_INRI_VAL_005'); //파렛트입수 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.PLT_PKQTY.trim().length == 0 ){
                    Util.alert('MSG_INRI_VAL_006'); //파렛트입수는 공백만으로 입력 할 수 없습니다.
                    return false;
                }
                //3. 변경데이터검사
                if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                    Util.alert('MSG_COM_VAL_071', $DGrid.getRowData(ids[i]).ITEM_CD); //[ {0} ]은(는) 변경된 값이 없습니다.
                    return false;
                }
            }
        }

        if(Math.max.apply(null, ibProgStCd) == 20){
            Util.alertCode('MSG_COM_VAL_069', 'IB_PROG_ST_CD', 10); //{0}상태만 저장 가능합니다.
            return false;
        }

        var saveUrl = '/ctrl/inbound/inboundApproval/updateInboundApprovalPltPkQty';
		var msg = 'MSG_COM_CFM_003';

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$DGrid.paragonGridReload();
    	})

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
    IbApprovalApp.init();
});
