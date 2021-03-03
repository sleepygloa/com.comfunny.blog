/** Copyright (c) 2017 VertexID RND, Inc.
 *
 * Application Name : 판매처별 출고조회[ObStoreOutboundInquiryApp]
 * Program Code     : PWMOB111Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * 이지만          	2017. 06. 22.       First  Draft.
 * 이지만          	2017. 06. 22.       Second Draft.
 */

var ObStoreOutboundInquiryApp = function() {
    "use strict";
    /***************************************************************************
     * 전역 객체 선언부 (return 상위부분에 선언해야함)
     **************************************************************************/

    var proCd = 'PWMOB111Q';
	var proNm = 'obStoreObInquiry';

    var $obStoreObInquiryDetailGrid = $("#obStoreObInquiryDetailGrid");
    var $callBackInput; //콜백함수 (자바스크립트의 순차적 실행 위함)

    var gridObProgStCdOptions; // 진행상태
    var gridObGbnCdOptions; // 출고구분
    var gridLocalExportGbnCdOptions; //내수수출구분

    var firstLoad = true;
    var expanded = false;

    return {
        init: function() {

            gridObGbnCdOptions 			= WMSUtil.fnCombo.grid_selectBox('obStoreObInquiryObGbnCd', 'OB_GBN_CD');
            gridObProgStCdOptions 		= WMSUtil.fnCombo.grid_selectBox('obStoreObInquiryObProgStCd', 'OB_PROG_ST_CD');
            gridLocalExportGbnCdOptions = WMSUtil.fnCombo.grid_selectBox('obStoreObInquiryLocalExportGbnCd', 'LOCAL_EXPORT_GBN_CD');

			WMSUtil.fnCombo.itemClassLarge('obStoreObInquiryCategory', 'obStoreObInquiryBrand', 'obStoreObInquirySku');

			fnEvents();
            fnList();

        },
        callBackInput : function() {
            return $callBackInput;
        }
    };

    function fnList() {
        $obStoreObInquiryDetailGrid.paragonGrid({
            url         : "/ctrl/outbound/storeOutboundInquiry/getStoreOutBoundInquiryList",
//            countable   : false,
            pageable    : false,
            sortable    : false,
            rowEditable : false,
            height      : '500',
            shrinkToFit : false,
            domainId    : "OB_STORE_LIST",
            postData    : sendData(),
            //pager     : "#obStoreObInquiryDetailGridNavi",
            colModel        : [
               {editable: false, name: 'ITEM_CD',         width: "250px",  align: "left"},

               {editable: false, name: 'STORE_NM',        width: "200px",  align: "center", hidden:true, excel:true},
               {editable: false, name: 'CATEGORY_NM',     width: "100px",  align: "center", hidden:true, excel:true},
               {editable: false, name: 'BRAND_NM',        width: "100px",  align: "center", hidden:true, excel:true},
               {editable: false, name: 'SKU_NM',          width: "100px",  align: "center", hidden:true, excel:true},
               {editable: false, name: 'ITEM',         	  width: "200px",  align: "center", hidden:true, excel:true},

               {editable: false, name: 'ITEM_NM',         width: "200px",  align: "left", excel:true},
               {editable: false, name: 'PKQTY',           width: "70px",  align: "center", formatter:"integer", excelDataType :"integer", excel:true},
               {editable: false, name: 'UOM',         	  width: "80px",  align: "center", excel:true},


               {editable: false, name: "PLAN_TOT_QTY",    width : "100px", align : "right" , formatter:"integer", excelDataType :"integer", excel:true}, // 출고예정총량
               {editable: false, name: "PLAN_BOX_QTY",    width : "100px", align : "right" , formatter:"integer", excelDataType :"integer", excel:true}, // 출고예정수량 박스
               {editable: false, name: "PLAN_EA_QTY",     width : "100px", align : "right" , formatter:"integer", excelDataType :"integer", excel:true}, // 출고예정수량 낱개
               {editable: false, name: "CONF_TOT_QTY",    width : "100px", align : "right" , formatter:"integer", excelDataType :"integer", excel:true}, // 출고확정총량
               {editable: false, name: "CONF_BOX_QTY",    width : "100px", align : "right" , formatter:"integer", excelDataType :"integer", excel:true}, // 출고확정수량 박스
               {editable: false, name: "CONF_EA_QTY",     width : "100px", align : "right" , formatter:"integer", excelDataType :"integer", excel:true}, // 출고확정수량 낱개
               {editable: false, name: "NDELIVERY_BOX_QTY", width : "100px", align : "right" , formatter:"integer", excelDataType :"integer", excel:true}, // 미배송수량 박스

               {editable: false, name: 'MENU_SEQ',        width: "100px",  align: "center",  hidden: true,    key:true},
               {editable: false, name: "MENU_PARENT_SEQ", width: "100px",  align: "center",  hidden: true},
               {editable: false, name: 'UI_ICON',         width: "100px",  align: "center",  hidden: true},
               {editable: false, name: 'LEV',             width: "100px",  align: "center",  hidden: true},
               {editable: false, name: 'MENU_ORDER',      width: "100px",  align: "center",  hidden: true},
               {editable: false, name: 'EXPANDED',        width: "100px",  align: "center",  hidden: true},
               {editable: false, name: "STORE_CD",        width: "100px",  align: "center",  hidden: true}, // 판매처
               {editable: false, name: "STORE_NM",        width: "200px",  align: "left"  ,  hidden: true}, // 판매처명
               {editable: false, name: "RSTORE_CD",       width: "100px",  align: "center",  hidden: true}, // 납품처
               {editable: false, name: "RSTORE_NM",       width: "200px",  align: "left"  ,  hidden: true}, // 납품처명
               {editable: false, name: "OB_NO",           width: "120px",  align: "center",  hidden: true}, //출고번호
               {editable: false, name: "SO_NO",           width: "120px",  align: "center",  hidden: true}, //주문번호
               {editable: false, name: "OB_GBN",          width: "150px",  align: "center", hidden: true,
                   edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObGbnCdOptions }
               }, //출고구분
               {editable : false, name : "OB_PROG_ST", width : "150px", align : "center", hidden: true,
                   edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObProgStCdOptions }
               }, //출고진행상태
               {editable: false, name: "PLAN_QTY",        width : "100px", align : "right",  hidden: true}, 	   // 출고예정총량
               {editable: false, name: "CONF_QTY",        width : "100px", align : "right" , hidden: true}, 	   // 출고확정총량
               {editable: false, name: "WEIGHT",          width : "100px", align : "right" , formatter:"integer",  hidden: true},
               {editable: false, name: "OB_YMD",          width : "100px", align : "center",  hidden: true}, //출고일자
               {editable: false, name: "CAR_NO",          width : "120px", align : "center",  hidden: true}, //차량번호
               {editable: false, name: "REMARK",          width : "300px", align : "left"  ,  hidden: true}  // 비고
            ],
            groupHeaders :
            [
                {
                rowspan : true,
                header : [
                           { start : 'PLAN_TOT_QTY', length : 3, domain : "OB_PLAN_QTY"},
                           { start : 'CONF_TOT_QTY', length : 3, domain : "CONF_QTY"}
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
        		var ids = $obStoreObInquiryDetailGrid.getDataIDs();
        		if(ids.length != 0){
        			if(!expanded){
        				$('#obStoreObInquiryAllUnfoldBtn').css('display', 'block');
        				$('#obStoreObInquiryAllFoldBtn').css('display', 'none');
        			}else{
        				$('#obStoreObInquiryAllUnfoldBtn').css('display', 'none');
        				$('#obStoreObInquiryAllFoldBtn').css('display', 'block');
        			}
        		}

        		//그리드 아래 부분 합계
            	var $footRow = $obStoreObInquiryDetailGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
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

            	//총합계
            	fnTotalSum($obStoreObInquiryDetailGrid);
           }

        });

    }

    //전체  합계 조회
    function fnTotalSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/storeOutboundInquiry/getStoreOutBoundInquiryListSum",
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

        WMSUtil.fnTagYmdSetting('obStoreObInquiryYmd', true, true);

        //코드 입력시 명 서치
        addClientCdChangeEvent("obStoreObInquiryClient", ["obStoreObInquiryStore", "obStoreObInquiryRStore"]); //고객사
        addCdChangeEvent("obStoreObInquiryClient", "obStoreObInquiryStore", "STORE");  //판매처
        addCdChangeEvent("obStoreObInquiryClient", "obStoreObInquiryRStore", "STORE"); //납품처

        // 검색 버튼 이벤트
        $("#obStoreObInquirySearchBtn").click(function() {
            fnSearch();
        });
        // Popup Event.
        $("#obStoreObInquiryClientPopup").click(function() {
            WMSUtil.popup.client('obStoreObInquiryClient');
        });
        // 판매처 btn Event
        $("#obStoreObInquiryStorePopup").click(function() {
            WMSUtil.popup.store('obStoreObInquiryStore');
        });
        // 납품처 btn Event
        $("#obStoreObInquiryRStorePopup").click(function() {
            WMSUtil.popup.rstore('obStoreObInquiryRStore');
        });
        // 고객사명 이벤트
        $("#obStoreObInquiryClientNm").attr("disabled", true);

        //엑셀 btn Event
        $("#obStoreObInquiryExcelBtn").click(function() {
            $obStoreObInquiryDetailGrid.downloadExcelAllItems();
        });

        //그리드 전체 접기
        $('#obStoreObInquiryAllFoldBtn').click(function(){
    		expanded = false;
    		fnSearch();
        });
        //그리드 전체 펼치기
        $('#obStoreObInquiryAllUnfoldBtn').click(function(){
    		expanded = true;
    		fnSearch();
        });
    }

    // 검색 버튼 이벤트
    function fnSearch() {

        if($("#obStoreObInquiryClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obStoreObInquiryClientCd").focus();
            return false;
        }else if($("#obStoreObInquiryClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obStoreObInquiryClientCd").focus();
            return false;
        }

        if($("#obStoreObInquiryYmdFr").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obStoreObInquiryYmdFr").focus();
            return false;
        }else if($("#obStoreObInquiryYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obStoreObInquiryYmdFr").focus();
            return false;
        }

        if($("#obStoreObInquiryYmdTo").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obStoreObInquiryYmdTo").focus();
            return false;
        }else if($("#obStoreObInquiryYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obStoreObInquiryYmdTo").focus();
            return false;
        }

        $obStoreObInquiryDetailGrid.paragonGridSearch(sendData());

    }

    //데이터
    function sendData(){
    	return {
            clientCd        : $("#obStoreObInquiryClientCd").val(),
            storeCd         : $("#obStoreObInquiryStoreCd").val(),
            obGbnCd         : $("#obStoreObInquiryObGbnCd").val(),
            carNo           : $("#obStoreObInquiryCarNo").val(),
            rstoreCd        : $("#obStoreObInquiryRStoreCd").val(),
            deliveryDgr     : $("#obStoreObInquiryDeliveryDgr").val(),
            largeClassCd    : $('#obStoreObInquiryCategory').val(),
            middleClassCd   : $('#obStoreObInquiryBrand').val(),
            smallClassCd    : $('#obStoreObInquirySku').val(),
            localExportGbn  : $('#obStoreObInquiryLocalExportGbnCd').val(),
            obYmdFr         : WMSUtil.fnDateSetting.yyyymmdd($("#obStoreObInquiryYmdFr").val()),
            obYmdTo         : WMSUtil.fnDateSetting.yyyymmdd($("#obStoreObInquiryYmdTo").val()),
            expanded		: expanded
    	}
    }

    //그리드 수정여부 최종확인
    function fnModCheck() {
        return $obStoreObInquiryDetailGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
        }

    //그리드 새로고침
    function fnReloadGrid() {
        $obStoreObInquiryDetailGrid.paragonGridReload();
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
    ObStoreOutboundInquiryApp.init();
});
