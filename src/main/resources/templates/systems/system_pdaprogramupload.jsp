<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
<body>

	<div class="" >
		<ol class="breadcrumb pull-right"></ol>
		<h1 class="page-header"></h1>
	</div>

    <div class="search-form clearfix" >
        <form class="form-inline"  onsubmit="return false;">
            <div class="form-group col-md-12">
				<div class="form-group col-md-3">
					<span class="form-group spanClass03" data-domain-id="PDA_CURR_VER" ></span>
					<div class="input-group">
					    <input type="text" class="form-control input-sm" id="pdaCurrVersion" size="12" disabled>
					</div>
				</div>
                <div class="form-group col-md-3">
                    <span class="form-group spanClass03" data-domain-id="PDA_NEXT_VER" ></span>
					<div class="input-group">
					    <input type="text" class="form-control input-sm" id="pdaNextVersion" size="12">
					</div>
                </div>
                <div class="form-group col-md-3">
                </div>
                <div class="form-group col-md-3">
                    <button type="button" id="fileUploadBtn" class="btn btn-sm btn-warning pull-right">
                        <i class="fa fa-file-excel-o"></i><i data-domain-id="FILE_UPLOAD"></i><!-- 파일업로드 -->
                    </button>
                    <input type="file"  class="form-control input-sm" id="pdaUploadFile" size="10" style="display:none">
                </div>
            </div>
        </form>
    </div>

	<div class="grid-wrapper" >
	    <table id="pdaProgramUploadGrid"></table>
	   <!-- <div id="$pdaProgramUploadGridNavi"></div>  -->
	</div>

	<script src="/js/views/settings/system/system_pdaProgramUpload.js"></script>
	</body>
</html>