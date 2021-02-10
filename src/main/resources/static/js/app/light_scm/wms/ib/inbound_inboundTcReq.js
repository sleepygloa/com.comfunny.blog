/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 구역관리[MasterAreaApp]
 * Program Code     : PWMMS102E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 20.  		First Draft.
 */
var IbTcReqApp = function () {
	"use strict";

	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/

	// [El]프로그램 그리드
	var $ibTcReqHGrid = $("#ibTcReqHeaderGrid");

	var $ibTcReqDGrid = $("#ibTcReqDetailGrid");

	var ibProgStComboJson;

	var $callBackInput;

	var firstLoad = true;

    return {
        init: function () {
            //
            fnListProgStsJson("TC_REQ_PROG_ST_CD");
            //

            toDateSetEvnet()

        	fnListIbTcReqH();

        	fnIbTcReqEvents();

	    },
        callBackInput: function () {
            return $callBackInput;
        }
    };

  //datepicker Set up today.
    function toDateSetEvnet() {
        $("#ibTcReqYmdS").datepicker("setDate", new Date());
        $("#ibTcReqYmdE").datepicker("setDate", new Date());
        $("#ibOTcReqYmdS").datepicker("setDate", new Date());
        $("#ibOTcReqYmdE").datepicker("setDate", new Date());
    }


    //[Fn] 이벤트
    function fnIbTcReqEvents(){

        //코드 입력시 명 서치
        addClientCdChangeEvent("ibTcReqClient", []);          //고객사

    	//추가버튼
    	$("#newIbTcReqBtn").click(function(){
    		fnAdd();
    	});
    	//검색버튼
    	$("#searchIbTcReqBtn").click(function(){
    		fnSearch();
    	});

        $("#confirmIbTcReqBtn").click(function(){
            var comfirm = "comf";
            fnConf(comfirm);
        });

    	//삭제버튼
    	$("#delIbTcReqBtn").click(function(){
//    	    $ibTcReqHGrid.paragonGridCheckedDelete();
    	    fnDelete();
    	});
    	//엑셀버튼
    	$("#excelIbTcReqBtn").click(function(){
            if(null == $ibTcReqDGrid.getGridParam('selrow')){
                $ibTcReqHGrid.downloadExcel();
            }else{
                $ibTcReqDGrid.downloadExcel();
            }
    	});

        $("#ibTcReqClientPopup").click(function(){
            fnModalClientPop();
        });

        $("#ibTcReqClientNm").attr("disabled", true);

    }

    function fnModalClientPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/clientPopup',
            id : 'modalClientPopup',
            width : '550',
            domainId:"PWMCM105Q_P1",
//            data: {clientCd: $("#ibTcReqClientCd").val()},
            visible:true,
            onload : function(modal) {
                var callBack ={
                        "CLIENT_CD" :"ibTcReqClientCd",
                        "CLIENT_NM" :"ibTcReqClientNm"
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }

    //[Fn] 입고진행상태 콤보박스 JSON 조회
    function fnListProgStsJson(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            success : function(result) {
                ibProgStComboJson = result;
                Util.MakeSelectOptions($("#ibTcReqProgStCd"),result);
            }
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){

        //validation
        if($("#ibTcReqClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibTcReqClientCd").focus();
            return false;
        }else if($("#ibTcReqClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibTcReqClientCd").focus();
            return false;
        }
        if($("#frIbTcReqYmd").val().length == 0){//이고의뢰일자 검사
            Util.alert('MSG_INRI_VAL_023'); //이고의뢰일자 항목은 필수 입력입니다.
            $("#frIbTcReqYmd").focus();
            return false;
        }else if($("#frIbTcReqYmd").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_024'); //이고의뢰일자는 공백으로 입력 할 수 없습니다.
            $("#frIbTcReqYmd").focus();
            return false;
        }
        if($("#toIbTcReqYmd").val().length == 0){//이고의뢰일자 검사
            Util.alert('MSG_INRI_VAL_023'); //이고의뢰일자 항목은 필수 입력입니다.
            $("#toIbTcReqYmd").focus();
            return false;
        }else if($("#toIbTcReqYmd").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_024'); //이고의뢰일자는 공백으로 입력 할 수 없습니다.
            $("#toIbTcReqYmd").focus();
            return false;
        }

    	var data = {
    	        clientCd : $.trim($("#ibTcReqClientCd").val()),
				frIbTcReqYmd : $.trim($("#frIbTcReqYmd").val()),
				toIbTcReqYmd : $.trim($("#toIbTcReqYmd").val()),
				frIbOTcReqYmd : $.trim($("#frIbOTcReqYmd").val()),
				toIbOTcReqYmd : $.trim($("#toIbOTcReqYmd").val()),
				ibTcReqProgStCd : $.trim($("#ibTcReqProgStCd").val()),
				ibTcReqNo : $.trim($("#ibTcReqNo").val())
		};
    	$ibTcReqHGrid.paragonGridSearch(data);
    }

    /********************************************************************
     * 그리드 생성
     * Since   : 2017-02-20
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    function fnListIbTcReqH(){
        $ibTcReqHGrid.paragonGrid({
        	url: '/ctrl/inbound/inboundTcReq/listInboundTcReqH',
        	rowEditable:true,
            cellEditable:false,
			sortable: true,
			rownumbers: true,
			shrinkToFit:false,
			multiselect: true,
//			multielonly:true,
			rowClickFocus:true,
			postData:{clientCd:$.trim($("#ibTcReqClientCd").val())},
			height:'213',
            colModel:[
                {editable: false,name:'TC_REQ_NO', width:"200px", align:"center"},
                {editable: false,name:'CLIENT_CD', width:"200px", align:"center"},
                {editable: false,name:'CLIENT_NM', width:"540px", align:"center"},
                {editable: false,name:'TC_REQ_YMD', width:"200px", align:"center"},
                {editable: false,name:'OB_PLAN_YMD', width:"200px", align:"center"},
                {editable: false,name:'TC_REQ_PROG_ST_CD', width:"100px", align:"center", hidden:true},
                {editable: false,name:'TC_REQ_PROG_ST', width:"200px", align:"center"}
            ],
            pager: "#ibTcReqHeaderGridNavi",
            domainId:"IB_TC_LIST",
            gridComplete: function(){
                var ids = $ibTcReqHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $ibTcReqHGrid.setFocus(0);
                }
                var tcReqNo = $ibTcReqHGrid.getRowData(ids[0]).TC_REQ_NO;
                console.log(tcReqNo);
                if(firstLoad){
                    fnListIbTcReqD(tcReqNo);
                    firstLoad = false;
                }else{
                    if(tcReqNo != null){
                        $ibTcReqDGrid.paragonGridSearch({tcReqNo:tcReqNo});
                    }else{
                        $ibTcReqDGrid.paragonGridSearch({tcReqNo:null});
                    }
                }
           },onSelectRowEvent: function(currRowData, prevRowData){
               $ibTcReqDGrid.paragonGridSearch({tcReqNo:currRowData.TC_REQ_NO});
           }
           ,ondblClickCustom: function(id, iRow, iCol, e){
               var tcReqNo = $ibTcReqHGrid.focusRowData("TC_REQ_NO");
               var progStCd = $ibTcReqHGrid.focusRowData("TC_REQ_PROG_ST_CD");
               if(progStCd == '10'){
                   $("#tcReqNoHidden").val(tcReqNo);
                   fnModify();
               }else{
                   Util.alert('MSG_INRI_ERR_025'); //이고의뢰상태만 수정가능합니다.
                   return false;
               }
           }
        });
	}

    function fnListIbTcReqD(tcReqNo){
        console.log(tcReqNo);
        $ibTcReqDGrid.paragonGrid({
            url: '/ctrl/inbound/inboundTcReq/listInboundTcReqD',
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            shrinkToFit:false,
            postData:{tcReqNo:tcReqNo},
            rowClickFocus:true,
            height:'213',
            colModel:[
                //{editable: false,name:'TC_REQ_NO', width:"100px", align:"center"},
                {editable: false,name:'TC_REQ_DETAIL_SEQ', width:"100px", align:"center"},
                {editable: false,name:'ITEM_CD', width:"100px", align:"center"},
                {editable: false,name:'ITEM_NM', width:"180px", align:"left"},
                {editable: false,name:'ITEM_SPEC', width:"100px", align:"center"},
                {editable: false,name:'ITEM_ST_CD', width:"100px", hidden:true},
                {editable: false,name:'ITEM_ST', width:"100px", align:"center"},
                {editable: false,name:'PKQTY', width:"100px", align:"center"},
                {editable: false,name:'UOM', width:"100px", align:"center"},
                {editable: false,
                    name:'REQ_QTY',
                    width:"100px",
                    align:"right",
                    hidden: true},
                {editable: false,
                    /* 화면 컬럼 도메인처리 2017.08.04 */
                    //name:'REQ_QTY',
                    name:'REQ_TOT_QTY',
                    width:"100px",
                    align:"right"},
                {editable: false,name:'REQ_BOX_QTY', width:"100px", align:"right"},
                {editable: false,name:'REQ_EA_QTY', width:"100px", align:"right"},
                {editable: false,
                    name:'STOCK_QTY',
                    width:"100px",
                    align:"right",
                    hidden: true},
                {editable: false,
                    /* 화면 컬럼 도메인처리 2017.08.04 */
                    //name:'STOCK_QTY',
                    name:'STOCK_TOT_QTY',
                    width:"100px",
                    align:"right"},
                {editable: false,name:'STOCK_BOX_QTY', width:"100px", align:"right"},
                {editable: false,name:'STOCK_EA_QTY', width:"100px", align:"right"},
                {editable: false,
                    name:'OB_DC_NM',
                    width:"100px",
                    align:"center",
                    hidden: true},
                {editable: false,
                    /* 화면 컬럼 도메인처리 2017.08.04 */
                    //name:'OB_DC_NM',
                    name:'OB_DC',
                    width:"100px",
                    align:"center"},
                {editable: false,name:'TC_REQ_PROG_ST_CD', width:"100px", hidden:true},
                {editable: false,name:'TC_REQ_PROG_ST', width:"100px", align:"center"}
            ],
            pager: "#ibTcReqDetailGridNavi",
            domainId:"IB_TC_DETAIL_LIST",
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'REQ_TOT_QTY', length: 3 , domain:"REQ_QTY"},
                                  {start: 'STOCK_TOT_QTY', length: 3 , domain:"STOCK_QTY" }
                              ]
                          }]
        });
    }

    function fnAdd() {
        $("#tcGbn").val("false");
        $("#inNoHidden").val("");
        PopApp.paragonOpenPopup({
            ajaxUrl: '/ctrl/inbound/inboundTcReq/createInboundTcReqPop',
            id: 'createIbTcReqPop',
            width: '1400',
            height:'500',
            domainId:"PWMIB120E_P1",
            visible: true
        });
    }

    function fnModify() {

        $("#tcGbn").val("true");
        PopApp.paragonOpenPopup({
            ajaxUrl: '/ctrl/inbound/inboundTcReq/createInboundTcReqPop',
            id: 'createIbTcReqPop',
            width: '1300',
            height:'500',
            domainId:"PWMIB120E_P1",
            visible:true
        });
    }

    function fnDelete() {

        // 데이터 키 : Value Key
        var rowData = {
                modFlag:"MOD_FLAG" ,
                clientCd:"CLIENT_CD" ,
                tcReqNo:"TC_REQ_NO",
                tcReqProgStCd:"TC_REQ_PROG_ST_CD"

        }

        var chkData = $ibTcReqHGrid.getSelectedJsonData("dt_ibTcReq",rowData);

        if(!chkData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var data = JSON.parse(chkData).dt_ibTcReq;

        for (var i = 0; i < data.length; i++) {
            var progStCd = data[i].tcReqProgStCd;
            if(progStCd != "10"){
                Util.alert('MSG_INRI_ERR_026'); //이고의뢰상태만 삭제가능합니다.
                return true;
            }
        }

        if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

		$.ajax({
    		url : "/ctrl/inbound/inboundTcReq/deleteInboundTcReq",
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
                    $ibTcReqHGrid.paragonGridReload();
                }
    		}
    	});
    }

    //[Fn] 확정 버튼 이벤트
    function fnConf(comfirm){
        var saveUrl = "/ctrl/inbound/inboundTcReq/comfirmInboundTcReq"
        var msg = "";
        var rowData = {
                clientCd:"CLIENT_CD" ,
                tcReqNo:"TC_REQ_NO",
                tcReqDetailSeq:"TC_REQ_DETAIL_SEQ",
                tcReqProgStCd:"TC_REQ_PROG_ST_CD"
        };

        //1. 체크된 리스트.
        var jsonData = $ibTcReqHGrid.getSelectedJsonData("dt_data", rowData);
        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }
        var jsonObject = JSON.parse(jsonData);
        var rowid = $ibTcReqHGrid.getGridParam("selrow");
        var tcReqPorgStCd = $ibTcReqHGrid.getRowData(rowid).TC_REQ_PROG_ST_CD;

        //jsonObject.prog = progData;

        //이고의뢰확정
        if(comfirm === "comf"){
            if(Number(tcReqPorgStCd) < 20){
                msg = "MSG_INRI_CFM_011"; //이고의뢰확정 하시겠습니까?
                fnAjaxSave(JSON.stringify(jsonObject), saveUrl, msg);
            }else{
                Util.alert('MSG_INRI_ERR_008'); //이고의뢰 확정 할 수 없습니다.
                return false;
            }
        }else {
            //이고의뢰확정 취소
            if(Number(tcReqPorgStCd) === 20){
                msg = "MSG_INRI_CFM_012"; //이고의뢰확정취소 하시겠습니까?
                fnAjaxSave(JSON.stringify(jsonObject), saveUrl, msg);
            }else{
                Util.alert('MSG_INRI_ERR_009'); //이고의뢰확정 상태만 취소가능합니다.
                return false;
            }
        }
    }

    //[Fn] 저장 ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg){

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        $.ajax({
            url: saveUrl,
            data: jsonData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data){
                //console.log(data);
                //alert(data.msgTxt);
                 if (data.stsCd == "001") {
                     //001 데이터 성공
                     alert(data.msgTxt);
                     fnReloadGrid();
                 }
                 if (data.stsCd == "002") {
                     console.log(data);
                 }
            }
        });
    }

    //[Fn] Reload Grid Method
    function fnReloadGrid() {
        $ibTcReqHGrid.paragonGridReload();
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
    IbTcReqApp.init();
});
