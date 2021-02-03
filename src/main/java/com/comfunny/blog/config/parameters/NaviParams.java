package com.comfunny.blog.config.parameters;


public class NaviParams  extends BaseParams implements Params {
	private static final long serialVersionUID = 1L;
	
	public NaviParams() {
		super();
		super.setPageable(true);
		super.setParam("startRow",1); 
		super.setParam("endRow",20); 
		super.setParam("pageSize",20); 
		super.setParam("page",1); 
		super.setParam("pageable",false);
		super.setParam("fileable", false);
		super.setParam("countable", false);
		super.setParam("oracleDb", true);
	}
	public NaviParams(Params p) {
		super.putAll(p);
		super.setPageable(p.isPageable());
		try {
			if ((p.getParam("page") != null) && (p.getParam("pageSize") != null)) {
				
				int iPage = p.getInteger("page");
				int iRows = p.getInteger("pageSize");
				int startNum = (iPage - 1) * iRows ;
				int endNum = iRows;
				if(!super.isOracle()){
					endNum = iPage * iRows;
				}
				
				super.setParam("startRow",startNum); 
				super.setParam("endRow",endNum); 
				super.setParam("pageSize",iRows); 
			}else{
				super.setParam("startRow",0); 
				super.setParam("endRow",9999999); 
				super.setParam("pageSize",15); 
				super.setPageable(false);
			}
		} catch (Exception e) {
			super.setParam("startRow",0); 
			super.setParam("endRow",9999999); 
			super.setParam("pageSize",15); 
			super.setPageable(false);
		}
	}
	public int getStartRow() {
		return super.getIntParam("startRow");
	}
	public void setStartRow(int startRow) {
		super.setParam("startRow",startRow); 
	}
	public int getEndRow() {
		return super.getIntParam("endRow");
	}
	public void setEndRow(int endRow) {
		super.setParam("startRow",endRow); 
	}
	public int getPage() {
		return super.getIntParam("page");
	}
	public void setPage(int page) {
		super.setParam("page",page); 
	}
	public int getPageSize() {
		return super.getIntParam("pageSize");
	}
	public void setPageSize(int pageSize) {
		super.setParam("pageSize",pageSize); 
	}
}