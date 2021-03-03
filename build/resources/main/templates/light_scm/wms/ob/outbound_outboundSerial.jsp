<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<style>
    .form-group {margin-bottom:0px;}
</style>
    <body>
        <div class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>
        <div class="search-form clearfix">
            <form class="form-inline"  onsubmit="return false;">

                <div class="form-group col-md-12 m-b-10">
                    <div data-lang="LC0001"  class="form-group col-md-4 clientFlag" >
                        <span class="form-group spanClass03Asterisk" data-domain-id="CLINET"></span>
                        <!--<label class="control-label spanClass03">고객사</label>-->
                            <div class="input-group">
                            <input type="text" class="form-control input-sm" id="outboundSerialClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="outboundSerialClientCdPopup">
          					            <i class="fa fa-search"></i>
          				            </a>
                                </div>
                        </div><!--End 고객사 -->
                        <input type="text" class="form-control input-sm" id="outboundSerialClientNm" value="${sessionScope.s_clientNm_Prioord}" size="15" placeholder="" readonly>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03Asterisk" data-domain-id="OB_YMD"></span>
                        <div class="input-group date" id="outboundSerialdatepicker1">
                            <input type="text" class="form-control input-sm" size="10" id="outboundSerialFromDate" placeholder=""/> <!-- 출고일자-->
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5" id="outboundSerialFromDateBtn">
                                    <i class="fa fa-calendar"></i>
                                </a>
                            </div>
                        </div>
                        &nbsp; ~ &nbsp;
                        <div class="input-group date" id="outboundSerialdatepicker2">
                            <input type="text" class="form-control input-sm" size="10" id="outboundSerialToDate" placeholder=""/>
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5" id="outboundSerialToDateBtn">
                                    <i class="fa fa-calendar"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="OB_NO"></span>
                        <input type="text" class="form-control input-sm" size="15" id="outboundSerialObNo" placeholder=""/>
                    </div> <!--End 출고번호 -->
                </div> <!-- Row 1 -->

                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="STORE"></span>
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="outboundSerialStoreCd" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="outboundSerialStoreCdBtn">
          					            <i class="fa fa-search"></i>
          				            </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="outboundSerialStoreNm" size="15" placeholder="" readonly>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="CAR_NO"></span>
                        <input type="text" class="form-control input-sm" size="15" id="outboundSerialCarNo" placeholder=""/>
                    </div>


                    <div data-lang="LC0001"  class="form-group col-md-4" >
                        <span class="form-group spanClass03" data-domain-id="OB_GBN"></span>
                        <div class="input-group">
                            <select class="form-control input-sm p-0 input-medium" id="outboundSerialObGbnCd">
                                <option value=""></option>
                            </select>
                        </div>
                    </div><!--End: 출고구분-->
                </div> <!-- Row 2 -->

                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="RSTORE"></span>
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="outboundSerialRstoreCd" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="outboundSerialRstoreCdBtn">
          					            <i class="fa fa-search"></i>
          				            </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="outboundSerialRstoreNm" size="15" placeholder="" readonly>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="SO_NO"></span>
                        <input type="text" class="form-control input-sm" size="15" id="outboundSerialSoNo" placeholder=""/>
                    </div>

                    <div data-lang="LC0001"  class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="OB_PROG_ST"></span>
                        <div class="input-group">
                            <select class="form-control input-sm p-0 input-medium" id="outboundSerialObProgStCd">
                                <option value=""></option>
                            </select> <!-- 진행상태 -->
                        </div>
                    </div>
                </div> <!-- Row 3 -->

                <div class="form-group col-md-12">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="ITEM"></span><!--제품-->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="outboundSerialItemCd" size="10" placeholder="" >
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="outboundSerialItemCdBtn">
          					            <i class="fa fa-search"></i>
          				            </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="outboundSerialItemNm" size="15" placeholder="" readonly>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="DELIVERY_DGR"></span>
                        <input type="text" class="form-control input-sm" size="15" id="outboundSerialDeliveryDgr" placeholder=""/>
                    </div>
                </div> <!-- Row 4 -->
                <div class="form-group col-md-12">
					<div class="input-group pull-right">
                        <button type="button" id="searchOutboundSerialBtn" class="btn btn-sm btn-primary">
            				<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!-- 조회 -->
            			</button>
                    </div>
                </div> <!-- Row 4 -->
            </form>
        </div>


        <div class="content-form clearfix m-b-0">

            <div class="form-group col-md-12 p-r-2 m-b-2">
                <div class="grid-wrapper">
                    <table id="outboundSerialHGrid"></table>
                    <div id="outboundSerialHGridNavi"></div>
                </div>
            </div> <!--End: outboundSerialHGrid-->

            <div class="form-group col-md-12 p-r-2 m-b-2">
            <div class="search-form clearfix" align="right">
                <button type="button" id="addOutboundSerialBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info">
                    <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN"> </i>
                </button>
                <button type="button" id="saveOutboundSerialBtn"  class="btn btn-sm btn-success">
                    <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i>
                </button>
                <button type="button" id="delOutboundSerialBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger">
                    <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"> </i>
                </button>
            </div>
            </div><!--End: -->

            <div class="form-group col-md-12 p-r-2 m-b-0 ">
                <div class="grid-wrapper">
                    <table id="outboundSerialDGrid"></table>
                    <div id="outboundSerialDGridNavi"></div>
                </div>
            </div><!--End: outboundSerialDGrid-->

        </div>

        <script src="/js/views/outbound/outbound_outboundSerial.js"></script>
    </body>
</html>
