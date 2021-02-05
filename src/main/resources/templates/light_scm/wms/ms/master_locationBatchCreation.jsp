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
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="ZONE_CD"></span>
						<input id="msLocBatchZoneCd" type="text" class="form-control" autocomplete="off"  maxlength="20"/>
						<div class="input-group-addon">
						  	<button id="msLocBatchZonePop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msLocBatchZoneNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LIN"></span>
						<input id="msLocBatchFrLinCd" type="text" class="form-control" maxlength="4" />
 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="msLocBatchToLinCd" type="text" class="form-control" maxlength="4" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="ROW"></span>
						<input id="msLocBatchFrRowCd" type="text" class="form-control" maxlength="4" />
 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="msLocBatchToRowCd" type="text" class="form-control" maxlength="4" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LEV"></span>
						<input id="msLocBatchFrLevCd" type="text" class="form-control" maxlength="4" />
 						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="msLocBatchToLevCd" type="text" class="form-control" maxlength="4" />
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="LOC_TYPE"></span>
	                    <select id="msLocBatchLocTypeCd" class="form-control" >
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="LOAD_GBN"></span>
	                    <select id="msLocBatchLoadGbnCd" class="form-control" >
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="HOLD_ST"></span>
	                    <select id="msLocBatchHoldStCd" class="form-control" >
	                    </select>
					</div>
					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="LOC_PRIOORD"></span>
						<input id="msLocBatchLocPrioord" type="text" class="form-control" autocomplete="off" maxlength="9" />
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="ITEM_MIXLOAD_YN"></span>
	                    <select id="msLocBatchItemMixLoadYn" class="form-control" >
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="LOT_MIXLOAD_YN"></span>
	                    <select id="msLocBatchLotMixLoadYn" class="form-control" >
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="HORIZONTAL"></span>
						<input id="msLocBatchHorizontal" type="text" class="form-control" autocomplete="off" maxlength="11" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="VERTICAL"></span>
						<input id="msLocBatchVertical" type="text" class="form-control" autocomplete="off" maxlength="11" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="HEIGHT"></span>
						<input id="msLocBatchHeight" type="text" class="form-control" autocomplete="off" maxlength="11" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CBM"></span>
						<input id="msLocBatchCbm" type="text" class="form-control" autocomplete="off" maxlength="11" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WEIGHT"></span>
						<input id="msLocBatchWeight" type="text" class="form-control" autocomplete="off" maxlength="15" />
					</div>
				</form>
			</div>
		</div>

		<div class="modal-footer">
		    <button id="msLocBatchLocSaveBtn" type="button"  class="btn btn-sm btn-warning m-r-5">
            	<i class="fa fa-angle-double-down"></i><i data-domain-id="CREATE_BTN" > </i>
            </button>
            <button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
            	<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
            </button>
		</div>

	    <script src="/js/views/master/master_locationBatchCreation.js"></script>

	</body>
</html>