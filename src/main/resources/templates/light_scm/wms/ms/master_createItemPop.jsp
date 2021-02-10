<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <!-- modal-header -->
        <div class="modal-header">
            <button type="button" class="close" data-close-btn="ture"  >×</button>
            <h4 class="modal-title"></h4>
        </div>
        <!-- modal-body -->

        <div class="modal-body">
			<div class="search-form clearfix col-xs-w100" >
		       <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="ITEM_CD"></span>
						<input id="msItemPopItemCd" type="text" class="form-control" autocomplete="off"  maxlength="20"/>
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="ITEM_NM"></span>
						<input id="msItemPopItemNm" type="text" class="form-control" autocomplete="off" maxlength="500"/>
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_SPEC"></span>
						<input id="msItemPopItemSpec" type="text" class="form-control" autocomplete="off" maxlength="100"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT_CD"></span>
						<input id="msItemPopClientCd" type="text" class="form-control" value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" maxlength="20"/>
						<div class="input-group-addon">
						  	<button id="msItemPopClientPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="ITEM_GBN_CD"></span>
	                    <select id="msItemPopItemGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="KEEP_TEMPE_GBN_CD"></span>
	                    <select id="msItemPopKeepTempeGbnCd" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LARGE_CLASS_CD"></span>
						<input id="msItemPopLargeClassCd" type="text" class="form-control" autocomplete="off" maxlength="20" />
						<div class="input-group-addon">
						  	<button id="msItemPopLargeClassPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="MIDDLE_CLASS_CD"></span>
						<input id="msItemPopMiddleClassCd" type="text" class="form-control" autocomplete="off" maxlength="20" />
						<div class="input-group-addon">
						  	<button id="msItemPopMiddleClassPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SMALL_CLASS_CD"></span>
						<input id="msItemPopSmallClassCd" type="text" class="form-control" autocomplete="off" maxlength="20" />
						<div class="input-group-addon">
						  	<button id="msItemPopSmallClassPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_COST"></span>
						<input id="msItemPopIbCost" type="text" class="form-control" autocomplete="off" maxlength="11"/>
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OB_COST"></span>
						<input id="msItemPopObCost" type="text" class="form-control" autocomplete="off" maxlength="11"/>
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="TAX_YN"></span>
						<input id="msItemPopTaxYn" type="text" class="form-control" autocomplete="off"  />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CBM"></span>
						<input id="msItemPopHorizontal" type="text" class="form-control"  size="11"/>
 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		X
							</button>
						</div>
						<input id="msItemPopVertical" type="text" class="form-control"  size="11"/>
 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		X
							</button>
						</div>
						<input id="msItemPopHeight" type="text" class="form-control"  size="11"/>
 						<div id="msItemPopCalculateBtn" class="input-group-addon">
						  	<button  type="button" class="btn btn-primary spanclass">
						  		=
							</button>
						</div>
						<input id="msItemPopCbn" type="text" class="form-control" readonly size="15"/>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WEIGHT"></span>
						<input id="msItemPopWeight" type="text" class="form-control" autocomplete="off"  maxlength="15" />
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="BOX_BARCODE"></span>
						<input id="msItemPopBoxBarcode" type="text" class="form-control" autocomplete="off" maxlength="100" />
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ITEM_BARCODE"></span>
						<input id="msItemPopItemBarcode" type="text" class="form-control" autocomplete="off" maxlength="100" />
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="DIST_EXPIRY_DAYS"></span>
						<input id="msItemPopDistExpiryDay" type="text" class="form-control col-xs-w70" autocomplete="off"  maxlength="8" />
	                    <select id="msItemPopDistExpiryDayPop" class="form-control col-xs-w30" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PUTW_STRTG_CD"></span>
	                    <select id="msItemPopPutwStrategy" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ALLOC_STRTG_CD"></span>
	                    <select id="msItemPopAllocStrategy" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LOT_ATTR_STRTG_CD"></span>
	                    <select id="msItemPopAttrStrategy" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="MIN_UOM_CD"></span>
	                    <select id="msItemPopMinUomCd" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SET_ITEM_YN"></span>
	                    <select id="msItemPopSetItemCd" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SEASON_YN"></span>
	                    <select id="msItemPopSeasonYn" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="REPLACE_ITEM_CD"></span>
						<input id="msItemPopReplaceItemCd" type="text" class="form-control" autocomplete="off" maxlength="20" />
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="REMARK"></span>
						<input id="msItemPopRemark" type="text" class="form-control" autocomplete="off" maxlength="500"/>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="USE_YN"></span>
	                    <select id="msItemPopUseYn" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LOCAL_EXPORT_GBN"></span>
	                    <select id="msItemPopLocalExportGbnCd" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="PROD_YN"></span>
	                    <select id="msItemPopProdYn" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="SALES_YN"></span>
	                    <select id="msItemPopSalesYn" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

				</form>
			</div>
		</div>

		<div class="modal-footer">
	        <button id="msItemPopSaveBtn" type="button" data-authRule="AUTH_NEW AUTH_MOD" class="btn btn-sm btn-success m-r-5">
				<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
			</button>
			<button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
	        	<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
	        </button>
		</div>

		<script src="/js/views/master/master_createItemPop.js"></script>
	</body>
</html>
