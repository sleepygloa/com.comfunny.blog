/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고차량번호저장[OutBoundEntryCarNoApp]
 * Program Code     : PWMOB200E
 * Description      :
 * Revision History
 * Author            Date                Description
 * -------------------------------------------
 * Hong Jeong Bo     2018. 11. 26.       First Draft.
 */

var OutBoundEntryCarNoApp = function() {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB200E';
	var proNm = 'obEntryCarNo';

    var $obEntryCarNoHeaderGrid = $("#obEntryCarNoHeaderGrid");
    var $obEntryCarNoDetailGrid = $("#obEntryCarNoDetailGrid");

    var $callBackInput;

    var firstLoad = true;

    var gridObGbnCd;
    var gridItemStCd;
    var gridObProgStCd;
    var gridExportCountryCd;
    var gridDalatYn;


    return {
        init: function() {

            gridObGbnCd 		= WMSUtil.fnCombo.grid_selectBox('obEntryCarNoObGbnCd', 'OB_GBN_CD');
            gridObProgStCd 		= WMSUtil.fnCombo.grid_selectBox('obEntryCarNoObProgStCd', 'OB_PROG_ST_CD');
            gridItemStCd 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');
            gridExportCountryCd = WMSUtil.fnCombo.grid('COUNTRY_CD');
            gridDalatYn         = WMSUtil.fnCombo.grid('YN', 'DESC');

            fnEvents();
            fnList();
        },
        callBackInput: function() {
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents() {

        WMSUtil.fnTagYmdSetting(proNm+'ObPlanYmd', true, true);


    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

        //고객사팝업
        $("#obEntryCarNoClientPopup").click(function() {
            WMSUtil.popup.client('obEntryCarNoClient');
        });
        //배송처 팝업
        $("#obEntryCarNoStoreBtn").click(function() {
            WMSUtil.popup.store('obEntryCarNoStore', {clientCd : $('#'+ proNm + 'ClientCd')});
        });
        //실배송처 팝업
        $("#obEntryCarNoRStoreBtn").click(function() {
            WMSUtil.popup.rstore('obEntryCarNoRStore', {clientCd : $('#'+ proNm + 'ClientCd')});
        });

        //조회버튼
        $("#obEntryCarNoSearchBtn").click(function() {
            fnSearch();
        });
        //삭제버튼
        $("#obEntryCarNoDelBtn").click(function() {
            fnDel();
        });
        //저장버튼
        $("#obEntryCarNoSaveBtn").click(function() {
            fnSave();
        });
        //일괄생성버튼
        $("#obEntryCarNoBatchBtn").click(function() {
            fnBatch();
        });

        //엑셀 다운로드버튼
        $("#obEntryCarNoExcelBtn").click(function() {
            var selectRow = $obEntryCarNoDetailGrid.getGridParam('selrow');
            if(selectRow == null){
                $obEntryCarNoHeaderGrid.downloadExcelAllItems();
            }else{
                $obEntryCarNoDetailGrid.downloadExcelAllItems();
            }
        });

        //사용불가
        $("#obEntryCarNoClientNm").attr("disabled", true);
    }

    //그리드 초기화
    function fnList() {
        $obEntryCarNoHeaderGrid.paragonGrid({
            url             : "/ctrl/outbound/outboundEntryCarNo/listObEntryCarNo",
            sortable        : true,
            rownumbers      : true,
            height          : "173",
            rowEditable     : true,
            cellEditable    : false,
            multiselect     : true,
            multielonly     : true,
            rowClickFocus   : true,
            shrinkToFit     : false,
            domainId        : "OB_LIST",
            postData        : sendData(),
            colModel: [
                { editable: false, name: "CLIENT_CD", 			width: "150px", align: "center", hidden: true },
                { editable: false, name: "CLIENT", 				width: "100px", align: "left", excel:true },
                { editable: false, name: "OB_PROG_ST_CD", 		width: "100px", align: "center", hidden: true },
                { editable: false, name: "OB_PROG_ST", 			width: "100px", align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObProgStCd }
                },
                { editable: false, name: "OB_GBN_CD", align: "center", hidden: true },
                { editable: false, name: "OB_GBN", 				width: "80px", align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObGbnCd }
                },
                { editable: false, name: "OB_PLAN_YMD", 		width: "100px", align: "center", excel:true },
                { editable: false, name: "OB_YMD",      		width: "100px", align: "center", excel:true },
                { editable: false, name: "OB_NO",       		width: "100px", align: "center", excel:true },
                { editable: true,  name: "CAR_NO",      		width: "100px", align: "center", excel:true },
                { editable: true,  name: "CONTAINER_NO",		width: "100px", align: "center", excel:true },
                { editable: true,  name: "SEAL_NO",     		width: "100px", align: "center", excel:true },
                { editable: false, name: "SO_YMD",      		width: "100px", align: "center", excel:true },
                { editable: false, name: "SO_NO",       		width: "100px", align: "center", excel:true },
                { editable: false, name: "STORE_CD",    		width: "100px", align: "center", excel:true },
                { editable: false, name: "STORE_NM",    		width: "150px", align: "left"  , excel:true },
                { editable: false, name: "RSTORE_CD",   		width: "100px", align: "center", excel:true },
                { editable: false, name: "RSTORE_NM",   		width: "150px", align: "left"  , excel:true },
                { editable: false, name: "REMARK",      		width: "330px", align: "center", excel:true }
            ],
            pager: "#obEntryCarNoHeaderGridNavi",
            gridComplete: function() {

            	//데이터 1건 이상일때 첫행 포커스
                var ids = $obEntryCarNoHeaderGrid.jqGrid("getDataIDs");
                if (ids && ids.length > 0) {
                    $obEntryCarNoHeaderGrid.setFocus(0);
                }

                var rowData = $obEntryCarNoHeaderGrid.getRowData(ids[0]);
                var data = {
                        obNo		: rowData.OB_NO,
                        clientCd	: rowData.CLIENT_CD
                    };

                if (firstLoad) {
                    //화면 처음 로드 시 헤더, 디테일 그리드 생성 중 디테일 부분.
                    fnListD(data);
                } else {

                	if(ids.length != 0){
                		$obEntryCarNoDetailGrid.paragonGridSearch(data);
                	}else{
                		$obEntryCarNoDetailGrid.jqGrid('clearGridData');
                	}
                }
            },
            onSelectRowEvent: function(currRowData, prevRowData) {
                $obEntryCarNoDetailGrid.paragonGridSearch({ obNo: currRowData.OB_NO });
            },
        });
    }

    //상세그리드 초기화
    function fnListD(dataJson) {
        $obEntryCarNoDetailGrid.paragonGrid({
            url         : "/ctrl/outbound/outboundEntryCarNo/listObEntryCatNoDetail",
            sortable    : true,
            rownumbers  : true,
            height      : "183",
            domainId    : "OB_DETAIL_LIST",
            shrinkToFit : false,
            postData    : dataJson,
            rowNum 			: 50000,
            colModel    : [
                { editable: false, name: "OB_PROG_ST", 			width: "100px", align: "center", excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridObProgStCd 	}
                },
                { editable: false, name: "OB_DETAIL_SEQ", 		width: "80px", align: "center" , excel:true		},
                { editable: false, name: "PROMOTION_GBN",   	width: "35px", align: "center" , excel:true		},
                { editable: false, name: "ITEM_CD", 			width: "100px", align: "center", excel:true 	},
                { editable: false, name: "ITEM_NM", 			width: "150px", align: "left"  , excel:true		},
                { editable: false, name: "PKQTY", 				width: "100px",align: "center" , formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "UOM", 				width: "100px", align: "center", excel:true 	},
                { editable: false, name: "PLT_PKQTY", 			width:"100px", align:"center"  , formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "PLAN_TOT_QTY", 		width: "100px", align: "right" , excelDataType :"integer", excel:true	},
                { editable: false, name: "PLAN_BOX_QTY", 		width: "100px", align: "right" , excelDataType :"integer", excel:true	},
                { editable: false, name: "PLAN_EA_QTY", 		width: "100px", align: "right" , excelDataType :"integer", excel:true	},
                { editable: false, name: "WEIGHT", 				width: "100px", align: "right" 	, formatter:"integer", excelDataType :"integer", excel:true},
                { editable: false, name: "MAKE_YMD", 			width: "100px", align: "center" , excel:true	},
                { editable: false, name: "MAKE_LOT", 			width: "100px", align: "center" , excel:true	},
                { editable: false, name: "DIST_EXPIRY_YMD", 	width: "100px", align: "center" , excel:true	},
                { editable: false, name: "ITEM_SPEC", 			width: "100px", align: "center" , excel:true	},
                { editable: false, name: "OB_PROG_ST_CD", 		width: "100px", align: "center", 	hidden: true },
                { editable: false, name: "OB_NO", 				width: "100px", align: "center", 	hidden: true },
                { editable: false, name: "CONV_UOM_QTY", 		width: "100px", align: "right", 	hidden: true},
                { editable: false, name: "CONV_UOM_CD", 		width: "100px", align: "center", 	hidden: true },
                { editable: false, name: "PLAN_QTY", 			width: "100px", align: "right", 	hidden: true},
                { editable: false, name: "ITEM_ST_CD", 			width: "100px", align: "center", 	hidden: true },
                { editable: false, name: "ITEM_ST",     		width: "100px", align: "center" , excel:true,
                    edittype: 'selectText', formatter: 'selectText', editoptions: { value: gridItemStCd }
                },
                {editable: false, name:'LOT_ATTR1',       		width:"100px", align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2',       		width:"100px", align:"center", excel:true,
                    edittype:'selectText', formatter:'selectText', editoptions: { value:gridDalatYn }
                },
                { editable: false, name: "LOT_ATTR3", 			width: "100px", align: "center" , excel:true	},
                { editable: false, name: "LOT_ATTR4", 			width: "100px", align: "center" , excel:true	},
                { editable: false, name: "LOT_ATTR5", 			width: "100px", align: "center" , excel:true	},
            ],
            groupHeaders    :
            [{
                    rowspan : true,
                    header  : [{ start: 'PLAN_TOT_QTY', length: 3, domain: "PLAN_QTY" }]
            }],
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete	: function(){
            	//그리드 아래 부분 합계
            	var $footRow = $obEntryCarNoDetailGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['OB_PROG_ST','OB_DETAIL_SEQ','PROMOTION_GBN','ITEM_CD', 'ITEM_NM', 'PKQTY', 'UOM'];
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'DetailGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'DetailGrid_PLT_PKQTY"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;
            	}


	    	//총합계
	    	fnTotalSum();
            }
//            pager: "#obEntryCarNoDetailGridNavi"
        });
    }

    //전체 재고 합계 조회
    function fnTotalSum(){
    	var $grid =$obEntryCarNoDetailGrid;

    	$grid.jqGrid('footerData','set', { PLAN_TOT_QTY 		: $grid.jqGrid('getCol', 'PLAN_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_BOX_QTY 		: $grid.jqGrid('getCol', 'PLAN_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { PLAN_EA_QTY 		: $grid.jqGrid('getCol', 'PLAN_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { WEIGHT 		: $grid.jqGrid('getCol', 'WEIGHT',false,'sum').toFixed(2)});

    }

    //일괄생성
    function fnBatch() {

        var jsonData = $obEntryCarNoHeaderGrid.getSelectedJsonData();
        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        var ids = $obEntryCarNoHeaderGrid.jqGrid('getDataIDs');
        var gridCarNo   = $("#obEntryCarNoBatchCarNo").val();
        var gridSealNo  = $("#obEntryCarNoBatchSealNo").val();
        var gridContainerNo = $("#obEntryCarNoBatchContainerNo").val();

        for (var i = 0; i < ids.length; i++) {

            var rowId=ids[i];

            //jqg_그리드id_ 패턴
            if($("input:checkbox[id='jqg_obEntryCarNoHeaderGrid_"+ids[i]+"']").is(":checked")){
                $obEntryCarNoHeaderGrid.jqGrid('setRowData', rowId , {'CAR_NO': gridCarNo });
                $obEntryCarNoHeaderGrid.jqGrid('setRowData', rowId , {'SEAL_NO': gridSealNo });
                $obEntryCarNoHeaderGrid.jqGrid('setRowData', rowId , {'CONTAINER_NO': gridContainerNo });
            }
        }
    }

    //조회
    function fnSearch() {
        if($("#obEntryCarNoClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obEntryCarNoClientCd").focus();
            return false;
        }else if($("#obEntryCarNoClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obEntryCarNoClientCd").focus();
            return false;
        }

        if($("#obEntryCarNoObPlanYmdFr").val().length == 0){//출고예정일
            Util.alert('MSG_OUTRI_VAL_001'); //출고예정일자 항목은 필수 입력입니다.
            $("#obEntryCarNoObPlanYmdFr").focus();
            return false;
        }else if($("#obEntryCarNoObPlanYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_002'); //출고예정일자는 공백만으로 입력할 수 없습니다.
            $("#obEntryCarNoObPlanYmdFr").focus();
            return false;
        }

        if($("#obEntryCarNoObPlanYmdTo").val().length == 0){
            Util.alert('MSG_OUTRI_VAL_001'); //출고예정일자 항목은 필수 입력입니다.
            $("#obEntryCarNoObPlanYmdTo").focus();
            return false;
        }else if($("#obEntryCarNoObPlanYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_002'); //출고예정일자는 공백만으로 입력할 수 없습니다.
            $("#obEntryCarNoObPlanYmdTo").focus();
            return false;
        }
        //그리드 수정 여부 체크
        $obEntryCarNoHeaderGrid.paragonGridSearch(sendData());
    }

    //그리드 변경시 수정사항확인
    function fnModCheck() {
        return $obEntryCarNoHeaderGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    //저장
    function fnSave() {

    	var saveUrl = '/ctrl/outbound/outboundEntryCarNo/updateObEntryCarNoSave';
    	var msg = 'MSG_COM_CFM_003';

        var rowData = {
                obNo        : "OB_NO",
                carNo       : "CAR_NO",
                containerNo : "CONTAINER_NO",
                sealNo      : "SEAL_NO"
        }

        var jsonData = $obEntryCarNoHeaderGrid.getSelectedJsonData("dt_data", rowData);

        //유효성 검사
        if (!jsonData){
            Util.alert("MSG_COM_VAL_057"); //선택된 행이 없습니다.
            return;
        }

        //ajax Event.
    	WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            $("#obEntryCarNoBatchCarNo").val("");
            $("#obEntryCarNoBatchSealNo").val("");
            $("#obEntryCarNoBatchContainerNo").val("");
            $obEntryCarNoHeaderGrid.paragonGridReload();
    	})

    }

    //삭제
    function fnDel() {

    	var saveUrl = '/ctrl/outbound/outboundEntryCarNo/updateObEntryCarNoDelete';
    	var msg = 'MSG_COM_CFM_001';

        var rowData = {
                obNo        : "OB_NO",
        }

        var jsonData = $obEntryCarNoHeaderGrid.getSelectedJsonData("dt_data", rowData);

        //유효성검사
        if (!jsonData){
            Util.alert("MSG_COM_VAL_057"); //선택된 행이 없습니다.
            return;
        }
        //ajax Event.
    	WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            $("#obEntryCarNoBatchCarNo").val("");
            $("#obEntryCarNoBatchSealNo").val("");
            $("#obEntryCarNoBatchContainerNo").val("");
            $obEntryCarNoHeaderGrid.paragonGridReload();
    	})
    }

    //데이터
    function sendData(){
    	return{
            obNo            : $("#obEntryCarNoObNo").val(),
            soNo            : $("#obEntryCarNoSoNo").val(),
            carNo           : $("#obEntryCarNoCarNo").val(),
            storeCd         : $("#obEntryCarNoStoreCd").val(),
            clientCd        : $("#obEntryCarNoClientCd").val(),
            rstoreCd        : $("#obEntryCarNoRStoreCd").val(),
            deliveryDgr     : $("#obEntryCarNoDeliveryDgr").val(),
            obGbnCd         : $("#obEntryCarNoObGbnCd option:selected").val(),
            obProgStCd      : $("#obEntryCarNoObProgStCd option:selected").val(),
            obPlanYmdFr   	: WMSUtil.fnDateSetting.yyyymmdd($('#obEntryCarNoObPlanYmdFr').val()),
            obPlanYmdTo    	: WMSUtil.fnDateSetting.yyyymmdd($('#obEntryCarNoObPlanYmdTo').val()),
    	}
}

}();

/********************************************************************
 * bootstrap-datepicker 달력오픈 중, 탭 이동시 달력 hide
 * Since    : 2017-08-29
 * 작성자      : Kim Seon Ho
 * 수정내역 : 2017-09-08 Tab-menu 종료시 마우스 클릭 인식 안되, datepicker(hide) 가 안되던 현상 수정
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
    OutBoundEntryCarNoApp.init();
});