package com.comfunny.blog.config.parameters;

import java.io.Serializable;
import java.util.Map;


public interface DataRow extends Map<String,Object>, Serializable {
	
	/**
	 * setParam(key, object)
	 */
	@Deprecated
	public void setVal(String key , Object value);
	
	/**
	 * getParam  > return object
	 * getInteger >  return integer
	 * getString >  return String
	*/
	@Deprecated
	public Object getVal(String key);
	
	public String getString(String key);
	
	/**
	 * getInteger >  return integer
	 * getParam  > return object
	 * getString >  return String
	*/
	@Deprecated
	public int getInt(String key);
	
	public void setParam(String key , Object value);
	
	public Object getParam(String key);
	
	public int getInteger(String key);
	
	public Long getLong(String key);
	
	public float getFloat(String key);
	
	public boolean getBoolean(String key);
}
