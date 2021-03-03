<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div id="ibPlanPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="inPlanContainer" class="container">
			<div id="ibPlanSearchHeaderGrp" class="search-form clearfix" >
		       <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="ibPlanClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibPlanClientPopup" type="button" class="btn btn-wms-addon">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibPlanClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="IB_PLAN_YMD"></span>
						<input id="ibPlanYmdFr" type="text" class="form-control"  size="10"/>

						<div id="ibPlanYmdS" class="input-group-addon date" >
							<input id="ibPlanYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-wms-addon">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="ibPlanYmdTo" type="text" class="form-control"  size="10"/>
						<div id="ibPlanYmdE" class="input-group-addon date" >
							<input id="ibPlanYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-wms-addon">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>


					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_PROG_ST"></span>
	                    <select id="inPlanIbProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SUPPLIER"></span>
						<input id="ibPlanSupplierCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibPlanSupplierPopup" type="button" class="btn btn-wms-addon">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibPlanSupplierNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_GBN"></span>
	                    <select id="ibPlanIbGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PLT_ID"></span>
						<input id="ibPlanIbNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="inPlanCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OUTPUT_KIND"></span>
						<input id="ibPlanReportCd" type="text" class="form-control" autocomplete="off" />
					</div>

					<!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
							<button id="ibPlanSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
							   <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
							</button>
							<button id="ibPlanNewBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
							   <i class="fa fa-plus"></i><i data-domain-id="NEW_BTN" > </i>
							</button>
							<button id="ibPlanDelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
							   <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
							</button>
	<!-- 	                    <button id="ibPlanReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
		                        <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i>인쇄
		                    </button> -->
			                <button id="ibPlanExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
							   <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
							</button>
						</div>
					</div>
			    </form>
			</div>

			<div id="ibPlanHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="ibPlanHGrid"></table>
	         		<div id="ibPlanHGridNavi"></div>
				</div>
			</div>

			<div id="ibPlanDGridGrp" class="col-xs-w100">
				<div>
	          		<table id="ibPlanDGrid"></table>
	         		<div id="ibPlanDGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/inbound/inbound_inboundPlan.js"></script>
	</body>
</html>