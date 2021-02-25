
var blogsJs = function(){

    init : function(){
        var _this = this;

//        $('#btn-save').on('click', function(){
//            _this.save();
//        });
//
//        $('#btn-update').on('click', function(){
//            _this.update();
//        });
//
//        $('#btn-delete').on('click', function(){
//            _this.delete();
//        });
//
//        //API 호출
//        $('#callApiJuso').on('click', function(){
//            _this.delete();
//        });

        //글 불러오기
        $('td[id^="blog_"]').on('click', function(){
            console.log('1');
        });


    },
    getContents : function(idx){
        var data = {
            idx : idx
        };

        $.ajax({
            type : 'GET',
            url : '/blogs/content/idx='+idx,
        }).done(function(data){
        console.log(data);
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },

    save : function(){
        var data = {
            title : $('#title').val(),
            author : $('#author').val(),
            content : $('#content').val()
        };

        $.ajax({
            type : 'POST',
            url : '/api/v1/posts',
            dataType : 'json',
            contentType : 'application/json; charset=utf-8',
            data : JSON.stringify(data)
        }).done(function(){
            alert('글이 등록되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    update : function(){
        var data = {
            title : $('#title').val(),
            content : $('#content').val()
        };

        var id = $('#id').val();

        $.ajax({
            type : 'PUT',
            url : '/api/v1/posts/'+id,
            dataType : 'json',
            contentType : 'application/json; charset=utf-8',
            data : JSON.stringify(data)
        }).done(function(){
            alert('글이 수정되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    delete : function(){
        var id = $('#id').val();

        $.ajax({
            type : 'DELETE',
            url : '/api/v1/posts/'+id,
            dataType : 'json',
            contentType : 'application/json; charset=utf-8'
        }).done(function(){
            alert('글이 삭제되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },

//
//	return {
//		init : function(){
//
//            leftMenu(7);
//
//			fnEvents();
//
//			blogJs.fnList();
//
//		},
//        fnList : function(url){
//            if(url == undefined) url = '/b/blog/list';
//            $grid.paragonGrid({
//                url              : url,
//    //			pageable         : false,
//                //sortable         : false,
//                rownumbers		: true,
//    //            shrinkToFit		: false,
//                multiselect		: false,
//                rowEditable      : false,
//                rowClickFocus	: true,
//                height			: '200',
//                colModel:[
//                    {editable:false,name:'idx',        width:100},
//                    {editable:false, name:"title",      width:300},
//                    {editable:false, name:"categoryA",  width:100, hidden:true},
//                    {editable:false, name:"categoryB",  width:100, hidden:true},
//                    {editable:false, name:"categoryC",  width:100, hidden:true},
//                    {editable:false, name:"githubUrl",  width:150},
//                    {editable:false, name:"markdownContent",  width:100, hidden:true},
//                ],
//    //            caption			: "메뉴 목록",
//    //            domainId		: 'MENU_LIST',
//                //ExpandColumn	: "MENU_NM",
//                pager			: "#blogGridNavi",
//                gridComplete	: function()
//                {
//                    selectRowData = {};
//                    var ids = $grid.jqGrid("getDataIDs");
//
//                    //행이 1개 이상일때 포커스
//                    if(ids && ids.length > 0){
//                        selectRowData = $grid.getRowData(1);
//                        $grid.setFocus(0);
//                        fnMarkdown('VIEW', selectRowData);
//
//                        fnReContent('VIEW');
//                    }
//
//               },
//                onSelectRowEvent: function(currRowData, prevRowData){
//                    selectRowData = currRowData;
//                    fnMarkdown('VIEW', currRowData);
//
//                    fnReContent('VIEW');
//               },
//            });
//        }
//	}
//
//	function fnEvents(){
//    	//조회
//    	$('#blogSearchBtn').click(function(){
//    		fnSearch();
//    		flag = "";
//    	});
//
//    	//추가
//    	$("#blogAddBtn").click(function(){
//    		fnMarkdown('INSERT');
//    		flag = "INSERT";
//    	});
//
//    	//수정
//    	$("#blogUpdateBtn").click(function(){
//    		fnMarkdown('UPDATE');
//    		flag = "UPDATE";
//    	});
//
//    	//저장버튼
//    	$("#blogSaveBtn").click(function(){
//    		fnSave();
//    	});
//    	//행삭제버튼
//    	$("#blogDelBtn").click(function(){
//    		fnDel();
//    	});
//
//        //이미지 변환
//        $("#blogImgBtn").click(function(){
//            var fileUpload = $('<input type="file" class="form-control" id="blogFileUpload" aria-describedby="blogFileUploadAddon" aria-label="Upload" >');
//            fileUpload.trigger('click', function(){
//
//            });
//            fileUpload.on('change', function(){
//                getBase64($(this)[0].files[0]);
//            });
//        });
//
//	}
//
//    function fnMarkdown(flag, rowData){
//        if(flag == "VIEW"){
//            $('#blogViewMarkdown').css('display', 'block');
//            $('#blogUpdateMarkdown').css('display', 'none');
//
//            viewer.setMarkdown(rowData.markdownContent);
//
////              viewer.getMarkdown();
//
//            $('#blogCategoryA').attr('readonly', true).val(rowData.categoryA);
//            $('#blogCategoryB').attr('readonly', true).val(rowData.categoryB);
//            $('#blogCategoryC').attr('readonly', true).val(rowData.categoryC);
//
//            $('#blogTitle').attr('readonly', true).val(rowData.title);
//            $('#blogUrl').attr('readonly', true).val(rowData.githubUrl);
//
//            //$('#blogContent').text(rowData.markdownContent);
//            //$('#blogContent').toastuiEditor({})
//            //document.getElementById('output-html')["innerHTML"] = parseMd(rowData.markdownContent);
//
//
//        }else if(flag == "UPDATE"){
//            var rowid = $grid.getGridParam("selrow");
//            var selData = $grid.getRowData(rowid);
//
//
//            $('#blogViewMarkdown').css('display', 'none');
//            $('#blogUpdateMarkdown').css('display', 'block');
//
//            editor.setMarkdown(selData.markdownContent);
//
//            $('#blogCategoryA').attr('readonly', false).val(selData.categoryA);
//            $('#blogCategoryB').attr('readonly', false).val(selData.categoryB);
//            $('#blogCategoryC').attr('readonly', false).val(selData.categoryC);
//
//            $('#blogTitle').attr('readonly', false).val(selData.title);
//            $('#blogUrl').attr('readonly', false).val(selData.githubUrl);
//
////            $('#blogContent').val(selData.markdownContent);
//            //$('#blogContent').toastuiEditor({})
////            simplemde.value(selData.markdownContent);
//        }else{
//            $('#blogViewMarkdown').css('display', 'none');
//            $('#blogUpdateMarkdown').css('display', 'block');
//
//
//
//            $('#blogCategoryA').attr('readonly', false).val('');
//            $('#blogCategoryB').attr('readonly', false).val('');
//            $('#blogCategoryC').attr('readonly', false).val('');
//
//            $('#blogTitle').attr('readonly', false).val('');
//            $('#blogUrl').attr('readonly', false).val('');
//
//            //$('#blogContent').val('');
//            //$('#blogContent').toastuiEditor({})
////            simplemde.value('');
//        }
//    }
//
//    function fnSearch(){
//        $grid.paragonGridSearch();
//    }
//
//    function fnSave(){
//        var idx = "-1";
//        var saveUrl 	= "/b/blog/saveMd";
//        var msg 		= "저장 하시겠습니까?"
//
//        if(flag == "UPDATE"){
//            var rowid = $grid.getGridParam("selrow");
//            if(rowid == null) return;
//
//            var selData = $grid.getRowData(rowid);
//            idx = selData.idx;
//        }
//
//
//        var rowData = {
//            idx : idx,
//            title : $('#blogTitle').val(),
//            categoryA : $('#blogCategoryA').val(),
//            categoryB : $('#blogCategoryB').val(),
//            categoryC : $('#blogCategoryC').val(),
//            content : editor.getMarkdown(),
//            url     : $('#blogUrl').val()
//        };
//
//
//        //ajax
//        WMSUtil.ajax('POST', JSON.stringify(rowData), saveUrl, msg, function(){
//            alert('저장되었습니다.');
//            fnSearch();
//        })
//    }
//
//    function fnDel(){
//        var idx = "-1";
//        var saveUrl 	= "/b/blog/delete";
//        var msg 		= "삭제 하시겠습니까?"
//        var rowid = $grid.getGridParam("selrow");
//        if(rowid == null) return;
//
//        var selData = $grid.getRowData(rowid);
//
//        var rowData = {
//            idx : selData.idx
//        };
//
//        //ajax
//        WMSUtil.ajax('DELETE', JSON.stringify(rowData), saveUrl, msg, function(){
//            alert('삭제 되었습니다.');
//            fnSearch();
//        })
//
//    }
//
//    function fnReContent(flag, ref,reStep){
//        var reBody = $('#blogRe');
//        reBody.empty();
//
//        var idx = selectRowData.idx;
//        var reAddFlag = false;
//
//    	$.ajax({
//    	    type        : "GET",
//    		url         : "/b/blog/listRe",
//            data        : {"idx" : idx},
//    		dataType    : "json",
//    		async:false,
//    		contentType : "application/json; charset=utf-8",
//    		success     : function(result){
//                //CSS
//                var reContent = 0;
//                var imgWidth = 10
//
//                var dt_grid = result;
//
//                //-1 : 댓글 신규 작성 폼.
//                for(var i = 0; i < dt_grid.length; i++){
//
//                        var dtGridRef = (i == -1? 0 : parseInt(dt_grid[i].ref)); //순번
//                        var dtGridPRef = (i == -1? 0 : parseInt(dt_grid[i].pref));
//                        var dtGridLevel = (i == -1? 0 : parseInt(dt_grid[i].level));
//
//                        if(ref == 0 && reStep == dtGridRef && flag == "VIEW"){
//                            dtGridRef = 0;
//                            dtGridPRef = reStep;
//                        }
//
//                        /*******************************************
//                        * ref -1 : 댓글쓰기 폼.
//                        ********************************************/
//                        var dd = $('<div class="col-xs-w100 m-t-5 m-b-5"  />');
//                        //if(i == -1) dd.css({"border-bottom" : "0.5px solid gray","margin": "5px 0px"});
//
//                        /*******************************************
//                        * 들여쓰기 ㄴ
//                        ********************************************/
//                        var ddTextRe = $('<div class="col-xs-w15" style="height:50px; text-align:center;" />');
//                        ddTextRe.text('ㄴ');
//
//                        var ddDiv = $('<div class="col-xs-w90" style="float:right;" />');
//
//                            /*******************************************
//                            * 사용자 그룹
//                            ********************************************/
//                            var ddImgDiv = $('<div style="position: absolute; width:25px; height:25px; left:-30px; bottom:0px;"></div>');
//                                var uPic = dt_grid[i].picture; if( (flag == "UPDATE" && ref == dtGridRef && reStep == dtGridPRef) || reAddFlag ) uPic = app.userPicture;
//                                var ddImgInput = $('<img src="'+uPic+'" style="width:25px; height: 25px; border-radius:50%; ">');
//
//                            //이름영역
//                            var ddIdDiv = $('<div class="col-xs-w100 " style="min-height:25px;"/>');
//                                var ddIdInput = $('<input class="reContText" id="blogName_'+dtGridRef+'_'+dtGridPRef+'" type="type" value="" readonly />');
//                                var ddTimeInput = $('<input class="reContText" type="type" value="" readonly />');
//
//                            //컨텐츠영역
//                            var ddContentDiv = $('<div class="col-xs-w100 reContText" style="overflow-y:auto;height:auto;" />');
//
//                            //글 리스트
//                            var uUsr = dt_grid[i].inUserId; if(flag == "UPDATE" && ref == dtGridRef && reStep == dtGridPRef) uUsr = app.userName;
//                            ddIdInput.val(dt_grid[i].inUserId);
//                            ddTimeInput.val(dt_grid[i].upDt);
//
//
//                            if(ref == dtGridRef && reStep == dtGridPRef && (flag == "RESAVE" || flag == "UPDATE" || flag == "VIEW")
//                            ){
//                                var ddIdTextArea = $('<textarea id="blogContent_'+dtGridRef+'_'+dtGridPRef+'" class="reContInput col-xs-w100" style="display:block; height:100%;" />');
//                                ddIdTextArea.keydown(function(el){
//                                    if(el.keyCode == 13){
//                                        ddContentDiv.css('height', (12+el.target.scrollHeight)+"px");
//                                    }
//
//                                });
//                            }else{
//                                var ddIdTextArea = $('<pre id="blogContent_'+dtGridRef+'_'+dtGridPRef+'" class="reContContent col-xs-w100" style="height:auto;"/>');
//                                ddIdTextArea.text(dt_grid[i].content);
//                            }
//                            if(dt_grid[i].delYn == 'Y') {
//                                ddIdTextArea.text('삭제된 댓글 입니다.');
//                            }
//
//                            ddImgDiv.append(ddImgInput);
//                            ddIdDiv.append(ddIdInput).append(ddTimeInput);
//                            ddContentDiv.append(ddIdTextArea);
//
//                            /*******************************************
//                            * 버튼그룹
//                            ********************************************/
//                            var ddBtnDiv = $('<div class="col-xs-w100" style="height:5px;" />');
//
//                            /*******************************************
//                            * 버튼 유효성
//                            ********************************************/
//                            if(app.userEmail != "" && dt_grid[i].delYn == 'N') {
//                                //일반
//                                if(flag == 'VIEW'){
//                                    if(dtGridPRef == 0) getViewReContentBtnReAdd(ddIdDiv, dtGridRef, dtGridPRef); //댓글달기
//                                }
//                                //사용자확인
//                                if(app.userEmail == dt_grid[i].upUserEmail){
//                                    if(flag == 'VIEW'){
//                                        if(!reAddFlag) getViewReContentBtnUpdate(ddIdDiv, dtGridRef, dtGridPRef); //수정 전환
//                                        getViewReContentBtnDelete(ddIdDiv, dtGridRef, dtGridPRef); //삭제
//                                    }
//
//                                }
//                                if(dtGridRef == 0 && dtGridPRef == reStep){
//                                    getViewReContentBtnReSave(ddIdDiv, dtGridRef, dtGridPRef); //level1 댓글 저장
//                                }
//                                if(flag == "UPDATE" && ref == dtGridRef && reStep == dtGridPRef){
//                                    //저장
//                                    getViewReContentBtnUpdateSave(ddIdDiv, dtGridRef, dtGridPRef); //수정 저장
//                                }
//
//                            }
//
//                            /*******************************************
//                            * 사용자그룹, 버튼그룹 합치기
//                            ********************************************/
//                            ddDiv.append(ddContentDiv).append(ddImgDiv).append(ddIdDiv).append(ddBtnDiv);
//
//                        /*******************************************
//                        * 댓글쓰기 시 필요함수
//                        ********************************************/
//                        if(ref == 0 && reStep == dtGridRef && flag == "READD" && !reAddFlag){
//                            i--;
//                            flag = "VIEW";
//                            reAddFlag = true;
//                        }else if(dtGridPRef != 0){
//                            dd.append(ddTextRe);
//                            ddDiv.removeClass('col-xs-w90');
//                            ddDiv.addClass('col-xs-w85');
//                            if(reAddFlag) {
//                                flag = "READD";
//                                reAddFlag = false;
//                            }
//                        }
//                        dd.append(ddDiv);
//                        reBody.append(dd);
//                    }
//
//
//            }
//
//
//        });
//        getViewInsert(reBody);
//    }
//
//    //댓글 - 글쓰기
//    function getViewInsert(el, dtGridRef, dtGridPRef){
//        /*******************************************
//        * ref -1 : 댓글쓰기 폼.
//        ********************************************/
//        var dd = $('<div class="col-xs-w100 m-t-20"  style="min-height:155px;"  />');
//        //if(i == -1) dd.css({"border-bottom" : "0.5px solid gray","margin": "5px 0px"});
//
//
//        var ddDiv = $('<div class="col-xs-w90" style="float:right;" />');
//
//        var ddImgDiv = $('<div style="position: absolute; width:25px; height:25px; left:-30px; bottom:0px;"></div>');
//            var ddImgInput = $('<img src="'+app.userPicture+'" style="width:25px; height: 25px; border-radius:50%; ">');
//
//        //이름영역
//        var ddIdDiv = $('<div class="input-group  col-xs-w100  col-sm-w50 " style="min-height:25px;"/>');
//            var ddIdSpan = $('<span class="input-group-text reContLabel" >이름</span>');
//            var ddIdInput = $('<input class="form-control reContInput" id="blogName_0_0" type="type" value="" readonly />');
//        var ddTimeDiv = $('<div class="input-group  col-xs-w100  col-sm-w50 " style="min-height:25px;"/>');
//            var ddTimeSpan = $('<span class="input-group-text reContLabel" >시간</span>');
//            var ddTimeInput = $('<input class="form-control reContInput" type="type" value="" readonly />');
//
//        //컨텐츠영역
//        var ddContentDiv = $('<div class="col-xs-w100 reContInput" style="min-height:35px;" />');
//        //신규글쓰기
//        var ddIdTextArea = $('<textarea id="blogContent_0_0" class="reContInput col-xs-w100" style="min-height:50px; border:0px;" readonly />');
//        ddIdTextArea.keydown(function(el){
//            resize(el);
//        });
//
//        if(app.userEmail != "") {
//            ddIdTextArea.attr('readonly', false);
//            ddIdInput.val(app.userName);
//        }else{
//            ddIdTextArea.text('로그인 후 이용해 주세요. 소통과 알림을 위해 로그인을 권장하고있습니다.');
//        }
//
//        ddImgDiv.append(ddImgInput);
//        ddIdDiv.append(ddIdSpan).append(ddIdInput)
//        //ddTimeDiv.append(ddTimeSpan).append(ddTimeInput);
//        ddContentDiv.append(ddIdTextArea);
//
//        /*******************************************
//        * 버튼그룹
//        ********************************************/
//        var ddBtnDiv = $('<div class="col-xs-w100" style="height:33px;" />');
//        if(app.userEmail != "") getViewReContentBtnSave(ddBtnDiv, 0, 0); //댓글달기
//
//        /*******************************************
//        * 사용자그룹, 버튼그룹 합치기
//        ********************************************/
//        ddDiv.append(ddContentDiv).append(ddImgDiv).append(ddIdDiv).append(ddTimeDiv).append(ddBtnDiv);
//        dd.append(ddDiv);
//        el.append(dd);
//    }
//
//    //댓글 - 댓글달기
//    function getViewReContentBtnReAdd(el, dtGridRef, dtGridPRef){
//        //대댓글달기
//        var ddBtnReAdd = $('<a class="btn reContBtn" id="blogReAddBtn_'+dtGridRef+'_'+dtGridPRef+' "  />');
//        var ddBtnReAddI = $('<i class="fa fa-2x fa-reply"></i>');
//        ddBtnReAdd.append(ddBtnReAddI);
//        ddBtnReAdd.click(function(){
//            var el = $(this);
//            var split = el.attr("id").split("_");
//
//            fnReContent('READD', 0, parseInt(split[1]));
//        });
//
//        el.append(ddBtnReAdd)
//    }
//
//    //댓글 - 수정전환
//    function getViewReContentBtnUpdate(el, dtGridRef, dtGridPRef){
//        var ddBtnUpdate = $('<a class="btn reContBtn" id="blogReContentPlace_'+dtGridRef+'_'+dtGridPRef+' " />');
//        var ddBtnUpdateI = $('<i class="fa fa-2x fa-redo"></i>');
//        ddBtnUpdate.append(ddBtnUpdateI);
//        ddBtnUpdate.click(function(){
//
//            var el = $(this);
//            var split = el.attr("id").split("_");
//            fnReContent('UPDATE', split[1], split[2]);
//        })
//        el.append(ddBtnUpdate);
//    }
//
//    //댓글 - 댓글저장
//    function getViewReContentBtnSave(el, dtGridRef, dtGridPRef){
//        var ddBtnSave = $('<a class="btn reContBtn" id="blogReSaveBtn_'+dtGridRef+'_'+dtGridPRef+' " style="border-radius:50%; background:yellow;" />');
//        var ddBtnSaveI = $('<i class="fa fa-2x fa-arrow-up"></i>');
//        ddBtnSave.append(ddBtnSaveI);
//        //ddBtnSave.text('저장');
//        ddBtnSave.click(function(){
//
//            var el = $(this);
//            var split = el.attr("id").split("_");
//
//            var idx = selectRowData.idx;
//
//            var content = $('#blogContent_'+split[1]+'_'+split[2]).val();
//            if(content == ''){
//                alert('내용을 입력해주세요');
//                return false;
//            }
//
//            var data = {
//                 idx	    : parseInt(idx),
//                 ref	    : parseInt(split[1]),
//                 pRef       : parseInt(split[2]),
//                 content	: content,
//                 flag	    : 'INSERT'
//            }
//
//            $.ajax({
//                url		: "/b/blog/saveRe",
//                type	: "POST",
//                data	: JSON.stringify(data),
//                contentType : "application/json; charset=utf-8",
//                success : function(){
//                    alert("저장 되었습니다.");
//                    fnReContent('VIEW');
//                },
//                error : function(){
//                    console.log(data);
//                }
//            });
//        })
//
//        el.append(ddBtnSave);
//    }
//
//    //댓글 - 수정전환->저장
//    function getViewReContentBtnUpdateSave(el, dtGridRef, dtGridPRef){
//
//        var ddBtnUpdateSave = $('<a class="btn reContBtn" id="blogReUpdateBtn_'+dtGridRef+'_'+dtGridPRef+' " />');
//        var ddBtnSaveI = $('<i class="fa fa-2x fa-arrow-up"></i>');
//        ddBtnUpdateSave.append(ddBtnSaveI);
//        ddBtnUpdateSave.click(function(){
//
//            var el = $(this);
//            var split = el.attr("id").split("_");
//
//            var idx = parseInt(selectRowData.idx);
//            var content = $('#blogContent_'+split[1]+'_'+split[2]).val();
//            if(content == ''){
//                alert('내용을 입력해주세요');
//                return false;
//            }
//
//            var data = {
//                 idx	    : idx,
//                 ref	    : parseInt(split[1]),
//                 pRef       : parseInt(split[2]),
//                 content	: content,
//                 flag	    : 'UPDATE'
//            }
//
//            $.ajax({
//                url		: "/b/blog/saveRe",
//                type	: "POST",
//                data	: JSON.stringify(data),
//                contentType : "application/json; charset=utf-8",
//                success : function(){
//                    alert("저장 되었습니다.");
//                    fnReContent('VIEW');
//                },
//                error : function(){
//                    console.log(data);
//                }
//            });
//        })
//
//        el.append(ddBtnUpdateSave);
//    }
//
//    //댓글 - 대댓글 저장
//    function getViewReContentBtnReSave(el, dtGridRef, dtGridPRef){
//
//        var ddBtnReSave = $('<a class="btn reContBtn" id="blogReReSaveBtn_'+dtGridRef+'_'+dtGridPRef+' " />');
//        var ddBtnSaveI = $('<i class="fa fa-2x fa-arrow-up"></i>');
//        ddBtnReSave.append(ddBtnSaveI);
//        ddBtnReSave.click(function(){
//
//            var el = $(this);
//            var split = el.attr("id").split("_");
//
//            var idx = parseInt(selectRowData.idx);
//            var content = $('#blogContent_'+split[1]+'_'+split[2]).val();
//            if(content == ''){
//                alert('내용을 입력해주세요');
//                return false;
//            }
//
//            var data = {
//                 idx	    : idx,
//                 ref	    : parseInt(split[1]),
//                 pRef       : parseInt(split[2]),
//                 content	: content,
//                 flag	    : 'INSERT_RE'
//            }
//
//            $.ajax({
//                url		: "/b/blog/saveRe",
//                type	: "POST",
//                data	: JSON.stringify(data),
//                contentType : "application/json; charset=utf-8",
//                success : function(){
//                    alert("저장 되었습니다.");
//                    fnReContent('VIEW');
//                },
//                error : function(){
//                    console.log(data);
//                }
//            });
//        })
//
//        el.append(ddBtnReSave);
//    }
//
//    //댓글 - 삭제
//    function getViewReContentBtnDelete(el, dtGridRef, dtGridPRef){
//       var ddBtnDelete = $('<a class="btn reContBtn" id="blogReDelBtn_'+dtGridRef+'_'+dtGridPRef+' " style="color:red;" />');
//       var ddBtnDeleteI = $('<i class="fa fa-2x fa-trash-alt"></i>');
//       ddBtnDelete.append(ddBtnDeleteI);
//       ddBtnDelete.click(function(){
//
//            var el = $(this);
//            var split = el.attr("id").split("_");
//
//            var idx = parseInt(selectRowData.idx);
//            var content = $('#blogContent_'+split[1]+'_'+split[2]).val();
//
//            var data = {
//                 idx	    : idx,
//                 ref	    : parseInt(split[1])
//            }
//
//            $.ajax({
//                url		: "/b/blog/deleteRe",
//                type	: "DELETE",
//                data	: JSON.stringify(data),
//                contentType : "application/json; charset=utf-8",
//                success : function(){
//                    alert("삭제 되었습니다.");
//                    fnReContent('VIEW');
//                },
//                error : function(){
//                    console.log(data);
//                }
//            });
//        })
//        el.append(ddBtnDelete);
//    }
//
//
//    function getBase64(file, callback) {
//       var reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = function () {
//         console.log(reader.result);
//         textCopy(reader.result);
//         //return reader.result;
//       };
//       reader.onerror = function (error) {
//         console.log('Error: ', error);
//       };
//    }
//
//    function textCopy(text) {
//      var tempElem = document.createElement('textarea');
//      tempElem.value = text;
//      document.body.appendChild(tempElem);
//
//      tempElem.select();
//      tempElem.setSelectionRange(0, 9999);
//      document.execCommand("copy");
//      document.body.removeChild(tempElem);
//    }
//    /******************************************************
//    * 글 상자 자동조절 높이
//    *******************************************************/
//    function resize(obj) {
//  	  obj.currentTarget.style.height = "50px";
//  	  obj.currentTarget.style.height = (12+obj.target.scrollHeight)+"px";
//  	}
};

blogsJs.init();
