(function($) {
    $.ajaxSetup({
         global: false
        ,timeout: 30000
        ,beforeSend : function(xhr){
            xhr.setRequestHeader("AjaxType", "paragon");
            xhr.setRequestHeader("proCd", "PC0001");
        }
    });
}(jQuery));

var Util = function () {
    "use strict";
    return {
		CheckOs: function () {
        	var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

        	if (mobile) {
        		// 유저에이전트를 불러와서 OS를 구분합니다.
        		var userAgent = navigator.userAgent.toLowerCase();
        		Util.log(userAgent);
        		if (userAgent.search("android") > -1){
        			return "android";
        		}else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)|| (userAgent.search("ipad") > -1)){
        			return "ios";
        		}else{
        			return "web";
        		}
        	} else {
        		return "web";
        	}
		},
		CheckAndVer: function () {
			var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

			if (mobile) {
				var userAgent = navigator.userAgent.toLowerCase();
				Util.log(userAgent);
				if (userAgent.search("android 4.") > -1){
					return false;
				}else{
					return true;
				}
			} else {
				return true;
			}
		},
        alertAjax : function(map, flag){
            if(flag == null){
            }else if(flag == 'alert'){
                $.ajax({
                    url         : "/system/common/alert",
                    data        : map,
                    type        : "GET",
                    dataType    : "json",
                    cache       : false,
                    async       : false,
                    success     : function(result) {
                    console.log(result);
                        if(result.stsCd == 100){
                            alert(result.msgTxt);
                        }else{
                            alert("'"+result.msgCd+"'코드 없음");
                        }
                    }
                });
            }else if(flag == 'confirm'){
                var returnVal;
                $.ajax({
                    url      : "/system/common/alert",
                    data     : map,
                    type     : "GET",
                    dataType : "json",
                    cache    : false,
                    async    : false,
                    success  : function(result) {
                        if(result.stsCd == 100){
                            returnVal = result;
                        }else{
                            return "'"+result.msgCd+"'코드 없음";
                        }
                    }
                });
                return returnVal;
            }
        },
        alert: function (msgCd, addMsg) {
            if(!msgCd){
                alert(msgCd);
                return;
            }
            var sendData = {
                    msgCd   : msgCd
                ,   addMsg  : addMsg
            }
            Util.alertAjax(sendData, 'alert');

        },
        alertCode: function (msgCd, codeGroupCd, codeOther) {
            if(!msgCd){
                alert(msgCd);
                return;
            }
            var sendData = {
                    msgCd   : msgCd
                ,   codeGroupCd : codeGroupCd
                ,   codeOther    : codeOther
            }
            Util.alertAjax(sendData, 'alert');

        },
//        alertAddMsg2:
        confirm: function (msgCd) {
            if(!msgCd){
                alert(msgCd);
                return;
            }

            var sendData = {
                    msgCd   : msgCd
            }
            return Util.alertAjax(sendData, 'confirm');
        },
        getProNm : function(codeGroupCd, codeOther){
            var returnVal;
            $.ajax({
                url      : "/system/common/getProNm",
                data     : {
                        codeGroupCd : codeGroupCd
                    ,   codeOther   : codeOther
                },
                type     : "GET",
                dataType : "json",
                cache    : false,
                async    : false,
                success  : function(result) {
                    if(result.stsCd == 100){
                        returnVal = result;
                    }else{
                        return "'"+msgCd+"'코드 없음";
                    }
                }
            });
            return returnVal;
        },
       MakeSelectOptions: function (El,json,select,first) {
            if(first){
                El.html("");
                var option = $("<option value='' />");
                option.text(first)
                El.append(option);
            }
            for (var i = 0; i < json.length; i++) {
                var thisValue = json[i].VALUE;
                var thisName = json[i].NAME;
                var option = $("<option>", {value: thisValue,selected:select == thisValue});
                option.text(thisName)
                El.append(option);
            }
        },
        MakeGridOptions: function (json,firstOption) {
            var txt = "" ;
            if(firstOption || firstOption== ""){
                 txt = ":"+firstOption+";" ;
            }
            for (var i = 0; i < json.length; i++) {
                if(i > 0){
                    txt +=";";
                }
                txt +=json[i].VALUE+":"+json[i].NAME;

            }
            return txt;
        }
    };
}();
