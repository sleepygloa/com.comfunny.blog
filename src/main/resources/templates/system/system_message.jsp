<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div id="sysMessagePageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="sysMessageContainer" class="container" >
			<div id="sysMessageSearchHeaderGrp" class="search-form clearfix col-xs-w100" >
	           <form class="form-inline"  onsubmit="return false;">
   					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="MSG_CD"></span>
						<input id="systemMessageMsgCd" type="text" class="form-control" autocomplete="off" />
					</div>

   					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="MSG_NM"></span>
						<input id="systemMessageMsgTxt" type="text" class="form-control" autocomplete="off" />
					</div>

		            <!-- 검색ROW LINE -->
		            <div class="form-group col-xs-w100 m-b-5">
		                <div class="input-group pull-right">
		                    <button id="systemMessageSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
		                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
		                    </button>
							<button id="systemMessageAddRowBtn" type="button" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
							   <i class="fa fa-plus"></i><i data-domain-id="NEW_BTN" > </i>
							</button>
		                    <button id="systemMessageSaveBtn" type="button"  class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL">
		                       <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
		                    </button>
	<!-- 	                    <button id="systemMessageSaveRowBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_NEW AUTH_MOD">
		                       <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
		                    </button>
		                    <button id="systemMessageDelRowBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
		                       <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
		                    </button> -->
		                    <button id="systemMessageExcelBtn" type="button" class="btn btn-sm btn-primary">
		                       <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
		                    </button>
		                </div>
		            </div>
		            <!-- END 검색ROW LINE -->

				</form>
			</div>

			<div id="systemMessageHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="systemMessageGrid"></table>
	         		<div id="systemMessageGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/settings/system/system_message.js"></script>
	</body>
</html>