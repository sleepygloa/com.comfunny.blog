
var adminFooterJs = function(){
	"use strict";

	var proCd = "";
	var proNm = "adminFooter";

	//var $grid = $('#blogGrid');
	return {
		init : function(){

            fnMenu();
		},
	}


	function fnMenu(){
        $.ajax({
            type : 'GET',
            url : '/systems/menu/list',
            contentType : 'application/json; charset=utf-8'
        }).done(function(data){
            console.log(data);



        }).fail(function(error){
            alert(JSON.stringify(error));
        });
	}

}();

$(document).ready(function(){
	adminFooterJs.init();
})