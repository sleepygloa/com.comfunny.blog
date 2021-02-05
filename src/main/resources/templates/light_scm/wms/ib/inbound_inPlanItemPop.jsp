<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div class="modal-header">
			<button type="button" class="close" data-close-btn="ture"  >×</button>
			<h4 class="modal-title"></h4>
		</div>
		<div class="modal-body">
			<div class="search-form clearfix col-xs-w100" >
		        <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CLIENT"></span>
						<input id="inPlanClientCdP" type="text" class="form-control" autocomplete="off" readonly />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CD"></span>
						<input id="inPlanItemCdP" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_NM"></span>
						<input id="inPlanItemNmP" type="text" class="form-control" autocomplete="off" />
					</div>

					<!-- 중복되는 부분 -->
					<div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
						    <button id="inPlanItemSearchPopBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
		                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
		                    </button>
		                    <button id="inPlanItemConfirmPopBtn" type="button"  class="btn btn-sm btn-info">
		                    	<i class="fa fa-plus"></i><i data-domain-id="CONFIRM_BTN" > </i>
		                    </button>
						</div>
					</div>
				</form>
			</div>

			<div id="inboundPlanItemPopHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="inboundPlanItemPopGrid"></table>
	         		<div id="inboundPlanItemPopGridNavi"></div>
				</div>
			</div>

		</div>
		<div class="modal-footer">
			<button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
		   		<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
		    </button>
		</div>

		<script src="/js/views/inbound/inbound_inPlanItemPop.js"></script>
	</body>
</html>