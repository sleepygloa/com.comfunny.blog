

(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		define([ 
			"jquery"
		], factory );
 	} else {
		factory( jQuery );
 	}
}(function( $ ) {
	"use strict";
	$.paragonfiles = $.paragonfiles || {};
	if(!$.paragonfiles.hasOwnProperty("defaults")) {
		$.paragonfiles.defaults = {};
	}
	$.extend($.paragonfiles,{
		version : "1.0.0",
		formId : function(sid){
			return String(sid).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g,"\\$&");
		},
		fileid : 1,
		uidPref: 'prg',
		randId : function( prefix )	{
			return (prefix || $.paragonfiles.uidPref) + ($.paragonfiles.fileid++);
		},
		message: '',
		setMsgText : function( msg )	{
			$.paragonfiles.message = msg;
		},
		extend : function(methods) {
			$.extend($.fn.paragonFiles,methods);
			if (!this.no_legacy_api) {
				$.fn.extend(methods);
			}
		},
		checkMaxCnt:function(fileFormId ,addcnt){
	    	
	    	var self = $("#"+$.paragonfiles.formId( fileFormId ))[0];
	    	var op =  self.op;
	    	var fileUl = op.fileUl;
	    	
	    	var curcnt = op.fileList.length ;
	    	var maxcnt = op.maxcnt;
	    	var oldcnt = op.oldcnt;
	    	
	    	console.log(op.reset);
	    	console.log(maxcnt);
	    	console.log(addcnt);
	    	if(op.reset && maxcnt < addcnt ){
	    		$.paragonfiles.setMsgText(maxcnt+"개 이하파일만 등록가능합니다.");
	    		$.paragonfiles.showMessage(fileUl);
	    		return false;
	    	}else if(!op.reset && (maxcnt < (curcnt + addcnt+ oldcnt))){
	        	$.paragonfiles.setMsgText(maxcnt+"개 이하파일만 등록가능합니다.");
	        	$.paragonfiles.showMessage(fileUl);
	        	return false;
	        }else{
	        	$.paragonfiles.setMsgText("파일 "+ (addcnt)+"개가 등록되었습니다.");
	        	return true;
	        }
	    },
	    showMessage:function(target){
	    	
	    	var divView = $("<div class='file-tip' />");
	    	divView.append("<span>"+$.paragonfiles.message+"</span>");
	    	divView.delay( 1000 ).fadeOut( "slow", function() {
	    		divView.remove();
	    	});
	    	target.append(divView);
	    	
	    },
	    checkingFileSize:function(self,file){
	    	var op =  self.op;
	    	var fileUl = op.fileUl;
	    	
	    	var checkSize = 1024 * 1024 * (op.maxsize) ; //10MB
	    	if(file.size  > checkSize){
	    		$.paragonfiles.setMsgText((op.maxsize)+"M 이하의 파일만 등록 가능합니다.");
	    		$.paragonfiles.showMessage(fileUl);
	    		return false;
	    	}else if(file.name.length  > 50){
	    		$.paragonfiles.setMsgText("파일명이 50자 이하의 파일만 등록 가능합니다.");
	    		$.paragonfiles.showMessage(fileUl);
	    		return false;
	    	}else{
	    	    return true;
	    	}
	    },
	    browserCheck:function(){
	    	var rv = 10; // Return value assumes failure.    
	    	var agt = navigator.userAgent.toLowerCase();
	    	if (agt.indexOf("msie") != -1){
	    	    if (navigator.appName == 'Microsoft Internet Explorer') {        
	    	         var ua = navigator.userAgent;        
	    	         var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
	    	         if (re.exec(ua) != null)            
	    	             rv = parseFloat(RegExp.$1);    
	    	        }    
	    		
	    	}
	    	return rv <= 9 ? false : true;
	    },
	    checkingImg:function(file){
	    	var fileEx = file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
	    	
	    	 switch(fileEx){
	         case 'gif': case 'jpg': case 'png': case 'pdf':
	        	 return true;
	             break;
	         default:return false;
	             break;
	     }
	    	
	    },
	    checkingPreview:function(fileName){
	    	var fileEx = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
	    	
	    	switch(fileEx){
	    	case 'gif': case 'jpg': case 'png': case 'pdf':
	    		return true;
	    		break;
	    	default:return false;
	    	break;
	    	}
	    	
	    },
	    fileSet:function(fileFormId,addfile){
	    	
	    	var self = $("#"+$.paragonfiles.formId( fileFormId ))[0];
	    	var op =  self.op;
	    	
	    	
	    	if($.paragonfiles.browserCheck()){
	    		if($.paragonfiles.checkingFileSize(self,addfile)){
	    			if(op.onlyImg && !$.paragonfiles.checkingImg(addfile)){
	    				$.paragonfiles.setMsgText("이미지 파일만 등록 가능합니다.");
	    			}else{
	    				op.fileList = [];
	    				op.fileList.push(addfile);
	    			}
	    		}
	    	}
	    },
	    fileAppend:function(fileFormId,addfile){
	    	
	    	var self = $("#"+$.paragonfiles.formId( fileFormId ))[0];
	    	var op =  self.op;
	    	if(!op.mutilFile){
	    		addfile = addfile[0];
	    	}
	    	if($.paragonfiles.browserCheck()){
				if($.paragonfiles.checkingFileSize(self,addfile)){
					if(op.onlyImg && !$.paragonfiles.checkingImg(addfile)){
		    			$.paragonfiles.setMsgText("이미지 파일만 등록 가능합니다.");
		    		}else{
		    			if(op.reset){
		    				op.fileList= [];
		    			}
		    			op.fileList.push(addfile);
		    			$.paragonfiles.addNewFile(self,addfile);
		    		}
	    		}
	    	}
	    },
	    addNewFile:function(self,addfile){
	    	var op =  self.op;
	    	var fileUl = op.fileUl;
	    	var fileFormId = op.fileFormId;
	    	
	    	var fileId = $.paragonfiles.randId();
	    	var fileNm = addfile.name;
	    	var fsize = addfile.size;
	    	
	 		var fileLi = $('<li/>', {class: 'add-file-li',id:fileFormId+"_fileRow"+fileId});
	 		var fileDl = $('<dl/>'); 		
	 		var fileDt = $('<dt/>', {class: 'add-file-name'});
	 		var fileExt = $('<i/>', {class: 'fa ext',"data-ext":fileNm});
	 		var fileNameText = fileNm+' ('+(fsize.fileSizeFormat())+')';
	 		var fileDd = $('<dd/>', {class: 'add-file-btn'})	;
	 		var fileBtn = $('<a/>', {class: 'file-delete',"data-file-row-id":fileFormId+"_fileRow"+fileId}).append($('<i/>', {class: 'fa fa-times'}))	;
	 		fileBtn.click(function(){
    			var fileRowId = $(this).data("file-row-id");
    			var fileRow = $("#"+fileRowId);
    			var index =$("li.add-file-li").index(fileRow);
    			op.fileList.splice(index, 1);
    			fileRow.remove();
    		});
	 		
	 		//파일정보
	 		fileDt.append(fileExt);
	 		fileDt.append(fileNameText);
	 		//파일삭제
	 		fileDd.append(fileBtn);
	 		
	 		//로우생성
	 		fileDl.append(fileDt);
	 		fileDl.append(fileDd);
	 		
	 		fileLi.append(fileDl);
	 		if(op.reset){
	 			fileUl.html(fileLi);
	 		}else{
	 			fileUl.prepend(fileLi);
	 		}
	 		fileUl.scrollTop(0);
	 		
	    },
	    addOldFile:function(self,oldFiles){
	    	var op =  self.op;
//	    	var oldFiles = self.files;
	    	var fileUl = op.fileUl;
	    	var fileFormId = op.fileFormId;
	    	op.oldcnt = oldFiles.length;
	    	for (var i = 0; i < oldFiles.length; i++) {
	    		if(op.reset){
	    			var addfile = oldFiles[oldFiles.length-1];
	    		}else{
	    			var addfile = oldFiles[i];
	    		}
	    		
	    		var fileDseq = addfile.FILE_D_SEQ;
	    		var fileNm = addfile.FILE_NAME;
	    		var fileExt = fileNm.substring(fileNm.lastIndexOf(".")+1);
	    		var filePath = addfile.FILE_PATH;
	    		var fsize = addfile.FILE_SIZE?addfile.FILE_SIZE:0;
	    		addfile["FILE_EXT"] = fileExt;
	    		
	    		var fileLi = $('<li/>', {class: 'add-file-li',id:fileFormId+"_fileOldRow"+fileDseq});
	    		var fileDl = $('<dl/>'); 		
	    		var fileDt = $('<dt/>', {class: 'add-file-name old'});
	    		var fileExt = $('<i/>', {class: 'fa ext',"data-ext":fileNm});
	    		var fileNameText = fileNm+' ('+(fsize.fileSizeFormat())+')';
	    		var fileDd = $('<dd/>', {class: 'add-file-btn'})	;
	    		var fileBtn = $('<a/>', {class: 'file-delete',"data-file-id":fileFormId+"_fileOldRow"+fileDseq,"data-file-seq":fileDseq}).append($('<i/>', {class: 'fa fa-times'}))	;
	    		var fileDownDd = $('<dd/>', {class: 'add-file-btn down'})	;
	    		var fileDownBtn = $('<a/>', {class: 'file-download',"data-file-id":fileFormId+"_fileOldRow"+fileDseq,"data-file-seq":fileDseq}).append($('<i/>', {class: 'fa fa-arrow-down'}))	;
	    		
	    		var privewFlag = $.paragonfiles.checkingPreview(fileNm);
	    		
	    		var filePreviewDd = $('<dd/>', {class: 'add-file-btn preview'})	;
	    		var filePreviewBtn = $('<a/>', {class: 'file-preview',"data-file-id":fileFormId+"_fileOldRow"+fileDseq,"data-file-seq":fileDseq}).append($('<i/>', {class: 'fa fa-search'}))	;
	    		filePreviewBtn.data("file-data",addfile);
	    		filePreviewBtn.click(function(){
	    			var fileDseq = $(this).data("file-seq");
	    			var fileData = $(this).data("file-data");
	    			op.previewBtnClick(fileDseq,fileData);
	    		});
	    		
	    		fileDownBtn.data("file-data",addfile);
	    		fileDownBtn.click(function(){
    				var fileDseq = $(this).data("file-seq");
    				var fileData = $(this).data("file-data");
					op.downBtnClick(fileDseq,fileData);
    			});
	    		fileBtn.data("file-data",addfile);
	    		fileBtn.click(function(){
	    			var fileDseq = $(this).data("file-seq");
	    			var fileData = $(this).data("file-data");
	    			if(confirm(op.delBtnAlert)){
    					var delCnt = op.oldcnt;
    					delCnt = delCnt -1 ;
    					console.log(delCnt);
    					op.oldcnt = (delCnt < 0?0:delCnt);
	    				op.delBtnClick(fileDseq,fileData);
	    			}
	    		});
	    		
	    		//파일정보
	    		fileDt.append(fileExt);
	    		fileDt.append(fileNameText);
	    		//파일삭제
	    		fileDd.append(fileBtn);
	    		fileDownDd.append(fileDownBtn);
    			filePreviewDd.append(filePreviewBtn);
    			
	    		//로우생성
	    		fileDl.append(fileDt);
	    		fileDl.append(fileDd);	    		
	    		fileDl.append(fileDownDd);
	    		if(privewFlag){
	    			fileDl.append(filePreviewDd);
	    		}
	    		
	    		fileLi.append(fileDl);
	    		fileUl.prepend(fileLi);
	    		if(op.reset){
	    			break;
	    		}
			}
	    	fileUl.scrollTop(0);
	    	
	    },
	    form:function(fileFormId){
	    	var self = $("#"+$.paragonfiles.formId( fileFormId ))[0];
	    	var op =  self.op;
	    	var mutilFile =  op.mutilFile;
	    	$(self).addClass("paragon-file");
	 		var fileInput = $('<input/>', {class: 'upload input-group', multiple:mutilFile, id:fileFormId+"_input",type:'file'})	;
	 		var fileBtnWrap = $('<div/>', {class: 'add-file-btn-wrap'})	;
	 		var fileAddBtn = $('<button/>', {class: 'btn btn-sm btn-primary m-r-5',type:'button'}).append($('<i/>', {class: 'fa fa-save'}).html(" "+op.btnName))	;
	 		var fileWrap = $('<div/>', {class: 'add-file-wrap'});
	 		var fileUl = $('<ul/>', {class: 'add-file-list'});
	 		
	 		if(op.maxcnt === 1){
	 			fileWrap.addClass("single");
	 		}
	 		op.fileInput = fileInput;
	 		op.fileBtnWrap = fileBtnWrap;
	 		op.fileAddBtn = fileAddBtn;
	 		op.fileWrap = fileWrap;
	 		op.fileUl = fileUl;
	 		fileAddBtn.click(function(){
	 			if($.paragonfiles.checkMaxCnt(fileFormId, 1)){
	 				fileInput.trigger("click");
	 			};
	 		});
	 		
	 		fileInput.hide();
	 		
	 		$(self).append(fileInput);
	 		if(mutilFile == true){
	 			fileBtnWrap.append(fileAddBtn);
	 			fileWrap.append(fileUl);
	 			$(self).append(fileBtnWrap);
	 			$(self).append(fileWrap);
	 			fileInput.change(function() {
	 				var infiles = $(this)[0].files;
	 				if($.paragonfiles.checkMaxCnt(fileFormId, infiles.length)){
	 					for (var i = 0; i < infiles.length; i++) {
	 						$.paragonfiles.fileAppend(fileFormId,infiles[i]);
	 					}
	 					$.paragonfiles.showMessage(fileUl);
	 				}
	 				fileInput.val("");
	 			});
	 			$.paragonfiles.dragAndDrop(fileUl,fileFormId);
	 		}else{
	 			$(self).append(fileAddBtn);var fileBtnWrap = $('<div/>', {class: 'add-file-btn-wrap'})	;
	 			$(self).addClass("single");
	 			fileInput.change(function() {
	 				var infiles = $(this)[0].files;
	 				$.paragonfiles.fileAppend(fileFormId,infiles);
	 			});
	 		}
	    },
	    dragAndDrop:function(fileUl ,fileFormId){
	    	
	    	fileUl.bind('dragover', function(event) {
 				fileUl.addClass("dnd");
 				event.stopPropagation();
 				event.preventDefault();
 			});
 			fileUl.bind('dragleave', function(event) {
 				fileUl.removeClass("dnd");
 				event.stopPropagation();
 				event.preventDefault();
 			});
 			
 			fileUl.bind('drop', function(event) {
 				fileUl.removeClass("dnd");
 				event.stopPropagation();
 				event.preventDefault();
 				var files = new Array();
 				files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files;
 				
 				if($.paragonfiles.checkMaxCnt(fileFormId ,files.length)){
 					for (var i = 0; i < files.length; i++) {
 						$.paragonfiles.fileAppend(fileFormId,files[i]);
 						if(op.callback) {
 							op.callback(files[i]);
 						}
 					}
 					$.paragonfiles.showMessage(fileUl);
 				}
 				return false;
 			});
	    	
	    },
	});

	$.fn.paragonFiles = function( options ) {
		if(this.files) {return;}
		return this.each( function() {
			var op = $.extend({
	 			fileList : [],
	 			files : [],
	            callback : null,
	            mutilFile:true,
	            previewBtnClick : function(){},
	            downBtnClick : function(){},
	            delBtnClick : deleteFunction,
	            delBtnAlert : "삭제하시겠습니까?",
	            onlyImg : false,
	            browserCheck : false,
	            maxcnt : 10,
	            oldcnt : 0,
	            maxsize : 20,
	            reset : false,
				btnName: "파일검색",
				fileKey : "files",
				fileInput : null,
				fileFormId : "",
	 		    fileBtnWrap : null,
	 		    fileAddBtn : null,
	 		    fileWrap : null,
	 		    fileUl : null
	        }, options );
	 		var el = $(this);
	 		var fileFormId =  el.attr("id");
	 		this.op = op ;
	 		this.op.fileFormId = fileFormId;
	 		this.files = true ;
	 		
	 		$.paragonfiles.form(fileFormId);
	 		
	 		function deleteFunction(fileDSeq){
	 			alert("삭제 이벤트가 등록되지 않았습니다. delBtnClick(fileDSeq)이벤트를 등록해주세요."+ fileDSeq);
	 		}
		});
		
		
	};
	//추가 모듈 생성
	$.paragonfiles.extend({
		set : function(options) {			
			$.extend(self.op, options );
		},
		addFiles : function(oldFiles) {			
			var self = this[0];
//			$.extend(self.op, options );
			$.paragonfiles.addOldFile(self,oldFiles);
		},
		removeFile : function(fileDseq) {
			var op = this[0].op;
			var fileFormId = op.fileFormId;
			var fileRow = $("#"+fileFormId+"_fileOldRow"+fileDseq);
			fileRow.remove();
		},
		clear : function() {
			var op = this[0].op;
			op.fileList= [];
			op.fileUl.html("");
		},
		getFiles : function() {
			var op = this[0].op;
			var formData = new FormData();
			var fileKey = op.fileKey;
			var newFiles = op.fileList;
        	if(newFiles.length > 0) {
        		for (var i = 0; i < newFiles.length; i++) {
	        		var addfile = newFiles[i];
//	        		var fileNm = addfile.name;
//	        		var fsize = addfile.size;
//	        		console.log("fileKey : "+fileKey+", fileNm : "+fileNm+"/"+fsize.fileSizeFormat());
	        		formData.append(fileKey,addfile);
        		}
        		return formData;
        	}else{
        		return false;
        	}
			
//		},
//		saveFiles : function(){
//			var op = this[0].op;
//			var formData = new FormData();
//			var fileKey = op.fileKey;
//			var newFiles = op.fileList;
		}
	});
	
}));
