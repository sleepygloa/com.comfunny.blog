/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 판매처(납품처)관리[MasterStoreApp]
 * Program Code     : PWMMS107E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Min su  		2017. 3. 2.  		First Draft.
 */
var MasterStoreApp = function () {
	"use strict";

	//프로그램 코드, 명
//	var proCd = $('a[class="active"]').data('procd');
    var proCd = 'PWMMS107E';
	var proNm = 'msStore';

	// [El]프로그램 그리드
	var $msStoreHGrid = $("#msStoreHGrid");

	var gridComboDalatYn;
	var useYnComboJson;
    var dealGbnComboJson;
    var lotGbnComboJson;
    var channelGbnComboJson;
    var allocPrioordComboJson;

    var firstLoad = true;


    return {
        init: function () {

        	gridComboDalatYn = WMSUtil.fnCombo.grid('YN');

        	useYnComboJson = WMSUtil.fnCombo.grid_selectBox('msStoreUseYn', 'USE_YN');

        	dealGbnComboJson = WMSUtil.fnCombo.grid('DEAL_GBN_CD');

        	channelGbnComboJson = WMSUtil.fnCombo.grid_selectBox('msStoreChannelCbnCd', 'CHANNEL_GBN_CD');

        	allocPrioordComboJson = WMSUtil.fnCombo.grid('ALLOC_PRIOORD_CD');

        	//배송처관리 Event
        	fnEvents();

        	//배송처관리 Grid생성
        	fnListStore();
	    }
    };

    //[Fn] 이벤트
    function fnEvents(){

    	//타이핑 시 조회 및 2건 이상시 팝업 및 콜백
        WMSUtil.changePop(proNm, 'Client');
        WMSUtil.changePop(proNm, 'Store');

    	//추가버튼
    	$("#msStoreAddBtn").click(function(){
    		fnModify();
    	});
    	//검색버튼
    	$("#msStoreSearchBtn").click(function(){
    		fnSearch();
    	});
    	//삭제버튼
    	$("#msStoreDelBtn").click(function(){
    	    fnDelete();
    	});
    	//엑셀버튼
    	$("#msStoreExcelBtn").click(function(){
    	    $msStoreHGrid.downloadExcel();
    	});

        $("#msStoreClientPopup").click(function(){
        	WMSUtil.popup.client('msStoreClient');
        });

        $("#msStoreStorePopup").click(function(){
        	WMSUtil.popup.store('msStoreStore');
        });

    	$("#msStoreClientNm").attr("disabled", true);
    	$("#msStoreStoreNm").attr("disabled", true);
    }


    //[Fn] 검색 조건 매핑
    function fnSearch(){
        if(fnModCheck()){
            var data = {
                    clientCd    : $("#msStoreClientCd").val(),
                    clientNm    : $("#msStoreClientNm").val(),
                    storeCd     : $("#msStoreStoreCd").val(),
                    storeNm     : $("#msStoreStoreNm").val(),
                    channelGbn  : $("#msStoreChannelCbnCd option:selected").val(),
                    useYn       : $("#msStoreUseYn").val()
            };
            $msStoreHGrid.paragonGridSearch(data);
        }
    }

    //그리드 수정 여부 체크
    function fnModCheck(){
        return $msStoreHGrid.paragonGridModConfirm(Util.confirm('MSG_COM_CFM_009').msgTxt); //변경사항이 있습니다. 계속 진행하시겠습니까?
    }

    //[Fn] jqgrid Store 목록
    function fnListStore(){
		$msStoreHGrid.paragonGrid({
		    url				: '/ctrl/master/store/listStore',
		    rowEditable		: true,
            cellEditable	: false,
            sortable		: true,
            rownumbers		: true,
            shrinkToFit		: false,
            multiselect		: true,
//            multielonly:true,
            height			: '556',
            postData		: {
        		clientCd	: $("#msStoreClientCd").val()
    		},
            colModel		: [
                {editable: true,name:'STORE_CD', width:"100px", align:"center"},
                {editable: true,name:'STORE_NM', width:"200px", align:"left"},
                {editable: true,name:'CLIENT_CD', width:"100px", align:"center", hidden:true},
                {editable: true,name:'CLIENT', width:"100px", align:"left"},
                {editable: true,name:'BIZ_NO', width:"100px", align:"center"},
                {editable: true,name:'BIZ_NM', width:"200px", align:"left"},
                {editable: true,name:'CEO_NM', width:"100px", align:"left"},
                {editable: true,name:'POST_NO', width:"100px", align:"center"},
                {editable: true,name:'BASIC_ADDR', width:"300px", align:"left"},
                {editable: true,name:'DETAIL_ADDR', width:"300px", align:"left"},
                {editable: true,name:'BIZTYPE', width:"100px", align:"center"},
                {editable: true,name:'BIZKIND', width:"100px", align:"center"},
                {editable: true,name:'TEL_NO', width:"100px", align:"center"},
                {editable: true,name:'FAX_NO', width:"100px", align:"center"},
                {editable: true,name:'CHANNEL_GBN_CD', width:"100px", align:"center", hidden:true},
                {editable: true,name:'CHANNEL_GBN',align:"center",width:"100px",fixed :true,
                	edittype:'select',formatter:'select', editoptions: { value : channelGbnComboJson }
                },
                {editable: true,name:'CONTACT_NM', width:"100px", align:"left"},
                {editable: true,name:'CONTACT_TEL_NO', width:"100px", align:"center"},
                {editable: true,name:'CONTACT_EMAIL', width:"100px", align:"center"},
                {editable: true,name:'DELIVERY_DC_CD', width:"100px", align:"center", hidden:true},
                {editable: true,name:'DELIVERY_DC', width:"100px", align:"center"},
                {editable: true,name:'DELIVERY_DC_NM', align:"center", width:"100px", hidden:true},
                {editable: true,name:'DELIVERY_DOMAIN_CD', width:"100px", align:"center", hidden:true},
                {editable: true,name:'DOMAIN_DETAIL_NM', width:"100px", align:"center"},
                {editable: true,name:'ALLOC_PRIOORD_CD', width:"100px", align:"center", hidden:true},
                {editable: true, name:'ALLOC_PRIOORD', width:"100px",align:"center", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:allocPrioordComboJson }
                },
                {editable: true,name:'DEAL_START_YMD', width:"100px", align:"center", editoptions:{ dataInit :function(el){$(el).datepicker();}}},
                {editable: true,name:'DEAL_END_YMD', width:"100px", align:"center", editoptions:{ dataInit :function(el){$(el).datepicker();}}},
                {editable: true,name:'DEAL_GBN_CD', width:"100px", align:"center", hidden:true},
                {editable: true, name:'DEAL_GBN',width:"100px", align:"center", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:dealGbnComboJson }
                },
                {editable: true, name:'DALAT_YN',width:"100px", align:"center", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:gridComboDalatYn, }
                },
                {editable: true, name:'USE_YN',width:"100px", align:"center", fixed :true,
                    edittype:'select', formatter:'select', editoptions: { value:useYnComboJson }
                },
                {editable: true,name:'REMARK', align:"center", width:"300px"},
            ],
            pager: "#msStoreHGridNavi",
            domainId:"STORE_LIST",
            ondblClickRow: function(id, iRow, iCol, e){
            	console.log('d');
            	var rowData = $msStoreHGrid.getRow(iRow);
                fnModify(rowData);
            },
            gridComplete: function(){
                var ids = $msStoreHGrid.jqGrid("getDataIDs");
                if(ids && ids.length > 0){
                    $msStoreHGrid.setFocus(0);
                }

            }
        });
    }

    function fnModify(rowData) {
        PopApp.paragonOpenPopup({
            ajaxUrl	: '/ctrl/master/store/createStorePop',
            id		: 'createStorePop',
            data 	: { rowData : rowData },
            width	: '90',
//            height	: '1200',
            btnName	: "저장",
            domainId: "PWMMS107E_P1",
            //title :"배송처 수정",
            visible	: true
        });

    }

    function fnDelete() {

        var checkFlag = $msStoreHGrid.paragonGridCheckedDeleteData();

        if(checkFlag === false){

        	// 데이터 키 : Value Key
        	var rowData = {
        			modFlag:"MOD_FLAG" ,
        			clientCd:"CLIENT_CD" ,
        			storeCd:"STORE_CD"
    		}

        	var chkData = $msStoreHGrid.getSelectedJsonData("dt_store",rowData);

        	if(!chkData){
        	    Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
        	    return false;
        	}

        	if (!confirm((Util.confirm('MSG_COM_CFM_001')).msgTxt)) return; //삭제하시겠습니까?

            //App.prcsStart();
    		$.ajax({
        		url : "/ctrl/master/store/deleteStore",
        		data :chkData,
        		type : "POST",
        		dataType : "json",
        		contentType: 'application/json; charset=utf-8',
        		cache: false,
        		success : function(result) {
                    //App.prcsEnd();
    		        alert(result.msgTxt);
    		        $msStoreHGrid.paragonGridReload();
        		}
        	});
        }
    }
}();

$(document).ready(function() {
    MasterStoreApp.init();
});
