<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>
		    <div class="search-form clearfix" >
		       <form class="form-inline"  onsubmit="return false;">
		            <div class="form-group col-md-12 m-b-10">
		                <div class="form-group col-md-4 clientFlag">
		                	<span class="form-group spanClass03Asterisk" data-domain-id="CLIENT"></span>
		                    <div class="input-group">
		                        <input type="text" class="form-control input-sm" id="ibPtLabelPrintClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10"/>
		                        <div class="input-group-btn">
		                            <a id="ibPtLabelPrintClientPopup" class="btn btn-sm btn-primary m-r-5">
		                                <i class="fa fa-search"></i>
		                            </a>
		                        </div>
		                    </div>
		                    <input type="text" class="form-control input-sm" id="ibPtLabelPrintClientNm" value="${sessionScope.s_clientNm_Prioord}" size="30"/>
		                </div>
		                <div class="form-group col-md-4">

							<span class="form-group spanClass03Asterisk" data-domain-id="IB_PLAN_YMD"></span>
		                    <input type='text' class="form-control input-sm" id="ibPtLabelPrintWorkYmdFr" size="10"/>
		                    <div class='input-group date' id='ibPtLabelPrintWorkYmdS'>
		                    	<input type="hidden" id="ibPtLabelPrintWorkYmdSHid"/>
		                        <div class="input-group-btn">
		                            <a class="btn btn-sm btn-primary m-r-5">
		                                <i class="fa fa-calendar"></i>
		                            </a>
		                        </div>
		                    </div>
		                </div>

		                <div class="form-group col-md-4">
		                    <span class="form-group spanClass03" data-domain-id="OUTPUT_KIND"></span>
		                    <div class="input-group">
		                        <select id="ibPtLabelPrintOutputKind" class="form-control input-sm p-0 input-medium" >
		                            <option value="57" >생산라벨</option>
		                        </select>
		                    </div>
		                </div>
		            </div>
		            <!-- 중복되는 부분 -->
		            <div class="form-group col-md-12">
		                <div class="input-group pull-right">
		                    <button id="ibPtLabelPrintSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
		                       <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
		                    </button>
		                    <button id="ibPtLabelPrintFileUploadBtn" type="button" data-authRule="AUTH_NEW" class="btn btn-sm btn-warning m-r-5">
		                       <i class="fa fa-file-excel-o"></i><i data-domain-id="FILE_UPLOAD" > </i>
		                    </button>
		                    <button id="ibPtLabelPrintReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
		                        <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i><!-- 인쇄 -->
		                    </button>
		                </div>
		            </div>
					<div class="form-group col-md-12" style="display:none">
						<div class="input-group pull-right">
						   <input type="file"  class="form-control input-sm"  id="ibPtLabelPrintExcelUploadFile" size="10" >
						</div>
					</div>
		        </form>
		    </div>

		<div class="grid-wrapper" >
		    <table id="ibPtLabelPrintGrid"></table>
		    <div id="ibPtLabelPrintGridNavi"></div>
		</div>
		<script src="/js/views/inbound/inbound_inboundProductionLabelPrint.js"></script>
	</body>
</html>