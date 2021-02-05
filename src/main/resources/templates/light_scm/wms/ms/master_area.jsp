<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div id="msAreaPageHeaderGrp"  class="" >
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>

	<div id="msAreaContainer" class="container">
	    <div id="msAreaSearchHeaderGrp" class="search-form clearfix col-xs-w100" >
	        <form class="form-inline"  onsubmit="return false;">

				<div class="input-group col-wms-search-group3 col-wms-hidden">
					<span class="input-group-addon col-xs-w30 spanclassAsterisk" data-domain-id="CLIENT"></span>
					<input id="msAreaClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
					<div class="input-group-addon">
					  	<button id="msAreaClientCdPopup" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i>
						</button>
					</div>
					<input id="msAreaClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="AREA"></span>
					<input id="msAreaAreaCd" type="text" class="form-control" autocomplete="off" />
					<div class="input-group-addon">
					  	<button id="msAreaAreaPop" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i>
						</button>
					</div>
					<input id="msAreaAreaNm" type="text" class="form-control"  size="35" readonly>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="USE_YN"></span>
                    <select id="msAreaUseYn" class="form-control" >
                        <option value=""></option>
                    </select>
				</div>

				<!-- 중복되는 부분 -->
				<div class="form-group col-xs-w100 m-b-5">
					<div class="input-group pull-right">
						<button id="msAreaSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
						</button>
						<button id="msAreaAddBtn"  type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
						<i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
						</button>
						<button id="msAreaSaveBtn"  type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_NEW AUTH_MOD">
						<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
						</button>
						<button id="msAreaDelBtn" type="button"  class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
						<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
						</button>
		                <button id="msAreaExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
						<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
						</button>
					</div>
				</div>
			</form>
		</div>

		<div id="msAreaHGridGrp" class="col-xs-w100">
			<div>
          		<table id="msAreaHGrid"></table>
         		<div id="msAreaHGridNavi"></div>
			</div>
		</div>

	</div>

	<script src="/js/views/master/master_area.js"></script>
</body>
</html>