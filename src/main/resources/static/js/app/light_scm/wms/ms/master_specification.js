/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 규격관리[MasterSpecApp]
 * Program Code     : PWMMS112E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 2. 23.  		First Draft.
 */
var MasterSpecApp = function() {
    "use strict";
    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
    ************************************************/
    var $specGridJson = $("#specGridJson");
    var useYnComboJson;
    var specTypeCdJson;
    var $callBackInput;
    var totalGridRowCnt;
    var gridSpecTypeCdOptions; //규격유형타입코드
    var gridUseYnOptions;//사용여부

    return {
        init: function(){
            fnListUseYnJson("USE_YN");
            fnListSpecTypeCdJson("SPEC_TYPE_CD");
            //1.Create Grid List
            specGridJson();
            //2.About Event List Function.
            fnSpecBtnEvent();
        }
    };

    //********** 1.Create Grid List **********
    //specification Data Searching and Grid (with ajax).
    //When create a grid, view data list. (specGridJson)
    function specGridJson(){
        $specGridJson.paragonGrid({
            url: "/ctrl/master/specification/getspecList",
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            multiselect: true,  // 멀티 체크 박스.
//            multielonly:true,   //
            //multiboxonly: true, //
            domainId:"SPEC_LIST",
            rowClickFocus:true,
            shrinkToFit: false,
            height: "626",
            postData:{
                    specCd: $("#specificationCd").val(),
                    specNm: $("#specificationNm").val(),
                    specTypeCd: $("#specificationTypeCd").val()
            },
            colModel: [
                {editable: true, name: "SPEC_CD", align: "center", width: "100px", disabled:true, required:true},
                {editable: true, name: "SPEC_NM", align: "center", width: "250px", required:true},
                {editable: true,
                    /* 화면컬럼 도메인명 처리 2017.08.04 */
                    //name: "SPEC_TYPE_CD",
                    name: "SPEC_TYPE",
                    align: "center" ,
                    width: "150px",
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:gridSpecTypeCdOptions
                    },
                },
                {editable: true, name: "HORIZONTAL", align: "right", width: "120px",
                    editoptions:{
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            if($specGridJson.getRow(rowid,"HORIZONTAL") == ''){
                                $specGridJson.setCell("HORIZONTAL",0,rowid);
                            }
                            $(el).keyup(function(){
                                if($specGridJson.getRow(rowid,"HORIZONTAL") == ''){
                                    $specGridJson.setCell("HORIZONTAL",0,rowid);
                                }
                                setCbm(rowid);
                            });
                        }
                    }
                },
                {editable: true, name: "VERTICAL", align: "right", width: "120px",
                    editoptions:{
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            if($specGridJson.getRow(rowid,"VERTICAL") == ''){
                                $specGridJson.setCell("VERTICAL",0,rowid);
                            }
                            $(el).keyup(function(){
                                if($specGridJson.getRow(rowid,"VERTICAL") == ''){
                                    $specGridJson.setCell("VERTICAL",0,rowid);
                                }
                                setCbm(rowid);
                            });
                        }
                    }
                },
                {editable: true, name: "HEIGHT", align: "right", width: "120px",
                    editoptions:{
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            if($specGridJson.getRow(rowid,"HEIGHT") == ''){
                                $specGridJson.setCell("HEIGHT",0,rowid);
                            }
                            $(el).keyup(function(){
                                if($specGridJson.getRow(rowid,"HEIGHT") == ''){
                                    $specGridJson.setCell("HEIGHT",0,rowid);
                                }
                                setCbm(rowid);
                            });
                        }
                    }
                },
                {editable: false, name: "CBM", align: "right", width: "120px"},
                {editable: true, name: "WEIGHT", align: "right", width: "120px"},
                {editable: true, name: "REMARK", align: "center", width: "330px"},
                {editable: true, name: "USE_YN", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridUseYnOptions
                    },
                    width: "100px"
                }],
                loadComplete: function(){
                    totalGridRowCnt = $specGridJson.getGridParam('records');

                    var ids = $specGridJson.jqGrid("getDataIDs");
                    if(ids && ids.length > 0){
                        $specGridJson.setFocus(0);
                    }
                },
                pager: "#specGridJsonNavi",
                afterSaveCell: function (rowid, name, val, iRow, iCol) {
                    if(name ==='HORIZONTAL' || name ==='VERTICAL' || name ==='HEIGHT' ){
                        var grid = $specGridJson;

                        var horizontal = parseFloat(grid.jqGrid('getCell', rowid, 'HORIZONTAL'));//박스당 개수
                        var vertical = parseFloat(grid.jqGrid('getCell', rowid, 'VERTICAL'));
                        var height = parseFloat(grid.jqGrid('getCell', rowid, 'HEIGHT'));

                        //INPUT지시 입력 총수량 값 구하기
                        grid.jqGrid('setRowData', rowid, {
                            'CBM': parseFloat((horizontal * vertical * height).toFixed(6))
                        });

                    }
                }
        });
    }

    function setCbm(rowid){
        var cbm = 0;
        var horizontal = parseFloat($specGridJson.getRow(rowid,"HORIZONTAL"));
        var vertical = parseFloat($specGridJson.getRow(rowid,"VERTICAL"));
        var height = parseFloat($specGridJson.getRow(rowid,"HEIGHT"));

        cbm = parseFloat((horizontal * vertical * height).toFixed(8));

        $specGridJson.setCell("CBM",cbm,rowid);
    }

    //********** 2.About Event List Function. **********
    //[Fn] Use_Yn JSON List (About Select Box)
    function fnListUseYnJson(groupCd) {
        $.ajax({
            url: "/ctrl/settings/system/code/listCodeGroupComboJson",
            data: { codeGroupCd: groupCd },
            type: "POST",
            dataType: "json",
            cache: false,
            async:false,
            success: function(result) {
                gridUseYnOptions = Util.MakeGridOptions(result);
                Util.MakeSelectOptions($("#specUseYn"), result);
            }
        });
    }
    //[Fn] Spec Type Cd JSON List (About Select Box)
    function fnListSpecTypeCdJson(groupCd){
        $.ajax({
            url: "/ctrl/settings/system/code/listCodeGroupComboJson",
            data: { codeGroupCd: groupCd },
            type: "POST",
            dataType: "json",
            cache: false,
            async:false,
            success: function(result) {
                gridSpecTypeCdOptions = Util.MakeGridOptions(result);
                Util.MakeSelectOptions($("#specificationTypeCd"), result);
            }
        });
    }
    //[Fn] setItemBom Management Method Event List.
    function fnSpecBtnEvent(){
        //코드 입력시 명 서치
        addSpecCdChangeEvent("specification");    //규격코드

        //searchBtn Event.
        $("#specSearchBtn").click(function() {
        	fnSearch();
        });
        //addBtn Event.
        $("#specAddRowBtn").click(function() {
            fnAddDc();
        });
        //saveBtn Evnet.
        $("#specSaveRowBtn").click(function() {
            fnSave();
        });
        //deleteBtn Event.
        $("#specDelRowBtn").click(function() {
            fnDelMasterSpecEvent();
            //$specGridJson.paragonGridCheckedDelete();
        });
        //ExcelBtn Event.
        $("#specExcelBtn").click(function() {
            $specGridJson.downloadExcel();
        });
        //Popup Grid
        $("#specPop").click(function() {
            fnModalGrid();
        });
        //규격코드 엔터키 이벤트
        $("#specificationCd").keydown(function(key){
            if(key.keyCode == 13){
                //그리드 수정 여부 체크
                if (fnModCheck()) {
                    var data = {
                        specCd:  $("#specificationCd").val(),
                    };
                    $specGridJson.paragonGridSearch(data);
                }
            }
        });
        //규격명 엔터키 이벤트
        $("#specificationNm").keydown(function(key){
            if(key.keyCode == 13){
                //그리드 수정 여부 체크
                if (fnModCheck()) {
                    var data = {
                        specNm:  $("#specificationNm").val(),
                    };
                    $specGridJson.paragonGridSearch(data);
                }
            }
        });

        $("#specificationNm").attr("disabled", true); //규격

    }
    //[Fn] Popup Grid.
    function fnModalGrid(){
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/specPop',
            id : 'modalSpecPopup',
            width : '550',
            btnName : "수정",
            domainId: "PWMCM113Q_P1",
            onload : function(modal) {
                // 팝업화면 클릭 시 code, name.
                var callBack ={
                    "SPEC_CD":      "specificationCd",  // "", "text box id"
                    "SPEC_NM":      "specificationNm"
                    //"SPEC_TYPE_CD": "specificationTypeCd"
                };
                console.log(callBack);
                App.setElIds(callBack);
                modal.show();
            }
        });
    }
    //********** function Event Method Space.*********
    //[Fn] Grid Modify Checking.
    function fnModCheck() {
        //logic 1. call getRowData, 2. If checking MOD_FLAG is null, return false. otherwise return true.
        return $specGridJson.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }
    //[Fn] Searching Event Method.
    function fnSearch(){
        //Check for modification.
        if(fnModCheck()){
            var data = {
                specCd:     $("#specificationCd").val(),
                specNm:     $("#specificationNm").val(),
                specTypeCd: $("#specificationTypeCd").val(),
                useYn:      $("#specUseYn").val()
            };
            console.log(data);
            $specGridJson.paragonGridSearch(data);
        }
    }
    //[Fn] Grid Add Row.
    function fnAddDc() {
        $specGridJson.paragonGridAddRow();
    }
    //[Fn] Grid Save Data Row.
    function fnSave(){
        //DataTable data key : value Key
        var rowData = {
            modFlag:     "MOD_FLAG",
            specCd:      "SPEC_CD",
            specNm:      "SPEC_NM",
            specTypeCd:  "SPEC_TYPE",
            horizontal:  "HORIZONTAL",
            vertical:    "VERTICAL",
            cbm:         "CBM",
            height:      "HEIGHT",
            weight:      "WEIGHT",
            remark:      "REMARK",
            useYn:      "USE_YN"
        };
        var saveUrl = "/ctrl/master/specification/saveSentence";
        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?
        //1. get json data from List.
        var jsonData = $specGridJson.getSelectedJsonData("dt_spec", rowData);

        var ids = $specGridJson.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $specGridJson.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $specGridJson.getRowData(ids[i]).SPEC_CD); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        //2. data change validation check.
        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        if(!fnValidate()) return false;

        //TODO: 규격관리 Grid Data Validation Check 구현.
        fnAjaxSave(jsonData, saveUrl, msg);
    }
    //[Fn] ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg){

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        $.ajax({
            url: saveUrl,
            data: jsonData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data){
                console.log(data);
                alert(data.msgTxt);
                $specGridJson.paragonGridReload();
            }
        });
    }
    //***********4. Event Button **********
    //[Fn] Row 삭제 버튼 이벤트
    function fnDelMasterSpecEvent(){
        //var addFlag = $outboundSerialDGrid.paragonGridCheckedDelete();
        var addFlag = $specGridJson.paragonGridCheckedDeleteData();
        //var addFlag = false;

        if(addFlag === false){
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/master/specification/saveSentence";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag:    "MOD_FLAG",
                specCd:     "SPEC_CD",
                specTypeCd: "SPEC_TYPE_CD"
            };

            //1. 체크된 리스트.
            var jsonData = $specGridJson.getSelectedJsonDataChk("dt_spec", rowData, $specGridJson);

            //ajax Event.
            fnAjaxSave(jsonData, saveUrl, msg);
        }
    }

    function fnValidate(){

        var ids = $specGridJson.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_specGridJson_"+ids[i]+"']").is(":checked")){
                var rowdata = $specGridJson.getRowData(ids[i]);

                if(!(rowdata.SPEC_NM)){
                    Util.alert('MSG_MST_VAL_058'); //규격명 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.SPEC_NM.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_059'); //규격명은 공백만으로 입력할 수 없습니다.
                    return false;
                }
            }
        }
        return true;
    }

}();

$(document).ready(function(){
    MasterSpecApp.init();
});
