/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 입고예정등록 - 입고예정등록 팝업
 * Program Code     : PWMIB101E_P1
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 23.        First Draft.
 */
var InboundPlanCreatePopApp = function () {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMIB101E_P1';
	var proNm = 'ibPlan';

    // [El]프로그램 그리드
    var $ibPlanPopGrid = $("#ibPlanPopGrid");

    var $ibPlanHGrid = $("#ibPlanHeaderGrid")

    var $callBackInput;

    var getData = $("#modifyIbPlanPop").PopAppGetData();
    var modify = getData.gbn;
    var pData = "";
    if(modify === true) pData = getData.rowData;

    var itemGbnCombo;
    var itemStatusCombo;
	var gridExportCountryCd;
	var gridDalatYn;

    var headerEditFlag = false;

    var modCount = 0;

    return {
        init: function () {

        	itemGbnCombo 			= WMSUtil.fnCombo.grid_selectBox('popIbGbnCd', 'IB_GBN_CD');

        	itemStatusCombo 		= WMSUtil.fnCombo.grid('ITEM_ST_CD');

        	gridExportCountryCd	 	= WMSUtil.fnCombo.grid('COUNTRY_CD');

        	gridDalatYn	 			= WMSUtil.fnCombo.grid('YN', 'DESC');

        	fnEvents();

        	fnList(); //grid

            if(modify === true){
                fnInfo();
            }


        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    function fnInfo(){
    	console.log(pData);
    	$('#ibPlanPopIbNo').val(pData.IB_NO);
    	$('#ibPlanPopClientCd').val(pData.CLIENT_CD);
    	$('#ibPlanPopSupplierCd').val(pData.SUPPLIER_CD);
    	$('#ibPlanPopYmdFr').val(pData.IB_PLAN_YMD);
    	$('#ibPlanPopCarNo').val(pData.CAR_NO);
    	$('#popIbGbnCd').val(pData.IB_GBN_CD);
    	$('#popRoPlanPoNo').val(pData.PO_NO);
    	$('#ibPlanPopSupplierNm').val(pData.SUPPLIER_NM);
    	$('#ibPlanPopPoNo').val(pData.PO_NO);
    	$('#ibPlanPopPoYmdFr').val(pData.PO_YMD);
    	$('#ibPlanPopRemark').val(pData.REMARK);
    }

    //[Fn] 이벤트
    function fnEvents(){

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Supplier');

        $("#ibPlanPopClientCd").attr('disabled', true);
        $("#ibPlanPopClientNm").attr('disabled', true);
        $("#ibPlanPopSupplierNm").attr('disabled', true);
        $("#ibPlanPopIbNo").attr('disabled', true);

    	if(modify === true){
    		WMSUtil.fnTagYmdSetting('ibPlanPopYmd', false);
    		WMSUtil.fnTagYmdSetting('ibPlanPopPoYmd', false);

    		$('#ibPlanPopYmdS').attr('disabled', true);
    		$('#ibPlanPopPoYmdS').attr('disabled', true);

            $("#ibPlanPopYmdFr").attr('disabled', true);
            $("#ibPlanPopPoYmdFr").attr('disabled', true);

    	}else{
    		WMSUtil.fnTagYmdSetting('ibPlanPopYmd', true);
    		WMSUtil.fnTagYmdSetting('ibPlanPopPoYmd', true);

    	}


        //신규 버튼 이벤트
        $("#ibPlanPopAddRowBtn").click(function() {
            //그리드 행 추가.
            $ibPlanPopGrid.paragonGridAddRow();
			//행추가시 박스수량, 낱개수량 기본값 0 입력
            fnAddRowQtyDefault($ibPlanPopGrid);
        });

        $("#ibPlanPopSaveBtn").click(function(){
            fnSave();
        });

        //삭제버튼 이벤트
        $("#ibPlanPopDelRowBtn").click(function(){
            fnDel();
        });

        $("#ibPlanPopSupplier").click(function(){
            WMSUtil.popup.supplier('ibPlanPopSupplier');
        });

        /* keyup */
        $('#ibPlanPopSupplierCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#ibPlanPopCarNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#ibPlanPopPoNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#ibPlanPopRemark').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 500);
        });

    	//수량 선택시 블록지정
    	$('input[id$="Qty"]').click(function(){
    		$(this).select();
    	});
    }

    //예정 총 수량 계산 함수
    function setPlanTotQty(rowid){
        var planTotQty = 0;

        var pkQty 	= Number($ibPlanPopGrid.getRow(rowid,"PKQTY"));
        var box 	= Number($ibPlanPopGrid.getRow(rowid,"PLAN_BOX_QTY"));
        var ea 		= Number($ibPlanPopGrid.getRow(rowid,"PLAN_EA_QTY"));

        planTotQty =  box * pkQty + ea;
//        $ibPlanPopGrid.setCell("PLAN_QTY",planTotQty,rowid);
        $ibPlanPopGrid.setCell("PLAN_TOT_QTY",planTotQty,rowid);
    }

    function fnList(){
        $ibPlanPopGrid.paragonGrid({
            url				: '/ctrl/inbound/inboundPlan/inboundPlanCreate', //DiffCode (Insert false, Update true)
            rowEditable		: true, //DiffCode (Insert true, Update false)
            cellEditable	: true,
            sortable		: true,
            rownumbers		: true,
            height			: '300',
            width			: '1300',
            rowNum 			: 50000,
            loadui			: 'disable',
            rowClickFocus	: true,
            shrinkToFit		: false,
            multiselect		: true,
            postData		:
            {
        		clientCd	: pData.CLIENT_CD,
        		ibNo		: pData.IB_NO
    		},
            colModel:[
                      {editable: false,	name:'IB_NO', 			width:"100px", 	align:"center"},
                      {editable: false,	name:'IB_DETAIL_SEQ', 	width:"100px",	align:"center",	hidden:true},
                      {editable: true,	name:'ITEM_CD', 		width:"100px", 	align:"center", required: true,
                          searchType:'IB_PLAN_ITEM',
                          editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(this), e,20); }) } },
                          searchBtnClick : function(value, rowid, colid) {
//                              fnInboundPlanItemPop(rowid);
                        	  	WMSUtil.popup.itemInfo('', {
                        	  		clientCd	: $('#ibPlanPopClientCd').val()
                          		}, function callbackFunc(data){
                          			if(data.ITEM_CD == undefined){
                                      $ibPlanPopGrid.setCell("ITEM_CD",'',rowid);
                          			}else{
                                      $ibPlanPopGrid.setCell("ITEM_CD",data.ITEM_CD,rowid);
                          			}
//                                  $ibPlanPopGrid.setCell("ITEM_CD",data.ITEM_CD,rowid);
                          			$ibPlanPopGrid.setCell("ITEM_NM",data.ITEM_NM,rowid);
                          			$ibPlanPopGrid.setCell("ITEM_SPEC",data.ITEM_SPEC,rowid);
                          			$ibPlanPopGrid.setCell("ITEM_ST_CD",data.ITEM_ST_CD,rowid);
                          			$ibPlanPopGrid.setCell("PKQTY",data.CONV_UOM_QTY,rowid);
                          			$ibPlanPopGrid.setCell("PKQTYPLT",data.PKQTYPLT,rowid);
                          			$ibPlanPopGrid.setCell("UOM",data.CONV_UOM_CD,rowid);
                          			$ibPlanPopGrid.setCell("WEIGHT",data.WEIGHT,rowid);
                          			setPlanTotQty(rowid);
                        	  })

                              }, disabled:true
                          },
                      {editable: false,	name:'ITEM_NM', 		width:"200px", 	align:"left"},
                      {editable: false,	name:'ITEM_SPEC', 		width:"100px", 	align:"center"},
                      {editable: true,	name:'ITEM_ST_CD',		width:"100px",	align:"center",	hidden: true,	fixed :true,
                          edittype:'select', formatter:'select', editoptions: { value:itemStatusCombo }
                      },
                      {editable: true, 	name:'ITEM_ST',			width:"100px",	align:"center",	fixed :true,	required:true,
                          edittype:'select', formatter:'select', editoptions: { value:itemStatusCombo }
                      },
                      {editable: false, name: "PKQTY", 			width:"100px", 	align:"center"},
                      {editable: false, name: "PKQTYPLT", 		width:"100px", 	align:"center" , hidden: true},
                      {editable: false, name: "CONV_UOM_CD", 	width:"100px", 	align:"center",	 hidden: true },
                      {editable: false, name: "UOM", 			width:"100px", 	align:"center"},
                      {editable: false,	name:'PLAN_TOT_QTY',	width:"100px",	align : "right", formatter:"integer"},
                      {editable: true,	name:'PLAN_BOX_QTY', 	width:"100px", 	align : "right", required:true,
                           editoptions : {
                               maxlength:11,
                               dataInit : function(el) {
                                   //선택 된 rowid
                                   var rowid = $(el)[0].attributes.rowid.value;
                                   $(el).onlyNumber();
                                   $(el).on('keyup blur', function(e){

                                       //모든 값이 지워진 경우 0 입력 되도록 변경
                                       if($ibPlanPopGrid.getRow(rowid,"PLAN_BOX_QTY") == ''){
                                           $ibPlanPopGrid.setCell("PLAN_BOX_QTY",0,rowid);
                                       }

                                       //제품 선택 여부 validation
                                       if($ibPlanPopGrid.getRow(rowid,"ITEM_CD") == ''){
                                    	   Util.alert('MSG_MST_ERR_010'); //제품코드를 선택해주세요
                                           return;
                                       }

                                       setPlanTotQty(rowid);

                                       gridIntLengthLimit($(this), e, 9);
                                   });
                               }
                           }
                      },
                      {editable: false,name:'PLAN_EA_QTY', width:"100px", align : "right", formatter:"integer", //required:true,
                          editoptions : {
                              maxlength:11,
                              dataInit : function(el) {
                                  //선택 된 rowid
                                  var rowid = $(el)[0].attributes.rowid.value;
                                  //숫자만 입력 가능하도록 설정
                                  $(el).onlyNumber();
                                  $(el).on('keyup blur', function(e){

                                      if($ibPlanPopGrid.getRow(rowid,"PLAN_EA_QTY") == ''){
                                          $ibPlanPopGrid.setCell("PLAN_EA_QTY",0,rowid);
                                      }

                                      if($ibPlanPopGrid.getRow(rowid,"ITEM_CD") == ''){
                                          Util.alert('MSG_MST_ERR_010'); //제품코드를 선택해주세요
                                          return;
                                      }
                                      setPlanTotQty(rowid);

                                      gridIntLengthLimit($(this), e, 9);
                                  });
                              }
                          }
                      },
                      {editable: true,name:'WEIGHT', width:"100px", align:"right"},
                      {editable: true,name:'MAKE_LOT', width:"100px", align:"center",
                          editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                      },
                      {editable: true,name:'MAKE_YMD', width:"100px", align:"center",
                          editoptions : {
                              maxlength:10,
                              dataInit : function(el) {
                                  $(el).on('keyup blur', function(e){
                                	  $(el).val(WMSUtil.fnDateSetting.yyyy_mm_dd($(el).val()));
                                	  gridIntLengthLimit($(el), e, 10);
                            	  })
                              }
                          }
                      },
                      {editable: true,name:'DIST_EXPIRY_YMD', width:"100px", align:"center",
                          editoptions : {
                              maxlength:10,
                              dataInit : function(el) {
                                  $(el).on('keyup blur', function(e){
                                	  $(el).val(WMSUtil.fnDateSetting.yyyy_mm_dd($(el).val()));
                                	  gridIntLengthLimit($(el), e, 10);
                            	  })
                              }
                          }
                      },
                      {editable: true,name:'LOT_ATTR1', width:"100px", align:"center",
                    	  edittype:'select', formatter:'select', editoptions: { value : gridExportCountryCd }
                      },
                      {editable: true,name:'LOT_ATTR2', width:"100px", align:"center",
                    	  edittype:'select', formatter:'select', editoptions: { value : gridDalatYn }
                      },
                      {editable: true,name:'LOT_ATTR3', width:"100px", align:"center",
                          editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                      },
                      {editable: true,name:'LOT_ATTR4', width:"100px", align:"center",
                          editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                      },
                      {editable: true,name:'LOT_ATTR5', width:"100px", align:"center",
                          editoptions : { maxlength:20, dataInit : function(el) { $(el).on('keyup blur', function(e){ gridTextLengthLimit($(el), e, 20); }) } }
                      }
                  ],
//            pager: "#ibPlanPopGridNavi",
            domainId:"IB_PLAN_LIST",
            groupHeaders:[
                          {
                              rowspan : true,
                              header:[
                                  {start: 'PLAN_TOT_QTY', length: 3 , domain:"PLAN_QTY"}
                              ]
                          }],
            gridComplete: function(){
                var ids = $ibPlanPopGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $ibPlanPopGrid.setFocus(0);
                }
            }
        });
    }
//
//    function fnInboundPlanItemPop(rowid){
//        PopApp.paragonOpenPopup({
//            ajaxUrl 	: "/ctrl/inbound/inboundPlan/inboundPlanItemPop",
//            id 			: "inboundPlanItemPop",
//            width 		: "900",
//            btnName 	: "수정",
//            domainId	: "PWMCM111Q_P1",
//            onload 		: function(modal) {
//                modal.show();
//            },
//            callback : function(data){
//                if(data.ITEM_CD == undefined){
//                    $ibPlanPopGrid.setCell("ITEM_CD",'',rowid);
//                }else{
//                    $ibPlanPopGrid.setCell("ITEM_CD",data.ITEM_CD,rowid);
//                }
////                $ibPlanPopGrid.setCell("ITEM_CD",data.ITEM_CD,rowid);
//                $ibPlanPopGrid.setCell("ITEM_NM",data.ITEM_NM,rowid);
//                $ibPlanPopGrid.setCell("ITEM_SPEC",data.ITEM_SPEC,rowid);
//                $ibPlanPopGrid.setCell("ITEM_ST_CD",data.ITEM_ST_CD,rowid);
//                $ibPlanPopGrid.setCell("PKQTY",data.CONV_UOM_QTY,rowid);
//                $ibPlanPopGrid.setCell("PKQTYPLT",data.PKQTYPLT,rowid);
//                $ibPlanPopGrid.setCell("UOM",data.CONV_UOM_CD,rowid);
//                $ibPlanPopGrid.setCell("WEIGHT",data.WEIGHT,rowid);
//                setPlanTotQty(rowid);
//            }
//        });
//    }

    function fnSave(){
        var jsonData = "";

    	if(!fnValidate()) return false;

        var hData = {
                edit        :   headerEditFlag,
                clientCd    :   $("#ibPlanPopClientCd").val() ,
                ibNo        :   $("#ibPlanPopIbNo").val() ,
                ibPlanYmd   :   WMSUtil.fnDateSetting.yyyymmdd($("#ibPlanPopYmdFr").val()),
                ibPoYmd     :   WMSUtil.fnDateSetting.yyyymmdd($("#ibPlanPopPoYmdFr").val()),
                supplierCd  :   $("#ibPlanPopSupplierCd").val() ,
                carNo       :   $("#ibPlanPopCarNo").val() ,
                ibGbnCd     :   $("#popIbGbnCd").val() ,
                remark      :   $("#ibPlanPopRemark").val() ,
                poNo        :   $("#ibPlanPopPoNo").val()
        }

        //오류 문장
        var formatData = {};
        var colModel = $ibPlanPopGrid.getGridParam('colModel');
        for (var i = 0; i < colModel.length; i++) {
            var colId = colModel[i]['name'];
            formatData[colId.strCamel()] = colId;
        }

        //3. 변경데이터검사
        var saveUrl = "";
        if(modify === true){
        	saveUrl = "/ctrl/inbound/inboundPlan/updateInboundPlanInfo";
        }else{
        	saveUrl = "/ctrl/inbound/inboundPlan/insertInboundPlanInfo";

        }

        var idx = $ibPlanPopGrid.getGridParam('selarrrow');
        if(idx.length == 0){
        	jsonData = JSON.stringify(hData);
        }else{
        	jsonData = $ibPlanPopGrid.getJsonSelectedParamsData("dt_ibPlan", formatData, hData);
        }

        var msg = 'MSG_COM_CFM_003';

        //ajax
        WMSUtil.ajax(jsonData, saveUrl, msg, function(){
        	$("#modifyIbPlanPop").popupCallback();
            $("#modifyIbPlanPop").paragonClosePopup();
    	})

    }

    function fnValidate(headerEditFlag){

        //validation
        if($("#ibPlanPopClientNm").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibPlanPopClientNm").focus();
            return false;
        }else if($("#ibPlanPopClientNm").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibPlanPopClientNm").focus();
            return false;
        }
        //validation
        if($("#ibPlanPopYmdFr").val().length == 0){//입고예정일자 검사
            Util.alert('MSG_INRI_VAL_003'); //입고예정일자 항목은 필수 입력입니다.
            $("#ibPlanPopYmdFr").focus();
            return false;
        }else if($("#ibPlanPopYmdFr").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_004'); //입고예정일자는 공백만으로 입력할 수 없습니다.
            $("#ibPlanPopYmdFr").focus();
            return false;
        }
        //validation
        if($("#ibPlanPopSupplierCd").val().length == 0){//공급처 검사
            Util.alert('MSG_MST_VAL_030'); //공급처코드 항목은 필수 입력입니다.
            $("#ibPlanPopSupplierCd").focus();
            return false;
        }else if($("#ibPlanPopSupplierCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_031'); //공급처코드는 공백만으로 입력할 수 없습니다.
            $("#ibPlanPopSupplierCd").focus();
            return false;
        }else if($("#ibPlanPopSupplierNm").val().length == 0){
            Util.alert('MSG_MST_VAL_030'); //공급처코드 항목은 필수 입력입니다.
            $("#ibPlanPopSupplierNm").focus();
            return false;
        }
        //validation
        if($("#popIbGbnCd").val().length == 0){//입고구분 검사
            Util.alert('MSG_INRI_VAL_015'); //입고구분 항목은 필수 입력입니다.
            $("#popIbGbnCd").focus();
            return false;
        }else if($("#popIbGbnCd").val().trim().length == 0){
            Util.alert('MSG_INRI_VAL_016'); //입고구분은 공백만으로 입력할 수 없습니다.
            $("#popIbGbnCd").focus();
            return false;
        }

        if(modify === false){

        }else if(modify === true){
        	if(pData == undefined){

        	}else if(pData.IB_PLAN_YMD != $("#ibPlanPopYmdFr").val()){
            	headerEditFlag = true;
            }else if(pData.CAR_NO != $("#ibPlanPopCarNo").val()){
            	headerEditFlag = true;
            }else if(pData.IB_GBN_CD != $("#popIbGbnCd").val()){
            	headerEditFlag = true;
            }else if(pData.SUPPLIER_CD != $("#ibPlanPopSupplierCd").val()){
            	headerEditFlag = true;
            }else if(pData.PO_YMD != $("#ibPlanPopPoYmdFr").val()){
            	headerEditFlag = true;
            }else if(pData.REMARK != $("#ibPlanPopRemark").val()){
            	headerEditFlag = true;
            }else if(pData.PO_NO != $("#ibPlanPopPoNo").val()){
            	headerEditFlag = true;
            }
        }


        var idx = $ibPlanPopGrid.getGridParam('selarrrow');
        var ids = $ibPlanPopGrid.jqGrid("getDataIDs");
    	//Detail 행 존재&선택 여부 확인
        if(modify === false){
            if(idx.length <= 0){
            	if(ids.length > 0){
            		Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                    return false;
            	}else{
            		Util.alert('MSG_COM_VAL_080'); //상세목록을 추가해주세요.
                    return false;
            	}
            }
        }else if(modify === true){
            if(!headerEditFlag){ //Header 수정 false
                if(idx.length <= 0){ //Detail 수정 false
                    Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                    return false;
                }
            }else if(headerEditFlag){

            }
        }

    	//Detail 수정여부 확인
        var eachFlag = true;
        var rowFlag = "";

    	$.each(idx, function(index, value){
    		$ibPlanPopGrid.jqGrid('saveRow', value, false,'clientArray');
            var rowdata = $ibPlanPopGrid.getRowData(value);
            var rowFlag = rowdata.MOD_FLAG;

            if(!(rowdata.ITEM_CD)){
                Util.alert('MSG_MST_VAL_045'); //제품코드 항목은 필수 입력입니다.
                eachFlag = false;
                return false;
            }else if(rowdata.ITEM_CD.trim().length == 0 ){
                Util.alert('MSG_MST_VAL_046'); //제품코드는 공백만으로 입력 할 수 없습니다.
                eachFlag = false;
                return false;
            }else if(rowdata.ITEM_NM.length == 0 ){
                Util.alert('MSG_MST_VAL_045'); //제품코드 항목은 필수 입력입니다.
                eachFlag = false;
                return false;
            }

            if(!(rowdata.PKQTY)){
                Util.alert('MSG_INRI_VAL_056', $ibPlanPopGrid.getRowData(value).ITEM_CD); //제품코드 [ {0} ] 의 입수데이터가 존재하지않습니다. 등록해주세요.
                eachFlag = false;
                return false;
            }

            if(!(rowdata.UOM)){
                Util.alert('MSG_INRI_VAL_057', $ibPlanPopGrid.getRowData(value).ITEM_CD); //제품코드 [ {0} ] 의 단위데이터가 존재하지않습니다. 등록해주세요.
                eachFlag = false;
                return false;
            }

            if(!(rowdata.PLAN_BOX_QTY)){
                Util.alert('MSG_INRI_VAL_017'); //예정환산수량 항목은 필수 입력입니다.
                eachFlag = false;
                return false;
            }
            if(rowdata.PLAN_BOX_QTY.trim().length == 0 ){
                Util.alert('MSG_INRI_VAL_018'); //예정환산수량은 공백만으로 입력할 수 없습니다.
                eachFlag = false;
                return false;
            }
            if(!(rowdata.PLAN_EA_QTY)){
                Util.alert('MSG_INRI_VAL_019'); //예정낱개수량은 항목은 필수 입력입니다.
                eachFlag = false;
                return false;
            }
            if(rowdata.PLAN_EA_QTY.trim().length == 0 ){
                Util.alert('MSG_INRI_VAL_020'); //예정낱개수량은 공백만으로 입력할 수 없습니다.
                eachFlag = false;
                return false;
            }
            if(parseFloat(rowdata.PLAN_BOX_QTY) == 0 && parseFloat(rowdata.PLAN_EA_QTY) == 0){
                Util.alert('MSG_INRI_VAL_021'); //예정환산수량, 낱개수량은 0을 초과하여 입력해야 합니다.
                eachFlag = false;
                return false;
            }
            if(parseFloat(rowdata.PLAN_BOX_QTY) < 0 || parseFloat(rowdata.PLAN_EA_QTY) < 0){
                Util.alert('MSG_INRI_VAL_022'); //예정환산수량, 낱개수량 음수를 입력할 수 없습니다.
                eachFlag = false;
                return false;
            }
            if(rowFlag != "UPDATE" && rowFlag != "INSERT"){
                Util.alert('MSG_COM_VAL_071', rowdata.ITEM_CD); //[ {0} ]은(는) 변경된 값이 없습니다.
                eachFlag = false;
                return false;
            }
    	});
    	if(!eachFlag) return false;

        return true;
    }

    //[Fn] Grid Delete Data Row.
    function fnDel() {
        var addFlag = $ibPlanPopGrid.paragonGridCheckedDeleteData();

        if (addFlag === false) {
            var dataCnt = $ibPlanPopGrid.getGridParam("records");
            var ids = $ibPlanPopGrid.getGridParam('selarrrow');
            $ibPlanPopGrid.paragonGridCheckedDelete();
            console.log(dataCnt, ids.length);
            var rowData = {};
            rowData = {
                    modFlag		: "MOD_FLAG",
                    ibNo		: "IB_NO",
                    ibDetailSeq	: "IB_DETAIL_SEQ"
            }
            var saveUrl = "";
            var dataSet = "";
            if((dataCnt - ids.length) == 0){
            	saveUrl = "/ctrl/inbound/inboundPlan/deleteInboundPlanInfo";
                dataSet = "dt_inboundPlanInfo";
            }else{
            	saveUrl = "/ctrl/inbound/inboundPlan/deleteInboundPlanPop";
                dataSet = "dt_inboundPlanPop"
            }

            var jsonData = $ibPlanPopGrid.getSelectedJsonData(dataSet,rowData);
            var msg = 'MSG_COM_CFM_001';

            //ajax
            WMSUtil.ajax(jsonData, saveUrl, msg, function(){
            	$("#modifyIbPlanPop").paragonClosePopup();
            	$ibPlanHGrid.paragonGridReload();
        	})

        }
    }

    //[Fn] Reload Grid Method
    function fnReloadGrid() {
        $("#modifyIbPlanPop").paragonClosePopup();
        $ibPlanPopGrid.paragonGridReload();
    }

}();

$(document).ready(function() {
    InboundPlanCreatePopApp.init();
});

