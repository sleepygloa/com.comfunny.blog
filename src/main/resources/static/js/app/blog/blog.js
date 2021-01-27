
var blogJs = function(){
	"use strict";

	var proCd = "";
	var proNm = "blog";

	var $grid = $('#blogGrid');
	return {
		init : function(){

            leftMenu(7);

			fnEvents();

			blogJs.fnList();


//			var form = $('mainBlogUpdateForm')[0];
//			var formData = new FormData(form);

//			var formData = new FormData();
//
//			if($('#'+programId+'FileUploadText').val() != ''){
//				formData.append('file_0', $('#'+ tableInitData.programId+'FileUpload')[0].files[0]);
//			}
		},
        fnList : function(url){
             $grid.fnList({
                 programId 	: 'blog',
                 programNm 	: '블로그',
                 editable 	: false,
                 url     : url,
                 colOption	: [
                     {id:'idx', 		    title:'순번', width:"50px"},
                     {id:'title',   	    title:'제목',width:"500px"},
                     {id:'url',   	    title:'Github',width:"500px"}
                 ],
                 viewContents : true,
                 viewContentsRe : true,
                 markdown : true,
                 btn			: ['insert', 'update', 'save', 'delete', 'github']
             });
        }
	}

	function fnEvents(){
	}




}();

$(document).ready(function(){
	blogJs.init();
})