<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<style>
.form-group {margin-bottom: 0px;}
</style>
    <body>
        <div id="obInstPageHeaderGrp" class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>
        <div id="obInstSearchHeaderGrp" class="search-form clearfix">
            <form class="form-inline"  onsubmit="return false;">
                <div class="form-group col-md-12 m-b-10">

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="WAVE_NO"></span><!-- 웨이브번호 -->
                        <input type="text" class="form-control input-sm" size="15" id="obInstWaveNo" placeholder=""/>
                    </div><!--End: 웨이브번호 -->

                    <div class="form-group col-md-4">

	                	<span class="form-group spanClass03Asterisk" data-domain-id="OB_YMD"></span>
	                    <input type="text" class="form-control input-sm" id="obInstObYmdFr" size="10"/>
	                    <div class="input-group date" id="obInstObYmdS">
	                    	<input type="hidden" id="obInstObYmdSHid"/>
	                        <div class="input-group-btn">
	                            <a class="btn btn-sm btn-primary m-r-5">
	                                <i class="fa fa-calendar"></i>
	                            </a>
	                        </div>
	                    </div>
                        <!--<label class="control-label">~</label>-->
                        &nbsp; ~ &nbsp;
	                    <input type="text" class="form-control input-sm" id="obInstObYmdTo" size="10"/>
	                    <div class="input-group date" id="obInstObYmdE">
	                    	<input type="hidden" id="obInstObYmdEHid"/>
	                        <div class="input-group-btn">
	                            <a class="btn btn-sm btn-primary m-r-5">
	                                <i class="fa fa-calendar"></i>
	                            </a>
	                        </div>
	                    </div>

                    </div><!--End: 출고일자 -->

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="OB_PROG_ST"></span><!-- 진행상태 -->
                        <div class="input-group">
                            <select class="form-control input-sm p-0 input-medium"  id="obInstObProgStCd">
                                <!-- <option value=""></option> -->
                            </select> <!-- 진행상태 -->
                        </div>
                    </div><!--End: 진행상태 -->

                </div><!--End: form-group 1-->

                <div class="form-group col-md-12 m-b-10">
                    <div data-lang="LC0001"  class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="WAVE_STD_NO"></span><!-- 웨이브번호 -->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="obInstWaveStdNo" size="10" placeholder="" >
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="obInstWaveStdNoPopup">
                                        <i class="fa fa-search"></i>
                                    </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="obInstWaveStdDesc" size="30" placeholder="" readonly="readonly">
                    </div><!-- End: 웨이브기준번호 -->

                    <div data-lang="LC0001"  class="form-group col-md-4 clientFlag" >
                        <span class="form-group spanClass03" data-domain-id="CLIENT"></span><!-- 고객사 -->
                        <div class="input-group">   <!-- type, class ,id, value, ....-->
                            <input type="text" class="form-control input-sm" id="obInstClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10" placeholder="" >
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="obInstClientCdPopup">
                                        <i class="fa fa-search"></i>
                                    </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="obInstClientNm" value="${sessionScope.s_clientNm_Prioord}" size="30" placeholder="" readonly="readonly">
                    </div> <!--End: 고객사, 고객사명-->

                    <div class="form-group col-md-4"><!-- 출력 종류 -->
                        <span class="form-group spanClass03" data-domain-id="OUTPUT_KIND"></span>
                        <div class="input-group">
				        	<select class="form-control input-sm p-0 input-medium" id="outInstReportCd">
					        </select>
                        </div>
                    </div> <!-- End: 출력종류 -->
                </div><!--End: form-group 2-->

                <div class="form-group col-md-12">
                    <div class="input-group pull-right">
                        <button id="obInstSearchBtn" type="button" class="btn btn-sm btn-primary m-r-5">
                            <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!--조회-->
                        </button>
                        <button id="obInstInstBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
                            <i class="fa fa-check"><i data-domain-id="OB_INST"></i></i><!-- 출고지시 -->
                        </button>
                        <button id="obInstCancelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
                            <i class="fa fa-undo"><i data-domain-id="INST_CANCL"></i></i><!-- 지시취소 -->
                        </button>
                        <button id="obInstReportBtn" type="button" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
                            <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i><!-- 인쇄 -->
                        </button>
                        <button id="obInstExceBtn" type="button" class="btn btn-sm btn-primary" data-authRule="AUTH_DOWN">
                            <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!--액셀-->
                        </button>
                    </div>
                </div>

            </form><!--End:.form-inline -->
        </div><!--End:.search-form clearfix -->


        <div class="content-form clearfix m-b-0">
            <div class="form-group col-md-6 p-r-5">
                <!-- 출고Wave-->
                <div class="grid-wrapper">
                  <table id="obInstWaveGrid"></table>
                  <div id="obInstWaveGridNavi"></div>
                </div>
            </div>

            <div class="form-group col-md-6 p-r-5">
                <!-- 출고Wave 상세목록-->
                <div class="grid-wrapper">
                  <table id="obInstWaveDetailGrid"></table>
                  <div id="obInstWaveDetailGridNavi"></div>
                </div>
            </div>

            <div class="form-group col-md-12 p-r-5">
                <div class="grid-wrapper">
                  <table id="obInstDetailGrid"></table>
                  <div id="obInstDetailGridNavi"></div>
                </div>
            </div>

<!--             <div class="form-group col-md-6 p-r-5">
                <div class="grid-wrapper">
                  <table id="obInstGrid"></table>
                  <div id="obInstGridNavi"></div>
                </div>
            </div> -->
        </div>

        <script src="/js/views/outbound/outbound_outboundInstruction.js"></script>
    </body>
</html>
