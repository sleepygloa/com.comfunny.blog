/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고승인내역현황 조회[ObApprDetailInqApp]
 * Program Code     : PWMOB116Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho      2019 .03 .10        First Drawing
 */

var ObApprDetailInqApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB116Q';
	var proNm = 'obApprDetailInq';

	//그리드
    var $obApprDetailInqHGrid = $("#obApprDetailInqHGrid");
    var $obApprDetailInqDGrid = $("#obApprDetailInqDGrid");

    var firstLoad = true;
    var firstLoadD = true;
    var gridLotAttr1;
    var gridLotAttr2;
    var gridItemStCd;

    var $callBackInput;

    var clientCdD;
    var itemCdD;
    var lotAttr1D;
    var lotAttr2D;


    return {
        init: function() {

//            gridObGbnCd 			= WMSUtil.fnCombo.grid_selectBox('obApprDetailInqObGbnCd', "OB_GBN_CD");

//            gridItemStCd 			= WMSUtil.fnCombo.grid("ITEM_ST_CD");

//            obProgStCombo  			= WMSUtil.fnCombo.grid_selectBox_range('obApprDetailInqObProgStCd', 'OB_PROG_ST_CD', 2, 1);

//            gridObProgStCd			= WMSUtil.fnCombo.grid('OB_PROG_ST_CD');

        	WMSUtil.fnCombo.itemClassLarge(proNm + 'LargeClassCd', proNm + 'MiddleClassCd', proNm + 'SmallClassCd');

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
        $("#obApprDetailInqSearchBtn").click(function() {
            fnSearch();
        });

        //고객사 팝업
//        $("#obApprDetailInqClientCdPopup").click(function() {
//        	WMSUtil.popup.client('obApprDetailInqClient');
//        });

        //엑셀 다운로드
        $("#obApprDetailInqExcelBtn").click(function() {
            var selrow = $obApprDetailInqDGrid.getGridParam('selrow');
            if(selrow != null){
            	$obApprDetailInqDGrid.downloadExcelAllItems();
            }else{
            	$obApprDetailInqHGrid.downloadExcelAllItems();
            }
        });

        //레포트 출력
        $('#obApprDetailInqReportBtn').click(function(){
        	var	sendData = {
        			grid		: $obApprDetailInqHGrid,
        			url			: '/obApprDetailInqReport',
        			key			: "ITEM_CD",
        			errMsgCd	: 'MSG_COM_VAL_091',
        			//size		: "15",
        			data		: {
        				dcCd			: "DC_CD",
        				clientCd		: "CLIENT_CD",
        				itemCd   		: "ITEM_CD",
        				lotAttr1  		: "LOT_ATTR1",
        				lotAttr2  		: "LOT_ATTR2",
        				availStockQty 	: "APPR_QTY",
        				obYmdFr			: "OBYMDFR",
        				obYmdTo			: "OBYMDTO"
        			},
        			addData : {
    					proCd	: 'PWMOB116Q_R1',
    					type	: 'PDF'
        			}
        	};
        	WMSUtil.fnReport(sendData);
        })
    }

    //데이터
    function sendData(){
    	return {
    		dcCd			: $('#mainDcCd option:selected').val(),
        	clientCd    	: $("#obApprDetailInqClientCd").val(),
        	obYmdFr    		: WMSUtil.fnDateSetting.yyyymmdd($("#obApprDetailInqObYmdFr").val()),
        	obYmdTo     	: WMSUtil.fnDateSetting.yyyymmdd($("#obApprDetailInqObYmdTo").val()),
        	largeClassCd 	: $('#'+proNm+'LargeClassCd option:selected').val(),
        	middleClassCd 	: $('#'+proNm+'MiddleClassCd option:selected').val(),
    		smallClassCd 	: $('#'+proNm+'SmallClassCd option:selected').val()
    	}
    }

    // 데이터 디테일
    function sendDataD(){
    	return {
    		clientCd : clientCdD,
    	    itemCd : itemCdD,
    	    lotAttr1 : lotAttr1D,
    	    lotAttr2 : lotAttr2D
    	}
    }

    //그리드 조회
    function fnList() {
        $obApprDetailInqHGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundApprovalDetailInquiry/listObApprDetailInqH",
            sortable		: true,
            rownumbers		: true,
            height			: '212',
            shrinkToFit		: false,
            multiselect		: true,
            domainId		: "OB_APPR_DETAIL_INQ_LIST",
            postData		: sendData(),
            colModel: [
               	{ editable: false, name: "DC_CD", 				width: "100px", align: "center", hidden: true  },
                { editable: false, name: "CLIENT_CD", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OBYMDFR", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "OBYMDTO", 			width: "100px", align: "center", hidden: true  },
                { editable: false, name: "ITEM_ST_CD", 			width: "100px", align: "center", hidden: true },
                { editable: false, name: "ITEM_CD", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "ITEM_NM", 			width: "200px", align: "left"  , excel:true	},
                { editable: false, name: "ITEM_SPEC", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "ITEM_ST",    			width: "100px", align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridItemStCd }
                },
                { editable: false, name: "UOM", 				width: "100px", align: "center", excel:true },
                { editable: false, name: "PKQTY", 				width: "100px", align: "center", formatter:"integer", excelDataType :"integer", excel:true},
//                { editable: false, name: "APPR_QTY", 			width: "100px", align: "right", formatter:"integer"},
//                { editable: false, name: "APPR_TOT_QTY", 		width: "100px", align: "right",	formatter:"integer"},
	            { editable: false, name: "APPR_QTY", 			width: "100px", align: "right",	formatter:"integer", excelDataType :"integer", excel:true},
//	            { editable: false, name: "APPR_EA_QTY", 		width: "100px", align: "right",	formatter:"integer"},
                { editable: false, name: "AVAIL_STOCK_QTY",		width: "100px", align: "right",	formatter:"integer", hidden:true},
//                { editable: false, name: "AVAIL_STOCK_TOT_QTY",	width: "100px", align: "right",	formatter:"integer"},
                { editable: false, name: "STOCK_QTY",			width: "100px", align: "right",	formatter:"integer", excelDataType :"integer", excel:true},
//                { editable: false, name: "AVAIL_STOCK_EA_QTY", 	width: "100px", align: "right",	formatter:"integer"},
                { editable: false, name:'LOT_ATTR1',			width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridLotAttr1 }
                },
                { editable: false, name:'LOT_ATTR2',      		width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridLotAttr2 }
                },
//                { editable: false, name: "LOT_ATTR3", 		width: "100px", align: "center" },
//                { editable: false, name: "LOT_ATTR4", 		width: "100px", align: "center" },
//                { editable: false, name: "LOT_ATTR5", 		width: "100px", align: "center" },
            ],
            pager		: "#obApprDetailInqHGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function() {

            	// 데이터 1건 이상일 때 포커스
            	var ids = $obApprDetailInqHGrid.jqGrid('getDataIDs');
                if (ids && ids.length > 0) {
//                    $obApprDetailInqHGrid.setFocus(0);
                }

                var data = $obApprDetailInqHGrid.getRowData(ids[0]);
                var dataJson = {
                        clientCd	: data.CLIENT_CD,
                        itemCd		: data.ITEM_CD,
                        lotAttr1	: data.LOT_ATTR1,
                        lotAttr2	: data.LOT_ATTR2
                };

                clientCdD = data.CLIENT_CD;
                itemCdD = data.ITEM_CD;
                lotAttr1D = data.LOT_ATTR1;
                lotAttr2D = data.LOT_ATTR2;

                //그리드 아래 부분 합계
            	var $footRow = $obApprDetailInqHGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['ITEM_CD', 'ITEM_NM', 'ITEM_SPEC', 'ITEM_ST', 'UOM'];
                //페이지 첫 로딩시 상세그리드를 초기화, 2번째부터는 조회만.
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'HGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'HGrid_PKQTY"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	fnListD(dataJson);
                    firstLoad = false;
                } else {
                	if(ids.length > 0){
                		$obApprDetailInqDGrid.paragonGridSearch(dataJson);
                	}else{
                		$obApprDetailInqDGrid.jqGrid('clearGridData');
                	}
                }

            	//총합계
            	fnTotalHSum($obApprDetailInqHGrid);
            },
            onSelectRowEvent: function(currRowData, prevRowData) {
            	clientCdD = currRowData.CLIENT_CD;
            	itemCdD = currRowData.ITEM_CD;
            	lotAttr1D = currRowData.LOT_ATTR1;
            	lotAttr2D = currRowData.LOT_ATTR2;

                var data = {
                        clientCd	: currRowData.CLIENT_CD,
                        itemCd		: currRowData.ITEM_CD,
                        lotAttr1	: currRowData.LOT_ATTR1,
                        lotAttr2	: currRowData.LOT_ATTR2
                };
                $obApprDetailInqDGrid.paragonGridSearch(data);
            }
        });
    }

    //전체  헤더 합계 조회
    function fnTotalHSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/outboundApprovalDetailInquiry/listObApprDetailInqHSum",
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

                	$grid.jqGrid('footerData','set', { APPR_QTY 		: rowData.APPR_QTY.toFixed(2) });

                	$grid.jqGrid('footerData','set', { STOCK_QTY 		: rowData.STOCK_QTY.toFixed(2) });

                }
            }
        });
    }

    //상세 그리드 조회
    function fnListD(dataJson) {
        $obApprDetailInqDGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundApprovalDetailInquiry/listObApprDetailInqD",
            sortable		: true,
            rownumbers		: true,
            height			: '212',
            postData		: dataJson,
            rowClickFocus	: true,
            shrinkToFit		: false,
            domainId		: "OB_APPR_DETAIL_INQ_DETAIL_LIST",
            colModel		: [
				{ editable: false, name: "LOC_CD", 			width: "100px", align: "center", excel:true },
				{ editable: false, name: "PLT_ID", 			width: "100px", align: "center", excel:true },
                { editable: false, name: "ITEM_ST_CD", 		width: "100px", align: "center", hidden: true },
                { editable: false, name: "ITEM_ST",    		width: "100px", align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridItemStCd }
                },
				{ editable: false, name: "STOCK_QTY", 	width: "100px", align: "right",	formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "MAKE_YMD", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "MAKE_LOT",		width: "100px", align: "center", excel:true },
                { editable: false, name: "DIST_EXPIRY_YMD", width: "100px", align: "center", excel:true },
                { editable: false, name:'LOT_ATTR1',		width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridLotAttr1 }
                },
                { editable: false, name:'LOT_ATTR2',      	width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridLotAttr2 }
                },
                { editable: false, name: "LOT_ATTR3", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "LOT_ATTR4", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "LOT_ATTR5", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "AGING_YN", 		width: "100px", align: "center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridLotAttr2 }
                },
            ],
//            groupHeaders: [{
//                rowspan	: true,
//                header	: [
//                    { start: 'PLAN_TOT_QTY', length: 3, domain: "PLAN_QTY" }
//                ]
//            }],
            pager		: "#obApprDetailInqDGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function() {
            	// 그리드 데이터의 ID 가져오기
            	var ids = $obApprDetailInqDGrid.jqGrid('getDataIDs');

            	 //그리드 아래 부분 합계
            	var $footRow = $obApprDetailInqDGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['LOC_CD', 'PLT_ID'];
                //페이지 첫 로딩시 상세그리드를 초기화, 2번째부터는 조회만.
            	if(firstLoadD){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'DGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'DGrid_ITEM_ST"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

                    firstLoadD = false;
            	}

            	fnTotalDSum($obApprDetailInqDGrid);
            },
        });
    }

    //전체  디테일 합계 조회
    function fnTotalDSum($grid){
        $.ajax({
            url 		: "/ctrl/outbound/outboundApprovalDetailInquiry/listObApprDetailInqDSum",
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

                	$grid.jqGrid('footerData','set', { STOCK_QTY 		: rowData.STOCK_QTY.toFixed(2) });

                }
            }
        });
    }

    //그리드 조회
    function fnSearch() {
        if($("#obApprDetailInqClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obApprDetailInqClientCd").focus();
            return false;
        }else if($("#obApprDetailInqClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obApprDetailInqClientCd").focus();
            return false;
        }
        if($("#obApprDetailInqObYmdFr").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obApprDetailInqObYmdFr").focus();
            return false;
        }
        if($("#obApprDetailInqObYmdTo").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obApprDetailInqObYmdTo").focus();
            return false;
        }
        $obApprDetailInqHGrid.paragonGridSearch(sendData());

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
    ObApprDetailInqApp.init();
});
