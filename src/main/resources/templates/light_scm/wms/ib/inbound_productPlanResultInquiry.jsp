<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div id="prodPlanResultInqPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="progPlanResultInqContainer" class="container">
			<div id="progPlanResultInqSearchHeaderGrp" class="search-form clearfix col-xs-w100" >
		       <form class="form-inline"  onsubmit="return false;">

   					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="prodPlanResultInqClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="prodPlanResultInqClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="prodPlanResultInqclientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="PROD_PLAN_YMD"></span>
						<input id="prodPlanResultInqProdYmdFr" type="text" class="form-control"  size="10"/>

						<div id="prodPlanResultInqProdYmdS" class="input-group-addon date" >
							<input id="prodPlanResultInqProdYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
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
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PROD_DEPT/LINE"></span>
		                <div class="col-xs-w50">
		                    <select id="prodPlanResultInqProdDept" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w50">
		                    <select id="prodPlanResultInqProdLine" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PROD_GRP"></span>
	                    <select id="prodPlanResultInqProdGrp" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CLASS"></span>
		                <div class="col-xs-w33f3">
		                    <select id="prodPlanResultInqCategory" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="prodPlanResultInqBrand" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="prodPlanResultInqSku" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM"></span>
						<input id="prodPlanResultInqItemCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="prodPlanResultInqItemPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="prodPlanResultInqItemNm" type="text" class="form-control"  size="35" readonly>
					</div>


					<!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
		                <div class="input-group pull-left">
		                    <button id="prodPlanResultInqAllFoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_FOLD_BTN" > </i>
		                    </button>
		                    <button id="prodPlanResultInqAllUnfoldBtn" type="button" class="btn btn-sm btn-primary m-r-5" style="display:none;"><!-- 검색 -->
		                        <i class="fa fa-search"></i><i data-domain-id="ALL_UNFOLD_BTN" > </i>
		                    </button>
		                </div>
						<div class="input-group pull-right">
							<button id="prodPlanResultInqSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
							   <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
							</button>
			                <button id="prodPlanResultInqExcelBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_DOWN">
							   <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
							</button>
						</div>
					</div>
			    </form>
			</div>

			<div id="progPlanResultInqHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="prodPlanResultInqHGrid"></table>
	         		<div id="prodPlanResultInqHGridNavi"></div>
				</div>
			</div>

		</div>


		<script src="/js/views/inbound/inbound_productPlanResultInquiry.js"></script>
	</body>
</html>