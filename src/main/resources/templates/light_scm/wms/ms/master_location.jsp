<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div id="msLocPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="msLocContainer" class="container">
		    <div id="msLocSearchHeaderGrp" class="search-form clearfix col-xs-w100" >
		        <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="LOC"></span>
						<input id="msLocLocCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msLocLocPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="ZONE"></span>
						<input id="msLocZoneCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msLocZonePop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msLocZoneNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="AREA"></span>
						<input id="msLocAreaCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msLocAreaPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msLocAreaNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="USE_YN"></span>
	                    <select id="msLocUseYn" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="OUTPUT_KIND"></span>
	                    <select id="msLocReport" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="ZONE"></span>
						<input id="msLocReportZoneCd" type="text" class="form-control" autocomplete="off" />
					</div>


					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="LIN"></span>
						<input id="msLocReportLinCd" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="ROW"></span>
						<input id="msLocReportRowCd" type="text" class="form-control" autocomplete="off" />
					</div>

		            <!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
			            <div class="input-group pull-right">
			                <button id="msLocBatchBtn" type="button"  class="btn btn-sm btn-warning m-r-5" data-authRule="AUTH_NEW">
			                	<i class="fa fa-angle-double-down"></i><i data-domain-id="BATCHCREATION_BTN" > </i>
			                </button>
			                <button id="msLocSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
			                	<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
			                </button>
			                <button id="msLocAddBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
			                	<i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
			                </button>
			                <button id="msLocSaveBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_NEW AUTH_MOD">
			                	<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
			                </button>
			                <button id="msLocDelBtn" type="button" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger m-r-5">
			                	<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
			                </button>
		                    <button id="msLocReportBtn" type="button" class="btn btn-sm btn-success m-r-5"  data-authRule="AUTH_PRINT" >
		                        <i class="fa fa-print"></i><i data-domain-id="PRINT_BTN"></i> <!-- 인쇄 -->
		                    </button>
			                <button id="msLocExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
			                	<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
			                </button>
			            </div>
		            </div>
	            </form>
		    </div>

			<div id="msLocHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="msLocHGrid"></table>
	         		<div id="msLocHGridNavi"></div>
				</div>
			</div>
		</div>

		<script src="/js/views/master/master_location.js"></script>

	</body>
</html>