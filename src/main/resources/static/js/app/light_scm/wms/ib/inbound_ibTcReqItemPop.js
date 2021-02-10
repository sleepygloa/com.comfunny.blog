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
var InboundTcReqItemPopApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    // [El]프로그램 그리드
    var $ibTcReqItemPopGrid = $("#ibTcReqItemPopGrid");
    var $callBackInput;
    var itemStatusCombo;

    return {
        init: function () {
            fnListItemStatus("ITEM_ST_CD");

            fnListIbTcReqItemPop();

            fnIbTcReqItemEvents();
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };


    //[Fn] 이벤트
    function fnIbTcReqItemEvents(){

        //검색버튼
        $("#ibTcReqItemSearchPopBtn").click(function(){
            fnSearch();
        });

        $("#ibTcReqItemConfirmPopBtn").click(function(){
            fnConfirm();
        });
    }

    function fnListItemStatus(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                itemStatusCombo = Util.MakeGridOptions(result);
            }
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //그리드 수정 여부 체크
        var data = {
                itemCd : $("#ibTcReqItemCdP").val(),
                itemNm : $("#inTcReqItemNmP").val()
        };
        $ibTcReqItemPopGrid.paragonGridSearch(data);
    }

    /********************************************************************
     * 그리드 생성
     * Since   : 2017-02-23
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    //[Fn] jqgrid 목록
    function fnListIbTcReqItemPop(){
        $ibTcReqItemPopGrid.paragonGrid({
            url: '/ctrl/inbound/inboundTcReq/listIbTcReqItemInfo',
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            rowClickFocus:true,
            height:'300',
            width:'300',
            colModel:[
                {name:'ITEM_CD', width:"100px", disabled:true, align:"center"},
                {name:'ITEM_NM', width:"200px", disabled:true, align:"left"},
                {name:'ITEM_SPEC', width:"100px", disabled:true, align:"center"},
                {name:'ITEM_ST_CD', width:"100px", disabled:true, align:"center",
                    fixed :true,
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:itemStatusCombo
                    }
                },
                {name:'PKQTY', width:"100px", disabled:true, align:"center"},
                {name:'UOM', width:"100px", disabled:true, align:"center"},
                {name:'STOCK_QTY', width:"100px", disabled:true, align:"right", formatter:"integer"},
                {name:'STOCK_BOX_QTY', width:"100px", disabled:true, align:"right", formatter:"integer"},
                {name:'STOCK_EA_QTY', width:"100px", disabled:true, align:"right", formatter:"integer"},
                {name:'HIGHRK_DC_CD', width:"100px", disabled:true, align:"center"}
            ],
            pager: "#ibTcReqItemPopGridNavi",
            domainId:"ITEM_LIST",
            ondblClickRow: function(){
                fnConfirm();
            }
        });
    }

    function fnConfirm(){
        var iRow = $ibTcReqItemPopGrid.getGridParam("selrow");
        var rowData = $ibTcReqItemPopGrid.getRowData( iRow );
        App.callBackCasting(rowData);
        $("#inboundTcReqItemPop").popupCallback(rowData);
        $("#inboundTcReqItemPop").paragonClosePopup();

//        var rowid = $ibTcReqItemPopGrid.getGridParam("selrow");
//        App.callBackCasting($ibTcReqItemPopGrid.getRowData( rowid ));
//        $("#inboundTcReqItemPop").paragonClosePopup();
    }
}();

$(document).ready(function() {
    InboundTcReqItemPopApp.init();
});
