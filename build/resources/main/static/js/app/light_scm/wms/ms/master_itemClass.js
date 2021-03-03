/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 제품분류관리[MasterItemClassApp]
 * Program Code     : PWMMS108E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 20.  		First Draft.
 */
var MasterItemClassApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS108E';
	var proNm = 'msItemClass';

	// [El]프로그램 그리드
	var $msItemClassHGrid = $("#msItemClassHGrid");

	var useYnComboJson;

	var itemGbnComboJson;

	var firstLoad = true;

    return {
        init: function () {
            //
            fnListUseYnJson("USE_YN");
            //
            fnListItemGbnJson("ITEM_GBN_CD");
        	//물류센터관리 Grid생성
        	fnListItemClass();
        	//물류센터관리 Event
        	fnItemClassEvents();
	    }
    };


    //[Fn] 이벤트
    function fnItemClassEvents(){

        //코드 입력시 명 서치
        addClientCdChangeEvent("itemClient", []);          //고객사
        addClearEvent("largeClass");
        addClearEvent("middleClass");
        addClearEvent("smallClass");

    	$("#msItemClassClientCd").enterEvent({
    		callBack:function(value){
    		    fnSearch();
    		}
    	});

    	$("#msItemClassClientNm").enterEvent({
    		callBack:function(value){
    		    fnSearch();
			}
    	});
    	$("#msItemClassLargeClassCd").enterEvent({
    	    callBack:function(value){
    	        fnSearch();
    	    }
    	});

    	$("#msItemClassLargeClassNm").enterEvent({
    	    callBack:function(value){
    	        fnSearch();
    	    }
    	});
    	$("#msItemClassMiddleClassCd").enterEvent({
    	    callBack:function(value){
    	        fnSearch();
    	    }
    	});

    	$("#msItemClassMiddleClassNm").enterEvent({
    	    callBack:function(value){
    	        fnSearch();
    	    }
    	});
    	$("#msItemClassSmallClassCd").enterEvent({
    	    callBack:function(value){
    	        fnSearch();
    	    }
    	});

    	$("#msItemClassSmallClassNm").enterEvent({
    	    callBack:function(value){
    	        fnSearch();
    	    }
    	});

    	//저장버튼
    	$("#msItemClassSaveBtn").click(function(){
    	    fnSave();
    	});
    	//추가버튼
    	$("#msItemClassAddBtn").click(function(){
    	    $msItemClassHGrid.paragonGridAddRow();
    	});
    	//검색버튼
    	$("#msItemClassSearchBtn").click(function(){
    		fnSearch();
    	});
    	//삭제버튼
    	$("#msItemClassDelBtn").click(function(){
    	    fnDelete();
    	});
    	//엑셀버튼
    	$("#msItemClassExcelBtn").click(function(){
    	    $msItemClassHGrid.downloadExcel();
    	});

        $("#msItemClassClientPop").click(function(){
            WMSUtil.popup.client('msItemClassClient');
        });

        $("#msItemClassLargeClassPop").click(function(){
            WMSUtil.popup.largeClass('msItemClassLargeClass', {clientCd : $('#'+proNm+'client').val()});
        });

        $("#msItemClassMiddleClassPop").click(function(){
        	WMSUtil.popup.middleClass('msItemClassMiddleClass', {
        		clientCd 		: $('#'+proNm+'client').val(),
        		largeClassCd 	: $('#msItemClassLargeClassCd').val()
        	});
        });

        $("#msItemClassSmallClassPop").click(function(){
        	WMSUtil.popup.smallClass('msItemClassSmallClass', {
        		clientCd 		: $('#'+proNm+'client').val(),
        		largeClassCd 	: $('#msItemClassLargeClassCd').val(),
        		middleClassCd 	: $('#msItemClassMiddleClassCd').val()
        	});
        });

        $("#msItemClassClientNm").attr("disabled", true); //고객사
        $("#msItemClassLargeClassNm").attr("disabled", true); //대분류
        $("#msItemClassMiddleClassNm").attr("disabled", true); //중분류
        $("#msItemClassSmallClassNm").attr("disabled", true); //소분류

    }

    //[Fn] 사용여부 콤보박스 JSON 조회
    function fnListUseYnJson(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                useYnComboJson = Util.MakeGridOptions(result);
                Util.MakeSelectOptions($("#msItemClassUseYn"),result);
            }
        });
    }

    //[Fn] 제품분류 콤보박스 JSON 조회
    function fnListItemGbnJson(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                itemGbnComboJson = Util.MakeGridOptions(result);
            }
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
					clientCd : $("#msItemClassClientCd").val(),
					clientNm : $("#msItemClassClientNm").val(),
					itemClassCd : $("#msItemClassItemClassCd").val(),
					largeClassCd : $("#msItemClassLargeClassCd").val(),
					largeClassNm : $("#msItemClassLargeClassNm").val(),
					middleClassCd : $("#msItemClassMiddleClassCd").val(),
					middleClassNm : $("#msItemClassMiddleClassNm").val(),
					smallClassCd : $("#msItemClassSmallClassCd").val(),
					smallClassNm : $("#msItemClassSmallClassNm").val(),
					useYn : $("#msItemClassUseYn").val()
			};
	    	$msItemClassHGrid.paragonGridSearch(data);
    	}
    }

    //그리드 수정 여부 체크
    function fnModCheck(){
        return $msItemClassHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    /********************************************************************
     * itemClass 그리드 생성
     * Since   : 2017-02-20
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    //[Fn] jqgrid itemClass 목록
    function fnListItemClass(){
        $msItemClassHGrid.paragonGrid({
        	url: '/ctrl/master/itemClass/listItemClass',
			sortable: true,
			rownumbers: true,
			rowEditable:true,
            cellEditable:false,
			shrinkToFit:false,
			multiselect:true,
//			multielonly:true,
			rowClickFocus:true,
			height:'556',
            colModel:[
                {editable: true,name:'CLIENT_CD', width:"100px", align:"center", disabled:true, required:true,
                    editoptions : { maxlength:20, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) }
                    }
                },
                {editable: false,name:'ITEM_CLASS_CD', width:"120px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) }
                    }
                },
                {editable: true,name:'LARGE_CLASS_CD', width:"120px", align:"center", required:true,
                    editoptions : { maxlength:20, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) }
                    }
                },
                {editable: true,name:'LARGE_CLASS_NM', width:"200px", align:"left",
                    editoptions : { maxlength:100, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) }
                    }
                },
                {editable: true,name:'MIDDLE_CLASS_CD', width:"100px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) }
                    }
                },
                {editable: true,name:'MIDDLE_CLASS_NM', width:"200px", align:"left",
                    editoptions : { maxlength:100, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) }
                    }
                },
                {editable: true,name:'SMALL_CLASS_CD', width:"100px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) }
                    }
                },
                {editable: true,name:'SMALL_CLASS_NM', width:"200px", align:"left",
                    editoptions : { maxlength:100, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) }
                    }
                },
                {editable: true,name:'REMARK', width:"300px", align:"center",
                    editoptions : { maxlength:500, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) }
                    }
                },
                {editable: true,name:'LOCAL_AGING_DAYS', width:"300px", align:"center",
                    editoptions : { maxlength:500, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) }
                    }
                },
                {editable: true,name:'EXPORT_AGING_DAYS', width:"300px", align:"center",
                    editoptions : { maxlength:500, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) }
                    }
                },
                {
                    editable: true,
                    name:'USE_YN',
                    align:"center",
                    width:"100px",
                    fixed :true,
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:useYnComboJson
                    },
                    required:true
                },
            ],
            pager: "#msItemClassHGridNavi",
            domainId:"ITEM_CLASS_LIST",
            gridComplete: function(){
                var ids = $msItemClassHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $msItemClassHGrid.setFocus(0);
                }

            }
        });
	}

    //[Fn] 수정된 내용저장
    function fnSave() {

    	// 데이터 키 : Value Key
    	var rowData = {
    			modFlag:"MOD_FLAG" ,
    			clientCd:"CLIENT_CD" ,
    			itemClassCd:"ITEM_CLASS_CD" ,
    			largeClassCd:"LARGE_CLASS_CD" ,
    			largeClassNm:"LARGE_CLASS_NM" ,
    			middleClassCd:"MIDDLE_CLASS_CD" ,
    			middleClassNm:"MIDDLE_CLASS_NM" ,
    			smallClassCd:"SMALL_CLASS_CD" ,
    			smallClassNm:"SMALL_CLASS_NM" ,
				remark:"REMARK" ,
				localAgingDays: "LOCAL_AGING_DAYS",
				exportAgingDays: "EXPORT_AGING_DAYS",
				useYn:"USE_YN"
		}

    	var chkData = $msItemClassHGrid.getSelectedJsonData("dt_itemClass",rowData);

    	if(!chkData){
    	    Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var rowid = $msItemClassHGrid.jqGrid('getGridParam', "selrow");
        var flag = $msItemClassHGrid.jqGrid('getRowData', rowid).MOD_FLAG;

        var ids = $msItemClassHGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $msItemClassHGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $msItemClassHGrid.getRowData(ids[i]).ITEM_CLASS_CD); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        if(!chkData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        if(!fnValidate()) return false;

        if(flag == "INSERT"){
            if (!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return; //저장하시겠습니까?
        }else if(flag == "UPDATE"){
            if (!confirm((Util.confirm('MSG_COM_CFM_002')).msgTxt)) return; //수정하시겠습니까?
        }else if(flag == "DELETE"){
            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?
        }

        //App.prcsStart();
		$.ajax({
    		url : "/ctrl/master/itemClass/saveItemClass",
    		data :chkData,
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(data) {
                //App.prcsEnd();
                if(data.stsCd == "999"){
                    alert(data.msgTxt);
                }else{
                    alert(data.msgTxt);
                    $msItemClassHGrid.paragonGridReload();
                }
    		}
    	});
    }


    function fnModalClientPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/clientPopup',
            id : 'modalClientPopup',
            width : '550',
            domainId:"PWMCM105Q_P1",
          data : { clientCd : $('#msItemClassClientCd').val() },
            visible:true,
            onload : function(modal) {
                var callBack ={
                        "CLIENT_CD" :"msItemClassClientCd",
                        "CLIENT_NM" :"msItemClassClientNm"
                };
                App.setElIds(callBack);
                modal.show();
            }
        });
    }

    function fnLargeClassPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/largeClassPopup',
            id : 'modalLargeClassPopup',
            width : '550',
            domainId:"PWMCM108Q_P1",
            data : {clientCd : $("#msItemClassClientCd").val()},
            visible:true,
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#msItemClassLargeClassCd").val(data.LARGE_CLASS_CD);
                $("#msItemClassLargeClassNm").val(data.LARGE_CLASS_NM);
            }
        });
    }


    function fnMiddleClassPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/middleClassPopup',
            id : 'modalMiddleClassPopup',
            width : '550',
            domainId:"PWMCM109Q_P1",
            data : {clientCd : $("#msItemClassClientCd").val(), largeClassCd : $("#msItemClassLargeClassCd").val()},
            visible:true,
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#msItemClassMiddleClassCd").val(data.MIDDLE_CLASS_CD);
                $("#msItemClassMiddleClassNm").val(data.MIDDLE_CLASS_NM);
            }
        });
    }


    function fnSmallClassPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/smallClassPopup',
            id : 'modalSmallClassPopup',
            data : {clientCd : $("#msItemClassClientCd").val(),
                    largeClassCd : $("#msItemClassLargeClassCd").val(),
                    middleClassCd : $("#msItemClassMiddleClassCd").val()},
            width : '550',
            domainId:"PWMCM110Q_P1",
            visible:true,
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#msItemClassSmallClassCd").val(data.SMALL_CLASS_CD);
                $("#msItemClassSmallClassNm").val(data.SMALL_CLASS_NM);
            }
        });
    }
    function fnValidate(){

        var ids = $msItemClassHGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_msItemClassHGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $msItemClassHGrid.getRowData(ids[i]);

                if(!(rowdata.CLIENT_CD)){
                    Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.CLIENT_CD.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.LARGE_CLASS_CD)){
                    Util.alert('MSG_MST_VAL_042'); //대분류코드 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.LARGE_CLASS_CD.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_043'); //대분류코드는 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.USE_YN)){
                    Util.alert('MSG_MST_VAL_001'); //사용여부 항목은 필수 입력입니다.
                    return false;
                }
            }
        }
        return true;
    }

    //삭제처리
    function fnDelete(){
        var checkFlag = $msItemClassHGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){
            var rowData = {
                    clientCd:"CLIENT_CD",
                    itemClassCd:"ITEM_CLASS_CD"
            }
            var chkData = $msItemClassHGrid.getSelectedJsonData("dt_itemClass",rowData);

            if(!chkData){
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                return false;
            }

            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

            //App.prcsStart();
            $.ajax({
                url : "/ctrl/master/itemClass/deleteItemClass",
                data :chkData,
                type : "POST",
                dataType : "json",
                contentType: 'application/json; charset=utf-8',
                cache: false,
                success : function(data) {
                    //App.prcsEnd();
                    if(data.stsCd == "999"){
                        alert(data.msgTxt);
                    }else{
                        alert(data.msgTxt);
                        $msItemClassHGrid.paragonGridReload();
                    }
                }
            });
        }
    }


}();

$(document).ready(function() {
    MasterItemClassApp.init();
});
