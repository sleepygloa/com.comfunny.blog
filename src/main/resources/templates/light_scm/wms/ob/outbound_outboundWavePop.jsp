<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
    <body>
        <div class="modal-header" >
            <button type="button" class="close" data-close-btn="ture">X</button>
            <h4 class="modal-title">paragon Grid</h4>
        </div>

        <div class="modal-body">
	        <div class="search-form clearfix col-xs-w100">
	            <form class="form-inline"  onsubmit="return false;">
   					<div class="input-group col-xs-w100">
						<span class="input-group-addon col-xs-w25 spanclass" data-domain-id="WAVE_STD_NO"></span>
						<input id="outboundWavePopWaveStdNo" type="text" class="form-control" autocomplete="off" readonly />
						<div class="input-group-addon">
						  	<button id="outboundWavePopWaveStdNoPop" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="outboundWavePopWaveStdDesc" type="text" class="form-control"  size="35" readonly>
					</div>
	        	</form>
	        </div>
      	</div>

        <div class="modal-footer">
            <button id="outboundWavePopCreateBtn" type="button"  class="btn btn-sm btn-warning m-r-5">
            	<i class="fa fa-angle-double-down"></i><i data-domain-id="CREATE_BTN" > </i>
            </button>
            <button data-close-btn="ture" type="button"  class="btn btn-sm btn-gray m-r-5">
            	<i class="fa fa-times"></i><i data-domain-id="CLOSE_BTN" > </i>
            </button>
        </div>

        <script src="/js/views/outbound/outbound_outboundWavePop.js"></script>
    </body>
</html>
