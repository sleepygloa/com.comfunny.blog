<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="obInstOFVPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="obInstOFVContainer" class="container" >
	        <div id="obInstOFVSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obInstOFVClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obInstOFVClientCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obInstOFVClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="obInstOFVObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obInstOFVObYmdS" class="input-group-addon date" >
							<input id="obInstOFVObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obInstOFVObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obInstOFVObYmdE" class="input-group-addon date" >
							<input id="obInstOFVObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obInstOFVObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obInstOFVStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obInstOFVStoreCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obInstOFVStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obInstOFVCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obInstOFVObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obInstOFVRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obInstOFVRStoreCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obInstOFVRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obInstOFVSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="obInstOFVObProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WAVE_NO"></span>
						<input id="obInstOFVWaveNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OUTPUT_KIND"></span>
	                    <select id="obInstOFVReportCd" class="form-control" >
	                    </select>
					</div>

	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                        <button id="obInstOFVSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
	                        </button>
	                        <button id="obInstOFVInstBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
	                            <i class="fa fa-check"><i data-domain-id="OB_INST"></i></i>
	                        </button>
	                        <button id="obInstOFVCancelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
	                            <i class="fa fa-undo"><i data-domain-id="INST_CANCL"></i></i>
	                        </button>
	                        <button id="obInstOFVReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
	                            <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i>
	                        </button>
	                        <button id="obInstOFVExceBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_DOWN">
	                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
	                        </button>
	                    </div>
	                </div>

	            </form>
	        </div>

			<div id="obInstOFVHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obInstOFVWaveDetailGrid"></table>
	         		<div id="obInstOFVWaveDetailGridNavi"></div>
				</div>
			</div>
			<div id="obInstOFVDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="obInstOFVDetailGrid"></table>
		          	<div id="obInstOFVDetailGridNavi"></div>
				</div>
			</div>
		</div>


        <script src="/js/views/outbound/outbound_outboundInstructionOFV.js"></script>
    </body>
</html>
