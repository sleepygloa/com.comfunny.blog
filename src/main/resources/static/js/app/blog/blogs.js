
var blogsJs = function(){


	return {
		init : function(){

            //css
            $('#blogRe').css('background-color', '#E8F2FF');
//            leftMenu(7);
//
//			fnEvents();
//
//			blogJs.fnList();
            $('[id^="idx_"]').on('click', function(){

                var id = $(this).attr("id");
                var idx = id.split('idx_')[1];
                getContent(idx);
            })
            var idx = $('#blogIdx').val();
            if(idx != '') getContent(idx);

		}
    }

	function fnEvents(){
    	//조회
    	$('#blogSearchBtn').click(function(){
    		fnSearch();
    		flag = "";
    	});

    	//추가
    	$("#blogAddBtn").click(function(){
    		fnMarkdown('INSERT');
    		flag = "INSERT";
    	});

    	//수정
    	$("#blogUpdateBtn").click(function(){
    		fnMarkdown('UPDATE');
    		flag = "UPDATE";
    	});

    	//저장버튼
    	$("#blogSaveBtn").click(function(){
    		fnSave();
    	});
    	//행삭제버튼
    	$("#blogDelBtn").click(function(){
    		fnDel();
    	});

        //이미지 변환
        $("#blogImgBtn").click(function(){
            var fileUpload = $('<input type="file" class="form-control" id="blogFileUpload" aria-describedby="blogFileUploadAddon" aria-label="Upload" >');
            fileUpload.trigger('click', function(){

            });
            fileUpload.on('change', function(){
                getBase64($(this)[0].files[0]);
            });
        });
	}


    function getContent(idx){
        $.ajax({
            type : 'GET',
            url : '/blogs/content/'+idx,
            contentType : 'application/json; charset=utf-8'
        }).done(function(data){
            console.log(data);

            //element 세팅
            $('#blogViewMarkdown').css('display', 'block');
            $('#blogUpdateMarkdown').css('display', 'none');
            $('#blogTitle').attr('readonly', true);
            $('#blogUpdateBtn').css('display', 'block');
            $('#blogDelBtn').css('display', 'none');
            $('#blogSaveBtn').css('display', 'none');

            //form 세팅
            $('#blogIdx').val(data.idx);
            $('#blogTitle').val(data.title);
            viewer.setMarkdown(data.markdownContent);

            fnReContent('VIEW');


        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    }
    function getContentUpdate(){
        var idx = $('#blogIdx').val();

        //element 세팅
        $('#blogViewMarkdown').css('display', 'none');
        $('#blogUpdateMarkdown').css('display', 'block');
        $('#blogTitle').attr('readonly', false);
        $('#blogUpdateBtn').css('display', 'none');
        $('#blogDelBtn').css('display', 'block');
        $('#blogSaveBtn').css('display', 'block');

        //form 세팅
        $('#blogIdx').val('');
        $('#blogTitle').val('');
        editor.setMarkdown('');

        if(idx > 0){
            $.ajax({
                type : 'GET',
                url : '/blogs/content/'+idx,
                contentType : 'application/json; charset=utf-8'
            }).done(function(data){

                //element 세팅
                $('#blogViewMarkdown').css('display', 'none');
                $('#blogUpdateMarkdown').css('display', 'block');
                $('#blogTitle').attr('readonly', false);
                $('#blogUpdateBtn').css('display', 'none');
                $('#blogDelBtn').css('display', 'block');
                $('#blogSaveBtn').css('display', 'block');

                //form 세팅
                $('#blogIdx').val(data.idx);
                $('#blogTitle').val(data.title);
                editor.setMarkdown(data.markdownContent);



            }).fail(function(error){
                alert(JSON.stringify(error));
            });


        }

    }

    function save(){
        var idx = $('#blogIdx').val();

        var data = {
            title : $('#blogTitle').val(),
            markdownContent : editor.getMarkdown(),
        }

        var type = 'POST';
        var url = '/blogs/content/';
        if(idx > 0) {
            type = 'PUT';
            url = '/blogs/content/'+idx;
        }

        $.ajax({
            type : type,
            url : url,
            dataType : 'json',
            contentType : 'application/json; charset=utf-8',
            data : JSON.stringify(data)
        }).done(function(data){
            console.log(data);

            alert('저장되었습니다');
            window.location.href='/blogs/';

        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    }




//댓글 저장
function blogReSave(ref, pRef){
    var idx = $('#blogIdx').val();

    var data = {
        idx : idx,
        pref : pRef,
        passwd : $('#blogPw_'+ref+'_'+pRef).val(),
        content : $('#blogContent_'+ref+'_'+pRef).val()


    }

    $.ajax({
        type : 'POST',
        url : '/blogs/content/re',
        dataType : 'json',
        contentType : 'application/json; charset=utf-8',
        data : JSON.stringify(data)
    }).done(function(data){

        alert('저장되었습니다');
        fnReContent('VIEW');

    }).fail(function(error){
        alert(JSON.stringify(error));
    });
}

    //댓글 리스트
    function fnReContent(flag, ref, pref){
    console.log(flag,ref, pref);
        var reBody = $('#blogRe');
        reBody.empty();

        var idx = $('#blogIdx').val();
        var reAddFlag = false;

    	$.ajax({
            type : 'GET',
            url : '/blogs/content/re/'+idx,
    		dataType    : "json",
    		async:false,
    		contentType : "application/json; charset=utf-8",
    		success     : function(result){
                //CSS
                var reContent = 0;
                var imgWidth = 10

                var dt_grid = result;

                //-1 : 댓글 신규 작성 폼.
                for(var i = 0; i < dt_grid.length; i++){
                        getViewInsert(reBody, dt_grid[i].ref, dt_grid[i].p_ref, dt_grid[i]);

                        if(dt_grid[i].ref == pref) getViewInsert(reBody, 0, pref);

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
//                                var uPic = dt_grid[i].picture; //if( (flag == "UPDATE" && ref == dtGridRef && reStep == dtGridPRef) || reAddFlag ) uPic = app.userPicture;
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
                    }


            }


        });
        getViewInsert(reBody);
    }

    //댓글 - 글쓰기
    function getViewInsert(el, ref, pref, rowData){
        var dtGridRef = ref;
        var dtGridPRef = pref;

        if(ref == undefined) dtGridRef = 0;
        if(pref == undefined) dtGridPRef = 0;
        /*******************************************
        * ref -1 : 댓글쓰기 폼.
        ********************************************/
        var dd = $('<div />');
        if(dtGridPRef != 0) dd.css('padding-left', '30px');

        //컨텐츠영역
        var ddContentDiv = $('<div class="input-group input-group-sm" />');
            //댓글리스트, 신규댓글확인
            if(dtGridRef != 0){
                var ddIdTextArea = $('<pre id="blogContent_'+dtGridRef+'_'+dtGridPRef+'" class="form-control" aria-label="With textarea" style="margin-bottom:0px;margin-left:33px;" />');
                ddIdTextArea.text(rowData.content);
                ddContentDiv.append(ddIdTextArea);
            }else{
                var ddIdTextArea = $('<textarea id="blogContent_'+dtGridRef+'_'+dtGridPRef+'" class="form-control" aria-label="With textarea" readonly style="margin-left:33px;"/>');
                //세션확인
                if(app.userEmail != "") {
                    ddIdTextArea.attr('readonly', false);
                }else{
                    ddIdTextArea.text('로그인 후 이용해 주세요. 소통과 알림을 위해 로그인을 권장하고있습니다.');
                }
                ddContentDiv.append(ddIdTextArea);
            }


    //        ddIdTextArea.keydown(function(el){
    //            resize(el);
    //        });
        var ddDiv = $('<div class="input-group input-group-sm mb-3" />');
            //이미지
            var ddImg = (dtGridRef != 0 ? rowData.picture : app.userPicture);
            var ddImgDiv = $('<button type="button" class="btn btn-outline-secondary"></button>');
            var ddImgDivImg = $('<img src="'+ddImg+'" style="width:15px; height:15px; border-radius:15px"/>');
            ddImgDiv.append(ddImgDivImg);

            //작성자
            var ddId = (dtGridRef != 0 ? rowData.up_user_id : (app.userName != '' ? '로그인해주세요' : app.userName));
            var ddIdInput = $('<input id="blogName_'+dtGridRef+'_'+dtGridPRef+'" type="text" class="form-control" aria-label="Text input with segmented dropdown button" value="" readonly>');

            //비밀번호
            var ddPw = $('<input id="blogPw_'+dtGridRef+'_'+dtGridPRef+'" type="text" class="form-control" aria-label="Text input with segmented dropdown button" placeholder="비밀번호" readonly>');

            if(dtGridRef != 0){
                ddIdInput.val(rowData.up_user_id);
            }else{
                if(app.userName != ''){
                    ddIdInput.val(app.userName);
                    ddPw.attr('readonly', false);
                }else{
                    ddIdInput.val('로그인해주세요');
                }
            }

            var ddBtnInsert = $('<button id="blogInsertBtn_'+dtGridRef+'_'+dtGridPRef+'" type="button" class="btn btn-outline-secondary" >글쓰기</button>');
            ddBtnInsert.on('click', function(){
                var el = $(this);
                var split = el.attr("id").split("_");
                blogReSave(parseInt(split[1]), parseInt(split[2]));
            });

            var ddBtnReAdd = $('<button id="blogReAddBtn_'+dtGridRef+'_'+dtGridPRef+'" type="button" class="btn btn-outline-secondary" >댓글쓰기</button>');
            ddBtnReAdd.on('click', function(){
            var el = $(this);
            var split = el.attr("id").split("_");
                fnReContent('READD', 0, parseInt(split[1]));
            });

        /*******************************************
        * 사용자그룹, 버튼그룹 합치기
        ********************************************/
        ddContentDiv.append(ddIdTextArea);
        ddDiv.append(ddImgDiv).append(ddIdInput).append(ddPw);

        //댓글달기

        if(dtGridRef != 0 && app.userName != '') ddDiv.append(ddBtnReAdd);

        //신규글쓰기
        if(dtGridRef == 0 && app.userName != '' ) ddDiv.append(ddBtnInsert);

        dd.append(ddContentDiv).append(ddDiv);
        el.append(dd);
    }
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
}();


$(document).ready(function(){
    blogsJs.init();
})