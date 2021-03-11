<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div id="sysSchedulerPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="sysSchedulerContainer" class="container" >
			<div id="sysSchedulerSearchHeaderGrp" class="search-form clearfix col-xs-w100" >
		        <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SCHE_NM"></span>
						<input id="systemSchedulerName" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="USE_YN"></span>
	                    <select id="schedulerUseYn" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<!-- 중복되는 부분 -->
					<div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
		                    <button id="systemSchedulerSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
		                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
		                    </button>
		                    <button id="systemSchedulerAddRowBtn" type="button"  class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
		                       <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
		                    </button>
		                    <button id="systemSchedulerSaveRowBtn" type="button"  class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_NEW AUTH_MOD">
		                       <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
		                    </button>
		                    <button id="systemSchedulerDelRowBtn" type="button"  class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
		                       <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
		                    </button>
		                    <button id="schedulerExcelBtn" type="button"  class="btn btn-sm btn-primary">
		                       <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
		                    </button>
						</div>
					</div>
			   </form>
			</div>

			<div id="systemSchedulerHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="systemSchedulerGrid"></table>
	         		<div id="systemSchedulerGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/settings/system/system_scheduler.js"></script>
	</body>
</html>