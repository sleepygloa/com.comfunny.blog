/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고파렛트내역 조회[obCancelNotProDetailInqApp]
 * Program Code     : PWMOB120Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Hong Jeong Bo    2019 .05 .08        First Drawing
 */

var obCancelNotProDetailInqApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB120Q';
	var proNm = 'obCancelNotProDetailInq';

	//그리드
    var $obCancelNotProDetailInqHGrid = $("#obCancelNotProDetailInqHGrid");

    var firstLoad = true;

    var gridObProgStCd;
    var gridObGbnCd;

    var $callBackInput;

    return {
        init: function() {

            fnEvents();

            fnList();
        },
        callBackInput: function() {
            return $callBackInput;
        }
    };


    //이벤트
    function fnEvents() {

    	//출고일자
    	WMSUtil.fnTagYmdSetting(proNm+'ObYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Store');

        // 판매처 btn Event
        $("#obCancelNotProDetailInqStorePopup").click(function() {
            WMSUtil.popup.store('obCancelNotProDetailInqStore', {clientCd :$('#obCancelNotProDetailInqClientCd').val()});
        });

        //조회 버튼 이벤트
        $("#obCancelNotProDetailInqSearchBtn").click(function() {
            fnSearch();
        });

        //엑셀 다운로드
        $("#obCancelNotProDetailInqExcelBtn").click(function() {
        	$obCancelNotProDetailInqHGrid.downloadExcelAllItems();
        });

    }

    //데이터
    function sendData(){

    	return {
    		dcCd		: $('#mainDcCd option:selected').val(),
        	clientCd    : $("#obCancelNotProDetailInqClientCd").val(),
    		obYmdFr    	: WMSUtil.fnDateSetting.yyyymmdd($("#obCancelNotProDetailInqObYmdFr").val()),
    		obYmdTo     : WMSUtil.fnDateSetting.yyyymmdd($("#obCancelNotProDetailInqObYmdTo").val()),
    		obNo		: $('#obCancelNotProDetailInqObNo').val(),
    		storeCd		: $('#obCancelNotProDetailInqStoreCd').val(),
    		soNo 		: $('#obCancelNotProDetailInqSoNo').val()
    	}
    }

    //그리드 조회
    function fnList() {
        $obCancelNotProDetailInqHGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundCancellationNotProcessdDetailInquiry/listObCancelInqH",
            sortable		: true,
            rownumbers		: true,
            height			: '540',
            shrinkToFit		: false,
            domainId		: "OB_LIST",
//            rowClickFocus	: true,
            postData		: sendData(),
            colModel: [
                { editable: false, name: "CLIENT_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OB_PROG_ST", 			width: "120px", align: "center", excel:true},
                { editable: false, name: "OB_YMD",				width: "100px", align: "center", excel:true},
                { editable: false, name: "OB_NO", 				width: "100px", align: "center", excel:true},
                { editable: false, name: "SO_NO", 				width: "100px", align: "center", excel:true},
                { editable: false, name: "STORE", 				width: "210px", align: "left"  , excel:true},
                { editable: false, name: "RSTORE", 				width: "210px", align: "left"  , excel:true},

                { editable: false, name: "CONF_QTY", 			width: "100px", align: "right",	formatter:"integer",  excelDataType :"integer", excel:true},

            ],
            pager		: "#obCancelNotProDetailInqHGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function() {

                //그리드 아래 부분 합계
            	var $footRow = $obCancelNotProDetailInqHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");

            	var colArr = ['OB_PROG_ST', 'OB_YMD', 'OB_NO', 'SO_NO', 'STORE', 'RSTORE'];
                //페이지 첫 로딩시 상세그리드를 초기화, 2번째부터는 조회만.
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'HGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'HGrid_RSTORE"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

                    firstLoad = false;
                }

            	//총합계
            	fnTotalHSum($obCancelNotProDetailInqHGrid);
            },

        });
    }

    //전체  헤더 합계 조회
    function fnTotalHSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/outboundCancellationNotProcessdDetailInquiry/listObCancelInqHSum",
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

                	$grid.jqGrid('footerData','set', { CONF_QTY 		: rowData.CONF_QTY.toFixed(2) });

                }
            }
        });
    }


    //그리드 조회
    function fnSearch() {
        if($("#obCancelNotProDetailInqClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obCancelNotProDetailInqClientCd").focus();
            return false;
        }else if($("#obCancelNotProDetailInqClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obCancelNotProDetailInqClientCd").focus();
            return false;
        }
        if($("#obCancelNotProDetailInqObYmdFr").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obCancelNotProDetailInqObYmdFr").focus();
            return false;
        }
        if($("#obCancelNotProDetailInqObYmdTo").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obCancelNotProDetailInqObYmdTo").focus();
            return false;
        }
        $obCancelNotProDetailInqHGrid.paragonGridSearch(sendData());
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
    obCancelNotProDetailInqApp.init();
});
