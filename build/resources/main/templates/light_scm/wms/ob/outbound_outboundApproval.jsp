<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="obApprPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="obApprContainer" class="container" >
	        <div id="obApprSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obApprClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obApprClientCdPopup" type="button" class="btn btn-primary">
						  		<i class="fa fa-search"></i>
							</button>
						</div>
						<input id="obApprClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_PLAN_YMD"></span>
						<input id="obApprObPlanYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obApprObPlanYmdS" class="input-group-addon date" >
							<input id="obApprObPlanYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obApprObPlanYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obApprObPlanYmdE" class="input-group-addon date" >
							<input id="obApprObPlanYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obApprObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obApprStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obApprStoreCdBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obApprStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obApprCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obApprObGbnCd" class="form-control"  >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obApprRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obApprRStoreCdBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obApprRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>


					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obApprSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="obApprObProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden" >
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DELIVERY_DGR"></span>
						<input id="obApprDeliveryDgr" type="text" class="form-control" autocomplete="off" />
					</div>


	                <!--End Row 4 -->
	                 <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                        <button id="obApprSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
	                        </button>

	                        <button id="obApprAddBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
	                            <i class="fa fa-check"></i><i data-domain-id="OB_APPR"></i>
	                            <!-- 출고승인 -->
	                        </button>
	                        <button id="obApprDelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
	                            <i class="fa fa-undo"></i><i data-domain-id="APPR_CANCEL"></i>
	                            <!--  승인취소 -->
	                        </button>
	                        <button id="obApprAllotBtn" type="button" class="btn btn-sm btn-warning m-r-5" data-authRule="AUTH_NEW">
	                            <i class="fa fa-angle-double-down"></i><i data-domain-id="ALLOT_ADJS"></i>
	                            <!-- 배분조정 -->
	                        </button>
	                        <button id="obApprExcelBtn"  type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
	                            <!-- 액셀 -->
	                        </button>
	                    </div>
	                </div> <!--End Row 4 -->
	            </form>
	        </div>


  			<div id="obApprHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obApprHGrid"></table>
	         		<div id="obApprHGridNavi"></div>
				</div>
			</div>
			<div id="obApprDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="obApprDGrid"></table>
		          	<div id="obApprDGridNavi"></div>
				</div>
			</div>

		</div>

        <script src="/js/views/outbound/outbound_outboundApproval.js"></script>
    </body>
</html>
