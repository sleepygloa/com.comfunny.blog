/** Copyright (c) 2017 VertexID RND, Inc.
 *
 * Application Name : 판매처별 출고Lot조회[ObStoreObLotInquiryApp]
 * Program Code     : PWMOB116Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho 	     2018. 07. 17 	    First Draft.
 */

var ObStoreObLotInquiryApp = function() {
	"use strict";
	/***************************************************************************
	 * 전역 객체 선언부 (return 상위부분에 선언해야함)
	 **************************************************************************/

	var $obStoreObLotInquiry = $("#obStoreObLotInquiry");
	var $callBackInput; //콜백함수 (자바스크립트의 순차적 실행 위함)

	var obProgStCdJson; // 출고진행상태코드 JSON

	var obGbnCdOption; // 출고구분

	return {
		init: function() {

			obGbnCdOption = WMSUtil.fnCombo.grid_selectBox('obStoreObLotInquiryObGbnCd', 'OB_GBN_CD');

			toDateSetEvent();

			obStoreObLotInquiryGrid();

			obStoreObLotInquiryEvent();
		},
		callBackInput : function() {
			return $callBackInput;
		}
	};

	// ********** 1.Create Grid List **********
	function obStoreObLotInquiryGrid() {
		$obStoreObLotInquiry.paragonGrid({
			url 			: "/ctrl/outbound/storeOutboundLotInquiry/getStoreOutBoundLotInquiryList",
			sortable 		: true,
			rownumbers 		: true,
			height 			: "476",
			multiselect 	: false,
			multielonly 	: false,
			rowClickFocus 	: true,
			shrinkToFit 	: false,
			postData		: {
			    clientCd		: $("#obStoreObLotInquiryClientCd").val(),
                obYmdFr   		: $("#obStoreObLotInquiryYmdFr").val(),
                obYmdTo			: $("#obStoreObLotInquiryYmdTo").val(),
                obNo			: $("#obStoreObLotInquiryObNo").val(),
                carNo			: $("#obStoreObLotInquiryCarNo").val(),
                deliveryDgr		: $("#obStoreObLotInquiryDeliveryDgr").val(),
                obGbnCd			: $("#obStoreObLotInquiryObGbnCd").val(),
                storeCd			: $("#obStoreObLotInquiryStoreCd").val(),
                rstoreCd		: $("#obStoreObLotInquiryRstoreCd").val(),
                soNo			: $("#obStoreObLotInquirySoNo").val(),
                itemCd			: $("#obStoreObLotInquiryItemCd").val()
            },
			domainId		: "OB_STORE_LIST",
			pager		 	: "#obStoreObLotInquiryNavi",
			colModel : [
				{editable : false, name : "STORE_CD", width : "100px", align : "center"},
				{editable : false, name : "STORE_NM", width : "150px", align : "left"},
				{editable : false, name : "RSTORE_CD", width : "100px", align : "center"},
				{editable : false, name : "RSTORE_NM", width : "150px", align : "left"},
				{editable : false, name : "OB_NO", width : "100px", align : "center"},
				{editable : false, name : "SO_NO", width : "100px", align : "center"},
				{editable : false, name : "OB_GBN", width : "80px", align : "center",
				    edittype: 'select', formatter: 'select', editoptions: { value: obGbnCdOption }
				},
				{editable : false, name : "CONF_QTY", width : "100px", align : "right", hidden: true},
				{editable : false, name : "CONF_TOT_QTY", width : "100px", align : "right"},
				{editable : false, name : "CONF_BOX_QTY", width : "100px", align : "right"},
				{editable : false, name : "CONF_EA_QTY", width : "100px", align : "right"},
				{editable : false, name : "WEIGHT", width : "100px", align : "center", formatter:"integer"},
				{editable : false, name : "OB_YMD", width : "100px", align : "center"},
				{editable : false, name : "CAR_NO", width : "100px", align : "center"},
				{editable : false, name : "DELIVERY_DGR", width : "100px", align : "center" , hidden: true },
				{editable : false, name : "ITEM_CD", width : "100px", align : "center"},
				{editable : false, name : "ITEM_NM", width : "150px", align : "left"},
				{editable : false, name : "LOT_ID", width : "100px", align : "center"},
				{editable : false, name : "MAKE_LOT", width : "100px", align : "center"},
				{editable : false, name : "MAKE_YMD", width : "100px", align : "center"},
				{editable : false, name : "DIST_EXPIRY_YMD", width : "100px", align : "center"},
				{editable : false, name : "REMARK", width : "100px", align : "right"}
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
			loadComplete : function() { //데이터 로딩이 끝난 후 호출할 함수
				var ids = $obStoreObLotInquiry.jqGrid("getDataIDs");
				if (ids && ids.length > 0) {
					$obStoreObLotInquiry.setFocus(0);
				}

			},
		});
	}

		// ********** 2.About Event List Function. **********
		function obStoreObLotInquiryEvent() {

            //코드 입력시 명 서치
            addClientCdChangeEvent("obStoreObLotInquiryClient", ["obStoreObLotInquiryStore", "obStoreObLotInquiryRstore", "obStoreObLotInquiryItem"]);
            addCdChangeEvent("obStoreObLotInquiryClient", "obStoreObLotInquiryStore", "STORE");
            addCdChangeEvent("obStoreObLotInquiryClient", "obStoreObLotInquiryRstore", "STORE");
            addCdChangeEvent("obStoreObLotInquiryClient", "obStoreObLotInquiryItem", "ITEM");

			// 검색 버튼 이벤트
			$("#obStoreObLotInquirySearchBtn").click(function() {
				fnSearch();
			});
			// Popup Event.
			$("#obStoreObLotInquiryClientPopup").click(function() {
				WMSUtil.popup.client('obStoreObLotInquiryClient');
			});
			// 판매처 btn Event
			$("#obStoreObLotInquiryStorePopup").click(function() {
				WMSUtil.popup.store('obStoreObLotInquiryStore');
			});
			// 납품처 btn Event
			$("#obStoreObLotInquiryRstorePopup").click(function() {
				WMSUtil.popup.rstore('obStoreObLotInquiryRstore');
			});
			// 제품코드 btn Event
			$("#obStoreObLotInquiryItemPopup").click(function() {
				WMSUtil.popup.item('obStoreObLotInquiryItem', true, 'obStoreObLotInquiryClient');
			});
			// Tag Disabled
			$("#obStoreObLotInquiryClientNm").attr("disabled", true);

			//엑셀 btn Event
			$("#obStoreObLotInquiryExcelBtn").click(function() {
			    $obStoreObLotInquiry.downloadExcel();
			});
		}
		// 검색 버튼 이벤트
		function fnSearch() {

		    if($("#obStoreObLotInquiryClientCd").val().length == 0){//고객사
		        Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
	            $("#obStoreObLotInquiryClientCd").focus();
	            return false;
	        }else if($("#obStoreObLotInquiryClientCd").val().trim().length == 0){
	            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
	            $("#obStoreObLotInquiryClientCd").focus();
	            return false;
	        }

	        if($("#obStoreObLotInquiryYmdFr").val().length == 0){//출고일자
	            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
	            $("#obStoreObLotInquiryYmdFr").focus();
	            return false;
	        }else if($("#obStoreObLotInquiryYmdFr").val().trim().length == 0){
	            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
	            $("#obStoreObLotInquiryYmdFr").focus();
	            return false;
	        }

	        if($("#obStoreObLotInquiryYmdTo").val().length == 0){//출고일자
	            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
	            $("#obStoreObLotInquiryYmdTo").focus();
	            return false;
	        }else if($("#obStoreObLotInquiryYmdTo").val().trim().length == 0){
	            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
	            $("#obStoreObLotInquiryYmdTo").focus();
	            return false;
	        }

			var data = {
				clientCd	: $("#obStoreObLotInquiryClientCd").val(),
				obYmdFr		: $("#obStoreObLotInquiryYmdFr").val(),
				obYmdTo		: $("#obStoreObLotInquiryYmdTo").val(),
				obNo		: $("#obStoreObLotInquiryObNo").val(),
				carNo		: $("#obStoreObLotInquiryCarNo").val(),
				deliveryDgr	: $("#obStoreObLotInquiryDeliveryDgr").val(),
				obGbnCd		: $("#obStoreObLotInquiryObGbnCd").val(),
				storeCd		: $("#obStoreObLotInquiryStoreCd").val(),
				rstoreCd	: $("#obStoreObLotInquiryRstoreCd").val(),
				soNo		: $("#obStoreObLotInquirySoNo").val(),
				itemCd		: $("#obStoreObLotInquiryItemCd").val()
			};
			$obStoreObLotInquiry.paragonGridSearch(data);

		}

	// datepicker Set up today.
	function toDateSetEvent() {
		WMSUtil.fnTagYmdSetting('obStoreObLotInquiryYmd', true, true);
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
	ObStoreObLotInquiryApp.init();
});
