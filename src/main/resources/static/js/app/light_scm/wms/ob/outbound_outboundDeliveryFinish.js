/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 배송완료[OutboundDeliveryFinishApp]
 * Program Code     : PWMOB110E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 4. 14.  		First Draft.
 */

var OutboundDeliveryFinishApp = function() {
    "use strict";
    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/
    var gridObGbnCdOptions;//출고구분
    var gridObProgStCdOptions;//진행상태
    var gridItemStCdOptions;//제품상태코드
    var gridNdeliveryRsCdOptions;//미배송사유코드
    var outboundDeliveryFinishFlag = true;

    var $outboundDeliveryFinishHGrid = $("#outboundDeliveryFinishHGrid");
    var $outboundDeliveryFinishDGrid = $("#outboundDeliveryFinishDGrid");

    return {
        init: function(){

        	gridObGbnCdOptions 			=  WMSUtil.fnCombo.grid_selectBox('outboundDeliveryFinishObGbnCd', 'OB_GBN_CD');

        	gridItemStCdOptions 		=  WMSUtil.fnCombo.grid('ITEM_ST_CD');

        	gridObProgStCdOptions 		= WMSUtil.fnCombo.grid_selectBox_range('outboundDeliveryFinishObProgStCd', 'OB_PROG_ST_CD', 9, 1);

        	gridNdeliveryRsCdOptions 	=  WMSUtil.fnCombo.grid('NDELIVERY_RS_CD');

            toDateSetEvnet();

            fnEvents();


            fnList();

        },callBackInput: function(){
            return $callBackInput;
        }
    };
    //********** 1.Create Grid List **********
    //배송 목록
    function fnList(){
        $outboundDeliveryFinishHGrid.paragonGrid({
            url:"/ctrl/outbound/deliveryFinish/getOutboundDeliveryFinishList",
            sortable:   true,
            rownumbers: true,
            height: "178",
            //rowEditable: true,
            shrinkToFit: false,
            rowEditable:true,
            cellEditable:false,
            multiselect: true,
//            multielonly: true,
            domainId: "DELIVERY_FNSH_LIST",
            rowClickFocus: true,
            postData:{
                clientCd:                   $("#outboundDeliveryFinishClientCd").val(),    //고객사
                outboundDeliveryFinishFromDate:    $("#outboundDeliveryFinishFromDate").val(),    //출고일자From
                outboundDeliveryFinishToDate:      $("#outboundDeliveryFinishToDate").val(),      //출고일자To
                obNo:                       $("#outboundDeliveryFinishObNo").val(),        //출고번호
                obGbnCd:                    $("#outboundDeliveryFinishObGbnCd").val(),     //출고구분
                carNo:                      $("#outboundDeliveryFinishCarNo").val(),       //차량번호
                deliveryDer:                $("#outboundDeliveryFinishDeliveryDgr").val(), //배송차수
                storeCd:                    $("#outboundDeliveryFinishStoreCd").val(),     //판매처
                obProgStCd:                 $("#outboundDeliveryFinishObProgStCd").val(),  //진행상태
                soNo:                       $("#outboundDeliveryFinishSoNo").val(),        //주문번호
                rstoreCd:                   $("#outboundDeliveryFinishRstoreCd").val()
            },
            colModel: [
                {editable: false, name: "COMPANY_CD",       width:"100px",  align: "center", hidden:true},//회사번호
                {editable: false, name: "CLIENT_CD",        width:"100px",  align: "center", hidden:true},//고객사
                {editable: false, name: "CLIENT",           width:"100px",  align: "left"},//고객사명
                {editable: false, name: "DC_CD",            width:"100px",  align: "center", hidden:true},//물류센터
                {editable: false, name: "OB_PROG_ST_CD",    width:"100px",  align: "center",
                    edittype:'select', formatter:'select', hidden:true,
                    editoptions: {
                        value:gridObProgStCdOptions
                    }
                }, //진행상태코드
                {editable: false, name: "OB_PROG_ST",    width:"100px",  align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridObProgStCdOptions
                    }
                }, //진행상태
                {editable: false, name: "OB_YMD",           width:"100px",  align: "center"},//출고일자
                {editable: false, name: "OB_NO",            width:"100px",  align: "center"},//출고번호
                {editable: false, name: "SO_YMD",           width:"100px",  align: "center"},//주문일자
                {editable: false, name: "SO_NO",            width:"100px",  align: "center"},//주문번호
                {editable: false, name: "OB_GBN_CD",        width:"100px",  align: "center",
                    edittype:'select', formatter:'select', hidden:true,
                    editoptions: {
                        value:gridObGbnCdOptions
                    }
                },//출고구분
                {editable: false, name: "OB_GBN",        width:"100px",  align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridObGbnCdOptions
                    }
                },//출고구분
                {editable: false, name: "STORE_CD",         width:"100px",   align: "center"},//판매처
                {editable: false, name: "STORE_NM",         width:"150px",   align: "left"},//판매처명
                {editable: false, name: "RSTORE_CD",        width:"100px",   align: "center"},//납품처
                {editable: false, name: "RSTORE_NM",        width:"150px",   align: "left"},//납품처명
                {editable: false, name: "CAR_NO",           width:"100px",   align: "center"},//차량
                {editable: false, name: "DELIVERY_DGR",     width:"100px",   align: "center" , hidden: true },//배송차수
                {editable: false, name: "REMARK",           width:"225px",   align: "center"}//비고
            ],
            gridComplete: function(){

                var ids = $outboundDeliveryFinishHGrid.jqGrid("getDataIDs");

                if (ids && ids.length > 0) {

                    $outboundDeliveryFinishHGrid.setFocus(0);
                }


                var data = $outboundDeliveryFinishHGrid.getRowData(ids[0]);

                if (outboundDeliveryFinishFlag) {

                    fnOutboundDeliveryFinishDJsonGrid({ obNo: data.OB_NO, clientCd: data.CLIENT_CD });
                    outboundDeliveryFinishFlag = false;
                } else {
                    if (data.OB_NO !== null && data.OB_NO !== undefined) {
                        $outboundDeliveryFinishDGrid.paragonGridSearch({ obNo: data.OB_NO, clientCd: data.CLIENT_CD });
                    } else {
                        $outboundDeliveryFinishDGrid.paragonGridSearch({ obNo: null });
                    }
                }

            },
            onSelectRowEvent: function(currRowData, prevRowData){
                var data = {
                    obNo: currRowData.OB_NO // 출고번호
                };
                $outboundDeliveryFinishDGrid.paragonGridSearch(data);
            },
            pager: "#outboundDeliveryFinishHGridNavi"
        });
    }
    //배송완료 상세목록
    function fnOutboundDeliveryFinishDJsonGrid(data){
        $outboundDeliveryFinishDGrid.paragonGrid({
            url:"/ctrl/outbound/deliveryFinish/getOutboundDeliveryFinishDList",
            sortable:   true,
            rownumbers: true,
            height: "178",
            //rowEditable: true,
            shrinkToFit: false,
            rowEditable:true,
            cellEditable:false,
            multiselect: true,
//            multielonly: true,
            domainId: "DELIVERY_FNSH_DETAIL_LIST",
            postData: data,
            colModel: [
                {editable: false, name: "COMPANY_CD",           width:"100px", align: "center", hidden:true},//회사번호
                {editable: false, name: "CLIENT_CD",            width:"100px", align: "center", hidden:true},//고객사
                {editable: false, name: "DC_CD",                width:"100px", align: "center", hidden:true},//물류센터
                {editable: false, name: "OB_PROG_ST_CD",        width:"100px", align: "right",
                    edittype:'select', formatter:'select', hidden:true,
                    editoptions: {
                        value:gridObProgStCdOptions
                    }
                },//진행상태코드
                {editable: false, name: "OB_PROG_ST",        width:"100px", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridObProgStCdOptions
                    }
                },//진행상태
                {editable: false, name: "OB_NO",                width:"100px", align: "center", hidden:true},//출고번호
                {editable: false, name: "OB_DETAIL_SEQ",        width:"100px", align: "center"},//출고상세번호
                {editable: false, name: "ITEM_CD",              width:"100px", align: "center"},//제품코드
                {editable: false, name: "ITEM_NM",              width:"150px", align: "left"},//제품명
                {editable: false, name: "CONV_UOM_QTY",         width:"100px", align: "center", hidden:true},//입수
                {editable: false, name: "PKQTY",                width:"100px", align: "center"},//입수
                {editable: false, name: "UOM",                  width:"100px", align: "center"},//단위
                {editable: false, name: "CONF_QTY",             width:"100px", align: "right", hidden:true},//출고확정수량
                {editable: false, name: "CONF_TOT_QTY",         width:"100px", align: "right"},//출고확정수량
                {editable: false, name: "CONF_BOX_QTY",         width:"100px", align: "right"},//박스
                {editable: false, name: "CONF_EA_QTY",          width:"100px", align: "right"}, //낱개
                {editable: false, name: "NDELIVERY_QTY",        width:"100px", align: "right", hidden:true},//미배송수량
                {editable: false, name: "NDELIVERY_TOT_QTY",    width:"100px", align: "right"},//미배송수량
                {editable: true, name: "NDELIVERY_BOX_QTY",     width:"100px", align: "right", required:true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).on('keyup blur', function(e){
                                if($outboundDeliveryFinishDGrid.getRow(rowid,"NDELIVERY_BOX_QTY") == ''){
                                    $outboundDeliveryFinishDGrid.setCell("NDELIVERY_BOX_QTY",0,rowid);
                                }
                                setNdeliveryTotQty(rowid);

                                gridIntLengthLimit($(this), e, 9);
                            });
                        }
                    }
                },//박스
                {editable: true, name: "NDELIVERY_EA_QTY",      width:"100px", align: "right", required:true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).on('keyup blur', function(e){
                                if($outboundDeliveryFinishDGrid.getRow(rowid,"NDELIVERY_EA_QTY") == ''){
                                    $outboundDeliveryFinishDGrid.setCell("NDELIVERY_EA_QTY",0,rowid);
                                }
                                setNdeliveryTotQty($(el)[0].attributes.rowid.value);

                                gridIntLengthLimit($(this), e, 9);
                            });
                        }
                    }
                },//낱개
                {editable: false, name: "WEIGHT",               width:"100px", align: "center", formatter:"integer"},//중량
                {editable: true, name: "NDELIVERY_RS_CD",       width:"100px", align: "center",
                    edittype:'select', formatter:'select', hidden:true,
                    editoptions: {
                        value:gridNdeliveryRsCdOptions
                    }
                },//미배송사유코드
                {editable: true, name: "NDELIVERY_RS",       width:"100px", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridNdeliveryRsCdOptions
                    }
                },//미배송사유
                {editable: false, name: "MAKE_YMD",             width:"100px", align: "center"},//제조일자
                {editable: false, name: "MAKE_LOT",             width:"100px", align: "center"},//제조LOT
                {editable: false, name: "DIST_EXPIRY_YMD",      width:"100px", align: "center"},//유통일자
                {editable: false, name: "ITEM_SPEC",            width:"100px", align: "center"},//제품규격
                {editable: false, name: "ITEM_ST_CD",           width:"100px", align: "center",
                    edittype:'select', formatter:'select', hidden:true,
                    editoptions: {
                        value:gridItemStCdOptions
                    }
                },//제품상태코드
                {editable: false, name: "ITEM_ST",           width:"100px", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:gridItemStCdOptions
                    }
                },//제품상태
                {editable: false, name: "LOT_ATTR1",            width:"100px", align: "center"},
                {editable: false, name: "LOT_ATTR2",            width:"100px", align: "center"},
                {editable: false, name: "LOT_ATTR3",            width:"100px", align: "center"},
                {editable: false, name: "LOT_ATTR4",            width:"100px", align: "center"},
                {editable: false, name: "LOT_ATTR5",            width:"100px", align: "center"}
            ],
            groupHeaders:[
                {
                    rowspan : true,
                    header:[
                        {start: 'CONF_TOT_QTY', length: 3 , domain:"CONF_QTY"},
                        {start: 'NDELIVERY_TOT_QTY', length: 3 , domain:"NDELIVERY_QTY"}
                    ]
                }
            ],
            pager: "#outboundDeliveryFinishDGridNavi"
        });
    }

    function setNdeliveryTotQty(rowid){
        var ndeliveryTotQty = 0;

        var pkQty = Number($outboundDeliveryFinishDGrid.getRow(rowid,"PKQTY"));
        var box = Number($outboundDeliveryFinishDGrid.getRow(rowid,"NDELIVERY_BOX_QTY"));
        var ea = Number($outboundDeliveryFinishDGrid.getRow(rowid,"NDELIVERY_EA_QTY"));

        ndeliveryTotQty =  box * pkQty + ea;
        $outboundDeliveryFinishDGrid.setCell("NDELIVERY_QTY",ndeliveryTotQty,rowid);
        $outboundDeliveryFinishDGrid.setCell("NDELIVERY_TOT_QTY",ndeliveryTotQty,rowid);
    }

    //********** 2.About Event List Function. **********
    function fnEvents(){

        //코드 입력시 명 서치
        addClientCdChangeEvent("outboundDeliveryFinishClient", ["outboundDeliveryFinishStore", "outboundDeliveryFinishRstore"]);          //고객사
        addCdChangeEvent("outboundDeliveryFinishClient", "outboundDeliveryFinishStore", "STORE");      //판매처
        addCdChangeEvent("outboundDeliveryFinishClient", "outboundDeliveryFinishRstore", "STORE");      //납품처

        //고객사 팝업
        $("#outboundDeliveryFinishClientCdPopup").click(function(){
            fnModalClientGridPop();
        });
        //판매처 btn Event
        $("#outboundDeliveryFinishStoreCdBtn").click(function(){
            fnModalGridStore();
        });
        //납품처 btn Event
        $("#outboundDeliveryFinishRstoreCdBtn").click(function(){
            fnModalGridRStore();
        });
        //조회 btn Event
        $("#searchOutboundDeliveryFinishBtn").click(function(){
            fnSearchOutboundDeliveryFinishList();
        });
        //저장 btn Event
        $("#saveOutboundDeliveryFinishBtn").click(function(){
            fnSaveOutboundDeliverySaveEvent();
        });
        //확정 btn Event
        $("#confirmOutboundDeliveryFinishBtn").click(function(){
            var prog = "FW";
            var comfirm = "comf";
            fnConfirmOutboundDeliveryEvent(prog,comfirm);
        });
        //확정취소 btn Event
        $("#cancelOutboundDeliveryFinishBtn").click(function(){
            var prog = "BW";
            var comfirm = "cancel";
            fnConfirmOutboundDeliveryEvent(prog,comfirm);
        });
        //Date btn Event
        $("#outboundDeliveryFinishFromDateBtn").click(function() {
            $("#outboundDeliveryFinishdatepicker1").datepicker();
        });
        //Date btn Event
        $("#outboundDeliveryFinishToDateBtn").click(function() {
            $("#outboundDeliveryFinishdatepicker2").datepicker();
        });
        //엑셀 btn Event
        $("#exceOutboundDeliveryFinishBtn").click(function() {
            var selectRow = $outboundDeliveryFinishDGrid.getGridParam('selrow');
            if(selectRow == null){
                $outboundDeliveryFinishHGrid.downloadExcel();
            }else{
                $outboundDeliveryFinishDGrid.downloadExcel();
            }
        });
    }
    //[Fn] datepicker Set up today.
    function toDateSetEvnet(){
        $("#outboundDeliveryFinishdatepicker1").datepicker("setDate", new Date());
        $("#outboundDeliveryFinishdatepicker2").datepicker("setDate", new Date());
    }
    //[Fn] 저장 ajax function.
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
                $outboundDeliveryFinishHGrid.paragonGridReload();
            }
        });
    }
    //***********4. Event Button **********
    //[Fn] 조회 버튼 이벤트
    function fnSearchOutboundDeliveryFinishList(){

        if($("#outboundDeliveryFinishClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#outboundDeliveryFinishClientCd").focus();
            return false;
        }else if($("#outboundDeliveryFinishClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#outboundDeliveryFinishClientCd").focus();
            return false;
        }

        if($("#outboundDeliveryFinishFromDate").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#outboundDeliveryFinishFromDate").focus();
            return false;
        }else if($("#outboundDeliveryFinishFromDate").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#outboundDeliveryFinishFromDate").focus();
            return false;
        }

        if($("#outboundDeliveryFinishToDate").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#outboundDeliveryFinishToDate").focus();
            return false;
        }else if($("#outboundDeliveryFinishToDate").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#outboundDeliveryFinishToDate").focus();
            return false;
        }

        var data = {
            clientCd:                   $("#outboundDeliveryFinishClientCd").val(),    //고객사
            outboundDeliveryFinishFromDate:    $("#outboundDeliveryFinishFromDate").val(),    //출고일자From
            outboundDeliveryFinishToDate:      $("#outboundDeliveryFinishToDate").val(),      //출고일자To
            obNo:                       $("#outboundDeliveryFinishObNo").val(),        //출고번호
            obGbnCd:                    $("#outboundDeliveryFinishObGbnCd").val(),     //출고구분
            carNo:                      $("#outboundDeliveryFinishCarNo").val(),       //차량번호
            deliveryDgr:                $("#outboundDeliveryFinishDeliveryDgr").val(), //배송차수
            storeCd:                    $("#outboundDeliveryFinishStoreCd").val(),     //판매처
            obProgStCd:                 $("#outboundDeliveryFinishObProgStCd option:selected").val(),  //진행상태
            soNo:                       $("#outboundDeliveryFinishSoNo").val(),        //주문번호
            rstoreCd:                   $("#outboundDeliveryFinishRstoreCd").val(),    //납품처
        };
        $outboundDeliveryFinishHGrid.paragonGridSearch(data);
    }
    //[Fn] Save 저장 버튼 이벤트
    function fnSaveOutboundDeliverySaveEvent(){
        var saveUrl = "/ctrl/outbound/deliveryFinish/saveSentence";
        var rowData = {
            modFlag: "MOD_FLAG",
            obNo: "OB_NO", //출고번호
            obDetailSeq:"OB_DETAIL_SEQ", //출고상세번호
            itemCd: "ITEM_CD",//제품코드
            ndeliveryBoxQty: "NDELIVERY_BOX_QTY",//미배송BOX
            ndeliveryEaQty: "NDELIVERY_EA_QTY",//미배송BOX//미배송EA
            ndeliveryRsCd: "NDELIVERY_RS",//미배송사유
            convUomQty: "CONV_UOM_QTY"//입수
        };

        //1. 체크된 리스트.
        var jsonData = $outboundDeliveryFinishDGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        if(!fnValidate()) return false;

        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?

        fnAjaxSave(jsonData, saveUrl, msg);

    }

    function fnValidate(){
        var ids = $outboundDeliveryFinishDGrid.getDataIDs();
        var rowFlag = "";
        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_outboundDeliveryFinishDGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $outboundDeliveryFinishDGrid.getRowData(ids[i]);

                rowFlag = rowdata.MOD_FLAG;

                if(!(rowdata.NDELIVERY_BOX_QTY)){
                    Util.alert('MSG_OUTRI_VAL_023'); //미배송환산수량 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.NDELIVERY_BOX_QTY.trim().length == 0 ){
                    Util.alert('MSG_OUTRI_VAL_024'); //미배송환산수량은 공백만으로 입력할 수 없습니다.
                    return false;
                }
                if(!(rowdata.NDELIVERY_EA_QTY)){
                    Util.alert('MSG_OUTRI_VAL_025'); //미배송낱개수량은 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.NDELIVERY_EA_QTY.trim().length == 0 ){
                    Util.alert('MSG_OUTRI_VAL_026'); //미배송낱개수량은 공백만으로 입력할 수 없습니다.
                    return false;
                }
                if(parseFloat(rowdata.NDELIVERY_BOX_QTY) == 0 && parseFloat(rowdata.NDELIVERY_EA_QTY) == 0){
                    Util.alert('MSG_OUTRI_VAL_027'); //미배송환산수량, 낱개수량은 0을 초과하여 입력해야 합니다.
                    return false;
                }
                if(parseFloat(rowdata.NDELIVERY_BOX_QTY) < 0 || parseFloat(rowdata.NDELIVERY_EA_QTY) < 0){
                    Util.alert('MSG_OUTRI_VAL_028'); //미배송환산수량, 낱개수량 음수를 입력할 수 없습니다.
                    return false;
                }
                if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                    Util.alert('MSG_COM_VAL_071', $outboundDeliveryFinishDGrid.getRowData(ids[i]).OB_DETAIL_SEQ); //[ {0} ]은(는) 변경된 값이 없습니다.
                    return false;
                }
            }
        }
        return true;
    }
    //[Fn] 확정 SP 버튼 이벤트
    function fnConfirmOutboundDeliveryEvent(progData,comfirm){
        var saveUrl = "/ctrl/outbound/deliveryFinish/confirmSentence";
        var rowData = {
            clientCd: "CLIENT_CD",
            obNo: "OB_NO"
        };

        //1. 체크된 리스트.
        var jsonData = $outboundDeliveryFinishHGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }
        var jsonObject = JSON.parse(jsonData);
        var rowid = $outboundDeliveryFinishHGrid.getGridParam("selrow");
        var obProgStCd = $outboundDeliveryFinishHGrid.getRowData(rowid).OB_PROG_ST_CD;

        //jsonObject.prog = progData;
        //출하배송확정
        if(comfirm == "comf"){
            if(Number(obProgStCd) == 80){
                var msg = "MSG_OUTRI_CFM_014"; //배송완료 하시겠습니까?
                jsonObject.prog = "FW";
                jsonObject.opRuleCd = "2008";
                fnAjaxSave(JSON.stringify(jsonObject), saveUrl, msg);
            }else{
                Util.alertCode('MSG_COM_VAL_077', 'OB_PROG_ST_CD', 80); //{0}상태는 완료가능합니다
                return false;
            }
        }
        else{
            if(Number(obProgStCd) == 90){
                var msg = "MSG_OUTRI_CFM_015"; //배송완료취소 하시겠습니까?
                jsonObject.prog = "BW";
                jsonObject.opRuleCd = "2008";
                //fnAjaxSave(JSON.stringify(jsonObject), saveUrl, msg);
                fnAjaxSave(JSON.stringify(jsonObject), saveUrl, msg);
            }else{
                Util.alertCode('MSG_COM_VAL_072', 'OB_PROG_ST_CD', 90); //{0}상태는 취소가능합니다
                return false;
            }
        }

    }

    //***********5. Popup **********
    //[Fn] 고객사 Popup
    function fnModalClientGridPop(){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/clientPopup",
            id : "modalClientPopup",
            width : "550",
            btnName : "수정",
//            title : "Client 검색",
            domainId: "PWMCM105Q_P1",
//          data: {clientCd: $("#outboundDeliveryFinishClientCd").val()},
            onload : function(modal) {
                // 팝업화면 클릭 시 code, name.
                var callBack ={
                    "CLIENT_CD": "outboundDeliveryFinishClientCd",  // "", "text box id"
                    "CLIENT_NM": "outboundDeliveryFinishClientNm"
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }

    //[Fn] 판매처 PopUP
    function fnModalGridStore() {
        PopApp.paragonOpenPopup({
            ajaxUrl: "/ctrl/common/storePop",
            id: "modalStorePopup",
            width: "550",
            btnName: "수정",
            domainId: "PWMMS107E_P2",
            onload: function(modal) {
                modal.show();
            },
            callback: function(data){
                $('#outboundDeliveryFinishStoreCd').val(data.STORE_CD);
                $('#outboundDeliveryFinishStoreNm').val(data.STORE_NM);
            }
        });
    }
    //[Fn] 납품처 PopUP
    function fnModalGridRStore() {
        PopApp.paragonOpenPopup({
            ajaxUrl: "/ctrl/common/rStorePop",
            id: "modalRStorePopup",
            width: "550",
            btnName: "수정",
            domainId: "PWMMS107E_P3",
            onload: function(modal) {
                modal.show();
            },
            callback: function(data){
                $('#outboundDeliveryFinishRstoreCd').val(data.RSTORE_CD);
                $('#outboundDeliveryFinishRstoreNm').val(data.RSTORE_NM);
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
    OutboundDeliveryFinishApp.init();
});
