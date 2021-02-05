<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div id="msSupPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="msSupContainer" class="container">
		    <div id="msSupSearchHeaderGrp" class="search-form clearfix" >
		        <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="CLIENT"></span>
						<input id="msSupClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msSupClientPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msSupClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="SUPPLIER"></span>
						<input id="msSupSupplierCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msSupSupplierPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msSupSupplierNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="USE_YN"></span>
	                    <select id="msSupUseYn" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
							<button id="msSupSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
							<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
							</button>
							<button id="msSupAddBtn" type="button" value="true" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
							<i class="fa fa-plus"></i><i data-domain-id="NEW_BTN" > </i>
							</button>
							<button id="msSupDelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
							<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
							</button>
			                <button id="msSupExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
							<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
							</button>
						</div>
					</div>
				</form>
			</div>

			<div id="msSupHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="msSupHGrid"></table>
	         		<div id="msSupHGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/master/master_supplier.js"></script>

	</body>
</html>