<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <body>
        <div id="obPlanPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

	    <div id="obPlanContainer" class="container" >
	        <div id="obPlanSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">
	<!-- xsm 500 767 sm 1280 md 1600 dl-->
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obPlanClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPlanClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPlanClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_PLAN_YMD"></span>
						<input id="obPlanYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obPlanYmdS" class="input-group-addon date" >
							<input id="obPlanYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obPlanYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obPlanYmdE" class="input-group-addon date" >
							<input id="obPlanYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obPlanObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obPlanStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPlanStoreBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPlanStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obPlanCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obPlanObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obPlanRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPlanRStoreBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPlanRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obPlanSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="obPlanObProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
		                    <button id="obPlanSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
		            			<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!--조회-->
		            		</button>

		            		<button id="obPlanNewBtn" type="button"  class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
		            			<i class="fa fa-plus"></i><i data-domain-id="NEW_BTN"></i><!--신규-->
		            		</button>

		                	<button id="obPlanDelBtn" type="button"  class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
		            			<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i><!--삭제-->
		            		</button>

		                	<button id="obPlanExcelBtn" type="button"  class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
		            			<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!--액셀-->
		            		</button>
	                    </div>
					</div>

	            </form>
	        </div>

			<div id="obPlanHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obPlanHeaderGrid"></table>
	         		<div id="obPlanHeaderGridNavi"></div>
				</div>
			</div>
			<div id="obPlanDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="obPlanDetailGrid"></table>
		          	<div id="obPlanDetailGridNavi"></div>
				</div>
			</div>
	    </div>

        <script src="/js/views/outbound/outbound_outboundPlan.js"></script>
    </body>
</html>
