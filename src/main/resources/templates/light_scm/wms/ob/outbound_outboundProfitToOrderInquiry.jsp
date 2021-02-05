<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="obProfitToOrderInqPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="obProfitToOrderInqContainer" class="container" >
	        <div id="obProfitToOrderInqSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3" style="display:none;">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obProfitToOrderInqClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obProfitToOrderInqClientCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obProfitToOrderInqClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<input type="radio" class="form-control input-sm" name="obYmdRadio" id="obProfitToOrderInqObPlanYmdRadio" value="1" checked style="left:-10px;width: 14px;"/>
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PLAN_YMD"></span>
						<input id="obProfitToOrderInqObPlanYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obProfitToOrderInqObPlanYmdS" class="input-group-addon date" >
							<input id="obProfitToOrderInqObPlanYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obProfitToOrderInqObPlanYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obProfitToOrderInqObPlanYmdE" class="input-group-addon date" >
							<input id="obProfitToOrderInqObPlanYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<input type="radio" class="form-control input-sm" name="obYmdRadio" id="obProfitToOrderInqObYmdRadio" value="2" style="left:-10px;width: 14px;"/>
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_YMD"></span>
						<input id="obProfitToOrderInqObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obProfitToOrderInqObYmdS" class="input-group-addon date" >
							<input id="obProfitToOrderInqObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obProfitToOrderInqObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obProfitToOrderInqObYmdE" class="input-group-addon date" >
							<input id="obProfitToOrderInqObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>


					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obProfitToOrderInqObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obProfitToOrderInqStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obProfitToOrderInqStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obProfitToOrderInqStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>


					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obProfitToOrderInqCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CD"></span>
						<input id="obProfitToOrderInqItemCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obProfitToOrderInqItemPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obProfitToOrderInqItemNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obProfitToOrderInqRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obProfitToOrderInqRStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obProfitToOrderInqRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obProfitToOrderInqSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obProfitToOrderInqObNo" type="text" class="form-control" autocomplete="off" />
					</div>

	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                        <button id="obProfitToOrderInqSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
	                        </button>
	                        <button id="obProfitToOrderInqExcelBtn"  type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
	                        </button>
	                    </div>
	                </div>

	            </form>
	        </div>


			<div id="obProfitToOrderInqHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obProfitToOrderInqHGrid"></table>
	         		<div id="obProfitToOrderInqHGridNavi"></div>
				</div>
			</div>
		</div>

        <script src="/js/views/outbound/outbound_outboundProfitToOrderInquiry.js"></script>
    </body>
</html>
