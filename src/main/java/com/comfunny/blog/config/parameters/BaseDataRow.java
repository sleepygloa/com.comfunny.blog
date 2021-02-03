package com.comfunny.blog.config.parameters;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class BaseDataRow extends HashMap<String,Object> implements DataRow {

	private static final long serialVersionUID = 1L;
	
	public BaseDataRow() {
		super();
	}
	public BaseDataRow(Map<String,Object> map){
		List<String> keyList = new ArrayList<String>(map.keySet());
		for (String key : keyList) {
			this.put(key,map.get(key));
		}
	}
	public void setVal(String key, Object value) {
		this.put(key, value);
	}
	public void setParam(String key, Object value) {
		this.put(key, value);
	}

	public Object getVal(String key) {
		return this.get(key); 
	}
	
	public Object getParam(String key) {
		return this.get(key); 
	}
	
	public String getString(String key){
		return String.valueOf(get(key)); 
	}
	
	public int getInt(String key){
		return Integer.parseInt(getString(key));
	}
	
	@Override
	public int getInteger(String key) {
		if(this.get(key)!= null && !this.get(key).equals("")){
			return Integer.parseInt(this.get(key).toString());
		}
		return 0;
	}
	
	@Override
	public boolean getBoolean(String key) {
		if(this.get(key)!= null && !this.get(key).equals("")){
			return Boolean.parseBoolean(this.get(key).toString());
		}
		return false;
	}
	
	@Override
	public Long getLong(String key) {
		if(this.get(key)!= null && !this.get(key).equals("")){
			return Long.parseLong(this.get(key).toString());
		}
		return 0l;
	}
	@Override
	public float getFloat(String key) {
		if(this.get(key)!= null && !this.get(key).equals("")){
			return Float.parseFloat(this.get(key).toString());
		}
		return 0f;
	}
}
