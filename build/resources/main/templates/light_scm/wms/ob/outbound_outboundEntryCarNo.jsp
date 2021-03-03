<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <body>
        <div id="obEntryCarNoPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

        <div id="obEntryCarNoContainer" class="container" >

	        <div id="obEntryCarNoSearchHeaderGrp" class="search-form clearfix">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obEntryCarNoClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obEntryCarNoClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obEntryCarNoClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_PLAN_YMD"></span>
						<input id="obEntryCarNoObPlanYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obEntryCarNoObPlanYmdS" class="input-group-addon date" >
							<input id="obEntryCarNoObPlanYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obEntryCarNoObPlanYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obEntryCarNoObPlanYmdE" class="input-group-addon date" >
							<input id="obEntryCarNoObPlanYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obEntryCarNoObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obEntryCarNoStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obEntryCarNoStoreBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obEntryCarNoStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obEntryCarNoCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obEntryCarNoObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obEntryCarNoRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obEntryCarNoRStoreBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obEntryCarNoRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obEntryCarNoSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="obEntryCarNoObProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DELIVERY_DGR"></span>
						<input id="obEntryCarNoDeliveryDgr" type="text" class="form-control" autocomplete="off" />
					</div>

	                <div class="form-group col-xs-w100 m-b-5">
	                   	<div class="form-group col-xs-100 col-md-20" style="float:right">
	 		                 <div class="input-group">
	                 			<button id="obEntryCarNoBatchBtn" type="button" class="btn btn-sm btn-warning m-r-5" data-authRule="AUTH_NEW">
	                        		<i class="fa fa-angle-double-down"></i><i data-domain-id="BATCH_APPLY"></i><!--일괄적용-->
	                    		</button>
				                <button id="obEntryCarNoSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
				           			<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!--조회-->
				           		</button>

				           		<button id="obEntryCarNoSaveBtn" type="button"  class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
				           			<i class="fa fa-download"></i><i data-domain-id="SAVE_BTN"></i><!--신규-->
				           		</button>

				               	<button id="obEntryCarNoDelBtn" type="button"  class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
				           			<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i><!--삭제-->
				           		</button>

				               	<button id="obEntryCarNoExcelBtn" type="button"  class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
				           			<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!--액셀-->
				           		</button>
		                 	</div>
                   		</div>


	                    <div class="form-group col-xs-100 col-md-20 m-r-5" style="float:right">
	                        <span class="form-group spanClass03" data-domain-id="SEAL_NO"></span>
	                        <input  id="obEntryCarNoBatchSealNo" type="text" class="form-control input-sm" size="15" maxlength="20" />
	                    </div>
	                    <div class="form-group col-xs-100 col-md-20 m-r-5" style="float:right">
	                        <span class="form-group spanClass03" data-domain-id="CONTAINER_NO"></span>
	                        <input  id="obEntryCarNoBatchContainerNo"  type="text" class="form-control input-sm" size="15" maxlength="20"/>
	                    </div>
	                    <div class="form-group col-xs-100 col-md-20 m-r-5" style="float:right">
	                        <span class="form-group spanClass03" data-domain-id="CAR_NO"></span>
	                        <input  id="obEntryCarNoBatchCarNo"  type="text" class="form-control input-sm" size="15" maxlength="20"/>
	                    </div>
					</div>
	            </form>
	        </div>

			<div id="obEntryCarNoHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obEntryCarNoHeaderGrid"></table>
	         		<div id="obEntryCarNoHeaderGridNavi"></div>
				</div>
			</div>
			<div id="obEntryCarNoDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="obEntryCarNoDetailGrid"></table>
		          	<div id="obEntryCarNoDetailGridNavi"></div>
				</div>
			</div>

        </div>

        <script src="/js/views/outbound/outbound_outboundEntryCarNo.js"></script>
    </body>
</html>
