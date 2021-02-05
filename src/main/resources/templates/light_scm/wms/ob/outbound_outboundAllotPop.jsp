<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div class="modal-header" >
            <button id="obApprAllotHeaderCloseBtn" type="button" class="close" >X</button>
            <h4 class="modal-title"></h4>
        </div>

        <div class="modal-body">
	        <div class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">
	                <input type="hidden" id="obNoData" value="false" />

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obApprAllotClientCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obApprAllotClientCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obApprAllotClientNm" type="text" class="form-control" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_PLAN_YMD"></span>
						<input id="obApprAllotObPlanYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obApprAllotObPlanYmdS" class="input-group-addon date" >
							<input id="obApprAllotObPlanYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
							<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obApprAllotObPlanYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obApprAllotObPlanYmdE" class="input-group-addon date" >
							<input id="obApprAllotObPlanYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obApprAllotObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obApprAllotStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obApprAllotStoreCdBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obApprAllotStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obApprAllotCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obApprAllotObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obApprAllotRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obApprAllotRStoreCdBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obApprAllotRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obApprAllotSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

	<!-- 				<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DELIVERY_DGR"></span>
						<input id="obApprAllotDeliveryDgr" type="text" class="form-control" autocomplete="off" />
					</div> -->

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OUT_OF_STOCK"></span>
						<input id="obApprAllotLack" type="checkbox" class="form-control col-xs-w10"   checked />
					</div>

	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
		                    <button id="obApprAllotQtyBatchBtn" type="button" class="btn btn-sm btn-warning m-r-5" data-authRule="AUTH_NEW">
		                        <i class="fa fa-angle-double-down"></i><i data-domain-id="BATCH_APPLY"></i>
		                    </button>

		                    <button id="obApprAllotSearchBtn" type="button" class="btn btn-sm btn-info m-r-5">
		                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
		                    </button>
		                    <button id="obApprAllotSaveBtn" type="button" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success m-r-5">
		                        <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i>
		                    </button>
		                    <!-- <button id="obApprAllotExcelBtn" type="button" data-authRule="AUTH_DEL" class="btn btn-sm btn-info">
		                        <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"> </i>액셀
		                    </button> -->
	                    </div>
	                </div><!-- End: Row 4-->
	            </form>
	        </div>

			<div id="obApprAllotHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obApprAllotHGrid"></table>
	         		<div id="obApprAllotHGridNavi"></div>
				</div>
			</div>

			<div id="obApprAllotDGrp" class="search-form clearfix col-xs-w100 ">
				<div class=" col-xs-w100">
					<div class="input-group pull-right">
		                <span  class="control-label m-r-10" data-domain-id="NOB_RS"></span>
		                <select id="obApprAllotNobRsCd"></select><!-- 미출고사유 -->
	               	</div>
	            </div>
			</div>

			<div id="obApprAllotDGridGrp" class="col-xs-w100">
				<div class="col-xs-w100">
	          		<table id="obApprAllotDGrid"></table>
	         		<div id="obApprAllotDGridNavi"></div>
				</div>
			</div>

        </div>

        <div class="modal-footer">
			<button id="obApprAllotBottomCloseBtn" type="button"  class="btn btn-sm btn-gray m-r-5">
                <i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
            </button>
            <!-- <button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
                <i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
            </button> -->
        </div>

        <script src="/js/views/outbound/outbound_outboundAllotPop.js"></script>
    </body>
</html>
