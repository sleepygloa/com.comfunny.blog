/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 생산대비실적[ProdResultInqApp]
 * Program Code     : PWMIB203Q
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon ho 		2018. 12. 03.  		First Draft.
 */
var ProdResultInqApp = function () {
	"use strict";



	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMIB203Q';
	var proNm = 'prodResultInq';

	//고객사 세팅
	var clientCd = ParagonSession.s_clientCd_Prioord;

	// [El]프로그램 그리드
	var $prodResultInqHGrid = $("#prodResultInqHGrid");

	var $prodResultInqDGrid = $("#prodResultInqDGrid");

	//그리드의 콤보 json 데이터
	var gridProdDept;
	var gridProdLine;
	var gridProdGrp;
	var gridBrand;
	var gridSku;

    var firstLoad = true;
    var firstLoadD = true;
    var expanded = false;

    // 파렛트 그리스 send 데이터(합계용)
    var prodDeptCdD;
	var prodInstYmdD;
	var prodLineCdD;
	var prodGrpCdD;
	var itemCdD;

    return {
        init: function () {

        	gridProdDept = WMSUtil.fnCombo.prodDept('prodResultInqProdDept', 'PROD_DEPT_CD');

        	gridProdGrp  = WMSUtil.fnCombo.grid_selectBox('prodResultInqProdGrp',  'PROD_GRP_CD');

        	WMSUtil.fnCombo.itemClassLarge('prodResultInqCategory', 'prodResultInqBrand', 'prodResultInqSku');


        	fnEvents();

        	fnListH();

        	fnListD();

	    }
    };

    //[Fn] 이벤트
    function fnEvents(){

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Item');

    	WMSUtil.fnTagYmdSetting('prodResultInqProdYmd', true);

    	//검색
    	$("#prodResultInqSearchBtn").click(function(){
    		fnSearch();
    	});

    	//엑셀버튼
    	$("#prodResultInqExcelBtn").click(function(){
    	    var selectRow = $prodResultInqDGrid.getGridParam('selrow');
    	    if(selectRow != null){
    	    	$prodResultInqDGrid.downloadExcelAllItems();
    	    }else{
    	    	$prodResultInqHGrid.downloadExcelAllItems();
    	    }
    	});

    	//생산부서-생산라인 이벤트
    	$('#prodResultInqProdDept').change(function(){
    		$('#prodResultInqProdLine').empty().append('<option></option>');
    		WMSUtil.fnCombo.prodLine('prodResultInqProdLine', 'PROD_LINE_CD', $(this).val());
    	});

    	//고객사 세팅
    	$('#prodResultInqClientCd').val(clientCd);

    	//제품코드 팝업
    	$('#prodResultInqItemPopup').click(function(){
    		WMSUtil.popup.item('prodResultInqItem', false, 'prodResultInqClient');
    	})

        //그리드 전체 접기
        $('#prodResultInqAllFoldBtn').click(function(){
    		expanded = false;
    		fnSearch();
        });
        //그리드 전체 펼치기
        $('#prodResultInqAllUnfoldBtn').click(function(){
    		expanded = true;
    		fnSearch();
        });
    }

    function sendData(){
    	return {
			ymdFr 		: WMSUtil.fnDateSetting.yyyymmdd($('#prodResultInqProdYmdFr').val()),
			prodDeptCd	: $('#prodResultInqProdDept').val(),
			prodLineCd	: $('#prodResultInqProdLine').val(),
			prodGrpCd	: $('#prodResultInqProdGrp').val(),
			prodCategory: $('#prodResultInqCategory').val(),
			prodBrand	: $('#prodResultInqBrand').val(),
			prodSku		: $('#prodResultInqSku').val(),
			itemCd		: $('#prodResultInqItemCd').val(),
			expanded	: expanded
    	};
    }

    function sendDataD(){
    	return {
    		prodDeptCd : prodDeptCdD,
    		prodInstYmd : prodInstYmdD,
    		prodLineCd : prodLineCdD,
    		prodGrpCd : prodGrpCdD,
    		itemCd : itemCdD
    	};
    }



    //[Fn] 검색 조건 매핑
    function fnSearch(){
    	$prodResultInqHGrid.paragonGridSearch(sendData());
    }

    function fnListH(){
    	$prodResultInqHGrid.paragonGrid({
        	url				: '/ctrl/inbound/productResultInquiry/listProdResultInqH',
			countable       : false,
			pageable        : false,
			sortable        : false,
			rowEditable     : false,
			height			: '500',
			postData		: sendData(),
            rowNum			: 500, //WMS 100
//            rowList: [100, 200, 300, 500], //[100, 200, 300, 500]
            colModel:[
//                      {editable: false, name:'PROD_LINE', 				width:"150px", align:"left"},
                      {editable: false, name:'ITEM_CD', 				width:"150px", align:"left"},
                      {editable: false, name:'PROD_DEPT_NM',			width:"100px", align:"center", hidden:true, excel:true},
                      {editable: false, name:'PROD_LINE_NM',			width:"100px", align:"center", hidden:true, excel:true},
                      {editable: false, name:'PROD_LINE_CD',           width:"100px", align:"center", hidden:true, excel:false},
                      {editable: false, name:'BRAND_NM',				width:"100px", align:"center", hidden:true, excel:true},
                      {editable: false, name:'SKU_NM',					width:"100px", align:"center", hidden:true, excel:true},
                      {editable: false, name:'ITEM',					width:"100px", align:"center", hidden:true, excel:true},
                      {editable: false, name:'ITEM_NM', 				width:"150px", align:"left", excel:true},
                      {editable: false, name:'PROD_GRP',				width:"100px", align:"center", excel:true,
                    	  edittype:'selectText', formatter:'selectText', editoptions: { value:gridProdGrp }},
                      {editable: false, name:'PROD_PLAN_PLT_QTY',		width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'PROD_PLAN_BOX_QTY',		width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'PROD_PLT_QTY',			width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'PROD_BOX_QTY',			width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true},
                      {editable: false, name:'DIFFR_PLT_QTY',			width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true,
                    	  cellattr: function(rowId, tv, rowObject, cm, rdata) {
                    		  var value = WMSUtil.grid.fomatter.integerNotComma(tv);
                    		  if(value < 0){
                    			  return 'style="color:#ff0000;"' //RED
                    		  }
                    	  }
                      },
                      {editable: false, name:'DIFFR_BOX_QTY',			width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel:true,
                    	  cellattr: function(rowId, tv, rowObject, cm, rdata) {
                    		  var value = WMSUtil.grid.fomatter.integerNotComma(tv);
                    		  if(value < 0){
                    			  return 'style="color:#ff0000;"' //RED
                    		  }
                    	  }
                      },
                      {editable: false, name:'MENU_SEQ',				width:"100px", align:"center",hidden:true,	key:true},
                      {editable: false, name:"MENU_PARENT_SEQ", 		width:"100px", align:"center",hidden:true},
                      {editable: false, name:'LEV', 					width:"50px",  align:"center", hidden:true},
                      {editable: false, name:'MENU_ORDER', 				width:"50px",  align:"center", hidden:true},
                      {editable: false, name:'UI_ICON', 				width:"50px",  align:"center", hidden:true},
                      {editable: false, name:'EXPANDED', 				width:"50px",  align:"center", hidden:true},
                      {editable: false, name:'PLANT_CD',				width:"100px", align:"center", hidden:true},
                      {editable: false, name:'ITEM_CD_ORIGINAL',		width:"100px", align:"center", hidden:true},
                      {editable: false, name:'PROD_LINE',				width:"100px", align:"center", hidden:true},
                      {editable: false, name:'ITEM_NM',					width:"200px", align:"center", hidden:true},
                      {editable: false, name:'PROD_YMD',				width:"100px", align:"center", hidden:true},
                      {editable: false, name:'SHIFT_GROUP_CD',			width:"100px", align:"center", hidden:true},
                      {editable: false, name:'PROD_PLAN_YMD',			width:"100px", align:"center", hidden:true},
                      {editable: false, name:'PROD_GRP_CD',				width:"100px", align:"center", hidden:true},
                      {editable: false, name:'LAST_DATA',				width:"100px", align:"center", hidden:true}

            ],
            pager			: "#prodResultInqHGridNavi",
            domainId		: "IB_PROD_RESULT_LIST",
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
        		expanded_field	: "EXPANDED",
        		loaded			: false,
        		icon_field		: "UI_ICON"
            },
            footerrow		: true,
            userDataOnFooter: true,
            loadComplete	: function() {
            	 //그리드 아래 부분 합계
            	var $footRow = $prodResultInqHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['ITEM_CD','ITEM_NM'];
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'HGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'HGrid_PROD_GRP"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;
            	}

            },
            gridComplete	: function(){
            	//그리드 조회 후 첫번째 행 선택
                var ids = $prodResultInqHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
        			if(!expanded){
        				$('#prodResultInqAllUnfoldBtn').css('display', 'block');
        				$('#prodResultInqAllFoldBtn').css('display', 'none');
        			}else{
        				$('#prodResultInqAllUnfoldBtn').css('display', 'none');
        				$('#prodResultInqAllFoldBtn').css('display', 'block');
        			}

                }else{
                	$prodResultInqDGrid.jqGrid('clearGridData');
                }


            	//총합계
            	fnTotalHSum($prodResultInqHGrid);
            },
            groupHeaders	:
            				[{
    				 			rowspan : true,
				 				header:[
			 				        {start: 'PROD_PLAN_PLT_QTY', 	length: 2 , domain:"PROD_PLAN_QTY"	},
		 				        	{start: 'PROD_PLT_QTY', 		length: 2 , domain:"PROD_QTY" 		},
	 				        		{start: 'DIFFR_PLT_QTY', 		length: 2 , domain:"DIFFR_QTY", 	formatter:"integer"},
	 				        	]
    				 		}],
    		onSelectRowEvent: function(currRowData, prevRowData){

    			//DB내 제품코드 항목인 것만 확인하여 Y를 보냄. Y를 가지고 Detail 그리드를 조회 할지 여부 선택
    			if(currRowData.UI_ICON == 'ui-icon-bullet'){
    				prodDeptCdD = currRowData.PROD_DEPT_CD;
    				prodInstYmdD = currRowData.PROD_PLAN_YMD;
    				prodLineCdD = currRowData.PROD_LINE_CD;
    				prodGrpCdD = currRowData.PROD_GRP_CD;
    				itemCdD = currRowData.ITEM_CD;

    				$prodResultInqDGrid.paragonGridSearch({
        				prodDeptCd		: currRowData.PROD_DEPT_CD,
        				prodInstYmd		: currRowData.PROD_PLAN_YMD,
        				prodLineCd		: currRowData.PROD_LINE_CD,
        				prodGrpCd		: currRowData.PROD_GRP_CD,
        				itemCd			: currRowData.ITEM_CD
    				});
    			}else{

    			}
    		}
        });
	}

    //전체 실적 합계 조회
    function fnTotalHSum($grid){
        $.ajax({
            url 		: "ctrl/inbound/productResultInquiry/listProdResultInqHSum",
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

                	$grid.jqGrid('footerData','set', { PROD_PLAN_PLT_QTY 		: rowData.PROD_PLAN_PLT_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { PROD_PLAN_BOX_QTY 		: rowData.PROD_PLAN_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { PROD_PLT_QTY 		: rowData.PROD_PLT_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { PROD_BOX_QTY 				: rowData.PROD_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { DIFFR_PLT_QTY 			: rowData.DIFFR_PLT_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { DIFFR_BOX_QTY 			: rowData.DIFFR_BOX_QTY.toFixed(2) });


                }
            }
        });
    }

    function fnListD(){
    	$prodResultInqDGrid.paragonGrid({
        	url				: '/ctrl/inbound/productResultInquiry/listProdResultInqD',
			countable       : false,
			pageable        : false,
			sortable        : false,
			rowEditable     : false,
			firstData		: false,
			rowNum			: 500,
			rownumbers		: true,
			height			: '500',
            colModel:[
                      {editable: false, name:'LOT_ATTR3',		width:"80px", align:"center", excel : true},
                      {editable: false, name:'PLT_ID',			width:"100px", align:"center", excel : true},
                      {editable: false, name:'QTY',				width:"100px", align:"right", formatter:"integer", excelDataType :"integer", excel : true}

            ],
//            pager			: "#prodResultInqDGridNavi",
            domainId		: "IB_PROD_RESULT_PLT_LIST",
            footerrow		: true,
            userDataOnFooter: true,
            loadComplete	: function(){
            	$("th[id^=prodResultInqDGrid]").css ("height", 70);
            	//그리드 아래 부분 합계
            	var $footRow = $prodResultInqDGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['LOT_ATTR3'];
            	if(firstLoadD){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'DGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'DGrid_PLT_ID"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoadD = false;
            	}
            },
            gridComplete	: function(){




            	//총합계
            	fnTotalDSum($prodResultInqDGrid);
           }
        });
	}

  //전체 파렛트 합계 조회
    function fnTotalDSum($grid){
        $.ajax({
            url 		: "ctrl/inbound/productResultInquiry/listProdResultInqDSum",
            data 		: JSON.stringify(sendDataD()),
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
                	$grid.jqGrid('footerData','set', { QTY 		: rowData.QTY.toFixed(2) });

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
    ProdResultInqApp.init();
});

