/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 생산계획조회[ProdPlanInqApp]
 * Program Code     : PWMIB201E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim seon ho 		2018. 11. 27.  		First Draft.
 */
var ProdPlanInqApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
	var proNm = 'prodPlanInq';

	// [El]프로그램 그리드
	var $prodPlanInqHGrid = $("#prodPlanInqHGrid");

	var $prodPlanInqDGrid = $("#prodPlanInqDGrid");

	//그리드의 콤보 json 데이터
	var gridProdDept;
	var gridProdLine;
	var gridProdGrp;
	var gridProdStCd;
	var gridExportCountryCd;
	var gridDalatYn;

	var firstLoad =true;
	var gridHeight = '227';

    return {
        init: function () {

        	gridProdDept 			= WMSUtil.fnCombo.prodDept('prodPlanInqProdDept', 'PROD_DEPT_CD');

        	gridProdGrp  			= WMSUtil.fnCombo.grid_selectBox('prodPlanInqProdGrp',  'PROD_GRP_CD');

        	gridProdLine		 	= WMSUtil.fnCombo.grid('PROD_LINE_CD');

        	gridProdStCd		 	= WMSUtil.fnCombo.grid('PROD_PROG_ST_CD');

        	gridExportCountryCd	 	= WMSUtil.fnCombo.grid('COUNTRY_CD');

        	gridDalatYn	 			= WMSUtil.fnCombo.grid('YN', 'DESC');

        	fnEvents();

        	fnListProdPlanInqH();

        	fnListProdPlanInqD();

	    }
    };

    //[Fn] 이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('prodPlanInqProdPlanYmd', true);

    	//수신
    	$("#prodPlanInqReceiveBtn").click(function(){
    		fnRx();
    	});
    	//검색
    	$("#prodPlanInqSearchBtn").click(function(){
    		fnSearch();
    	});

    	//마감
    	$("#prodPlanInqCloseBtn").click(function(){
    		fnModify('Y', 'MSG_INRI_CFM_013');
    	});

    	//마감취소
    	$("#prodPlanInqCloseCancelBtn").click(function(){
    		fnModify('N', 'MSG_INRI_CFM_014');
    	});
    	//생성
    	$("#prodPlanInqNewBtn").click(function(){
    		fnTx();
    	});

    	//엑셀버튼
    	$("#prodPlanInqExcelBtn").click(function(){
    	    var selectRow = $prodPlanInqDGrid.getGridParam('selrow');
    	    if(selectRow == null){
    	        $prodPlanInqHGrid.downloadExcelAllItems();
    	    }else{
    	        $prodPlanInqDGrid.downloadExcelAllItems();
    	    }
    	});

    	//생산부서-생산라인 이벤트
    	$('#prodPlanInqProdDept').change(function(){
    		$('#prodPlanInqProdLine').empty().append('<option></option>');
    		WMSUtil.fnCombo.prodLine('prodPlanInqProdLine', 'PROD_LINE_CD', $(this).val());
    	});
    }

    //수신
    function fnRx(){

    	var msg = 'MSG_IF_CFM_002'; //수신 하시겠습니까?

        var formData = new FormData();


    	formData.append("s_companyCd", 	 ParagonSession.s_companyCd);
        formData.append("s_dcCd_Prioord", 	ParagonSession.s_dcCd_Prioord);
        formData.append("s_userId", 	ParagonSession.s_userId);

        formData.append("rtxObjCd", 	'20');
        formData.append("rtxMappNo", 	'0000001066');
        formData.append("dynamicTableName", 'TB_IF_IB_PROD_INST_RX_M');
//        formData.append("fileName",  infiles[0].name);
        formData.append("dataTypeCd",  	'11');
        formData.append("fileUploadYn",	"N");
        formData.append("clientCd", 	$("#prodPlanInqClientCd").val());

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        App.prcsStart();
        $.ajax({
            url 		: "/ctrl/inbound/productPlanInquiry/updateProdPlanInqCloseRx",
            data 		: formData,
            type 		: "POST",
            dataType 	: "json",
            cache		: false,
            contentType	: false,
            processData	: false,
            success : function(data) {

            	if(data.stsCd == 100){
            		alert(data.msgTxt);
            		return false;
            	}else{
            		$prodPlanInqHGrid.paragonGridReload();
            	}
            }
        });
    }

    function fnTx(){

		 var data = {
				 prodPlanYmd	: "PROD_PLAN_YMD",
				 plantCd		: "PLANT_CD",
				 prodLineCd		: "PROD_LINE_CD",
				 prodGrpCd		: "PROD_GRP_CD",
				 exportCountryCd : "EXPORT_COUNTRY",
				 dalatYn		: "DALAT_YN",
				 itemCd			: "ITEM_CD"
		 }

    	var jsonData = $prodPlanInqDGrid.getSelectedJsonData("dt_data", data);
    	var jsonObject = JSON.parse(jsonData);

    	if(!jsonObject) {
    		Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
    		return false;
    	}

    	var saveUrl = '/ctrl/inbound/productPlanInquiry/listProdPlanInqCloseTx';
    	var msg = 'MSG_IF_CFM_004';//생성 하시겠습니까?

        //ajax
        WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
        	$prodPlanInqHGrid.paragonGridReload();
    	})

    }


    function fnModify(flag, msg) {

		 var data = {
				 prodPlanYmd	: "PROD_PLAN_YMD",
				 plantCd		: "PLANT_CD",
				 prodLineCd		: "PROD_LINE_CD",
				 prodGrpCd		: "PROD_GRP_CD",
				 itemCd			: "ITEM_CD",
				 shiftGroupCd	: "SHIFT_GROUP_CD"
		 }

    	var jsonData = $prodPlanInqHGrid.getSelectedJsonData("dt_data", data);
    	var jsonObject = JSON.parse(jsonData);

    	if(!jsonObject) {
    		Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
    		return false;
    	}

    	jsonObject["flag"] = flag;

    	var saveUrl = '/ctrl/inbound/productPlanInquiry/updateProdPlanInqCloseYn';

        //ajax
        WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
        	$prodPlanInqHGrid.paragonGridReload();
    	})

    }

    function sendData(){
    	return {
			ymd 		: WMSUtil.fnDateSetting.yyyymmdd($('#prodPlanInqProdPlanYmdFr').val()),
			prodDeptCd	: $('#prodPlanInqProdDept').val(),
			prodLineCd	: $('#prodPlanInqProdLine').val(),
			prodGrpCd	: $('#prodPlanInqProdGrp').val()
    	}
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
    	$prodPlanInqHGrid.paragonGridSearch(sendData());
    }

    function fnListProdPlanInqH(){
        $prodPlanInqHGrid.paragonGrid({
        	url				: '/ctrl/inbound/productPlanInquiry/listProdPlanInqH',
        	rowEditable		: true,
            cellEditable	: false,
			sortable		: true,
			rownumbers		: true,
			shrinkToFit		: false,
			multiselect		: true,
            rowClickFocus	: true,
			//postData:{clientCd:$.trim($("#prodPlanInqClientCd").val())},
//			multielonly:true,
			height			: gridHeight,
			postData		: sendData(),
            colModel:[
                {editable: false, name:'CLIENT_CD',			width:"100px", align:"center", hidden:true},
                {editable: false, name:'PROD_PLAN_YMD',		width:"100px", align:"center", hidden:true},
                {editable: false, name:'PLANT_CD',			width:"100px", align:"center", hidden:true},
                {editable: false, name:'PROD_LINE_CD',		width:"100px", align:"center", hidden:true},
                {editable: false, name:'PROD_DEPT',			width:"150px", align:"center", excel:true},
                {editable: false, name:'PROD_LINE',			width:"150px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value:gridProdLine }
                },
//                {editable: false, name:'SHIFT_GROUP_CD',	width:"100px", align:"center"},
                {editable: false, name:'PROD_GRP_CD',		width:"100px", align:"center", hidden:true},
                {editable: false, name:'PROD_GRP',			width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value:gridProdGrp }
                },
                {editable: false, name:'PROD_PROG_ST_CD',	width:"100px", align:"center", hidden:true},
                {editable: false, name:'PROD_PROG_ST',		width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value:gridProdStCd }
                },
                {editable: false, name:'CLOSE_DT',			width:"160px", align:"center", excel:true},
                {editable: false, name:'WORK_USER',			width:"100px", align:"center", excel:true}
            ],
            pager			: "#prodPlanInqHGridNavi",
            domainId		: "PROD_PLAN_LIST",
//            rowClickFocus	: true,
            gridComplete	: function(){
            	//그리드 조회 후 첫번째 행 선택
                var ids = $prodPlanInqHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $prodPlanInqHGrid.setFocus(0);


                    var currRowData = $prodPlanInqHGrid.getRowData(ids[0]);

                    $prodPlanInqDGrid.paragonGridSearch({
                 	   ymd				: WMSUtil.fnDateSetting.yyyymmdd(currRowData.PROD_PLAN_YMD),
                	   plantCd			: currRowData.PLANT_CD,
                	   prodLineCd		: currRowData.PROD_LINE_CD,
                	   prodGrpCd		: currRowData.PROD_GRP_CD,
                	   //shiftGrpCd		: currRowData.SHIFT_GROUP_CD
             	   });

                }else{
                	$prodPlanInqDGrid.jqGrid('clearGridData');
                }

           },onSelectRowEvent: function(currRowData, prevRowData){
               $prodPlanInqDGrid.paragonGridSearch({
            	   ymd				: WMSUtil.fnDateSetting.yyyymmdd(currRowData.PROD_PLAN_YMD),
            	   plantCd			: currRowData.PLANT_CD,
            	   prodLineCd		: currRowData.PROD_LINE_CD,
            	   prodGrpCd		: currRowData.PROD_GRP_CD,
            	  // shiftGrpCd		: currRowData.SHIFT_GROUP_CD
        	   });
           },
           ondblClickCustom: function(id, iRow, iCol, e){
               rowDataList = $prodPlanInqHGrid.getRowData(iRow);
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
    function fnListProdPlanInqD(data){
        $prodPlanInqDGrid.paragonGrid({
            url				: '/ctrl/inbound/productPlanInquiry/listProdPlanInqD',
//            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            postData		: data,
            multiselect		: true,
            height			: gridHeight,
            firstData		: false,
            colModel		: [
                    		   {editable: false, name:'PROD_PLAN_YMD',		width:"100px", align:"center", hidden:true},
                    		   {editable: false, name:'PLANT_CD',			width:"100px", align:"center", hidden:true},
                    		   {editable: false, name:'PROD_LINE_CD',		width:"100px", align:"center", hidden:true},
                    		   {editable: false, name:'PROD_GRP_CD',		width:"100px", align:"center", hidden:true},
                               {editable: false, name:'BRAND',				width:"100px", align:"center", excel:true},
                               {editable: false, name:'SKU',				width:"200px", align:"center", excel:true},
                               {editable: false, name:'ITEM_CD',			width:"100px", align:"center", excel:true},
                               {editable: false, name:'ITEM_NM',			width:"200px", align:"left", excel:true},
                               {editable: false, name:'PROD_PLAN_QTY',		width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true},
                               {editable: false, name:'PROD_QTY',			width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true},
//                               {editable: false, name:'PROD_INST_NO',		width:"100px", align:"center"},
                               {editable: false, name:'PROD_PROG_ST_CD',	width:"100px", align:"center", hidden:true},
                               {editable: false, name:'PROD_PROG_ST',		width:"100px", align:"center", excel:true,
                            	   edittype:'selectText', formatter:'selectText', editoptions: { value:gridProdStCd }
                               },
                               {editable: false, name:'SHIFT_GROUP_CD',		width:"100px", align:"center", hidden:true},
                               {editable: false, name:'SHIFT_GROUP',		width:"100px", align:"center", excel:true},
//                               {editable: false, name:'EXPORT_COUNTRY_CD',	width:"100px", align:"center", hidden:true},
//                               {editable: true , name:'EXPORT_COUNTRY',		width:"150px", align:"center",
//                                   edittype:'select', formatter:'select', editoptions: { value : gridExportCountryCd }
//                               },
//                               {editable: true , name:'DALAT_YN',			width:"100px", align:"center",
//                                   edittype:'select', formatter:'select', editoptions: { value : gridDalatYn }
//                               }
            ],
            pager			: "#prodPlanInqDGridNavi",
            domainId		: "PROD_PLAN_DETAIL_LIST",
            rowClickFocus	: true,
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete   : function(){

            	//그리드 아래 부분 합계
            	var $footRow = $prodPlanInqDGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");

            	if(firstLoad){
                	var $brand = $footRow.find('>td[aria-describedby="prodPlanInqDGrid_BRAND"]').css("border-right-color", "transparent");
            	    var $sku = $footRow.find('>td[aria-describedby="prodPlanInqDGrid_SKU"]').css("border-right-color", "transparent");
            	    var $itemCd = $footRow.find('>td[aria-describedby="prodPlanInqDGrid_ITEM_CD"]').css("border-right-color", "transparent");
            	    var $itemNm = $footRow.find('>td[aria-describedby="prodPlanInqDGrid_ITEM_NM"]');
            	    $itemNm.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;

                	//그리드 동적
//                	WMSUtil.pwaGridDynamicArea(proNm)
            	}


            	var PROD_PLAN_QTY = $prodPlanInqDGrid.jqGrid('getCol', 'PROD_PLAN_QTY',false,'sum');
            	$prodPlanInqDGrid.jqGrid('footerData','set',{ PROD_PLAN_QTY : PROD_PLAN_QTY});

            	var PROD_QTY = $prodPlanInqDGrid.jqGrid('getCol', 'PROD_QTY',false,'sum');
            	$prodPlanInqDGrid.jqGrid('footerData','set',{ PROD_QTY : PROD_QTY});

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

var parentId = '';
$(document).ready(function() {
    ProdPlanInqApp.init();
});
