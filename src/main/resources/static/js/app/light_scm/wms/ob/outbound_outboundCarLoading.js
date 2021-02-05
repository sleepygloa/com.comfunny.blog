    /** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출하상차[OutboundCarLoadingApp]
 * Program Code     : PWMOB107E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 4. 10.  		First Draft.
*/

var OutboundCarLoadingApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB107E';
	var proNm = 'outboundCarLoading';

    var gridObProgStCdOptions; //출고진행상태코드
    var gridObGbnCdOptions;   //출고구분
    var gridItemStCdOptions;  //제품상태

    var $outboundCarLoadingHGrid = $("#outboundCarLoadingHGrid");
    var $outboundCarLoadingDGrid = $("#outboundCarLoadingDGrid");
    var $outboundCarLoadingPGrid = $("#outboundCarLoadingPGrid");
    var firstLoad = true;
    var outboundCarLoadingDFlag = true;

    return {
        init: function(){

        	//gridItemStCdOptions 	=  WMSUtil.fnCombo.grid('ITEM_ST_CD');
        	gridObGbnCdOptions 		=  WMSUtil.fnCombo.grid_selectBox('outboundCarLoadingObGbnCd', 'OB_GBN_CD');
        	gridObProgStCdOptions 	= WMSUtil.fnCombo.grid_selectBox_range('outboundCarLoadingObProgStCd', 'OB_PROG_ST_CD', 7, 1);

            WMSUtil.fnCombo.selectBox('outboundCarLoadingReportCd', 'PWMOB107E', '10');

            fnEvents();

            fnList();

        },callBackInput: function(){
            return $callBackInput;
        }
    };

    //그리드 초기화
    function fnList(){
        $outboundCarLoadingHGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundCarLoading/listOutboundCarloadingH",
            sortable		: true,
            rownumbers		: true,
            height			: "135",
            //rowEditable: true,
            shrinkToFit		: false,
            rowEditable		: true,
            cellEditable	: false,
            multiselect		: true,
//            multielonly: true,
            rowClickFocus	: true,
            domainId		: "OB_CARLD_LIST",
            postData		: sendData(),
            colModel: [
                {editable: false, name: "COMPANY_CD",       width:"100px",  align: "center", hidden:true},//회사번호
                {editable: false, name: "CLIENT_CD",        width:"100px",  align: "center", hidden:true},//고객사
                {editable: false, name: "DC_CD",            width:"100px",  align: "center", hidden:true},//물류센터
                {editable: false, name: "CLIENT",           width:"100px",  align: "left", excel:true},//고객사명
                {editable: false, name: "OB_PROG_ST_CD",    width:"100px",   align: "center", hidden:true},//진행상태코드
                {editable: false, name: "OB_PROG_ST",       width:"80px",  align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObProgStCdOptions }
                }, //진행상태코드
                {editable: false, name: "CAR_NO",           width:"80px",   align: "center", excel:true},//차량
                {editable: false, name: "OB_YMD",           width:"100px",  align: "center", excel:true},//출고일자
                {editable: false, name: "OB_NO",            width:"100px",  align: "center", excel:true},//출고번호
                {editable: false, name: "SO_YMD",           width:"100px",  align: "center", excel:true},//주문일자
                {editable: false, name: "SO_NO",            width:"100px",  align: "center", excel:true},//주문번호
                {editable: false, name: "OB_GBN_CD",        width:"100px",  align: "center", hidden:true},//출고구분
                {editable: false, name: "OB_GBN",        	width:"80px",  align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObGbnCdOptions }
                },//출고구분
                {editable: false, name: "STORE_CD",         width:"100px",   align: "center", excel:true},//판매처
                {editable: false, name: "STORE_NM",         width:"150px",   align: "left", excel:true},//판매처명
                {editable: false, name: "RSTORE_CD",        width:"100px",   align: "center", excel:true},//납품처
                {editable: false, name: "RSTORE_NM",        width:"150px",   align: "left", excel:true},//납품처명
                {editable: false, name: "DELIVERY_DGR",     width:"80px",   align: "center" , hidden: true },//배송차수
                {editable: false, name: "WAVE_NO",          width:"100px",   align: "center", excel:true},//웨이브번호
                {editable: false, name: "REMARK",           width:"210px",   align: "center", excel:true}//비고
            ],
            pager: "#outboundCarLoadingHGridNavi",
            gridComplete: function(){
            	//로딩시 그리드 데이터 1건이상이면 첫행에 포커스
                var ids = $outboundCarLoadingHGrid.jqGrid("getDataIDs");
                if (ids && ids.length > 0) {
                    $outboundCarLoadingHGrid.setFocus(0);
                }

                var rowData =  $outboundCarLoadingHGrid.getRowData(ids[0]);
                var data = {
                		waveNo		: rowData.WAVE_NO,
                		obNo		: rowData.OB_NO,
                		clientCd	: rowData.CLIENT_CD
                }

                if (firstLoad) {
                    fnListD(data);
                } else {

                	if(ids.length > 0){
                		$outboundCarLoadingDGrid.paragonGridSearch(data);
                	}else{
                		$outboundCarLoadingDGrid.jqGrid('clearGridData');
                	}

                }
            },
            onSelectRowEvent: function(currRowData, prevRowData){

                var data = {
                    waveNo	: currRowData.WAVE_NO, // 웨이브번호
                    obNo	: currRowData.OB_NO
                };
                $outboundCarLoadingDGrid.paragonGridSearch(data);
            },
        });
    }

    //상세 그리드 초기화
    function fnListD(data) {
        $outboundCarLoadingDGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundCarLoading/listOutboundCarloadingD",
            sortable		: true,
            rownumbers		: true,
            height			: "135",
            //rowEditable: true,
            shrinkToFit		: false,
            rowEditable		: true,
            cellEditable	: false,
            rowNum 			: 50000,
            multiselect: true,
//            multielonly: true,
            rowClickFocus	: true,
            postData		: data,
            domainId		: "OB_CARLD_DETAIL_LIST",
            colModel: [
                {editable: false, name: "COMPANY_CD",       width: "100px", align: "center", hidden: true},//회사번호
                {editable: false, name: "CLIENT_CD",        width: "100px", align: "center", hidden: true},//고객사
                {editable: false, name: "DC_CD",            width: "100px", align: "center", hidden: true},//물류센터
                {editable: false, name: "OB_NO",            width: "100px", align: "center", hidden: true},//출고번호
                {editable: false, name: "OB_PROG_ST_CD",    width: "90px", align: "right", hidden: true},//진행상태코드
                {editable: false, name: "OB_PROG_ST", 		width: "90px", align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObProgStCdOptions }
                },//진행상태코드
                {editable: false, name: "OB_DETAIL_SEQ",    width: "90px", align: "center", excel:true, hidden: false},//출고상세번호
                {editable: false, name: "PROMOTION_GBN",    width: "35px", align: "center", excel:true }, //행사구분
                {editable: false, name: "ITEM_CD",          width: "100px", align: "center", excel:true},//제품코드
                {editable: false, name: "ITEM_NM",          width: "150px", align: "left", excel:true},//제품명
                {editable: false, name: "UOM", 				width: "80px", align: "center", excel:true},//단위
                {editable: false, name: "PKQTY",        	width: "80px", align: "center", formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name: "PICK_QTY",     	width: "100px", align: "right", hidden: true},//피킹수량
                {editable: false, name: "PICK_TOT_QTY", 	width: "100px", align: "right", excelDataType :"integer", excel:true},//피킹수량
                {editable: false, name: "PICK_BOX_QTY", 	width: "100px", align: "right", excelDataType :"integer", excel:true},//박스
                {editable: false, name: "PICK_EA_QTY",  	width: "100px", align: "right", excelDataType :"integer", excel:true},//낱개
                {editable: false, name: "LOAD_QTY",     	width: "100px", align: "right", hidden: true},//상차수량
                {editable: false, name: "LOAD_TOT_QTY", 	width: "100px", align: "right", excelDataType :"integer", excel:true},//피킹수량
                {editable: true,  name: 'LOAD_BOX_QTY',     width:"100px", align:"right",   required:true, excelDataType :"integer", excel:true,
                        editoptions : {
                            maxlength : 11,
                            dataInit : function(el) {
                                var rowid = $(el)[0].attributes.rowid.value;
                                $(el).onlyNumber();
                                $(el).on('blur', function(e){
                                    if($outboundCarLoadingDGrid.getRow(rowid,"LOAD_BOX_QTY") == ''){
                                        $outboundCarLoadingDGrid.setCell("LOAD_BOX_QTY",0,rowid);
                                    }
                                    setLoadTotQty(rowid);

                                    var ids = $outboundCarLoadingDGrid.getDataIDs();
                                    for(var i = 0; i < ids.length; i++){
                                    	$outboundCarLoadingDGrid.jqGrid('saveRow', ids[i], true, 'clientArray');
                                    }

                            		fnTotalSum();

                                    gridIntLengthLimit($(this), e, 9);
                                });
                            }
                        }
                    },
                  {editable: false,  name:'LOAD_EA_QTY',       width:"100px", align:"right",  formatter: "integer", excelDataType :"integer", excel:true, //required:true,
                        editoptions : {
                            maxlength : 11,
                            dataInit : function(el) {
                                var rowid = $(el)[0].attributes.rowid.value;
                                $(el).onlyNumber();
                                $(el).on('keyup blur', function(e){
                                    if($outboundCarLoadingDGrid.getRow(rowid,"LOAD_EA_QTY") == ''){
                                        $outboundCarLoadingDGrid.setCell("LOAD_EA_QTY",0,rowid);
                                    }
                                    setLoadTotQty(rowid);

                                    gridIntLengthLimit($(this), e, 9);
                                });
                            }
                        }
                    },
                {editable: false, name: "WEIGHT",       width: "100px", align: "right" , formatter: "integer", excelDataType :"integer", excel:true},//중량
                {editable: false, name: "WAVE_NO",  	width: "100px", align: "center", hidden:true},//웨이브번호
                {editable: false, name: "ITEM_SPEC",    width: "100px", align: "center", excel:true},//제품규격
                {editable: false, name: "ITEM_ST",      width: "100px", align: "center", excel:true},//제품규격
/*                {
                    editable: false,
                    name: "ITEM_ST_CD",
                    width: "80px",
                    align: "center",
                    hidden: true,
                    edittype: 'select',
                    formatter: 'select',
                    editoptions: {
                        value: gridItemStCdOptions
                    }
                },//제품상태코드
                {
                    editable: false,
                     화면 컬럼 도메인명 처리 2017.08.08
                    //name: "ITEM_ST_CD",
                    name: "ITEM_ST",
                    width: "80px",
                    align: "center",
                    edittype: 'select',
                    formatter: 'select',
                    editoptions: {
                        value: gridItemStCdOptions
                    }
                },//제품상태코드
*/                {editable: false, name: "REMARK",   	width: "200px", align: "center", excel:true}//비고
            ],
//            pager: "#outboundCarLoadingDGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete: function () {
            	//그리드 로딩시 데이터 1건이상일때 첫행 포커스
                var ids = $outboundCarLoadingDGrid.jqGrid("getDataIDs");

                if (ids && ids.length > 0) {
                    $outboundCarLoadingDGrid.setFocus(0);
                }

                var data = $outboundCarLoadingDGrid.getRowData(ids[0]);

//                if (outboundCarLoadingDFlag) {
//                    fnOutboundCarLoadingPJsonGrid({obNo: data.OB_NO, obDetailSeq: data.OB_DETAIL_SEQ, clientCd: $("#outboundCarLoadingClientCd").val()});
//                    outboundCarLoadingDFlag = false;
//                } else {
//                    if (data.OB_NO !== null && data.OB_NO !== undefined) {
//                        $outboundCarLoadingPGrid.paragonGridSearch({ obNo: data.OB_NO, obDetailSeq: data.OB_DETAIL_SEQ, clientCd: $("#outboundCarLoadingClientCd").val() });
//                    } else {
//                        $outboundCarLoadingPGrid.paragonGridSearch({obNo: null, obDetailSeq: null });
//                    }
//                }


            	//그리드 아래 부분 합계
            	var $footRow = $outboundCarLoadingDGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['OB_PROG_ST','OB_DETAIL_SEQ','PROMOTION_GBN','ITEM_CD', 'ITEM_NM', 'UOM'];
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'DGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'DGrid_PKQTY"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;
            	}

    	    	//총합계
    	    	fnTotalSum();

            },
            onSelectRowEvent: function (currRowData, prevRowData) {

                var data = {
                    obNo: currRowData.OB_NO,
                    obDetailSeq: currRowData.OB_DETAIL_SEQ
                };
                $outboundCarLoadingPGrid.paragonGridSearch(data);
            },
            groupHeaders:[
                {
                    rowspan : true,
                    header:[
                        {start: 'PICK_TOT_QTY', length: 3 , domain:"PICK_QTY"},
                        {start: 'LOAD_TOT_QTY', length: 3 , domain:"LOAD_QTY"}
                    ]
                }
            ],
        });
    }


    //전체 재고 합계 조회
    function fnTotalSum(){
    	var $grid =$outboundCarLoadingDGrid;

    	$grid.jqGrid('footerData','set', { PICK_TOT_QTY 		: $grid.jqGrid('getCol', 'PICK_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PICK_BOX_QTY 		: $grid.jqGrid('getCol', 'PICK_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PICK_EA_QTY 		: $grid.jqGrid('getCol', 'PICK_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { LOAD_TOT_QTY 		: $grid.jqGrid('getCol', 'LOAD_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { LOAD_BOX_QTY 		: $grid.jqGrid('getCol', 'LOAD_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { LOAD_EA_QTY 		: $grid.jqGrid('getCol', 'LOAD_EA_QTY',false,'sum')});
    }

/*    //출하상차 PLT목록
    function fnOutboundCarLoadingPJsonGrid(data){
            $outboundCarLoadingPGrid.paragonGrid({
                url:"/ctrl/outbound/outboundCarLoading/getOutboundCarLoadingPList",
                sortable:   true,
                rownumbers: true,
                height: "172",
//                rowEditable: true,
                shrinkToFit: false,
                rowEditable:true,
                cellEditable:false,
                multiselect: true,
//                multielonly: true,
                domainId: "OB_CARLD_PLT_LIST",
                postData:data,
                colModel: [
					{editable: false, name: "OB_PROG_ST_CD",       width: "90px", align: "right", hidden: true},//진행상태코드
	                {
	                    editable: false, name: "OB_PROG_ST", width: "90px", align: "center",
	                    edittype: 'select', formatter: 'select',
	                    editoptions: {
	                        value: gridObProgStCdOptions
	                    }
	                },//진행상태코드
                    {editable: false,   name: "PICK_NO",         width:"100px", align: "center"},//피킹PLT_ID
                    {editable: false,   name: "PLT_ID",         width:"100px", align: "center"},//피킹PLT_ID
                    {editable: true,    name: "CARLD_PLT_ID",   width:"100px", align: "center", required:true,
                        editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                    },//상차PLT_ID
                ],
                pager: "#outboundCarLoadingPGridNavi"
            });
    }*/

    //이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('outboundCarLoadingObYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

        //고객사 팝업
        $("#outboundCarLoadingClientCdPopup").click(function(){
        	WMSUtil.popup.client(proNm + 'Client');
        });
        //배송처 팝업
        $("#outboundCarLoadingStoreCdBtn").click(function(){
        	WMSUtil.popup.store(proNm + 'Store', {clientCd : $('#'+proNm+'ClientCd').val()});
        });
        //실배송처 팝업
        $("#outboundCarLoadingRStoreCdBtn").click(function(){
        	WMSUtil.popup.store(proNm + 'RStore', {clientCd : $('#'+proNm+'ClientCd').val()});
        });
        //조회 버튼
        $("#outbuondCarLoadingSearchBtn").click(function(){
            fnSearch();
        });
        //일괄적용 버튼
        $("#outboundCarLoadingApplyBtn").click(function(){
            fnApplyInBatch();
        });
        //저장 버튼
        $("#outboundCarLoadingSaveBtn").click(function(){
            fnSave();
        });

        //저장 버튼
        $("#outbuondCarLoadingDetailSaveBtn").click(function(){
            fnSave2();
        });

        //일괄생성 버튼
        $('#outbuondCarLoadingTotalApplyBtn').click(function(){
        	fnBatchCreation();
        })

        //확정 버튼
        $("#outbuondCarLoadingConfirmBtn").click(function(){
            var prog = "FW";
            var comfirm = "comf";
            fnConfirm(prog, comfirm);
        });
        //확정취소 버튼
        $("#outbuondCarLoadingCancleBtn").click(function(){
            var prog = "BW";
            var comfirm = "cancel";
            fnConfirm(prog, comfirm);
        });

        //레포트 출력 버튼
        $("#outbuondCarLoadingReportBtn").click(function(){
            fnReport();
        });

        //엑셀 다운로드 버튼
        $("#outbuondCarLoadingExcelBtn").click(function(){
            var selectRow = $outboundCarLoadingPGrid.getGridParam('selrow');
            if(selectRow == null){
                if(null == $outboundCarLoadingDGrid.getGridParam('selrow')){
                    $outboundCarLoadingHGrid.downloadExcelAllItems();
                }else{
                    $outboundCarLoadingDGrid.downloadExcelAllItems();
                }
            }else{
                $outboundCarLoadingPGrid.downloadExcelAllItems();
            }
        });

        $outboundCarLoadingDGrid.on('mouseover', function(){
    		fnTotalSum();
    	})
    }

    //조회
    function fnSearch(){

        if($("#outboundCarLoadingClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#outboundCarLoadingClientCd").focus();
            return false;
        }else if($("#outboundCarLoadingClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#outboundCarLoadingClientCd").focus();
            return false;
        }

        if($("#outboundCarLoadingObYmdFr").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#outboundCarLoadingObYmdFr").focus();
            return false;
        }else if($("#outboundCarLoadingObYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#outboundCarLoadingObYmdFr").focus();
            return false;
        }

        if($("#outboundCarLoadingObYmdTo").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#outboundCarLoadingObYmdTo").focus();
            return false;
        }else if($("#outboundCarLoadingObYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#outboundCarLoadingObYmdTo").focus();
            return false;
        }

        $outboundCarLoadingHGrid.paragonGridSearch(sendData());
    }

    //일괄적용 버튼
    function fnApplyInBatch(){
        var ids = $outboundCarLoadingPGrid.jqGrid("getDataIDs");
        var gridId = $outboundCarLoadingPGrid.attr("id");

        if (ids && ids.length > 0) {

            //row 갯수 만큼 루프를 돈다.
            for(var i = 0; i < ids.length; i ++){
                //get row data
                var data = $outboundCarLoadingPGrid.getRowData(ids[i]);

                //파렛트 id에 값이 없을 경우와 또는 상차파렛트 값이 있는 경우 해당 row data는 로직 수행 하지 않는다.
                if(data.PLT_ID === "" || data.CARLD_PLT_ID !== ""){
                    continue;
                }

                //상차 파렛트 컬럼에 해당하는 데이터 복사.
                $outboundCarLoadingPGrid.jqGrid("setCell", ids[i], "CARLD_PLT_ID", data.PLT_ID);
                //플래그 값 Insert 대입.
                $outboundCarLoadingPGrid.jqGrid("setCell", ids[i], "MOD_FLAG", "UPDATE");
                //Mod check checking 화면에 표시.
                $outboundCarLoadingPGrid.jqGrid("setCell", ids[i], "MOD_CHECK", '<i class="fa fa-check"/>');

                //해당그리드 check box에 체크로직
                var checkBox = $("#jqg_" + gridId + "_" + ids[i]);

                if(!checkBox.is(":checked")){
                    checkBox.trigger("click");
                    checkBox.prop("checked", true);
                }
            }
        }

    }
    //저장 버튼
    function fnSave(){
        var saveUrl = "/ctrl/outbound/outboundCarLoading/updateOutboundCarloaingSavePltId";
        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?

        var rowData = {
            modFlag: "MOD_FLAG",
            pickNo: "PICK_NO",
            pltId: "PLT_ID",
            carldPltId: "CARLD_PLT_ID",
            obProgStCd: "OB_PROG_ST_CD"
        };

        var jsonData = $outboundCarLoadingPGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        if(!fnValidate()) return false;

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$outboundCarLoadingHGrid.paragonGridReload();
    	})
    }
    function fnValidate(){
        var ids = $outboundCarLoadingPGrid.getDataIDs();
        var rowFlag = "";
        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_outboundCarLoadingPGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $outboundCarLoadingPGrid.getRowData(ids[i]);

                rowFlag = rowdata.MOD_FLAG;

                if(!(rowdata.CARLD_PLT_ID)){
                    Util.alert('MSG_OUTRI_VAL_021'); //상차파레트ID 항목은 필수 입력 입니다.
                    return false;
                }
                if(rowdata.CARLD_PLT_ID.trim().length == 0 ){
                    Util.alert('MSG_OUTRI_VAL_022'); //상차파레트ID는 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                    Util.alert('MSG_COM_VAL_071', $outboundCarLoadingPGrid.getRowData(ids[i]).PICK_NO); //[ {0} ]은(는) 변경된 값이 없습니다.
                    return false;
                }

            }
        }
        return true;
    }

    //확정 버튼
    function fnConfirm(progData, comfirm){
        var saveUrl = "/ctrl/outbound/outboundCarLoading/updateOutboundCarloadingConfirm";
        var msg = "";
        var rowData = {
            clientCd: "CLIENT_CD",
            obNo: "OB_NO",//출고번호
            opRuleCd:"",
            prog: ""
        };

        //1. 체크된 리스트.
        var jsonData = $outboundCarLoadingHGrid.getSelectedJsonData("dt_data", rowData);

        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }
        var jsonObject = JSON.parse(jsonData);
        var rowid = $outboundCarLoadingHGrid.getGridParam("selrow");
        var obProgStCd = $outboundCarLoadingHGrid.getRowData(rowid).OB_PROG_ST_CD;

        jsonObject.prog = progData;

        //출하확정
        if(comfirm === "comf"){
            if(Number(obProgStCd) < 70){
                msg = "MSG_OUTRI_CFM_010"; //상차확정 하시겠습니까?
                jsonObject.opRuleCd = "2006";

                //ajax
                WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
                	$outboundCarLoadingHGrid.paragonGridReload();
            	})

            }else{
                Util.alert('MSG_OUTRI_ERR_012'); //출하상차 확정을 할 수 없습니다. 다시 확인 부탁드립니다.
                return false;
            }
        }else {
            //출하확정 취소
            if(Number(obProgStCd) === 70){
                msg = "MSG_OUTRI_CFM_011"; //상차취소 하시겠습니까?
                jsonObject.opRuleCd = "2006";

                //ajax
                WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
                	$outboundCarLoadingHGrid.paragonGridReload();
            	})

            }else{
                Util.alertCode('MSG_COM_VAL_072', 'OB_PROG_ST_CD', 70); //{0}상태만 취소가능합니다.
                return false;
            }
        }
    }


    function fnReport(){

        var reportFlag = $("#outboundCarLoadingReportCd option:selected").val();

        if(reportFlag == 10){	//상차지시서
        	var	sendData = {
        			grid		: $outboundCarLoadingHGrid,
        			url			: "/outboundCarLoadingReport",
        			key			: "OB_NO",
        			progSt		: 'OB_PROG_ST_CD',
        			progCd		: 60,
        			progFlag	: true,
        			errMsgCd	: 'MSG_COM_ERR_012',
        			//size		: "15",
        			data		: {
                        waveNo  : "WAVE_NO",
                        obNo	: "OB_NO"
        			},
        			addData : {
    					proCd	: 'PWMOB105E_R5',
    					type	: 'PDF'
        			}
        	};
        }
    	WMSUtil.fnReport(sendData);

    }

    //[Fn] 저장 버튼 이벤트
    function fnSave2(){
        var saveUrl = "/ctrl/outbound/outboundCarLoading/saveLoad";
        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?

        var rowData = {
            modFlag         : "MOD_FLAG",
            obNo            : "OB_NO",
            obDetailSeq     : "OB_DETAIL_SEQ",
            obProgStCd      : "OB_PROG_ST_CD",
            loadBoxQty      : "LOAD_BOX_QTY",
            loadEaQty       : "LOAD_EA_QTY",
            pkQty           : "PKQTY"
        };

        var jsonData = $outboundCarLoadingDGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        if(!fnValidate2()) return false;

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$outboundCarLoadingHGrid.paragonGridReload();
    	})
    }

    function fnValidate2(){
        var ids = $outboundCarLoadingDGrid.getDataIDs();
        var rowFlag = "";
        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_outboundCarLoadingPGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $outboundCarLoadingDGrid.getRowData(ids[i]);

                rowFlag = rowdata.MOD_FLAG;

                if(parseFloat(rowdata.LOAD_BOX_QTY) == 0 && parseFloat(rowdata.LOAD_EA_QTY) == 0){
                    Util.alert('MSG_INRI_VAL_039'); //검수환산수량, 낱개수량은 0을 초과하여 입력해야 합니다.
                    return false;
                }
                if(parseFloat(rowdata.LOAD_BOX_QTY) < 0 || parseFloat(rowdata.LOAD_EA_QTY) < 0){
                    Util.alert('MSG_INRI_VAL_040'); //검수환산수량, 낱개수량은 음수를 입력할 수 없습니다.
                    return false;
                }

                if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                    Util.alert('MSG_COM_VAL_071', $outboundCarLoadingDGrid.getRowData(ids[i]).PICK_NO); //[ {0} ]은(는) 변경된 값이 없습니다.
                    return false;
                }

            }
        }
        return true;
    }

    function setLoadTotQty(rowid){
        var loadTotQty = 0;

        var pkQty = Number($outboundCarLoadingDGrid.getRow(rowid,"PKQTY"));
        var box = Number($outboundCarLoadingDGrid.getRow(rowid,"LOAD_BOX_QTY"));
        var ea = Number($outboundCarLoadingDGrid.getRow(rowid,"LOAD_EA_QTY"));

        loadTotQty =  box * pkQty + ea;
        $outboundCarLoadingDGrid.setCell("LOAD_QTY",loadTotQty,rowid);
        $outboundCarLoadingDGrid.setCell("LOAD_TOT_QTY",loadTotQty,rowid);
    }

    //데이터
    function sendData(){
    	return {
            clientCd		: $("#outboundCarLoadingClientCd").val(),    //고객사
            obYmdFr			: WMSUtil.fnDateSetting.yyyymmdd($("#outboundCarLoadingObYmdFr").val()), //출고일자From
            obYmdTo			: WMSUtil.fnDateSetting.yyyymmdd($("#outboundCarLoadingObYmdTo").val()),   //출고일자To
            obNo			: $("#outboundCarLoadingObNo").val(),        //출고번호
            obGbnCd			: $("#outboundCarLoadingObGbnCd").val(),     //출고구분
            carNo			: $("#outboundCarLoadingCarNo").val(),       //차량번호
            deliveryDgr		: $("#outboundCarLoadingDeliveryDgr").val(), //배송차수
            storeCd			: $("#outboundCarLoadingStoreCd").val(),     //판매처
            obProgStCd		: $("#outboundCarLoadingObProgStCd option:selected").val(),  //진행상태
            soNo			: $("#outboundCarLoadingSoNo").val(),        //주문번호
            rstoreCd		: $("#outboundCarLoadingRStoreCd").val(),    //납품처
            waveNo			: $("#outboundCarLoadingWaveNo").val()    //웨이브
    	}
    }

    //일괄생성
    function fnBatchCreation (){

        var rowData = {
            //clientCd: "CLIENT_CD",
            obNo        : "OB_NO",
            obProgStCd  : "OB_PROG_ST_CD"
        };

        //1. 체크된 리스트.
        var jsonData = $outboundCarLoadingHGrid.getSelectedJsonData("dt_data", rowData);

        //유효성 검사
        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }
        var jsonObject = JSON.parse(jsonData);

        if(!confirm((Util.confirm('MSG_COM_CFM_016')).msgTxt)) return false; //일괄생성 하시겠습니까?

        App.prcsStart();
        $.ajax({
            url         : "/ctrl/outbound/outboundCarLoading/updateOutboundCarloadingBatchCreation",
            data        : jsonData,
            dataType    : "json",
            type        : "POST",
            cache       : false,
            contentType : 'application/json; charset=utf-8',
            success     : function(data){

                if(data.stsCd == 200){
                    alert(data.msgTxt);
                    fnSearch();
                }else{
                    alert(data.msgTxt);
                    return false;
                }

            }
        });

    }

}();

/********************************************************************
 * bootstrap-datepicker 달력오픈 중, 탭 이동시 달력 hide
 * Since   : 2017-08-29
 * 작성자  : Kim Seon Ho
 * 수정내역: 2017-09-08 Tab-menu 종료시 마우스 클릭 인식 안되, datepicker(hide) 가 안되던 현상 수정
 ********************************************************************/
$("li.active").siblings().click(function () {
    // trigger the datepicker
    $('.date').datepicker('hide');
});
$("li.active").live("click focusout", function (e) {
    // trigger the datepicker
    $('.date').datepicker('hide');
});

$(document).ready(function(){
    OutboundCarLoadingApp.init();
});
