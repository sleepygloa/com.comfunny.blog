<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<style>
.form-group{margin-bottom:0px;}
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
                        <span class="form-group spanClass03Asterisk" data-domain-id="CLIENT"></span><!-- 고객사 -->
                            <div class="input-group">
                            <input type="text" class="form-control input-sm" id="outboundDeliveryFinishClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="outboundDeliveryFinishClientCdPopup">
          					            <i class="fa fa-search"></i>
          				            </a>
                                </div>
                        </div><!--End 고객사 -->
                        <input type="text" class="form-control input-sm" id="outboundDeliveryFinishClientNm" value="${sessionScope.s_clientNm_Prioord}" size="30" placeholder="" readonly>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03Asterisk" data-domain-id="OB_YMD"></span><!-- 출고일자 -->
                        <div class="input-group date" id="outboundDeliveryFinishdatepicker1">
                            <input type="text" class="form-control input-sm" size="10" id="outboundDeliveryFinishFromDate" placeholder=""/> <!-- 출고일자-->
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5" id="outboundDeliveryFinishFromDateBtn">
                                    <i class="fa fa-calendar"></i>
                                </a>
                            </div>
                        </div>
                        &nbsp; ~ &nbsp;
                        <div class="input-group date" id="outboundDeliveryFinishdatepicker2">
                            <input type="text" class="form-control input-sm" size="10" id="outboundDeliveryFinishToDate" placeholder=""/>
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5" id="outboundDeliveryFinishToDateBtn">
                                    <i class="fa fa-calendar"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="OB_NO"></span><!-- 출고번호 -->
                        <input type="text" class="form-control input-sm" size="15" id="outboundDeliveryFinishObNo" placeholder=""/>
                    </div> <!--End 출고번호 -->
                </div> <!-- Row 1 -->

                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="STORE"></span><!-- 판매처 -->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="outboundDeliveryFinishStoreCd" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="outboundDeliveryFinishStoreCdBtn">
          					            <i class="fa fa-search"></i>
          				            </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="outboundDeliveryFinishStoreNm" size="30" placeholder="" readonly>
                    </div><!-- End: 판매처 -->

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="CAR_NO"></span><!-- 차량번호 -->
                        <input type="text" class="form-control input-sm" size="15" id="outboundDeliveryFinishCarNo" placeholder=""/>
                    </div>

                    <div data-lang="LC0001"  class="form-group col-md-4" >
                        <span class="form-group spanClass03" data-domain-id="OB_GBN"></span><!-- 출고구분 -->
                        <div class="input-group">
                            <select class="form-control input-sm p-0 input-medium" id="outboundDeliveryFinishObGbnCd">
                                <option value=""></option>
                            </select>
                        </div>
                    </div><!--End: 출고구분-->
                </div> <!-- Row 2 -->

                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="RSTORE"></span><!-- 납품처 -->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="outboundDeliveryFinishRstoreCd" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="outboundDeliveryFinishRstoreCdBtn">
          					            <i class="fa fa-search"></i>
          				            </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="outboundDeliveryFinishRstoreNm" size="30" placeholder="" readonly>
                    </div><!-- End: 납품처 -->

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="SO_NO"></span><!-- 주문번호 -->
                        <input type="text" class="form-control input-sm" size="15" id="outboundDeliveryFinishSoNo" placeholder=""/>
                    </div>

                    <div data-lang="LC0001"  class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="OB_PROG_ST"></span><!-- 진행상태 -->
                        <div class="input-group">
                            <select class="form-control input-sm p-0 input-medium" id="outboundDeliveryFinishObProgStCd">
                                <option value=""></option>
                            </select> <!-- 진행상태 -->
                        </div>
                    </div>
                </div> <!-- Row 3 -->

                 <!-- <div class="form-group col-md-12"> Row 4
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="DELIVERY_DGR"></span>배송차수
                        <input type="text" class="form-control input-sm" size="15" id="outboundDeliveryFinishDeliveryDgr" placeholder=""/>
                    </div>
                </div> -->
                 <div class="form-group col-md-12"> <!-- Row 4 -->
                    <div class="input-group pull-right">
                        <button type="button" id="searchOutboundDeliveryFinishBtn" class="btn btn-sm btn-primary m-r-5">
            				<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!-- 조회 -->
            			</button>
            			<button type="button" id="saveOutboundDeliveryFinishBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-success m-r-5">
            				<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i><!-- 저장 -->
            			</button>
            			<button type="button" id="confirmOutboundDeliveryFinishBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
                            <i class="fa fa-check"></i><i data-domain-id="DELIVERY_FNSH"></i><!-- 배송완료 -->
                        </button>
            			<button type="button" id="cancelOutboundDeliveryFinishBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger m-r-5">
            				<i class="fa fa-undo"></i><i data-domain-id="FNSH_CANCL"></i>
            			</button>
            			<button type="button" id="exceOutboundDeliveryFinishBtn" class="btn btn-sm btn-primary m-r-5">
            				<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!-- 액셀 -->
            			</button>
                    </div>
                </div>



            </form>
        </div>

        <div class="content-form clearfix m-b-0">
            <div class="form-group col-md-12 p-r-2">
                <div class="grid-wrapper">
                    <table id="outboundDeliveryFinishHGrid"></table>
                    <div id="outboundDeliveryFinishHGridNavi"></div>
                </div>
            </div>

            <div class="form-group col-md-12 p-r-2">
                <div class="grid-wrapper">
                    <table id="outboundDeliveryFinishDGrid"></table>
                    <div id="outboundDeliveryFinishDGridNavi"></div>
                </div>
            </div>
        </div>

        <script src="/js/views/outbound/outbound_outboundDeliveryFinish.js"></script>
    </body>
</html>
