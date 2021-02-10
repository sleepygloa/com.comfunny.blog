<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div id="ibSupInquiryPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="ibSupInquiryContainer" class="container" >
		    <div id="ibSupInquirySearchHeaderGrp" class="search-form clearfix" >
		       <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="ibSupInquiryClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibSupInquiryClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibSupInquiryClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="IB_YMD"></span>
						<input id="ibSupInquiryYmdFr" type="text" class="form-control"  size="10"/>

						<div id="ibSupInquiryYmdS" class="input-group-addon date" >
							<input id="ibSupInquiryYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="ibSupInquiryYmdTo" type="text" class="form-control"  size="10"/>
						<div id="ibSupInquiryYmdE" class="input-group-addon date" >
							<input id="ibSupInquiryYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_PROG_ST"></span>
	                    <select id="ibSupInquiryIbProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_GBN"></span>
	                    <select id="ibSupInquiryIbGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SUPPLIER"></span>
						<input id="ibSupInquirySupplierCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibSupInquirySupplierPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibSupInquirySupplierNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM"></span>
						<input id="ibSupInquiryItemCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibSupInquiryItemPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibSupInquiryItemNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CLASS"></span>
		                <div class="col-xs-w33f3">
		                    <select id="ibSupInquiryLargeClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="ibSupInquiryMiddleClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="ibSupInquirySmallClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_NO"></span>
						<input id="ibSupInquiryIbNo" type="text" class="form-control" autocomplete="off" />
					</div>

		            <!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
		                <div class="input-group pull-left">
		                    <button id="ibSupInquiryAllFoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_FOLD_BTN" > </i>
		                    </button>
		                    <button id="ibSupInquiryAllUnfoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_UNFOLD_BTN" > </i>
		                    </button>
		                </div>
		                <div class="input-group pull-right">
		                    <button id="ibSupInquirySearchBtn" type="button" class="btn btn-sm btn-primary m-r-5"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
		                    </button>
		                    <button id="ibSupInquiryExcelBtn" type="button"  class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN"><!-- 엑셀 -->
		                        <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
		                    </button>
		                </div>
		            </div>
		        </form>
		    </div>

			<div id="ibSupInquiryHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="ibSupInquiryHGrid"></table>
	         		<div id="ibSupInquiryHGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/inbound/inbound_supplierInboundInquiry.js"></script>
	</body>
</html>