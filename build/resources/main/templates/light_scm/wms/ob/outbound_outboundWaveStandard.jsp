<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="sysOutboundWaveStdPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="sysOutboundWaveStdContainer" class="container" >
	        <div id="sysOutboundWaveStdSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WAVE_STD_NO"></span>
						<input id="outboundWaveStdNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WAVE_STD_DESC"></span>
						<input id="outboundWaveStdDesc" type="text" class="form-control" autocomplete="off" />
					</div>

	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                        <button id="outboundWaveStdSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	        				    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!--조회-->
	        			    </button>
	                        <button id="outboundWaveStdSearchAddBtn" type="button" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
	            				<i class="fa fa-plus"></i><i data-domain-id="ADD_BTN"></i><!--추가-->
	            			</button>
	                        <button id="outboundWaveStdSearchSaveBtn" type="button" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success m-r-5">
	                            <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i><!--저장-->
	                        </button>
	                        <button id="outboundWaveStdSearchDelBtn" type="button" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger m-r-5">
	                            <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i><!--삭제-->
	                        </button>
	                        <button id="outboundWaveStdExceBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	        				    <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!--액셀-->
	        			    </button>
	                    </div>
	                </div>
	            </form>
	        </div>

   			<div id="outboundWaveStdHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="outboundWaveStdGrid"></table>
	         		<div id="outboundWaveStdGridNavi"></div>
				</div>
			</div>

		</div>

        <script src="/js/views/outbound/outbound_outboundWaveStandard.js"></script>
    </body>
</html>
