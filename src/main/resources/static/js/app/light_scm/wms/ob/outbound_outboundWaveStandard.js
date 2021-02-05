/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고WAVE 기준설정[CreateOutboundWaveStdApp]
 * Program Code     : PWMOB103E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 3. 29.  		First Draft.
 */
var CreateOutboundWaveStdApp = function(){
    "use strict";
    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
    ************************************************/

    var $outboundWaveStdGrid = $("#outboundWaveStdGrid");
    var waveStdCd;

    return{
        init: function(){
            fnListWaveStdCdJson("WAVE_STD_CD");
            //********** 1.Create Grid List **********
            outboundWaveStdJson();
            //********** 2.About Event List Function. **********
            outboundWaveStdEvent();
        }
    };

    //********** 1.Create Grid List **********
    //Create Grid (출고Wave 기준목록)
    function outboundWaveStdJson(){
        $outboundWaveStdGrid.paragonGrid({
            url:"/ctrl/outbound/outboundWaveStandard/getOutboundWaveStdList",
            sortable:   true,
            rownumbers: true,
            height: "606",
            //rowEditable: true,
            cellEditable: true,
            multiselect: true,
            multielonly: true,
            rowClickFocus:true,
            shrinkToFit: true,
            domainId: "OB_WAVE_STD_LIST",
            colModel: [
                {editable: false, name: "WAVE_STD_NO",     width:"100px", align: "center"},
                {editable: true, name: "WAVE_STD_DESC",    width:"100px", align: "left", required:true},
                {editable: true, name: "WAVE_STD_CD1",     width:"80px", align: "center",
                    edittype:'select', formatter:'select',
                    required:true,
                    editoptions: {
                        value:waveStdCd
                    }
                },
                {editable: true, name: "WAVE_STD_CD2",     width:"80px", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:waveStdCd
                    }
                },
                {editable: true, name: "WAVE_STD_CD3",     width:"80px", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:waveStdCd
                    }
                },
                {editable: true, name: "WAVE_STD_CD4",     width:"80px", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:waveStdCd
                    }
                },
                {editable: true, name: "WAVE_STD_CD5",     width:"80px", align: "center",
                    edittype:'select', formatter:'select',
                    editoptions: {
                        value:waveStdCd
                    }
                }
            ],
            loadComplete: function(){
                var ids = $outboundWaveStdGrid.jqGrid("getDataIDs");

                if (ids && ids.length > 0) {
                    $outboundWaveStdGrid.setFocus(0);
                }

            },
            pager: "#outboundWaveStdGridNavi",
        });
    }
    //********** 2.About Event List Function. **********
    function outboundWaveStdEvent(){
        //조회 이벤트
        $("#outboundWaveStdSearchBtn").click(function(){
            outboundWaveStdSearchBtn();
        });
        //추가 이벤트
        $("#outboundWaveStdSearchAddBtn").click(function(){
            $outboundWaveStdGrid.paragonGridAddRow();
        });
        //저장 이벤트
        $("#outboundWaveStdSearchSaveBtn").click(function(){
            fnSave();
        });
        //삭제 이벤트
        $("#outboundWaveStdSearchDelBtn").click(function(){
            fnDel();
        });
        //엑셀 이벤트
        $("#outboundWaveStdExceBtn").click(function(){
            $outboundWaveStdGrid.downloadExcel();
        });
    }
    //********** 3. Function List. **********
    //[Fn] 출고 구분 select Box Data List
    function fnListWaveStdCdJson(groupCd){
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
                //console.log("출고 구분 콤보 박스 데이터 :", result);
                waveStdCd = Util.MakeGridOptions(result, "");
            }
        });
    }
    //***********4. Event Button **********
    // 조건 조회.
    function outboundWaveStdSearchBtn(){
        var data = {
            waveStdNo: $("#outboundWaveStdNo").val(),
            waveStdDesc: $("#outboundWaveStdDesc").val()
        };

        $outboundWaveStdGrid.paragonGridSearch(data);
    }
    //[Fn] Save
    function fnSave(){
        var saveUrl = "/ctrl/outbound/outboundWaveStandard/saveSentence";
        var msg = "저장 하시겠습니까?";  //TODO: 메세지 처리.

        var rowData = {
                modFlag:        "MOD_FLAG",
                waveStdNo:      "WAVE_STD_NO",
                waveStdDesc:    "WAVE_STD_DESC",
                waveStdCd1:     "WAVE_STD_CD1",
                waveStdCd2:     "WAVE_STD_CD2",
                waveStdCd3:     "WAVE_STD_CD3",
                waveStdCd4:     "WAVE_STD_CD4",
                waveStdCd5:     "WAVE_STD_CD5"
        };

        //1. 체크된 리스트.
        var jsonData = $outboundWaveStdGrid.getSelectedJsonData("dt_data", rowData);

        if(!fnValidate()) return false;


        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$outboundWaveStdGrid.paragonGridReload();
    	})
    }
    //[Fn] 출고Wave 기준설정 삭제 버튼 이벤트
    function fnDel(){
        var addFlag = $outboundWaveStdGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/outbound/outboundWaveStandard/saveSentence";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag: "MOD_FLAG",
                waveStdNo:      "WAVE_STD_NO",
                waveStdDesc:    "WAVE_STD_DESC"
            };

            //1. 체크된 리스트.
            var jsonData = $outboundWaveStdGrid.getSelectedJsonDataChk("dt_data", rowData, $outboundWaveStdGrid);

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            	$outboundWaveStdGrid.paragonGridReload();
        	})

        }
    }

    function fnValidate(){
        var ids = $outboundWaveStdGrid.getDataIDs();

        if(ids.length <= 0){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            //+추가 버튼 클릭
//            $outboundWaveStdGrid.paragonGridAddRow();
            return false;
        }else{
            for (var i = 0; i < ids.length; i++) {
                if($("input:checkbox[id='jqg_outboundWaveStdGrid_"+ids[i]+"']").is(":checked")){
                    var rowdata = $outboundWaveStdGrid.getRowData(ids[i]);

                    if(!(rowdata.WAVE_STD_DESC)){
                        Util.alert('MSG_OUTRI_VAL_045'); //웨이브기준설명 항목은 필수 입력입니다.
                        return false;
                    }
                    if(rowdata.WAVE_STD_DESC.trim().length == 0 ){
                        Util.alert('MSG_OUTRI_VAL_046'); //웨이브기준설명은 공백만으로 입력할 수 없습니다.
                        return false;
                    }

                    if(!(rowdata.WAVE_STD_CD1)){
                        Util.alert('MSG_OUTRI_VAL_047'); //웨이브기준코드1 항목은 필수 입력입니다.
                        return false;
                    }
                    if(rowdata.WAVE_STD_CD1.trim().length == 0){
                        Util.alert('MSG_OUTRI_VAL_048'); //웨이브기준코드1은 공백만으로 입력할 수 없습니다.
                        return false;
                    }
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

$(document).ready(function(){
    CreateOutboundWaveStdApp.init();
});
