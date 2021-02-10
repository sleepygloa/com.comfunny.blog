/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 고객사검색 팝업[masterClientPopApp]
 * Program Code     : PWMCM105Q_P1
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 21.        First Draft.
 */
var masterClientPopApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    // [El]프로그램 그리드
    var $clientPopGrid = $("#clientPopGrid");

    return {
        init: function () {
            //존관리 Grid생성
            fnListClientPop();
            //존관리 Event
            fnClientEvents();
        }
    };


    //[Fn] 이벤트
    function fnClientEvents(){

        $("#clientCd").enterEvent({
            callBack:function(value){
                var data = {
                        clientCd : "",
                        clientNm : $("#clientNm").val()
                };
                $clientPopGrid.paragonGridSearch(data);
            }
        });

        //검색버튼
        $("#clientSearchPopBtn").click(function(){
            fnSearch();
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //그리드 수정 여부 체크
        var data = {
                clientCd : $("#clientCd").val(),
                clientNm : $("#clientNm").val()
        };
        $clientPopGrid.paragonGridSearch(data);
    }

    /********************************************************************
     * 고객사 팝업 그리드 생성
     * Since   : 2017-02-28
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    //[Fn] jqgrid Area 목록
    function fnListClientPop(){
        $clientPopGrid.paragonGrid({
            url: '/ctrl/master/supplier/listClientPopup',
            rowEditable:true,
            sortable: true,
            rownumbers: true,
            height:'300',
            width:'300',
            rowClickFocus:true,
            colModel:[
                {name:'CLIENT_CD', width:"100px", disabled:true},
                {name:'CLIENT_NM', width:"300px", disabled:true}
            ],
            pager: "#clientPopGridNavi",
            domainId:"PWMCM105Q_P1",
            ondblClickRow: function(rowId){
                var rowid = $clientPopGrid.jqGrid('getGridParam', "selrow");
                var clientCd = $clientPopGrid.jqGrid('getRowData', rowid).CLIENT_CD;
                var clientNm = $clientPopGrid.jqGrid('getRowData', rowid).CLIENT_NM;
                fnClientPopup(clientCd, clientNm);
                $("#clientPopup").paragonClosePopup();
            }
        });
    }

}();

var fnClientPopup = function(clCd, clNm) {

    this.document.getElementById("clientCdP").value = clCd;
    this.document.getElementById("clientNmP").value = clNm;
}

$(document).ready(function() {
    masterClientPopApp.init();
});
