/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고오더대비실적 조회[ObProfitToOrderInqApp]
 * Program Code     : PWMOB118Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Hong Jeong Bo    2019 .05 .02        First Drawing
 */

var obProfitToOrderInqApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB118Q';
	var proNm = 'obProfitToOrderInq';

	//그리드
    var $obProfitToOrderInqHGrid = $("#obProfitToOrderInqHGrid");

    var firstLoad = true;
    var radioGbn  = '1'; // Radio: '1' -> 출고예정일자, '2' -> 출고일자

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

    	$("#obProfitToOrderInqObYmdRadio").click(function() {
    		radioGbn = $("#obProfitToOrderInqObYmdRadio").val();
    	});

    	$("#obProfitToOrderInqObPlanYmdRadio").click(function() {
    		radioGbn = $("#obProfitToOrderInqObPlanYmdRadio").val();
    	});

    	WMSUtil.fnCombo.grid_selectBox('obProfitToOrderInqObGbnCd', 'OB_GBN_CD');

    	//출고예정일자
    	WMSUtil.fnTagYmdSetting(proNm+'ObPlanYmd', true, true);
    	//출고일자
    	WMSUtil.fnTagYmdSetting(proNm+'ObYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Item');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

//        addCdChangeEvent("obProfitToOrderInqClient", "obProfitToOrderInqStore", "STORE");  //판매처
//        addCdChangeEvent("obProfitToOrderInqClient", "obProfitToOrderInqRStore", "STORE"); //납품처
//        addCdChangeEvent("obProfitToOrderInqClient", "obProfitToOrderInqItem", "ITEM"); //납품처
        // 판매처 btn Event
        $("#obProfitToOrderInqStorePopup").click(function() {
            WMSUtil.popup.store('obProfitToOrderInqStore', {clientCd	: $('#obProfitToOrderInqClientCd').val()});
        });
        // 납품처 btn Event
        $("#obProfitToOrderInqRStorePopup").click(function() {
            WMSUtil.popup.rstore('obProfitToOrderInqRStore', {clientCd	: $('#obProfitToOrderInqClientCd').val()});
        });
		// 제품 btn Event
        $("#obProfitToOrderInqItemPopup").click(function(){
        	WMSUtil.popup.item('obProfitToOrderInqItem', {clientCd	: $('#obProfitToOrderInqClientCd').val()});
        });

        //조회 버튼 이벤트
        $("#obProfitToOrderInqSearchBtn").click(function() {
            fnSearch();
        });

        //엑셀 다운로드
        $("#obProfitToOrderInqExcelBtn").click(function() {
        	$obProfitToOrderInqHGrid.downloadExcelAllItems();
        });

    }

    //데이터
    function sendData(){

    	var obYmdFr;
    	var obYmdTo;
    	var obYmdPlanFr;
    	var obYmdPlanTo;

    	//출고예정일자-출고일자 선택
    	if(radioGbn == 1){
    		obYmdFr 	= null
    		obYmdTo 	= null
        	obYmdPlanFr = WMSUtil.fnDateSetting.yyyymmdd($("#obProfitToOrderInqObPlanYmdFr").val())
        	obYmdPlanTo = WMSUtil.fnDateSetting.yyyymmdd($("#obProfitToOrderInqObPlanYmdTo").val())
    	}else if(radioGbn == 2){
    		obYmdFr    	= WMSUtil.fnDateSetting.yyyymmdd($("#obProfitToOrderInqObYmdFr").val())
    		obYmdTo     = WMSUtil.fnDateSetting.yyyymmdd($("#obProfitToOrderInqObYmdTo").val())
        	obYmdPlanFr = null
        	obYmdPlanTo = null
    	}

    	return {
    		dcCd		: $('#mainDcCd option:selected').val(),
        	clientCd    : $("#obProfitToOrderInqClientCd").val(),
        	obYmdFr    	: obYmdFr,
        	obYmdTo     : obYmdTo,
        	obYmdPlanFr : obYmdPlanFr,
        	obYmdPlanTo : obYmdPlanTo,
        	obGbnCd		: $('#obProfitToOrderInqObGbnCd option:selected').val(),
        	storeCd		: $('#obProfitToOrderInqStoreCd').val(),
        	carNo		: $('#obProfitToOrderInqCarNo').val(),
        	itemCd		: $('#obProfitToOrderInqItemCd').val(),
        	rStoreCd	: $('#obProfitToOrderInqRStoreCd').val(),
        	soNo 		: $('#obProfitToOrderInqSoNo').val(),
        	obNo		: $('#obProfitToOrderInqObNo').val(),
    	}
    }

    //그리드 조회
    function fnList() {
        $obProfitToOrderInqHGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundProfitToOrderInquiry/listObInqH",
            sortable		: true,
            rownumbers		: true,
            height			: '500',
            shrinkToFit		: false,
            domainId		: "OB_LIST",
//            rowClickFocus	: true,
            postData		: sendData(),
            colModel: [
                { editable: false, name: "CLIENT_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "SO_YMD", 				width: "100px", align: "center", excel:true},
                { editable: false, name: "OB_YMD",				width: "100px", align: "center", excel:true},
                { editable: false, name: "SO_NO", 				width: "100px", align: "center", excel:true},
                { editable: false, name: "OB_NO", 				width: "100px", align: "center", excel:true},
                { editable: false, name: "OB_PROG_ST_CD",		width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OB_PROG_ST", 			width: "120px", align: "center", excel:true},
                { editable: false, name: "OB_GBN_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OB_GBN",    			width: "100px", align: "center", excel:true},
                { editable: false, name: "STORE_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "STORE", 				width: "210px", align: "left", excel:true},
                { editable: false, name: "RSTORE_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "RSTORE", 				width: "210px", align: "left", excel:true},
                { editable: false, name: "CAR_NO", 				width: "100px", align: "center", excel:true},

                { editable: false, name: "PROMOTION_GBN", 		width: "50px", align: "center", excel:true},
                { editable: false, name: "ITEM_CD", 			width: "100px", align: "center", excel:true},
                { editable: false, name: "ITEM_NM", 			width: "220px", align: "left", excel:true},
                { editable: false, name: "PKQTY", 				width: "60px", align: "center",	formatter:"integer",  excelDataType :"integer", excel:true},
                { editable: false, name: "UOM", 				width: "100px", align: "center", excel:true},

                { editable: false, name: "SO_QTY", 				width: "100px", align: "right",	formatter:"integer",  excelDataType :"integer", excel:true},
                { editable: false, name: "INST_QTY", 			width: "100px", align: "right",	formatter:"integer",  excelDataType :"integer", excel:true},
                { editable: false, name: "PICK_QTY", 			width: "100px", align: "right",	formatter:"integer",  excelDataType :"integer", excel:true},
                { editable: false, name: "LOAD_QTY", 			width: "100px", align: "right",	formatter:"integer",  excelDataType :"integer", excel:true},
                { editable: false, name: "NDELIVERY_QTY", 		width: "100px", align: "right",	formatter:"integer",  excelDataType :"integer", excel:true},
            ],
            pager		: "#obProfitToOrderInqHGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function() {

                //그리드 아래 부분 합계
            	var $footRow = $obProfitToOrderInqHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");

            	var colArr = ['SO_YMD', 'OB_YMD', 'SO_NO', 'OB_NO', 'OB_PROG_ST', 'STORE', 'RSTORE', 'CAR_NO', 'PROMOTION_GBN', 'ITEM_CD', 'ITEM_NM', 'PKQTY', 'UOM'];
                //페이지 첫 로딩시 상세그리드를 초기화, 2번째부터는 조회만.
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'HGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'HGrid_UOM"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

                    firstLoad = false;
                }

            	//총합계
            	fnTotalHSum($obProfitToOrderInqHGrid);
            },

        });
    }

    //전체  헤더 합계 조회
    function fnTotalHSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/outboundProfitToOrderInquiry/listObInqHSum",
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

                	$grid.jqGrid('footerData','set', { SO_QTY 		: rowData.SO_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { INST_QTY 		: rowData.INST_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { PICK_QTY 		: rowData.PICK_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { LOAD_QTY    : rowData.LOAD_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { NDELIVERY_QTY    : rowData.NDELIVERY_QTY.toFixed(2) });
                }
            }
        });
    }


    //그리드 조회
    function fnSearch() {
        if($("#obProfitToOrderInqClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obProfitToOrderInqClientCd").focus();
            return false;
        }else if($("#obProfitToOrderInqClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obProfitToOrderInqClientCd").focus();
            return false;
        }
        if($("#obProfitToOrderInqObYmdFr").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obProfitToOrderInqObYmdFr").focus();
            return false;
        }
        if($("#obProfitToOrderInqObYmdTo").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obProfitToOrderInqObYmdTo").focus();
            return false;
        }
        $obProfitToOrderInqHGrid.paragonGridSearch(sendData());
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
    obProfitToOrderInqApp.init();
});
