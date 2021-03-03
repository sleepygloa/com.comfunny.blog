/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : AreaPopup관리
 * Program Code     : PWMMS103E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 23.        First Draft.
 */
var InboundPlanItemPopApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    // [El]프로그램 그리드
    var $inboundPlanItemPopGrid = $("#inboundPlanItemPopGrid");
    var $inboundPlanItemPop = $("#inboundPlanItemPop");
    var $callBackInput;

    var getData = $("#inboundPlanItemPop").PopAppGetData();

    return {
        init: function () {
            //해당 부모 화면 데이터 세팅.
            newtingOptions();
            //존관리 Grid생성
            fnListInboundPlanItemPop();
            //존관리 Event
            fnInboundPlanItemEvents();
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };


    //[Fn] 이벤트
    function fnInboundPlanItemEvents(){

    	//고객사 입력
    	if(getData != undefined){
    		if(getData.clientCd != undefined){
    			$('#inPlanClientCdP').val(getData.clientCd);
    		}
    	}

        //검색버튼
        $("#inPlanItemSearchPopBtn").click(function(){
            fnSearch();
        });

        $("#inPlanItemConfirmPopBtn").click(function(){
            fnConfirm($inboundPlanItemPopGrid.getGridParam("selrow"));
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //그리드 수정 여부 체크
        var data = {
                clientCd : $("#inPlanClientCdP").val(),
                itemCd : $("#inPlanItemCdP").val(),
                itemNm : $("#inPlanItemNmP").val()
        };
        $inboundPlanItemPopGrid.paragonGridSearch(data);
    }

    /********************************************************************
     * AreaPopup 그리드 생성
     * Since   : 2017-02-23
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    //[Fn] jqgrid Area 목록
    function fnListInboundPlanItemPop(){
        $inboundPlanItemPopGrid.paragonGrid({
            url				: '/ctrl/inbound/inboundPlan/listInboundPlanItemInfo',
            rowEditable		: true,
            sortable		: true,
            rownumbers		: true,
            postData 		: {
            	clientCd 	: $("#inPlanClientCdP").val(),
            	itemCd 		: $("#inPlanItemCdP").val()
            },
            rowClickFocus	: true,
            height			: '300',
            width			: '300',
            colModel		: [
                {name:'ITEM_CD', 				width:"100px", align:"center", disabled:true},
                {name:'ITEM_NM', 				width:"200px", align:"left",disabled:true},
                {name:'ITEM_SPEC', 				width:"100px", align:"center",disabled:true},
//                {name:'ITEM_ST_CD', width:"100px", disabled:true},
                {name:'CONV_UOM_QTY', 			width:"100px", align:"center",disabled:true},
                {name:'CONV_UOM_CD', 			width:"100px", align:"center",disabled:true},
                {name:'PKQTYPLT', 				width:"100px", align:"center",hidden:true},
                {name:'WEIGHT', 				width:"100px", align:"center",disabled:true},
                {name:'LOCAL_EXPORT_GBN_CD', 	width:"100px", align:"center",hidden:true},
                {name:'PKQTY', 					width:"100px", align:"center",hidden:true},
            ],
            pager: "#inboundPlanItemPopGridNavi",
            domainId:"ITEM_LIST",
            ondblClickRow: function(id){
                fnConfirm(id);
            }
        });
    }

    function fnConfirm(rowid){
        var rowData = $inboundPlanItemPopGrid.getRowData( rowid );
        App.callBackCasting(rowData);
    	$inboundPlanItemPop.popupCallback(rowData);
        $("#inboundPlanItemPop").paragonClosePopup();

//        var iRow = $setItemPopGrid.getGridParam("selrow");
//        var rowData = $setItemPopGrid.getRowData( iRow );
//        App.callBackCasting(rowData);
//        $("#modalSetItemPopup").popupCallback(rowData);
//        $("#modalSetItemPopup").paragonClosePopup();
    }

    function newtingOptions(){
        var data = $("#inboundPlanItemPop").PopAppGetData().itemCd;
        $("#inPlanItemCdP").val(data);
    }
}();

$(document).ready(function() {
    InboundPlanItemPopApp.init();
});
