/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 판매처(납품처) 등록 팝업[MasterCreateStorePopApp]
 * Program Code     : PWMMS107E_P1
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 20.        First Draft.
 */
var MasterCreateStorePopApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/
    var $storeGrid = $("#masterStoreGrid");

    var getData = $("#createStorePop").PopAppGetData().rowData;

    return {
        init: function () {
            //사용여부
        	WMSUtil.fnCombo.selectBox('msStorePopUseYn', 'USE_YN');
            //LOT제한구분
            WMSUtil.fnCombo.selectBox('msStorePopObLotGbnCd', 'OB_LOT_GBN_CD');
            //거래구분
            WMSUtil.fnCombo.selectBox('msStorePopDealGbnCd', 'DEAL_GBN_CD');
            //채널구분
            WMSUtil.fnCombo.selectBox('msStorePopChannelGbnCd', 'CHANNEL_GBN_CD');
            //할당우선순위
            WMSUtil.fnCombo.selectBox('msStorePopAllocPrioord', 'ALLOC_PRIOORD_CD');
            //DALAT여부
            WMSUtil.fnCombo.selectBox('msStorePopDalatYnd', 'YN');//코드 생성하면 변경

            fnEvents();


            if(getData != undefined){
            	fnGetInfo(getData);
                $("#msStorePopStoreCd").attr("disabled", true);
            }

        }
    };


    //[Fn] 이벤트
    function fnEvents(){

    	WMSUtil.fnTagYmdSetting('msStorePopDealYmd', true, true);

        $("#msStorePopStoreNm").attr('disabled', true);
        $("#msStorePopDeliveryDcNm").attr('disabled', true);
        $("#msStorePopDomainNm").attr('disabled', true);

        //저장버튼
        $("#msStorePopSaveBtn").click(function(){
            fnSave();
        });

        $("#msStorePopStorePop").click(function(){
        	WMSUtil.popup.client('msStorePopClient');
        });

        $("#msStorePopDeliveryDcPop").click(function(){
            fnDcPopup();
        });

        $("#stDomainPopup").click(function(){
            fnDomainPopup();
        });

        $('#msStorePopStoreCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msStorePopStoreNm').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msStorePopStoreCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msStorePopBizNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msStorePopBizNm').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msStorePopCeoNm').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msStorePopPostNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msStorePopBizType').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msStorePopBizKind').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msStorePopBasicAddr').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 500);
        });
        $('#msStorePopDetailAddr').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 500);
        });
        $('#msStorePopTelNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msStorePopFaxNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msStorePopContactNm').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msStorePopContactTelNo').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 50);
        });
        $('#msStorePopContactEmail').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 100);
        });
        $('#msStorePopDeliveryDcCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msStorePopDomainCd').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 20);
        });
        $('#msStorePopRemark').on('keyup blur', function(e){
            gridTextLengthLimit($(this), e, 500);
        });
    }


    //[Fn] 수정된 내용저장
    function fnSave() {

        // 데이터 키 : Value Key
        var rowData = {
            clientCd            : $("#msStorePopStoreCd").val(),
            storeCd             : $("#msStorePopStoreCd").val(),
            storeNm             : $("#msStorePopStoreNm").val(),
            bizNo               : $("#msStorePopBizNo").val(),
            bizNm               : $("#msStorePopBizNm").val() ,
            ceoNm               : $("#msStorePopCeoNm").val() ,
            postNo              : $("#msStorePopPostNo").val() ,
            basicAddr           : $("#msStorePopBasicAddr").val() ,
            detailAddr          : $("#msStorePopDetailAddr").val() ,
            biztype             : $("#msStorePopBizType").val() ,
            bizkind             : $("#msStorePopBizKind").val() ,
            telNo               : $("#msStorePopTelNo").val() ,
            faxNo               : $("#msStorePopFaxNo").val() ,
            channelGbnCd        : $("#msStorePopChannelGbnCd").val(),
            contactNm           : $("#msStorePopContactNm").val() ,
            contactTelNo        : $("#msStorePopContactTelNo").val() ,
            contactEmail        : $("#msStorePopContactEmail").val() ,
            deliveryDcCd        : $("#msStorePopDeliveryDcCd").val() ,
            deliveryDomainCd    : $("#msStorePopDomainCd").val() ,
            allocPrioordCd      : $("#msStorePopAllocPrioord").val() ,
            dealStartYmd        : WMSUtil.fnDateSetting.yyyymmdd($("#msStorePopDealYmdFr").val()),
            dealEndYmd          : WMSUtil.fnDateSetting.yyyymmdd($("#msStorePopDealYmdTo").val()),
            dealGbnCd           : $("#msStorePopDealGbnCd").val() ,
            remark              : $("#msStorePopRemark").val() ,
            dalatYn             : $("#msStorePopDalatYnd").val(),
            useYn               : $("#msStorePopUseYn").val(),
            oblotGbnCd          : $("#msStorePopObLotGbnCd").val()
        }

        var jsonData = JSON.stringify(rowData);

        //validation
        if($("#msStorePopStoreCd").val().length == 0){
            Util.alert('MSG_MST_VAL_034'); //판매처(납품처)코드 항목은 필수 입력입니다.
            $("#msStorePopStoreCd").focus();
            return false;
        }else if($("#msStorePopStoreCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_035'); //판매처(납품처)코드는 공백으로 입력 할 수 없습니다.
            $("#msStorePopStoreCd").focus();
            return false;
        }
        if($("#msStorePopStoreNm").val().length == 0){
            Util.alert('MSG_MST_VAL_036'); //판매처(납품처)명 항목은 필수 입력입니다.
            $("#msStorePopStoreNm").focus();
            return false;
        }else if($("#msStorePopStoreNm").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_037'); //판매처(납품처)명은 공백으로 입력 할 수 없습니다.
            $("#msStorePopStoreNm").focus();
            return false;
        }
        if($("#msStorePopStoreCd").val().length == 0){
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력입니다.
            $("#msStorePopStoreCd").focus();
            return false;
        }else if($("#msStorePopStoreCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#msStorePopStoreCd").focus();
            return false;
        }else if($("#msStorePopStoreNm").val().length == 0){
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력입니다.
            $("#msStorePopDomainCd").focus();
            return false;
        }
        if(!$('#msStorePopUseYn')){//사용여부 검사
            Util.alert('MSG_MST_VAL_001'); //사용여부 항목은 필수 입력입니다.
            return false;
        }

        if (!confirm((Util.confirm('MSG_COM_CFM_003')).msgTxt)) return; //저장하시겠습니까?

        var sUrl = "";
        if(getData == undefined){
            sUrl = "createStore";
        }else{
            sUrl = "updateStore";
        }

        App.prcsStart();
        $.ajax({
            url 		: "/ctrl/master/store/"+sUrl,
            data 		: jsonData,
            type 		: "POST",
            dataType 	: "json",
            contentType	: 'application/json; charset=utf-8',
            cache		: false,
            success 	: function(data) {

                if(data.msgCd == 500){
                    alert(data.msgTxt);
                    return false;;
                }

                alert(data.msgTxt);
                $("#createStorePop").paragonClosePopup();
                $storeGrid.paragonGridReload();
            },
            complete : function(){
                //App.prcsEnd();
            }
        });
    }


    function fnDcPopup() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/dcPopup',
            id : 'modalDcPopup',
            width : '50',
            domainId:"PWMCM101Q_P1",
            onload : function(modal) {
                modal.show();
            },
            callback : function(rowData){
                $("#msStorePopDeliveryDcCd").val(rowData.DC_CD);
                $("#msStorePopDeliveryDcNm").val(rowData.DC_NM);
            }
        });
    }

    function fnDomainPopup() {
        PopApp.paragonOpenPopup({
            ajaxUrl : '/ctrl/common/domainPop',
            id : 'modalDomainPopup',
            width : '50',
            domainId:"PWMCM116Q_P1",
            data : {dcCd : $("#msStorePopDeliveryDcCd").val()},
            onload : function(modal) {
                modal.show();
            },
            callback : function(rowData){
                $("#msStorePopDomainCd").val(rowData.DOMAIN_CD);
                $("#msStorePopDomainNm").val(rowData.DOMAIN_DETAIL_NM);
            }
        });
    }

    function fnGetInfo(getData){
    	 $("#msStorePopStoreCd").val(getData.STORE_CD);
         $("#msStorePopStoreNm").val(getData.STORE_NM);
         $("#msStorePopStoreCd").val(getData.CLIENT_CD);
         $("#msStorePopStoreNm").val(getData.CLIENT);
         $("#msStorePopBizNo").val(getData.BIZ_NO);
         $("#msStorePopBizNm").val(getData.BIZ_NM);
         $("#msStorePopCeoNm").val(getData.CEO_NM);
         $("#msStorePopPostNo").val(getData.POST_NO);
         $("#msStorePopBizType").val(getData.BIZTYPE);
         $("#msStorePopBizKind").val(getData.BIZKIND);
         $("#msStorePopBasicAddr").val(getData.BASIC_ADDR);
         $("#msStorePopDetailAddr").val(getData.DETAIL_ADDR);
         $("#msStorePopTelNo").val(getData.TEL_NO);
         $("#msStorePopFaxNo").val(getData.FAX_NO);
         $("select[id='msStorePopChannelGbnCd'] option[value="+getData.CHANNEL_GBN_CD+"]").attr('selected', 'selected');
         $("#msStorePopContactNm").val(getData.CONTACT_NM);
         $("#msStorePopContactTelNo").val(getData.CONTACT_TEL_NO);
         $("#msStorePopContactEmail").val(getData.CONTACT_EMAIL);
         if(getData.ALLOC_PRIOORD_CD != ""){
        	 $("select[id='msStorePopAllocPrioord'] option[value="+getData.ALLOC_PRIOORD_CD+"]").attr('selected', 'selected');
         }
         $("#msStorePopDeliveryDcCd").val(getData.DELIVERY_DC_CD);
         $("#msStorePopDeliveryDcNm").val(getData.DELIVERY_DC);
         $("select[id='msStorePopDealGbnCd'] option[value="+getData.DEAL_GBN_CD+"]").attr('selected', 'selected');
         $("#msStorePopDomainCd").val(getData.DELIVERY_DOMAIN_CD);
         $("#msStorePopDomainNm").val(getData.DOMAIN_DETAIL_NM);
         $("#msStorePopDealYmdFr").val(getData.DEAL_START_YMD);
         $("#msStorePopDealYmdTo").val(getData.DEAL_END_YMD);
         $("select[id='msStorePopDalatYn'] option[value="+getData.DALAT_YN+"]").attr('selected', 'selected');
         $("select[id='msStorePopUseYn'] option[value="+getData.USE_YN+"]").attr('selected', 'selected');
         $("#msStorePopRemark").val(getData.REMARK);
    }

}();

$(document).ready(function() {
    MasterCreateStorePopApp.init();
});
