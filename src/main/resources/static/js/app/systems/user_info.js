/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 사용자정보 [UserInfoApp]
 * Program Code     : PC0028
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Han Seong Jin 	2016. 11. 16.  		First Draft.
 */
var UserInfoApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PC0028';
	var proNm = 'userInfo';

	var $userInfoGrid = $("#userInfoGrid");

	var gridUseYn;
	var gridUserPosition;
	var gridLangCd;
	var gridPrintDriver;

	// [El]사용자 그리드

	return {
        init: function () {

        	gridUseYn 			= WMSUtil.fnCombo.grid('YN');

        	gridLangCd 			= WMSUtil.fnCombo.grid('SC0013');

        	gridUserPosition 	= WMSUtil.fnCombo.grid('SC0016');

        	gridPrintDriver 	= WMSUtil.fnCombo.grid('PRINT_DRIVER');


        	//사용자 이벤트
        	fnEvents();

        	//사용자 Grid생성
        	fnList();

	    },
	    getGrid: function(){
	    	return $userInfoGrid;
	    }
    };

    //[Fn] 사용자이벤트
    function fnEvents(){
    	//검색폼 사용자아이디 엔터키 이벤트
    	$("#userInfoUserId").enterEvent({
    		callBack:function(value){
    			fnSearch();
    		}
    	})
    	//검색폼 사용자명 엔터키 이벤트
    	$("#userInfoUserName").enterEvent({
    		callBack:function(value){
    			fnSearch();
			}
    	})

    	//사용자등록 버튼
    	$("#userInfoSaveBtn").click(function(){
    		fnSave('INSERT');
    	});

    	//사용자 검색버튼
    	$("#userInfoSearchBtn").click(function(){
    		fnSearch();
    	});

        //사용자 수정
        $("#userInfoUpdateBtn").click(function(){
        	fnSave('UPDATE');
        });

    }

    //조회
    function fnSearch(){
    	$userInfoGrid.paragonGridSearch(sendData());
    }

    //데이터
    function sendData(){
    	return {
    		userId 	: $('#userInfoUserId').val(),
    		userNm	: $('#userInfoUserName').val()
    	}
    }

    //[Fn] 사용자 등록화면 modal 팝업창
    function fnSave(flag){

    	var rowData = {};

    	if(flag == 'INSERT'){

    	}else if(flag == 'UPDATE'){
        	var idx = $userInfoGrid.getGridParam('selarrrow');

            if(idx.length < 1){
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                return false;
            }

            rowData = $userInfoGrid.getRowData(idx[0]);
    	}

    	var data = {
    			"userId" : rowData.USER_ID,
    			"flag"	 : flag
    	}

    	PopApp.paragonOpenPopup({
			ajaxUrl		: '/ctrl/settings/user/info/modifyUserDetail',
 			id			: 'modifyUserInfo',
            data    	: data,
 			width		: '700px',
 			btnName		: "저장",
 			domainId	: "USER_MNG",
			onload		: function(modal){
    			modal.show();
			}
		});
    }

    //[Fn] 사용자 그리드 생성
    function fnList() {
    	$userInfoGrid.paragonGrid({
    		url 		: '/ctrl/settings/user/info/listUserInfo',
    		height 		: '596',
//rowEditable		: true,
    		shrinkToFit : false,
    		sortable 	: true,
    		multiselect	: true,
    		multiselectone : true,
    		colModel	 :[
	        	   {name:'COMPANY_CD', 	   width:"100px",	hidden:true},
	        	   {name:'USER_NO',        width:"100px",	align:"center"},
	        	   {name:'USER_ID', 	   width:"100px",	align:"center"},
	        	   {name:'USER_NM', 	   width:"200px",	align:"center"},
	        	   {name:'USER_POSITION',  width:"150px",	align:"center",
	        		   edittype:'select', formatter:'select', editoptions: { value : gridUserPosition }
	        	   },
	        	   {name:'USER_PHONE',	   width:"150px",	align:"center"},
	        	   {name:'USER_EMAIL',	   width:"150px",	align:"center"},
	        	   {name:'USE_YN',		   width:"100px",	align:"center",
	        		   edittype:'select', formatter:'select', editoptions: { value : gridUseYn }
	        	   },
	        	   {name:'USER_JOIN_DATE', width:"100px",	align:"center", 	sortable:false},
	        	   {name:'USER_LANG', 	   width:"150px",	align:"center",
	        		   edittype:'select', formatter:'select', editoptions: { value : gridLangCd }
	        	   },
	        	   {name:'PRINT_DRIVER', 	   width:"150px",	align:"center",
	        		   edittype:'select', formatter:'select', editoptions: { value : gridPrintDriver }
	        	   }
    		         ],
    		domainId 	: "USER_MNG",
    		pager		: "userInfoGridNavi",
    	})
    }

}();

$(document).ready(function() {
	UserInfoApp.init();
});
