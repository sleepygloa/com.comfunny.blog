/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 메세지 관리[SystemMessageApp]
 * Program Code     : PWMSM110E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Jin Ho       2016. 10. 24.       First Draft.
 */
var SystemMessageApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    // [El]프로그램 그리드
    var $messageGrid = $("#systemMessageGrid");


    return {
        init: function () {

        	fnEvents();
            //Grid
        	fnList();

        }
    };

    //[Fn] 이벤트
    function fnEvents(){

    	$('#systemMessageSearchBtn').click(function(){
    		fnSearch();
//    		$.ajax({
//    			url		: "/ctrl/settings/system/message/listXmlData",
//                data		: {
//                	"codeGroupCd" : "SC0013"
//                },
//    			success	: function(data){
//    				fnList();
//    			}
//    		});
    	});

    	$('#systemMessageMsgCd').keydown(function(e){
    		if(e.keyCode == 13){
    			fnSearch();
    		}
    	})

    	$('#systemMessageMsgTxt').keydown(function(e){
    		if(e.keyCode == 13){
    			fnSearch();
    		}
    	})

    	//행 추가
    	$('#systemMessageAddRowBtn').click(function(){
    		$messageGrid.paragonGridAddRow();
    	});

    	//행 수정
    	$('#systemMessageSaveBtn').click(function(){
    		fnSave();
    	});

    	//엑셀 다운로드
    	$('#systemMessageExcelBtn').click(function(){
    		$messageGrid.downloadExcel();
    	});
    }

    function fnSearch(){
    	var msgCd = $('#systemMessageMsgCd').val().trim().replace(/\s/g, " ") .split(' ');
    	var msgTxt = $('#systemMessageMsgTxt').val().trim().replace(/\s/g, " ") .split(' ');

    	var sendData = {};
    	sendData.length = 0;

    	for(var i = 0; i < msgCd.length; i++){
    		var strCd = "msgCd_"+i;
    		sendData[strCd] = msgCd[i];
    	}

    	for(var i = 0; i < msgTxt.length; i++){
    		var strTxt = "msgTxt_"+i;
    		sendData[strTxt] = msgTxt[i];
    	}
console.log(sendData);
    	$messageGrid.paragonGridSearch(sendData);
    }

    function fnSave(){
		 var data = {
		         msgCd : "MSG_CD",
		         ko    : "KO",
		         en    : "EN",
		         vi    : "VI"
		 }

    	var jsonData = $messageGrid.getSelectedJsonData("dt_data", data);
    	var jsonObject = JSON.parse(jsonData);
    	var sendData = {
    			"dt_data" 		: jsonObject.dt_data,
    			"codeGroupCd"	: "SC0013",
    			"arr"			: ['ko', 'en', 'vi']
    	}

    	if(!jsonData){
    		Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
    		return false;
    	}
    	App.prcsStart();
        $.ajax({
            url 		: '/ctrl/settings/system/message/updateMessage',
            data 		: JSON.stringify(sendData),
            type 		: "POST",
            dataType 	: "json",
            contentType: 'application/json; charset=utf-8',
            cache		: false,
            async		: false,
            success 	: function(result) {
            	if(result.stsCd == 100){
            		alert(result.msgTxt);
            	}else{
            		alert(result.msgTxt);
            		$messageGrid.paragonGridReload();
            	}

            }
        });
    }

    //[Fn] grid 도메인관리 목록
    function fnList(){
        $messageGrid.paragonGrid({
            url				: '/ctrl/settings/system/message/listMessageData',
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
            height			: '596',
            rowNum			: 1000,
            colModel		: [
                {editable: true,	name:'MSG_CD',  align:"center", width:"200px"},
                {editable: true,	name:'KO',  	align:"center", width:"300px"},
                {editable: true,	name:'EN',  	align:"center", width:"300px"},
                {editable: true,	name:'VI',  	align:"center", width:"300px"}
            ],
            pager		: "#systemMessageGridNavi",
            domainId 	: "DOMAIN_LIST",
        });
    }



}();

$(document).ready(function() {
    SystemMessageApp.init();
});
