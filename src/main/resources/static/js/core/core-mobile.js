
var MobileUtil = function () {
	"use strict";
	var systemDate = "";
	return {
		closeApp: function () {
			var device = Util.CheckOs();
			if(device == "android"){
				window.ParagonApp.closeApp();
			}else{

			}
		},
		getBarcode: function (params) {
			var device = Util.CheckOs();
			var jsonParams = mobileEcoding(params);
			if(device == "android"){
				window.ParagonApp.startBarcode(jsonParams);
				//아래 서울우유
//				window.ParagonApp.getBarcode(jsonParams);
			}else if(device == "ios"){
				window.location="jscall://getBarcode&"+jsonParams
			}else if(device == "web"){
			}
		},
		getCamera: function (params) {
			var device = Util.CheckOs();
			console.log("카메라:"+params);

			var jsonParams = mobileEcoding(params);
			if(device == "android"){
				window.ParagonApp.getCamera(jsonParams);
			}else if(device == "ios"){
				window.location="jscall://getCamera&"+jsonParams
			}else if(device == "web"){
			}
		},

		getLocation: function (params) {
			var device = Util.CheckOs();
			var jsonParams = mobileEcoding(params);
			console.log("getLocation:"+params);
			if(device == "android" && window.ParagonApp){
				window.ParagonApp.getLocation(jsonParams);
			}else if(device == "ios"){
				window.location="jscall://getLocation&"+jsonParams
			}else if(device == "web"){
				webLocation(params);
			}
		},
		webViewRecive: function (params) {
//			webViewRecive()"{callback:\"getLocation\",params:\"{barcode:'12312323223'}\"}";
			if(Util.CheckOs() == "ios"){
				params = decodeURI(params);
    		}
			params = JSON.parse(params);
			var callback = params.callback;
			var params = params.params;
			eval(callback+"("+params+")");
		},
		backPressed :function (){
    		var poplen = $("#mainMasterBody").find(".modal:visible");
    		//프로그램(팝업아님)
    		if(poplen.length == 0){
    			//서울우유
    			var activeTabArr = $(".main-tab .tab-close-btn");
    			if(activeTabArr.length > 1 ){
    				$(".main-tab.active .tab-close-btn").trigger("click");

    				$('#navCaption > span').text('');
    				$('#navCaption > span').text($('.main-tab.active > a').attr('data-proNm'));
    			}else{
                    if(Util.CheckOs() == "android"){
     					window.ParagonApp.closeApp(); // android
     				}
    			}
    		//팝업
    		}else if(poplen.length = 1){
    			//추가
//				var device = Util.CheckOs();
//				if(device == "android"){
//					window.ParagonApp.closeApp(); // android
//				}
				//추가 끝
   		 		$("#mainMasterBody").removeClass("modal-open");
   		 		poplen.remove();
   		 		$("#mainMasterBody").find(".modal-footer").remove();
   		 	}else{
   		 		//추가
    			var device = Util.CheckOs();
//    			if(device == "android"){
//    				window.ParagonApp.closeApp(); // android
//    			}
    			//추가 끝
   		 		poplen.remove();
   		 		$("#mainMasterBody").find(".modal-footer").remove();
   		 	}
		},
    };
    function webLocation(params){
	    navigator.geolocation.getCurrentPosition(function(pos) {
	        var latitude = pos.coords.latitude;
	        var longitude = pos.coords.longitude;
	        console.log("web : " + latitude + ", "+ longitude);
	        var callback = eval(params.callback);
			callback(JSON.stringify({lat:latitude,lng:longitude}));
	    });
    }
    function mobileEcoding(data){

    	var jsonString = JSON.stringify(data);
    	return encodeURI(jsonString);
    }
}();
