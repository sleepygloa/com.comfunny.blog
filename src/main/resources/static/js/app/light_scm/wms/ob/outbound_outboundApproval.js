/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고승인
 * Program Code     : PWMOB102E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Lee Sung Guk     2017. 3. 23.        First Draft.
 */

var CreateOutboundApprovalApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB102E';
	var proNm = 'obAppr';

	//그리드
    var $obApprHGrid = $("#obApprHGrid");
    var $obApprDGrid = $("#obApprDGrid");

    var $callBackInput;
    var firstLoad = true;
    var gridObProgStCd;
    var gridObGbnCd;
    var gridItemStCd;
    var gridExportCountryCd;
    var gridDalatYn;
    var gridAvailChk;

    var obProgStCombo;

    //var gridHeight = '190';
    var gridHeight = '160';

    return {
        init: function() {

            gridObGbnCd 			= WMSUtil.fnCombo.grid_selectBox('obApprObGbnCd', "OB_GBN_CD");

            gridItemStCd 			= WMSUtil.fnCombo.grid("ITEM_ST_CD");

            obProgStCombo  			= WMSUtil.fnCombo.grid_selectBox_range('obApprObProgStCd', 'OB_PROG_ST_CD', 2, 1);

            gridObProgStCd			= WMSUtil.fnCombo.grid('OB_PROG_ST_CD');

           	gridExportCountryCd	 	= WMSUtil.fnCombo.grid('COUNTRY_CD');

        	gridDalatYn	 			= WMSUtil.fnCombo.grid('YN', 'DESC');

        	gridAvailChk 			= WMSUtil.fnCombo.grid('YN');

        	gridItemStCd 			= WMSUtil.fnCombo.grid('ITEM_ST_CD');

            fnEvent();

            fnList();
        },
        callBackInput: function() {
            return $callBackInput;
        }
    };


    //이벤트
    function fnEvent() {

    	WMSUtil.fnTagYmdSetting('obApprObPlanYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

        //조회 버튼 이벤트
        $("#obApprSearchBtn").click(function() {
            fnSearch();
        });

        //고객사 팝업
        $("#obApprClientCdPopup").click(function() {
        	WMSUtil.popup.client('obApprClient');
        });

        //배송처 팝업
        $("#obApprStoreCdBtn").click(function(){
          WMSUtil.popup.store('obApprStore', {clientCd : $('#obApprClientCd').val()});
        });

        //실배송처 팝업
        $("#obApprRStoreCdBtn").click(function(){
          WMSUtil.popup.rstore('obApprRStore', {clientCd : $('#obApprClientCd').val()});
        });

        //출고승인 버튼 이벤트
        $("#obApprAddBtn").click(function() {
            var prog = "FW";
            var approval = "appr";
            fnApproval(prog, approval);
        });
        //출고승인 취소 버튼 이벤트
        $("#obApprDelBtn").click(function() {
            var prog = "BW";
            var approval = "cancle";
            fnApproval(prog, approval);
        });
        //배분조정 팝업 버튼
        $("#obApprAllotBtn").click(function() {
        	//배분 데이터 삭제(초기화)
            fnDel();
            //배분 팝업(진행)
            fnObApprAllotPop();
        });
        //엑셀 다운로드
        $("#obApprExcelBtn").click(function() {
            var selectRow = $obApprDGrid.getGridParam('selrow');
            if(selectRow == null){
                $obApprHGrid.downloadExcelAllItems();
            }else{
                $obApprDGrid.downloadExcelAllItems();
            }
        });
    }

    //데이터
    function sendData(){
    	return {
        	clientCd    : $("#obApprClientCd").val(),
        	clientNm    : $("#obApprClientNm").val(),
        	obNo        : $("#obApprObNo").val(),
        	carNo       : $("#obApprCarNo").val(),
        	deliveryDgr : $("#obApprDeliveryDgr").val(),
        	obGbnCd     : $("#obApprObGbnCd option:selected").val(),
        	storeCd     : $("#obApprStoreCd").val(),
        	storeNm     : $("#obApprStoreNm").val(),
        	rStoreCd    : $("#obApprRStoreCd").val(),
        	rStoreNm    : $("#obApprRStoreNm").val(),
        	obProgStCd  : $("#obApprObProgStCd option:selected").val(),
        	soNo        : $("#obApprSoNo").val(),
        	ymdFr    	: WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdFr").val()),
        	ymdTo       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdTo").val())
    	}
    }

    //그리드 조회
    function fnList() {
        $obApprHGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundApproval/listObApprH",
            sortable		: true,
            rownumbers		: true,
            height			: gridHeight,
            rowEditable		: true,
            cellEditable	: false,
            multiselect		: true,
//            multielonly: true,
            rowClickFocus	: true,
            shrinkToFit		: false,
            domainId		: "OB_APPR_LIST",
            postData		: sendData(),
            colModel: [
                { editable: false, name: "CLIENT_CD", 		width: "100px", align: "center", hidden: true  },
                { editable: false, name: "CLIENT", 			width: "100px", align: "left"  , excel : true },
                { editable: false, name: "OB_PLAN_YMD", 	width: "100px", align: "center", excel : true },
                { editable: false, name: "OB_NO", 			width: "100px", align: "center", excel : true },
                { editable: false, name: "SO_NO", 			width: "120px", align: "center", excel : true },
                { editable: false, name: "OB_GBN_CD", 		width: "100px", align: "center", hidden: true },
                { editable: false, name: "OB_GBN", 			width: "90px", 	align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObGbnCd }
                },
                { editable: false, name: "STORE_CD", 		width: "100px", align: "center", excel : true },
                { editable: false, name: "STORE_NM", 		width: "250px", align: "left"  , excel : true},
                { editable: false, name: "RSTORE_CD", 		width: "100px", align: "center", excel : true },
                { editable: false, name: "RSTORE_NM", 		width: "250px", align: "left"  , excel : true},
                { editable: false, name: "CAR_NO", 			width: "90px", 	align: "center", excel : true },
                { editable: false, name: "PLAN_BOX_QTY",	width: "100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "DELIVERY_DGR", 	width: "70px", 	align: "center" , hidden: true },
                { editable: false, name: "OB_PROG_ST_CD", 	width: "100px", align: "center", hidden: true },
                { editable: false, name: "OB_PROG_ST", 		width: "100px", align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObProgStCd }
                },
                { editable: false, name: "REMARK", 			width: "265px", align: "left", excel:true },
                { editable: false, name: 'AVAIL_CHK',       width: "100px", align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridAvailChk }, hidden: true
                },
            ],
            pager		: "#obApprHGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function() {

            	// 데이터 1건 이상일 때 포커스
            	var ids = $obApprHGrid.jqGrid('getDataIDs');
                if (ids && ids.length > 0) {
                    $obApprHGrid.setFocus(0);
                }

                // 출고승인 안되는 상태면 'red' 색표시, AVAIL_CHK = Y
            	var cssRed = {'background-color':'#FF2B00'};
                for (var i = 0; i < ids.length; i++) {
                    if( $obApprHGrid.getRow(ids[i]).AVAIL_CHK == 'Y'){
                        $obApprHGrid.jqGrid("setCell", ids[i], "OB_NO", $obApprHGrid.getRow(ids[i]).OB_NO, cssRed);
                    }
                }

                var data = $obApprHGrid.getRowData(ids[0]);
                var dataJson = {
                        obNo		: data.OB_NO,
                        soNo		: data.SO_NO,
                        clientCd	: data.CLIENT_CD,
                        obGbnCd     : $("#obApprObGbnCd option:selected").val(),
                        ymdFr       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdFr").val()),
                        ymdTo       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdTo").val()),
                        obProgStCd  : $("#obApprObProgStCd option:selected").val()
                    };

                var $footRow = $obApprHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");

                var colArr = ['PLAN_BOX_QTY'];
                //페이지 첫 로딩시 상세그리드를 초기화, 2번째부터는 조회만.
                if (firstLoad) {

            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'HGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'HGrid_CAR_NO"]')
            		.css("text-align", "right").css('color', '#363636').text('Total : ');

                	fnListD(dataJson);

                } else {
                	if(ids.length > 0){
                		$obApprDGrid.paragonGridSearch(dataJson);
                	}else{
                		$obApprDGrid.jqGrid('clearGridData');
                	}
                }

            	fnTotalHSum();
            },
            onSelectRowEvent: function(currRowData, prevRowData) {
                //InClientCd = currRowData.CLIENT_CD;
                var data = {
                    obNo		: currRowData.OB_NO, //출고번호
                    clientCd	: currRowData.CLIENT_CD,
                    obGbnCd     : $("#obApprObGbnCd option:selected").val(),
                    ymdFr       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdFr").val()),
                    ymdTo       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdTo").val()),
                    obProgStCd  : $("#obApprObProgStCd option:selected").val()
                };
                $obApprDGrid.paragonGridSearch(data);
            }
        });
    }


    //헤더 그리드 합계 조회(주문별 박스수량)
    function fnTotalHSum(){
    	var $grid =$obApprHGrid;

        $.ajax({
            url 		: "/ctrl/outbound/outboundApproval/listObApprHSum",
            data 		: JSON.stringify(sendData()),
            type 		: "POST",
            dataType 	: "json",
            contentType	: 'application/json; charset=utf-8',
            cache		: false,
            success 	: function(data) {
            	var rowData = data.dt_grid[0];
            	//실패시만 에러 알람.
                if(data.stsCd == 100){
                    alert(data.msgTxt);
                }else{

                	if(rowData.PLAN_BOX_QTY != null){
                		$grid.jqGrid('footerData','set', { PLAN_BOX_QTY : rowData.PLAN_BOX_QTY.toFixed(2) });
                	}else{
                		$grid.jqGrid('footerData','set', { PLAN_BOX_QTY : '0' });
                	}
                }
            }
        });
    }

    //상세 그리드 조회
    function fnListD(dataJson) {
        $obApprDGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundApproval/listObApprD",
            sortable		: true,
            rownumbers		: true,
            height			: gridHeight,
            postData		: dataJson,
            rowClickFocus	: true,
            shrinkToFit		: false,
            rowNum 			: 50000,
            domainId		: "OB_APPR_DETAIL_LIST",
            colModel		: [
                { editable: false, name: "OB_NO", 			width: "100px", align: "center", hidden: true },
                { editable: false, name: "OB_DETAIL_SEQ", 	width: "100px", align: "center", excel:true	},
                { editable: false, name: "PROMOTION_GBN",   width: "35px",  align: "center", excel:true },
                { editable: false, name: "ITEM_CD", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "ITEM_NM", 		width: "200px", align: "left", excel:true 	},
                { editable: false, name: "ITEM_SPEC", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "ITEM_ST_CD", 		width: "100px", align: "center", hidden: true },
                { editable: false, name: "ITEM_ST",    		width: "100px", align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridItemStCd }
                },
                { editable: false, name: "CONV_UOM_QTY", 	width: "100px", align: "right", hidden: true},
                { editable: false, name: "PKQTY", 			width: "100px", align: "center", excel:true,  formatter:"integer",	excelDataType : "integer"},
                { editable: false, name: "CONV_UOM_CD", 	width: "100px", align: "center", hidden: true },
                { editable: false, name: "UOM", 			width: "100px", align: "center", excel:true },
	            { editable: false, name: "PLAN_QTY", 		width: "100px", align: "right", hidden: true},
	            { editable: false, name: "PLAN_TOT_QTY", 	width: "100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "PLAN_BOX_QTY",	width: "100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "PLAN_EA_QTY", 	width: "100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "WEIGHT", 			width: "100px", align: "center", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "MAKE_YMD", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "MAKE_LOT",		width: "100px", align: "center", excel:true },
                { editable: false, name: "DIST_EXPIRY_YMD", width: "100px", align: "center", excel:true },
                {editable: false, name:'LOT_ATTR1',			width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2',      	width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridDalatYn }
                },
                { editable: false, name: "LOT_ATTR3", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "LOT_ATTR4", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "LOT_ATTR5", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "OB_PROG_ST_CD", 	width: "100px", align: "center", hidden: true },
                { editable: false, name: "OB_PROD_ST", 		width: "100px", align: "center", hidden: true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObProgStCd }
                },
                { editable: false, name: "AVAIL_CHK", 		width: "100px", align: "center", hidden: true}
            ],
            groupHeaders: [{
                rowspan	: true,
                header	: [
                    { start: 'PLAN_TOT_QTY', length: 3, domain: "PLAN_QTY" }
                ]
            }],
            pager		: "#obApprDGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function() {
            	// 그리드 데이터의 ID 가져오기
            	var ids = $obApprDGrid.jqGrid('getDataIDs');

	            var cssGreen = {'background-color':'#FF2B00'};
	            // 그리드 데이터 가져오기
	            var gridData = $obApprDGrid.jqGrid('getRowData');

	            // 데이터 확인후 색상 변경
	            for (var i = 0; i < gridData.length; i++) {
	                if(gridData[i].AVAIL_CHK == "Y"){
	                    $obApprDGrid.jqGrid("setCell", ids[i], "ITEM_CD", gridData[i].ITEM_CD, cssGreen);
	                }
	            }

            	//그리드 아래 부분 합계
            	var $footRow = $obApprDGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['OB_DETAIL_SEQ','PROMOTION_GBN','ITEM_CD', 'ITEM_NM', 'ITEM_SPEC', 'ITEM_ST', 'PKQTY'];
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


            },
        });
    }

    //전체 재고 합계 조회
    function fnTotalSum(){
    	var $grid =$obApprDGrid;

    	$grid.jqGrid('footerData','set', { PLAN_TOT_QTY 		: $grid.jqGrid('getCol', 'PLAN_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_BOX_QTY 		: $grid.jqGrid('getCol', 'PLAN_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_EA_QTY 			: $grid.jqGrid('getCol', 'PLAN_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { INST_TOT_QTY 		: $grid.jqGrid('getCol', 'INST_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { INST_BOX_QTY 		: $grid.jqGrid('getCol', 'INST_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { INST_EA_QTY 			: $grid.jqGrid('getCol', 'INST_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { WEIGHT 				: $grid.jqGrid('getCol', 'WEIGHT',false,'sum')});
//    	$grid.jqGrid('footerData','set', { WEIGHT 				: $grid.jqGrid('getCol', 'WEIGHT',false,'sum').toFixed(2)});

    }

    //그리드 조회
    function fnSearch() {
        if($("#obApprClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obApprClientCd").focus();
            return false;
        }else if($("#obApprClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obApprClientCd").focus();
            return false;
        }
        if($("#obApprObPlanYmdFr").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_001'); //출고예정일자 항목은 필수 입력입니다.
            $("#obApprObPlanYmdFr").focus();
            return false;
        }else if($("#obApprObPlanYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_002'); //출고예정일자는 공백만으로 입력할 수 없습니다.
            $("#obApprObPlanYmdFr").focus();
            return false;
        }
        if($("#obApprObPlanYmdTo").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_001'); //출고예정일자 항목은 필수 입력입니다.
            $("#obApprObPlanYmdTo").focus();
            return false;
        }else if($("#obApprObPlanYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_002'); //출고예정일자는 공백만으로 입력할 수 없습니다.
            $("#obApprObPlanYmdTo").focus();
            return false;
        }

        $obApprHGrid.paragonGridSearch(sendData());

    }
    //[Fn] 승인 버튼
    function fnApproval(progData, approval) {

        var rowData = {
            clientCd		: "CLIENT_CD",
            obNo			: "OB_NO",
//            obGbnCd         : $("#obApprObGbnCd option:selected").val(),
//            ymdFr			: WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdFr").val()),
//            ymdTo			: WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdTo").val()),
            prog			: ""

        };
        //배분조정 화면 Validation 추가.
        if (!fnValidateAllot()) {
            Util.alert('MSG_OUTRI_ERR_007'); //배분화면에서 배분로직을 먼저 하십시오.
            return;
        }

        var jsonData = $obApprHGrid.getSelectedJsonData("dt_data", rowData);

        //유효성 검사
        if (!jsonData) {
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var jsonObject = JSON.parse(jsonData);
        var rowid = $obApprHGrid.getGridParam("selrow");
        var obProgStCd = $obApprHGrid.getRowData(rowid).OB_PROG_ST_CD;
        var saveUrl = "/ctrl/outbound/outboundApproval/updateObAppr";
        var msg = "";

        //inParams에 데이터 입력.
        jsonObject.prog = progData;
        jsonObject.ymdFr = WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdFr").val());
        jsonObject.ymdTo = WMSUtil.fnDateSetting.yyyymmdd($("#obApprObPlanYmdTo").val());
        jsonObject.obGbnCd = $("#obApprObGbnCd option:selected").val();
        jsonObject.obProgStCd = $("#obApprObProgStCd option:selected").val();

        //console.log("jaonObject"+JSON.stringify(jsonObject));
        //1. 출고 승인
        if (approval == "appr") {
            if (obProgStCd != "10") {
                Util.alertCode('MSG_COM_VAL_073', 'OB_PROG_ST_CD', 10); //{0}상태만 승인가능합니다.
                return false;
            } else {
                msg = "MSG_OUTRI_CFM_003"; //출고승인 하시겠습니까?

                //ajax
                WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
                	$obApprHGrid.paragonGridReload();
            	})

            }
        } else {
            //출고 취소
            if (obProgStCd != "20") {
                Util.alertCode('MSG_COM_VAL_072', 'OB_PROG_ST_CD', 20); //{0}상태만 취소가능합니다.
                return false;
            } else {
                msg = "MSG_OUTRI_CFM_004"; //승인취소 하시겠습니까?

                //ajax
                WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
                	$obApprHGrid.paragonGridReload();
            	})
            }
        }
    }
    //유효성 검사 배분로직
    function fnValidateAllot() {
        //TODO: 배분로직 Validation 추가 필요
        return true;
    }

    //출고배분 삭제
    function fnDel() {

        //var addFlag = $outboundPlanGrid.paragonGridCheckedDeleteData();

            //ajax Event.
            $.ajax({
                url			: "/ctrl/outbound/outboundApproval/deleteObApprAllot",
                data		: '',
                dataType	: "json",
                type		: "POST",
                cache		: false,
                contentType	: 'application/json; charset=utf-8',
                success		: function(data) {
                    if (data.stsCd == 200) {
//                    	alert(data.msgTxt);
//                        $obApprHGrid.paragonGridReload();
                    }else if(data.stsCd == 100){
                    	alert(data.msgTxt);
                    }
                }
            });
    }


    //[Fn] PopUP 배분조정
    function fnObApprAllotPop() {


    	//조회 데이터 확인
    	var rowData = $obApprHGrid.getRowData();
    	if(rowData.length == 0){
    		Util.alert('MSG_WMS_ERR_002'); //조회된 데이터가 없습니다.
    		return false;
    	}
//    	var rowData = $obApprHGrid.getGridParam("selarrrow");
//
//    	if(rowData.length == 0){
//    		Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
//    		return false;
//    	}

    	//달력데이터 재세팅(yyyy-mm-dd:데이터처리용이아닌 Js -> Js로 datePicker 값 입력하기 위함)
    	var allotData = sendData();
    	allotData["ymdFr"] = $('#obApprObPlanYmdFr').val();
    	allotData["ymdTo"] = $('#obApprObPlanYmdTo').val();
    	allotData["obGbnCd"] = $('#obApprObGbnCd option:selected').val();
    	console.log($('#obApprObGbnCd option:selected').val())

        //App.prcsStart();
        PopApp.paragonOpenPopup({
            ajaxUrl			: "/ctrl/outbound/outboundApproval/obApprAllotPop",
            id				: "modalAllotPopup",
            width			: "90",
            height			: "80",
            btnName			: "수정",
            data			: allotData,
            domainId		: "PWMOB102E_P1",
            visible			: true,
            onload			: function(modal) {

            },
            callback		: function(data){
            	$obApprHGrid.paragonGridReload();
            }
        });
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
    CreateOutboundApprovalApp.init();
});
