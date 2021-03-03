/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 권한 관리[SystemAuthApp]
 * Program Code     : PC0007
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var SystemAuthApp = function () {
	"use strict";

	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/

	// [El]권한 트리 그리드
	var $systemAuthGrid = $("#systemAuthGrid");
	var headerCheckBoxFlag = true;

    return {
        init: function () {

        	//권한 그룹명 SelectBox
        	fnListAuthGroupSelectBox();
        	//권한 Event
        	fnAuthEvents();
	    },
	    initPopup: function () {
	    	//권한 등록수정 POPUP창 Event
	    	fnSavePopupEvent();
	    }
    };

    //[Fn] 이벤트
    function fnAuthEvents(){

    	//사용자 검색 버튼
    	$("#systemAuthUserSearchBtn").click(function(){
    		var value = $("#authUserSearchWords").val();
			fnListAuthSearchUser($.trim(value));
    	});
    	//사용자 검색 엔터키
    	$("#authUserSearchWords").enterEvent({
    		callBack:function(value){
				fnListAuthSearchUser($.trim(value));
			}
    	})
    	//권한그룹 SelectBox
    	$("#systemAuthGroupCombo").change(function(){
    		$("#authGroupSeq").val($(this).val());
    		fnListAuthGroupSelectBox($(this).val());
    		$("#authUserLeft").html("");
    	});
    	//저장버튼
    	$("#systemAuthSaveRowBtn").click(function(){
    		fnAuthSave();
    	});
    	//검색된 모든 사용자 추가
    	$("#authAddUserAll").click(function(){
    		$( "#authUserLeft option" ).each(function() {
    			$("#authUserRight").append($(this));
    	    });
    	});
    	//등록된 모든 사용자 제거
    	$("#authRemoveUserAll").click(function(){
    		$( "#authUserRight option" ).each(function() {
    			$("#authUserLeft").append($(this));
    	    });
    	});
    	//선택된 사용자 추가
    	$("#authAddUserSelected").click(function(){
    		$( "#authUserLeft option:selected" ).each(function() {
    			$("#authUserRight").append($(this));
    		});
    	});
    	//선택된 사용자 제거
    	$("#authRemoveUserSelected").click(function(){
    		$( "#authUserRight option:selected" ).each(function() {
    			$("#authUserLeft").append($(this));
    		});
    	});
    	// 권한 그룹 수정버튼(POPUP)
    	$("#systemAuthGroupModBtn").click(function(){
    		PopApp.paragonOpenPopup({
        		ajaxUrl: '/ctrl/settings/system/auth/savePopup',
        		id: 'authGroupSave',
        		width: '700px',
        		btnName:"저장",
        		title :"권한그룹 수정",
        		onload:function(rtnPopup){
        			var authGroupSeq= $("#systemAuthGroupCombo option:selected").val();
        			fnGetAuthGroupView(authGroupSeq, rtnPopup);
        			SystemAuthApp.initPopup();
        		}

    		});
    	});
    	// POPUP 권한 그룹 등록버튼
    	$("#systemAuthGroupAddBtn").click(function(){
    		var pop = PopApp.paragonOpenPopup({
	    		ajaxUrl: '/ctrl/settings/system/auth/savePopup',
	    		id: 'authGroupSave',
	    		width: '700px',
	    		btnName:"저장",
	    		visible: true, //기본값 false :바로 활성화  TODO 사용설명서 명시해야함
	    		title :"권한그룹 등록",
	    		onload:function(){
	    			//POPUP창 이벤트 실행
	    			SystemAuthApp.initPopup();
	    			$("#authGroupSeq").val("");
					$("#authGroupModFlag").val("INSERT");
	    		}
    		});
    	});

    }

	//[Fn] 해당 권한의 사용자 조회
    function fnListAuthUser(sendData){
    	$("#authUserRight").html("");
    	$.ajax({
    		url : "/ctrl/settings/system/auth/listAuthUser",
    		data :JSON.stringify(sendData),
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			for (var i = 0; i < result.length; i++) {
    				var userNo 	 	= result[i].USER_NO;
    				var userNm		= result[i].USER_NM;
    				var userRoleNm 	= result[i].USER_ROLE_NM;
    				var userPositionNm 	= result[i].USER_POSITION_NM;
    				console.log(userPositionNm);
    				userPositionNm = userPositionNm == null ? "":userPositionNm;
    				var userId		= result[i].USER_ID;

    				var option = $("<option>", {value: userNo});
    				var thisName = userNo+' '+userNm+' - '+userPositionNm+'['+userId+']';
    	    		option.text(thisName)
    	    		$("#authUserRight").append(option);

				}
    		}
    	});
    }
    //[Fn] 사용자 검색
    function fnListAuthSearchUser(searchWord){

    	var searchWordArr = [];
		// 사용자 검색시 스페이스바(공백)기준으로 잘라서 Like 검색(주소검색같은 기능)
		if(searchWord != ""){
			searchWordArr= searchWord.split( ' ' );
		}
    	// 사용자 검색 초기화
    	$("#authUserLeft").html("");
    	$.ajax({
    		url : "/ctrl/settings/system/auth/listAuthSearchUser",
    		data :JSON.stringify({searchWordArr : searchWordArr}),
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		success : function(result) {
    			for (var i = 0; i < result.length; i++) {
    				var userNo 	 	= result[i].USER_NO;
    				var userNm		= result[i].USER_NM;
    				var userRoleNm 	= result[i].USER_ROLE_NM;
    				var userId		= result[i].USER_ID;
    				var userPosition 	= result[i].USER_POSITION_NM;


    				var option = $("<option>", {value: userNo});
    				var thisName = userNo+' '+userNm+' - '+userPosition+'['+userId+']';
    				option.text(thisName)
    				$("#authUserLeft").append(option);

    			}
    		}
    	});
    }

	//[Fn] 권한그룹 SelectBox 생성
    function fnListAuthGroupSelectBox(authGroupSeq){
    	$.ajax({
    		url 		: "/ctrl/settings/system/auth/listAuthGroup",
    		type 		: "POST",
    		dataType 	: "json",
    		cache		: false,
    		success 	: function(result) {
    	    	var select =$("#systemAuthGroupCombo");
    	    	select.html('');
    	    	for (var i = 0; i < result.length; i++) {
    	    		var thisValue = result[i].AUTH_GROUP_SEQ
    	    		var thisName = result[i].AUTH_GROUP_NM;
    	    		var option = $("<option>", {value: thisValue});
    	    		option.text(thisName)
    	    		select.append(option);
    			}
    	    	//마지막 SelectBox 선택
    	    	if(authGroupSeq == "last"){
    	    		var selectSeq = $("#systemAuthGroupCombo option:last").val();
    	    		$("#systemAuthGroupCombo").val(selectSeq);

    	    		//선택된 SelectBox의 Grid 조회
    	    		$systemAuthGrid.paragonGridSearch({"authGroupSeq":selectSeq});
    	    		//선택된 SelectBox의 권한 사용자 조회
    	    		fnListAuthUser({"authGroupSeq":selectSeq});

	    		//지정한 SelectBox 선택
    	    	}else if(authGroupSeq != "" && authGroupSeq != undefined){
    	    		$("#systemAuthGroupCombo").val(authGroupSeq);

    	    		//선택된 SelectBox의 Grid 조회
    	    		$systemAuthGrid.paragonGridSearch({"authGroupSeq":authGroupSeq});
    	    		//선택된 SelectBox의 권한 사용자 조회
    	    		fnListAuthUser({"authGroupSeq":authGroupSeq});

	    		//첫번째 SelectBox 선택
    	    	}else{
    	    		var selectSeq = $("#systemAuthGroupCombo option").eq(0).val();
    	    		if($systemAuthGrid.html() == ""){
    	    			//grid 미생성시 생성
    	    			fnListAuth(selectSeq);
    	    		}else{
    	    			//선택된 SelectBox의 Grid 조회
    	    			$systemAuthGrid.paragonGridSearch({"authGroupSeq":selectSeq});
    	    		}
    	    		//선택된 SelectBox의 권한 사용자 조회
    	    		fnListAuthUser({"authGroupSeq":selectSeq});
    	    	}
    		}
    	});
    }

    /********************************************************************
     * 권한관리 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0003
     * 설명    : 동적 Header로 인하여 componentUrl로 customModel을 사용함
     * 			 customModel + Server에서 생성한 모델(동적 Header)
     * 작성자  : Kim J. H
     * 수정내역:
     ********************************************************************/
    function fnListAuth(authGroupSeq){
		$systemAuthGrid.paragonGrid({
        	url				: '/ctrl/settings/system/auth/listMenuAuth',
        	componentUrl	: '/ctrl/settings/system/auth/listAuthColumns',
			countable		:false,
			pageable		:false,
			sortable		:false,
			postData		:{"authGroupSeq":authGroupSeq},
			customModel		:[
			    {name:'MENU_SEQ',			align:"center",	hidden:true,	key:true},
			    {name:"MENU_PARENT_SEQ",	align:"center",	hidden:true		},
			    {name:"AUTH_CD",			align:"center",	hidden:true		},
			    {name:"AUTH_GROUP_SEQ",		align:"center",	hidden:true		},
			    {name:'MENU_NM',			align:"left"	},
			    {name:'PRO_CD',				align:"center"	}
            ],
            customMode 		: "checkbox", //
//            gridResize 		: null,		//[TODO 테트트 필요함]
            height			: "366",			//[TODO 테트트 필요함] 그리드 사이즈 조정 불가
//            caption			: "권한 메뉴 목록",
            domainId		: 'AUTH_LIST',
			treeGrid		: true,
			ExpandColumn	: "MENU_NM",
			treedatatype	: "json",
			treeGridModel	: "adjacency",
			treeReader		: {
				parent_id_field	: "MENU_PARENT_SEQ",
				level_field		: "LEVEL",
				leaf_field		: "ISLEAF",
				expanded_field	: "expanded",
				loaded			: "loaded"
			},
			// 컴럼의 체크박스 생성
            gridComplete: function(){
            	// headerCheckBoxFlag 컬럼의 전체 선텍 체크박스를 한번만 생성하기위한 Flag
            	if(headerCheckBoxFlag){
            		// 컬럼명을 배열형태로 가져온다.
            		var colModel = $systemAuthGrid.jqGrid('getGridParam', 'colModel');
        			for (var i = 6; i < colModel.length; i++) {

        				var colId = colModel[i]['name'];
        				if(colModel[i]['hidden'] === false){

        					//컬럼의 <th> 가져온다 (colId를 그룹코드로 사용)
        					var header = $("#systemAuthGrid_"+colId);
        					var checkbox = $("<input type='checkbox' />");
        					checkbox.data("auth-cd",colId);
        					checkbox.addClass("auth-check-all");

        					header.append(checkbox);

        					// 해더 체크 Event 등록
        					checkbox.change(function(){
        						var groupId = $(this).data("auth-cd");
        						if($(this).is(":checked")){
        							$("[aria-describedby='systemAuthGrid_"+groupId+"']").find("input[type='checkbox']").prop("checked",true);
        						}else{
        							$("[aria-describedby='systemAuthGrid_"+groupId+"']").find("input[type='checkbox']").prop("checked",false);
        						}
        					});


        				}
        			}
        			headerCheckBoxFlag = false;
            	}else{
            		//그리드 리로드시 전체 체크박스 해제
            		$(".auth-check-all").prop("checked",false);
            	}
            }

        });

	}

    //[Fn] POPUP Event
    function fnSavePopupEvent(){

    	//그룹저장버튼
    	$("#authGroupSaveBtn").click(function(){
    		fnSaveAuthGroup();
	    });
    	//그룹삭제버튼
     	$("#authGroupDelBtn").click(function(){
     		if(confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)){ //삭제하시겠습니까?
     			$("#authGroupModFlag").val("DELETE");
     			fnSaveAuthGroup();
     		}
     	});
    }
    //[Fn] POPUP 창 Open[등록/수정]
    function fnGetAuthGroupView(authGroupSeq, rtnPopup){
    	$.ajax({
			 url : "/ctrl/settings/system/auth/viewAuthGroup",
			 data : {"authGroupSeq" : authGroupSeq},
			 success : function(result) {
				 //권한그룹명
				 $("#authGroupNm").val(result.AUTH_GROUP_NM);
				 //권한그룹 설명
				 $("#authGroupDesc").val(result.AUTH_GROUP_DESC);
				 //그룹코드
				 $("#authGroupSeq").val(authGroupSeq);
				 //수정모드 Flag
				 $("#authGroupModFlag").val("UPDATE");
				 rtnPopup.show();
			 }
		 });
    }


    //[Fn] POPUP 저장(등록/수정/삭제)
    function fnSaveAuthGroup() {
    	// 등록/수정/삭제Flag
    	var modFlag		  = $("#authGroupModFlag").val();
    	// 권한그룹명
    	var authGroupNm   = $("#authGroupNm").val()		;
    	// 권한그룹 설명
    	var authGroupDesc = $("#authGroupDesc").val()	;
    	// 권한그룹 코드
    	var authGroupSeq  = $("#authGroupSeq").val()	;

    	if($.trim(authGroupNm).length == 0){
    	    Util.alert('MSG_SYS_ERR_007'); //권한그룹명을 입력해주세요.
    		$("#authGroupNm").focus();
    		return;
    	}

    	var sendData = {
    			"modFlag"		: modFlag 		,
    			"authGroupSeq"	: authGroupSeq 	,
    			"authGroupNm"	: authGroupNm 	,
    			"authGroupDesc"	: authGroupDesc
    	};

		$.ajax({
			url : "/ctrl/settings/system/auth/saveAuthGroup",
    		data : sendData,
    		success : function(result) {
    			if(modFlag == "DELETE"){
    				//권한그룹을 삭제할경우 첫번째 SelectBox 선택
    				fnListAuthGroupSelectBox("first");
    			}else if(modFlag == "INSERT"){
    				//권한그룹을 등록할경우 마지막 SelectBox 선택
    				fnListAuthGroupSelectBox("last");
    			}else if(modFlag == "UPDATE"){
    				//권한그룹을 수정할경우 수정한 SelectBox 선택
    				fnListAuthGroupSelectBox(authGroupSeq);
    			}
    			$("#authGroupSave").remove();
    			alert(result.msgTxt);
    		}
    	});
    }

    //[Fn] 권한 내용저장
    function fnAuthSave(){
    	App.prcsStart();
    	// grid의 데이터 포멧 생성
    	// 동적 해더값으로 인하여
    	// 모델에서 키값을 추출하여 데이터 포멧 형태로 만든다
    	var formatData = {};
    	var colModel = $systemAuthGrid.jqGrid('getGridParam', 'colModel');
		for (var i = 0; i < colModel.length; i++) {
			var colId = colModel[i]['name'];
			//str.strCamel() : MENU_NM > menuName
			formatData[colId.strCamel()] = colId;
		}
		// tree그리드 생성에 사용된 불필요한 데이터는 삭제처리
		delete formatData["menuName"];
		delete formatData["level"];
		delete formatData["isleaf"];
		delete formatData["expanded"];
		delete formatData["loaded"];
		delete formatData["icon"];

		// 선택된 사용자 저장
		var userArr = [];
		$( "#authUserRight option" ).each(function() {
			userArr.push({
				userNo : $(this).val(),
				authGroupSeq: authGroupSeq
			});
		});
		//authGroupSeq가빈값이 존재하기때문에 선택된 SelectBox의 authGroupSeq 를 보내준다
		var authGroupSeq= $("#systemAuthGroupCombo option:selected").val();
		var sendData = {
				dt_userauth: userArr,
				authGroupSeq: authGroupSeq,
		};

		/* * $systemAuthGrid.getJsonParamsData("dt_menuauth",formatData, sendData); (return json)
		 * * grid에서 formatData에 정의된 데이터를 sendData에 dt_menuauth이름으로 포함한다
		 *
		 * (생성예시)
		 * sendData = {
		 * 		authGroupSeq: 12,
		 * 		dt_userauth :[
		 * 						{
		 * 							authGroupSeq : 12 ,
		 * 							userNo 		 : 140804001
		 * 						}, ......
		 * 					 ],
		 * 		dt_menuauth :[
		 * 						{
		 * 							authGroupSeq : 12 ,
		 * 							menuCd 		 : 2 ,
		 * 							authView 	 : Y ,
		 * 							authNew  	 : Y ,
		 * 							authMod  	 : Y ,
		 * 							authDel  	 : Y ......
		 * 						}, ......
		 * 					 ],
		 * };
		 */
    	var jsonData = $systemAuthGrid.getJsonParamsData("dt_menuauth",formatData, sendData);
//    	App.prcsStart();

    	/**
    	 * 즐겨찾기 유효성검사
    	 * */
    	var favoriteCheck = 0;
    	var favoriteFlag = 6;
    	var dt_menuauth = sendData.dt_menuauth;
    	for(var i in sendData.dt_menuauth){
    		if(dt_menuauth[i].authFavorite == 'Y'){
    			favoriteCheck++;
    		}
    		if(favoriteCheck > favoriteFlag){
    			break;
    		}
    	}
    	if(favoriteCheck > favoriteFlag){
    		Util.alert('MSG_COM_VAL_113', favoriteFlag); //즐겨찾기 권한은 {0} 개를 초과하실 수 없습니다.
    		return false;
    	}
    	App.prcsStart();
		$.ajax({
    		url 		: "/ctrl/settings/system/auth/saveMenuAuth",
    		data 		: jsonData,
    		type 		: "POST",
    		dataType 	: "json",
    		contentType	: 'application/json; charset=utf-8',
    		cache		: false,
    		success 	: function(result) {
//    			App.prcsEnd();
    			alert(result.msgTxt);
    			$systemAuthGrid.trigger("reloadGrid");
    		}
    	});
    }

}();

$(document).ready(function() {
	SystemAuthApp.init();
});
