/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고진행조회[MasterAreaApp]
 * Program Code     : PWMIB110Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho      2017. 09. 04.       First Draft.
 */

var IbProgressInquiryApp = function () {
    "use strict";

	// 프로그램 코드, 명
	// var proCd = $('a[class="active"]').data('procd');
	var proCd = 'PWMIB110Q';
	var proNm = 'ibProgInquiry';

    // [El]프로그램 그리드
    var $ibProgInquiryHGrid = $("#ibProgInquiryHeaderGrid");

    var ibProgStComboJson;
    var ibGbnComboJson;

    var firstLoad = true;

    var lineChart;//차트

    return {
        init: function () {

        	ibProgStComboJson 	= WMSUtil.fnCombo.grid('IB_PROG_ST_CD');

            ibGbnComboJson 		= WMSUtil.fnCombo.grid_selectBox('ibProgInquiryIbGbnCd', 'IB_GBN_CD');

            fnEvents();

            fnList();
        }
    };

    //[Fn] 이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('ibProgInquiryYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');

        //검색버튼
        $("#ibProgInquirySearchBtn").click(function(){
            fnSearch();
        });

        //엑셀버튼
        $("#ibProgInquiryExcelBtn").click(function(){
            $ibProgInquiryHGrid.downloadExcelAllItems();
        });

        //고객사
        $("#ibProgInquiryClientPopup").click(function(){
            WMSUtil.popup.client('ibProgInquiryClient');
        });
        //고객사이름
        $("#ibProgInquiryClientNm").attr("disabled", true);

    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //validation
        if($("#ibProgInquiryClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibProgInquiryClientCd").focus();
            return false;
        }else if($("#ibProgInquiryClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibProgInquiryClientCd").focus();
            return false;
        }
        if($("#ibProgInquiryYmdFr").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#ibProgInquiryYmdFr").focus();
            return false;
        }else if($("#ibProgInquiryYmdFr").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#ibProgInquiryYmdFr").focus();
            return false;
        }
        if($("#ibProgInquiryYmdTo").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#ibProgInquiryYmdTo").focus();
            return false;
        }else if($("#ibProgInquiryYmdTo").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#ibProgInquiryYmdTo").focus();
            return false;
        }

        $ibProgInquiryHGrid.paragonGridSearch(sendData());
    }

    function sendData(){
    	return {
            clientCd    : $.trim($("#ibProgInquiryClientCd").val()),
            ibGbnCd     : $.trim($("#ibProgInquiryIbGbnCd").val()),
            ymdFr       : WMSUtil.fnDateSetting.yyyymmdd($("#ibProgInquiryYmdFr").val()),
            ymdTo       : WMSUtil.fnDateSetting.yyyymmdd($("#ibProgInquiryYmdTo").val()),
            labels		: []
    	}
    }

    //그리드 조회
    function fnList(){
        $ibProgInquiryHGrid.paragonGrid({
            url         : '/ctrl/inbound/inboundProgressInquiry/listIbProgInqH',
            sortable    : true,
//            rownumbers  : true,
            height      : '225',
            shrinkToFit : false,
            postData    : sendData(),
            colModel:[
                {editable: false, name:'IB_PROG_ST', 	width:"360px", align:"center", excel:true   },
                {editable: false, name:'PO_CNT', 		width:"310px", align:"center", 	formatter:"integer",	excelDataType : "integer", excel:true},
                {editable: false, name:'SUPPLIER_CNT', 	width:"310px", align:"center", 	formatter:"integer",	excelDataType : "integer", excel:true},
                {editable: false, name:'ITEM_CNT', 		width:"310px", align:"center", 	formatter:"integer",	excelDataType : "integer", excel:true},
                {editable: false, name:'TOT_BOX_QTY', 	width:"310px", align:"center", 	formatter:"integer",	excelDataType : "integer", excel:true}
            ],
            domainId		: "IB_LIST",
            rowClickFocus	: true,
            gridComplete : function(){
            	fnChart();
            }
        });
    }

    function fnChart(){
        var outputData = null;
        var ctx = null;

        $.ajax({
            url         : "/ctrl/inbound/inboundProgressInquiry/listIbProgInqH",
            data        : sendData(),
            type        : "POST",
            cache       : false,
            success 	: function(result) {
                var dt_grid = result.dt_grid;

                //Null Check
                if(dt_grid.length != 0){

                	//Init Variable
                    var columnCount = Object.keys(dt_grid).length;//코드와 명을 제외한 개수
                    var rowCount = dt_grid.length;
                    var labels = [];

                    //Chart DataSet
                    var arrayData 			= new Array(columnCount);

                    var poCntArray 			= new Array(rowCount);
                    var supplierCntArray 	= new Array(rowCount);
                    var itemCntArray 		= new Array(rowCount);
                    var totalBoxQtyArray 	= new Array(rowCount);

                    //Elements Set
                    ctx = document.getElementById('ibProgInquiryChart').getContext('2d');

                    for(var i = 0 ; i < dt_grid.length ; i++){
                        poCntArray[i] 		= dt_grid[i].PO_CNT;
                        supplierCntArray[i] = dt_grid[i].SUPPLIER_CNT;
                        itemCntArray[i] 	= dt_grid[i].ITEM_CNT;
                        totalBoxQtyArray[i] = dt_grid[i].TOT_BOX_QTY;
                        labels.push(dt_grid[i].IB_PROG_ST);
                    }

                    arrayData[0] = poCntArray;
                    arrayData[1] = supplierCntArray;
                    arrayData[2] = itemCntArray;
                    arrayData[3] = totalBoxQtyArray;

                    //Validation
                    //label 유효성검사, 빈값일 시, 기본값 지정.
                    var poCnt = '발주건수';
                    var supplierCnt = '구매처수';
                    var itemCnt = '제품수';
                    var totCnt = '총수량';

                    if(result.PO_CNT != undefined){
                    	poCnt = result.PO_CNT;
                    }
                    if(result.SUPPLIER_CNT != undefined){
                    	supplierCnt = result.SUPPLIER_CNT;
                    }
                    if(result.ITEM_CNT != undefined){
                    	itemCnt = result.ITEM_CNT;
                    }
                    if(result.TOT_BOX_QTY != undefined){
                    	totCnt = result.TOT_BOX_QTY;
                    }

                    //Drawing Chart
                    //chart.js 2.7.3
                    if(lineChart != null){
                        lineChart.destroy();
                    }
                    lineChart = new Chart(ctx, {
                        type	: 'bar',
                        data	: {
                            labels : labels,
                            datasets : [
    		                    {
    		                        label					: poCnt,
    		                        backgroundColor			: 'rgba(52,143,226,0.2)',
    		                        data 					: arrayData[0]
    		                    },
    		                    {
    		                        label					: supplierCnt,
    		                        backgroundColor			: 'rgba(152,143,226,0.2)',
    		                        data 					: arrayData[1]
    		                    },
    		                    {
    		                        label					: itemCnt,
    		                        backgroundColor			: 'rgba(180,143,226,0.2)',
    		                        data 					: arrayData[2]
    		                    },
    		                    {
    		                        label					: totCnt,
    		                        backgroundColor			: 'rgba(240,143,226,0.2)',
    		                        data 					: arrayData[3]
    		                    }
                            ]
                        },
                        options: {
                            tooltips: {
                                callbacks: {
                                      label: function(item, data) {
                                  		var datasetLabel = data.datasets[item.datasetIndex].label || '';

    	                          		var itemXLabel = data.datasets[item.datasetIndex].data[item.index];
    	                                  if(parseInt(itemXLabel) > 999){
    	                                  	itemXLabel =  itemXLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	                                  } else if (parseInt(itemXLabel) < -999) {
    	                                  	itemXLabel =  '-' + Math.abs(itemXLabel).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    	                                  } else {
    	                                  }

    	                          		return datasetLabel + ': ' + itemXLabel;
                                      }
                                }
                            },
                            scales: { //X,Y축 옵션
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true,  //Y축의 값이 0부터 시작
        	                            callback: function(value, index, values) {
        	                                if(parseInt(value) > 999){
        	                                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        	                                } else if (parseInt(value) < -999) {
        	                                    return '-' + Math.abs(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        	                                } else {
        	                                    return value;
        	                                }
        	                            }
                                    }
                                }]
                            },
                        }
                    })

                    //chart.js 1.0.1 기존
//                    fnDrawBarChart(ctx, {
//                        labels : labels,
//                        datasets : [
//		                    {
//		                        label					: '발주건수',
//		                        fillColor 				: 'rgba(52,143,226,0.2)',
//		                        strokeColor 			: 'rgba(52,143,226,1)',
//		                        pointColor 				: 'rgba(52,143,226,1)',
//		                        pointStrokeColor 		: '#fff',
//		                        pointHighlightFill 		: '#fff',
//		                        pointHighlightStroke 	: 'rgba(52,143,226,1)',
//		                        data 					: arrayData[0]
//		                    },
//		                    {
//		                        label					: '구매처수',
//		                        fillColor 				: 'rgba(152,143,226,0.2)',
//		                        strokeColor				: 'rgba(152,143,226,1)',
//		                        pointColor 				: 'rgba(152,143,226,1)',
//		                        pointStrokeColor 		: '#fff',
//		                        pointHighlightFill 		: '#fff',
//		                        pointHighlightStroke	: 'rgba(152,143,226,1)',
//		                        data 					: arrayData[1]
//		                    },
//		                    {
//		                        label					: '제품수',
//		                        fillColor 				: 'rgba(180,143,226,0.2)',
//		                        strokeColor 			: 'rgba(180,143,226,1)',
//		                        pointColor 				: 'rgba(180,143,226,1)',
//		                        pointStrokeColor 		: '#fff',
//		                        pointHighlightFill 		: '#fff',
//		                        pointHighlightStroke 	: 'rgba(180,143,226,1)',
//		                        data 					: arrayData[2]
//		                    },
//		                    {
//		                        label					: '총수량',
//		                        fillColor 				: 'rgba(240,143,226,0.2)',
//		                        strokeColor 			: 'rgba(240,143,226,1)',
//		                        pointColor 				: 'rgba(240,143,226,1)',
//		                        pointStrokeColor 		: '#fff',
//		                        pointHighlightFill 		: '#fff',
//		                        pointHighlightStroke 	: 'rgba(240,143,226,1)',
//		                        data 					: arrayData[3]
//		                    }
//                        ]
//                    });
                }else{
                	fnDrawBarChart(ctx, outputData);
                }
            }
        });
    }

    function fnDrawBarChart(ctx, lineChartData){
        if(lineChart != null){
            lineChart.destroy();
        }
        lineChart = new Chart(ctx).Bar(lineChartData);
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
    IbProgressInquiryApp.init();
});


