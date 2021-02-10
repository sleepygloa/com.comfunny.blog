<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<body>

	<div class="" >
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>

	<div class="search-form clearfix" >
		<form class="form-inline"  onsubmit="return false;">
	        <input type="hidden" id="specTypeCdBox" value="0" /> <!--박스Type Data-->

			<div class="form-group col-md-12 m-b-10" >
				<div data-lang="LC0001"  class="form-group col-md-4" >
	                <span class="form-group spanClass03"><i data-domain-id="BOX_ID"></i></span><!-- 박스ID -->
	                <div class="input-group">
					    <input type="text" lang="" class="form-control input-sm" id="boxId" size="10" />
	                        <div class="input-group-btn">
	                            <a class="btn btn-sm btn-primary m-r-5" id="boxIdPop">
							        <i class="fa fa-search"></i>
						        </a>
	                        </div>
	                </div>
	                <input type="text" class="form-control input-sm" id="boxNm" size="15" />
				</div>

	            <div data-lang="LC0001"  class="form-group col-md-4" >
	                <span class="form-group spanClass03"><i data-domain-id="SPEC_CD"></i></span><!-- 박스ID -->
	                <div class="input-group">
					    <input type="text" class="form-control input-sm" id="specCdBox" size="10" />
	                        <div class="input-group-btn">
	                            <a class="btn btn-sm btn-primary m-r-5" id="specCdPopBtn">
							        <i class="fa fa-search"></i>
						        </a>
	                        </div>
	                </div>
	                <input type="text" class="form-control input-sm" id="specNmBox" size="15" />
				</div>
	            <div class="form-group col-md-4">
	                <span class="form-group spanClass03"><i data-domain-id="USE_YN"></i></span><!-- 사용여부 -->
	                <div class="input-group">
	                    <select id="useYnBox" class="form-control input-sm p-0 input-medium" >
	                        <option value="" ></option>
	                    </select>
	                </div>
	            </div>

			</div>

	        <div class="form-group col-md-12">
	            <div class="input-group pull-right">
	                <button type="button" id="createBoxBtn" class="btn btn-sm btn-warning m-r-5">
	                    <i class="fa fa-angle-double-down"></i><i data-domain-id="BATCHCREATION_BTN"></i><!-- 일괄생성  -->
	                </button>

	                <button type="button" id="searchBoxBtn" class="btn btn-sm btn-primary m-r-5">
	                    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
	                </button>

	                <button type="button" id="addBoxRowBtn" class="btn btn-sm btn-info m-r-5">
	                    <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN"></i>
	                </button>

	                <button type="button" id="saveBoxRowBtn"  class="btn btn-sm btn-success m-r-5">
	                    <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
	                </button>

	                <button type="button" id="delBoxRowBtn" class="btn btn-sm btn-danger m-r-5">
	                    <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" ></i>
	                </button>

	                <button type="button" id="excelBoxBtn" class="btn btn-sm btn-primary m-r-5">
	                    <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" ></i>
	                </button>
	            </div>
	        </div>

		</form>
	</div>

	<!-- Grid 생성 -->
	<div class="grid-wrapper" >
		<table id="masterBoxIdGrid"  ></table>
		<div id="masterBoxIdGridNavi"></div>
	</div>

	<script src="/js/views/master/master_boxId.js"></script>

</body>
</html>
