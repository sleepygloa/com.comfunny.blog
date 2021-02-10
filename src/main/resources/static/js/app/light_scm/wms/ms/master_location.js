/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 로케이션관리[MasterLocApp]
 * Program Code     : PWMMS104E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 22.        First Draft.
 */
var MasterLocApp = function () {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS104E';
	var proNm = 'msLoc';

    // [El]프로그램 그리드
    var $msLocHGrid = $("#msLocHGrid");

    var gridUseYn;
    var gridLocTypeCd;
    var gridHoldStCd;
    var gridLoadGbnCd;
    var areaCdComboJson;
    var gridYn;

    var $callBackInput;

    var typeFlag = false;

    var reportFlagA4 = false;

    var firstLoad = true;

    return {
        init: function () {

        	gridUseYn		= WMSUtil.fnCombo.grid_selectBox('msLocUseYn', 'USE_YN');

        	gridYn			= WMSUtil.fnCombo.grid('YN');

        	gridLocTypeCd	= WMSUtil.fnCombo.grid('LOC_TYPE_CD');

        	gridHoldStCd	= WMSUtil.fnCombo.grid('HOLD_ST_CD');

        	gridLoadGbnCd	= WMSUtil.fnCombo.grid('LOAD_GBN_CD');

        	WMSUtil.fnCombo.selectBox('msLocReport', 'PWMMS104E');

            fnListAreaCdJson();

            fnEvents();

            fnList();
            //Loc관리 Event
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };


    //[Fn] 이벤트
    function fnEvents(){

    	$('.reportFlag').css('display', 'none');

    	//Search or pop-up while typing
        WMSUtil.changePop(proNm, 'Area');
//        WMSUtil.changePop(proNm, 'Loc');
        WMSUtil.changePop(proNm, 'Zone');

        //저장버튼
        $("#msLocSaveBtn").click(function(){
            fnSave();
        });
        //추가버튼
        $("#msLocAddBtn").click(function(){
            $msLocHGrid.paragonGridAddRow();
        });
        //검색버튼
        $("#msLocSearchBtn").click(function(){
            fnSearch();
        });
        //삭제버튼
        $("#msLocDelBtn").click(function(){
            fnDelete();
        });
        //엑셀버튼
        $("#msLocExcelBtn").click(function(){
            $msLocHGrid.downloadExcel();
        });

        $("#msLocZonePop").click(function(){
        	WMSUtil.popup.zone('msLocZone')
//            fnZonePopup("P");
        });

        $("#msLocLocPop").click(function(){
        	WMSUtil.popup.loc('msLocLoc');
//            fnLocPopup();
        });

        $('#msLocAreaPop').click(function(){
        	WMSUtil.popup.area('msLocArea')
//            fnAreaPopup();
        })

        $("#msLocBatchBtn").click(function(){
            fnLocBatchCretion();
        });

        $("#msLocReportBtn").click(function(){
        	var reportCd = $('#msLocReport option:selected').val();

        	if(reportCd == 10){
            	var sendData = {
            			grid		: $msLocHGrid,
            			url			: '/OFVlocationLabelReport',
            			key			: "LOC_CD",
//            			progSt		: 'IB_PROG_ST_CD',
//            			progCd		: 20,
            			errMsgCd	: 'MSG_MST_ERR_012',
            			data		: {
                            locCd   : "LOC_CD",
                            dcCd	: "DC_CD"
            			},
            			addData : {
//        					proCd	: 'PWMIB104E_R2',
        					type	: 'PDF'
            			}
            	};

            	WMSUtil.fnReport(sendData);
        	}else{



        		//존행열 확인
        		var reportZoneCd = $('#msLocReportZoneCd').val().trim();
        		if(reportZoneCd == ''){
        			$('.reportFlag').css('display', 'block');
        			reportFlagA4 = true;
        		}else{
        			if(reportFlagA4){

        				var dt_data = [{
        					dcCd  : $('#mainDcCd option:selected').val(),
        					zoneCd : $('#msLocReportZoneCd').val(),
    						linCd : $('#msLocReportLinCd').val(),
    						rowCd : $('#msLocReportRowCd').val()}
        				               ]


        				var url = '/OFVlocationLabelA4Report'
        				var sendDdata = {
        						dt_data 	: dt_data,
                    			fileName	: url.split('/')[1],
            					type		: 'PDF'
        				}




                    	var sendData = {
        						sendDdata 	: dt_data,
        						url			: url,
        						dt_data 	: dt_data,
                    			fileName	: url.split('/')[1],
            					type		: 'PDF',
            					labelFlag 	: 'N'

                    	};
        				var jsonData =JSON.stringify(sendData)

        				App.prcsStart();
        				$.ajax({
        					url 		: '/ctrl/common/report/OFVlocationLabelA4Report',
        					data 		:jsonData,
        					type 		: "POST",
        					datatype 	: "JSON",
        					cache 		: false,
        					contentType : 'application/json; charset=utf-8',
        					success 	: function(result) {
        						if (result.stsCd == 100) {
        							alert(result.msgTxt);
        							App.prcsEnd();
        							return false;
        						} else {
        								var newPopReport = window.open("about:blank");
        								newPopReport.location.href = result.fileName;

        						}
        						App.prcsEnd();
        					},
        					complete : function() {
        						App.prcsEnd();
        					},
        					error : function() {
        						Util.alert('MSG_COM_ERR_093'); //레포트 출력 도중 에러가 발생했습니다. 시스템관리자에게 문의 바랍니다.
        						App.prcsEnd();
        					}
        				});
                    	reportFlagA4 = false;
                    	$('.reportFlag').css('display', 'none');
                    	$('#msLocReportZoneCd').val('');
                    	$('#msLocReportLinCd').val('')
						$('#msLocReportRowCd').val('')
        			}
        		}
        	}

        });

        $('#msLocZoneNm').attr('disabled', true);
        $('#msLocAreaNm').attr('disabled', true);


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
//                Util.MakeSelectOptions($("#msLocAreaCd"),result);
            }
        });
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //그리드 수정 여부 체크
        if(fnModCheck()){
            var data = {
                    locCd : $("#msLocLocCd").val(),
                    zoneCd : $("#msLocZoneCd").val(),
                    areaCd : $("#msLocAreaCd").val(),
                    useYn : $("#msLocUseYn").val()
            };
            $msLocHGrid.paragonGridSearch(data);
        }
    }

    //그리드 수정 여부 체크
    function fnModCheck(){
        return $msLocHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    //그리드 초기화
    function fnList(){
        $msLocHGrid.paragonGrid({
            url				: '/ctrl/master/location/listLoc',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false, 	// 그리드 가로 고정(가로 스크롤)
            multiselect		: true,	// 체크박스 생기게
//            multielonly:true,	// 체크박스로만 체크되게
            rowClickFocus	: true,	//체크시 로우 색 진하게
            height			: '556',		//기본값 530px
            colModel:[
              	{editable: false,name:'DC_CD', align:"center", width:"100px", hidden: true},
                {editable: false,name:'ZONE_CD', align:"center", width:"100px", hidden: true},
                {editable: true,name:'ZONE', align:"center", width:"100px", required:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } },
                    searchBtnClick : function(value, rowid, colid) {
                        fnZonePopup(rowid);
                    }
                },
                { editable: false, name:'AREA', align:"center", width:"100px",
                    formatter:'select', editoptions: { value:areaCdComboJson }
                },
                {
                    editable: false,
                    name:'AREA',
                    align:"center",
                    width:"100px",
                    formatter:'select',
                    editoptions: {
                        value:areaCdComboJson
                    }
                },
                {editable: true,name:'LOC_CD', align:"center", width:"100px", disabled:true, required:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false,name:'LOC_CD_PK', align:"center", width:"100px", disabled:true, hidden:true},
                {editable: true,name:'LIN', align:"center", width:"100px",
                    editoptions:{maxlength:4,
                            dataInit : function(el) {
                                var rowid = $(el)[0].attributes.rowid.value;
                                $(el).on('keyup blur', function(e){
/*                                    if($msLocHGrid.getRow(rowid,"LIN") == ''){
                                        $msLocHGrid.setCell("LIN",0,rowid);
                                    }*/
                                    setLocCd(rowid);
                                    gridTextLengthLimit($(el), e, 4);
                                });
                            }
                        }, required:true},
                {editable: true,name:'ROW', align:"center", width:"100px",
                            editoptions:{maxlength:4,
                                dataInit : function(el) {
                                    var rowid = $(el)[0].attributes.rowid.value;
                                    $(el).on('keyup blur', function(e){
                                        if($msLocHGrid.getRow(rowid,"ROW") == ''){
                                            $msLocHGrid.setCell("ROW",0,rowid);
                                        }
                                        setLocCd(rowid);
                                        gridTextLengthLimit($(el), e, 4);
                                    });
                                }
                        }, required:true},
                {editable: true,name:'LEV', align:"center", width:"100px",
                            editoptions:{maxlength:4,
                                dataInit : function(el) {
                                    var rowid = $(el)[0].attributes.rowid.value;
                                    $(el).on('keyup blur', function(e){
                                        if($msLocHGrid.getRow(rowid,"LEV") == ''){
                                            $msLocHGrid.setCell("LEV",0,rowid);
                                        }
                                        setLocCd(rowid);
                                        gridTextLengthLimit($(el), e, 4);
                                    });
                                }
                        }, required:true},
                {editable: true, name:'LOC_TYPE', align:"center", width:"100px", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:gridLocTypeCd }
                },
                {editable: true, name:'HOLD_ST', align:"center", width:"100px", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:gridHoldStCd }
                },
                {editable: true,name:'LOC_PRIOORD', align:"center", width:"100px",
                    editoptions : { maxlength:9, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 9); }) } }
                },
                {editable: true,  name:'LOAD_GBN', align:"center", width:"100px", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:gridLoadGbnCd }
                },
                {editable: true, name:'ITEM_MIXLOAD_YN', align:"center", width:"100px", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:gridYn }
                },
                {editable: true, name:'LOT_MIXLOAD_YN', align:"center", width:"100px", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:gridYn }
                },
                {editable: true,name:'HORIZONTAL', align:"center", width:"100px", editoptions:{maxlength:11,
                    dataInit : function(el) {
                        var rowid = $(el)[0].attributes.rowid.value;
                        if($msLocHGrid.getRow(rowid,"HORIZONTAL") == ''){
                            $msLocHGrid.setCell("HORIZONTAL",0,rowid);
                        }
                        $(el).on('keyup blur', function(e){
                            if($msLocHGrid.getRow(rowid,"HORIZONTAL") == ''){
                                $msLocHGrid.setCell("HORIZONTAL",0,rowid);
                            }
                            setCbm(rowid);

                            gridIntLengthLimit($(this), e, 9);

                            if(!typeFlag && $msLocHGrid.getRow(rowid,"CBM").length > 7){
                                typeFlag = true;
                                Util.alert('MSG_MST_ERR_008', 7); //체적의 정수형 길이를 확인해 주십시오. {0}자 까지 입력 가능합니다.
                            }else{
                                typeFlag= false;
                            }

                        });
                    }
                }},
                {editable: true,name:'VERTICAL', align:"center", width:"100px", editoptions:{maxlength:11,
                    dataInit : function(el) {
                        var rowid = $(el)[0].attributes.rowid.value;
                        if($msLocHGrid.getRow(rowid,"VERTICAL") == ''){
                            $msLocHGrid.setCell("VERTICAL",0,rowid);
                        }
                        $(el).on('keyup blur', function(e){
                            if($msLocHGrid.getRow(rowid,"VERTICAL") == ''){
                                $msLocHGrid.setCell("VERTICAL",0,rowid);
                            }
                            setCbm(rowid);

                            gridIntLengthLimit($(this), e, 9);

                            if(!typeFlag && $msLocHGrid.getRow(rowid,"CBM").length > 7){
                                typeFlag = true;
                                Util.alert('MSG_MST_ERR_008', 7); //체적의 정수형 길이를 확인해 주십시오. {0}자 까지 입력 가능합니다.
                            }else{
                                typeFlag= false;
                            }

                        });
                    }
                }},
                {editable: true,name:'HEIGHT', align:"center", width:"100px", editoptions:{maxlength:11,
                    dataInit : function(el) {
                        var rowid = $(el)[0].attributes.rowid.value;
                        if($msLocHGrid.getRow(rowid,"HEIGHT") == ''){
                            $msLocHGrid.setCell("HEIGHT",0,rowid);
                        }
                        $(el).on('keyup blur', function(e){
                            if($msLocHGrid.getRow(rowid,"HEIGHT") == ''){
                                $msLocHGrid.setCell("HEIGHT",0,rowid);
                            }
                            setCbm(rowid);

                            gridIntLengthLimit($(this), e, 9);

                            if(!typeFlag && $msLocHGrid.getRow(rowid,"CBM").length > 7){
                                typeFlag = true;
                                Util.alert('MSG_MST_ERR_008', 7); //체적의 정수형 길이를 확인해 주십시오. {0}자 까지 입력 가능합니다.
                            }else{
                                typeFlag= false;
                            }
                        });
                    }
                }},
                {editable: true,name:'WEIGHT', align:"center", width:"100px", editoptions:{maxlength:15,
                    dataInit : function(el) {
                        var rowid = $(el)[0].attributes.rowid.value;
                        if($msLocHGrid.getRow(rowid,"WEIGHT") == ''){
                            $msLocHGrid.setCell("WEIGHT",0,rowid);
                        }
                        $(el).on('keyup blur', function(e){
                            if($msLocHGrid.getRow(rowid,"WEIGHT") == ''){
                                $msLocHGrid.setCell("WEIGHT",0,rowid);
                            }

                            gridIntLengthLimit($(this), e, 12);

                        });
                    }
                }},
                {name:'CBM', align:"center", width:"100px"},
                {editable: true,name:'REMARK', align:"center", width:"300px",
                    editoptions : { maxlength:500, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 500); }) } }
                },
                {editable: true, name:'USE_YN', align:"center", width:"100px", fixed :true,
                	edittype:'select', formatter:'select', editoptions: { value:gridUseYn },
                    required:true
                },

            ],
            pager		: "#msLocHGridNavi",
            domainId	:"LOC_LIST",	// 그리드 타이틀 언어처리
            gridComplete: function(){
                var ids = $msLocHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $msLocHGrid.setFocus(0);
                }


            }
        });
    }
    //로케이션 코드 설정
    function setLocCd(rowid){
        var locCd = "";
        locCd += $msLocHGrid.getRow(rowid,"ZONE_CD");
        locCd += $msLocHGrid.getRow(rowid,"LIN");
        locCd += $msLocHGrid.getRow(rowid,"ROW");
        locCd += $msLocHGrid.getRow(rowid,"LEV");

        $msLocHGrid.setCell("LOC_CD",locCd,rowid);
    }
    //체적 설정
    function setCbm(rowid){
        var cbm = 0;
        var horizontal = Number($msLocHGrid.getRow(rowid,"HORIZONTAL"));
        var vertical = Number($msLocHGrid.getRow(rowid,"VERTICAL"));
        var height = Number($msLocHGrid.getRow(rowid,"HEIGHT"));

        cbm = horizontal * vertical * height;

        $msLocHGrid.setCell("CBM",cbm,rowid);
    }

    //[Fn] 수정된 내용저장
    function fnSave() {

        // 데이터 키 : Value Key
        var rowData = {
                modFlag:"MOD_FLAG" ,
                zoneCd:"ZONE_CD",
                locCd:"LOC_CD",
                locCdPk : "LOC_CD_PK",
                locTypeCd:"LOC_TYPE",
                holdStCd:"HOLD_ST",
                locPrioord:"LOC_PRIOORD" ,
                linCd:"LIN" ,
                rowCd:"ROW" ,
                levCd:"LEV" ,
                loadGbnCd:"LOAD_GBN" ,
                itemMixloadYn:"ITEM_MIXLOAD_YN" ,
                lotMixloadYn:"LOT_MIXLOAD_YN" ,
                horizontal:"HORIZONTAL" ,
                vertical:"VERTICAL" ,
                height:"HEIGHT" ,
                cbm:"CBM",
                weight:"WEIGHT" ,
                remark:"REMARK" ,
                useYn:"USE_YN"
        }

        var jsonData = $msLocHGrid.getSelectedJsonData("dt_loc",rowData);


        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var rowid = $msLocHGrid.getGridParam("selrow");
        var flag = $msLocHGrid.getRowData(rowid).MOD_FLAG;

        var ids = $msLocHGrid.getGridParam("selarrrow");

        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $msLocHGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_MST_ERR_005', $msLocHGrid.getRowData(ids[i]).LOC_CD); //로케이션코드 [ {0} ]는 변경된 값이 없습니다.
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
            url : "/ctrl/master/location/saveLoc",
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
                    $msLocHGrid.paragonGridReload();
                }
            }
        });
    }

    function fnZonePopup(gbn) {

        if(gbn == "P"){
            PopApp.paragonOpenPopup({
                ajaxUrl : '/ctrl/common/zonePopup',
                id : 'modalZonePopup',
                width : '650',
                btnName : "수정",
                domainId:"PWMCM103Q_P1",
                onload : function(modal) {
                    modal.show();
                },
                callback:function(data){
                    $("#msLocZoneCd").val(data.ZONE_CD);
                    $("#msLocZoneNm").val(data.ZONE_NM);
                }
            });
        }else{
            PopApp.paragonOpenPopup({
                ajaxUrl : '/ctrl/common/zonePopup',
                id : 'modalZonePopup',
                width : '650',
                btnName : "수정",
                domainId:"PWMCM103Q_P1",
                onload : function(modal) {
                    modal.show();
                },
                callback:function(data){
                    $msLocHGrid.setCell("ZONE_CD",data.ZONE_CD,gbn);
                    $msLocHGrid.setCell("ZONE",data.ZONE_NM,gbn);
                    $msLocHGrid.setCell("AREA",data.AREA_CD,gbn);

                    setLocCd(gbn);
                }
            });
        }
    }

    function fnLocPopup() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/locPopup',
            id : 'modalLocPopup',
            width : '650',
            btnName : "수정",
            domainId:"PWMCM104Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(dataRow){
                $("#msLocLocCd").val(dataRow.LOC_CD);
            }
        });
    }
    function fnAreaPopup() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/areaPopup',
            id : 'modalAreaPopup',
            width : '550',
            btnName : "수정",
           // data : {areaCd : $('#areaCd').val()},
            domainId:"PWMCM102Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback:function(rowData){
                $('#msLocAreaCd').val(rowData.AREA_CD);
                $('#locAreaNm').val(rowData.AREA_NM);
            }
        });
    }

    function fnLocBatchCretion(){
        PopApp.paragonOpenPopup({
            ajaxUrl: '/ctrl/master/location/batchCreationPop',
            id: 'locBatchCreation',
            width: '70',
//            height:'900',
            btnName:"저장",
            domainId:"PWMMS104E_P1",
            visible: true
        });
    }

    function fnValidate(){

        var ids = $msLocHGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_msLocHGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $msLocHGrid.getRowData(ids[i]);
                if(!(rowdata.ZONE)){
                    Util.alert('MSG_MST_VAL_016'); //존 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.ZONE.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_017'); //존 항목은 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.LOC_CD)){
                    Util.alert('MSG_MST_VAL_018'); //로케이션코드 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.LOC_CD.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_019'); //로케이션코드는 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.LIN)){
                    Util.alert('MSG_MST_VAL_020'); //행 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.LIN.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_021'); //행은 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.ROW)){
                    Util.alert('MSG_MST_VAL_022'); //열 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.ROW.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_023'); //열은 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.LEV)){
                    Util.alert('MSG_MST_VAL_024'); //단 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.LEV.trim().length == 0 ){
                    Util.alert('MSG_MST_VAL_025'); //단은 공백으로 입력 할 수 없습니다.
                    return false;
                }
            }
        }
        return true;
    }

    function fnDelete(){

        var checkFlag = $msLocHGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){
            var rowData = {
                    locCd:"LOC_CD" ,
            }
            var chkData = $msLocHGrid.getSelectedJsonData("dt_loc",rowData);

            if(!chkData){
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                return false;
            }

            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

            App.prcsStart();
            $.ajax({
                url : "/ctrl/master/location/deleteLoc",
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
                        $msLocHGrid.paragonGridReload();
                    }
                }
            });
        }
    }

    function fnReport(ReportUrl){
        App.prcsStart();
        var reportRowData = {
                locCd : "LOC_CD",
        }
        var jsonData = $msLocHGrid.getSelectedJsonData("dt_data", reportRowData);
        var jsonObject = JSON.parse(jsonData);
        var jsonStr = JSON.stringify(jsonObject);
        var doubleClickFlag=false;

            $.ajax({
                url:ReportUrl, //출고지시
                data: jsonStr,
                type:"POST",
                datatype:"JSON",
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success:function(data){
                    App.prcsEnd();
                    var openNewWindowReport = window.open("about:blank");
                    openNewWindowReport.location.href=data.fileName;
                },
                complete: function(){
                    App.prcsEnd();
                }
            });
    }

}();

$(document).ready(function() {
    MasterLocApp.init();
});
