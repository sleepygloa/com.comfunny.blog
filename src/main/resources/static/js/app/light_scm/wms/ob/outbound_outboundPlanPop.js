/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고예정등록 팝업[OutboundPlanPopApp]
 * Program Code     : PWMOB101E_P1
 * Description      :
 * Revision History
 * Author          Date                Description
 * ------------------------------------------------
 * Lee Sung Guk    2017. 3. 20.         First Draft.
 */
var OutboundPlanPopApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB101E_P1';
	var proNm = 'obPlanPop';

    var $obPlanPopGrid = $("#obPlanPopGrid");

    var gridItemStCd; //제품상태
    var gridObGbnCd; //출고구분
    var gridPromotionGbnCd; //행사구분
    //var obProgStCdPopJson;
    var gridLotAttr1;
    var gridLotAttr2;

    var getData = $("#modifyObPlanPop").PopAppGetData();


    var pData = '';
    if(getData.rowData != undefined) pData = getData.rowData;
    var modify 	= getData.flag;

    var headerEditFlag = false;

    return {
        init: function() {

        	WMSUtil.fnCombo.selectBox('obPlanPopObGbnCd', 'OB_GBN_CD');

        	gridItemStCd 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');
        	gridPromotionGbnCd 	= WMSUtil.fnCombo.grid('PROMOTION_GBN_CD');

        	gridLotAttr1 		= WMSUtil.fnCombo.grid('COUNTRY_CD');
        	gridLotAttr2 		= WMSUtil.fnCombo.grid('YN' , 'DESC');

            fnEvents();

            if(modify === "MODIFY"){
                fnInfo();
            }

            fnList();
        }
    };

    //헤더 폼 데이터 입력
    function fnInfo() {
	    $("#obPlanPopClientCd").val(pData.CLIENT_CD);
	    $("#obPlanPopYmdFr").val(pData.OB_PLAN_YMD);
	    $("#obPlanPopObNo").val(pData.OB_NO);
	    $("#obPlanPopCarNo").val(pData.CAR_NO);
	    $("#obPlanPopDeliveryDgr").val(pData.DELIVERY_DGR);
	    $("#obPlanPopStoreCd").val(pData.STORE_CD);
	    $("#obPlanPopStoreNm").val(pData.STORE_NM);
	    $("#obPlanPopObProgStCd").val(pData.OB_PROG_ST_CD);
	    $("#obPlanPopSoNo").val(pData.SO_NO);
	    $("#obPlanPopRStoreCd").val(pData.RSTORE_CD);
	    $("#obPlanPopRStoreNm").val(pData.RSTORE_NM);
	    $("#obPlanPopObGbnCd").val(pData.OB_GBN);
    }


    //이벤트
    function fnEvents() {

    	WMSUtil.fnTagYmdSetting('obPlanPopYmd', true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

        //신규 버튼 이벤트
        $("#obPlanPopAddRowBtn").click(function() {
        	fnAdd();
        });
        //고객사 팝업 이벤트
        $("#obPlanPopClient").click(function() {
        	WMSUtil.popup.supplier('obPlanPopClient');
        });

        //배송처 팝업
        $("#obPlanPopStore").click(function(){
          WMSUtil.popup.store('obPlanPopStore', {clientCd : $('#obPlanPopClient').val()});
        });

        //실배송처 팝업
        $("#obPlanPopRStore").click(function(){
          WMSUtil.popup.rstore('obPlanPopRStore', {clientCd : $('#obPlanPopClient').val()});
        });

        //저장버튼 이벤트
        $("#obPlanPopSaveBtn").click(function() {
        	fnSave();
        });
        //삭제버튼 이벤트
        $("#obPlanPopDelRowBtn").click(function(){
            fnDel();
        });

        /* keyup */
        $('#obPlanPopClientCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obPlanPopStoreCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obPlanPopCarNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obPlanPopRStoreCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obPlanPopSoNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obPlanPopDeliveryDgr').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });

    }

    //그리드 초기화
    function fnList() {
        $obPlanPopGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundPlan/listOutboundPlanDetail",
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            height			: "250",
            rowNum 			: 50000,
            loadui			: 'disable',
            rowClickFocus	: true,
            shrinkToFit		: false,
            multiselect		: true,
            postData		:{
            	clientCd 	: pData.CLIENT_CD,
            	obNo		: pData.OB_NO
            	},
//            multielonly: true,
            domainId		: "OB_PLAN_DETAIL_LIST",
            colModel		: [
                { editable: false, name: "OB_NO", 				width: "100px", align: "center", hidden: true },
                { editable: false, name: "OB_DETAIL_SEQ", 		width: "100px", align: "center", hidden: true },
                { editable: true,  name: "PROMOTION_GBN", 		width: "35px", align: "center",
                    edittype: 'select', formatter: 'select', editoptions: { value: gridPromotionGbnCd },
                    //required: true
                },
                { editable: true,  name: "ITEM_CD", 			width: "100px", align: "center",
                    required: true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(this), e,20); }) } },
                    searchBtnClick: function(value, rowid, colid) {
//                        fnGridItemPop(rowid);
                    	WMSUtil.popup.itemInfo('',{
                    		clientCd	: $('#obPlanPopClientCd').val()
                    	},function callbackFunc(data){
//                        	$("#"+rowid+"_ITEM_CD").val(data.ITEM_CD);
                        	$obPlanPopGrid.setCell("ITEM_CD",	data.ITEM_CD,rowid);
                        	$obPlanPopGrid.setCell("ITEM_NM",	data.ITEM_NM,rowid);
                        	$obPlanPopGrid.setCell("ITEM_SPEC",	data.ITEM_SPEC,rowid);
                        	$obPlanPopGrid.setCell("ITEM_ST_CD",data.ITEM_ST_CD,rowid);
                        	$obPlanPopGrid.setCell("UOM",		data.CONV_UOM_CD,rowid);
                        	$obPlanPopGrid.setCell("PKQTY",		data.CONV_UOM_QTY,rowid);
                        	$obPlanPopGrid.setCell("WEIGHT",	data.WEIGHT,rowid);
                        	setPlanTotQty(rowid);
                    	})
                    },
                    disabled: true
                },
                { editable: false, name: "ITEM_NM", 			width: "150px", align: "center" },
                { editable: false, name: "ITEM_SPEC", 			width: "100px", align: "center" },
                { editable: false, name: "ITEM_ST_CD", 			width: "100px", align: "center", hidden: true },
                { editable: true, name: "ITEM_ST", 				width: "100px", align: "center",
                    edittype: 'select', formatter: 'select', editoptions: { value: gridItemStCd },
                    required: true
                },
                { editable: false, name: "CONV_UOM_QTY", 		width: "100px", align: "center", hidden: true},
                { editable: false, name: "PKQTY", 				width: "100px", align: "center" },
                { editable: false, name: "CONV_UOM_CD", 		width: "100px", align: "center", hidden: true },
                //{editable: true, name: "CONV_UOM",          width: "100px", align: "center"},
                { editable: false, name: "UOM", 				width: "100px", align: "center" },
                { editable: false, name: "PLAN_QTY", 			width: "100px", align: "center", formatter: "integer", disabled: true,  hidden: true},
                { editable: false, name: "PLAN_TOT_QTY", 		width: "100px", align: "right",  formatter: "integer", disabled: true 	},
                { editable: true,  name: "PLAN_BOX_QTY", 		width: "100px", align: "right",
                	required: true,
                    editoptions:{
                        maxlength : 11,
                        //수량 이벤트
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).click(function(){
                            	if($obPlanPopGrid.getRow(rowid,"ITEM_CD") == ''){
	                                Util.alert('MSG_MST_ERR_010'); //제품코드를 선택해주세요
	                                return false;
                            	}
                            	$(this).select();
                            }).blur(function(e){
                                if($obPlanPopGrid.getRow(rowid,"PLAN_BOX_QTY") == ''){
                                    $obPlanPopGrid.setCell("PLAN_BOX_QTY",0,rowid);
                                }
                                setPlanTotQty(rowid);
                                gridIntLengthLimit($(this), e, 9);
                            })
                        }
                		//수량 이벤트 끝
                    }
                },
                { editable: false, name: "PLAN_EA_QTY", 			width: "100px", align: "right",
                	//required: true,
                    editoptions:{
                        maxlength : 11,
                        //수량 이벤트
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).click(function(){
                            	if($obPlanPopGrid.getRow(rowid,"ITEM_CD") == ''){
	                                Util.alert('MSG_MST_ERR_010'); //제품코드를 선택해주세요
	                                return false;
                            	}
                            	$(this).select();
                            }).blur(function(e){
                                if($obPlanPopGrid.getRow(rowid,"PLAN_EA_QTY") == ''){
                                    $obPlanPopGrid.setCell("PLAN_EA_QTY",0,rowid);
                                }
                                setPlanTotQty(rowid);
                                gridIntLengthLimit($(this), e, 9);
                            })
                        }
                		//수량 이벤트 끝
                    }
                },
                { editable: true, name: "WEIGHT", 				width: "100px", align: "center" , formatter:"integer"},
                { editable: true, name: "MAKE_YMD", 			width: "100px", align: "center",
                    editoptions: {
                        maxlength: 10,
                        dataEvents: function(el, e) {
                      	  $(el).val(WMSUtil.fnDateSetting.yyyy_mm_dd($(el).val()));
                    	  gridIntLengthLimit($(el), e, 10);
                        }
                    }
                },
                { editable: true, name: "MAKE_LOT", 			width: "100px", align: "center" },
                { editable: true, name: "DIST_EXPIRY_YMD", 		width: "100px", align: "center",
                    editoptions: {
                        maxlength: 10,
                        dataEvents: function(el, e) {
                      	  $(el).val(WMSUtil.fnDateSetting.yyyy_mm_dd($(el).val()));
                    	  gridIntLengthLimit($(el), e, 10);
                        }
                    }
                },
                { editable: true, name: "LOT_ATTR1", 			width: "100px", align: "center",
                	edittype:'select', formatter:'select', editoptions: { value:gridLotAttr1 }
                },
                { editable: true, name: "LOT_ATTR2", 			width: "100px", align: "center",
                	edittype:'select', formatter:'select', editoptions: { value:gridLotAttr2 }
                },
                { editable: true, name: "LOT_ATTR3", 			width: "100px", align: "center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                { editable: true, name: "LOT_ATTR4", 			width: "100px", align: "center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                { editable: true, name: "LOT_ATTR5", 			width: "100px", align: "center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
            ],
//          pager: "#obPlanPopGridNavi",
            gridComplete: function() {
            	//데이터가 1개 이상있을때
                var ids = $obPlanPopGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0)
                    $obPlanPopGrid.setFocus(0);
            },
            groupHeaders: [{
                rowspan: true,
                header: [
                    { start: 'PLAN_TOT_QTY', length: 3, domain: "PLAN_QTY" }
                ]
            }]
        });
    }

    //수량 계산
    function setPlanTotQty(rowid){
        var planTotQty = 0;

        var pkQty = Number($obPlanPopGrid.getRow(rowid,"PKQTY"));
        var box = Number($obPlanPopGrid.getRow(rowid,"PLAN_BOX_QTY"));
        var ea = Number($obPlanPopGrid.getRow(rowid,"PLAN_EA_QTY"));

        planTotQty =  box * pkQty + ea;
        $obPlanPopGrid.setCell("PLAN_QTY",planTotQty,rowid);
        $obPlanPopGrid.setCell("PLAN_TOT_QTY",planTotQty,rowid);

    }


    //저장
    function fnSave() {
        //유효성검사
        //1. 헤더에 필수값이 입력되어있는지 확인
        //2-1. 신규
        //2-2. 수정 : 헤더 수정사항있을때, 그리드 내용 수정, 미수정 가능
        //            헤더 수정 없을 때, 그리드 수정되어야함.
        if($("#obPlanPopClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obPlanPopClientCd").focus();
            return false;
        }else if($("#obPlanPopClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obPlanPopClientCd").focus();
            return false;
        }else if($("#obPlanPopClientNm").val().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드 항목은 필수 입력 입니다.
            $("#obPlanPopClientNm").focus();
            return false;
        }
        //validation
        if($("#obPlanPopYmdFr").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_001'); //출고예정일자 항목은 필수 입력입니다.
            $("#obPlanPopYmdFr").focus();
            return false;
        }else if($("#obPlanPopYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_002'); //출고예정일자는 공백만으로 입력할 수 없습니다.
            $("#obPlanPopYmdFr").focus();
            return false;
        }
        //validation
        if($("#obPlanPopStoreCd").val().length == 0){//판매처 검사
            Util.alert('MSG_MST_VAL_064'); //판매처 항목은 필수 입력입니다.
            $("#obPlanPopStoreCd").focus();
            return false;
        }else if($("#obPlanPopStoreCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_065'); //판매처는 공백만으로 입력 할 수 없습니다.
            $("#obPlanPopStoreCd").focus();
            return false;
        }else if($("#obPlanPopStoreNm").val().length == 0){
            Util.alert('MSG_MST_VAL_065'); //판매처 항목은 필수 입력입니다.
            $("#obPlanPopStoreNm").focus();
            return false;
        }
        //validation
        if($("#obPlanPopObGbnCd").val().length == 0){//출고구분 검사
            Util.alert('MSG_OUTRI_VAL_005'); //출구구분 항목은 필수 입력입니다.
            $("#obPlanPopObGbnCd").focus();
            return false;
        }else if($("#obPlanPopObGbnCd").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_006'); //출구구분은 공백만으로 입력할 수 없습니다.
            $("#obPlanPopObGbnCd").focus();
            return false;
        }

        //헤더 수정 유무 확인
        var headerEditFlag = false;
    	if(modify === "INSERT"){

    	}else if(modify === "MODIFY"){
        	if(	pData.OB_NO != $("#obPlanPopObNo").val()
			||	pData.CLIENT_CD != $("#obPlanPopClientCd").val()
			||	pData.OB_PLAN_YMD != $("#obPlanPopYmdFr").val()
			||	pData.OB_GBN != $("#obPlanPopObGbnCd").val()
			||	pData.CAR_NO != $("#obPlanPopCarNo").val()
			||	pData.DELIVERY_DGR != $("#obPlanPopDeliveryDgr").val()
			||	pData.STORE_CD != $("#obPlanPopStoreCd").val()
			||	pData.SO_NO != $("#obPlanPopSoNo").val()
			||	pData.RSTORE_CD != $("#obPlanPopRStoreCd").val()
    		){
            	headerEditFlag = true;
            }
    	}

    	var idx = $obPlanPopGrid.getGridParam("selarrrow");
    	var ids = $obPlanPopGrid.jqGrid("getDataIDs");
    	//Detail 행 존재&선택 여부 확인
    	//신규
    	if(modify === "INSERT"){
    		if(ids.length == 0){
    			Util.alert('MSG_COM_VAL_080'); //상세목록을 추가해주세요.
                return false;
    		}else{
    			if(idx.length == 0){
    				Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                    return false;
    			}
    		}
		//수정
    	}else if(modify === "MODIFY"){

    		//헤더 수정 없음.
            if(!headerEditFlag){
            	//상세그리드 수정되어야함.
                if(idx.length <= 0){
                    Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                    return false;
                }
            }else{

            }
        }


        //수정모드 그리드 모두 저장모드로 변경
        for(var i = 0; i < idx.length; i++){
        	$obPlanPopGrid.jqGrid('saveRow', idx[i], true, 'clientArray');
        }

    	//Detail 수정여부 확인
        var eachFlag = true;
        var rowFlag = "";
    	$.each(idx, function(index, value){
    		var rowdata = $obPlanPopGrid.getRowData(value);
            rowFlag = rowdata.MOD_FLAG;

            if(!(rowdata.ITEM_CD)){
                Util.alert('MSG_MST_VAL_045'); //제품코드 항목은 필수 입력입니다.
                eachFlag = false;
                return false;
            }
            if(rowdata.ITEM_CD.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_046'); //제품코드는 공백만으로 입력 할 수 없습니다.
                eachFlag = false;
                return false;
            }

            if(!(rowdata.PLAN_BOX_QTY)){
                Util.alert('MSG_OUTRI_VAL_007'); //예정환산수량 항목은 필수 입력입니다.
                eachFlag = false;
                return false;
            }
            if(rowdata.PLAN_BOX_QTY.trim().length == 0 ){
                Util.alert('MSG_OUTRI_VAL_008'); //예정환산수량은 공백만으로 입력할 수 없습니다.
                eachFlag = false;
                return false;
            }

            if(!(rowdata.PLAN_EA_QTY)){
                Util.alert('MSG_OUTRI_VAL_009'); //예정낱개수량은 항목은 필수 입력입니다.
                eachFlag = false;
                return false;
            }
            if(rowdata.PLAN_EA_QTY.trim().length == 0 ){
                Util.alert('MSG_OUTRI_VAL_010'); //예정낱개수량은 공백만으로 입력할 수 없습니다.
                eachFlag = false;
                return false;
            }
            if(parseFloat(rowdata.PLAN_BOX_QTY) == 0 && parseFloat(rowdata.PLAN_EA_QTY) == 0){
                Util.alert('MSG_OUTRI_VAL_011'); //예정환산수량, 낱개수량은 0을 초과하여 입력해야 합니다.
                eachFlag = false;
                return false;
            }
            if(parseFloat(rowdata.PLAN_BOX_QTY) < 0 || parseFloat(rowdata.PLAN_EA_QTY) < 0){
                Util.alert('MSG_OUTRI_VAL_012'); //예정환산수량, 낱개수량 음수를 입력할 수 없습니다.
                eachFlag = false;
                return false;
            }
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $obPlanPopGrid.getRowData(value).ITEM_CD); //[ {0} ]은(는) 변경된 값이 없습니다.
                eachFlag = false;
                return false;
            }
    	});
    	if(!eachFlag) return false;

    	//

        var saveUrl = "";
        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?
        var paramsData = {};
        var jsonData = "";

        //헤더 데이터
        var hData = {
            	edit 		: headerEditFlag,
        		obNo 		: $("#obPlanPopObNo").val(),
                clientCd 	: $("#obPlanPopClientCd").val(),
                obPlanYmd 	: WMSUtil.fnDateSetting.yyyymmdd($("#obPlanPopYmdFr").val()),
                obGbnCd     : $("#obPlanPopObGbnCd option:selected").val(),
                deliveryDgr : $("#obPlanPopDeliveryDgr").val(),
                soNo 		: $("#obPlanPopSoNo").val(),
                carNo 		: $("#obPlanPopCarNo").val(),
                storeCd 	: $("#obPlanPopStoreCd").val(),
                rstoreCd 	: $("#obPlanPopRStoreCd").val(),
                obProgStCd 	: $("#obPlanPopObProgStCd").val(),
        }


        //그리드 포맷
        var formatData = {};
        var colModel = $obPlanPopGrid.getGridParam('colModel');
        for (var i = 0; i < colModel.length; i++) {
            var colId = colModel[i]['name'];
            formatData[colId.strCamel()] = colId;
        }

        if(idx.length == 0){
        	jsonData = JSON.stringify(hData);
        }else{
        	jsonData = $obPlanPopGrid.getJsonSelectedParamsData("dt_obPlan", formatData, hData);
        }

        if (modify === "INSERT") {
            saveUrl = "/ctrl/outbound/outboundPlan/insertOutboundPlanInfo";
        }else if(modify === "MODIFY"){//updateOutboundPlanInfo
            saveUrl = "/ctrl/outbound/outboundPlan/updateOutboundPlanInfo";
        }

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            $("#modifyObPlanPop").popupCallback();
            $("#modifyObPlanPop").paragonClosePopup();
    	})
    }

    //삭제
    function fnDel() {
        var addFlag = $obPlanPopGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var dataCnt = $obPlanPopGrid.getGridParam("records");
            var ids = $obPlanPopGrid.getGridParam('selarrrow');
//            $obPlanPopGrid.paragonGridCheckedDelete();
            var rowData = {
                    modFlag		: "MOD_FLAG",
                    obNo		: "OB_NO",
                    obDetilaSeq	: "OB_DETAIL_SEQ"
            };

            var saveUrl = "";
            var dataSet = "";
            //총 행의 갯수 - 선택한 행의 개수.
            if((dataCnt - ids.length) == 0){
                saveUrl = "/ctrl/outbound/outboundPlan/updateOutboundPlan";
                dataSet = "dt_data";
            }else{
                saveUrl = "/ctrl/outbound/outboundPlan/updateOutboundPlanDetail";
                dataSet = "dt_detail_data"
            }

            var jsonData = $obPlanPopGrid.getSelectedJsonDataChk(dataSet, rowData, $obPlanPopGrid);

            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
                $("#modifyObPlanPop").popupCallback();
                $("#modifyObPlanPop").paragonClosePopup();
        	})
        }
    }

    //행 추가
    function fnAdd(){
        //그리드 행 추가.
        $obPlanPopGrid.paragonGridAddRow({
            addData:
            {
                "OB_NO"             : '',
                "ITEM_CD"  			: '',
                "ITEM_ST"           : '',
                "PLAN_TOT_QTY"      : '0',
                "PLAN_BOX_QTY"      : '0',
                "PLAN_EA_QTY"       : '0',
                "WEIGHT"            : '',
                "DIST_EXPIRY_YMD"   : '',
                "LOT_ATTR1"		    : '',
                "LOT_ATTR2"         : '',
                "LOT_ATTR3"         : '',
                "LOT_ATTR4"         : '',
                "LOT_ATTR5"         : '',
            }
        });
    }
}();

$(document).ready(function() {
    OutboundPlanPopApp.init();
});