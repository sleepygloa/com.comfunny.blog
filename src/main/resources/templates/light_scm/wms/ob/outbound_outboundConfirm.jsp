<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="outboundConfirmPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

        <div id="outboundConfirmContainer" class="container" >
            <div id="outboundConfirmSearchHeaderGrp" class="search-form clearfix col-xs-w100">
            <form class="form-inline"  onsubmit="return false;">

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
					<input id="outboundConfirmClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
					<div class="input-group-addon">
					  	<button id="outboundConfirmClientCdPopup" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i>
						</button>
					</div>
					<input id="outboundConfirmClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_PLAN_YMD"></span>
					<input id="outboundConfirmObYmdFr" type="text" class="form-control"  size="10"/>

					<div id="outboundConfirmObYmdS" class="input-group-addon date" >
						<input id="outboundConfirmObYmdSHid" type="hidden" />
					  	<button  type="button" class="btn btn-primary">
					  		<i class="fa fa-calendar"></i>
						</button>
					</div>
					<div class="input-group-addon">
					  	<button  type="button" class="btn spanclass">
					  		~
						</button>
					</div>
					<input id="outboundConfirmObYmdTo" type="text" class="form-control"  size="10"/>
					<div id="outboundConfirmObYmdE" class="input-group-addon date" >
						<input id="outboundConfirmObYmdEHid" type="hidden" />
					  	<button  type="button" class="btn btn-primary">
					  		<i class="fa fa-calendar"></i>
						</button>
					</div>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
					<input id="outboundConfirmObNo" type="text" class="form-control" autocomplete="off" />
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
					<input id="outboundConfirmStoreCd" type="text" class="form-control" autocomplete="off" />
					<div class="input-group-addon">
					  	<button id="outboundConfirmStoreCdBtn" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i>
						</button>
					</div>
					<input id="outboundConfirmStoreNm" type="text" class="form-control"  size="35" readonly>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
					<input id="outboundConfirmCarNo" type="text" class="form-control" autocomplete="off" />
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
                    <select id="outboundConfirmObGbnCd" class="form-control" >
                        <option value=""></option>
                    </select>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
					<input id="outboundConfirmRStoreCd" type="text" class="form-control" autocomplete="off" />
					<div class="input-group-addon">
					  	<button id="outboundConfirmRStoreCdBtn" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i>
						</button>
					</div>
					<input id="outboundConfirmRStoreNm" type="text" class="form-control"  size="35" readonly>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
					<input id="outboundConfirmSoNo" type="text" class="form-control" autocomplete="off" />
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
                    <select id="outboundConfirmObProgStCd" class="form-control" >
                        <!-- <option value=""></option> -->
                    </select>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WAVE_NO"></span>
					<input id="outboundConfirmWaveNo" type="text" class="form-control" autocomplete="off" />
				</div>

				<div class="input-group col-wms-search-group3 col-wms-hidden">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DELIVERY_DGR"></span>
					<input id="outboundConfirmDeliveryDgr" type="text" class="form-control" autocomplete="off" />
				</div>

				<div class="input-group col-wms-search-group3 col-wms-hidden">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OUTPUT_KIND"></span>
                    <select id="outInstReportCd" class="form-control" >
                        <!-- <option value=""></option> -->
                    </select>
				</div>

                <div class="form-group col-xs-w100 m-b-5">
					<div class="input-group pull-right">
                        <button id="outboundConfirmSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
            				<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!-- 조회 -->
            			</button>
            			<button id="outboundConfirmConfirmBtn"type="button"  class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
            				<i class="fa fa-check"></i><i data-domain-id="OB_CONF"></i><!-- 확정 -->
            			</button>
            			<button id="outboundConfirmCancleBtn"type="button"  class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
            				<i class="fa fa-undo"></i><i data-domain-id="CONF_CANCL"></i><!-- 취소 -->
            			</button>
                        <button id="outboundConfirmReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
                            <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i>
                        </button>
            			<button id="outboundConfirmExcelBtn"type="button"  class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
            				<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!-- 액셀 -->
            			</button>
                        </div>
                </div> <!-- Row 4 -->

            </form>
        </div>

		<div id="outboundConfirmHGridGrp" class="col-xs-w100">
			<div>
          		<table id="outboundConfirmHGrid"></table>
         		<div id="outboundConfirmHGridNavi"></div>
			</div>
		</div>
		<div id="outboundConfirmDGridGrp" class="col-xs-w100">
			<div>
	          	<table id="outboundConfirmDGrid"></table>
	          	<div id="outboundConfirmDGridNavi"></div>
			</div>
		</div>

	</div>

    <script src="/js/views/outbound/outbound_outboundConfirm.js"></script>
    </body>
</html>
