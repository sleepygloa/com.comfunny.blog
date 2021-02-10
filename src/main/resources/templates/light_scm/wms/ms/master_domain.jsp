<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>
		<div class="search-form clearfix" >
	        <form class="form-inline"  onsubmit="return false;">
	            <input type="hidden" id="sessionDcCd" value="${sessionScope.s_dcCd_Prioord}"/>
	            <div class="form-group col-md-12 m-b-10">
	                <div class="form-group col-md-4">
	                    <span class="form-group spanClass03" data-domain-id="DOMAIN"></span>
	                    <div class="input-group">
	                        <input type="text" class="form-control input-sm" id="msDomainCd" size="10" />
	                        <div class="input-group-btn">
	                            <a id="domainPopup" class="btn btn-sm btn-primary m-r-5">
	                                <i class="fa fa-search"></i>
	                            </a>
	                        </div>
	                    </div>
	                    <input type="text" class="form-control input-sm" id="msDomainNm" size="30" />
	                </div>
	                <div class="form-group col-md-4">
	                    <span class="form-group spanClass03" data-domain-id="USE_YN"></span>
	                    <div class="input-group">
		                    <select id="msDomainUseYn" class="form-control input-sm p-0 input-medium" >
		                       <option value=""  ></option>
		                    </select>
	                    </div>
	                </div>
	            </div>

				<!-- 중복되는 부분 -->
	            <div class="form-group col-md-12">
					<div class="input-group pull-right">
						<button id="searchMsDomainBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
						</button>
						<button type="button" id="addMsDomainBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
						<i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
						</button>
						<button type="button" id="saveMsDomainBtn" data-authRule="AUTH_NEW AUTH_MOD" class="btn btn-sm btn-success m-r-5">
						<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
						</button>
						<button type="button" id="delMsDomainBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger m-r-5">
						<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
						</button>
		                <button type="button" id="excelMsDomainBtn" class="btn btn-sm btn-primary m-r-5">
						<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
						</button>
					</div>
				</div>
		   </form>
		</div>

		<div class="grid-wrapper" >
			<table id="masterDomainGrid"  ></table>
			<div id="masterDomainNavi"></div>
		</div>

		<script src="/js/views/master/master_domain.js"></script>

	</body>
</html>