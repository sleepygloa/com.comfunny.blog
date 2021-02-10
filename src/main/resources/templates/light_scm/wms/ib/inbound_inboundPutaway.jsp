<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div  id="ibPutwPageHeaderGrp" class="" >
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>

	<div id="ibPutwContainer" class="container" >
		<div id="ibPutwSearchHeaderGrp" class="search-form clearfix" >
	       <form class="form-inline"  onsubmit="return false;">

				<div class="input-group col-wms-search-group3 ">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_NO"></span>
					<input id="ibPutwIbNo" type="text" class="form-control" autocomplete="off" />
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
					<input id="ibPutwClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
					<div class="input-group-addon">
					  	<button id="ibPutwClientPopup" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i>
						</button>
					</div>
					<input id="ibPutwClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
				</div>

				<div class="input-group col-wms-search-group3 ">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="IB_YMD"></span>
					<input id="ibPutwYmdFr" type="text" class="form-control"  size="10"/>

					<div id="ibPutwYmdS" class="input-group-addon date" >
						<input id="ibPutwYmdSHid" type="hidden" />
					  	<button  type="button" class="btn btn-primary">
					  		<i class="fa fa-calendar"></i>
						</button>
					</div>
					<div class="input-group-addon">
					  	<button  type="button" class="btn spanclass">
					  		~
						</button>
					</div>
					<input id="ibPutwYmdTo" type="text" class="form-control"  size="10"/>
					<div id="ibPutwYmdE" class="input-group-addon date" >
						<input id="ibPutwYmdEHid" type="hidden" />
					  	<button  type="button" class="btn btn-primary">
					  		<i class="fa fa-calendar"></i>
						</button>
					</div>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_PROG_ST"></span>
                    <select id="ibPutwProgStCd" class="form-control" >
                        <!-- <option value=""></option> -->
                    </select>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
					<input id="ibPutwCarNo" type="text" class="form-control" autocomplete="off" />
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_GBN"></span>
                    <select id="ibPutwGbnCd" class="form-control" >
                        <option value=""></option>
                    </select>
				</div>

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OUTPUT_KIND"></span>
                    <select id="ibPutwReport" class="form-control" >
                    </select>
				</div>

				<!-- 중복되는 부분 -->
				<div class="form-group col-xs-w100 m-b-5">
					<div class="input-group pull-right">
						<button id="searchIbPutwBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
						</button>
						<button id="ibPutwConfBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
						    <i class="fa fa-check"></i><i data-domain-id="PUTW_CONF" > </i>
						</button>
						<button id="ibPutwCancelBtn" type="button"  class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
						    <i class="fa fa-undo"></i><i data-domain-id="PUTW_CANCL" > </i>
						</button>
	                    <button id="reportIbPutwBtn" type="button"  class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
	                        <i class="fa fa-print"></i><i data-domain-id="PRINT_BTN"></i>
	                    </button>
		                <button id="excelIbPutwBtn" type="button"  class="btn btn-sm btn-primary" data-authRule="AUTH_DOWN">
						    <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
						</button>
					</div>
				</div>
		    </form>
		</div>

		<div id="ibPutwHeaderGridGrp" class="col-xs-w100">
			<div>
          		<table id="ibPutwHeaderGrid"></table>
         		<div id="ibPutwHeaderGridNavi"></div>
			</div>
		</div>

		<div id="outboundWaveSearchDetailGrp" class="search-form clearfix col-xs-w50">
            <div class="input-group col-xs-w100">
                <div class="input-group pull-right" style="visibility:hidden">
		            <button type="button" id="saveIbPutwBtn" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success">
		                <i class="fa fa-download"></i><i data-domain-id="SAVE_BTN" > </i>
		            </button>
                </div>
            </div>
        </div>
        <div id="outboundWaveSearchDetail2Grp" class="search-form clearfix col-xs-w50">
            <div class="input-group col-xs-w100">
                <div class="input-group pull-right">
                    <button type="button" id="ibPutwApplyBtn" class="btn btn-sm btn-info m-r-2" data-authRule="AUTH_NEW">
                        <i class="fa fa-plus"></i><i data-domain-id="BATCH_APPLY"></i>
                    </button>
                     <button type="button" id="ibPutwAddBtn" class="btn btn-sm btn-info m-r-2" data-authRule="AUTH_NEW">
                         <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
                     </button>
                     <button type="button" id="ibPutwSaveBtn"  class="btn btn-sm btn-success m-r-2" data-authRule="AUTH_NEW AUTH_MOD">
                         <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
                     </button>
                     <button type="button" id="ibPutwDelBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger m-r-20" data-authRule="AUTH_DEL">
                     <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
                     </button>
                </div>
            </div>
		</div>

		<div id="ibPutwInstDetailGridGrp" class="col-xs-w50">
			<div>
	          	<table id="ibPutwInstDetailGrid"></table>
	          	<div id="ibPutwInstDetailGridNavi"></div>
			</div>
		</div>

		<div id="ibPutwDeatilGridGrp" class="col-xs-w50">
			<div>
	          	<table id="ibPutwDetailGrid"></table>
	          	<div id="ibPutwDetailGridNavi"></div>
			</div>
		</div>

	</div>

	<script src="/js/views/inbound/inbound_inboundPutaway.js"></script>
</body>
</html>