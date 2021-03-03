<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
<div class="" >
<ol class="breadcrumb pull-right"></ol>
<h1 class="page-header"></h1>
</div>
    <div class="search-form clearfix" >
       <form class="form-inline"  onsubmit="return false;">
            <input type="hidden" id="tcGbn" value="false"/>
            <input type="hidden" id="tcReqNoHidden"/>
                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass04" data-domain-id="TC_REQ_NO"></span>
                        <input type="text" class="form-control input-sm" id="ibTcReqNo" size="15" >
                     </div>
                    <div class="form-group col-md-4 clientFlag">
                        <span class="form-group spanClass03Asterisk" data-domain-id="CLIENT"></span>
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="ibTcReqClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10"/>
                            <div class="input-group-btn">
                                <a id="ibTcReqClientPopup" class="btn btn-sm btn-primary m-r-5">
                                    <i class="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="ibTcReqClientNm" value="${sessionScope.s_clientNm_Prioord}" size="15"/>
                    </div>
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03Asterisk" data-domain-id="TC_REQ_YMD"></span>
                        <div class="input-group">
                            <div class='input-group date' id='ibTcReqYmdS'>
                                <input type='text' class="form-control input-sm" id="frIbTcReqYmd" size="10"/>
	                            <div class="input-group-btn">
	                                <a class="btn btn-sm btn-primary m-r-5">
	                                   <i class="fa fa-calendar" ></i>
	                                </a>
	                            </div>
                            </div>
                         </div>&nbsp; ~ &nbsp;
                        <div class="input-group">
                            <div class='input-group date' id='ibTcReqYmdE'>
                                <input type='text' class="form-control input-sm" id="toIbTcReqYmd" size="10"/>
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5">
                                       <i class="fa fa-calendar" ></i>
                                    </a>
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass04" data-domain-id="TC_REQ_PROG_ST"></span>
                        <div class="input-group">
	                        <select id="ibTcReqProgStCd" class="form-control input-sm p-0 input-medium" >
	                           <option value="" ></option>
	                        </select>
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="OB_PLAN_YMD"></span>
                        <div class="input-group">
                            <div class='input-group date' id='ibOTcReqYmdS'>
                                <input type='text' class="form-control input-sm" id="frIbOTcReqYmd" size="10"/>
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5">
                                       <i class="fa fa-calendar" ></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        &nbsp; ~ &nbsp;
                        <div class="input-group">
                            <div class='input-group date' id='ibOTcReqYmdE'>
                                <input type='text' class="form-control input-sm" id="toIbOTcReqYmd" size="10"/>
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
            <div class="form-group col-md-12">
	            <div class="input-group pull-right">
	                <button id="searchIbTcReqBtn" type="button" class="btn btn-sm btn-primary m-r-5">
	                    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
	                </button>
	                <button type="button" id="newIbTcReqBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
	                    <i class="fa fa-plus"></i><i data-domain-id="NEW_BTN" > </i>
	                </button>
	                <button type="button" id="confirmIbTcReqBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info m-r-5">
	                    <i class="fa fa-check"></i><i data-domain-id="CONF"></i><!-- 확정 -->
	                </button>
	                <button type="button" id="delIbTcReqBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger m-r-5">
	                   <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
	                </button>
	                <button type="button" id="excelIbTcReqBtn" class="btn btn-sm btn-primary m-r-5">
	                   <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
	                </button>
	            </div>
            </div>
        </form>
    </div>

<div class="grid-wrapper" >
    <table id="ibTcReqHeaderGrid"></table>
    <div id="ibTcReqHeaderGridNavi"></div>
</div>
<div class="grid-wrapper" >
    <table id="ibTcReqDetailGrid"></table>
    <div id="ibTcReqDetailGridNavi"></div>
</div>
<script src="/js/views/inbound/inbound_inboundTcReq.js"></script>
</body>
</html>