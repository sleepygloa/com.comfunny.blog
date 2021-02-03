package com.comfunny.blog.config.parameters;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public abstract class BaseDataTable extends ArrayList<DataRow> implements DataTable {

	private static final long serialVersionUID = 1L;
	private Map<String,Object> params = new HashMap<String,Object>() ;
	public BaseDataTable() {
		super();
	}
	
	public BaseDataTable(List<Map<String,Object>> list) {
		for(Map<String,Object> map: list){
			DataRow dr =  new CommDataRow(map);
			this.add(dr);
		}
	}
	public void setDataTable(List<Map<String,Object>> list,Set<String> addedParams ) {
		for(Map<String,Object> map: list){
			DataRow dr =  new CommDataRow(map);
			if(addedParams.size() > 0 ){
				for (String key : addedParams) {
					dr.put(key, params.get(key));
				}
			}
			this.add(dr);
		}
	}
	public DataRow getRow(int idx) {
		return (DataRow) this.get(idx);
	}
	public void addRow(DataRow dr) {
		this.add(dr);
	}
	public void setRow(int idx, DataRow dr) {
		this.set(idx,dr);
	}
	public void addRow(int idx, DataRow dr) {
		this.add(idx,dr);
	}
	public int getCount(){
		return this.size();
	}
	public void clean(){
		this.clear();
	}
	public void removeAt(int idx){
		this.remove(idx);
	}
	public String[] getColumns() {
		if(this.getCount() > 0){
			DataRow dr =  (DataRow) this.get(0);
			Iterator<String> mapKeys = dr.keySet().iterator();
			String[] colunms = new String[dr.size()];
			int idx = 0;
	        while( mapKeys.hasNext() ){ 
	        	colunms[idx] =  mapKeys.next();
	            idx++;
	        }
	        return colunms;
		}
		
		return null;
	}
	public String toString(){
		
		StringBuilder result = new StringBuilder("[");

		for (int i = 0; i < this.size(); i++) {
			DataRow dr =  (DataRow) this.get(i);
			Iterator<String> f = dr.keySet().iterator();
			result.append("{");
			while (f.hasNext()) { 
				String key = f.next();
				if(!key.startsWith("s_")){
					result.append(key).append("=").append(dr.get(key)).append(",");
				}
			}
			if (result.lastIndexOf(",") > 0) {
				result.deleteCharAt(result.lastIndexOf(","));
			}
			result.append("}").append(",");;
		}
		if (result.lastIndexOf(",") > 0) {
			result.deleteCharAt(result.lastIndexOf(","));
		}
	    result.append("]");
	    return result.toString();
	}
	public String getType(){
		return this.getType().toString();
	}
	
	
	
	public int getInteger(String key) {
		if(params.get(key)!= null && !params.get(key).equals("")){
			return Integer.parseInt(params.get(key).toString());
		}
		return 0;
	}
	public String getString(String key) {
		if(params.get(key)!= null && !params.get(key).equals("")){
			return String.valueOf(params.get(key));
		}
		return null;
	}
	public boolean getBoolean(String key) {
		if(params.get(key)!= null && !params.get(key).equals("")){
			return Boolean.parseBoolean(params.get(key).toString());
		}
		return false;
	}
	public Long getLong(String key) {
		if(params.get(key)!= null && !params.get(key).equals("")){
			return Long.parseLong(params.get(key).toString());
		}
		return 0l;
	}
	public float getFloat(String key) {
		if(params.get(key)!= null && !params.get(key).equals("")){
			return Float.parseFloat(params.get(key).toString());
		}
		return 0f;
	}
	
	
	
	public void setParam(String key, Object value) {
		params.put(key, value);
		
	}
	public Object getParam(String key) {
		return params.get(key);
	}

}
