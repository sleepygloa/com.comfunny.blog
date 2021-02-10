<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <body>
        <div id="obNdeliveryPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

	    <div id="obNdeliveryContainer" class="container" >
	        <div id="obNdeliverySearchHeaderGrp" class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_PLAN_YMD"></span>
						<input id="obNdeliveryObYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obNdeliveryObYmdS" class="input-group-addon date" >
							<input id="obNdeliveryObYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="obNdeliveryObYmdTo" type="text" class="form-control"  size="10"/>
						<div id="obNdeliveryObYmdE" class="input-group-addon date" >
							<input id="obNdeliveryObYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obNdeliveryObNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_GBN"></span>
	                    <select id="obNdeliveryObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE"></span>
						<input id="obNdeliveryStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obNdeliveryStoreBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obNdeliveryStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obNdeliveryCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obNdeliverySoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obNdeliveryRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obNdeliveryRStoreBtn" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obNdeliveryRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WORK_ST"></span>
	                    <select id="obNdeliveryWorkStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right">
		                    <button id="obNdeliverySearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
		            			<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
		            		</button>

		            		<button id="obNdeliveryConfBtn" type="button"  class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
		            			<i class="fa fa-check"></i><i data-domain-id="CONF"></i>
		            		</button>

	                        <button id="obNdeliveryReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
	                            <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i>
	                        </button>

		                	<button id="obNdeliveryExcelBtn" type="button"  class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
		            			<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
		            		</button>
	                    </div>
					</div>

	            </form>
	        </div>

			<div id="obNdeliveryHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obNdeliveryHGrid"></table>
	         		<div id="obNdeliveryHGridNavi"></div>
				</div>
			</div>

			<div id="obNdeliveryDGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obNdeliveryDGrid"></table>
	         		<div id="obNdeliveryDGridNavi"></div>
				</div>
			</div>

	    </div>

        <script src="/js/views/outbound/outbound_outboundNdelivery.js"></script>
    </body>
</html>