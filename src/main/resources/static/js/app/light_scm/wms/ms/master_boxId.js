/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 박스ID관리[MasterBoxIdApp]
 * Program Code     : PWMMS114E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 2. 28.  		First Draft.
 */

var MasterBoxIdApp = function() {
    "use strict";

    /************************************************
    *전역 객체 선언부 (return 상위부분에 선언해야함)
    ************************************************/

    var $boxGrid = $("#masterBoxIdGrid");
    var useYnComboJson;
    var $callBackInput;
    var totalGridRowCnt;
    var gridUseYnOptions; //사용여부


    return {
        init: function() {
            fnListUseYnJson("USE_YN");
            //********** 1.Create Grid List **********
            boxIdJson();
            //********** 2.About Event List Function. **********
            boxIdEvent();
        }, callBackInput: function () {
            return $callBackInput;
        }
    };// return end

    //********** 1.Create Grid List **********
    //Box Data Searching and Grid (with ajax).
    //When create a grid, view data list.
    function boxIdJson() {
        $boxGrid.paragonGrid({
            url: "/ctrl/master/boxId/getBoxIdList",
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            height: "616",
            multiselect: true,  // 멀티 체크 박스.
//            multielonly:true,   //
            //multiboxonly: true, //
            rowClickFocus:true,
            shrinkToFit: false,
            domainId: "BOX_ID_LIST",
            colModel: [
                {editable: false,   name: "BOX_ID",    width:"200px", align: "center", required:true},
                {editable: true,    name: "BOX_NM",    width:"300px", align: "left"},
                {editable: true,    name: "SPEC_CD",   width:"300px", align: "center",
                    searchBtnClick : function(value, rowid, colid) {
                        $("#specTypeCdBox").val('2');
                        fnModalGridSpec(rowid);
                    }
                },
                {editable: false, name: "SPEC_NM",    width:"330px", align: "center"},
                {editable: true, name: "REMARK", width:"200px", align: "center"},
                {editable: true, name: "USE_YN", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridUseYnOptions
                    },
                    width: "200px"
                }],
            loadComplete: function(){
                totalGridRowCnt = $boxGrid.getGridParam('records');
                var ids = $boxGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $boxGrid.setFocus(0);
                }

            },
            pager:"#masterBoxIdGridNavi"
        }); //grid
    }
    //********** 2.About Event List Function. **********
    //[Fn] Use_Yn JSON List (About Select Box)
    function fnListUseYnJson(groupCd) {
        $.ajax({
            url: "/ctrl/settings/system/code/listCodeGroupComboJson",
            data: {
                codeGroupCd: groupCd
            },
            type: "POST",
            dataType: "json",
            cache: false,
            async:false,
            success: function(result) {
                gridUseYnOptions = Util.MakeGridOptions(result);
                Util.MakeSelectOptions($("#useYnBox"), result);
            }
        });
    }
    //[Fn] Box Event.
    function boxIdEvent(){
        //createBtn Event.
        $("#createBoxBtn").click(function() {
            fnCreateBoxId();
        });
        //searchBtn Event.
        $("#searchBoxBtn").click(function() {
            fnSearchBoxId();
        });
        //addBtn Event.
        $("#addBoxRowBtn").click(function() {
            //fnAddDc();
            $boxGrid.paragonGridAddRow();
        });
        //saveBtn Evnet.
        $("#saveBoxRowBtn").click(function() {
            fnSave();
        });
        //deleteBtn Event.
        $("#delBoxRowBtn").click(function() {
            //$boxGrid.paragonGridCheckedDelete();
            fnDel();
        });
        //ExcelBtn Event.
        $("#excelBoxBtn").click(function() {
            $boxGrid.downloadExcel();
        });
        //Popup Grid 박스ID
        $("#boxIdPop").click(function(){
            fnModalGrid();
        });
        //Popup Grid SPEC CD
        $("#specCdPopBtn").click(function(){
            $("#specTypeCdBox").val("2");
            fnModalSpec();
        });
        //박스 ID 엔터키 이벤트
        $("#boxId").keydown(function(key){
            if(key.keyCode == 13){
                //그리드 수정 여부 체크
                if (fnModCheck()) {
                    var data = {
                        boxId:  $("#boxId").val(),
                    };
                    $boxGrid.paragonGridSearch(data);
                }
            }
        });
        //스펙규격 엔터키 이벤트
        $("#specCdBox").keydown(function(key){
            if(key.keyCode == 13){
                //그리드 수정 여부 체크
                if (fnModCheck()) {
                    var data = {
                        specCd:  $("#specCdBox").val(),
                    };
                    $boxGrid.paragonGridSearch(data);
                }
            }
        });

        $("#boxNm").attr("disabled", true); //박스ID
        $("#specNmBox").attr("disabled", true); //규격코드ID


    }
    //[Fn] Popup Grid.
    function fnModalGrid(){
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/boxIdPop',
            id : 'modalBoxPopup',
            width : '550',
            btnName : "수정",
            domainId:"PWMCM115Q_P1",
            onload : function(modal) {
                var callBack ={
                    "BOX_ID":   "boxId",
                    "BOX_NM":   "boxNm"
                };
                // console.log(callBack);
                App.setElIds(callBack);
                modal.show();
            }
        });
    }
    //[Fn] Popup Grid.
    function fnModalSpec(){
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/specPop',
            id : 'modalSpecPopup',
            width : '550',
            btnName : "수정",
            domainId:"PWMCM113Q_P1",
            onload : function(modal) {
                var callBack ={
                    "SPEC_CD":  "specCdBox",
                    "SPEC_NM":  "specNmBox"
                };
                // console.log(callBack);
                App.setElIds(callBack);

                modal.show();
            }
        });
    }
    //[Fn] Popup Grid.
    function fnModalGridSpec(rowid){
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/specPop',
            id : 'modalSpecPopup',
            width : '550',
            btnName : "수정",
            domainId:"PWMCM113Q_P1",
//            visible:true
            onload : function(modal) {
                modal.show();
            },
            callback:function(data){
                $boxGrid.setCell("SPEC_CD",data.SPEC_CD,rowid);
                $boxGrid.setCell("SPEC_NM",data.SPEC_NM,rowid);
            }
        });
    }
    //********** 3.Function Event Method Space.*********
    //[Fn] Creating Box Event Method.
    function fnCreateBoxId(){
        PopApp.paragonOpenPopup({
            ajaxUrl: "/ctrl/master/boxId/createBox",
            id : "createBoxNum",
            width: "500",
            btnName: "일괄생성",
            domainId: "PWMMS114E_P1",
            onload: function(modal){
                modal.show();
            }
        });
    }
    //[Fn] Searching Event Method.
    function fnSearchBoxId() {
        //그리드 수정 여부 체크
        if (fnModCheck()) {
            var data = {
                boxId:   $("#boxId").val(),
                specCd:  $("#specCdBox").val(),
                useYn:   $("#useYnBox").val()
            };
            $boxGrid.paragonGridSearch(data);
        }
    }
    //[Fn] Grid Modify Checking.
    function fnModCheck() {
        return $boxGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
     }
    //[Fn] Grid Add Row.
    function fnAddDc() {
        //1. Box Id 채번 불러오기.
        $.ajax({
            url: "/ctrl/master/boxId/getBoxId",
            type: "POST",
            dataType: "json",
            cache: false,
            success: function(result) {
                $boxGrid.paragonGridAddRow({
                    addData: {"BOX_ID" : result.O_LAST_VAL}
                });
            }
        });
     }
    //[Fn] Grid Save Data Row.
    function fnSave() {
        //DataTable data key : value Key
        var rowData = {
            modFlag: "MOD_FLAG",
            boxId: "BOX_ID",
            boxNm: "BOX_NM",
            specCd: "SPEC_CD",
            remark: "REMARK",
            useYn: "USE_YN"
        };
        var saveUrl = "/ctrl/master/boxId/saveBoxId";
        var msg = "저장하시겠습니까?";

        //1. get json data from List.
        //var jsonData = $boxGrid.getJsonData("dt_box", rowData);
        var jsonData = $boxGrid.getSelectedJsonData("dt_data", rowData);

        var ids = $boxGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $boxGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $boxGrid.getRowData(ids[i]).BOX_ID); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        fnAjaxSave(jsonData, saveUrl, msg);
    }
    //[Fn] Grid Delete Data Row.
    function fnDel() {

        var addFlag = $boxGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/master/boxId/saveBoxId";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag: "MOD_FLAG",
                boxId: "BOX_ID"
            };

            //1. 체크된 리스트.
            var jsonData = $boxGrid.getSelectedJsonDataChk("dt_data", rowData, $boxGrid);

            // console.log("선택된 삭제 데이터:", jsonData);
            //ajax Event.
            fnAjaxSave(jsonData, saveUrl, msg);
        }
    }
    //[Fn] 저장 ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg) {

        if (!confirm(msg)) return;
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
        $boxGrid.paragonGridReload();
    }
}();

$(document).ready(function() {
   MasterBoxIdApp.init();
});
