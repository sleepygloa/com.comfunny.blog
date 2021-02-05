<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="obPickingOFVPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="obPickingOFVContainer" class="container" >
	        <div id="obPickingOFVSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obPickingOFVClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPickingOFVClientCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPickingOFVClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="obPickingOFVObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obPickingOFVObYmdS" class="input-group-addon date" >
							<input id="obPickingOFVObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obPickingOFVObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obPickingOFVObYmdE" class="input-group-addon date" >
							<input id="obPickingOFVObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obPickingOFVObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obPickingOFVObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obPickingOFVStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPickingOFVStoreCdBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPickingOFVStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obPickingOFVCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="obPickingOFVObProgStCd" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obPickingOFVRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPickingOFVRStoreCdBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPickingOFVRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obPickingOFVSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WAVE_NO"></span>
						<input id="obPickingOFVWaveNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OUTPUT_KIND"></span>
	                    <select id="obPickingOFVReportCd" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	<!--                         <button id="obPickTotalApplyBtn" type="button" class="btn btn-sm btn-warning m-r-5">
	                            <i class="fa fa-angle-double-down"></i><i data-domain-id="BATCHCREATION_BTN"></i>일괄저장
	                        </button> -->
	                        <button id="obPickingOFVSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!-- 조회 -->
	                        </button>
	                        <button id="obPickingOFVConfirmBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
	                            <i class="fa fa-check"></i><i data-domain-id="PICK_CONF"></i><!-- 확정 -->
	                        </button>
	                        <button id="obPickingOFVCancleBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
	                            <i class="fa fa-undo"></i><i data-domain-id="PICK_CANCL"></i><!-- 취소 -->
	                        </button>
	                        <button id="obPickingOFVReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
	                            <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i><!-- 인쇄 -->
	                        </button>
	                        <button id="obPickingOFVExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!-- 액셀 -->
	                        </button>
	                    </div>
	                </div><!-- Row 5 -->
	            </form>
	        </div>

   			<div id="obPickingOFVHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obPickingOFVHGrid"></table>
	         		<div id="obPickingOFVHGridNavi"></div>
				</div>
			</div>

			<div id="outboundWaveSearchDetailGrp" class="search-form clearfix col-xs-w100">
	            <div class="col-xs-w100">
	                <div class="input-group pull-right">
	<!--                     <button id="obPickOFVApplyBtn" type="button" class="btn btn-sm btn-warning m-r-2">
	                        <i class="fa fa-angle-double-down"></i><i data-domain-id="BATCH_APPLY"></i>일괄적용
	                    </button> -->
	                     <button id="obPickingOFVAddBtn" type="button" class="btn btn-sm btn-info m-r-2" data-authRule="AUTH_NEW">
	                         <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
	                     </button>
	                     <button id="obPickingOFVSaveBtn" type="button" class="btn btn-sm btn-success m-r-2" data-authRule="AUTH_NEW AUTH_MOD">
	                         <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
	                     </button>
	                     <button id="obPickingOFVDelBtn" type="button" class="btn btn-sm btn-danger m-r-20" data-authRule="AUTH_DEL">
	                     	<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
	                     </button>
	                </div>
	            </div>
			</div>

			<div id="obPickingOFVDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="obPickingOFVDGrid"></table>
		          	<div id="obPickingOFVDGridNavi"></div>
				</div>
			</div>
		</div>

        <script src="/js/views/outbound/outbound_outboundPickingOFV.js"></script>
    </body>
</html>
