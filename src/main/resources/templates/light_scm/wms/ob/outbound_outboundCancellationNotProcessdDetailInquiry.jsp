<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div id="obCancelNotProDetailInqPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

		<div id="obCancelNotProDetailInqContainer" class="container" >

	        <div id="obCancelNotProDetailInqSearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">


					<div class="input-group col-wms-search-group3" style="display:none;">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obCancelNotProDetailInqClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obCancelNotProDetailInqClientCdPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obCancelNotProDetailInqClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="obCancelNotProDetailInqObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obCancelNotProDetailInqObYmdS" class="input-group-addon date" >
							<input id="obCancelNotProDetailInqObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obCancelNotProDetailInqObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obCancelNotProDetailInqObYmdE" class="input-group-addon date" >
							<input id="obCancelNotProDetailInqObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obCancelNotProDetailInqObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obCancelNotProDetailInqSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obCancelNotProDetailInqStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obCancelNotProDetailInqStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obCancelNotProDetailInqStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>



	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
	                        <button id="obCancelNotProDetailInqSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
	                        </button>
	                        <button id="obCancelNotProDetailInqExcelBtn"  type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
	                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
	                        </button>
	                    </div>
	                </div>

	            </form>
	        </div>

			<div id="obCancelNotProDetailInqHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obCancelNotProDetailInqHGrid"></table>
	         		<div id="obCancelNotProDetailInqHGridNavi"></div>
				</div>
			</div>

		</div>

        <script src="/js/views/outbound/outbound_outboundCancellationNotProcessdDetailInquiry.js"></script>
    </body>
</html>