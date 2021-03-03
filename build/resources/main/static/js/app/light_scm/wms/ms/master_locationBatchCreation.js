/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 로케이션 일괄생성 팝업[MasterLocationCreationApp]
 * Program Code     : PWMMS102E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 20.  		First Draft.
 */
var MasterLocationCreationApp = function () {
	"use strict";

	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/

	var $locGrid = $("#masterLocGrid");

    var locTypeComboJson;

    var holdStatusComboJson;

    var loadGbnComboJson;

    var $callBackInput;

    return {
        init: function () {

        	WMSUtil.fnCombo.selectBox('msLocBatchLocTypeCd', 'LOC_TYPE_CD');

        	WMSUtil.fnCombo.selectBox('msLocBatchHoldStCd', 'HOLD_ST_CD');

        	WMSUtil.fnCombo.selectBox('msLocBatchLoadGbnCd', 'LOAD_GBN_CD');

        	WMSUtil.fnCombo.selectBox('msLocBatchLotMixLoadYn', 'YN');

        	WMSUtil.fnCombo.selectBox('msLocBatchItemMixLoadYn', 'YN');

        	fnEvents();
	    },
        callBackInput: function () {
            return $callBackInput;
        },
        getGrid: function(){
            return $locGrid;
        },
    };


    //[Fn] 이벤트
    function fnEvents(){

        addZoneCdChangeEvent("batchZone");

        $("#msLocBatchCbm").attr("disabled",true);

    	//저장버튼
    	$("#msLocBatchLocSaveBtn").click(function(){
    	    fncreate();
    	});

        $("#msLocBatchZonePop").click(function(){
        	WMSUtil.popup.zone('msLocBatchZone');
//            fnModalGrid();
        });

        $("#msLocBatchHorizontal").change(function(){
            fnSetCbm();
        });
        $("#msLocBatchVertical").change(function(){
            fnSetCbm();
        });
        $("#msLocBatchHeight").change(function(){
            fnSetCbm();
        });

        /* keyup */
        $('#msLocBatchZoneCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msLocBatchFrLinCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 4);
        });
        $('#msLocBatchToLinCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 4);
        });
        $('#msLocBatchFrRowCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 4);
        });
        $('#msLocBatchToRowCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 4);
        });
        $('#msLocBatchFrLevCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 4);
        });
        $('#msLocBatchToLevCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 4);
        });
        $('#msLocBatchLocPrioord').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 9);
        });
        $('#msLocBatchHorizontal').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 9);
//            var cbm = $('#cbm').val();
//            if(cbm.length > 7){
//                Util.alert('MSG_MST_ERR_008', 7); //체적의 정수형 길이를 확인해 주십시오. {0}자 까지 입력 가능합니다.
//                return false;
//            }
        });
        $('#msLocBatchVertical').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 9);
//            var cbm = $('#cbm').val();
//            if(cbm.length > 7){
//                Util.alert('MSG_MST_ERR_008', 7); //체적의 정수형 길이를 확인해 주십시오. {0}자 까지 입력 가능합니다.
//                return false;
//            }
        });
        $('#msLocBatchHeight').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 9);
//            var cbm = $('#cbm').val();
//            if(cbm.length > 7){
//                Util.alert('MSG_MST_ERR_008', 7); //체적의 정수형 길이를 확인해 주십시오. {0}자 까지 입력 가능합니다.
//                return false;
//            }
        });
        $('#msLocBatchWeight').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 12);
        });

    }



    //[Fn] 수정된 내용저장
    function fncreate() {

        //validation
        if($("#msLocBatchZoneCd").val().length == 0){
            Util.alert('MSG_MST_VAL_012'); //존코드 항목은 필수 입력입니다.
            $("#msLocBatchZoneCd").focus();
            return false;
        }else if($("#msLocBatchZoneCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_013'); //존코드는 공백으로 입력 할 수 없습니다.
            $("#msLocBatchZoneCd").focus();
            return false;
        }else if($("#msLocBatchZoneNm").val().length == 0){
            Util.alert('MSG_MST_VAL_012'); //존코드 항목은 필수 입력입니다.
            $("#msLocBatchZoneCd").focus();
            return false;
        }else if($("#msLocBatchZoneNm").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_013'); //존코드는 공백으로 입력 할 수 없습니다.
            $("#msLocBatchZoneCd").focus();
            return false;
        }
        //validation
        if($("#msLocBatchFrLinCd").val().length == 0){
            Util.alert('MSG_MST_VAL_020'); //행 항목은 필수 입력입니다.
            $("#msLocBatchFrLinCd").focus();
            return false;
        }else if($("#msLocBatchFrLinCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_021'); //행은 공백으로 입력 할 수 없습니다.
            $("#msLocBatchFrLinCd").focus();
            return false;
        }
        //validation
        if($("#msLocBatchToLinCd").val().length == 0){
            Util.alert('MSG_MST_VAL_020'); //행 항목은 필수 입력입니다.
            $("#msLocBatchToLinCd").focus();
            return false;
        }else if($("#msLocBatchToLinCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_021'); //행은 공백으로 입력 할 수 없습니다.
            $("#msLocBatchToLinCd").focus();
            return false;
        }
        //validation
        if($("#msLocBatchFrRowCd").val().length == 0){
            Util.alert('MSG_MST_VAL_022'); //열 항목은 필수 입력입니다.
            $("#msLocBatchFrRowCd").focus();
            return false;
        }else if($("#msLocBatchFrRowCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_023'); //열은 공백으로 입력 할 수 없습니다.
            $("#msLocBatchFrRowCd").focus();
            return false;
        }
        //validation
        if($("#msLocBatchToRowCd").val().length == 0){
            Util.alert('MSG_MST_VAL_022'); //열 항목은 필수 입력입니다.
            $("#msLocBatchToRowCd").focus();
            return false;
        }else if($("#msLocBatchToRowCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_023'); //열은 공백으로 입력 할 수 없습니다.alert("열 항목은 공백만으로 입력할 수 없습니다.");
            $("#msLocBatchToRowCd").focus();
            return false;
        }
        //validation
        if($("#msLocBatchFrLevCd").val().length == 0){//단 검사
            Util.alert('MSG_MST_VAL_024'); //단 항목은 필수 입력입니다.
            $("#msLocBatchFrLevCd").focus();
            return false;
        }else if($("#msLocBatchFrLevCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_025'); //단은 공백으로 입력 할 수 없습니다.alert("단 항목은 공백만으로 입력할 수 없습니다.");
            $("#msLocBatchFrLevCd").focus();
            return false;
        }
        //validation
        if($("#msLocBatchToLevCd").val().length == 0){
            Util.alert('MSG_MST_VAL_024'); //단 항목은 필수 입력입니다.
            $("#msLocBatchToLevCd").focus();
            return false;
        }else if($("#msLocBatchToLevCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_025'); //단은 공백으로 입력 할 수 없습니다.
            $("#msLocBatchToLevCd").focus();
            return false;
        }

        //validation
        //체적 자리수 확인
        if($("#msLocBatchCbm").val().length > 7){
            Util.alert('MSG_MST_ERR_008', 7); //체적의 정수형 길이를 확인해 주십시오. {0}자 까지 입력 가능합니다.
            return false;
        }

        // 데이터 키 : Value Key
        var rowData = {
            zoneCd			:$("#msLocBatchZoneCd").val(),
            locCd			:$("#locCd").val(),
            locTypeCd		:$("#msLocBatchLocTypeCd").val(),
            holdStCd		:$("#msLocBatchHoldStCd").val(),
            locPrioord		:$("#msLocBatchLocPrioord").val() ,
            frLinCd			:$("#msLocBatchFrLinCd").val() ,
            toLinCd			:$("#msLocBatchToLinCd").val() ,
            frRowCd			:$("#msLocBatchFrRowCd").val() ,
            toRowCd			:$("#msLocBatchToRowCd").val() ,
            frLevCd			:$("#msLocBatchFrLevCd").val() ,
            toLevCd			:$("#msLocBatchToLevCd").val() ,
            loadGbnCd		:$("#msLocBatchLoadGbnCd").val() ,
            itemMixloadYn	:$("#msLocBatchItemMixLoadYn").val() ,
            lotMixloadYn	:$("#msLocBatchLotMixLoadYn").val() ,
            horizontal		:$("#msLocBatchHorizontal").val() ,
            vertical		:$("#msLocBatchVertical").val() ,
            height			:$("#msLocBatchHeight").val() ,
            cbm				:$("#msLocBatchCbm").val(),
            weight			:$("#msLocBatchWeight").val() ,
            remark			:$("#remark").val() ,
            useYn			:$("#useYn").val()
        }

    	var jsonData = JSON.stringify(rowData);

    	App.prcsStart();
		$.ajax({
    		url 		: "/ctrl/master/location/creationLoc",
    		data 		: jsonData,
    		type 		: "POST",
    		dataType 	: "json",
    		contentType	: 'application/json; charset=utf-8',
    		cache		: false,
    		success 	: function(data) {
    		    App.prcsEnd();
                if(data.stsCd == "999"){
                    alert(data.msgTxt);
                }else{
                    alert(data.msgTxt);
                }
                $("#locBatchCreation").paragonClosePopup();
                $locGrid.paragonGridReload();
    		}
    	});
    }

    function fnModalGrid() {

        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/zonePopup',
            id : 'modalZonePopup',
            width : '550',
            btnName : "수정",
            domainId:"PWMCM103Q_P1",
            onload : function(modal) {
//                App.setCallBackEl($("#msLocBatchZoneCd"));
                modal.show();
            },
            callback : function(data){
                $('#msLocBatchZoneCd').val(data.ZONE_CD);
                $('#msLocBatchZoneNm').val(data.ZONE_NM);
            }
        });
    }

    function fnSetCbm(){
        var horizontal = Number($("#msLocBatchHorizontal").val());
        var vertical = Number($("#msLocBatchVertical").val());
        var height = Number($("#msLocBatchHeight").val());
        $("#msLocBatchCbm").val(horizontal * vertical * height);
    }
}();

$(document).ready(function() {
    MasterLocationCreationApp.init();
});
