/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고파렛트내역 조회[obPalletHistoryInqApp]
 * Program Code     : PWMOB119Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Hong Jeong Bo    2019 .05 .07        First Drawing
 */

var obPalletHistoryInqApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB119Q';
	var proNm = 'obPalletHistoryInq';

	//그리드
    var $obPalletHistoryInqHGrid = $("#obPalletHistoryInqHGrid");

    var firstLoad = true;

    var gridObProgStCd;
    var gridObGbnCd;

    var $callBackInput;

    return {
        init: function() {

            gridObGbnCd 		= WMSUtil.fnCombo.grid('OB_GBN_CD');

            gridObProgStCd		= WMSUtil.fnCombo.grid('OB_PROG_ST_CD');

            fnEvents();

            fnList();
        },
        callBackInput: function() {
            return $callBackInput;
        }
    };


    //이벤트
    function fnEvents() {

    	WMSUtil.fnCombo.itemClassLarge(proNm + 'LargeClassCd', proNm + 'MiddleClassCd', proNm + 'SmallClassCd');

    	WMSUtil.fnCombo.grid_selectBox('obPalletHistoryInqObGbnCd', 'OB_GBN_CD');

    	//출고예정일자
    	WMSUtil.fnTagYmdSetting(proNm+'ObPlanYmd', true, true);
    	//출고일자
    	WMSUtil.fnTagYmdSetting(proNm+'ObYmd', true, true);

    	//생산일자
    	WMSUtil.fnTagYmdSetting(proNm+'ProdYmd', false, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Item');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');
        // 판매처 btn Event
        $("#obPalletHistoryInqStorePopup").click(function() {
            WMSUtil.popup.store('obPalletHistoryInqStore', {clientCd :$('#obPalletHistoryInqClientCd').val()});
        });
        // 납품처 btn Event
        $("#obPalletHistoryInqRStorePopup").click(function() {
            WMSUtil.popup.rstore('obPalletHistoryInqRStore', {clientCd :$('#obPalletHistoryInqClientCd').val()});
        });
		// 제품 btn Event
        $("#obPalletHistoryInqItemPopup").click(function(){
        	WMSUtil.popup.item('obPalletHistoryInqItem', {clientCd :$('#obPalletHistoryInqClientCd').val()});
        });

        //조회 버튼 이벤트
        $("#obPalletHistoryInqSearchBtn").click(function() {
            fnSearch();
        });

        //엑셀 다운로드
        $("#obPalletHistoryInqExcelBtn").click(function() {
        	$obPalletHistoryInqHGrid.downloadExcelAllItems();
        });

    }

    //데이터
    function sendData(){

    	return {
    		dcCd		: $('#mainDcCd option:selected').val(),
        	clientCd    : $("#obPalletHistoryInqClientCd").val(),
    		obYmdFr    	: WMSUtil.fnDateSetting.yyyymmdd($("#obPalletHistoryInqObYmdFr").val()),
    		obYmdTo     : WMSUtil.fnDateSetting.yyyymmdd($("#obPalletHistoryInqObYmdTo").val()),
    		obNo		: $('#obPalletHistoryInqObNo').val(),
    		storeCd		: $('#obPalletHistoryInqStoreCd').val(),
    		carNo		: $('#obPalletHistoryInqCarNo').val(),
        	obGbnCd		: $('#obPalletHistoryInqObGbnCd option:selected').val(),
        	rStoreCd	: $('#obPalletHistoryInqRStoreCd').val(),
        	soNo 		: $('#obPalletHistoryInqSoNo').val(),
        	pltId 		: $('#obPalletHistoryInqPltId').val(),
        	itemCd		: $('#obPalletHistoryInqItemCd').val(),
	        largeClassCd    : $('#obPalletHistoryInqLargeClassCd option:selected').val(),
	        middleClassCd   : $('#obPalletHistoryInqMiddleClassCd option:selected').val(),
	        smallClassCd    : $('#obPalletHistoryInqSmallClassCd option:selected').val(),
	        prodYmdFr		: WMSUtil.fnDateSetting.yyyymmdd($("#obPalletHistoryInqProdYmdFr").val()),
	        prodYmdTo		: WMSUtil.fnDateSetting.yyyymmdd($("#obPalletHistoryInqProdYmdTo").val())
    	}
    }

    //그리드 조회
    function fnList() {
        $obPalletHistoryInqHGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundPalletHistoryInquiry/listObPltInqH",
            sortable		: true,
            rownumbers		: true,
            height			: '445',
            shrinkToFit		: false,
            domainId		: "OB_PLT_LIST",
//            rowClickFocus	: true,
            postData		: sendData(),
            colModel: [
                { editable: false, name: "CLIENT_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OB_PROG_ST", 			width: "120px", align: "center", excel:true},
                { editable: false, name: "OB_GBN",    			width: "100px", align: "center", excel:true},
                { editable: false, name: "OB_YMD",				width: "100px", align: "center", excel:true},
                { editable: false, name: "OB_NO", 				width: "100px", align: "center", excel:true},

                { editable: false, name: "SO_YMD", 				width: "100px", align: "center", excel:true},
                { editable: false, name: "SO_NO", 				width: "100px", align: "center", excel:true},
                { editable: false, name: "STORE", 				width: "210px", align: "left"  , excel:true},
                { editable: false, name: "RSTORE", 				width: "210px", align: "left"  , excel:true},
                { editable: false, name: "CAR_NO", 				width: "100px", align: "center", excel:true},

                { editable: false, name: "ITEM_CD", 			width: "100px", align: "center", excel:true},
                { editable: false, name: "ITEM_NM", 			width: "200px", align: "left"  , excel:true},
                { editable: false, name: "PICK_QTY", 			width: "100px", align: "right",	formatter:"integer",  excelDataType :"integer", excel:true},
                { editable: false, name: "PLT_ID", 				width: "100px", align: "center", excel:true},
                { editable: false, name: "LOT_ID", 				width: "100px", align: "center", excel:true},
                { editable: false, name: "MAKE_YMD",			width: "100px", align: "center"},

                { editable: false, name: "MAKE_LOT",			width: "100px", align: "center", excel:true},
                { editable: false, name: "DIST_EXPIRY_YMD",		width: "100px", align: "center", excel:true},
                { editable: false, name: "LOT_ATTR1",			width: "100px", align: "center", excel:true},
                { editable: false, name: "LOT_ATTR2",			width: "100px", align: "center", excel:true},
                { editable: false, name: "LOT_ATTR3",			width: "100px", align: "center", excel:true},
                { editable: false, name: "LOT_ATTR4",			width: "100px", align: "center", excel:true},
                { editable: false, name: "LOT_ATTR5",			width: "100px", align: "center", excel:true},

            ],
            pager		: "#obPalletHistoryInqHGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function() {

                //그리드 아래 부분 합계
            	var $footRow = $obPalletHistoryInqHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");

            	var colArr = ['OB_PROG_ST', 'OB_GBN', 'OB_YMD', 'OB_NO', 'SO_YMD', 'SO_NO', 'STORE', 'RSTORE', 'CAR_NO', 'ITEM_CD', 'ITEM_NM'];
                //페이지 첫 로딩시 상세그리드를 초기화, 2번째부터는 조회만.
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'HGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'HGrid_ITEM_NM"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

                    firstLoad = false;
                }

            	//총합계
            	fnTotalHSum($obPalletHistoryInqHGrid);
            },

        });
    }

    //전체  헤더 합계 조회
    function fnTotalHSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/outboundPalletHistoryInquiry/listObPltInqHSum",
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

                	$grid.jqGrid('footerData','set', { PICK_QTY 		: rowData.PICK_QTY.toFixed(2) });

                }
            }
        });
    }


    //그리드 조회
    function fnSearch() {
        if($("#obPalletHistoryInqClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obPalletHistoryInqClientCd").focus();
            return false;
        }else if($("#obPalletHistoryInqClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obPalletHistoryInqClientCd").focus();
            return false;
        }
        if($("#obPalletHistoryInqObYmdFr").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obPalletHistoryInqObYmdFr").focus();
            return false;
        }
        if($("#obPalletHistoryInqObYmdTo").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obPalletHistoryInqObYmdTo").focus();
            return false;
        }
        $obPalletHistoryInqHGrid.paragonGridSearch(sendData());
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
    obPalletHistoryInqApp.init();
});
