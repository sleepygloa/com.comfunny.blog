<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <body>
        <div id="obStoreObInquiryPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="obStoreObInquiryContainer" class="container" >
			<div id="obStoreObInquirySearchHeaderGrp" class="search-form clearfix">
	            <form class="form-inline"  onsubmit="return false;">
	                <input type="hidden" id="obNoData" value="false"/>
	                <input type="hidden" id="obNoDataFlag" value="false"/>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obStoreObInquiryClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obStoreObInquiryClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id=obStoreObInquiryClientNm type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="obStoreObInquiryYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obStoreObInquiryYmdS" class="input-group-addon date" >
							<input id="obStoreObInquiryYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obStoreObInquiryYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obStoreObInquiryYmdE" class="input-group-addon date" >
							<input id="obStoreObInquiryYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obStoreObInquiryCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obStoreObInquiryObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obStoreObInquiryStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obStoreObInquiryStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obStoreObInquiryStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obStoreObInquiryObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LOCAL_EXPORT_GBN"></span>
	                    <select id="obStoreObInquiryLocalExportGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obStoreObInquiryRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obStoreObInquiryRStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obStoreObInquiryRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CLASS"></span>
		                <div class="col-xs-w33f3">
		                    <select id="obStoreObInquiryCategory" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="obStoreObInquiryBrand" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="obStoreObInquirySku" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>


					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obStoreObInquirySoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="obStoreObInquiryObProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DELIVERY_DGR"></span>
						<input id="obStoreObInquiryDeliveryDgr" type="text" class="form-control" autocomplete="off" />
					</div>

	                <div class="form-group col-xs-w100 m-b-5">
		                <div class="input-group pull-left">
		                    <button id="obStoreObInquiryAllFoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_FOLD_BTN" > </i>
		                    </button>
		                    <button id="obStoreObInquiryAllUnfoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_UNFOLD_BTN" > </i>
		                    </button>
		                </div>
	                    <div class="input-group pull-right">
		                    <button id="obStoreObInquirySearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
		            			<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i> 	<!--검색 버튼 -->
		            		</button>
		                	<button id="obStoreObInquiryExcelBtn" type="button"  class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
		            			<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!--엑셀 버튼 -->
		            		</button>
	                    </div>
	                </div>
	            </form>
	        </div>

			<div id="obStoreObInquiryHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obStoreObInquiryDetailGrid"></table>
	         		<!-- <div id="obStoreObInquiryDetailGridNavi"></div> -->
				</div>
			</div>

		</div>

        <script src="/js/views/outbound/outbound_outboundStoreOutboundInquiry.js"></script>

    </body>
</html>
