
var SystemDomainApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    // [El]프로그램 그리드
    var $domainGrid = $("#systemDomainGrid");

    var $systemDomainManagerGrid = $("#systemDomainManagerGrid");

    //사용여부(공통코드)
    var gridUseYn;

    // 언어(공통코드)
    var gridLangOptions;

    // 도메인 유형(공통코드)
    var gridDomainTypeOptions;

    return {
        init: function () {

        	gridUseYn = WMSUtil.fnCombo.grid_selectBox('systemDomainUseYn', 'USE_YN'); //사용여부

        	gridLangOptions = WMSUtil.fnCombo.grid_selectBox('systemDomainLangCd', 'SC0013'); //언어(공통코드)

        	gridDomainTypeOptions = WMSUtil.fnCombo.grid_selectBox('systemDomainType', 'SC0017'); //도메인 유형(공통코드)

        	WMSUtil.fnCombo.grid_selectBox('systemDomainErrYn', 'YN'); //에러 유무

            //도메인관리 Grid
            fnListDomain();

            //도메인언어 관리 Grid, 관리자 관리 도메인그리드
            //fnSystemDomainManagerGrid();

            //도메인관리 이벤트
            fnDomainEvents();
        }
    };

    //[Fn] 이벤트
    function fnDomainEvents(){

    	$('input[name="systemDomainInqType"]').click(function(){
    		var inqType = $(this).val();
    		if(inqType == 10){
    			$('#systemDomainGrid_wrap').css('display', 'block');
    			$('#systemDomainManagerGrid_wrap').css('display', 'none');
    			$('.systemDomainManager').css('display', 'none');
    		}else if(inqType == 20){
    			$('#systemDomainGrid_wrap').css('display', 'none');
    			$('#systemDomainManagerGrid_wrap').css('display', 'block');
    			$('.systemDomainManager').css('display', 'block');
    		}
    	})

        //검색버튼
        $('#domainSearchBtn').click(function(){
        	fnSearch();
        });

        //저장버튼
        $("#domainSaveRowBtn").click(function(){
            fnSave();
        });
        //행추가버튼
        $("#domainAddRowBtn").click(function(){
            $domainGrid.paragonGridAddRow();
        });
        //행삭제버튼
        $("#domainDelRowBtn").click(function(){
            fnDelete();
        });
        //엑셀버튼
        $("#domainExcelBtn").click(function(){
            $domainGrid.downloadExcel();
        });
        //도메인 리로드 버튼
        $('#domainReloadBtn').click(function(){
        	fnReload();
        })
    }

    function fnReload(){
        $.ajax({
            url : '/system/domain/reloadDomain',
            success : function(result) {
            	if(result.stsCd == 200){
            		alert(result.msgTxt);
            		fnSearch();
            	}else{
            		alert(result.msgTxt);
            	}
            }
        });
    }

    //[Fn] 프로그램명 가져오기 자동완성
    function fnGetProgramNms(data){
        $.ajax({
            url : "/system/program/listProgramName",
            data :data,
            type : "POST",
            dataType : "json",
            cache: false,
            success : function(result) {
                $('#domainName').autocomplete({
                    source      : result,
                    minLength   : 0
                });
                //드릴다운 부분을 닫기 위함
                $("#domainName").autocomplete("search", "");
                $("#domainName").val("").focus();
            }
        });
    }

    //[Fn] grid 도메인관리 목록
    function fnListDomain(){
        $domainGrid.paragonGrid({
            url				: '/system/domain/list',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
//          multielonly:true,
            rowClickFocus	: true,
            height			: '556',
            rowNum : 100,
            colModel		: [
                {editable: false, name:'DOMAIN_SEQ', align:"center",hidden:true},
                {editable: true,name:'DOMAIN_ID', align:"center", disabled:true, width:120},
                {editable: true,name:'DOMAIN_NM', align:"center"},
                {editable: true,name:'DOMAIN_SIMP_NM', align:"center"},
                {
                    editable: true,
                    align:"center",
                    name:'DOMAIN_TYPE',
                    width:80,
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:gridDomainTypeOptions
                    }
                },
                {
                    editable: true,
                    align:"center",
                    name:'LANG_CD',
                    width:80,
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:gridLangOptions
                    }
                },
                {editable: true,name:'DOMAIN_DESC',width:700},
                {
                    editable: true,
                    name:'USE_YN',
                    align:"center",
                    edittype:'select',
                    formatter:'select',
                    width:80,
                    editoptions: {
                        value:gridUseYn
                    }
                },
                {name:'IN_USER_ID', align:"center",width:50},
                {name:'IN_DT', align:"center",width:70,sortable:false}
            ],
            pager: "#systemDomainGridNavi",
            domainId : "DOMAIN_LIST",
            rowspan: true,
        });
    }

    //[Fn] grid 도메인관리 목록
    function fnSystemDomainManagerGrid(){
    	$systemDomainManagerGrid.paragonGrid({
            url				: '/system/domain/listDomainManager',
            cellEditable	: false,
            rownumbers		: true,
            height			: '520',
            shrinkToFit		: false,
            postData        : {
                errYn    	: $('#systemDomainErrYn').val()
            },
            colModel		: [
                {editable: false, name:'DOMAIN_SEQ', align:"center", hidden:true, frozen : true},
                {editable: false, name:'DOMAIN_ID', align:"center",  width : "120px" , frozen : true},
                {
                    editable	: true,
                    align		: "center",
                    name		: 'DOMAIN_TYPE',
                    width		: "80px",
                    edittype	: 'select',
                    formatter	: 'select',
                    editoptions	: {
                        value	: gridDomainTypeOptions
                    },
                    frozen 		: true
                },
                {editable: false, name:'KO_NM', 			align:"center",  width : "120px", frozen : true},
                {editable: false, name:'EN_NM', 			align:"center",  width : "120px", frozen : true},
                {editable: false, name:'VI_NM', 			align:"center",  width : "120px", frozen : true},
                {editable: false, name:'BTN_KO_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'BTN_EN_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'BTN_VI_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'COL_KO_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'COL_EN_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'COL_VI_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'MENU_KO_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'MENU_EN_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'MENU_VI_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'PRO_KO_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'PRO_EN_ERR',		align:"center",  width : "120px"},
                {editable: false, name:'PRO_VI_ERR', 		align:"center",  width : "120px"},
                {editable: false, name:'PRO_POP_KO_ERR', 	align:"center",  width : "120px"},
                {editable: false, name:'PRO_POP_EN_ERR', 	align:"center",  width : "120px"},
                {editable: false, name:'PRO_POP_VI_ERR', 	align:"center",  width : "120px"},
            ],
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
								{start: 'MENU_KO_ERROR', 	length: 3 , domain:"BTN"},
								{start: 'MENU_KO_ERROR', 	length: 3 , domain:"COL"},
								{start: 'MENU_KO_ERROR', 	length: 3 , domain:"MENU"},
								{start: 'PRO_KO_ERROR', 	length: 3 , domain:"PRO"},
								{start: 'PRO_POP_KO_ERROR', length: 3 , domain:"POPUP"}
                              ]
                          }],
            pager		: "#systemDomainManagerGridNavi",
            caption 	: "도메인 언어별 등록 여부 확인 그리드"
        });
    }


    //[Fn] 수정된 내용저장
    function fnSave() {

        //ParamsData Key : GridData Key application
        var formatData = {
                modFlag		: "MOD_FLAG",
                domainSeq	: "DOMAIN_SEQ",
                domainId	: "DOMAIN_ID",
                domainNm	: "DOMAIN_NM",
                langCd		: "LANG_CD",
                domainSimpNm: "DOMAIN_SIMP_NM",
                domainDesc	: "DOMAIN_DESC",
                domainType	: "DOMAIN_TYPE",
                useYn		: "USE_YN"
        }

        // grid에서 formatData에 정의된 데이터를 'dt_domain' 키값으로 parsing
        var jsonData = $domainGrid.getSelectedJsonData("dt_domain",formatData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var ids = $domainGrid.getGridParam("selarrrow");

        var flag = 0;
        for(var i = 0 ; i < ids.length ; i++){
            flag = $domainGrid.getRowData(ids[i]).MOD_FLAG;
            if(flag != "UPDATE" && flag != "INSERT"){
            	Util.alert('MSG_COM_VAL_058', $domainGrid.getRowData(ids[i]).DOMAIN_NM); //{0} 은 변경된 값이 없습니다.
                return false;
            }
        }

        if(!fnValidate()) return false;
        if(flag == "INSERT"){
            var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
            if (!confirm((Util.confirm(msg)).msgTxt)) return false;
        }else if(flag == "UPDATE"){
            var msg = 'MSG_COM_CFM_002'; //수정하시겠습니까?
            if (!confirm((Util.confirm(msg)).msgTxt)) return false;
        }

        App.prcsStart();
        $.ajax({
            url : "/system/domain/saveDomain",
            data :jsonData,
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
                    $domainGrid.paragonGridReload();
                }
            }
        });

    }

    function fnDelete(){
        var checkFlag = $domainGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){
            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return false; //삭제하시겠습니까?

            var rowData = {
                    domainSeq:"DOMAIN_SEQ"
            }
            var chkData = $domainGrid.getSelectedJsonData("dt_domain",rowData);

            App.prcsStart();
            $.ajax({
                url 		: "/system/domain/deleteDomain",
                data 		: chkData,
                type 		: "POST",
                dataType 	: "json",
                contentType	: 'application/json; charset=utf-8',
                cache		: false,
                success 	: function(data) {
                    //App.prcsEnd();
                    if(data.stsCd == "999"){
                        alert(data.msgTxt);
                    }else{
                        alert(data.msgTxt);
                        $domainGrid.paragonGridReload();
                    }
                }
            });
        }
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){

    		var inqType = $('input:checked[name="systemDomainInqType"]').val();
    		console.log(inqType);
    		if(inqType == 10){
                var data = {
                        domainType	: $("#systemDomainType").val(),
                        langCd		: $("#systemDomainLangCd").val(),
                        domainId	: $("#systemDomainId").val(),
                        domainNm	: $("#systemDomainNm").val(),
                        domainDesc	: $("#systemDomainDesc").val(),
                        useYn		: $("#systemDomainUseYn").val(),
                        errYn		: $('#systemDomainErrYn').val()
                };
                $domainGrid.paragonGridSearch(data);
    		}else if(inqType == 20){
                var data = {
                        domainType	: $("#systemDomainType").val(),
                        langCd		: $("#systemDomainLangCd").val(),
                        domainId	: $("#systemDomainId").val(),
                        domainNm	: $("#systemDomainNm").val(),
                        domainDesc	: $("#systemDomainDesc").val(),
                        useYn		: $("#systemDomainUseYn").val(),
                        errYn		: $('#systemDomainErrYn').val()
                };
                $systemDomainManagerGrid.paragonGridSearch(data);
    		}


        //그리드 수정 여부 체크
        if(fnModCheck()){
            var data = {
                    domainType	: $("#systemDomainType").val(),
                    langCd		: $("#systemDomainLangCd").val(),
                    domainId	: $("#systemDomainId").val(),
                    domainNm	: $("#systemDomainNm").val(),
                    domainDesc	: $("#systemDomainDesc").val(),
                    useYn		: $("#systemDomainUseYn").val()
            };
            $domainGrid.paragonGridSearch(data);
        }
    }

    function fnValidate(){

        var ids = $domainGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_systemDomainGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $domainGrid.getRowData(ids[i]);

                if(rowdata.DOMAIN_ID.trim().length == 0 ){
                    Util.alert('MSG_SYS_ERR_008'); //도메인아이디 항목은 필수입력입니다.
                    return false;
                }
            }
        }
        return true;
    }


    //그리드 수정 여부 체크
    function fnModCheck(){
        return $domainGrid.paragonGridModConfirm(Util.confirm("MSG_COM_CFM_009").msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

}();

$(document).ready(function() {
    SystemDomainApp.init();
});
