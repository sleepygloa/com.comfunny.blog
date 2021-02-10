/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹[OutboundPickingApp]
 * Program Code     : PWMOB106E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Lee Sung Guk     2017. 4. 07.        First Draft.
*/
var OutboundPickingApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB106E';
	var proNm = 'obPicking';

    var $callBackInput;
    var $obPickingGrid = $("#obPickingGrid");
    var $obInstDGrid = $("#obPickingInstDetailGrid");
    var $obPickDGrid = $("#obPickingDetailGrid");

    var headerGridRowData;

    var gridObProgStCd;
    var gridObGbnCd;
    var gridItemStCd;
    var gridNobRsCd;
    var gridWorkStCd;
    var gridExportCountryCd;
    var gridDalatYn;
    var obProgStCombo;

    var instPlanQty = 0;

    var firstLoad = true;

    return {
        init: function(){

        	WMSUtil.fnCombo.selectBox('obPickingReportCd', 'PWMOB105E', '10');

        	obProgStCombo  			= WMSUtil.fnCombo.grid_selectBox_range('obPickingObProgStCd', 'OB_PROG_ST_CD', 6, 1);

        	gridObGbnCd				= WMSUtil.fnCombo.grid_selectBox('obPickingObGbnCd', 'OB_GBN_CD');

        	gridItemStCd			= WMSUtil.fnCombo.grid('ITEM_ST_CD');

        	gridNobRsCd				= WMSUtil.fnCombo.grid('NOB_RS_CD');

        	gridWorkStCd			= WMSUtil.fnCombo.grid('WORK_ST_CD');

            gridExportCountryCd	 	= WMSUtil.fnCombo.grid('COUNTRY_CD');

        	gridDalatYn	 			= WMSUtil.fnCombo.grid('YN','DESC');

            fnEvents();

            fnList();

        },callBackInput: function(){
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting(proNm+'ObYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

        //Popup Event.
        $("#obPickingClientCdPopup").click(function() {
        	WMSUtil.popup.client(proNm + 'Client');
        });

        //배송처 팝업
        $("#obPickingStoreCdBtn").click(function(){
          WMSUtil.popup.store(proNm + 'Store', {clientCd : $('#'+proNm+'ClientCd').val()});
        });

        //실배송처 팝업
        $("#obPickingRStoreCdBtn").click(function(){
          WMSUtil.popup.rstore(proNm + 'RStore', {clientCd : $('#'+proNm+'ClientCd').val()});
        });

        //조회 btn Event
        $("#obPickingSearchBtn").click(function(){
            fnSearch();
        });

        //레포트 출력
        $("#obPickingReportBtn").click(function(){
            fnReport();
        });

        //확정 btn Event
        $("#obPickingConfirmBtn").click(function(){
            var prog = "FW";
            var confirm = "CONFIRM";
            fnConfirm(prog, confirm);
        });

        //확정 취소 버튼 이벤트
        $("#obPickingCancleBtn").click(function(){
        	var prog = "BW";
        	var confirm = "cancel";
        	fnConfirm(prog, confirm);
        });

        //엑셀 다운로드
        $("#obPickingExcelBtn").click(function() {
            $obPickingGrid.downloadExcel();
        });

        //상세그리드 버튼
        //일괄적용 btn Event
        $("#obPickApplyBtn").click(function(){
            fnApplyInBatch();
        });

        //저장 버튼
        $("#obPickSaveBtn").click(function(){
            fnApplySave();
        });

       //추가버튼
        $("#obPickAddBtn").click(function(){
            fnPickAdd();
        });

        //일괄적용 삭제row btn Event
        $("#obPickDelBtn").click(function(){
            fnDelete();
        });

        //피킹 로케이션 일괄적용 저장btn Event
        $("#obPickTotalApplyBtn").click(function(){
            fnApplyTotalSave();
        });
    }

    //그리드 초기화
    function fnList(){
        $obPickingGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundPicking/listOutboundPicking",
            sortable		: true,
            rownumbers		: true,
            height			: "125",
            //rowEditable: true,
            shrinkToFit		: false,
            rowEditable		: true,
            cellEditable	: false,
            multiselect		: true,
//            multielonly: true,
            rowClickFocus	: true,
            domainId		: "OB_DETAIL_LIST",
            postData		: sendData(),
            colModel: [
                {editable: false, name: "COMPANY_CD",       width:"100px",  align: "center", hidden: true},
                {editable: false, name: "DC_CD",            width:"100px",  align: "center", hidden: true},
                {editable: false, name: "CLIENT_CD",        width:"100px",  align: "center", hidden: true},
                {editable: false, name: "CLIENT",           width:"100px",  align: "left"	},
                {editable: false, name: "OB_PROG_ST_CD",    width:"100px",  align: "center", hidden:true},
                {editable: false, name: "OB_PROG_ST",    	width:"100px",  align: "center",
                    edittype:'select', formatter:'select', editoptions: { value:obProgStCombo }
                },
                {editable: false, name: "WAVE_NO",          width:"90px",   align: "center"	},
                {editable: false, name: "OB_YMD",           width:"90px",   align: "center"	},
                {editable: false, name: "OB_NO",            width:"90px",   align: "center"	},
                {editable: false, name: "OB_DETAIL_SEQ",    width:"90px",   align: "center"	},
                {editable: false, name: "SO_NO",            width:"90px",   align: "center"	},
                {editable: false, name: "SO_YMD",           width:"90px",   align: "center"	},
                {editable: false, name: "OB_GBN_CD",        width:"80px",   align: "center", hidden: true},
                {editable: false, name: "OB_GBN",			width: "80px", 	align: "center",
                    edittype: 'select', formatter: 'select', editoptions: { value: gridObGbnCd }
                },
                {editable: false, name: "STORE_NM",         width:"150px",   align: "left"	},
                {editable: false, name: "RSTORE_NM",        width:"150px",   align: "left"	},
                {editable: false, name: "CAR_NO",           width:"80px",    align: "center"},
                {editable: false, name: "DELIVERY_DGR",     width:"50px",    align: "center", hidden: true },
                {editable: false, name: "PROMOTION_GBN",   	width:"35px", 	 align: "center"},
                {editable: false, name: "ITEM_CD",          width:"100px",   align: "center"},
                {editable: false, name: "ITEM_NM",          width:"150px",   align: "left"	},
                {editable: false, name: "CONV_UOM_QTY",     width:"100px",   align: "center", hidden: true},
                {editable: false, name: "PKQTY",            width:"50px",    align: "center"},
                {editable: false, name: "UOM",              width:"80px",    align: "center"},
                {editable: false, name: "CONV_UOM_CD",      width:"100px",   align: "center", hidden: true},
                {editable: false, name: "INST_QTY",         width:"100px",   align: "right",  hidden: true},
                {editable: false, name: "INST_TOT_QTY",     width:"100px",   align: "right"},
                {editable: false, name: "INST_BOX_QTY",     width:"100px",   align: "right"},
                {editable: false, name: "INST_EA_QTY",      width:"100px",   align: "right"},
                {editable: false, name: "PICK_QTY",         width:"100px",   align: "right", hidden: true},
                {editable: false, name: "PICK_TOT_QTY",     width:"100px",   align: "right"},
                {editable: false, name: "PICK_BOX_QTY",     width:"100px",   align: "right",
                    editoptions : {
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).blur(function(){
                                if($obPickingGrid.getRow(rowid,"PICK_BOX_QTY") == ''){
                                    $obPickingGrid.setCell("PICK_BOX_QTY",0,rowid);
                                }
                                setPickTotQty(rowid);
                            });
                        }
                    }
                },
                {editable: false, name: "PICK_EA_QTY",       width:"100px",   align: "right",
                    editoptions : {
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).blur(function(){
                                if($obPickingGrid.getRow(rowid,"PICK_EA_QTY") == ''){
                                    $obPickingGrid.setCell("PICK_EA_QTY",0,rowid);
                                }
                                setPickTotQty(rowid);
                            });
                        }
                    }
                },
                {editable: false, name: "NOB_RS_CD",     	width:"100px",   align: "center", hidden: true},
                {editable: true,  name: "NOB_RS", 			width:"100px", 	 align: "center",
//                ,   required:true
                    edittype:'select', formatter:'select', editoptions: { value:gridNobRsCd }
                },
                {editable: false, name: "ITEM_SPEC",        width:"100px",  align: "center"},
                {editable: false, name: "ITEM_ST_CD",       width:"100px",  align: "center", hidden: true},
                {editable: false, name: "ITEM_ST",       	width:"80px",   align: "center",
                    edittype:'select', formatter:'select', editoptions: { value:gridItemStCd }
                },
                {editable: false, name: "STORE_CD",         width:"100px",   align: "center"},
                {editable: false, name: "RSTORE_CD",        width:"100px",   align: "center"},
                {editable: false, name: "NOB_RS_QTY",       width:"100px",   align: "center", hidden: true},
                {editable: false, name: "LOT_ATTR1",        width:"100px",   align: "center", hidden: true},
                {editable: false, name: "LOT_ATTR2",        width:"100px",   align: "center", hidden: true}
            ],
            groupHeaders:[
                {
                    rowspan : true,
                    header:[
                        {start: 'INST_TOT_QTY', length: 3 , domain:"INST_QTY"},
                        {start: 'PICK_TOT_QTY', length: 3 , domain:"PICK_QTY"}
                    ]
                }
            ],
            pager: "#obPickingGridNavi",
        	gridComplete: function(){

        		//처음 로딩시 데이터 1건이상이면 첫행 포커스
        		var ids = $obPickingGrid.jqGrid("getDataIDs");

        		if (ids && ids.length > 0) {
        			$obPickingGrid.setFocus(0);
        		}

    			var rowData = $obPickingGrid.getRowData(ids[0]);

    			var data = {
    					pkQty			: rowData.PKQTY,
    					uom  			: rowData.UOM,
    					obNo 			: rowData.OB_NO,
    					obDetailSeq 	: rowData.OB_DETAIL_SEQ,
    					clientCd 		: rowData.CLIENT_CD,
    					nobRsQty 		: rowData.NOB_RS_QTY,
//                    instPlanQty : rowData.INST_TOT_QTY,
    					itemCd 			: rowData.ITEM_CD,
    					itemStCd		: rowData.ITEM_ST_CD
    			}

    			if(firstLoad){
    				fnListObInstD(data);
    				fnListObPickD(data);

    				firstLoad = false;
    			}else{
    				if(ids.length > 0){
    					$obInstDGrid.paragonGridSearch(data);
    					$obPickDGrid.paragonGridSearch(data);
    				}else{
    					$obInstDGrid.jqGrid('clearGridData');
    					$obPickDGrid.jqGrid('clearGridData');
    				}
    			}
        	},
        	onSelectRowEvent: function(currRowData, prevRowData){

        		headerGridRowData = currRowData;

        		//??
        		instPlanQty = Number(currRowData.INST_TOT_QTY);

        		var data = {
        				obNo		: currRowData.OB_NO,
        				obDetailSeq	: currRowData.OB_DETAIL_SEQ,
        				instQty		: currRowData.INST_TOT_QTY,
        				itemCd		: currRowData.ITEM_CD,
        				itemStCd	: currRowData.ITEM_ST_CD,
        				pkQty		: currRowData.PKQTY
        		};

        		$obInstDGrid.paragonGridSearch(data);
        		$obPickDGrid.paragonGridSearch(data);
        	}
        });
    }


    //지시 그리드 초기화
    function fnListObInstD(data){
        $obInstDGrid.paragonGrid({
            url				: '/ctrl/outbound/outboundPicking/listOutboundPickingInstGrid',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
//            multiselect:true,
//            multielonly:true,
            rowClickFocus	: true,
            postData		: data,
            height			: '116',
            colModel: [
               {editable: false, name: "OB_INST_NO",   			width:"100px", fixed: true , align: "center"},
               {editable: false, name: "INST_LOC_CD",  			width:"100px", fixed: true , align: "center"},
               {editable: false, name: "PLT_ID",       			width:"100px", fixed: true , align: "center"},
               {editable: false, name: "OB_NO",   				width:"100px", fixed: true , align: "center", hidden:true},
               {editable: false, name: "OB_DETAIL_SEQ",   		width:"100px", fixed: true , align: "center", hidden:true},
               {editable: false, name: "PKQTY",            		width:"50px",  				 align: "center"},
               {editable: false, name: "UOM",              		width:"80px",    			 align: "center"},
               {editable: false, name: "INST_QTY", 				width:"100px", fixed: true , align: "right", hidden: true},
               {editable: false, name: "INST_TOT_QTY", 			width:"100px", fixed: true , align: "right"},
               {editable: false, name: "INST_BOX_QTY", 			width:"100px", fixed: true , align: "right"},
               {editable: false, name: "INST_EA_QTY",  			width:"100px", fixed: true , align: "right"},
               {editable: false, name: "WORK_ST_CD",   			width:"100px", fixed: true , align: "center", hidden:true},
               {editable: false, name: "WORK_ST", 				width:"100px", fixed: true , align: "center",
                   edittype:'select', formatter:'select', editoptions: { value:gridWorkStCd }
               },
               {editable: true,  name:'MAKE_LOT', 				width:"100px", 				 align:"center",
                   editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
               },
               {editable: true,  name:'MAKE_YMD', 				width:"100px", 				 align:"center",
                   editoptions : {
                       maxlength:10,
                       dataInit : function(el) {
                           $(el).datepicker();
                           $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 10); }) } }
               },
               {editable: true,  name:'DIST_EXPIRY_YMD', 		width:"100px", align:"center",
                   editoptions : {
                       maxlength:10,
                       dataInit : function(el) {
                           $(el).datepicker();
                           $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 10); }) } }
               },
               {editable: false, name: "LOT_ID",       			width:"100px", fixed: true , align: "center"},
               {editable: true,  name: 'LOT_ATTR1',				width:"100px",  			 align: "center",
                   edittype:'select', formatter:'select', editoptions: { value : gridExportCountryCd }
               },
               {editable: true,  name: 'LOT_ATTR2',      		width:"100px",  				 align:"center",
                   edittype:'select', formatter:'select', editoptions: { value : gridDalatYn }
               },
               {editable: true,  name: 'LOT_ATTR3',				width:"100px", 				 align:"center",
                   editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
               },
               {editable: true,  name: 'LOT_ATTR4', 			width:"100px", 				 align:"center",
                   editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
               },
               {editable: true,  name: 'LOT_ATTR5', 			width:"100px", 				 align:"center",
                   editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
               },
               {editable: false, name: "REMARK",       			width:"100px", fixed: true ,  align: "center"},
               {editable: false, name: "PICK_ZONE_LOC_CD",      width:"100px", fixed: true , align: "center", hidden:true}
           ],
            pager			: "#obPickingInstDetailGridNavi",
            domainId		:"OB_INST_LIST",
//            ondblClickCustom: function(id, iRow, iCol, e){
//                var progStCd = $obPickingGrid.focusRowData("IB_PROG_ST_CD");
//                if(progStCd == '50'){
//                    Util.alertCode('MSG_COM_VAL_064', 'OB_PROG_ST_CD', 50); //{0}상태는 수정 할 수 없습니다.
//                    return false;
//                }
//            },
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'INST_TOT_QTY', length: 3 , domain:"INST_QTY" }
                              ]
                          }]
        });
    }

    //출고피킹 상세그리드 초기화
    function fnListObPickD(data){
        $obPickDGrid.paragonGrid({
            url				: '/ctrl/outbound/outboundPicking/listOutboundPickingPickGrid',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
            rowClickFocus	: true,
            postData		: data,
            height			: '116',
            colModel		: [
                {editable: false, name: "OB_INST_NO",   	width:"100px", fixed: true , align: "center", 	hidden:true},
                {editable: false, name: 'PICK_NO', 			width:"100px", 				 align:"center", 	hidden:false},
                {editable: true,  name: 'PICK_LOC_CD', 		width:"100px", 				 align:"center", 	disabled:true,
                	required:true,
                    editoptions : { maxlength:20, dataEvents : function(el, e) { gridTextLengthLimit($(el), e, 20); }},
                    searchBtnClick : function(value, rowid, colid) {
                        fnGridLocPop(rowid);
                        }
                    },
                {editable: false, name: "OB_NO",   			width:"100px", fixed: true , align: "center",	hidden:true},
                {editable: false, name: "OB_DETAIL_SEQ",    width:"100px", fixed: true , align: "center", 	hidden:true},
                {editable: false, name: "PKQTY",            width:"50px", 				 align: "center"	},
//              {editable: false, name: "CONV_UOM_CD",      width:"100px", 				align: "center", hidden: true},
                {editable: false, name: "UOM",              width:"80px", 				 align: "center"	},
                {editable: false, name:'PICK_TOT_QTY',		width:"100px",				 align: "right"		},
                {editable: true,  name:'PICK_BOX_QTY', 		width:"100px", 				 align: "right",
                	required:true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).on('keyup blur', function(e){
                                if($obPickDGrid.getRow(rowid,"PICK_BOX_QTY") == ''){
                                    $obPickDGrid.setCell("PICK_BOX_QTY",0,rowid);
                                }
                                setPickTotQty(rowid);

                                gridIntLengthLimit($(this), e, 9);
                            });
                        }
                    },
                },
                {editable: true,  name:'PICK_EA_QTY', 		width:"100px", 				 align:"right",
                	required:true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).on('keyup blur', function(e){
                                if($obPickDGrid.getRow(rowid,"PICK_EA_QTY") == ''){
                                    $obPickDGrid.setCell("PICK_EA_QTY",0,rowid);
                                }
                                setPickTotQty(rowid);

                                gridIntLengthLimit($(this), e, 9);
                            });
                        }
                    },
                },
//                {editable: true,  name:'PICK_ZONE_LOC_CD', 	width:"100px", 				 align:"center", disabled:true,
//                	required:true,
//                    editoptions : { maxlength:20, dataEvents : function(el, e) { gridTextLengthLimit($(el), e, 20); }},
//                    searchBtnClick : function(value, rowid, colid) {
//                        fnLocPop(rowid);
//                        },
//                },
                {editable: false, name: 'WORK_ST_CD', 		width:"100px", hidden:true},
                {editable: false, name: "WORK_ST", 			width:"100px", fixed: true , align: "center",
                    edittype:'select', formatter:'select', editoptions: { value:gridWorkStCd }
                },
                {editable: false, name:'MAKE_LOT', 			width:"100px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false, name:'MAKE_YMD', 			width:"100px", align:"center",
                    editoptions : {
                        maxlength:10,
                        dataInit : function(el) {
                            $(el).datepicker();
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 10); }) } }
                },
                {editable: false, name:'DIST_EXPIRY_YMD', 	width:"100px", align:"center",
                    editoptions : {
                        maxlength:10,
                        dataInit : function(el) {
                            $(el).datepicker();
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 10); }) } }
                },
                {editable: false,name:'PLT_ID',				width:"150px", align:"center",
                    editoptions : { maxlength:20, dataEvents : function(el, e) { gridTextLengthLimit($(el), e, 20); }},
                    searchBtnClick : function(value, rowid, colid) {
                        fnPalletPop(rowid);
                        }, disabled:true
                    },
                {editable: false,name:'LOT_ID',				width:"100px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false, name:'LOT_ATTR1',			width:"100px",  align:"center",
                    edittype:'select', formatter:'select', editoptions: { value : gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2',      	width:"100px",  align:"center",
                    edittype:'select', formatter:'select', editoptions: { value : gridDalatYn }
                },
                {editable: false,name:'LOT_ATTR3', 			width:"100px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false,name:'LOT_ATTR4', 			width:"100px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false,name:'LOT_ATTR5', 			width:"100px", align:"center",
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false, name: "REMARK", 			width:"100px", fixed: true , align: "center"},
                {editable: false, name: "NOB_RS_CD",    	width:"100px", 				 align: "center", hidden: true},
                {editable: true,  name: "NOB_RS", 			width:"100px", 				 align: "center", hidden: true,
//                    required:true,
                    edittype:'select', formatter:'select', editoptions: { value:gridNobRsCd }
                },
            ],
            pager			: "#obPickingDetailGridNavi",
            domainId		: "OB_PICK_LOC_LIST",
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'PICK_TOT_QTY', length: 3 , domain:"PICK_QTY" }
                              ]
                          }]
        });
    }


    //레포트 출력
    function fnReport(){
        var reportFlag = $("#obPickingReportCd option:selected").val();

        if(reportFlag == 10){	//피킹지시서
        	var	sendData = {
        			grid		: $obPickingGrid,
        			url			: '/outboundPickingReport',
        			key			: "OB_NO",
        			progSt		: 'OB_PROG_ST_CD',
        			progCd		: 50,
        			progFlag	: true,
        			errMsgCd	: 'MSG_COM_VAL_091', //지시 상태에서만 출력 하실 수 있습니다.
        			//size		: "15",
        			data		: {
        				waveNo        : "WAVE_NO",
        				obNo		  : "OB_NO",
        				obDetailSeq	  : "OB_DETAIL_SEQ",
        			},
        			addData : {
        				proCd	: 'PWMOB105E_R1',
        				type	: 'PDF'
        			}
        	};
        }else if(reportFlag == 50){	//상차지시서
        	var	sendData = {
        			grid		: $obPickingGrid,
        			url			: '/outboundInstCarLoadingReport',
        			key			: "OB_NO",
        			progSt		: 'OB_PROG_ST_CD',
        			progCd		: 50,
        			progFlag	: true,
        			errMsgCd	: 'MSG_COM_VAL_091',  //지시 상태에서만 출력 하실 수 있습니다.
        			//size		: "15",
        			data		: {
        				waveNo        : "WAVE_NO",
        				obNo		  : "OB_NO",
        				obDetailSeq	  : "OB_DETAIL_SEQ",
        			},
        			addData : {
        				proCd	: 'PWMOB105E_R5',
        				type	: 'PDF'
        			}
        	};
        }

        WMSUtil.fnReport(sendData);
    }




    //조회
    function fnSearch(){

        if($("#obPickingClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obPickingClientCd").focus();
            return false;
        }else if($("#obPickingClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obPickingClientCd").focus();
            return false;
        }

        if($("#obPickingObYmdFr").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obPickingObYmdFr").focus();
            return false;
        }else if($("#obPickingObYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obPickingObYmdFr").focus();
            return false;
        }

        if($("#obPickingObYmdTo").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obPickingObYmdTo").focus();
            return false;
        }else if($("#obPickingObYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obPickingObYmdTo").focus();
            return false;
        }

        var data = {
            clientCd		: $("#obPickingClientCd").val(),
            obYmdFr			: WMSUtil.fnDateSetting.yyyymmdd($("#obPickingObYmdFr").val()),
            obYmdTo			: WMSUtil.fnDateSetting.yyyymmdd($("#obPickingObYmdTo").val()),
            obNo			: $("#obPickingObNo").val(),
            obGbnCd			: $("#obPickingObGbnCd").val(),
            carNo			: $("#obPickingCarNo").val(),
            deliveryDgr		: $("#obPickingDeliveryDgr").val(),
            storeCd			: $("#obPickingStoreCd").val(),
            obProgStCd		: $("#obPickingObProgStCd option:selected").val(),
            soNo			: $("#obPickingSoNo").val(),
            rstoreCd		: $("#obPickingRStoreCd").val(),
            pickNo			: $("#obPickingSeqNo").val(),
            pickLocCd		: $("#obPickingLoc").val(),
            waveNo			: $("#obPickingWaveNo").val(),
            pickingNo		: $("#obPickingNo").val()
        };
        $obPickingGrid.paragonGridSearch(data);
    }

    //확정
    function fnConfirm(progData, confirm){
//        $obPickDGrid
        var saveUrl = "/ctrl/outbound/outboundPicking/updateOutboundPickingConfirm";
        var msg = "";
        var vObInstNo = "";
        var rowData = {
            modFlag		: "MOD_FLAG",
            clientCd	: "CLIENT_CD",
            pickBoxQty	: "PICK_BOX_QTY",
            pickEaQty	: "PICK_EA_QTY",
            convUomQty	: "CONV_UOM_QTY",
            obNo		: "OB_NO",
            obDetailSeq	: "OB_DETAIL_SEQ",
            obInstNo	: "OB_INST_NO",
            workStCd	: "OB_PROG_ST",
            nobRsCd		: "NOB_RS_CD",
            pickLocCd	: "PICK_LOC_CD",
            pltId		: "PLT_ID",
            carldPltId	: "CARLD_PLT_ID",
            lotId		: "LOT_ID",
            opRuleCd	: "",
            prog		: "",
            nobRs		: "NOB_RS",
            itemNm		: "ITEM_NM"
        };

        if(confirm == "CONFIRM"){
        	rowData["obInstNo"] = "OB_INST_NO";
        }else{
        	rowData["obInstNo"] = "PICK_NO";
        }


        //1. 체크된 리스트.
        var jsonData = $obPickingGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        //2. 피킹 로케이션목록 항목 체크
//        var pickJsonData = $obPickDGrid.jqGrid("getDataIDs");
//        if(pickJsonData.length == 0){
//           Util.alert('MSG_OUTRI_ERR_017'); //피킹 로케이션 목록의 피킹 수량을 추가해야합니다.
//        return false;
//        }else{
//            var calPickTotQty = 0;
//            for(var rowid in pickJsonData){
//                calPickTotQty += $obPickingGrid.getRowData(rowid).PICK_TOT_QTY;
//            }
//            var calInstTotQty = $obPickingGrid.getRowData(0).INST_TOT_QTY;
//
//            if(calInstTotQty != calPickTotQty){
//                Util.alert('MSG_OUTRI_ERR_018'); //출고지시의 지시총수량과 피킹 로케이션의 피킹총수량이 같아야합니다.
//            }
//        }
//        if(nobRsQty > 0){
//
////            alert("미출고 사유 입력");
//            if(!fnValidate(confirm)) return false; //미출고사유 유효성검사
//
//        }

//        var rowid = $ibExamHGrid.getGridParam("selarrrow");
//        var ibProgStCd = [];
//        for (var i = 0; i < rowid.length; i++) {
//            var prog = ((gbn == "A") ? 'FW' : 'BW');
//            var eQty = $ibExamHGrid.getRowData(rowid[i]).EXAM_QTY;
//            if(eQty==0){
//                Util.alert('MSG_INRI_ERR_005'); //검수수량이 없습니다.
//                return false;
//            }
//            $ibExamHGrid.jqGrid('setCell',rowid[i],'PROG',prog);
//            ibProgStCd.push(Number($ibExamHGrid.getRowData(rowid[i]).IB_PROG_ST_CD));
//        }
//
//        var chkData = $ibExamHGrid.getSelectedJsonData("dt_exam",rowData);


        var jsonObject 	= JSON.parse(jsonData);
        var rowid 		= $obPickingGrid.getGridParam("selrow");
        var rowData 	= $obPickingGrid.getRowData(rowid);
        var obProgStCd 	= rowData.OB_PROG_ST_CD;

        jsonObject.prog = progData;

        //출고피킹
        if(confirm == "CONFIRM"){
        	var pickJsonData = $obPickDGrid.jqGrid("getDataIDs");
        	if(pickJsonData.length == 0){
        		if (!confirm((Util.confirm('MSG_OUTRI_VAL_070')).msgTxt)) return false; //피킹 수량이 0 인 데이터가 포함되어있습니다. 진행하시겠습니까?
        	}else if(Number(obProgStCd) < 60){
                msg = "MSG_OUTRI_CFM_008"; //피킹확정 하시겠습니까?

                jsonObject.opRuleCd = "2005";
                if(Number(rowData.NOB_RS_QTY) > 0){
//                  alert("미출고 사유 입력");
                  if(!fnValidate(confirm)) return false; //미출고사유 유효성검사

                  //ECOLAB사용 미출고 수량이 있으면 피킹 안됨.
                  Util.alert('MSG_OUTRI_ERR_019'); //미출고 수량있습니다. 피킹 확정 할수 없습니다.
                  return

              }

            }else{
                Util.alertCode('MSG_COM_VAL_068', 'OB_PROG_ST_CD', 50); //{0}상태만 확정가능합니다.
                return false;
            }
        }else {
            //출고 취소
            if(Number(obProgStCd) == 60){
                msg = "MSG_OUTRI_CFM_009"; //피킹취소 하시겠습니까?

                jsonObject.opRuleCd = "2005";

            }else{
                Util.alertCode('MSG_COM_VAL_072', 'OB_PROG_ST_CD', 60); //{0}상태만 취소가능합니다.
                return false;
            }
        }

        //ajax
        WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
        	$obPickingGrid.paragonGridReload();
    	})
    }

    //[Fn] 일괄적용 버튼 이벤트
    function fnApplyInBatch(){

    	//유효성검사
    	//header grid에서 지시일때만 추가
//    	var hGridData = $obPickingGrid.getGridParams('serrow');
//    	var obProgStCd = hGridData.OB_PROG_ST_CD;
//    	if(obProgStCd == 60){
//    		Util.alert('MSG_OUTRI_VAL_064'); //피킹 상태에서만 수정 가능합니다
//    		return false;
//    	}


    	//지시테이블의 순서그래도 피킹 테이블에 입력
    	//지시테이블에서 읽는 순서는 위에서 아래로 1->15 row 순서지만
    	//피킹테이블에서 그릴땐 최상위에서 계속 추가하기 때문에 15->1 순서로 추가됨.
        var stockJsonRow = $obInstDGrid.getRowData();
        var cnt  = stockJsonRow.length;

        for(var i = cnt - 1 ; i >= 0; i--){
            fnAddPickGrid(stockJsonRow[i]);
        }
    }

    //일괄추가 및 신규추가 저장 버튼 이벤트
    function fnApplySave(){
        var msg="";
        var rowData = {
                modFlag			: "MOD_FLAG",
                clientCd		: "CLIENT_CD",
                pickLocCd		: "PICK_LOC_CD",
                //pickZoneLocCd	: "PICK_ZONE_LOC_CD",
                obNo			: "OB_NO",
                obDetailSeq		: "OB_DETAIL_SEQ",
                obInstNo		: "OB_INST_NO",
                obWorkNo 		: "PICK_NO",
                itemCd			: "ITEM_CD",
                itemNm			: "ITEM_NM",
                itemSpec		: "ITEM_SPEC",
                itemStCd		: "ITEM_ST_CD",
                pkQty			: "PKQTY",
                uom				: "UOM",
                pickQty			: "PICK_QTY",
                pickBoxQty		: "PICK_BOX_QTY",
                pickEaQty		: "PICK_EA_QTY",
                weight			: "WEIGHT",
                ibYmd			: "IB_YMD",
                makeLot			: "MAKE_LOT",
                makeYmd			: "MAKE_YMD",
                distExpiryYmd	: "DIST_EXPIRY_YMD",
                lotId			: "LOT_ID",
                pltId			: "PLT_ID",
                remark			: "REMARK",
                lotAttr1		: "LOT_ATTR1",
                lotAttr2		: "LOT_ATTR2",
                lotAttr3		: "LOT_ATTR3",
                lotAttr4		: "LOT_ATTR4",
                lotAttr5		: "LOT_ATTR5",
            };


        var hGrid = $obPickingGrid.getGridParam('selrow');
        var hRowData = $obPickingGrid.getRowData(hGrid);
//        hRowData.OB_GBN_CD;

        //피킹 상세 체크 확인
//        if(!$obPickingGrid.getSelectedJsonData()){
//            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
//            return false;
//        }

        var chkData = $obPickDGrid.getSelectedJsonData("dt_pick",rowData);

        if(chkData == false){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var rowFlag = "";

        var selectedRow;
        var pickTotQty = 0;
        var pickInstTotQty = 0;

//        var rowDatas = $obPickDGrid.getRowData();
        var ids = $obPickDGrid.getDataIDs();
        var idx = $obPickDGrid.getGridParam('selarrrow');

        //피킹로케이션수량 확인
        if(ids.length != 0){

        	//row 들의 피킹총수량의 합
        	var pickTotQty = 0;
        	for(var i = 0; i < idx.length; i++){
        		var rowData = $obPickDGrid.getRowData(ids[i]);
        		pickTotQty += Number(rowData.PICK_TOT_QTY);
        	}

            if(pickTotQty > instPlanQty){
                Util.alert('MSG_OUTRI_ERR_011'); //피킹로케이션 수량은 지시수량 이상으로 저장 할 수 없습니다.
                return false;
            }
        }

//        //피킹로케이션수량 체크
//        for(var index in rowDatas){
//
//            for(var i=0; i < ids.length; i++){
//                    selectedRow =  $obPickDGrid.getRowData(ids[i]);
//                    pickTotQty += Number(selectedRow.PICK_TOT_QTY);
//            }
//
//            if(pickTotQty > instPlanQty){
//                Util.alert('MSG_OUTRI_ERR_011'); //피킹로케이션 수량은 지시수량 이상으로 저장 할 수 없습니다.
//                return false;
//            }
//
//            pickTotQty = 0;
//        }

        //선택한 데이터
        var idx = $obPickDGrid.getGridParam('selarrrow');

        //수정모드 그리드 모두 저장모드로 변경
        for(var i = 0; i < idx.length; i++){
        	$obPickDGrid.jqGrid('saveRow', idx[i], true, 'clientArray');
        }

        var valiFlag = false;
        $.each(idx, function(index, value){
        	var rowdata = $obPickDGrid.getRowData(value);

        	if(!(rowdata.PICK_LOC_CD)){
                Util.alert('MSG_OUTRI_VAL_033'); //피킹로케이션코드 항목은 필수 입력입니다.
                valiFlag = true;
                return false;
            }
            if(rowdata.PICK_LOC_CD.trim().length == 0 ){
                Util.alert('MSG_OUTRI_VAL_034'); //피킹로케이션코드는 공백만으로 입력할 수 없습니다.
                valiFlag = true;
                return false;
            }
            /*
  			if(!(rowdata.PICK_ZONE_LOC_CD)){
            	Util.alert("MSG_OUTRI_VAL_062"); //피킹존로케이션코드 항목은 필수 입력입니다.
            	valiFlag = true;
                return false;
            }
            if(rowdata.PICK_ZONE_LOC_CD.trim().length == 0 ){
            	Util.alert("MSG_OUTRI_VAL_063"); //피킹존로케이션코드는 공백만으로 입력할 수 없습니다.
            	valiFlag = true;
                return false;
            }*/
            if(!(rowdata.PLT_ID)){
                Util.alert('MSG_OUTRI_VAL_031'); //파레트ID 항목은 필수 입력입니다.
                valiFlag = true;
                return false;
            }
            if(rowdata.PLT_ID.trim().length == 0 ){
                Util.alert('MSG_OUTRI_VAL_032'); //파레트ID는 공백만으로 입력할 수 없습니다.
                valiFlag = true;
                return false;
            }
            if(!(rowdata.PICK_BOX_QTY)){
                Util.alert('MSG_OUTRI_VAL_035'); //피킹환산수량 항목은 필수 입력입니다.
                valiFlag = true;
                return false;
            }
            if(rowdata.PICK_BOX_QTY.trim().length == 0 ){
                Util.alert('MSG_OUTRI_VAL_036'); //피킹환산수량은 공백만으로 입력할 수 없습니다.
                valiFlag = true;
                return false;
            }
            if(!(rowdata.PICK_EA_QTY)){
                Util.alert('MSG_OUTRI_VAL_037'); //피킹낱개수량은 항목은 필수 입력입니다.
                valiFlag = true;
                return false;
            }
            if(rowdata.PICK_EA_QTY.trim().length == 0 ){
                Util.alert('MSG_OUTRI_VAL_038'); //피킹낱개수량은 공백만으로 입력할 수 없습니다.
                valiFlag = true;
                return false;
            }
            if(parseFloat(rowdata.PICK_BOX_QTY) == 0 && parseFloat(rowdata.PICK_EA_QTY) == 0){
                Util.alert('MSG_OUTRI_VAL_039'); //피킹환산수량, 낱개수량은 0을 초과하여 입력해야 합니다.
                valiFlag = true;
                return false;
            }
            if(parseFloat(rowdata.PICK_BOX_QTY) < 0 || parseFloat(rowdata.PICK_EA_QTY) < 0){
                Util.alert('MSG_OUTRI_VAL_040'); //피킹환산수량, 낱개수량 음수를 입력할 수 없습니다.
                valiFlag = true;
                return false;
            }
//            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
//                Util.alert('MSG_COM_VAL_071', rowdata.PICK_NO); //[ {0} ]은(는) 변경된 값이 없습니다.
//                valiFlag = true;
//                return false;
//            }

            if(rowdata.WORK_ST_CD == "30"){
                Util.alertCode('MSG_COM_VAL_079', 'WORK_ST_CD', 30); //{0}상태는 저장 할 수 없습니다.
                valiFlag = true;
                return false;
            }
        });
        if(valiFlag) return false;



//        for(var i=0; i < ids.length; i++){
//
//
//
//            if($("input:checkbox[id='jqg_obPickingDetailGrid_"+ids[i]+"']").is(":checked")){
//                var rowdata = $obPickDGrid.getRowData(ids[i]);
//
//                rowFlag = rowdata.MOD_FLAG;
//
//                if(!(rowdata.PICK_LOC_CD)){
//                    Util.alert('MSG_OUTRI_VAL_033'); //피킹로케이션코드 항목은 필수 입력입니다.
//                    return false;
//                }
//                if(rowdata.PICK_LOC_CD.trim().length == 0 ){
//                    Util.alert('MSG_OUTRI_VAL_034'); //피킹로케이션코드는 공백만으로 입력할 수 없습니다.
//                    return false;
//                }
//                if(!(rowdata.PICK_ZONE_LOC_CD)){
//                	alert("피킹존로케이션코드 항목은 필수 입력입니다."); //Util.alert('MSG_OUTRI_VAL_033'); //피킹로케이션코드 항목은 필수 입력입니다.
//                    return false;
//                }
//                if(rowdata.PICK_ZONE_LOC_CD.trim().length == 0 ){
//                	alert("피킹존로케이션코드는 공백만으로 입력할 수 없습니다."); //Util.alert('MSG_OUTRI_VAL_034'); //피킹로케이션코드는 공백만으로 입력할 수 없습니다.
//                    return false;
//                }
//                if(!(rowdata.PLT_ID)){
//                    Util.alert('MSG_OUTRI_VAL_031'); //파레트ID 항목은 필수 입력입니다.
//                    return false;
//                }
//                if(rowdata.PLT_ID.trim().length == 0 ){
//                    Util.alert('MSG_OUTRI_VAL_032'); //파레트ID는 공백만으로 입력할 수 없습니다.
//                    return false;
//                }
//                if(!(rowdata.PICK_BOX_QTY)){
//                    Util.alert('MSG_OUTRI_VAL_035'); //피킹환산수량 항목은 필수 입력입니다.
//                    return false;
//                }
//                if(rowdata.PICK_BOX_QTY.trim().length == 0 ){
//                    Util.alert('MSG_OUTRI_VAL_036'); //피킹환산수량은 공백만으로 입력할 수 없습니다.
//                    return false;
//                }
//                if(!(rowdata.PICK_EA_QTY)){
//                    Util.alert('MSG_OUTRI_VAL_037'); //피킹낱개수량은 항목은 필수 입력입니다.
//                    return false;
//                }
//                if(rowdata.PICK_EA_QTY.trim().length == 0 ){
//                    Util.alert('MSG_OUTRI_VAL_038'); //피킹낱개수량은 공백만으로 입력할 수 없습니다.
//                    return false;
//                }
//                if(parseFloat(rowdata.PICK_BOX_QTY) == 0 && parseFloat(rowdata.PICK_EA_QTY) == 0){
//                    Util.alert('MSG_OUTRI_VAL_039'); //피킹환산수량, 낱개수량은 0을 초과하여 입력해야 합니다.
//                    return false;
//                }
//                if(parseFloat(rowdata.PICK_BOX_QTY) < 0 || parseFloat(rowdata.PICK_EA_QTY) < 0){
//                    Util.alert('MSG_OUTRI_VAL_040'); //피킹환산수량, 낱개수량 음수를 입력할 수 없습니다.
//                    return false;
//                }
//                if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
//                    Util.alert('MSG_COM_VAL_071', rowdata.PICK_NO); //[ {0} ]은(는) 변경된 값이 없습니다.
//                    return false;
//                }
//
//
//                if(rowdata.WORK_ST_CD == "30"){
//                    Util.alertCode('MSG_COM_VAL_079', 'WORK_ST_CD', 30); //{0}상태는 저장 할 수 없습니다.
//                    return false;
//                }
//            }
//        }

        var jsonObject = JSON.parse(chkData);

        jsonObject.obNo 		= headerGridRowData.OB_NO;
        jsonObject.obDetailSeq 	= headerGridRowData.OB_DETAIL_SEQ;
        jsonObject.clientCd 	= headerGridRowData.CLIENT_CD;
        jsonObject.pkQty 		= headerGridRowData.PKQTY;
        jsonObject.itemCd 		= headerGridRowData.ITEM_CD;
        jsonObject.itemStCd 	= headerGridRowData.ITEM_ST_CD;

        msg = "MSG_COM_CFM_003"; //저장하시겠습니까?
        var saveUrl = "/ctrl/outbound/outboundPicking/updateOutboundPickingPickGridSave";

        //ajax
        WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
        	$obPickingGrid.paragonGridReload();
    	})

    }

    //피킹그리드 일괄행추가
    function fnAddPickGrid(dt_data) {

       	//유효성검사
    	//header grid에서 지시일때만 추가
//    	var hGridData = $obPickingGrid.getGridParams('serrow');
//    	var obProgStCd = hGridData.OB_PROG_ST_CD;
//    	if(obProgStCd == 60){
//    		Util.alert('MSG_OUTRI_VAL_064'); //피킹 상태에서만 수정 가능합니다
//    		return false;
//    	}

        $obPickDGrid.paragonGridAddRow({
            addData:{
                "CLIENT_CD"     	: dt_data.CLIENT_CD,
                "OB_INST_NO"    	: dt_data.OB_INST_NO,
                "PICK_LOC_CD"   	: dt_data.INST_LOC_CD,
                "OB_NO"         	: dt_data.OB_NO,
                "OB_DETAIL_SEQ" 	: dt_data.OB_DETAIL_SEQ,
                "ITEM_CD"       	: dt_data.ITEM_CD,
                "ITEM_ST_CD"    	: dt_data.ITEM_ST_CD,
                "PKQTY"         	: dt_data.PKQTY,
                "UOM"           	: dt_data.UOM,
                "PICK_TOT_QTY"  	: dt_data.INST_TOT_QTY,
                "PICK_BOX_QTY"  	: dt_data.INST_BOX_QTY,
                "PICK_EA_QTY"   	: dt_data.INST_EA_QTY,
                "MAKE_LOT"      	: dt_data.MAKE_LOT,
                "MAKE_YMD"      	: dt_data.MAKE_YMD,
                "DIST_EXPIRY_YMD"	: dt_data.DIST_EXPIRY_YMD,
                "LOT_ID"        	: dt_data.LOT_ID,
                "PLT_ID"        	: dt_data.PLT_ID,
                "REMARK"        	: dt_data.REMARK,
                "LOT_ATTR1"     	: dt_data.LOT_ATTR1,
                "LOT_ATTR2"     	: dt_data.LOT_ATTR2,
                "LOT_ATTR3"     	: dt_data.LOT_ATTR3,
                "LOT_ATTR4"     	: dt_data.LOT_ATTR4,
                "LOT_ATTR5"     	: dt_data.LOT_ATTR5,
                //"PICK_ZONE_LOC_CD"	: dt_data.PICK_ZONE_LOC_CD
            }
        });
    }

    //삭제
    function fnDelete(){

            var ids = $obPickDGrid.getDataIDs();

            for(var i=0; i < ids.length; i++){
                if($("input:checkbox[id='jqg_obPickingDetailGrid_"+ids[i]+"']").is(":checked")){

                    var workStCd = $obPickDGrid.getRowData(ids[i]).WORK_ST_CD;

                    if(workStCd == "30"){
                        Util.alertCode('MSG_COM_VAL_064', 'WORK_ST_CD', 30); //{0}상태는 수정 할 수 없습니다.
                        return false;
                    }
                }
            }

            var addFlag = $obPickDGrid.paragonGridCheckedDeleteData();
            if(addFlag === false){

            var rowData = {
                clientCd 	: "CLIENT_CD",
                modFlag 	: "MOD_FLAG",
                obNo 		: "OB_NO",
                obDetailSeq : "OB_DETAIL_SEQ",
                obWorkNo 	: "PICK_NO"
            }
            var jsonData = $obPickDGrid.getSelectedJsonDataChk("dt_pick", rowData, $obPickDGrid);
            var saveUrl  = '/ctrl/outbound/outboundPicking/updateOutboundPickingPickGridSave';
            var msg = 'MSG_COM_CFM_001';

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            	$obPickingGrid.paragonGridReload();
        	})
        }

    }

    //파렛트ID 팝업 조회
    function fnPalletPop(rowid){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/palletPop",
            id : "modalPalletPopup",
            width : "550",
            btnName : "수정",
            domainId : "PWMCM114Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $obPickDGrid.setCell("PLT_ID",data.PLT_ID,rowid);
            }
        });
    }

    //로케이션 팝업 조회
    function fnGridLocPop(rowid){

        var hGrid = $obPickingGrid.getGridParam('selrow');
        var hRowData = $obPickingGrid.getRowData(hGrid);

        PopApp.paragonOpenPopup({
            ajaxUrl 	: '/ctrl/common/locPopup2',
            id 			: 'modalLoc2Popup',
            width 		: '1500',
            data  		: {
            	itemCd 		: hRowData.ITEM_CD,
            	itemNm 		: hRowData.ITEM_NM,
            	lotAttr1 	: hRowData.LOT_ATTR1,
            	lotAttr2 	: hRowData.LOT_ATTR2,
        	},
            domainId	:"PWMCM104Q_P1",
            onload 		: function(modal) {
                modal.show();
            },
            callback : function(data){
                $obPickDGrid.setCell("PICK_LOC_CD",		data.LOC_CD,rowid);
                $obPickDGrid.setCell("MAKE_LOT", 		data.MAKE_LOT, rowid);
    			$obPickDGrid.setCell("MAKE_YMD", 		data.MAKE_YMD, rowid);
    			$obPickDGrid.setCell("DIST_EXPIRY_YMD", data.DIST_EXPIRY_YMD, rowid);
    			$obPickDGrid.setCell("PLT_ID", 			data.PLT_ID, rowid);
    			$obPickDGrid.setCell("LOT_ID", 			data.LOT_ID, rowid);
            }
        });
    }

    //로케이션 팝업 조회  -- 추후 PICK_ZONE_LOC_CD (미사용 Function)
    function fnLocPop(rowid){
        PopApp.paragonOpenPopup({
            ajaxUrl     : '/ctrl/common/locPopup',
            id          : 'modalLocPopup',
            width       : '650',
            domainId    :"PWMCM104Q_P1",
            onload      : function(modal) {
                modal.show();
            },
            callback    : function(data){
                $obPickDGrid.setCell("PICK_ZONE_LOC_CD",data.LOC_CD,rowid);
            }
        });
    }

    //피킹그리드 선택한 로우 추가
    function fnPickAdd(){
    	var rowid = $obPickingGrid.getGridParam("selrow");

    	if(rowid == null) {
    		Util.alert('MSG_OUTRI_VAL_050');
    		return false;
    	}

        $obPickDGrid.paragonGridAddRow({
            addData:{
                 "OB_NO"			: headerGridRowData.OB_NO,
                 "OB_DETAIL_SEQ"	: headerGridRowData.OB_DETAIL_SEQ,
                 "PICK_TOT_QTY"		: headerGridRowData.PICK_TOT_QTY,
                 "PICK_BOX_QTY"		: headerGridRowData.PICK_BOX_QTY,
                 "PICK_EA_QTY"		: headerGridRowData.PICK_EA_QTY,
                 "PKQTY"			: headerGridRowData.PKQTY,
                 "UOM"				: headerGridRowData.UOM
            }
        });
    }

    //그리드 내 수량 계산
    function setPickTotQty(rowid){
        var pickTotQty = 0;

        var pkQty 	= Number($obPickDGrid.getRow(rowid,"PKQTY"));
        var box 	= Number($obPickDGrid.getRow(rowid,"PICK_BOX_QTY"));
        var ea 		= Number($obPickDGrid.getRow(rowid,"PICK_EA_QTY"));

        pickTotQty =  box * pkQty + ea;
        $obPickDGrid.setCell("PICK_QTY",		pickTotQty,rowid);
        $obPickDGrid.setCell("PICK_TOT_QTY",	pickTotQty,rowid);
    }

    //유효성 검사
    function fnValidate(){

        var ids = $obPickingGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_obPickingGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $obPickingGrid.getRowData(ids[i]);
//                rowFlag = rowdata.MOD_FLAG;

                if(!(rowdata.NOB_RS)){
                    Util.alert('MSG_OUTRI_VAL_049'); //미출고사유를 입력 해주십시오.
                    return false;
                }
            }
        }
        return true;
    }


    //일괄추가 및 신규추가 저장 버튼 이벤트
    function fnApplyTotalSave(){
        var msg="";
        var rowData = {
                modFlag:        "MOD_FLAG",
                clientCd:       "CLIENT_CD",        //고객사
                obNo:           "OB_NO",            //출고번호
                obDetailSeq:    "OB_DETAIL_SEQ",    //출고상세번호
            };

        //1. 체크된 리스트.
        var jsonData = $obPickingGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var jsonObject = JSON.parse(jsonData);
        var rowid = $obPickingGrid.getGridParam("selrow");
        var obProgStCd = $obPickingGrid.getRowData(rowid).OB_PROG_ST_CD;

        //일괄생성
        if(Number(obProgStCd) == 50){
            msg = "MSG_COM_CFM_016"; //일괄 생성 하시겠습니까?

        }else{
            Util.alertCode('MSG_COM_VAL_078', 'OB_PROG_ST_CD', 50); //{0}상태만 일괄생성이 가능합니다.
            return false;
        }
        var saveUrl = "/ctrl/outbound/outboundPicking/updateOutboundPickingPickGridTotalSave";

        //ajax
        WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
        	$obPickingGrid.paragonGridReload();
    	})

    }



    //데이터
    function sendData(){
    	return {
    		clientCd 		: $("#obPickingClientCd").val(),
            obYmdFr			: WMSUtil.fnDateSetting.yyyymmdd($("#obPickingObYmdFr").val()),
            obYmdTo			: WMSUtil.fnDateSetting.yyyymmdd($("#obPickingObYmdTo").val()),
            obNo			: $("#obPickingObNo").val(),
            storeCd			: $("#obPickingStoreCd").val(),
            rstoreCd		: $("#obPickingRStoreCd").val(),
            carNo			: $("#obPickingCarNo").val(),
            obGbnCd			: $("#obPickingObGbnCd option:selected").val(),
            soNo			: $("#obPickingSoNo").val(),
            obProgStCd		: $("#obPickingObProgStCd option:selected").val(),
            waveNo			: $("#obPickingWaveNo").val()
       }
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
    OutboundPickingApp.init();
});
