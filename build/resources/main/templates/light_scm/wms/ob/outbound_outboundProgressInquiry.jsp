<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <body>
        <div id="obProgInquiryPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

        <div id="obProgInquiryContainer" class="container" >
	        <div id="obProgInquirySearchHeaderGrp" class="search-form clearfix">
	            <form class="form-inline"  onsubmit="return false;">


					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CLIENT"></span>
						<input id="obProgInquiryClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obProgInquiryClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id=obProgInquiryClientNm type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_PLAN_YMD"></span>
						<input id="obProgInquiryYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obProgInquiryYmdS" class="input-group-addon date" >
							<input id="obProgInquiryYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obProgInquiryYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obProgInquiryYmdE" class="input-group-addon date" >
							<input id="obProgInquiryYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obProgInquiryObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                    	<button id="obProgInquirySearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
		            			<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!--조회-->
		            		</button>
		                	<button id="obProgInquiryExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
		            			<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!--액셀-->
		            		</button>
	                    </div>
	                </div>
	            </form>
	        </div>


			<div id="obProgInquiryHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obProgInquiryGrid"></table>
	         		<!-- <div id="obProgInquiryGridNavi"></div> -->
				</div>
			</div>

			<div id="obProgInquiryDGridGrp" class="col-xs-w100">
				<div class="search-form col-xs-w100">
					<canvas id="obProgInquiryChart" width="1500px" height="330px"></canvas>
				</div>
			</div>
        </div>


        <!-- <script src="/js/plugins/chartjs/chart.js"></script> -->
        <script src="/js/plugins/chartjs/Chart-2.7.3.js"></script>
        <script src="/js/views/outbound/outbound_outboundProgressInquiry.js"></script>
    </body>
</html>
