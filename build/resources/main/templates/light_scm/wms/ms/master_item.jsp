<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="msItemPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="msItemContainer" class="container">
	        <div id="msItemSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">


					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w30 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="msItemClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msItemClientPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msItemClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="ITEM"></span>
						<input id="msItemItemCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msItemItemPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msItemItemNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="ITEM_CLASS"></span>
		                <div class="col-xs-w33f3">
		                    <select id="msItemLargeClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="msItemMiddleClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="msItemSmallClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="USE_YN"></span>
	                    <select id="msItemUseYn" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="ITEM_GBN"></span>
	                    <select id="itemGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>
	                    <!-- 버튼 Button -->
	                <div class="form-group col-xs-w100 m-b-5">
	               		<div class="input-group pull-right">
	                    	<!-- SEARCH_BTN -->
	                    	<button id="msItemSearchBtn"  type="button"class="btn btn-sm btn-primary m-r-5">
	                        <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!-- 조회 -->
	                    	</button>
	                    	<!-- ADD_BTN -->
	                    	<button id="msItemAddBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
	                        <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN"></i><!-- 추가 -->
	                    	</button>
	                    	<!-- DEL_BTN -->
	                    	<button id="msItemDelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
	                        <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i><!-- 삭제 -->
	                    	</button>
	                    	<!-- PRINT_BTN -->
		                    <button id="msItemReportBtn" type="button" class="btn btn-sm btn-success m-r-5"  data-authRule="AUTH_PRINT" >
		                        <i class="fa fa-print"></i><i data-domain-id="PRINT_BTN"></i> <!-- 인쇄 -->
		                    </button>
	                    	<!-- EXCEL_BTN -->
	                    	<button id="msItemExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	                        <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!-- 액셀 -->
	                    	</button>
	                	</div>
	            	</div>
	            </form>
	        </div>

			<div id="msItemHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="msItemHGrid"></table>
	         		<div id="msItemHGridNavi"></div>
				</div>
			</div>
		</div>


        <!-- Tab Grid START-->
        <div class="tab-grid" >
	        <div class="tab-content m-b-10" data-sortable-id="index-2">
	            <ul id="TabItem" class="nav nav-tabs nav-tabs-inverse nav-justified nav-justified-mobile inner-tab" data-sortable-id="index-2">
	                <li class="active" data-tab-id="msItemTabUom"><a href="#uom" data-toggle="tab"><i class="fa fa-picture-o m-r-5"></i><span class="hidden-xs"><i data-domain-id="UOM"></i></span></a></li>
	                <!-- <li class="" data-tab-id="msItemTabDc"><a href="#center" data-toggle="tab"><i class="fa fa-picture-o m-r-5"></i><span class="hidden-xs"><i data-domain-id="DC"></i></span></a></li> -->
	            </ul>
	            <!-- UOM Management Tabl-->
	            <div class="tab-pane fade active in" id="uom">
	                <div class="tab-grid-wrapper">
	                	<div class="search-form clearfix tab-inner" >
				           <form class="form-inline"  onsubmit="return false;">
								<!-- 중복되는 부분 -->
								<div class="search-controls" >
									<div class="form-group m-r-10">
										 <div class="search-button-group">
					                        <button id="msItemDetailAddBtn" type="button"  class="btn btn-sm btn-info" data-authRule="AUTH_NEW">
					                            <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN"></i>
					                        </button>
					                        <!-- SAVE_BTN -->
					                        <button id="msItemDetailSaveBtn"  type="button"  class="btn btn-sm btn-success" data-authRule="AUTH_NEW AUTH_MOD">
					                            <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i>
					                        </button>
					                        <!-- DEL_BTN -->
					                        <button id="msItemDetailDelBtn" type="button" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">
					                            <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i>
					                        </button>
					                    </div>
									</div>
								</div>
							</form>
						</div>
	                    <div class="grid-wrapper">
	                        <table id="msItemDGrid"></table>
	                        <div id="msItemDGridNavi"></div>
	                    </div>
	                </div><!-- tab-grid-wrapper -->
	            </div> <!-- Tab Pane Fade-->
	            <!-- CENTER Management Tabl -->
	            <!-- <div class="tab-pane fade" id="center">
	                <div class="tab-grid-wrapper">
	                	<div class="search-form clearfix tab-inner" >
				           <form class="form-inline"  onsubmit="return false;">
								중복되는 부분
								<div class="search-controls" >
									<div class="form-group m-r-10">
										 <div class="search-button-group">
					                        <button type="button" id="msItemDetailAddBtnCenter" class="btn btn-sm btn-info" data-authRule="AUTH_NEW">
					                            <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN"></i>
					                        </button>
					                        SAVE_BTN
					                        <button type="button" id="msItemDetailSaveBtnCenter"  class="btn btn-sm btn-success">
					                            <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i>
					                        </button>
					                        DEL_BTN
					                        <button type="button" id="msItemDetailDelBtnCenter" class="btn btn-sm btn-danger">
					                            <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i>
					                        </button>
					                    </div>
									</div>
								</div>
							</form>
						</div>
	                    <div class="grid-wrapper">
	                        <table id="msItemD2Grid"></table>
	                        <div id="msItemD2GridNavi"></div>
	                    </div>
	                </div>tab-grid-wrapper
	            </div> Tab Pane Fade -->
	        </div>
        </div>

        <script src="/js/views/master/master_item.js"></script>
    </body>
</html>
