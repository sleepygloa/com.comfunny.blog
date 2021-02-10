/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 제품권장로케이션관리[MasterItemFixLocApp]
 * Program Code     : PWMMS111E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 2. 22.  		First Draft.
 */

var MasterItemFixLocApp = function(){
    "use strict";
    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
    ************************************************/

    var $itemFixLocationList = $("#masterItemFixLocationGrid");
    var $locationList = $("#masterLocationGrid");
    var $itemList = $("#masterItemInLocationGrid");

    var $callBackInput;
    var selectedLocationList;
    var useYnComboJson;
    var gridUseYnOptions; //사용여부

    return {
        init : function() {
            fnListUseYnJson("USE_YN");
            //********** 1.Create Grid List **********
            itemFixLocationJson();
            locationJson();
            itemJson();
            //********** 2.About Event List Function. **********
            fnItemFixLocBtnEvent();
        }, callBackInput: function () {
            return $callBackInput;
        }
    }; // return

    //********** 1.Create Grid List **********
    //itemFixLocation Data Searching and Grid (with ajax).
    //When create a grid, view data list. (itemFixLocationJson)
    function itemFixLocationJson(){
        $itemFixLocationList.paragonGrid({
            url: "/ctrl/master/ItemFixLocationManagement/getitemFixLocationListInfo",
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            multiselect: true,  // 멀티 체크 박스.
//            multielonly:true,   //
            postData:{clientCd : $("#itemFixLocClientCd").val()},
            domainId:"ITEM_FIX_LOC_LIST",
            rowClickFocus:true,
            shrinkToFit: true,
            height: "224",
            colModel: [
                {editable: false, name: "DC_CD",        align: "center", width: "100px", hidden: true}, //물류센터코드
                {editable: false, name: "DC_NM",        align: "left", width: "100px"}, //물류센터명
                {editable: false, name: "ZONE_NM",      align: "center", width: "100px"}, //구역명
                {editable: false, name: "LOC_CD",       align: "center", width: "100px"}, //로케이션
                {editable: false, name: "CLIENT_CD",    align: "center", width: "100px"}, //고객사코드
                {editable: false, name: "CLIENT_NM",    align: "left", width: "100px"}, //고객사명
                {editable: false, name: "ITEM_CD",      align: "center", width: "100px"}, //제품코드
                {editable: false, name: "ITEM_NM",      align: "left", width: "100px"}, //제품명
                {editable: false, name: "ITEM_SPEC",    align: "center", width: "100px"}, //제품규격
                {editable: true,  name: "USE_YN",       align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridUseYnOptions
                    },
                    width: "70px"
                }, //사용여부
            ],
            loadComplete: function() {
                var ids = $itemFixLocationList.jqGrid("getDataIDs");

                if (ids && ids.length > 0) {
                    // 1. 그리드 첫 번째 ROW 포커스 이동.
                    $itemFixLocationList.setFocus(0);
                }
            },
            pager: "#masterItemFixLocationGridNavi"
        });
    }
    //itemFixLocationJson
    //When create a grid, view data list. (locationJson)
    function locationJson(){
        $locationList.paragonGrid({
            url: "/ctrl/master/ItemFixLocationManagement/getLocationListInfo",
            rowEditable:true,
            cellEditable:false,
            rownumbers: true,
            sortable: true,
//            multiselect: false,  // 멀티 체크 박스.
//            multielonly: false,   //
            rowClickFocus: true,
            shrinkToFit: true,
            domainId:"LOC_LIST",
            height: "224",
            colModel: [
                {editable: false, name: "DC_NM", align: "center", hidden: true}, //물류센터코드
                {editable: false, name: "LOC_CD", align: "center",  width: "50px"}, //로케이션코드
                {editable: false, name: "AREA_CD", align: "center", hidden: true}, //구역코드
                {editable: false, name: "AREA_NM", align: "center", hidden: true}, //구역명
                {editable: false,
                    /* 화면컬럼 도메인명 처리 2017.08.04 */
                    //name: "LIN_CD",
                    name: "LIN",
                    align: "center",
                    width: "50px"}, //행코드
                {editable: false,
                        /* 화면컬럼 도메인명 처리 2017.08.04 */
                        //name: "ROW_CD",
                        name: "ROW",
                        align: "center",
                        width: "50px"}, //열코드
                {editable: false,
                    /* 화면컬럼 도메인명 처리 2017.08.04 */
                    //name: "LEV_CD",
                    name: "LEV",
                    align: "center",
                    width: "50px"}, //단코드
                {editable: false, name: "EXISTS", align: "center", hidden: true}, //제품고정로케이션존재
                {editable: false, name: "DC_CD", align: "center",  hidden: true}, //물류센터코드
                {editable: false, name: "DC_NM", align: "center",  hidden: true} //물류센터명
            ],
            gridComplete: function(){
                // 배경색상 css 선언
                var cssGreen = {'background-color':'#FF2B00'};
                // 그리드 데이터의 ID 가져오기
                var ids = $locationList.jqGrid('getDataIDs');
                // console.log("그리드 데이터의 ID");
                // console.log(ids);
                // 그리드 데이터 가져오기
                var gridData = $locationList.jqGrid('getRowData');
                // console.log("그리드 Row Data");
                // console.log(gridData);
                // 데이터 확인후 색상 변경
                for (var i = 0; i < gridData.length; i++) {
                    if(gridData[i].EXISTS == "1"){
                        $locationList.jqGrid("setCell", ids[i], "LOC_CD", gridData[i].LOC_CD, cssGreen);
                    }
                }
            },
            onSelectRowEvent: function(currRowData, prevRowData){
                selectedLocationList = {
                        locCd: currRowData.LOC_CD, // 로케이션코드
                        linCd: currRowData.LIN_CD, // 행코드
                        levCd: currRowData.LEV_CD, // 단코드
                        rowCd: currRowData.ROW_CD // 열코드
                };
            },//onSelectRowEvent method.
            pager: "#masterLocationGridNavi"
        });
    }
    //When create a grid, view data list. (itemJson)
    function itemJson(){
        $itemList.paragonGrid({
            url: "/ctrl/master/ItemFixLocationManagement/getItemListInfo",
            rowEditable:true,
            cellEditable:false,
            rownumbers: true,
            sortable: true,
//            multiselect: true,  // 멀티 체크 박스.
//            multielonly:true,   //
            rowClickFocus:true,
            shrinkToFit: true,
            height: "224",
            domainId:"ITEM_LIST",
            postData:{clientCd : $("#itemFixLocClientCd").val()},
            colModel: [
                {editable: false, name: "CLIENT_NM",      align: "center", hidden:true},
                {editable: false, name: "ITEM_CD",      align: "center", width:"50px"},
                {editable: false, name: "ITEM_NM",      align: "left", width:"50px"},
                {editable: false, name: "ITEM_SPEC",    align: "center", width:"50px"},
                {editable: false, name: "LOC_CD",       align: "center", width:"50px"},
                {editable: false, name: "EXISTS",       align: "center", hidden: true},
                {editable: false, name: "CLIENT_CD",    align: "center", hidden: true}
            ],
            loadComplete: function(){
                var cssGreen = {'background-color':'#FF2B00'};
                var ids = $itemList.jqGrid('getDataIDs');
                var gridData = $itemList.jqGrid('getRowData');
                for (var i = 0; i < gridData.length; i++) {
                    if(gridData[i].EXISTS == "1"){
                        //$itemList.jqGrid("setCell", ids[i], 'ITEM_CD', false, cssGreen);
                        $itemList.jqGrid("setCell", ids[i], "ITEM_CD", gridData[i].ITEM_CD, cssGreen);
                    }
                }
            },
            onSelectRowEvent: function(currRowData, prevRowData){
                selectedLocationList = {
                        itemCd: currRowData.ITEM_CD, // 로케이션코드
                        itemNm: currRowData.ITEM_NM, // 행코드
                        itemSpec: currRowData.ITEM_SPEC, // 단코드
                        clientCd: currRowData.CLIENT_CD // 열코드
                };

            },//onSelectRowEvent method.
            pager: "#masterItemInLocationGridNavi"
        });
    }

    //********** 2.About Event List Function. **********
    //[Fn] setItemBom Management Method Event List.
    function fnItemFixLocBtnEvent(){

        //코드 입력시 명 서치
        addClientCdChangeEvent("itemFixLocClient", []);          //고객사
        addZoneCdChangeEvent("itemFixZone");    //존
        addItemCdChangeEvent("itemFixItem");    //제품

        //searchBtn Event.
        $("#itemFixLocSearchBtn").click(function() {
            fnSearch();
        });
        //addBtn Event.
        $("#upDataList").click(function() {
            //TODO: [Validation] 1. 체크 박스 확인 2. 1:1 대응
            //TODO: 3. 체크 박스 확인 후 ADD 메서드 실행할지 판단.

            //1.Location Json List.
            var locRowId = $locationList.getGridParam('selrow');
            var locationJsonRow = $locationList.getRowData(locRowId);//로케이션 선택 값
            var itemRowId = $itemList.getGridParam('selrow');
            var itemJsonRow = $itemList.getRowData(itemRowId);//제품 선택 값

            //validation
            var locGridCaptionNm = $('#masterLocationGrid_caption').text();
            var itemGridCaptionNm = $('#masterItemInLocationGrid_caption').text();
            var sumStr = locGridCaptionNm + ', ' + itemGridCaptionNm


            if(locRowId == null && itemRowId == null){//로케이션목록, 제품목록 선택여부 체크
                Util.alert('MSG_COM_VAL_007', sumStr); //{0}을(를) 선택해 주십시오.
                return false;
            }
            if(locRowId == null){//로케이션목록 체크여부
                Util.alert('MSG_COM_VAL_007', locGridCaptionNm); //{0}을(를) 선택해 주십시오.
                return false;
            }
            if(itemRowId == null){//제품목록 체크여부
                Util.alert('MSG_COM_VAL_007', itemGridCaptionNm); //{0}을(를) 선택해 주십시오.
                return false;
            }

            //동일 제품, 동일 로케이션에 등록 방지 체크
            if(locationJsonRow.LOC_CD == itemJsonRow.LOC_CD){
                Util.alert('MSG_MST_ERR_003'); //해당 로케이션은 제품을 혼적할수 없습니다./해당 로케이션은 이미 고정할당 된 로케이션 입니다.
                return false;
            }

            //제품이 해당 로케이션에 등록중(위화살표), 등록완료(저장) 인지 체크여부
            var ids = $itemFixLocationList.jqGrid('getDataIDs');
            for(var i = 0; i < ids.length; i++){
                var idsNum = ids[i];
                var gridData = $itemFixLocationList.getRow(idsNum);
                if(locationJsonRow.LOC_CD == gridData.LOC_CD && itemJsonRow.ITEM_CD == gridData.ITEM_CD){
                    Util.alert('MSG_COM_ERR_072'); //이미 등록되어있습니다.
                    return false;
                }
            }
            //3. ADD Row Fun.
            fnAddDc(locationJsonRow, itemJsonRow);
        });
        //Down Event
        $("#downDataList").click(function(){
            //fnDelMasterItemFixLocEvent();
            $itemFixLocationList.paragonGridCheckedDelete();
        });
        //saveBtn Evnet.
        $("#itemFixLocSaveRowBtn").click(function() {
            fnSave();
        });
        //deleteBtn Event.
        $("#itemFixLocDelRowBtn").click(function() {
            fnDelMasterItemFixLocEvent();
            //$itemFixLocationList.paragonGridCheckedDelete();
        });
        //ExcelBtn Event.
        $("#itemFixLocExcelBtn").click(function() {
            $itemFixLocationList.downloadExcel();
        });
        //client Pop Button Event.
        $("#itemFixClientPopup").click(function(){
            fnModalClientPop();
            //App.setCallBackEl($("#itemFixLocClientCd"));
        });
        //zone Pop Button Event.
        $("#itemFixZonePopup").click(function(){
            fnModalZonePop();
        });

        //item Pop Button Event.
        $('#itemFixItemPopup').click(function(){
            fnModalItemPopup();
        });

        //loc Pop Button Event
        $('#itemFixLocPopup').click(function(){
            fnModalLocPopup();
        });

    }
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
                Util.MakeSelectOptions($("#itemFixUseYn"), result);
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
            data : { clientCd : $('#itemFixLocClientCd').val() },
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#itemFixLocClientCd").val(data.CLIENT_CD);
                $("#itemFixLocClientNm").val(data.CLIENT_NM);
            }
        });
    }
    //[Fn] Popup Grid.
    function fnModalZonePop(){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/zonePopup",
            id : "modalZonePopup",
            width : "550",
            btnName : "수정",
            domainId: "PWMCM103Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#itemFixZoneCd").val(data.ZONE_CD);
                $("#itemFixZoneNm").val(data.ZONE_NM);
            }
        });
    }
    //[Fn] Create Popup Grid.
    function fnModalItemPopup(){
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/newItemPop',
            id : 'modalNewItemPopup',
            width : '550',
            btnName : "수정",
            data : { clientCd : $('#itemFixLocClientCd').val() },
            domainId: "PWMCM111Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#itemFixItemCd").val(data.ITEM_CD);
                $("#itemFixItemNm").val(data.ITEM_NM);

            }
        });
    }
    //[Fn] Create Popup Grid.
    function fnModalLocPopup(){
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/locPopup',
            id : 'modalLocPopup',
            width : '650',
            btnName : "수정",
            domainId:"PWMCM104Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#itemFixLocCd").val(data.LOC_CD);
            }
        });
    }
    //********** function Event Method Space.*********
    //[Fn] Grid Modify Checking.
    function fnModCheck() {
        //logic 1. call getRowData, 2. If checking MOD_FLAG is null, return false. otherwise return true.
        return $itemFixLocationList.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }
    //[Fn] Searching Event Method.
    function fnSearch(){
        if(fnModCheck()){
            var data = {
                clientCd: $("#itemFixLocClientCd").val(),
                zoneCd: $("#itemFixZoneCd").val(),
                itemCd: $("#itemFixItemCd").val(),
                locCd : $('#itemFixLocCd').val(),
                useYn : $("#itemFixUseYn").val()
            };
            $itemFixLocationList.paragonGridSearch(data);
            $locationList.paragonGridSearch(data);
            $itemList.paragonGridSearch(data);
        }
    }
    //[Fn] Grid Add Row.
    function fnAddDc(dr_loc, dr_item) {
        // console.log($("#mainUserDcSelectBox").text());
        $itemFixLocationList.paragonGridAddRow({
            addData:{"LOC_CD"       : dr_loc.LOC_CD,
                     "ZONE_NM"      : dr_loc.ZEON_NM,
                     "ITEM_CD"      : dr_item.ITEM_CD,
                     "ITEM_NM"      : dr_item.ITEM_NM,
                     "ITEM_SPEC"    : dr_item.ITEM_SPEC,
                     "DC_CD"        : dr_loc.DC_CD,
                     "DC_NM"        : dr_loc.DC_NM,
                     "CLIENT_CD"    : dr_item.CLIENT_CD,
                     "CLIENT_NM"    : dr_item.CLIENT_NM,
                    }
        });
    }
    //[Fn] Grid Save Data Row.
    function fnSave() {
        //DataTable data key : value Key
        var saveUrl = "/ctrl/master/ItemFixLocationManagement/saveSentence";
        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?
        var rowData = {
            modFlag:   "MOD_FLAG",
            //dcCd:      "DC_CD",
            clientCd:  "CLIENT_CD",
            itemCd:    "ITEM_CD",
            locCd:     "LOC_CD",
            useYn:     "USE_YN"
        };

        //1. get json data from List.
        var jsonData = $itemFixLocationList.getSelectedJsonData("dt_Data", rowData);

        var ids = $itemFixLocationList.getGridParam("selarrrow");

        //2. data change validation check.
        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $itemFixLocationList.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $itemFixLocationList.getRowData(ids[i]).LOC_CD); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }
        //저장시 제품당 여러로케이션 존재 여부 체크
        var totIds = $itemFixLocationList.jqGrid('getDataIDs');
        var dupLocFlag = false;
        if(!dupLocFlag && totIds.length > ids.length){
            for(var i = 0; i < ids.length; i++){
                var idsNum = ids[i];
                $.each(totIds, function(i, v){
                    if(!dupLocFlag && idsNum != v){
                        var idsLocCd = $itemFixLocationList.getRow(idsNum).LOC_CD;
                        var idsItemCd = $itemFixLocationList.getRow(idsNum).ITEM_CD;
                        var totIdsLocCd = $itemFixLocationList.getRow(v).LOC_CD;
                        var totIdsItemCd = $itemFixLocationList.getRow(v).ITEM_CD;

                        if(idsItemCd == totIdsItemCd && idsLocCd == totIdsLocCd){
                            Util.alert('MSG_MST_VAL_053'); //하나의 제품이 두개이상의 로케이션에 존재 할 수 없습니다.
                            dupLocFlag = true;
                            return false;
                        }
                    };
                    if(dupLocFlag){return false};
                })
                if(dupLocFlag){break; };
            }
        }
        if(dupLocFlag){return false};

        //3. ajax
        fnAjaxSave(jsonData, saveUrl, msg);
    }
    //[Fn] ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg){

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        App.prcsStart();
        $.ajax({
            url: saveUrl,
            data: jsonData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data){
                App.prcsEnd();
                //TODO: 콜백함수  성공시 함수 호출.
                // console.log(data);
                alert(data.msgTxt);
                $itemFixLocationList.paragonGridReload();
                $locationList.paragonGridReload();
                $itemList.paragonGridReload();
            }
        });
    }
    //***********4. Event Button **********
    //[Fn] Row 삭제 버튼 이벤트
    function fnDelMasterItemFixLocEvent(){
        var addFlag = $itemFixLocationList.paragonGridCheckedDeleteData();

        if(addFlag === false){
            //삭제버튼 이벤트 로직 수행.
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?
            var saveUrl = "/ctrl/master/ItemFixLocationManagement/saveSentence";

            var rowData = {
                modFlag:   "MOD_FLAG",
                clientCd:  "CLIENT_CD",
                itemCd:    "ITEM_CD",
                locCd:     "LOC_CD",
                useYn:     "USE_YN"
            };

            //1. 체크된 리스트.
            var jsonData = $itemFixLocationList.getSelectedJsonDataChk("dt_Data", rowData, $itemFixLocationList);

            // console.log("선택된 삭제 데이터:", jsonData);
            //ajax Event.
            fnAjaxSave(jsonData, saveUrl, msg);
        }
    }
}();

$("document").ready(function(){
    MasterItemFixLocApp.init();
});
