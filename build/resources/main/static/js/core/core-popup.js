 /* Popup Application Controller
 ------------------------------------------------ */
 var PopApp = function () {
// 	"use strict";

 	return {
 		paragonOpenPopup: function(settings) {
 	    	var options = $.extend({
 	    		ajaxUrl: '',
 	    		proCd:'',
 	    		id: 'default',
 	    		title: '',
 	    		body: '',
 	    		width: '900px',
 	    		height : '500px',
 	    		pdaHeight : true,
 	    		visible: false,
 	    		btnName:"Save",
 	    		fullScreen:false,
 	    		callBackId:'',
 	    		data:{},
 	    		domainId:"",
 	    		onload:function(){},
 	    		click:null,
 	    		closeEvent:function(){},
 	    		callback:function(){}
 	    	}, settings );

 	    	if($("#"+options.id).is(":visible")){
  				return;
  			}

 	    	var modal = $('<div class="modal fade in custom" />');
// 	    	if(!options.visible){
// 	    		modal.hide();
// 	    	}
 	    	var modalDialog = $('<div class="modal-dialog" />');
 	    	var modalContent = $('<div class="modal-content " />');
 	    	if(options.pdaHeight){
 	    		modalContent.css('height', '100%');
 	    	}


 	    	if(!options.fullScreen){
 	    		modalDialog.css("width",options.width);
 	    		modalDialog.draggable({ scroll: false,cancel: ".drag-not" });
 	    	}else{
 	    		modalDialog.css({
 	    			"width":"100%",
 	    			"margin":"0px",
 	    			/** WEBAPP 2018. 09. 14. 0 -> 15  */
// 	    			"top":"0px",

 	    		});
 	    		/**
 	    		 * WEBAPP. 2018. 09. 14. 팝업창 스크롤 제거
 	    		 * 사유 ) 전체화면시 팝업창스크롤 생기지 않게 업무
 	    		 * 사유 ) 그러나, 내용은 스크롤 가능.
 	    		 */
 	    		modal.css({
// 	    		    "overflow-y": "scroll",
 	    		   "overflow-y": "hidden",
 	    			"background-color": "#fff"
// 	    			"padding-top": "15px"
 	    		});
 	    		modalContent.css({
 	    			"box-shadow": "none"
 	    		});
 	    	}
 	    	modal.data("opener-data",options.data);
 	    	modal.data("opener-callback",options.callback);



 	    	modal.append(modalDialog);
 	    	modalDialog.append(modalContent);
 	    	if(options.id){
 	    		modal.attr("id",options.id);
 	    	}
 	    	if(options.ajaxUrl){
 	    		$.ajax({
 	    	        mimeType: 'text/html; charset=utf-8',
 	    	        url: options.ajaxUrl,
 	    	        //data: options.data,
 	    	        type: 'GET',
 	    	        beforeSend : function(xhr){
 	    				if(options.proCd){
 			    			xhr.setRequestHeader("proCd",options.proCd);
 	    		    	}
 	    	    	},
 	    	        success: function(data) {
 	    	        	modalContent.html(data);
 	    	        	modalContent.find("[data-close-btn='ture']").data("target-modal",options.id);
 	    	        	modalContent.find(".modal-body").addClass("drag-not");
 	    	        	modalContent.find("[data-authRule]").addClass("delete-flag");
 	    				var modalTitle =modalContent.find(".modal-title");
 	    				modalTitle.attr("data-domain-id",options.domainId);
// 	    				modalTitle.text(options.title);
 	    	        	modalContent.find("[data-close-btn='ture']").click(function(){
 	    	        		var targetId = $(this).data("target-modal");
 	    	//		            		alert(targetId);
 	    	        		options.closeEvent(options.data);
 	    	        		var poplen = $("#mainMasterBody").find(".modal-body:visible").length;
 	    	       		 	if(poplen <= 1){
 	    	       		 		$("#mainMasterBody").removeClass("modal-open");
 	    	       		 	}
 	    	        		$("#"+targetId).remove();
 	    	        	});



 	    	        	fnPopAuthCheck(modalContent,options,modal);
// 	    	        	$("#mainMasterBody").append(modal);
// 	    	        	$("#mainMasterBody").addClass("modal-open");
// 	    	        	options.onload(modal);

 	    	        },
 	    	        dataType: "html"
 	    	    });
 	    	}else if(options.body){
//
//
// 	    		var modalHeader = $('<div class="modal-header" />');
// 	    		var modalButton = $('<button type="button" class="close" data-close-btn="ture"  >×</button>');
// 	    		var modalTitle = $('<h4 class="modal-title" />');
// 	    		modalTitle.html(options.title);
// 	    		modalHeader.html(modalButton);
// 	    		modalHeader.append(modalTitle);
//
// 	    		var modalBody = $('<div class="modal-body drag-not" />');
// 	    		modalBody.html(options.body);
//
// 	    		var modalFooter = $('<div class="modal-footer" />');
// 	    		var modalFooterButton = $('<a href="javascript:;" class="btn btn-sm btn-white " data-close-btn="ture" >Close</a>');
// 	    		var modalActionButton = $('<a href="javascript:;" class="btn btn-sm btn-danger" >Save</a>');
// 	    		modalActionButton.html(options.btnName);
// 	    		modalFooter.append(modalFooterButton);
// 	    		if(options.click){
// 					modalFooter.append(modalActionButton);
// 					modalActionButton.click(function(){
// 						options.click();
// 					});
// 				}
//
// 	    		modalContent.append(modalHeader);
// 	    		modalContent.append(modalBody);
// 	    		modalContent.append(modalFooter);
//
// 	    		modalContent.find("[data-close-btn='ture']").data("target-modal",options.id);
// 	    		modalContent.find("[data-close-btn='ture']").click(function(){
// 	    			var targetId = $(this).data("target-modal");
// 	    			var poplen = $("#mainMasterBody").find(".modal-body:visible").length;
// 	       		 	if(poplen <= 1){
// 	       		 		$("#mainMasterBody").removeClass("modal-open");
// 	       		 	}
// 	    			$("#"+targetId).remove();
// 	    		});
// 	    		fnPopAuthCheck(modalContent,options,modal);

 	    	}
 	    	return $(this);
 	    },
 		paragonOpenWindow: function(settings) {
 			var options = $.extend({
 	    		ajaxUrl		: '',
 	    		id			: 'default',
 	    		title		: '',
 	    		body		: '',
 	    		width		: 900,
 	    		top			: 90,
 	    		left		: "",
 	    		visible		: false,
 	    		domainId	: "",
 	    		btnName		: "Save",
 	    		callBackId	: '',
 	    		data		: {},
 	    		onload		: function(){},
 	    		click		: function(){},
 	    		closeEvent	: function(){},
 	    		visibleEvent: null
 	    	}, settings );

 			var thisEl = $("#"+options.id);
 	    	if(thisEl.is(":visible")){
 	    		thisEl.data("opener-data",options.data);
 	    		if(thisEl.hasClass("window-min")){
 	    			thisEl.find("[data-min-btn='ture']").trigger("click");
// 	    			thisEl.toggleClass("window-min");
// 	    			thisEl.find("[data-min-btn='ture']").removeClass("fa-caret-up");
// 	    			thisEl.find("[data-min-btn='ture']").addClass("fa-minus");
// 	    			thisEl.find("[data-min-btn='ture']").addClass("text-b");
//         			var winTop = thisEl.data("position-top");
//         	    	var winLeft = thisEl.data("position-left");
//         	    	var winWidth = thisEl.data("position-width");
//         	    	thisEl.animate({left:winLeft+"px",top:winTop+"px",width:winWidth+"px"}, 300, function() {});
//         	    	thisEl.draggable("enable");
//         			$("#mainMasterBody").append(thisEl);
 	    			if(options.visibleEvent){
 	    				options.visibleEvent();
 	    			}
 	    		}else{
 	    			$("#mainMasterBody").append(thisEl);
 	    			if(options.visibleEvent){
 	    				options.visibleEvent();
 	    			}
 	    		}
  				return;
  			}

 	    	var paragonWindow = $('<div class="window" />');
 	    	var winLeft = options.left;
 	    	var winTop = options.top;
 	    	var winWidth = options.width.toLowerCase();

 	    	if(winWidth.indexOf('px') != 0) {
 	    		var len = winWidth.length;
 	    		winWidth = winWidth.substring(0, len-2);
 	    	}
 	    	if(winLeft == ""){
 	    		var wWidth = $(window).width();
 	    		winLeft = ((wWidth-parseInt(winWidth)) /2);
 	    	}
 	    	var windows = $(".window");
 	    	for (var i = 0; i < windows.length; i++) {
 	    		var openWindow = windows.eq(i);
 	    		if(!openWindow.hasClass("window-min")){
 	    			var top = openWindow.data("position-top");
 	    			var left = openWindow.data("position-left");
 	    			var gapTop = winTop - top
 	    			var gapLeft = winLeft -left
 	    			if(gapTop < 25 && gapLeft < 25){
 	    				winTop = winTop+25;
 	    				winLeft = winLeft+25;
 	    			}

 	    		}
 	    	}
 	    	paragonWindow.css({top:winTop+"px",left:winLeft+"px"});
 	    	paragonWindow.data("position-top",winTop);
 	    	paragonWindow.data("position-left",winLeft);
 	    	paragonWindow.data("position-width",winWidth);
// 	    	if(!options.visible){
// 	    		paragonWindow.hide();
// 	    	}
 	    	var paragonWindowDialog = $('<div class="window-dialog" />');
// 	    	paragonWindowDialog.css("width",options.width);
 	    	paragonWindow.css("width",winWidth+"px");
 	    	var paragonWindowContent = $('<div class="window-content " />');
 	    	paragonWindowContent.data("target-window",options.id);
 	    	paragonWindow.data("opener-data",options.data);
// 	    	paragonWindowContent.mousedown(function(e){
// 	    		var targetId = $(this).data("target-window");
// 	    		$("#mainMasterBody").append($("#"+targetId));
// 	    	});

 	    	paragonWindow.append(paragonWindowDialog);
 	    	paragonWindowDialog.append(paragonWindowContent);
 	    	if(options.id){
 	    		paragonWindow.attr("id",options.id);
 	    	}
 	    	if(options.ajaxUrl){
 	    		$.ajax({
 	    	        mimeType: 'text/html; charset=utf-8',
 	    	        url: options.ajaxUrl,
 	    	        //data: options.data,
 	    	        type: 'GET',
 	    	        success: function(data) {
 	    	        	paragonWindowContent.html(data);

 	    	        	paragonWindowContent.find("[data-close-btn='ture']").data("target-window",options.id);
 	    	        	paragonWindowContent.find("[data-min-btn='ture']").data("target-window",options.id);
 	    	        	paragonWindowContent.find("[data-full-btn='ture']").data("target-window",options.id);
 	    	        	paragonWindowContent.find(".window-body").addClass("drag-not");

 	    				var paragonWindowTitle =paragonWindowContent.find(".window-title");
 	    				paragonWindowTitle.text(options.title);

// 	    				select()
// 	    				paragonWindowContent.find("[data-close-btn='ture']").unbind("mousedown");
// 	    				paragonWindowContent.find("[data-min-btn='ture']").unbind("mousedown");
 	    	        	paragonWindowContent.find("[data-close-btn='ture']").click(function(e){
 	    	        		e.stopPropagation();
 	    	        		var targetId = $(this).data("target-window");
 	    	//		            		alert(targetId);
 	    	        		options.closeEvent(options.data);
 	    	        		$("#mainMasterBody").removeClass("window-open");
 	    	        		$("#"+targetId).remove();
 	    	        	});

 	    	        	paragonWindowContent.find("[data-full-btn='ture']").click(function(e){
 	    	        		alert("준비중입니다.");
 	    	        	});
 	    	        	paragonWindowContent.find("[data-min-btn='ture']").click(function(e){
 	    	        		e.stopPropagation();
 	    	        		var targetId = $(this).data("target-window");
 	    	        		$("#"+targetId).toggleClass("window-min");
 	    	        		var windowsWidth = $(window).width();
 	    	        		var windowsHeight = $(window).height();
 	    	        		if($(this).find("i").hasClass("fa-caret-up")){
 	    	        			$(this).children().removeClass("fa-caret-up");
 	    	        			$(this).children().addClass("fa-minus");
 	    	        			$(this).children().addClass("text-b");
 	    	        			var winTop = $("#"+targetId).data("position-top");
 	    	        	    	var winLeft = $("#"+targetId).data("position-left");
 	    	        	    	var winWidth = $("#"+targetId).data("position-width");
 	    	        			$("#"+targetId).animate({left:winLeft+"px",top:winTop+"px",width:winWidth+"px"}, 300, function() {});
 	    	        			$("#"+targetId).draggable("enable");
 	    	        			$("#mainMasterBody").append($("#"+targetId));

 	    	        			var windowMins = $(".window-min");
 	    	        			var minLen = windowMins.length;
 	    	        	    	for (var i = 0; i < minLen; i++) {
 	    	        	    		var minWindow = windowMins.eq(i);

 	    	        	    		var postionLeft = minWindow.offset().left
     	        	    			var checkLeft = windowsWidth-((minLen-i)*200)-((minLen-i)*2);

// 	    	        	    		console.log(checkLeft);
// 	    	        	    		console.log(postionLeft);
     	        	    			if(checkLeft > postionLeft ){
     	        	    				minWindow.animate({left: checkLeft+"px"}, 300, function() {});
     	        	    			}

 	    	        	    	}

 	    	        		}else{
 	    	        			$(this).children().addClass("fa-caret-up");
 	    	        			$(this).children().removeClass("fa-minus");
 	    	        			$(this).children().removeClass("text-b");

 	    	        			var windowMins = $(".window-min");
 	    	        			var minLen = windowMins.length;
 	    	        			$("#"+targetId).animate({left:windowsWidth-200-((minLen-1)*200)-((minLen-1)*2)+"px",top:windowsHeight-37.27+"px",width:"200px"}, 300, function() {});
 	    	        			$("#"+targetId).css({position:"fixed"});
 	    	        			$("#"+targetId).draggable({ disabled: true });

 	    	        		}

 	    	        	});

 	    	        	$("#mainMasterBody").append(paragonWindow);
// 	    	        	$("#mainMasterBody").addClass("window-open");
 	    	        	paragonWindow.draggable({
 	    	        		scroll: false,
 	    	        		cancel: ".drag-not" ,
 	    	        		start: function( event, ui ) {
 	    	        			$("#mainMasterBody").append($(ui.helper.context));
 	    	        		},
 	    	        		stop: function( event, ui ) {
     	        				$(ui.helper.context).data("position-top",ui.position.top);
     	        				$(ui.helper.context).data("position-left",ui.position.left);
 	    	        		}

     	        		});
 	    	        	options.onload(paragonWindow);

 	    	        },
 	    	        dataType: "html"
 	    	    });
 	    	}else if(options.body){
//
//
// 	    		var paragonWindowHeader = $('<div class="window-header" />');
// 	    		var paragonWindowButton = $('<button type="button" class="close" data-close-btn="ture"  >×</button>');
// 	    		var paragonWindowTitle = $('<h4 class="window-title" />');
// 	    		paragonWindowTitle.html(options.title);
// 	    		paragonWindowHeader.html(paragonWindowButton);
// 	    		paragonWindowHeader.append(paragonWindowTitle);
//
// 	    		var paragonWindowBody = $('<div class="window-body drag-not"  />');
// 	    		paragonWindowBody.html(options.body);
//
// 	    		var paragonWindowFooter = $('<div class="window-footer" />');
// 	    		var paragonWindowFooterButton = $('<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >Close</a>');
// 	    		var paragonWindowActionButton = $('<a href="javascript:;" class="btn btn-sm btn-danger" >Save</a>');
// 	    		paragonWindowActionButton.html(options.btnName);
// 	    		paragonWindowFooter.append(paragonWindowFooterButton);
//// 	    		paragonWindowFooter.append(paragonWindowActionButton);
//// 	    		paragonWindowActionButton.click(function(){
//// 	    			options.click();
//// 	    		});
//
// 	    		paragonWindowContent.append(paragonWindowHeader);
// 	    		paragonWindowContent.append(paragonWindowBody);
// 	    		paragonWindowContent.append(paragonWindowFooter);
//
// 	    		paragonWindowContent.find("[data-close-btn='ture']").data("target-window",options.id);
// 	    		paragonWindowContent.find("[data-close-btn='ture']").click(function(){
// 	    			var targetId = $(this).data("target-window");
// 	    			$("#mainMasterBody").removeClass("window-open");
// 	    			$("#"+targetId).remove();
// 	    		});
// 	    		$("#mainMasterBody").append(paragonWindow);
// 	    		$("#mainMasterBody").addClass("window-open");
// 	    		paragonWindow.draggable({
// 	        		scroll: false,
// 	        		cancel: ".drag-not" ,
// 	        		start: function( event, ui ) {
// 	        			$("#mainMasterBody").append($(ui.helper.context));
// 	        		},
// 	        		stop: function( event, ui ) {
//         				$(ui.helper.context).data("position-top",ui.position.top);
//         				$(ui.helper.context).data("position-left",ui.position.left);
// 	        		}
//
//         		});
// 	        	options.onload(paragonWindow);

 	    	}
 	    	return $(this);
 		}
     };
     function fnPopCallBack(checkPage, options,modal){

     }
     function fnPopAuthCheck(checkPage, options,modal){
 			var doaminArr = checkPage.find("[data-domain-id]");
 			var dt_domainid = [];
 			for(var i = 0 ; i < doaminArr.length ; i++){
 				dt_domainid.push({"colname":doaminArr.eq(i).data("domain-id")});
 			}
 			var jsonData = JSON.stringify({"dt_domainid":dt_domainid});
 			$.ajax({
 	    		url : "/ctrl/settings/system/auth/listCheckAuth",
 	    		data : jsonData,
 	    		contentType: 'application/json; charset=utf-8',
 	    		success : function(result) {
 	    			var authList = result.dt_grid;

 	    			for(var i in authList){
 	    				if(authList[i].AUTH_YN =='Y'){
 	    					checkPage.find("[data-authRule*='"+authList[i].AUTH_CD+"']").each(function() {
 	    		    			$(this).removeClass("delete-flag");
 	    		    	    });
 	    				}
 					}
 	    			var searchForm = checkPage.find(".search-form.multi");
 	    			for(var i = 0 ; i < searchForm.length ; i++){
 	    				var $el = searchForm.eq(i);
 	    				var tgBtn = $("<i class='fa fa-caret-down toggle-btn' />");
 	    				$el.append(tgBtn);
 	    		    	tgBtn.click(function(){
 	    		    		var tarGet = $(this).parents(".search-form.multi");
 	    		    		if(tarGet.hasClass("on")){
 	    		    			tarGet.removeClass("on");
 	    		    			$(this).addClass("fa-caret-down");
 	    		    			$(this).removeClass("fa-caret-up");
 	    		    		}else{
 	    		    			tarGet.addClass("on");
 	    		    			$(this).removeClass("fa-caret-down");
 	    		    			$(this).addClass("fa-caret-up");
 	    		    		}
 	    		    	});
 	    			}
// 	    			console.log(checkPage.find(".delete-flag"));
// 	    			checkPage.find(".delete-flag").remove();
 	    			checkPage.find(".delete-flag").each(function() {
 		    			$(this).remove();
 		    	    });
 	    			var domainList = result.dt_domainname;
 	    			for(var i in domainList){
 						var element = checkPage.find("[data-domain-id='"+domainList[i].lang_key+"']");
 						var txt = domainList[i].lang_text
 						if(txt != ""){
 							if(element.is("input[type=text]")){
 								element.attr("placeholder",txt);
 							}else{
 								element.text(txt);
 							}
 						}
 	    			}
 	    			if(!options.visible){
 	    	    		modal.hide();
 	    	    	}

 	    			//WMS
 	    			//팝업 타이틀
 	    			var modalTitle = modal.find('.modal-title');
 	    			if(modalTitle.text().length > 37){
 	    				modalTitle.css({'padding-left' 	: '25px',
 	    								'padding-right' : '25px',
 	    								'font-size'		: '0.8em'});
 	    			}else if(modalTitle.text().length > 25){
 	    				modalTitle.css({'padding-left' 	: '25px',
										'padding-right'	: '25px',
										'font-size'		: '0.8em',
										'margin-top'	: '10px'});
 	    			}else{
 	    				modalTitle.css({'padding-left' 	: '25px',
										'padding-right'	: '25px',
										'font-size'		: '1em',
										'margin-top'	: '10px'});
 	    			}
 	    			//WMS 끝

 	    			$("#mainMasterBody").append(modal);
 	            	$("#mainMasterBody").addClass("modal-open");
 	            	options.onload(modal);

 	            	if($("div[id=" + options.id + "]").length == 2){
 	            	    modal.remove();
 	            	}
// 	            	var modalInputArr = $('#pPdaIbExamConfirmHeaderGrp > form > div > div').find('input');
// 	            	console.log(modalInputArr[0]);
////            		$("input").scrollTop($(this)[0].scrollHeight);
// 	            	$('#pPdaIbExamConfirmHeaderGrp').css('padding-bottom', '300px');
// 	            	modalInputArr.click(function(){
// 	            		console.log($(this)[0]);
// 	            		console.log($(this).offset().top);
// 	            		$(this).scrollTop($(this).offset().top);
// 	            	})

 	    		}

 	    	});
 		}

 }();



  (function ( $ ) {


 	 $.fn.setTitie = function(title) {
 		 var titleBar =$(this).find(".modal-title");
 		 titleBar.text(title);
 	 };
 	 $.fn.paragonClosePopup = function() {
 		 var poplen = $("#mainMasterBody").find(".modal-body:visible").length;
 	 	if(poplen <= 1){
 	 		$("#mainMasterBody").removeClass("modal-open");
 	 	}
 		 $(this).remove();
 	 };
 	 $.fn.PopAppGetData = function() {
 		var data =$(this).data("opener-data");
 		return 	data;
 	 };
 	 $.fn.popupCallback = function(data) {
 		 var callbackFunction = $(this).data("opener-callback");
 		 callbackFunction(data);

 	 };
//  	$.fn.paragonOpenPopup = function(settings) {
//
//  		var options = $.extend({
//  			ajaxUrl: '',
//  			id: 'default',
//  			title: '',
//  			body: '',
//  			width: '900px',
//  			pdaHeight:false,
//  			btnName:"Save",
//  			domainId:"",
//  			onload:function(){},
//  			click:null
//  		 }, settings );
//
//  		$(this).click(function(){
//
//  			if($("#"+options.id).is(":visible")){
//  				return;
//  			}
//
//  			var modal = $('<div class="modal fade in custom" />');
// 	 		var modalDialog = $('<div class="modal-dialog" />');
// 	 		modalDialog.css("width",options.width);
// 	 		var modalContent = $('<div class="modal-content" />');
//
//
//
// 	 		modal.append(modalDialog);
//// 	 		if(!options.visible){
//// 	    		modal.hide();
//// 	    	}
// 	 		modalDialog.append(modalContent);
// 	 		if(options.id){
// 	 			modal.attr("id",options.id);
// 	 		}
// 	 		if(options.ajaxUrl){
// 	 			Pace.restart();
// 				$.ajax({
// 		            mimeType: 'text/html; charset=utf-8',
// 		            url: options.ajaxUrl,
// 		            type: 'GET',
// 		            success: function(data) {
// 		            	modalContent.html(data);
// 		            	modalContent.find("[data-close-btn='ture']").data("target-modal",options.id);
//
// 						var modalTitle =modalContent.find(".modal-title");
// 						modalTitle.attr("data-domain-id",options.domainId);
// 						if(options.title != "" ){
// 							modalTitle.text(options.title);
// 						}
//
// 		            	modalContent.find("[data-close-btn='ture']").click(function(){
// 		            		var targetId = $(this).data("target-modal");
//// 		            		alert(targetId);
// 		            		var poplen = $("#mainMasterBody").find(".modal-body:visible").length;
// 			       		 	if(poplen <= 1){
// 			       		 		$("#mainMasterBody").removeClass("modal-open");
// 			       		 	}
// 		            		$("#"+targetId).remove();
// 		            	});
// 		            	fnPopAuthCheck(modalContent,options,modal);
//// 		            	$("#mainMasterBody").append(modal);
//// 		            	$("#mainMasterBody").addClass("modal-open");
//// 		            	options.onload();
// 		            },
// 		            dataType: "html"
// 				});
// 			}else if(options.body){
////
//// 				var modalHeader = $('<div class="modal-header" />');
//// 				var modalButton = $('<button type="button" class="close" data-close-btn="ture"  >×</button>');
//// 				var modalTitle = $('<h4 class="modal-title" />');
//// 				modalTitle.html(options.title);
//// 				modalHeader.html(modalButton);
//// 				modalHeader.append(modalTitle);
////
//// 		 		var modalBody = $('<div class="modal-body drag-not" style="overflow-y:scroll;height:'+modalDeviceHeight+'" />');
//// 		 		modalBody.html(options.body);
////
//// 		 		var modalFooter = $('<div class="modal-footer" />');
//// 				var modalFooterButton = $('<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >Close</a>');
//// 				var modalActionButton = $('<a href="javascript:;" class="btn btn-sm btn-danger" >Save</a>');
//// 				modalActionButton.html(options.btnName);
//// 				modalFooter.append(modalFooterButton);
//// 				if(options.click){
//// 					modalFooter.append(modalActionButton);
//// 					modalActionButton.click(function(){
//// 						options.click();
//// 					});
//// 				}
////
//// 				modalContent.append(modalHeader);
//// 				modalContent.append(modalBody);
//// 				modalContent.append(modalFooter);
////
//// 	        	modalContent.find("[data-close-btn='ture']").data("target-modal",options.id);
//// 	        	modalContent.find("[data-close-btn='ture']").click(function(){
//// 	        		var targetId = $(this).data("target-modal");
//// 	        		var poplen = $("#mainMasterBody").find(".modal-body:visible").length;
//// 	       		 	if(poplen <= 1){
//// 	       		 		$("#mainMasterBody").removeClass("modal-open");
//// 	       		 	}
//// 	        		$("#"+targetId).remove();
//// 	        	});
////
//// 	        	options.onload(modal);
//// 	        	$("#mainMasterBody").append(modal);
//// 	        	$("#mainMasterBody").addClass("modal-open");
//
// 			}
//  		});
//  	};


 }( jQuery ));