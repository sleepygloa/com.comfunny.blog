<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>
        <div class="search-form clearfix">
            <form class="form-inline"  onsubmit="return false;">

	            <div class="form-group col-md-12 m-b-10">
	                <div class="form-group col-md-4 clientFlag"><!-- 고객사 -->
	                    <span class="form-group spanClass03Asterisk" data-domain-id="CLIENT"></span>
	                    <div class="input-group">
	                        <input type="text" class="form-control input-sm" id="obTradingStatementClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10"/>
	                        <div class="input-group-btn">
	                            <a id="obTradingStatementClientPopup" class="btn btn-sm btn-primary m-r-5">
	                                <i class="fa fa-search"></i>
	                            </a>
	                        </div>
	                    </div>
	                    <input type="text" class="form-control input-sm" id="obTradingStatementClientNm" value="${sessionScope.s_clientNm_Prioord}" size="30"/>
	                </div><!-- 고객사 끝 -->
	                <div class="form-group col-md-4"><!-- 출고 일자 -->
	                    <span class="form-group spanClass03Asterisk" data-domain-id="OB_PLAN_YMD"></span>
	                    <div class='input-group date' id='obTradingStatementYmdS'>
	                        <input type='text' class="form-control input-sm" id="obTradingStatementYmd" size="10"/>
	                        <div class="input-group-btn">
	                            <a class="btn btn-sm btn-primary m-r-5">
	                                <i class="fa fa-calendar"></i>
	                            </a>
	                        </div>
	                    </div>
	                </div>
	            </div>

                <div class="form-group col-md-12">
                    <div class="input-group pull-right">
                    <button type="button" id="searchObTradingStatementBtn" class="btn btn-sm btn-primary m-r-5">
            			<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i><!--조회-->
            		</button>
                	<button type="button" id="exceObTradingStatementBtn" class="btn btn-sm btn-primary m-r-5">
            			<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i><!--액셀-->
            		</button>
                    </div>
                </div><!--End: Row 4 -->
            </form>
        </div>

        <div class="grid-wrapper">
          <table id="obTradingStatementGrid"></table>
          <!-- <div id="obTradingStatementGridNavi"></div> -->
        </div>

        <script src="/js/views/outbound/outbound_outboundTradingStatement.js"></script>
    </body>
</html>
