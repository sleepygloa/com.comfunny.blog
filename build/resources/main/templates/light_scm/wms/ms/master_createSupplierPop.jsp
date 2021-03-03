<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div class="modal-header">
		    <button type="button" class="close" data-close-btn="ture">×</button>
		    <h4 class="modal-title"></h4>
		</div>

        <div class="modal-body">
			<div class="search-form clearfix col-xs-w100" >
		       <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="SUPPLIER_CD"></span>
						<input id="msSupPopSupplierCd" type="text" class="form-control" autocomplete="off"  maxlength="20"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="SUPPLIER_NM"></span>
						<input id="msSupPopSupplierNm" type="text" class="form-control" autocomplete="off"  maxlength="100"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="msSupPopClientCd" type="text" class="form-control"  autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msSupPopClientPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msSupPopClientNm" type="text" class="form-control"   size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BIZ_NO"></span>
						<input id="msSupPopBizNo" type="text" class="form-control" autocomplete="off"  maxlength="20"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BIZ_NM"></span>
						<input id="msSupPopBizNm" type="text" class="form-control" autocomplete="off"  maxlength="100"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CEO_NM"></span>
						<input id="msSupPopCeoNm" type="text" class="form-control" autocomplete="off"  maxlength="30"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="POST_NO"></span>
						<input id="msSupPopPostNo" type="text" class="form-control" autocomplete="off"  maxlength="20"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BASIC_ADDR"></span>
						<input id="msSupPopBasicAddr" type="text" class="form-control" autocomplete="off"  maxlength="500"/>
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DETAIL_ADDR"></span>
						<input id="msSupPopDetailAddr" type="text" class="form-control" autocomplete="off"  maxlength="500"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BIZTYPE"></span>
						<input id="msSupPopBizType" type="text" class="form-control" autocomplete="off"  maxlength="100"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BIZKIND"></span>
						<input id="msSupPopBizKind" type="text" class="form-control" autocomplete="off"  maxlength="100"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="TEL_NO"></span>
						<input id="msSupPopTelNo" type="text" class="form-control" autocomplete="off"  maxlength="50"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="FAX_NO"></span>
						<input id="msSupPopFaxNo" type="text" class="form-control" autocomplete="off"  maxlength="50"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CONTACT_NM"></span>
						<input id="msSupPopContactNm" type="text" class="form-control" autocomplete="off"  maxlength="50"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CONTACT_TEL_NO"></span>
						<input id="msSupPopContactTelNo" type="text" class="form-control" autocomplete="off"  maxlength="50"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CONTACT_EMAIL"></span>
						<input id="msSupPopContactEmail" type="text" class="form-control" autocomplete="off"  maxlength="100"/>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DEAL_GBN_CD"></span>
	                    <select id="msSupPopDealGbnCd" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DEAL_START_YMD"></span>
						<input id="msSupPopDealYmdFr" type="text" class="form-control"  size="10"/>

						<div id="msSupPopDealYmdS" class="input-group-addon date" >
							<input id="msSupPopDealYmdSHid" type="hidden" />
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
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DEAL_END_YMD"></span>
<!-- 						<input id="msSupPopDealStartYmd" type="text" class="form-control"  size="10"/>

 						<div id="ibPlanPopYmdS" class="input-group-addon date" >
							<input id="ibPlanPopYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div> -->
						<input id="msSupPopDealYmdTo" type="text" class="form-control"  size="10"/>
						<div id="msSupPopDealYmdE" class="input-group-addon date" >
							<input id="msSupPopDealYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="REMARK"></span>
						<input id="msSupPopRemark" type="text" class="form-control" autocomplete="off"  maxlength="500"/>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="USE_YN"></span>
	                    <select id="msSupPopUseYn" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

				</form>
			</div>
		</div>

		<div class="modal-footer">
		    <button type="button" id="msSupPopSaveBtn" data-authRule="AUTH_NEW AUTH_MOD" class="btn btn-sm btn-success m-r-5">
				<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
			</button>
			<button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
            	<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
            </button>
		</div>
		<script src="/js/views/master/master_createSupplierPop.js"></script>
	</body>
</html>