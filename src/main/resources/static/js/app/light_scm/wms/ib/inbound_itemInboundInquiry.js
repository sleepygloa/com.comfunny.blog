/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 제품별 입고내역[MasterAreaApp]
 * Program Code     : PWMIB109Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho      2017. 08. 31.       First Draft.
 */
var IbItemInquiryInsertApp = function () {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMIB109Q';
	var proNm = 'ibItemInquiry';

    // [El]프로그램 그리드
    var $ibItemInquiryHGrid = $("#ibItemInquiryHGrid");

    var ibProgStComboJson;
    var ibGbnComboJson;
    var itemStCdComboJson;

    var firstLoad = true;
    var expanded = false;

    return {
        init: function () {

        	WMSUtil.fnCombo.itemClassLarge('ibItemInquiryLargeClassCd', 'ibItemInquiryMiddleClassCd', 'ibItemInquirySmallClassCd');

        	ibProgStComboJson 		= WMSUtil.fnCombo.grid_selectBox('ibItemInquiryIbProgStCd', 'IB_PROG_ST_CD');

        	ibGbnComboJson 			= WMSUtil.fnCombo.grid_selectBox('ibItemInquiryIbGbnCd', 'IB_GBN_CD');

        	itemStCdComboJson 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');

        	WMSUtil.fnCombo.selectBox('ibItemInquiryLocalExportGbnCd', 'LOCAL_EXPORT_GBN_CD');

        	fnEvents();

            fnList();


        }
    };

    //[Fn] 이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('ibItemInquiryYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Supplier');
        WMSUtil.changePop(proNm, 'Item');

        //검색버튼
        $("#ibItemInquirySearchBtn").click(function(){
            fnSearch();
        });
        //엑셀버튼
        $("#ibItemInquiryExcelBtn").click(function(){
            $ibItemInquiryHGrid.downloadExcelAllItems();
        });

        //고객사 팝업
        $("#ibItemInquiryClientPopup").click(function(){
        	WMSUtil.popup.client('ibItemInquiryClient');
        });

        //구매처 팝업
        $("#ibItemInquirySupPopup").click(function(){
        	WMSUtil.popup.supplier('ibItemInquirySupplier');
        });

        //제품 팝업
        $("#ibItemInquiryItemPopup").click(function(){
        	WMSUtil.popup.item('ibItemInquiryItem', true, 'ibItemInquiryClient');
        });

        //고객사
        $("#ibItemInquiryClientNm").attr("disabled", true);

        //구매처
        $("#ibItemInquirySupplierNm").attr("disabled", true);

        //제품
        $("#ibItemInquiryItemNm").attr("disabled", true);

        //그리드 전체 접기
        $('#ibItemInquiryAllFoldBtn').click(function(){
    		expanded = false;
    		fnSearch();
        });
        //그리드 전체 펼치기
        $('#ibItemInquiryAllUnfoldBtn').click(function(){
    		expanded = true;
    		fnSearch();
        });

    }


    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //validation
        if($("#ibItemInquiryClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibItemInquiryClientCd").focus();
            return false;
        }else if($("#ibItemInquiryClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibItemInquiryClientCd").focus();
            return false;
        }
        if($("#ibItemInquiryYmdFr").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#ibItemInquiryYmdFr").focus();
            return false;
        }else if($("#ibItemInquiryYmdFr").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#ibItemInquiryYmdFr").focus();
            return false;
        }
        if($("#ibItemInquiryYmdTo").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#ibItemInquiryYmdTo").focus();
            return false;
        }else if($("#ibItemInquiryYmdTo").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#ibItemInquiryYmdTo").focus();
            return false;
        }
        $ibItemInquiryHGrid.paragonGridSearch(sendData());
    }

    function sendData(){
    	return {
            clientCd 		: $.trim($("#ibItemInquiryClientCd").val()),
            supCd 			: $.trim($("#ibItemInquirySupplierCd").val()),
            ymdFr 			: WMSUtil.fnDateSetting.yyyymmdd($('#ibItemInquiryYmdFr').val()),
            ymdTo 			: WMSUtil.fnDateSetting.yyyymmdd($('#ibItemInquiryYmdTo').val()),
            ibProgStCd 		: $.trim($("#ibItemInquiryIbProgStCd option:selected").val()),
            ibGbnCd 		: $.trim($("#ibItemInquiryIbGbnCd option:selected").val()),
            ibNo 			: $.trim($("#ibItemInquiryIbNo").val()),
            itemCd 			: $("#ibItemInquiryItemCd").val(),
            largeClassCd	: $('#ibItemInquiryLargeClassCd option:selected').val(),
            middleClassCd	: $('#ibItemInquiryMiddleClassCd option:selected').val(),
			smallClassCd	: $('#ibItemInquirySmallClassCd option:selected').val(),
			localExportGbn	: $('#ibItemInquiryLocalExportGbnCd option:selected').val(),
			expanded		: expanded
    	}
    }

    function fnList(){
        $ibItemInquiryHGrid.paragonGrid({
            url				: '/ctrl/inbound/itemInboundInquiry/ibItemInquiryD',
            cellEditable	: true,
            sortable		: false,
//            rownumbers		: true,
            shrinkToFit		: false,
            height			: '464',
            postData		: sendData(),
            colModel:[
                      {editable: false, name:'MENU_SEQ',			width:"100px", align:"center",	hidden:true,	key:true},
                      {editable: false, name:"MENU_PARENT_SEQ", 	width:"100px", align:"center",	hidden:true},
                      {editable: false, name:'ITEM_CD', 			width:"200px", align:"left"		},
                      {editable: false, name:'UI_ICON', 			width:"50px",  align:"center",	hidden:true},
                      {editable: false, name:'LEV', 				width:"50px",  align:"center", 	hidden:true},
                      {editable: false, name:'MENU_ORDER', 			width:"50px",  align:"center", 	hidden:true},
                      {editable: false, name:'EXPANDED', 			width:"50px",  align:"center", 	hidden:true},

                      {editable: false, name:"CATEGORY_NM", 		width:"100px", align:"center",	hidden:true, excel:true},
                      {editable: false, name:"BRAND_NM", 			width:"100px", align:"center",	hidden:true, excel:true},
                      {editable: false, name:"SKU_NM", 				width:"100px", align:"center",	hidden:true, excel:true},
                      {editable: false, name:"ITEM", 				width:"100px", align:"center",	hidden:true, excel:true},
                      {editable: false, name:'ITEM_NM', 			width:"200px", align:"left",	excel:true		},
                      {editable: false, name:"SUPPLIER_CD",	 		width:"100px", align:"center",	hidden:true},
                      {editable: false, name:"SUPPLIER_NM",	 		width:"200px", align:"center",	hidden:true, excel:true},
//                {editable: false, name:'CLIENT', 		width:"100px", align:"center"	},
//                {editable: false, name:'IB_YMD', 		width:"100px", align:"center"	},
//                {editable: false, name:'IB_NO', 		width:"100px", align:"center"	},
//                {editable: false, name:'IB_PROG_ST', 	width:"80px",  align:"center", 	fixed :true,
//                    edittype:'select', formatter:'select', editoptions: { value:ibProgStComboJson }
//                },
//                {editable: false, name:'ITEM_CD', 					width:"100px", align:"center",	hidden: true	},
//                {editable: false, name:'PKQTY', 		width:"50px",  align:"center"	},
                {editable: false, name:'UOM', 			width:"80px",  align:"center", excel:true	},
                {editable: false, name:'PLAN_QTY',		width:"100px", align:"right",	hidden: true},
                {editable: false, name:'PLAN_TOT_QTY',	width:"100px", align:"right",	formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PLAN_BOX_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PLAN_EA_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name:'CONF_QTY',		width:"100px", align:"right",	hidden: true},
                {editable: false, name:'CONF_TOT_QTY',	width:"100px", align:"right",	formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name:'CONF_BOX_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name:'CONF_EA_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'WEIGHT', 		width:"100px", align:"right", 	formatter:"integer"},
//                {editable: false, name:'ITEM_SPEC', 	width:"150px", align:"center"	},
//                {editable: false, name: "ITEM_ST", 		width: "70px", align:"center",
//                	edittype: 'select', formatter: 'select', editoptions: {  value: itemStCdComboJson }
//                },
//                {editable: false, name:'IB_GBN', 		width:"100px", align:"center",	fixed :true,
//                    edittype:'select', formatter:'select', editoptions: { value:ibGbnComboJson }
//                },
//                {editable: false,name:'REMARK', 		width:"220px", align:"left"		},
            ],
            pager			: "#ibItemInquiryHGridNavi",
            domainId		: "IB_ITEM_BY_LIST",
//            rowClickFocus	: true,
            groupHeaders	: [
		                          {
		                              rowspan : true,
		                              header:[
		                                  {start: 'PLAN_TOT_QTY', length: 3 , domain:"PLAN_QTY"},
		                                  {start: 'CONF_TOT_QTY', length: 3 , domain:"CONF_QTY" }
		                              ]
		                          }
		                      ],
        	treeIcons	: {
        		plus	: 'ui-icon-plus',
        		minus	: 'ui-icon-minus',
        		leaf	: 'ui-icon-bullet'
        	},
        	sortname		: "MENU_PARENT_SEQ",
        	treeGrid		: true,
        	ExpandColumn	: "ITEM_CD",
        	treedatatype	: "json",
        	treeGridModel	: "adjacency",
        	treeReader		: {
        		parent_id_field : "MENU_PARENT_SEQ",
        		level_field		: "LEV",
        		leaf_field		: true,
        		expanded_field	: 'EXPANDED',
//        		loaded			: "loaded",
        		loaded			: false,
        		icon_field		: "UI_ICON"
        	},
        	footerrow		: true,
            userDataOnFooter: true,
            loadComplete	: function() {
            	//그리드 아래 부분 합계
            	var $footRow = $ibItemInquiryHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['ITEM_CD', 'ITEM_NM'];
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'HGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'HGrid_UOM"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;
            	}

            },
        	gridComplete	: function(){
        		var ids = $ibItemInquiryHGrid.getDataIDs();
        		if(ids.length != 0){
        			if(!expanded){
        				$('#ibItemInquiryAllUnfoldBtn').css('display', 'block');
        				$('#ibItemInquiryAllFoldBtn').css('display', 'none');
        			}else{
        				$('#ibItemInquiryAllUnfoldBtn').css('display', 'none');
        				$('#ibItemInquiryAllFoldBtn').css('display', 'block');
        			}
        		}

//        		if(firstLoad){
//                	//그리드 동적
//                	WMSUtil.pwaGridDynamicArea(proNm)
//        			firstLoad = false;
//        		}

        		//총합계
            	fnTotalSum($ibItemInquiryHGrid);
        	}
        });
    }

  //전체  합계 조회
    function fnTotalSum($grid){
        $.ajax({
            url 		: "/ctrl/inbound/itemInboundInquiry/ibItemInquiryDSum",
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

                }
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
    IbItemInquiryInsertApp.init();
});
