<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="obPalletHistoryInqPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="obPalletHistoryInqContainer" class="container" >

	        <div id="obPalletHistoryInqSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">


					<div class="input-group col-wms-search-group3" style="display:none;">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obPalletHistoryInqClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPalletHistoryInqClientCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPalletHistoryInqClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="obPalletHistoryInqObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obPalletHistoryInqObYmdS" class="input-group-addon date" >
							<input id="obPalletHistoryInqObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obPalletHistoryInqObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obPalletHistoryInqObYmdE" class="input-group-addon date" >
							<input id="obPalletHistoryInqObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obPalletHistoryInqObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PROD_YMD"></span>
						<input id="obPalletHistoryInqProdYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obPalletHistoryInqProdYmdS" class="input-group-addon date" >
							<input id="obPalletHistoryInqProdYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obPalletHistoryInqProdYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obPalletHistoryInqProdYmdE" class="input-group-addon date" >
							<input id="obPalletHistoryInqProdYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obPalletHistoryInqStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPalletHistoryInqStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPalletHistoryInqStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obPalletHistoryInqCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obPalletHistoryInqObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obPalletHistoryInqRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPalletHistoryInqRStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPalletHistoryInqRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obPalletHistoryInqSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PLT_ID"></span>
						<input id="obPalletHistoryInqPltId" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM"></span>
						<input id="obPalletHistoryInqItemCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPalletHistoryInqItemPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPalletHistoryInqItemNm" type="text" class="form-control"  size="35" readonly>
					</div>


   					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CLASS"></span>
		                <div class="col-xs-w33f3">
		                    <select id="obPalletHistoryInqLargeClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="obPalletHistoryInqMiddleClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="obPalletHistoryInqSmallClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>


	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                        <button id="obPalletHistoryInqSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
	                        </button>
	                        <button id="obPalletHistoryInqExcelBtn"  type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
	                        </button>
	                    </div>
	                </div>

	            </form>
	        </div>

			<div id="obPalletHistoryInqHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obPalletHistoryInqHGrid"></table>
	         		<div id="obPalletHistoryInqHGridNavi"></div>
				</div>
			</div>

		</div>

        <script src="/js/views/outbound/outbound_outboundPalletHistoryInquiry.js"></script>
    </body>
</html>