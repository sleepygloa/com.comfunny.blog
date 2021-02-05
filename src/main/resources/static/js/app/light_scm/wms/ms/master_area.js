/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 구역(층)관리[MasterAreaApp]
 * Program Code     : PWMMS102E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 20.  		First Draft.
 */
var MasterAreaApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS102E';
	var proNm = 'msArea';

	// [El]프로그램 그리드
	var $msAreaGrid = $("#msAreaHGrid");

	var gridUseYn;
	var gridKeepGbnCd;

	var $callBackInput;

	var firstLoad = true;

    return {
        init: function () {

        	gridUseYn		= WMSUtil.fnCombo.grid_selectBox('msAreaUseYn', 'YN');

        	gridKeepGbnCd	= WMSUtil.fnCombo.grid('KEEP_TEMPE_GBN_CD');

        	fnEvents();

        	fnList();
	    },
        callBackInput: function () {
            return $callBackInput;
        }
    };


    //[Fn] 이벤트
    function fnEvents(){

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Area');

    	//저장버튼
    	$("#msAreaSaveBtn").click(function(){
    	    fnSave();
    	});
    	//추가버튼
    	$("#msAreaAddBtn").click(function(){
    	    $msAreaGrid.paragonGridAddRow();
    	});
    	//검색버튼
    	$("#msAreaSearchBtn").click(function(){
    		fnSearch();
    	});
    	//삭제버튼
    	$("#msAreaDelBtn").click(function(){
    	    fnDelete();
    	});
    	//엑셀버튼
    	$("#msAreaExcelBtn").click(function(){
    	    $msAreaGrid.downloadExcelAllItems();
    	});

    	//구역 팝업
        $("#msAreaAreaPop").click(function(){
        	WMSUtil.popup.area('msAreaArea', {clientCd : $('#msAreaClientCd').val()})
        });

        //사용불가
        $("#msAreaAreaNm").attr("disabled", true);

    }

    //조회
    function fnSearch(){
        //그리드 수정 여부 체크
        if(fnModCheck()){
            var data = {
                    areaCd : $("#msAreaAreaCd").val(),
                    areaNm : $("#msAreaAreaNm").val(),
                    useYn : $("#msAreaUseYn").val()
            };
            $msAreaGrid.paragonGridSearch(data);
        }
    }

    //그리드 수정 여부 체크
    function fnModCheck(){
        return $msAreaGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    //그리드 초기화
    function fnList(){
		$msAreaGrid.paragonGrid({
        	url				: '/ctrl/master/area/listArea',
        	rowEditable		: true,
            cellEditable	: false,
			sortable		: true,
			rownumbers		: true,
			shrinkToFit		: false,
			multiselect		: true,
//			multielonly:true,
			rowClickFocus	: true,
//			postData:{dcCd : dcCd},
			height			: '596',
            colModel:[
                {editable: true,name:'AREA_CD', width:"200px", align:"center", disabled:true, required:true, excel:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: true,name:'AREA_NM', width:"350px", align:"left", required:true, excel:true,
                    editoptions : { maxlength:100, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) } }
                },
                {editable: true, name:'KEEP_TEMPE_GBN', align:"center", width:"200px", fixed :true, excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridKeepGbnCd }
                },
                {editable: true, name:'USE_YN', align:"center", width:"200px", fixed :true, excel:true,
                	required:true,
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn },
                },
                {editable: true,name:'REMARK', align:"center", width:"600px", excel:true,
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) } }
                },
            ],
            pager			: "#msAreaHGridNavi",
            domainId		:"AREA_LIST",
            gridComplete	: function(){
                var ids = $msAreaGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0)
                    $msAreaGrid.setFocus(0);

            }
        });
	}

    //[Fn] 수정된 내용저장
    function fnSave() {

    	// 데이터 키 : Value Key
    	var rowData = {
    			modFlag			:"MOD_FLAG" ,
				areaCd			: "AREA_CD" ,
				areaNm			: "AREA_NM" ,
				keepTempeGbnCd	: "KEEP_TEMPE_GBN" ,
				remark			: "REMARK" ,
				useYn			: "USE_YN"
		}

        var jsonData = $msAreaGrid.getSelectedJsonData("dt_area",rowData);

    	if(!jsonData){
    	    Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
    	    return;
    	}

        var rowid = $msAreaGrid.getGridParam("selrow");
        var flag = $msAreaGrid.getRowData(rowid).MOD_FLAG;

        var ids = $msAreaGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $msAreaGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $msAreaGrid.getRowData(ids[i]).AREA_NM); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        if(!fnValidate()) return false;

        var saveUrl = '/ctrl/master/area/updateMsAreaSave';
        var msg = '';
        if(flag == "INSERT"){
            msg = 'MSG_COM_CFM_003' //저장하시겠습니까?
        }else if(flag == "UPDATE"){
            msg = 'MSG_COM_CFM_002' //수정하시겠습니까?
        }

        //ajax Event.
    	WMSUtil.ajax(jsonData, saveUrl, msg, function(){
    		$msAreaGrid.paragonGridReload();
    	})

    }


    function fnValidate(){

        var ids = $msAreaGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_msAreaHGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $msAreaGrid.getRowData(ids[i]);

                if(!(rowdata.AREA_CD)){
                    Util.alert('MSG_MST_VAL_006'); //구역코드 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.AREA_CD.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_007'); //구역코드는 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.AREA_NM)){
                    Util.alert('MSG_MST_VAL_008'); //구역명 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.AREA_NM.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_009'); //구역명은 공백으로 입력 할 수 없습니다.
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

        var checkFlag = $msAreaGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){
            var rowData = {
                    areaCd:"AREA_CD" ,
            }
            var jsonData = $msAreaGrid.getSelectedJsonData("dt_area",rowData);

            if(!jsonData){
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                return false;
            }

            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
            var saveUrl = '/ctrl/master/area/deleteArea';

            //ajax Event.
        	WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        		$msAreaGrid.paragonGridReload();
        	})
        }
    }
}();

$(document).ready(function() {
    MasterAreaApp.init();
});
