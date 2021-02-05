<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>

        <!-- 화면 상단 고객사 구역코드 (TextBox), 조회 저장 삭제 엑셀 Button-->
        <div class= "search-form clearfix">
            <form class="form-inline"  onsubmit="return false;">
                <!-- 조건  -->
                <div class="form-group col-md-12 m-b-10" >
                    <div data-lang="LC0001"  class="form-group col-md-4 clientFlag" >
                        <span class="form-group spanClass03"><i data-domain-id="CLIENT"></i></span><!-- 고객사 -->
                        <div class="input-group">
                        <input type="text" lang="" class="form-control input-sm" id="itemFixLocClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10" />
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5" id="itemFixClientPopup">
                                    <i class="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="itemFixLocClientNm" size="20" value="${sessionScope.s_clientNm_Prioord}"  readonly />
                    </div>
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03"><i data-domain-id="ZONE_CD"></i></span><!-- 존코드 -->
                        <div class="input-group">
                        <input type="text" class="form-control input-sm" id="itemFixZoneCd" size="10" />
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5" id="itemFixZonePopup">
                                    <i class="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="itemFixZoneNm" size="20" readonly />
                    </div>
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03"><i data-domain-id="ITEM_CD"></i></span><!-- 존코드 -->
                        <div class="input-group">
                        <input type="text" class="form-control input-sm" id="itemFixItemCd" size="10" />
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5" id="itemFixItemPopup">
                                    <i class="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="itemFixItemNm" size="20"  readonly/>
                    </div>

                </div>
                <div class="form-group col-md-12" >
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03"><i data-domain-id="LOC_CD"></i></span><!-- 로케이션 코드 -->
                        <div class="input-group">
                        <input type="text" class="form-control input-sm" id="itemFixLocCd" size="10" />
                            <div class="input-group-btn">
                                <a class="btn btn-sm btn-primary m-r-5" id="itemFixLocPopup">
                                    <i class="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="USE_YN"></span>
                        <div class="input-group">
                            <select id="itemFixUseYn" class="form-control input-sm p-0 input-medium"  >
                               <option value="" ></option>
                            </select>
                        </div>
                    </div>


                    <div class="input-group pull-right">
                        <!-- SEARCH_BTN -->
                        <button type="button" id="itemFixLocSearchBtn" class="btn btn-sm btn-primary m-r-5">
                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" ></i>
                        </button>
                        <!-- SAVE_BTN -->
                        <button type="button" id="itemFixLocSaveRowBtn"  class="btn btn-sm btn-success m-r-5">
                            <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
                        </button>
                        <!-- DEL_BTN -->
                        <button type="button" id="itemFixLocDelRowBtn" class="btn btn-sm btn-danger m-r-5">
                            <i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" ></i>
                        </button>
                        <!-- EXCEL_BTN -->
                        <button type="button" id="itemFixLocExcelBtn" class="btn btn-sm btn-primary m-r-5">
                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" ></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <!-- 제품권장로케이션리스트-->
        <div class="grid-wrapper">
            <table id="masterItemFixLocationGrid"></table>
            <div id="masterItemFixLocationGridNavi"></div>
        </div>
        <!-- Content Scope-->
        <div class="content-form clearfix m-b-0">
            <!-- 아이콘 위, 아래-->
            <div class="search-form clearfix" align="center">

                <!-- 버튼 위로-->
                <button type="button" id="upDataList" title="위로" class="btn btn-success" style="min-width: 65px">
                    <i class="fa fa-angle-up"></i>
                </button>

                <!-- 버튼 아래-->
                <button type="button" id="downDataList" title="아래" class="btn btn-success" style="min-width: 65px">
                    <i class="fa fa-angle-down"></i>
                </button>

            </div>

            <!-- 화면 왼쪽 div-->
            <div class="col-md-6 p-r-10">
                <div class="grid-wrapper" >
                    <table id="masterLocationGrid"></table>
                    <div id="masterLocationGridNavi"></div>
                </div>
            </div>

            <!-- 화면 오른쪽 div-->
            <div class="col-md-6 p-l-10 p-r-2">
                <div class="grid-wrapper">
                    <table id="masterItemInLocationGrid"></table>
                    <div id="masterItemInLocationGridNavi"></div>
                </div>
            </div>

        </div>

        <script src="/js/views/master/master_itemFixLocationManagement.js"></script>
    </body>
</html>
