<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

        <div class="search-form clearfix">
            <!-- Form Creating -->
            <form class="form-inline"  onsubmit="return false;">

                <!-- 조건 -->
                <div class="form-group col-md-12" >
                    <div data-lang="LC0001"  class="form-group col-md-4 clientFlag" >
                        <span class="form-group spanClass03Asterisk"><i data-domain-id="CLIENT"></i></span><!-- 고객사 -->
                        <div class="input-group">
                        <input type="text" lang="" class="form-control input-sm" id="setItemclientCd" value="${sessionScope.s_clientCd_Prioord}" size="10" >
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5" id="clientPopup">
          					        <i class="fa fa-search"></i>
          				        </a>
                            </div>
                        </div>
            			<input type="text" class="form-control input-sm" id="setItemclientNm" value="${sessionScope.s_clientNm_Prioord}" size="30"  readonly />
                    </div>

	                <div class="form-group col-md-4 m-r-10">
	                    <span class="form-group spanClass03"><i data-domain-id="SET_ITEM_CD"></i></span><!-- 세트제품코드 -->
	                    <div class="input-group">
	                        <input type="text" class="form-control input-sm" id="setItemCd" size="10" />
	                            <div class="input-group-btn">
	                                <a class="btn btn-sm btn-primary m-r-5" id="setItemPopBtn">
	                                    <i class="fa fa-search"></i>
	                                </a>
	                            </div>
	                    </div>
                        <input type="text" class="form-control input-sm" id="setItemNm" size="30"  readonly />
                    </div>
              </div>
               <div class="form-group col-md-12" >
                    <div class="input-group pull-right">
                    	<button type="button" id="setItemBomSearchBtn" class="btn btn-sm btn-primary m-r-5">
          				<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
          			    </button>

	          			<button type="button" id="setItemBomExcelBtn" class="btn btn-sm btn-primary m-r-5">
	          				<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
	          			</button>
                	</div>
              </div>

			</form>
        </div>

        <!-- Set Item BOM Management Grid Creating -->
        <div class="grid-wrapper">
          <table id="masterSetItemBomGrid"></table>
          <div id="masterItemBomGridNavi"></div>
        </div>

        <div class="search-form clearfix">
            <form class="form-inline"  onsubmit="return false;">
            <div class="form-group col-md-12 m-t-0 m-b-0">
                <div class="input-group pull-right">
                    <button type="button" id="setItemBomAddRowBtn" class="btn btn-sm btn-info m-r-5">
                        <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN"></i>
                    </button>

                    <button type="button" id="setItemBomSaveRowBtn"  class="btn btn-sm btn-success m-r-5">
                        <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN"></i>
                    </button>

                    <button type="button" id="setItemBomDelRowBtn" class="btn btn-sm btn-danger m-r-5">
                        <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i>
                    </button>
                </div>
            </div>
            </form>
        </div>

        <div class="grid-wrapper">
            <table id="masterSetItemGrid"></table>
            <div id="masterSetItemBomGridNavi"></div>
        </div>

        <script src="/js/views/master/master_setItemBomManagement.js"></script>

    </body>
</html>
