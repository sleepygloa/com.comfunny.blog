/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고진행내역 조회[ObProgDetailInqApp]
 * Program Code     : PWMOB117Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho      2019 .03 .11        First Drawing
 */

var ObProgDetailInqApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB117Q';
	var proNm = 'obProgDetailInq';

	//그리드
    var $obProgDetailInqHGrid = $("#obProgDetailInqHGrid");
    var $obProgDetailInqDGrid = $("#obProgDetailInqDGrid");

    var firstLoad = true;
    var firstLoadD = true;

    var gridLotAttr1;
    var gridLotAttr2;
    var gridItemStCd;
    var gridObProgStCd;
    var gridObGbnCd;

    var $callBackInput;

    // 상세그리드 파라미터
    var dcCdD;
    var clientCdD;
    var obNoD;

    return {
        init: function() {

            gridObGbnCd 		= WMSUtil.fnCombo.grid_selectBox('obProgDetailInqObGbnCd', 'OB_GBN_CD');

//            gridItemStCd 			= WMSUtil.fnCombo.grid("ITEM_ST_CD");

//            obProgStCombo  			= WMSUtil.fnCombo.grid_selectBox_range('obProgDetailInqObProgStCd', 'OB_PROG_ST_CD', 2, 1);

            gridObProgStCd		= WMSUtil.fnCombo.grid_selectBox('obProgDetailInqObProgStCd', 'OB_PROG_ST_CD');

           	gridLotAttr1	 	= WMSUtil.fnCombo.grid('COUNTRY_CD');

        	gridLotAttr2	 	= WMSUtil.fnCombo.grid('YN', 'DESC');


        	gridItemStCd 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');

            fnEvents();

            fnList();
        },
        callBackInput: function() {
            return $callBackInput;
        }
    };


    //이벤트
    function fnEvents() {

    	WMSUtil.fnTagYmdSetting(proNm+'ObYmd', true, true);


        //조회 버튼 이벤트
        $("#obProgDetailInqSearchBtn").click(function() {
            fnSearch();
        });

        //고객사 팝업
//        $("#obProgDetailInqClientCdPopup").click(function() {
//        	WMSUtil.popup.client('obProgDetailInqClient');
//        });

        //엑셀 다운로드
        $("#obProgDetailInqExcelBtn").click(function() {
            var selrow = $obProgDetailInqDGrid.getGridParam('selrow');
            if(selrow != null){
            	$obProgDetailInqDGrid.downloadExcelAllItems();
            }else{
            	$obProgDetailInqHGrid.downloadExcelAllItems();
            }
        });


        //엔터이벤트
//        $('#obProgDetailInqObNo, #obProgDetailInqSoNo, #obProgDetailInqCarNo').keydown(function(e){
//        	if(e.keyCode == 13){
//        		fnSearch();
//        	}
//        }).keyup(function(){
//        	fnSearch();
//        })

    }

    //데이터
    function sendData(){
    	return {
    		dcCd		: $('#mainDcCd option:selected').val(),
        	clientCd    : $("#obProgDetailInqClientCd").val(),
        	obYmdFr    	: WMSUtil.fnDateSetting.yyyymmdd($("#obProgDetailInqObYmdFr").val()),
        	obYmdTo     : WMSUtil.fnDateSetting.yyyymmdd($("#obProgDetailInqObYmdTo").val()),
        	obNo		: $('#obProgDetailInqObNo').val(),
        	soNo 		: $('#obProgDetailInqSoNo').val(),
        	obProgStCd	: $('#obProgDetailInqObProgStCd option:selected').val(),
        	obGbnCd		: $('#obProgDetailInqObGbnCd option:selected').val(),
        	carNo		: $('#obProgDetailInqCarNo').val()
    	}
    }

    // 상세그리드 파라미터
    function sendDataD() {
    	return {
    		dcCd : $('#mainDcCd option:selected').val(),
    		clientCd : clientCdD,
    		obNo : obNoD
    	}

    }

    //그리드 조회
    function fnList() {
        $obProgDetailInqHGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundProgressDetailInquiry/listObProgDetailInqH",
            sortable		: true,
            rownumbers		: true,
            height			: '212',
            shrinkToFit		: false,
            domainId		: "OB_PROG_DETAIL_INQ_LIST",
//            rowClickFocus	: true,
            postData		: sendData(),
            colModel: [
                { editable: false, name: "CLIENT_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OB_NO", 				width: "100px", align: "center", excel:true },
                { editable: false, name: "SO_NO", 				width: "100px", align: "center", excel:true },
                { editable: false, name: "OB_PROG_ST_CD",		width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OB_PROG_ST", 			width: "150px", align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObProgStCd }
                },
                { editable: false, name: "OB_GBN_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OB_GBN",    			width: "150px", align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObGbnCd }
                },
                { editable: false, name: "OB_YMD",				width: "100px", align: "center", excel:true },
                { editable: false, name: "SO_YMD", 				width: "100px", align: "center", excel:true },
//                { editable: false, name: "APPR_QTY", 			width: "100px", align: "right", formatter:"integer"},
//                { editable: false, name: "APPR_TOT_QTY", 		width: "100px", align: "right",	formatter:"integer"},
	            { editable: false, name: "APPR_BOX_QTY", 		width: "100px", align: "right",	formatter:"integer", excelDataType :"integer", excel:true},
//	            { editable: false, name: "APPR_EA_QTY", 		width: "100px", align: "right",	formatter:"integer"},
//                { editable: false, name: "AVAIL_STOCK_QTY",		width: "100px", align: "right",	formatter:"integer"},
//                { editable: false, name: "AVAIL_STOCK_TOT_QTY",	width: "100px", align: "right",	formatter:"integer"},
	            { editable: false, name: "PICK_BOX_QTY",		width: "100px", align: "right",	formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "CONF_BOX_QTY",		width: "100px", align: "right",	formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "NDELIVERY_BOX_QTY",   width: "100px", align: "right", formatter:"integer", excelDataType :"integer", excel:true},
//                { editable: false, name: "AVAIL_STOCK_EA_QTY", 	width: "100px", align: "right",	formatter:"integer"},
                { editable: false, name: "STORE_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "STORE", 				width: "200px", align: "left",   excel:true},
                { editable: false, name: "RSTORE_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "RSTORE", 				width: "200px", align: "left",   excel:true},
                { editable: false, name: "CAR_NO", 				width: "100px", align: "center", excel:true}
            ],
            pager		: "#obProgDetailInqHGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function() {

            	// 데이터 1건 이상일 때 포커스
            	var ids = $obProgDetailInqHGrid.jqGrid('getDataIDs');
                if (ids && ids.length > 0) {
//                    $obProgDetailInqHGrid.setFocus(0);
                }

                var data = $obProgDetailInqHGrid.getRowData(ids[0]);
                var dataJson = {
                		dcCd		: $('#mainDcCd option:selected').val(),
                		clientCd	: data.CLIENT_CD,
                        obNo		: data.OB_NO
                };

                dcCdD = $('#mainDcCd option:selected').val();
            	clientCdD = data.CLIENT_CD;
            	obNoD = data.OB_NO;

                //그리드 아래 부분 합계
            	var $footRow = $obProgDetailInqHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['OB_NO', 'SO_NO', 'OB_PROG_ST', 'OB_GBN', 'OB_YMD'];
                //페이지 첫 로딩시 상세그리드를 초기화, 2번째부터는 조회만.
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'HGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'HGrid_SO_YMD"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	fnListD(dataJson);
                    firstLoad = false;
                } else {
                	if(ids.length > 0){
                		$obProgDetailInqDGrid.paragonGridSearch(dataJson);
                	}else{
                		$obProgDetailInqDGrid.jqGrid('clearGridData');
                	}
                }

            	//총합계
            	fnTotalHSum($obProgDetailInqHGrid);
            },
            onSelectRowEvent: function(currRowData, prevRowData) {
                //InClientCd = currRowData.CLIENT_CD;
            	dcCdD = $('#mainDcCd option:selected').val();
            	clientCdD = currRowData.CLIENT_CD;
            	obNoD = currRowData.OB_NO;

                var data = {
                		dcCd		: $('#mainDcCd option:selected').val(),
                        clientCd	: currRowData.CLIENT_CD,
                        obNo		: currRowData.OB_NO
                };
                $obProgDetailInqDGrid.paragonGridSearch(data);
            }
        });
    }

    //전체  헤더 합계 조회
    function fnTotalHSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/outboundProgressDetailInquiry/listObProgDetailInqHSum",
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

                	$grid.jqGrid('footerData','set', { APPR_BOX_QTY 		: rowData.APPR_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { PICK_BOX_QTY 		: rowData.PICK_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { CONF_BOX_QTY 		: rowData.CONF_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { NDELIVERY_BOX_QTY         : rowData.NDELIVERY_BOX_QTY.toFixed(2) });


                }
            }
        });
    }
    //상세 그리드 조회
    function fnListD(dataJson) {
        $obProgDetailInqDGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundProgressDetailInquiry/listObProgDetailInqD",
            sortable		: true,
            rownumbers		: true,
            height			: '212',
            postData		: dataJson,
//            rowClickFocus	: true,
            shrinkToFit		: false,
            domainId		: "OB_PROG_DETAIL_INQ_DETAIL_LIST",
            colModel		: [
                { editable: false, name: "OB_PROG_ST_CD",      width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OB_PROG_ST",          width: "150px", align: "center"},
				{ editable: false, name: "OB_NO", 			width: "100px", align: "center", excel:true },
				{ editable: false, name: "OB_DETAIL_SEQ", 	width: "100px", align: "center", excel:true },
				{ editable: false, name: "ITEM_CD", 		width: "100px", align: "center", excel:true },
				{ editable: false, name: "ITEM_NM", 		width: "200px", align: "left"  , excel:true},
				{ editable: false, name: "ITEM_SPEC", 		width: "100px", align: "center", excel:true },
				{ editable: false, name: "ITEM_ST_CD", 		width: "100px", align: "center", hidden: true },
				{ editable: false, name: "ITEM_ST",    		width: "100px", align: "center", excel:true,
					edittype:'selectText', formatter:'selectText', editoptions: { value:gridItemStCd }
				},
				{ editable: false, name: "UOM", 			width: "100px", align: "center", excel:true },
				{ editable: false, name: "PKQTY", 			width: "100px", align: "center", formatter:"integer", excelDataType :"integer", excel:true},
				{ editable: false, name: "PLT_PKQTY", 		width: "80px",  align: "right", formatter:"integer", excelDataType :"integer", excel:true},
				{ editable: false, name: "APPR_BOX_QTY", 	width: "80px",  align: "right",	formatter:"integer", excelDataType :"integer", excel:true},
				{ editable: false, name: "PICK_BOX_QTY", 	width: "80px",  align: "right",	formatter:"integer", excelDataType :"integer", excel:true},
				{ editable: false, name: "CONF_BOX_QTY", 	width: "80px",  align: "right",	formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "NDELIVERY_BOX_QTY",width: "90px",  align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "MAKE_YMD", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "MAKE_LOT",		width: "100px", align: "center", excel:true },
                { editable: false, name: "DIST_EXPIRY_YMD", width: "100px", align: "center", excel:true },
                { editable: false, name: 'LOT_ATTR1',		width: "100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridLotAttr1 }
                },
                { editable: false, name: 'LOT_ATTR2',      	width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridLotAttr2 }
                },
                { editable: false, name: "LOT_ATTR3", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "LOT_ATTR4", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "LOT_ATTR5", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "PROGMOTION_GBN",	width: "100px", align: "center", excel:true },
            ],
//            groupHeaders: [{
//                rowspan	: true,
//                header	: [
//                    { start: 'PLAN_TOT_QTY', length: 3, domain: "PLAN_QTY" }
//                ]
//            }],
            pager		: "#obProgDetailInqDGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function() {
            	//그리드 아래 부분 합계
            	var $footRow = $obProgDetailInqDGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['OB_NO', 'OB_DETAIL_SEQ', 'ITEM_CD', 'ITEM_NM', 'ITEM_SPEC', 'ITEM_ST', 'UOM', 'PKQTY'];
                //페이지 첫 로딩시 상세그리드를 초기화, 2번째부터는 조회만.
            	if(firstLoadD){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'DGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'DGrid_PLT_PKQTY"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');


                    firstLoadD = false;
                }
            	fnTotalDSum($obProgDetailInqDGrid);
            }
        });
    }

    //전체 디테일 합계 조회
    function fnTotalDSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/outboundProgressDetailInquiry/listObProgDetailInqDSum",
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
                	$grid.jqGrid('footerData','set', { APPR_BOX_QTY 		: rowData.APPR_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { CONF_BOX_QTY 		: rowData.CONF_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { PICK_BOX_QTY 		: rowData.PICK_BOX_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { NDELIVERY_BOX_QTY    : rowData.NDELIVERY_BOX_QTY.toFixed(2) });

                }
            }
        });
    }

    //그리드 조회
    function fnSearch() {
        if($("#obProgDetailInqClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obProgDetailInqClientCd").focus();
            return false;
        }else if($("#obProgDetailInqClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obProgDetailInqClientCd").focus();
            return false;
        }
        if($("#obProgDetailInqObYmdFr").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obProgDetailInqObYmdFr").focus();
            return false;
        }
        if($("#obProgDetailInqObYmdTo").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obProgDetailInqObYmdTo").focus();
            return false;
        }
        $obProgDetailInqHGrid.paragonGridSearch(sendData());

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
    ObProgDetailInqApp.init();
});
