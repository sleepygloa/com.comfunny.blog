<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <!-- Top of specification Screen -->
        <header>
            <div class="" >
                <ol class="breadcrumb pull-right"></ol>
                <h1 class="page-header"></h1>
            </div>

            <div class="search-form clearfix">
                <!-- Main tab Form (Start)-->
                <form class="form-inline"  onsubmit="return false;">
                    <!-- 조건 -->
                    <div class="form-group col-md-12  m-b-10" >
                        <!-- 규격코드 -->
                        <div data-lang="LC0001"  class="form-group col-md-4" >
                            <span class="form-group spanClass03"><i data-domain-id="SPEC_CD"></i></span><!-- 규격코드 -->
                            <div class="input-group">
                                <input type="text" lang="" class="form-control input-sm" id="specificationCd" size="10" />
                                    <div class="input-group-btn">
                                        <a class="btn btn-sm btn-primary m-r-5" id="specPop">
                  			                <i class="fa fa-search"></i>
                  			            </a>
                                    </div>
                            </div>
                            <input type="text" class="form-control input-sm" id="specificationNm" size="15" /><!-- 규격명 -->
                        </div>

                        <div class="form-group col-md-4">
                            <span class="form-group spanClass03"><i data-domain-id="SPEC_TYPE_CD"></i></span><!-- 규격유형코드 -->
                            <div class="input-group">
                                <select id="specificationTypeCd" class="form-control input-sm p-0 input-medium" >
                                    <option value="" data-domain-id="SPEC_TYPE_CD"></option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group col-md-4">
                            <span class="form-group spanClass03" data-domain-id="USE_YN"></span>
                            <div class="input-group">
                                <select id="specUseYn" class="form-control input-sm p-0 input-medium">
                                    <option value="" ></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-12" >

                        <!-- 규격코드 -->
                        <div class="input-group pull-right">
	                        <button type="button" id="specSearchBtn" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i>
	                        </button>

	                        <button type="button" id="specAddRowBtn" class="btn btn-sm btn-info m-r-5">
	                            <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN"></i>
	                        </button>

	                        <button type="button" id="specSaveRowBtn"  class="btn btn-sm btn-success m-r-5">
	                            <i class="fa fa-download"></i><i data-domain-id="SAVE_BTN"></i>
	                        </button>

	                        <button type="button" id="specDelRowBtn" class="btn btn-sm btn-danger m-r-5">
	                            <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN"></i>
	                        </button>

	                        <button type="button" id="specExcelBtn" class="btn btn-sm btn-primary m-r-5">
	                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i>
	                        </button>
	                    </div>
                    </div>
                </form>
            </div>
        </header>
        <section>
            <!-- specification Management UI Grid Create -->
            <div class="grid-wrapper" >
                <table id="specGridJson"></table>
                <table id="specGridJsonNavi"></table>
            </div>
        </section>

        <script src="/js/views/master/master_specification.js"></script>

    </body>
</html>
