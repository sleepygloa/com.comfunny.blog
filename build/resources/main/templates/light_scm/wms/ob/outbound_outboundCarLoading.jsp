<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="outboundCarLoadingPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="outboundCarLoadingContainer" class="container" >
	        <div id="outboundCarLoadingSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="outboundCarLoadingClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="outboundCarLoadingClientCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="outboundCarLoadingClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="outboundCarLoadingObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="outboundCarLoadingObYmdS" class="input-group-addon date" >
							<input id="outboundCarLoadingObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="outboundCarLoadingObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="outboundCarLoadingObYmdE" class="input-group-addon date" >
							<input id="outboundCarLoadingObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="outboundCarLoadingObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="outboundCarLoadingStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="outboundCarLoadingStoreCdBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="outboundCarLoadingStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="outboundCarLoadingCarNo" type="text" class="form-control" autocomplete="off" />
					</div>


					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="outboundCarLoadingObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="outboundCarLoadingRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="outboundCarLoadingRStoreCdBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="outboundCarLoadingRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>


					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="outboundCarLoadingSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="outboundCarLoadingObProgStCd" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WAVE_NO"></span>
						<input id="outboundCarLoadingWaveNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DELIVERY_DGR"></span>
						<input id="outboundCarLoadingDeliveryDgr" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OUTPUT_KIND"></span>
	                    <select id="outboundCarLoadingReportCd" class="form-control " >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

	                <div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
	                        <button id="outbuondCarLoadingTotalApplyBtn" type="button" class="btn btn-sm btn-warning m-r-5" data-authRule="AUTH_NEW">
	                            <i class="fa fa-angle-double-down"></i><i data-domain-id="BATCHCREATION_BTN"></i><!-- 일괄저장 -->
	                        </button>
	                        <button id="outbuondCarLoadingSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	            				<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!-- 조회 -->
	            			</button>
	            			<button id="outbuondCarLoadingConfirmBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
	            				<i class="fa fa-check"></i><i data-domain-id="CARLD_CONF"></i><!-- 확정 -->
	            			</button>
	            			<button id="outbuondCarLoadingCancleBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
	            				<i class="fa fa-undo"></i><i data-domain-id="CARLD_CANCL"></i><!-- 취소 -->
	            			</button>
	                        <button id="outbuondCarLoadingReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
	                            <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i><!-- 인쇄 -->
	                        </button>
	            			<button id="outbuondCarLoadingExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	            				<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!-- 액셀 -->
	            			</button>
	                        </div>
	                </div> <!-- Row 4 -->

	            </form>
	        </div>

			<div id="outboundCarLoadingHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="outboundCarLoadingHGrid"></table>
	         		<div id="outboundCarLoadingHGridNavi"></div>
				</div>
			</div>

			<div id="outboundCarLoadingSearchDetailGrp" class="search-form clearfix col-xs-w100">
	            <div class="input-group col-xs-w100">
	                <div class="input-group pull-right">
<!-- 	                    <button type="button" id="outboundCarLoadingApplyBtn" class="btn btn-sm btn-warning m-r-4">
	                        <i class="fa fa-angle-double-down"></i><i data-domain-id="BATCH_APPLY"></i>
	                    </button>
	                    <button type="button" id="outboundCarLoadingSaveBtn" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success m-r-4">
	                        <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i>
	                    </button> -->
		                <button id="outbuondCarLoadingDetailSaveBtn" type="button"   class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_NEW">
		                    <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
		                </button>
	                </div>
	            </div>
			</div>

			<div id="outboundCarLoadingDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="outboundCarLoadingDGrid"></table>
		          	<div id="outboundCarLoadingDGridNavi"></div>
				</div>
<!-- 				<div>
		          	<table id="outboundCarLoadingPGrid"></table>
		          	<div id="outboundCarLoadingPGridNavi"></div>
				</div> -->
			</div>

		</div>

        <script src="/js/views/outbound/outbound_outboundCarLoading.js"></script>
    </body>
</html>
