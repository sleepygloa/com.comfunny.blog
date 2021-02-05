/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고진행조회[OutBoundProgressInquiryApp]
 * Program Code     : PWMOB114Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho      2017. 09. 04.       First Draft.
 */

var OutBoundProgressInquiryApp = function() {
    "use strict";
    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/
    var $obProgInquiryGrid = $("#obProgInquiryGrid");

    var $callBackInput;

    var outBoundProgressInquiryFlag = true;

    var obGbnCdOptions;
    var gridobGbnCombo;

    var lineChart; //차트

    return {
        init: function() {

            obGbnCdOptions 	= WMSUtil.fnCombo.grid_selectBox('obProgInquiryObGbnCd', 'OB_GBN_CD');

            fnEvent();
            fnList();

            //fnObProgInquiryDetailChart();
        },
        callBackInput: function() {
            return $callBackInput;
        }
    };

    //********** 1.Create Grid List **********
    function fnList() {
        $obProgInquiryGrid.paragonGrid({
            url         : "/ctrl/outbound/outboundProgressInquiry/getOutBoundProgressInquiryList",
            sortable    : true,
            rownumbers  : true,
            height      : "223",
            multiselect : false,
            multielonly : false,
            shrinkToFit : false,
            postData    : sendData(),
            colModel: [
                { editable: false, name: "OB_PROG_ST", 	width: "350px", align: "center" , excel:true}, //출고진행상태
                { editable: false, name: "SO_CNT", 		width: "310px", align: "center" , 	formatter:"integer", excelDataType :"integer", excel:true}, //발주건수
                { editable: false, name: "STORE_CNT", 	width: "310px", align: "center" , 	formatter:"integer", excelDataType :"integer", excel:true}, //판매처수
                { editable: false, name: "ITEM_CNT", 	width: "310px", align: "center" , 	formatter:"integer", excelDataType :"integer", excel:true}, //제품수
                { editable: false, name: "TOT_BOX_QTY", width: "309px", align: "center" , 	formatter:"integer", excelDataType :"integer", excel:true}, //총수량(BOX)
            ],
            domainId    : "OB_LIST",
            rowClickFocus :true,
            gridComplete : function(){
            	fnChart();
            }
        });
    }

    function sendData(){
    	return {
            clientCd    : $.trim($("#obProgInquiryClientCd").val()),
            obGbnCd     : $.trim($("#obProgInquiryObGbnCd option:selected").val()),
            frObPlanYmd : WMSUtil.fnDateSetting.yyyymmdd($("#obProgInquiryYmdFr").val()),
            toObPlanYmd : WMSUtil.fnDateSetting.yyyymmdd($("#obProgInquiryYmdTo").val()),
            labels		: []
    	}
    }

    function fnChart(){
        var outputData = null;
        var ctx = null;
console.log('sendData', sendData());
        $.ajax({
            url         : "/ctrl/outbound/outboundProgressInquiry/getOutBoundProgressInquiryList",
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
                    ctx = document.getElementById('obProgInquiryChart').getContext('2d');

                    for(var i = 0 ; i < dt_grid.length ; i++){
                      /*poCntArray[i] 		= dt_grid[i].PO_CNT;
                        supplierCntArray[i] = dt_grid[i].SUPPLIER_CNT;
                        itemCntArray[i] 	= dt_grid[i].ITEM_CNT;*/
                        poCntArray[i] 		= dt_grid[i].SO_CNT;
                        supplierCntArray[i] = dt_grid[i].STORE_CNT;
                        itemCntArray[i] 	= dt_grid[i].ITEM_CNT;
                        totalBoxQtyArray[i] = dt_grid[i].TOT_BOX_QTY;
                        labels.push(dt_grid[i].OB_PROG_ST);
                    }

                    arrayData[0] = poCntArray;
                    arrayData[1] = supplierCntArray;
                    arrayData[2] = itemCntArray;
                    arrayData[3] = totalBoxQtyArray;

                    //Validation
                    //label 유효성검사, 빈값일 시, 기본값 지정.
                    var soCnt 	 = '발주건수';
                    var storeCnt = '구매처수';
                    var itemCnt  = '제품수';
                    var totCnt 	 = '총수량';

                    if(result.SO_CNT != undefined){
                    	soCnt = result.SO_CNT;
                    }
                    if(result.STORE_CNT != undefined){
                    	storeCnt = result.STORE_CNT;
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
    		                        label					: soCnt,
    		                        backgroundColor			: 'rgba(52,143,226,0.2)',
    		                        data 					: arrayData[0]
    		                    },
    		                    {
    		                        label					: storeCnt,
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


    //********** 2.About Event List Function. **********
    function fnEvent() {

    	WMSUtil.fnTagYmdSetting('obProgInquiryYmd', true, true);

        //코드 입력시 명 서치
        addClientCdChangeEvent("obProgInquiryClient", []);//고객사

        //검색 버튼 이벤트
        $("#obProgInquirySearchBtn").click(function() {
            fnSearch();
        });

        //엑셀버튼
        $("#obProgInquiryExcelBtn").click(function(){
            $obProgInquiryGrid.downloadExcelAllItems();
        });

        //Popup Event.
        $("#obProgInquiryClientPopup").click(function() {
            WMSUtil.popup.client('obProgInquiryClient');
        });

        //고객사명 이벤트
        $("#obProgInquiryClientNm").attr("disabled", true);
    }

    // 검색 버튼 이벤트
    function fnSearch() {
        $obProgInquiryGrid.paragonGridSearch(sendData());
        //fnObProgInquiryDetailChart();
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
    OutBoundProgressInquiryApp.init();
});

