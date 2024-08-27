package com.slsolution.plms;



import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONException;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonUtil {

	
	
	// request 파라메터를 Properties 객체로 변환
    public static Properties convertToProperties(HttpServletRequest request) {

        Enumeration<String> paramEnum = request.getParameterNames();

        Properties properties = new Properties();

        if (paramEnum.hasMoreElements()) {
            do {
                String paramName = (String) paramEnum.nextElement();
                if (request.getParameter(paramName) != null && !"".equals(request.getParameter(paramName).trim())) {
                    properties.put(paramName, request.getParameter(paramName));
                }
            } while (paramEnum.hasMoreElements());
        }

        return properties;
    }
    
    public static HashMap<String, Object> JsonArraytoMap(JSONObject object) throws JSONException {
        
	     HashMap<String, Object> map = new HashMap<String, Object>();             
	     Iterator<String> keysItr = object.keys();                            
	                                                                       
	     while(keysItr.hasNext()) {                                           
	         String key = keysItr.next();
	         log.info("key:"+key);
	         Object value = object.get(key);                                  
	         if(value instanceof JSONArray) {                                 
	             value = toList((JSONArray) value);                           
	         }                                                                
	         else if(value instanceof JSONObject) {                           
	             value = JsonArraytoMap((JSONObject) value);                           
	         }        
	         System.out.println("key:"+key+",value:"+value);
	         map.put(key, value);                                             
	     }                                                                    
	                                                                          
	     return map;                                                          
	                                                                          
	 }       
	
	public static List<Object> toList(JSONArray array) throws JSONException {       
	     List<Object> list = new ArrayList<Object>();                         
	     for(int i = 0; i < array.length(); i++) {                            
	         Object value = array.get(i);                                     
	         if(value instanceof JSONArray) {                                 
	             value = toList((JSONArray) value);                           
	         }                                                                
	         else if(value instanceof JSONObject) {                           
	             value = JsonArraytoMap((JSONObject) value);                           
	         }                                                                
	         list.add(value);                                                 
	     }                                                                    
	                                                                          
	     return list;                                                         
	                                                                          
	 }
	
	public static Map<String, Object> getMapFromJsonObject(JSONObject jsonObj){
	    Map<String, Object> map = null;
	    
	    try {
	       map = new ObjectMapper().readValue(jsonObj.toString(), Map.class);
	    } catch (JsonParseException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (JsonMappingException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (IOException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    }
	    return map;
	}

	
	 public static void moveFile(String fileName, String beforeFilePath, String afterFilePath) {
	        //String path = afterFilePath+"/"+folderName;
	        String newfilePath = afterFilePath+"/"+fileName;
	        String orgFilePath=beforeFilePath+"/"+fileName;
	        File dir = new File(afterFilePath);

	        if (!dir.exists()) { //폴더 없으면 폴더 생성
	            dir.mkdirs();
	        }
	        
	        try{
	            File file =new File(orgFilePath);

	            // 옮기 고자 하는 경로로 파일 이동
	            file.renameTo(new File(newfilePath));            
	        }catch(Exception e){
	            e.printStackTrace();
	        }
	    }
	

}
