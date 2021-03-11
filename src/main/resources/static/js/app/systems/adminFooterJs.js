
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

            var ul = $('#systemMenuUl');
            ul.empty;

            for(var i = 0; i < data.length; i++){
                var li = $('<li class="nav-item"><a class="nav-link" aria-current="page" href="'+data[i].menuUrl+'">'+data[i].menuNm+'</a></li>');
                ul.append(li);
            }
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
	}

}();

$(document).ready(function(){
	adminFooterJs.init();
})