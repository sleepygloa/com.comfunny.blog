/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : AreaPopup관리
 * Program Code     : PWMMS103E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 23.        First Draft.
 */
var InboundTcReqCreatePopApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    // [El]프로그램 그리드
    var $inboundTcReqPopGrid = $("#inboundTcReqPopGrid");

    var $ibTcReqHGrid = $("#ibTcReqHeaderGrid")

    var itemStatusCombo;

    var $callBackInput;

    var modify = $(window.document).find("#tcGbn").attr("value");
    var hiddenTcReqNo = $(window.document).find("#tcReqNoHidden").attr("value");
    console.log(modify);

    return {
        init: function () {

            fnListItemStatus("ITEM_ST_CD");

            if(modify == "false"){
                fnListInboundTcReqCreatePop();
                $("#ibTcReqYmdSP").datepicker({});
            }else{
                fnListInboundTcReqModifyPop();
                fnInboundTcReqHInfo();
                $("#ibTcReqNoP").val(hiddenTcReqNo);
                $("#ibTcReqYmdP").attr('disabled', true);
            }
            $("#ibTcReqClientCdP").attr('disabled', true);
            $("#ibTcReqClientNmP").attr('disabled', true);
            $("#ibTcReqClientPop").attr('disabled', true);
            $("#ibTcReqNoP").attr('disabled', true);

            fnInboundTcReqCreateEvents();

            $("#ibOTcReqYmdSP").datepicker({});
            toDateSetEvnet(); //날자 디폴트 입력 이벤트
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };


    //[Fn] 이벤트
    function fnInboundTcReqCreateEvents(){

        //검색버튼
        $("#addIbTcReqPopBtn").click(function(){
            $inboundTcReqPopGrid.paragonGridAddRow();
            //행추가시 박스수량, 낱개수량 기본값 0 입력
            fnAddRowQtyDefault($inboundTcReqPopGrid);
        });

        $("#saveIbTcReqPopBtn").click(function(){
            fnSave();
        });

        $("#delIbTcReqPopBtn").click(function(){
            fnDelete();
        });

        $("#ibTcReqClientPop").click(function(){
            fnClientPop();
        });
    }

    function fnClientPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/clientPopup',
            id : 'modalClientPopup',
            width : '550',
            title : "고객사 검색",
            visible:true,
            onload : function(modal) {
                var callBack ={
                        "CLIENT_CD" :"ibPlanClientCdP",
                        "CLIENT_NM" :"ibTcReqClientNmP"
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
            async:false,
            success : function(result) {
                itemStatusCombo = Util.MakeGridOptions(result);
            }
        });
    }

    /********************************************************************
     * 그리드 생성
     * Since   : 2017-02-23
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    //[Fn] jqgrid 목록
    function fnListInboundTcReqCreatePop(){
        $inboundTcReqPopGrid.paragonGrid({
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            loadui: 'disable',
            rowClickFocus: true,
            shrinkToFit: false,
            multiselect: true,
//            multielonly: true,
            height:'300',
            width:'1300',
            colModel:[
                      {editable: false,name:'TC_REQ_NO', width:"100px"},
                      {editable: false,name:'TC_REQ_DETAIL_SEQ', width:"100px", align:"center"},
                      {editable: true,name:'ITEM_CD', width:"100px", align:"center", required:true,
                          searchBtnClick : function(value, rowid, colid) {
                              fnInboundTcReqItemPop(rowid);
                              }, disabled:true
                      },
                      {editable: false,name:'ITEM_NM', width:"100px"},
                      {editable: false,name:'ITEM_SPEC', width:"100px"},
                      {
                          editable: false,
                          name:'ITEM_ST_CD',
                          align:"center",
                          width:"100px",
                          fixed :true,
                          edittype:'select',
                          formatter:'select',
                          editoptions: {
                              value:itemStatusCombo
                          },
                          required:true
                      },
                      {editable: false,name:'PKQTY', width:"100px", align:"center"},
                      {editable: false,name:'UOM', width:"100px", align:"center"},
                      {editable: false,name:'REQ_QTY', width:"100px", align : "right", formatter : "integer"},
                      {editable: true,name:'REQ_BOX_QTY', width:"100px", align : "right", required:true,
                          editoptions : {
                              dataInit : function(el) {
                                  var rowid = $(el)[0].attributes.rowid.value;
                                  $(el).onlyNumber();
                                  $(el).keyup(function(){
                                      if($inboundTcReqPopGrid.getRow(rowid,"ITEM_CD") == ''){
                                          Util.alert('MSG_COM_VAL_007', "ITEM_CD"); //{0}을(를) 선택해 주십시오.
                                          return;
                                      }
                                      if($inboundTcReqPopGrid.getRow(rowid,"REQ_BOX_QTY") == ''){
                                          $inboundTcReqPopGrid.setCell("REQ_BOX_QTY",0,rowid);
                                      }
                                      setReqTotQty(rowid);
                                  });
                              }
                          }
                      },
                      {editable: true,name:'REQ_EA_QTY', width:"100px", align : "right", required:true,
                          editoptions : {
                              dataInit : function(el) {
                                  var rowid = $(el)[0].attributes.rowid.value;
                                  $(el).onlyNumber();
                                  $(el).keyup(function(){
                                      if($inboundTcReqPopGrid.getRow(rowid,"ITEM_CD") == ''){
                                          Util.alert('MSG_COM_VAL_007', "ITEM_CD"); //{0}을(를) 선택해 주십시오.
                                          return;
                                      }
                                      if($inboundTcReqPopGrid.getRow(rowid,"REQ_EA_QTY") == ''){
                                          $inboundTcReqPopGrid.setCell("REQ_EA_QTY",0,rowid);
                                      }
                                      setReqTotQty(rowid);
                                  });
                              }
                          }
                      },
                      {editable: false,name:'STOCK_QTY', width:"100px", align : "right", formatter:"integer"},
                      {editable: false,name:'STOCK_BOX_QTY', width:"100px", align : "right", formatter:"integer",
                          editoptions : {
                              dataInit : function(el) {
                                  $(el).onlyNumber();
                              }
                          }
                      },
                      {editable: false,name:'STOCK_EA_QTY', width:"100px", align : "right", formatter:"integer",
                          editoptions : {
                              dataInit : function(el) {
                                  $(el).onlyNumber();
                              }
                          }
                      },
                      {editable: true,name:'OB_DC_CD', width:"100px",
//                          required:true,
                          searchBtnClick : function(value, rowid, colid) {
                              fnModalDcHGrid(rowid);
                          }, disabled:true
                      }
                  ],
            pager: "#inboundTcReqPopGridNavi",
            domainId:"IB_TC_LIST",
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'REQ_TOT_QTY', length: 3 , domain:"REQ_QTY"}
                              ]
                          },
                          {
                              rowspan : true,
                              header:[
                                  {start: 'STOCK_TOT_QTY', length: 3 , domain:"STOCK_QTY"}
                              ]
                          }
                          ]
        });
    }

    function setReqTotQty(rowid){
        var reqTotQty = 0;

        var pkQty = Number($inboundTcReqPopGrid.getRow(rowid,"PKQTY"));
        var box = Number($inboundTcReqPopGrid.getRow(rowid,"REQ_BOX_QTY"));
        var ea = Number($inboundTcReqPopGrid.getRow(rowid,"REQ_EA_QTY"));

        reqTotQty =  box * pkQty + ea;
        $inboundTcReqPopGrid.setCell("REQ_QTY",reqTotQty,rowid);
    }

    function fnListInboundTcReqModifyPop(){
        $inboundTcReqPopGrid.paragonGrid({
            url: '/ctrl/inbound/inboundTcReq/listInboundTcReqHPop',
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            height:'300',
            width:'1300',
            multiselect:true,
//            multielonly:true,
            rowClickFocus:true,
            postData:{tcReqNo:hiddenTcReqNo},
            colModel:[
                      {editable: false,name:'TC_REQ_NO', width:"100px", align:"center"},
                      {editable: false,name:'TC_REQ_DETAIL_SEQ', width:"100px", align:"center"},
                      {editable: true,name:'ITEM_CD', width:"100px", align:"center",
                          required: true,
                          searchBtnClick : function(value, rowid, colid) {
                              fnInboundTcReqItemPop(rowid);
                              }, disabled:true
                      },
                      {editable: false,name:'ITEM_NM', width:"100px", align:"left"},
                      {editable: false,name:'ITEM_SPEC', width:"100px", align:"center"},
                      {
                          editable: false,
                          name:'ITEM_ST_CD',
                          required: true,
                          align:"center",
                          width:"100px",
                          fixed :true,
                          edittype:'select',
                          formatter:'select',
                          editoptions: {
                              value:itemStatusCombo
                          }
                      },
                      {editable: false,name:'PKQTY', width:"100px", align:"center"},
                      {editable: false,name:'UOM', width:"100px", align:"center"},
                      {editable: false,name:'REQ_QTY', width:"100px", align : "right", formatter:"integer"},
                      {editable: true,name:'REQ_BOX_QTY', width:"100px", align : "right",
                          required: true,
                          editoptions : {
                              dataInit : function(el) {
                                  var rowid = $(el)[0].attributes.rowid.value;
                                  $(el).onlyNumber();
                                  $(el).keyup(function(){
                                      if($inboundTcReqPopGrid.getRow(rowid,"ITEM_CD") == ''){
                                          Util.alert('MSG_COM_VAL_007', "ITEM_CD"); //{0}을(를) 선택해 주십시오.
                                          return;
                                      }
                                      if($inboundTcReqPopGrid.getRow(rowid,"REQ_BOX_QTY") == ''){
                                          $inboundTcReqPopGrid.setCell("REQ_BOX_QTY",0,rowid);
                                      }
                                      setReqTotQty(rowid);
                                  });
                              }
                          }
                      },
                      {editable: true,name:'REQ_EA_QTY', width:"100px", align : "right",
                          required: true,
                          editoptions : {
                              dataInit : function(el) {
                                  var rowid = $(el)[0].attributes.rowid.value;
                                  $(el).onlyNumber();
                                  $(el).keyup(function(){
                                      if($inboundTcReqPopGrid.getRow(rowid,"ITEM_CD") == ''){
                                          Util.alert('MSG_COM_VAL_007', "ITEM_CD"); //{0}을(를) 선택해 주십시오.
                                          return;
                                      }
                                      if($inboundTcReqPopGrid.getRow(rowid,"REQ_EA_QTY") == ''){
                                          $inboundTcReqPopGrid.setCell("REQ_EA_QTY",0,rowid);
                                      }
                                      setReqTotQty(rowid);
                                  });
                              }
                          }
                      },
                      {editable: false,name:'STOCK_QTY', width:"100px", align : "right", formatter:"integer"},
                      {editable: false,name:'STOCK_BOX_QTY', width:"100px", align : "right", formatter:"integer",

                      },
                      {editable: false,name:'STOCK_EA_QTY', width:"100px", align : "right", formatter:"integer",

                      },
                      {editable: true,name:'OB_DC_CD', width:"100px",
//                          required: true,
                          searchBtnClick : function(value, rowid, colid) {
                              fnModalDcHGrid(rowid);
                          }
                      }
                  ],
            pager: "#inboundTcReqPopGridNavi",
            domainId:"IB_TC_LIST",
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'REQ_TOT_QTY', length: 3 , domain:"REQ_QTY"}
                              ]
                          },
                          {
                              rowspan : true,
                              header:[
                                  {start: 'STOCK_TOT_QTY', length: 3 , domain:"STOCK_QTY"}
                              ]
                          }
                          ]
        });
    }

    function fnModalDcHGrid(rowid){
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/dcPopup',
            id : 'modalDcPopup',
            width : '550',
            btnName : "수정",
            domainId:"PWMCM101Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $inboundTcReqPopGrid.setCell("OB_DC_CD",data.DC_CD,rowid);

            }
        });
    }

    function fnInboundTcReqItemPop(rowid){
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/inbound/inboundTcReq/ibTcReqItemInfo',
            id : 'inboundTcReqItemPop',
            width : "700",
            btnName : "수정",
            domainId:"PWMCM111Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $inboundTcReqPopGrid.setCell("ITEM_CD",data.ITEM_CD,rowid);
                $inboundTcReqPopGrid.setCell("ITEM_NM",data.ITEM_NM,rowid);
                $inboundTcReqPopGrid.setCell("ITEM_SPEC",data.ITEM_SPEC,rowid);
                $inboundTcReqPopGrid.setCell("ITEM_ST_CD",data.ITEM_ST_CD,rowid);
                $inboundTcReqPopGrid.setCell("PKQTY",data.PKQTY,rowid);
                $inboundTcReqPopGrid.setCell("UOM",data.UOM,rowid);
                $inboundTcReqPopGrid.setCell("STOCK_QTY",data.STOCK_QTY,rowid);
                $inboundTcReqPopGrid.setCell("STOCK_BOX_QTY",data.STOCK_BOX_QTY,rowid);
                $inboundTcReqPopGrid.setCell("STOCK_EA_QTY",data.STOCK_EA_QTY,rowid);
                $inboundTcReqPopGrid.setCell("HIGHRK_DC_CD",data.OB_DC_CD,rowid);
            }
        });
    }

    function fnSave(){

        if($("#ibOTcReqYmdP").val() != $("#ibOTcReqYmdPH").val()){
            $("#tcEdit").val("true");
        }

        var hData = {
            dt_ibTcReqH:[{
                edit:$("#tcEdit").val(),
                tcReqYmd:$("#ibTcReqYmdP").val(),
                obPlanYmd:$("#ibOTcReqYmdP").val(),
                tcReqNo:$("#ibTcReqNoP").val()
            }]
        }

        var formatData = {};
        var colModel = $inboundTcReqPopGrid.getGridParam('colModel');
        for (var i = 0; i < colModel.length; i++) {
            var colId = colModel[i]['name'];
            formatData[colId.strCamel()] = colId;
        }

        var rowid = $inboundTcReqPopGrid.jqGrid("getDataIDs");
        var chkGrid = false;
        console.log(rowid);

        for (var i = 0; i < rowid.length; i++) {
            var flag = $inboundTcReqPopGrid.getRowData(rowid[i]).MOD_FLAG;
            if(flag != ""){
                var chkGrid = true;
                break;
            }
        }

        var jsonData = "";
        if(modify == "true"){
            if(hData.dt_ibTcReqH[0].edit == "false" && chkGrid == false){
                Util.alert('MSG_COM_VAL_056'); //변경된 데이터가 없습니다.
                return false;
            }
        }
        if(chkGrid == false){
            jsonData = JSON.stringify(hData);
            console.log(jsonData);
        }else{
            jsonData = $inboundTcReqPopGrid.getJsonSelectedParamsData("dt_ibTcReqD",formatData, hData);
            console.log(jsonData);
        }

        if(!fnValidate()) return false;

        if(rowid == ""){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var sUrl = "";
        if(modify == "false"){
            sUrl = "insertInboundTcReqInfo";
        }else{
            sUrl = "updateInboundTcReqInfo";
        }

        if (!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return; //저장하시겠습니까?

        $.ajax({
            url:"/ctrl/inbound/inboundTcReq/"+sUrl,
            data:jsonData,
            dataType:"json",
            type:"POST",
            cache:false,
            contentType: 'application/json; charset=utf-8',
            success:function(data){
                console.log(data);
                alert(data.msgTxt);
                $("#createIbTcReqPop").paragonClosePopup();
                $ibTcReqHGrid.paragonGridReload();
            }
        });
    }

    function fnInboundTcReqHInfo(){
        $.ajax({
            url:'/ctrl/inbound/inboundTcReq/listInboundTcReqHPop',
            data:{tcReqNo:hiddenTcReqNo},
            success:function(data){
                var ibData = data.dt_grid[0];
                $("#ibTcReqYmdP").val(ibData.TC_REQ_YMD);
                $("#ibOTcReqYmdP").val(ibData.OB_PLAN_YMD);
                $("#ibOTcReqYmdPH").val(ibData.OB_PLAN_YMD);
                $("#ibTcReqNoP").val(ibData.TC_REQ_NO);
                $("#ibPlanClientCdP").val(ibData.CLIENT_CD);
            }
        });
    }

    function fnValidate(){

        //validation
        if($("#ibTcReqClientCdP").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibTcReqClientCdP").focus();
            return false;
        }else if($("#ibTcReqClientCdP").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibTcReqClientCdP").focus();
            return false;
        }
        if($("#ibTcReqYmdP").val().length == 0){//이고의뢰일자 검사
            Util.alert('MSG_INRI_VAL_023'); //이고의뢰일자 항목은 필수 입력입니다.
            $("#ibTcReqYmdP").focus();
            return false;
        }else if($("#ibTcReqYmdP").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_024'); //이고의뢰일자는 공백으로 입력 할 수 없습니다.
            $("#ibTcReqYmdP").focus();
            return false;
        }
        if($("#ibOTcReqYmdP").val().length == 0){//출고예정일자 검사
            Util.alert('MSG_INRI_VAL_025'); //출고예정일 항목은 필수 입력입니다.
            $("#ibOTcReqYmdP").focus();
            return false;
        }else if($("#ibOTcReqYmdP").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_026'); //출고예정일은 공백으로 입력할 수 없습니다.
            $("#ibOTcReqYmdP").focus();
            return false;
        }
        var currDate = new Date().toISOString().substr(0, 10).replace('T', ' ');

        if(modify == "false"){
            if(currDate > $("#ibTcReqYmdP").val()){
                Util.alert('MSG_INRI_ERR_023'); //이고의뢰 일자는 오늘보다 전일 일 수 없습니다.
                $("#ibTcReqYmdP").focus();
                return false;
            }
        }

        var ids = $inboundTcReqPopGrid.getGridParam('selarrrow');

        if(ids.length <= 0 ){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }else{
                for (var i = 0; i < ids.length; i++) {
                if($("input:checkbox[id='jqg_inboundTcReqPopGrid_"+ids[i]+"']").is(":checked")){
                    var rowdata = $inboundTcReqPopGrid.getRowData(ids[i]);

                    if(!(rowdata.ITEM_CD)){
                        Util.alert('MSG_MST_VAL_045'); //제품코드 항목은 필수 입력입니다.
                        return false;
                    }
                    if(rowdata.ITEM_CD.trim().length == 0 ){
                        Util.alert('MSG_MST_VAL_046'); //제품코드는 공백만으로 입력 할 수 없습니다.
                        return false;
                    }
                    if(!(rowdata.ITEM_ST_CD)){
                        Util.alert('MSG_INRI_VAL_027'); //제품상태코드 항목은 필수 입력입니다.
                        return false;
                    }
                    if(rowdata.ITEM_ST_CD.trim().length == 0 ){
                        Util.alert('MSG_INRI_VAL_028'); //제품상태코드는 공백으로 입력할 수 없습니다.
                        return false;
                    }

                    if(!(rowdata.REQ_BOX_QTY)){
                        Util.alert('MSG_INRI_VAL_029'); //이고박스수량 항목은 필수 입력입니다.
                        return false;
                    }
                    if(rowdata.REQ_BOX_QTY.trim().length == 0 ){
                        Util.alert('MSG_INRI_VAL_030'); //이고박스수량은 공백으로 입력할 수 없습니다.
                        return false;
                    }
                    if(!(rowdata.REQ_EA_QTY)){
                        Util.alert('MSG_INRI_VAL_031'); //이고낱개수량 항목은 필수 입력입니다.
                        return false;
                    }
                    if(rowdata.REQ_EA_QTY.trim().length == 0 ){
                        Util.alert('MSG_INRI_VAL_032'); //이고낱개수량은 공백만으로 입력할 수 없습니다.
                        return false;
                    }
                    if(parseFloat(rowdata.REQ_BOX_QTY) == 0 && parseFloat(rowdata.REQ_EA_QTY) == 0){
                        Util.alert('MSG_INRI_VAL_033'); //이고박스수량, 낱개수량은 0을 초과하여 입력해야 합니다.
                        return false;
                    }
                    if(parseFloat(rowdata.REQ_BOX_QTY) < 0 || parseFloat(rowdata.REQ_EA_QTY) < 0){
                        Util.alert('MSG_INRI_VAL_034'); //이고박스수량, 낱개수량은 음수를 입력할 수 없습니다.
                        return false;
                    }
                    if(rowdata.OB_DC_CD == $("#sessionDcCd").val()){
                        Util.alert('MSG_INRI_ERR_024'); //사용자와 동일 물류센터에 이고의뢰 하였습니다.
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function fnDelete(){

        var dataCnt = $inboundTcReqPopGrid.getGridParam("records");
        var ids = $inboundTcReqPopGrid.getGridParam('selarrrow');
//        console.log(123123, $inboundTcReqPopGrid.paragonGridCheckedDelete());
        var addFlag = $inboundTcReqPopGrid.paragonGridCheckedDeleteData();
        if (addFlag === false) {
            console.log(dataCnt, ids.length);
            var rowData = {};
            rowData = {
                    modFlag:"MOD_FLAG" ,
                    tcReqNo:"TC_REQ_NO",
                    tcReqProgStCd:"TC_REQ_PROG_ST_CD",
                    tcReqDetailSeq:"TC_REQ_DETAIL_SEQ"
            }
            var sUrl = "";
            var dataSet = "";
            if((dataCnt - ids.length) == 0){
                sUrl = "deleteInboundTcReq";
                dataSet = "dt_ibTcReq";
            }else{
                sUrl = "deleteInboundTcReqPop";
                dataSet = "dt_ibTcReqPop"
            }
            console.log(rowData);

            var chkData = $inboundTcReqPopGrid.getSelectedJsonData(dataSet,rowData);

            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

            $.ajax({
                url : "/ctrl/inbound/inboundTcReq/"+sUrl,
                data :chkData,
                type : "POST",
                dataType : "json",
                contentType: 'application/json; charset=utf-8',
                cache: false,
                success : function(data) {
                    if(data.stsCd == "999"){
                        alert(data.msgTxt);
                    }else{
                        alert(data.msgTxt);
                        $("#createIbTcReqPop").paragonClosePopup();
                        $ibTcReqHGrid.paragonGridReload();
                    }
                }
            });
        }
    }
    //datepicker Set up today.
    function toDateSetEvnet() {
        $("#ibTcReqYmdSP").datepicker("setDate", new Date());
        $("#ibOTcReqYmdSP").datepicker("setDate", new Date());
    }

}();

$(document).ready(function() {
    InboundTcReqCreatePopApp.init();
});
