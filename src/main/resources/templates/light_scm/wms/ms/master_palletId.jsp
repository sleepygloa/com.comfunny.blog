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
		    <input type="hidden" id="specTypeCdPlt" value="0"/> <!--파렛트Type Data-->

				<!-- 조건 -->
				<div class="form-group col-md-12 m-b-10" >
					<div data-lang="LC0001"  class="form-group col-md-4" >
		                <span class="form-group spanClass03"><i data-domain-id="PLT_ID"></i></span><!-- 박스ID -->
		                <div class="input-group">
						<input type="text" lang="" class="form-control input-sm" id="pltId" size="10" />
		                    <div class="input-group-btn">
		                        <a class="btn btn-sm btn-primary m-r-5" id="palletPopBtn">
		    						<i class="fa fa-search"></i>
		    					</a>
		                    </div>
		                </div>
		                <input type="text" class="form-control input-sm" id="pltNm" size="15" />
					</div>

		            <div data-lang="LC0001"  class="form-group col-md-4" >
		                <span class="form-group spanClass03"><i data-domain-id="SPEC_CD"></i></span>
		                <div class="input-group">
		                    <input type="text" class="form-control input-sm" id="specCd" size="10" />
		                        <div class="input-group-btn">
		                            <a class="btn btn-sm btn-primary m-r-5" id="specCdPltPopBtn">
								        <i class="fa fa-search"></i>
							        </a>
		                        </div>
		                </div>
		                <input type="text" class="form-control input-sm" id="specNmPlt" size="15" />
		            </div>

		            <div class="form-group col-md-4">
		                <span class="form-group spanClass03"><i data-domain-id="USE_YN"></i></span><!-- 사용여부 -->
		                <div class="input-group">
		                    <select id="useYnPlt" class="form-control input-sm p-0 input-medium" >
		                        <option value="" ></option>
		                    </select>
		                </div>
		            </div>

				</div>

		        <div class="form-group col-md-12">
		            <div class="input-group pull-right">
		            	<button type="button" id="createPltBtn" class="btn btn-sm btn-warning m-r-5">
							<i class="fa fa-angle-double-down"></i><i data-domain-id="BATCHCREATION_BTN"></i><!-- 일괄생성  -->
						</button>

						<button type="button" id="searchPltBtn" class="btn btn-sm btn-primary m-r-5">
							<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" ></i>
						</button>

						<button type="button" id="addPltRowBtn" class="btn btn-sm btn-info m-r-5">
							<i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" ></i>
						</button>

						<button type="button" id="savePltRowBtn"  class="btn btn-sm btn-success m-r-5">
							<i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
						</button>

						<button type="button" id="delPltRowBtn" class="btn btn-sm btn-danger m-r-5">
							<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" ></i>
						</button>

						<button id="reportPltBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
		                        <i class="fa fa-print"></i><i data-domain-id="PRINT_BTN"></i> <!-- 인쇄 -->
		                </button>

						<button type="button" id="excePltlBtn" class="btn btn-sm btn-primary m-r-5">
							<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" ></i>
						</button>

		            </div>
		        </div>

			</form>
		</div>

		<!-- Grid 생성 -->
		<div class="grid-wrapper" >
			<table id="masterPalletIdGrid"></table>
			<div id="masterPalletIdGridNavi"></div>
		</div>

		<script src="/js/views/master/master_palletId.js"></script>

	</body>
</html>
