<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="obProgDetailInqPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="obProgDetailInqContainer" class="container">
			<div id="obProgDetailInqSearchHeaderGrp" class="search-form clearfix">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obProgDetailInqClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obProgDetailInqClientCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obProgDetailInqClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="obProgDetailInqObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obProgDetailInqObYmdS" class="input-group-addon date" >
							<input id="obProgDetailInqObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obProgDetailInqObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obProgDetailInqObYmdE" class="input-group-addon date" >
							<input id="obProgDetailInqObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obProgDetailInqObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obProgDetailInqSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="obProgDetailInqObProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obProgDetailInqObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obProgDetailInqCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                        <button id="obProgDetailInqSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
	                        </button>
	                        <button id="obProgDetailInqExcelBtn"  type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
	                            <!-- 액셀 -->
	                        </button>
	                    </div>
					</div>

	            </form>
	        </div>


			<div id="obProgDetailInqHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obProgDetailInqHGrid"></table>
	         		<div id="obProgDetailInqHGridNavi"></div>
				</div>
			</div>
			<div id="obProgDetailInqDGridGrp" class="col-xs-w100">
				<div>
		          	<table id="obProgDetailInqDGrid"></table>
		          	<div id="obProgDetailInqDGridNavi"></div>
				</div>
			</div>
		</div>

        <script src="/js/views/outbound/outbound_outboundProgressDetailInquiry.js"></script>
    </body>
</html>
