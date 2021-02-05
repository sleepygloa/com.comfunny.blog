/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 구매처 등록 팝업[MasterCreateSupplierPopApp]
 * Program Code     : PWMMS106E_P1
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 20.        First Draft.
 */
var MasterCreateSupplierPopApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/
    var $supplierGrid = $("#masterSupplierGrid");

    var useYnComboJson;

    var dealGbnComboJson;

    var $callBackInput;

    var modify = $("#createSupPop").PopAppGetData().gbn;
    var getData = $("#createSupPop").PopAppGetData().rowData;

    var typeFlag = false;
    var typeN = 0;

    return {
        init: function () {

        	useYnComboJson = WMSUtil.fnCombo.grid_selectBox('msSupPopUseYn', 'USE_YN');

        	dealGbnComboJson = WMSUtil.fnCombo.grid_selectBox('msSupPopDealGbnCd', 'DEAL_GBN_CD');

            fnEvents();

            if(modify == "false"){
                fnInfo();
                $("#msSupPopSupplierCd").attr("disabled", true);
            }

        },
        callBackInput: function () {
            return $callBackInput;
        },
        getGrid: function(){
            return $supplierGrid;
        }
    };


    //[Fn] 이벤트
    function fnEvents(){

        addClientCdChangeEvent("clientPop", []);          //고객사

        //저장버튼
        $("#msSupPopSaveBtn").click(function(e){
            e.preventDefault();
            setTimeout(fncreate,100);
            //fncreate();
        });

        $("#msSupPopClientPop").click(function(){
        	WMSUtil.popup.client('msSupPopClient');
        });

        WMSUtil.fnTagYmdSetting('msSupPopDealYmd', true, true);


        $('#msSupPopSupplierCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msSupPopSupplierNm').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msSupPopClientCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msSupPopBizNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msSupPopBizNm').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msSupPopCeoNm').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msSupPopPostNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msSupPopBasicAddr').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 500);
        });
        $('#msSupPopDetailAddr').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 500);
        });
        $('#msSupPopBizType').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msSupPopBizKind').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msSupPopTelNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msSupPopFaxNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msSupPopContactNm').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msSupPopContactTelNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msSupPopContactEmail').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msSupPopRemark').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 500);
        });
    }


    //[Fn] 수정된 내용저장
    function fncreate() {
        // 데이터 키 : Value Key
        var rowData = {
            clientCd        : $("#msSupPopClientCd").val(),
            supplierCd      : $("#msSupPopSupplierCd").val(),
            supplierNm      : $("#msSupPopSupplierNm").val(),
            bizNo           : $("#msSupPopBizNo").val(),
            bizNm           : $("#msSupPopBizNm").val() ,
            ceoNm           : $("#msSupPopCeoNm").val() ,
            postNo          : $("#msSupPopPostNo").val() ,
            basicAddr       : $("#msSupPopBasicAddr").val() ,
            detailAddr      : $("#msSupPopDetailAddr").val() ,
            biztype         : $("#msSupPopBizType").val() ,
            bizkind         : $("#msSupPopBizKind").val() ,
            telNo           : $("#msSupPopTelNo").val() ,
            faxNo           : $("#msSupPopFaxNo").val() ,
            contactNm       : $("#msSupPopContactNm").val() ,
            contactTelNo    : $("#msSupPopContactTelNo").val() ,
            contactEmail    : $("#msSupPopContactEmail").val() ,
            dealStartYmd    : WMSUtil.fnDateSetting.yyyymmdd($("#msSupPopDealYmdFr").val()),
            dealEndYmd      : WMSUtil.fnDateSetting.yyyymmdd($("#msSupPopDealYmdTo").val()),
            dealGbnCd       : $("#msSupPopDealGbnCd").val() ,
            remark          : $("#msSupPopRemark").val() ,
            useYn           : $("#msSupPopUseYn").val()
        }

        var jsonData = JSON.stringify(rowData);

      //validation
        if($("#msSupPopSupplierCd").val().length == 0){//구매처코드 검사
            Util.alert('MSG_MST_VAL_030'); //구매처코드 항목은 필수 입력입니다.
            $("#msSupPopSupplierCd").focus();
            return false;
        }else if($("#msSupPopSupplierCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_031'); //구매처코드는 공백으로 입력 할 수 없습니다.
            $("#msSupPopSupplierCd").focus();
            return false;
        }
        if($("#msSupPopSupplierNm").val().length == 0){//구매처명 검사
            Util.alert('MSG_MST_VAL_032'); //구매처명 항목은 필수 입력입니다.
            $("#msSupPopSupplierNm").focus();
            return false;
        }else if($("#msSupPopSupplierNm").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_033'); //구매처명 공백으로 입력 할 수 없습니다.
            $("#msSupPopSupplierNm").focus();
            return false;
        }
        if($("#msSupPopClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력입니다.
            $("#msSupPopClientCd").focus();
            return false;
        }else if($("#msSupPopClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#msSupPopClientCd").focus();
            return false;
        }
        if(!$('#msSupPopUseYn')){//사용여부 검사
            Util.alert('MSG_MST_VAL_001'); //사용여부 항목은 필수 입력입니다.
            return false;
        }

        var sUrl = "";
        if(modify == "true"){
            sUrl = "createSupplier";
        }else{
            sUrl = "updateSupplier";
        }

        if (!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return; //저장하시겠습니까?

        $.ajax({
            url 		: "/ctrl/master/supplier/"+sUrl,
            data 		: jsonData,
            type 		: "POST",
            dataType 	: "json",
            contentType	: 'application/json; charset=utf-8',
            cache		: false,
            success 	: function(data) {
                if(data.stsCd == "999"){
                    alert(data.msgTxt);
                }else{
                    alert(data.msgTxt);
                    $("#createSupPop").paragonClosePopup();
                    $supplierGrid.paragonGridReload();
                }
            }
        });
    }

    function fnInfo(){
        $.ajax({
            type : "POST",
            url : "/ctrl/master/supplier/listSupplier",
            data : {supplierCd: getData.SUPPLIER_CD, clientCd:getData.CLIENT_CD},
            success: function(data){

                var sData = data.dt_grid[0];
                $("#msSupPopSupplierCd").val(sData.SUPPLIER_CD);
                $("#msSupPopSupplierNm").val(sData.SUPPLIER_NM);
                $("#msSupPopClientCd").val(sData.CLIENT_CD);
                $("#msSupPopClientNm").val(sData.CLIENT);
                $("#msSupPopBizNo").val(sData.BIZ_NO);
                $("#msSupPopBizNm").val(sData.BIZ_NM);
                $("#msSupPopCeoNm").val(sData.CEO_NM);
                $("#msSupPopPostNo").val(sData.POST_NO);
                $("#msSupPopBasicAddr").val(sData.BASIC_ADDR);
                $("#msSupPopDetailAddr").val(sData.DETAIL_ADDR);
                $("#msSupPopBizType").val(sData.BIZTYPE);
                $("#msSupPopBizKind").val(sData.BIZKIND);
                $("#msSupPopTelNo").val(sData.TEL_NO);
                $("#msSupPopFaxNo").val(sData.FAX_NO);
                $("#msSupPopContactNm").val(sData.CONTACT_NM);
                $("#msSupPopContactTelNo").val(sData.CONTACT_TEL_NO);
                $("#msSupPopContactEmail").val(sData.CONTACT_EMAIL);
                $('#msSupPopDealYmdFr').datepicker("setDate", sData.DEAL_START_YMD);
                $('#msSupPopDealYmdTo').datepicker("setDate", sData.DEAL_END_YMD);
                $("#msSupPopDealGbnCd").val(sData.DEAL_GBN_CD);
                $("#msSupPopRemark").val(sData.REMARK);
                $("#msSupPopUseYn").val(sData.USE_YN);
            }
        });
    }

}();

$(document).ready(function() {
    MasterCreateSupplierPopApp.init();
});
