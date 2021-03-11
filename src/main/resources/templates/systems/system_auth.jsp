<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div id="sysAuthPageHeaderGrp" class="" >
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>

	<div id="sysAuthContainer" class="container" >
		<div id="sysAuthSearchHeaderGrp" class="search-form clearfix col-xs-w100" >
			<form class="form-inline"  onsubmit="return false;">

				<input type="hidden" id="authGroupSeq">
				<input type="hidden" id="authGroupModFlag">

				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="AUTH_GROUP_NM"></span>
                    <select id="systemAuthGroupCombo" class="form-control" >
                        <option value=""></option>
                    </select>
				</div>

				<!-- 중복되는 부분 -->
				<div class="form-group col-xs-w100 m-b-5">
					<div class="input-group pull-right">
	                <button type="button" id="systemAuthGroupModBtn" data-authRule="AUTH_MOD"  class="btn btn-sm btn-primary m-r-5">
	                    <i class="fa fa-edit"></i> <i data-domain-id="GROUP_UP"></i>
	                </button>
	                <button type="button" id="systemAuthGroupAddBtn" data-authRule="AUTH_NEW"  class="btn btn-sm btn-info m-r-5">
	                    <i class="fa fa-plus"></i> <i data-domain-id="GROUP_IN"></i>
	                </button>
					<button type="button" id="systemAuthSaveRowBtn" data-authRule="AUTH_NEW"  class="btn btn-sm btn-success">
					    <i class="fa fa-download"></i> <i data-domain-id="SAVE_BTN" ></i>
					</button>
					</div>
				</div>
			</form>
		</div>

		<div id="systemAuthSearchDetailGrp" class="search-form clearfix col-xs-w100 ">
			<div class=" col-xs-w100">
				<div class="input-group col-wms-search-group3">
					<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="USER_INQ"></span>
					<input id="authUserSearchWords" type="text" class="form-control"   autocomplete="off" />
					<div class="input-group-addon">
					  	<button id="systemAuthUserSearchBtn" type="button" class="btn btn-primary">
					  		<i  class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
						</button>
					</div>
				</div>
            </div>
			<div class=" col-xs-w100">

				 <div class="col-xs-w45 col-md-w47f5 ">
				 	<select id="authUserLeft"  multiple class="form-control" style="height: 190px" >
		             </select>
				 </div>
				 <div class="col-xs-w5 " style="text-align:center;">
						<button id="authAddUserSelected" type="button" title="선택 추가" class="btn btn-success m-t-10 col-xs-w80" style="float:none;" >
							<i class="fa fa-angle-right"></i>
						</button>
						<button id="authRemoveUserSelected" type="button" title="선택 제거" class="btn btn-success m-t-10 col-xs-w80"  style="float:none;" >
							<i class="fa fa-angle-left"></i>
						</button>
						<button id="authAddUserAll" type="button" title="모두 추가"  class="btn btn-success m-t-10 col-xs-w80"  style="float:none;" >
							<i class="fa fa-angle-double-right"></i>
						</button>
						<button id="authRemoveUserAll" type="button" title="모두 제거" class="btn btn-success m-t-10 col-xs-w80"  style="float:none;" >
							<i class="fa fa-angle-double-left"></i>
						</button>
				 </div>
				 <div class="col-xs-w45 col-md-w47f5 ">
				 	<select id="authUserRight" multiple class="form-control" style="min-height: 190px">
		             </select>
				 </div>
			 </div>

		</div>

		<div id="systemAuthDGridGrp" class="col-xs-w100">
			<div>
	          	<table id="systemAuthGrid"></table>
	          	<!-- <div id="systemAuthGridNavi"></div> -->
			</div>
		</div>
	</div>
	<script src="/js/views/settings/system/system_auth.js"></script>
</body>
</html>