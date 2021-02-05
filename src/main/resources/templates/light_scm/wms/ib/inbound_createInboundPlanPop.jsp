<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<body>
		<div class="modal-header">
			<button type="button" class="close" data-close-btn="ture"  >×</button>
			<h4 class="modal-title"></h4>
		</div>
		<div class="modal-body">
			<div class="search-form clearfix" >
		       <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="ibPlanPopClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibPlanPopClient" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibPlanPopClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_NO"></span>
						<input id="ibPlanPopIbNo" type="text" class="form-control" autocomplete="off" disabled />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="IB_PLAN_YMD"></span>
						<input id="ibPlanPopYmdFr" type="text" class="form-control"  size="10"/>

						<div id="ibPlanPopYmdS" class="input-group-addon date" >
							<input id="ibPlanPopYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
<!-- 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="ibPlanYmdTo" type="text" class="form-control"  size="10"/>
						<div id="ibPlanYmdE" class="input-group-addon date" >
							<input id="ibPlanYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div> -->
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="SUPPLIER"></span>
						<input id="ibPlanPopSupplierCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibPlanPopSupplier" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibPlanPopSupplierNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="ibPlanPopCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="IB_GBN"></span>
	                    <select id="popIbGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PO_NO"></span>
						<input id="ibPlanPopPoNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PO_YMD"></span>
						<input id="ibPlanPopPoYmdFr" type="text" class="form-control"  size="10"/>

						<div id="ibPlanPopPoYmdS" class="input-group-addon date" >
							<input id="ibPlanPopPoYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
<!-- 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="ibPlanYmdTo" type="text" class="form-control"  size="10"/>
						<div id="ibPlanYmdE" class="input-group-addon date" >
							<input id="ibPlanYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div> -->
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="REMARK"></span>
						<input id="ibPlanPopRemark" type="text" class="form-control" autocomplete="off" maxlength="500"/>
					</div>

					<!-- 중복되는 부분 -->
					<div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
			                <button id="ibPlanPopAddRowBtn" type="button"  data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
			                    <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
			                </button>
			                <button id="ibPlanPopSaveBtn" type="button" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success m-r-5">
			                 <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
			                </button>
			                <button id="ibPlanPopDelRowBtn" type="button" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger">
			                    <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
			                </button>
						</div>
					</div>
				</form>
			</div>

			<div id="ibPlanPopHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="ibPlanPopGrid"></table>
	         		<div id="ibPlanPopGridNavi"></div>
				</div>
			</div>

		</div>
		<div class="modal-footer">
			<button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
		        <i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
		    </button>
		</div>

		<script src="/js/views/inbound/inbound_createInboundPlanPop.js"></script>
	</body>
</html>