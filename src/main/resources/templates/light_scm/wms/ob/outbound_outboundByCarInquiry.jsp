<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <body>
        <div id="obByCarInquiryPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="obByCarInquiryContainer" class="container" >
	        <div id="obByCarInquirySearchHeaderGrp" class="search-form clearfix">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="obByCarInquiryYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obByCarInquiryYmdS" class="input-group-addon date" >
							<input id="obByCarInquiryYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obByCarInquiryYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obByCarInquiryYmdE" class="input-group-addon date" >
							<input id="obByCarInquiryYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obByCarInquiryCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obByCarInquiryObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obByCarInquiryStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obByCarInquiryStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obByCarInquiryStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obByCarInquiryRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obByCarInquiryRStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obByCarInquiryRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>


		          	<div class="form-group col-xs-w100 m-b-5">
		                <div class="input-group pull-left">
		                    <button id="obByCarInquiryAllFoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_FOLD_BTN" > </i>
		                    </button>
		                    <button id="obByCarInquiryAllUnfoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_UNFOLD_BTN" > </i>
		                    </button>
		                </div>
		               <div class="input-group pull-right">
		                    <button id="obByCarInquirySearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
		            			<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i> <!--검색 버튼 -->
		            		</button>
		                	<button id="obByCarInquiryExcelBtn" type="button"  class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
		            			<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i> <!-- 엑셀 버튼 -->
		            		</button>
		               </div>
		          	</div>
			    </form>
			</div>

			<div id="obByCarInquiryHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obByCarInquiryGrid"></table>
	         		<div id="obByCarInquiryGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/outbound/outbound_outboundByCarInquiry.js"></script>

    </body>
</html>