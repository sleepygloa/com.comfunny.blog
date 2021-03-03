<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <body>
        <div id="obItemObInquiryPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>


        <div id="obItemObInquiryContainer" class="container" >
	        <div id="obItemObInquirySearchHeaderGrp" class="search-form clearfix">
	            <form class="form-inline"  onsubmit="return false;">
	                <input type="hidden" id="obNoData" value="false"/>
	                <input type="hidden" id="obNoDataFlag" value="false"/>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obItemObInquiryClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obItemObInquiryClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id=obItemObInquiryClientNm type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="obItemObInquiryYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obItemObInquiryYmdS" class="input-group-addon date" >
							<input id="obItemObInquiryYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obItemObInquiryYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obItemObInquiryYmdE" class="input-group-addon date" >
							<input id="obItemObInquiryYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obItemObInquiryCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obItemObInquiryObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obItemObInquiryStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obItemObInquiryStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obItemObInquiryStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obItemObInquiryObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LOCAL_EXPORT_GBN"></span>
	                    <select id="obItemObInquiryLocalExportGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obItemObInquiryRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obItemObInquiryRStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obItemObInquiryRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM"></span>
						<input id="obItemObInquiryItemCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obItemObInquiryItemPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obItemObInquiryItemNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CLASS"></span>
		                <div class="col-xs-w33f3">
		                    <select id="obItemObInquiryCategory" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="obItemObInquiryBrand" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="obItemObInquirySku" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="obItemObInquiryObProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obItemObInquirySoNo" type="text" class="form-control" autocomplete="off" />
					</div>

		          	<div class="form-group col-xs-w100 m-b-5">
		                <div class="input-group pull-left">
		                    <button id="obItemObInquiryAllFoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_FOLD_BTN" > </i>
		                    </button>
		                    <button id="obItemObInquiryAllUnfoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_UNFOLD_BTN" > </i>
		                    </button>
		                </div>
		               <div class="input-group pull-right">
		                    <button id="obItemObInquirySearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
		            			<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i> <!--검색 버튼 -->
		            		</button>
		                	<button id="obItemObInquiryExcelBtn" type="button"  class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
		            			<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i> <!-- 엑셀 버튼 -->
		            		</button>
		               </div>
		          	</div>
			    </form>
			</div>

			<div id="obItemObInquiryHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obItemObInquiryDetailGrid"></table>
	         		<!-- <div id="obItemObInquiryDetailGridNavi"></div> -->
				</div>
			</div>
        </div>

		<script src="/js/views/outbound/outbound_outboundItemOutboundInquiry.js"></script>

    </body>
</html>
