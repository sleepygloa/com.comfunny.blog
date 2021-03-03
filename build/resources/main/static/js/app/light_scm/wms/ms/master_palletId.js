/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 파렛트ID관리[MasterPltIdApp]
 * Program Code     : PWMMS113E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 2. 17.  		First Draft.
 */

var MasterPltIdApp = function() {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    var $pltGrid = $("#masterPalletIdGrid");
    var useYnComboJson;
    var createPltIdData;
    var $callBackInput;
    var totalGridRowCnt;
    var gridUseYnOptions;//사용여부

    return {
        init: function() {
            fnListUseYnJson("USE_YN");
            //********** 1.Create Grid List **********
            palletIdManagementJson();
            //********** 2.About Event List Function. **********
            fnGetRowCount();
            palletIdManagementEvent();
        }, callBackInput: function () {
            return $callBackInput;
        }
    };

    //********** 1.Create Grid List **********
    //palletIdManagement Data Searching and Grid (with ajax).
    //When create a grid, view data list.
    function palletIdManagementJson() {
        $pltGrid.paragonGrid({
            url: "/ctrl/master/palletId/getPalletInfoList",
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            multiselect: true,  // 멀티 체크 박스.
//            multielonly:true,   //
            //multiboxonly: true,
            rowClickFocus:true,
            shrinkToFit: false,
            domainId: "PLT_ID_LIST",
            height: "616",
            colModel: [
                {editable: false, name: "PLT_ID",   width:"180px", align: "center", required:true},
                {editable: true,  name: "PLT_NM",   width:"250px", align: "left"},
                {editable: true,  name: "SPEC_CD",  width:"180px", align: "center",
                    searchBtnClick : function(value, rowid, colid) {
                        $("#specTypeCdPlt").val('1');
                        fnModalGridSpec(rowid);
                        }
                },
                {editable: true,  name: "SPEC_NM",   width:"350px", align: "center"},
                {editable: true,  name: "REMARK",   width:"400px", align: "center"},
                {editable: true,  name: "USE_YN",   align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridUseYnOptions
                    },
                    width: "180px"
            }],
            loadComplete: function(){
                totalGridRowCnt = $pltGrid.getGridParam('records');

                var ids = $pltGrid.jqGrid("getDataIDs");

                if(ids && ids.length > 0){
                    $pltGrid.setFocus(0);
                }
            },
            pager: "#masterPalletIdGridNavi"
        }); //grid
    } //palletIdManagementJson func


    //********** 2.About Event List Function. **********
    //pallet Management Method Event List.
    function palletIdManagementEvent() {
        //createBtn Event.
        $("#createPltBtn").click(function() {
            fnCreatePalletId();
        });
        //searchPltBtn Event.
        $("#searchPltBtn").click(function() {
        	fnSearch();
        });
        //addBtn Event.
        $("#addPltRowBtn").click(function() {
            //fnAddDc();
            $pltGrid.paragonGridAddRow();
        });
        //saveBtn Evnet.
        $("#savePltRowBtn").click(function() {
            fnSave();
        });
        //deleteBtn Event.
        $("#delPltRowBtn").click(function() {
            //$pltGrid.paragonGridCheckedDelete();
            fnDel();
        });
        //ExcelBtn Event.
        $("#excePltlBtn").click(function() {
            $pltGrid.downloadExcel();
        });
        // Pallet Pop Btn
        $("#palletPopBtn").click(function(){
            fnModalGrid();
        });
        //Popup Grid SPEC CD
        $("#specCdPltPopBtn").click(function(){
            $("#specTypeCdPlt").val('1');
            fnModalSpec();
        });
        //파렛트 ID 엔터키 이벤트
        $("#pltId").keydown(function(key){
            if(key.keyCode == 13){
                //그리드 수정 여부 체크
                if (fnModCheck()) {
                    var data = {
                        pltId:  $("#pltId").val(),
                    };
                    $pltGrid.paragonGridSearch(data);
                }
            }
        });
        //스펙규격 엔터키 이벤트
        $("#specCd").keydown(function(key){
            if(key.keyCode == 13){
                //그리드 수정 여부 체크
                if (fnModCheck()) {
                    var data = {
                        specCd:  $("#specCd").val(),
                    };
                    $pltGrid.paragonGridSearch(data);
                }
            }
        });

        //인쇄 버튼
        $("#reportPltBtn").click(function(){
            if(0 != $pltGrid.getGridParam("selarrrow").length){
                fnReport("/ctrl/master/palletId/palletLabelReport");
            }else{
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            }
        });

        $("#pltNm").attr("disabled", true); //파레트ID
        $("#specNmPlt").attr("disabled", true); //규격코드

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
                // console.log(result);
                gridUseYnOptions = Util.MakeGridOptions(result);
                Util.MakeSelectOptions($("#useYnPlt"), result);
            }
        });
    }


    //********** Function Event Method Space.*********
    //[Fn] Creating Pallet Event Method.
    function fnCreatePalletId() {
        var rtnData = strHtmlCode();
        //1. Click 팝업화면 출력. String Type
        //2. call jsp type.
        PopApp.paragonOpenPopup({
          ajaxUrl: "/ctrl/master/palletId/createPallet",
          id : "createPalletNum",
          width: "500",
          btnName: "일괄생성",
          domainId: "PWMMS113E_P1",
          onload: function(modal){
              modal.show();
          }
        });

    }
    //[Fn] Searching Event Method.
    function fnSearch() {
        //그리드 수정 여부 체크
        if (fnModCheck()) {
            var data = {
                pltId:  $("#pltId").val(),
                specCd: $("#specCd").val(),
                useYn:  $("#useYnPlt").val()
            };
            $pltGrid.paragonGridSearch(data);
        }

    }
    //[Fn] Grid Add Row.
    function fnAddDc() {
      //1. Pallet Id 채번 불러오기.
      $.ajax({
        url: "/ctrl/master/palletId/getPalletId",
        type: "POST",
        dataType: "json",
        cache: false,
        success: function(result) {
          $pltGrid.paragonGridAddRow({
            addData: {"PLT_ID" : result.O_LAST_VAL}
          });
        }
      });

    }
    //[Fn] Grid Save Data Row.
    function fnSave() {
        //DataTable data key : value Key
        var rowData = {
            modFlag:  "MOD_FLAG",
            pltId:    "PLT_ID",
            pltNm:    "PLT_NM",
            specCd:   "SPEC_CD",
            remark:   "REMARK",
            useYn:    "USE_YN"
        };
        var saveUrl = "/ctrl/master/palletId/savePalletId";
        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?

        //1. get json data from List.
        //* 체크된 데이터.
        var jsonData = $pltGrid.getSelectedJsonData("dt_data", rowData);

        var ids = $pltGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $pltGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $pltGrid.getRowData(ids[i]).PLT_ID); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        //2. data change validation check.
        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        fnAjaxSave(jsonData, saveUrl, msg);

    }
    //[Fn] Grid Delete Data Row.
    function fnDel() {

        var addFlag = $pltGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/master/palletId/savePalletId";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag:  "MOD_FLAG",
                pltId:    "PLT_ID",
                clientCd: "CLIENT_CD"
            };

            //1. 체크된 리스트.
            var jsonData = $pltGrid.getSelectedJsonDataChk("dt_data", rowData, $pltGrid);

            // console.log("선택된 삭제 데이터:", jsonData);
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
                // console.log(data);

                if (data.stsCd == "001") {
                    //001 데이터 성공
                    alert(data.msgTxt);
                    fnReloadGrid();
                }else{
                    alert(data.msgTxt);
                    return;
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
        $pltGrid.paragonGridReload();
    }
    //[Fn] Grid Modify Checking.
    function fnModCheck() {
        return $pltGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }
    //[Fn] Popup Grid.
    function fnModalGrid(){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/palletPop",
            id : "modalPalletPopup",
            width : "550",
            btnName : "수정",
            domainId:"PWMCM114Q_P1",
            onload : function(modal) {
                // 팝업화면 클릭 시 code, name.
                var callBack ={
                    "PLT_ID": "pltId",
                    "PLT_NM": "pltNm"
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
                    "SPEC_CD":  "specCd",
                    "SPEC_NM":  "specNmPlt"
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
                $pltGrid.setCell("SPEC_CD",data.SPEC_CD,rowid);
                $pltGrid.setCell("SPEC_NM",data.SPEC_NM,rowid);
            }
        });
    }
    //[Fn]Test
    function strHtmlCode(){
        var createPalletIdStr =
        "<div class='form-group m-r-10'>" +
              "<input type ='text' class='form-control input-sm'" +
                  "id='pltCnt' size='15' placeholder='갯수' width='50px'>" +
              "<input type='text' class='form-control input-sm'"+
                  "id='createPltNm' size='15' placeholder='파렛트명'>"+
       "</div>";
      return createPalletIdStr;

    }
    //[Fn] Get Grid Row count
    function fnGetRowCount(){
        // console.log($pltGrid.getRowData().length);
    }

    function fnReport(ReportUrl){
        //App.prcsStart();
        var reportRowData = {
                pltId : "PLT_ID",
        }
        var jsonData = $pltGrid.getSelectedJsonData("dt_data", reportRowData);
        var jsonObject = JSON.parse(jsonData);
        var jsonStr = JSON.stringify(jsonObject);
        var doubleClickFlag=false;

            $.ajax({
                url:ReportUrl, //출고지시
                data: jsonStr,
                type:"POST",
                datatype:"JSON",
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success:function(data){
                    //App.prcsEnd();
                    var openNewWindowReport = window.open("about:blank");
                    openNewWindowReport.location.href=data.fileName;
                },
                complete: function(){
                    //App.prcsEnd();
                }
            });
    }

}(); //MasterPltIdApp End

$(document).ready(function() {
    MasterPltIdApp.init();
});
