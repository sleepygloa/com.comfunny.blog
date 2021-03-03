/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 구역관리[MasterAreaApp]
 * Program Code     : PWMMS102E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 20.        First Draft.
 */
var IbSerialApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    // [El]프로그램 그리드
    var $ibSerialHGrid = $("#ibSerialHeaderGrid");

    var $ibSerialDGrid = $("#ibSerialDetailGrid");

    var itemStatusCombo;

    var $callBackInput;

    var ibProgStComboJson;

    var ibGbnComboJson;

    var firstLoad = true;

    var ibNoH;
    var detSeqH;

    return {
        init: function () {
            //
            fnListItemStatus("ITEM_ST_CD");

            fnListProgStsJson("IB_PROG_ST_CD");
            //
            fnListIbGubunJson("IB_GBN_CD");

            toDateSetEvnet()

            fnListIbSerialH();

            fnIbSerialEvents();

            //$("#ibSerialYmdS").datepicker({});
            //$("#ibSerialYmdE").datepicker({});
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

  //datepicker Set up today.
    function toDateSetEvnet() {
        $("#ibSerialYmdS").datepicker("setDate", new Date());
        $("#ibSerialYmdE").datepicker("setDate", new Date());
    }


    //[Fn] 이벤트
    function fnIbSerialEvents(){

        //코드 입력시 명 서치
        addClientCdChangeEvent("ibSerialClient", []);          //고객사

        //검색버튼
        $("#searchIbSerialBtn").click(function(){
            fnSearch();
        });

        $("#ibSerialClientPopup").click(function(){
            fnClientPop();
        });

        $("#ibSerialSupPopup").click(function(){
            fnSupplierPop();
        });

        $("#ibSerialClientNm").attr("disabled", true);

        $("#ibSerialClientCd").change(function(){
            if($("#ibSerialClientCd").val() == ""){
                $("#ibSerialClientNm").val("");
            }
        });

        $("#ibSerialAddBtn").click(function(){
            fnDetailAdd();
        });

        $("#ibSerialSaveBtn").click(function(){
            fnDetailSave();
        });

        $("#ibSerialDelBtn").click(function(){
            fnDel();
        });
    }

    function fnClientPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/clientPopup',
            id : 'modalClientPopup',
            width : '550',
            domainId:"PWMCM105Q_P1",
//            data: {clientCd: $("#ibSerialClientCd").val()},
            visible:true,
            onload : function(modal) {
                var callBack ={
                        "CLIENT_CD" :"ibSerialClientCd",
                        "CLIENT_NM" :"ibSerialClientNm"
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }

    function fnSupplierPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/supplierPop',
            id : 'modalSupplierPopup',
            width : '550',
            domainId:"PWMCM106Q_P1",
            visible:true,
            onload : function(modal) {
                var callBack ={
                        "SUPPLIER_CD" :"ibApprovalSupCd",
                        "SUPPLIER_NM" :"ibApprovalSupNm"
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }

    function fnListItemStatus(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            success : function(result) {
                itemStatusCombo = result;
            }
        });
    }

    //[Fn] 입고진행상태 콤보박스 JSON 조회
    function fnListProgStsJson(groupCd){
        $.ajax({
            url : "/ctrl/inbound/inboundSerial/listIbCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            success : function(result) {
                ibProgStComboJson = result;
                Util.MakeSelectOptions($("#ibSerialProgStCd"),result);
            }
        });
    }

    //[Fn] 입고구분 콤보박스 JSON 조회
    function fnListIbGubunJson(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            success : function(result) {
                ibGbnComboJson = result;
                Util.MakeSelectOptions($("#ibSerialGbnCd"),result);
            }
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        ibNoH = "";
        detSeqH = "";

        //validation
        if($("#ibSerialClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibSerialClientCd").focus();
            return false;
        }else if($("#ibSerialClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibSerialClientCd").focus();
            return false;
        }
        if($("#frIbSerialYmd").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#frIbSerialYmd").focus();
            return false;
        }else if($("#frIbSerialYmd").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#frIbSerialYmd").focus();
            return false;
        }
        if($("#toIbSerialYmd").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#toIbSerialYmd").focus();
            return false;
        }else if($("#toIbSerialYmd").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#toIbSerialYmd").focus();
            return false;
        }

        var data = {
                clientCd : $.trim($("#ibSerialClientCd").val()),
                frIbSerialYmd : $.trim($("#frIbSerialYmd").val()),
                toIbSerialYmd : $.trim($("#toIbSerialYmd").val()),
                ibProgStCd : $.trim($("#ibSerialProgStCd").val()),
                ibGbnCd : $.trim($("#ibSerialGbnCd").val()),
                ibNo : $.trim($("#serialIbNo").val()),
                carNo : $.trim($("#ibSerialCarNo").val())
        };
        $ibSerialHGrid.paragonGridSearch(data);
    }

    /********************************************************************
     * 그리드 생성
     * Since   : 2017-02-20
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    function fnListIbSerialH(){
        $ibSerialHGrid.paragonGrid({
            url: '/ctrl/inbound/inboundSerial/listInboundSerialH',
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            shrinkToFit:false,
            //postData:{clientCd:$.trim($("#ibSerialClientCd").val())},
            rowClickFocus:true,
            height:'185',
            postData: {
                clientCd : $.trim($("#ibSerialClientCd").val()),
                frIbSerialYmd : $.trim($("#frIbSerialYmd").val()),
                toIbSerialYmd : $.trim($("#toIbSerialYmd").val()),
                ibProgStCd : $.trim($("#ibSerialProgStCd").val()),
                ibGbnCd : $.trim($("#ibSerialGbnCd").val()),
                ibNo : $.trim($("#serialIbNo").val()),
                carNo : $.trim($("#ibSerialCarNo").val())
            },
            colModel:[
                {editable: false,name:'CLIENT_CD', width:"100px", hidden:true},
                {editable: false,name:'CLIENT', width:"100px", align:"left"},
                {editable: false,name:'IB_PLAN_YMD', width:"100px", align:"center"},
                {editable: false,name:'IB_YMD', width:"100px", align:"center"},
                {editable: false,name:'IB_NO', width:"100px", align:"center"},
                {editable: false,name:'IB_DETAIL_SEQ', width:"80px", align:"center"},
                {editable: false,name:'PO_YMD', width:"100px", align:"center"},
                {editable: false,name:'PO_NO', width:"100px", align:"center"},
                {editable: false,name:'CAR_NO', width:"80px", align:"center"},
                {editable: false,name:'IB_GBN_CD', width:"100px", hidden:true},
                {editable: false,name:'IB_GBN', width:"80px", align:"center"},
                {editable: false,name:'SUPPLIER_CD', width:"100px", hidden:true},
                {editable: false,name:'SUPPLIER_NM', width:"150px", align:"left"},
                {editable: false,name:'ITEM_CD', width:"100px", align:"center"},
                {editable: false,name:'ITEM_NM', width:"150px", align:"left"},
                {editable: false,name:'ITEM_SPEC', width:"100px", align:"center"},
                {editable: false,name:'ITEM_ST_CD', width:"100px", hidden:true},
                {editable: false,name:'ITEM_ST', width:"100px", align:"center"},
                {editable: false,name:'PKQTY', width:"100px", align:"center"},
                {editable: false,name:'UOM', width:"100px", align:"center"},
                {editable: false,
                    name:'CONF_QTY',
                    width:"100px",
                    align:"right",
                    hidden: true},
                {editable: false,
                    /* 화면 컬럼 도메인명 처리 2017.08.04 */
                    //name:'CONF_QTY',
                    name:'CONF_TOT_QTY',
                    width:"100px",
                    align:"right"},
                {editable: false,name:'CONF_BOX_QTY', width:"100px", align:"right"},
                {editable: false,name:'CONF_EA_QTY', width:"100px", align:"right"},
                {editable: false,name:'PLAN_WEIGHT', width:"100px", align:"right"},
                {editable: false,name:'IB_PROG_ST_CD', width:"100px", hidden:true},
                {editable: false,name:'IB_PROG_ST', width:"80px", align:"center"}
            ],
            pager: "#ibSerialHeaderGridNavi",
            domainId:"IB_LIST",
            gridComplete: function(){
                var ids = $ibSerialHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $ibSerialHGrid.setFocus(0);
                    ibNoH = $ibSerialHGrid.getRowData(ids[0]).IB_NO;
                    detSeqH = $ibSerialHGrid.getRowData(ids[0]).IB_DETAIL_SEQ;
                }
                if(firstLoad){
                    fnListIbSerialD(ibNoH, detSeqH);
                    firstLoad = false;
                }else{
                    if(ibNoH != null){
                        $ibSerialDGrid.paragonGridSearch({ibNo:ibNoH, ibDetailSeq:detSeqH});
                    }else{
                        $ibSerialDGrid.paragonGridSearch({ibNo:null, ibDetailSeq:null});
                    }
                }
           },onSelectRowEvent: function(currRowData, prevRowData){
               ibNoH = currRowData.IB_NO;
               detSeqH = currRowData.IB_DETAIL_SEQ;
               $ibSerialDGrid.paragonGridSearch({ibNo:ibNoH, ibDetailSeq:detSeqH});
               console.log(ibNoH, detSeqH);
           },
           groupHeaders:[
                         {
                             rowspan : true,
                             header:[
                                 {start: 'CONF_TOT_QTY', length: 3 , domain:"CONF_QTY" }
                             ]
                         }]
        });
    }

    function fnListIbSerialD(ibNo,detSeq){
        $ibSerialDGrid.paragonGrid({
            url: '/ctrl/inbound/inboundSerial/listInboundSerialD',
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            shrinkToFit:false,
            multiselect:true,
//            multielonly:true,
            rowClickFocus:true,
            postData:{ibNo:ibNo, ibDetailSeq:detSeq},
            height:'185',
            colModel:[
                {editable: false,name:'IB_NO', width:"100px", align:"center", hidden:true},
                {editable: false,name:'IB_DETAIL_SEQ', width:"100px", align:"center", hidden:true},
                {editable: false,name:'IB_SERIAL_NO', width:"100px", align:"center", hidden:true},
                {editable: true,name:'SERIAL_ID', width:"250px", align:"center", editoptions:{maxlength:20}},
                {editable: true,name:'LOT_ID', width:"250px", align:"center",editoptions:{maxlength:20}},
                {editable: true,name:'PLT_ID', width:"250px", align:"center",editoptions:{maxlength:20}},
                {editable: true,name:'REMARK', width:"780px", align:"center",editoptions:{maxlength:500}},
                {editable: false,name:'OLD_SERIAL_ID', width:"100px", align:"center", hidden:true},
            ],
            pager: "#ibSerialDetailGridNavi",
            domainId:"IB_SERIAL_LIST"
        });
    }


    //[Fn] Grid Delete Data Row. 입고시리얼 삭제
    function fnDel() {

        var addFlag = $ibSerialDGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/inbound/inboundSerial/saveIbSerial";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag         : "MOD_FLAG",
                ibNo            : "IB_NO",
                ibDetailSeq     : "IB_DETAIL_SEQ" ,
                ibSerialNo      : "IB_SERIAL_NO",
                serialId        : "SERIAL_ID",
                lotId           : "LOT_ID",
            };

            //1. 체크된 리스트.
            var jsonData = $ibSerialDGrid.getSelectedJsonDataChk("dt_ibSerialD", rowData, $ibSerialDGrid);

            //ajax Event.
            fnAjaxSave(jsonData, saveUrl, msg);
        }
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
                alert(data.msgTxt);
                // console.log(data);
                fnReloadGrid();
            }
        });
    }
    //[Fn] Reload Grid Method
    function fnReloadGrid() {
        $ibSerialDGrid.paragonGridReload();
    }

    function fnDetailSave(){
        var rowData = {
                modFlag:"MOD_FLAG" ,
                ibNo:"IB_NO",
                ibDetailSeq:"IB_DETAIL_SEQ" ,
                ibSerialNo:"IB_SERIAL_NO",
                serialId:"SERIAL_ID",
                oldSerialId:"OLD_SERIAL_ID",
                lotId:"LOT_ID",
                pltId : "PLT_ID",
                remark : "REMARK"
        }
        //DATA Loading
        var chkData = $ibSerialDGrid.getSelectedJsonData("dt_ibSerialD",rowData);

        //셀 체크했는지 확인
        if(chkData == false){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var ids = $ibSerialDGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $ibSerialDGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $ibSerialDGrid.getRowData(ids[i]).SERIAL_ID); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        //유효성검사
        if(!fnValidate()) return false;

        //플래그 로직
        if (!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return; //저장하시겠습니까?
        //App.prcsStart();
        $.ajax({
            url : "/ctrl/inbound/inboundSerial/saveIbSerial",
            data :chkData,
            type : "POST",
            dataType : "json",
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success : function(data) {
                //App.prcsEnd();
                if(data.stsCd == "999"){
                    alert(data.msgTxt);
                }else{
                    alert(data.msgTxt);
                    $ibSerialDGrid.paragonGridReload();
                }
            }
        });
    }

    function fnDetailAdd(){

        var rowId = $ibSerialHGrid.getGridParam("selrow");
        var cQty = $ibSerialHGrid.getRowData(rowId).CONF_QTY;
        var dataCnt = $ibSerialDGrid.getGridParam("records");
        console.log(cQty, dataCnt);
        if(dataCnt >= Number(cQty)){
            return false;
        }

        $ibSerialDGrid.paragonGridAddRow({
            addData:{"IB_NO": ibNoH,
                     "IB_DETAIL_SEQ":detSeqH}
        });
    }

    function fnValidate(){

        var ids = $ibSerialDGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_ibSerialDetailGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $ibSerialDGrid.getRowData(ids[i]);

                if(!(rowdata.SERIAL_ID)){
                    Util.alert('MSG_INRI_VAL_051'); //시리얼ID 항목은 필수 입력입니다.
                    return false;
                }
            }
        }
        return true;
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

$(document).ready(function() {
    IbSerialApp.init();
});
