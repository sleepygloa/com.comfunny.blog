package com.comfunny.blog.config.parameters;

import java.util.List;
import java.util.Map;
import java.util.Set;


public class CommDataTable extends BaseDataTable implements DataTable {

	private static final long serialVersionUID = 1L;
	public CommDataTable() {
		super();
	}

	public CommDataTable(List<Map<String,Object>> list) {
		super(list);
	}
	public int getInteger(String key) {
		return super.getInteger(key);
	}
	public String getString(String key) {
		return super.getString(key);
	}
	public boolean getBoolean(String key) {
		return super.getBoolean(key);
	}
	public Long getLong(String key) {
		return super.getLong(key);
	}
	public float getFloat(String key) {
		return super.getFloat(key);
	}

	
	

}
