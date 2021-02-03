package com.comfunny.blog.config.parameters;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;


public class FileParams extends BaseParams  {
	private static final long serialVersionUID = 1L;

	public FileParams() {
		super();
	}
	public FileParams(Params p) {
		super.putAll(p);
		super.setFileable(true);
	}
	public FileParams(Map<String, Object> result) {
		if(result !=null){
			this.putAll(result);
		}
	}
	@SuppressWarnings("unchecked")
	public List<MultipartFile> getFiles(String key) {
		return  (List<MultipartFile>) this.get(key);
	}
	
	public MultipartFile getFile(String key)  {
		if(this.getFiles(key).size() == 0){
			return null;
		}
		return  this.getFiles(key).get(0);
	}
	public MultipartFile getFile(String key, int idx)  {
		if(this.getFiles(key).size() == 0){
			return null;
		}
		return  this.getFiles(key).get(idx);
	}

}
