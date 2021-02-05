/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고WAVE생성 팝업[OutboudnWavePopApp]
 * Program Code     : PWMOB104E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 3. 31.  		First Draft.
 */

var OutboudnWavePopApp = function(){
    "use strict";


	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB104E_P1';
	var proNm = 'outboundWavePop';

    var $outboundWaveHeaderGrid = $("#outboundWaveHeaderGrid");
    var getData = $("#modalOutboundWavePop").PopAppGetData();

    return {
        init: function(){
            fnEvents();
//console.log('modalOutboundWavePop',getData);
        }
    };

    //이벤트
    function fnEvents(){

    	if(getData == undefined){
    		Util.alert('');//출고일자가 데이터가 없습니다.
    		return false;
    	}

        //생성버튼 클릭 이벤트
        $("#outboundWavePopCreateBtn").click(function(){
            fnSave();
        });
        //웨이브기준팝업버튼
        $("#outboundWavePopWaveStdNoPop").click(function(){
//        	WMSUtil.popup.waveStd(proNm + 'WaveStd', {clientCd : $('#'+proNm+'ClientCd').val()});
//console.log('getData.clientCd',getData.clientCd); return false;
        	//WMSUtil.popup.waveStd(proNm + 'WaveStd', {clientCd : getData.clientCd});
			WMSUtil.popup.waveStd(proNm + 'WaveStd', '');
        });
    }

    //저장
    function fnSave(){

        //프로시저 호출 SP_OB_MAIN
        var jsonData;
        var saveUrl	= "/ctrl/outbound/outboundWave/updateOutbouncWavePopCreate";
        var msg 	= "MSG_OUTRI_CFM_016"; //웨이브를 생성하시겠습니까?

        var data = {
//			  dcCd		: $('#mainDcCd option:selected').val(),
//            obYmdFr		: WMSUtil.fnDateSetting.yyyymmdd(getData.obYmdFr),
//            obYmdTo		: WMSUtil.fnDateSetting.yyyymmdd(getData.obYmdTo),
        	clientCd	: getData.CLIENT_CD,
    		waveStdNo	: $("#outboundWavePopWaveStdNo").val(),
            waveStdDesc	: $("#outboundWavePopWaveStdDesc").val(),
            obYmdFr		: getData.obYmdFr,
            obYmdTo		: getData.obYmdTo,
            flag		: "A"
        };

        //validation
        if($("#outboundWavePopWaveStdNo").val().length == 0){//Wave 번호 검사
            Util.alert('MSG_OUTRI_VAL_013'); //웨이브기준번호 항목은 필수 입력입니다.
            $("#outboundWavePopWaveStdNo").focus();
            return false;
        }else if($("#outboundWavePopWaveStdNo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_014'); //웨이브기준번호는 공백으로 입력 할 수 없습니다.
            $("#outboundWavePopWaveStdNo").focus();
            return false;
        }

        jsonData = JSON.stringify(data);


        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
    		$("#modalOutboundWavePop").paragonClosePopup();
    		$outboundWaveHeaderGrid.paragonGridReload();
    	})

    }
}();



$("document").ready(function(){
    OutboudnWavePopApp.init();
});
