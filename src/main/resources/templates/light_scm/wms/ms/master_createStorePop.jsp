<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
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
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE_CD"></span>
					<input id="msStorePopStoreCd" type="text" class="form-control" autocomplete="off" maxlength="20"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="STORE_NM"></span>
					<input id="msStorePopStoreNm" type="text" class="form-control" autocomplete="off" maxlength="100"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
					<input id="msStorePopStoreCd" type="text" class="form-control" autocomplete="off" maxlength="20"/>
					<div class="input-group-addon">
					  	<button id="msStorePopStorePop" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i>
						</button>
					</div>
					<input id="msStorePopStoreNm" type="text" class="form-control"  size="35" maxlength="100" />
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BIZ_NO"></span>
					<input id="msStorePopBizNo" type="text" class="form-control" autocomplete="off" maxlength="20"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BIZ_NM"></span>
					<input id="msStorePopBizNm" type="text" class="form-control" autocomplete="off" maxlength="100"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CEO_NM"></span>
					<input id="msStorePopCeoNm" type="text" class="form-control" autocomplete="off" maxlength="50"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="POST_NO"></span>
					<input id="msStorePopPostNo" type="text" class="form-control" autocomplete="off" maxlength="20"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BIZTYPE"></span>
					<input id="msStorePopBizType" type="text" class="form-control" autocomplete="off" maxlength="100"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BIZKIND"></span>
					<input id="msStorePopBizKind" type="text" class="form-control" autocomplete="off" maxlength="100"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BASIC_ADDR"></span>
					<input id="msStorePopBasicAddr" type="text" class="form-control" autocomplete="off" maxlength="500"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DETAIL_ADDR"></span>
					<input id="msStorePopDetailAddr" type="text" class="form-control" autocomplete="off" maxlength="500"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="TEL_NO"></span>
					<input id="msStorePopTelNo" type="text" class="form-control" autocomplete="off" maxlength="50"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="FAX_NO"></span>
					<input id="msStorePopFaxNo" type="text" class="form-control" autocomplete="off" maxlength="50"/>
				</div>

				<div class="input-group col-wms-search-group3 ">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CHANNEL_GBN"></span>
                    <select id="msStorePopChannelGbnCd" class="form-control" >
                        <!-- <option value=""></option> -->
                    </select>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CONTACT_NM"></span>
					<input id="msStorePopContactNm" type="text" class="form-control" autocomplete="off" maxlength="50"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CONTACT_TEL_NO"></span>
					<input id="msStorePopContactTelNo" type="text" class="form-control" autocomplete="off" maxlength="50"/>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CONTACT_EMAIL"></span>
					<input id="msStorePopContactEmail" type="text" class="form-control" autocomplete="off" maxlength="100"/>
				</div>
				<div class="input-group col-wms-search-group3 ">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="ALLOC_PRIOORD"></span>
                    <select id="msStorePopAllocPrioord" class="form-control" >
                        <!-- <option value=""></option> -->
                    </select>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="DELIVERY_DC"></span>
					<input id="msStorePopDeliveryDcCd" type="text" class="form-control" autocomplete="off" maxlength="20"/>
					<div class="input-group-addon">
					  	<button id="msStorePopDeliveryDcPop" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i>
						</button>
					</div>
					<input id="msStorePopDeliveryDcNm" type="text" class="form-control"  size="35" maxlength="100" />
				</div>
				<div class="input-group col-wms-search-group3 ">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="DEAL_GBN"></span>
                    <select id="msStorePopDealGbnCd" class="form-control" >
                        <!-- <option value=""></option> -->
                    </select>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="DELIVERY_DOMAIN"></span>
					<input id="msStorePopDomainCd" type="text" class="form-control" autocomplete="off" maxlength="20"/>
					<div class="input-group-addon">
					  	<button id="stDomainPopup" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i>
						</button>
					</div>
					<input id="deliveryDomainNm" type="text" class="form-control"  size="35" maxlength="100" />
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="DEAL_START_YMD"></span>
					<input id="msStorePopDealYmdFr" type="text" class="form-control"  size="10"/>

					<div id="msStorePopDealYmdS" class="input-group-addon date" >
						<input id="msStorePopDealYmdSHid" type="hidden" />
					  	<button  type="button" class="btn btn-primary">
					  		<i class="fa fa-calendar"></i>
						</button>
					</div>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="DEAL_END_YMD"></span>
					<input id="msStorePopDealYmdTo" type="text" class="form-control"  size="10"/>

					<div id="msStorePopDealYmdE" class="input-group-addon date" >
						<input id="msStorePopDealYmdEHid" type="hidden" />
					  	<button  type="button" class="btn btn-primary">
					  		<i class="fa fa-calendar"></i>
						</button>
					</div>
				</div>

				<div class="input-group col-wms-search-group3 ">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="USE_YN"></span>
                    <select id="msStorePopUseYn" class="form-control" >
                        <!-- <option value=""></option> -->
                    </select>
				</div>
				<div class="input-group col-wms-search-group3 ">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_LOT_GBN"></span>
                    <select id="msStorePopObLotGbnCd" class="form-control" >
                        <!-- <option value=""></option> -->
                    </select>
				</div>
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="REMARK"></span>
					<input id="msStorePopRemark" type="text" class="form-control" autocomplete="off" maxlength="500"/>
				</div>
				<div class="input-group col-wms-search-group3 ">
					<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="DALAT_YN"></span>
                    <select id="msStorePopDalatYnd" class="form-control" >
                        <!-- <option value=""></option> -->
                    </select>
				</div>
			</form>
		</div>
	</div>

	<div class="modal-footer">
	    <button type="button" id="msStorePopSaveBtn" data-authRule="AUTH_NEW AUTH_MOD" class="btn btn-sm btn-success m-r-5">
			<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
		</button>
		<button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
        	<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
        </button>
	</div>

	<script src="/js/views/master/master_createStorePop.js"></script>

</html>