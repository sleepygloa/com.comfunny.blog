<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
<style type="text/css">
    .modal-body .search-controls{padding-left:0px}
</style>
</head>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title"></h4>
</div>
<div class="modal-body">
	<div class="search-form clearfix" >
       <form class="form-inline"  onsubmit="return false;">
                <div class="form-group col-md-12 m-t-5 m-b-10 p-0">
                    <div class="form-group col-md-6">
                        <span class="form-group spanPop01" data-domain-id="ITEM_CD"></span>
                        <input type="text" lang="" class="form-control input-sm" id="ibTcReqItemCdP" size="10"/>
                    </div>
                    <div class="form-group col-md-6">
                        <span class="form-group spanPop01" data-domain-id="ITEM_NM"></span>
                        <input type="text" class="form-control input-sm" id="ibTcReqItemNmP" size="10"/>
                    </div>
                </div>
			<!-- 중복되는 부분 -->
			<div class="form-group col-md-12">
				<div class="input-group pull-right">
				    <button id="ibTcReqItemSearchPopBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
                    </button>
                    <button id="ibTcReqItemConfirmPopBtn" type="button"  class="btn btn-sm btn-info">
                    	<i class="fa fa-plus"></i><i data-domain-id="CONFIRM_BTN" > </i>
                    </button>
				</div>
			</div>
		</form>
	</div>

	<div class="grid-wrapper" >
		<table id="ibTcReqItemPopGrid"></table>
		<div id="ibTcReqItemPopGridNavi"></div>
	</div>
</div>
<div class="modal-footer">
	<button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
   		<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
    </button>
</div>

<script src="/js/views/inbound/inbound_ibTcReqItemPop.js"></script>

</html>