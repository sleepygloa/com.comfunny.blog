var MenuApp = function () {
	"use strict";

	var $grid = $("#systemMenuGrid");

	var gridComboUseYn;

    return {
        init: function () {

        	//gridComboUseYn = WMSUtil.fnCombo.grid_selectBox('systemMenuPdaUseYN', 'USE_YN');

        	fnEvents();

        	fnList();

	    }
    };

    //이벤트
    function fnEvents(){

    	//조회
    	$('#systemMenuSearchBtn').click(function(){
    		fnSearch();
    	});

    	//추가
    	$("#systemMenuAddBtn").click(function(){
    		fnAdd();
    	});

    	//저장버튼
    	$("#systemMenuSaveRowBtn").click(function(){
    		fnSave();
    	});
    	//행삭제버튼
    	$("#systemMenuDelRowBtn").click(function(){
    		fnDel();
    	});
    }

    //조회
    function fnSearch(){
    	$grid.paragonGridSearch();
    }

    //그리드 초기화
    function fnList(){
		$grid.paragonGrid({
	        url              : '/b/menu/list',
//			pageable         : false,
			//sortable         : false,
            rownumbers		: true,
//            shrinkToFit		: false,
            multiselect		: true,
			rowEditable      : true,
            rowClickFocus	: true,
			height			: '628',
			colModel:[
			    {editable:false,name:'menuSeq',        width:100},
			    {editable:true, name:"menuParentSeq",   width:100,},
			    {editable:true, name:'menuNm',          width:100},
			    {editable:true, name:'menuUrl',         width:80,   align:"center"},
			    {editable:true, name:'menuIcon',        width:100,  align:"center"},
			    {editable:true, name:'menuOrder',       width:80,   align:"center"},
			    {editable:true, name:'useYn',           width:150,  align:"center",
			        edittype:'select', formatter:'select', editoptions: { value : {Y:"사용", N:"미사용"} }
                },
			    {editable:true, name:'blogYn',          width:50,   align:"center",
			        edittype:'select', formatter:'select', editoptions: { value : {Y:"사용", N:"미사용"} }
                },
//			    {editable: tr
            ],
            caption			: "메뉴 목록",
            domainId		: 'MENU_LIST',
			//ExpandColumn	: "MENU_NM",
        });

		//[In]  Icon UI 생성
		function inMakeMenuIcon(value, options, rowObject) {
			value = (value === null) ? "" :value ;
        	var div =$("<div/>");
			var iconEl = $("<i/>");
			var iconTxt = $("<label/>");
			iconEl.addClass("fa "+value);
			iconTxt.text(value);
			iconTxt.addClass("ico-label");
			iconTxt.css("text-indent",10);
			div.append(iconEl).append(iconTxt);

            return div.html();
		}
		//[In]  Icon 값 get
		function inGetIconElValue(elem, oper, value) {
			if (oper === "get") {
				return $(elem).val();
			}
		}
		//[In]  Icon input 박스 생성
		function inCreateIconEl(elem, editOptions) {
			var div =$("<div/>");
			div.html(elem);
			var value = div.find(".ico-label").text();
			return $("<input>", {value:value });
		}
	}


//    $grid.trigger("reloadGrid");

    //[Fn] 메뉴 내용저장
    function fnSave(){
        //삭제버튼 이벤트 로직 수행.
        var saveUrl 	= "/b/menu/save";
        var msg 		= "저장하시겠습니까?"

        var rowData = {
            flag            : "MOD_FLAG" ,
            menuSeq	        : "menuSeq",
            menuParentSeq   : "menuParentSeq",
            menuNm	        : "menuNm",
            menuUrl	        : "menuUrl",
            menuIcon	    : "menuIcon",
            menuOrder	    : "menuOrder",
            useYn	        : "useYn",
            blogYn	        : "blogYn"
        };

        //1. 체크된 리스트.
        var jsonData = $grid.getSelectedJsonDataChk("list", rowData, $grid);

        //ajax
        WMSUtil.ajax('POST', jsonData, saveUrl, msg, function(){
            alert('저장되었습니다.');
            $grid.paragonGridReload();
        })
    }

    //추가
    function fnAdd(){

        $grid.paragonGridAddRow();
//
//
//		var pop = PopApp.paragonOpenPopup({
//    		ajaxUrl		: '/ctrl/settings/system/menu/newPopup',
//    		id			: 'menuNewPopUp',
//    		width		: '50',
//    		minWidth	: '700',
//    		btnName		: "저장",
//    		visible		:  true, //기본값 false :바로 활성화  TODO 사용설명서 명시해야함
////    		title 		: "메뉴 등록",
//    		domainId	: 'MENU_ADD_BTN',
//    		onload		: function(){
//    			//POPUP창 이벤트 실행
//    			MenuApp.initPopup();
//    			var rowid= $grid.jqGrid('getGridParam','selrow');
//        		var selectBox = $("#popMenuParentSeq");
//    			if(rowid != null){
//    				var lastRowData = $grid.getRowData( rowid );
//    				var menuSeq = lastRowData.MENU_SEQ;
//    				var menuNm = lastRowData.MENU_NM;
//    				var option = $("<option>", {value: menuSeq , selected: true });
//    				option.text(menuNm)
//    				selectBox.append(option);
//
//    			}
//    		}
//		});
    }


    //[Fn] 검색 조건 매핑
//    function fnSearch(){
//        //validation
//        if($("#ibExamClientCd").val().length == 0){//고객사 검사
//            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
//            $("#ibExamClientCd").focus();
//            return false;
//        }else if($("#ibExamClientCd").val().trim().length == 0){
//            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
//            $("#ibExamClientCd").focus();
//            return false;
//        }
//        if($("#ibExamYmdFr").val().length == 0){//입고일자 검사
//            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
//            $("#ibExamYmdFr").focus();
//            return false;
//        }else if($("#ibExamYmdFr").val().trim().length == 0){
//            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
//            $("#ibExamYmdFr").focus();
//            return false;
//        }
//        if($("#ibExamYmdTo").val().length == 0){//입고일자 검사
//            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
//            $("#ibExamYmdTo").focus();
//            return false;
//        }else if($("#ibExamYmdTo").val().trim().length == 0){
//            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
//            $("#ibExamYmdTo").focus();
//            return false;
//        }
//
//
//        $ibExamHGrid.paragonGridSearch(sendData());
//    }
//
//    function sendData(){
//    	return {
//                menuNm 		    : "메뉴관리",
///*                ibExamYmdFr 	: WMSUtil.fnDateSetting.yyyymmdd($('#ibExamYmdFr').val()),
//                ibExamYmdTo 	: WMSUtil.fnDateSetting.yyyymmdd($('#ibExamYmdTo').val()),
//                ibProgStCd 		: $.trim($("#ibExamProgStCd").val()),
//                ibGbnCd 		: $.trim($("#ibExamGbnCd").val()),
//                ibNo 			: $.trim($("#ibExamNo").val()),
//                carNo 			: $.trim($("#ibExamCarNo").val())*/
//    	}
//    }


    //삭제
    function fnDel(){

    	var addFlag = $grid.paragonGridCheckedDeleteData();

        if(addFlag === false){
            //삭제버튼 이벤트 로직 수행.
            var saveUrl 	= "/ctrl/inbound/inboundExam/updateIbExamDelete";
            var msg 		= "삭제하시겠습니까?";

            var rowData = {
                menuSeq	        : "menuSeq"
            };

            //1. 체크된 리스트.
            var jsonData = $grid.getSelectedJsonDataChk("map", rowData, $grid);

            //ajax
            WMSUtil.ajax('DELETE', jsonData, saveUrl, msg, function(){
                $ibExamHGrid.paragonGridReload();
        	})
        }
    }

}();

$(document).ready(function() {
	MenuApp.init();
});


//
//

//var IbExamApp = function () {
//    "use strict";
//
//	//프로그램 코드, 명
////	var proCd = $('a[class="active"]').data('procd');
//    var proCd = 'PWMIB104E';
//	var proNm = 'ibExam';
//
//    // [El]프로그램 그리드
//    var $ibExamHGrid = $("#ibExamHeaderGrid");
//
//    var $ibExamDGrid = $("#ibExamDetailGrid");
//
//    var ibItemStComboJson;
//    var ibProgStComboJson;
//    var ibGbnComboJson;
//	var gridExportCountryCd;
//	var gridDalatYn;
//
//    var $callBackInput;
//    var firstLoad = true;
//
//	var rowDataList;
//
//	var gridHeight = '160';
//
//    return {
//        init: function () {
//
//        	ibProgStComboJson 		= WMSUtil.fnCombo.grid_selectBox_range('ibExamProgStCd', 'IB_PROG_ST_CD', 3, 1);
//
//        	ibGbnComboJson 			= WMSUtil.fnCombo.grid_selectBox('ibExamGbnCd', 'IB_GBN_CD');
//
//        	ibItemStComboJson 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');
//
//        	WMSUtil.fnCombo.selectBox('ibExamReport', 'PWMIB104E');
//
//        	gridExportCountryCd 	= WMSUtil.fnCombo.grid('COUNTRY_CD');
//
//        	gridDalatYn 			= WMSUtil.fnCombo.grid('YN', 'DESC');
//
//        	fnEvents();
//
//            fnListH();
//        }
//    };
//
//    //[Fn] 이벤트
//    function fnEvents(){
//
//    	WMSUtil.fnTagYmdSetting('ibExamYmd', true, true);
//
//    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
//        WMSUtil.changePop(proNm, 'Client');
//
//        //검수확정버튼
//        $("#ibExamConfBtn").click(function(){
//            fnExam("A");
//        });
//        //검색버튼
//        $("#searchIbExamBtn").click(function(){
//            fnSearch();
//        });
//        //검수취소버튼
//        $("#ibExamCancelBtn").click(function(){
//            fnExam("C");
//        });
//        //엑셀버튼
//        $("#excelIbExamBtn").click(function(){
//            var selectRow = $ibExamDGrid.getGridParam('selrow');
//            if(selectRow == null){
//                $ibExamHGrid.downloadExcelAllItems();
//            }else{
//                $ibExamDGrid.downloadExcelAllItems();
//            }
//        });
//
//        //고객사 팝업
//        $("#ibExamClientPopup").click(function(){
//        	WMSUtil.popup.client('ibExamClient');
//        });
//
//        //고객사명 수정불가
//        $("#ibExamClientNm").attr("disabled", true);
//
//        //디테일 추가버튼
//        $("#ibExamAddBtn").click(function(){
//            fnDetailAdd();
//
//            fnAddRowQtyDefault($ibExamDGrid);
//        });
//
//        //검수저장
//        $("#ibExamSaveBtn").click(function(){
//        	fnDetailSave(true);
//        });
//
//        //검수삭제
//        $("#ibExamDelBtn").click(function(){
//            fnDel();
//        });
//        $("#reportIbExamBtn").click(function(){
//            var reportFlag = $('#ibExamReport').val();
//            var sendData = {};
//            if (reportFlag == 20){
//            	sendData = {
//            			grid		: $ibExamHGrid,
//            			url			: '/ibExamExamReport',
//            			key			: "IB_NO",
//            			progSt		: 'IB_PROG_ST_CD',
//            			progCd		: 20,
//            			progFlag	: true,
//            			errMsgCd	: 'MSG_INRI_ERR_010',
//            			data		: {
//                            ibNo        : "IB_NO",
//                            ibDetailSeq : "IB_DETAIL_SEQ",
//                            clientCd    : "CLIENT_CD",
//                            makeLot     : "MAKE_LOT",
//                            itemCd      : "ITEM_CD"
//            			},
//            			addData : {
//        					proCd	: 'PWMIB104E_R2',
//        					type	: 'PDF'
//            			}
//            	};
//            }else if(reportFlag == 10){
//            	sendData = {
//            			grid		: $ibExamHGrid,
//            			url			: '/ibExamItemLabelReport',
//            			key			: "IB_NO",
//            			progSt		: 'IB_PROG_ST_CD',
//            			progCd		: 20,
//            			progFlag 	: true,
//            			errMsgCd	: 'MSG_INRI_ERR_012',
//            			size		: "15",
//            			data		: {
//                            ibNo        : "IB_NO",
//                            ibDetailSeq : "IB_DETAIL_SEQ",
//                            clientCd    : "CLIENT_CD",
//                            makeLot     : "MAKE_LOT",
//                            itemCd      : "ITEM_CD",
//            			},
//            			addData : {
//        					proCd	: 'PWMIB104E_R1',
//        					type	: 'CMD'
//            			}
//            	};
//            }
//        	WMSUtil.fnReport(sendData);
//        });
//    }
//
//    //[Fn] 검색 조건 매핑
//    function fnSearch(){
//        //validation
//        if($("#ibExamClientCd").val().length == 0){//고객사 검사
//            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
//            $("#ibExamClientCd").focus();
//            return false;
//        }else if($("#ibExamClientCd").val().trim().length == 0){
//            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
//            $("#ibExamClientCd").focus();
//            return false;
//        }
//        if($("#ibExamYmdFr").val().length == 0){//입고일자 검사
//            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
//            $("#ibExamYmdFr").focus();
//            return false;
//        }else if($("#ibExamYmdFr").val().trim().length == 0){
//            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
//            $("#ibExamYmdFr").focus();
//            return false;
//        }
//        if($("#ibExamYmdTo").val().length == 0){//입고일자 검사
//            Util.alert('MSG_INRI_VAL_007'); //입고일자 항목은 필수 입력입니다.
//            $("#ibExamYmdTo").focus();
//            return false;
//        }else if($("#ibExamYmdTo").val().trim().length == 0){
//            Util.alert('MSG_INRI_VAL_008'); //입고일자는 공백만으로 입력할 수 없습니다.
//            $("#ibExamYmdTo").focus();
//            return false;
//        }
//
//
//        $ibExamHGrid.paragonGridSearch(sendData());
//    }
//
//    function sendData(){
//    	return {
//                clientCd 		: $.trim($("#ibExamClientCd").val()),
//                ibExamYmdFr 	: WMSUtil.fnDateSetting.yyyymmdd($('#ibExamYmdFr').val()),
//                ibExamYmdTo 	: WMSUtil.fnDateSetting.yyyymmdd($('#ibExamYmdTo').val()),
//                ibProgStCd 		: $.trim($("#ibExamProgStCd").val()),
//                ibGbnCd 		: $.trim($("#ibExamGbnCd").val()),
//                ibNo 			: $.trim($("#ibExamNo").val()),
//                carNo 			: $.trim($("#ibExamCarNo").val())
//    	}
//    }
//
//    function fnListH(){
//        $ibExamHGrid.paragonGrid({
//            url				: '/ctrl/inbound/inboundExam/listIbExamH',
//            rowEditable		: true,
//            cellEditable	: false,
//            sortable		: true,
//            rownumbers		: true,
//            shrinkToFit		: false,
//            multiselect		: true,
//            rowClickFocus	: true,
//            height			: gridHeight,
//            postData		: sendData(),
//            colModel		:[
//        		  //인터페이스,2019-03-13 지우지말것
//    		  	{editable: false, name:'DC_CD', 	width:"100px", 	align:"center", 	hidden:true},
//                {editable: false, name:'CLIENT_CD', 	width:"100px", 	align:"center", hidden:true},
//                {editable: false, name:'CLIENT', 		width:"150px", 	align:"left", 	excel:true	},
//                {editable: false, name:'IB_GBN_CD', 	width:"100px", 	align:"center",	hidden:true},
//                {editable: false, name:'IB_GBN', 	width:"100px", 	align:"center", 	excel:true,
//                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibGbnComboJson }
//            	},
//                {editable: false, name:'IB_PROG_ST_CD', width:"100px", 	align:"center", hidden:true},
//                {editable: false, name:'IB_PROG_ST', 	width:"100px", 	align:"center", excel:true,
//                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibProgStComboJson }
//                },
//                {editable: false, name:'IB_PLAN_YMD',	width:"80px", 	align:"center", excel:true	},
//                {editable: false, name:'IB_YMD', 		width:"80px", 	align:"center", excel:true	},
//                {editable: false, name:'IB_NO', 		width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'IB_DETAIL_SEQ', width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'PO_YMD', 		width:"80px", 	align:"center", excel:true	},
//                {editable: false, name:'PO_NO', 		width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'SUPPLIER_NM', 	width:"150px", 	align:"left", 	excel:true	},
//                {editable: false, name:'ITEM_CD', 		width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'ITEM_NM', 		width:"150px", 	align:"left", 	excel:true	},
//                {editable: false, name:'PKQTY', 		width:"50px", 	align:"center", excel:true,  formatter:"integer",	excelDataType : "integer"},
//                {editable: false, name:'UOM', 			width:"80px", 	align:"center", excel:true	},
//                {editable: false, name:'APPR_QTY', 		width:"100px", 	align:"right", 	hidden: true},
//                {editable: false, name:'APPR_TOT_QTY', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'APPR_BOX_QTY', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'APPR_EA_QTY', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'EXAM_QTY', 		width:"100px", 	align:"right", 	hidden: true},
//                {editable: false, name:'EXAM_TOT_QTY', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'EXAM_BOX_QTY', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'EXAM_EA_QTY', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'TGT_QTY', 		width:"100px", 	align:"right", 	hidden: true},
//                {editable: false, name:'TGT_TOT_QTY', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'TGT_BOX_QTY', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'TGT_EA_QTY', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'PLAN_WEIGHT', 	width:"100px", 	align:"right", 	formatter:"integer", excelDataType :"integer", excel:true},
//                {editable: false, name:'MAKE_LOT', 		width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'MAKE_YMD', 		width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'DIST_EXPIRY_YMD', 	width:"100px", align:"center", excel:true},
//                {editable: false, name:'ITEM_SPEC', 	width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'ITEM_ST_CD', 	width:"100px", 	align:"center", hidden:true},
//                {editable: false, name:'ITEM_ST', 		width:"100px", 	align:"center", excel:true,
//                	edittype:'selectText', formatter:'selectText', editoptions: { value : ibItemStComboJson }
//                },
//                {editable: false, name:'SUPPLIER_CD', 	width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'LOT_ATTR1',width:"100px", 	align:"center", excel:true,
//                	edittype:'selectText', formatter:'selectText', editoptions: { value:gridExportCountryCd }
//                },
//                {editable: false, name:'LOT_ATTR2',	 	width:"100px", 	align:"center", excel:true,
//                	edittype:'selectText', formatter:'selectText', editoptions: { value : gridDalatYn }
//                },
//                {editable: false, name:'LOT_ATTR3', 	width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'LOT_ATTR4', 	width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'LOT_ATTR5', 	width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'EXAM_DT', 		width:"120px", 	align:"center", excel:true	},
//                {editable: false, name:'EXAM_USER_ID', 	width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'CAR_NO', 		width:"100px", 	align:"center", excel:true	},
//                {editable: false, name:'REMARK', 		width:"300px", 	align:"left", excel:true	},
//                {editable: false, name:'PROG', 			width:"100px", 	align:"center",	hidden:true},
//            ],
//            pager			: "#ibExamHeaderGridNavi",
//            domainId		:"IB_EXAM_LIST",
//            gridComplete	: function()
//            {
//            	var ids = $ibExamHGrid.jqGrid("getDataIDs");
//
//                //행이 1개 이상일때 포커스
//                if(ids && ids.length > 0){
//                    $ibExamHGrid.setFocus(0);
//                }
//
//            	//첫로딩 D그리드 생성, 그 외 조회효과
//                var clientCd 	= $ibExamHGrid.getRowData(ids[0]).CLIENT_CD;
//                var ibNo 		= $ibExamHGrid.getRowData(ids[0]).IB_NO;
//                var ibDetailSeq	= $ibExamHGrid.getRowData(ids[0]).IB_DETAIL_SEQ;
//
//                var gridData = {
//                		clientCd	: clientCd,
//                		ibNo		: ibNo,
//                		ibDetailSeq : ibDetailSeq
//                }
//
//                if(firstLoad){
//                    fnListD(gridData);
//                    firstLoad = false;
//                }else{
//                    if(ibNo != null){
//                        $ibExamDGrid.paragonGridSearch({ibNo:ibNo, ibDetailSeq:ibDetailSeq, clientCd:clientCd});
//                    }else{
//                        $ibExamDGrid.paragonGridSearch({ibNo:null, ibDetailSeq:null});
//                    }
//                }
//           },onSelectRowEvent: function(currRowData, prevRowData){
//        	   rowDataList = currRowData;
//
//               $ibExamDGrid.paragonGridSearch({
//            	   clientCd		: currRowData.CLIENT_CD,
//            	   ibNo			: currRowData.IB_NO,
//            	   ibDetailSeq	: currRowData.IB_DETAIL_SEQ
//            	   });
//           },
//           groupHeaders	:[{
//                             rowspan 	: true,
//                             header		:
//                            [
//                                 {start: 'APPR_TOT_QTY', length: 3 , domain:"APPR_QTY"},
//                                 {start: 'EXAM_TOT_QTY', length: 3 , domain:"EXAM_QTY" },
//                                 {start: 'TGT_TOT_QTY',  length: 3 , domain:"TGT_QTY" }
//                            ]
//                         }]
//        });
//    }
//
//    function fnListD(gridData){
//        $ibExamDGrid.paragonGrid({
//            url				: '/ctrl/inbound/inboundExam/listIbExamD',
//            rowEditable		: true,
//            cellEditable	: false,
//            sortable		: true,
//            rownumbers		: true,
//            shrinkToFit		: false,
//            multiselect		: true,
//            rowClickFocus	: true,
//            postData		: gridData,
//            height			: gridHeight,
//            colModel		:
//            [
//                {editable: false, name:'IB_NO', 			width:"100px", align:"center", excel:true	},
//                {editable: false, name:'IB_DETAIL_SEQ', 	width:"100px", align:"center", excel:true},
//                {editable: true,  name:'ITEM_ST_CD',		width:"100px", align:"center",	hidden:true,fixed :true},
//                {editable: true,  name:'ITEM_ST',			width:"100px", align:"center",	fixed :true, required:true, excel:true,
//                    edittype:'selectText', formatter:'selectText', editoptions: { value:ibItemStComboJson }
//                },
//                {editable: false, name:'EXAM_QTY',			width:"100px", align:"right",	formatter:'integer', excel:true
////                	, hidden:true
//                	},
//                {editable: false, name:'EXAM_TOT_QTY',		width:"100px", align:"right",	formatter:'integer', excelDataType :"integer", excel:true},
//                {editable: true,  name:'EXAM_BOX_QTY', 		width:"100px", align:"right",	required:true, excelDataType :"integer", excel:true,
//                    editoptions : {
//                        maxlength : 11,
//                        dataInit : function(el) {
//                            var rowid = $(el)[0].attributes.rowid.value;
//                            //숫자만 가능
//                            $(el).onlyNumber();
//
//                            $(el).on('keyup blur', function(e){
//
//                                if($ibExamDGrid.getRow(rowid,"EXAM_BOX_QTY") == ''){
//                                	$ibExamDGrid.setCell("EXAM_BOX_QTY",0,rowid);
//                                }
//
//                                if($ibExamDGrid.getRow(rowid,"ITEM_CD") == ''){
//                                    Util.alert('MSG_MST_ERR_010'); //제품코드를 선택해주세요
//                                    return;
//                                }
//                                setExamTotQty(rowid);
//
//                                gridIntLengthLimit($(this), e, 9);
//                            });
//
//                            //클릭시
////                            $(el).click(function(){
////                            	//데이터 '' 일 때, 숫자 콤마 제거
////                                if($ibExamDGrid.getRow(rowid,"EXAM_BOX_QTY") != ''){
////                                	$(this).val(WMSUtil.grid.fomatter.integerNotComma($(el).val()));
////                                }
////                            	//데이터 블록지정.
////                            	$(this).select();
////                        	//포커스 아웃시
////                            }).blur(function(e){
////                            	//데이터 '' 일 때, 0 입력.
////                                if($ibExamDGrid.getRow(rowid,"EXAM_BOX_QTY") == ''){
////                                	$ibExamDGrid.setCell("EXAM_BOX_QTY",0,rowid);
////                                }
////                                //총량 계산 로직.
////                                setExamTotQty(rowid);
////                                //9자만 입력 가능 maxLength
////                                gridIntLengthLimit($(this), e, 9);
////
////                                $(this).val(WMSUtil.grid.fomatter.integerComma($(el).val()));
////                            })
//                        },
//                    },
//                },
//                {editable: false,  name:'EXAM_EA_QTY', 		width:"100px", align:"right", 	formatter:'integer', excelDataType :"integer", excel:true,	//required:true,
//                    editoptions : {
//                        maxlength : 11,
//                        dataInit : function(el) {
////                        	if($ibExamDGrid.getRow(rowid,"EXAM_EA_QTY") == ''){
////                            	$ibExamDGrid.setCell("EXAM_EA_QTY",0,rowid);
////                            }
//
//                            var rowid = $(el)[0].attributes.rowid.value;
//                            //숫자만 가능
//                            $(el).onlyNumber();
//
//                            $(el).on('keyup blur', function(e){
//
//                                if($ibExamDGrid.getRow(rowid,"EXAM_EA_QTY") == ''){
//                                	$ibExamDGrid.setCell("EXAM_EA_QTY",0,rowid);
//                                }
//
//                                if($ibExamDGrid.getRow(rowid,"ITEM_CD") == ''){
//                                    Util.alert('MSG_MST_ERR_010'); //제품코드를 선택해주세요
//                                    return;
//                                }
//                                setExamTotQty(rowid);
//
//                                gridIntLengthLimit($(this), e, 9);
//                            });
//
//                            //클릭시
////                            $(el).click(function(){
////                            	//데이터 '' 일 때, 숫자 콤마 제거
////                                if($ibExamDGrid.getRow(rowid,"EXAM_EA_QTY") != ''){
////                                	$(this).val(WMSUtil.grid.fomatter.integerNotComma($(el).val()));
////                                }
////                            	//데이터 블록지정.
////                            	$(this).select();
////                        	//포커스 아웃시
////                            }).blur(function(e){
////                            	//데이터 '' 일 때, 0 입력.
////                                if($ibExamDGrid.getRow(rowid,"EXAM_EA_QTY") == ''){
////                                	$ibExamDGrid.setCell("EXAM_EA_QTY",0,rowid);
////                                }
////                                //총량 계산 로직.
////                                setExamTotQty(rowid);
////                                //9자만 입력 가능 maxLength
////                                gridIntLengthLimit($(this), e, 9);
////
////                                $(this).val(WMSUtil.grid.fomatter.integerComma($(el).val()));
////                            })
//                        }
//                    },
//                },
//                {editable: true,  name:'MAKE_LOT', 			width:"100px", align:"center", excel:true,
//                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
//                },
//                {editable: true,  name:'MAKE_YMD', 			width:"100px", align:"center", required :true, excel:true,
//                    editoptions : {
//                        maxlength : 10,
//                        dataInit : function(el) {
//                            $(el).datepicker();
//                            $(el).on('keyup blur', function(e){
//                                gridTextLengthLimit($(this), e, 10);
//                            });
//                        }
//                    }
//                },
//                {editable: true,  name:'DIST_EXPIRY_YMD', 	width:"100px", align:"center", excel:true,
//                    editoptions : {
//                        maxlength : 10,
//                        dataInit : function(el) {
//                            $(el).datepicker();
//                            $(el).on('keyup blur', function(e){
//                                gridTextLengthLimit($(this), e, 10);
//                            });
//                        }
//                    }
//                },
//                {editable: true,  name:'PLT_ID', 			width:"100px", align:"center", excel:true,
//                    searchBtnClick : function(value, rowid, colid) {
//                        fnPalletPop(rowid);
//                    },
//                    editoptions : { maxlength:3, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 3); }) } }
//                },
//                {editable: true,  name:'LOT_ATTR1', 	width:"100px", align:"center", excel:true,
//                		edittype:'selectText', formatter:'selectText', editoptions: { value:gridExportCountryCd }
//                },
//                {editable: true,  name:'LOT_ATTR2', 			width:"100px", align:"center", excel:true,
//                		edittype:'selectText', formatter:'selectText', editoptions: { value:gridDalatYn }
//                },
//                {editable: true,  name:'LOT_ATTR3', 		width:"100px", align:"center", excel:true,
////                	required:true,
//                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
//                },
//                {editable: true,  name:'LOT_ATTR4', 		width:"100px", align:"center", excel:true,
//                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
//                },
//                {editable: true,  name:'LOT_ATTR5', 		width:"100px", align:"center", excel:true,
//                    editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
//                },
//                {editable: false, name:'PKQTY', 			width:"100px", align:"right", 	hidden:true},
//                {editable: false, name:'APPR_QTY', 			width:"100px", align:"right", 	hidden:true},
//                {editable: false, name:'EXAM_QTY_H', 		width:"100px", align:"right", 	hidden:true},
//                {editable: false, name:'EXAM_BOX_D', 		width:"100px", align:"right", 	hidden:true},
//                {editable: false, name:'EXAM_EA_D', 		width:"100px", align:"right", 	hidden:true},
//                {editable: false, name:'IB_EXAM_NO', 		width:"100px", align:"center", 	hidden:true},
//                {editable: false, name:'IB_PROG_ST_CD', 	width:"100px", align:"center", 	hidden:true},
//                {editable: false, name:'ITEM_CD', 			width:"100px", align:"center",	hidden:true},
//                {editable: false, name:'CLIENT_CD', 		width:"100px", align:"center", 	hidden:true},
//                {editable: false, name:'IB_GBN_CD', 		width:"100px", align:"center", 	hidden:true},
//                {editable: false, name:'ITEM_CD', 			width:"100px", align:"center", 	hidden:true},
//                {editable: false, name:'PO_NO', 			width:"100px", align:"center", excel:true},
//                {editable: false, name:'DC_CD', 			width:"100px", align:"center", excel:true},
//            ],
//            pager				: "#ibExamDetailGridNavi",
//            domainId			: "IB_EXAM_DETAIL_LIST",
//            ondblClickCustom	: function(id, iRow, iCol, e){
//                var progStCd = $ibExamHGrid.focusRowData("IB_PROG_ST_CD");
//                if(progStCd == '30'){
//                    Util.alertCode('MSG_COM_VAL_064', 'IB_PROG_ST_CD', 30); //{0}상태는 수정 할 수 없습니다.
//                    return false;
//                }
//            },
//            groupHeaders	:
//        	[{
//    			rowspan 	: true,
//    			header		:
//    			[
//			        {start: 'EXAM_TOT_QTY', length: 3 , domain:"EXAM_QTY" }
//			    ]
//			}]
//        });
//    }
//
//    function setExamTotQty(rowid){
//        var examTotQty = 0;
//
//        var pkQty = Number($ibExamDGrid.getRow(rowid,"PKQTY"));
//        var box = Number($ibExamDGrid.getRow(rowid,"EXAM_BOX_QTY"));
//        var ea = Number($ibExamDGrid.getRow(rowid,"EXAM_EA_QTY"));
//
//
//        examTotQty =  box * pkQty + ea;
//        $ibExamDGrid.setCell("EXAM_QTY",examTotQty,rowid);
//        $ibExamDGrid.setCell("EXAM_TOT_QTY",examTotQty,rowid);
//    }
//
//    function fnPalletPop(rowid){
//        PopApp.paragonOpenPopup({
//            ajaxUrl 	: "/ctrl/common/palletPop",
//            id 			: "modalPalletPopup",
//            width 		: "550",
//            btnName 	: "수정",
////            title : "PalletId 검색",
//            domainId 	: "PWMCM114Q_P1",
//            onload 		: function(modal) {
//                modal.show();
//            },
//            callback : function(data){
//                $ibExamDGrid.setCell("PLT_ID",data.PLT_ID,rowid);
//            }
//        });
//    }
//
//    function fnDetailSave(flag){
//        if(flag){
//            var rowData = {
//                    modFlag         : "MOD_FLAG" ,
//                    ibNo            : "IB_NO",
//                    ibDetailSeq     : "IB_DETAIL_SEQ" ,
//                    itemCd          : "ITEM_CD",
//                    examQty         : "EXAM_QTY",
//                    examBoxQty      : "EXAM_BOX_QTY",
//                    examEaQty       : "EXAM_EA_QTY",
//                    //itemStCd:"ITEM_ST_CD",
//                    itemStCd        : "ITEM_ST",
//                    makeLot         : "MAKE_LOT",
//                    makeYmd         : "MAKE_YMD",
//                    distExpiryYmd   : "DIST_EXPIRY_YMD",
//                    lotAttr1 	    : "LOT_ATTR1",
//                    lotAttr2        : "LOT_ATTR2",
//                    lotAttr3        : "LOT_ATTR3",
//                    lotAttr4        : "LOT_ATTR4",
//                    lotAttr5        : "LOT_ATTR5",
//                    pltId           : "PLT_ID",
//                    pkqty           : "PKQTY",
//                    apprQty         : "APPR_QTY",
//                    examQtyH        : "EXAM_QTY_H",
//                    examBoxD        : "EXAM_BOX_D",
//                    examEaD         : "EXAM_EA_D",
//                    ibExamNo        : "IB_EXAM_NO",
//                    clientCd        : "CLIENT_CD",
//                    ibGbnCd         : "IB_GBN_CD",
//                    //아래 인터페이스용
//                    dcCd			: "DC_CD",
//                    poNo			: "PO_NO"
//
//            }
//
//            //1. 널 검사
//            var jsonData = $ibExamDGrid.getSelectedJsonData("dt_ibExamD",rowData);
//            if(jsonData == false){
//                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
//                return false;
//            }
//            //2. 유효데이터 검사
//            if(!chkIbProgStCdD()) return false;
//            var ids = $ibExamDGrid.getDataIDs();
//            var rowFlag = "";
//
//            for (var i = 0; i < ids.length; i++) {
//                if($("input:checkbox[id='jqg_ibExamDetailGrid_"+ids[i]+"']").is(":checked")){
//                    var rowdata = $ibExamDGrid.getRowData(ids[i]);
//
//                    rowFlag = rowdata.MOD_FLAG;
//                    if(!(rowdata.ITEM_ST)){
//                        Util.alert('MSG_INRI_VAL_009'); //제품상태 항목은 필수 입력입니다.
//                        return false;
//                    }
//                    if(rowdata.ITEM_ST.trim().length == 0 ){
//                        Util.alert('MSG_INRI_VAL_010'); //제품상태는 공백으로 입력 할 수 없습니다.
//                        return false;
//                    }
//                    if(!(rowdata.EXAM_BOX_QTY)){
//                        Util.alert('MSG_INRI_VAL_035'); //검수환산수량 항목은 필수 입력입니다.
//                        return false;
//                    }
//                    if(rowdata.EXAM_BOX_QTY.trim().length == 0 ){
//                        Util.alert('MSG_INRI_VAL_036'); //검수환산수량은 공백으로 입력 할 수 없습니다.
//                        return false;
//                    }
//                    if(!(rowdata.EXAM_EA_QTY)){
//                        Util.alert('MSG_INRI_VAL_037'); //검수낱개수량 항목은 필수 입력입니다.
//                        return false;
//                    }
//                    if(rowdata.EXAM_EA_QTY.trim().length == 0 ){
//                        Util.alert('MSG_INRI_VAL_038'); //검수낱개수량은 공백으로 입력 할 수 없습니다.
//                        return false;
//                    }
//                    if(parseFloat(rowdata.EXAM_BOX_QTY) == 0 && parseFloat(rowdata.EXAM_EA_QTY) == 0){
//                        Util.alert('MSG_INRI_VAL_039'); //검수환산수량, 낱개수량은 0을 초과하여 입력해야 합니다.
//                        return false;
//                    }
//                    if(parseFloat(rowdata.EXAM_BOX_QTY) < 0 || parseFloat(rowdata.EXAM_EA_QTY) < 0){
//                        Util.alert('MSG_INRI_VAL_040'); //검수환산수량, 낱개수량은 음수를 입력할 수 없습니다.
//                        return false;
//                    }
//
//                    if(rowdata.MAKE_YMD == ''){
//                        Util.alert('MSG_INRI_VAL_068'); //생산일자 항목은 필수 입력입니다.
//                        return false;
//                    }
//
////                    if(rowdata.LOT_ATTR3 == ''){
////                        Util.alert('MSG_INRI_VAL_069'); //생산일시 항목은 필수 입력입니다.
////                        return false;
////                    }
//
//            		//생산일자 필수
//            		if(rowdata.LOT_ATTR3 == ''){
////            			Util.alert('MSG_INRI_VAL_069'); //생산일시 항목은 필수입력입니다.
////            			return false;
//            		}else{
//            			/*if((rowdata.LOT_ATTR3).length != 4){
//            				Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//            				return false;
//            			}else{*/
//        				var str = rowdata.LOT_ATTR3.split(":");
//
//        				if (str.length > 1) {
//        					if(Number(str[0]) >= 24){
//        						Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//        						return false;
//        					}
//        					if(Number(str[1]) >= 60){
//        						Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//        						return false;
//        					}
//        					// :없음
//        				} else if (str.length == 1) {
//        					var hh24 = str[0].substr(0, 2);
//        					var dd = str[0].substr(2, 2);
//
//        					if(Number(hh24) >= 24){
//        						Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//        						return false;
//        					}
//        					if(Number(dd) >= 60){
//        						Util.alert('MSG_COM_VAL_087'); //올바른 형식의 시간을 입력해주세요(ex) 07:00,0700
//        						return false;
//        					}
//        				}
//            			/*}*/
//            		}
//
//                    //3. 변경데이터검사
//                    if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
//                        Util.alert('MSG_COM_VAL_071', $ibExamDGrid.getRowData(ids[i]).IB_DETAIL_SEQ); //[ {0} ]은(는) 변경된 값이 없습니다.
//                        return false;
//                    }
//                }
//            }
//
//
//            var saveUrl = '/ctrl/inbound/inboundExam/insertIbExamD';
//            var msg = 'MSG_COM_CFM_003'; //저장하시겠습니까?
//
//            console.log(JSON.parse(jsonData).dt_ibExamD)
//
//            //ajax
//            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
//                $ibExamHGrid.paragonGridReload();
//        	})
//        }
//        flag = false;
//    }
//
//    function fnDetailAdd(){
//
//        if(!chkIbProgStCd()) return false;
//
//        if(!$ibExamHGrid.getSelectedJsonData()){
//            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
//            return false;
//        }
//
//        $ibExamDGrid.paragonGridAddRow({
//            addData:
//            {
//                "IB_NO"             : rowDataList.IB_NO,
//                "IB_DETAIL_SEQ"     : rowDataList.IB_DETAIL_SEQ,
//                "PKQTY"             : rowDataList.PKQTY,
//                "APPR_QTY"          : rowDataList.APPR_QTY,
//                "EXAM_QTY_H"        : rowDataList.EXAM_QTY,
//                "MAKE_LOT"          : rowDataList.MAKE_LOT,
//                "MAKE_YMD"          : rowDataList.MAKE_YMD,
//                "DIST_EXPIRY_YMD"   : rowDataList.DIST_EXPIRY_YMD,
//                "LOT_ATTR1"		    : rowDataList.LOT_ATTR1,
//                "LOT_ATTR2"         : rowDataList.LOT_ATTR2,
//                "LOT_ATTR3"         : rowDataList.LOT_ATTR3,
//                "LOT_ATTR4"         : rowDataList.LOT_ATTR4,
//                "LOT_ATTR5"         : rowDataList.LOT_ATTR5,
//                "CLIENT_CD"         : rowDataList.CLIENT_CD,
//                "ITEM_CD"           : rowDataList.ITEM_CD,
//                "IB_GBN_CD"         : rowDataList.IB_GBN_CD,
//                "DC_CD"    		    : rowDataList.DC_CD,
//                "PO_NO" 	        : rowDataList.PO_NO,
//            }
//        });
//    }
//
//    function fnExam(gbn) {
//
//        // 데이터 키 : Value Key
//        var rowData = {
//                clientCd	: "CLIENT_CD" ,
//                ibNo		: "IB_NO",
//                ibProgStCd	: "IB_PROG_ST_CD",
//                prog		: "PROG",
//                ibDetailSeq	: "IB_DETAIL_SEQ"
//        }
//
//        var rowid 		= $ibExamHGrid.getGridParam("selarrrow");
//        var ibProgStCd 	= [];
//        for (var i = 0; i < rowid.length; i++) {
//            var prog 	= ((gbn == "A") ? 'FW' : 'BW');
//            var eQty 	= $ibExamHGrid.getRowData(rowid[i]).EXAM_QTY;
//            if(eQty == 0){
//                Util.alert('MSG_INRI_ERR_005'); //검수수량이 없습니다.
//                return false;
//            }
//            $ibExamHGrid.jqGrid('setCell',rowid[i],'PROG',prog);
//            ibProgStCd.push(Number($ibExamHGrid.getRowData(rowid[i]).IB_PROG_ST_CD));
//        }
//
//        var jsonData = $ibExamHGrid.getSelectedJsonData("dt_exam",rowData);
//
//        //1. 널 검사
//        if(jsonData == false){
//            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
//            return false;
//        }
//
//        var data = JSON.parse(jsonData).dt_exam;
//        var saveUrl = '/ctrl/inbound/inboundExam/updateIbExamConfirm';
//        //2. 유효데이터 검사
//        if(gbn == "A"){
//            if(Math.max.apply(null, ibProgStCd) == 30){
//                Util.alertCode('MSG_COM_VAL_074', 'IB_PROG_ST_CD', 20); //{0}상태만 검수가능합니다.
//                return false;
//            }
//
//            var msg = 'MSG_INRI_CFM_005';//검수 하시겠습니까?
//
//            //ajax
//            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
//                $ibExamHGrid.paragonGridReload();
//        	})
//
//        }else{
//            if(Math.min.apply(null, ibProgStCd) == 20){
//                Util.alertCode('MSG_COM_VAL_072', 'IB_PROG_ST_CD', 30); //{0}상태만 취소가능합니다.
//                return false;
//            }
//
//            var msg = 'MSG_INRI_CFM_006';//검수취소 하시겠습니까?
//            //ajax
//            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
//                $ibExamHGrid.paragonGridReload();
//        	})
//
//        }
//    }
//
//    function chkIbProgStCd(){
//        var rowid = $ibExamHGrid.getGridParam("selrow");
//        var ibProgStCd = $ibExamHGrid.getRowData(rowid).IB_PROG_ST_CD;
//        if(ibProgStCd == "30"){
//            Util.alertCode('MSG_COM_VAL_064', 'IB_PROG_ST_CD', 30); //{0}상태는 수정 할 수 없습니다.
//            return false;
//        }else{
//            return true;
//        }
//    }
//
//    function chkIbProgStCdD(){
//        var rowid = $ibExamDGrid.getGridParam("selrow");
//        var ibProgStCd = $ibExamDGrid.getRowData(rowid).IB_PROG_ST_CD;
//        if(ibProgStCd == "30"){
//            Util.alertCode('MSG_COM_VAL_064', 'IB_PROG_ST_CD', 30); //{0}상태는 수정 할 수 없습니다.
//            return false;
//        }else{
//            return true;
//        }
//    }
//
//    //[Fn] 검수 상세목록 삭제.
//    function fnDel(){
//
//    	if(!chkIbProgStCdD()) return false;
//
//    	var addFlag = $ibExamDGrid.paragonGridCheckedDeleteData();
//        //console.log("검수 항목 삭제 Log Data:", addFlag);
//        if(addFlag === false){
//            //삭제버튼 이벤트 로직 수행.
//            var saveUrl 	= "/ctrl/inbound/inboundExam/updateIbExamDelete";
//            var msg 		= "MSG_COM_CFM_001"; //삭제하시겠습니까?
//
//            var rowData = {
//                clientCd	: "CLIENT_CD",
//                modFlag		: "MOD_FLAG",
//                ibNo		: "IB_NO",
//                ibDetailSeq	: "IB_DETAIL_SEQ",
//                ibExamNo	: "IB_EXAM_NO"
//            };
//
//            //1. 체크된 리스트.
//            var jsonData = $ibExamDGrid.getSelectedJsonDataChk("dt_exam", rowData, $ibExamDGrid);
//
//
//            //ajax
//            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
//                $ibExamHGrid.paragonGridReload();
//        	})
//        }
//    }
//
//}();
//
///********************************************************************
// * bootstrap-datepicker 달력오픈 중, 탭 이동시 달력 hide
// * Since   : 2017-08-29
// * 작성자  : Kim Seon Ho
// * 수정내역: 2017-09-08 Tab-menu 종료시 마우스 클릭 인식 안되, datepicker(hide) 가 안되던 현상 수정
// ********************************************************************/
//$("li.active").siblings().click(function () {
//    // trigger the datepicker
//    $('.date').datepicker('hide');
//});
//$("li.active").live("click focusout", function (e) {
//    // trigger the datepicker
//    $('.date').datepicker('hide');
//});
//
//$(document).ready(function() {
//    IbExamApp.init();
//});
