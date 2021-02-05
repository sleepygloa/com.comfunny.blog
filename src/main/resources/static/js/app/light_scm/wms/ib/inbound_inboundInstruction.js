/**
 * Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고지시[IbInstructionApp] Program Code : PWMIB105E
 * Description : Revision History Author Date Description ------------
 * ------------- ------------------ Kim Min su 2017. 2. 20. First Draft.
 */
var IbInstructionApp = function() {
	"use strict";

	// 프로그램 코드, 명
	// var proCd = $('a[class="active"]').data('procd');
	var proCd = 'PWMIB105E';
	var proNm = 'ibInst';

	// [El]프로그램 그리드
	var $ibInstHGrid = $("#ibInstHeaderGrid");

	var $ibInstDGrid = $("#ibInstDetailGrid");

	var ibItemStComboJson;
	var ibProgStComboJson;
	var ibGbnComboJson;
	var gridExportCountryCd;
	var gridDalatYn;

	var ibNoH;
	var detSeqH;

	var firstLoad = true;
	var rowDataList;

	var gridHeight = '188';

	return {
		init : function() {

			ibProgStComboJson 		= WMSUtil.fnCombo.grid_selectBox_range('ibInstProgStCd', 'IB_PROG_ST_CD', 4, 1);

			ibGbnComboJson 			= WMSUtil.fnCombo.grid_selectBox('ibInstGbnCd','IB_GBN_CD');

			ibItemStComboJson 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');

			WMSUtil.fnCombo.selectBox('ibInstReport', 'PWMIB105E');

			gridExportCountryCd 	= WMSUtil.fnCombo.grid('COUNTRY_CD');

			gridDalatYn 			= WMSUtil.fnCombo.grid('YN');

			fnEvents();

			fnList();
		}
	};

	// [Fn] 이벤트
	function fnEvents() {

		WMSUtil.fnTagYmdSetting('ibInstYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');

		// 입고지시버튼
		$("#ibInstConfBtn").click(function() {
			fnInst("A");
		});
		// 검색버튼
		$("#searchIbInstBtn").click(function() {
			fnSearch();
		});
		// 입고지시취소버튼
		$("#ibInstCancelBtn").click(function() {
			fnInst("C");
		});
		// 엑셀버튼
		$("#excelIbInstBtn").click(function() {
			var selectRow = $ibInstDGrid.getGridParam('selrow');
			if (selectRow == null) {
				$ibInstHGrid.downloadExcelAllItems();
			} else {
				$ibInstDGrid.downloadExcelAllItems();
			}
		});

		$("#ibInstSaveBtn").click(function() {
			fnSave();
		});

		$("#ibInstClientPopup").click(function() {
			WMSUtil.popup.client('ibInstClient');
		});

		$("#ibInstClientNm").attr("disabled", true);

		$("#reportIbInstBtn").click(function() {
			var flag = $("#ibInstReport option:selected").val();
			if (flag == 20) {
				var sendData = {
					grid : $ibInstHGrid,
					url : '/ibInstPutwReport',
					key : "IB_NO",
					progSt : 'IB_PROG_ST_CD',
					progCd : 40,
					errMsgCd : 'MSG_INRI_ERR_011',
					// size : 'w7d6h7d6',
					data : {
						ibNo 		: "IB_NO",
						ibDetailSeq : "IB_DETAIL_SEQ",
						clientCd 	: "CLIENT_CD",
						itemCd 		: "ITEM_CD",
					},
					addData : {
						proCd : 'PWMIB105E_R2',
						type : 'PDF'
					}
				};
				WMSUtil.fnReport(sendData);
			} else if (flag == 10) {
				var sendData = {
						grid : $ibInstHGrid,
						url : '/inInstIbLabelReport',
						key : "IB_NO",
						progSt : 'IB_PROG_ST_CD',
						progCd : 40,
						errMsgCd : 'MSG_INRI_ERR_011',
						data : {
                            ibNo        : "IB_NO",
                            ibDetailSeq : "IB_DETAIL_SEQ",
                            clientCd    : "CLIENT_CD",
                            itemCd      : "ITEM_CD",
						},
						addData : {
							proCd : 'PWMIB105E_R1',
							type : 'CMD'
						}
					};
				WMSUtil.popup.printerDriver(sendData);



			}

		});

	}

	// [Fn] 검색 조건 매핑
	function fnSearch() {
		// validation
		if ($("#ibInstClientCd").val().length == 0) {// 고객사 검사
			Util.alert('MSG_MST_VAL_026'); // 고객사코드 항목은 필수 입력 입니다.
			$("#ibInstClientCd").focus();
			return false;
		} else if ($("#ibInstClientCd").val().trim().length == 0) {
			Util.alert('MSG_MST_VAL_027'); // 고객사코드는 공백으로 입력 할 수 없습니다.
			$("#ibInstClientCd").focus();
			return false;
		}
		if ($("#ibInstYmdFr").val().length == 0) {// 입고일자 검사
			Util.alert('MSG_INRI_VAL_007'); // 입고일자 항목은 필수 입력입니다.
			$("#ibInstYmdFr").focus();
			return false;
		} else if ($("#ibInstYmdFr").val().trim().length == 0) {
			Util.alert('MSG_INRI_VAL_008'); // 입고일자는 공백만으로 입력할 수 없습니다.
			$("#ibInstYmdFr").focus();
			return false;
		}
		if ($("#ibInstYmdTo").val().length == 0) {// 입고일자 검사
			Util.alert('MSG_INRI_VAL_008'); // 입고일자는 공백만으로 입력할 수 없습니다.
			$("#ibInstYmdTo").focus();
			return false;
		} else if ($("#ibInstYmdTo").val().trim().length == 0) {
			Util.alert('MSG_INRI_VAL_008'); // 입고일자는 공백만으로 입력할 수 없습니다.
			$("#toIbExamYmd").focus();
			return false;
		}
		$ibInstHGrid.paragonGridSearch(sendData());
	}

	function sendData() {
		return {
			clientCd 	: $.trim($("#ibInstClientCd").val()),
			ibInstYmdFr : WMSUtil.fnDateSetting.yyyymmdd($('#ibInstYmdFr').val()),
			ibInstYmdTo : WMSUtil.fnDateSetting.yyyymmdd($('#ibInstYmdTo').val()),
			ibProgStCd 	: $.trim($("#ibInstProgStCd").val()),
			ibGbnCd 	: $.trim($("#ibInstGbnCd").val()),
			ibNo 		: $.trim($("#instIbNo").val()),
			carNo 		: $.trim($("#ibInstCarNo").val())
		}
	}

	function fnList() {
		$ibInstHGrid.paragonGrid({
			url 			: '/ctrl/inbound/inboundInstruction/listIbInstH',
			rowEditable 	: true,
			cellEditable 	: false,
			sortable 		: true,
			rownumbers 		: true,
			shrinkToFit 	: false,
			multiselect 	: true,
			// multielonly:true,
			rowClickFocus 	: true,
			// postData:{clientCd:$.trim($("#ibInstClientCd").val())},
			height 			: gridHeight,
			postData 		: sendData(),
			colModel 		: [
			    { editable : false, name : 'CLIENT_CD', 		width : "100px", align : "center", 	hidden : true },
			    { editable : false, name : 'CLIENT', 			width : "100px", align : "left", excel:true 	},
			    { editable : false, name : 'IB_PROG_ST_CD',  	width : "100px", align : "center", 	hidden : true },
			    { editable : false, name : 'IB_PROG_ST', 		width : "150px", align : "center", excel:true,
			    	edittype : 'selectText', formatter : 'selectText', editoptions : { value : ibProgStComboJson } },
			    { editable : false, name : 'IB_PLAN_YMD', 		width : "80px", align : "center", excel:true 	},
			    { editable : false, name : 'IB_YMD', 			width : "80px", align : "center", excel:true 	},
			    { editable : false, name : 'IB_NO', 			width : "90px", align : "center", excel:true 	},
			    { editable : false, name : 'IB_DETAIL_SEQ', 	width : "80px", align : "center", excel:true 	},
			    { editable : false, name : 'PO_YMD', 			width : "80px", align : "center", excel:true 	},
			    { editable : false, name : 'PO_NO', 			width : "90px", align : "center", excel:true	},
			    { editable : false, name : 'IB_GBN_CD', 		width : "100px", align : "center", 	hidden : true },
			    { editable : false, name : 'IB_GBN', 			width : "150px", align : "center", excel:true,
			    	edittype : 'selectText', formatter : 'selectText', editoptions : { value : ibGbnComboJson } },
		    	{ editable : false, name : 'SUPPLIER_NM', 		width : "150px", align : "left", excel:true 	},
		    	{ editable : false, name : 'ITEM_CD', 			width : "100px", align : "center", excel:true 	},
		    	{ editable : false, name : 'ITEM_NM', 			width : "150px", align : "left", excel:true 	},
		    	{ editable : false, name : 'PKQTY', 			width : "50px", align : "center",	formatter : "integer", excelDataType :"integer", excel:true},
		    	{ editable : false, name : 'UOM', 				width : "80px", align : "center", excel:true 	},
		    	{ editable : false, name : 'PLAN_QTY', 			width : "100px", align : "right", 	hidden : true },
		    	{ editable : false, name : 'PLAN_TOT_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
		    	{ editable : false, name : 'PLAN_BOX_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
		    	{ editable : false, name : 'PLAN_EA_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
		    	{ editable : false, name : 'EXAM_QTY', 			width : "100px", align : "right", 	hidden : true },
		    	{ editable : false, name : 'EXAM_TOT_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true},
		    	{ editable : false, name : 'EXAM_BOX_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
		    	{ editable : false, name : 'EXAM_EA_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
		    	{ editable : false, name : 'INST_QTY', 			width : "100px", align : "right", 	hidden : true },
		    	{ editable : false, name : 'INST_TOT_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
		    	{ editable : false, name : 'INST_BOX_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
		    	{ editable : false, name : 'INST_EA_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
		    	{ editable : false, name : 'PLAN_WEIGHT', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
			    	{ editable : true, name : 'PLT_PKQTY', 		width : "100px", align : "right",	formatter : "integer", excelDataType :"integer", excel:true,
					editoptions : {
						maxlength : 11,
						dataInit : function(el) {
							$(el).on('keyup blur', function(e) {
								gridIntLengthLimit($(el), e, 9);
							})
						}
					}
			    },
			    { editable : false, name : 'ITEM_SPEC', 		width : "100px", align : "center", excel:true 	},
			    { editable : false, name : 'ITEM_ST_CD', 		width : "100px", hidden : true 		},
			    { editable : false, name : 'ITEM_ST', 			width : "100px", align : "center", excel:true,
			    	edittype : 'selectText', formatter : 'selectText', editoptions : { value : ibItemStComboJson } },
		    	{ editable : false, name : 'CAR_NO', 			width : "80px", align : "center", excel:true 	},
		    	{ editable : false, name : 'SUPPLIER_CD', 		width : "100px", align : "center", excel:true 	},
		    	{ editable : false, name : 'INST_DT', 			width : "100px", align : "center", excel:true 	},
		    	{ editable : false, name : 'INST_USER_ID', 		width : "100px", align : "center", excel:true 	},
		    	{ editable : false, name : 'PROG', 				width : "100px", hidden : true 		}
		    ],
			pager : "#ibInstHeaderGridNavi",
			domainId : "IB_INST_LIST",
			gridComplete : function() {
				var ids = $ibInstHGrid.jqGrid("getDataIDs");
				// 행이 1개 이상일때 포커스
				if (ids && ids.length > 0) {
					$ibInstHGrid.setFocus(0);
				}

				// 첫로딩 D그리드 생성, 그 외 조회효과
				var clientCd = $ibInstHGrid.getRowData(ids[0]).CLIENT_CD;
				var ibNo = $ibInstHGrid.getRowData(ids[0]).IB_NO;
				var ibDetailSeq = $ibInstHGrid.getRowData(ids[0]).IB_DETAIL_SEQ;

				var gridData = {
					clientCd : clientCd,
					ibNo : ibNo,
					ibDetailSeq : ibDetailSeq
				}

				if (firstLoad) {
					fnListD(gridData);
					firstLoad = false;
				} else {
					if (ibNo != null) {
						$ibInstDGrid.paragonGridSearch({
							ibNo : gridData.ibNo,
							ibDetailSeq : gridData.ibDetailSeq
						});
					} else {
						$ibInstDGrid.paragonGridSearch({
							ibNo : null,
							ibDetailSeq : null
						});
					}
				}
			},
			onSelectRowEvent : function(currRowData, prevRowData) {
				rowDataList = currRowData;

				$ibInstDGrid.paragonGridSearch({
					ibNo : rowDataList.IB_NO,
					ibDetailSeq : rowDataList.IB_DETAIL_SEQ
				});
			},
			groupHeaders : [ {
				rowspan : true,
				header : [ {
					start : 'PLAN_TOT_QTY',
					length : 3,
					domain : "PLAN_QTY"
				}, {
					start : 'EXAM_TOT_QTY',
					length : 3,
					domain : "EXAM_QTY"
				}, {
					start : 'INST_TOT_QTY',
					length : 3,
					domain : "INST_QTY"
				} ]
			} ]
		});
	}

	function fnListD(gridData) {
		$ibInstDGrid.paragonGrid({
			url 			: '/ctrl/inbound/inboundInstruction/listIbInstD',
			rowEditable 	: true,
			cellEditable 	: false,
			sortable 		: true,
			rownumbers 		: true,
			shrinkToFit 	: false,
			multiselect 	: false,
			rowClickFocus 	: true,
			postData		: gridData,
			height 			: gridHeight,
			colModel : [
			   { editable : false, name : 'IB_NO', 				width : "100px", align : "center", excel:true 	},
			   { editable : false, name : 'IB_DETAIL_SEQ', 		width : "150px", align : "center", excel:true 	},
			   { editable : false, name : 'IB_INST_NO', 		width : "100px", align : "center", excel:true 	},
			   { editable : false, name : 'INST_LOC_CD', 		width : "100px", align : "center", excel:true 	},
			   { editable : false, name : 'CLIENT_CD', 			width : "100px", align : "center", 	hidden : true },
			   { editable : false, name : 'ITEM_CD', 			width : "100px", align : "center", 	hidden : true },
			   { editable : false, name : 'INST_QTY', 			width : "100px", align : "right", 	hidden : true },
			   { editable : false, name : 'ITEM_ST',	 		width : "100px", align : "center", excel:true 	},
			   { editable : false, name : 'INST_TOT_QTY', 		width : "100px", align : "right",	formatter : "integer", excelDataType :"integer", excel:true },
			   { editable : false, name : 'INST_BOX_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
			   { editable : false, name : 'INST_EA_QTY', 		width : "100px", align : "right", 	formatter : "integer", excelDataType :"integer", excel:true },
			   { editable : false, name : 'MAKE_LOT', 			width : "100px", align : "center", excel:true 	},
			   { editable : false, name : 'MAKE_YMD', 			width : "100px", align : "center", excel:true 	},
			   { editable : false, name : 'DIST_EXPIRY_YMD', 	width : "100px", align : "center", excel:true 	},
			   { editable : false, name : 'PLT_ID', 			width : "100px", align : "center", excel:true 	},
			   { editable : false, name : 'LOT_ID', 			width : "100px", align : "center", excel:true 	},
			   { editable : false, name : 'LOT_ATTR1', 	width : "100px", align : "center", excel:true,
				   		edittype : 'selectText', formatter : 'selectText', editoptions : { value : gridExportCountryCd } },
			   { editable : false, name : 'LOT_ATTR2', 			width : "100px", align : "center", excel:true,
				   		edittype : 'selectText', formatter : 'selectText', editoptions : { value : gridDalatYn } },
		   	   { editable : false, name : 'LOT_ATTR3', 			width : "100px", align : "center", excel:true 	},
		   	   { editable : false, name : 'LOT_ATTR4', 			width : "100px", align : "center", excel:true 	},
		   	   { editable : false, name : 'LOT_ATTR5', 			width : "100px", align : "center", excel:true	}
		   	],
			pager : "#ibInstDetailGridNavi",
			domainId : "IB_INST_DETAIL_LIST",
			groupHeaders : [ {
				rowspan : true,
				header : [ {
					start : 'INST_TOT_QTY',
					length : 3,
					domain : "INST_QTY"
				} ]
			} ]
		});
	}

	function fnSave() {
		var rowData = {
			modFlag 	: "MOD_FLAG",
			ibNo 		: "IB_NO",
			ibDetailSeq : "IB_DETAIL_SEQ",
			pltPkqty 	: "PLT_PKQTY"
		}

		var jsonData = $ibInstHGrid.getSelectedJsonData("dt_ibPltQty", rowData);
		// 1. 널 검사
		if (!jsonData) {
			Util.alert('MSG_COM_VAL_057'); // 선택된 행이 없습니다.
			return false;
		}
		var ids = $ibInstHGrid.getGridParam("selarrrow");
		var ibProgStCd = [];
		var rowFlag = "";
		for (var i = 0; i < ids.length; i++) {
			rowFlag = $ibInstHGrid.getRowData(ids[i]).MOD_FLAG;
			ibProgStCd
					.push(Number($ibInstHGrid.getRowData(ids[i]).IB_PROG_ST_CD));
			if (rowFlag != "UPDATE" && rowFlag != "INSERT") {
				Util.alert('MSG_COM_VAL_058', $ibInstHGrid.getRowData(ids[i]).ITEM_CD); // [ {0} ]은(는) 변경된 값이 없습니다.
				return false;
			}
		}

		if (Math.max.apply(null, ibProgStCd) == 40) {
			Util.alertCode('MSG_COM_VAL_069', 'IB_PROG_ST_CD', 30); // {0}상태만 저장 가능합니다.
			return false;
		}

		var saveUrl = '/ctrl/inbound/inboundInstruction/updateIbInstDPltQty';
		var msg = 'MSG_COM_CFM_003';

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$ibInstHGrid.paragonGridReload();
    	})

	}

	function fnInst(gbn) {

		// 데이터 키 : Value Key
		var rowData = {
			clientCd 	: "CLIENT_CD",
			ibNo 		: "IB_NO",
			prog 		: "PROG",
			ibDetailSeq : "IB_DETAIL_SEQ"
		}

		var rowid = $ibInstHGrid.getGridParam("selarrrow");
		var ibProgStCd = [];
		for (var i = 0; i < rowid.length; i++) {
			var prog = ((gbn == "A") ? 'FW' : 'BW');
			$ibInstHGrid.jqGrid('setCell', rowid[i], 'PROG', prog);
			ibProgStCd
					.push(Number($ibInstHGrid.getRowData(rowid[i]).IB_PROG_ST_CD));
		}

		var jsonData = $ibInstHGrid.getSelectedJsonData("dt_inst", rowData);

		if (jsonData == false) {
			Util.alert('MSG_COM_VAL_057'); // 선택된 행이 없습니다.
			return false;
		}

		var saveUrl = '/ctrl/inbound/inboundInstruction/updateIbInstConfirm';
		if (gbn == "A") {
			if (Math.max.apply(null, ibProgStCd) == 40) {
				Util.alertCode('MSG_COM_VAL_075', 'IB_PROG_ST_CD', 30); // {0}상태만
				return false;
			}

			var msg = 'MSG_INRI_CFM_007'; //입고지시 하시겠습니까?

	        //ajax
	        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
	        	$ibInstHGrid.paragonGridReload();
	    	})

		} else {
			if (Math.min.apply(null, ibProgStCd) == 30) {
				Util.alertCode('MSG_COM_VAL_072', 'IB_PROG_ST_CD', 40); // {0}상태만
				return false;
			}

			var msg = 'MSG_INRI_CFM_008'; //입고지시취소 하시겠습니까?

	        //ajax
	        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
	        	$ibInstHGrid.paragonGridReload();
	    	})
		}

	}

}();

/*******************************************************************************
 * bootstrap-datepicker 달력오픈 중, 탭 이동시 달력 hide Since : 2017-08-29 작성자 : Kim Seon
 * Ho 수정내역:
 ******************************************************************************/
/*******************************************************************************
 * bootstrap-datepicker 달력오픈 중, 탭 이동시 달력 hide Since : 2017-08-29 작성자 : Kim Seon
 * Ho 수정내역: 2017-09-08 Tab-menu 종료시 마우스 클릭 인식 안되, datepicker(hide) 가 안되던 현상 수정
 ******************************************************************************/
$("li.active").siblings().click(function() {
	// trigger the datepicker
	$('.date').datepicker('hide');
});
$("li.active").live("click focusout", function(e) {
	// trigger the datepicker
	$('.date').datepicker('hide');
});

$(document).ready(function() {
	IbInstructionApp.init();
});
