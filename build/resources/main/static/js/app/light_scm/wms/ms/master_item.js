/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 제품관리[MasterItemApp]
 * Program Code     : PWMMS109E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 2. 24.  		First Draft.
 */

var MasterItemApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS109E';
	var proNm = 'msItem';

	//그리드 높이 동적 적용 없음.

    var $msItemHGrid   = $("#msItemHGrid");
    var $msItemDGrid    = $("#msItemDGrid");
//    var $msItemD2Grid = $("#msItemD2Grid");
    var itemFlag = true;
    var ItemCdData;
    var ClientCdData;
    var $callBackInput;
    var gridLoadGbnCdOptions;//적재구분코드
    var gridItemGgbCdOption; //아이템 상태코드
    var gridUomCdOption;//단위
    var gridReplStrtgCdOption;//보충전략
    var gridKeepTempeGbnCdOption; //보관온도구분
    var rowDataList;
    var gridProdYn;
    var gridSalesYn;
    var gridSetItemYn;
    var gridSeasonYn;
    var gridUseYn;
    var gridTaxYn;

    var PutStrtgComboJson;   //적치전략
    var AllocStrtgComboJson; //할당전략
    var minUomComboJson; //최소단위
    var localExportComboJson; //내수수출구분
    var ymdGbnComboJson; //년월일구분

    return {
        init: function(){

        	gridItemGgbCdOption = WMSUtil.fnCombo.grid('ITEM_GBN_CD');

        	gridLoadGbnCdOptions = WMSUtil.fnCombo.grid('LOAD_GBN_CD');

        	gridUomCdOption = WMSUtil.fnCombo.grid('UOM_CD');

        	WMSUtil.fnCombo.selectBox('itemGbnCd')

        	WMSUtil.fnCombo.selectBox('msItemUseYn')

            fnReplStrtgJson();//보충전략

        	gridKeepTempeGbnCdOption = WMSUtil.fnCombo.grid('KEEP_TEMPE_GBN_CD');

        	PutStrtgComboJson = WMSUtil.fnCombo.grid('PUTW_STRTG_CD');

        	AllocStrtgComboJson = WMSUtil.fnCombo.grid('ALLOC_STRTG_CD');

        	minUomComboJson = WMSUtil.fnCombo.grid('UOM_CD');

        	localExportComboJson = WMSUtil.fnCombo.grid('LOCAL_EXPORT_GBN_CD');

        	ymdGbnComboJson = WMSUtil.fnCombo.grid('YMD_GBN_CD');

            WMSUtil.fnCombo.itemClassLarge('msItemLargeClassCd', 'msItemMiddleClassCd', 'msItemSmallClassCd');

            gridProdYn 		= WMSUtil.fnCombo.grid('YN');
            gridSalesYn 	= WMSUtil.fnCombo.grid('YN');
            gridSetItemYn	= WMSUtil.fnCombo.grid('YN');
            gridSeasonYn	= WMSUtil.fnCombo.grid('YN');
            gridTaxYn		= WMSUtil.fnCombo.grid('YN');
            gridUseYn		= WMSUtil.fnCombo.grid('USE_YN');

            itemEvent();
            itemButtonEvent();

            fnList();

        }, callBackInput: function () {
            return $callBackInput;
            } //func, // function in return.
    }; // return


    function fnList(){
        $msItemHGrid.paragonGrid({
            url: "/ctrl/master/item/getItemList",
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            height: "296",
            shrinkToFit: false,
            multiselect: true,
            postData : {
                clientCd:$("#msItemClientCd").val()
            },
            multielonly: true,
            rowClickFocus:true,
            domainId:"ITEM_LIST",
            colModel: [
                {editable:false, name: "CLIENT_CD",    		width:"100px", align:"center", hidden:true}, //고객사
                {editable:false, name: "ITEM_GBN_CD",  		width:"100px", align:"center", hidden:true}, //제품구분코드
                {editable:false, name: "CLIENT",       		width:"100px", align:"center"}, //고객사
                {editable:false, name: "ITEM_CD",      		width:"100px", align:"center"}, //제품코드
                {editable:false, name: "ITEM_NM",      		width:"200px", align:"left"	 }, //제품명
                {editable:false, name: "ITEM_SPEC",    		width:"100px", align:"center"}, //제품규격
                {editable:false, name: "ITEM_GBN",     		width:"100px", align:"center",
                    edittype:'select', formatter:'select', editoptions: { value:gridItemGgbCdOption }
                }, //제품구분코드
                {editable:false, name: "LARGE_CLASS_CD",   	width:"100px", align:"center", hidden:true}, //대분류
                {editable:false, name: "MIDDLE_CLASS_CD",  	width:"100px", align:"center", hidden:true}, //중분류
                {editable:false, name: "SMALL_CLASS_CD",   	width:"100px", align:"center", hidden:true}, //소분류
                {editable:false, name: "LARGE_CLASS",      	width:"100px", align:"center"}, //대분류
                {editable:false, name: "MIDDLE_CLASS",     	width:"100px", align:"center"}, //중분류
                {editable:false, name: "SMALL_CLASS",      	width:"100px", align:"center"}, //소분류
                {editable:false,  name: "IB_COST",         	width:"100px", align:"right", formatter:"integer"}, //입고단가
                {editable:false,  name: "OB_COST",         	width:"100px", align:"right", formatter:"integer"}, //출고단가
                {editable:false,  name: "TAX_YN",          	width:"100px", align:"center",
                    edittype:'select', formatter:'select', editoptions: { value: gridTaxYn }
                },//과세여부
                {editable:false, name: "HORIZONTAL",   	 	width:"100px", align:"right", formatter:"integer"}, //가로
                {editable:false, name: "VERTICAL",      	width:"100px", align:"right", formatter:"integer"}, //세로
                {editable:false, name: "HEIGHT",        	width:"100px", align:"right", formatter:"integer"}, //높이
                {editable:false, name: "CBM",           	width:"100px", align:"right", formatter:"integer"}, //용량
                {editable:false, name: "WEIGHT",           	width:"100px", align:"right", formatter:"integer"}, //중량
                {editable:false, name: "ITEM_BARCODE",      width:"100px", align:"center"},//제품바코드
                {editable:false, name: "BOX_BARCODE",       width:"100px", align:"center"},//박스바코드
                {editable:false, name: "DIST_EXPIRY_DAYS",  width:"100px", align:"center"},//유통기한일수
                //{editable:false, name: "YMD_GBN_CD",        width:"100px", align:"center"},//년월일구분 코드 ymdGbnComboJson
                {editable: false, name:"YMD_GBN",			width:"100px", align:"center", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value: ymdGbnComboJson }
                },
                {editable: false, name:"PUTW_STRTG",		width:"100px", align:"center", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:PutStrtgComboJson }
                },
                {editable: false, name:"ALLOC_STRTG",		width:"100px", align:"center", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:AllocStrtgComboJson }
                },
                //{editable:false, name: "PUTW_STRTG_CD",        width:"100px", align:"center"},//적치전략
                //{editable:false, name: "ALLOC_STRTG_CD",        width:"100px", align:"center"},//할당전략코드
                {editable:false, name: "SET_ITEM_YN", width:"100px", align:"center",
                    edittype:'select', formatter:'select', editoptions: { value: gridSetItemYn }
                },//세트제품여부
                {editable:false, name: "KEEP_TEMPE_GBN", 	width:"100px", align:"center",
                    edittype:'select', formatter:'select', editoptions: { value: gridKeepTempeGbnCdOption }
                },//보관온도구분
                {editable:false, name: "SEASON_YN",			width:"100px", align:"center",
                    edittype:'select', formatter:'select', editoptions: { value: gridSeasonYn }
                },//시즌여부
/*                {editable:false,  화면컬럼 도메인명 변경 처리 2017.08.04  //name: "MIN_UOM_CD",
                	name: "MIN_UOM", width:"100px", align:"center"},//최소UOM
                {editable:false, name: "LOCAL_EXPORT_GBN",    width:"100px", align:"center"},*/
                {editable: false, name:'MIN_UOM',			width:"100px", align:"center", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:minUomComboJson, maxlength:6 }
                },
                {editable: false, name:'LOCAL_EXPORT_GBN',	width:"100px", align:"center",
                	edittype:'select', formatter:'select', editoptions: { value:localExportComboJson }
                },
                {editable: false, name:'PROD_YN',			width:"100px", align:"center",
                	edittype:'select', formatter:'select', editoptions: { value:gridProdYn }
                },
                {editable: false, name:'SALES_YN',			width:"100px", align:"center",
                    edittype:'select', formatter:'select', editoptions: { value:gridSalesYn }
                },
                {editable:false, name: "USE_YN", 			width:"100px", align:"center",
                    edittype:'select', formatter:'select', editoptions: { value: gridUseYn }
                },//사용여부
                {editable:false, name: "REMARK",            width:"100px", align:"center"},//비고
                {editable:false, name: "LOT_ATTR_STRTG_CD", width:"100px", align:"center", hidden:true},//LOT전략
                {editable:false, name: "REPLACE_ITEM_CD",   width:"100px", align:"center", hidden:true} //대체제품
            ],
            pager: "#msItemHGridNavi",
            loadComplete: function(){
                var optionData = {};
                var ids = $msItemHGrid.jqGrid("getDataIDs");
                    if (ids && ids.length > 0) {
                        // 1. 그리드 첫 번째 ROW 포커스 이동.
                    $msItemHGrid.setFocus(0);
                }
                    var data = $msItemHGrid.getRowData(ids[0]);

                    ItemCdData = data.ITEM_CD;
                    ClientCdData = data.CLIENT_CD;

                    if (itemFlag) {
                    //화면 처음 로드 시 헤더, 디테일 그리드 생성 중 디테일 부분.
                    optionData = {
                        itemCd: data.ITEM_CD, // 제품코드
                        clientCd: data.CLIENT_CD //고객사
                    };

                    uomJson(optionData);
//                    centerJson(optionData);
                    itemFlag = false;

                } else {
                    //조회 버튼 이벤트 클릭 시 헤더 그리드 조회 후 ~ 디테일 부분 조회.
                    if (data.ITEM_CD !== null && data.ITEM_CD !== undefined) {
                            var searchData = {
                            itemCd: data.ITEM_CD
                        };
                        var tabId = $("#TabItem > li.active").data("tab-id");

                        if(tabId == "msItemTabUom"){
                            $msItemDGrid.paragonGridSearch(searchData);
                        }else {
                        }

                    } else {
                        $msItemDGrid.paragonGridSearch({ msItemItemCd: null });
                    }
                }
            },
            // When select row, call event function.
            onSelectRowEvent: function(currRowData, prevRowData){
                var tabId = $("#TabItem > li.active").data("tab-id");
                var data;
                rowDataList = currRowData;

                ItemCdData = currRowData.ITEM_CD;
                ClientCdData = currRowData.CLIENT_CD;

                data = {
                    itemCd: currRowData.ITEM_CD, //제품코드
                    clientCd: currRowData.CLIENT_CD //고객사
                };
                $msItemDGrid.paragonGridSearch(data);
            },//onSelectRowEvent end.
            ondblClickRow: function(id, iRow, iCol, e){
                rowDataList = $msItemHGrid.getRowData(iRow);
                var itemAddFlag = "2";

                fnAddDc(itemAddFlag,rowDataList);
            }
        });
    }
    //When create a grid, view data list. (uomJson)
    function uomJson(data){
        $msItemDGrid.paragonGrid({
            url: "/ctrl/master/item/getUomList",
            //page : 1,
            rowEditable:true,
            cellEditable:false,
            sortable: true,
            rownumbers: true,
            height: "119",
            postData: data,
            multiselect: true,
//            multielonly: true,
            shrinkToFit: true,
            rowClickFocus:true,
            domainId:"UOM",
            colModel: [
                {editable: false, name: "ITEM_CD", 		align: "center", hidden: true},
                {editable: false, name: "CLIENT_CD", 	align: "center", hidden: true},
                {editable: true,  name: "STD_UOM_CD", 	align: "center", hidden:true},
                {editable: true,  name: "STD_UOM", 		align: "center",
                    edittype:'select', formatter:'select', editoptions: { value:gridUomCdOption }
                },
                {editable: true,  name: "CONV_UOM_QTY", align: "center"},
                {editable: true,  name: "CONV_UOM_CD", 	align: "center", hidden:true},
                {editable: true,  name: "CONV_UOM", 	align: "center",
                    edittype:'select', formatter:'select', editoptions: { value:gridUomCdOption }
                },
                {editable: true,  name: "LOAD_GBN_CD", 	align: "center", hidden :true},
                {editable: true,  name: "LOAD_GBN", 	align: "center",
                    edittype:'select', formatter:'select', editoptions: { value:gridLoadGbnCdOptions }
                }//적재구분코드
            ],
            pager: "#msItemDGridNavi"
        });
    }

    function fnSearch(){
        //그리드 수정 여부 체크
        if (fnModCheck()) {
            var data = {
                clientCd		: $("#msItemClientCd").val(),
                itemCd			: $("#msItemItemCd").val(),
    	        largeClassCd    : $('#msItemLargeClassCd').val(),
    	        middleClassCd   : $('#msItemMiddleClassCd').val(),
    	        smallClassCd    : $('#msItemSmallClassCd').val(),
                useYn			: $("#msItemUseYn").val()
                //itemGbnCd : $('#itemGbnCd').val(),
            };
            $msItemHGrid.paragonGridSearch(data);
        }
    }

    //********** 2.About Event List Function. **********
    //[Fn] item Management Method Event List.
    function itemEvent(){

    	WMSUtil.changePop(proNm, 'Item');

        //createBtn Event.
        //msItemSearchBtn Event.
        $("#msItemSearchBtn").click(function() {
            fnSearch();
        });
        //msItemAddBtn Event.
        $("#msItemAddBtn").click(function() {
            var itemAddFlag = "1";
            fnAddDc(itemAddFlag,'');
        });
        //deleteBtn Event.
        $("#msItemDelBtn").click(function() {
            fnDel();
        });
        //ExcelBtn Event.
        $("#msItemExcelBtn").click(function() {
            var tabId = $("#TabItem > li.active a span").attr("data-domain-id");
            if("UOM" == tabId && null != $msItemDGrid.getGridParam('selrow')){
                $msItemDGrid.downloadExcel();
            }else{
                $msItemHGrid.downloadExcel();
            }
        });
        //Item Client Popup Btn Event.
//        $("#msItemClientPop").click(function(){
//            fnModalItemClientPopGrid();
//        });

        //제품 팝업
        $("#msItemItemPop").click(function(){
        	WMSUtil.popup.item('msItemItem', {clientCd : $('#'+ proNm +'ClientCd').val()})
        });
        $("#msItemReportBtn").click(function(){
            if(0 != $msItemHGrid.getGridParam("selarrrow").length){
                fnReport("/ctrl/master/item/itemLabelReport");
            }else{
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            }
        });

        $('#newItemGbnPopBtn').click(function(){
            fnModalItemGbnCdPop();
        });

    }
    //Tab Button Event
    function itemButtonEvent(){
        //1. Tab Click 후 분기 후 진행되어야 함.

        //itemAddrowBtn Event.
        $("#msItemDetailAddBtn, #msItemDetailAddBtnCenter").click(function() {
            //Click or Actived Tab id.
            var tabId = $("#TabItem > li.active").data("tab-id");
            fnAddTab(tabId);
        });
        //itemSaveBtn Event.
        $("#msItemDetailSaveBtn, #msItemDetailSaveBtnCenter").click(function(){
            var tabId = $("#TabItem > li.active").data("tab-id");
            if(tabId == "msItemTabUom"){
                fnSaveTabUom();
            }
        });
        //Item DelBtn Event.
        $("#msItemDetailDelBtn, #msItemDetailDelBtnCenter").click(function(){
            var tabId = $("#TabItem > li.active").data("tab-id");

            if(tabId == "msItemTabUom"){
                fnDelTabUom();
            }
        });
    }
    //[Fn] Create Popup Grid.
    //disabled
//    function fnModalItemClientPopGrid(){
//        PopApp.paragonOpenPopup({
//            ajaxUrl : '/ctrl/common/clientPopup',
//            id : 'modalClientPopup',
//            width : '550',
//            btnName : "수정",
////            title : "ClientInfo 검색",
//            domainId: "PWMOB101E_P1",
//            onload : function(modal) {
//                // 팝업화면 클릭 시 code, name.
//                var callBack ={
//                    "CLIENT_CD": "msItemClientCd",  // "", "text box id"
//                    "CLIENT_NM": "msItemClientNm"
//                };
//                App.setElIds(callBack);
//                modal.show();
//            }
//        });
//    }
    //[Fn] 보충전략 콤보박스 JSON 조회
    function fnReplStrtgJson(){
        $.ajax({
            url : "/ctrl/master/item/replStrtgList",
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                gridReplStrtgCdOption = Util.MakeGridOptions(result);
                //Util.MakeSelectOptions($("#createLotAttrStrtgCdPopup"),result);
            }
        });
    }



    //********** 3.Function Event Method Space.*********
    //[Fn] Creating item Popup Event Method.
    function fnAddDc(itemAddFlag,dataSet){

    	var modeFlag;
    	if(itemAddFlag === '1'){
    		modeFlag = 'I'
    	}else if(itemAddFlag === '2'){
    		modeFlag = 'U'
    	}else{
    		modeFlag = ''
    	}
        //App.prcsStart();
        PopApp.paragonOpenPopup({
            ajaxUrl	: "/ctrl/master/item/itemPopup",
            data	: {
            			rowData: dataSet,
            			modeFlag: modeFlag
            },
            id		: "createItemPop",
            width	: "90",
//            height	:"500",
            btnName	:"저장",
            domainId: "PWMMS109E_P1",
            visible	: true,
            onload	:function(modal){
/*            	if(itemAddFlag === "2"){
                    fnSettingDataInputText();
                }*/
                //App.prcsEnd();
            },
            callback	: function(data){
                $msItemHGrid.paragonGridReload();
                $msItemDGrid.paragonGridReload();
            }
        });
    }
    //[Fn] Add Row Grid.
    function fnAddTab(tabId){
        //1.Checking uom or center.
        if(tabId == "msItemTabUom"){
            $msItemDGrid.paragonGridAddRow({
                addData : {"ITEM_CD":ItemCdData, "CLIENT_CD":ClientCdData}
            });
        }else {
        }
    }//fnAddTab

    //[Fn] Grid Modify Checking.
    function fnModCheck() {
        return $msItemHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }
    //[Fn] Tab Grid Save UOM Data Row.
    function fnSaveTabUom(){
        //DataTable data key : value Key
        var saveUrl = "/ctrl/master/item/saveSentenceUom";
        var msg = "MSG_COM_CFM_003"; //저장하시겠습니까?

        var rowData = {
            modFlag     : "MOD_FLAG",
            itemCd      : "ITEM_CD",
            clientCd    : "CLIENT_CD",
            stdUomCd    : "STD_UOM",
            convUomQty  : "CONV_UOM_QTY",
            convUomCd   : "CONV_UOM",
            loadGbn     : "LOAD_GBN",
            loadGbnCd   : "LOAD_GBN_CD"
        };

        //1. get json data from List.
        var jsonData = $msItemDGrid.getSelectedJsonData("dt_data", rowData);

        var ids = $msItemDGrid.getGridParam("selarrrow");
        var totalIDs = $msItemDGrid.jqGrid("getDataIDs");

        //1. data change validation check.
        if (!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }
        //2
        var rowFlag = "";
        for(var i = 0 ; i < ids.length ; i++){
            rowFlag = $msItemDGrid.getRowData(ids[i]).MOD_FLAG;
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', $msItemDGrid.getRowData(ids[i]).STD_UOM); //[ {0} ]은(는) 변경된 값이 없습니다.
                return false;
            }
        }

        //3.
        var loadGbnFlag = false;
        for(var i = 0; i < ids.length; i++){//선택된 데이터
            $.each(totalIDs, function(index, value){//그리드 전체데이터
              if(ids[i] != value){
                  var idsData = $msItemDGrid.getRowData(ids[i]).LOAD_GBN;
                  var valueData = $msItemDGrid.getRowData(value).LOAD_GBN;
                  if(idsData == valueData){
                      Util.alert('MSG_MST_VAL_044'); //동일한 적재구분이 존재합니다.
                      loadGbnFlag = true;
                      return false;
                  }
              }
          })
        }
        if(loadGbnFlag){
            return false;
        }

        fnAjaxSave(jsonData, saveUrl, msg, 2);
    }

    //[Fn] Grid Save Data Row.
    function fnSave() {
        //DataTable data key : value Key
        var data = {
            ibCost          : "IB_COST",
            obCost          : "OB_COST",
            taxYn           : "TAX_YN",
            cbn             : "CBM",
            weight          : "WEIGHT",
            boxBarCode      : "BOX_BARCODE",
            itemBarCode     : "ITEM_BARCODE",
            distExpiryDays  : "DIST_EXPIRY_DAYS",
            putwStrtgCd     : "PUTW_STRTG_CD",
            allocStrtgCd    : "ALLOC_STRTG",
            lotAttrStrtgCd  : "LOT_ATTR_STRTG_CD",
            minUomCd        : "MIN_UOM_CD",
            setItemYn       : "SET_ITEM_YN",
            seasonYn        : "SEASON_YN",
            replaceItemCd   : "REPLACE_ITEM_CD",
            remark          : "REMARK",
            useYn           : "USE_YN"
        };


        //Validation 추가 필요.
        $.ajax({
            url     : "/ctrl/master/item/saveSentence",
            data    : JSON.stringify(data),
            type    : "POST",
            dataType    : "json",
            contentType : 'application/json; charset=utf-8',
            cache       : false,
            success     : function(data) {
                alert(data.msgTxt);
                $msItemHGrid.paragonGridReload();
                $msItemDGrid.paragonGridReload();
            }
        });
    }

    //[Fn] 호출 안함 주석처리
    function fnSettingDataInputText(){

        $("#saveFlag").val("U"); //수정모드

        //row1
        $("#createItemCdPopup").val(rowDataList.ITEM_CD);  //아이템코드
        $("#createItemNmPopup").val(rowDataList.ITEM_NM);  //아이템명
        $("#createItemSpecPopup").val(rowDataList.ITEM_SPEC);//아이템규격

        $("#createClientCdPopup").val(rowDataList.CLIENT_CD);//고객사
        $("#createItemGbnCdPopup").val(rowDataList.ITEM_GBN_CD);//제품구분
        $("#createKeepTempeGbnCdPopup").val(rowDataList.KEEP_TEMPE_GBN);//보관온도구분

        $("#createLargeClassCdPopup").val(rowDataList.LARGE_CLASS_CD);//대분류
        $("#createMiddleClassCdPopup").val(rowDataList.MIDDLE_CLASS_CD);//중분류
        $("#createSmallClassCdPopup").val(rowDataList.SMALL_CLASS_CD);//소분류

        $("#createIbCostPopup").val(rowDataList.IB_COST);//입고단가
        $("#createObCostPopup").val(rowDataList.OB_COST);//출고단가
        $("#createTaxYnPopup").val(rowDataList.TAX_YN);//과세여부

        $("#createHorizontalPopup").val(rowDataList.HORIZONTAL);//가로
        $("#createVerticalPopup").val(rowDataList.VERTICAL);//세로
        $("#createHeightPopup").val(rowDataList.HEIGHT);//높이

        $("#createCbnPopup").val(rowDataList.CBM);//용량
        $("#createWeightPopup").val(rowDataList.WEIGHT);//중량

        $("#createBoxBarcodePopup").val(rowDataList.BOX_BARCODE);//박스바코드
        $("#createItemBarcodePopup").val(rowDataList.ITEM_BARCODE);//제품바코드
        $("#createDistExpiryDaysPopup").val(rowDataList.DIST_EXPIRY_DAYS);//유통기한일수
        $("#createYmdGbnCdPopup").val(rowDataList.YMD_GBN);//유통기한일수

        $("#createPutwStrtgCdPopup").val(rowDataList.PUTW_STRTG);//적치전략
        $("#createAllocStrtgCdPopup").val(rowDataList.ALLOC_STRTG);//할당전략코드
        $("#createLotAttrStrtgCdPopup").val(rowDataList.LOT_ATTR_STRTG_CD);//LOT전략

        $("#createMinUomCdPopup").val(rowDataList.MIN_UOM);//최소UOM
        $("#createSetItemCdPopup").val(rowDataList.SET_ITEM_YN);//세트제품여부
        $("#createSeasonYnPopup").val(rowDataList.SEASON_YN);//계절성여부

        $("#createReplaceItemCdPopup").val(rowDataList.REPLACE_ITEM_CD);//대체제품
        $("#createRemarkPopup").val(rowDataList.REMARK);//비고
        $("#createUseYnPopup").val(rowDataList.USE_YN);//사용여부

        $("#localExportGbnCd").val(rowDataList.LOCAL_EXPORT_GBN);//내수수출구분

        $('#createItemCdPopup').attr('disabled', true);

    }
    //[Fn] Grid Delete Data Row. (제품관리 flag: 1 )
    function fnDel() {

        var checkFlag = $msItemHGrid.paragonGridCheckedDeleteData();

        if (checkFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/master/item/deleteSentence";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?
            var rowData = {
                modFlag: "MOD_FLAG",
                itemCd: "ITEM_CD",
                clientCd: "CLIENT_CD"
            };

            //1. 체크된 리스트.
            var jsonData = $msItemHGrid.getSelectedJsonDataChk("dt_data", rowData, $msItemHGrid);

            //ajax Event.
            fnAjaxSave(jsonData, saveUrl, msg, 1);
        }
    }
    //[Fn] Grid Delete Data Row. (기준단위 그리드)
    function fnDelTabUom() {

        var addFlag = $msItemDGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            //삭제버튼 이벤트 로직 수행.
            var saveUrl = "/ctrl/master/item/saveSentenceUom";
            var msg = "MSG_COM_CFM_001"; //삭제하시겠습니까?

            var rowData = {
                modFlag:    "MOD_FLAG",
                itemCd:     "ITEM_CD",
                clientCd:   "CLIENT_CD",
                stdUomCd:   "STD_UOM_CD"
            };

            //1. 체크된 리스트.
            var jsonData = $msItemDGrid.getSelectedJsonDataChk("dt_data", rowData, $msItemDGrid);

            //ajax Event.
            fnAjaxSave(jsonData, saveUrl, msg, 1);
        }
    }
    //[Fn] 저장 ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg, flag) {

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        App.prcsStart();
        $.ajax({
            url: saveUrl,
            data: jsonData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                App.prcsEnd();
                if (data.stsCd == "001") {
//                    App.prcsEnd();
                    //001 데이터 성공
                    alert(data.msgTxt);

                    if(flag === 1){
                        //제품관리
                        fnReloadGrid();
                    }

                    if(flag === 2){
                        //기준단위
                        fnReloadUomGrid();
                    }


                    if(flag === 3){
                        //물류센터
                    }
                }else{
                    alert(data.msgTxt);
                }

                if (data.stsCd == "002") {
                    //TODO: 재정의 필요.
                }
            }
        });
    }
    //[Fn] Reload Grid Method
    function fnReloadGrid() {
        $msItemHGrid.paragonGridReload();
        $msItemDGrid.paragonGridReload();
    }
    //[Fn] Reload Grid Method
    function fnReloadUomGrid() {
        $msItemDGrid.paragonGridReload();
    }
    //[Fn] Reload Grid Method
    function fnReloadCenterGrid() {
//        $msItemD2Grid.paragonGridReload();
    }


}();

$("document").ready(function(){
    MasterItemApp.init();
});

