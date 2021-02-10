<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
    <head>
        <style>
            .form-horizontal > .form-group > label {text-align: left;}
        </style>
    </head>
    <body>
    <!-- Modal Header-->
        <div class="modal-header">
            <!--<button type="button" class="close" data-close-btn ="true" >X</button>-->
            <input type="hidden" id="createSpecTypeCdPlt" value="0" /> <!--박스Type Data-->
            <button type="button" class="close" data-close-btn="ture">X</button>
            <h4 class="modal-title">paragon Grid</h4>
        </div>
        <!-- Modal Body -->
        <div class="modal-body drag-not">
            <!-- form 형식 생성.-->
            <div class="panel panel-inverse" data-sortable-id="form-stuff-1">
                <div class="panel-body">
                    <form class="form-horizontal" onsubmit="return false;">
                        <div class="row col-md-12 m-b-10">
                            <label class="col-md-1 labelPopup03Asterisk p-l-0">
                                파렛트 갯수
                            </label>
                            <div class="col-md-8">
                                <input type="text" class="form-control input-sm" id="createPltCntPop" size="10" data-domain-id="PLT_CNT"  />
                            </div>
                        </div>

                        <div class="row col-md-12 m-b-10">
                            <label class="col-md-1 labelPopup03 ">
                                파렛트 명
                            </label>
                            <div class="col-md-8">
                                <input type="text" class="form-control input-sm" id="createPltNmPop" size="10" data-domain-id="PLT_NM"  />
                            </div>
                        </div>

                        <div class="row col-md-12 m-b-10">
                            <label class="col-md-1 labelPopup03 ">
                                규격코드
                            </label>
                            <div class="col-md-8">
                                <div class="input-group">
                                    <input type="text" class="form-control input-sm" id="textSpecCd" />
                                    <div class="input-group-btn">
                                        <a class="btn btn-sm btn-primary" id="specCdPop">
                                            <i class="fa fa-search"></i>
                                        </a>
                                    </div>
                                </div>
                        </div>
                    </div>
                </form>
            </div> <!--panel-body -->
        </div>
    </div>

    <div class="modal-footer">
        <button id="createPalletBtn" type="button"  class="btn btn-sm btn-warning m-r-5">
        	<i class="fa fa-angle-double-down"></i><i data-domain-id="CREATE_BTN" > </i>
        </button>
        <button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
        	<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
        </button>
    </div>

    <script src="/js/views/master/master_createPallet.js"></script>

    </body>
</html>
