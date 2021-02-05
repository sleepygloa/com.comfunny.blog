/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 존관리[MasterZoneApp]
 * Program Code     : PWMMS103E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 21.  		First Draft.
 */
var MasterZoneApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS103E';
	var proNm = 'msZone';

	// [El]프로그램 그리드
	var $msZoneHGrid = $("#msZoneHGrid");

	var useYnComboJson;

	var keepTypeComboJson;

	var holdStatusComboJson;

	var areaCdComboJson;

	var $callBackInput;

	var firstLoad = true;

    return {
        init: function () {
            //
            fnListUseYnJson("USE_YN");

            fnListKeepTypeJson("KEEP_TYPE_CD");
            //
            fnListHoldStatusJson("HOLD_ST_CD");

            fnListAreaCdJson();
        	//존관리 Grid생성
        	fnListZone();
        	//존관리 Event
        	fnZoneEvents();
	    },
        callBackInput: function () {
            return $callBackInput;
        }
    };


    //[Fn] 이벤트
    function fnZoneEvents(){
        //존 코드 변경 시 검색 이벤트
        addZoneCdChangeEvent("zone");

        //엔터이벤트
        $('#msZoneZoneCd').keydown(function(e){
        	if(e.keyCode == 9 || e.keyCode == 13){
        		fnSearch();
        	}
        })

    	//저장버튼
    	$("#msZoneSaveBtn").click(function(){
    	    fnSave();
    	});
    	//추가버튼
    	$("#msZoneAddBtn").click(function(){
    	    $msZoneHGrid.paragonGridAddRow();
    	});
    	//검색버튼
    	$("#msZoneSearchBtn").click(function(){
    		fnSearch();
    	});
    	//삭제버튼
    	$("#msZoneDelBtn").click(function(){
    	    fnDelete();
    	});
    	//엑셀버튼
    	$("#msZoneExcelBtn").click(function(){
    	    $msZoneHGrid.downloadExcel();
    	});

    	$("#msZoneZonePop").click(function(){
    	    WMSUtil.popup.zone('msZoneZone');
        });

        $("#msZoneZoneNm").attr("disabled", true); //물류센터

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
                Util.MakeSelectOptions($("#msZoneUseYn"),result);
            }
        });
    }

    //[Fn] 보관유형 콤보박스 JSON 조회
    function fnListKeepTypeJson(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                keepTypeComboJson = Util.MakeGridOptions(result);
            }
        });
    }

    //[Fn] 보류상태구분 콤보박스 JSON 조회
    function fnListHoldStatusJson(groupCd){
        $.ajax({
            url : "/ctrl/settings/system/code/listCodeGroupComboJson",
            data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                holdStatusComboJson = Util.MakeGridOptions(result);
            }
        });
    }

    //[Fn] 구역코드 콤보박스 JSON 조회
    function fnListAreaCdJson(){
        $.ajax({
            url : "/ctrl/master/area/listAreaCdComboJson",
            //data :{codeGroupCd:groupCd},
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                areaCdComboJson = Util.MakeGridOptions(result);
                Util.MakeSelectOptions($("#msZoneAreaCd"),result);
            }
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
					zoneCd : $("#msZoneZoneCd").val().toUpperCase(),
					zoneNm : $("#msZoneZoneNm").val(),
					areaCd : $("#msZoneAreaCd").val(),
					useYn : $("#msZoneUseYn").val()
			};
    		$msZoneHGrid.paragonGridSearch(data);

    		$('#msZoneZoneCd').val($("#msZoneZoneCd").val().toUpperCase());
    	}
    }

    /********************************************************************
     * Zone 그리드 생성
     * Since   : 2017-02-21
     * 작성자  : Kim Min Su
     * 수정내역:
     ********************************************************************/
    //[Fn] jqgrid Area 목록
    function fnListZone(){
		$msZoneHGrid.paragonGrid({
        	url: '/ctrl/master/zone/listZone',
        	rowEditable:true,
            cellEditable:false,
			sortable: true,
			rownumbers: true,
			shrinkToFit:true,
			height:'596',
			multiselect: true,
//			multielonly:true,
			rowClickFocus:true,
            colModel:[
                {editable: true,name:'ZONE_CD', width:"100px", align:"center", disabled:true, required:true,
                    editoptions:{
                        maxlength:20,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).on('keyup blur', function(e){
                                //존코드 대문자 변환
                                var zoneCd = $msZoneHGrid.getRow(rowid,"ZONE_CD");
                                $msZoneHGrid.setCell("ZONE_CD",zoneCd.toUpperCase(),rowid);
                                gridTextLengthLimit($(el), e, 20);
                            });
                        }
                    }
                },
                {editable: true,name:'ZONE_NM', width:"200px", align:"left", required:true,
                    editoptions : { maxlength:100, dataInit : function(el) { $(el).on('keyup blur',function(e){ gridTextLengthLimit($(el), e, 100); }) } }
                },
                {editable: false,name:'OLD_AREA_CD', align:"center", hidden:true},
                {
                    editable: true,
                    //name:'AREA_CD',
                    name:'AREA',
                    align:"center",
                    width:"100px",
                    fixed :true,
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:areaCdComboJson
                    },
                    required:true
                },
                {
                    editable: true,
                    //name:'KEEP_TYPE_CD',
                    name:'KEEP_TYPE',
                    align:"center",
                    width:"100px",
                    fixed :true,
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:keepTypeComboJson
                    }
                },
                {
                    editable: true,
                    //name:'HOLD_ST_CD',
                    name:'HOLD_ST',
                    align:"center",
                    width:"100px",
                    fixed :true,
                    edittype:'select',
                    formatter:'select',
                    editoptions: {
                        value:holdStatusComboJson
                    }
                },
                {editable: true, name:'REMARK', align:"center", width:"300px",
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) } }
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
            pager: "#msZoneHGridNavi",
            domainId:"ZONE_LIST",
            gridComplete: function(){
                var ids = $msZoneHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $msZoneHGrid.setFocus(0);
                }

            }
        });
	}

    //그리드 수정 여부 체크
    function fnModCheck(){
    	return $msZoneHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
	}

    //[Fn] 수정된 내용저장
    function fnSave() {

    	// 데이터 키 : Value Key
    	var rowData = {
    			modFlag:"MOD_FLAG" ,
				zoneCd:"ZONE_CD",
				zoneNm:"ZONE_NM",
				oldAreaCd:"OLD_AREA_CD",
				areaCd:"AREA" ,
				keepTypeCd:"KEEP_TYPE" ,
				holdStCd:"HOLD_ST",
				remark:"REMARK" ,
				useYn:"USE_YN"
		}

    	var chkData = $msZoneHGrid.getSelectedJsonData("dt_zone",rowData);

    	if(!chkData){
    	    Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
    		return;
    	}

        var rowid = $msZoneHGrid.getGridParam("selrow");
        var flag = $msZoneHGrid.getRowData(rowid).MOD_FLAG;

        var ids = $msZoneHGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $msZoneHGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $msZoneHGrid.getRowData(ids[i]).ZONE_NM); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        if(!fnValidate()) return false;

        if(flag == "INSERT"){
            if (!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return; //저장하시겠습니까?
        }else if(flag == "UPDATE"){
            if (!confirm((Util.confirm('MSG_COM_CFM_002')).msgTxt)) return; //수정하시겠습니까?
        }

        //App.prcsStart();
		$.ajax({
    		url : "/ctrl/master/zone/saveZone",
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
                    $msZoneHGrid.paragonGridReload();
                }
    		}
    	});
    }


    function fnValidate(){

        var ids = $msZoneHGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_msZoneHGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $msZoneHGrid.getRowData(ids[i]);
                console.log(rowdata);

                if(!(rowdata.ZONE_CD)){
                    Util.alert('MSG_MST_VAL_012'); //존코드 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.ZONE_CD.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_013'); //존코드 항목은 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.ZONE_NM)){
                    Util.alert('MSG_MST_VAL_014'); //존명 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.ZONE_NM.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_015'); //존명 항목은 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.AREA)){
                    Util.alert('MSG_MST_VAL_010'); //구역 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.AREA.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_011'); //구역은 공백으로 입력 할 수 없습니다.
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

        var checkFlag = $msZoneHGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){
            var rowData = {
                    zoneCd:"ZONE_CD" ,
            }
            var chkData = $msZoneHGrid.getSelectedJsonData("dt_zone",rowData);

            if(!chkData){
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                return false;
            }

            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

            //App.prcsStart();
            $.ajax({
                url : "/ctrl/master/zone/deleteZone",
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
                        $msZoneHGrid.paragonGridReload();
                    }
                }
            });
        }
    }
}();

$(document).ready(function() {
    MasterZoneApp.init();
});
