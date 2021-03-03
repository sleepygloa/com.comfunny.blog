<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <body>
        <div class="" >
            <ol class="breadcrumb pull-right"></ol>
            <h1 class="page-header"></h1>
        </div>
         <div class="search-form clearfix">
            <form class="form-inline"  onsubmit="return false;">
                <div class="form-group col-md-12 m-b-10">
                    <div data-lang="LC0001"  class="form-group col-md-4 clientFlag" >
                        <span class="form-group spanClass03Asterisk" data-domain-id="CLIENT"></span><!-- 고객사 -->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="obStoreObLotInquiryClientCd" value="${sessionScope.s_clientCd_Prioord}" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="obStoreObLotInquiryClientPopup">
              				            <i class="fa fa-search"></i>
              			            </a>
                                </div>
                            </div>
                        <input type="text" class="form-control input-sm" id="obStoreObLotInquiryClientNm" value="${sessionScope.s_clientNm_Prioord}" size="30" placeholder="" readonly>
                    </div><!--End 고객사 -->
                    <div class="form-group col-md-4">
                    	<span class="form-group spanClass03Asterisk" data-domain-id="OB_YMD"></span>
	                    <input type='text' class="form-control input-sm" id="obStoreObLotInquiryYmdFr" size="10"/>
	                    <div class='input-group date' id='obStoreObLotInquiryYmdS'>
	                    	<input type="hidden" id="obStoreObLotInquiryYmdSHid"/>
	                        <div class="input-group-btn">
	                            <a class="btn btn-sm btn-primary m-r-5">
	                                <i class="fa fa-calendar"></i>
	                            </a>
	                        </div>
	                    </div>
						&nbsp; ~ &nbsp;
	                    <input type='text' class="form-control input-sm" id="obStoreObLotInquiryYmdTo" size="10"/>
	                    <div class='input-group date' id='obStoreObLotInquiryYmdE'>
	                    	<input type="hidden" id="obStoreObLotInquiryYmdEHid"/>
	                        <div class="input-group-btn">
	                            <a class="btn btn-sm btn-primary m-r-5">
	                                <i class="fa fa-calendar"></i>
	                            </a>
	                        </div>
	                    </div>
                    </div><!--End: 출고일자 -->

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="OB_NO"></span><!-- 출고번호 -->
                        <input type="text" class="form-control input-sm" size="15" id="obStoreObLotInquiryObNo" placeholder=""/>
                    </div><!--End 출고번호 -->
                </div><!--End: Row 1-->

				<!-- Start:row 2 -->
                <div class="form-group col-md-12 m-b-10">
                   <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="STORE"></span><!-- 판매처 -->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="obStoreObLotInquiryStoreCd" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="obStoreObLotInquiryStorePopup">
                                        <i class="fa fa-search"></i>
                                    </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="obStoreObLotInquiryStoreNm" size="30" placeholder="" readonly/>
                    </div><!--End: 판매처-->

                    <div data-lang="LC0001"  class="form-group col-md-4" >
                        <span class="form-group spanClass03" data-domain-id="OB_GBN"></span><!-- 출고구분 -->
                        <div class="input-group">
                            <select class="form-control input-sm p-0 input-medium" id="obStoreObLotInquiryObGbnCd">
                                <option value=""></option>
                            </select><!-- 출고 구분-->
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="CAR_NO"></span><!-- 차량번호 -->
                        <input type="text" class="form-control input-sm" size="15" id="obStoreObLotInquiryCarNo" placeholder=""/>
                    </div>
                </div><!--End: Row 2-->

				<!-- Start:row 3 -->
                <div class="form-group col-md-12 m-b-10">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="RSTORE"></span><!-- 납품처 -->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="obStoreObLotInquiryRstoreCd" size="10" placeholder="">
                                <div class="input-group-btn">
                                    <a class="btn btn-sm btn-primary m-r-5" id="obStoreObLotInquiryRstorePopup">
              				            <i class="fa fa-search"></i>
              			            </a>
                                </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="obStoreObLotInquiryRstoreNm" size="30" placeholder="" readonly="readonly">
                    </div><!-- End: 납품처 -->

                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="SO_NO"></span><!-- 주문번호 -->
                        <input type="text" class="form-control input-sm" size="15" id="obStoreObLotInquirySoNo" placeholder=""/>
                    </div>
                    <div class="form-group col-md-4">
                    	<span class="form-group spanClass03" data-domain-id="ITEM"></span>
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="obStoreObLotInquiryItemCd" maxlength="20" size="10" placeholder=""/>
                            <div class="input-group-btn">
                                <a id="obStoreObLotInquiryItemPopup" class="btn btn-sm btn-primary m-r-5">
                                    <i class="fa fa-search"></i>
                                </a>
                            </div>
                        </div>
                        <input type="text" class="form-control input-sm" id="obStoreObLotInquiryItemNm" maxlength="50" size="30" placeholder="" readonly/>
                    </div>

                </div><!--End: Row 3 -->
               <div class="form-group col-md-12">
                    <div class="form-group col-md-4">
                        <span class="form-group spanClass03" data-domain-id="DELIVERY_DGR"></span><!-- 배송차수 -->
                        <input type="text" class="form-control input-sm" size="15" id="obStoreObLotInquiryDeliveryDgr" placeholder=""/>
                    </div>
                </div><!-- End: Row 4 -->
               <div class="form-group col-md-12">
                    <div class="input-group pull-right">
	                    <button id="obStoreObLotInquirySearchBtn"  type="button" class="btn btn-sm btn-primary m-r-5">
	            			<i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN"></i> <!--검색 버튼 -->
	            		</button>
	                	<button id="obStoreObLotInquiryExcelBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
	            			<i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN"></i> <!-- 엑셀 버튼 -->
	            		</button>
                    </div>
                </div><!-- End: Row 4 -->
            </form>
        </div>

        <div class="grid-wrapper">
          <table id="obStoreObLotInquiry"></table>
          <div id="obStoreObLotInquiryNavi"></div>
        </div>

        <script src="/js/views/outbound/outbound_outboundStoreOutboundLotInquiry.js"></script>

    </body>
</html>
