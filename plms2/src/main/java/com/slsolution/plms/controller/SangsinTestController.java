package com.slsolution.plms.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;

import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class SangsinTestController {
	
	
	//파일 다운로드 ,패스와 파일 이름 넘김다 parameter
			//filePath=
			//fileName=
	//해지 완료 처리
			@GetMapping(path="/jisangCancelComplete")
			public void jisangCancelComplete(HttpServletRequest request, HttpServletResponse response) throws IOException{

				HashMap<String, Object> resultmap = new HashMap();
		        resultmap.put("resultCode", "0000");
		        resultmap.put("resultData", request);
		        resultmap.put("resultMessage", "success");
		        JSONObject obj = new JSONObject(resultmap);
		    	 // log.info("jo:"+jo);
		        response.setCharacterEncoding("UTF-8");
		        response.setHeader("Access-Control-Allow-Origin", "*");
		        response.setHeader("Cache-Control", "no-cache");
		        response.resetBuffer();
		        response.setContentType("application/json");
		        // response.getOutputStream().write(jo);
		        response.getWriter().print(obj);
		        response.getWriter().flush();
				
			}

}
