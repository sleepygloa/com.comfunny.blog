/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 물류센터 팝업[CommonDcPopApp]
 * Program Code     : PWMCM101Q_P1
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 21.        First Draft.
 */
var CommonDcPopApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    // [El]프로그램 그리드
    var $dcPopGrid = $("#dcPopGrid");

    return {
        init: function () {
            //물류센터관리 Grid생성
            fnListDcPop();
            //물류센터관리 Event
            fnDcEvents();
        }
    };


    //[Fn] 이벤트
    function fnDcEvents(){

        $("#dcCd").enterEvent({
            callBack:function(value){
                var data = {
                        dcCd : "",
                        dcNm : $("#dcNm").val()
                };
                $dcPopGrid.paragonGridSearch(data);
            }
        });

        //검색버튼
        $("#dcSearchPopBtn").click(function(){
            fnSearch();
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //그리드 수정 여부 체크
        var data = {
                dcCd : $("#dcCd").val(),
                dcNm : $("#dcNm").val()
        };
        $dcPopGrid.paragonGridSearch(data);
    }

    /********************************************************************
     * Zone 그리드 생성
     * Since   : 2017-02-21
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    //[Fn] jqgrid Area 목록
    function fnListDcPop(){
        $dcPopGrid.paragonGrid({
            url: '/ctrl/master/store/listDeliveryDcPopup',
            rowEditable:true,
            sortable: true,
            rownumbers: true,
            rowClickFocus:true,
            height:'300',
            width:'300',
            colModel:[
                {name:'DC_CD', width:"100px", disabled:true},
                {name:'DC_NM', width:"300px", disabled:true}
            ],
            pager: "#dcPopGridNavi",
            domainId:"DC_LIST",
            ondblClickRow: function(rowId){
                var rowid = $dcPopGrid.jqGrid('getGridParam', "selrow");
                var dcCd = $dcPopGrid.jqGrid('getRowData', rowid).DC_CD;
                var dcNm = $dcPopGrid.jqGrid('getRowData', rowid).DC_NM;
                fnDcPopup(dcCd);
                //fnDcPopup(dcCd, dcNm);
                $("#deliveryDcPopup").paragonClosePopup();
            }
        });
    }

}();

var fnDcPopup = function(dcCd) {

    this.document.getElementById("dcCode").value = dcCd;
    //this.document.getElementById("dcName").value = dcNm;
    console.log(this.document.getElementById($storeGrid))
}

$(document).ready(function() {
    CommonDcPopApp.init();
});
