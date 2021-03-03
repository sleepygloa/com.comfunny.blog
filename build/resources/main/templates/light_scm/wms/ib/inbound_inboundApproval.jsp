<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div  id="ibApprPageHeaderGrp"  class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="ibApprContainer" class="container">
			<div  id="ibApprSearchHeaderGrp"  class="search-form clearfix" >
		       <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_NO"></span>
						<input id="ibApprIbNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="ibApprClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibApprClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibApprClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="IB_PLAN_YMD"></span>
						<input id="ibApprYmdFr" type="text" class="form-control"  size="10"/>

						<div id="ibApprYmdS" class="input-group-addon date" >
							<input id="ibApprYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="ibApprYmdTo" type="text" class="form-control"  size="10"/>
						<div id="ibApprYmdE" class="input-group-addon date" >
							<input id="ibApprYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="ibApprCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SUPPLIER"></span>
						<input id="ibApprSupplierCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibApprSupplierPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibApprSupplierNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_GBN"></span>
	                    <select id="ibApprIbGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_PROG_ST"></span>
	                    <select id="ibApprIbProgStCd" class="form-control" >
	                    </select>
					</div>

					<!-- 중복되는 부분 -->
					<div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
							<button id="ibApprSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
							    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
							</button>
							<button id="ibApprSaveBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
							    <i class="fa fa-check"></i><i data-domain-id="IB_APPR" > </i>
							</button>
							<button id="ibApprCancelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
							    <i class="fa fa-undo"></i><i data-domain-id="APPR_CANCEL" > </i>
							</button>
			                <button id="ibApprExcelBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_DOWN">
							    <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
							</button>
						</div>
					</div>
			    </form>
			</div>

			<div id="ibApprHeaderGridGrp" class="col-xs-w100">
				<div>
	          		<table id="ibApprHeaderGrid"></table>
	         		<div id="ibApprHeaderGridNavi"></div>
				</div>
			</div>

			<div id="ibApprDetailGrp" class="search-form clearfix col-xs-w100">
	            <div class="col-xs-w100">
	                <div class="input-group pull-right">
						<button type="button" id="ibApprDetailSaveBtn"  class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_NEW AUTH_MOD">
							<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
						</button>
	                </div>
	            </div>
			</div>

			<div id="ibApprDetailGridGrp" class="col-xs-w100">
				<div>
	          		<table id="ibApprDetailGrid"></table>
	         		<div id="ibApprDetailGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/inbound/inbound_inboundApproval.js"></script>
	</body>
</html>