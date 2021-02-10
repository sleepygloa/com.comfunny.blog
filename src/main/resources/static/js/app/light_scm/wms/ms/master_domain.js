/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 권역관리[MasterDomainApp]
 * Program Code     : PWMMS115E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 20.  		First Draft.
 */
var MasterDomainApp = function () {
	"use strict";

	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/

	// [El]프로그램 그리드
	var $domainGrid = $("#masterDomainGrid");

	var useYnComboJson;

	var domainGroupComboJson;

	var $callBackInput;

    return {
        init: function () {
            //
            fnListUseYnJson("USE_YN");

            fnListDomainGroupJson("DOMAIN_GROUP_CD");

            fnListDomain();

            fnMsDomainEvents();

            $("#msDomainNm").attr('disabled', true);
	    },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    //[Fn] 이벤트
    function fnMsDomainEvents(){
        //코드 변경 시 검색 이벤트
        addDomainCdChangeEvent("msDomain", $("#sessionDcCd").val());

    	//검색폼 프로그램코드 엔터키 이벤트
    	$("#msDomainCd").enterEvent({
    		callBack:function(value){
    		    fnSearch();
    		}
    	})
    	//검색폼 프로그램명 엔터키 이벤트
    	$("#msDomainNm").enterEvent({
    		callBack:function(value){
    		    fnSearch();
		    }
    	})

    	//저장버튼
    	$("#saveMsDomainBtn").click(function(){
    	    fnSave();
    	});
    	//추가버튼
    	$("#addMsDomainBtn").click(function(){
    	    $domainGrid.paragonGridAddRow();
    	});
    	//검색버튼
    	$("#searchMsDomainBtn").click(function(){
    		fnSearch();
    	});
    	//삭제버튼
    	$("#delMsDomainBtn").click(function(){
            fnDel();
    	});
    	//엑셀버튼
    	$("#excelMsDomainBtn").click(function(){
    	    $domainGrid.downloadExcel();
    	});

        $("#domainPopup").click(function(){
            fnDomainPopGrid();
        });
    }

    function fnDomainPopGrid(){

        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/domainPop',
            id : 'modalDomainPopup',
            width : '550',
            btnName : "수정",
            data : {dcCd : $("#sessionDcCd").val()},
            domainId:"PWMCM116Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(rowData){
                $("#msDomainCd").val(rowData.DOMAIN_CD);
                $("#msDomainNm").val(rowData.DOMAIN_DETAIL_NM);
            }
        });
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
                Util.MakeSelectOptions($("#msDomainUseYn"),result);
            }
        });
    }

    //[Fn] 권역그룹코드 콤보박스 JSON 조회
    function fnListDomainGroupJson(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                domainGroupComboJson = Util.MakeGridOptions(result);
            }
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
					domainCd : $("#msDomainCd").val(),
					domainDetailNm : $("#msDomainNm").val(),
					useYn : $("#msDomainUseYn").val()
			};
    		$domainGrid.paragonGridSearch(data);
    	}
    }

    /********************************************************************
     * domain 그리드 생성
     * Since   : 2017-02-20
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    //[Fn] jqgrid Domain 목록
    function fnListDomain(){
		$domainGrid.paragonGrid({
        	url: '/ctrl/master/domainMaster/listDomain',
        	rowEditable:true,
            cellEditable:false,
			sortable: true,
			rownumbers: true,
			shrinkToFit:false,
			height:'617',
			multiselect:true,
//			multielonly:true,
			rowClickFocus:true,
            colModel:[
                {editable: true,name:'DOMAIN_CD', width:"200px", align:"center", disabled:true, required:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                //editoptions : { maxlength:20, dataEvents : function(el, e) { gridTextLengthLimit($(el), e, 20); }},
                },
                {editable: true,name:'DOMAIN_DETAIL_NM', align:"left", width:"300px", required:true,
                    editoptions : { maxlength:100, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) } }
                },
                {
                    editable: true,
                    name:'DOMAIN_GROUP_CD',
                    align:"center",
                    width:"200px",
                    fixed :true,
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:domainGroupComboJson
                    }
                },
                {editable: true,name:'DOMAIN_PRIOORD', align:"center", width:"200px", formatter:'integer',
                    editoptions : { maxlength:9, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridIntLengthLimit($(this), e, 9); }) } }
                },
                {editable: true,name:'REMARK', align:"center", width:"450px",
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) } }
                },
                {
                    editable: true,
                    name:'USE_YN',
                    align:"center",
                    width:"200px",
                    fixed :true,
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:useYnComboJson
                    }
                },
            ],
            pager: "#masterDomainNavi",
            domainId:"DOMAIN_DETAIL_LIST",
            gridComplete: function(){
                var ids = $domainGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $domainGrid.setFocus(0);
                }
            }
        });
	}

    //그리드 수정 여부 체크
    function fnModCheck(){
    	return $domainGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
	}
    //[Fn] Grid Delete Data Row.
    function fnDel() {

        var addFlag = $domainGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/master/domainMaster/saveDomain";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag     :  "MOD_FLAG",
                domainCd    :  "DOMAIN_CD"
            };

            //1. 체크된 리스트.
            var jsonData = $domainGrid.getSelectedJsonDataChk("dt_domain", rowData, $domainGrid);

            // console.log("선택된 삭제 데이터:", jsonData);
            //ajax Event.
            fnAjaxSave(jsonData, saveUrl, msg);
        }
    }
    //[Fn] 저장 ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg) {

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        //App.prcsStart();
        $.ajax({
            url: saveUrl,
            data: jsonData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                //App.prcsEnd();
                // console.log(data);
                fnReloadGrid();
            }
        });
    }
    //[Fn] Reload Grid Method
    function fnReloadGrid() {
        $domainGrid.paragonGridReload();
    }
    //[Fn] 수정된 내용저장
    function fnSave() {

    	// 데이터 키 : Value Key
    	var rowData = {
    			modFlag:"MOD_FLAG" ,
				domainCd:"DOMAIN_CD" ,
				domainDetailNm:"DOMAIN_DETAIL_NM" ,
				domainGroupCd : "DOMAIN_GROUP_CD",
				domainPrioord : "DOMAIN_PRIOORD",
				remark:"REMARK" ,
				useYn:"USE_YN"
		}

        var data = $domainGrid.getJsonData("dt_domain",rowData);
        var chkData = $domainGrid.getSelectedJsonData("dt_domain",rowData);

        var ids = $domainGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $domainGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $domainGrid.getRowData(ids[i]).DOMAIN_DETAIL_NM); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        if(!chkData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }



        var rowid = $domainGrid.jqGrid('getGridParam', "selrow");
        var flag = $domainGrid.jqGrid('getRowData', rowid).MOD_FLAG;
        console.log(flag);

        if(!fnValidate()) return false;

        if(flag == "INSERT"){
            if (!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return; //저장하시겠습니까?
        }else if(flag == "UPDATE"){
            if (!confirm((Util.confirm('MSG_COM_CFM_002')).msgTxt)) return; //수정하시겠습니까?
        }else if(flag == "DELETE"){
            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?
        }


		$.ajax({
    		url : "/ctrl/master/domainMaster/saveDomain",
    		data :chkData,
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(data) {
                if(data.stsCd == "999"){
                    alert(data.msgTxt);
                }else{
                    alert(data.msgTxt);
                    $domainGrid.paragonGridReload();
                }
    		}
    	});
    }

    function fnValidate(){

        var ids = $domainGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_masterDomainGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $domainGrid.getRowData(ids[i]);

                if(!(rowdata.DOMAIN_CD)){
                    Util.alert('MSG_MST_VAL_054'); //권역코드 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.DOMAIN_CD.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_055'); //권역코드는 공백만으로 입력할 수 없습니다.
                    return false;
                }
                if(!(rowdata.DOMAIN_DETAIL_NM)){
                    Util.alert('MSG_MST_VAL_056'); //권역명 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.DOMAIN_DETAIL_NM.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_057'); //권역명은 공백만으로 입력할 수 없습니다.
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
}();

$(document).ready(function() {
    MasterDomainApp.init();
});
