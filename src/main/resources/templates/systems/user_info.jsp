<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div id="sysUserPageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="sysUserContainer" class="container" >
			<div id="sysUserSearchHeaderGrp" class="search-form clearfix col-xs-w100" >
				<form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="USER_ID"></span>
						<input id="userInfoUserId" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="USER_NM"></span>
						<input id="userInfoUserName" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="USER_POSITION"></span>
	                    <select id="userInfoPositionCode" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

					<!-- 중복되는 부분 -->
					<div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
							<button id="userInfoSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
								<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
							</button>
						    <button id="userInfoUpdateBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_MOD">
						     	<i class="fa fa-save"></i><i data-domain-id="MODIFY_BTN"></i>
							</button>
							<button id="userInfoSaveBtn" type="button" class="btn btn-sm btn-info" data-authRule="AUTH_NEW">
								<i class="fa fa-plus"></i><i data-domain-id="USER_ADD_BTN"></i>
							</button>
						</div>
					</div>
				</form>
			</div>

			<div id="userInfoHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="userInfoGrid"></table>
	         		<div id="userInfoGridNavi"></div>
				</div>
			</div>

		</div>

		<script src="/js/views/settings/user/user_info.js"></script>
	</body>
</html>