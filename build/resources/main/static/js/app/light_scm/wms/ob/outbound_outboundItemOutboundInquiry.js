/** Copyright (c) 2017 VertexID RND, Inc.
 *
 * Application Name : 제품별 출고조회[ObItemObInquiryApp]
 * Program Code     : PWMOB112Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * 이지만 	        2017. 06. 22. 	    First Draft.
 */

var ObItemObInquiryApp = function() {
	"use strict";
	/***************************************************************************
	 * 전역 객체 선언부 (return 상위부분에 선언해야함)
	 **************************************************************************/

	var proCd = 'PWMOB112Q';
	var proNm = 'obItemObInquiry';

	var $obItemObInquiryDetailGrid = $("#obItemObInquiryDetailGrid"); //제품별 출고조회 그리드
	var $callBackInput; //콜백함수 (자바스크립트의 순차적 실행 위함)
	var gridObLocalExportGbnCdOptions; // 내수수출구분
	var gridObProgStCdOptions; 	// 출고진행상태구분
	var gridObGbnCdOptions; 	// 출고구분
	var gridItemStCdOptions; 	//제품상태

    var firstLoad = true;
    var expanded = false;

	return {
		init: function() {

			gridObGbnCdOptions = WMSUtil.fnCombo.grid_selectBox('obItemObInquiryObGbnCd', 'OB_GBN_CD');
			gridItemStCdOptions = WMSUtil.fnCombo.grid('ITEM_ST_CD');
			gridObLocalExportGbnCdOptions = WMSUtil.fnCombo.grid_selectBox('obItemObInquiryLocalExportGbnCd', 'LOCAL_EXPORT_GBN_CD');

			WMSUtil.fnCombo.itemClassLarge('obItemObInquiryCategory', 'obItemObInquiryBrand', 'obItemObInquirySku');

			fnEvents();
			fnList();
		},
		callBackInput : function() {
			return $callBackInput;
		}
	};


	function fnList() {
		$obItemObInquiryDetailGrid.paragonGrid({
            url         : "/ctrl/outbound/itemOutboundInquiry/getItemOutBoundInquiryList",
            countable   : false,
            pageable    : false,
            sortable    : false,
            rowEditable : false,
            height      : '500',
			shrinkToFit : false,
			domainId	: "OB_ITEM_LIST",
			postData	: sendData(),
			includeGroupHeader : true,
            colModel:[
		              //{editable: false, name:'CATEGORY',         	 width:"200px", align:"left", 	 excel : true,  hidden:true},
		              //{editable: false, name:'BRAND',      	     width:"200px", align:"left",    excel : true,  hidden:true},
		              //{editable: false, name:'SKU',           	 width:"200px", align:"left",    excel : true,  hidden:true},
                      {editable: false, name:'ITEM_CD',        	 width:"200px", align:"left",	 	 },
                      //{editable: false, name:'SUPPLIER_NM',      	 width:"200px", align:"left",    excel : true,  hidden:true},

		              {editable: false, name:'CATEGORY_NM',     	 width:"100px", align:"left", 	 excel : true,  hidden:true},
		              {editable: false, name:'BRAND_NM',      	     width:"100px", align:"left",    excel : true,  hidden:true},
		              {editable: false, name:'SKU_NM',           	 width:"100px", align:"left",    excel : true,  hidden:true},
		              {editable: false, name:'ITEM', 	          	 width:"100px", align:"left",    excel : true,  hidden:true},
		              {editable: false, name:'STORE_NM',          	 width:"200px", align:"left",    excel : true,  hidden:true},
		              {editable: false, name:'SO_NO',               width:"120px", align:"left",  excel : true, hidden:true},

                      {editable: false, name:'MENU_SEQ',            width:"100px", align:"center",  hidden:true,    key:true},
                      {editable: false, name:"MENU_PARENT_SEQ",     width:"100px", align:"center",  hidden:true},
                      {editable: false, name:'UI_ICON',             width:"50px",  align:"center",  hidden: true},
                      {editable: false, name:'LEV',                 width:"50px",  align:"center",  hidden: true},
                      {editable: false, name:'MENU_ORDER',          width:"50px",  align:"center",  hidden: true},
                      {editable: false, name:'EXPANDED',          	width:"50px",  align:"center",  hidden: true},
                      {editable: false, name:'ITEM_NM',             width:"200px", align:"left",    excel : true},
                      {editable: false, name:'PKQTY',               width:"70px",  align:"center", formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'UOM',                 width:"80px",  align:"center",  excel : true},
                      {editable: false, name:'PLAN_QTY',            width:"150px", align:"right",   hidden: true},
                      //{editable: false, name:'PLAN_TOT_QTY',        width:"100px", align:"right",   excel : true, formatter:"integer",formatoptions: { defaultValue: '', thousandsSeparator: ',' }},
                      {editable: false, name:'PLAN_TOT_QTY',        width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'PLAN_BOX_QTY',        width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'PLAN_EA_QTY',         width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'CONF_QTY',            width:"150px", align:"right",   hidden: true},
                      {editable: false, name:'CONF_TOT_QTY',        width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'CONF_BOX_QTY',        width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'CONF_EA_QTY',         width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'NDELIVERY_BOX_QTY',   width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'LOCAL_EXPORT_GBN',    width:"100px", align:"center",  fixed :true, hidden: true,
                          edittype:'select', formatter:'select', editoptions: { value:gridObLocalExportGbnCdOptions }
                      },
                      {editable: false, name:'WEIGHT',              width:"100px", align:"right",   formatter:"integer",  hidden: true},
                      {editable: false, name:'ITEM_SPEC',           width:"150px", align:"center",  hidden: true},
                      {editable: false, name:'ITEM_ST',             width:"100px", align:"center",  hidden: true,
                          edittype:'select', formatter:'select', editoptions: {  value: gridItemStCdOptions }
                      },
                      {editable: false, name:'OB_GBN', width:"100px", align:"center",  fixed :true, hidden: true,
                          edittype:'select', formatter:'select', editoptions: { value:gridObGbnCdOptions }
                      },
                      {editable: false, name:'OB_NO',               width:"120px", align:"center",  hidden: true},

                      {editable: false, name:'OB_YMD',              width:"100px", align:"center",  hidden: true},
                      {editable: false, name:'REMARK',              width:"350px", align:"left"  ,  hidden: true},
            ],
            //pager : "#obItemObInquiryDetailGridNavi",
			groupHeaders :
			[
			  {
				rowspan : true,
				header : [
				           { start : 'PLAN_TOT_QTY', length : 3, domain : "OB_PLAN_QTY", startIdx:4},
				           { start : 'CONF_TOT_QTY', length : 3, domain : "CONF_QTY", startIdx:7}
				      ]
			  	}
			  ],
			  treeIcons  : {
	                plus    : 'ui-icon-plus',
	                minus   : 'ui-icon-minus',
	                leaf    : 'ui-icon-bullet'
	            },
	            sortname        : "MENU_PARENT_SEQ",
	            treeGrid        : true,
	            ExpandColumn    : "ITEM_CD",
	            treedatatype    : "json",
	            treeGridModel   : "adjacency",
	            treeReader      : {
	                parent_id_field : "MENU_PARENT_SEQ",
	                level_field     : "LEV",
	                leaf_field      : true,
	                expanded_field  : 'EXPANDED',
	                loaded          : false,
	                icon_field      : "UI_ICON"
	            },
	            footerrow		: true,
	            userDataOnFooter: true,
	            gridComplete    : function(){
	        		var ids = $obItemObInquiryDetailGrid.getDataIDs();
	        		if(ids.length != 0){
	        			if(!expanded){
	        				$('#obItemObInquiryAllUnfoldBtn').css('display', 'block');
	        				$('#obItemObInquiryAllFoldBtn').css('display', 'none');
	        			}else{
	        				$('#obItemObInquiryAllUnfoldBtn').css('display', 'none');
	        				$('#obItemObInquiryAllFoldBtn').css('display', 'block');
	        			}
	        		}
	        		//그리드 아래 부분 합계
	            	var $footRow = $obItemObInquiryDetailGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
	//

	            	var colArr = ['ITEM_CD', 'ITEM_NM', 'PKQTY'];
	            	if(firstLoad){
	            		for(var i = 0; i < colArr.length ; i++){
	            			$('.footrow > td[aria-describedby="'+proNm+'DetailGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
	            		}
	            	    $('.footrow >td[aria-describedby="'+proNm+'DetailGrid_UOM"]')
	    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

		            	firstLoad = false;
	            	}

	        		fnTotalSum($obItemObInquiryDetailGrid);
	           }

		});
	}

	 //전체  합계 조회
    function fnTotalSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/itemOutboundInquiry/getItemOutBoundInquiryListSum",
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

                	$grid.jqGrid('footerData','set', { PLAN_TOT_QTY 		: rowData.PLAN_TOT_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { PLAN_BOX_QTY 		: rowData.PLAN_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { PLAN_EA_QTY 			: rowData.PLAN_EA_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { CONF_TOT_QTY 		: rowData.CONF_TOT_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { CONF_BOX_QTY 		: rowData.CONF_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { CONF_EA_QTY 			: rowData.CONF_EA_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { NDELIVERY_BOX_QTY 	: rowData.NDELIVERY_BOX_QTY.toFixed(2) });

                }
            }
        });
    }

	function fnEvents() {

		WMSUtil.fnTagYmdSetting('obItemObInquiryYmd', true, true);

	    //코드 입력시 명 서치
        addClientCdChangeEvent("obItemObInquiryClient", ["obItemObInquiryStore", "obItemObInquiryRStore"]); //고객사
        addCdChangeEvent("obItemObInquiryClient", "obItemObInquiryStore", "STORE");  						//판매처
        addCdChangeEvent("obItemObInquiryClient", "obItemObInquiryRStore", "STORE"); 						//납품처

		// 검색 버튼 이벤트
		$("#obItemObInquirySearchBtn").click(function() {
			fnSearch();
		});
		// Popup Event.
		$("#obItemObInquiryClientPopup").click(function() {
			WMSUtil.popup.client('obItemObInquiryClient');
		});
		// 판매처 btn Event
		$("#obItemObInquiryStorePopup").click(function() {
			WMSUtil.popup.store('obItemObInquiryStore');
		});
		// 납품처 btn Event
		$("#obItemObInquiryRStorePopup").click(function() {
			WMSUtil.popup.rstore('obItemObInquiryRStore');
		});
		// 제품 btn Event
        $("#obItemObInquiryItemPopup").click(function(){
        	WMSUtil.popup.item('obItemObInquiryItem', false, 'obItemObInquiryClient');
        });
		// 고객사명 이벤트
		$("#obItemObInquiryClientNm").attr("disabled", true);

		// 엑셀 btn Event
		$("#obItemObInquiryExcelBtn").click(function(){
			$obItemObInquiryDetailGrid.downloadExcelAllItems();
		});

        //그리드 전체 접기
        $('#obItemObInquiryAllFoldBtn').click(function(){
    		expanded = false;
    		fnSearch();
        });
        //그리드 전체 펼치기
        $('#obItemObInquiryAllUnfoldBtn').click(function(){
    		expanded = true;
    		fnSearch();
        });

	}

	// 검색 버튼 이벤트
	function fnSearch() {

	    if($("#obItemObInquiryClientCd").val().length == 0){//고객사
	        Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obItemObInquiryClientCd").focus();
            return false;
        }else if($("#obItemObInquiryClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obItemObInquiryClientCd").focus();
            return false;
        }

        if($("#obItemObInquiryYmdFr").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obItemObInquiryYmdFr").focus();
            return false;
        }else if($("#obItemObInquiryYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obItemObInquiryYmdFr").focus();
            return false;
        }

        if($("#obItemObInquiryYmdTo").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obItemObInquiryYmdTo").focus();
            return false;
        }else if($("#obItemObInquiryYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obItemObInquiryYmdTo").focus();
            return false;
        }

		$obItemObInquiryDetailGrid.paragonGridSearch(sendData());
	}

	//데이터
	function sendData(){
		return {
	        clientCd        : $("#obItemObInquiryClientCd").val(),
	        obGbnCd         : $("#obItemObInquiryObGbnCd").val(),
	        carNo           : $("#obItemObInquiryCarNo").val(),
	        deliveryDgr     : $("#obItemObInquiryDeliveryDgr").val(),
	        storeCd         : $("#obItemObInquiryStoreCd").val(),
	        rstoreCd        : $("#obItemObInquiryRStoreCd").val(),
	        itemCd          : $("#obItemObInquiryItemCd").val(),
	        largeClassCd    : $('#obItemObInquiryCategory').val(),
	        middleClassCd   : $('#obItemObInquiryBrand').val(),
	        smallClassCd    : $('#obItemObInquirySku').val(),
	        localExportGbn  : $('#obItemObInquiryLocalExportGbnCd').val(),
	        obYmdFr         : WMSUtil.fnDateSetting.yyyymmdd($("#obItemObInquiryYmdFr").val()),
	        obYmdTo         : WMSUtil.fnDateSetting.yyyymmdd($("#obItemObInquiryYmdTo").val()),
	        expanded		: expanded
		}
	}

	function fnReloadGrid() {
		$obItemObInquiryDetailGrid.paragonGridReload();
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
	ObItemObInquiryApp.init();
});
