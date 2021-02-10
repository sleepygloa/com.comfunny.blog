<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div id="ibInstPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="inInstContainer" class="container" >
			<div id="ibInstSearchHeaderGrp" class="search-form clearfix" >
		       <form class="form-inline"  onsubmit="return false;">


					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_NO"></span>
						<input id="instIbNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="ibInstClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibInstClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibInstClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="IB_YMD"></span>
						<input id="ibInstYmdFr" type="text" class="form-control"  size="10"/>

						<div id="ibInstYmdS" class="input-group-addon date" >
							<input id="ibInstYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="ibInstYmdTo" type="text" class="form-control"  size="10"/>
						<div id="ibInstYmdE" class="input-group-addon date" >
							<input id="ibInstYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_PROG_ST"></span>
	                    <select id="ibInstProgStCd" class="form-control" >
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="ibInstCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_GBN"></span>
	                    <select id="ibInstGbnCd" class="form-control" >
	                    	<option></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OUTPUT_KIND"></span>
	                    <select id="ibInstReport" class="form-control" >
	                    </select>
					</div>

		            <!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
		                <div class="input-group pull-right">
		                    <button id="searchIbInstBtn" type="button" class="btn btn-sm btn-primary m-r-5">
		                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
		                    </button>
		                    <button type="button" id="ibInstConfBtn" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
		                        <i class="fa fa-check"></i><i data-domain-id="IB_INST" > </i>
		                    </button>
		                    <button type="button" id="ibInstCancelBtn" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
		                        <i class="fa fa-undo"></i><i data-domain-id="INST_CANCL" > </i>
		                    </button>
		                    <button type="button" id="ibInstSaveBtn"  class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_NEW AUTH_MOD">
		                        <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
		                    </button>
<!--  		                    <button type="button" id="reportIbInstBtn" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
		                        <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i>
		                    </button> -->
		                    <button type="button" id="excelIbInstBtn" class="btn btn-sm btn-primary" data-authRule="AUTH_DOWN">
		                        <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
		                    </button>
		                </div>
		            </div>
		        </form>
		    </div>

   			<div id="ibInstHeaderHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="ibInstHeaderGrid"></table>
	         		<div id="ibInstHeaderGridNavi"></div>
				</div>
			</div>

			<div id="ibInstDetailDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="ibInstDetailGrid"></table>
		          	<div id="ibInstDetailGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/inbound/inbound_inboundInstruction.js"></script>
	</body>
</html>