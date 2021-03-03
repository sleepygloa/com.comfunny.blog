<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="obApprDetailInqPageHeaderGrp"  class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

        <div id="obApprDetailInqContainer" class="container" >
			<div id="obApprDetailInqSearchHeaderGrp" class="search-form clearfix">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obApprDetailInqClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obApprDetailInqClientCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obApprDetailInqClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="obApprDetailInqObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obApprDetailInqObYmdS" class="input-group-addon date" >
							<input id="obApprDetailInqObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obApprDetailInqObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obApprDetailInqObYmdE" class="input-group-addon date" >
							<input id="obApprDetailInqObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_CLASS"></span>
		                <div class="col-xs-w33f3">
		                    <select id="obApprDetailInqLargeClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="obApprDetailInqMiddleClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		                <div class="col-xs-w33f3">
		                    <select id="obApprDetailInqSmallClassCd" class="form-control col-xs-w100" >
		                        <option value="" ></option>
		                    </select>
		                </div>
					</div>

	                 <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                        <button id="obApprDetailInqSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
	                        </button>

	                        <button id="obApprDetailInqReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
	                            <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i><!-- 인쇄 -->
	                        </button>
	                        <button id="obApprDetailInqExcelBtn"  type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
	                            <!-- 액셀 -->
	                        </button>
	                    </div>
	                </div> <!--End Row 4 -->
	            </form>
	        </div>


			<div id="obApprDetailInqHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obApprDetailInqHGrid"></table>
	         		<div id="obApprDetailInqHGridNavi"></div>
				</div>
			</div>
			<div id="obApprDetailInqDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="obApprDetailInqDGrid"></table>
		          	<div id="obApprDetailInqDGridNavi"></div>
				</div>
			</div>
        </div>

        <script src="/js/views/outbound/outbound_outboundApprovalDetailInquiry.js"></script>
    </body>
</html>
