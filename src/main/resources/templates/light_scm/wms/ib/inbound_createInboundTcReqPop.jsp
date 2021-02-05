<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<head>
<style type="text/css">
    .modal-body .search-controls{padding-left:0px}
</style>
</head>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title"></h4>
</div>
<div class="modal-body">
	<div class="search-form clearfix" >
       <form class="form-inline"  onsubmit="return false;">
               <input type="hidden" id="tcEdit" value="false"/>
               <input type="hidden" id="sessionDcCd" value="${sessionScope.s_dcCd_Prioord}"/>
               <div class="form-group col-md-12 m-t-5 m-b-10 p-0">
                   <div class="form-group col-md-4">
                       <span class="form-group spanPop02" data-domain-id="TC_REQ_NO"></span>
                       <input type="text" class="form-control input-sm" id="ibTcReqNoP" size="15" />
                    </div>
                   <div class="form-group col-md-4 clientFlag">
                       <span class="form-group spanPop02Asterisk" data-domain-id="CLIENT"></span>
                       <div class="input-group">
                           <input type="text" class="form-control input-sm" id="ibTcReqClientCdP" value="${sessionScope.s_clientCd_Prioord}" size="10"/>
                           <div class="input-group-btn">
                               <a id="ibTcReqClientPop"  class="btn btn-sm btn-primary m-r-5">
                                   <i class="fa fa-search"></i>
                               </a>
                           </div>
                       </div>
                       <input type="text" class="form-control input-sm" id="ibTcReqClientNmP" value="${sessionScope.s_clientNm_Prioord}" size="15"/>
                   </div>
                   <div class="form-group col-md-4">
                       <span class="form-group spanPop02Asterisk" data-domain-id="TC_REQ_YMD"></span>
                       <div class="input-group">
                           <div class='input-group date' id='ibTcReqYmdSP'>
                               <input type='text' class="form-control input-sm" id="ibTcReqYmdP" size="10"/>
                               <input type='hidden' class="form-control input-sm" id="ibTcReqYmdPH" size="10"/>
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5">
                                   <i class="fa fa-calendar" ></i>
                                </a>
                            </div>
                           </div>
                        </div>
                   </div>
               </div>
               <div class="form-group col-md-12 m-b-10 p-0">
                   <div class="form-group col-md-4">
                       <span class="form-group spanPop02Asterisk" data-domain-id="OB_PLAN_YMD"></span>
                       <div class="input-group">
                           <div class='input-group date' id='ibOTcReqYmdSP'>
                               <input type='text' class="form-control input-sm" id="ibOTcReqYmdP" size="10"/>
                               <input type='hidden' class="form-control input-sm" id="ibOTcReqYmdPH" size="10"/>
                               <div class="input-group-btn">
                                   <a class="btn btn-sm btn-primary m-r-5">
                                      <i class="fa fa-calendar" ></i>
                                   </a>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
		<!-- 중복되는 부분 -->
               <div class="form-group col-md-12 p-0">
				<div class="input-group pull-right">
	                <button type="button" id="addIbTcReqPopBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
	                    <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
	                </button>
	                <button type="button" id="saveIbTcReqPopBtn" data-authRule="AUTH_NEW AUTH_MOD AUTH_DEL" class="btn btn-sm btn-success m-r-5">
	                    <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" > </i>
	                </button>
	                <button type="button" id="delIbTcReqPopBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger">
	                    <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
	                </button>
				</div>
			</div>
		</form>
	</div>

	<div class="grid-wrapper" >
		<table id="inboundTcReqPopGrid"></table>
		<div id="inboundTcReqPopGridNavi"></div>
	</div>
</div>
<div class="modal-footer">
	<button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
   		<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
    </button>
</div>

<script src="/js/views/inbound/inbound_createInboundTcReqPop.js"></script>

</html>