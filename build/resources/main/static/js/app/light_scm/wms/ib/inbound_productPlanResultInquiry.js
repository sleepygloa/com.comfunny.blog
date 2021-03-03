/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 생산계획대비실적[ProdPlanResultInqApp]
 * Program Code     : PWMIB202Q
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon ho 		2018. 11. 29.  		First Draft.
 */
var ProdPlanResultInqApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMIB202Q';
	var proNm = 'prodPlanResultInq';

	//고객사 세팅
	var clientCd = ParagonSession.s_clientCd_Prioord;

	// [El]프로그램 그리드
	var $prodPlanResultInqHGrid = $("#prodPlanResultInqHGrid");

	//그리드의 콤보 json 데이터
	var gridProdDept;
	var gridProdLine;
	var gridProdGrp;
	var gridBrand;
	var gridSku;

    var firstLoad = true;
    var expanded = false;

    return {
        init: function () {

        	gridProdDept 	= WMSUtil.fnCombo.prodDept('prodPlanResultInqProdDept', 'PROD_DEPT_CD');

        	gridProdGrp  	= WMSUtil.fnCombo.grid_selectBox('prodPlanResultInqProdGrp',  'PROD_GRP_CD');

        	WMSUtil.fnCombo.itemClassLarge('prodPlanResultInqCategory', 'prodPlanResultInqBrand', 'prodPlanResultInqSku');

        	fnEvents();

        	fnListH();

	    }
    };

    //[Fn] 이벤트
    function fnEvents(){

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Item');

    	WMSUtil.fnTagYmdSetting('prodPlanResultInqProdYmd', true, true);

    	//검색
    	$("#prodPlanResultInqSearchBtn").click(function(){
    		fnSearch();
    	});

    	//엑셀버튼
    	$("#prodPlanResultInqExcelBtn").click(function(){
	        $prodPlanResultInqHGrid.downloadExcelAllItems();
    	});

    	//생산부서-생산라인 이벤트
    	$('#prodPlanResultInqProdDept').change(function(){
    		$('#prodPlanResultInqProdLine').empty().append('<option></option>');
    		WMSUtil.fnCombo.prodLine('prodPlanResultInqProdLine', 'PROD_LINE_CD', $(this).val());
    	});

    	//고객사 세팅
    	$('#prodPlanResultInqClientCd').val(clientCd);

    	//제품코드 팝업
    	$('#prodPlanResultInqItemPopup').click(function(){
    		WMSUtil.popup.item('prodPlanResultInqItem', false, 'prodPlanResultInqClient');
    	});

        //그리드 전체 접기
        $('#prodPlanResultInqAllFoldBtn').click(function(){
    		expanded = false;
    		fnSearch();
        });
        //그리드 전체 펼치기
        $('#prodPlanResultInqAllUnfoldBtn').click(function(){
    		expanded = true;
    		fnSearch();
        });

    }

    //데이터 SET. 조회버튼, 그리드 postData 사용
    function sendData(){
    	return {
    		dcCd		: $('#mainDcCd option:selected').val(),
    		clientCd	: $('#prodPlanResultInqClientCd').val(),
			ymdFr 		: WMSUtil.fnDateSetting.yyyymmdd($('#prodPlanResultInqProdYmdFr').val()),
			ymdTo 		: WMSUtil.fnDateSetting.yyyymmdd($('#prodPlanResultInqProdYmdTo').val()),
			prodDeptCd	: $('#prodPlanResultInqProdDept').val(),
			prodLineCd	: $('#prodPlanResultInqProdLine').val(),
			prodGrpCd	: $('#prodPlanResultInqProdGrp').val(),
			prodCategory: $('#prodPlanResultInqCategory').val(),
			prodBrand	: $('#prodPlanResultInqBrand').val(),
			prodSku		: $('#prodPlanResultInqSku').val(),
			itemCd		: $('#prodPlanResultInqItemCd').val(),
			expanded	: expanded
    	};
    }



    //[Fn] 검색 조건 매핑
    function fnSearch(){
    	$prodPlanResultInqHGrid.paragonGridSearch(sendData());
    }

    //adjancy
//    function fnListH(){
//    	$prodPlanResultInqHGrid.paragonGrid({
//        	url				: '/ctrl/inbound/productPlanResultInquiry/listProdPlanResultInqH',
//			countable       : false,
//			pageable        : false,
//			sortable        : false,
//			rowEditable     : false,
//			height			: '576',
//			postData		: sendData(),
//            colModel:[
//                      {editable: false, name:'MENU_SEQ',			width:"100px", align:"center",	hidden:true,	key:true},
//                      {editable: false, name:"MENU_PARENT_SEQ", 	width:"100px", align:"center",	hidden:true},
//                      {editable: false, name:'ITEM_CD', 			width:"200px", align:"left"},
//                      {editable: false, name:'UI_ICON', 			width:"50px",  align:"center",	hidden: true},
//                      {editable: false, name:'LEV', 				width:"50px",  align:"center", 	hidden: true},
//                      {editable: false, name:'MENU_ORDER', 			width:"50px",  align:"center", 	hidden: true},
////                      {editable: false, name:'PLANT_CD',			width:"100px", align:"center"},
////                      {editable: false, name:'BRAND_CD',			width:"100px", align:"center"},
////                      {editable: false, name:'SKU_CD',				width:"100px", align:"center"},
////                      {editable: false, name:'ITEM_CD',				width:"100px", align:"center"},
////                      {editable: false, name:'PROD_LINE',			width:"100px", align:"center"},
//                      {editable: false, name:'ITEM_NM',				width:"200px", align:"left"},
////                      {editable: false, name:'PROD_LINE', 			width:"200px", align:"left"},
////                      {editable: false, name:'PROD_DEPT',			width:"100px", align:"center"},
//                      {editable: false, name:'PROD_YMD',			width:"100px", align:"center"},
//                      {editable: false, name:'SHIFT_GROUP_CD',		width:"100px", align:"center"},
//                      {editable: false, name:'PROD_GRP_CD',			width:"100px", align:"center", hidden:true},
//                      {editable: false, name:'PROD_GRP_NM',			width:"100px", align:"center",
//                    	  edittype:'select', formatter:'select', editoptions: { value:gridProdGrp }
//                      },
//                      {editable: false, name:'PROD_PLAN_QTY',		width:"100px", align:"center"},
//                      {editable: false, name:'PROD_QTY',			width:"100px", align:"center"},
//
//            ],
//            pager			: "#prodPlanResultInqHGridNavi",
////            domainId		: "IB_PLAN_LIST",
//            treeIcons	: {
//        		plus	: 'ui-icon-plus',
//    			minus	: 'ui-icon-minus',
//				leaf	: 'ui-icon-bullet'
//            },
//            sortname		: "MENU_PARENT_SEQ",
//            treeGrid		: true,
//            ExpandColumn	: "ITEM_CD",
//            treedatatype	: "json",
//            treeGridModel	: "adjacency",
//            treeReader		: {
//        		parent_id_field : "MENU_PARENT_SEQ",
//        		level_field		: "LEV",
//        		leaf_field		: true,
//        		expanded_field	: false,
//        		loaded			: "loaded",
//        		icon_field		: "UI_ICON"
//            },
//            gridComplete	: function(){
//
//           }
//        });
//	}

  //전체  합계 조회
    function fnTotalSum($grid){
        $.ajax({
            url 		: "ctrl/inbound/productPlanResultInquiry/listProdPlanResultInqHSum",
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

                	$grid.jqGrid('footerData','set', { PROD_PLAN_QTY 		: rowData.PROD_PLAN_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { PROD_QTY 		: rowData.PROD_QTY.toFixed(2) });



                }
            }
        });
    }

    //nested
    function fnListH(){
    	$prodPlanResultInqHGrid.paragonGrid({
        	url				: '/ctrl/inbound/productPlanResultInquiry/listProdPlanResultInqH',
			countable       : false,
			pageable        : false,
			sortable        : false,
			rowEditable     : false,
			height			: '530',
//			ExpandColClick	: true,
			postData		: sendData(),
            colModel:[
                      {editable: false, name:'MENU_SEQ',			width:"100px", align:"center",	hidden:true,	key:true},
                      {editable: false, name:"MENU_PARENT_SEQ", 	width:"100px", align:"center",	hidden:true},
                      {editable: false, name:'ITEM_CD', 			width:"200px", align:"left"},
                      {editable: false, name:'UI_ICON', 			width:"50px",  align:"center",	hidden: true},
                      {editable: false, name:'LEV', 				width:"50px",  align:"center", 	hidden: true},
                      {editable: false, name:'MENU_ORDER', 			width:"50px",  align:"center", 	hidden: true},
                      {editable: false, name:'EXPANDED', 			width:"50px",  align:"center", 	hidden: true},
//                      {editable: false, name:'PLANT_CD',			width:"100px", align:"center"},
//                      {editable: false, name:'BRAND_CD',			width:"100px", align:"center"},
//                      {editable: false, name:'SKU_CD',				width:"100px", align:"center"},
//                      {editable: false, name:'ITEM_CD',				width:"100px", align:"center"},
//                      {editable: false, name:'PROD_LINE',			width:"100px", align:"center"},
                      {editable: false, name:'ITEM_NM',				width:"200px", align:"left"},
                      {editable: false, name:'PROD_DEPT_NM',		width:"200px", align:"center", 	hidden:true, excel:true},
                      {editable: false, name:'PROD_LINE_NM', 		width:"200px", align:"left", 	hidden:true, excel:true},
                      {editable: false, name:'BRAND_NM',			width:"100px", align:"center", 	hidden:true, excel:true},
                      {editable: false, name:'SKU_NM', 				width:"100px", align:"left", 	hidden:true, excel:true},
                      {editable: false, name:'ITEM', 				width:"100px", align:"left", 	hidden:true, excel:true},
                      {editable: false, name:'ITEM_NM', 			width:"200px", align:"left", 	hidden:true, excel:true},
//                      {editable: false, name:'PROD_YMD',			width:"100px", align:"center"},
//                      {editable: false, name:'SHIFT_GROUP_CD',		width:"100px", align:"center"},
//                      {editable: false, name:'PROD_GRP_CD',			width:"100px", align:"center", hidden:true},
//                      {editable: false, name:'PROD_GRP_NM',			width:"100px", align:"center",
//                    	  edittype:'select', formatter:'select', editoptions: { value:gridProdGrp }
//                      },
                      {editable: false, name:'PROD_PLAN_QTY',		width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'PROD_QTY',			width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true}
            ],
            pager			: "#prodPlanResultInqHGridNavi",
            domainId		: "IB_PROD_PLAN_RESULT_LIST",
            treeIcons	: {
        		plus	: 'ui-icon-plus',
    			minus	: 'ui-icon-minus',
				leaf	: 'ui-icon-bullet'
            },
            sortname		: "MENU_PARENT_SEQ",
            viewrecords:false,
            treeGrid		: true,
            ExpandColumn	: "ITEM_CD",
            treedatatype	: "json",
            treeGridModel	: "adjacency",
            gridview		: true,
            loadonce		: false,
            treeReader		: {
        		parent_id_field : "MENU_PARENT_SEQ",
        		level_field		: "LEV",
        		leaf_field		: true,
        		expanded_field	: "EXPANDED",
        		loaded			: false,
        		icon_field		: "UI_ICON"
            },
            footerrow		: true,
            userDataOnFooter: true,
            loadComplete	: function() {
            	//그리드 아래 부분 합계
            	var $footRow = $prodPlanResultInqHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['ITEM_CD'];
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'HGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'HGrid_ITEM_NM"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;
            	}

            },
            gridComplete	: function(){
        		var ids = $prodPlanResultInqHGrid.getDataIDs();
        		if(ids.length != 0){
        			if(!expanded){
        				$('#prodPlanResultInqAllUnfoldBtn').css('display', 'block');
        				$('#prodPlanResultInqAllFoldBtn').css('display', 'none');
        			}else{
        				$('#prodPlanResultInqAllUnfoldBtn').css('display', 'none');
        				$('#prodPlanResultInqAllFoldBtn').css('display', 'block');
        			}
        		}
        		//총합계
            	fnTotalSum($prodPlanResultInqHGrid);
//        		if(firstLoad){
//                	//그리드 동적
//                	WMSUtil.pwaGridDynamicArea(proNm)
//        			firstLoad = false;
//        		}
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
    ProdPlanResultInqApp.init();
});

