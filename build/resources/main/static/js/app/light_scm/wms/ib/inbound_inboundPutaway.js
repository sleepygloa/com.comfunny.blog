/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고적치[MasterAreaApp]
 * Program Code     : PWMIB106E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 3. 29.        First Draft.
 */
var IbPutawayApp = function () {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMIB106E';
	var proNm = 'ibPutw';

    // [El]프로그램 그리드
    var $ibPutwHGrid = $("#ibPutwHeaderGrid");

    var $ibInstDGrid = $("#ibPutwInstDetailGrid");

    var $ibPutwDGrid = $("#ibPutwDetailGrid");

    var ibItemStComboJson;

    var $callBackInput;

    var ibProgStComboJson;

    var ibGbnComboJson;
    var gridWorkSt;
	var gridExportCountryCd;
	var gridDalatYn;

    var firstLoad = true;
    var rowDataList;

    var gridHHeight = '156';
    var gridDHeight = '157';

    return {
        init: function () {

        	ibProgStComboJson 		= WMSUtil.fnCombo.grid_selectBox_range('ibPutwProgStCd', 'IB_PROG_ST_CD', 5, 1);

        	ibGbnComboJson 			= WMSUtil.fnCombo.grid_selectBox('ibPutwGbnCd', 'IB_GBN_CD');

        	ibItemStComboJson 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');

        	gridWorkSt		 		= WMSUtil.fnCombo.grid('WORK_ST_CD');

        	WMSUtil.fnCombo.selectBox('ibPutwReport', 'PWMIB105E');

        	gridExportCountryCd	 	= WMSUtil.fnCombo.grid('COUNTRY_CD');

        	gridDalatYn	 			= WMSUtil.fnCombo.grid('YN', 'DESC');

            fnEvents();

            fnList();


        }
    };


    //[Fn] 이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('ibPutwYmd', true, true);

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');

        //입고적치버튼
        $("#ibPutwConfBtn").click(function(){
            fnPutw("A");
        });
        //검색버튼
        $("#searchIbPutwBtn").click(function(){
            fnSearch();
        });
        //입고적치취소버튼
        $("#ibPutwCancelBtn").click(function(){
            fnPutw("C");
        });
        //엑셀버튼
        $("#excelIbPutwBtn").click(function(){
            var selectRow = $ibPutwDGrid.getGridParam('selrow');
            if(selectRow == null){
                if(null == $ibInstDGrid.getGridParam('selrow')){
                    $ibPutwHGrid.downloadExcelAllItems();
                }else{
                    $ibInstDGrid.downloadExcelAllItems();
                }
            }else{
                $ibPutwDGrid.downloadExcelAllItems();
            }
        });

        //고객사 팝업
        $("#ibPutwClientPopup").click(function(){
        	WMSUtil.popup.client('ibPutwClient');
        });

        //적치버튼
        $("#saveIbPutwBtn").click(function(){
            fnSave();
        });

        //고객사명 수정불가
        $("#ibPutwClientNm").attr("disabled", true);

        $("#ibPutwClientCd").change(function(){
            if($("#ibPutwClientCd").val() == ""){
                $("#ibPutwClientNm").val("");
            }
        });

        //일괄적용 btn Event
        $("#ibPutwApplyBtn").click(function(){
            fnApplyInBatch();
        });
        //일괄적용 저장btn Event
        $("#ibPutwSaveBtn").click(function(){
            fnApplySave();
        });
       //일괄적용 신규row btn Event
        $("#ibPutwAddBtn").click(function(){
            fnPutwAdd();
        });
        //일괄적용 삭제row btn Event
        $("#ibPutwDelBtn").click(function(){
            fnDelete();
        });

        //지시서 발행
        $("#reportIbPutwBtn").click(function(){
            var flag = $("#ibPutwReport option:selected").val();
            if(flag == 20){
            	var sendData = {
            			grid		: $ibPutwHGrid,
            			url			: '/ibInstPutwReport',
            			key			: "IB_NO",
            			progSt		: 'IB_PROG_ST_CD',
            			progCd		: 40,
            			progFlag	: true,
            			errMsgCd	: 'MSG_INRI_ERR_011',
//            			size		: 'w7d6h7d6',
            			data		: {
                            ibNo        : "IB_NO",
                            ibDetailSeq : "IB_DETAIL_SEQ",
                            clientCd    : "CLIENT_CD",
                            itemCd      : "ITEM_CD",
            			},
            			addData : {
        					proCd	: 'PWMIB105E_R2',
        					type	: 'PDF'
            			}
            	};
            	WMSUtil.fnReport(sendData);
            }else if(flag == 10){
            	var sendData = {
            			grid		: $ibPutwHGrid,
            			url			: '/inInstIbLabelReport',
            			key			: "IB_NO",
//            			progSt		: 'IB_PROG_ST_CD',
//            			progCd		: 40,
            			errMsgCd	: 'MSG_INRI_ERR_011',
            			data	: {
                            ibNo        : "IB_NO",
                            ibDetailSeq : "IB_DETAIL_SEQ",
                            clientCd    : "CLIENT_CD",
                            itemCd      : "ITEM_CD",
            			},
            			addData : {
        					proCd	: 'PWMIB105E_R1',
        					type	: 'CMD'
            			},
            			popYn		: 'Y'
            	};
				WMSUtil.fnReport(sendData);
            }

        });
    }


    //파렛트ID 팝업 조회
    function fnPalletPop(rowid){
        PopApp.paragonOpenPopup({
            ajaxUrl 	: "/ctrl/common/palletPop",
            id 			: "modalPalletPopup",
            width 		: "550",
            btnName 	: "수정",
            domainId 	: "PWMCM114Q_P1",
            onload 		: function(modal) {
                modal.show();
            },
            callback 	: function(data){
                $ibPutwDGrid.setCell("PLT_ID",data.PLT_ID,rowid);
            }
        });
    }



    //[Fn] 검색 조건 매핑
    function fnSearch(){
        if($("#ibPutwClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibPutwClientCd").focus();
            return false;
        }else if($("#ibPutwClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibPutwClientCd").focus();
            return false;
        }
        if($("#ibPutwYmdFr").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#ibPutwYmdFr").focus();
            return false;
        }else if($("#ibPutwYmdFr").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#ibPutwYmdFr").focus();
            return false;
        }
        if($("#ibPutwYmdTo").val().length == 0){//입고일자 검사
            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
            $("#ibPutwYmdTo").focus();
            return false;
        }else if($("#ibPutwYmdTo").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
            $("#ibPutwYmdTo").focus();
            return false;
        }

        $ibPutwHGrid.paragonGridSearch(sendData());
    }

    function sendData(){
    	return {
            clientCd 		: $.trim($("#ibPutwClientCd").val()),
            ibPutwYmdFr 	: WMSUtil.fnDateSetting.yyyymmdd($('#ibPutwYmdFr').val()),
            ibPutwYmdTo 	: WMSUtil.fnDateSetting.yyyymmdd($('#ibPutwYmdTo').val()),
            ibProgStCd 		: $.trim($("#ibPutwProgStCd").val()),
            ibGbnCd 		: $.trim($("#ibPutwGbnCd").val()),
            ibNo 			: $.trim($("#ibPutwIbNo").val()),
            carNo 			: $.trim($("#ibPutwCarNo").val())
    	}
    }

    function fnList(){
        $ibPutwHGrid.paragonGrid({
            url				: '/ctrl/inbound/inboundPutaway/listInboundPutwH',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
            postData		: sendData(),
            rowClickFocus	: true,
            height			: gridHHeight,
            colModel		: [
                {editable: false, name:'CLIENT_CD', 		width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'CLIENT', 			width:"100px", align:"left", excel:true		},
                {editable: false, name:'IB_PROG_ST_CD', 	width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'IB_PROG_ST', 		width:"150px",  align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibProgStComboJson }
                },
                {editable: false, name:'IB_PLAN_YMD', 		width:"80px",  align:"center", excel:true	},
                {editable: false, name:'IB_YMD', 			width:"80px",  align:"center", excel:true	},
                {editable: false, name:'IB_NO', 			width:"90px",  align:"center", excel:true	},
                {editable: false, name:'IB_DETAIL_SEQ', 	width:"150px",  align:"center", excel:true	},
                {editable: false, name:'PO_YMD', 			width:"80px",  align:"center", excel:true	},
                {editable: false, name:'PO_NO', 			width:"90px",  align:"center", excel:true	},
                {editable: false, name:'IB_GBN_CD', 		width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'IB_GBN', 			width:"150px",  align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibGbnComboJson }
                },
                {editable: false, name:'SUPPLIER_NM', 		width:"150px", align:"left", excel:true		},
                {editable: false, name:'ITEM_CD', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'ITEM_NM', 			width:"150px", align:"left", excel:true		},
                {editable: false, name:'PKQTY', 			width:"50px",  align:"center",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'UOM', 				width:"80px",  align:"center", excel:true	},
                {editable: false, name:'INST_QTY',			width:"100px", align:"right",	hidden: true},
                {editable: false, name:'INST_TOT_QTY',		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'INST_BOX_QTY', 		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'INST_EA_QTY', 		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PUTW_QTY',			width:"100px", align:"right",	hidden: true},
                {editable: false, name:'PUTW_TOT_QTY',		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PUTW_BOX_QTY', 		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PUTW_EA_QTY', 		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PLAN_WEIGHT', 		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'PLT_PKQTY', 		width:"100px", align:"center",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'ITEM_SPEC', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'ITEM_ST_CD', 		width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'ITEM_ST',			width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibItemStComboJson }
                },
                {editable: false, name:'SUPPLIER_CD', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'CAR_NO', 			width:"80px",  align:"center", excel:true	},
                {editable: false, name:'PUTW_DT', 			width:"120px", align:"center", excel:true	},
                {editable: false, name:'PUTW_USER_ID', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'PROG', 				width:"100px", align:"center",	hidden:true},
                {editable: false, name:'PUTW_QTY_C', 		width:"100px", align:"center",	hidden:true}
            ],
            pager			: "#ibPutwHeaderGridNavi",
            domainId		: "IB_PUTW_LIST",
            gridComplete	: function(){
                var ids = $ibPutwHGrid.jqGrid("getDataIDs");
                //행이 1개 이상일때 포커스
                if(ids && ids.length > 0){
                    $ibPutwHGrid.setFocus(0);
                    rowDataList = $ibPutwHGrid.getRowData(0);
                }

                //첫로딩 D그리드 생성, 그 외 조회효과
                var clientCd 	= $ibPutwHGrid.getRowData(ids[0]).CLIENT_CD;
                var ibNo 		= $ibPutwHGrid.getRowData(ids[0]).IB_NO;
                var ibDetailSeq	= $ibPutwHGrid.getRowData(ids[0]).IB_DETAIL_SEQ;

                var gridData = {
                		clientCd	: clientCd,
                		ibNo		: ibNo,
                		ibDetailSeq : ibDetailSeq
                }

                if(firstLoad){
                    fnListIbInstD(gridData);
                    fnListIbPutwD(gridData);
                    firstLoad = false;
                }else{
                    if(ibNo != null){
                    	$ibInstDGrid.paragonGridSearch({ibNo:gridData.ibNo, ibDetailSeq:gridData.ibDetailSeq});
                        $ibPutwDGrid.paragonGridSearch({ibNo:gridData.ibNo, ibDetailSeq:gridData.ibDetailSeq});
                    }else{
                    	$ibInstDGrid.paragonGridSearch({ibNo:null, ibDetailSeq:null});
                        $ibPutwDGrid.paragonGridSearch({ibNo:null, ibDetailSeq:null});
                    }
                }
           },onSelectRowEvent: function(currRowData, prevRowData){
        	   rowDataList = currRowData;

        	   $ibInstDGrid.paragonGridSearch({	ibNo:rowDataList.IB_NO, ibDetailSeq:rowDataList.IB_DETAIL_SEQ});
               $ibPutwDGrid.paragonGridSearch({		ibNo:rowDataList.IB_NO, ibDetailSeq:rowDataList.IB_DETAIL_SEQ});
           },
           groupHeaders:[
                         {
                             rowspan : true,
                             header:[
                                 {start: 'INST_TOT_QTY', length: 3 , domain:"INST_QTY" },
                                 {start: 'PUTW_TOT_QTY', length: 3 , domain:"PUTW_QTY"}
                             ]
                         }]
        });
    }

    function fnListIbInstD(gridData){
    	$ibInstDGrid.paragonGrid({
            url				: '/ctrl/inbound/inboundPutaway/listInboundInstD',
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            rowClickFocus	: true,
            postData		: {
            	ibNo		: gridData.ibNo,
            	ibDetailSeq	: gridData.ibDetailSeq
        	},
            height			: gridDHeight,
            colModel		: [
                {editable: false, name:'IB_NO', 			width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'IB_DETAIL_SEQ', 	width:"150px", align:"center", 	hidden:true},
                {editable: false, name:'IB_INST_NO', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'INST_LOC_CD', 		width:"100px", align:"center",	required:true, excel:true,
                    searchBtnClick : function(value, rowid, colid) {
                        fnLocPutwPop(rowid);
                        }, disabled:true
                    },
                {editable: false, name:'ITEM_ST',			width:"80px",  align:"center", excel:true	},
                {editable: false, name:'PKQTY', 			width:"50px",  align: "center",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'UOM', 				width:"80px",  align:"center", excel:true	},
                {editable: false, name:'INST_QTY',			width:"100px", align:"right",	hidden: true},
                {editable: false, name:'INST_TOT_QTY',		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'INST_BOX_QTY', 		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'INST_EA_QTY', 		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true},
                {editable: false, name:'WORK_ST_CD', 		width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'WORK_ST', 			width:"80px",  align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridWorkSt }
                },
                {editable: false, name:'MAKE_LOT', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'MAKE_YMD', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'DIST_EXPIRY_YMD', 	width:"100px", align:"center", excel:true	},
                {editable: false, name:'PLT_ID', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'LOT_ID', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'LOT_ATTR1', 	width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2', 			width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridDalatYn }
                },
                {editable: false, name:'LOT_ATTR3', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'LOT_ATTR4', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'LOT_ATTR5', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'PLT_SPLIT_YN', 		width:"100px", align:"center", 	hidden:true}
            ],
//            pager			: "ibPutwInstDetailGridNavi",
            domainId		: "IB_INST_DETAIL_LIST",
            gridComplete	: function(){
                var ids = $ibInstDGrid.jqGrid("getDataIDs");

                //행이 1개 이상일때 포커스
//                if(ids && ids.length > 0){
//                	$ibInstDGrid.setFocus(0);
//                }

//                var data = $ibInstDGrid.getRowData(ids[0]);
//
//                var ibNo = $ibPutwHGrid.getRowData(ids[0]).IB_NO;
//                var detSeq = $ibPutwHGrid.getRowData(ids[0]).IB_DETAIL_SEQ;
//                ibNoH = ibNo;
//                detSeqH = detSeq;
//                pkQty = $ibPutwHGrid.getRowData(ids[0]).PKQTY;
//                clientCd = $ibPutwHGrid.getRowData(ids[0]).CLIENT_CD;
//                uom = $ibPutwHGrid.getRowData(ids[0]).UOM;

           },
            ondblClickCustom: function(id, iRow, iCol, e){
                var progStCd = $ibPutwHGrid.focusRowData("IB_PROG_ST_CD");
                if(progStCd == '50'){
                    Util.alertCode('MSG_INRI_ERR_001', 'IB_PROG_ST_CD', 50); //{0}상태는 수정 할 수 없습니다.
                    return false;
                }
	        },onSelectRowEvent: function(currRowData, prevRowData){
	     	   rowDataList = currRowData;
	        },
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'INST_TOT_QTY', length: 3 , domain:"INST_QTY" }
                              ]
                          }]
        });
    }

    function fnListIbPutwD(gridData){
        $ibPutwDGrid.paragonGrid({
            url				: '/ctrl/inbound/inboundPutaway/listInboundPutwD',
            rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
            rowClickFocus	: true,
            postData		:{
            	ibNo		: gridData.ibNo,
            	ibDetailSeq	: gridData.ibDetailSeq
            },
            height			: gridDHeight,
            colModel		: [
                {editable: false, name:'IB_NO', 			width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'IB_DETAIL_SEQ', 	width:"50px", align:"center", 	hidden:true},
                {editable: false, name:'PUTW_NO', 			width:"100px", align:"center", excel:true	},
                {editable: true,  name:'PUTW_LOC_CD',		width:"100px", align:"center", excel:true,
                    editoptions : { maxlength:20, dataEvents : function(el, e) { gridTextLengthLimit($(el), e, 20); }},
                    searchBtnClick : function(value, rowid, colid) {
                	  	WMSUtil.popup.loc('', '', function callbackFunc(data){
                	  		$ibPutwDGrid.setCell("PUTW_LOC_CD",data.LOC_CD,rowid);
                	  })
                    }, disabled:true, required:true
                },
                {editable: false, name:'PKQTY', 			width:"50px",  align: "center", excel:true,  formatter:"integer",	excelDataType : "integer"},
                {editable: false, name:'UOM', 				width:"80px",  align:"center", excel:true	},
                {editable: false, name:'PUTW_TOT_QTY',		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true	},
                {editable: true,  name:'PUTW_BOX_QTY', 		width:"100px", align:"right", excelDataType :"integer", excel:true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).on('keyup blur', function(e){
                                if($ibPutwDGrid.getRow(rowid,"PUTW_BOX_QTY") == ''){
                                    $ibPutwDGrid.setCell("PUTW_BOX_QTY",0,rowid);
                                }
                                setPutwTotQty(rowid);

                                gridIntLengthLimit($(this), e, 9);
                            });
                        }
                    }, required:true
                },
                {editable: false,  name:'PUTW_EA_QTY', 		width:"100px", align:"right",	formatter : "integer", excelDataType :"integer", excel:true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).on('keyup blur', function(e){
                                if($ibPutwDGrid.getRow(rowid,"PUTW_EA_QTY") == ''){
                                    $ibPutwDGrid.setCell("PUTW_EA_QTY",0,rowid);
                                }
                                setPutwTotQty(rowid);

                                gridIntLengthLimit($(this), e, 9);
                            });
                        }
                    }
                //, required:true
                },
                {editable: false, name:'WORK_ST', 			width:"80px",  align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridWorkSt }
                },
                {editable: false, name:'WORK_ST_CD', 		width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'MAKE_LOT', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'MAKE_YMD', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'DIST_EXPIRY_YMD', 	width:"100px", align:"center", excel:true	},
                {editable: false,  name:'PLT_ID', 			width:"100px", align:"center", 	disabled:true, excel:true,
//                	required:true,
                    editoptions : { maxlength:20, dataEvents : function(el, e) { gridTextLengthLimit($(el), e, 20); }},
                    searchBtnClick : function(value, rowid, colid) {
                        fnPalletPop(rowid);
                    }
                },
                {editable: false, name:'LOT_ID', 			width:"100px", align:"center", excel:true	},
                {editable: false, name:'LOT_ATTR1', 		width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value:gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2', 		width:"100px", align:"center", excel:true,
                	edittype:'selectText', formatter:'selectText', editoptions: { value:gridDalatYn }
                },
                {editable: false, name:'LOT_ATTR3', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'LOT_ATTR4', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'LOT_ATTR5', 		width:"100px", align:"center", excel:true	},
                {editable: false, name:'PLT_SPLIT_YN', 		width:"100px", align:"center", 	hidden:true},
                {editable: false, name:'IB_INST_NO', 		width:"100px", align:"center", excel:true	}
            ],
//            pager			: "#ibPutwDetailGridNavi",
            domainId		: "IB_PUTW_DETAIL_LIST",
            groupHeaders	:[{
                              rowspan 	: true,
                              header	: [
                                  {start: 'PUTW_TOT_QTY', length: 3 , domain:"PUTW_QTY" }
                              ]
                          }]
        });
    }

    function fnLocPutwPop(rowid){
        PopApp.paragonOpenPopup({
            ajaxUrl 	: '/ctrl/common/locPopup',
            id 			: 'modalLocPopup',
            width 		: '80',
            domainId	: "PWMCM104Q_P1",
            onload 		: function(modal) {
                modal.show();
            },
            callback : function(data){
                $ibPutwDGrid.setCell("INST_LOC_CD",data.LOC_CD,rowid);
            }
        });
    }

    function fnSave(){

        var rowData = {
                modFlag		: "MOD_FLAG" ,
                ibNo		: "IB_NO",
                ibPutwNo	: "IB_INST_NO",
                ibDetailSeq	: "IB_DETAIL_SEQ" ,
                instLocCd	: "INST_LOC_CD"
        }

        var jsonData = $ibPutwDGrid.getSelectedJsonData("dt_ibPutwLoc",rowData);

        if(jsonData == false){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var ids = $ibPutwDGrid.getDataIDs();
        var rowFlag = "";
        for (var i = 0; i < ids.length; i++) {
            if($("input:checkbox[id='jqg_ibPutwPutwDetailGrid_"+ids[i]+"']").is(":checked")){
                var rowdata = $ibPutwDGrid.getRowData(ids[i]);

                rowFlag = $ibPutwDGrid.getRowData(ids[i]).MOD_FLAG;
                if(!(rowdata.INST_LOC_CD)){
                    Util.alert('MSG_INRI_VAL_041'); //지시로케이션코드 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.INST_LOC_CD.trim().length == 0 ){
                    Util.alert('MSG_INRI_VAL_042'); //지시로케이션코드는 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                    Util.alert('MSG_COM_VAL_071', $ibPutwDGrid.getRowData(ids[i]).IB_INST_NO); //[ {0} ]은(는) 변경된 값이 없습니다.
                    return false;
                }
            }
        }

        var saveUrl = '/ctrl/inbound/inboundPutaway/updateIbDetailPutwLoc';
        var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$ibPutwDGrid.paragonGridReload();
        });
    }

    function fnPutw(gbn) {

        // 데이터 키 : Value Key
        var rowData = {
                clientCd	: "CLIENT_CD" ,
                ibNo		: "IB_NO",
                prog		: "PROG",
                ibPutwNo	: "IB_INST_NO",
                ibDetailSeq	: "IB_DETAIL_SEQ"
        }

        var rowid = $ibPutwHGrid.getGridParam("selarrrow");
        var ibProgStCd = [];
        var instTotaQty;
        var putwTotaQty;
        var putwQtyC;
        for (var i = 0; i < rowid.length; i++) {
            var prog = ((gbn == "A") ? 'FW' : 'BW');
            $ibPutwHGrid.jqGrid('setCell',rowid[i],'PROG',prog);
            ibProgStCd.push(Number($ibPutwHGrid.getRowData(rowid[i]).IB_PROG_ST_CD));
            instTotaQty = $ibPutwHGrid.getRowData(rowid[i]).INST_TOT_QTY
            putwTotaQty = $ibPutwHGrid.getRowData(rowid[i]).PUTW_TOT_QTY
            putwQtyC 	= $ibPutwHGrid.getRowData(rowid[i]).PUTW_QTY_C
        }

//        //전체 로우데이터
//        var rowDatas = $ibPutwDGrid.getRowData();
//        var ids = $ibPutwDGrid.getDataIDs();
//        var workProgStCd;
//
//
//
//        //적치로케이션수량 체크
//        for(var index in rowDatas){
//            console.log("workProgStCd1============="+workProgStCd);
//            workProgStCd = rowDatas[index].WORK_ST_CD;
//            console.log("workProgStCd2============="+workProgStCd);
////            for(var i=0; i < ids.length; i++){
//                 if (workProgStCd != 20){
//                     Util.alertCode('MSG_COM_VAL_076', 'WORK_ST_CD', 20); //{0}상태만 적치가능합니다.
//                     return false;
//                 }
//                  console.log("workProgStCd============="+workProgStCd);
////            }
//                  workProgStCd;
//        }

        var jsonData = $ibPutwHGrid.getSelectedJsonData("dt_putw",rowData);

        if(jsonData == false){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        if(gbn == "A"){

            console.log("instTotaQty===="+instTotaQty+"putwQtyC===="+putwQtyC);
            if(instTotaQty != putwQtyC){

                Util.alert('MSG_INRI_VAL_053'); //적치수량이 없습니다.
                return false;
            }

            if(Math.max.apply(null, ibProgStCd) == 50){
                Util.alertCode('MSG_COM_VAL_076', 'IB_PROG_ST_CD', 40); //{0}상태만 적치가능합니다.
                return false;
            }

            var saveUrl = '/ctrl/inbound/inboundPutaway/updateIbPutwConfirm';
            var msg = 'MSG_INRI_CFM_009'; //입고적치 하시겠습니까?

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            	$ibPutwHGrid.paragonGridReload();
            });

        }else{
            if(Math.min.apply(null, ibProgStCd) == 40){
                Util.alertCode('MSG_COM_VAL_072', 'IB_PROG_ST_CD', 50); //{0}상태만 취소가능합니다.
                return false;
            }

            var saveUrl = '/ctrl/inbound/inboundPutaway/updateIbPutwConfirm';
            var msg = 'MSG_INRI_CFM_010'; //입고적치취소 하시겠습니까?

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            	$ibPutwHGrid.paragonGridReload();
            });

        }
    }

    //[Fn] 일괄적용 버튼 이벤트
    function fnApplyInBatch(){

        var rowReturnStockData = {
                modFlag:        "MOD_FLAG",
                clientCd:       "CLIENT_CD",        //고객사
                ibPutwNo:       "IB_INST_NO",       //입고지시번호
                locCd:          "LOC_CD",           //로케이션코드
                ibNo:           "IB_NO",            //입고번호
                ibDetailSeq:    "IB_DETAIL_SEQ",    //입고상세번호
                itemCd:         "ITEM_CD",          //제품코드
                itemNm:         "ITEM_NM",          //제품명
                itemSpec:       "ITEM_SPEC",        //제품규격
                itemStCd:       "ITEM_ST_CD",       //제품상태
                pkQty:          "PKQTY",            //입수
                uom:            "UOM",              //단위
                instQty:        "INST_QTY",         //재고수량
                instBoxQty:     "INST_BOX_QTY",     //박스
                instEaQty:      "INST_EA_QTY",      //낱개
                weight:         "WEIGHT",           //중량
                makeLot:        "MAKE_LOT",         //제조LOT
                makeYmd:        "MAKE_YMD",         //제조일자
                distExpiryYmd:  "DIST_EXPIRY_YMD",  //유통일자
                lotId:          "LOT_ID",           //LOTID
                pltId:          "PLT_ID",           //PLT_ID
                remark:         "REMARK",           //비고
                lotAttr1:       "LOT_ATTR1",        //LOT속성1
                lotAttr2:       "LOT_ATTR2",        //LOT속성2
                lotAttr3:       "LOT_ATTR3",        //LOT속성3
                lotAttr4:       "LOT_ATTR4",        //LOT속성4
                lotAttr5:       "LOT_ATTR5",        //LOT속성5
                convUomQty:     "CONV_UOM_QTY",
                pltSplitYn:     "PLT_SPLIT_YN"
            };

        var rowReturnStockDataNoPltId = {
                modFlag:        "MOD_FLAG",
                clientCd:       "CLIENT_CD",        //고객사
                ibPutwNo:       "IB_INST_NO",       //입고지시번호
                ibNo:           "IB_NO",            //입고번호
                ibDetailSeq:    "IB_DETAIL_SEQ",    //입고상세번호
                itemCd:         "ITEM_CD",          //제품코드
                itemNm:         "ITEM_NM",          //제품명
                itemSpec:       "ITEM_SPEC",        //제품규격
                itemStCd:       "ITEM_ST_CD",       //제품상태
                pkQty:          "PKQTY",            //입수
                uom:            "UOM",              //단위
                instQty:        "INST_QTY",         //재고수량
                instBoxQty:     "INST_BOX_QTY",     //박스
                instEaQty:      "INST_EA_QTY",      //낱개
                weight:         "WEIGHT",           //중량
                makeLot:        "MAKE_LOT",         //제조LOT
                makeYmd:        "MAKE_YMD",         //제조일자
                distExpiryYmd:  "DIST_EXPIRY_YMD",  //유통일자
                lotId:          "LOT_ID",           //LOTID
                pltId:          "PLT_ID",           //PLT_ID
                remark:         "REMARK",           //비고
                lotAttr1:       "LOT_ATTR1",        //LOT속성1
                lotAttr2:       "LOT_ATTR2",        //LOT속성2
                lotAttr3:       "LOT_ATTR3",        //LOT속성3
                lotAttr4:       "LOT_ATTR4",        //LOT속성4
                lotAttr5:       "LOT_ATTR5",        //LOT속성5
                convUomQty:     "CONV_UOM_QTY",
                pltSplitYn:     "PLT_SPLIT_YN"
            };

            var stockJsonRow = $ibInstDGrid.getRowData();

            var cnt  = stockJsonRow.length;
//
            for(var i = cnt - 1 ; i >= 0; i--){

            	if(stockJsonRow[i].INST_LOC_CD == "0000000"){
            		fnAddDcNoLocCd(stockJsonRow[i]);
            	}else{
            		fnAddDc(stockJsonRow[i]);
            	}
            }

        var ids = $ibPutwDGrid.jqGrid("getDataIDs");
        var rowLength = parseInt(ids.length);
        var gridId = $ibPutwDGrid.attr("id");

        if (ids && ids.length > 0) {

            //row 갯수 만큼 루프를 돈다.
            for(var i = 0; i < rowLength; i ++){
                //get row data
                var data = $ibPutwDGrid.getRowData(ids[i]);

            }
        }

    }

    //일괄 추가,
    function fnAddDc(dt_data) {
        $ibPutwDGrid.paragonGridAddRow({
            addData:{
                "CLIENT_CD"     : dt_data.CLIENT_CD, //고객사
                "IB_INST_NO"    : dt_data.IB_INST_NO, //출고지시번호
                "PUTW_LOC_CD"   : dt_data.INST_LOC_CD,    //로케이션
                "IB_NO"         : dt_data.IB_NO,          //출고번호
                "IB_DETAIL_SEQ" : dt_data.IB_DETAIL_SEQ,  //출고상세번호
                "PKQTY"         : dt_data.PKQTY,    //입수
                "UOM"           : dt_data.UOM,    //단위
                "PUTW_TOT_QTY"  : dt_data.INST_TOT_QTY,    //재고수량
                "PUTW_BOX_QTY"  : dt_data.INST_BOX_QTY,    //박스
                "PUTW_EA_QTY"   : dt_data.INST_EA_QTY,     //낱개
                "MAKE_LOT"      : dt_data.MAKE_LOT,    //MAKE_LOT
                "MAKE_YMD"      : dt_data.MAKE_YMD,    //MAKE_YMD
                "DIST_EXPIRY_YMD": dt_data.DIST_EXPIRY_YMD,    //DIST_EXPIRY_YMD
                "LOT_ID"        : dt_data.LOT_ID,    //LOTID
                "PLT_ID"        : dt_data.PLT_ID,    //PLTID
                "PLT_SPLIT_YN"  : dt_data.PLT_SPLIT_YN
            }
        });
    }

    //일괄 추가, NO LOC CD
    function fnAddDcNoLocCd(dt_data) {
        $ibPutwDGrid.paragonGridAddRow({
            addData:{
                "CLIENT_CD"     : dt_data.CLIENT_CD, //고객사
                "IB_INST_NO"    : dt_data.IB_INST_NO, //출고지시번호
                "IB_NO"         : dt_data.IB_NO,          //출고번호
                "IB_DETAIL_SEQ" : dt_data.IB_DETAIL_SEQ,  //출고상세번호
                "PKQTY"         : dt_data.PKQTY,    //입수
                "UOM"           : dt_data.UOM,    //단위
                "PUTW_TOT_QTY"  : dt_data.INST_TOT_QTY,    //재고수량
                "PUTW_BOX_QTY"  : dt_data.INST_BOX_QTY,    //박스
                "PUTW_EA_QTY"   : dt_data.INST_EA_QTY,     //낱개
                "MAKE_LOT"      : dt_data.MAKE_LOT,    //MAKE_LOT
                "MAKE_YMD"      : dt_data.MAKE_YMD,    //MAKE_YMD
                "DIST_EXPIRY_YMD": dt_data.DIST_EXPIRY_YMD,    //DIST_EXPIRY_YMD
                "LOT_ID"        : dt_data.LOT_ID,    //LOTID
                "PLT_ID"        : dt_data.PLT_ID,    //PLTID
                "PLT_SPLIT_YN"  : dt_data.PLT_SPLIT_YN
            }
        });
    }

    //적치로케이션 신규 추가
    function fnPutwAdd(){

        var ids = $ibInstDGrid.getGridParam('selrow');
        var rowData = $ibInstDGrid.getRowData(ids);//지시로우 선택 값

      //validation
        var gridCaption = $('#ibPutwInstDetailGrid_caption').text();

        if(ids == null){//적치지시 선택여부 체크
            Util.alert('MSG_COM_VAL_007', gridCaption); //{0}을(를) 선택해 주십시오.
            return false;
        }

        if(rowData.INST_LOC_CD == '0000000'){
            $ibPutwDGrid.paragonGridAddRow({
                addData:{
              	  	   "IB_NO"              : rowDataList.IB_NO,
                         "IB_DETAIL_SEQ"      : rowDataList.IB_DETAIL_SEQ,
                         "PLT_SPLIT_YN"       : rowData.PLT_SPLIT_YN,
                         "PKQTY"              : rowDataList.PKQTY,
                         "UOM"                : rowDataList.UOM,
                         "IB_INST_NO"         : rowData.IB_INST_NO,
                         "MAKE_LOT"           : rowData.MAKE_LOT,         //MAKE_LOT
                         "MAKE_YMD"           : rowData.MAKE_YMD,         //MAKE_YMD
                         "DIST_EXPIRY_YMD"    : rowData.DIST_EXPIRY_YMD,  //DIST_EXPIRY_YMD
                         "LOT_ID"             : rowData.LOT_ID,           //LOTID
                         "PLT_ID"             : rowData.PLT_ID,           //PLTID
                         "PUTW_LOC_CD"        : '',
                         "PUTW_TOT_QTY"       : rowData.INST_TOT_QTY,    //재고수량
                         "PUTW_BOX_QTY"       : rowData.INST_BOX_QTY,    //박스
                         "PUTW_EA_QTY"        : rowData.INST_EA_QTY,
                         "LOT_ATTR1"			: rowData.LOT_ATTR1,
                         "LOT_ATTR2"			: rowData.LOT_ATTR2,
                         "LOT_ATTR3"			: rowData.LOT_ATTR3,
                         "LOT_ATTR4"			: rowData.LOT_ATTR4,
                         "LOT_ATTR5"			: rowData.LOT_ATTR5
                         }
            });
        }else{
            $ibPutwDGrid.paragonGridAddRow({
                addData:{
              	  	   "IB_NO"              : rowDataList.IB_NO,
                         "IB_DETAIL_SEQ"      : rowDataList.IB_DETAIL_SEQ,
                         "PLT_SPLIT_YN"       : rowData.PLT_SPLIT_YN,
                         "PKQTY"              : rowDataList.PKQTY,
                         "UOM"                : rowDataList.UOM,
                         "IB_INST_NO"         : rowData.IB_INST_NO,
                         "MAKE_LOT"           : rowData.MAKE_LOT,         //MAKE_LOT
                         "MAKE_YMD"           : rowData.MAKE_YMD,         //MAKE_YMD
                         "DIST_EXPIRY_YMD"    : rowData.DIST_EXPIRY_YMD,  //DIST_EXPIRY_YMD
                         "LOT_ID"             : rowData.LOT_ID,           //LOTID
                         "PLT_ID"             : rowData.PLT_ID,           //PLTID
                         "PUTW_LOC_CD"        : rowData.INST_LOC_CD,
                         "PUTW_TOT_QTY"       : rowData.INST_TOT_QTY,    //재고수량
                         "PUTW_BOX_QTY"       : rowData.INST_BOX_QTY,    //박스
                         "PUTW_EA_QTY"        : rowData.INST_EA_QTY,
                         "LOT_ATTR1"			: rowData.LOT_ATTR1,
                         "LOT_ATTR2"			: rowData.LOT_ATTR2,
                         "LOT_ATTR3"			: rowData.LOT_ATTR3,
                         "LOT_ATTR4"			: rowData.LOT_ATTR4,
                         "LOT_ATTR5"			: rowData.LOT_ATTR5
                         }
            });
        }
  }

    function chkWorkStCdPutw(){
        var rowid = $ibPutwDGrid.getGridParam("selrow");
        var workStCd = $ibPutwDGrid.getRowData(rowid).WORK_ST_CD;

        if(workStCd == "30"){
            Util.alertCode('MSG_COM_VAL_064', 'WORK_ST_CD', 30); //{0}상태는 수정 할 수 없습니다.
            return false;
        }else{
            return true;
        }
    }


    //적치로케이션 데이터 삭제
    function fnDelete(){

        if(!chkWorkStCdPutw()) return false;

        var checkFlag = $ibPutwDGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){


            var rowData = {
                    clientCd    :"CLIENT_CD",
                    modFlag     :"MOD_FLAG",
                    ibNo        :"IB_NO",
                    ibDetailSeq :"IB_DETAIL_SEQ",
                    ibWorkNo    :"PUTW_NO",
                    ibInstNo    :"IB_INST_NO",
                    pkQty       :"PKQTY",            //입수
                    putwBoxQty  :"PUTW_BOX_QTY",     //박스
                    putwEaQty   :"PUTW_EA_QTY"     //낱개
            }

            var jsonData = $ibPutwDGrid.getSelectedJsonDataChk("dt_putw",rowData, $ibPutwDGrid);

            var saveUrl = '/ctrl/inbound/inboundPutaway/updatePutwLoc';
            var msg = 'MSG_COM_CFM_001'; //삭제하시겠습니까?

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            	$ibPutwHGrid.paragonGridReload();
        	})

        }
    }


    //일괄추가 및 신규추가 저장 버튼 이벤트
    function fnApplySave(){
        var msg="";
        var rowData = {
                modFlag			: "MOD_FLAG",
                clientCd		: "CLIENT_CD",        //고객사
                ibWorkNo		: "PUTW_NO",          //입고적치번호
                putwLocCd		: "PUTW_LOC_CD",      //로케이션코드
                ibNo			: "IB_NO",            //입고번호
                ibDetailSeq		: "IB_DETAIL_SEQ",    //입고상세번호
                itemCd			: "ITEM_CD",          //제품코드
                itemNm			: "ITEM_NM",          //제품명
                itemSpec		: "ITEM_SPEC",        //제품규격
                itemStCd		: "ITEM_ST_CD",       //제품상태
                pkQty			: "PKQTY",            //입수
                uom				: "UOM",              //단위
                putwQty			: "PUTW_QTY",         //재고수량
                putwBoxQty		: "PUTW_BOX_QTY",     //박스
                putwEaQty		: "PUTW_EA_QTY",      //낱개
                weight			: "WEIGHT",           //중량
                makeLot			: "MAKE_LOT",         //제조LOT
                makeYmd			: "MAKE_YMD",         //제조일자
                distExpiryYmd	: "DIST_EXPIRY_YMD",  //유통일자
                lotId			: "LOT_ID",           //LOTID
                pltId			: "PLT_ID",           //PLT_ID
                remark			: "REMARK",           //비고
                lotAttr1		: "LOT_ATTR1",        //LOT속성1
                lotAttr2		: "LOT_ATTR2",        //LOT속성2
                lotAttr3		: "LOT_ATTR3",        //LOT속성3
                lotAttr4		: "LOT_ATTR4",        //LOT속성4
                lotAttr5		: "LOT_ATTR5",        //LOT속성5
                ibInstNo		: "IB_INST_NO",       //입고지시번호
                convUomQty		: "CONV_UOM_QTY",
                pltSplitYn		: "PLT_SPLIT_YN"
            };

        var jsonData = $ibPutwDGrid.getSelectedJsonData("dt_putw",rowData);

        if(jsonData == false){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }

        var ids = $ibPutwDGrid.getDataIDs();
        var totPutwQty 	= 0;
        var boxPutwQty 	= 0;
        var eaPutwQty 	= 0;
        var rowFlag 	= "";

        var selectedRow;
        var putwTotQty 		= 0;
        var putwInstTotQty 	= 0;
        var putwInstNo		= "";
        var putwInstNoQty 	= 0;
        //전체 로우데이터
        var rowDatas = $ibPutwDGrid.getRowData();

        var ids = $ibPutwHGrid.getGridParam('selarrrow');

        var chkPutwTotQty = $ibPutwHGrid.getRowData(ids).INST_TOT_QTY;


        //적치로케이션수량 체크
        for(var index in rowDatas){

            for(var i=0; i < ids.length; i++){
                    selectedRow =  $ibPutwDGrid.getRowData(ids[i]);
                    putwTotQty += Number(selectedRow.PUTW_TOT_QTY);

//                    putwPutwNo = selectedRow.IB_INST_NO;
//
//                    console.log("putwPutwNo=="+putwPutwNo);
//
//                    if(putwPutwNo == putwPutwNo){
//
//                        putwPutwNoQty += Number(selectedRow.PUTW_TOT_QTY);
//
//                        console.log("putwPutwNoQty=="+putwPutwNoQty);
//                    }



            }

//            console.log("putwTotQty==="+putwTotQty);
//            console.log("instPlanQty==="+instPlanQty);
//
//            if(putwTotQty > instPlanQty){
//                Util.alert('MSG_INRI_ERR_022'); //적치로케이션 수량은 지시수량 이상으로 저장할 수 없습니다.
////                $ibPutwDGrid.paragonGridCheckedDeleteData();
//                return;
//            }

            putwTotQty = 0;
        }

        for (var i = 0; i < ids.length; i++) {
            totPutwQty 	+= Number($ibPutwDGrid.getRow(ids[i],"PUTW_TOT_QTY"));
            boxPutwQty 	+= Number($ibPutwDGrid.getRow(ids[i],"PUTW_BOX_QTY"));
            eaPutwQty 	+= Number($ibPutwDGrid.getRow(ids[i],"PUTW_EA_QTY"));


            if($("input:checkbox[id='jqg_ibPutwDetailGrid_"+ids[i]+"']").is(":checked")){

                var rowdata = $ibPutwDGrid.getRowData(ids[i]);

                rowFlag = rowdata.MOD_FLAG;

                if(!(rowdata.PUTW_LOC_CD)){
                    Util.alert('MSG_INRI_VAL_043'); //적치로케이션코드 항목은 필수 입력입니다.
                    return false;
                }
                if(!(rowdata.PLT_ID)){
                    Util.alert('MSG_INRI_VAL_044'); //적치로케이션코드는 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.PUTW_BOX_QTY)){
                    Util.alert('MSG_INRI_VAL_045'); //적치환산수량 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.PUTW_BOX_QTY.trim().length == 0 ){
                    Util.alert('MSG_INRI_VAL_046'); //적치환산수량은 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(!(rowdata.PUTW_EA_QTY)){
                    Util.alert('MSG_INRI_VAL_047'); //적치낱개수량 항목은 필수 입력입니다.
                    return false;
                }
                if(rowdata.PUTW_EA_QTY.trim().length == 0 ){
                    Util.alert('MSG_INRI_VAL_048'); //적치낱개수량은 공백으로 입력 할 수 없습니다.
                    return false;
                }
                if(parseFloat(rowdata.PUTW_BOX_QTY) == 0 && parseFloat(rowdata.PUTW_EA_QTY) == 0){
                    Util.alert('MSG_INRI_VAL_049'); //적치환산수량, 낱개수량은 0을 초과하여 입력해야 합니다.
                    return false;
                }
                if(parseFloat(rowdata.PUTW_BOX_QTY) < 0 || parseFloat(rowdata.PUTW_EA_QTY) < 0){
                    Util.alert('MSG_INRI_VAL_050'); //적치환산수량, 낱개수량은 음수를 입력할 수 없습니다.
                    return false;
                }
                if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                    Util.alert('MSG_COM_VAL_071', $ibPutwDGrid.getRowData(ids[i]).PUTW_NO); //[ {0} ]은(는) 변경된 값이 없습니다.
                    return false;
                }
            }
        }

            var jsonObject = JSON.parse(jsonData);

            if(rowDataList.IB_NO == undefined){
            	Util.alet('MSG_INRI_VAL_062'); //적치번호를 선택해주세요
            }

            jsonObject.ibNo 		= rowDataList.IB_NO;
            jsonObject.ibDetailSeq 	= rowDataList.IB_DETAIL_SEQ;
            jsonObject.clientCd 	= rowDataList.CLIENT_CD;
            jsonObject.pkQty 		= rowDataList.PKQTY;
            jsonObject.itemCd 		= rowDataList.ITEM_CD;
            jsonObject.itemStCd 	= rowDataList.ITEM_ST_CD;
            jsonObject.ibInstNo 	= rowDataList.IB_INST_NO;

            var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?
            var saveUrl = "/ctrl/inbound/inboundPutaway/updatePutwLoc";


            //ajax
            WMSUtil.ajax(JSON.stringify(jsonObject), saveUrl, msg, function(){
            	$ibPutwHGrid.paragonGridReload();
        	})
    }


    function setPutwTotQty(rowid){
        var putwTotQty = 0;

        var pkQty 	= Number($ibPutwDGrid.getRow(rowid,"PKQTY"));
        var box 	= Number($ibPutwDGrid.getRow(rowid,"PUTW_BOX_QTY"));
        var ea 		= Number($ibPutwDGrid.getRow(rowid,"PUTW_EA_QTY"));

        putwTotQty =  box * pkQty + ea;
        $ibPutwDGrid.setCell("PUTW_QTY",putwTotQty,rowid);
        $ibPutwDGrid.setCell("PUTW_TOT_QTY",putwTotQty,rowid);
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

$(document).ready(function() {
    IbPutawayApp.init();
});
