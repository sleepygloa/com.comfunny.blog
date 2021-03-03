/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고시리얼[OutboundSerialApp]
 * Program Code     : PWMOB109E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 4. 12.  		First Draft.
*/

var OutboundSerialApp = function(){
    "use strict";
    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
    ************************************************/

    var $outboundSerialHGrid = $("#outboundSerialHGrid");
    var $outboundSerialDGrid = $("#outboundSerialDGrid");

    var gridObGbnCdOptions;//출고구분
    var gridObProgStCdOptions;//진행상태
    var gridCodeGroupOptions;//제품상태코드
    var outboundSerialFlag = true;

    var gridRowData;

    return {
        init: function(){
            //fnListOutboundObProgStCdJson("OB_PROG_ST_CD", 9);//진행상태
            fnListObProgStCdJson("OB_PROG_ST_CD", 8);//진행상태
            fnListObGbnCdJson("OB_GBN_CD");//출고구분
            fnListItemStCdCdJson("ITEM_ST_CD");//제품상태코드
            toDateSetEvnet();
            //********** 1.Create Grid List **********
            fnOutboundSerialHJsonGrid();
            //********** 2.About Event List Function. **********
            outboundSerialEvent();
        },callBackInput: function(){
            return $callBackInput;
        }
    };
    //********** 1.Create Grid List **********
    //출고 목록
    function fnOutboundSerialHJsonGrid(){
        $outboundSerialHGrid.paragonGrid({
            url:"/ctrl/outbound/outboundSerial/getOutboundList",
            sortable:   true,
            rownumbers: true,
            height: "149",
            //rowEditable: true,
            shrinkToFit: false,
            rowEditable:true,
            cellEditable:false,
            //multiselect: true,
            //multielonly: true,
            rowClickFocus: true,
            domainId: "OB_LIST",
            postData:{clientCd:                   $("#outboundSerialClientCd").val(),    //고객사
                      outboundSerialFromDate:    $("#outboundSerialFromDate").val(),    //출고일자 From
                      outboundSerialToDate:      $("#outboundSerialToDate").val(),      //출고일자 To
                      obNo:                       $("#outboundSerialObNo").val(),        //출고번호
                      obGbnCd:                    $("#outboundSerialObGbnCd").val(),     //출고구분
                      carNo:                      $("#outboundSerialCarNo").val(),       //차량번호
                      deliveryDer:                $("#outboundSerialDeliveryDgr").val(), //배송차수
                      storeCd:                    $("#outboundSerialStoreCd").val(),     //배송처
                      obProgStCd:                 $("#outboundSerialObProgStCd").val(),  //진행상태
                      soNo:                       $("#outboundSerialSoNo").val(),        //주문번호
                      rstoreCd:                   $("#outboundSerialRstoreCd").val(),    //실배송처
                      itemCd:                     $("#outboundSerialItemCd").val()        //제품코드
                     },
            colModel: [
                {editable: false, name: "COMPANY_CD",       width:"100px", align: "center", hidden:true},//회사번호
                {editable: false, name: "CLIENT_CD",        width:"100px", align: "center", hidden:true},//고객사
                {editable: false, name: "CLIENT",           width:"100px", align: "left"},//고객사명
                {editable: false, name: "DC_CD",            width:"100px", align: "center", hidden:true},//물류센터
                {editable: false, name: "OB_YMD",           width:"100px", align: "center"},//출고예정일자
                {editable: false, name: "OB_NO",            width:"100px", align: "center"},//출고번호
                {editable: false, name: "OB_DETAIL_SEQ",    width:"90px", align: "center"},//출고상세번호
                {editable: false, name: "SO_NO",            width:"90px", align: "center"},//주문번호
                {editable: false, name: "OB_GBN_CD",        width:"90px", align: "center",
                    edittype:'select', formatter:'select', hidden:true,
                        editoptions: {
                            value:gridObGbnCdOptions
                        }
                },//출고구분
                {editable: false, name: "OB_GBN",        width:"90px", align: "center",
                    edittype:'select', formatter:'select',
                        editoptions: {
                            value:gridObGbnCdOptions
                        }
                },//출고구분
                {editable: false, name: "STORE_CD",         width:"100px",  align: "center"},//배송처
                {editable: false, name: "STORE_NM",         width:"150px",  align: "left"},//배송처명
                {editable: false, name: "RSTORE_CD",        width:"100px",  align: "center"},//실배송처
                {editable: false, name: "RSTORE_NM",        width:"150px",  align: "left"},//실배송처명
                {editable: false, name: "CAR_NO",           width:"80px",  align: "center"},//차량
                {editable: false, name: "DELIVERY_DGR",     width:"80px",  align: "center", hidden: true },//배송차수
                {editable: false, name: "OB_PROG_ST_CD",    width:"80px",  align: "center",
                    edittype:'select', formatter:'select', hidden:true,
                        editoptions: {
                            value:gridObProgStCdOptions
                    }
                }, //진행상태코드
                {editable: false, name: "OB_PROG_ST",    width:"80px",  align: "center",
                    edittype:'select', formatter:'select',
                        editoptions: {
                            value:gridObProgStCdOptions
                    }
                }, //진행상태코드
                {editable: false, name: "ITEM_CD",          width:"100px",  align: "center"},//제품코드
                {editable: false, name: "ITEM_NM",          width:"150px",  align: "left"},//제품명
                {editable: false, name: "ITEM_SPEC",        width:"100px",  align: "center"},//제품규격
                {editable: false, name: "ITEM_ST_CD",       width:"80px",  align: "right",
                    edittype:'select', formatter:'select', hidden:true,
                    editoptions: {
                        value:gridCodeGroupOptions
                    }
                },//제품상태코드
                {editable: false, name: "ITEM_ST",       width:"80px",  align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridCodeGroupOptions
                    }
                },//제품상태코드
                {editable: false, name: "UOM",              width:"80px",  align: "center"},//단위
                {editable: false, name: "CONV_UOM_QTY",     width:"80px",  align: "right", hidden:true},//입수
                {editable: false, name: "PKQTY",            width:"80px",  align: "center"},//입수
                {editable: false, name: "PLAN_QTY",         width:"100px",  align: "right", hidden:true},//출고예정수량
                {editable: false, name: "PLAN_TOT_QTY",     width:"100px",  align: "right"},//출고예정수량
                {editable: false, name: "PLAN_BOX_QTY",     width:"100px",  align: "right"},//박스
                {editable: false, name: "PLAN_EA_QTY",      width:"100px",  align: "right"},//낱개
                {editable: false, name: "MAKE_YMD",         width:"100px",  align: "center"},//제조일자
                {editable: false, name: "MAKE_LOT",         width:"100px",  align: "center"},//제조lot
                {editable: false, name: "DIST_EXPIRY_YMD",  width:"100px",  align: "center"},//유통일자
                {editable: false, name: "LOT_ATTR1",        width:"100px",  align: "center"},//lot속성1
                {editable: false, name: "LOT_ATTR2",        width:"100px",  align: "center"},//lot속성2
                {editable: false, name: "LOT_ATTR3",        width:"100px",  align: "center"},//lot속성3
                {editable: false, name: "LOT_ATTR4",        width:"100px",  align: "center"},//lot속성4
                {editable: false, name: "LOT_ATTR5",        width:"100px",  align: "center"}//lot속성5
            ],
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'PLAN_TOT_QTY', length: 3 , domain:"PLAN_QTY"}
                              ]
                          }
                      ],
            loadComplete: function(){

                var ids = $outboundSerialHGrid.jqGrid("getDataIDs");

                if (ids && ids.length > 0) {

                    $outboundSerialHGrid.setFocus(0);
                }


                var data = $outboundSerialHGrid.getRowData(ids[0]);

                if (outboundSerialFlag) {

                    fnOutboundSerialDJsonGrid({ obNo: data.OB_NO, obDetailSeq: data.OB_DETAIL_SEQ });
                    outboundSerialFlag = false;
                } else {
                    if (data.OB_NO !== null && data.OB_NO !== undefined) {
                        $outboundSerialDGrid.paragonGridSearch({ obNo: data.OB_NO, obDetailSeq: data.OB_DETAIL_SEQ });
                    } else {
                        $outboundSerialDGrid.paragonGridSearch({ obNo: null });
                    }
                }
            },
            onSelectRowEvent: function(currRowData, prevRowData){
                //InClientCd = currRowData.CLIENT_CD;
                gridRowData = currRowData;
                var data = {
                    obNo: currRowData.OB_NO, // 출고번호
                    obDetailSeq: currRowData.OB_DETAIL_SEQ //출고상세번호
                };
                $outboundSerialDGrid.paragonGridSearch(data);
            },
            pager: "#outboundSerialHGridNavi"
        });
    }
    //출고시리얼목록
    function fnOutboundSerialDJsonGrid(data){
        $outboundSerialDGrid.paragonGrid({
            url: "/ctrl/outbound/outboundSerial/getOutboundSerialList",
            sortable: true,
            rownumbers: true,
            height: "148",
            //rowEditable: true,
            shrinkToFit: true,
            rowEditable:true,
            cellEditable:false,
            multiselect: true,
//            multielonly: true,
            domainId: "OB_SERIAL_LIST",
            rowClickFocus: true,
            postData: data,
            colModel: [
                {editable: false, name: "OB_SERIAL_NO",            width: "100px", align: "center", hidden: false},//출고시리얼번호
                {editable: false, name: "OB_NO",            width: "100px", align: "center", hidden: false},//출고번호
                {editable: false, name: "OB_DETAIL_SEQ",    width: "100px", align: "center", hidden: false},//출고상세번호
                {editable: true,  name: "SERIAL_ID",      width: "100px", align: "center", required:true},//시리얼번호
                {editable: true,  name: "LOT_ID",            width: "100px", align: "center"},//LOTID
                {editable: true,  name: "PLT_ID",            width: "100px", align: "center"},//파렛트아이디
                {editable: false, name: "REMARK",           width: "100px", align: "center"}//비고
            ],
            pager: "#outboundSerialDGridNavi"
        });
    }
    //********** 2.About Event List Function. **********
    function outboundSerialEvent(){

        //코드 입력시 명 서치
        addClientCdChangeEvent("outboundSerialClient", ["outboundSerialStore", "outboundSerialRstore"]);          //고객사
        addCdChangeEvent("outboundSerialClient", "outboundSerialStore", "STORE");      //판매처
        addCdChangeEvent("outboundSerialClient", "outboundSerialRstore", "STORE");      //납품처
//        addCdChangeEvent("outboundSerialClient", "outboundSerialItem", "ITEM");      //제품

        //고객사 팝업
        $("#outboundSerialClientCdPopup").click(function(){
            fnModalClientGridPop();
        });
        //배송처 btn Event
        $("#outboundSerialStoreCdBtn").click(function(){
            var storFlag = "1";
            fnModalStoreGrid(storFlag);
        });
        //실배송처 btn Event
        $("#outboundSerialRstoreCdBtn").click(function(){
            var storFlag = "2";
            fnModalStoreGrid(storFlag);
        });
        //제품 btn Event
        $("#outboundSerialItemCdBtn").click(function(){
            fnModalItemGridPop();
        });
        //조회 btn Event
        $("#searchOutboundSerialBtn").click(function(){
            fnSearchOutboundSerialList();
        });
        //추가 btn Event
        $("#addOutboundSerialBtn").click(function(){
           fnAddOutboundSerailEvent();
        });
        //저장 btn Event
        $("#saveOutboundSerialBtn").click(function(){
            fnSaveOutboundSerailEvent();
        });
        //삭제 btn Event
        $("#delOutboundSerialBtn").click(function(){
            fnDelOutboundSerailEvent();
        });
        //Date btn Event
        $("#outboundSerialFromDateBtn").click(function() {
            $("#outboundSerialdatepicker1").datepicker();
        });
        //Date btn Event
        $("#outboundSerialToDateBtn").click(function() {
            $("#outboundSerialdatepicker2").datepicker();
        });
    }
    //********** 3. Function List. **********
    //[Fn] 진행상태 Select Box
    function fnListObProgStCdJson(groupCd, uiCd) {
        $.ajax({
            url: "/ctrl/outbound/outboundCommonCode/outboundCommonCd",
            //url: "/ctrl/outbound/outboundCommonCode/outboundCommonCd",
            data: {
                codeGroupCd: groupCd,
                cdNo: uiCd
            },
            type: "POST",
            dataType: "json",
            cache: false,
            async: false,
            success: function(result) {
                gridCodeGroupOptions = Util.MakeGridOptions(result);
                Util.MakeSelectOptions($("#outboundSerialObProgStCd"), result);
            }
        });
    }
    //[Fn] 출고구분 JSON List (About Select Box)
    function fnListObGbnCdJson(groupCd) {
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
                gridObGbnCdOptions = Util.MakeGridOptions(result);
                Util.MakeSelectOptions($("#outboundSerialObGbnCd"), result);
            }
        });
    }
    //[Fn] ITEM_STD_CD JSON List (About Select Box)
    function fnListItemStCdCdJson(groupCd){
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
                gridCodeGroupOptions = Util.MakeGridOptions(result);
            }
        });
    }
    //datepicker Set up today.
    function toDateSetEvnet(){
        $("#outboundSerialdatepicker1").datepicker("setDate", new Date());
        $("#outboundSerialdatepicker2").datepicker("setDate", new Date());
    }
    //[Fn] 저장 ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg){

        if(!confirm(msg)) return;

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
                $outboundSerialHGrid.paragonGridReload();
            }
        });
    }
    //***********4. Event Button **********
    //[Fn] 조회 버튼 이벤트
    function fnSearchOutboundSerialList(){

        if($("#outboundSerialClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#outboundSerialClientCd").focus();
            return false;
        }else if($("#outboundSerialClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#outboundSerialClientCd").focus();
            return false;
        }

        if($("#outboundSerialFromDate").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#outboundSerialFromDate").focus();
            return false;
        }else if($("#outboundSerialFromDate").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#outboundSerialFromDate").focus();
            return false;
        }

        if($("#outboundSerialToDate").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#outboundSerialToDate").focus();
            return false;
        }else if($("#outboundSerialToDate").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#outboundSerialToDate").focus();
            return false;
        }

        var data = {
            clientCd:                   $("#outboundSerialClientCd").val(),    //고객사
            outboundSerialFromDate:    $("#outboundSerialFromDate").val(),    //출고일자 From
            outboundSerialToDate:      $("#outboundSerialToDate").val(),      //출고일자 To
            obNo:                       $("#outboundSerialObNo").val(),        //출고번호
            obGbnCd:                    $("#outboundSerialObGbnCd").val(),     //출고구분
            carNo:                      $("#outboundSerialCarNo").val(),       //차량번호
            deliveryDer:                $("#outboundSerialDeliveryDgr").val(), //배송차수
            storeCd:                    $("#outboundSerialStoreCd").val(),     //배송처
            obProgStCd:                 $("#outboundSerialObProgStCd").val(),  //진행상태
            soNo:                       $("#outboundSerialSoNo").val(),        //주문번호
            rstoreCd:                   $("#outboundSerialRstoreCd").val(),    //실배송처
            itemCd:                     $("#outboundSerialItemCd").val()        //제품코드

        };
        $outboundSerialHGrid.paragonGridSearch(data);
    }
    //[Fn] Row 추가 버튼 이벤트
    function fnAddOutboundSerailEvent(){
        //Validation 선택된 로우데이터에서 출고예정 총량 수량초과로 로우데이터 추가 불가능.    x
        var rowId = $outboundSerialHGrid.getGridParam("selrow");
        var planQty = $outboundSerialHGrid.getRowData(rowId).PLAN_QTY;
        var gridRowCnt = $outboundSerialDGrid.getGridParam("records");

        if(Number(gridRowCnt + 1) >= Number(planQty)){
            Util.alert('MSG_COM_ERR_073'); //더이상 데이터를 추가 할 수 없습니다.
            return;
        }

        $outboundSerialDGrid.paragonGridAddRow({
            addData: {"OB_NO": gridRowData.OB_NO,
                      "OB_DETAIL_SEQ" : gridRowData.OB_DETAIL_SEQ
                     }
        });
    }
    //[Fn] Row 삭제 버튼 이벤트
    function fnDelOutboundSerailEvent(){
        //var addFlag = $outboundSerialDGrid.paragonGridCheckedDelete();
        var addFlag = $outboundSerialDGrid.paragonGridCheckedDeleteData();
        //var addFlag = false;

        if(addFlag === false){
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/outbound/outboundSerial/saveSentence";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag:    "MOD_FLAG",
                obSerailNo: "OB_SERIAL_NO",
                obNo:       "OB_NO",
                obDetailSeq:"OB_DETAIL_SEQ",
                serialId:   "SERIAL_ID",
                lotId:      "LOT_ID",
                pltId:      "PLT_ID"
            };

            //1. 체크된 리스트.
            var jsonData = $outboundSerialDGrid.getSelectedJsonDataChk("dt_data", rowData, $outboundSerialDGrid);

            //ajax Event.
            fnAjaxSave(jsonData, saveUrl, msg);
        }
    }
    //[Fn] Save 저장 버튼 이벤트
    function fnSaveOutboundSerailEvent(){
        var saveUrl = "/ctrl/outbound/outboundSerial/saveSentence";
        var rowData = {
            modFlag:    "MOD_FLAG",
            obSerailNo: "OB_SERIAL_NO",
            obNo:       "OB_NO",
            obDetailSeq:"OB_DETAIL_SEQ",
            serialId:   "SERIAL_ID",
            lotId:      "LOT_ID",
            pltId:      "PLT_ID"
        };

        //1. 체크된 리스트.
        var jsonData = $outboundSerialDGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        if(!fnValidate()) return false;

        var data = JSON.parse(jsonData);
        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?

        fnAjaxSave(JSON.stringify(data), saveUrl, msg);

    }

    function fnValidate(){
        var ids = $outboundSerialDGrid.getDataIDs();
        var rowFlag = "";
        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_outboundSerialDGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $outboundSerialDGrid.getRowData(ids[i]);

                rowFlag = $outboundSerialDGrid.getRowData(ids[i]).MOD_FLAG;

                if(!(rowdata.SERIAL_ID)){
                    Util.alert('MSG_INRI_VAL_051'); //시리얼ID 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.SERIAL_ID.trim().length == 0 ){
                    Util.alert('MSG_INRI_VAL_051'); //시리얼ID는 공백만으로 입력할 수 없습니다.
                    return false;
                }
                if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                    Util.alert('MSG_COM_VAL_071', $outboundSerialDGrid.getRowData(ids[i]).SERIAL_ID); //[ {0} ]은(는) 변경된 값이 없습니다.
                    return false;
                }
            }
        }

        return true;
    }
    //***********5. Popup **********
    //[Fn] 고객사 Popup
    function fnModalClientGridPop(){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/clientPopup",
            id : "modalClientPopup",
            width : "550",
            btnName : "수정",
            //title : "Client 검색",
            domainId: "PWMCM105Q_P1",
//            data: { clientCd : $("#outboundSerialClientCd").val() },
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#outboundSerialClientCd").val(data.CLIENT_CD);
                $("#outboundSerialClientNm").val(data.CLIENT_NM);
            }
        });
    }
    //[Fn] PopUP
    function fnModalStoreGrid(storeFlag){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/storePop", //배송처명으로 변경.
            id : "modalStorePopup",
            width : "550",
            btnName : "수정",
            domainId : "PWMCM107Q_P1",
            onload : function(modal) {
                // 팝업화면 클릭 시 code, name.
                var callBack;
                if(storeFlag === "1")
                {
                    callBack ={
                        "STORE_CD": "outboundSerialStoreCd",  // "", "text box id"
                        "STORE_NM": "outboundSerialStoreNm"
                    };
                }else {
                    callBack ={
                        "STORE_CD": "outboundSerialRstoreCd",  // "", "text box id"
                        "STORE_NM": "outboundSerialRstoreNm"
                    };
                }

                App.setElIds(callBack);
                modal.show();
            }
        });
    }
    //[Fn] 제품 Popup
    function fnModalItemGridPop(){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/itemPop",
            id : "modalItemPopup",
            width : "550",
            btnName : "수정",
            data : {clientCd : $("#outboundSerialClientCd").val()},
//            title : "제품 검색",
            domainId: "ITEM_LIST",
            onload : function(modal) {
                // 팝업화면 클릭 시 code, name.
                var callBack ={
                    "ITEM_CD": "outboundSerialItemCd",  // "", "text box id"
                    "ITEM_NM": "outboundSerialItemNm"
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }
}();

/********************************************************************
 * bootstrap-datepicker 달력오픈 중, 탭 이동시 달력 hide
 * Since   : 2017-08-29
 * 작성자  : Kim Seon Ho
 * 수정내역: 2017-09-08 Tab-menu 종료시 마우스 클릭 인식 안되, datepicker(hide) 가 안되던 현상 수정
 ********************************************************************/
$("li.active").siblings().click(function () {
    // trigger the datepicker
    $('.date').datepicker('hide');
});
$("li.active").live("click focusout", function (e) {
    // trigger the datepicker
    $('.date').datepicker('hide');
});

$(document).ready(function(){
    OutboundSerialApp.init();
});
