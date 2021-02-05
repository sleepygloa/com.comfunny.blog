<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <body>
        <div class="modal-header" >
            <button type="button" class="close" data-close-btn="ture">×</button>
            <h4 class="modal-title"></h4>
        </div>

        <div class="modal-body">
	        <div class="search-form clearfix">
	            <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="obPlanPopClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPlanPopClient" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPlanPopClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>


					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_PLAN_YMD"></span>
						<input id="obPlanPopYmdFr" type="text" class="form-control"  size="10"/>

						<div id="obPlanPopYmdS" class="input-group-addon date" >
							<input id="obPlanPopYmdSHid" type="hidden" />
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
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_NO"></span>
						<input id="obPlanPopObNo" type="text" class="form-control" autocomplete="off"  readonly />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="STORE"></span>
						<input id="obPlanPopStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPlanPopStore" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPlanPopStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="obPlanPopCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_GBN"></span>
	                    <select id="obPlanPopObGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="RSTORE"></span>
						<input id="obPlanPopRStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="obPlanPopRStore" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="obPlanPopRStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SO_NO"></span>
						<input id="obPlanPopSoNo" type="text" class="form-control" autocomplete="off" />
					</div>

<!-- 					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_PROG_ST"></span>
	                    <select id="obPlanPopObProgStCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div> -->

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DELIVERY_DGR"></span>
						<input id="obPlanPopDeliveryDgr" type="text" class="form-control" autocomplete="off" />
					</div>

	                <!-- 중복되는 부분 -->
	                <div class="form-group col-xs-w100 m-b-5">
	                    <div class="input-group pull-right p-0">
	                    <button id="obPlanPopAddRowBtn" type="button" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
	                        <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN"></i><!--신규-->
	                    </button>
	                    <button id="obPlanPopSaveBtn" type="button" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success m-r-5">
	                        <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i><!--저장-->
	                    </button>
	                    <button id="obPlanPopDelRowBtn" type="button" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger ">
	                        <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i><!--삭제-->
	                    </button>
	                    </div>
	                </div> <!--End: Row 4 -->
	            </form>
	        </div>

			<div id="obPlanPopHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="obPlanPopGrid"></table>
	         		<div id="obPlanPopGridNavi"></div>
				</div>
			</div>
        </div>

        <div class="modal-footer">
            <button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
		   		<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
		    </button>

        </div>

        <script src="/js/views/outbound/outbound_outboundPlanPop.js"></script>
    </body>
</html>
