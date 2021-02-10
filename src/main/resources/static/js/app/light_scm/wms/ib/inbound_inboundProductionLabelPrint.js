/** Copyright (c) 2017 VertexID RND, Inc.
 *
 * Application Name : 생산라벨출력
 * Program Code     : PWMIB108E
 * Description      :
 * Revision History
 * Author          	Date           		Description
 * ------------		-------------		------------------
 * Kim Seon Ho		2018. 4. 9.  		First Draft.
 *
*/

var IbProductionLabelPrintApp = function(){
    "use strict";

    /************************************************
      *전역 객체 선언부 (return 상위부분에 선언해야함)
    ************************************************/

    var $ibPtLabelPrintGrid = $("#ibPtLabelPrintGrid"); //송수신매핑 항목

    var codeCd;
    var gridRtxObjCdOptions;

    var fileInput = $("#ibPtLabelPrintExcelUploadFile");

    return{
        init: function(){

            toDateSetEvent();

            ibPtLabelPrintGridJson();

            ibPtLabelPrintEvent();

        }
    };

    //********** 1.Create Grid List **********
    function ibPtLabelPrintGridJson(){
        $ibPtLabelPrintGrid.paragonGrid({
            url             : "/ctrl/inbound/inboundProductionLabelPrint/getIbProducLabelPrintList",
            sortable        : true,
            rownumbers      : true,
            rowEditable     : true,
            cellEditable    : false,
            multiselect     : true,
            postData        : {
                clientCd    : $('#ibPtLabelPrintClientCd').val(),
                workYmd     : $('#ibPtLabelPrintWorkYmdFr').val()
            },
//            multielonly: true,
            rowClickFocus   : true,
            shrinkToFit     : false,
            height          : "617",
            domainId        : "PRODUC_LABEL_PRINT",
            colModel: [
                {editable: false, name: "CLIENT_CD", width: "150px", align: "center",  hidden: true},
                {editable: false, name: "WORK_YMD", width: "150px", align: "center"},
                {editable: false, name: "ITEM_CD", width: "150px", align: "center"},
                {editable: false, name: "MAKE_LOT", width: "150px", align: "center"},
                {editable: false, name: "PRINT_QTY", width: "150px", align: "center"},
            ],
            pager: "#ibPtLabelPrintGridNavi"
        });
    }
    //********** 2.About Event List Function. **********
    function ibPtLabelPrintEvent(){
        //코드 입력시 명 서치
        addClientCdChangeEvent("ibPtLabelPrintClient", []);          //고객사

        //고객사 팝업
        $("#ibPtLabelPrintClientPopup").click(function(){
            WMSUtil.popup.client('ibPtLabelPrintClient');
        });

        //조회버튼이벤트
        $("#ibPtLabelPrintSearchBtn").click(function(){
            fnSearch();
        });

        $('#ibPtLabelPrintClientNm').attr('disabled', true);

        //파일업로드
        $('#ibPtLabelPrintFileUploadBtn').click(function(){
            var dataTypeCd = '14';
            console.log(dataTypeCd);
            if(dataTypeCd == '14'){
                //TODO: 파일업로드 로직 수행 필요. 그 부분 나중에 추가.
                fileInput.trigger("click");
                fileInput.change(function() {
                    var file = $(this)[0].files[0];
                    var fileEx = file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();
                    if(fileEx =="xls" || fileEx =="xlsx"){
                        fnFileSave();
                        $(this).val("");
                    }else{
                        $(this).val("");
                        Util.alert('MSG_BAT_ERR_006'); //엑셀파일만 올려주세요.
                    }
                });
            }else{
                Util.alert('MSG_COM_ERR_005'); //업로드 가능한 파일이 아닙니다.
                return;
            }
        });

        $('#ibPtLabelPrintReportBtn').click(function(){
            fnReport("/ctrl/inbound/inboundProductionLabelPrint/createIbExItemLabelReport");
        });

    }

    function fnFileSave(){

      //송수신항목, 자료유형, file Name
      var rtxObjCd = $("#ibPtLabelPrintOutputKind").val();     //송수신항목
      var fileName = "";

      var infiles = fileInput[0].files;
      var formData = new FormData();

      formData.append("rtxObjCd", rtxObjCd);
      formData.append("rtxMappNo", '0000001068');
      formData.append("dynamicTableName", 'TB_MR_PRINT_M');
      formData.append("fileName",  infiles[0].name);
      formData.append("dataTypeCd",  '14');
      formData.append("fileUploadYn","Y");
      formData.append("clientCd",$("#ibPtLabelPrintClientCd").val());

      if(infiles.length > 0) {
          for (var i = 0; i < infiles.length; i++) {
              var addfile = infiles[i];
              var fileNm = addfile.name;
              var fsize = addfile.size;
              formData.append('files',addfile);
          }
      }else{
          Util.alert('MSG_COM_ERR_004'); //파일을 찾을 수 없습니다.
          return;
      }

      //App.prcsStart();
      $.ajax({
          url : "/ctrl/inbound/inboundProductionLabelPrint/ManualProc",
          data : formData,
          type : "POST",
          dataType : "json",
          cache: false,
          contentType: false,
          processData: false,
          success : function(data) {
              //App.prcsEnd();
              Util.alert('MSG_COM_SUC_012'); //업로드 되었습니다.
              $("#ibPtLabelPrintExcelUploadFile").val('');
              //fnFileUpdate();
              fnReloadGrid();
          }
      });
  }

    //datepicker Set up today.
    function toDateSetEvent() {
    	WMSUtil.fnTagYmdSetting('ibPtLabelPrintWorkYmd', true);
    }

    //[Fn] Reload Grid Method
    function fnReloadGrid(){
        $ibPtLabelPrintGrid.paragonGridReload();
    }
    //********** 4. Event Function **********
    //[Fn] Grid Searching Data.
    function fnSearch(){
        //validation
        if($("#ibPtLabelPrintClientCd").val().length == 0){//고객사 검사
            Util.alert('MSG_MST_VAL_026'); //고객사코드 항목은 필수 입력 입니다.
            $("#ibPtLabelPrintClientCd").focus();
            return false;
        }else if($("#ibPtLabelPrintClientCd").val().trim().length == 0){
            Util.alert('MSG_MST_VAL_027'); //고객사코드는 공백으로 입력 할 수 없습니다.
            $("#ibPtLabelPrintClientCd").focus();
            return false;
        }

        var data = {
    	        clientCd   : $.trim($("#ibPtLabelPrintClientCd").val()),
    	        workYmd    : $.trim($("#ibPtLabelPrintWorkYmdFr").val()),
				outputKind : $.trim($("#ibPtLabelPrintOutputKind").val())
		};

        $ibPtLabelPrintGrid.paragonGridSearch(data);
    }

    function fnReport(ReportUrl){
        var reportCd = $('#ibPtLabelPrintOutputKind option:selected').val();
        if(reportCd == '57'){
            reportCd = 'A4';//레포트 설정
        }

        var reportRowData = {
                itemCd  : "ITEM_CD",
                makeLot : "MAKE_LOT",
                printQty : "PRINT_QTY"
        }

        var jsonData   = $ibPtLabelPrintGrid.getSelectedJsonData("dt_data", reportRowData);
        if(!jsonData){
            Util.alert('MSG_COM_VAL_057'); //선택된 행이 없습니다.
            return false;
        }
        var jsonObject = JSON.parse(jsonData);
        jsonObject.dt_data.sort(function(a,b){
            return a.itemCd < b.itemCd ? -1 : a.itemCd > b.itemCd ? 1 : 0;
        })

        var data = {
                dt_data     : jsonObject.dt_data,
                reportCd    : reportCd
        };
        //App.prcsStart();
        $.ajax({
            url:ReportUrl, //출고지시
            data: JSON.stringify(data),
            type:"POST",
            datatype:"JSON",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success:function(data){
                if(data.ERROR_FILE != undefined){
                    alert(data.ERROR_FILE);
                }
                if(data.fileName != undefined){
                    //PDF 미리보기
                    var openNewWindowReport = window.open("about:blank");
                    openNewWindowReport.location.href=data.fileName;
                }
            },
            complete : function(){
                //App.prcsEnd();
            }
        });
    }
}();

$("li.active").siblings().click(function () {
    // trigger the datepicker
    $('.date').datepicker('hide');
});
$("li.active").click(function () {
    // trigger the datepicker
    $('.date').datepicker('hide');
});

$(document).ready(function(){
    IbProductionLabelPrintApp.init();
});
