package com.comfunny.blog.config.parameters;

import java.util.Map;


public class CommParams extends BaseParams implements Params {
	private static final long serialVersionUID = 1L;

	public CommParams() {
		super();
	}

	public CommParams(Params p) {
		super.putAll(p);
	}

	public CommParams(Map<String, Object> result) {
		// 수정 해야함
		if(result !=null){
			this.putAll(result);
		}
	}
}
