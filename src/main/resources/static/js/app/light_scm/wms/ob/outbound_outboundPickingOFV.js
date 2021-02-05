/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고피킹-오리온[OutboundPickingOFVApp]
 * Program Code     : PWMOB201E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho      2019. 03. 19.       First Draw
*/
var OutboundPickingOFVApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB201E';
	var proNm = 'obPickingOFV';

    var $callBackInput;
    var $obPickingOFVHGrid = $("#obPickingOFVHGrid");
    var $obPickingOFVDGrid = $("#obPickingOFVDGrid");

    var headerGridRowData;

    var gridObProgStCd;
    var gridObGbnCd;
    var gridItemStCd;
    var gridNobRsCd;
    var gridWorkStCd;
    var gridExportCountryCd;
    var gridDalatYn;
    var gridObProgStCd;

    var firstLoad = true;

    return {
        init: function(){

        	WMSUtil.fnCombo.selectBox('obPickingOFVReportCd', 'PWMOB201E', '10');

        	gridObProgStCd  		= WMSUtil.fnCombo.grid_selectBox_range('obPickingOFVObProgStCd', 'OB_PROG_ST_CD', 6, 1);

        	gridObGbnCd				= WMSUtil.fnCombo.grid_selectBox('obPickingOFVObGbnCd', 'OB_GBN_CD');

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

        //고객사 팝업
        $("#obPickingOFVClientCdPopup").click(function() {
        	WMSUtil.popup.client(proNm + 'Client');
        });

        //배송처 팝업
        $("#obPickingOFVStoreCdBtn").click(function(){
          WMSUtil.popup.store(proNm + 'Store', {clientCd : $('#'+proNm+'ClientCd').val()});
        });

        //실배송처 팝업
        $("#obPickingOFVRStoreCdBtn").click(function(){
          WMSUtil.popup.rstore(proNm + 'RStore', {clientCd : $('#'+proNm+'ClientCd').val()});
        });

        //조회 버튼
        $("#obPickingOFVSearchBtn").click(function(){
            fnSearch();
        });

        //레포트 출력
        $("#obPickingOFVReportBtn").click(function(){
            fnReport();
        });

        //확정 버튼
        $("#obPickingOFVConfirmBtn").click(function(){
            var prog = "FW";
            var flag = "CONFIRM";
            fnConfirm(prog, flag);
        });

        //확정 취소 버튼 이벤트
        $("#obPickingOFVCancleBtn").click(function(){
        	var prog = "BW";
        	var flag = "cancel";
        	fnConfirm(prog, flag);
        });

        //엑셀 다운로드
        $("#obPickingOFVExcelBtn").click(function() {
        	var selrow = $obPickingOFVDGrid.getGridParam('selrow');
        	if(selrow != null){
        		$obPickingOFVDGrid.downloadExcelAllItems();
        	}else{
        		$obPickingOFVHGrid.downloadExcelAllItems();
        	}
        });

        //상세 그리드 저장 버튼
        $("#obPickingOFVSaveBtn").click(function(){
            fnDetailSave();
        });

       //상세 그리드 추가 버튼
        $("#obPickingOFVAddBtn").click(function(){
            fnPickAdd();
        });

        //상세 그리드 삭제 버튼
        $("#obPickingOFVDelBtn").click(function(){
            fnDelete();
        });

        //피킹 로케이션 일괄적용 저장btn Event
        $("#obPickingOFVTotalApplyBtn").click(function(){
            fnApplyTotalSave();
        });

        //엔터이벤트
        $('#obPickingOFVObNo, #obPickingOFVSoNo, #obPickingOFVCarNo, #obPickingOFVWaveNo').keydown(function(e){
        	if(e.keyCode == 13){
        		fnSearch();
        	}
        })
    }

    //그리드 초기화
    function fnList(){
        $obPickingOFVHGrid.paragonGrid({
            url				: "/ctrl/outbound/outboundPickingOFV/listOutboundPickingOFV",
            sortable		: true,
            rownumbers		: true,
            height			: "125",
            //rowEditable: true,
            shrinkToFit		: false,
            rowEditable		: true,
            cellEditable	: false,
            multiselect		: true,
            rowClickFocus	: true,
            domainId		: "OB_DETAIL_LIST",
            postData		: sendData(),
            colModel: [
                {editable: false, name: "COMPANY_CD",       width:"100px",  align: "center", 	hidden: true},
                {editable: false, name: "DC_CD",            width:"100px",  align: "center", 	hidden: true},
                {editable: false, name: "CLIENT_CD",        width:"100px",  align: "center", 	hidden: true},
                {editable: false, name: "CLIENT",           width:"100px",  align: "left", 		hidden: true},
                {editable: false, name: "WORK_ST_CD",       width:"100px",  align: "center", 	hidden: true},
                {editable: false, name: "OB_PROG_ST_CD",    width:"100px",  align: "center",	hidden:true},
                {editable: false, name: "OB_PROG_ST",    	width:"100px",  align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridObProgStCd }
                },
                {editable: false, name: "WAVE_NO",          width:"90px",   align: "center", excel:true	},
                {editable: false, name: "OB_YMD",           width:"90px",   align: "center", excel:true	},
                {editable: false, name: "OB_NO",            width:"90px",   align: "center", excel:true	},
                {editable: false, name: "OB_DETAIL_SEQ",    width:"90px",   align: "center", excel:true	},
                {editable: false, name: "SO_NO",            width:"90px",   align: "center", excel:true	},
                {editable: false, name: "SO_YMD",           width:"90px",   align: "center", excel:true	},
                {editable: false, name: "OB_GBN_CD",        width:"80px",   align: "center", hidden: true},
                {editable: false, name: "OB_GBN",			width: "80px", 	align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObGbnCd }
                },
                {editable: false, name: "STORE_NM",         width:"150px",   align: "left", excel:true	},
                {editable: false, name: "RSTORE_NM",        width:"150px",   align: "left", excel:true	},
                {editable: false, name: "CAR_NO",           width:"80px",    align: "center", excel:true},
                {editable: false, name: "DELIVERY_DGR",     width:"50px",    align: "center", hidden: true },
                {editable: false, name: "PROMOTION_GBN",   	width:"35px", 	 align: "center", excel:true},
                {editable: false, name: "ITEM_CD",          width:"100px",   align: "center", excel:true},
                {editable: false, name: "ITEM_NM",          width:"150px",   align: "left", excel:true	},
                {editable: false, name: "CONV_UOM_QTY",     width:"100px",   align: "center", hidden: true},
                {editable: false, name: "CONV_UOM_CD",      width:"100px",   align: "center", hidden: true},
                {editable: false, name: "PKQTY",            width:"50px",    align: "center", formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name: "UOM",              width:"80px",    align: "center", excel:true},
                {editable: false, name: "INST_QTY",         width:"100px",   align: "right",  hidden: true},
                {editable: false, name: "INST_TOT_QTY",     width:"100px",   align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name: "INST_BOX_QTY",     width:"100px",   align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name: "INST_EA_QTY",      width:"100px",   align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name: "PICK_QTY",         width:"100px",   align: "right", hidden: true},
                {editable: false, name: "PICK_TOT_QTY",     width:"100px",   align: "right", formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name: "PICK_BOX_QTY",     width:"100px",   align: "right", formatter:"integer", excelDataType :"integer", excel:true,
//                    editoptions : {
//                        dataInit : function(el) {
//                            var rowid = $(el)[0].attributes.rowid.value;
//                            $(el).onlyNumber();
//                            $(el).blur(function(){
//                                if($obPickingOFVHGrid.getRow(rowid,"PICK_BOX_QTY") == ''){
//                                    $obPickingOFVHGrid.setCell("PICK_BOX_QTY",0,rowid);
//                                }
//                                setPickTotQty(rowid);
//                            });
//                        }
//                    }
                },
                {editable: false, name: "PICK_EA_QTY",       width:"100px",   align: "right", formatter:"integer", excelDataType :"integer", excel:true,
//                    editoptions : {
//                        dataInit : function(el) {
//                            var rowid = $(el)[0].attributes.rowid.value;
//                            $(el).onlyNumber();
//                            $(el).blur(function(){
//                                if($obPickingOFVHGrid.getRow(rowid,"PICK_EA_QTY") == ''){
//                                    $obPickingOFVHGrid.setCell("PICK_EA_QTY",0,rowid);
//                                }
//                                setPickTotQty(rowid);
//                            });
//                        }
//                    }
                },
                {editable: false, name: "NOB_RS_CD",     	width:"100px",   align: "center", hidden: true},
                {editable: true,  name: "NOB_RS", 			width:"100px", 	 align: "center", excel:true,
//                ,   required:true
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridNobRsCd }
                },
                {editable: false, name: "ITEM_SPEC",        width:"100px",  align: "center", excel:true},
                {editable: false, name: "ITEM_ST_CD",       width:"100px",  align: "center", hidden: true},
                {editable: false, name: "ITEM_ST",       	width:"80px",   align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridItemStCd }
                },
                {editable: false, name: "STORE_CD",         width:"100px",   align: "center", excel:true},
                {editable: false, name: "RSTORE_CD",        width:"100px",   align: "center", excel:true},
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
            pager			: "#obPickingOFVHGridNavi",
        	gridComplete	: function(){

        		//처음 로딩시 데이터 1건이상이면 첫행 포커스
        		var ids = $obPickingOFVHGrid.jqGrid("getDataIDs");

        		if (ids && ids.length > 0) {
        			$obPickingOFVHGrid.setFocus(0);
        		}

    			var rowData = $obPickingOFVHGrid.getRowData(ids[0]);

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
    				fnListObPickD(data);
    			}else{
    				if(ids.length > 0){
    					$obPickingOFVDGrid.paragonGridSearch(data);
    				}else{
    					$obPickingOFVDGrid.jqGrid('clearGridData');
    				}
    			}
        	},
        	onSelectRowEvent: function(currRowData, prevRowData){
        		var data = {
        				obNo		: currRowData.OB_NO,
        				obDetailSeq	: currRowData.OB_DETAIL_SEQ,
        				instQty		: currRowData.INST_TOT_QTY,
        				itemCd		: currRowData.ITEM_CD,
        				itemStCd	: currRowData.ITEM_ST_CD,
        				pkQty		: currRowData.PKQTY
        		};
        		$obPickingOFVDGrid.paragonGridSearch(data);
        	}
        });
    }


    //출고피킹 상세그리드 초기화
    function fnListObPickD(data){
        $obPickingOFVDGrid.paragonGrid({
            url				: '/ctrl/outbound/outboundPickingOFV/listOutboundPickingOFVPickGrid',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
            rowClickFocus	: true,
            postData		: data,
            rowNum 			: 50000,
            height			: '116',
            colModel		: [
                {editable: false, name: "OB_INST_NO",   	width:"100px", fixed: true , align:"center", 	hidden:true},
                {editable: false, name: 'PICK_NO', 			width:"100px", 				 align:"center", excel:true},
                {editable: true,  name: 'PICK_LOC_CD', 		width:"100px", 				 align:"center", 	disabled:true,
                	required:true,
                    editoptions : { maxlength:20, dataEvents : function(el, e) { gridTextLengthLimit($(el), e, 20); }},
                    searchBtnClick : function(value, rowid, colid) {
                        fnGridLocPop(rowid);
                        }
                },
                {editable: false, name: "OB_NO",   			width:"100px", fixed: true , align: "center",	hidden:true},
                {editable: false, name: "OB_DETAIL_SEQ",    width:"100px", fixed: true , align: "center", 	hidden:true},
                {editable: false, name: "PKQTY",            width:"50px", 				 align: "center", formatter:"integer", excelDataType :"integer", excel:true},
                {editable: false, name: "UOM",              width:"80px", 				 align: "center", excel:true	},
                {editable: false, name: 'PICK_TOT_QTY',		width:"100px",				 align: "right", formatter: "integer", excelDataType :"integer", excel:true		},
                {editable: true,  name: 'PICK_BOX_QTY', 	width:"100px", 				 align: "right", excelDataType :"integer", excel:true,
                	required:true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).on('keyup blur', function(e){
                                if($obPickingOFVDGrid.getRow(rowid,"PICK_BOX_QTY") == ''){
                                    $obPickingOFVDGrid.setCell("PICK_BOX_QTY",0,rowid);
                                }
                                setPickTotQty(rowid);

                                gridIntLengthLimit($(this), e, 9);
                            });
                        }
                    },
                },
                {editable: false,  name:'PICK_EA_QTY', 		width:"100px", 				 align:"right", formatter: "integer", excelDataType :"integer", excel:true,
                	//required:true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).on('keyup blur', function(e){
                                if($obPickingOFVDGrid.getRow(rowid,"PICK_EA_QTY") == ''){
                                    $obPickingOFVDGrid.setCell("PICK_EA_QTY",0,rowid);
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
                {editable: false, name: "WORK_ST", 			width:"100px", fixed: true , align: "center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridWorkStCd }
                },
                {editable: false,name:'PLT_ID',				width:"150px", align:"center", excel:true,
                	editoptions : { maxlength:20, dataEvents : function(el, e) { gridTextLengthLimit($(el), e, 20); }},
                	searchBtnClick : function(value, rowid, colid) {
                		fnPalletPop(rowid);
                	}, disabled:true
                },
                {editable: false,name:'LOT_ID',				width:"100px", align:"center", excel:true,
                	editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false, name:'MAKE_LOT', 			width:"100px", align:"center", excel:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false, name:'MAKE_YMD', 			width:"100px", align:"center", excel:true,
                    editoptions : {
                        maxlength:10,
                        dataInit : function(el) {
                            $(el).datepicker();
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 10); }) } }
                },
                {editable: false, name:'DIST_EXPIRY_YMD', 	width:"100px", align:"center", excel:true,
                    editoptions : {
                        maxlength:10,
                        dataInit : function(el) {
                            $(el).datepicker();
                            $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 10); }) } }
                },
                {editable: false, name:'LOT_ATTR1',			width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2',      	width:"100px",  align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value : gridDalatYn }
                },
                {editable: false,name:'LOT_ATTR3', 			width:"100px", align:"center", excel:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false,name:'LOT_ATTR4', 			width:"100px", align:"center", excel:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false,name:'LOT_ATTR5', 			width:"100px", align:"center", excel:true,
                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                },
                {editable: false, name: "REMARK", 			width:"100px", fixed: true , align: "center", excel:true},
            ],
//            pager			: "#obPickingOFVDGridNavi",
            domainId		: "OB_PICK_LOC_LIST",
            footerrow		: true,
            userDataOnFooter: true,
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'PICK_TOT_QTY', length: 3 , domain:"PICK_QTY" }
                              ]
                          }],
          gridComplete : function(){

              	//그리드 아래 부분 합계
              	var $footRow = $obPickingOFVDGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
  //

              	var colArr = ['PICK_NO','PICK_LOC','PKQTY'];
              	if(firstLoad){
              		for(var i = 0; i < colArr.length ; i++){
              			$('.footrow > td[aria-describedby="'+proNm+'DGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
              		}
              	    $('.footrow >td[aria-describedby="'+proNm+'DGrid_UOM"]')
      	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

  	            	firstLoad = false;
              	}

              	//총합계
              	fnTotalSum();
              }
        });
    }
    //전체 재고 합계 조회
    function fnTotalSum(){
    	var $grid =$obPickingOFVDGrid;

    	$grid.jqGrid('footerData','set', { PICK_TOT_QTY 		: $grid.jqGrid('getCol', 'PICK_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PICK_BOX_QTY 		: $grid.jqGrid('getCol', 'PICK_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PICK_EA_QTY 			: $grid.jqGrid('getCol', 'PICK_EA_QTY',false,'sum')});

    }

    //레포트 출력
    function fnReport(){
        var reportFlag = $("#obPickingOFVReportCd option:selected").val();

        if(reportFlag == 10){	//피킹지시서
        	var	sendData = {
        			grid		: $obPickingOFVHGrid,
        			url			: '/outboundPickingReport',
        			key			: "OB_NO",
//        			progSt		: 'OB_PROG_ST_CD',
//        			progCd		: 50,
//        			progFlag	: true,
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
        }else if(reportFlag == 20){	//상차지시서
        	var	sendData = {
        			grid		: $obPickingOFVHGrid,
        			url			: '/outboundInstCarLoadingReport',
        			key			: "OB_NO",
        			//progSt		: 'WORK_ST_CD',
        			progSt		: 'OB_PROG_ST_CD',
        			//progCd		: 30,
        			progCd		: 60,
        			progFlag	: true,
        			errMsgCd	: 'MSG_COM_VAL_094',  //확정에서만 출력 하실 수 있습니다.
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

        if($("#obPickingOFVClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obPickingOFVClientCd").focus();
            return false;
        }else if($("#obPickingOFVClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obPickingOFVClientCd").focus();
            return false;
        }

        if($("#obPickingOFVObYmdFr").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obPickingOFVObYmdFr").focus();
            return false;
        }else if($("#obPickingOFVObYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obPickingOFVObYmdFr").focus();
            return false;
        }

        if($("#obPickingOFVObYmdTo").val().length == 0){//출고일자
            Util.alert('MSG_OUTRI_VAL_003'); //출고일자 항목은 필수 입력입니다.
            $("#obPickingOFVObYmdTo").focus();
            return false;
        }else if($("#obPickingOFVObYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_004'); //출고일자는 공백만으로 입력할 수 없습니다.
            $("#obPickingOFVObYmdTo").focus();
            return false;
        }

        $obPickingOFVHGrid.paragonGridSearch(sendData());
    }

    //확정
    function fnConfirm(progData, confirmFlag){
//        $obPickingOFVDGrid
        var saveUrl = "/ctrl/outbound/outboundPickingOFV/updateOutboundPickingOFVConfirm";
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

        if(confirmFlag == "CONFIRM"){
        	rowData["obInstNo"] = "OB_INST_NO";
        }else{
        	rowData["obInstNo"] = "PICK_NO";
        }


        //1. 체크된 리스트.
        var jsonData = $obPickingOFVHGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        //2. 피킹 로케이션목록 항목 체크
//        var pickJsonData = $obPickingOFVDGrid.jqGrid("getDataIDs");
//        if(pickJsonData.length == 0){
//           Util.alert('MSG_OUTRI_ERR_017'); //피킹 로케이션 목록의 피킹 수량을 추가해야합니다.
//        return false;
//        }else{
//            var calPickTotQty = 0;
//            for(var rowid in pickJsonData){
//                calPickTotQty += $obPickingOFVHGrid.getRowData(rowid).PICK_TOT_QTY;
//            }
//            var calInstTotQty = $obPickingOFVHGrid.getRowData(0).INST_TOT_QTY;
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
        var rowid 		= $obPickingOFVHGrid.getGridParam("selrow");
        var rowData 	= $obPickingOFVHGrid.getRowData(rowid);
        var obProgStCd 	= rowData.OB_PROG_ST_CD;

        jsonObject.prog = progData;

        //출고피킹
        if(confirmFlag == "CONFIRM"){
        	var pickJsonData = $obPickingOFVDGrid.jqGrid("getDataIDs");
        	if(pickJsonData.length == 0){
        	    jsonObject.opRuleCd = "2005";
        		if (!confirm((Util.confirm("MSG_OUTRI_VAL_070")).msgTxt)) return false;  //피킹 수량이 0 인 데이터가 포함되어있습니다. 진행하시겠습니까?

        	}else if(Number(obProgStCd) < 60){
                msg = "MSG_OUTRI_CFM_008"; //피킹확정 하시겠습니까?

                jsonObject.opRuleCd = "2005";
                if(Number(rowData.NOB_RS_QTY) > 0){
//                  alert("미출고 사유 입력");
                  if(!fnValidate()) return false; //미출고사유 유효성검사

//                  //ECOLAB사용 미출고 수량이 있으면 피킹 안됨.
//                  Util.alert('MSG_OUTRI_ERR_019'); //미출고 수량있습니다. 피킹 확정 할수 없습니다.
//                  return

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
        	$obPickingOFVHGrid.paragonGridReload();
    	})
    }


    //신규추가 저장 버튼 이벤트
    function fnDetailSave(){
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


        var hGrid = $obPickingOFVHGrid.getGridParam('selrow');
        var hRowData = $obPickingOFVHGrid.getRowData(hGrid);
//        hRowData.OB_GBN_CD;

        //피킹 상세 체크 확인
//        if(!$obPickingOFVHGrid.getSelectedJsonData()){
//            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
//            return false;
//        }

        var chkData = $obPickingOFVDGrid.getSelectedJsonData("dt_pick",rowData);

        //선택한 행 확인
        if(chkData == false){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var rowFlag = "";


        //지시된 수량과 피킹수량 비교
        var ids = $obPickingOFVDGrid.getDataIDs();
        var idx = $obPickingOFVDGrid.getGridParam('selarrrow');

        //피킹로케이션수량 확인
        if(ids.length != 0){

        	//row 들의 피킹총수량의 합
        	var pickTotQty = 0;
        	for(var i = 0; i < ids.length; i++){
        		var rowData = $obPickingOFVDGrid.getRowData(ids[i]);
        		pickTotQty += Number(rowData.PICK_TOT_QTY);
        	}

        	console.log(pickTotQty)
        	console.log(hRowData.INST_TOT_QTY)
            if(Number(pickTotQty) > Number(hRowData.INST_TOT_QTY)){
                Util.alert('MSG_OUTRI_ERR_011'); //피킹로케이션 수량은 지시수량 이상으로 저장 할 수 없습니다.
                return false;
            }
        }


        //필수값 등 유효성 검사
        var idx = $obPickingOFVDGrid.getGridParam('selarrrow');

        //수정모드 그리드 모두 저장모드로 변경
        for(var i = 0; i < idx.length; i++){
        	$obPickingOFVDGrid.jqGrid('saveRow', idx[i], true, 'clientArray');
        }

        var valiFlag = false;
        $.each(idx, function(index, value){
        	var rowdata = $obPickingOFVDGrid.getRowData(value);

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

            if(rowdata.WORK_ST_CD == "30"){
                Util.alertCode('MSG_COM_VAL_079', 'WORK_ST_CD', 30); //{0}상태는 저장 할 수 없습니다.
                valiFlag = true;
                return false;
            }
        });
        if(valiFlag) return false;

        var jsonObject = JSON.parse(chkData);

        jsonObject.obNo 		= hRowData.OB_NO;
        jsonObject.obDetailSeq 	= hRowData.OB_DETAIL_SEQ;
        jsonObject.clientCd 	= hRowData.CLIENT_CD;
        jsonObject.pkQty 		= hRowData.PKQTY;
        jsonObject.itemCd 		= hRowData.ITEM_CD;
        jsonObject.itemStCd 	= hRowData.ITEM_ST_CD;

        msg = "MSG_COM_CFM_003"; //저장하시겠습니까?
        var saveUrl = "/ctrl/outbound/outboundPickingOFV/updateOutboundPickingOFVPickGridSave";

        //ajax
        WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
        	$obPickingOFVHGrid.paragonGridReload();
    	})

    }

    //삭제
    function fnDelete(){

        //필수값 등 유효성 검사
        var idx = $obPickingOFVDGrid.getGridParam('selarrrow');

        var valiFlag = false;
        $.each(idx, function(index, value){
        	var rowdata = $obPickingOFVDGrid.getRowData(value);

        	if(rowdata.WORK_ST_CD == 30){
                Util.alertCode('MSG_COM_VAL_064', 'WORK_ST_CD', 30); //{0}상태는 수정 할 수 없습니다.
                valiFlag = true;
                return false;
            }
        });
        if(valiFlag) return false;


        var addFlag = $obPickingOFVDGrid.paragonGridCheckedDeleteData();
        if(addFlag === false){

            var rowData = {
                clientCd 	: "CLIENT_CD",
                modFlag 	: "MOD_FLAG",
                obNo 		: "OB_NO",
                obDetailSeq : "OB_DETAIL_SEQ",
                obWorkNo 	: "PICK_NO"
            }
            var jsonData = $obPickingOFVDGrid.getSelectedJsonDataChk("dt_pick", rowData, $obPickingOFVDGrid);
            var saveUrl  = '/ctrl/outbound/outboundPickingOFV/updateOutboundPickingOFVPickGridSave';
            var msg = 'MSG_COM_CFM_001';

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            	$obPickingOFVHGrid.paragonGridReload();
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
                $obPickingOFVDGrid.setCell("PLT_ID",data.PLT_ID,rowid);
            }
        });
    }

    //로케이션 팝업 조회
    function fnGridLocPop(rowid){

        var hGrid = $obPickingOFVHGrid.getGridParam('selrow');
        var hRowData = $obPickingOFVHGrid.getRowData(hGrid);

        PopApp.paragonOpenPopup({
            ajaxUrl 	: '/ctrl/common/locPopup2',
            id 			: 'modalLoc2Popup',
            width 		: '90',
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
                $obPickingOFVDGrid.setCell("PICK_LOC_CD",		data.LOC_CD,rowid);
                $obPickingOFVDGrid.setCell("MAKE_LOT", 		data.MAKE_LOT, rowid);
    			$obPickingOFVDGrid.setCell("MAKE_YMD", 		data.MAKE_YMD, rowid);
    			$obPickingOFVDGrid.setCell("DIST_EXPIRY_YMD", data.DIST_EXPIRY_YMD, rowid);
    			$obPickingOFVDGrid.setCell("PLT_ID", 			data.PLT_ID, rowid);
    			$obPickingOFVDGrid.setCell("LOT_ID", 			data.LOT_ID, rowid);
                $obPickingOFVDGrid.setCell("PICK_TOT_QTY",            data.AVAIL_STOCK_TOT_QTY, rowid);
                $obPickingOFVDGrid.setCell("PICK_BOX_QTY",            data.AVAIL_STOCK_BOX_QTY, rowid);
                $obPickingOFVDGrid.setCell("PICK_EA_QTY",            data.AVAIL_STOCK_EA_QTY, rowid);
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
                $obPickingOFVDGrid.setCell("PICK_ZONE_LOC_CD",data.LOC_CD,rowid);
            }
        });
    }

    //피킹그리드 선택한 로우 추가
    function fnPickAdd(){
    	var rowid = $obPickingOFVHGrid.getGridParam("selrow");

    	if(rowid == null) {
    		Util.alert('MSG_OUTRI_VAL_050');
    		return false;
    	}

    	var rowData = $obPickingOFVHGrid.getRowData(rowid);

        $obPickingOFVDGrid.paragonGridAddRow({
            addData:{
                 "OB_NO"			: rowData.OB_NO,
                 "OB_DETAIL_SEQ"	: rowData.OB_DETAIL_SEQ,
//                 "PICK_TOT_QTY"		: rowData.PICK_TOT_QTY,
//                 "PICK_BOX_QTY"		: rowData.PICK_BOX_QTY,
//                 "PICK_EA_QTY"		: rowData.PICK_EA_QTY,
                 "PKQTY"			: rowData.PKQTY,
                 "UOM"				: rowData.UOM,
                 "WORK_ST"			: "",
                 "LOT_ATTR1"		: "",
                 "LOT_ATTR2"		: "",
            }
        });
    }

    //그리드 내 수량 계산
    function setPickTotQty(rowid){
        var pickTotQty = 0;

        var pkQty 	= Number($obPickingOFVDGrid.getRow(rowid,"PKQTY"));
        var box 	= Number($obPickingOFVDGrid.getRow(rowid,"PICK_BOX_QTY"));
        var ea 		= Number($obPickingOFVDGrid.getRow(rowid,"PICK_EA_QTY"));

        pickTotQty =  box * pkQty + ea;
        $obPickingOFVDGrid.setCell("PICK_QTY",		pickTotQty,rowid);
        $obPickingOFVDGrid.setCell("PICK_TOT_QTY",	pickTotQty,rowid);
    }

    //유효성 검사
    function fnValidate(){

        var ids = $obPickingOFVHGrid.getDataIDs();

        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_obPickingOFVHGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $obPickingOFVHGrid.getRowData(ids[i]);
//                rowFlag = rowdata.MOD_FLAG;

                if(!(rowdata.NOB_RS)){
                    Util.alert('MSG_OUTRI_VAL_049'); //미출고사유를 입력 해주십시오.
                    return false;
                }
            }
        }
        return true;
    }




    //데이터
    function sendData(){
    	return {
    		dcCd			: $('#mainDcCd option:selected').val(),
    		clientCd 		: $("#obPickingOFVClientCd").val(),
            obYmdFr			: WMSUtil.fnDateSetting.yyyymmdd($("#obPickingOFVObYmdFr").val()),
            obYmdTo			: WMSUtil.fnDateSetting.yyyymmdd($("#obPickingOFVObYmdTo").val()),
            obNo			: $("#obPickingOFVObNo").val(),
            storeCd			: $("#obPickingOFVStoreCd").val(),
            rstoreCd		: $("#obPickingOFVRStoreCd").val(),
            carNo			: $("#obPickingOFVCarNo").val(),
            obGbnCd			: $("#obPickingOFVObGbnCd option:selected").val(),
            soNo			: $("#obPickingOFVSoNo").val(),
            obProgStCd		: $("#obPickingOFVObProgStCd option:selected").val(),
            waveNo			: $("#obPickingOFVWaveNo").val()
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
    OutboundPickingOFVApp.init();
});
