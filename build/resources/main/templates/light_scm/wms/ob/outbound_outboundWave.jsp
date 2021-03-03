<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="outboundWavePageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="outboundWaveContainer" class="container" >

	        <div id="outboundWaveSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CLIENT"></span>
						<input id="outboundWaveClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="outboundWaveClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="outboundWaveClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="outboundWaveObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="outboundWaveObYmdS" class="input-group-addon date" >
							<input id="outboundWaveObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="outboundWaveObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="outboundWaveObYmdE" class="input-group-addon date" >
							<input id="outboundWaveObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WAVE_NO"></span>
						<input id="outboundWaveNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WAVE_STD_NO"></span>
						<input id="outboundWaveWaveStdNo" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="outboundWaveWaveStdNoPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="outboundWaveWaveStdDesc" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="outboundWaveObProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>


	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                        <button id="outboundWaveSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	        				    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!--조회-->
	        			    </button>
	                        <button id="outboundWaveSearchAddBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
	            				<i class="fa fa-plus"></i><i data-domain-id="NEW_BTN"></i><!--신규-->
	            			</button>
	                        <!--
	                        <button id="outboundWaveSearchSaveBtn" type="button" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success">
	                            <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i>저장
	                        </button> -->
	                        <button id="outboundWaveHCancelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
	                            <i class="fa fa-minus"></i><i data-domain-id="CRT_CANCL"></i><!--삭제-->
	                        </button>
	                        <button id="outboundWaveExceBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	        				    <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!--액셀-->
	        			    </button>
	                    </div>

	                </div>
	            </form>
	        </div>


			<div id="outboundWaveHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="outboundWaveHeaderGrid"></table>
	         		<div id="outboundWaveHeaderGridNavi"></div>
				</div>
			</div>

			<div id="outboundWaveSearchDetailGrp" class="search-form clearfix col-xs-w100 col-wms-hidden">
	            <div class="form-group col-xs-w100">
	                <div class="input-group pull-right">
	                    <button id="outboundWaveDetailAddBtn" type="button"  data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
	                        <i class="fa fa-plus"></i><i data-domain-id="NEW_BTN"></i>
	                    </button>
	                    <button id="outboundWaveDetailSaveBtn" type="button"  data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success m-r-5">
	                        <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i>
	                    </button>
	                    <button id="outboundWaveDCancelBtn" type="button"  data-authRule="AUTH_DEL" class="btn btn-sm btn-danger m-r-5">
	                        <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i>
	                    </button>
	                </div>
	            </div>
			</div>

			<div id="outboundWaveDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="outboundWaveDetailGrid"></table>
		          	<div id="outboundWaveDetailGridNavi"></div>
				</div>
			</div>

		</div>

        <script src="/js/views/outbound/outbound_outboundWave.js"></script>
    </body>
</html>
