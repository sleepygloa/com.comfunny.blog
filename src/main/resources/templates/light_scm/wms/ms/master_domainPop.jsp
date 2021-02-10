<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div class="modal-header">
			<button type="button" class="close" data-close-btn="ture"  >×</button>
			<h4 class="modal-title">paragon Grid</h4>
		</div>
		<div class="modal-body">
			<div class="search-form clearfix" >
		       <form class="form-inline"  onsubmit="return false;">
					<!-- 중복되는 부분 -->
					<div class="search-controls" style="padding-left:0px">
		                <div class="form-group m-r-10">
		                    <input type="text" class="form-control input-sm" id="dcCd" size="10" data-domain-id="DC_CD"  />
		                </div>
						<div class="form-group m-r-10">
							<input type="text" lang="" class="form-control input-sm" id="domainCdP" size="10" data-domain-id="DOMAIN_CD"  />
						</div>
						<div class="form-group m-r-10">
							<input type="text" class="form-control input-sm" id="domainDetailNmP" size="10" data-domain-id="DOMAIN_DETAIL_NM"  />
						</div>
					</div>
					<!-- 중복되는 부분 -->
					<div class="search-button-group">
						<button id="domainSearchPopBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
						    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
						</button>
						<button id="domainConfirmPopBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
		                    <i class="fa fa-search"></i><i data-domain-id="CONFIRM_BTN" > </i>
		                </button>
					</div>
				</form>
			</div>

			<div class="grid-wrapper" >
				<table id="domainPopGrid"></table>
				<div id="domainPopGridNavi"></div>
			</div>
		</div>

		<div class="modal-footer">
			<a href="javascript:;" id="AB" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
		</div>

	    <script src="/js/views/master/master_domainPop.js"></script>

	</body>
</html>