/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고WAVE[CreateOutboundWaveApp]
 * Program Code     : PWMOB104E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 3. 30.  		First Draft.
 */

var CreateOutboundWaveApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB104E';
	var proNm = 'outboundWave';

	//그리드
    var $outboundWaveHeaderGrid = $("#outboundWaveHeaderGrid");
    var $outboundWaveDetailGrid = $("#outboundWaveDetailGrid");


    var gridObProgStCd; //진행상태
    var gridObGbnCd; //출고구분
    var obProgStCombo;

    var firstLoad = true;
    var gridRowData;

    var $callBackInput;


    return{
        init: function(){

        	obProgStCombo  	= WMSUtil.fnCombo.grid_selectBox_range('outboundWaveObProgStCd', 'OB_PROG_ST_CD', 4, 1);

        	gridObProgStCd 	= WMSUtil.fnCombo.grid('OB_PROG_ST_CD');

        	gridObGbnCd 	= WMSUtil.fnCombo.grid('OB_GBN_CD');

            fnEvents();

            fnList();

        }, callBackInput: function () {
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting(proNm + 'ObYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');

    	$("#outboundWaveWaveStdNo").on('change', function(e){
    		fnWaveStdNoChangeEvent();
    	});
        //고객사 팝업
        $("#outboundWaveClientPopup").click(function(){
        	WMSUtil.popup.client(proNm + 'Client');
        });
        //웨이브기준번호 팝업
        $("#outboundWaveWaveStdNoPopup").click(function(){
        	WMSUtil.popup.waveStd(proNm + 'WaveStd', {clientCd : $('#'+proNm+'ClientCd').val()});
        });

        //조회
        $("#outboundWaveSearchBtn").click(function(){
        	fnSearch();
        });
        //추가버튼
        $("#outboundWaveSearchAddBtn").click(function(){
            fnAdd();
        });
        //취소버튼
        $("#outboundWaveHCancelBtn").click(function (){
        	fnCancel();
        });

        //엑셀 다운로드
        $("#outboundWaveExceBtn").click(function() {
            var selectRow = $outboundWaveDetailGrid.getGridParam('selrow');
            if(selectRow == null){
                $outboundWaveHeaderGrid.downloadExcelAllItems();
            }else{
                $outboundWaveDetailGrid.downloadExcelAllItems();
            }
        });

        //출고 Wave Detail 추가 버튼
        /*        $("#outboundWaveDetailAddBtn").click(function(){
            fnAddRowData();
        });*/
        //출고 Wave Detail 저장 버튼
        /*        $("#outboundWaveDetailSaveBtn").click(function(){
            fnSave();
        });*/
        //출고 Wave Detail 삭제 버튼
        /*        $("#outboundWaveDCancelBtn").click(function(){
            fnDel();
        });*/
    }

    //초기화
    function fnList(){
        $outboundWaveHeaderGrid.paragonGrid({
            url:"/ctrl/outbound/outboundWave/listOutboundWave",
            sortable	: true,
            rownumbers	: true,
            height		: '223',
            rowEditable	: true,
            cellEditable: false,
            multiselect	: true,
            //multielonly:true,
            rowClickFocus:true,
            shrinkToFit	: true,
            domainId	: "OB_WAVE_LIST",
            postData	: sendData(),
            colModel: [
               	{editable: false, name: "CLIENT_CD",	 	width:"100px", align: "center", hidden:true},
				{editable: false, name: "OB_PROG_ST_CD", 	width:"100px", align: "center", hidden:true},
				{editable: false, name: "OB_PROG_ST",    	width:"100px", align: "center", excel:true,
				    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObProgStCd }
				},
                {editable: false, name: "WAVE_NO",          width:"100px", align: "center", excel:true},
                {editable: false, name: "WAVE_STD_NO",      width:"100px", align: "center", excel:true},
                {editable: false, name: "WAVE_STD_DESC",    width:"100px", align: "left", excel:true},
                {editable: false, name: "OB_YMD",           width:"100px", align: "center", excel:true}
            ],
            pager: "#outboundWaveHeaderGridNavi",
            gridComplete: function(){

            	//그리드 조회시 데이터 1건 이상 일때 포커스
                var ids = $outboundWaveHeaderGrid.jqGrid("getDataIDs");
                if (ids && ids.length > 0) {
                    $outboundWaveHeaderGrid.setFocus(0);
                }

                var data = $outboundWaveHeaderGrid.getRowData(ids[0]);
                var dataJson = {
                        waveNo		: data.WAVE_NO,
                        clientCd 	: data.CLIENT_CD
                    };

                //그리드 처음 로딩할 때 상세그리드를 초기화 하고, 2번재부터는 조회함
                if (firstLoad) {
                    fnListD(dataJson);
                    firstLoad = false;
                } else {
                	if(ids.length > 0){
                		$outboundWaveDetailGrid.paragonGridSearch(dataJson);
                	}else{
                		$outboundWaveDetailGrid.jqGrid('clearGridData');
                	}
                }
            },
            onSelectRowEvent: function(currRowData, prevRowData){
                $outboundWaveDetailGrid.paragonGridSearch({
                    waveNo	: currRowData.WAVE_NO, // 웨이브번호
                    clientCd: currRowData.CLIENT_CD
                });
            },
        });
    }

    //상세 그리드 초기화
    function fnListD(dataJson){
        $outboundWaveDetailGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundWave/listOutboundWaveDetail",
            sortable		: true,
            rownumbers		: true,
            height			: '223',
            rowEditable		: true,
            cellEditable	: false,
            //multiselect: true,
//            multielonly: true,
            rowClickFocus	: true,
            shrinkToFit		: false,
            loadui			: 'disable',
            domainId		: "OB_WAVE_DETAIL_LIST",
            postData		: dataJson,
            colModel		: [
                {editable: false, name: "WAVE_NO",         width:"100px", align: "center", excel:true	},
                {editable: false, name: "CLIENT_CD",       width:"100px", align: "center", 	hidden:true},
                {editable: false, name: "CLIENT",          width:"100px", align: "left", excel:true		},
                {editable: false, name: "OB_PROG_ST_CD",   width:"100px", align: "center", 	hidden:true},
                {editable: true,  name: "OB_PROG_ST",      width:"90px",  align: "center",	disable:true, excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObProgStCd }
                },
                {editable: false, name: "OB_YMD",          width:"100px", align: "center", excel:true	},
                {editable: false, name: "OB_PLAN_YMD",     width:"100px", align: "center", excel:true	},
                {editable: true,  name: "OB_NO",           width:"100px", align: "center", excel:true,
                	required:true,
                    editoptions : { maxlength:20, dataEvents : function(el, e) { gridTextLengthLimit($(el), e, 20); }},
                    searchBtnClick: function(value, rowid, colid){
                        fnModalObNoPopup(rowid);
                    }
                },
                {editable: false, name: "SO_YMD",          width:"100px", align: "center", excel:true	},
                {editable: false, name: "SO_NO",           width:"100px", align: "center", excel:true	},
                {editable: false, name: "OB_GBN_CD",       width:"100px", align: "center", 	hidden:true},
                {editable: false, name: "OB_GBN",          width:"100px", align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObGbnCd }
                },
                {editable: false, name: "STORE_CD",        width:"100px", align: "center", excel:true	},
                {editable: false, name: "STORE_NM",        width:"180px", align: "left", excel:true		},
                {editable: false, name: "RSTORE_CD",       width:"100px", align: "center", excel:true	},
                {editable: false, name: "RSTORE_NM",       width:"180px", align: "left", excel:true		},
                {editable: true,  name: "CAR_NO",          width:"150px", align: "center", excel:true,
                	disabled:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: true, name: "DELIVERY_DGR",     width:"100px", align: "center", 	disabled:true, hidden: true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
            ],
            pager: "#outboundWaveDetailGridNavi"
        });
    }

    //
    function fnWaveStdNoChangeEvent(){

        var jsonObject = {
        		waveStdNo : $("#outboundWaveWaveStdNo").val()
        };
    	var dataSet = JSON.stringify(jsonObject);

        if($("#outboundWaveWaveStdNo").val().trim().length != 0){
        	$.ajax({
                url			: '/ctrl/common/listWaveStandardPop',
                type 		: "POST",
                datatype 	: 'JSON',
                contentType : 'application/json;  charset=utf-8',
                data 		: dataSet,
                //domainId : "PWMCM102Q_P1",
                success		: function(data){
                    //App.prcsEnd();
                    var dataCheck = data.dt_grid;
                    //검색결과 하나
                    if(dataCheck.length == 1) {
						$("#outboundWaveWaveStdNo").val(dataCheck[0].WAVE_STD_NO);
                        $("#outboundWaveWaveStdDesc").val(dataCheck[0].WAVE_STD_DESC);
                        //검색결과 하나가 아닐때, 팝업이 떠있지 않은 상태
                    }else if(dataCheck.length != 1 && $("modalWaveStdPopup").length == 0){

                    	WMSUtil.popup.waveStd(proNm + 'WaveStd', {clientCd : $('#'+proNm+'ClientCd').val()});
                    }
                }
            });
        }else{
        	$("#outboundWaveWaveStdDesc").val("");
        }
    }


    //데이터
    function sendData(){
    	return {
            clientCd	: $("#outboundWaveClientCd").val(),
            waveNo		: $("#outboundWaveNo").val(),
            waveStdNo	: $("#outboundWaveWaveStdNo").val(),
            obProgStCd	: $("#outboundWaveObProgStCd").val(),
            obYmdFr		: WMSUtil.fnDateSetting.yyyymmdd($("#outboundWaveObYmdFr").val()),
            obYmdTo		: WMSUtil.fnDateSetting.yyyymmdd($("#outboundWaveObYmdTo").val()),
    	}
    }

    //조회
    function fnSearch(){

        //validation
        if($("#outboundWaveObYmdFr").val().length == 0){//출고일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#outboundWaveObYmdFr").focus();
            return false;
        }else if($("#outboundWaveObYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#outboundWaveObYmdFr").focus();
            return false;
        }
        if($("#outboundWaveObYmdTo").val().length == 0){//출고일자 검사
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#outboundWaveObYmdTo").focus();
            return false;
        }else if($("#outboundWaveObYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#outboundWaveObYmdTo").focus();
            return false;
        }

        $outboundWaveHeaderGrid.paragonGridSearch(sendData());

    }

    //추가팝업
    function fnAdd(){
        PopApp.paragonOpenPopup({
            ajaxUrl 	: "/ctrl/outbound/outboundWave/outboundWavePop",
            id			: "modalOutboundWavePop",
            width 		: "50",
            maxWidth	: '600',
            btnName 	: "수정",
            data: {
            	clientCd: $("#outboundWaveClientCd").val(),
                obYmdFr	: WMSUtil.fnDateSetting.yyyymmdd($("#outboundWaveObYmdFr").val()),
                obYmdTo	: WMSUtil.fnDateSetting.yyyymmdd($("#outboundWaveObYmdTo").val())
               },
            //title : "출고Wave 생성",
            domainId	: "PWMOB104E_P1",
            visible		: true,
            callback: function(data){
            	$outboundWaveHeaderGrid.paragonGridSearch(sendData());
            }
        });
    }

    //웨이브 취소
    function fnCancel(){
        var saveUrl	= "/ctrl/outbound/outboundWave/updateOutboundWaveCancle";
        var msg 	= "MSG_OUTRI_CFM_005"; //웨이브를 취소하시겠습니까?
        var rowData = {
            waveNo		: "WAVE_NO",
            waveStdNo	: "WAVE_STD_NO",
            flag		: "C"
        };

        var jsonData = $outboundWaveHeaderGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData) {
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$outboundWaveHeaderGrid.paragonGridReload();
    	})
    }

    function fnAddRowData(){

        var ids = $outboundWaveHeaderGrid.jqGrid("getDataIDs");

        if (ids && ids.length <= 0) {
            Util.alert('MSG_OUTRI_ERR_008'); //출고웨이브목록에 데이터가 존재하지 않습니다.
            return;
        }

        $outboundWaveDetailGrid.paragonGridAddRow({
            addData : {"WAVE_NO": $outboundWaveHeaderGrid.focusRowData('WAVE_NO'),
            		 //"WAVE_NO": $outboundWaveHeaderGrid.jqGrid('getCell', ids[0], 'WAVE_NO'),
                       "CLIENT_CD": $("#outboundWaveClientCd").val(),
                       "CLIENT_NM": $("#outboundWaveClientNm").val()
                      }
        });
    }

    //저장
    function fnSave(){
        var saveUrl = "/ctrl/outbound/outboundWave/updateSentenceObNo";
        var msg 	= "MSG_COM_CFM_003"; //저장하시겠습니까?
        var data 	= {
                modFlag		: "MOD_FLAG",
                waveNo		: "WAVE_NO",
                obNo		: "OB_NO",
                clientCd	: "CLIENT_CD"
        };

        var jsonData = $outboundWaveDetailGrid.getSelectedJsonData("dt_data", data);

        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }
        var ids = $outboundWaveDetailGrid.getDataIDs();
        var rowFlag = "";
        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_outboundWaveDetailGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $outboundWaveDetailGrid.getRowData(ids[i]);

                rowFlag = $outboundWaveDetailGrid.getRowData(ids[i]).MOD_FLAG;

                if(!(rowdata.OB_NO)){
                    Util.alert('MSG_OUTRI_VAL_043'); //출고번호 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.OB_NO.trim().length == 0 ){
                    Util.alert('MSG_OUTRI_VAL_044'); //출고번호는 공백만으로 입력할 수 없습니다.
                    return false;
                }

                if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                    Util.alert('MSG_COM_VAL_071', $outboundWaveDetailGrid.getRowData(ids[i]).OB_NO); //[ {0} ]은(는) 변경된 값이 없습니다.
                    return false;
                }
            }
        }

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$outboundWaveHeaderGrid.paragonGridReload();
    	})

    }

    //삭제
    function fnDel(){
        var addFlag = $outboundWaveDetailGrid.paragonGridCheckedDeleteData();

        if(addFlag === false){
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/outbound/outboundWave/updateSentenceObNo";
            var msg 	= "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag		: "MOD_FLAG",
                obNo		: "OB_NO",
                obDetailSeq	: "OB_DETAIL_SEQ"
            };

            //1. 체크된 리스트.
            var jsonData = $outboundWaveDetailGrid.getSelectedJsonDataChk("dt_data", rowData, $outboundWaveDetailGrid);

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            	$outboundWaveHeaderGrid.paragonGridReload();
        	})
        }
    }

    function fnModalObNoPopup(rowid){
        PopApp.paragonOpenPopup({
            ajaxUrl 	: '/ctrl/common/obNoPop',
            id 			: 'modalobNoPopup',
            //domainId: "PWMCM105Q_P1",
            domainId 	: "PWMCM118Q_P1",
            data 		: {
            	clientCd : $("#outboundWaveClientCd").val(),
            	clientNm : $("#outboundWaveClientNm").val()
        	},
            width 		: '700',
            btnName		: "수정",
//            title		: "출고번호 검색", //TODO: 출고번호 팝업 도메인에 등록 필요.
            visible		: true,
            callback: function(data){
                $outboundWaveDetailGrid.setCell("CLIENT_CD",	data.CLIENT_CD,rowid);
                $outboundWaveDetailGrid.setCell("OB_NO",		data.OB_NO,rowid);
                $outboundWaveDetailGrid.setCell("SO_NO",		data.SO_NO,rowid);
                $outboundWaveDetailGrid.setCell("OB_PLAN_YMD",	data.OB_PLAN_YMD,rowid);
                $outboundWaveDetailGrid.setCell("OB_GBN",		data.OB_GBN_CD,rowid);
            }
        });
    }
}();

/********************************************************************
 * bootstrap-datepicker 달력오픈 중, 탭 이동시 달력 hide
 * Tab-menu 종료시 마우스 클릭 인식 안되, datepicker(hide) 가 안되던 현상 수정
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
    CreateOutboundWaveApp.init();
});
