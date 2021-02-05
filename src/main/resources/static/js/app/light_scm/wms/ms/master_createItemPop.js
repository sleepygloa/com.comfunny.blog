/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 제품등록 팝업[MasterItemAddPopApp]
 * Program Code     : PWMMS109E_P1
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Lee Sung Guk		2017. 3. 10.  		First Draft.
 */

var MasterItemAddPopApp = function(){
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS109E_P1';
	var proNm = 'msItemPop';

    var $masterItemGrid   = $("#masterItemGrid");
    var $masterUOMGrid    = $("#masterUOMGrid");
    var $masterCenterGrid = $("#masterCenterGrid");
    var getData = $("#createItemPop").PopAppGetData().rowData;
    var modeFlag = $("#createItemPop").PopAppGetData().modeFlag;


    return {
        init: function(){

            WMSUtil.fnCombo.selectBox('msItemPopDistExpiryDayPop', 'YMD_GBN_CD');
            WMSUtil.fnCombo.selectBox('msItemPopUseYn', 'USE_YN');
            WMSUtil.fnCombo.selectBox('msItemPopLocalExportGbnCd', 'LOCAL_EXPORT_GBN_CD');
            WMSUtil.fnCombo.selectBox('msItemPopProdYn', 'YN');
            WMSUtil.fnCombo.selectBox('msItemPopSalesYn', 'YN');
            WMSUtil.fnCombo.selectBox('msItemPopSetItemCd', 'YN');
            WMSUtil.fnCombo.selectBox('msItemPopSeasonYn', 'YN');
            WMSUtil.fnCombo.selectBox('msItemPopTaxYn', 'YN');
            WMSUtil.fnCombo.selectBox('msItemPopMinUomCd', 'UOM_CD');
            WMSUtil.fnCombo.selectBox('msItemPopKeepTempeGbnCd', 'KEEP_TEMPE_GBN_CD');
            WMSUtil.fnCombo.selectBox('msItemPopItemGbnCd', 'ITEM_GBN_CD');

            fnListPutStrtgJson();
            fnAllocStrtgJson();
            fnLotStrtgJson();

            fnInfo();
            fnEvent();



        }
    };

    function fnInfo(){
        $("#saveFlag").val(modeFlag); //수정모드

        $("#msItemPopItemCd").val(getData.ITEM_CD);  //아이템코드
        $("#msItemPopItemNm").val(getData.ITEM_NM);  //아이템명
        $("#msItemPopItemSpec").val(getData.ITEM_SPEC);//아이템규격

        $("#msItemPopClientCd").val(getData.CLIENT_CD);//고객사
        $("#msItemPopItemGbnCd").val(getData.ITEM_GBN_CD);//제품구분
        $("#msItemPopKeepTempeGbnCd").val(getData.KEEP_TEMPE_GBN);//보관온도구분

        $("#msItemPopLargeClassCd").val(getData.LARGE_CLASS_CD);//대분류
        $("#msItemPopMiddleClassCd").val(getData.MIDDLE_CLASS_CD);//중분류
        $("#msItemPopMiddleClassCd").val(getData.SMALL_CLASS_CD);//소분류

        $("#msItemPopIbCost").val(getData.IB_COST);//입고단가
        $("#msItemPopObCost").val(getData.OB_COST);//출고단가
        $("#msItemPopTaxYn").val(getData.TAX_YN);//과세여부

        $("#msItemPopHorizontal").val(getData.HORIZONTAL);//가로
        $("#msItemPopVertical").val(getData.VERTICAL);//세로
        $("#msItemPopHeight").val(getData.HEIGHT);//높이

        $("#msItemPopCbn").val(getData.CBM);//용량
        $("#msItemPopWeight").val(getData.WEIGHT);//중량

        $("#msItemPopBoxBarcode").val(getData.BOX_BARCODE);//박스바코드
        $("#msItemPopItemBarcode").val(getData.ITEM_BARCODE);//제품바코드
        $("#msItemPopDistExpiryDay").val(getData.DIST_EXPIRY_DAYS);//유통기한일수
        $("#msItemPopDistExpiryDayPop").val(getData.YMD_GBN);//유통기한일수

        $("#msItemPopPutwStrategy").val(getData.PUTW_STRTG);//적치전략
        $("#msItemPopAllocStrategy").val(getData.ALLOC_STRTG);//할당전략코드
        $("#msItemPopAttrStrategy").val(getData.LOT_ATTR_STRTG_CD);//LOT전략

        $("#msItemPopMinUomCd").val(getData.MIN_UOM);//최소UOM
        $("#msItemPopSetItemCd").val(getData.SET_ITEM_YN);//세트제품여부
        $("#msItemPopSeasonYn").val(getData.SEASON_YN);//계절성여부

        $("#msItemPopReplaceItemCd").val(getData.REPLACE_ITEM_CD);//대체제품
        $("#msItemPopRemark").val(getData.REMARK);//비고
        $("#msItemPopUseYn").val(getData.USE_YN);//사용여부

        $("#msItemPopLocalExportGbnCd").val(getData.LOCAL_EXPORT_GBN);//내수수출구분
        $("#msItemPopProdYn").val(getData.PROD_YN);//내수수출구분
        $("#msItemPopSalesYn").val(getData.SALES_YN);//내수수출구분

        if(modeFlag === 'U'){
        	$('#msItemPopItemCd').attr('disabled', true);
        }else if(modeFlag === 'I'){
        	$('#msItemPopItemCd').attr('disabled', false);
        }

    }

    //********** 1.About Event List Function. **********
    //Item Add Popup Event Method.
    function fnEvent(){
        //1.Create Btn Event.
        $("#msItemPopSaveBtn").click(function(){
            fnSave();
        });
        //고객사 팝업
        $("#msItemPopClientPop").click(function(){
        	WMSUtil.popup.client('msItemPopClient');
        });

        //대분류 팝업
        $("#msItemPopLargeClassPop").click(function(){
        	WMSUtil.popup.largeClass('msItemPopLargeClass', {clientCd : $('#msItemPopClientCd').val()});
        });

        //중분류 팝업
        $("#msItemPopMiddleClassPop").click(function(){
        	WMSUtil.popup.middleClass('msItemPopMiddleClass', {
        		clientCd : $('#msItemPopClientCd').val(),
        		largeClassCd : $('#msItemPopLargeClassCd').val()
        		})
        });

        //소분류 팝업
        $("#msItemPopSmallClassPop").click(function(){
        	WMSUtil.popup.smallClass('msItemPopSmallClass', {
        		clientCd : $('#msItemPopClientCd').val(),
        		largeClassCd : $('#msItemPopLargeClassCd').val(),
        		middleClassCd : $('#msItemPopMiddleClassCd').val(),
        	})
//            fnSmallClassPop();
            //App.setCallBackEl($("#msItemPopMiddleClassCd"));
        });
        //Calculate vetical, HORIZONTAL, height
        $("#msItemPopCalculateBtn").click(function(){
            fnCaculate();
        });

        $('#msItemPopItemCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        })
        $('#msItemPopItemNm').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 500);
        });
        $('#msItemPopItemSpec').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msItemPopClientCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msItemPopLargeClassCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msItemPopMiddleClassCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msItemPopMiddleClassCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msItemPopIbCost').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 9);
        });

        $('#msItemPopIbCost').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 9);
        });
        $('#msItemPopObCost').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 9);
        });

        $('#msItemPopHorizontal').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 9);
        });
        $('#msItemPopVertical').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 9);
        });
        $('#msItemPopHeight').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 9);
        });
        $('#msItemPopCbn').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 12);
        });
        $('#msItemPopWeight').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 12);
        });

        $('#msItemPopBoxBarcode').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 100);
        });
        $('#msItemPopItemBarcode').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 100);
        });
        $('#msItemPopDistExpiryDay').on('keyup blur', function(e){
            gridIntLengthLimit($(this), e, 8);
        });

        $('#msItemPopReplaceItemCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msItemPopRemark').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 500);
        });
    }
    //********** function Event Method Space.*********
    //[Fn] Save Data
    function fnSave(){
        var saveUrl;
        var msg;
        var saveFlag = $("#saveFlag").val();
        var data = {
            //row1
            itemCd:         $("#msItemPopItemCd").val(),  		//제품코드
            itemNm:         $("#msItemPopItemNm").val(),  		//제품명
            itemSpec:       $("#msItemPopItemSpec").val(), 		//제품규격

            //row2
            clientCd:       $("#msItemPopClientCd").val(),        //고객사
            itemGbnCd:      $("#msItemPopItemGbnCd option:selected").val(),       //제품군
            keepTempeGbnCd: $("#msItemPopKeepTempeGbnCd").val(),  //보관온도구분

            //row3
            largeClassCd:   $("#msItemPopLargeClassCd").val(),    //제품대분류
            middleClassCd:  $("#msItemPopMiddleClassCd").val(),   //제품중분류
            smallClassCd:   $("#msItemPopMiddleClassCd").val(),    //제품소분류

            //row4
            ibCost:         $("#msItemPopIbCost").val(),  		//입고단가
            obCost:         $("#msItemPopObCost").val(),  		//출고단가
            taxYn:          $("#msItemPopTaxYn").val(),   		//과세여부

            //row5
            horizontal:     $("#msItemPopHorizontal").val(), 		//가로
            vertical:       $("#msItemPopVertical").val(), 		//세로
            height:         $("#msItemPopHeight").val(),      	//높이
            cbm:            $("#msItemPopCbn").val(),         	//체적
            weight:         $("#msItemPopWeight").val(),      	//중량

            //row6
            boxBarCode:     $("#msItemPopBoxBarcode").val(),      //박스바코드
            itemBarCode:    $("#msItemPopItemBarcode").val(),     //제품바코드
            distExpiryDays: $("#msItemPopDistExpiryDay").val(),  //유통기한일수
            ymdGbnCd:		$("#msItemPopDistExpiryDayPop").val(),		//년월일구분

            //row7
            putwStrtgCd:    $("#msItemPopPutwStrategy").val(),     //적치전략
            allocStrtgCd:   $("#msItemPopAllocStrategy").val(),    //할당전략
            lotAttrStrtgCd: $("#msItemPopAttrStrategy").val(),  //LOT속성전략

            //row8
            minUomCd:       $("#msItemPopMinUomCd").val(),    	//최소UOM
            setItemYn:      $("#msItemPopSetItemCd").val(),   	//세트제품여부
            seasonYn:       $("#msItemPopSeasonYn").val(),    	//계절성여부

            //row9
            replaceItemCd:  $("#msItemPopReplaceItemCd").val(),   //대체제품
            remark:         $("#msItemPopRemark").val(),          //비고
            useYn:          $("#msItemPopUseYn").val(),           //사용여부

            //row10
            localExportGbnCd: $("#msItemPopLocalExportGbnCd").val(),         //내수수출여부
            prodYn: 		$("#msItemPopProdYn").val(),          //생산여부
            salesYn: 		$("#msItemPopSalesYn").val()          //판매여부
        };

        var jsonData = JSON.stringify(data);

        //validation
        if($("#msItemPopItemCd").val().length == 0){
            Util.alert('MSG_MST_VAL_045'); //제품코드 항목은 필수 입력입니다.
            $("#msItemPopItemCd").focus();
            return false;
        }else if($("#msItemPopItemCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_046'); //제품코드는 공백으로 입력 할 수 없습니다.
            $("#msItemPopItemCd").focus();
            return false;
        }
        if($("#msItemPopItemNm").val().length == 0){
            Util.alert('MSG_MST_VAL_047'); //제품명 항목은 필수 입력입니다.
            $("#msItemPopItemNm").focus();
            return false;
        }else if($("#msItemPopItemNm").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_048'); //제품명는 공백으로 입력 할 수 없습니다.
            $("#msItemPopItemNm").focus();
            return false;
        }
        if($("#msItemPopClientCd").val().length == 0){
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력입니다.
            $("#msItemPopClientCd").focus();
            return false;
        }else if($("#msItemPopClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("msItemPopClientCd").focus();
            return false;
        }
        if(!$('#msItemPopMinUomCd')){
            Util.alert('MSG_MST_VAL_049'); //최소단위여부 항목은 필수 입력입니다.
            return false;
        }
        if(!$('#msItemPopUseYn')){//사용여부 검사
            Util.alert('MSG_MST_VAL_001'); //사용여부 항목은 필수 입력입니다.
            return false;
        }

        if(!data.itemGbnCd){//제품구분 검사
            Util.alert('MSG_MST_VAL_069'); //제품구분 항목은 필수 입력입니다.
            return false;
        }

        if(saveFlag === "I")
        {
            saveUrl = "/ctrl/master/item/insertSentence";
            msg = "MSG_COM_CFM_003"; //저장하시겠습니까?
        }

        if(saveFlag === "U")
        {
            saveUrl = "/ctrl/master/item/updateSentence";
            msg = "MSG_COM_CFM_002"; //수정하시겠습니까?
        }

        fnAjaxSave(jsonData, saveUrl, msg);
    }
    //[Fn] 저장 ajax function.
    function fnAjaxSave(jsonData, saveUrl, msg){

        if (!confirm((Util.confirm(msg)).msgTxt)) return;

        App.prcsStart();
        $.ajax({
            url: saveUrl,
            data: jsonData,
            dataType: "json",
            type: "POST",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function(data){
                App.prcsEnd();
                if(data.stsCd == "999"){
                    alert(data.msgTxt);
                    return;
                }else if(data.stsCd == "001"){
                    alert(data.msgTxt);
                    fnReloadGrid();
                }else{
                    Util.alert('MSG_COM_SUC_003'); //저장되었습니다.
                }

            }
        });
    }
    //[Fn] Reload Grid Method
    function fnReloadGrid() {
//        $masterCenterGrid.paragonGridReload();
    	$("#createItemPop").popupCallback();
        $("#createItemPop").paragonClosePopup();
    }
    //[Fn] 적치전략 콤보박스 JSON 조회
    function fnListPutStrtgJson(){
        $.ajax({
            url : "/ctrl/master/item/putStrtgList",
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                Util.MakeSelectOptions($("#msItemPopPutwStrategy"),result);
            }
        });
    }
    //[Fn] 할당전략 콤보박스 JSON 조회
    function fnAllocStrtgJson(){
        $.ajax({
            url : "/ctrl/master/item/allocStrtgList",
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                Util.MakeSelectOptions($("#msItemPopAllocStrategy"),result);
            }
        });
    }
    //[Fn] LOT전략 콤보박스 JSON 조회
    function fnLotStrtgJson(){
        $.ajax({
            url : "/ctrl/master/item/lotStrtgList",
            type : "POST",
            dataType : "json",
            cache: false,
            async:false,
            success : function(result) {
                Util.MakeSelectOptions($("#msItemPopAttrStrategy"),result);
            }
        });
    }


    //[Fn] Date Picker
    function fnDatePicker(){
        $("#msItemPopDistExpiryDay").datepicker({
            autoclose : true
        }).on("changeDate", function(el){
            $(".datetimepicker").hide();
        });
    }
    //[Fn] Modal Grid
    function fnModalGrid(){
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/clientPopup",
            id : "modalClientPopup",
            width : "550",
            btnName : "수정",
            title : "Client 검색",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $('#msItemPopClientCd').val(data.CLIENT_CD);
            }
        });
    }
    //[Fn] Modal Grid fnLargeClassPop
    function fnLargeClassPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/largeClassPopup",
            id : "largeClassPopup",
            data : {clientCd : $('#msItemPopClientCd').val()},
            width : "550",
            title : "대분류 검색",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#msItemPopLargeClassCd").val(data.LARGE_CLASS_CD);
            }
        });
    }
    //[Fn] Modal Grid fnMiddleClassPop
    function fnMiddleClassPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/middleClassPopup",
            id : "middleClassPopup",
            data : {clientCd : $('#msItemPopClientCd').val(), largeClassCd : $("#msItemPopLargeClassCd").val()},
            width : "550",
            title : "중분류 검색",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#msItemPopMiddleClassCd").val(data.MIDDLE_CLASS_CD);
            }
        });
    }
    //[Fn] Modal Grid fnSmallClassPop
    function fnSmallClassPop() {
        PopApp.paragonOpenPopup({
            ajaxUrl : "/ctrl/common/smallClassPopup",
            id : "smallClassPopup",
            data : {clientCd : $('#msItemPopClientCd').val(), largeClassCd : $("#msItemPopLargeClassCd").val(), middleClassCd : $("#msItemPopMiddleClassCd").val()},
            width : "550",
            title : "소분류 검색",
            onload : function(modal) {
                modal.show();
            },
            callback : function(data){
                $("#msItemPopMiddleClassCd").val(data.SMALL_CLASS_CD);
            }
        });
    }
    //[Fn] Calculate
    function fnCaculate(){
        //To_do validation 추가 필요.
        var hori = parseFloat($("#msItemPopHorizontal").val());
        var veri = parseFloat($("#msItemPopVertical").val());
        var heig = parseFloat($("#msItemPopHeight").val());

        var data = hori * veri * heig;
        $("#msItemPopCbn").val(parseFloat(data.toFixed(2)));
    }
}();

$("document").ready(function(){
    MasterItemAddPopApp.init();
});
