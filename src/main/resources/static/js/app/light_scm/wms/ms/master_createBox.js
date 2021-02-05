/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 박스ID-일괄생성[createBoxApp]
 * Program Code     : PWMMS114E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 3. 09.  		First Draft.
 */

var createBoxApp = function() {
    "use strict";
    /************************************************
    *전역 객체 선언부 (return 상위부분에 선언해야함)
    ************************************************/
    var $boxGrid = $("#masterBoxIdGrid");
    var specCdComboJson;
    var $callBackInput;

    return {
        init: function(){
            //********** 1.About Event List Function. **********
            createBoxEvent();
            //********** Function Event Method Space.*********
            //fnListSpecCdJson();
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    //********** 1.About Event List Function. **********
    function createBoxEvent(){
        $("#createBoxBtnPop").click(function(){
            fnCreateBoxDataSave();
        });
        //규격 팝업 버튼
        $("#specCdPopBox").click(function(){
            $("#createSpecTypeCdBox").val('2');
            fnModalGrid();
        });
    }

    //********** Function Event Method Space.*********
    //[Fn] Get Spec Info List.
    function fnListSpecCdJson(){
        $.ajax({
            url: "/ctrl/master/boxId/getSpecInfoList",
            type: "POST",
            dataType: "json",
            cache: false,
            success: function(result) {

            }
        });
    }
    //[Fn] Save Spec Data.
    function fnCreateBoxDataSave(){
        var saveUrl = "/ctrl/master/boxId/createBoxSaveSentence";
        var msg = "MSG_MST_CFM_001"; //박스ID를 일괄생성 하시겠습니까?

        var createBoxInfoData = {
            boxCnt: $("#createBoxCntPop").val(),
            boxNm:  $("#createBoxNmPop").val(),
            specCd: $("#textSpecCdBox").val()
        };

        var jsonData = JSON.stringify(createBoxInfoData);

        if(!fnValidate(jsonData)) return;

        fnAjaxSave(jsonData, saveUrl, msg);

    }
    //[Fn] 저장 ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg) {

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        App.prcsStart();
        $.ajax({
            url: saveUrl,
            data: jsonData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                App.prcsEnd();
                // console.log(data);

                if (data.stsCd == "001") {
                    //001 데이터 성공
                    alert(data.msgTxt);
                    fnReloadGrid();
                }

                if (data.stsCd == "002") {
                    //TODO: 재정의 필요.
                    // console.log(data);
                }

            }
        });
    }
    //[Fn] Reload Grid Method
    function fnReloadGrid() {
        $("#createBoxNum").paragonClosePopup();
        $boxGrid.paragonGridReload();
    }
    //[Fn] Popup Grid.
    function fnModalGrid(){
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/specPop',
            id : 'modalSpecPopup',
            width : '550',
            btnName : "수정",
            //title : "규격 검색",
            domainId: "SPEC_LIST",
            onload : function(modal) {
                var callBack ={
                    "SPEC_CD": "textSpecCdBox",
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }
    //[Fn] Checking data for validation.
    function fnValidate(jsonData){
        //validation
        if($("#createBoxCntPop").val().length == 0){//박스갯수 검사
            Util.alert('MSG_MST_VAL_060'); //박스갯수 항목은 필수 입력입니다.
            $("#createBoxCntPop").focus();
            return false;
        }else if($("#createBoxCntPop").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_061'); //박스갯수는 공백만으로 입력 할 수 없습니다.
            $("#createBoxCntPop").focus();
            return false;
        }
        return true;
    }
    //***********Radio, Select Box Method.**************
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
    function fnCreateUseYnSelectBoxElement(value, editOptions) {
        if (value === ""){
            value = "Y";
        }
        var div = $("<div/>");
        var select = $("<select/>");
        for (var i = 0; i < specCdComboJson.length; i++) {
            var thisValue = specCdComboJson[i].VALUE;
            var thisName = specCdComboJson[i].NAME;
            var option = $("<option>", {
                value: thisValue,
                selected: value == thisValue
            });
            option.text(thisName);
            select.append(option);
        }
        div.append(select);
            return div;
    }

}();

$(document).ready(function() {
     createBoxApp.init();
});
