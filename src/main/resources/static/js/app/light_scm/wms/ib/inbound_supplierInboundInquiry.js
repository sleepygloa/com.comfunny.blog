/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 구매처별 입고내역[MasterAreaApp]
 * Program Code     : PWMIB108Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho      2017. 08. 30.       First Draft.
 */
var IbSupInquiryInsertApp = function () {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMIB108Q';
	var proNm = 'ibSupInquiry';

    // [El]프로그램 그리드
    var $ibSupInquiryHGrid = $("#ibSupInquiryHGrid");

    var ibProgStComboJson;

    var ibGbnComboJson;

    var firstLoad = true;
    var expanded = false;

    return {
        init: function () {
        	WMSUtil.fnCombo.itemClassLarge('ibSupInquiryLargeClassCd', 'ibSupInquiryMiddleClassCd', 'ibSupInquirySmallClassCd');

        	ibProgStComboJson 	= WMSUtil.fnCombo.grid_selectBox('ibSupInquiryIbProgStCd', 'IB_PROG_ST_CD');

        	ibGbnComboJson 		= WMSUtil.fnCombo.grid_selectBox('ibSupInquiryIbGbnCd', 'IB_GBN_CD');

        	fnEvents(); //클릭 이벤트

//            fnList(); //구매처별 입고내역 리스트

            fnListHierachy();


        }
    };


    //[Fn] 이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('ibSupInquiryYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Supplier');
        WMSUtil.changePop(proNm, 'Item');

        //검색버튼
        $("#ibSupInquirySearchBtn").click(function(){
            fnSearch();
        });
        //엑셀버튼
        $("#ibSupInquiryExcelBtn").click(function(){
            $ibSupInquiryHGrid.downloadExcelAllItems();
        });

        $("#ibSupInquiryClientPopup").click(function(){
        	WMSUtil.popup.client('ibSupInquiryClient');
        });

        $("#ibSupInquirySupplierPopup").click(function(){
        	WMSUtil.popup.supplier('ibSupInquirySupplier');
        });

        $("#ibSupInquiryItemPopup").click(function(){
        	WMSUtil.popup.item('ibSupInquiryItem', {clientCd : $('#'+proNm+'ClientCd').val()});
        });

        $("#ibSupInquiryClientNm").attr("disabled", true);
        $("#ibSupInquirySupplierNm").attr("disabled", true);
        $("#ibSupInquiryItemNm").attr("disabled", true);

        //그리드 전체 접기
        $('#ibSupInquiryAllFoldBtn').click(function(){
    		expanded = false;
    		fnSearch();
        });
        //그리드 전체 펼치기
        $('#ibSupInquiryAllUnfoldBtn').click(function(){
    		expanded = true;
    		fnSearch();
        });
    }


    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //validation
        if($("#ibSupInquiryClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibSupInquiryClientCd").focus();
            return false;
        }else if($("#ibSupInquiryClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibSupInquiryClientCd").focus();
            return false;
        }
        if($("#ibSupInquiryYmdFr").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#ibSupInquiryYmdFr").focus();
            return false;
        }else if($("#ibSupInquiryYmdFr").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#ibSupInquiryYmdFr").focus();
            return false;
        }
        if($("#ibSupInquiryYmdTo").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#ibSupInquiryYmdTo").focus();
            return false;
        }else if($("#ibSupInquiryYmdTo").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#ibSupInquiryYmdTo").focus();
            return false;
        }

        $ibSupInquiryHGrid.paragonGridSearch(sendData());
    }

    function sendData(){
    	return {
    		dcCd			: $('#mainDcCd option:selected').val(),
            clientCd 		: $.trim($("#ibSupInquiryClientCd").val()),
            supCd 			: $.trim($("#ibSupInquirySupplierCd").val()),
            ymdFr 			: WMSUtil.fnDateSetting.yyyymmdd($('#ibSupInquiryYmdFr').val()),
            ymdTo 			: WMSUtil.fnDateSetting.yyyymmdd($('#ibSupInquiryYmdTo').val()),
            ibProgStCd 		: '20',
            ibGbnCd 		: $.trim($("#ibSupInquiryIbGbnCd").val()),
            ibNo 			: $.trim($("#ibSupInquiryIbNo").val()),
            itemCd 			: $("#ibSupInquiryItemCd").val(),
            largeClassCd	: $('#ibSupInquiryLargeClassCd option:selected').val(),
            middleClassCd	: $('#ibSupInquiryMiddleClassCd option:selected').val(),
			smallClassCd	: $('#ibSupInquirySmallClassCd option:selected').val(),
			expanded		: expanded
    	}
    }

    //그리드 초기화
    function fnList(){
        $ibSupInquiryHGrid.paragonGrid({
            url				: '/ctrl/inbound/supplierInboundInquiry/listIbSupInqD',
            cellEditable	: true,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            height			: '520',
            postData		: sendData(),
            colModel:[
//                  {editable: false, name:'CLIENT', 			width:"100px", align:"center"	},
					{editable: false, name:'SUPPLIER_CD',	width:"200px", align:"left",	hidden:true, excel:true},
					{editable: false, name:'CATEGORY_CD', 	width:"100px", align:"center",	hidden:true, excel:true},
					{editable: false, name:'BRAND_CD', 		width:"100px", align:"center",	hidden:true, excel:true},
					{editable: false, name:'SKU_CD', 		width:"100px", align:"center",	hidden:true, excel:true},
					{editable: false, name:'ITEM_CD', 		width:"100px", align:"center",	hidden:true, excel:true},
					{editable: false, name:'SUPPLIER_CD', 	width:"100px", align:"center",	hidden:true, excel:true},
//                  {editable: false, name:'IB_NO', 			width:"100px", align:"center"	},
//                  {editable: false, name:'IB_PROG_ST', 		width:"150px", align:"center",
//                      fixed :true, edittype:'select', formatter:'select', editoptions: { value:ibProgStComboJson }
//                  },
                  {editable: false, name:'PKQTY', 			width:"100px", align:"center", excel:true,  formatter:"integer",	excelDataType : "integer"},
                  {editable: false, name:'UOM', 			width:"100px", align:"center", excel:true	},
                  {editable: false, name:'PLAN_QTY', 		width:"100px", align:"right", 	hidden: true},
                  {editable: false, name:'PLAN_TOT_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                  {editable: false, name:'PLAN_BOX_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                  {editable: false, name:'PLAN_EA_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},,
                  {editable: false, name:'CONF_QTY', 		width:"100px", align:"right", 	hidden: true},
                  {editable: false, name:'CONF_TOT_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                  {editable: false, name:'CONF_BOX_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                  {editable: false, name:'CONF_EA_QTY',	 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                  {editable: false, name:'IB_YMD', 			width:"100px", align:"center"	},
//                  {editable: false, name:'IB_GBN', 			width:"150px", align:"center",
//                      fixed :true, edittype:'select', formatter:'select', editoptions: { value:ibGbnComboJson }
//                  },
//                  {editable: false,name:'REMARK', 			width:"210px", align:"left"		}
            ],
            pager		: "#ibSupInquiryHGridNavi",
            domainId	: "IB_SUP_BY_LIST",
            rowClickFocus	: true,
            groupHeaders	: [
		                          {
		                              rowspan : true,
		                              header:[
		                                  {start: 'PLAN_TOT_QTY', length: 3 , domain:"PLAN_QTY"	},
		                                  {start: 'CONF_TOT_QTY', length: 3 , domain:"CONF_QTY" }
		                              ]
		                          }
	                          ],
        });
    }

    //그리드 초기화
    function fnListHierachy(){
        $ibSupInquiryHGrid.paragonGrid({
            url				: '/ctrl/inbound/supplierInboundInquiry/listIbSupInqDHierachy',
//            cellEditable	: true,
//            sortable		: true,
//            rownumbers		: true,
            shrinkToFit		: false,
            height			: '500',
            postData		: sendData(),
            colModel:[
				  {editable: false, name:'MENU_SEQ',		width:"100px", align:"center",	hidden:true,	key:true},
				  {editable: false, name:"MENU_PARENT_SEQ", width:"100px", align:"center",	hidden:true},
				  {editable: false, name:'ITEM_CD', 		width:"200px", align:"left"		},
				  {editable: false, name:'UI_ICON', 		width:"50px",  align:"center",	hidden: true},
				  {editable: false, name:'LEV', 			width:"50px",  align:"center", 	hidden: true},
				  {editable: false, name:'MENU_ORDER', 		width:"50px",  align:"center", 	hidden: true},
				  {editable: false, name:'EXPANDED', 		width:"50px",  align:"center", 	hidden: true},
				  {editable: false, name:'ITEM_NM', 		width:"200px", align:"left"		},
//                  {editable: false, name:'CLIENT', 			width:"100px", align:"center"	},
				  {editable: false, name:'SUPPLIER_NM', 	width:"200px", align:"center",	hidden:true, excel:true},
                  {editable: false, name:'CATEGORY_NM', 	width:"100px", align:"center",	hidden:true, excel:true},
                  {editable: false, name:'BRAND_NM', 		width:"100px", align:"center",	hidden:true, excel:true},
                  {editable: false, name:'SKU_NM', 			width:"100px", align:"center",	hidden:true, excel:true},
                  {editable: false, name:'ITEM', 			width:"100px", align:"center",	hidden:true, excel:true},
//                  {editable: false, name:'IB_NO', 			width:"100px", align:"center"	},
//                  {editable: false, name:'IB_PROG_ST', 		width:"150px", align:"center",
//                      fixed :true, edittype:'select', formatter:'select', editoptions: { value:ibProgStComboJson }
//                  },
                  {editable: false, name:'PKQTY', 			width:"100px", align:"center", excel:true,  formatter:"integer",	excelDataType : "integer"},
                  {editable: false, name:'UOM', 			width:"100px", align:"center", excel:true	},
                  {editable: false, name:'PLAN_QTY', 		width:"100px", align:"right", 	hidden: true},
                  {editable: false, name:'PLAN_TOT_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                  {editable: false, name:'PLAN_BOX_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                  {editable: false, name:'PLAN_EA_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                  {editable: false, name:'CONF_QTY', 		width:"100px", align:"right", 	hidden: true},
                  {editable: false, name:'CONF_TOT_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                  {editable: false, name:'CONF_BOX_QTY', 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
                  {editable: false, name:'CONF_EA_QTY',	 	width:"100px", align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                  {editable: false, name:'IB_YMD', 			width:"100px", align:"center"	},
//                  {editable: false, name:'IB_GBN', 			width:"150px", align:"center",
//                      fixed :true, edittype:'select', formatter:'select', editoptions: { value:ibGbnComboJson }
//                  },
//                  {editable: false,name:'REMARK', 			width:"210px", align:"left"		}
            ],
            pager		: "#ibSupInquiryHGridNavi",
            domainId	: "IB_SUP_BY_LIST",
            rowClickFocus	: true,
            groupHeaders	: [
		                          {
		                              rowspan : true,
		                              header:[
		                                  {start: 'PLAN_TOT_QTY', length: 3 , domain:"PLAN_QTY"	},
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
        		loaded			: false,
        		icon_field		: "UI_ICON"
        	},
        	footerrow		: true,
            userDataOnFooter: true,
            loadComplete	: function() {
            	//그리드 아래 부분 합계
            	var $footRow = $ibSupInquiryHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['ITEM_CD', 'ITEM_NM', 'PKQTY'];
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
        		var ids = $ibSupInquiryHGrid.getDataIDs();
        		if(ids.length != 0){
        			if(!expanded){
        				$('#ibSupInquiryAllUnfoldBtn').css('display', 'block');
        				$('#ibSupInquiryAllFoldBtn').css('display', 'none');
        			}else{
        				$('#ibSupInquiryAllUnfoldBtn').css('display', 'none');
        				$('#ibSupInquiryAllFoldBtn').css('display', 'block');
        			}
        		}

//        		if(firstLoad){
//                	//그리드 동적
//                	WMSUtil.pwaGridDynamicArea(proNm)
//        			firstLoad = false;
//        		}

        		//총합계
            	fnTotalSum($ibSupInquiryHGrid);
        	}
        });

    }

    //전체  합계 조회
    function fnTotalSum($grid){
        $.ajax({
            url 		: "ctrl/inbound/supplierInboundInquiry/listIbSupInqDHierachySum",
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
    IbSupInquiryInsertApp.init();
});
