 (function ($) {


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	 /********************************************************************
 	 * MENUAL 001 : 해당로우의 dataKey에 value값 삽입
 	 *              rowid값이 없을경우 select된로우에 삽입
 	 ********************************************************************/
 	$.fn.setCell = function(dataKey,value,rowid){
 		var grid = $(this);
 		if(!rowid || rowid ==""){
 			rowid= grid.jqGrid('getGridParam','selrow');
 		}
 		var rowData = grid.getRowData(rowid);
 		var targetValue = rowData[dataKey];
 		if(targetValue && targetValue.length > 0 && targetValue.indexOf('input') > 0 ){
 			var obj = $(targetValue);
 			if(!obj.is( "input[type='text']" ) ){
 				var el = $("#"+rowid+"_"+dataKey);
 				if(!el.is("input[type='text']")){
 					var elinput = $("#"+rowid+"_"+dataKey+"_INPUT");
 					if(elinput.is("input[type='text']")){
 						elinput.attr("value",value);
 					}else{
	 					var targetObj = obj.find("input")[0];
	 					$(targetObj).val(value);
 					}
 				}else{
 					el[0].val(value);
 				}
			}else{
				$("#"+obj.attr("id")).val(value);
			}

		}else{
//			var editMode = grid.data("edit-mode");
//			if(editMode){
//				grid.jqGrid('editRow',rowid,false,'clientArray');
//				grid.jqGrid('setCell', rowid, dataKey, value);
//				startEditModeRow(grid,rowid);
//			}else{
				grid.jqGrid('setCell', rowid, dataKey, value);
//				grid.jqGrid('saveRow',rowid,false,'clientArray');
//			}
		}
 	}


 	/********************************************************************
	 * MENUAL 005 : 그리드에서 수정된  로우데이터를 가져온다
	 *              getGridData(obj, true) 호출시 미수정 데이터도 리턴
	 ********************************************************************/
	$.fn.getGridData = function(camelObj,allFlag){
		var grid = $(this);
		var gridRowData = grid.getRowData();
		var rtnArrayData = [];
		if(camelObj){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" || allFlag){
					var rtnRowData = fnObjToCamel(gridRowData[i],camelObj);
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ||  allFlag ){
					var rtnRowData = fnCheckInput(gridRowData[i]);
					rtnArrayData.push(rtnRowData);
				}
			}
		}
//		var editMode = grid.data("edit-mode");
//		if(editMode){
//			startEditMode(grid);
//		}
		return rtnArrayData;
	}

	/********************************************************************
 	 * MENUAL 005 : 해당로우의 object또는dataKey가 존제시 value값을 리턴
 	 *              rowid값이 없을경우 select된로우값 리턴
 	 ********************************************************************/
 	$.fn.getRow = function(rowid,dataKey,all){
		var grid = $(this);
		if(!rowid || rowid ==""){
			rowid= grid.jqGrid('getGridParam','selrow');
		}
		if(!rowid){
			return false;
		}
		var rowData = grid.getRowData(rowid);
		var returnData = fnCheckInput(rowData,all,rowid);
		if(dataKey != "" && typeof dataKey == "string"){
			return returnData[dataKey];
		}else if(typeof dataKey == "object"){
			return fnObjToCamel(rowData,dataKey);
		}
		return returnData;
	}

	/*****************************(공통)*********************************
	 * MENUAL 000 : 해당데이터에 input이 있을경우 값을 input값 변경
	 ********************************************************************/
	function fnCheckInput(rowData, all,rowid){
		if(!all){
			delete rowData["MOD_CHECK"];
			delete rowData["MOD_VAL"];
		}
		var returnData = {};
		$.each( rowData, function( key, value ) {
			if(value.length > 0 && value.indexOf('input', 1) > 0 ){
				var obj = $(value);
				if(obj.is( "input[type=radio]" ) ){
					value = obj.is(":checked") ?"Y":"N";
					returnData[key] = value;
				}else if(!obj.is( "input[type='text']" ) ){
					returnData[key] =obj.find("input[type='text']").val();
				}else{
					returnData[key] = $("#"+obj.attr("id")).val();
				}
			}else{
				var selectEl = $("select#"+rowid+'_'+key);
				if(selectEl.is("select")){
					returnData[key] = selectEl.val();
				}else{
					returnData[key] = value;
				}
			}
		});
		return returnData;
	}


	/*****************************(공통)*********************************
	 * MENUAL 000 : 해당데이터로우 데이터에서 원하는 값을 camel로 변경
	 ********************************************************************/
	function fnObjToCamel(dataObj, camelObj){

		var returnData = {};
		$.each( camelObj, function( camelKey, camelValue ) {
			if(camelValue.gridClass){
				var tempObj = $("<div/>");
				tempObj.html(dataObj[camelValue.gridKey]);
				var objValue = tempObj.find("."+camelValue.gridClass).text();
				rtnRowData[camelKey] = objValue;
			}else{
				var objValue = dataObj[camelValue];
				if(objValue){
					if(objValue.length > 0 && objValue.indexOf('input', 1) > 0 ){
						var el = $(objValue);
						if(el.is( "input[type=radio]" ) ){
							returnData[camelKey] = el.is(":checked") ?"Y":"N";
						}else{
							returnData[camelKey] = $("#"+el.attr("id")).val();
						}
					}else if(objValue.length > 0 && objValue.indexOf('button', 1) > 0 ){
						returnData[camelKey] = "";
					}else{
						returnData[camelKey] = objValue;
					}
				}else{
					returnData[camelKey] = "";
				}
			}
		});
		return returnData;
	}

	/*****************************(공통)*********************************
	 * MENUAL 000 : 그리드(grid)수정모드로 변경
	 ********************************************************************/
    function startEditModeRow(grid,ids) {
    	var model = grid.jqGrid('getGridParam', 'colModel');

		var rowData = grid.getRowData( ids );
		if(rowData.MOD_VAL == ""){
			var thissVal = "";
			for (var f = 0; f < model.length; f++) {
				if (model[f].editable) {
					thissVal += (rowData[model[f].name] + "|");
				}
			}
			grid.jqGrid('setCell', ids, 'MOD_VAL', thissVal);
		}
		if(rowData.MOD_FLAG != "INSERT"){
			for (var g = 0; g < model.length; g++) {
				if (model[g].disabled) {
					$("#"+ids+"_"+model[g].name).prop("disabled",true);
					$("#"+ids+"_"+model[g].name).css("background","#f0f0f0");
				}
			}
		}
		var inputs =  grid.find("#"+ids+".jqgrow[role='row'] input[type='text']");
		inputs.data("row-id",ids);
		inputs.on("focus", function() {
			var rowid = $(this).data("row-id");
			var lastSelection = grid.data("lastSelection");
			grid.setSelection(rowid,false);
			if(lastSelection != rowid ){
				grid.data("lastSelection",rowid);
				if(lastSelection && lastSelection != ""){
					fnChkModFlag(grid,lastSelection);
				}
			}
		});
		var buttons =  grid.find("#"+ids+".jqgrow[role='row'] button");
		buttons.data("row-id",ids);
		buttons.on("focus", function() {
			var rowid = $(this).data("row-id");
			var lastSelection = grid.data("lastSelection");
			grid.setSelection(rowid,false);
			if(lastSelection != rowid ){
				grid.data("lastSelection",rowid);
				if(lastSelection && lastSelection != ""){
					fnChkModFlag(grid,lastSelection);
				}
			}
		});
    };


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	 //$callObsRectStsGrid = $callObsRectStsGrid.removeGrid();
	 $.fn.removeGrid = function(){
		 var grid = $(this);
//		 var gridWapper = grid.parent();
//		 alert(gridWapper.attr("id"));
		 var gridId = $(this).attr("id");
		 var gridWapper =  $("#"+gridId+"_wrap");
		 var newGrid = $("<table/>",{id:gridId});
		 gridWapper.html("");
		 gridWapper.html(newGrid);
		 return newGrid;

	 }


	 $.fn.getCaption = function(){
		 var id = $(this).attr("id");
		 var caption = $("#"+id+"_caption").text();
		 return caption;
	 }
	 // 수정모드시 로우 데이터 삭제
	$.fn.paragonGridSelectDelete = function(){
		var grid = $(this);
    	var rowid= grid.jqGrid('getGridParam','selrow');
    	var ids = grid.getDataIDs();


    	if(rowid === null){
    		alert("삭제할 행을 선택해주세요.");
    		return;
    	}

    	var gridId = grid.attr("id");
    	var rowData = grid.getRowData(rowid);
    	var model = grid.jqGrid ('getGridParam', 'colModel');
    	var lastOriVal = rowData.MOD_VAL;

    	if(rowData.MOD_FLAG == "INSERT"){
    		grid.jqGrid('delRowData',rowid);
    	}else if(rowData.MOD_FLAG == "DELETE" ){
//			console.log(lastOriVal);
			var lastVal = "";
			for (var f = 0; f < model.length; f++) {
				if (model[f].editable) {
					lastVal += (rowData[model[f].name] + "|");
				}
			}
			if (lastOriVal != lastVal && lastOriVal != "") {
				grid.jqGrid('setCell', rowid, 'MOD_CHECK','<i class="fa fa-check" />');
				grid.jqGrid('setCell', rowid, 'MOD_FLAG','UPDATE');
			} else {
				grid.jqGrid('setCell', rowid, 'MOD_CHECK', null);
				grid.jqGrid('setCell', rowid, 'MOD_FLAG', null);
			}

    	}else{
			grid.jqGrid('setCell',rowid,'MOD_FLAG','DELETE');
			grid.jqGrid('setCell',rowid,'MOD_CHECK','<i class="fa fa-check text-danger" />');
			$("#jqg_"+gridId+"_" + rowid).prop("checked", true);
    	}
	}
	$.fn.selectRowData = function(dataKey){
		var grid = $(this);
		var rowid= grid.jqGrid('getGridParam','selrow');
		var rowData = grid.getRowData(rowid);
		var returnData;
		if(dataKey){
			returnData = rowData[dataKey];
			if(!returnData){
				returnData = false;
			}
		}else{
			returnData = rowData;
		}
		return returnData;
	}
	$.fn.focusRowData = function(dataKey){
		var grid = $(this);
//		var rowid= grid.jqGrid('getGridParam','selrow');
		var rowid= grid.find("tbody > tr.jqgrow.focus-row").attr('id');
//		$("#"+rowid).addClass("focus-row");
		var rowData = grid.getRowData(rowid);
		var returnData;
		if(dataKey){
			returnData = rowData[dataKey];
			if(!returnData){
				returnData = false;
			}
		}else{
			returnData = rowData;
		}
		return returnData;
	}
	$.fn.focusRemove = function(){
		var grid = $(this);
		grid.find("tbody > tr.jqgrow").removeClass("focus-row");
	}
	$.fn.focusToRow = function(){
		var grid = $(this);
		var rowid= grid.jqGrid('getGridParam','selrow');
		grid.find("tbody > tr.jqgrow").removeClass("focus-row");
		$("#"+rowid).addClass("focus-row");
	}
	// 수정모드시 로우 데이터 삭제
	$.fn.paragonGridCrear = function(){
		var grid = $(this);
		var ids = grid.getDataIDs();
        for (var i = 0; i < ids.length; i++) {
        	grid.jqGrid('delRowData',ids[i]);
        }

	}

	/**
	 * 그리드에서 선택한 row수 반환
	 * */
	$.fn.checkedGridCount = function(){
		var grid = $(this);
		return grid.jqGrid('getDataIDs').length;
	}


	// 수정모드시 체크박스 데이터 삭제
	$.fn.paragonGridCheckedDelete = function(){
		var grid = $(this);
		var gridCheckRowIds = grid.getGridParam('selarrrow');

		var rowLen = gridCheckRowIds.length;
		if(gridCheckRowIds.length == 0 ){
			alert("삭제할 행을 선택해주세요.");
			return;
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');
		var gridId = grid.attr("id");

		for (var i = 0; i < rowLen; i++) {
			//TODO 그리드 로우삭제시 변수 배열이 삭제되는 현상(버그) 0번째로만 가져오기로 처리
			var rowid= gridCheckRowIds[0];
			var rowData = grid.getRowData(rowid);

			var lastOriVal = rowData.MOD_VAL;
			if(rowData.MOD_FLAG == "INSERT"){

				grid.jqGrid('delRowData',rowid);
			}else if(rowData.MOD_FLAG == "DELETE" ){
//				console.log(lastOriVal);
				var lastVal = "";
				for (var f = 0; f < model.length; f++) {
					if (model[f].editable) {
						lastVal += (rowData[model[f].name] + "|");
					}
				}
				if (lastOriVal != lastVal && lastOriVal != "") {
					grid.jqGrid('setCell', rowid, 'MOD_CHECK','<i class="fa fa-check" />');
					grid.jqGrid('setCell', rowid, 'MOD_FLAG','UPDATE');
				} else {
					grid.jqGrid('setCell', rowid, 'MOD_CHECK', null);
					grid.jqGrid('setCell', rowid, 'MOD_FLAG', null);
				}

			}else{
				grid.jqGrid('setCell',rowid,'MOD_FLAG','DELETE');
				grid.jqGrid('setCell',rowid,'MOD_CHECK','<i class="fa fa-check text-danger" />');
			}
		}

	}
	// 중복키 체크 : 조회된 그리드에서만 체크 로컬만 사용
	$.fn.checkOverLap = function(key, value, rowid){
		var grid = $(this);
		var ids = grid.jqGrid('getDataIDs');
        for (var i = 1; i <= ids.length; i++) {
        	if (rowid != ids[i]) {
        		var lastRowData = grid.getRowData(ids[i]);
				if (lastRowData[key] == value) {
					return true;
				}
			}
        }
		return false;
	}
	// 수정모드시 수정된데이터 json 으로 변환
	$.fn.getJsonDeleteData = function(dataTableName, getData){
		var grid = $(this);

		var lastSelection = grid.data("lastSelection");
		var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');

		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;

		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
			}
		}
		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
			grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');





		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;

			var lastVal = "";
			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
		}



		var gridRowData = grid.getRowData();
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" && gridRowData[i].MOD_FLAG != "DELETE" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						if(value.gridClass){
							var obj = $("<div/>");
							obj.html(gridRowData[i][value.gridKey]);
							var objValue = obj.find("."+value.gridClass).text();
							rtnRowData[key] = objValue;
						}else{
							rtnRowData[key] = gridRowData[i][value];
						}
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			var returnJsonData = {};
			returnJsonData[dataTableName] = rtnArrayData;
			return JSON.stringify(returnJsonData);
		}
	}
	$.fn.getJsonData = function(dataTableName, getData, addedParams){
		var grid = $(this);

		var lastSelection = grid.data("lastSelection");
		var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');

		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;

		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
			}
		}
		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
	        grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}
        var model = grid.jqGrid ('getGridParam', 'colModel');





		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;

			var lastVal = "";
			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
        }



		var gridRowData = grid.getRowData();
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						if(value.gridClass){
							var obj = $("<div/>");
							obj.html(gridRowData[i][value.gridKey]);
							var objValue = obj.find("."+value.gridClass).text();
							rtnRowData[key] = objValue;
						}else{
							rtnRowData[key] = gridRowData[i][value];
						}
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			if(addedParams){
				addedParams[dataTableName] = rtnArrayData;
				return JSON.stringify(addedParams);
			}else{
				var returnJsonData = {};
				returnJsonData[dataTableName] = rtnArrayData;
				return JSON.stringify(returnJsonData);

			}
		}
	}

	$.fn.getJsonDeleteData = function(dataTableName, getData){
		var grid = $(this);

		var lastSelection = grid.data("lastSelection");
		var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');

		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;

		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
			}
		}
		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
			grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');





		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;

			var lastVal = "";
			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
		}



		var gridRowData = grid.getRowData();
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" && gridRowData[i].MOD_FLAG != "DELETE" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						if(value.gridClass){
							var obj = $("<div/>");
							obj.html(gridRowData[i][value.gridKey]);
							var objValue = obj.find("."+value.gridClass).text();
							rtnRowData[key] = objValue;
						}else{
							rtnRowData[key] = gridRowData[i][value];
						}
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			var returnJsonData = {};
			returnJsonData[dataTableName] = rtnArrayData;
			return JSON.stringify(returnJsonData);
		}
	}

	$.fn.getSelectedJsonData = function(dataTableName,getData ,addedParams){
		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
			}
		}
		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
	        grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');

		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;
			var lastVal = "";

			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
		}



		var gridRowData = grid.getGridParam('selarrrow');
		var rtnArrayData = [];
		if(getData){
			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};

				$.each( getData, function( key, value ) {
					if((key.toUpperCase()).indexOf('YMD') != -1){
						rtnRowData[key] = WMSUtil.fnDateSetting.yyyymmdd(grid.getRowData(gridRowData[i])[value]);
					}else{
						rtnRowData[key] = grid.getRowData(gridRowData[i])[value];
					}
				});

				rtnArrayData.push(rtnRowData);
			}

		}else{

			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};
				$.each( rowKeys, function(key) {
					rtnRowData[key] = grid.getRowData(gridRowData[i])[key];
				});
				rtnArrayData.push(rtnRowData);
			}

		}

		if(rtnArrayData.length == 0){
			return false;
		}else{
			if(addedParams){
				addedParams[dataTableName] = rtnArrayData;
				return JSON.stringify(addedParams);
			}else{
				var returnJsonData = {};
				returnJsonData[dataTableName] = rtnArrayData;
				return JSON.stringify(returnJsonData);

			}
		}
	}
	// 수정모드시 수정된데이터 json 으로 변환
	$.fn.getObjectData = function(dataTableName,getData){
		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
			}
		}
		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
	        grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');

		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;

			var lastVal = "";
			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
		}



		var gridRowData = grid.getRowData();
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						rtnRowData[key] = gridRowData[i][value];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			var returnJsonData = {};
			returnJsonData[dataTableName] = rtnArrayData;
			return returnJsonData;
		}
	}
	// 수정모드시 수정된데이터 json 으로 변환
	$.fn.getSelectedObjData = function(dataTableName,getData,addedParams){
		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
			}
		}
		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
	        grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');

		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;
			var lastVal = "";

			var lastVal = "";
			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
		}



		var gridRowData = grid.getGridParam('selarrrow');
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						rtnRowData[key] = gridRowData[i][value];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			if(addedParams){
				addedParams[dataTableName]  =rtnArrayData;
				return addedParams;
			}else{
				var returnJsonData = {};
				returnJsonData[dataTableName] = rtnArrayData;
				return returnJsonData;
			}
		}
	}
	// 체크된 데이터 가져오기 obj
	$.fn.getSelectedData = function(getData){
		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
			}
		}
		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
	        grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');

		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;
			var lastVal = "";

			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
		}



		var gridRowData = grid.getGridParam('selarrrow');
		var rtnArrayData = [];

		var rowKeys = grid.getRowData(gridRowData[1]);
		delete rowKeys["MOD_VAL"];
		delete rowKeys["MOD_CHECK"];
		for (var i = 0; i < gridRowData.length; i++) {
			var rtnRowData = {};

			$.each( getData, function( key, value ) {
				if((key.toUpperCase()).indexOf('YMD') != -1){
					rtnRowData[key] = WMSUtil.fnDateSetting.yyyymmdd(grid.getRowData(gridRowData[i])[value]);
				}else{
					rtnRowData[key] = grid.getRowData(gridRowData[i])[value];
				}
			});
			rtnArrayData.push(rtnRowData);
		}

		if(rtnArrayData.length == 0){
			return false;
		}else{
			return rtnArrayData;
		}
	}

	// 수정모드시 수정된데이터 jsonParams 으로 변환
	$.fn.getJsonSelectedParamsData = function(dataTableName,getData,addedParmas){

		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
			}
		}
		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
	        grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');

		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;

			var lastVal = "";
			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
		}



		var gridRowData = grid.getGridParam('selarrrow');
		var rtnArrayData = [];
		if(getData){
			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};

				$.each( getData, function( key, value ) {
					if((key.toUpperCase()).indexOf('YMD') != -1){
						rtnRowData[key] = WMSUtil.fnDateSetting.yyyymmdd(grid.getRowData(gridRowData[i])[value]);
					}else{
						rtnRowData[key] = grid.getRowData(gridRowData[i])[value];
					}
				});

				rtnArrayData.push(rtnRowData);
			}

		}else{

			var rowKeys = grid.getRowData(gridRowData[1]);
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				var rtnRowData = {};
				$.each( rowKeys, function(key) {
					if((key.toUpperCase()).indexOf('YMD') != -1){
						rtnRowData[key] = WMSUtil.fnDateSetting.yyyymmdd(grid.getRowData(gridRowData[i])[key]);
					}else{
						rtnRowData[key] = grid.getRowData(gridRowData[i])[key];
					}
				});
				rtnArrayData.push(rtnRowData);
			}

		}

		if(rtnArrayData.length == 0){
			return false;
		}else{
			addedParmas[dataTableName] = rtnArrayData;
			return JSON.stringify(addedParmas);
		}


	}
	// 수정모드시 수정된데이터 jsonParams 으로 변환
	$.fn.getJsonParamsData = function(dataTableName,getData,addedParmas){
		var grid = $(this);
		var lastSelection = grid.data("lastSelection");
        var lastCellSelection = grid.data("lastCellSelection");
		// 미저장 로우 저장
		var ids = grid.jqGrid('getDataIDs');
		var options=  grid.jqGrid('getGridParam');
		var celEditable = options.cellEditable;

		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
				return;
			}
		}

		if(celEditable){
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
	        grid.jqGrid('setGridParam', {cellEdit: true});
			grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
			grid.jqGrid('setGridParam', {cellEdit: false});
		}else{
			for (var i = 1; i <= ids.length; i++) {
				grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
			}
		}
		var model = grid.jqGrid ('getGridParam', 'colModel');

		if (lastSelection) {
			var lastRowData = grid.getRowData(lastSelection);
			var lastOriVal = lastRowData.MOD_VAL;
			var lastModCheck = lastRowData.MOD_CHECK;
			var lastModFalg = lastRowData.MOD_FLAG;
			var lastVal = "";

			for (var i = 0; i < model.length; i++) {
				if (model[i].editable) {
					lastVal += (lastRowData[model[i].name] + "|");
				}
			}
			var gridId = grid.attr("id");
			if (lastOriVal != lastVal) {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
					if (lastModCheck == "" || lastModFalg == "DELETE") {
						grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
					}
				}
			} else {
				if (lastModFalg != "INSERT") {
					grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
					grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
				}
			}
			grid.data("lastSelection","");
		}



		var gridRowData = grid.getRowData();
		var rtnArrayData = [];


		if(getData){
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( getData, function( key, value ) {
						rtnRowData[key] = gridRowData[i][value];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}else{
			var rowKeys = gridRowData[0];
			delete rowKeys["MOD_VAL"];
			delete rowKeys["MOD_CHECK"];
			for (var i = 0; i < gridRowData.length; i++) {
				if(gridRowData[i].MOD_CHECK != "" ){

					var rtnRowData = {};
					$.each( rowKeys, function(key) {
						rtnRowData[key] = gridRowData[i][key];
					});
					rtnArrayData.push(rtnRowData);
				}
			}
		}


		if(rtnArrayData.length == 0){
			return false;
		}else{
			addedParmas[dataTableName] = rtnArrayData;
			return JSON.stringify(addedParmas);
		}
	}



	// 수정모드시 행추가
	$.fn.paragonGridAddRow = function(callBack){
		var lastSelection = $(this).data("lastSelection");
		var lastCellSelection = $(this).data("lastCellSelection");

		var lastSelectionIdx = $(this).data("lastSelectionIdx");

		var options=   $(this).jqGrid('getGridParam');
		var celEditable = options.cellEditable;
		var maxRowId = $(this).data("maxRowId");




		if(options.onSaveRowValidate){
			if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,$(this))){
				return;
			}
		}
		if(lastCellSelection){
			$(this).jqGrid('setGridParam', {cellEdit: true});
			$(this).jqGrid('saveCell', lastSelection, lastCellSelection, true);
			$(this).jqGrid('setGridParam', {cellEdit: false});
		}

		$(this).jqGrid('saveRow',lastSelection,false,'clientArray');
 		//jqGrid 기본값
 		var settings = $.extend({
 			addData : "",
			startCallBack : null
        }, callBack );

 		if(settings.startCallBack){
			if(!settings.startCallBack()){
				return;
			}
		}
 		var initDefaultdata = {'MOD_FLAG':'INSERT','MOD_CHECK':'<i class="fa fa-check" />'};
 		$.each( settings.addData, function( key, value ) {
 			initDefaultdata[key] = value;
		});
    	var ids = $(this).getDataIDs();
    	var thisRowId = "add"+(ids.length+1);

    	if($.isNumeric(maxRowId)){
    		thisRowId = "add"+(parseInt(maxRowId)+1);
    	}else if(maxRowId){
    		var numid = maxRowId.substring(3);
    		thisRowId = "add"+(parseInt(numid)+1);
    	}
		var parameters ={
		    rowID : thisRowId ,
		    initdata : initDefaultdata,
		    position :"first",
		    useDefValues : false,
		    useFormatter : false,
		    addRowParams : {extraparam:{}}
		}
		$(this).jqGrid('addRow',parameters);
		$(this).jqGrid('editRow',thisRowId, {keys: true} );
		$(this).data("lastSelection",thisRowId);
		$(this).data("lastSelectionIdx",1);
		$(this).data("lastCellSelection",null);
		$(this).data("maxRowId",thisRowId);
	}
	// 수정모드시 행추가
//	$.fn.paragonGridAddRow = function(){
//		var ids = $(this).getDataIDs();
//		var parameters ={
//				rowID : ids.length+1,
//				initdata : {'MOD_FLAG':'INSERT','MOD_CHECK':'<i class="fa fa-check" />'},
//				position :"first",
//				useDefValues : false,
//				useFormatter : false,
//				addRowParams : {extraparam:{}}
//		}
//		$(this).jqGrid('addRow',parameters);
//		$(this).jqGrid('editRow',ids.length+1, {keys: true} );
//		$(this).data("lastSelection",ids.length+1);
//	}


	//수정데이터 여부 확인 - 전송할 데이터가 있을시 false
	$.fn.paragonGridModCheck = function(){
		var data = $(this).getRowData();
		for (var i = 0; i < data.length; i++) {
			if(data[i].MOD_FLAG != "" ){
				break;
				return false;
			}
		}
		return true;
	}

	//수정데이터 여부 확인 - 전송할 데이터가 있을시 false
	$.fn.paragonGridModConfirm = function(msg){
		var data = $(this).getRowData();
		for (var i = 0; i < data.length; i++) {
			if(data[i].MOD_FLAG != "" ){
				if(confirm(msg)){
					$(this).data("lastSelection","");
					return true;
				}else{
					return false;
				}
			}
		}
		$(this).data("lastSelection","");
		return true;
	}

    function itoStr($num){
        $num < 10 ? $num = '0'+$num : $num;
        return $num.toString();
    }

	$.fn.downloadExcel = function(){
		var getRowData = $(this).getRowData();
	    var options = $(this).jqGrid('getGridParam');


	    var columnIds = options.columnIds;
        var columnNms = options.columnNms;
        var sheetNm = options.caption;
        var colDataType = options.colDataType;



        var date = new Date();
        var year =  itoStr( date.getFullYear() );
        var month = itoStr( date.getMonth() + 1 );
        var day =   itoStr( date.getDate() );
        var hour =  itoStr( date.getHours() );
        var mins =  itoStr( date.getMinutes() );

        //엑셀 파일명 지정
        if(sheetNm == '' || sheetNm.indexOf(':') != -1){
            sheetNm = 'Excel_NoName_' + year + month + day + "_" + hour + mins;
        }else{
//            sheetNm = 'Excel_' + sheetNm + '_' + year + month + day + "_" + hour + mins;
            sheetNm = 'Excel_' +year + month + day + "_" + hour + mins;
        }

	    if(getRowData.length == 0){
            alert("조회된 데이터가 없습니다.");
            return;
        }
	    /**
	     * exVer = 1. 97, 2. ooxml
	     * exExt = 1. xls, 2.xlsx
	     * */

        var sendData={
                "sheetNm"	: sheetNm,
                "columnNms"	: columnNms,
                "columnIds"	: columnIds,
                "dataType" 	: colDataType,
                "dt_grid"	: getRowData,
                "ver" 		: "1",
                "ext"		: ".xlsx"
        };

        var jsonData = JSON.stringify(sendData);

        App.prcsStart();
         $.ajax({
             url		: '/ctrl/comm/download/excel',
             data		: jsonData,
             contentType: 'application/json; charset=utf-8',
             success	: function(data) {
            	 console.log('excel download success');
                 if(data.stsCd == 100){
                	 console.log('excel download 100');
                     alert(data.msgTxt);
                 }else{
                	 console.log('excel download 200');

                     //filePath 경로, saveFileName 경로의 엑셀파일명, downFileName 다운로드받을 파일명 지정
                     var a = document.createElement("a");
                     a.href = '/ctrl/comm/download/excel/file?filePath='+data.filePath+'&saveFileName='+data.saveFileName+'&downFileName='+encodeURI(sendData.sheetNm) + sendData.ext;
                     document.body.appendChild(a);
                     a.click();
                 }
             },
             complete : function(){
                 App.prcsEnd();
             }
         });
	}


 	$.fn.paragonGrid = function(options) {
 		var proCd = $(".main-tab.active > a").data("procd");
 		var chkcell = {};
 		//jqGrid 기본값
 		var settings = $.extend({
 			url: '',
 			componentUrl:'/ctrl/settings/system/domain/listColnames',
 			componentId:'',
            mtype: "GET",
            datatype: "json",
            pageable: true,
            rowEditable: false,
            cellEditable: false,
            firstData: true, // TODO 초기데이터 안불러옴
            cellsubmit : 'clientArray',
//            cellEdit: true,
            page: 1,
            height: 530,
            rowHeight:"M",
            autowidth: true,
            multiselectone: false, // TODO 체크박스 라디오 버튼처럼
            rowNum: 5, //WMS 100
            rowList: [5, 10, 15, 30], //[100, 200, 300, 500]
            colModel:[],
            colNames:[],
            customModel:[],
            customMode:"",
            data:{},
            domainId: null,
            headerNms: [],
            columnIds: [],
            columnNms: [],
            colDataType : [], //column Parsing 시 컬럼의 dataType 파악하기 위해 사용
//            paragonColNames : [],
            loadonce: true, //webapp -> true, origin default : false;
            loadCount : -1, //customising --> 화면 생성 후 그리드가 조회될때마다 카운트 증가됨.
//            afterEditCell: function (rowid, cellName, cellValue, iRow, iCol) {
//                var cellDOM = this.rows[iRow].cells[iCol], oldKeydown,
//                    $cellInput = $('input, select, textarea', cellDOM),
//                    events = $cellInput.data('events'),
//                    $this = $(this);
//                if (events && events.keydown && events.keydown.length) {
//                    oldKeydown = events.keydown[0].handler;
//                    $cellInput.unbind('keydown', oldKeydown);
//                    $cellInput.bind('keydown', function (e) {
//                        $this.jqGrid('setGridParam', {cellEdit: true});
//                        oldKeydown.call(this, e);
//                        $this.jqGrid('setGridParam', {cellEdit: false});
//                    }).bind('focusout', function (e) {
//                        $this.jqGrid('setGridParam', {cellEdit: true});
//                        $this.jqGrid('saveCell', iRow, iCol);
//                        $this.jqGrid('setGridParam', {cellEdit: false});
//                        $(cellDOM).removeClass("ui-state-highlight");
//                    });
//                }
//            },
            reportExcelBtn: false,
            reportPreBtn: false,
            reportPdfBtn: false,
            onClickPdfBtn: null,
            onClickExcelBtn: null,
            onClickPreBtn: null,
            onClickPreBtnDefault: onClickPreBtnDefault,
            onClickPdfBtnDefault: onClickPdfBtnDefault,
            onClickExcelBtnDefault: onClickExcelBtnDefault,
            ajaxGridOptions: {
     			headers: {
    	 			"AjaxType":"paragon",
    	 			"proCd": proCd
     	    	},
 				type : "GET",
     	    	error : function(jqXHR, textStatus, errorThrown) {
     	    		if(jqXHR.status != ""){
     	    			if(jqXHR.status === 404 ) {
     	    				alert("일시적이 오류가 발생했습니다.\n담장자에게 문의하세요.");
     	    			}else if(jqXHR.status === 999 ) {
     	    				alert(jqXHR.responseText);
     	    				PopApp.paragonOpenPopup({
     	 			    		ajaxUrl: '/ctrl/sign/loginPopup',
     	 			    		id: 'loginPopup',
     	 			    		width: '400px',
     	 			    		btnName:"로그인",
     	 			    		title:"로그인",
     	 			    		onload:function(modal){
     	 			    			modal.show();
     	 			    		}
     	 			    	});
     	    			}else if(jqXHR.status === 997 ) {
     	    				var jsonData = $.parseJSON(jqXHR.responseText);
     	    				alert(jsonData.errMsg);
//     	    			}else{
//     	    				alert(jqXHR.responseText);
     	    			}
     	    		}
     	        }
     		},
            navgrid:{
            	edit: false,
     			add: false,
     			del: false,
     			search: false,
     			refresh: true
            },
            checkBox : {
				editable : true,
				align : "center",
				edittype : "checkbox",
				editoptions : {
					value : "Y:N"
				},
				formatter : "checkbox",
				formatoptions : {
					disabled : false
				}
			},
			sortable : false,
			rowspan: false,
			onSaveRowValidate : null,
			onSelectRowEvent : null,
			gridComplete:function(){},
			groupHeaders:[],
			rowClickFocus:false,
			onCheckedEvent:false,

//            sortable: function (permutation) {
//                alert ('permutation=' + permutation);
//            },
            gridResize : {}
        }, options );
 		/**
 		url				: 그리드 목록조회,
		componentUrl	: '/settings/system/language/listLangColumns', 언어 컬럼 조회 기본 URL
		componentId		: '', 컴포넌트 아이디 언어 변환
        mtype			: "GET",
        datatype		: "json",
        pageable		: true, 	자동 페이징 처리 true시 자동 카운트 조회됨
        rowEditable		: false,	그리드 수정,저장,삭제 행추가 기능 사용여부
        page			: 1,		시작시 페이지
        height			: 530,		그리드 기본 높이
        autowidth		: true,
        rowList			: [15, 30, 50,100], 로우 싸이즈 콤보박스
        colNames		:[],		컬럼명 (갯수가 colModel보다 작거나 같아야 함)
        colModel		:[],		로우 모델
        customModel		:[],		서버에서 생성된 모델 componentUrl 수정으로 직접 데이서 생성해서 매핑 가능
        rowNum			: 15,		기본  그리드 리스트수
        navgrid:{
        	edit		: false, 	jqGrid API 에디터기능
 			add			: false, 	jqGrid API 추가기능
 			del			: false, 	jqGrid API 삭제기능
 			search		: false,	jqGrid API 검색기능
 			refresh		: true		jqGrid API 새로고침기능
        },
        sortable: function (permutation) {
        },
        gridResize : {}
 		**/

 		//
 		var $targetGrid = $(this);

 		if(settings.rowspan){
 			settings.gridComplete = rowSpan;
 		}
 		if(!settings.firstData){
 			settings.datatype = "local";
 		}
 		var dt_colnames = [];
 		var columnIds = [];
 		var columnHeader = [];

 		if($targetGrid.data('loadCount') == undefined){
 			$targetGrid.data("loadCount" , 0);
 		}else{
 			$targetGrid.data("loadCount" , 1);
 		}

 		if(settings.colModel.length != 0 && settings.customModel.length == 0){
			for (var i = 0; i < settings.colModel.length; i++) {
				var key = settings.colModel[i].name;
				var domainId = settings.colModel[i].domainId;
				if(domainId){
					key = domainId;
				}
				dt_colnames.push({"colname":key});
				if(!settings.colModel[i].hidden){
					columnIds.push(key);
				}
			}
			settings.columnIds = columnIds;
 		}else if(settings.customModel.length != 0 && settings.colModel.length == 0){
 			for (var i = 0; i < settings.customModel.length; i++) {

 				var key = settings.customModel[i].name;
				var domainId = settings.customModel[i].domainId;
				if(domainId){
					key = domainId;
				}
 				dt_colnames.push({"colname":key});
 				if(!settings.customModel[i].hidden){
 					columnIds.push(key);
 				}
 			}
 			settings.columnIds = columnIds;
 		}
		//그리드 수정모드 기본 추가 필드 생성
		if(options.rowHight){
			if(!options.height && settings.rowHight == "S"){
				settings.height = 550;
			}else if(!options.height && settings.rowHight == "L"){
				settings.height = 530;
			}
			if(!options.rowNum && settings.rowHight == "S"){
				settings.rowNum = 25;
			}else if(!options.rowNum && settings.rowHight == "L"){
				settings.rowNum = 10;
			}
			if(!options.rowList && settings.rowHight == "S"){
				settings.rowList = [25,50,100,200];
			}else if(!options.rowList && settings.rowHight == "L"){
				settings.rowList = [10,20,50,100];
			}
//			rowList: [15, 30, 50,100],
//			settings.rowNum = 25;
//			rowHight: "S",
//			height: "550px",
//			rowNum: 25,
		}
 		//그리드 수정모드 기본 추가 필드 생성
 		if(settings.rowEditable){
 			if(!settings.onSelectRow){
 				settings.onSelectRow = editSelectRow;
 			}else if(settings.onCheckedEvent){
 			    console.log(test);
                settings.onSelectRow  = editSelectRow;
            }else{
 				settings.onSelectRow = editSelectRowDefault;
 			}
 			if(!settings.ondblClickRow){
 				settings.ondblClickRow = editClickRow;
 			}
 			settings.colModel.unshift({frozen: true,name:'MOD_CHECK',align:"center",width:"25px",fixed: true, hidden:true, sortable:false});
 			settings.colModel.unshift({frozen: true,name:'MOD_FLAG',align:"center",width:"20px",hidden:true});
 			settings.colModel.unshift({frozen: true,name:'MOD_VAL',align:"center",width:"20px",hidden:true});
 			if(settings.multiselectone){
				settings.beforeSelectRow = function (rowid, e) {
					e.stopPropagation();
					var $myGrid = $(this);
					$myGrid.jqGrid('resetSelection');
					return true;
				};
 			}
 		//CELL 수정 모드시
 		}else if(settings.cellEditable){
 			if(!settings.onSelectRow){
 				settings.onCellSelect  = editSelectCell;
 			}else if(settings.onCheckedEvent){
 				settings.onCellSelect  = editSelectCell;
 			}else{
 				settings.onCellSelect  = editSelectCellDefault;
 			}
 			if(!settings.ondblClickRow){
 				settings.ondblClickRow = editDblClickCell;
 			}
 			//MOD_CHECK컬럼 - row 수정여부 체크 컬럼(체크표시)
 			settings.colModel.unshift({frozen: true,name:'MOD_CHECK',align:"center",width:"25px",fixed: true ,hidden:true, sortable:false});
 			settings.colModel.unshift({frozen: true,name:'MOD_FLAG',align:"center",width:"20px",hidden:true});
 			settings.colModel.unshift({frozen: true,name:'MOD_VAL',align:"center",width:"20px",hidden:true});
 			if(settings.multielonly){
 				if(settings.multiselectone){
 					settings.beforeSelectRow = function (rowid, e) {
 						e.stopPropagation();
 						var $myGrid = $(this);
 						$myGrid.jqGrid('resetSelection');
 						var i = $.jgrid.getCellIndex($(e.target).closest('td')[0]);
 						var cm = $myGrid.jqGrid('getGridParam', 'colModel');
 						return (cm[i].name === 'cb');
 					};
 				}else{
 					settings.beforeSelectRow = function (rowid, e) {
 						e.stopPropagation();
 						var $myGrid = $(this);
 						var i = $.jgrid.getCellIndex($(e.target).closest('td')[0]);
 						var cm = $myGrid.jqGrid('getGridParam', 'colModel');
 						return (cm[i].name === 'cb');
 					};
 				}
 			}else if(settings.multiselectone){
 					settings.beforeSelectRow = function (rowid, e) {
 						e.stopPropagation();
 						var $myGrid = $(this);
 						$myGrid.jqGrid('resetSelection');
 						return true;
 					};
 			}
 		}else{
 			if(!settings.onSelectRow){
 				settings.onSelectRow = editSelectRow;
 			}else{
 				settings.onSelectRow = editSelectRowDefault;
 			}
 			if(!settings.ondblClickRow){
 				settings.ondblClickRow = editClickRow;
 			}
 			if(settings.multiselectone){
				settings.beforeSelectRow = function (rowid, e) {
					e.stopPropagation();
					var $myGrid = $(this);
					$myGrid.jqGrid('resetSelection');
					return true;
				};
 			}
 		}
 		//기본 컬럼데이터가 없음 ,  컴포넌트 아이디 입력시 컬런 Locale 정보 얻어옴
 		if(settings.colNames.length ==0){
// 			var jsonData = JSON.stringify({"COMP_ID":settings.componentId});

 			var jsonData ={};
 			if(settings.data){
 				jsonData = settings.data;
 			}
 			jsonData["dt_colnames"] = dt_colnames;
 			jsonData["columnIds"] = columnIds;
 			if(settings.domainId){
 				jsonData["domainId"] = settings.domainId;
 			}
 			var headers = settings.groupHeaders;
 			var headerIds = [];
			if(headers.length > 0){
				for (var i = 0; i < headers.length; i++) {
					var rowData = headers[i];
					var header = rowData.header;
//					var group =[];
					for (var f = 0; f < header.length; f++) {
						var obj = header[f];
						var domain = obj.domain == undefined ? "" :obj.domain;
						headerIds.push(domain);
					}
				}
			}

			jsonData["headerIds"] = headerIds;

			jsonData = JSON.stringify(jsonData);

// 			$.ajax({
// 				url: settings.componentUrl,
// 				dataType : "json",
// 				type : "POST",
// 				data:jsonData,
// 	    		contentType: 'application/json; charset=utf-8',
//
// 				success: function(data) {

// 					settings.headerNms = data.headerNms;
// 					if(settings.domainId){
// 						settings.caption = data.caption;
// 		 			}
 					for (var i = 0; i < settings.colModel.length; i++) {

 						if(settings.colModel[i] !== undefined && settings.colModel[i].searchBtnClick !== undefined){
 							settings.colModel[i].edittype = "custom";
 							var thisFunction = settings.colModel[i].searchBtnClick;
 							var disabled = settings.colModel[i].disabled;
 							var readonly = settings.colModel[i].searchReadonly;

 	                       var customEditOptions = settings.colModel[i].editoptions;
 	                       var valMaxLength = null;
 	                       var fnValMaxLength = null;
 	                       if(customEditOptions != undefined){
 	                          valMaxLength = customEditOptions.maxlength;
 	                          fnValMaxLength = customEditOptions.dataEvents;
 	                       }

// 							var valMaxLength = customEditOptions.maxlength;
 							settings.colModel[i].editoptions ={
// 								editoptions: {
 									custom_value : function(elem, oper, value) {
 										var rtnVal = $(elem).find("input").val();
 										if (oper === "get") {
 											return rtnVal;
 										}else{
 											return $(elem).find("input").val(value);
 										}
 									},
 									disabled : disabled,
 									custom_function: thisFunction,
 						    		custom_element: function(elem, editOptions) { //elem : String(Input.val()),
 						    			var div =$("<div/>");
 						    			var model = $(this).jqGrid ('getGridParam', 'colModel');
// 						    			console.log(model);
// 						    			console.log(editOptions);
// 						    			console.log(model[editOptions.name]);
// 						    			console.log(disabled);
// 						    			console.log(editOptions.disabled);
 						    			var str = "";
// 						    			if(disabled){
// 						    				str = "disabled";
// 						    			}
// 						    			var intput =$("<input value='"+elem+"' "+str+" id='"+editOptions.id+"' >");
// 						    			var button =$("<button type='buttion' value='"+elem+"' ></button>");
 						    			var intput = $("<input type='text' value='"+elem+"' "+str+" id='"+editOptions.id+"_INPUT' "+(readonly?"readonly":"")+" >");

                                        if(valMaxLength != undefined){
                                            intput.attr('maxLength', valMaxLength);

                                            if(fnValMaxLength != undefined){
                                                intput.on('keyup blur', function(e){
                                                    intput.data("function", fnValMaxLength);
                                                    var thisFunction= $(this).data("function");
                                                    thisFunction($(this), e, valMaxLength);
                                                })
                                            }
                                        }
 						    			var button =$("<button type='button' value='"+elem+"' ></button>");
 						    			intput.addClass("cel-input");
 						    			intput.css("width","96%");
 						    			intput.css("padding-right","30px");

 						    			var iel = $("<i/>");
 						    			iel.addClass("fa fa-search");
 						    			button.append(iel);
 						    			button.css("margin-left","-25px");
 						    			button.data("function",editOptions.custom_function)
 						    			button.data("rowid",editOptions.rowId)
 						    			button.data("colid",editOptions.id)
// 						    			var rowData = $targetGrid.getRowData( editOptions.id );
// 						    			button.data("rowData",rowData);
 						    			button.click(function(e){
 						    				e.stopPropagation();
 						    				$(this).parent("div").attr("id","");
 						    				var thisFunction= $(this).data("function");
 						    				var value = $(this).prev().val();
 						    				var rowid = $(this).data("rowid");
 						    				var colid = $(this).data("colid");
 						    				thisFunction(value,rowid,colid);
 						    			});

 						    			//**////그리드 내 팝업 자동 검색 기능
//					    			    if($targetGrid[0].id == "inboundPlanPopGrid"){
//					    			        intput.change(function(e){
//					    			            ibPlanGridSearchItem(intput ,e);
//					    			        });
//					    			    }
					    			    switch($targetGrid[0].id){
					    			    case "inboundPlanPopGrid" :
					    			    case "createOutboundPlanDetailGrid" :
					    			    case "riPlanPopGrid" :
					    			    case "createReturnOutboundPlanPopDetailGrid" :
					    			        intput.change(function(e){
					    			            ibPlanGridSearchItem(intput,e, "#" + $targetGrid[0].id, editOptions.rowId);
					    			        });
					    			        break;
					    			    default :
					    			        //이벤트 추가 없음
					    			    }

 						    			div.append(intput);
 						    			div.append(button);

 						    			return div;//$("<input size='5' value='"+elem+"'>");
 						    		}
// 						    	}
 					    	};
 						}
 					}
 					if(settings.rowspan){
 			 			settings.gridComplete = rowSpan;
 			 			for (var i = 0; i < settings.colModel.length; i++) {
 			 				if(settings.colModel[i].rowspan){
 			 					settings.colModel[i]["cellattr"]= checkRowspanCell;
 			 				}
 			 			}
 			 		}
// 					settings.colNames = data.colNames;
 					settings.columnIds = columnIds;
 					//settings.columnNms = data.columnNms;
 					if((settings.rowEditable || settings.cellEditable) && settings.colNames.length > 0){
 						settings.colNames.unshift(' ');
 						settings.colNames.unshift('MOD_FLAG');
 						settings.colNames.unshift('MOD_VAL');
						for (var i = 0; i < settings.colModel.length; i++) {

							if(settings.colModel[i].required){
								settings.colNames[i] = "<i class='form-group spanClass04Asterisk' style='color:red;'></i>"+data.colNames[i]
							}
						}
 					}


 					var colModelLen = settings.colModel.length;
 					var colNamesLen = settings.colNames.length;
 					if(colModelLen > colNamesLen){
 						var gap = colModelLen - colNamesLen;
 						for (var i = (colModelLen - gap) ; i < colModelLen; i++) {
 							settings.colNames.push(settings.colModel[i].name);
 						}
 					}

 					for(var cdtCnt = 0; cdtCnt < colModelLen; cdtCnt++){
							var f =  settings.colModel[cdtCnt];
							if(f.hidden == undefined){
								if(f.dataType == undefined){
	 								settings.colDataType.push('String');
	 							}else{
	 								settings.colDataType.push(settings.colModel[cdtCnt].dataType);
	 							}
							}

					}

 					fnMakeJqgrid();

 					var headers = settings.groupHeaders;
// 					var headerNms = settings.headerNms;
 					if(headers.length > 0){
 						for (var i = 0; i < headers.length; i++) {
 							var rowData = headers[i];
 							var header = rowData.header;
 							var group =[];
 							for (var f = 0; f < header.length; f++) {
 								var obj = header[f];
 								var start = obj.start == undefined ? "" :obj.start;
 								var leng = obj.length == undefined ? 1 :obj.length;
 								var domain = obj.domain == undefined ? "" :obj.domain;
 								var text = obj.text == undefined ? "" :obj.text ;
// 								console.log(domain in headerNms);
// 								if(domain in headerNms){
// 									text = headerNms[domain];
// 								}
 								group.push({
 									startColumnName: start,
 									numberOfColumns: leng,
 									titleText: '<i data-domain-id="'+domain+'">'+text+'</i>'
 								});
 							}
 							$targetGrid.jqGrid('setGroupHeaders', {
 				             	useColSpanStyle: rowData.rowspan,
 				             	groupHeaders:group
 				            });
 						}
 					}
// 				}
// 	        });
 		}else{
			if((settings.rowEditable || settings.cellEditable) && settings.colNames.length > 0){
				settings.colNames.unshift(' ');
				settings.colNames.unshift('MOD_FLAG');
				settings.colNames.unshift('MOD_VAL');
			}
 			fnMakeJqgrid();

 		}


 		//jqGrid  생성
        function fnMakeJqgrid(){
        	var gridWapper = $targetGrid.parent();
        	gridWapper.attr("id",$targetGrid.attr("id")+"_wrap");
    		$targetGrid.jqGrid(settings,function(){
    			$(this).trigger("reloadGrid");
    		});
    		if(settings.loadonce){
    			settings.rowNum ="";
    		}

    		$targetGrid.navGrid(settings.pager,settings.navgrid);

    		if(settings.gridResize != null){
    			$targetGrid.jqGrid('gridResize',settings.gridResize);
    		}
    		var firstWidth = gridWapper.width();
    		$targetGrid.jqGrid('gridResize',{minWidth:firstWidth, maxWidth:firstWidth});
    		$targetGrid.data("grid-wrapper",firstWidth);
    		$targetGrid.jqGrid('setFrozenColumns');

    		gridWapper.bind('resize', function () {
               var width = $(this).width();
               var privWidth = $targetGrid.data("grid-wrapper");
               if(privWidth != width){
            	   $targetGrid.setGridWidth(width);
            	   $targetGrid.jqGrid('gridResize',{minWidth:width, maxWidth:width});
            	   $targetGrid.data("grid-wrapper",width);
               }
    		}).trigger("resize");
       }
        function editSelectRowDefault(id) {
        	var grid = $targetGrid;
			var lastSelection = grid.data("lastSelection");
			var pravSelection = grid.data("pravSelection");
    		if(settings.onSelectRowEvent && id != pravSelection){
				settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData( lastSelection));
			//같은행 중복 클릭 시 onSelectRowEvent 핸들러 작동 추가
			}else if(settings.onSelectRowEvent && id == pravSelection){
                settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData(id));
            }
    		$targetGrid.data("pravSelection",id);
        }


       //로우선택시 로우데이터 저장 및 수정데이터 체크
       function editSelectRow(id) {
			var grid = $targetGrid;
			var lastSelection = grid.data("lastSelection");
			var pravSelection = grid.data("pravSelection");

			if(lastSelection){
				var model = grid.jqGrid ('getGridParam', 'colModel');
				if(settings.onSaveRowValidate){
					if(!settings.onSaveRowValidate(grid.getRowData( lastSelection),lastSelection,grid)){
						return;
					}else{
						grid.jqGrid('saveRow',lastSelection,false,'clientArray');
						$targetGrid.data("lastSelection","");
					}
				}else{
					grid.jqGrid('saveRow',lastSelection,false,'clientArray');
					$targetGrid.data("lastSelection","");
				}
				if(settings.onSelectRowEvent && id != pravSelection){
					settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData( lastSelection));
	           //같은행 중복 클릭 시 onSelectRowEvent 핸들러 작동 추가
				}else if(settings.onSelectRowEvent && id == pravSelection){
				    settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData(id));
				}

	       		var lastRowData = grid.getRowData( lastSelection );
	       		var lastOriVal = lastRowData.MOD_VAL;
	       		var lastModCheck = lastRowData.MOD_CHECK;
	       		var lastModFalg = lastRowData.MOD_FLAG;
	       		var lastVal = "";
	   			for (var i = 0; i < model.length; i++) {
	   				if(model[i].editable){
	   					lastVal +=(lastRowData[model[i].name]+"|");
	   				}
	   			}
	   			var gridId = grid.attr("id");
	       		if(lastOriVal != lastVal){
	       			if(lastModFalg != "INSERT"){
	        			grid.jqGrid('setCell',lastSelection,'MOD_CHECK','<i class="fa fa-check" />');
	        			var checkBox = $("#jqg_"+gridId+"_" + lastSelection);
	        			var pravVal = checkBox.data("pravVal");
	        			if(lastModCheck == "" ||lastModFalg == "DELETE"){
	        				grid.jqGrid('setCell',lastSelection,'MOD_FLAG','UPDATE');
	        				if(!pravVal){
	        					if(!checkBox.is(":checked")){
	    							   checkBox.trigger("click");
	    							   checkBox.prop("checked", true);
	    						   }
	        					checkBox.data("pravVal", lastVal);
	        				}
	        			}
        				if(pravVal && pravVal != "" && pravVal != lastVal){
        					if(!checkBox.is(":checked")){
 							   checkBox.trigger("click");
 							   checkBox.prop("checked", true);
 						   }
        					checkBox.data("pravVal", lastVal);
//        				}else if(!pravVal){
//        					checkBox.prop("checked", true);
//        					checkBox.data("pravVal", lastVal);
        				}
	       			}
	       		}else{
	       			if(lastModFalg != "INSERT"){
	       				grid.jqGrid('setCell',lastSelection,'MOD_CHECK',null);
	       				grid.jqGrid('setCell',lastSelection,'MOD_FLAG',null);
	       			}
	       		}
	       		//lastSelection ="";
           }else{
        	   if(settings.onSelectRowEvent && id != pravSelection){
					settings.onSelectRowEvent(grid.getRowData(id),{});
	           //같은행 중복 클릭 시 onSelectRowEvent 핸들러 작동 추가
        	   }else if(settings.onSelectRowEvent && id == pravSelection){
                   settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData(id));
               }
           }
			$targetGrid.data("pravSelection",id);
		}
		/**
		 * CEL 에디터 함수
		 */
       // CELL 더블클릭 수정모드
       function editDblClickCell(id, iRow, iCol, e) {

    	   var grid = $targetGrid;
    	   var rowData = grid.getRowData( id );
    	   var model = grid.jqGrid('getGridParam', 'colModel');
    	   if (rowData.MOD_VAL == "") {

    		   var thissVal = "";
    		   for (var i = 0; i < model.length; i++) {
    			   if (model[i].editable) {
    				   thissVal += (rowData[model[i].name] + "|");
    			   }
    		   }
    		   grid.jqGrid('setCell', id, 'MOD_VAL', thissVal);
    	   }
//    	   grid.editCell(id, iCol, true);
//    	   grid.jqGrid('editCell',id, iCol,true);

    	   grid.jqGrid('setGridParam', {cellEdit: true});
    	   grid.jqGrid('editCell', iRow, iCol, true);
    	   grid.jqGrid('setGridParam', {cellEdit: false});
    	   if(rowData.MOD_FLAG != "INSERT"){
    		   for (var i = 0; i < model.length; i++) {
    			   if (model[i].disabled) {
    				   $("#"+id+"_"+model[i].name).prop("disabled",true);
    				   $("#"+id+"_"+model[i].name).css("background","#f0f0f0");
    			   }
    		   }
    	   }
    	   $targetGrid.data("lastCellSelection",iCol);
    	   $targetGrid.data("lastSelection",iRow);
       }

       // CELL선택시 기본함수
       function editSelectCellDefault(id,cellidx, cellvalue) {
			var grid = $targetGrid;
			var lastSelection = grid.data("lastSelection");
			var pravSelection = grid.data("pravSelection");
			var lastCellSelection = grid.data("lastCellSelection");
			if (settings.onSelectRowEvent && id != pravSelection) {
				settings.onSelectRowEvent(grid.getRowData(id), grid.getRowData(lastSelection));
			}
			$targetGrid.data("pravSelection", id);
			$targetGrid.data("lastCellSelection", cellidx);
       }
       // CELL선택시 로우데이터 저장 및 수정데이터 체크
       function editSelectCell(id, cellidx, cellvalue) {
    	   var grid = $targetGrid;
    	   var lastSelection = grid.data("lastSelection");
    	   var pravSelection = grid.data("pravSelection");
    	   var lastCellSelection = grid.data("lastCellSelection");
//    	   var pravCelSelection = grid.data("pravCelSelection");
    	   var ids = grid.getDataIDs();
//	       console.log("========================================");
//	       console.log(id);
//	       console.log(cellidx);
//	       console.log(ids);
//	   	   console.log("========================================");
//    	   console.log("==================================================");
//    	   console.log("Last : "+lastSelection);
//    	   console.log("First : "+pravSelection);
//    	   console.log("Cell : "+lastCellSelection);
//    	   console.log("==================================================");
//    	   if(lastCellSelection && lastSelection){
//    		   console.log("INSERT아님0 : " + lastSelection+" cell : "+lastCellSelection);
//			   console.log("INSERT아님2 : " + grid.getRowData(lastSelection).ITEM_SPEC);
//			   grid.jqGrid('setGridParam', {cellEdit: true});
//			   grid.jqGrid('saveCell', 1, lastCellSelection, true);
//			   grid.jqGrid('setGridParam', {cellEdit: false});
//    	   }

    	   if(lastSelection){
    		   grid.jqGrid('saveRow',lastSelection,false,'clientArray');
    		   var model = grid.jqGrid ('getGridParam', 'colModel');
    		   if(settings.onSaveRowValidate){
    			   if(!settings.onSaveRowValidate(grid.getRowData( lastSelection),lastSelection,grid)){
    				   return;
    			   }else{
    				   if(lastCellSelection){
    					   grid.jqGrid('setGridParam', {cellEdit: true});
    					   grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
    					   grid.jqGrid('setGridParam', {cellEdit: false});
    				   }
    			   }
    		   }else{
//    			   console.log("INSERT아님0 : " + lastSelection)
//    			   console.log("INSERT아님0 : " + grid.getRowData(pravSelection).ITEM_SPEC)
    			   if(lastCellSelection){
	    			   grid.jqGrid('setGridParam', {cellEdit: true});
	    			   grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
	    			   grid.jqGrid('setGridParam', {cellEdit: false});
    			   }
    		   }
    		   if(settings.onSelectRowEvent && id != pravSelection){
    			   settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData( lastSelection));
    	       //같은행 중복 클릭 시 onSelectRowEvent 핸들러 작동 추가
    		   }else if(settings.onSelectRowEvent && id == pravSelection){
                   settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData(id));
               }


    		   var lastRowData = grid.getRowData( lastSelection );
    		   var lastOriVal = lastRowData.MOD_VAL;
    		   var lastModCheck = lastRowData.MOD_CHECK;
    		   var lastModFalg = lastRowData.MOD_FLAG;

    		   var lastVal = "";
    		   for (var i = 0; i < model.length; i++) {
    			   if(model[i].editable){
    				   lastVal +=(lastRowData[model[i].name]+"|");
    			   }
    		   }
//    		   console.log(lastOriVal);
//    		   console.log(lastVal);
    		   var gridId = grid.attr("id");
    		   if(lastOriVal != lastVal){
    			   if(lastModFalg != "INSERT"){
    				   grid.jqGrid('setCell',lastSelection,'MOD_CHECK','<i class="fa fa-check" />');
    				   var checkBox = $("#jqg_"+gridId+"_" + lastSelection);
    				   var pravVal = checkBox.data("pravVal");
    				   if(lastModCheck == "" ||lastModFalg == "DELETE"){
    					   grid.jqGrid('setCell',lastSelection,'MOD_FLAG','UPDATE');
    					   if(!pravVal){
    						   if(!checkBox.is(":checked")){
    							   checkBox.trigger("click");
    							   checkBox.prop("checked", true);
    						   }
    	    					checkBox.data("pravVal", lastVal);
    	    				}
    				   }
    				if(pravVal && pravVal != "" && pravVal != lastVal){
    					if(!checkBox.is(":checked")){
							   checkBox.trigger("click");
							   checkBox.prop("checked", true);
						   }
    					checkBox.data("pravVal", lastVal);
//    				}else if(!pravVal){
//    					checkBox.prop("checked", true);
//    					checkBox.data("pravVal", lastVal);
    				}

    			   }
    		   }else{
    			   if(lastModFalg != "INSERT"){
    				   grid.jqGrid('setCell',lastSelection,'MOD_CHECK',null);
    				   grid.jqGrid('setCell',lastSelection,'MOD_FLAG',null);
//    				   $("#jqg_"+gridId+"_" + lastSelection).prop("checked", false);
    			   }

    		   }
    	   }else{
    		   if(settings.onSelectRowEvent && id != pravSelection){
    			   settings.onSelectRowEvent(grid.getRowData(id),{});
    	       //같은행 중복 클릭 시 onSelectRowEvent 핸들러 작동 추가
    		   }else if(settings.onSelectRowEvent && id == pravSelection){
                   settings.onSelectRowEvent(grid.getRowData(id),grid.getRowData(id));
               }
    	   }

    	   $targetGrid.data("pravSelection",id);
       }


       function rowSpan(){
 			//그룹 로우 합치기
 			var grid = this;
 			$("td[name='cellRowspan']",grid).each(function(){
 				var spans =$("td[rowspanid='"+this.id+"']",grid).length+1;
 				if(spans > 1 ){
 					$(this).attr('rowspan',spans);
 				}
 			});
 			chkcell = {};
       }


       function checkRowspanCell(rowid, val, rowObject, cm, rdata){
			var result = "";
			var colId = this.id +'-'+cm.name;
			if(!chkcell[colId]){
				chkcell[colId] = {cellId:undefined,chkval:undefined};
			}
			if(chkcell[colId].chkval != val){
				var cellId = this.id +'_row_'+rowid+'-'+cm.name;
				result = ' rowspan="1" id="'+cellId+'" name="cellRowspan"';
				chkcell[colId] = {cellId:cellId,chkval:val};
			}else{
				result = 'style="display:none;" rowspanid="'+chkcell[colId].cellId+'"';
			}
			return result;
		}
		// 로우 더블클릭 수정모드
       function editClickRow(id, iRow, iCol, e) {
           var grid = $targetGrid;
           var rowData = grid.getRowData( id );
           var model = grid.jqGrid('getGridParam', 'colModel');
           if (rowData.MOD_VAL == "") {

				var thissVal = "";
				for (var i = 0; i < model.length; i++) {
					if (model[i].editable) {
						thissVal += (rowData[model[i].name] + "|");
					}
				}
				grid.jqGrid('setCell', id, 'MOD_VAL', thissVal);
           }
           grid.jqGrid('editRow',id, {focusField: iCol});

           if(rowData.MOD_FLAG != "INSERT"){
        	   for (var i = 0; i < model.length; i++) {
        		   if (model[i].disabled) {
        			   $("#"+id+"_"+model[i].name).prop("disabled",true);
        			   $("#"+id+"_"+model[i].name).css("background","#f0f0f0");
        		   }
        	   }
           }
           $targetGrid.data("lastSelection",id);
       }
       function onClickExcelBtnDefault(options) {
    	   console.log("excel");
    	   var gridData = options.ori_data;
    	   var columnIds = options.columnIds;
    	   var columnNms = options.columnNms;
    	   if(gridData.length == 0){
    		   alert("조회된 데이터가 없습니다.");
    		   return;
    	   }

    	   var sheetNm = options.caption;
    	   var sendData={
    			   "sheetNm":sheetNm,
    			   "columnNms":columnNms,
    			   "columnIds":columnIds,
    			   "dt_grid":gridData
    	   };
    	   var jsonData = JSON.stringify(sendData);
    	   App.prcsStart();
    		$.ajax({
 				url: "/ctrl/comm/download/excel",
 				data:jsonData,
 	    		contentType: 'application/json; charset=utf-8',
 				success: function(data) {
 					App.prcsEnd();
 					location.href='/ctrl/comm/download/excel/file?fileName='+data.fileName+"&downFileName="+sheetNm+".xlsx";
 				}
    		});

       }

       function onClickPdfBtnDefault(options) {
    	   console.log("pdf btn");
    	   console.log(options);

       }

       function onClickPreBtnDefault(options) {
    	   console.log("Preview");
    	   var gridData = options.ori_data;
    	   var columnIds = options.columnIds;
    	   var columnNms = options.columnNms;
    	   if(gridData.length == 0){
    		   alert("조회된 데이터가 없습니다.");
    		   return;
    	   }

    	   var sheetNm = options.caption;
    	   var sendData={
    			   "sheetNm":sheetNm,
    			   "columnNms":columnNms,
    			   "columnIds":columnIds,
    			   "dt_grid":gridData
    	   };
    	   var jsonData = JSON.stringify(sendData);
    	   App.prcsStart();
    		$.ajax({
 				url: "/ctrl/comm/view/excel",
 				data:jsonData,
 	    		contentType: 'application/json; charset=utf-8',
 				success: function(data) {
 					PopApp.paragonOpenPopup({
 						ajaxUrl: '',
 			 			id: '저장',
 			 			body: data.body,
 			 			width: '900px',
 			 			btnName:"저장",
 						title :"미리보기",
 						visible:true,
 						click:function(){
 							alert("!!!!!");
 						},
 						onload : function(modal) {
 							modal.show();
 						}
	 				});
 					App.prcsEnd();
 				}
    		});

       }
 	};


 	//그리드 조건부 조회
 	$.fn.paragonGridSearch = function(data) {
        $(this).setGridParam({
        	datatype: "json",
            postData:data,
        }).trigger("reloadGrid",[{page:1}]);
 	};
 	//OFV
 	$.fn.paragonGridLocalSearch = function(data) {
        $(this).setGridParam({
            data:data,
        }).trigger("reloadGrid",[{page:1}]);
 	};


 	$.fn.paragonGridReload = function() {
 		$(this).trigger("reloadGrid");
 	};
 	$.fn.setFocus = function(idx) {
 		$(this).find("tbody > tr.jqgrow").eq(idx).addClass("focus-row");
 	};

 	/**
 	 *  수정모드시 체크박스 데이터 삭제
 	 *  Data:2017-04-13
 	 *  Author:Lee Sung Guk.
 	 */
 	$.fn.paragonGridCheckedDeleteData = function(){
		var grid = $(this);
		var gridCheckRowIds = grid.getGridParam('selarrrow');
		var addFlag = true;
		var rowLen = gridCheckRowIds.length;

        if(gridCheckRowIds.length == 0 ){
			alert("삭제할 행을 선택해주세요.");
			return;
		}

        for (var i = rowLen -1; i>=0; i--) {
            var rowid= gridCheckRowIds[i];
            var rowData = grid.getRowData(rowid);

            if(rowData.MOD_FLAG == "INSERT"){
                grid.jqGrid('delRowData', rowid);
            }else if(rowData.MOD_FLAG == "DELETE" ) {
				grid.jqGrid('setCell', rowid, 'MOD_CHECK', null);
                grid.jqGrid('setCell', rowid, 'MOD_FLAG',  null);
            }else{
                grid.jqGrid('setCell', rowid, 'MOD_FLAG',  'DELETE');
                grid.jqGrid('setCell', rowid, 'MOD_CHECK', '<i class="fa fa-check text-danger" />');
                addFlag = false;
            }
        }
        return addFlag;
	}

    /**
     * Seleted grid row data.
     * Data: 2017-04-13
     * Author: Lee Sung Guk.
	 * Description: 매개변수에 해당 그리드 객체를 넘겨준다.
	 *
	*/
	$.fn.getSelectedJsonDataChk = function(dataTableName, getData, gridTable){
         var grid = gridTable;
         var lastSelection = grid.data("lastSelection");
         var lastCellSelection = grid.data("lastCellSelection");
         // 미저장 로우 저장
         var ids = grid.jqGrid('getDataIDs');
         var options=  grid.jqGrid('getGridParam');
         var celEditable = options.cellEditable;

         if(options.onSaveRowValidate){
             if(!options.onSaveRowValidate( $(this).getRowData( lastSelection),lastSelection,grid)){
                 return;
             }
         }

         if(celEditable){
             for (var i = 1; i <= ids.length; i++) {
                 grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
             }
             grid.jqGrid('setGridParam', {cellEdit: true});
             grid.jqGrid('saveCell', lastSelection, lastCellSelection, true);
             grid.jqGrid('setGridParam', {cellEdit: false});
         }else{
             for (var i = 1; i <= ids.length; i++) {
                 grid.jqGrid('saveRow',ids[ids.length-i],false,'clientArray');
             }
         }

         var model = grid.jqGrid ('getGridParam', 'colModel');

         if (lastSelection) {
             var lastRowData = grid.getRowData(lastSelection);
             var lastOriVal = lastRowData.MOD_VAL;
             var lastModCheck = lastRowData.MOD_CHECK;
             var lastModFalg = lastRowData.MOD_FLAG;
             var lastVal = "";

             for (var i = 0; i < model.length; i++) {
                 if (model[i].editable) {
                     lastVal += (lastRowData[model[i].name] + "|");
                 }
             }

             var gridId = grid.attr("id");

             if (lastOriVal != lastVal){
                 if (lastModFalg != "INSERT"){
                     grid.jqGrid('setCell', lastSelection, 'MOD_CHECK','<i class="fa fa-check" />');
                     if (lastModCheck == "" || lastModFalg == "DELETE") {
                         grid.jqGrid('setCell', lastSelection, 'MOD_FLAG','UPDATE');
                     }
                 }
             }else{
                 if(lastModFalg != "INSERT"){
                     grid.jqGrid('setCell', lastSelection, 'MOD_CHECK', null);
                     grid.jqGrid('setCell', lastSelection, 'MOD_FLAG', null);
                 }
             }
             grid.data("lastSelection","");
         }

         var gridRowData = grid.getGridParam('selarrrow');
         var rtnArrayData = [];
         if(getData){
             var rowKeys = grid.getRowData(gridRowData[1]);
             delete rowKeys["MOD_VAL"];
             delete rowKeys["MOD_CHECK"];
             for (var i = 0; i < gridRowData.length; i++) {
                 var rtnRowData = {};

                 $.each( getData, function( key, value ) {
                     rtnRowData[key] = grid.getRowData(gridRowData[i])[value];
                 });

                 rtnArrayData.push(rtnRowData);
             }

         }else{
             var rowKeys = grid.getRowData(gridRowData[1]);

             delete rowKeys["MOD_VAL"];
             delete rowKeys["MOD_CHECK"];

             for (var i = 0; i < gridRowData.length; i++) {
                 var rtnRowData = {};
                 $.each( rowKeys, function(key) {
                     rtnRowData[key] = grid.getRowData(gridRowData[i])[key];
                 });
                 rtnArrayData.push(rtnRowData);
             }
         }

         if(rtnArrayData.length == 0){
             return false;
         }else{
             var returnJsonData = {};
             returnJsonData[dataTableName] = rtnArrayData;
             return JSON.stringify(returnJsonData);
         }
     }

	function ibPlanGridSearchItem(intput, e, gridId, rowid){
        e.stopPropagation();
//        var rowid = editOptions.rowId;
       var jsonObject = {itemCd : intput.val()};
       var jsonStr = JSON.stringify(jsonObject);
       var planTotQty = 0;
        $.ajax({
            url: '/ctrl/inbound/inboundPlan/listInboundPlanItemInfo',
            type : "GET",
            datatype : 'JSON',
            contentType : 'application/json;  charset=utf-8',
            data : jsonStr,
            success:function(data){
               var dataCheck = data.dt_grid;
               if(dataCheck.length == 1){
                 $(gridId).setCell("ITEM_CD",dataCheck[0].ITEM_CD,rowid);
                 $(gridId).setCell("ITEM_NM",dataCheck[0].ITEM_NM,rowid);
                 $(gridId).setCell("ITEM_SPEC",dataCheck[0].ITEM_SPEC,rowid);
                 $(gridId).setCell("_ITEM_ST_CD",dataCheck[0]._ITEM_ST_CD,rowid);
                 $(gridId).setCell("PKQTY",dataCheck[0].CONV_UOM_QTY,rowid);
                 $(gridId).setCell("PKQTYPLT",dataCheck[0].PKQTYPLT,rowid);
                 $(gridId).setCell("UOM",dataCheck[0].CONV_UOM_CD,rowid);
                 $(gridId).setCell("WEIGHT",dataCheck[0].WEIGHT,rowid);

                 var pkQty = Number($(gridId).getRow(rowid,"PKQTY"));
                 var box = Number($(gridId).getRow(rowid,"PLAN_BOX_QTY"));
                 var ea = Number($(gridId).getRow(rowid,"PLAN_EA_QTY"));

                 planTotQty =  box * pkQty + ea;
                 $(gridId).setCell("PLAN_QTY",planTotQty,rowid);
                 $(gridId).setCell("PLAN_TOT_QTY",planTotQty,rowid);
               }else{
                  PopApp.paragonOpenPopup({
                        ajaxUrl : "/ctrl/inbound/inboundPlan/inboundPlanItemPop",
                        id : "inboundPlanItemPop",
                        width : "700",
                        data : {itemCd : intput.val()},
                        btnName : "수정",
                        domainId:"PWMCM111Q_P1",
                        onload : function(modal) {
                            modal.show();
                        },
                        callback : function(data){
                           $(gridId).setCell("ITEM_CD",data.ITEM_CD,rowid);
                           $(gridId).setCell("ITEM_NM",data.ITEM_NM,rowid);
                           $(gridId).setCell("ITEM_SPEC",data.ITEM_SPEC,rowid);
                           $(gridId).setCell("ITEM_ST_CD",data._ITEM_ST_CD,rowid);
                           $(gridId).setCell("PKQTY",data.CONV_UOM_QTY,rowid);
                           $(gridId).setCell("PKQTYPLT",data.PKQTYPLT,rowid);
                           $(gridId).setCell("UOM",data.CONV_UOM_CD,rowid);
                           $(gridId).setCell("WEIGHT",data.WEIGHT,rowid);

                           var pkQty = Number($(gridId).getRow(rowid,"PKQTY"));
                           var box = Number($(gridId).getRow(rowid,"PLAN_BOX_QTY"));
                           var ea = Number($(gridId).getRow(rowid,"PLAN_EA_QTY"));

                           planTotQty =  box * pkQty + ea;
                           $(gridId).setCell("PLAN_QTY",planTotQty,rowid);
                           $(gridId).setCell("PLAN_TOT_QTY",planTotQty,rowid);
                        }
                    });
               }
            }
        });
    }
}( jQuery ));