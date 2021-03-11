
/** Copyright (c) 2017 VertexID RND, Inc.
 *
 * Application Name : PDA프로그램업로드 관리[SystemPdaProgramUploadApp]
 * Program Code     : PWMSM
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Lee Jong Hyuk       2017. 07. 03.       First Draft.
 */
var SystemPdaProgramUploadApp = function () {
    "use strict";

    /*******************************
     ****전역 객체 선언부 시작******
     ******************************/

    // [El]프로그램 그리드
  var $programGridUpload = $("#pdaProgramUploadGrid");
    /*******************************
     ****전역 객체 선언부 종료******
     ******************************/
  var fileInput = $("#pdaUploadFile");
    return {
        init: function () {
            fnList();
            fnEvents();
        }
    };

    //********** 1.Create Grid List **********

    function fnList(){
        $.ajax({
            url : "/ctrl/settings/system/pdaprogramupload/listPdaVersion",
            type : "POST",
            dataType : "json",
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success : function(data) {
            	$('#pdaCurrVersion').val(data.CODE_OTHER1);
            }
        });
    }



    //[function] 이벤트
    function fnEvents(){

//        $("#fileSaveBtn").click(function(){
//            fnFileSave();
//        });

        //파일업로드
        $("#fileUploadBtn").click(function() {

                //TODO: 파일업로드 로직 수행 필요. 그 부분 나중에 추가.
                fileInput.trigger("click");
                fileInput.change(function() {
                    var file = $(this)[0].files[0];
                    var fileEx = file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase();

                    if(fileEx =="apk"){
                        fnFileSave();
                        $(this).val("");
                    }else{
                        $(this).val("");
                        Util.alert('MSG_SYS_ERR_011'); //apk파일만 올려주세요.
                    }
                });

        });

    }

    function fnFileSave(){
        /**
         * Treat Version Type : 1.1.0.1 (Major, minor, bug, )
         * */

        var pdaCurrVer = $("#pdaCurrVersion").val().trim();
        var pdaNextVer = $("#pdaNextVersion").val().trim();

        //최초의 버전이 없을때
        if(pdaCurrVer == ''){


        //기존 버전이 있을때
        }else{
            if(pdaNextVer == ''){
                alert('업로드 할 APK 버전을 입력해주세요');
                return false;
            }else{
                var currCnt = pdaCurrVer.match(/\./g);
                var nextCnt = pdaNextVer.match(/\./g);

                //버전 타입 유형 비교
                if(currCnt.length != nextCnt.length){
                    alert('버전 타입을 동일하게 입력해주세요.');
                    return false;
                }else{

                    //버전의 4자리 비교
                    var currArr = pdaCurrVer.split(".");
                    var nextArr = pdaNextVer.split(".");

                    //첫쨰자리 비교
                    if(parseInt(currArr[0]) > parseInt(nextArr[0])){
                        Util.alert('MSG_SYS_ERR_015'); //기존 버전보다 높아야 합니다.
                        return false;
                    }else if(parseInt(currArr[0]) == parseInt(nextArr[0])){
                        //둘째자리 비교
                        if(parseInt(currArr[1]) > parseInt(nextArr[1])){
                            Util.alert('MSG_SYS_ERR_015'); //기존 버전보다 높아야 합니다.
                            return false;
                        }else if(parseInt(currArr[1]) == parseInt(nextArr[1])){
                            //셋째자리 비교
                            if(parseInt(currArr[2]) > parseInt(nextArr[2])){
                                Util.alert('MSG_SYS_ERR_015'); //기존 버전보다 높아야 합니다.
                                return false;
                            }else if(parseInt(currArr[2]) == parseInt(nextArr[2])){
                                //넷째자리 비교
                                if(parseInt(currArr[3]) >= parseInt(nextArr[3])){
                                    Util.alert('MSG_SYS_ERR_015'); //기존 버전보다 높아야 합니다.
                                    return false;
                                };
                            };
                        };
                    };
                }
            }
        }
        //버전 검사 끝
        var infiles = fileInput[0].files;
        var formData = new FormData();
        if(infiles.length > 0) {
            var addfile = infiles[0];
            var fileNm = addfile.name; //파일이름
            var fsize = addfile.size; //파일 용량
            formData.append('files',addfile);
            console.log(fileNm);
            console.log(fsize.fileSizeFormat());

            //파일이름 강제 확인
            if(fileNm.indexOf("wms.apk") == -1){
                alert('apk 파일명이 올바르지 않습니다. wms.apk 로 변경해주세요');
                return false;
            }

        }else{
            Util.alert("MSG_COM_ERR_074"); //선택된 파일이 없습니다.
            return;
        }

        //업로드 시작
        //App.prcsStart();
        $.ajax({
            url : "/ctrl/settings/system/pdaprogramupload/fileUploadSave",
            data : formData,
            type : "POST",
            dataType : "json",
            cache: false,
            contentType: false,
            processData: false,
            success : function(data) {
                console.log(data);
                $("#fileUpload").val('');

                $.ajax({
                    url : "/ctrl/settings/system/pdaprogramupload/fileUploadUpdate",
                    data : {codeOther1 : $("#pdaNextVersion").val()},
                    type : "POST",
                    dataType : "json",
                    success : function(data) {
                        alert("저장 되었습니다.");
                        fnList();
                    },
                    complete : function(data) {
                    	//App.prcsEnd();
                    }
                });
            }
        });
    }

}();

$(document).ready(function() {
    SystemPdaProgramUploadApp.init();
});
