package com.comfunny.blog.config.parameters;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;


public interface DataTable extends List<DataRow>, Serializable {
	public DataRow getRow(int idx);
	public void addRow(DataRow dr);
	public void addRow(int idx, DataRow dr);
	public void setRow(int idx, DataRow dr);
	public int getCount();
	public void clean();
	public void removeAt(int idx);
	public String toString();
	public String getType();
	public String[] getColumns();
	public void setDataTable(List<Map<String,Object>> list,Set<String> addedParams );
	public void setParam(String key , Object value);
	public Object getParam(String key);
	public String getString(String key);
	public int getInteger(String key);
	public boolean getBoolean(String key);
	
	public Long getLong(String key);
	public float getFloat(String key);
	
	
	
}
