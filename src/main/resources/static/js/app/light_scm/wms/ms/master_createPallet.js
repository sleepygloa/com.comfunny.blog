/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 파렛트ID-일괄생성[createPltApp]
 * Program Code     : PWMMS113E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 3. 09.  		First Draft.
 */

var createPltApp = function() {
    "use strict";

    /************************************************
    *전역 객체 선언부 (return 상위부분에 선언해야함)
    ************************************************/

    //select Box Data 생성.
    var $pltGrid = $("#masterPalletIdGrid");
    var $callBackInput;

    return {
      init: function() {
        //********** 1.About Event List Function. **********
        createPalletEvent();
        //********** Function Event Method Space.*********
        fnListSpecCdJson();
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };
    //********** 1.About Event List Function. **********
    function createPalletEvent(){
        //일괄생성 버튼
        $("#createPalletBtn").click(function(){
            fnCreatePalletDataSave();
        });
        //규격 팝업 버튼
        $("#specCdPop").click(function(){
            $("#createSpecTypeCdPlt").val('1');
            fnModalGrid();
        });
    }
    //********** Function Event Method Space.*********
    //[Fn] Get Spec Info List.
    function fnListSpecCdJson(){
        $.ajax({
            url: "/ctrl/master/palletId/getSpecInfoList",
            type: "POST",
            dataType: "json",
            cache: false,
            success: function(result) {
                console.log(result);
                //specCdComboJson = result;
                //Util.MakeSelectOptions($("#selectSpecCd"), result);
            }
        });
    }
    //[Fn] Save Spec Data.
    function fnCreatePalletDataSave(){

        var saveUrl = "/ctrl/master/palletId/createPalletSaveSentence";
        var msg = "MSG_MST_CFM_002"; //파레트ID를 일괄생성 하시겠습니까?

        var createPalletInfoData = {
            pltCnt: $("#createPltCntPop").val(),
            pltNm:  $("#createPltNmPop").val(),
            specCd: $("#textSpecCd").val()
        };

        var jsonData = JSON.stringify(createPalletInfoData);

        //Validation 추가.
        if(!fnValidate(jsonData)) return;

        fnAjaxSave(jsonData, saveUrl, msg);

    }
    //[Fn] 저장 ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg) {

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        //App.prcsStart();
        $.ajax({
            url: saveUrl,
            data: jsonData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                //App.prcsEnd();
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
        $("#createPalletNum").paragonClosePopup();
        $pltGrid.paragonGridReload();
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
                    "SPEC_CD": "textSpecCd",
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }

    //[Fn] Checking data for validation.
    function fnValidate(jsonData){
        //validation
        if($("#createPltCntPop").val().length == 0){//파레트갯수 검사
            Util.alert('MSG_MST_VAL_062'); //파레트갯수 항목은 필수 입력입니다.
            $("#createPltCntPop").focus();
            return false;
        }else if($("#createPltCntPop").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_063'); //파레트갯수는 공백만으로 입력 할 수 없습니다.
            $("#createPltCntPop").focus();
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
    createPltApp.init();
});
