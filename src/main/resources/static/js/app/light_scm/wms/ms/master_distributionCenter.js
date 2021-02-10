/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 물류센터관리[MasterDcApp]
 * Program Code     : PWMMS101E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 2. 17.  		First Draft.
 */
var MasterDcApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS101E';
	var proNm = 'msDc';

	// [El]프로그램 그리드
	var $msDcHGrid = $("#msDcHGrid");

	var gridUseYn;
	var gridCountryCd;
	var gridCityCd;
	var gridPlantCd;

    var $callBackInput;

    var firstLoad = true;

    return {
        init: function () {
        	gridUseYn	 		= WMSUtil.fnCombo.grid_selectBox('msDcUseYn', 'YN');

        	gridCountryCd		= WMSUtil.fnCombo.grid('COUNTRY_CD');

			gridCityCd			= WMSUtil.fnCombo.grid('CITY_CD');

        	gridPlantCd			= WMSUtil.fnCombo.grid('PLANT_CD');

        	fnEvents();

        	fnList();
	    },
        callBackInput: function () {
            return $callBackInput;
        }
    };


    //이벤트
    function fnEvents(){

    	//Search or pop-up while typing
        WMSUtil.changePop(proNm, 'Dc');

    	//저장 버튼
    	$("#msDcSaveBtn").click(function(){
    	    fnSave();
    	});

    	//행 추가
    	$("#msDcAddBtn").click(function(){
    		$msDcHGrid.paragonGridAddRow();
    	});

    	//조회 버튼
    	$("#msDcSearchBtn").click(function(){
    		fnSearch();
    	});

    	//행 삭제 버튼
    	$("#msDcDelBtn").click(function(){
    		var checkFlag = $msDcHGrid.paragonGridCheckedDeleteData();
    		if(!checkFlag) {
    			fnSave('DELETE');
    		}
    	});

    	//엑셀 다운로드
    	$("#msDcExcelBtn").click(function(){
    	    $msDcHGrid.downloadExcelAllItems();
    	});

    	//물류센터 팝업
        $("#msDcDcPop").click(function(){
        	WMSUtil.popup.client('obApprClient');
        });

        //사용부가
        $("#msDcDcNm").attr("disabled", true); //물류센터
    }


    //Grid Search
    function fnSearch(){
    	//그리드 수정 여부 체크
    	if(fnModCheck()){
	    	var data = {
					dcCd 	: $("#msDcDcCd").val(),
					dcNm 	: $("#msDcDcNm").val(),
					useYn 	: $("#msDcUseYn").val()
			};
	    	$msDcHGrid.paragonGridSearch(data);
    	}
    }

    //Check Grid Modification
    function fnModCheck(){
        return $msDcHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    //Grid Search
    function fnList(){
		$msDcHGrid.paragonGrid({
        	url				: '/ctrl/master/distributionCenter/listMsDc',
        	rowEditable		: true,
        	cellEditable	: false,
			sortable		: true,
			rownumbers		: true,
			shrinkToFit		: false,
			multiselect		: true,
//			multielonly:true,
			rowClickFocus	: true,
			height			: '596',
            colModel		: [
    		   {editable: true,name:'DC_CD', 		width:"100px", align:"center", disabled:true, excel:true,
    			   required:true,
                   editoptions : { maxlength:20,
                    	dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); })
                    	}
                   }
                },
                {editable: true,name:'DC_NM', 		width:"200px", required:true, excel:true,
                    editoptions : { maxlength:100,
                    	dataInit : function(el) {
                    		$(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); })
                    	}
                    }
                },
/*                {editable: true,name:'PLANT', align:"center", width:"100px",
                    editoptions : { maxlength:20, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); })
                        }
                    }
                },*/
                {editable: true,name:'PLANT', 		width:"100px", align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridPlantCd }
                },
                {editable: true,name:'BIZ_NO', 		width:"100px", excel:true,
                    editoptions : { maxlength:20, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); })
                        }
                    }
                },
                {editable: true,name:'BIZ_NM', 		width:"200px", excel:true,
                    editoptions : { maxlength:100, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) }
                    }
                },
                {editable: true,name:'CEO_NM', 		width:"100px", align:"left", excel:true,
                    editoptions : { maxlength:50, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 50); }) }
                    }
                },
                {editable: true,name:'POST_NO',		width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:20, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) }
                    }
                },
                {editable: true,name:'BASIC_ADDR', width:"300px",align:"left", excel:true,
                    editoptions : { maxlength:500, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) }
                    }
                },
                {editable: true,name:'DETAIL_ADDR', width:"300px",align:"left", excel:true,
                    editoptions : { maxlength:500, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) }
                    }
                },
                {editable: true,name:'BIZTYPE', 	width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:100, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) }
                    }
                },
                {editable: true,name:'BIZKIND', 	width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:100, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 100); }) }
                    }
                },
                {editable: true,name:'TEL_NO', 		width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:50, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 50); }) }
                    }
                },
                {editable: true,name:'FAX_NO', 		width:"100px",align:"center", excel:true,
                    editoptions : { maxlength:50, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 50); }) }
                    }
                },
                {editable: true, name:'COUNTRY', 	width:"100px",align:"center",  fixed :true,hidden:true,
                    edittype:'select', formatter:'select', editoptions: { value:gridCountryCd, maxlength:6 }
                },
                {editable: true, name:'CITY', 		width:"100px",align:"center",fixed :true,hidden:true,
                    edittype:'select',formatter:'select', editoptions: { value:gridCityCd, maxlength:6 }
                },
                {editable: true,name:'TIMEDIFF', 	width:"100px",align:"center",  hidden:true,
                    editoptions : { maxlength:2, dataInit : function(el) {
                        $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 2); }) }
                    }
                },
                {editable: true,name:'SUMMTIME_START_YMD', 		width:"100px",align:"center",  hidden:true,
                    editoptions : {dataInit : function(el) {$(el).datepicker();}}, maxlength:8},
                {editable: true,name:'SUMMTIME_END_YMD', 		width:"100px",align:"center",  hidden:true,
                    editoptions : {dataInit : function(el) {$(el).datepicker();}}, maxlength:8},
                {editable: true, name:'USE_YN', 				width:"100px",align:"center",  fixed :true, excel:true,
                    edittype:'select', formatter:'select', editoptions: { value:gridUseYn },
                    required:true
                },
                {editable: true,name:'REMARK', 					width:"200px",align:"center", excel:true,
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) } }
                },
            ],
            pager			: "#msDcHGridNavi",
            domainId		: "DC_LIST",
            gridComplete	: function(){
                var ids = $msDcHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $msDcHGrid.setFocus(0);

                }
            }
        });
	}


    //Grid Row Save
    function fnSave(flag) {

    	// 데이터 키 : Value Key
    	var rowData = {
    			modFlag			:"MOD_FLAG" ,
				dcCd			:"DC_CD" ,
				dcNm			:"DC_NM" ,
				plantCd			:"PLANT",
				bizNo			:"BIZ_NO" ,
				bizNm			:"BIZ_NM" ,
				ceoNm			:"CEO_NM" ,
				postNo			:"POST_NO" ,
				basicAddr		:"BASIC_ADDR",
				detailAddr		:"DETAIL_ADDR",
				biztype			:"BIZTYPE",
				bizkind			:"BIZKIND",
				telNo			:"TEL_NO",
				faxNo			:"FAX_NO",
				countryCd		:"COUNTRY",
				cityCd			:"CITY",
				timediff		:"TIMEDIFF",
				summtimeStartYmd:"SUMMTIME_START_YMD",
				summtimeEndYmd	:"SUMMTIME_END_YMD",
				useYn			:"USE_YN",
				remark			:"REMARK"
		}

    	var jsonData = $msDcHGrid.getSelectedJsonData("dt_data",rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다
            return false;
        }

        var ids = $msDcHGrid.getGridParam("selarrrow");

        var rowFlag = 0;

        for(var i = 0 ; i < ids.length ; i++){
        	var rowData = $msDcHGrid.getRowData(ids[i]);

        	if(flag != 'DELETE'){
        		if(rowData.MOD_FLAG != "UPDATE" && rowData.MOD_FLAG != "INSERT"){
                    Util.alert('MSG_MST_ERR_006', rowData.DC_CD); //물류센터 [ {0} ]는 변경된 값이 없습니다.
                    return false;
                }
        	}

        }

        if(!fnValidate()) return false;

        var msg = "";
        if(flag == 'DELETE'){
        	msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?
        }else{
        	if(rowFlag == "INSERT"){
        		msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
        	}else if(rowFlag == "UPDATE"){
        		msg = 'MSG_COM_CFM_002'; //수정하시겠습니까?
        	}
        }

        var saveUrl = '/ctrl/master/distributionCenter/updateMsDc';

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$msDcHGrid.paragonGridReload();
    	})
    }

    //Validation
    function fnValidate(){

    	var idx = $msDcHGrid.getGridParam('selarrrow');
    	console.log(idx);
    	//로우 닫기
    	for(var i = 0; i < idx.length; i++){
    		$msDcHGrid.jqGrid('saveRow', idx[i], false,'clientArray');
    	}

    	//유효성검사
    	for(var i = 0; i < idx.length; i++){
            var rowdata = $msDcHGrid.getRowData(idx[i]);

            /* 필수값 유효성 검사 */
            if(!(rowdata.DC_CD)){
                Util.alert('MSG_MST_VAL_002'); //물류센터코드 항목은 필수 입력입니다.
                return false;
            }else if(rowdata.DC_CD.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_003'); //물류센터코드는 공백으로 입력 할 수 없습니다.
                return false;
            }
            if(!(rowdata.DC_NM)){
                Util.alert('MSG_MST_VAL_004'); //물류센터명 항목은 필수 입력입니다.
                return false;
            }
            if(rowdata.DC_NM.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_005'); //물류센터명은 공백으로 입력 할 수 없습니다.
                return false;
            }
    	}
        return true;
    }

}();

$(document).ready(function() {
	MasterDcApp.init();
});
