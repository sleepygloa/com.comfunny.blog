<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="obPickingPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>
        <div id="obPickingSearchHeaderGrp" class="search-form clearfix">
            <form class="form-inline"  onsubmit="return false;">
                <div class="form-group col-md-12 m-b-10">
                    <div data-lang="LC0001"  class="form-group col-md-4 clientFlag" >
                        <span class="form-group spanClass03Asterisk" data-domain-id="CLIENT"></span>
                            <div class="input-group">
                            <input type="text" class="form-control input-sm" id="obPickingClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="obPickingClientCdPopup">
                                        <i class="fa fa-search"></i>
                                    </a>
                                </div>
                        </div><!--End 고객사 -->
                        <input type="text" class="form-control input-sm" id="obPickingClientNm" value="${sessionScope.s_clientNm_Prioord}" size="30" placeholder="" readonly>
                    </div>

                    <div class="form-group col-md-4">

	                	<span class="form-group spanClass03Asterisk" data-domain-id="OB_YMD"></span>
	                    <input type="text" class="form-control input-sm" id="obPickingObYmdFr" size="10"/>
	                    <div class="input-group date" id="obPickingObYmdS">
	                    	<input type="hidden" id="obPickingObYmdSHid"/>
	                        <div class="input-group-btn">
	                            <a class="btn btn-sm btn-primary m-r-5">
	                                <i class="fa fa-calendar"></i>
	                            </a>
	                        </div>
	                    </div>
                        <!--<label class="control-label">~</label>-->
                        &nbsp; ~ &nbsp;
	                    <input type="text" class="form-control input-sm" id="obPickingObYmdTo" size="10"/>
	                    <div class="input-group date" id="obPickingObYmdE">
	                    	<input type="hidden" id="obPickingObYmdEHid"/>
	                        <div class="input-group-btn">
	                            <a class="btn btn-sm btn-primary m-r-5">
	                                <i class="fa fa-calendar"></i>
	                            </a>
	                        </div>
	                    </div>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="OB_NO"></span>
                        <input type="text" class="form-control input-sm" size="15" id="obPickingObNo" placeholder=""/>
                    </div> <!--End 출고번호 -->
                </div> <!-- Row 1 -->

                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="STORE"></span><!-- 판매처 -->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="obPickingStoreCd" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="obPickingStoreCdBtn">
                                        <i class="fa fa-search"></i>
                                    </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="obPickingStoreNm" size="30" placeholder="" readonly>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="CAR_NO"></span>
                        <input type="text" class="form-control input-sm m-r-10" size="15" id="obPickingCarNo" placeholder=""/>
                    </div>

                    <div data-lang="LC0001"  class="form-group col-md-4" >
                        <span class="form-group spanClass03" data-domain-id="OB_GBN"></span>
                        <div class="input-group">
                            <select class="form-control input-sm p-0 input-medium"  id="obPickingObGbnCd">
                                <option value=""></option>
                            </select>
                        </div>
                    </div><!--End: 출고구분-->
                </div> <!-- Row 2 -->

                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03"><i data-domain-id="RSTORE"></i></span><!-- 납품처 -->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="obPickingRStoreCd" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="obPickingRStoreCdBtn">
                                        <i class="fa fa-search"></i>
                                    </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="obPickingRStoreNm" size="30" placeholder="" readonly>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="SO_NO"></span>
                        <input type="text" class="form-control input-sm" size="15" id="obPickingSoNo" placeholder=""/>
                    </div>

                    <div data-lang="LC0001"  class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="OB_PROG_ST"></span>
                        <div class="input-group">
                            <select class="form-control input-sm p-0 input-medium"  id="obPickingObProgStCd">
                                <!-- <option value=""></option> -->
                            </select> <!-- 진행상태 -->
                        </div>
                    </div>
                </div> <!-- Row 3 -->

                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="WAVE_NO"></span>
                        <input type="text" class="form-control input-sm" size="15" id="obPickingWaveNo" placeholder=""/>
                    </div>
					<div class="form-group col-md-4"><!-- 출력 종류 -->
					    <span class="form-group spanClass03" data-domain-id="OUTPUT_KIND"></span>
					    <div class="input-group">
					    	<select class="form-control input-sm p-0 input-medium" id="obPickingReportCd">
					        </select>
					    </div>
					</div>
                </div> <!-- Row 4 -->

                <div class="form-group col-md-12">
                    <div class="input-group pull-right">
                        <button id="obPickTotalApplyBtn" type="button" class="btn btn-sm btn-warning m-r-5">
                            <i class="fa fa-angle-double-down"></i><i data-domain-id="BATCHCREATION_BTN"></i><!-- 일괄저장 -->
                        </button>
                        <button id="obPickingSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!-- 조회 -->
                        </button>
                        <button id="obPickingConfirmBtn" type="button" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
                            <i class="fa fa-check"></i><i data-domain-id="PICK_CONF"></i><!-- 확정 -->
                        </button>
                        <button id="obPickingCancleBtn" type="button" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger m-r-5">
                            <i class="fa fa-undo"></i><i data-domain-id="PICK_CANCL"></i><!-- 취소 -->
                        </button>
                        <button id="obPickingReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
                            <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i><!-- 인쇄 -->
                        </button>
                        <button id="obPickingExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5">
                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!-- 액셀 -->
                        </button>
                    </div>
                </div><!-- Row 5 -->
            </form>
        </div>

        <div class="grid-wrapper">
          <table id="obPickingGrid"></table>
          <div id="obPickingGridNavi"></div>
        </div>

        <div class="content-form clearfix m-b-0"   >
            <!-- 아이콘 위, 아래-->
            <div class="col-md-6 p-r-10">
               <div class="search-form clearfix" style="height:45px"></div>
            </div>
            <div class="col-md-6 p-l-10 p-r-0">
                <!-- <div class="search-form clearfix" style="height:45px"></div> -->
                 <div class="search-form clearfix" align="right">
                    <button type="button" id="obPickApplyBtn" class="btn btn-sm btn-warning m-r-2">
                        <i class="fa fa-angle-double-down"></i><i data-domain-id="BATCH_APPLY"></i><!--일괄적용-->
                    </button>
                     <button type="button" id="obPickAddBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-2">
                         <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
                     </button>
                     <button type="button" id="obPickSaveBtn"  class="btn btn-sm btn-success m-r-2">
                         <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
                     </button>
                     <button type="button" id="obPickDelBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger m-r-20">
                     <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
                     </button>
                </div>
            </div>
            <!-- 화면 왼쪽 div-->
            <div class="col-md-6 p-r-10">
                <div class="grid-wrapper">
                    <table id="obPickingInstDetailGrid"></table>
                    <div id="obPickingInstDetailGridNavi"></div>
                </div>
            </div>

            <!-- 화면 오른쪽 div-->
            <div class="col-md-6 p-l-10 p-r-2">
                <div class="grid-wrapper">
                    <table id="obPickingDetailGrid"></table>
                    <div id="obPickingDetailGridNavi"></div>
                </div>
            </div>
        </div>



        <script src="/js/views/outbound/outbound_outboundPicking.js"></script>
    </body>
</html>
