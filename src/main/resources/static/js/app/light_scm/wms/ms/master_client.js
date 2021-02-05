/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 고객사관리[MasterClientApp]
 * Program Code     : PWMMS105E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 24.  		First Draft.
 */
var MasterClientApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS105E';
	var proNm = 'msClient';

	// [El]프로그램 그리드
	var $msClientHGrid = $("#msClientHGrid");

	var useYnComboJson;

	var $callBackInput;

	var firstLoad = true;

    return {
        init: function () {
            //
            fnListUseYnJson("USE_YN");
        	//고객사관리 Grid생성
        	fnListClient();
        	//고객사관리 Event
        	fnClientEvents();
	    },
        callBackInput: function () {
            return $callBackInput;
        }
    };


    //[Fn] 이벤트
    function fnClientEvents(){

        //코드 입력시 명 서치
        addClientCdChangeEvent("client", []);          //고객사

    	//저장버튼
    	$("#msClientSaveBtn").click(function(){
    	    fnSave();
    	});
    	//추가버튼
    	$("#msClientAddBtn").click(function(){
    	    $msClientHGrid.paragonGridAddRow();
    	});
    	//검색버튼
    	$("#msClientSearchBtn").click(function(){
    		fnSearch();
    	});
    	//삭제버튼
    	$("#msClientDelBtn").click(function(){
    		fnDelete();
    	});
    	//엑셀버튼
    	$("#msClientExcelBtn").click(function(){
    	    $msClientHGrid.downloadExcel();
    	});

    	$("#msClientClientPop").click(function(){
    		WMSUtil.popup.client('msClient');
        });

        $("#msClientClientNm").attr("disabled", true); //고객사관리

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
                useYnComboJson =  Util.MakeGridOptions(result);
                Util.MakeSelectOptions($("#clientUseYn"),result);
            }
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
					clientCd : $("#msClientClientCd").val(),
					clientNm : $("#msClientClientNm").val(),
					useYn : $("#clientUseYn").val()
			};
    		$msClientHGrid.paragonGridSearch(data);
    	}
    }

    //그리드 수정 여부 체크
    function fnModCheck(){
        return $msClientHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    //그리드 초기화
    function fnListClient(){
		$msClientHGrid.paragonGrid({
        	url: '/ctrl/master/client/listClient',
        	rowEditable:true,
            cellEditable:false,
			sortable: true,
			rownumbers: true,
			shrinkToFit:false,
			multiselect:true,
//			multielonly:true,
			rowClickFocus:true,
			height:'596',
            colModel:[
                {editable: true,name:'CLIENT_CD', width:"100px", align:"center", disabled:true, required:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: true,name:'CLIENT_NM', width:"200px", align:"left", required:true,
                    editoptions : { maxlength:100, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 100); }) } }
                },
                {editable: true,name:'BIZ_NO', width:"100px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: true,name:'BIZ_NM', width:"100px", align:"left",
                    editoptions : { maxlength:100, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 100); }) } }
                },
                {editable: true,name:'CEO_NM', width:"100px", align:"left",
                    editoptions : { maxlength:50, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 50); }) } }
                },
                {editable: true,name:'POST_NO', width:"100px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: true,name:'BASIC_ADDR', width:"300px", align:"left",
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 500); }) } }
                },
                {editable: true,name:'DETAIL_ADDR', width:"300px", align:"left",
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 500); }) } }
                },
                {editable: true,name:'BIZTYPE', width:"100px", align:"center",
                    editoptions : { maxlength:100, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 100); }) } }
                },
                {editable: true,name:'BIZKIND', width:"100px", align:"center",
                    editoptions : { maxlength:100, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 100); }) } }
                },
                {editable: true,name:'TEL_NO', width:"100px", align:"center",
                    editoptions : { maxlength:50, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 50); }) } }
                },
                {editable: true,name:'FAX_NO', width:"100px", align:"center",
                    editoptions : { maxlength:50, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 50); }) } }
                },
                {editable: true,name:'CONTACT_NM', width:"100px", align:"left",
                    editoptions : { maxlength:50, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 50); }) } }
                },
                {editable: true,name:'CONTACT_TEL_NO', width:"100px", align:"center",
                    editoptions : { maxlength:50, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 50); }) } }
                },
                {editable: true,name:'CONTACT_EMAIL', width:"100px", align:"left",
                    editoptions : { maxlength:100, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 100); }) } }
                },
                {editable: true, name:'USE_YN', align:"center", width:"100px", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:useYnComboJson },
                    required:true
                },
                {editable: true,name:'REMARK', align:"left", width:"300px",
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 500); }) } }
                },
            ],
            pager		: "#msClientHGridNavi",
            domainId	: "CLIENT_LIST",
            gridComplete: function(){
                var ids = $msClientHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $msClientHGrid.setFocus(0);
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
    			clientNm:"CLIENT_NM" ,
				bizNo:"BIZ_NO" ,
                bizNm:"BIZ_NM" ,
                ceoNm:"CEO_NM" ,
                postNo:"POST_NO" ,
                basicAddr:"BASIC_ADDR",
                detailAddr:"DETAIL_ADDR",
                biztype:"BIZTYPE",
                bizkind:"BIZKIND",
                telNo:"TEL_NO",
                faxNo:"FAX_NO",
                contactNm:"CONTACT_NM",
                contactTelNo:"CONTACT_TEL_NO",
                contactEmail:"CONTACT_EMAIL",
                useYn:"USE_YN",
                remark:"REMARK"
		}

    	var data = $msClientHGrid.getJsonData("dt_client",rowData);
        var chkData = $msClientHGrid.getSelectedJsonData("dt_client",rowData);

        if(!chkData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var rowid = $msClientHGrid.getGridParam("selrow");
        var flag = $msClientHGrid.getRowData(rowid).MOD_FLAG;

        var ids = $msClientHGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $msClientHGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_058', $('th[id$=CLIENT_NM]').find('div').text() + ' ['+ $msClientHGrid.getRowData(ids[i]).CLIENT_NM +']'); //{0}은(는) 변경 된 값이 없습니다.
                return false;
            }
        }

        if(!fnValidate()) return false;

        if(flag == "INSERT"){
            if (!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return; //저장하시겠습니까?
        }else if(flag == "UPDATE"){
            if (!confirm((Util.confirm('MSG_COM_CFM_002')).msgTxt)) return; //수정하시겠습니까?
        }

        App.prcsStart();
		$.ajax({
    		url : "/ctrl/master/client/saveClient",
    		data :chkData,
    		type : "POST",
    		dataType : "json",
    		contentType: 'application/json; charset=utf-8',
    		cache: false,
    		success : function(result) {
                //App.prcsEnd();
		        alert(result.msgTxt);
		        $msClientHGrid.paragonGridReload();
    		}
    	});
    }


    function fnValidate(){

        var ids = $msClientHGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_msClientHGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $msClientHGrid.getRowData(ids[i]);

                if(!(rowdata.CLIENT_CD)){
                    Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.CLIENT_CD.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.CLIENT_NM)){
                    Util.alert('MSG_MST_VAL_028'); //고객사명 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.CLIENT_NM.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_029'); //고객사명은 공백으로 입력 할 수 없습니다.
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

    function fnDelete(){

        var checkFlag = $msClientHGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){
            var rowData = {
                    clientCd:"CLIENT_CD"
            }
            var chkData = $msClientHGrid.getSelectedJsonData("dt_client",rowData);

            if(!chkData){
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                return false;
            }

            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

            App.prcsStart();
            $.ajax({
                url : "/ctrl/master/client/deleteClient",
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
                        $msClientHGrid.paragonGridReload();
                    }
                }
            });
        }
    }
}();

$(document).ready(function() {
    MasterClientApp.init();
});
