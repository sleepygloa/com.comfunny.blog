var SystemCodeApp = function () {
	'use strict';

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PC0003';
	var proNm = 'sysCodeGroup';

	// [El]그룹코드 그리드
	var $HGrid = $('#sysCodeGroupGrid');

	// [El]공통코드 그리드
	var $DGrid = $('#sysCodeGrid');

	// [Data]그룹코드 유형 콤보박스 데이터
	var gridCodeGroupOptions;
	var gridComboYn;
	var gridComboUseYn;

    return {
        init: function () {
        	//
            gridCodeGroupOptions = WMSUtil.fnCombo.grid_selectBox('sysCodeGroupType', 'SC0001');

            WMSUtil.fnCombo.selectBox('sysCodeGroupUseYn', 'USE_YN');

            gridComboYn = WMSUtil.fnCombo.grid('YN');

            gridComboUseYn = WMSUtil.fnCombo.grid('USE_YN');

            //그룹코드 이벤트
            fnEvents();

        	//그룹코드 Grid생성
        	fnListH();


        	//공통코드 Grid생성
        	fnListD();

	    }

    };

    //[Fn] 그룹코드이벤트
    function fnEvents(){

    	//엔터이벤트
    	$('#sysCodeGroupCd').keydown(function(e){
    		if(e.keyCode == 9 || e.keyCode == 13){
    			fnHSearch();
    		}
    	})
    	$('#sysCodeGroupNm').keydown(function(e){
    		if(e.keyCode == 9 || e.keyCode == 13){
    			fnHSearch();
    		}
    	})

    	//그룹코드 저장버튼
    	$('#sysCodeGroupSaveBtn').click(function(){
    		fnHSave();
    	});
    	//그룹코드 행추가버튼
    	$('#sysCodeGroupAddBtn').click(function(){
    		$HGrid.paragonGridAddRow();
    	});
    	//그룹코드 검색버튼
    	$('#sysCodeGroupSearchBtn').click(function(){
    		fnHSearch();
    	});
    	//그룹코드 행삭제버튼
    	$('#sysCodeGroupDelBtn').click(function(){
    	    fnHDel();
    	});

    	//공통코드 저장버튼
    	$('#sysCodeSaveBtn').click(function(){
    		fnDSave();
    	});
    	//공통코드 행추가버튼
    	$('#sysCodeAddBtn').click(function(){
    		fnDAdd();
    	});
    	//공통코드 행삭제버튼
    	$('#sysCodeDelBtn').click(function(){
    	    fnDDel();
    	});

    }

    //헤더 그리드 초기화
    function fnListH() {
		$HGrid.paragonGrid({
			url          : '/system/code/list',
			height       : '208',
//			rowNum       : 15,
			rowEditable  : true,
			sortable     : true,
            cellEditable : false,
            multiselect  : true,
			colModel     : [
    		          {editable:false, name:'CODE_GROUP_SEQ',	hidden:true},
    		          {editable: true, name:'CODE_GROUP_CD', 	align:'center',required:true},
    		          {editable: true, name:'CODE_GROUP_NM', 	align:'center'},
    		          {editable: true, name:'CODE_GROUP_DESC',	width:300},
    		          {editable: true, name:'CODE_GROUP_TYPE',	align:'center',
    		        	  edittype:'select', formatter:'select', editoptions: { value:gridCodeGroupOptions, }
    		          },
    		          {editable: true, name:'SYS_YN', align:'center',
    		        	  edittype:'select', formatter:'select', editoptions: { value: gridComboYn, }
    		          },
    		          {editable: true, name:'USE_YN', align:'center',
    		        	  edittype:'select', formatter:'select', editoptions: { value: gridComboUseYn, }
    		          },
    		          {editable:false, name:'IN_USER_ID', 		align:'center'},
    		          {editable:false, name:'IN_DT', 			align:'center',sortable:false}
	          ],
//			caption  : '공통코드 그룹 목록',
	        domainId	: "COMM_CODE_GROUP_LIST",
			pager    : '#sysCodeGroupGridNavi',
			//로우 선택식 호출함수 [연속 호출 안함]
			onSelectRowEvent : function(currRowData, prevRowData) {
				//로우선택시 공통코드 목록 조회
				var codeGroupCd = currRowData.CODE_GROUP_CD
				var iRow = $HGrid.getGridParam("selrow");
				if(codeGroupCd != ''){
	                $DGrid.paragonGridSearch({ 'codeGroupCd' : codeGroupCd });
				}else{
				    $DGrid.paragonGridReload();
				}
			}
		});
    }

    //공통코드 그리드 초기화
    function fnListD(){
		$DGrid.paragonGrid({
        	url            : '/system/code/listCode',
			rowEditable    : true,
			height         : '208',
            multiselect    : true,
            firstData      : false,
            rowspan        : true,
            colModel       : [
                {editable:false, name:'CODE_SEQ',		hidden:true},
                {editable:false, name:'CODE_GROUP_CD', 	align:'center', rowspan:true},
                {editable: true, name:'CODE_CD', 		align:'center', required : true},
                {editable: true, name:'CODE_NM', 		align:'center'},
                {editable: true, name:'CODE_DESC', 		align:'left'},
                {editable: true, name:'CODE_ORDER', 	align:'center',width:100},
                {editable: true, name:'CODE_OTHER1', 	align:'center',width:100},
                {editable: true, name:'CODE_OTHER2', 	align:'center',width:100},
                {editable: true, name:'CODE_OTHER3', 	align:'center',width:100},
                {editable: true, name:'CODE_OTHER4', 	align:'center',width:100},
                {editable: true, name:'CODE_OTHER5', 	align:'center',width:100},
                {editable: true, name:'USE_YN', 		align:'center', width:'100px', fixed :true,
                	edittype:'select', formatter:'select', editoptions: { value: gridComboUseYn, }
        		},
                {editable:false, name:'IN_USER_ID', 	align:'center'},
                {editable:false, name:'IN_DT', 			align:'center',sortable:false}
            ],
//            caption : '공통코드 목록',
            domainId	: "COMM_CODE_LIST",
            pager   : '#sysCodeGridNavi',
        });
	}

    //[Fn]그룹코드 수정된 내용저장
    //[Fn] Grid Save Data Row. (제품관리 flag: 1 )
    function fnHSave() {
        //저장버튼 이벤트 로직 수행.
        var saveUrl = '/system/code/saveCodeGroup';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var rowData = {
                modFlag         : 'MOD_FLAG',
                codeGroupSeq    : 'CODE_GROUP_SEQ',
                codeGroupCd     : 'CODE_GROUP_CD',
                codeGroupNm     : 'CODE_GROUP_NM',
                codeGroupDesc   : 'CODE_GROUP_DESC',
                codeGroupType   : 'CODE_GROUP_TYPE',
                sysYn           : 'SYS_YN',
                useYn           : 'USE_YN'
        };

        var jsonData = $HGrid.getSelectedJsonDataChk('list', rowData, $HGrid);
    	// 그리드에서 저장이 필요한 데이터만 가져옴
    	var jsonObj = JSON.parse(jsonData);

        //null Check
        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); // 선택된 행이 없습니다.
            return;
        }

        //Require Check
        var ids = $HGrid.getGridParam('selarrrow');
        for(var i = 0 ; i < ids.length ; i++){
            var rowFlag = $HGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != 'UPDATE' && rowFlag != 'INSERT'){
                Util.alert('MSG_COM_VAL_058', $HGrid.getRowData(ids[i]).CODE_GROUP_CD);
                return false;
            }
        }

    	//validation
        var dt = jsonObj.dt_data;
    	var valiTotalFlag = true;
    	$.each(dt, function(i){
            if(!dt[i].codeGroupCd){//그룹코드 검사
                Util.alert('MSG_SYS_ERR_002'); // 코드그룹 항목은 필수입력입니다.
                valiTotalFlag = false;
                return false;
            }
    	})

        //validation Flag Check
        if(!valiTotalFlag) return false;

        //ajax Event.
    	WMSUtil.ajax('POST', jsonData, saveUrl, msg, function(){
            $HGrid.paragonGridReload();
    	})

    }

    //[Fn] 공통코드 수정된 내용저장
    //[Fn] Grid Save Data Row. (제품관리 flag: 3 )
    function fnDSave() {

        //저장버튼 이벤트 로직 수행.
        var saveUrl = '/system/code/saveCode';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        var rowData = {
                modFlag      : 'MOD_FLAG',
                codeGroupCd  : 'CODE_GROUP_CD',
                codeSeq      : 'CODE_SEQ',
                codeCd       : 'CODE_CD',
                codeNm       : 'CODE_NM',
                codeDesc     : 'CODE_DESC',
                codeOrder    : 'CODE_ORDER',
                codeOther1   : 'CODE_OTHER1',
                codeOther2   : 'CODE_OTHER2',
                codeOther3   : 'CODE_OTHER3',
                codeOther4   : 'CODE_OTHER4',
                codeOther5   : 'CODE_OTHER5',
                useYn        : 'USE_YN'
        };

        var jsonData = $DGrid.getSelectedJsonDataChk('dt_data', rowData, $DGrid);
        // 그리드에서 저장이 필요한 데이터만 가져옴
        var jsonObj = JSON.parse(jsonData);

        //null Check
        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        //Require validation
        var dt = jsonObj.dt_data;
        var valiTotalFlag = true;
        $.each(dt, function(i){
            if(!dt[i].codeCd){//그룹코드 검사
                Util.alert('MSG_SYS_ERR_003'); //공통코드 항목은 필수입력입니다.
                valiTotalFlag = false;
                return false;
            }

            //공통코드순번 숫자만 입력
            if(!WMSUtil.validation.reg_num(dt[i].codeOrder)) {
                Util.alert('MSG_COM_VAL_038'); //숫자만 입력하실 수 있습니다.
                valiTotalFlag = false;
                return false;
            }
        });

        //validation Flag Check
        if(!valiTotalFlag) return false;

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            $DGrid.paragonGridReload();
    	})
    }

    //[Fn]그룹코드 삭제
    //[Fn] Grid Delete Data Row. (제품관리 flag: 1 )
    function fnHDel() {

        var addFlag = $HGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = '/system/code/deleteCodeGroup';
            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            var rowData = {
                modFlag: 'MOD_FLAG',
                codeGroupCd: 'CODE_GROUP_CD'
            };

            //1. 체크된 리스트.
            var jsonData = $HGrid.getJsonData('dt_data', rowData);


            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
                $HGrid.paragonGridReload();
        	})
        }
    }

    //[Fn]코드 삭제
    //[Fn] Grid Delete Data Row. (제품관리 flag: 3 )
    function fnDDel() {

        var addFlag = $DGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = '/system/code/deleteCode';
            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            var rowData = {
                modFlag : 'MOD_FLAG',
                codeSeq : 'CODE_SEQ'
            };

            //1. 체크된 리스트.
            var jsonData = $DGrid.getJsonData('dt_data', rowData);

            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
                $DGrid.paragonGridReload();
        	})
        }
    }

    //[Fn] 그룹코드 검색 조건 조회
    function fnHSearch(){
    	//그리드 수정 여부 체크
    	if(fnModCheck($HGrid)){
	    	var data = {
	    			codeGroupCd   : $('#sysCodeGroupCd').val(),
	    			codeGroupType   : $('#sysCodeGroupType').val(),
	    			codeGroupNm     : $('#sysCodeGroupNm').val(),
	    			useYn           : $('#sysCodeGroupUseYn option:selected').val()
			};
	    	//그리드 조회
    		$HGrid.paragonGridSearch(data);
    	}
    }

    //[Fn] 코드명 가져오기 자동완성
    //[Fn 공통] 그리드 수정 여부 체크
    function fnModCheck(grid){
		return grid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
	}

    //[Fn] 공통코드 행추가
    function fnDAdd() {
    	//그룹코드 선택행
    	var rowid= $HGrid.jqGrid('getGridParam','selrow');
    	//그룹코드 선택행 데이터
		var lastRowData = $HGrid.getRowData( rowid );
		//그룹코드 선택행 데이터 CODE_GROUP_CD
		var codeGroupCd = lastRowData.CODE_GROUP_CD;

		//행추가시 기본값세팅 addData,  행추가 하기전 실행 함수 :startCallBack
		$DGrid.paragonGridAddRow({
			addData : {'CODE_GROUP_CD':codeGroupCd},
    		startCallBack : function(){
    			var modFlag = lastRowData.MOD_FLAG;

    			if(rowid === null){
    			    Util.alert('MSG_SYS_VAL_001'); //코드그룹을 선택해주세요.
    				return false;
    			}else if(codeGroupCd == '' || modFlag == 'INSERT'){
    			    Util.alert('MSG_SYS_VAL_002'); //코드 그룹을 저장해주세요.
    				return false;
    			}
    			return true;
    		}
    	});

    }

    function fnListHInit(){
    	$HGrid.paragonGridReload();
    }


}();

$(document).ready(function() {
	SystemCodeApp.init();
});
