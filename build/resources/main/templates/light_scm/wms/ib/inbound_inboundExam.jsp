<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>
	<div id="ibExamPageHeaderGrp" class="" >
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>

	<div id="ibExamContainer" class="container" >
		<div id="ibExamSearchHeaderGrp" class="search-form clearfix" >
	       <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_NO"></span>
						<input id="ibExamNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="CLIENT"></span>
						<input id="ibExamClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="ibExamClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="ibExamClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclassAsterisk" data-domain-id="OB_YMD"></span>
						<input id="ibExamYmdFr" type="text" class="form-control"  size="10"/>

						<div id="ibExamYmdS" class="input-group-addon date" >
							<input id="ibExamYmdSHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
						<div class="input-group-addon">
						  	<button  type="button" class="btn spanclass">
						  		~
							</button>
						</div>
						<input id="ibExamYmdTo" type="text" class="form-control"  size="10"/>
						<div id="ibExamYmdE" class="input-group-addon date" >
							<input id="ibExamYmdEHid" type="hidden" />
						  	<button  type="button" class="btn btn-primary">
						  		<i class="fa fa-calendar"></i>
							</button>
						</div>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_PROG_ST"></span>
	                    <select id="ibExamProgStCd" class="form-control" >
	                        <!-- <option value=""></option> -->
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="CAR_NO"></span>
						<input id="ibExamCarNo" type="text" class="form-control" autocomplete="off" />
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="IB_GBN"></span>
	                    <select id="ibExamGbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 col-wms-hidden">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="OUTPUT_KIND"></span>
	                    <select id="ibExamReport" class="form-control" >
	                    </select>
					</div>

				<!-- 중복되는 부분 -->
				<div class="form-group col-xs-w100 m-b-5">
					<div class="input-group pull-right">
						<button id="searchIbExamBtn" type="button" class="btn btn-sm btn-primary m-r-5">
						    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
						</button>
						<button type="button" id="ibExamConfBtn" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
						    <i class="fa fa-check"></i><i data-domain-id="EXAM_CONF" > </i>
						</button>
						<button type="button" id="ibExamCancelBtn" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
						    <i class="fa fa-undo"></i><i data-domain-id="EXAM_CANCL" > </i>
						</button>
	                    <button type="button" id="reportIbExamBtn" class="btn btn-sm btn-success m-r-5" data-authRule="AUTH_PRINT" >
	                        <i class="fa fa-print"><i data-domain-id="PRINT_BTN"></i></i><!-- 인쇄 -->
	                    </button>
		                <button type="button" id="excelIbExamBtn" class="btn btn-sm btn-primary" data-authRule="AUTH_DOWN">
						    <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
						</button>
					</div>
				</div>
		    </form>
		</div>


		<div id="ibExamHGridGrp" class="col-xs-w100">
			<div>
          		<table id="ibExamHeaderGrid"></table>
         		<div id="ibExamHeaderGridNavi"></div>
			</div>
		</div>

		<div id="outboundWaveSearchDetailGrp" class="search-form clearfix col-xs-w100 ">
			<div class=" col-xs-w100">
				<div class="input-group pull-right">
					<button type="button" id="ibExamAddBtn" class="btn btn-sm btn-info m-r-3" data-authRule="AUTH_NEW">
					    <i class="fa fa-plus"></i><i data-domain-id="ADD_BTN" > </i>
					</button>
					<button type="button" id="ibExamSaveBtn"  class="btn btn-sm btn-success m-r-3" data-authRule="AUTH_NEW AUTH_MOD">
					    <i class="fa fa-save"></i><i data-domain-id="SAVE_BTN" ></i>
					</button>
					<button type="button" id="ibExamDelBtn" class="btn btn-sm btn-danger" data-authRule="AUTH_DEL">
					<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
					</button>
                </div>
            </div>
		</div>

		<div id="ibExamDGridGrp" class="col-xs-w100">
			<div>
	          	<table id="ibExamDetailGrid"></table>
	          	<div id="ibExamDetailGridNavi"></div>
			</div>
		</div>

	</div>

	<script src="/js/views/inbound/inbound_inboundExam.js"></script>
</body>
</html>