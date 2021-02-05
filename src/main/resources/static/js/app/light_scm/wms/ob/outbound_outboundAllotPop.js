/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 출고승인-배분조정 팝업[CreateOutboundAllotApp]
 * Program Code     : PWMOB102E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 3. 28.  		First Draft.
 */

var CreateOutboundAllotApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMOB102E_P1';
	var proNm = 'obApprAllot';

    var $obApprAllotHGrid = $("#obApprAllotHGrid");
    var $obApprAllotDGrid = $("#obApprAllotDGrid");

    var firstLoad = true;

    var getData = $("#modalAllotPopup").PopAppGetData();

    var gridObGbnCd;
    var gridExportCountryCd;
    var gridDalatYn;
    var gridItemStCd;

    return{
        init:function(){

            gridObGbnCd 			= WMSUtil.fnCombo.grid_selectBox('obApprAllotObGbnCd', 'OB_GBN_CD', getData.obGbnCd);

            gridItemStCd 			= WMSUtil.fnCombo.grid('ITEM_ST_CD');

            WMSUtil.fnCombo.selectBox('obApprAllotNobRsCd', 'NOB_RS_CD');

            gridExportCountryCd  	= WMSUtil.fnCombo.grid('COUNTRY_CD');

            gridDalatYn  			= WMSUtil.fnCombo.grid('YN' , 'DESC');

            //조회시 배분 수량추천 생성
            //fnAllotReg();

            fnEvents();

            //초기데이터 세팅
            fnInfo();

            fnList();

        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    //이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('obApprAllotObPlanYmd', true, true);

//    	getData["obGbnCd"] = $("#obApprAllotObGbnCd").val();
//    	if($("#obApprAllotLack").is(":checked")){
//    		getData["lackChk"] = "Y";
//    	}else{
//    		getData["lackChk"] = "N";
//    	}

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Store');
        WMSUtil.changePop(proNm, 'RStore');

        //고객사 팝업
        $("#obApprAllotClientCdPopup").click(function(){
        	WMSUtil.popup.client('obApprAllotClient');
        });
        //판매처 팝업
        $("#obApprAllotStoreCdBtn").click(function(){
        	WMSUtil.popup.store('obApprAllotStore', {clientCd : $('#obApprAllotClientCd').val()});
        });
        //납품처 팝업
        $("#obApprAllotRStoreCdBtn").click(function(){
        	WMSUtil.popup.rstore('obApprAllotRStore', {clientCd : $('#obApprAllotClientCd').val()});
        });

        //조회
        $("#obApprAllotSearchBtn").click(function(){
        	fnSearch();
        });
        //저장 버튼 이벤트
        $("#obApprAllotSaveBtn").click(function(){
            fnSave();
        });

        //헤더 닫기버튼
        $('#obApprAllotHeaderCloseBtn').click(function(){
            $("#modalAllotPopup").popupCallback();
            $("#modalAllotPopup").paragonClosePopup();
        })

        //닫기버튼
        $('#obApprAllotBottomCloseBtn').click(function(){
            $("#modalAllotPopup").popupCallback();
            $("#modalAllotPopup").paragonClosePopup();
        });

        //keyup
        $('#obApprAllotClientCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obApprAllotObNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obApprAllotStoreCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obApprAllotCarNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });

        $('#obApprAllotRStoreCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obApprAllotSoNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#obApprAllotDeliveryDgr').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        //일괄생성버튼
        $("#obApprAllotQtyBatchBtn").click(function() {
            fnBatch();
        });

    }

    //초기 데이터 세팅
    function fnInfo(){
        $("#obApprAllotObNo").val(getData.obNo);
        $("#obApprAllotClientCd").val(getData.clientCd);
        $("#obApprAllotClientNm").val(getData.clientNm);

//        WMSUtil.fnTagYmdSetting('obApprAllotObPlanYmd', true, true);

    	$('#obApprAllotObPlanYmdFr').val(getData.ymdFr);
    	$('#obApprAllotObPlanYmdTo').val(getData.ymdTo);

        $("#obApprAllotStoreCd").val(getData.storeCd);
        $("#obApprAllotStoreNm").val(getData.storeNm);
        $("#obApprAllotRStoreCd").val(getData.rStoreCd);
        $("#obApprAllotRStoreNm").val(getData.rStoreNm);
        $("#obApprAllotCarNo").val(getData.carNo);
        $("#obApprAllotDeliveryDgr").val(getData.deleteDgr);
        $("#obApprAllotObGbnCd").val(getData.obGbnCd);
        $("#obApprAllotSoNo").val(getData.soNo);

    }

    //초기 데이터 세팅
    function sendData(){
    	return {
	    	obNo        : $("#obApprAllotObNo").val(),
	        clientCd    : $("#obApprAllotClientCd").val(),
	        clientNm    : $("#obApprAllotClientNm").val(),
	//        obPlanYmd   : WMSUtil.fnTagYmdSetting('obApprAllotObPlanYmd', true, true);
	        ymdFr       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprAllotObPlanYmdFr").val()),
	        ymdTo       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprAllotObPlanYmdTo").val()),
	        storeCd     : $("#obApprAllotStoreCd").val(),
	        storeNm     : $("#obApprAllotStoreNm").val(),
	        rStroeCd    : $("#obApprAllotRStoreCd").val(),
	        rStroeNm    : $("#obApprAllotRStoreNm").val(),
	        carNo       : $("#obApprAllotCarNo").val(),
	        deliveryDgr : $("#obApprAllotDeliveryDgr").val(),
	        obGbnCd     : $("#obApprAllotObGbnCd option:selected").val(),
	        soNo        : $("#obApprAllotSoNo").val(),
	        lackChk     : ($("#obApprAllotLack").is(":checked") === true ? "Y" : "N")
    	}
    }

    //그리드 초기화
    function fnList(){
        $obApprAllotHGrid.paragonGrid({
            url					:"/ctrl/outbound/outboundApproval/listOutboundApprAllotPop",
            sortable			: true,
            rownumbers			: true,
            rowEditable			: true,
            cellEditable		: false,
            height				: "140",
            //multiselect: true,
            //multielonly: true,
            rowClickFocus		: true,
            shrinkToFit			: false,
            domainId			: "OB_ITEM_LIST",
            postData			: sendData(),
            colModel: [
                {editable: false, name: "CLIENT_CD",       		width:"100px", align: "center", hidden: true},
                {editable: false, name: "OB_NO",            	width:"100px", align: "center", hidden: true},
                {editable: false, name: "OB_GBN_CD",        	width:"100px", align: "center", hidden: true},
                {editable: false, name: "OB_GBN", width: "80px", align: "center",
                    edittype: 'select', formatter: 'select', editoptions: { value: gridObGbnCd }
                , hidden: true},
                {editable: false, name:'LOT_ATTR1',				width:"80px",  align:"center",
                    edittype:'select', formatter:'select', editoptions: { value : gridExportCountryCd }
                },
                {editable: false, name:'LOT_ATTR2',      		width:"80px",  align:"center",
                    edittype:'select', formatter:'select', editoptions: { value : gridDalatYn }
                },
                {editable: false, name: "ITEM_CD",          	width:"80px", align: "center"},
                {editable: false, name: "ITEM_NM",         		width:"150px", align: "center"},
                {editable: false, name: "ITEM_SPEC",        	width:"100px", align: "center", hidden:true},
                {editable: false, name: "ITEM_ST_CD",       	width:"80px", align: "center", hidden:true},
                {editable: false, name: 'ITEM_ST',				width:"100px", align:"center",
                    edittype:'select', formatter:'select', editoptions: { value : gridItemStCd }
                },
                {editable: false, name: "CONV_UOM_CD",      	width:"100px", align: "center", hidden:true},
                {editable: false, name: "UOM", 					width:"100px", align: "center"},
                {editable: false, name: "CONV_UOM_QTY", 		width:"80px", align: "right", hidden: true},
                {editable: false, name: "PKQTY", 				width:"100px", align: "center", formatter: "integer"},
                {editable: false, name: "SO_QTY", 				width:"100px", align: "right", hidden: true, formatter: "integer"},
                {editable: false, name: "SO_TOT_QTY", 			width:"100px", align: "right", formatter: "integer"},
                {editable: false, name: "SO_BOX_QTY",       	width:"100px", align: "right", formatter: "integer"},
                {editable: false, name: "SO_EA_QTY",        	width:"100px", align: "right", formatter: "integer"},
                {editable: false, name: "WEIGHT",           	width:"100px", align: "right", hidden: true},
                {editable: false, name: "AVAIL_STOCK_QTY", 		width:"100px", align: "right", formatter: "integer", hidden: true},
                {editable: false, name: "AVAIL_STOCK_TOT_QTY", 	width:"100px", align: "right", formatter: "integer"},
                {editable: false, name: "AVAIL_STOCK_BOX_QTY",  width:"100px", align: "right", formatter: "integer"},
                {editable: false, name: "AVAIL_STOCK_EA_QTY",   width:"100px", align: "right", formatter: "integer"},
                {editable: false, name: "LACK_QTY",				width:"100px", align: "right", formatter: "integer", hidden: true},
                {editable: false, name: "LACK_TOT_QTY", 		width:"100px", align: "right", formatter: "integer", hidden: true},
                {editable: false, name: "LACK_BOX_QTY",     	width:"100px", align: "right", formatter: "integer", hidden: true},
                {editable: false, name: "LACK_EA_QTY",      	width:"100px", align: "right", formatter: "integer", hidden: true},

                {editable: false, name: "STORE_CD",      		width:"100px", align: "right", hidden: true},
                {editable: false, name: "RSTORE_CD",      		width:"100px", align: "right", hidden: true},
                {editable: false, name: "CAR_NO",      			width:"100px", align: "right", hidden: true},
                {editable: false, name: "DELIVERY_DGR",      	width:"100px", align: "right", hidden: true},
                {editable: false, name: "OB_GBN_CD",	      	width:"100px", align: "right", hidden: true},
                {editable: false, name: "SO_NO",      			width:"100px", align: "right", hidden: true},

            ],
            groupHeaders:[
                          {
                        	  rowspan : true,
                        	  header:[
                        	          {start: 'SO_TOT_QTY', length: 3 , domain:"SO_QTY"},
                        	          {start: 'AVAIL_STOCK_TOT_QTY', length: 3 , domain:"AVAIL_STOCK_QTY"},
                        	          {start: 'LACK_TOT_QTY', length: 3 , domain:"LACK_QTY"}
                        	          ]
                          }
          ],
          pager			: "#obApprAllotHGridNavi",
            gridComplete: function(){

            	//그리드 데이터 1건 이상일때 포커스
                var ids = $obApprAllotHGrid.jqGrid("getDataIDs");
                if (ids && ids.length > 0) {
                    $obApprAllotHGrid.setFocus(0);

                    var data = $obApprAllotHGrid.getRowData(ids[0]);
                    var dataJson = {
//                    		clientCd	: data.CLIENT_CD,
//                    		obNo        : data.OB_NO,
                            itemCd		: data.ITEM_CD,
                            lotAttr1    : data.LOT_ATTR1,
                            lotAttr2    : data.LOT_ATTR2,
//                            obGbnCd		: data.OB_GBN_CD,
//                            obPlanYmd   : WMSUtil.fnTagYmdSetting('obApprAllotObPlanYmd', true, true),
//                            ymdFr       : WMSUtil.fnDateSetting.yyyymmdd($('#obApprAllotObPlanYmdFr').val()),
//                            ymdTo       : WMSUtil.fnDateSetting.yyyymmdd($('#obApprAllotObPlanYmdTo').val()),
//                            storeCd     : data.STORE_CD,
//                            rStroeCd    : data.RSTORE_CD,
//                            carNo       : data.CAR_NO,
//                            deliveryDgr : data.DELIVERY_DGR,
//                            obGbnCd     : data.OB_GBN_CD,
//                            soNo        : data.SO_NO
                	    	obNo        : $("#obApprAllotObNo").val(),
                	        clientCd    : $("#obApprAllotClientCd").val(),
                	        ymdFr       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprAllotObPlanYmdFr").val()),
                	        ymdTo       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprAllotObPlanYmdTo").val()),
                	        storeCd     : $("#obApprAllotStoreCd").val(),
                	        rStroeCd    : $("#obApprAllotRStoreCd").val(),
                	        carNo       : $("#obApprAllotCarNo").val(),
                	        deliveryDgr : $("#obApprAllotDeliveryDgr").val(),
                	        obGbnCd     : $("#obApprAllotObGbnCd option:selected").val(),
                	        soNo        : $("#obApprAllotSoNo").val()
                    };
                }else{
                }

                //화면 처음 로딩시 상세그리드 초기화, 2번째부터는 조회.
                if (firstLoad) {

//                    fnDel();
//                    fnAllotReg();
                    fnListStore(dataJson);

                } else {
                	if(ids.length != 0){
                		$obApprAllotDGrid.paragonGridSearch(dataJson);
                	}else{
                		$obApprAllotDGrid.jqGrid('clearGridData');

                	}
                }
            },
            onSelectRowEvent: function(currRowData, prevRowData){
            	var data = currRowData;
                $obApprAllotDGrid.paragonGridSearch({
//            		clientCd	: data.CLIENT_CD,
//            		obNo        : data.OB_NO,
                    itemCd		: data.ITEM_CD,
                    lotAttr1    : data.LOT_ATTR1,
                    lotAttr2    : data.LOT_ATTR2,
//                    obGbnCd		: data.OB_GBN_CD,
////                    obPlanYmd   : WMSUtil.fnTagYmdSetting('obApprAllotObPlanYmd', true, true),
//                    ymdFr       : WMSUtil.fnDateSetting.yyyymmdd($('#obApprAllotObPlanYmdFr').val()),
//                    ymdTo       : WMSUtil.fnDateSetting.yyyymmdd($('#obApprAllotObPlanYmdTo').val()),
//                    storeCd     : data.STORE_CD,
//                    rStroeCd    : data.RSTORE_CD,
//                    carNo       : data.CAR_NO,
//                    deliveryDgr : data.DELIVERY_DGR,
//                    obGbnCd     : data.OB_GBN_CD,
//                    soNo        : data.SO_NO
        	    	obNo        : $("#obApprAllotObNo").val(),
        	        clientCd    : $("#obApprAllotClientCd").val(),
        	        ymdFr       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprAllotObPlanYmdFr").val()),
        	        ymdTo       : WMSUtil.fnDateSetting.yyyymmdd($("#obApprAllotObPlanYmdTo").val()),
        	        storeCd     : $("#obApprAllotStoreCd").val(),
        	        rStroeCd    : $("#obApprAllotRStoreCd").val(),
        	        carNo       : $("#obApprAllotCarNo").val(),
        	        deliveryDgr : $("#obApprAllotDeliveryDgr").val(),
        	        obGbnCd     : $("#obApprAllotObGbnCd option:selected").val(),
        	        soNo        : $("#obApprAllotSoNo").val()
            });
            },
        });
    }

    //상세 그리드 초기화
    function fnListStore(dataJson){
        $obApprAllotDGrid.paragonGrid({
            url                 : "/ctrl/outbound/outboundApproval/listOutboundApprAllotPopStoreList",
            sortable			: true,
            rownumbers			: true,
            height				: "140",
            rowEditable			: true,
//            cellEditable		: false,
//            multielonly: true,
            multiselect			: true,
//            loadui				: 'disable',
//            rowClickFocus		: true,
            shrinkToFit			: false,
            domainId			: "OB_STORE_LIST",
            rowNum 				: 10000,
            postData			: dataJson,
            colModel			: [
                {editable: false, name: "OB_NO",            width:"100px", align: "center", hidden: true},
                {editable: false, name: "OB_DETAIL_SEQ",    width:"100px", align: "center", hidden: true},
                {editable: false, name: "ITEM_CD",          width:"100px", align: "center", hidden: true},
                {editable: false, name: "STORE_CD",         width:"100px", align: "center", hidden: true},
                {editable: false, name: "OB_GBN_CD",        width:"100px", align: "center", hidden: true},
                {editable: false, name: "PROMOTION_GBN",   width: "35px",  align: "center" },
                {editable: false, name: "OB_GBN", 			width:"150px", align: "center",
                    edittype: 'select', formatter: 'select', editoptions: { value: gridObGbnCd }
                },
                {editable: false, name: "STORE_NM",         width:"200px", align: "left", 	hidden: false},
                {editable: false, name: "SO_NO",            width:"100px", align: "center"	},
                {editable: false, name: "OB_NO",            width:"100px", align: "center"	},
                {editable: false, name: "OB_GBN_CD",        width:"100px", align: "center", hidden: true},
                {editable: false, name: "PKQTY",	        width:"100px", align: "center", hidden: true},
                {editable: false, name: "SO_QTY",			width:"100px", align: "right",  formatter: "integer", hidden: true},
                {editable: false, name: "SO_TOT_QTY", 		width:"100px", align: "right", 	formatter: "integer"},
                {editable: false, name: "SO_BOX_QTY",       width:"100px", align: "right", 	formatter: "integer"},
                {editable: false, name: "SO_EA_QTY",        width:"100px", align: "right", 	formatter: "integer"},
                {editable: false, name: "ALLOT_QTY", 		width:"100px", align: "right", 	formatter: "integer", hidden: true},
                {editable: false, name: "ALLOT_TOT_QTY", 	width:"100px", align: "right", 	formatter: "integer"},
                {editable: true,  name: "ALLOT_BOX_QTY",    width:"100px", align: "right",
                	required: true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).on('blur', function(e){
                                if($obApprAllotDGrid.getRow(rowid,"ALLOT_BOX_QTY").trim() == ''){
                                    $obApprAllotDGrid.setCell("ALLOT_BOX_QTY",0,rowid);
                                }

                                var ids = $obApprAllotDGrid.getDataIDs();
                                for(var i = 0; i < ids.length; i++){
                                	$obApprAllotDGrid.jqGrid('saveRow', ids[i], true, 'clientArray');
                                }

                                setAllotTotQty(rowid);

                                gridIntLengthLimit($(this), e, 9);

                            });


                        }
                    }
                },
                {editable: false, name: "ALLOT_EA_QTY",     	width:"100px", align: "right", formatter: "integer",
                	//required: true,
                    editoptions : {
                        maxlength : 11,
                        dataInit : function(el) {
                            var rowid = $(el)[0].attributes.rowid.value;
                            $(el).onlyNumber();
                            $(el).blur(function(e){
                                if($obApprAllotDGrid.getRow(rowid,"ALLOT_EA_QTY").trim() == ''){
                                    $obApprAllotDGrid.setCell("ALLOT_EA_QTY",0,rowid);
                                }
                                setAllotTotQty($(el)[0].attributes.rowid.value);

                                gridIntLengthLimit($(this), e, 9);
                            });

                        },
                    }
                },
                {editable: false, name: "CONV_UOM_QTY", 	width:"100px", align: "center", formatter: "integer", hidden: true},
                {editable: false, name: "REMARK",           width:"200px", align: "left"	},
            ],
            groupHeaders: [{
                rowspan: true,
                header: [
                    { start: 'SO_TOT_QTY', length: 3, domain: "SO_QTY" },
                    { start: 'ALLOT_TOT_QTY', length: 3, domain: "ALLOT_QTY" }
                ]
            }],
//            pager: "#obApprAllotDGridNavi",
            footerrow		: true,
            userDataOnFooter: true,
            gridComplete : function(){
            	//그리드 아래 부분 합계
            	var $footRow = $obApprAllotDGrid.closest(".ui-jqgrid-bdiv").next(".ui-jqgrid-sdiv").find(".footrow");
//

            	var colArr = ['OB_GBN','STORE_NM','SO_NO','ITEM_CD'];
            	if(firstLoad){
            		for(var i = 0; i < colArr.length ; i++){
            			$('.footrow > td[aria-describedby="'+proNm+'DGrid_'+colArr[i]+'"]').css("border-right-color", "transparent");
            		}
            	    $('.footrow >td[aria-describedby="'+proNm+'DGrid_OB_NO"]')
    	    		.css("text-align", "right").css('color', '#363636').text('Total : ');

	            	firstLoad = false;
            	}

            	//총합계
            	fnTotalSum();


            	$obApprAllotDGrid.on('mouseover', function(){
            		fnTotalSum();
            	})
            }
        });
    }

    //전체 재고 합계 조회
    function fnTotalSum(){
    	var $grid =$obApprAllotDGrid;

    	$grid.jqGrid('footerData','set', { SO_TOT_QTY 		: $grid.jqGrid('getCol', 'SO_TOT_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { SO_BOX_QTY 		: $grid.jqGrid('getCol', 'SO_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { SO_EA_QTY 		: $grid.jqGrid('getCol', 'SO_EA_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { ALLOT_TOT_QTY 		: $grid.jqGrid('getCol', 'ALLOT_TOT_QTY',false,'sum')});

		$grid.jqGrid('footerData','set', { ALLOT_BOX_QTY 		: $grid.jqGrid('getCol', 'ALLOT_BOX_QTY',false,'sum')});

    	$grid.jqGrid('footerData','set', { ALLOT_EA_QTY 		: $grid.jqGrid('getCol', 'ALLOT_EA_QTY',false,'sum')});
    }

    //총수량
    function setAllotTotQty(rowid){
        var allotTotQty = 0;

        var pkqty 	= Number($obApprAllotDGrid.getRow(rowid,"PKQTY"));
        var box 	= Number($obApprAllotDGrid.getRow(rowid,"ALLOT_BOX_QTY"));
        var ea 		= Number($obApprAllotDGrid.getRow(rowid,"ALLOT_EA_QTY"));

        allotTotQty =  box * pkqty + ea;
        $obApprAllotDGrid.setCell("ALLOT_QTY",		allotTotQty,rowid);
        $obApprAllotDGrid.setCell("ALLOT_TOT_QTY",	allotTotQty,rowid);

        //할당총수량이 주문수량보다 많을 경우 유효성검사
        var rowData =  $obApprAllotDGrid.getRowData(rowid);

        if(Number(rowData.SO_QTY) < allotTotQty){
        	Util.alert('MSG_OUTRI_VAL_052'); //주문수량 이상 배분수량을 입력 할수 없습니다.

        	$obApprAllotDGrid.setCell("ALLOT_QTY",		0, rowid);
        	$obApprAllotDGrid.setCell("ALLOT_TOT_QTY",	0, rowid);
        	$obApprAllotDGrid.setCell("ALLOT_BOX_QTY",	0, rowid);
        	$obApprAllotDGrid.setCell("ALLOT_EA_QTY",	0, rowid);
        	fnTotalSum();
        	return false;
        }

        fnTotalSum();
    }

    //저장
    function fnSave(){
        var saveUrl = "/ctrl/outbound/outboundApproval/updateOutboundApprAllotPop";

        var rowData = {
            modFlag		: "MOD_FLAG",
            obNo		: "OB_NO",
            obDetailSeq	: "OB_DETAIL_SEQ",
            itemCd		: "ITEM_CD",
            allotTotQty	: "ALLOT_TOT_QTY",
            allotBoxQty	: "ALLOT_BOX_QTY",
            allotEaQty	: "ALLOT_EA_QTY",
            convUomQty	: "CONV_UOM_QTY",
            nobRsCd		: ""
        };

        //1. 체크된 리스트.
        var jsonData = $obApprAllotDGrid.getSelectedJsonData("dt_data", rowData);

        if (!jsonData){
            //Must Change Paragon Message style (to-do).
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return;
        }

        //수정모드 그리드 모두 저장모드로 변경
        var idx = $obApprAllotDGrid.getGridParam("selarrrow");
        for(var i = 0; i < idx.length; i++){
        	$obApprAllotDGrid.jqGrid('saveRow', idx[i], true, 'clientArray');
        }

        var checkTotQty = 0;
        var rowFlag = "";
        var valiFlag = false;
        $.each(idx, function(index, value){
        	var rowdata = $obApprAllotDGrid.getRowData(value);
        	rowFlag = rowdata.MOD_FLAG;

            if(parseFloat(rowdata.SO_TOT_QTY) < parseFloat(rowdata.ALLOT_TOT_QTY)){
                Util.alert('MSG_OUTRI_VAL_052'); //주문수량 이상 배분수량을 입력 할수 없습니다
                valiFlag = true;
                return;
            }

//          if(!(rowdata.ALLOT_BOX_QTY)){
//          Util.alert('MSG_OUTRI_VAL_015'); //배분환산수량 항목은 필수 입력입니다.
//          return;
//      }
//      if(rowdata.ALLOT_BOX_QTY.trim().length == 0 ){
//          Util.alert('MSG_OUTRI_VAL_016'); //배분환산수량은 공백만으로 입력할 수 없습니다.
//          return;
//      }
//
//      if(!(rowdata.ALLOT_EA_QTY)){
//          Util.alert('MSG_OUTRI_VAL_017'); //배분낱개수량은 항목은 필수 입력입니다.
//          return;
//      }
//      if(rowdata.ALLOT_EA_QTY.trim().length == 0 ){
//          Util.alert('MSG_OUTRI_VAL_018'); //배분낱개수량은 공백만으로 입력할 수 없습니다.
//          return;
//      }
//      if(parseFloat(rowdata.ALLOT_BOX_QTY) == 0 && parseFloat(rowdata.ALLOT_EA_QTY) == 0){
//          Util.alert('MSG_OUTRI_VAL_019'); //배분환산수량, 낱개수량은 0을 초과하여 입력해야 합니다.
//          return;
//      }
//      if(parseFloat(rowdata.ALLOT_BOX_QTY) < 0 || parseFloat(rowdata.ALLOT_EA_QTY) < 0){
//          Util.alert('MSG_OUTRI_VAL_020'); //배분환산수량, 낱개수량 음수를 입력할 수 없습니다.
//          return;
//      }
//            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
//            	Util.alert('MSG_COM_VAL_071', rowData.SO_NO); //[ {0} ]은(는) 변경된 값이 없습니다.
//            	valiFlag = true;
//            	return false;
//            }
        });
        if(valiFlag) return false;


        //전체 로우데이터
//        var rowDatas = $obPickDGrid.getRowData();
//
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
//                return;
//            }
//            pickTotQty = 0;
//        }


//        var selectId = $obApprAllotHGrid.jqGrid('getGridParam','selrow');
//        if(Number($obApprAllotHGrid.getRowData(selectId).SO_TOT_QTY) < checkTotQty){
//            Util.alert('MSG_OUTRI_ERR_014'); //배분총수량이 가용재고를 초과하였습니다.
//            return;
//        }

        var data = JSON.parse(jsonData);
        var msg = "MSG_COM_CFM_002"; //수정하시겠습니까?

        data.nobRsCd = $("#obApprAllotNobRsCd").val();

        //ajax
        WMSUtil.ajax(JSON.stringify(data), saveUrl, msg, function(){
        	$obApprAllotHGrid.paragonGridReload();
    	})

    }


    //조회
    function fnSearch(){
        if($("#obApprAllotClientCd").val().length == 0){//고객사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#obApprAllotClientCd").focus();
            return;
        }else if($("#obApprAllotClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#obApprAllotClientCd").focus();
            return;
        }

/*        if($("#obApptAllotObPlanYmdFr").val().length == 0){//출고예정일
            Util.alert('MSG_OUTRI_VAL_001'); //출고예정일자 항목은 필수 입력입니다.
            $("#obApptAllotObPlanYmdFr").focus();
            return;
        }else if($("#obApptAllotObPlanYmdFr").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_002'); //출고예정일자는 공백만으로 입력할 수 없습니다.
            $("#obApptAllotObPlanYmdFr").focus();
            return;
        }*/

/*        if($("#obApptAllotObPlanYmdTo").val().length == 0){
            Util.alert('MSG_OUTRI_VAL_001'); //출고예정일자 항목은 필수 입력입니다.
            $("#obApptAllotObPlanYmdTo").focus();
            return;
        }else if($("#obApptAllotObPlanYmdTo").val().trim().length == 0){
            Util.alert('MSG_OUTRI_VAL_002'); //출고예정일자는 공백만으로 입력할 수 없습니다.
            $("#obApptAllotObPlanYmdTo").focus();
            return;
        }*/


        //조회 배분 수량 먼저 삭제 처리
//        fnDel();

//        console.log(sendData());

        $obApprAllotHGrid.paragonGridSearch(sendData());

        //조회시 배분 수량추천 생성
//        fnAllotReg();
    }

    //데이터
    function sendData(){

        var lackChk = "N";
        if($("#obApprAllotLack").is(":checked") === true) {
            lackChk = "Y";
        }



    	return {
    		clientCd		: $("#obApprAllotClientCd").val(),
    		ymdFr			: WMSUtil.fnDateSetting.yyyymmdd($('#obApprAllotObPlanYmdFr').val()),
    		ymdTo			: WMSUtil.fnDateSetting.yyyymmdd($('#obApprAllotObPlanYmdTo').val()),
    		obNo			: $("#obApprAllotObNo").val(),
    		carNo			: $("#obApprAllotCarNo").val(),
    		deliveryDgr		: $("#obApprDeliveryDgr").val(),
    		storeCd			: $("#obApprAllotStoreCd").val(),
    		soNo			: $("#obApprAllotSoNo").val(),
    		rstoreCd		: $("#obApprAllotRStoreCd").val(),
    		obGbnCd			: $("#obApprAllotObGbnCd").val(),
    		lackChk			: lackChk
    	}
    }

    function fnAllotReg() {
        var jsonData = JSON.stringify(sendData());

            //ajax Event.
            $.ajax({
                url			: "/ctrl/outbound/outboundApproval/obApprovalAllotReg",
                data		: jsonData,
                dataType	: "json",
                type		: "POST",
                cache		: false,
                contentType	: 'application/json; charset=utf-8',
                success		: function(data) {

                    if (data.stsCd == "001") {
                        //001 데이터 성공
                        //alert(data.msgTxt);
                        //fnReloadGrid();
                    }

                    if (data.stsCd == "002") {
                        //TODO: 재정의 필요.
                        // console.log(data);
                    }

                }
            });
    }


    //[Fn] Grid Delete Data Row.
    function fnDel() {

        //var addFlag = $outboundPlanGrid.paragonGridCheckedDeleteData();

            //ajax Event.
            $.ajax({
                url			: "/ctrl/outbound/outboundApproval/deleteObApprAllot",
                data		: '',
                dataType	: "json",
                type		: "POST",
                cache		: false,
                contentType	: 'application/json; charset=utf-8',
                success		: function(data) {
                    // console.log(data);

                    if (data.stsCd == "001") {
                        //001 데이터 성공
                        //alert(data.msgTxt);
                        //fnReloadGrid();
                    }

                    if (data.stsCd == "002") {
                        //TODO: 재정의 필요.
                        // console.log(data);
                    }

                }
            });
    }

    //일괄생성
    function fnBatch() {

        var jsonData = $obApprAllotDGrid.getSelectedJsonData();
//        if (!jsonData){
//            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
//            return;
//        }

        var ids = $obApprAllotDGrid.jqGrid('getDataIDs');
//        var gridCarNo   = $("#obEntryCarNoBatchCarNo").val();
//        var gridSealNo  = $("#obEntryCarNoBatchSealNo").val();
//        var gridContainerNo = $("#obEntryCarNoBatchContainerNo").val();

//        console.log("ids==>"+ids);
        for (var i = 0; i < ids.length; i++) {

            var rowId=ids[i];

            //jqg_그리드id_ 패턴
//            if($("input:checkbox[id='jqg_obApprAllotDGrid_"+ids[i]+"']").is(":checked")){
//                console.log("ids2==>"+ids);
                $obApprAllotDGrid.jqGrid('setRowData', rowId , {'ALLOT_TOT_QTY': 0 });
                $obApprAllotDGrid.jqGrid('setRowData', rowId , {'ALLOT_BOX_QTY': 0 });
                $obApprAllotDGrid.jqGrid('setRowData', rowId , {'ALLOT_EA_QTY': 0 });

//            }
        }

        fnTotalSum();
    }

}();

$(document).ready(function(){
     CreateOutboundAllotApp.init();
});
