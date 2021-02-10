<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div id="progResultInqPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="progResultInqContainer" class="container">
			<div id="progResultInqSearchHeaderGrp" class="search-form clearfix col-xs-w100" >
		       <form class="form-inline"  onsubmit="return false;">

   					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="prodResultInqClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="prodResultInqClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="prodResultInqclientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="PROD_PLAN_YMD"></span>
						<input id="prodResultInqProdYmdFr" type="text" class="form-control"  size="10"/>

						<div id="prodResultInqProdYmdS" class="input-group-addon date" >
							<input id="prodResultInqProdYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
<!-- 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="prodPlanResultInqProdYmdTo" type="text" class="form-control"  size="10"/>
						<div id="prodPlanResultInqProdYmdE" class="input-group-addon date" >
							<input id="prodPlanResultInqProdYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div> -->
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PROD_DEPT/LINE"></span>
		                <div class="col-xs-w50">
		                    <select id="prodResultInqProdDept" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w50">
		                    <select id="prodResultInqProdLine" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PROD_GRP"></span>
	                    <select id="prodResultInqProdGrp" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CLASS"></span>
		                <div class="col-xs-w33f3">
		                    <select id="prodResultInqCategory" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="prodResultInqBrand" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="prodResultInqSku" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM"></span>
						<input id="prodResultInqItemCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="prodResultInqItemPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="prodResultInqItemNm" type="text" class="form-control"  size="35" readonly>
					</div>


					<!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
		                <div class="input-group pull-left">
		                    <button id="prodResultInqAllFoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_FOLD_BTN" > </i>
		                    </button>
		                    <button id="prodResultInqAllUnfoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_UNFOLD_BTN" > </i>
		                    </button>
		                </div>
						<div class="input-group pull-right">
							<button id="prodResultInqSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
							   <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
							</button>
			                <button id="prodResultInqExcelBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_DOWN">
							   <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
							</button>
						</div>
					</div>
			    </form>
			</div>

			<div id="prodResultInqHGridGrp" class="col-xs-w100 col-md-w70">
				<div>
	          		<table id="prodResultInqHGrid"></table>
	         		<div id="prodResultInqHGridNavi"></div>
				</div>
			</div>

			<div id="prodResultInqDGridGrp" class="col-xs-w100 col-md-w30">
				<div>
	          		<table id="prodResultInqDGrid"></table>
	         		<div id="prodResultInqDGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/inbound/inbound_productResultInquiry.js"></script>
	</body>
</html>