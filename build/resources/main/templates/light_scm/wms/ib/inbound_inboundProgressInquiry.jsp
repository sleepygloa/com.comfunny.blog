<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div id="ibProgInquiryPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="ibProgInquiryContainer" class="container">
			<div id="ibProgInquirySearchHeaderGrp" class="search-form clearfix" >
		       <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="ibProgInquiryClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibProgInquiryClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibProgInquiryClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="IB_PLAN_YMD"></span>
						<input id="ibProgInquiryYmdFr" type="text" class="form-control"  size="10"/>

						<div id="ibProgInquiryYmdS" class="input-group-addon date" >
							<input id="ibProgInquiryYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="ibProgInquiryYmdTo" type="text" class="form-control"  size="10"/>
						<div id="ibProgInquiryYmdE" class="input-group-addon date" >
							<input id="ibProgInquiryYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_GBN"></span>
	                    <select id="ibProgInquiryIbGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>


					<!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
							<button id="ibProgInquirySearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
							   <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
							</button>
			                <button id="ibProgInquiryExcelBtn" type="button"  class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
							   <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
							</button>
						</div>
					</div>
			    </form>
			</div>

			<div id="ibProgInquiryHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="ibProgInquiryHeaderGrid"></table>
	         		<div id="ibProgInquiryHeaderGridNavi"></div>
				</div>
			</div>

			<div id="ibProgInquiryDGridGrp" class="col-xs-w100">
				<div class="search-form col-xs-w100">
					<canvas id="ibProgInquiryChart" width="1500px" height="330px"></canvas>
				</div>
			</div>

		</div>

		<!-- <script src="/js/plugins/chartjs/chart.js"></script> -->
		<script src="/js/plugins/chartjs/Chart-2.7.3.js"></script>
		<script src="/js/views/inbound/inbound_inboundProgressInquiry.js"></script>
	</body>
</html>