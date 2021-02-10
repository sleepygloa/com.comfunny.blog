/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : URI 접근허용 관리[AllowedURIApp]
 * Program Code     : PC0004
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Jin Ho  		2016. 10. 24.  		First Draft.
 */
var AllowedURIApp = function () {
	"use strict";

	/************************************************
	 *전역 객체 선언부 (return 상위부분에 선언해야함)
	 ************************************************/

	// [El]Allowed URI 그리드
	var $systemAllowedURIGrid = $("#systemAllowedURIGrid");

	var gridComboUseYn;

    return {
        init: function () {

            fnListUseYnJson("USE_YN");
            gridComboUseYn = WMSUtil.fnCombo.grid('USE_YN');

        	//URI Grid생성
        	fnListAllowedURI();

        	//URI Event
        	fnAllowedURIEvents();
	    }
    };

    //[Fn] 이벤트
    function fnAllowedURIEvents(){

        //검색버튼
        $("#systemAllowedUriSearchBtn").click(function(){
        	fnSearch();
        });

    	//저장버튼
    	$("#systemAllowedUriSaveRowBtn").click(function(){
    		fnSaveRows();
    	});
    	//행추가버튼
    	$("#systemAllowedUriAddRowBtn").click(function(){
    		$systemAllowedURIGrid.paragonGridAddRow();
    	});

    	//행삭제버튼
    	$("#systemAllowedUriDelRowBtn").click(function(){
    	    fnDelete();
    	});

        //엑셀버튼
        $("#systemAllowedUriExcelBtn").click(function(){
            $systemAllowedURIGrid.downloadExcel();
        });

    }


    //[Function 공통]  SELECT박스 값 get/set
    function getSelectBoxElValue(elem, oper, value) {
    	if (oper === "set") {
    		var selectBox = $(elem).find("select:option[value='" + value + "']");
    		if (selectBox.length > 0) {
    			selectBox.prop("selected", true);
    		}
    	}
    	if (oper === "get") {
    		return $(elem).find("select").val();
    	}
    }
    //[Function 공통]  SELECT박스 Ui 생성
    function createSelectBoxEl(value, editOptions) {
    	if(value == ""){
    		value = "Y";
    	}
    	var div =$("<div/>");
    	var select =$("<select/>");
    	var option1 = $("<option>", {value: "A" , selected: value == "A" }).text("A : 전체");
    	var option2 = $("<option>", {value: "L" , selected: value == "L" }).text("L : 로그인");
    	select.append(option1);
    	select.append(option2);
    	div.append(select);
    	return div;
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
					uriName : $("#systemAllowedUriName").val(),
					allowUseYn : $("#systemAllowedUriUseYn").val()
			};
    		$systemAllowedURIGrid.paragonGridSearch(data);
    	}
    }

    //[Fn] 프로그램명 가져오기 자동완성
    function fnGetProgramNms(data){
    	$.ajax({
    		url : "/ctrl/settings/system/systemAllowedUri/listProgramName",
    		data :data,
    		type : "POST",
    		dataType : "json",
    		cache: false,
    		success : function(result) {
    			$('#systemAllowedUriName').autocomplete({
    				source: result,
    				minLength:0
    			});
    			$("#systemAllowedUriName").autocomplete("search", "");
    			$("#systemAllowedUriName").val("").focus();
    		}
    	});
    }
    /********************************************************************
     * AllowedURI 그리드 생성
     * Since   : 2016-10-24
     * COMP_ID : CP0006
     * 작성자  : Kim J. H
     * 수정내역:
     ********************************************************************/
    function fnListAllowedURI(){
		$systemAllowedURIGrid.paragonGrid({
        	url: '/ctrl/settings/system/alloweduri/listAllowedURI',
			componentId:"CP0006",
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            shrinkToFit:false,
            multiselect: true,
            rowClickFocus:true,
//            scroll: 1,
            height:'596',
            colModel:[
                {editable: true, name:'ALLOW_SEQ',hidden:true},
                {editable: true, name:'ALLOW_URI',width:500},
                {editable: true, name:'ALLOW_DESC',width:300},
                {
                	editable: true,
		        	align:"center",
		        	name:'ALLOW_GBN',
		        	width:150,
		        	edittype:'select',
		        	formatter:'select',
			    	editoptions: {
//			    		value:"A:모두허용;L:로그인후허용",
			    		value:"A: All Allow; L: Allow After Login"
			    	}
		        },
				{
			    	editable: true,
			    	name:'USE_YN',
			    	align:"center",
			    	width:150,
			    	edittype:'select',
		        	formatter:'select',
			    	editoptions: {
			    		value : gridComboUseYn
			    	}
		        },
                {name:'IN_USER_ID', align:"center",width:150},
                {name:'IN_DT', align:"center",width:150}
            ],
            pager		: "#systemAllowedURIGridNavi",
//            caption		: "AllowedURI 목록",
            domainId	: 'ALLOW_URI_LIST'

        });

	}

    //[Function 공통]  라디오 값 get/set
    function fnGetRadioElValue(elem, oper, value) {
        if (oper === "set") {
            var radioButton = $(elem).find("input:radio[value='" + value + "']");
            if (radioButton.length > 0) {
                radioButton.prop("checked", true);
            }
        }
        if (oper === "get") {
            return $(elem).find("input:radio:checked").val();
        }
    }
	//[Function 공통]  라디오 Ui 생성
    function fnCreateRadioEl(value, editOptions) {
    	if(value == ""){
    		value = "Y";
    	}
        var div =$("<div/>");
        var label = $("<label class='radio-inline'></label>");
        var radio = $("<input>", { type: "radio", value: "Y", name: editOptions.id, id: "useY", checked: value == 'Y'  });
		label.append(radio).append("Y");
        var label1 = $("<label class='radio-inline'></label>");
        var radio1 = $("<input>", { type: "radio", value: "N", name: editOptions.id, id: "useN", checked: value == 'N' });
		label1.append(radio1).append("N");
        div.append(label).append(label1);
        return div;
    }

    //[Fn] 수정된 내용저장
    function fnSaveRows() {

    	//ParamsData Key : GridData Key
    	var rowData = {
    			modFlag		: "MOD_FLAG",
    			allowSeq	: "ALLOW_SEQ",
    			allowUri	: "ALLOW_URI",
    			allowDesc	: "ALLOW_DESC",
    			allowGbn	: "ALLOW_GBN",
				useYn		: "USE_YN"
		}
    	var jsonData = $systemAllowedURIGrid.getSelectedJsonData("dt_alloweduri",rowData);

    	if(!jsonData){
    	    Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var ids = $systemAllowedURIGrid.getGridParam("selarrrow");

        var flag = 0;
        for(var i = 0 ; i < ids.length ; i++){
            flag = $systemAllowedURIGrid.getRowData(ids[i]).MOD_FLAG;
            if(flag != "UPDATE" && flag != "INSERT"){
                alert("[ " + $systemAllowedURIGrid.getRowData(ids[i]).SCHE_NM + " ] 접근URI는 변경 된 값이 없습니다.");
                return false;
            }
        }

        if(!fnValidate()) return false;

        if(flag == "INSERT"){
            if(!confirm(Util.confirm("MSG_COM_CFM_003").msgTxt)) return false; //저장하시겠습니까?
        }else if(flag == "UPDATE"){
            if(!confirm(Util.confirm("MSG_COM_CFM_002").msgTxt)) return false; //수정하시겠습니까?
        }

        App.prcsStart();
		$.ajax({
    		url : "/ctrl/settings/system/alloweduri/saveAllowedURI",
    		data :jsonData,
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(data) {
                App.prcsEnd();
                if(data.stsCd == "999"){
                    alert(data.msgTxt);
                }else{
                    alert(data.msgTxt);
                    $systemAllowedURIGrid.paragonGridReload();
                }

    		}
    	});
    }

    function fnValidate(){

        var ids = $systemAllowedURIGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
//            if(ids[i]>)


            if($("input:checkbox[id='jqg_allowedURIGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $systemAllowedURIGrid.getRowData(ids[i]);

                if(rowdata.ALLOW_URI.trim().length == 0 ){
                    Util.alert('MSG_SYS_ERR_010');
//                    alert("접근URI 항목은 필수 입력입니다.");
                    return false;
                }
            }
        }
        return true;
    }

    //그리드 수정 여부 체크
    function fnModCheck(){
        return $systemAllowedURIGrid.paragonGridModConfirm(Util.confirm("MSG_COM_CFM_009").msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    function fnDelete(){
        var checkFlag = $systemAllowedURIGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){
            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

            var rowData = {
                    allowSeq:"ALLOW_SEQ"
            }
            var chkData = $systemAllowedURIGrid.getSelectedJsonData("dt_alloweduri",rowData);

            App.prcsStart();
            $.ajax({
                url : "/ctrl/settings/system/alloweduri/deleteAllowedURI",
                data :chkData,
                type : "POST",
                dataType : "json",
                contentType: 'application/json; charset=utf-8',
                cache: false,
                success : function(data) {
                    App.prcsEnd();
                    if(data.stsCd == "999"){
                        alert(data.msgTxt);
                    }else{
                        alert(data.msgTxt);
                        $systemAllowedURIGrid.paragonGridReload();
                    }
                }
            });
        }
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
                Util.MakeSelectOptions($("#systemAllowedUriUseYn"),result);
            }
        });
    }


}();

$(document).ready(function() {
	AllowedURIApp.init();
});
