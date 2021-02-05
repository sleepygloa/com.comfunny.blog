/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 권역검색 팝업[MasterDomainPopApp]
 * Program Code     : PWMCM116Q_P1
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 23.        First Draft.
 */
var MasterDomainPopApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    var $domainPopGrid = $("#domainPopGrid");

    var domainGroupComboJson;

    var $callBackInput;

    var dcCd = App.getCallBackEl().val();

    return {
        init: function () {
            fnListDomainGroupJson("DOMAIN_GROUP_CD");
            //존관리 Grid생성
            fnListDomainPop();

            //존관리 Event
            fnDomainEvents();

        },
        callBackInput: function () {
            return $callBackInput;
        }
    };


    //[Fn] 이벤트
    function fnDomainEvents (){

        //검색버튼
        $("#domainSearchPopBtn").click(function(){
            fnSearch();
        });

        $("#dcCd").attr("disabled", true);

        $("#dcCd").val(dcCd);
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //그리드 수정 여부 체크
        var data = {
                dcCd : $("#dcCd").val(),
                domainCd : $("#domainCdP").val(),
                domainDetailNm : $("#domainDetailNmP").val()
        };
        $domainPopGrid.paragonGridSearch(data);
    }

    //[Fn] 권역그룹코드 콤보박스 JSON 조회
    function fnListDomainGroupJson(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            success : function(result) {
                domainGroupComboJson = result;
            }
        });
    }

    /********************************************************************
     * DomainPopup 그리드 생성
     * Since   : 2017-02-23
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    function fnListDomainPop(){
        $domainPopGrid.paragonGrid({
            url: '/ctrl/common/listDomainPop',
            rowEditable:true,
            sortable: true,
            rownumbers: true,
            rowClickFocus:true,
            height:'300',
            width:'300',
            postData:{dcCd:dcCd},
            colModel:[
                {name:'DOMAIN_CD', width:"100px", disabled:true},
                {name:'DOMAIN_DETAIL_NM', width:"200px", disabled:true},
                {
                    editable: true,
                    align:"center",
                    name:'DOMAIN_GROUP_CD',
                    width:"100px",
                    edittype: "custom",
                    editoptions: {
                        custom_value: fnGetSelectBoxElValue,
                        custom_element: fnDomainGroupSelectBoxElement
                    },
                    disabled:true

                },
                {name:'DOMAIN_PRIOORD', width:"100px", disabled:true}
            ],
            pager: "#domainPopGridNavi",
            caption: "Domain",
            ondblClickRow: function(id, iRow, iCol, e){
            var doCd = $domainPopGrid.getRowData( iRow ).DOMAIN_CD;

                fnConfirm();
            }
        });
    }

    function fnConfirm(){
        var rowid = $domainPopGrid.getGridParam("selrow");
        App.callBackCasting($domainPopGrid.getRowData( rowid ));
        $("#modalDomainPopup").paragonClosePopup();

    }

    //[Fn]  SELECT박스 값 get/set
    function fnGetSelectBoxElValue(elem, oper, value) {
        if (oper === "set") {
            var selectBox = $(elem).find("select:option[value='" + value + "']");
            if (selectBox.length > 0) {
                selectBox.prop("selected", true);
            }
        }
        if (oper === "get") {
            return $(elem).find("select").val();
        }
    }

    //[Fn]  SELECT박스 Ui 생성
    function fnDomainGroupSelectBoxElement(value, editOptions) {
        if(value == ""){
            value = "Y";
        }
        var div =$("<div/>");
        var select =$("<select/>");
        for (var i = 0; i < domainGroupComboJson.length; i++) {
            var thisValue = domainGroupComboJson[i].VALUE;
            var thisName = domainGroupComboJson[i].NAME;
            var option = $("<option>", {value: thisValue , selected: value == thisValue });
            option.text(thisName)
            select.append(option);
        }
        div.append(select);
        return div;
    }
    //[Fn]  SELECT박스 Option 생성
    function fnCreateOptionBoxToTarget(El) {
        for (var i = 0; i < domainGroupComboJson.length; i++) {
            var thisValue = domainGroupComboJson[i].VALUE;
            var thisName = domainGroupComboJson[i].NAME;
            var option = $("<option>", {value: thisValue});
            option.text(thisName)
            El.append(option);
        }
    }
}();

$(document).ready(function() {
    MasterDomainPopApp.init();
});
