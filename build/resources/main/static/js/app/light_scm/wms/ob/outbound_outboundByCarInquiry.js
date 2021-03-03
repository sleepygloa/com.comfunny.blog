/** Copyright (c) 2017 VertexID RND, Inc.
 *
 * Application Name : 제품별 출고조회[obByCarInquiryApp]
 * Program Code     : PWMOB112Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * 이지만 	        2017. 06. 22. 	    First Draft.
 */

var ObByCarInquiryApp = function() {
	"use strict";
	/***************************************************************************
	 * 전역 객체 선언부 (return 상위부분에 선언해야함)
	 **************************************************************************/
	var proCd = 'PWMOB115Q';

	var proNm = 'obByCarInquiry';
	var $obByCarInquiryGrid = $("#obByCarInquiryGrid");

	var $callBackInput; 	//콜백함수 (자바스크립트의 순차적 실행 위함)
	var gridObGbnCdOptions; // 출고구분

    var firstLoad = true;
    var expanded = false;


	return {
		init: function() {

			gridObGbnCdOptions = WMSUtil.fnCombo.grid_selectBox('obByCarInquiryObGbnCd', 'OB_GBN_CD');

			fnEvents();
			fnList();
		},
		callBackInput : function() {
			return $callBackInput;
		}
	};

	function sendData(){
		return {
			carNo 		: $("#obByCarInquiryCarNo").val(),
			storeCd		: $("#obByCarInquiryStoreCd").val(),
			rstoreCd	: $("#obByCarInquiryRStoreCd").val(),
			obGbnCd 	: $("#obByCarInquiryObGbnCd option:selected").val(),
			obYmdFr		: WMSUtil.fnDateSetting.yyyymmdd($('#obByCarInquiryYmdFr').val()),
			obYmdTo		: WMSUtil.fnDateSetting.yyyymmdd($('#obByCarInquiryYmdTo').val()),
			expanded	: expanded
		}
	}

	function fnList() {
		$obByCarInquiryGrid.paragonGrid({
            url         : "/ctrl/outbound/outboundByCarInquiry/getOutboundByCarHList",
            countable   : false,
            pageable    : false,
            sortable    : false,
            rowEditable : false,
            shrinkToFit : false,
			height 		: "535",
			domainId	: "OB_LIST",
			postData	: sendData(),
            colModel:[
              {editable: false, name:'MENU_SEQ',            width:"100px", align:"center",  hidden:true,    key:true},
              {editable: false, name:"MENU_PARENT_SEQ",     width:"100px", align:"center",  hidden:true},
              {editable: false, name:'UI_ICON',             width:"50px",  align:"center",  hidden: true},
              {editable: false, name:'LEV',                 width:"50px",  align:"center",  hidden: true},
              {editable: false, name:'MENU_ORDER',          width:"50px",  align:"center",  hidden: true},
              {editable: false, name:'EXPANDED',        	width:"50px",  align:"center",  hidden: true},
              {editable: false, name:'STORE',      			width:"100px", align:"center",  hidden:true},

              {editable: false, name:'ITEM_CD',    			width:"250px", align:"left"	},

              {editable: false, name:'CAR_NO',      		width:"100px", align:"center",  hidden:true, excel: true},
              {editable: false, name:'STORE_NM',      		width:"100px", align:"center",  hidden:true, excel: true},
              {editable: false, name:'CATEGORY_NM',    		width:"100px", align:"center",  hidden:true, excel: true},
              {editable: false, name:'BRAND_NM',      		width:"100px", align:"center",  hidden:true, excel: true},
              {editable: false, name:'SKU_NM',      		width:"100px", align:"center",  hidden:true, excel: true},
              {editable: false, name:'ITEM',      			width:"100px", align:"center",  hidden:true, excel: true},

              {editable: false, name:'ITEM_NM',    			width:"200px", align:"center",  excel:true},
              {editable: false, name:'OB_TOT_QTY', 			width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
              {editable: false, name:'OB_BOX_QTY', 			width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
              {editable: false, name:'OB_EA_QTY',  			width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
              {editable: false, name:'NDELIVERY_BOX_QTY',  	width:"100px", align:"right",   formatter:"integer", excelDataType :"integer", excel:true},
              {editable: false, name:'OB_NO',      			width:"120px", align:"center",  excel:true},
              {editable: false, name:'OB_YMD',     			width:"120px", align:"center",  excel:true},
              {editable: false, name:'SO_NO',      			width:"120px", align:"center",  excel:true},
              {editable: false, name:'SO_YMD',     			width:"120px", align:"center",  excel:true},
              {editable: false, name:'RSTORE',    			width:"120px", align:"center",  excel:true},
              {editable: false, name:'RSTORE_NM',  			width:"300px", align:"left"  ,  excel:true},
            ],
			//pager 		: "#obByCarInquiryGridNavi",
			groupHeaders :
			[
			  {
				rowspan : true,
				header : [
				           { start : 'OB_TOT_QTY', length : 3, domain : "OB_QTY"},

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
	                expanded_field  : "EXPANDED",
	                loaded          : false,
	                icon_field      : "UI_ICON"
	        },
	        footerrow		: true,
            userDataOnFooter: true,
            gridComplete    : function(){
        		var ids = $obByCarInquiryGrid.getDataIDs();
        		if(ids.length != 0){
        			if(!expanded){
        				$('#obByCarInquiryAllUnfoldBtn').css('display', 'block');
        				$('#obByCarInquiryAllFoldBtn').css('display', 'none');
        			}else{
        				$('#obByCarInquiryAllUnfoldBtn').css('display', 'none');
        				$('#obByCarInquiryAllFoldBtn').css('display', 'block');
        			}
        		}
        		var colArr = ['ITEM_CD'];
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'Grid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'Grid_ITEM_NM"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;
            	}
            	fnTotalSum($obByCarInquiryGrid);
            }




		});
	}

	//전체  합계 조회
    function fnTotalSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/outboundByCarInquiry/getOutboundByCarHListSum",
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

                	$grid.jqGrid('footerData','set', { OB_TOT_QTY 		: rowData.OB_TOT_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { OB_BOX_QTY 		: rowData.OB_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { OB_EA_QTY 		: rowData.OB_EA_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { NDELIVERY_BOX_QTY: rowData.NDELIVERY_BOX_QTY.toFixed(2) });

                }
            }
        });
    }


	function fnEvents() {

		//출고일자 날짜 초기화
		WMSUtil.fnTagYmdSetting('obByCarInquiryYmd', true, true);

        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

	    //코드 입력시 명 서치
/*        addClientCdChangeEvent("obByCarInquiryClient", ["obByCarInquiryStore", "obByCarInquiryRStore"]); //고객사
        addCdChangeEvent("obByCarInquiryClient", "obByCarInquiryStore", "STORE");  //판매처
        addCdChangeEvent("obByCarInquiryClient", "obByCarInquiryRStore", "STORE"); //납품처
*/
		$("#obByCarInquirySearchBtn").click(function() {
			fnSearch();
		});

		$("#obByCarInquiryStorePopup").click(function() {
			WMSUtil.popup.store('obByCarInquiryStore');
		});

		$("#obByCarInquiryRStorePopup").click(function() {
			WMSUtil.popup.rstore('obByCarInquiryRStore');
		});

		$("#obByCarInquiryExcelBtn").click(function(){
			$obByCarInquiryGrid.downloadExcelAllItems();
		});

        //그리드 전체 접기
        $('#obByCarInquiryAllFoldBtn').click(function(){
    		expanded = false;
    		fnSearch();
        });
        //그리드 전체 펼치기
        $('#obByCarInquiryAllUnfoldBtn').click(function(){
    		expanded = true;
    		fnSearch();
        });

	}

	// 검색 버튼 이벤트
	function fnSearch() {

/*	    if($("#obByCarInquiryClientCd").val().length == 0){//고객사
	        Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obByCarInquiryClientCd").focus();
            return false;
        }else if($("#obByCarInquiryClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obByCarInquiryClientCd").focus();
            return false;
        }*/

        if($("#obByCarInquiryYmdFr").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obByCarInquiryYmdFr").focus();
            return false;
        }else if($("#obByCarInquiryYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obByCarInquiryYmdFr").focus();
            return false;
        }

        if($("#obByCarInquiryYmdTo").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obByCarInquiryYmdTo").focus();
            return false;
        }else if($("#obByCarInquiryYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obByCarInquiryYmdTo").focus();
            return false;
        }

		$obByCarInquiryGrid.paragonGridSearch(sendData());
	}


}();


/********************************************************************
 * bootstrap-datepicker 달력오픈 중, 탭 이동시 달력 hide
 * Tab-menu 종료시 마우스 클릭 인식 안되, datepicker(hide) 가 안되던 현상 수정
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
	ObByCarInquiryApp.init();
});