<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div id="sysDomainPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="sysDomainContainer" class="container" >

			<div id="sysDomainSearchHeaderGrp" class="search-form clearfix" >
	           <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LANG"></span>
	                    <select id="systemDomainLangCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="TYPE"></span>
	                    <select id="systemDomainType" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DOMAIN_ID"></span>
						<input id="systemDomainId" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DOMAIN_NM"></span>
						<input id="systemDomainNm" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DOMAIN_DESC"></span>
						<input id="systemDomainDesc" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="USE_YN"></span>
	                    <select id="systemDomainUseYn" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ERR_YN"></span>
	                    <select id="systemDomainErrYn" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<!-- 중복되는 부분 -->
					<div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
	<!-- 	                	<div class="m-r-5" style="display:inline-block" >
		                		<label>기본 조회
		                			<input type="radio" name="systemDomainInqType" value="10" checked/>
		                		</label>
		                		<label>관리자 조회
		                			<input type="radio" name="systemDomainInqType" value="20"/>
		                		</label>
		                	</div> -->
		                    <button id="domainSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
		                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
		                    </button>
		                    <button id="domainAddRowBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
		                       <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
		                    </button>
		                    <button id="domainSaveRowBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_NEW AUTH_MOD">
		                       <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
		                    </button>
		                    <button id="domainDelRowBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
		                       <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
		                    </button>
		                    <button id="domainExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5">
		                       <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
		                    </button>
		                    <button  id="domainReloadBtn" type="button"class="btn btn-sm btn-primary">
		                       <i class="fa fa-undo"></i><i data-domain-id="SEARCH_BTN" > </i>
		                    </button>
						</div>
					</div>

				</form>
			</div>

			<div id="systemDomainHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="systemDomainGrid"></table>
	         		<div id="systemDomainGridNavi"></div>
				</div>
			</div>

			<div id="systemDomainDGridGrp" class="col-xs-w100">
				<div>
	          		<table id="systemDomainManagerGrid"></table>
	         		<div id="systemDomainManagerGridNavi"></div>
				</div>
			</div>

		</div>

	<script src="/js/views/settings/system/system_domain.js"></script>
	</body>
</html>