/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 세트제품BOM관리[MasterSetItemApp]
 * Program Code     : PWMMS110E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 2. 21.  		First Draft.
 */

var MasterSetItemApp = function() {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    var $setItemGrid = $("#masterSetItemBomGrid");
    var $itemGrid = $("#masterSetItemGrid");
    var useYnComboJson;
    var uomCdComboJson;
    var SetItemCd;
    var InClientCd;
    var $callBackInput;
    var flag = true;
    var gridUseYnOptions;//사용여부

    return {
        init: function() {
            //Select Box Function.
            fnListUseYnJson("USE_YN");
            //Select Box Function.
            fnListUomCdJson("UOM_CD");
            //********** 1.Create Grid List **********
            setItemBomManagementJson();
            //itemManagementJson();
            //********** 2.About Event List Function. **********
            setItemBomManagementEvent();
        }, callBackInput: function () {
            return $callBackInput;
        } //func,
    }; //return

    //********** 1.Create Grid List **********
    //setItemBom Data Searching and Grid (with ajax).
    //When create a grid, view data list.(Table TB_MS_ITEM_SET_M)
    function setItemBomManagementJson() {
        $setItemGrid.paragonGrid({
            url: "/ctrl/master/SetItemBomManagement/getSetItemListInfo",
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            shrinkToFit:true,
            //autowidth:true,
            //multiselect:true,
            //multielonly:true,
            rowClickFocus:true,
            domainId: "SET_ITEM_LIST",
            height: "223",
            colModel:[
                {editable: false, name: "SET_ITEM_CD", align: "center", width: "100px"},
                {editable: false, name: "CLIENT_CD", align: "center", width: "100px", hidden: false},
                {editable: false, name: "ITEM_NM", align: "left", width: "100px"},
                {editable: false, name: "ITEM_SPEC", align: "center", width: "100px"}
            ],
            pager: "#masterItemBomGridNavi",
            loadComplete: function(){

                var ids = $setItemGrid.jqGrid("getDataIDs");

                if (ids && ids.length > 0) {

                    // 1. 그리드 첫 번째 ROW 포커스 이동.
                    $setItemGrid.setFocus(0);
                }

                var data = $setItemGrid.getRowData(ids[0]);
                SetItemCd = data.SET_ITEM_CD;
                InClientCd = data.CLIENT_CD;

                if (flag) {
                    //화면 처음 로드 시 헤더, 디테일 그리드 생성 중 디테일 부분.
                    itemManagementJson({setItemCd: data.SET_ITEM_CD, clientCd: data.CLIENT_CD});
                    flag = false;
                } else {
                    //조회 버튼 이벤트 클릭 시 헤더 그리드 조회 후 ~ 디테일 부분 조회.
                    if (data.SET_ITEM_CD !== null && data.SET_ITEM_CD !== undefined) {
                        $itemGrid.paragonGridSearch({ setItemCd: data.SET_ITEM_CD, clientCd: data.CLIENT_CD });
                    } else {
                        $itemGrid.paragonGridSearch({ setItemCd: null });
                    }
                }

            },
            // When select row, call event function.
            onSelectRowEvent: function(currRowData, prevRowData){
                SetItemCd = currRowData.SET_ITEM_CD;
                InClientCd = currRowData.CLIENT_CD;
                var data = {
                    setItemCd: currRowData.SET_ITEM_CD, // 제품코드
                    clientCd: currRowData.CLIENT_CD
                    //TODO: 로직으로 조건 추가 가능.
                };
                $itemGrid.paragonGridSearch(data);
            }//onSelectRowEvent end.
        }); //grid end
    }// setItemBomManagement

    //When create a grid, view data list. (Table TB_MS_ITEM_M)
    function itemManagementJson(jsonData){
        $itemGrid.paragonGrid({
            url:"/ctrl/master/SetItemBomManagement/getItemListInfo",
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            height: "224",
            multiselect: true,
//            multielonly:true,
            rowClickFocus:true,
            shrinkToFit: true,
            //autowidth:true,
            domainId: "PART_ITEM_LIST",
            postData: jsonData,
            colModel: [
                {editable: false, name: "CLIENT_CD",    align: "center", hidden:true},
                {editable: false, name: "SET_ITEM_CD",  align: "center", hidden:true},
                {editable: true, name: "ITEM_CD",       align: "center", width:"100px", disabled:true, required:true,
                    editoptions : { maxlength:20, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) }
                    },
                    searchBtnClick : function(value, rowid, colid) {
                        fnModalGrid(rowid);
                    }
                },
                {editable: false, name: "ITEM_NM",       align: "left", width:"100px", disabled:true},
                {editable: false, name: "ITEM_SPEC",    align: "center", width:"100px", disabled:true},
                {editable: true, name: "PART_ITEM_QTY", align: "right", width:"50px",required:true,
                    editoptions : {  maxlength:11, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridIntLengthLimit($(this), e, 9); }) }
                    }
                },
                {editable: true,
                    /* 화면컬럼 도메인명 처리 2017.08.04 */
                    //name: "PART_UOM_CD",
                    name: "PART_UOM",
                    align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        maxlength : 20,
                        value:uomCdComboJson
                    },
                    width: "80px"
                },
                {editable: true, name: "USE_YN", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridUseYnOptions
                    },
                    width: "50px"
                }
            ],
            pager: "#masterSetItemBomGridNavi"
        });
    }

    //**********2.About Event List Function. **********
    //setItemBom Management Method Event List.
    function setItemBomManagementEvent(){

        //코드 입력시 명 서치
        addClientCdChangeEvent("setItemclient", ['setItem']);                   //고객사
        addCdChangeEvent("setItemclient", "setItem", "SET_ITEM");      //세트아이템

        //searchBtn Event.
        $("#setItemBomSearchBtn").click(function() {
        	fnSearch();
        });
        //addBtn Event.
        $("#setItemBomAddRowBtn").click(function() {
            //TODO: 세트제품BOM관리 -> 추가 버튼 클릭시 헤더 부분 클릭이 안되어 있으면 추가 되면 안됨.
            fnAddDc();
        });
        //saveBtn Evnet.
        $("#setItemBomSaveRowBtn").click(function() {
            fnSave();
        });
        //deleteBtn Event.
        $("#setItemBomDelRowBtn").click(function() {
            //$setItemGrid.paragonGridSelectDelete();
            //TODO:세트제품BOM관리 -> 삭제 로직 추가 필요.
            fnDelMasterSetItemBomEvent();
            //$setItemGrid.paragonGridCheckedDelete();
        });
        //ExcelBtn Event.
        $("#setItemBomExcelBtn").click(function() {
            if(null != $itemGrid.getGridParam('selrow')){
                $itemGrid.downloadExcel();
            }else{
                $setItemGrid.downloadExcel();
            }
        });
        //Popup Button.
        $("#clientPopup").click(function(){
            fnModalClientPop();
        });
        $("#setItemPopBtn").click(function(){
            fnModalGridSetItem();
        });
    }
    //[Fn] Use_Yn JSON List
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
                Util.MakeSelectOptions($("#useYn"), result);
            }
        });
    }
    //[Fn] UOM_CD JSON List
    function fnListUomCdJson(groupCd) {
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
                uomCdComboJson = Util.MakeGridOptions(result);
                //paragon-util.js 콤보박스 옴션 생성(타겟 Select박스, json 데이터)
                Util.MakeSelectOptions($("#partUomCd"), result);
            }
        });
    }
    //[Fn] 제품관리 Popup Grid.
    function fnModalGrid(rowid){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/newItemPop",
            id : "modalNewItemPopup",
            width : "700",
            btnName : "수정",
            data: {clientCd: $("#setItemclientCd").val()},
            domainId: "PWMCM111Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $itemGrid.setCell("ITEM_CD",data.ITEM_CD,rowid);
                $itemGrid.setCell("ITEM_NM",data.ITEM_NM,rowid);
                $itemGrid.setCell("ITEM_SPEC",data.ITEM_SPEC,rowid);
            }
        });
    }
    //[Fn] Popup Grid.
    function fnModalClientPop(){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/clientPopup",
            id : "modalClientPopup",
            width : "600",
            btnName : "수정",
            domainId: "PWMCM105Q_P1",
//          data : { clientCd : $('#setItemclientCd').val() },
            onload : function(modal) {
                // 팝업화면 클릭 시 code, name.
                var callBack ={
                    "CLIENT_CD": "setItemclientCd",  // "", "text box id"
                    "CLIENT_NM": "setItemclientNm"
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }
    //[Fn] Popup Grid.
    function fnModalGridSetItem(){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/setItemPop",
            id : "modalSetItemPopup",
            width : "550",
            btnName : "수정",
            data: {
                clientCd: $("#setItemclientCd").val(),
                setItemCd: $("#setItemCd").val()
                },
            domainId:"PWMCM112Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#setItemCd").val(data.SET_ITEM_CD);
                $("#setItemNm").val(data.SET_ITEM_NM);
            }
        });
    }
    //**********3.function Event Method Space.*********
    //[Fn] Grid Modify Checking.
    function fnModCheck() {
        //logic 1. call getRowData, 2. If checking MOD_FLAG is null, return false. otherwise return true.
        return $setItemGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }
    //[Fn] Searching Event Method.
    function fnSearch(){

        //validation
        if($("#setItemclientCd").val().length == 0){
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력입니다.
            $("#setItemclientCd").focus();
            return false;
        }else if($("#setItemclientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("setItemclientCd").focus();
            return false;
        }

        //Clear Grid Data.
        $itemGrid.jqGrid("clearGridData", true);

        //Check for modification.
        if(fnModCheck()){
            var data = {
                itemCd: $("#setItemCd").val(),
                clientCd: $("#setItemclientCd").val()
            };
            $setItemGrid.paragonGridSearch(data);
        }
    }
    //[Fn] Grid Add Row.
    function fnAddDc() {
        $itemGrid.paragonGridAddRow({
          addData: {"SET_ITEM_CD":  SetItemCd,
                    "CLIENT_CD":    InClientCd}
        });
    }
    //[Fn] Grid Save Data Row.
    function fnSave() {
        var saveUrl = "/ctrl/master/SetItemBomManagement/saveSentence";
        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?
        var rowData = {
            modFlag:      "MOD_FLAG",
            setItemCd:    "SET_ITEM_CD",
            clientCd:     "CLIENT_CD",
            partItemCd:   "ITEM_CD",
            partItemQty:  "PART_ITEM_QTY",
            partUomCd:    "PART_UOM",
            useYn:        "USE_YN"
          };

        //Json Convert to Object.
        //1. get json data from List.
        var jsonData = $itemGrid.getSelectedJsonData("dt_setItem", rowData);

        var ids = $itemGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $itemGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $itemGrid.getRowData(ids[i]).ITEM_NM); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        //2. data change validation check.
        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var ids = $itemGrid.getDataIDs();
        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_masterSetItemGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $itemGrid.getRowData(ids[i]);
                if(!(rowdata.ITEM_CD)){
                    Util.alert('MSG_MST_VAL_045'); //제품코드 항목은 필수 입력입니다.
                    return;
                }else if(rowdata.ITEM_CD.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_046'); //제품코드는 공백으로 입력 할 수 없습니다.
                    return;
                }else if(rowdata.ITEM_NM.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_045'); //제품코드 항목은 필수 입력입니다.
                    return;
                }
                if(!(rowdata.PART_ITEM_QTY)){
                    Util.alert('MSG_MST_VAL_050'); //구성제품수량 항목은 필수 입력입니다.
                    return;
                }
                if(rowdata.PART_ITEM_QTY.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_051'); //구성제품수량은 공백만으로 입력할 수 없습니다.
                    return;
                }
                if(Number(rowdata.PART_ITEM_QTY) == 0 ){
                    Util.alert('MSG_MST_VAL_052'); //구성제품수량은 0으로 입력할 수 없습니다.
                    return;
                }
            }
        }

        //3. ajax Function.
        fnAjaxSave(jsonData, saveUrl, msg);
    }
    //[Fn] ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg){

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        //App.prcsStart();
        $.ajax({
            url: saveUrl,
            data: jsonData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data){
                //App.prcsEnd();
                // console.log(data);
                alert(data.msgTxt);
                $itemGrid.paragonGridReload();
            }
        });
    }
    //***********4. Event Button **********
    //[Fn] Row 삭제 버튼 이벤트
    function fnDelMasterSetItemBomEvent(){
        var addFlag = $itemGrid.paragonGridCheckedDeleteData();


        if(addFlag === false){
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/master/SetItemBomManagement/saveSentence";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag:      "MOD_FLAG",
                clientCd:     "CLIENT_CD",
                setItemCd:    "SET_ITEM_CD",
                partItemCd:   "ITEM_CD"
            };


            //1. 체크된 리스트.
            var jsonData = $itemGrid.getSelectedJsonDataChk("dt_setItem", rowData, $itemGrid);

            // console.log("선택된 삭제 데이터:", jsonData);
            //ajax Event.
            fnAjaxSave(jsonData, saveUrl, msg);
        }
    }

}();

$(document).ready(function() {
    MasterSetItemApp.init();
});
