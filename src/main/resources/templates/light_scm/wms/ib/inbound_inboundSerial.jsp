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
            <div class="form-group col-md-12 m-b-10">
                <div class="form-group col-md-4">
                    <span class="form-group spanClass03" data-domain-id="IB_NO"></span>
                    <input type="text" class="form-control input-sm" id="serialIbNo" size="15" >
                </div>
                <div class="form-group col-md-4 clientFlag">
                    <span class="form-group spanClass03Asterisk" data-domain-id="CLIENT"></span>
                    <div class="input-group">
                        <input type="text" class="form-control input-sm" id="ibSerialClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10"/>
                        <div class="input-group-btn">
                            <a id="ibSerialClientPopup" class="btn btn-sm btn-primary m-r-5">
                                <i class="fa fa-search"></i>
                            </a>
                        </div>
                    </div>
                    <input type="text" class="form-control input-sm" id="ibSerialClientNm" value="${sessionScope.s_clientNm_Prioord}" size="15"/>
                </div>
                <div class="form-group col-md-4">
                   <span class="form-group spanClass03Asterisk" data-domain-id="IB_YMD"></span>
                   <div class="input-group">
                       <div class='input-group date' id='ibSerialYmdS'>
                           <input type='text' class="form-control input-sm" id="frIbSerialYmd" size="10"/>
                           <div class="input-group-btn">
                               <a class="btn btn-sm btn-primary m-r-5">
                                   <i class="fa fa-calendar"></i>
                               </a>
                           </div>
                       </div>
                    </div>
                    &nbsp; ~ &nbsp;
                    <div class="input-group">
                        <div class='input-group date' id='ibSerialYmdE'>
                            <input type='text' class="form-control input-sm" id="toIbSerialYmd" size="10"/>
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5">
                                    <i class="fa fa-calendar"></i>
                                </a>
                            </div>
                        </div>
                     </div>
                 </div>
             </div>
            <div class="form-group col-md-12 m-b-10">
                <div class="form-group col-md-4">
                    <span class="form-group spanClass03" data-domain-id="IB_PROG_ST"></span>
                    <div class="input-group">
	                    <select id="ibSerialProgStCd" class="form-control input-sm p-0 input-medium" >
	                       <option value="" ></option>
	                    </select>
                    </div>
                </div>
                <div class="form-group col-md-4">
                    <span class="form-group spanClass03" data-domain-id="CAR_NO"></span>
                    <input type="text" class="form-control input-sm" id="ibSerialCarNo" size="15" >
                 </div>
                <div class="form-group col-md-4">
                    <span class="form-group spanClass03" data-domain-id="IB_GBN"></span>
                    <div class="input-group">
	                    <select id="ibSerialGbnCd" class="form-control input-sm p-0 input-medium" >
                           <option value="" data-domain-id="IB_GBN"></option>
	                    </select>
                    </div>
                </div>
            </div>
			<!-- 중복되는 부분 -->
            <div class="form-group col-md-12">
				<div class="input-group pull-right">
					<button id="searchIbSerialBtn" type="button" class="btn btn-sm btn-primary m-r-5">
					    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
					</button>
				</div>
			</div>
	    </form>
	</div>

<div class="grid-wrapper" >
	<table id="ibSerialHeaderGrid"></table>
	<div id="ibSerialHeaderGridNavi"></div>
</div>
<div class="content-form clearfix">
    <div class="search-form clearfix" align="right">
     <button type="button" id="ibSerialAddBtn" data-authRule="AUTH_NEW" class="btn btn-sm btn-info">
         <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
     </button>
     <button type="button" id="ibSerialSaveBtn"  class="btn btn-sm btn-success">
         <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
     </button>
     <button type="button" id="ibSerialDelBtn" data-authRule="AUTH_DEL" class="btn btn-sm btn-danger">
     <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
     </button>
    </div>
</div>
<div class="grid-wrapper" >
    <table id="ibSerialDetailGrid"></table>
    <div id="ibSerialDetailGridNavi"></div>
</div>
<script src="/js/views/inbound/inbound_inboundSerial.js"></script>
</body>
</html>