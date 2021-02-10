<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div id="ibItemInquiryPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="ibItemInquiryContainer" class="container">
		    <div id="ibItemInquirySearchHeaderGrp" class="search-form clearfix" >
		       <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="ibItemInquiryClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibItemInquiryClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibItemInquiryClientPopup" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="IB_YMD"></span>
						<input id="ibItemInquiryYmdFr" type="text" class="form-control"  size="10"/>

						<div id="ibItemInquiryYmdS" class="input-group-addon date" >
							<input id="ibItemInquiryYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="ibItemInquiryYmdTo" type="text" class="form-control"  size="10"/>
						<div id="ibItemInquiryYmdE" class="input-group-addon date" >
							<input id="ibItemInquiryYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_PROG_ST"></span>
	                    <select id="ibItemInquiryIbProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_GBN"></span>
	                    <select id="ibItemInquiryIbGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SUPPLIER"></span>
						<input id="ibItemInquirySupplierCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibItemInquirySupPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibItemInquirySupplierNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_NO"></span>
						<input id="ibItemInquiryIbNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM"></span>
						<input id="ibItemInquiryItemCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibItemInquiryItemPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibItemInquiryItemNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CLASS"></span>
		                <div class="col-xs-w33f3">
		                    <select id="ibItemInquiryLargeClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="ibItemInquiryMiddleClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="ibItemInquirySmallClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LOCAL_EXPORT_GBN"></span>
	                    <select id="ibItemInquiryLocalExportGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

		            <!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
		                <div class="input-group pull-left">
		                    <button id="ibItemInquiryAllFoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_FOLD_BTN" > </i>
		                    </button>
		                    <button id="ibItemInquiryAllUnfoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_UNFOLD_BTN" > </i>
		                    </button>
		                </div>
		                <div class="input-group pull-right">
		                    <button id="ibItemInquirySearchBtn" type="button" class="btn btn-sm btn-primary m-r-5"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
		                    </button>
		                    <button id="ibItemInquiryExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN"><!-- 엑셀 -->
		                        <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
		                    </button>
		                </div>
		            </div>
		        </form>
		    </div>

			<div id="ibItemInquiryHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="ibItemInquiryHGrid"></table>
	         		<div id="ibItemInquiryHGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/inbound/inbound_itemInboundInquiry.js"></script>
	</body>
</html>