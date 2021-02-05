<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div id="prodPlanInqPageHeaderGrp"  class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="prodPlanInqContainer" class="container" >
			<div  id="prodPlanInqPageHeaderGrp"  class="search-form clearfix col-xs-w100" >
		       <form class="form-inline"  onsubmit="return false;">

  					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CLIENT"></span>
						<input id="prodPlanInqClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="prodPlanInqClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="prodPlanInqClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PROD_PLAN_YMD"></span>
						<input id="prodPlanInqProdPlanYmdFr" type="text" class="form-control"  size="10"/>

						<div id="prodPlanInqProdPlanYmdS" class="input-group-addon date" >
							<input id="prodPlanInqProdPlanYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
<!-- 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obInstOFVObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obInstOFVObYmdE" class="input-group-addon date" >
							<input id="obInstOFVObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div> -->
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PROD_DEPT/LINE"></span>
		                <div class="col-xs-w50">
		                    <select id="prodPlanInqProdDept" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w50">
		                    <select id="prodPlanInqProdLine" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PROD_GRP"></span>
	                    <select id="prodPlanInqProdGrp" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">

							<button id="prodPlanInqReceiveBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
							   <i class="fa fa-plus"></i><i data-domain-id="RX_BTN" > </i>
							</button>
							<button id="prodPlanInqSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
							   <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
							</button>
							<button id="prodPlanInqCloseBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_NEW">
							   <i class="fa fa-check"></i><i data-domain-id="PROD_CLOSE_BTN" > </i>
							</button>
							<button id="prodPlanInqCloseCancelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
							   <i class="fa fa-undo"></i><i data-domain-id="CLOSE_CANCL_BTN" > </i>
							</button>
		                    <!-- <button id="prodPlanInqNewBtn" type="button" data-authRule="AUTH_NEW" class="btn btn-sm btn-success m-r-5">
		                        <i class="fa fa-plus"><i data-domain-id="CREATE_BTN"></i></i>
		                    </button> -->
			                <button id="prodPlanInqExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
							   <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
							</button>
						</div>
					</div>
			    </form>
			</div>

			<div id="prodPlanInqHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="prodPlanInqHGrid"></table>
	         		<div id="prodPlanInqHGridNavi"></div>
				</div>
			</div>

			<div id="prodPlanInqDGridGrp" class="col-xs-w100">
				<div>
	          		<table id="prodPlanInqDGrid"></table>
	         		<div id="prodPlanInqDGridNavi"></div>
				</div>
			</div>
		</div>

		<script src="/js/views/inbound/inbound_productPlanInquiry.js"></script>
	</body>
</html>