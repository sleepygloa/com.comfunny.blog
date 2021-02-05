/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 구매처관리[MasterSupplierApp]
 * Program Code     : PWMMS106E
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Min su       2017. 2. 24.        First Draft.
 */
var MasterSupplierApp = function () {
    "use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS106E';
	var proNm = 'msSup';

    // [El]프로그램 그리드
    var $msSupHGrid = $("#msSupHGrid");

    var $callBackInput;

    var useYnComboJson;

    var dealGbnComboJson;

    var firstLoad = true;

    return {
        init: function () {


            useYnComboJson = WMSUtil.fnCombo.grid_selectBox('msSupUseYn', 'UOM_CD');

            dealGbnComboJson = WMSUtil.fnCombo.grid('DEAL_GBN_CD');

            //고객사관리 Event
            fnEvents();
            //고객사관리 Grid생성
            fnList();
        },
        callBackInput: function () {
            return $callBackInput;
        }
    };

    //[Fn] 이벤트
    function fnEvents(){

        //코드 입력시 명 서치
        addClientCdChangeEvent("supClient", ["sup"]);          //고객사
        addCdChangeEvent("supClient", "sup", "SUPPLIER");      //구매처

        //추가버튼
        $("#msSupAddBtn").click(function(){
            fnNew();
        });

        //검색버튼
        $("#msSupSearchBtn").click(function(){
            fnSearch();
        });
        //삭제버튼
        $("#delSupplierBtn").click(function(){
//            $msSupHGrid.paragonGridCheckedDelete();
            fnDelete();
        });
        //엑셀버튼
        $("#msSupExcelBtn").click(function(){
            $msSupHGrid.downloadExcel();
        });

        $("#msSupClientPop").click(function(){
        	WMSUtil.popup.client('msSupClient');
        });

        $("#msSupSupplierPop").click(function(){
        	WMSUtil.popup.supplier('msSupSupplier',{clientCd : $('#'+proNm+'msSupClient').val()});
        });

        $("#msSupClientNm").attr("disabled", true);
        $("#msSupSupplierNm").attr("disabled", true);
    }

    //[Fn] 검색 조건 매핑
    function fnSearch(){
        //그리드 수정 여부 체크
        if(fnModCheck()){
            var data = {
                    clientCd : $("#msSupClientCd").val(),
                    clientNm : $("#msSupClientNm").val(),
                    supplierCd : $("#msSupSupplierCd").val(),
                    supplierNm : $("#msSupSupplierNm").val(),
                    useYn : $("#msSupUseYn").val()
            };
            $msSupHGrid.paragonGridSearch(data);
        }
    }

    //그리드 수정 여부 체크
    function fnModCheck(){
        return $msSupHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }


    //그리드 초기화
    function fnList(){
        $msSupHGrid.paragonGrid({
            url: '/ctrl/master/supplier/listSupplier',
            sortable: true,
            rowEditable:true,
            cellEditable:false,
            rownumbers: true,
            shrinkToFit:false,
            multiselect:true,
//            multielonly:true,
            rowClickFocus:true,
            height:'596',
            postData:{clientCd:$("#msSupClientCd").val()},
            colModel:[
                {editable: true,name:'SUPPLIER_CD', align:'center', width:"100px"},
                {editable: true,name:'SUPPLIER_NM', align:'left', width:"200px"},
                {editable: true,name:'CLIENT_CD', align:'center', width:"100px", hidden:true},
                {editable: true,name:'CLIENT', align:'left', width:"100px"},
                {editable: true,name:'BIZ_NO', align:'center', width:"100px"},
                {editable: true,name:'BIZ_NM', align:'left', width:"100px"},
                {editable: true,name:'CEO_NM', align:'left', width:"100px"},
                {editable: true,name:'POST_NO', align:'center', width:"100px"},
                {editable: true,name:'BASIC_ADDR', align:'left', width:"300px"},
                {editable: true,name:'DETAIL_ADDR', align:'left', width:"300px"},
                {editable: true,name:'BIZTYPE', align:'center', width:"100px"},
                {editable: true,name:'BIZKIND', align:'center', width:"100px"},
                {editable: true,name:'TEL_NO', align:'center', width:"100px"},
                {editable: true,name:'FAX_NO', align:'center', width:"100px"},
                {editable: true,name:'CONTACT_NM', align:'left', width:"100px"},
                {editable: true,name:'CONTACT_TEL_NO', align:'center', width:"100px"},
                {editable: true,name:'CONTACT_EMAIL', align:'left', width:"100px"},
                {editable: true,name:'DEAL_START_YMD', align:'center', width:"100px", editoptions:function(el){$(el).datepicker();}},
                {editable: true,name:'DEAL_END_YMD', align:'center', width:"100px", editoptions:function(el){$(el).datepicker();}},
                {editable: true,name:'DEAL_GBN', align:"center", width:"100px", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:dealGbnComboJson }
                },
                {editable: true,name:'USE_YN', align:"center", width:"100px", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:useYnComboJson }
                },
                {editable: true,name:'REMARK', align:"center", width:"300px"}
            ],
            pager: "#msSupHGridNavi",
            domainId:"SUPPLIER_LIST",
            gridComplete: function(){
                var ids = $msSupHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $msSupHGrid.setFocus(0);
                }

            },
            ondblClickRow: function(id, iRow, iCol, e){
            	var rowData = $msSupHGrid.getRowData(iRow);
                fnModify(rowData);
            }
        });
    }

    function fnNew() {

        PopApp.paragonOpenPopup({
            ajaxUrl: '/ctrl/master/supplier/createSupplierPop',
            id: 'createSupPop',
            width: '70', /* 2017.09.07 Kim Seon Ho 수정*/
//            height:'900',
            data	: {
            	gbn	: true
            },
//            title :"구매처 등록",
            domainId:'PWMMS106E_P1',
            visible:true
        });
    }

    function fnModify(rowData) {

        PopApp.paragonOpenPopup({
            ajaxUrl	: '/ctrl/master/supplier/createSupplierPop',
            id		: 'createSupPop',
            width	: '70',
//            height:'900',
            data	:	{
            	gbn		:	"false",
            	rowData	:	rowData
            },
//            title :"구매처 수정",
            domainId:'PWMMS106E_P1',
            onload : function(modal) {
                modal.show();
            }
        });
    }

    //[Fn] 수정된 내용저장
    function fnDelete() {

        var checkFlag = $msSupHGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){

            // 데이터 키 : Value Key
            var rowData = {
                    modFlag:"MOD_FLAG" ,
                    clientCd:"CLIENT_CD",
                    supplierCd:"SUPPLIER_CD"
            }

            var chkData = $msSupHGrid.getSelectedJsonData("dt_supplier",rowData);

            if(!chkData){
                Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
                return false;
            }

            if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

            App.prcsStart();
            $.ajax({
                url : "/ctrl/master/supplier/deleteSupplier",
                data :chkData,
                type : "POST",
                dataType : "json",
                contentType: 'application/json; charset=utf-8',
                cache: false,
                success : function(result) {
                    App.prcsEnd();
                    alert(result.msgTxt);
                    $msSupHGrid.paragonGridReload();
                }
            });
        }
    }



}();

$(document).ready(function() {
    MasterSupplierApp.init();
});
