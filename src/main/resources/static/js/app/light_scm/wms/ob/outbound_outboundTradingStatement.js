/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고조회(거래명세표용)[ObTradingStatementApp]
 * Program Code     : PWMOB115Q
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho		2018. 04. 04.  		First Draft.
 */

var ObTradingStatementApp = function() {
    "use strict";
    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/
    var $obTradingStatementGrid = $("#obTradingStatementGrid");

    return {
        init: function() {

            toDateSetEvent();

            outBoundTradingStatementEvent();

            obTradingStatementGrid();

        }
    };

    //********** 1.Create Grid List **********
    function obTradingStatementGrid() {
        $obTradingStatementGrid.paragonGrid({
            url             : "/ctrl/outbound/outboundTradingStatement/getObTradingStatementList",
            sortable        : true,
            rownumbers      : true,
            height          : "649",
            shrinkToFit     : false,
            rowClickFocus   : true,
            rowNum : 50000,
            postData: {
                clientCd    : $("#obTradingStatementClientCd").val(), //고객사
                obYmd       : $("#obTradingStatementYmd").val()
            },
            colModel: [
                { editable: false, name: "DELIVERY_NO" , align: "center" },
                { editable: false, name: "REQUEST_YMD", align: "center" },
                { editable: false, name: "ORDER_NO", align: "center" },
                { editable: false, name: "OB_STOP_YN", align: "center" },
                { editable: false, name: "OB_YMD", align: "center" },
                { editable: false, name: "OB_NO", align: "center" },
                { editable: false, name: "OB_INVO_NO", align: "center" },
                { editable: false, name: "ORDER_YMD", align: "center" },
                { editable: false, name: "OB_SALES_ID", align: "center" },
                { editable: false, name: "OB_SALES_NM", align: "center" },
                { editable: false, name: "OB_DIVISION_CD", align: "center" },
                { editable: false, name: "OB_GROUP_CD", align: "center" },
                { editable: false, name: "OB_STORE_BIZITEM", align: "center" },
                { editable: false, name: "OB_RSTORE_BIZITEM", align: "center" },
                { editable: false, name: "OB_SGROUP_CD", align: "center" },
                { editable: false, name: "OB_SGROUP_NM", align: "center" },
                { editable: false, name: "STORE_CD", align: "center" },
                { editable: false, name: "OB_STORE_NM", align: "center" },
                { editable: false, name: "RSTORE_CD", align: "center" },
                { editable: false, name: "OB_RSTORE_NM", align: "center" },
                { editable: false, name: "OB_CEO_NM", align: "center" },
                { editable: false, name: "OB_BIZ_NO", align: "center" },
                { editable: false, name: "OB_STORE_ADDR1", align: "center" },
                { editable: false, name: "OB_STORE_ADDR2", align: "center" },
                { editable: false, name: "OB_STORE_ADDR3", align: "center" },
                { editable: false, name: "OB_STORE_ADDR4", align: "center" },
                { editable: false, name: "OB_AREA_NM", align: "center" },
                { editable: false, name: "OB_CITY_NM", align: "center" },
                { editable: false, name: "OB_POST_NO", align: "center" },
                { editable: false, name: "OB_STORE_TEL1", align: "center" },
                { editable: false, name: "OB_STORE_TEL2", align: "center" },
                { editable: false, name: "OB_STORE_TEL3", align: "center" },
                { editable: false, name: "OB_ITEM_TYPE", align: "center" },
                { editable: false, name: "OB_ITEM_CD", align: "center" },
                { editable: false, name: "OB_ITEM_NM", align: "center" },
                { editable: false, name: "OB_WEIGHT", align: "center" , formatter:"integer"},
                { editable: false, name: "ORDER_QTY", align: "center" },
                { editable: false, name: "END_DELIVERY_QTY", align: "center" },
                { editable: false, name: "REMAIN_DELIVERY_QTY", align: "center" },
                { editable: false, name: "DELIVERY_QTY", align: "center" },
                { editable: false, name: "UOM", align: "center" },
                { editable: false, name: "OB_AMT", align: "center" },
                { editable: false, name: "REMARK2", align: "center" },
                { editable: false, name: "OB_ERP_NO", align: "center" },
                { editable: false, name: "LINE_NO", align: "center" },
                { editable: false, name: "OB_COST", align: "center" },
                { editable: false, name: "OB_RECV_NM", align: "center" },
                { editable: false, name: "OB_RECV_TEL", align: "center" },
                { editable: false, name: "OB_RSTORE_ADDR1", align: "center" },
                { editable: false, name: "OB_RSTORE_ADDR2", align: "center" },
                { editable: false, name: "OB_TERMS", align: "center" },
                { editable: false, name: "OB_OPT_ZERO", align: "center" },
                { editable: false, name: "OB_BIZ_NO2", align: "center" },
                { editable: false, name: "OB_ITEM_INS", align: "center" },
                { editable: false, name: "OB_PRINT_TYPE", align: "center" },
                { editable: false, name: "OB_BANK_NM", align: "center" },
                { editable: false, name: "OB_ACC_NO", align: "center" },
                { editable: false, name: "OB_RECEP_ID", align: "center" },
                { editable: false, name: "OB_RSTORE_NM2", align: "center" },
                { editable: false, name: "OB_RSTORE_TEL", align: "center" },
            ],
            domainId:"PWMOB115Q"
        });
    }

    //********** 2.About Event List Function. **********
    function outBoundTradingStatementEvent() {

        //코드 입력시 명 서치
        addClientCdChangeEvent("obTradingStatementClient", []);          //고객사

        //검색 버튼 이벤트
        $("#searchObTradingStatementBtn").click(function() {
            fnSearch();
        });

        //엑셀버튼
        $("#exceObTradingStatementBtn").click(function(){
            $obTradingStatementGrid.downloadExcel();
        });

        //Popup Event.
        $("#obTradingStatementClientPopup").click(function() {
            fnClientPop(); //고객사 팝업
        });

        //고객사명 이벤트
        $("#obTradingStatementClientNm").attr("disabled", true);
    }

    // 검색 버튼 이벤트
    //datepicker Set up today.
    function toDateSetEvent() {
        $("#obTradingStatementYmdS").datepicker("setDate", new Date());
    }
    //********** 4.Pop Up **********
    //[Fn] 고객사 PopUP
    function fnClientPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl: "/ctrl/common/clientPopup",
            id: "modalClientPopup",
            width: "550",
            btnName: "수정",
            domainId: "PWMCM105Q_P1",
            onload: function(modal) {
                // 팝업화면 클릭 시 code, name.
                var callBack = {
                    "CLIENT_CD": "obTradingStatementClientCd", // "", "text box id"
                    "CLIENT_NM": "obTradingStatementClientNm"
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }

    //검색
    function fnSearch(){

        if($("#obTradingStatementClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obTradingStatementClientCd").focus();
            return false;
        }else if($("#obTradingStatementClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obTradingStatementClientCd").focus();
            return false;
        }

        if($("#obTradingStatementYmd").val().length == 0){//출고일자
            Util.alert('MSG_COM_VAL_001', fnFindTabsSpanText($obTradingStatementGrid, 'OB_PLAN_YMD')); //{0} 항목은 필수 입력입니다.
            $("#obTradingStatementYmd").focus();
            return false;
        }else if($("#obTradingStatementYmd").val().trim().length == 0){
            Util.alert('MSG_COM_VAL_059', fnFindTabsSpanText($obTradingStatementGrid, 'OB_PLAN_YMD')); //{0}은(는) 공백만으로 입력할 수 없습니다.
            $("#obTradingStatementYmd").focus();
            return false;
        }

        var data = {
                clientCd    :   $('#obTradingStatementClientCd').val(),
                obYmd       :   $('#obTradingStatementYmd').val()
        };
        $obTradingStatementGrid.paragonGridSearch(data);

    }

}();

$("li.active").siblings().click(function () {
    // trigger the datepicker
    $('.date').datepicker('hide');
});
$("li.active").live("click focusout", function (e) {
    // trigger the datepicker
    $('.date').datepicker('hide');
});

$(document).ready(function() {
    ObTradingStatementApp.init();
});

