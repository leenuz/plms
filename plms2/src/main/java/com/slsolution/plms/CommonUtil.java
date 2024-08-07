package com.slsolution.plms;



import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

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

}
